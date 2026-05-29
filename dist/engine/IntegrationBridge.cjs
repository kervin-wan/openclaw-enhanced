/**
 * IntegrationBridge — 增强版运行时集成桥
 * 
 * 将所有 22 个增强引擎模块接入 gateway 实时管线。
 * 这是增强版的核心胶水层，负责：
 * 1. 初始化全部子系统（单例模式）
 * 2. 在 gateway 管线各节点注入增强逻辑
 * 3. 暴露统一 API 供其他模块调用
 */

// ============================================================
// 模块加载
// ============================================================

const { MicroCompactEngine, COMPACTABLE_TOOLS, CLEARED_MARKER } = require('./MicroCompact.cjs');
const { SnipCompactEngine } = require('./SnipCompact.cjs');
const { HookSystem, HookEvent, createHookSystem } = require('./HookSystem.cjs');
const { HookManager } = require('./HookIntegration.cjs');
const { PermissionMode, filterTools, checkToolPermission } = require('./PermissionFilter.cjs');
const { ToolSearchManager } = require('./ToolSearch.cjs');
const { SessionEngine } = require('./SessionEngine.cjs');
const { ForkAgent } = require('./ForkAgent.cjs');
const ThinkingManager = require('./ThinkingManager.cjs');
const { ForkRuntime } = require('./ForkRuntime.cjs');
const { AgentTypes, getAgentType } = require('./AgentTypes.cjs');
const { Coordinator } = require('./Coordinator.cjs');
const { FeatureGating } = require('./FeatureGating.cjs');
const { MCPManager } = require('./MCPBridge.cjs');
const { RemoteBridge } = require('./RemoteBridge.cjs');
const { SessionManager } = require('./SDKLayer.cjs');
const { PluginRegistry } = require('./PluginEnhanced.cjs');
const {
  buildEnhancedSystemPrompt,
  generateCacheKey,
  recordCacheStats,
  PROMPT_CACHE_BOUNDARY,
} = require('./EnhancedSystemPrompt.cjs');
const { PromptBuilder, staticBlock, sessionBlock, turnBlock } = require('./PromptBuilder.cjs');
const { getStaticBlocks, PROMPT_CACHE_BOUNDARY: BLOCK_BOUNDARY } = require('./PromptBlock.cjs');
const { assembleWithBoundary, getStaticCacheKey } = require('./PromptCache.cjs');

// Enhanced: Thinking Manager for auto-detect and toggle
let _thinkingModule = null;
function getThinkingModule() {
  if (!_thinkingModule) {
    try { _thinkingModule = require('./ThinkingManager.cjs'); }
    catch (_e) { _thinkingModule = null; }
  }
  return _thinkingModule;
}

// ============================================================
// 单例管理
// ============================================================

let _microCompact = null;
let _snipCompact = null;
let _hookManager = null;
let _toolSearch = null;
let _featureGate = null;
let _sessionEngine = null;
let _forkRuntime = null;

// Enhanced: hook error tracking
let _hookErrorCount = 0;
let _hookLastError = null;
let _hookLastErrorTime = 0;
function getHookErrors() { return { count: _hookErrorCount, lastError: _hookLastError, lastErrorTime: _hookLastErrorTime }; }
function recordHookError(err, source) { _hookErrorCount++; _hookLastError = (err && err.message) ? err.message : String(err); _hookLastErrorTime = Date.now(); }

let _modelTracker = null;
function getModelTracker() {
  if (!_modelTracker) {
    _modelTracker = require('./ModelQualityTracker.cjs');
  }
  return _modelTracker;
}
let _coordinator = null;
let _mcpBridge = null;
let _remoteBridge = null;
let _sdkLayer = null;
let _pluginEnhanced = null;
let _promptBuilder = null;
let _initialized = false;

function getMicroCompact() {
  if (!_microCompact) _microCompact = new MicroCompactEngine({ triggerThreshold: 30, keepRecent: 5 });
  return _microCompact;
}

function getSnipCompact() {
  if (!_snipCompact) _snipCompact = new SnipCompactEngine({ triggerThreshold: 80, autoTrigger: true });
  return _snipCompact;
}

