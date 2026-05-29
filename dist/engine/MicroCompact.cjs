/**
 * MicroCompact — 微压缩引擎
 *
 * 当会话消息超过阈值时，自动清理旧工具结果，释放上下文空间。
 * 同时注入 compact boundary 消息告知模型发生了压缩。
 *
 * 核心策略（借鉴 Claude Code）：
 * 1. 只压缩特定"可压缩"工具的结果（FileRead/Bash/Grep/Glob 等）
 * 2. 保留最近 N 条结果（默认 5）
 * 3. 被清除的结果替换为标记文本而非删除（保持消息结构完整）
 * 4. 注入 boundary 消息告知模型"旧工具结果已清除"
 */

/**
 * 可压缩工具列表 — 这些工具的输出通常是"一次性"的
 * 读取文件、搜索、shell 命令的结果往往不需要长期保留
 */
const COMPACTABLE_TOOLS = new Set([
  'read',
  'exec',
  'grep',
  'find',
  'web_search',
  'web_fetch',
  'bash',
  'shell',
]);

/**
 * 被清除结果的替代文本
 */
const CLEARED_MARKER = '[Old tool result content cleared by MicroCompact]';

/**
 * 默认配置
 */
const DEFAULT_CONFIG = {
  /** 触发压缩的消息数阈值 */
  triggerThreshold: 30,
  /** 保留最近 N 条工具结果 */
  keepRecent: 5,
  /** 最小消息间隔（相邻两次压缩至少隔 N 条消息） */
  minInterval: 10,
  /** 是否注入 compact boundary 消息 */
  injectBoundary: true,
  /** 是否统计并返回节省的 token 数 */
  trackSavings: true,
};

/**
 * MicroCompact 引擎
 */
class MicroCompactEngine {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    /** 上次压缩时的消息数 */
    this.lastCompactMsgCount = 0;
    /** 累计清理的工具结果数 */
    this.totalCleared = 0;
    /** 上次压缩的统计 */
    this.lastStats = null;
  }

  /**
   * 检查是否需要压缩
   * @param {Array} messages - 消息数组
   * @returns {'none'|'light'|'aggressive'}
   */
  needsCompaction(messages) {
    const msgCount = messages.length;
    const sinceLast = msgCount - this.lastCompactMsgCount;

    if (msgCount < this.config.triggerThreshold) return 'none';
    if (sinceLast < this.config.minInterval) return 'none';

    // 统计可压缩的工具结果数
    const compactable = this._countCompactable(messages);
    if (compactable <= this.config.keepRecent) return 'none';

    // 超过阈值 50% = aggressive
    return compactable > this.config.triggerThreshold * 1.5
      ? 'aggressive'
      : 'light';
  }

  /**
   * 执行微压缩
   * @param {Array} messages - 原始消息数组（会被原地修改）
   * @returns {{ messages: Array, stats: Object, boundary: string|null }}
   */
  compact(messages) {
    const stats = {
      cleared: 0,
      kept: 0,
      tokensSaved: 0,
      level: 'none',
    };

    const level = this.needsCompaction(messages);
    if (level === 'none') return { messages, stats, boundary: null };

    stats.level = level;

    // 收集所有可压缩的工具结果索引
    const compactableIndices = this._findCompactableIndices(messages);

    if (compactableIndices.length <= this.config.keepRecent) {
      return { messages, stats, boundary: null };
    }

    // 保留最近 N 个，清除其余的
    const keepCount = this.config.keepRecent;
    const clearIndices = compactableIndices.slice(0, -keepCount);
    const keepIndices = compactableIndices.slice(-keepCount);

    for (const idx of clearIndices) {
      const msg = messages[idx];
      const blocks = msg?.message?.content;
      if (!Array.isArray(blocks)) continue;

      for (const block of blocks) {
        if (block.type === 'tool_result' && block.content) {
          // 估算节省的 token
          const oldLen = typeof block.content === 'string'
            ? block.content.length
            : JSON.stringify(block.content).length;
          stats.tokensSaved += Math.ceil(oldLen / 4);

          // 替换内容为标记
          block.content = CLEARED_MARKER;
          stats.cleared++;
        }
      }
    }

    stats.kept = keepIndices.length;

    // 更新状态
    this.lastCompactMsgCount = messages.length;
    this.totalCleared += stats.cleared;
    this.lastStats = stats;

    // 生成 boundary 消息
    const boundary = this.config.injectBoundary
      ? this._buildBoundary(stats)
      : null;

    return { messages, stats, boundary };
  }

  /**
   * 生成压缩边界消息（注入到会话，告知模型）
   */
  _buildBoundary(stats) {
    return `<system-reminder>
[MicroCompact] ${stats.cleared} old tool results were cleared to free context space.
${stats.kept} most recent results preserved.
Estimated tokens saved: ~${stats.tokensSaved}.
Write down any important information from old results that you still need.
</system-reminder>`;
  }

  /**
   * 收集所有可压缩工具结果的索引
   */
  _findCompactableIndices(messages) {
    const indices = [];
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const blocks = msg?.message?.content;
      if (!Array.isArray(blocks)) continue;

      for (const block of blocks) {
        if (
          block.type === 'tool_result' &&
          block.tool_use_id &&
          block.content &&
          block.content !== CLEARED_MARKER
        ) {
          // 通过 tool_use_id 查找对应的 tool_use 来确认工具类型
          // 简化版：检查消息中是否有可压缩的工具调用
          const toolName = this._findToolName(messages, block.tool_use_id);
          if (toolName && COMPACTABLE_TOOLS.has(toolName.toLowerCase())) {
            indices.push(i);
          }
        }
      }
    }
    return indices;
  }

  /**
   * 通过 tool_use_id 查找工具名
   */
  _findToolName(messages, toolUseId) {
    for (const msg of messages) {
      const blocks = msg?.message?.content;
      if (!Array.isArray(blocks)) continue;
      for (const block of blocks) {
        if (block.type === 'tool_use' && block.id === toolUseId) {
          return block.name;
        }
      }
    }
    return null;
  }

  /**
   * 统计可压缩工具结果数
   */
  _countCompactable(messages) {
    return this._findCompactableIndices(messages).length;
  }

  /**
   * 重置引擎状态
   */
  reset() {
    this.lastCompactMsgCount = 0;
    this.totalCleared = 0;
    this.lastStats = null;
    return this;
  }

  /**
   * 获取统计摘要
   */
  getSummary() {
    return {
      totalCleared: this.totalCleared,
      lastCompactMsgCount: this.lastCompactMsgCount,
      lastStats: this.lastStats,
      config: this.config,
    };
  }
}

/**
 * 便利函数：单次压缩
 */
function microCompact(messages, config = {}) {
  const engine = new MicroCompactEngine(config);
  return engine.compact(messages);
}

module.exports = {
  MicroCompactEngine,
  microCompact,
  COMPACTABLE_TOOLS,
  CLEARED_MARKER,
  DEFAULT_CONFIG,
};
