/**
 * PromptBuilder — 分层提示词构建器
 * 
 * 核心设计：
 * 1. 静态块：预定义内容，跨用户可缓存（identity/safety/rules/tools）
 * 2. 动态块：运行时 resolve，每会话/每轮不同（memory/env/mcp/skills）
 * 3. 缓存边界：静态块和动态块之间插入标记
 * 
 * 用法：
 *   const builder = new PromptBuilder();
 *   builder.addStatic(someBlock);
 *   builder.addDynamic('memory', async () => await loadMemory());
 *   const blocks = await builder.build();
 *   const prompt = builder.render(blocks);
 */

const {
  staticBlock,
  sessionBlock,
  turnBlock,
  getStaticBlocks,
} = require('./PromptBlock.cjs');

const {
  assembleWithBoundary,
  getStaticCacheKey,
  generateCacheKey,
} = require('./PromptCache.cjs');

class PromptBuilder {
  constructor() {
    /** @type {Array} 静态块 */
    this.staticBlocks = [];
    
    /** @type {Map<string, Function>} 动态块工厂（key → async () => string|null） */
    this.dynamicFactories = new Map();
    
    /** @type {Map<string, string>} 动态块顺序配置 */
    this.dynamicOrder = new Map();
    
    /** @type {Map<string, Object>} 动态块元数据 */
    this.dynamicMeta = new Map();
    
    /** @type {string|null} 当前静态缓存键 */
    this._staticCacheKey = null;
    
    /** @type {boolean} 静态缓存键是否脏 */
    this._cacheKeyDirty = true;
    
    /** @type {Object} 配置选项 */
    this.options = {
      // 是否在动态块之间加分隔
      separator: '\n',
      // 是否跳过空动态块
      skipEmptyDynamic: true,
    };
  }

  /**
   * 从预定义列表初始化静态块
   */
  initStaticBlocks(customBlocks = []) {
    this.staticBlocks = [...getStaticBlocks(), ...customBlocks];
    return this;
  }

  /**
   * 添加静态块
   */
  addStatic(block) {
    this.staticBlocks.push(block);
    this._cacheKeyDirty = true;
    return this;
  }

  /**
   * 注册动态块工厂
   * @param {number|string} order - 排序（数字越小越靠前，或用字符串标签做语义排序）
   */
  addDynamic(key, factory, order = 100, meta = {}) {
    this.dynamicFactories.set(key, factory);
    this.dynamicOrder.set(key, order);
    this.dynamicMeta.set(key, {
      label: key,
      conditional: meta.conditional || false,  // 条件性动态块（可能返回 null）
      ...meta,
    });
    return this;
  }

  /**
   * 批量注册标准动态块
   * 
   * @param {Object} config - 动态块配置
   * @param {Function} config.sessionGuidance - 会话指导（agent/skill 使用说明）
   * @param {Function} config.environment - 环境信息
   * @param {Function} config.modelInfo - 模型信息
   * @param {Function} config.memory - 记忆内容
   * @param {Function} config.language - 语言偏好
   * @param {Function} config.workspaceFiles - 工作区文件注入
   * @param {Function} config.runtime - 运行时信息
   * @param {Function} config.extra - 额外内容（heartbeat/silent_reply等）
   */
  registerStandardDynamicBlocks(config) {
    if (config.sessionGuidance)  this.addDynamic('session_guidance', config.sessionGuidance, 10);
    if (config.environment)       this.addDynamic('environment', config.environment, 20);
    if (config.modelInfo)         this.addDynamic('model_info', config.modelInfo, 30);
    if (config.memory)            this.addDynamic('memory', config.memory, 40);
    if (config.language)          this.addDynamic('language', config.language, 50);
    if (config.skills)            this.addDynamic('skills', config.skills, 60);
    if (config.workspaceFiles)    this.addDynamic('workspace_files', config.workspaceFiles, 70);
    if (config.runtime)           this.addDynamic('runtime', config.runtime, 80);
    if (config.extra)             this.addDynamic('extra', config.extra, 90);
    return this;
  }

  /**
   * 构建所有提示词块（resolve 动态块）
   * @returns {Promise<Array>} 完整的提示词块数组
   */
  async build() {
    const blocks = [...this.staticBlocks];
    
    // 按 order 排序动态块 key
    const sortedKeys = [...this.dynamicFactories.keys()]
      .sort((a, b) => {
        const oa = this.dynamicOrder.get(a) ?? 100;
        const ob = this.dynamicOrder.get(b) ?? 100;
        return oa - ob;
      });
    
    // 并行 resolve 所有动态块
    const resolved = await Promise.all(
      sortedKeys.map(async (key) => {
        try {
          const factory = this.dynamicFactories.get(key);
          const text = await factory();
          return { key, text };
        } catch (err) {
          console.error(`[PromptBuilder] Error resolving dynamic block "${key}":`, err.message);
          return { key, text: null, error: err.message };
        }
      })
    );
    
    // 添加非空动态块
    for (const { key, text } of resolved) {
      if (this.options.skipEmptyDynamic && (!text || !text.trim())) {
        continue;
      }
      const meta = this.dynamicMeta.get(key) || { label: key };
      blocks.push(sessionBlock(meta.label, text));
    }
    
    return blocks;
  }

  /**
   * 获取静态块的缓存键
   */
  getStaticCacheKey() {
    if (this._cacheKeyDirty || this._staticCacheKey === null) {
      this._staticCacheKey = generateCacheKey(this.staticBlocks);
      this._cacheKeyDirty = false;
    }
    return this._staticCacheKey;
  }

  /**
   * 将 blocks 渲染为提示词字符串数组（带缓存边界）
   * @param {Array} blocks - build() 返回的块数组
   * @returns {string[]} - 提示词行数组
   */
  render(blocks) {
    return assembleWithBoundary(blocks).filter(line => line !== null);
  }

  /**
   * 将 blocks 渲染为单个字符串
   */
  renderToString(blocks) {
    return this.render(blocks).join('\n');
  }

  /**
   * 便利方法：build + render
   * @returns {Promise<{blocks: Array, lines: string[], text: string, cacheKey: string}>}
   */
  async buildAndRender() {
    const blocks = await this.build();
    const lines = this.render(blocks);
    const text = lines.join('\n');
    const cacheKey = this.getStaticCacheKey();
    return { blocks, lines, text, cacheKey };
  }

  /**
   * 重置构建器状态
   */
  reset() {
    this._staticCacheKey = null;
    this._cacheKeyDirty = true;
    return this;
  }
}

module.exports = {
  PromptBuilder,
  staticBlock,
  sessionBlock,
  turnBlock,
};