function getHookManager() {
  if (!_hookManager) _hookManager = new HookManager();
  return _hookManager;
}

function getToolSearch() {
  if (!_toolSearch) _toolSearch = new ToolSearchManager({ threshold: 20 });
  return _toolSearch;
}

function getFeatureGate() {
  if (!_featureGate) _featureGate = new FeatureGating();
  return _featureGate;
}

function getSessionEngine() {
  if (!_sessionEngine) _sessionEngine = new SessionEngine({ tools: [] });
  return _sessionEngine;
}

function getForkRuntime() {
  if (!_forkRuntime) _forkRuntime = new ForkRuntime(getSessionEngine());
  return _forkRuntime;
}

function getCoordinator() {
  if (!_coordinator) _coordinator = new Coordinator();
  return _coordinator;
}

function getMcpBridge() {
  if (!_mcpBridge) _mcpBridge = new MCPManager();
  return _mcpBridge;
}

function getRemoteBridge() {
  if (!_remoteBridge) _remoteBridge = new RemoteBridge();
  return _remoteBridge;
}

function getSdkLayer() {
  if (!_sdkLayer) _sdkLayer = new SessionManager();
  return _sdkLayer;
}

function getPluginEnhanced() {
  if (!_pluginEnhanced) _pluginEnhanced = new PluginRegistry();
  return _pluginEnhanced;
}

function getPromptBuilder() {
  if (!_promptBuilder) {
    _promptBuilder = new PromptBuilder();
    _promptBuilder.initStaticBlocks();
  }
  return _promptBuilder;
}

// ============================================================
// 初始化
// ============================================================

function initAll(options = {}) {
  if (_initialized) return { status: 'already_initialized' };

  const log = options.log || { info: console.log, warn: console.warn, error: console.error };
  const results = { initialized: [], skipped: [], errors: [] };

  try {
    // 1. Feature Gating
    const fg = getFeatureGate();
    fg.registerFeatures({
      fork_subagent: { enabled: true, description: 'Fork subagent with context inheritance' },
      micro_compact: { enabled: true, description: 'Auto-clean old tool results' },
      snip_compact: { enabled: true, description: 'Aggressive context compression (auto-triggered)' },
      tool_search: { enabled: true, description: 'Tool search when pool > 20' },
      hooks: { enabled: true, description: 'Shell hook execution on events' },
      verification_agent: { enabled: true, description: 'Independent verification agent' },
      permission_filter: { enabled: true, description: 'Permission mode filtering' },
      mcp_integration: { enabled: true, description: 'MCP server connections' },
      plugin_enhanced: { enabled: true, description: 'Enhanced plugin lifecycle' },
      remote_bridge: { enabled: true, description: 'Remote control bridge' },
      sdk_layer: { enabled: true, description: 'External SDK API' },
      coordinator: { enabled: true, description: 'Multi-agent coordination' },
      prompt_cache: { enabled: true, description: 'Prompt cache key generation' },
      session_fork: { enabled: true, description: 'Session fork for sub-agents' },
    });
    results.initialized.push('FeatureGating');

    // 2. Hook System
    const hm = getHookManager();
    hm.globalHooks.register({
      event: HookEvent.POST_TOOL_USE,
      command: 'echo "[Enhanced] Tool completed" >&2',
      source: 'enhanced-builtin',
    });
    hm.globalHooks.register({
      event: HookEvent.SESSION_START,
      command: 'echo "[Enhanced] Session started" >&2',
      source: 'enhanced-builtin',
    });
    results.initialized.push('HookSystem');

    // 3. MicroCompact
    getMicroCompact();
    results.initialized.push('MicroCompact');

    // 4. SnipCompact
    getSnipCompact();
    results.initialized.push('SnipCompact');

    // 5. ToolSearch
    getToolSearch();
    results.initialized.push('ToolSearch');

    // 6. SessionEngine
    getSessionEngine();
    results.initialized.push('SessionEngine');

    // 7. ForkRuntime
    getForkRuntime();
    results.initialized.push('ForkRuntime');

    // 8. PromptBuilder
    getPromptBuilder();
    results.initialized.push('PromptBuilder');

    // 9. MCPManager
    if (fg.isEnabled('mcp_integration')) {
      getMcpBridge();
      results.initialized.push('MCPManager');
    } else {
      results.skipped.push('MCPManager (disabled)');
    }

    // 10. PluginRegistry
    if (fg.isEnabled('plugin_enhanced')) {
      getPluginEnhanced();
      results.initialized.push('PluginRegistry');
    } else {
      results.skipped.push('PluginRegistry (disabled)');
    }

    // 11. RemoteBridge
    if (fg.isEnabled('remote_bridge')) {
      const rb = getRemoteBridge();
      if (typeof rb.start === 'function') {
        rb.start();
      }
      results.initialized.push('RemoteBridge');
    } else {
      results.skipped.push('RemoteBridge (disabled)');
    }

    // 12. SessionManager
    if (fg.isEnabled('sdk_layer')) {
      getSdkLayer();
      results.initialized.push('SessionManager');
    } else {
      results.skipped.push('SessionManager (disabled)');
    }

    // 13. Coordinator
    if (fg.isEnabled('coordinator')) {
      getCoordinator();
      results.initialized.push('Coordinator');
    } else {
      results.skipped.push('Coordinator (disabled)');
    }

    _initialized = true;
    log.info(`[Enhanced] IntegrationBridge initialized: ${results.initialized.length} modules, ${results.skipped.length} skipped`);
  } catch (e) {
    results.errors.push(e.message);
    log.error(`[Enhanced] IntegrationBridge init error: ${e.message}`);
  }

  return results;
}

