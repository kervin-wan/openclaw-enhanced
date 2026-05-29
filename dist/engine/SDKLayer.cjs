/**
 * SDKLayer — 公开 SDK API 层
 *
 * 提供标准化接口供外部程序调用：
 * - prompt: 一次性问答
 * - createSession: 创建持久会话
 * - resumeSession: 恢复会话
 * - session.send/abort/fork
 * - list/get/rename/delete sessions
 */

const { SessionEngine, SessionState } = require('./SessionEngine.cjs');

/**
 * SDK 配置
 * @typedef {Object} SDKOptions
 * @property {string} [model]
 * @property {string} [permissionMode]
 * @property {number} [maxTurns]
 * @property {number} [maxBudgetUsd]
 * @property {string} [workspaceDir]
 */

/**
 * 会话管理器 — 管理多个持久会话
 */
class SessionManager {
  constructor() {
    /** @type {Map<string, SessionEngine>} */
    this.sessions = new Map();
    /** @type {Map<string, Object>} 会话元数据 */
    this.metadata = new Map();
  }

  /**
   * 创建新会话
   * @param {SDKOptions} options
   * @returns {SessionHandle}
   */
  createSession(options = {}) {
    const engine = new SessionEngine({
      model: options.model || 'default',
      permissionMode: options.permissionMode || 'default',
      maxTurns: options.maxTurns,
      maxBudgetUsd: options.maxBudgetUsd,
      workspaceDir: options.workspaceDir || process.cwd(),
      tools: options.tools || [],
    });

    this.sessions.set(engine.sessionId, engine);
    this.metadata.set(engine.sessionId, {
      createdAt: new Date().toISOString(),
      title: options.title || 'Untitled',
      tags: options.tags || [],
    });

    return new SessionHandle(engine, this);
  }

  /**
   * 恢复已有会话
   * @param {string} sessionId
   * @returns {SessionHandle|null}
   */
  resumeSession(sessionId) {
    const engine = this.sessions.get(sessionId);
    if (!engine) return null;
    return new SessionHandle(engine, this);
  }

  /**
   * 列出所有会话
   * @param {Object} [opts]
   * @returns {Array}
   */
  listSessions(opts = {}) {
    const { limit = 50, offset = 0 } = opts;
    const entries = [...this.sessions.entries()];
    return entries.slice(offset, offset + limit).map(([id, engine]) => ({
      sessionId: id,
      state: engine.state,
      messages: engine.messages.length,
      turns: engine.stats.totalTurns,
      forks: engine.forks.size,
      ...this.metadata.get(id) || {},
    }));
  }

  /**
   * 获取会话消息
   */
  getSessionMessages(sessionId, opts = {}) {
    const engine = this.sessions.get(sessionId);
    if (!engine) return [];
    const { limit, offset = 0 } = opts;
    return engine.messages.slice(offset, limit ? offset + limit : undefined);
  }

  /**
   * 重命名会话
   */
  renameSession(sessionId, title) {
    const meta = this.metadata.get(sessionId);
    if (meta) meta.title = title;
  }

  /**
   * 标签会话
   */
  tagSession(sessionId, tag) {
    const meta = this.metadata.get(sessionId);
    if (!meta) return;
    if (tag === null) { meta.tags = []; return; }
    if (!meta.tags.includes(tag)) meta.tags.push(tag);
  }

  /**
   * 删除会话
   */
  deleteSession(sessionId) {
    const engine = this.sessions.get(sessionId);
    if (engine) engine.abort();
    this.sessions.delete(sessionId);
    this.metadata.delete(sessionId);
  }
}

/**
 * 会话句柄 — 用户操作的接口
 */
class SessionHandle {
  constructor(engine, manager) {
    this._engine = engine;
    this._manager = manager;
  }

  get sessionId() { return this._engine.sessionId; }
  get state() { return this._engine.state; }

  /**
   * 发送消息
   */
  async *send(message) {
    yield* this._engine.submitMessage(message);
  }

  /**
   * 中断
   */
  abort() {
    this._engine.abort();
  }

  /**
   * Fork 子会话
   */
  fork(options) {
    return this._engine.fork(options);
  }

  /**
   * 获取消息历史
   */
  getMessages() {
    return [...this._engine.messages];
  }

  /**
   * 获取统计
   */
  getStats() {
    return this._engine.getStats();
  }
}

/**
 * 一次性问答（便利函数）
 * @param {string} message
 * @param {SDKOptions} options
 * @returns {Promise<Object>}
 */
async function prompt(message, options = {}) {
  const engine = new SessionEngine({
    model: options.model || 'default',
    maxTurns: 1,
    workspaceDir: options.workspaceDir || process.cwd(),
    tools: options.tools || [],
  });

  const events = [];
  for await (const event of engine.submitMessage(message)) {
    events.push(event);
  }

  const result = events.find(e => e.type === 'result');
  return {
    result: result?.result || '',
    sessionsId: engine.sessionId,
    turns: engine.turnCount,
    messages: engine.messages,
  };
}

module.exports = {
  SessionManager,
  SessionHandle,
  prompt,
};
