/**
 * HookIntegration — Hook 系统与 Gateway 的集成层
 *
 * 提供：
 * 1. Session-scoped HookSystem 实例管理
 * 2. Hook 指导注入到系统提示词
 * 3. 事件拦截包装器
 */

const { HookSystem, HookEvent, createHookSystem } = require('./HookSystem.cjs');

/**
 * Session-scoped HookSystem 管理器
 * 每个 session 有自己的 HookSystem 实例
 */
class HookManager {
  constructor() {
    /** @type {Map<string, HookSystem>} */
    this.sessions = new Map();
    /** 全局 hooks（所有 session 共享） */
    this.globalHooks = new HookSystem();
    /** 配置目录 */
    this.configDir = null;
  }

  /**
   * 获取或创建 session 的 HookSystem
   */
  getForSession(sessionId) {
    if (!this.sessions.has(sessionId)) {
      const system = new HookSystem();
      // 继承全局 hooks
      system.registerAll(this.globalHooks.registrations);
      this.sessions.set(sessionId, system);
    }
    return this.sessions.get(sessionId);
  }

  /**
   * 清理 session hooks
   */
  cleanupSession(sessionId) {
    this.sessions.delete(sessionId);
  }

  /**
   * 从配置文件加载全局 hooks
   */
  loadGlobalHooks(configDir) {
    this.configDir = configDir;
    let count = 0;

    try {
      const hookFile = `${configDir}/hooks.md`;
      if (require('fs').existsSync(hookFile)) {
        count += this.globalHooks.loadFromFile(hookFile);
      }
    } catch (e) { /* ignore */ }

    return count;
  }

  /**
   * 拦截 PreToolUse 事件
   */
  async onPreToolUse(sessionId, toolName, input) {
    const hooks = this.getForSession(sessionId);
    const results = await hooks.execute(HookEvent.PRE_TOOL_USE, {
      toolName,
      input: JSON.stringify(input),
      sessionId,
    });
    return {
      blocked: hooks.isBlocked(results),
      feedback: hooks.formatResults(results),
      results,
    };
  }

  /**
   * 拦截 PostToolUse 事件
   */
  async onPostToolUse(sessionId, toolName, input, output, isError) {
    const hooks = this.getForSession(sessionId);
    const results = await hooks.execute(
      isError ? HookEvent.POST_TOOL_USE_FAILURE : HookEvent.POST_TOOL_USE,
      {
        toolName,
        input: JSON.stringify(input),
        output: typeof output === 'string' ? output.substring(0, 500) : '',
        isError: String(isError),
        sessionId,
      }
    );
    return {
      feedback: hooks.formatResults(results),
      results,
    };
  }

  /**
   * 拦截 SessionStart/End
   */
  async onSessionEvent(event, sessionId, metadata = {}) {
    const hooks = this.getForSession(sessionId);
    const results = await hooks.execute(event, { sessionId, ...metadata });
    return {
      feedback: hooks.formatResults(results),
      results,
    };
  }

  /**
   * 拦截通知事件
   */
  async onNotification(sessionId, message) {
    const hooks = this.getForSession(sessionId);
    const results = await hooks.execute(HookEvent.NOTIFICATION, {
      sessionId,
      message: message.substring(0, 500),
    });
    return {
      feedback: hooks.formatResults(results),
      results,
    };
  }
}

/**
 * 注入到系统提示词的 Hook 指导
 */
function buildHookGuidancePrompt() {
  return `# Hooks
Users may configure hooks — shell commands that execute in response to events like tool calls, session start, notifications, etc. Hooks are configured in hooks.md in the project directory.

- Treat stdout feedback from hooks as additional context from the user.
- If a hook blocks a tool call (exit code 2), determine if you can adjust your actions.
- If blocked repeatedly, ask the user to check their hooks configuration.

Events: ${Object.values(HookEvent).join(', ')}`;
}

/**
 * 获取所有 hook 事件类型
 */
function getHookEventTypes() {
  return Object.values(HookEvent);
}

module.exports = {
  HookManager,
  buildHookGuidancePrompt,
  getHookEventTypes,
  HookEvent,
};