// ============================================================
// 管线注入函数
// ============================================================

/**
 * 预请求处理：压缩消息 + 权限过滤 + 工具搜索
 * 在消息发送给 LLM 之前调用
 */
function preRequestPipeline(messages, tools, options = {}) {
  const fg = getFeatureGate();
  let processed = messages;
  let compactBoundary = null;
  let filteredTools = tools;
  let searchInfo = null;

  // 1. MicroCompact
  if (fg.isEnabled('micro_compact')) {
    const result = getMicroCompact().compact(processed);
    processed = result.messages;
    compactBoundary = result.boundary;
  }

  // 2. SnipCompact (manual trigger only)
  if (fg.isEnabled('snip_compact') && options.forceSnipCompact) {
    const result = getSnipCompact().snip(processed);
    processed = result.messages;
    if (result.boundary) {
      compactBoundary = compactBoundary
        ? compactBoundary + '\n' + result.boundary
        : result.boundary;
    }
  }

  // 3. Tool Search
  if (fg.isEnabled('tool_search') && tools && tools.length > 0) {
    const ts = getToolSearch();
    if (ts.needsToolSearch(tools)) {
      searchInfo = {
        enabled: true,
        shortTools: ts.getShortTools(),
        guidance: ts.buildGuidancePrompt(),
      };
      filteredTools = tools; // keep all, search guidance injected
    }
  }

  // 4. Permission Filter
  if (fg.isEnabled('permission_filter') && options.permissionMode) {
    filteredTools = filterTools(filteredTools, options.permissionMode, options.denyRules || []);
  }

  return { messages: processed, tools: filteredTools, compactBoundary, searchInfo };
}

/**
 * 工具执行前检查
 */
function preToolCheck(toolName, input, options = {}) {
  const fg = getFeatureGate();
  if (!fg.isEnabled('permission_filter')) return { allowed: true };

  const result = checkToolPermission(
    toolName,
    options.permissionMode || PermissionMode.DEFAULT,
    options.denyRules || [],
    input
  );
  
  // Translate checkToolPermission result to uniform format
  return {
    allowed: !result.denied,
    needsApproval: result.needsApproval || false,
    reason: result.reason || (result.needsApproval ? 'requires approval' : null),
  };
}

/**
 * 执行事件 hooks
 */
async function executeEventHooks(event, context = {}, sessionId = null) {
  const fg = getFeatureGate();
  if (!fg.isEnabled('hooks')) return [];

  const hm = getHookManager();
  const hookSystem = sessionId ? hm.getForSession(sessionId) : hm.globalHooks;
  return hookSystem.execute(event, context);
}

