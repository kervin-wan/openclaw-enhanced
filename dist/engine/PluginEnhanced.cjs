/**
 * PluginEnhanced — 增强版插件系统
 *
 * 在现有 ClawdHub 基础上增加：
 * - 完整的插件生命周期（onRegister → onSessionStart → onSessionEnd）
 * - 插件能力声明（tools/hooks/commands/agents）
 * - 热重载支持
 */

const path = require('path');
const fs = require('fs');

/**
 * 插件清单
 */
class PluginManifest {
  constructor(config) {
    this.id = config.id || '';
    this.name = config.name || this.id;
    this.version = config.version || '0.0.0';
    this.description = config.description || '';
    this.author = config.author || '';
    this.enabled = true;
    this.state = 'registered'; // registered | loaded | active | error
    this.error = null;
  }
}

/**
 * 插件能力声明
 */
class PluginCapabilities {
  constructor() {
    this.tools = [];       // 提供的工具定义
    this.hooks = [];       // 注册的 hooks
    this.commands = [];    // 注册的命令
    this.agents = [];      // 提供的 agent 类型
    this.skills = [];      // 注册的 skills
  }
}

/**
 * 增强版插件注册器
 */
class PluginRegistry {
  constructor() {
    /** @type {Map<string, PluginManifest>} */
    this.plugins = new Map();
    /** @type {Map<string, PluginCapabilities>} */
    this.capabilities = new Map();
    /** @type {Array} 加载历史 */
    this.loadLog = [];
  }

  /**
   * 注册插件
   * @param {Object} manifest - 插件清单
   * @param {Object} [capabilities] - 插件能力
   */
  register(manifest, capabilities = null) {
    if (this.plugins.has(manifest.id)) {
      throw new Error(`Plugin ${manifest.id} already registered`);
    }

    const pm = new PluginManifest(manifest);
    this.plugins.set(manifest.id, pm);

    if (capabilities) {
      this.capabilities.set(manifest.id, capabilities);
    }

    this.loadLog.push({
      timestamp: new Date().toISOString(),
      pluginId: manifest.id,
      action: 'registered',
    });

    return pm;
  }

  /**
   * 加载插件（执行 onRegister 回调）
   */
  async load(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) throw new Error(`Plugin ${pluginId} not found`);

    plugin.state = 'loaded';

    // 调用 onRegister
    const caps = this.capabilities.get(pluginId);
    if (caps && typeof caps.onRegister === 'function') {
      try {
        await caps.onRegister({ pluginId, registry: this });
        plugin.state = 'active';
      } catch (e) {
        plugin.state = 'error';
        plugin.error = e.message;
      }
    } else {
      plugin.state = 'active';
    }

    this.loadLog.push({
      timestamp: new Date().toISOString(),
      pluginId,
      action: 'loaded',
      state: plugin.state,
    });

    return plugin;
  }

  /**
   * 批量加载
   */
  async loadAll() {
    const results = [];
    for (const [id] of this.plugins) {
      try {
        results.push(await this.load(id));
      } catch (e) {
        results.push({ id, state: 'error', error: e.message });
      }
    }
    return results;
  }

  /**
   * 卸载插件
   */
  async unload(pluginId) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) return;

    const caps = this.capabilities.get(pluginId);
    if (caps && typeof caps.onUnregister === 'function') {
      try {
        await caps.onUnregister({ pluginId, registry: this });
      } catch (e) {
        /* best-effort cleanup */
      }
    }

    plugin.state = 'registered';
    plugin.enabled = false;
  }

  /**
   * 获取所有活跃插件的工具
   */
  getActiveTools() {
    const tools = [];
    for (const [id, caps] of this.capabilities) {
      const plugin = this.plugins.get(id);
      if (plugin && plugin.state === 'active' && plugin.enabled) {
        tools.push(...(caps.tools || []));
      }
    }
    return tools;
  }

  /**
   * 获取所有活跃插件的 hooks
   */
  getActiveHooks() {
    const hooks = [];
    for (const [id, caps] of this.capabilities) {
      const plugin = this.plugins.get(id);
      if (plugin && plugin.state === 'active' && plugin.enabled) {
        hooks.push(...(caps.hooks || []));
      }
    }
    return hooks;
  }

  /**
   * 获取所有活跃插件的 agent 类型
   */
  getActiveAgents() {
    const agents = [];
    for (const [id, caps] of this.capabilities) {
      const plugin = this.plugins.get(id);
      if (plugin && plugin.state === 'active' && plugin.enabled) {
        agents.push(...(caps.agents || []));
      }
    }
    return agents;
  }

  /**
   * Session 生命周期通知
   */
  async notifySessionStart(sessionId) {
    for (const [id, caps] of this.capabilities) {
      const plugin = this.plugins.get(id);
      if (plugin && plugin.state === 'active' && typeof caps.onSessionStart === 'function') {
        try { await caps.onSessionStart(sessionId); } catch (e) { /* best-effort */ }
      }
    }
  }

  async notifySessionEnd(sessionId) {
    for (const [id, caps] of this.capabilities) {
      const plugin = this.plugins.get(id);
      if (plugin && plugin.state === 'active' && typeof caps.onSessionEnd === 'function') {
        try { await caps.onSessionEnd(sessionId); } catch (e) { /* best-effort */ }
      }
    }
  }

  /**
   * 获取统计
   */
  getStats() {
    let active = 0, loaded = 0, registered = 0, error = 0;
    for (const [, p] of this.plugins) {
      if (!p.enabled) continue;
      if (p.state === 'active') active++;
      else if (p.state === 'loaded') loaded++;
      else if (p.state === 'registered') registered++;
      else if (p.state === 'error') error++;
    }
    return {
      total: this.plugins.size,
      active, loaded, registered, error,
      tools: this.getActiveTools().length,
      hooks: this.getActiveHooks().length,
      agents: this.getActiveAgents().length,
    };
  }

  /**
   * 热重载
   */
  async reload(pluginId) {
    await this.unload(pluginId);
    return this.load(pluginId);
  }
}

module.exports = {
  PluginManifest,
  PluginCapabilities,
  PluginRegistry,
};
