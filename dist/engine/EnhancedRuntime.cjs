/**
 * EnhancedRuntime — 运行时集成桥
 * 将增强引擎模块连接到 gateway 实时管线
 */

const { MicroCompactEngine } = require('./MicroCompact.cjs');
const { SnipCompactEngine } = require('./SnipCompact.cjs');
const { PermissionMode, filterTools, checkToolPermission } = require('./PermissionFilter.cjs');
const { HookSystem, HookEvent } = require('./HookSystem.cjs');
const { ToolSearchManager } = require('./ToolSearch.cjs');
const { SessionEngine } = require('./SessionEngine.cjs');
const { FeatureGating } = require('./FeatureGating.cjs');

// Singleton instances
let _microCompact = null;
let _snipCompact = null;
let _hookSystem = null;
let _toolSearch = null;
let _featureGate = null;

function getMicroCompact() {
  if (!_microCompact) _microCompact = new MicroCompactEngine({ triggerThreshold: 30, keepRecent: 5 });
  return _microCompact;
}

function getSnipCompact() {
  if (!_snipCompact) _snipCompact = new SnipCompactEngine({ triggerThreshold: 80, autoTrigger: false });
  return _snipCompact;
}

function getHookSystem() {
  if (!_hookSystem) _hookSystem = new HookSystem();
  return _hookSystem;
}

function getToolSearch() {
  if (!_toolSearch) _toolSearch = new ToolSearchManager({ threshold: 20 });
  return _toolSearch;
}

function getFeatureGate() {
  if (!_featureGate) _featureGate = new FeatureGating();
  return _featureGate;
}

/**
 * 微压缩包装器 — 在消息数组上执行压缩
 * @returns {{ messages, boundary }}
 */
function compactMessages(messages) {
  return getMicroCompact().compact(messages);
}

/**
 * Snip 压缩包装器
 */
function snipMessages(messages) {
  return getSnipCompact().snip(messages);
}

/**
 * 权限检查包装器
 */
function checkPermission(toolName, mode, denyRules, input) {
  return checkToolPermission(toolName, mode, denyRules, input);
}

/**
 * 工具过滤包装器
 */
function filterToolsByMode(tools, mode, denyRules) {
  return filterTools(tools, mode, denyRules);
}

/**
 * Hook 执行包装器
 */
async function executeHooks(event, context) {
  return getHookSystem().execute(event, context);
}

/**
 * 注册 Hook
 */
function registerHook(reg) {
  getHookSystem().register(reg);
}

/**
 * 工具搜索包装器
 */
function searchTools(query, tools) {
  const ts = getToolSearch();
  ts.needsToolSearch(tools);
  return {
    results: ts.search(query),
    needsSearch: ts.searchEnabled,
    shortTools: ts.getShortTools(),
    guidance: ts.buildGuidancePrompt(),
  };
}

/**
 * 功能检查包装器
 */
function isFeatureEnabled(featureId) {
  return getFeatureGate().isEnabled(featureId);
}

/**
 * 初始化默认功能
 */
function initDefaultFeatures() {
  const fg = getFeatureGate();
  fg.registerFeatures({
    fork_subagent: { enabled: true, description: 'Fork subagent with context inheritance' },
    micro_compact: { enabled: true, description: 'Auto-clean old tool results' },
    snip_compact: { enabled: false, description: 'Aggressive context compression (manual trigger)' },
    tool_search: { enabled: true, description: 'Tool search when pool > 20' },
    hooks: { enabled: true, description: 'Shell hook execution on events' },
    verification_agent: { enabled: true, description: 'Independent verification agent' },
    permission_filter: { enabled: true, description: 'Permission mode filtering' },
  });
  return fg;
}

/**
 * 注册默认 hooks
 */
function registerDefaultHooks() {
  const hs = getHookSystem();
  // PostToolUse: log all tool calls
  hs.register({ event: HookEvent.POST_TOOL_USE, command: 'echo "[Enhanced] Tool $(echo $HOOK_CONTEXT | grep -o \'"toolName":"[^"]*"\' | cut -d\'"\' -f4) completed" >&2', source: 'enhanced-builtin' });
  return hs;
}

module.exports = {
  getMicroCompact, getSnipCompact, getHookSystem, getToolSearch, getFeatureGate,
  compactMessages, snipMessages, checkPermission, filterToolsByMode,
  executeHooks, registerHook, searchTools, isFeatureEnabled,
  initDefaultFeatures, registerDefaultHooks,
  MicroCompactEngine, SnipCompactEngine, HookSystem, HookEvent,
  ToolSearchManager, PermissionMode, SessionEngine, FeatureGating,
};