/**
 * 构建增强版系统提示词
 */
async function buildEnhancedPrompt(originalBuilder, params, options = {}) {
  const fg = getFeatureGate();

  if (fg.isEnabled('prompt_cache')) {
    try {
      const result = await buildEnhancedSystemPrompt(params, {
        enableCacheBoundary: true,
        enableCompactAwareness: true,
        enableReport: true,
        ...options.promptOptions,
      });

      if (result.report && options.sessionId) {
        recordCacheStats(result.report, options.sessionId);
      }

      return result;
    } catch (e) {
      console.error('[Enhanced] Prompt build failed, falling back to original:', e.message);
      // Fallback to original
      const prompt = originalBuilder(params);
      return { prompt, cacheKey: null, report: null };
    }
  }

  // No cache enabled, just use original
  const prompt = originalBuilder(params);
  return { prompt, cacheKey: null, report: null };
}

/**
 * 会话生命周期事件
 */
function onSessionStart(sessionId, context = {}) {
  const fg = getFeatureGate();
  if (!fg.isEnabled('hooks')) return;

  const hm = getHookManager();
  hm.getForSession(sessionId);
  hm.globalHooks.execute(HookEvent.SESSION_START, {
    sessionId,
    ...context,
  }).catch((err) => { recordHookError(err, 'onSessionEnd'); });
}

function onSessionEnd(sessionId, context = {}) {
  const fg = getFeatureGate();
  if (!fg.isEnabled('hooks')) return;

  const hm = getHookManager();
  hm.globalHooks.execute(HookEvent.SESSION_END, {
    sessionId,
    ...context,
  }).catch((err) => { recordHookError(err, 'onSessionEnd'); });
}

/**
 * Fork 子代理
 */
function forkSubagent(parentSessionId, options = {}) {
  const fg = getFeatureGate();
  if (!fg.isEnabled('fork_subagent')) {
    throw new Error('Fork subagent feature is disabled');
  }

  const fr = getForkRuntime();
  return fr.executeFork({
    parentSessionId,
    name: options.name || 'forked-agent',
    directive: options.directive || '',
    agentType: options.agentType || AgentTypes.DEFAULT,
    ...options,
  });
}

/**
 * 获取代理类型定义（用于注入到系统提示词）
 */
function getAgentTypeGuidance() {
  return AgentTypes.buildGuidance();
}

/**
 * Thinking 模式 — turn 开始时检测复杂度并自动开启
 */
function processThinkingTurnStart(message) {
  const tm = getThinkingModule();
  if (!tm) return { notification: null, thinkingEnabled: false };
  return tm.processTurnStart(message);
}

/**
 * Thinking 模式 — turn 结束时自动关闭
 */
function processThinkingTurnEnd() {
  const tm = getThinkingModule();
  if (!tm) return { notification: null, thinkingDisabled: false };
  return tm.processTurnEnd();
}

/**
 * Thinking 模式 — 状态查询
 */
function getThinkingStatus() {
  const tm = getThinkingModule();
  return tm ? tm.getThinkingStatus() : { mode: 'off' };
}

// ============================================================
// 状态与统计
// ============================================================

function getStatus() {
  return {
    initialized: _initialized,
    modules: {
      microCompact: _microCompact ? _microCompact.getSummary() : null,
      snipCompact: _snipCompact ? _snipCompact.getStats() : null,
      hookSystem: _hookManager ? { globalHooks: _hookManager.globalHooks.getStats(), sessions: _hookManager.sessions.size } : null,
      toolSearch: _toolSearch ? { threshold: _toolSearch.threshold, enabled: _toolSearch.searchEnabled } : null,
      featureGate: _featureGate ? {
        features: _featureGate.listFeatures().length,
        list: _featureGate.listFeatures(),
      } : null,
      sessionEngine: _sessionEngine ? { forks: _sessionEngine.forks?.size || 0 } : null,
      forkRuntime: _forkRuntime ? { activeForks: _forkRuntime.listActive() } : null,
      mcpBridge: _mcpBridge ? { status: _mcpBridge.getStatus?.() || 'loaded' } : null,
      pluginEnhanced: _pluginEnhanced ? { loaded: _pluginEnhanced.loadLog?.length || 0 } : null,
      remoteBridge: _remoteBridge ? { state: _remoteBridge.state || 'loaded' } : null,
      sdkLayer: _sdkLayer ? { sessions: _sdkLayer.listSessions ? _sdkLayer.listSessions().length : 0 } : null,
      thinking: (() => {
        const tm = getThinkingModule();
        return tm ? tm.getThinkingStatus() : null;
      })(),
      hooks: getHookErrors(),
      model_quality: getModelTracker().getStats(),
    },
  };
}

