/**
 * SessionEngine — 增强版会话生命周期引擎
 *
 * 核心设计（参照 Claude Code 的 QueryEngine）：
 * - AsyncGenerator 模式产出事件流
 * - 可中断（AbortController）
 * - 可恢复（持久化 transcript）
 * - 可分支（fork）
 * - 统一管理 tool pool + context + permissions
 */

const crypto = require('crypto');

// Lazy-load enhanced modules
let _compactEngine = null;
let _snipEngine = null;
let _permFilter = null;
let _toolSearch = null;

function getCompact() {
  if (!_compactEngine) {
    _compactEngine = require('./MicroCompact.cjs');
  }
  return _compactEngine;
}

function getSnip() {
  if (!_snipEngine) {
    _snipEngine = require('./SnipCompact.cjs');
  }
  return _snipEngine;
}

function getPerm() {
  if (!_permFilter) {
    _permFilter = require('./PermissionFilter.cjs');
  }
  return _permFilter;
}

function getToolSearch() {
  if (!_toolSearch) {
    _toolSearch = require('./ToolSearch.cjs');
  }
  return _toolSearch;
}

/**
 * 会话状态
 */
const SessionState = {
  IDLE: 'idle',
  PROCESSING: 'processing',
  ABORTED: 'aborted',
  COMPLETED: 'completed',
  ERROR: 'error',
};

/**
 * 会话配置
 * @typedef {Object} SessionConfig
 * @property {string} sessionId
 * @property {string} model
 * @property {Array} tools
 * @property {string} permissionMode
 * @property {Array} denyRules
 * @property {string} workspaceDir
 * @property {Array} [initialMessages]
 * @property {number} [maxTurns]
 * @property {number} [maxBudgetUsd]
 */

class SessionEngine {
  constructor(config = {}) {
    this.sessionId = config.sessionId || crypto.randomUUID();
    this.state = SessionState.IDLE;

    /** @type {Array} 消息历史 */
    this.messages = config.initialMessages || [];

    /** 模型 */
    this.model = config.model || 'default';

    /** 工具池 */
    this.tools = config.tools || [];

    /** 权限配置 */
    this.permissionMode = config.permissionMode || 'default';
    this.denyRules = config.denyRules || [];

    /** 工作区 */
    this.workspaceDir = config.workspaceDir || process.cwd();

    /** 终止控制 */
    this.maxTurns = config.maxTurns || 100;
    this.maxBudgetUsd = config.maxBudgetUsd || Infinity;

    /** 运行时状态 */
    this.turnCount = 0;
    this.totalTokens = 0;
    this.totalCost = 0;
    this.startTime = Date.now();

    /** Abort 控制 */
    this.abortController = null;

    /** 压缩引擎 */
    this.microCompact = new (getCompact().MicroCompactEngine)();
    this.snipCompact = new (getSnip().SnipCompactEngine)({ autoTrigger: false });

    /** 工具搜索 */
    this.toolSearch = new (getToolSearch().ToolSearchManager)();

    /** Fork 子代理句柄 */
    this.forks = new Map();

    /** 事件监听器 */
    this.listeners = {
      'pre-compact': [],
      'post-compact': [],
      'tool-call': [],
      'error': [],
    };

    /** 统计 */
    this.stats = {
      totalTurns: 0,
      totalToolCalls: 0,
      microCompacts: 0,
      snipCompacts: 0,
      forksCreated: 0,
      errors: 0,
    };
  }

  /**
   * 提交用户消息（异步生成器）
   * @param {string|Array} content
   * @returns {AsyncGenerator}
   */
  async *submitMessage(content) {
    if (this.state === SessionState.PROCESSING) {
      yield { type: 'error', message: 'Session is already processing' };
      return;
    }

    this.state = SessionState.PROCESSING;
    this.abortController = new AbortController();

    try {
      // 1. Pre-compact check
      yield* this._preCompact();

      // 2. Tool search check
      this._checkToolSearch();

      // 3. Permission filter check
      yield* this._yieldStatus();

      // 4. 委托给底层 runner（此处在真实集成中调用 pi-embedded-runner）
      // 这里产出事件流
      yield* this._processTurn(content);

      // 5. Post-compact check
      yield* this._postCompact();

      this.state = SessionState.IDLE;
    } catch (e) {
      if (this.abortController?.signal.aborted) {
        this.state = SessionState.ABORTED;
        yield { type: 'aborted', reason: 'User aborted' };
      } else {
        this.state = SessionState.ERROR;
        this.stats.errors++;
        yield { type: 'error', message: e.message, stack: e.stack };
      }
    }
  }

  /**
   * 中断当前执行
   */
  abort() {
    if (this.abortController) {
      this.abortController.abort();
    }
    this.state = SessionState.ABORTED;
  }

