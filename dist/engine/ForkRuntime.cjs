/**
 * ForkRuntime — Fork 子代理运行时
 * 桥接提示词层的 Fork 指导与实际 sessions_spawn 机制
 */

class ForkRuntime {
  constructor(sessionEngine) {
    this.engine = sessionEngine;
    this.activeForks = new Map();
  }

  async *executeFork(options) {
    const fork = this.engine.fork(options);
    this.activeForks.set(fork.sessionId, { engine: fork, options, startedAt: Date.now() });

    yield { type: 'fork_started', forkId: fork.sessionId, name: options.name };

    try {
      for await (const event of fork.submitMessage(options.directive)) {
        if (event.type === 'result') {
          fork.engine.forks.get(fork.sessionId).status = 'completed';
          this.activeForks.set(fork.sessionId, { ...this.activeForks.get(fork.sessionId), status: 'completed', result: event });
          yield { type: 'fork_completed', forkId: fork.sessionId, name: options.name, result: event };
        }
      }
    } catch (e) {
      fork.engine.forks.get(fork.sessionId).status = 'failed';
      this.activeForks.set(fork.sessionId, { ...this.activeForks.get(fork.sessionId), status: 'failed', error: e.message });
      yield { type: 'fork_failed', forkId: fork.sessionId, name: options.name, error: e.message };
    }
  }

  getStatus(forkId) {
    return this.activeForks.get(forkId) || null;
  }

  listActive() {
    return [...this.activeForks.entries()].map(([id, info]) => ({ id, name: info.options?.name, status: info.status }));
  }
}

module.exports = { ForkRuntime };
