/**
 * HookSystem — 事件驱动的扩展机制
 *
 * Hook 是 shell 命令，在特定事件触发时执行。
 * 反馈（stdout）被注入为"来自用户的额外上下文"。
 *
 * 参考 Claude Code 的 25 种 hook 事件类型。
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Hook 事件类型枚举
 */
const HookEvent = {
  PRE_TOOL_USE: 'PreToolUse',
  POST_TOOL_USE: 'PostToolUse',
  POST_TOOL_USE_FAILURE: 'PostToolUseFailure',
  USER_PROMPT_SUBMIT: 'UserPromptSubmit',
  SESSION_START: 'SessionStart',
  SESSION_END: 'SessionEnd',
  STOP: 'Stop',
  STOP_FAILURE: 'StopFailure',
  SUBAGENT_START: 'SubagentStart',
  SUBAGENT_STOP: 'SubagentStop',
  PRE_COMPACT: 'PreCompact',
  POST_COMPACT: 'PostCompact',
  NOTIFICATION: 'Notification',
  PERMISSION_REQUEST: 'PermissionRequest',
  PERMISSION_DENIED: 'PermissionDenied',
  CONFIG_CHANGE: 'ConfigChange',
  CWD_CHANGED: 'CwdChanged',
  FILE_CHANGED: 'FileChanged',
  TASK_CREATED: 'TaskCreated',
  TASK_COMPLETED: 'TaskCompleted',
  INSTRUCTIONS_LOADED: 'InstructionsLoaded',
};

/**
 * Hook 结果
 * - exitCode=0 → 批准/继续
 * - exitCode=2 → 阻止 + stderr 反馈给模型
 * - stdout 非空 → 作为额外上下文注入
 */

/**
 * 默认配置
 */
const DEFAULT_CONFIG = {
  /** Hook 执行超时（ms） */
  timeout: 30000,
  /** 是否并行执行匹配的 hooks */
  parallel: true,
  /** 最大并发数 */
  maxConcurrent: 5,
};

/**
 * Hook 注册项
 * @typedef {Object} HookRegistration
 * @property {string} event - 事件类型
 * @property {string} command - shell 命令
 * @property {string} [matcher] - 可选匹配器（工具名/模式）
 * @property {string} [source] - 来源（config/claude.md/plugin）
 * @property {number} [timeout] - 超时覆盖（ms）
 */