  /**
   * Fork 当前会话
   * @param {Object} options
   * @param {string} options.name
   * @param {string} options.directive
   * @param {string} [options.subagentType]
   * @returns {SessionEngine}
   */
  fork(options) {
    const forkId = `fork-${options.name}-${Date.now()}`;

    // 创建新引擎，继承上下文
    const forkEngine = new SessionEngine({
      sessionId: forkId,
      model: options.model || this.model,
      tools: options.subagentType
        ? this._filterToolsForAgent(options.subagentType)
        : this.tools,
      permissionMode: 'bypass',
      workspaceDir: this.workspaceDir,
      initialMessages: [...this.messages],
    });

    // 注入 fork 指令
    forkEngine.messages.push({
      type: 'user',
      message: {
        role: 'user',
        content: `[Fork Directive: ${options.name}]\n${options.directive}`,
      },
      timestamp: new Date().toISOString(),
    });

    this.forks.set(forkId, {
      engine: forkEngine,
      name: options.name,
      directive: options.directive,
      background: options.background !== false,
      status: 'pending',
      startedAt: new Date().toISOString(),
    });

    this.stats.forksCreated++;

    return forkEngine;
  }

  /**
   * 获取活跃的 fork
   */
  getForks() {
    return [...this.forks.entries()].map(([id, f]) => ({
      id,
      name: f.name,
      status: f.status,
      background: f.background,
      startedAt: f.startedAt,
    }));
  }

  /**
   * 等待 fork 完成
   */
  async *watchForks() {
    for (const [id, fork] of this.forks) {
      if (fork.status === 'completed' || fork.status === 'failed') {
        yield {
          type: 'fork_result',
          forkId: id,
          name: fork.name,
          status: fork.status,
          messages: fork.engine.messages,
        };
        this.forks.delete(id);
      }
    }
  }

  // ═══════════ 私有方法 ═══════════

  async *_preCompact() {
    // Micro Compact
    if (this.microCompact.needsCompaction(this.messages) !== 'none') {
      this.emit('pre-compact', { type: 'micro', count: this.messages.length });
      yield { type: 'compact_start', level: 'micro' };

      const result = this.microCompact.compact(this.messages);
      if (result.boundary) {
        this.messages.push({
          type: 'system',
          subtype: 'compact_boundary',
          content: result.boundary,
          timestamp: new Date().toISOString(),
        });
      }

      this.stats.microCompacts++;
      yield { type: 'compact_end', stats: result.stats };
      this.emit('post-compact', result.stats);
    }

    // Snip Compact (手动触发)
    if (this.snipCompact.needsSnip(this.messages)) {
      this.emit('pre-compact', { type: 'snip', count: this.messages.length });
      yield { type: 'snip_warning', message: 'Context is getting large. Consider /compact to free space.' };
    }
  }

  async *_postCompact() {
    // Post-turn compact check
  }

  async *_processTurn(content) {
    this.turnCount++;
    this.stats.totalTurns++;

    // 将用户消息加入历史
    this.messages.push({
      type: 'user',
      message: {
        role: 'user',
        content: typeof content === 'string' ? content : JSON.stringify(content),
      },
      timestamp: new Date().toISOString(),
    });

    yield { type: 'turn_start', turn: this.turnCount };
    yield { type: 'result', subtype: 'success', turn: this.turnCount };
  }

  async *_yieldStatus() {
    const perm = getPerm();
    const activeTools = perm.filterTools(this.tools, this.permissionMode, this.denyRules);
    yield {
      type: 'status',
      sessionId: this.sessionId,
      state: this.state,
      turn: this.turnCount,
      messages: this.messages.length,
      tools: activeTools.length,
      permissionMode: this.permissionMode,
      forks: this.forks.size,
      stats: this.stats,
    };
  }

  _checkToolSearch() {
    if (this.toolSearch.needsToolSearch(this.tools)) {
      this.toolSearch.injectGuidance = true;
    }
  }

  _filterToolsForAgent(agentType) {
    const perm = getPerm();
    const { getBuiltinAgentTypes, findAgentType, getEffectiveTools } = require('./AgentTypes.cjs');
    const agent = findAgentType(agentType);
    if (!agent) return this.tools;
    return getEffectiveTools(agent, this.tools);
  }

  /**
   * 事件监听
   */
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  emit(event, data) {
    for (const cb of this.listeners[event] || []) {
      try { cb(data); } catch (e) { /* best-effort */ }
    }
  }

  /**
   * 获取统计
   */
  getStats() {
    return {
      ...this.stats,
      sessionId: this.sessionId,
      state: this.state,
      messages: this.messages.length,
      forks: this.forks.size,
      uptime: Date.now() - this.startTime,
      model: this.model,
    };
  }

  /**
   * 重置
   */
  reset() {
    this.abort();
    this.messages = [];
    this.turnCount = 0;
    this.forks.clear();
    this.microCompact.reset();
    this.snipCompact.reset();
    this.state = SessionState.IDLE;
  }
}

module.exports = {
  SessionEngine,
  SessionState,
};