// ============================================================
// 导出
// ============================================================


/**
 * 热重载 — 重置所有模块状态（不重启进程）
 * 用于配置变更后即时生效，避免硬重启
 */
function resetAll(options = {}) {
  const log = options.log || { info: console.log, warn: console.warn, error: console.error };
  const results = { reset: [], errors: [] };

  try {
    // Reset internal state flags
    _initialized = false;
    _initErrors = [];

    // Reset feature gate caches
    if (_featureGate) {
      try { _featureGate.reset?.(); } catch (_) {}
    _featureGate = null;
    }

    // Reset manager instances
    _hookManager = null;
    _microCompact = null;
    _snipCompact = null;
    _toolRegistry = null;
    _permissionFilter = null;
    _verificationAgent = null;
    _mcpBridge = null;
    _pluginEnhanced = null;
    _promptBuilder = null;
    _coordinator = null;
    _remoteBridge = null;
    _sdkLayer = null;

    // Reset hook error tracking
    _hookErrorCount = 0;
    _hookLastError = null;
    _hookLastErrorTime = 0;

    // Reset model quality tracker
    try {
      getModelTracker().reset();
      results.reset.push('ModelQualityTracker');
    } catch (_) {}

    // Reset thinking conf reader
    try {
      const tm = require('./ThinkingManager.cjs');
      tm.refresh?.();
      results.reset.push('ThinkingManager');
    } catch (_) {}

    results.reset.push('StateFlags', 'ManagerInstances', 'HookErrors');
    log.info('[Enhanced] IntegrationBridge hot-reset complete, re-initializing...');

    // Re-initialize
    const initResult = initAll(options);
    results.reset.push(...initResult.initialized);
    results.errors.push(...initResult.errors);
  } catch (e) {
    results.errors.push(e.message);
  }

  return results;
}

module.exports = {
  // 初始化
  initAll,
  getStatus,
  isInitialized: () => _initialized,

  // 引擎单例
  getMicroCompact,
  getSnipCompact,
  getHookManager,
  getToolSearch,
  getFeatureGate,
  getSessionEngine,
  getForkRuntime,
  getCoordinator,
  getMcpBridge,
  getRemoteBridge,
  getSdkLayer,
  getPluginEnhanced,
  getPromptBuilder,

  // 管线函数
  preRequestPipeline,
  preToolCheck,
  executeEventHooks,
  buildEnhancedPrompt,
  onSessionStart,
  onSessionEnd,
  forkSubagent,
  getAgentTypeGuidance,
  processThinkingTurnStart,
  processThinkingTurnEnd,
  getThinkingStatus,
  getThinkingModule,
  getHookErrors,
  getModelTracker,
  resetAll,

  // 直接暴露引擎类（供高级用法）
  MicroCompactEngine,
  SnipCompactEngine,
  HookSystem,
  HookManager,
  ToolSearchManager,
  SessionEngine,
  ForkRuntime,
  Coordinator,
  FeatureGating,
  getMcpBridge,
  RemoteBridge,
  getSdkLayer,
  PluginRegistry,

  // 常量和枚举
  HookEvent,
  PermissionMode,
  AgentTypes,
  COMPACTABLE_TOOLS,
  CLEARED_MARKER,
  PROMPT_CACHE_BOUNDARY,

  // EnhancedSystemPrompt
  buildEnhancedSystemPrompt,
  generateCacheKey,
  recordCacheStats,

  // PromptBuilder
  PromptBuilder,
  staticBlock,
  sessionBlock,
  turnBlock,
  getStaticBlocks,
};