class HookSystem {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    /** @type {HookRegistration[]} */
    this.registrations = [];
    /** @type {Map<string, number>} 事件计数器 */
    this.eventCounts = new Map();
    /** @type {Array} 最近执行日志 */
    this.execLog = [];
  }

  /**
   * 注册 hook
   * @param {HookRegistration} reg
   */
  register(reg) {
    if (!reg.event || !Object.values(HookEvent).includes(reg.event)) {
      throw new Error(`Invalid hook event: ${reg.event}`);
    }
    if (!reg.command || !reg.command.trim()) {
      throw new Error('Hook command is required');
    }
    this.registrations.push({
      event: reg.event,
      command: reg.command,
      matcher: reg.matcher || null,
      source: reg.source || 'unknown',
      timeout: reg.timeout || this.config.timeout,
    });
  }

  /**
   * 批量注册
   * @param {HookRegistration[]} regs
   */
  registerAll(regs) {
    for (const reg of regs) {
      this.register(reg);
    }
  }

  /**
   * 从配置对象加载 hooks
   * @param {Object} config - { hooks: { event: string, command: string }[] }
   */
  loadFromConfig(config) {
    if (!config || !config.hooks || !Array.isArray(config.hooks)) return 0;
    let count = 0;
    for (const h of config.hooks) {
      try {
        this.register({ ...h, source: 'config' });
        count++;
      } catch (e) {
        console.error(`[HookSystem] Failed to register hook:`, e.message);
      }
    }
    return count;
  }

  /**
   * 从 CLAUDE.md / HOOKS.md 文件加载
   * 格式：## Hooks / ```hook event=PreToolUse command="..."```
   * @param {string} filePath
   */
  loadFromFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return this._parseHookFile(content);
    } catch (e) {
      console.error(`[HookSystem] Failed to load hooks from ${filePath}:`, e.message);
      return 0;
    }
  }

  /**
   * 解析 hook 文件内容
   */
  _parseHookFile(content) {
    let count = 0;
    // 匹配 ## Hook 区块或 ```hook 代码块
    const hookBlocks = content.match(/```hook[\s\S]*?```/g) || [];
    for (const block of hookBlocks) {
      // 提取 event=XXX command="..."
      const eventMatch = block.match(/event=(\w+)/);
      const cmdMatch = block.match(/command="([^"]+)"/);
      const matcherMatch = block.match(/matcher="([^"]+)"/);
      if (eventMatch && cmdMatch) {
        try {
          this.register({
            event: eventMatch[1],
            command: cmdMatch[1],
            matcher: matcherMatch?.[1] || null,
            source: 'file',
          });
          count++;
        } catch (e) { /* skip invalid */ }
      }
    }
    return count;
  }

  /**
   * 查找匹配的 hooks
   * @param {string} event
   * @param {Object} [context] - 事件上下文（如 { toolName: 'read' }）
   * @returns {HookRegistration[]}
   */
  findMatching(event, context = {}) {
    return this.registrations.filter(reg => {
      if (reg.event !== event) return false;
      if (reg.matcher) {
        // 按工具名匹配
        if (context.toolName && reg.matcher !== context.toolName) {
          // 支持通配符
          if (!reg.matcher.endsWith('*')) return false;
          if (!context.toolName.startsWith(reg.matcher.slice(0, -1))) return false;
        }
      }
      return true;
    });
  }

  /**
   * 执行匹配的 hooks
   * @param {string} event
   * @param {Object} context - 传递给 hook 的上下文数据
   * @returns {Promise<HookResult[]>}
   */
  async execute(event, context = {}) {
    const matched = this.findMatching(event, context);
    if (matched.length === 0) return [];

    // 更新计数器
    this.eventCounts.set(event, (this.eventCounts.get(event) || 0) + 1);

    const results = this.config.parallel
      ? await this._executeParallel(matched, context)
      : await this._executeSerial(matched, context);

    // 记录日志
    this.execLog.push({
      timestamp: new Date().toISOString(),
      event,
      context: Object.keys(context),
      hooksExecuted: results.length,
    });

    // 只保留最近 100 条
    if (this.execLog.length > 100) this.execLog.shift();

    return results;
  }

  /**
   * 并行执行 hooks
   */
  async _executeParallel(hooks, context) {
    // 限制并发
    const results = [];
    for (let i = 0; i < hooks.length; i += this.config.maxConcurrent) {
      const batch = hooks.slice(i, i + this.config.maxConcurrent);
      const batchResults = await Promise.allSettled(
        batch.map(h => this._executeOne(h, context))
      );
      for (const r of batchResults) {
        if (r.status === 'fulfilled') results.push(r.value);
        else results.push({ exitCode: -1, stdout: '', stderr: r.reason?.message || 'Hook execution failed', error: r.reason });
      }
    }
    return results;
  }

  /**
   * 串行执行 hooks
   */
  async _executeSerial(hooks, context) {
    const results = [];
    for (const h of hooks) {
      try {
        results.push(await this._executeOne(h, context));
      } catch (e) {
        results.push({ exitCode: -1, stdout: '', stderr: e.message, error: e });
      }
    }
    return results;
  }

  /**
   * 执行单个 hook
   */
  async _executeOne(hook, context) {
    return new Promise((resolve) => {
      const env = {
        ...process.env,
        HOOK_EVENT: hook.event,
        HOOK_CONTEXT: JSON.stringify(context),
      };

      const child = spawn('sh', ['-c', hook.command], {
        env,
        timeout: hook.timeout || this.config.timeout,
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (d) => { stdout += d.toString(); });
      child.stderr.on('data', (d) => { stderr += d.toString(); });

      child.on('close', (code) => {
        resolve({
          exitCode: code || 0,
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          event: hook.event,
          command: hook.command,
          source: hook.source,
        });
      });

      child.on('error', (err) => {
        resolve({
          exitCode: -1,
          stdout: '',
          stderr: err.message,
          error: err,
          event: hook.event,
          command: hook.command,
          source: hook.source,
        });
      });
    });
  }

  /**
   * 将 hook 结果格式化为模型可理解的消息
   * @param {HookResult[]} results
   * @returns {string|null}
   */
  formatResults(results) {
    if (results.length === 0) return null;

    const blocks = results.filter(r => r.stdout).map(r =>
      r.stdout
    );
    const blocks2 = results.filter(r => r.exitCode === 2).map(r =>
      `[BLOCKED by hook] ${r.stderr || r.command}`
    );

    return [...blocks, ...blocks2].join('\n') || null;
  }

  /**
   * 检查是否有 hook 阻止了操作
   */
  isBlocked(results) {
    return results.some(r => r.exitCode === 2);
  }

  /**
   * 获取统计
   */
  getStats() {
    return {
      totalRegistrations: this.registrations.length,
      events: Object.fromEntries(this.eventCounts),
      recentExecutions: this.execLog.slice(-10),
      bySource: {
        config: this.registrations.filter(r => r.source === 'config').length,
        file: this.registrations.filter(r => r.source === 'file').length,
        unknown: this.registrations.filter(r => r.source === 'unknown').length,
      },
    };
  }

  /**
   * 重置
   */
  reset() {
    this.registrations = [];
    this.eventCounts.clear();
    this.execLog = [];
  }
}

/**
 * 便利函数：创建预配置的 HookSystem 并加载配置文件
 * @param {Object} opts
 * @returns {HookSystem}
 */
function createHookSystem(opts = {}) {
  const system = new HookSystem(opts.config);

  if (opts.configFile) {
    system.loadFromFile(opts.configFile);
  }

  if (opts.hookConfig) {
    system.loadFromConfig(opts.hookConfig);
  }

  return system;
}

module.exports = {
  HookSystem,
  createHookSystem,
  HookEvent,
  DEFAULT_CONFIG,
};
