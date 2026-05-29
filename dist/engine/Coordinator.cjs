/**
 * Coordinator — 多 Agent 协调模式
 *
 * Coordinator 分发任务给多个 Worker Agent，收集结果。
 * Worker 有受限工具集，Coordinator 有完整工具集。
 */

const { SessionEngine } = require('./SessionEngine.cjs');

/** 协调器角色 */
const Roles = {
  COORDINATOR: 'coordinator',
  WORKER: 'worker',
};

/** Worker 默认允许的工具 */
const WORKER_ALLOWED_TOOLS = [
  'read', 'grep', 'find', 'web_search', 'web_fetch',
  'exec', 'write', 'edit',
];

/** Coordinator 独有的工具 */
const COORDINATOR_ONLY_TOOLS = [
  'sessions_spawn', 'sessions_send', 'message',
  'gateway', 'cron',
];

class Coordinator {
  constructor(config = {}) {
    this.workers = new Map();
    this.tasks = new Map();
    this.engine = new SessionEngine({
      model: config.model,
      tools: config.tools,
      permissionMode: 'bypass',
    });
    this.role = Roles.COORDINATOR;
  }

  /**
   * 创建 Worker Agent
   */
  createWorker(config) {
    const workerId = `worker-${config.name || Date.now()}`;

    const workerTools = config.tools || WORKER_ALLOWED_TOOLS;
    const coordinatorTools = config.coordinatorOnly || COORDINATOR_ONLY_TOOLS;

    const worker = new SessionEngine({
      sessionId: workerId,
      model: config.model || this.engine.model,
      tools: workerTools.filter(t => !coordinatorTools.includes(typeof t === 'string' ? t : t.name)),
      permissionMode: 'bypass',
      workspaceDir: this.engine.workspaceDir,
    });

    this.workers.set(workerId, {
      engine: worker,
      name: config.name || workerId,
      role: Roles.WORKER,
      status: 'idle',
      allowedTools: workerTools,
      disallowedTools: coordinatorTools,
      createdAt: new Date().toISOString(),
    });

    return worker;
  }

  /**
   * 分派任务给 Worker
   */
  async *dispatch(workerId, task) {
    const workerInfo = this.workers.get(workerId);
    if (!workerInfo) {
      yield { type: 'error', message: `Worker ${workerId} not found` };
      return;
    }

    const taskId = `task-${Date.now()}`;
    workerInfo.status = 'working';

    this.tasks.set(taskId, {
      workerId,
      description: task.description || 'Unnamed task',
      startedAt: new Date().toISOString(),
      status: 'running',
    });

    yield { type: 'task_dispatched', taskId, workerId, worker: workerInfo.name };

    try {
      for await (const event of workerInfo.engine.submitMessage(task.prompt)) {
        yield { ...event, workerId, taskId };
      }
      workerInfo.status = 'idle';
      this.tasks.get(taskId).status = 'completed';
      yield { type: 'task_completed', taskId, workerId };
    } catch (e) {
      workerInfo.status = 'error';
      this.tasks.get(taskId).status = 'failed';
      yield { type: 'task_failed', taskId, workerId, error: e.message };
    }
  }

  /**
   * 并行分派任务给多个 Worker
   */
  async *dispatchParallel(assignments) {
    const generators = assignments.map(({ workerId, task }) =>
      this.dispatch(workerId, task)
    );

    // Round-robin yield from each generator
    const done = new Set();
    while (done.size < generators.length) {
      for (let i = 0; i < generators.length; i++) {
        if (done.has(i)) continue;
        const { value, done: isDone } = await generators[i].next();
        if (isDone) { done.add(i); continue; }
        if (value) yield value;
      }
    }
  }

  /**
   * 列出所有 Worker 及其状态
   */
  listWorkers() {
    return [...this.workers.entries()].map(([id, info]) => ({
      id,
      name: info.name,
      status: info.status,
    }));
  }

  /**
   * 列出所有任务
   */
  listTasks() {
    return [...this.tasks.entries()].map(([id, info]) => ({
      id,
      workerId: info.workerId,
      description: info.description,
      status: info.status,
    }));
  }

  /**
   * 获取统计
   */
  getStats() {
    const workerStates = { idle: 0, working: 0, error: 0 };
    for (const [, info] of this.workers) {
      workerStates[info.status] = (workerStates[info.status] || 0) + 1;
    }
    return {
      workers: { total: this.workers.size, ...workerStates },
      tasks: { total: this.tasks.size, completed: [...this.tasks.values()].filter(t => t.status === 'completed').length },
    };
  }
}

module.exports = {
  Coordinator,
  Roles,
  WORKER_ALLOWED_TOOLS,
  COORDINATOR_ONLY_TOOLS,
};
