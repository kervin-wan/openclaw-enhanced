/**
 * ToolSearch — 工具搜索降级系统
 *
 * 当工具池超过阈值时自动启用工具搜索，避免工具描述占满上下文窗口。
 * 参照 Claude Code 的 ToolSearchTool 设计。
 */

/**
 * 默认配置
 */
const DEFAULT_CONFIG = {
  /** 触发工具搜索的阈值（工具数超过此值启用搜索） */
  threshold: 20,
  /** 搜索模式下的工具描述截断长度 */
  shortDescLength: 60,
  /** 搜索结果最大数量 */
  maxResults: 10,
  /** 是否在提示词中注入工具搜索指导 */
  injectGuidance: true,
};

/**
 * 工具搜索降级管理器
 */
class ToolSearchManager {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    /** @type {Array} 当前工具列表 */
    this.tools = [];
    /** @type {Set} 已在此轮使用过的工具 */
    this.usedThisTurn = new Set();
    /** 是否启用搜索模式 */
    this.searchEnabled = false;
  }

  /**
   * 检查是否需要启用工具搜索
   * @param {Array} tools - 工具列表
   * @returns {boolean}
   */
  needsToolSearch(tools) {
    this.tools = tools;
    const needed = tools.length > this.config.threshold;
    this.searchEnabled = needed;
    return needed;
  }

  /**
   * 搜索匹配的工具
   * @param {string} query - 自然语言搜索词
   * @param {Object} [opts]
   * @param {boolean} [opts.excludeUsed] - 排除已使用的工具
   * @returns {Array}
   */
  search(query, opts = {}) {
    const q = query.toLowerCase();
    const keywords = q.split(/\s+/);

    let candidates = this.tools;

    // 排除已使用的工具
    if (opts.excludeUsed !== false) {
      candidates = candidates.filter(t => !this.usedThisTurn.has(t.name));
    }

    // 按匹配度排序
    const scored = candidates.map(tool => {
      let score = 0;
      const name = tool.name.toLowerCase();
      const desc = (tool.description || '').toLowerCase();

      // 名称精确匹配
      if (name === q) score += 100;
      // 名称包含
      if (name.includes(q)) score += 50;
      // 关键词匹配
      for (const kw of keywords) {
        if (name.includes(kw)) score += 20;
        if (desc.includes(kw)) score += 10;
      }
      // 名称部分匹配
      for (const kw of keywords) {
        if (kw.length > 1) {
          for (let i = 0; i < name.length - kw.length + 1; i++) {
            if (name.substring(i, i + kw.length) === kw) score += 5;
          }
        }
      }

      return { tool, score };
    });

    // 按分数降序，取前 N
    scored.sort((a, b) => b.score - a.score);
    return scored
      .slice(0, this.config.maxResults)
      .filter(s => s.score > 0)
      .map(s => ({
        name: s.tool.name,
        description: s.tool.description || '',
        score: s.score,
      }));
  }

  /**
   * 标记工具为已使用
   */
  markUsed(toolName) {
    this.usedThisTurn.add(toolName);
  }

  /**
   * 重置本轮使用记录
   */
  resetTurn() {
    this.usedThisTurn.clear();
  }

  /**
   * 获取搜索模式下的工具摘要（缩短描述）
   */
  getShortTools() {
    return this.tools.map(t => ({
      ...t,
      description: (t.description || '').substring(0, this.config.shortDescLength),
    }));
  }

  /**
   * 判断是否应使用完整工具列表还是缩短版本
   */
  useShortDescriptions() {
    return this.searchEnabled;
  }

  /**
   * 格式化搜索结果供模型使用
   * @param {Array} results
   * @returns {string}
   */
  formatResults(results) {
    if (results.length === 0) {
      return 'No matching tools found. Try different keywords or list all tools.';
    }
    return results
      .map(r => `- **${r.name}**: ${r.description.substring(0, 100)}`)
      .join('\n');
  }

  /**
   * 注入到系统提示词的工具搜索指导
   * @returns {string|null}
   */
  buildGuidancePrompt() {
    if (!this.searchEnabled || !this.config.injectGuidance) return null;

    return `# Tool Search
You have access to a large number of tools (${this.tools.length} total). Tools are listed with shortened descriptions to save context space.

When you need a specific tool you don't see in your tool list:
- Use the ToolSearch capability to find tools by keyword
- Search with natural language: "I need to send a message", "file operations", "browser control"
- Tools you've already used this turn are excluded from search results
- After finding a tool, use it directly — no need to re-search

Tips:
- If unsure which tool to use, search first
- Most common tools are always listed upfront`;
  }
}

module.exports = {
  ToolSearchManager,
  DEFAULT_CONFIG,
};
