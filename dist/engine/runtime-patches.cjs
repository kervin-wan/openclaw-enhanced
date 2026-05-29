/**
 * runtime-patches.cjs - Enhanced runtime hooks
 *
 * Provides runtime monkey-patches for deep pipeline integration points
 * that can't be reached via direct file modifications:
 *
 * 1. Message compression (MicroCompact) - wraps context preparation
 * 2. ToolSearch guidance - injected via system prompt
 * 3. ForkAgent - wraps sessions_spawn tool
 * 4. AgentTypes - guidance in system prompt
 */

const path = require('path');
const fs = require('fs');

// Lazy-loaded IntegrationBridge
let _bridge = null;
function getBridge() {
  if (!_bridge) {
    try { _bridge = require('./IntegrationBridge.cjs'); }
    catch (_e) { _bridge = null; }
  }
  return _bridge;
}

// ============================================================
// 1. Message Compression (MicroCompact + SnipCompact)
// ============================================================

/**
 * Compress messages using MicroCompact.
 * Call this before messages are sent to the LLM provider.
 *
 * @param {Array} messages - The messages array to compress
 * @param {Object} opts - Options
 * @returns {{ messages: Array, boundary: string|null, stats: Object }}
 */
function applyMessageCompression(messages, opts = {}) {
  const bridge = getBridge();
  if (!bridge) return { messages, boundary: null, stats: { level: 'none' } };

  const mc = bridge.getMicroCompact();
  const result = mc.compact(messages);

  // If many messages (> threshold), also check for snip compact
  if (opts.allowSnip && messages.length > 80) {
    const snip = bridge.getSnipCompact();
    const snipResult = snip.snip(messages);
    if (snipResult.stats?.level !== 'none') {
      return {
        messages: snipResult.messages,
        boundary: (result.boundary || '') + (snipResult.boundary ? '\n' + snipResult.boundary : ''),
        stats: { ...result.stats, snip: snipResult.stats },
      };
    }
  }

  return result;
}

/**
 * Build ToolSearch guidance text for system prompt injection.
 * Returns null if tool search is not needed.
 */
function buildToolSearchGuidance(tools) {
  const bridge = getBridge();
  if (!bridge) return null;

  const ts = bridge.getToolSearch();
  if (!ts.needsToolSearch(tools)) return null;

  return ts.buildGuidancePrompt();
}

// ============================================================
// 2. ForkAgent - enhanced sessions_spawn
// ============================================================

/**
 * Enhanced spawn with Fork support.
 *
 * When enabled, forks inherit the parent session's context instead of starting fresh.
 * The agent system prompt already covers fork behavior guidance.
 *
 * @param {Object} options - Original spawn options
 * @param {string} parentSessionId - Parent session key
 * @returns {Object} Enhanced spawn options
 */
function enhanceSpawnOptions(options, parentSessionId) {
  const bridge = getBridge();
  if (!bridge) return options;

  const fg = bridge.getFeatureGate();
  if (!fg.isEnabled('fork_subagent')) return options;

  // Add fork-specific settings to the spawn options
  return {
    ...options,
    _enhanced: true,
    _forkParent: parentSessionId,
    _agentTypeGuidance: bridge.getAgentTypeGuidance(),
  };
}

/**
 * Build coordinator guidance for multi-agent task distribution.
 */
function buildCoordinatorGuidance() {
  const bridge = getBridge();
  if (!bridge) return null;

  const fg = bridge.getFeatureGate();
  if (!fg.isEnabled('coordinator')) return null;

  const coord = bridge.getCoordinator();
  const stats = coord.getStats();

  return `
## Multi-Agent Coordination (Coordinator)
You have access to a Coordinator for distributing complex tasks across multiple worker agents.
**Active:** ${stats.workers.total} workers | **Use sessions_spawn with fork=true** for parallel task distribution.

When to use multi-agent coordination:
- Large-scale code analysis: spawn explore agents on different code paths
- Multi-source research: spawn search agents in parallel
- Parallel testing: spawn review agents on different modules
- Complex refactoring: one agent per file/subsystem

Coordination pattern:
1. Analyze the task and identify independent sub-tasks
2. Spawn worker agents with fork=true (they inherit your context)
3. Wait for results, then synthesize a final answer
`;
}

// ============================================================
// 3. MCP Bridge enhancement
// ============================================================

/**
 * Build MCP tools guidance for system prompt.
 * Detects connected MCP servers and generates tool descriptions.
 */
function buildMCPGuidance() {
  const bridge = getBridge();
  if (!bridge) return null;

  const fg = bridge.getFeatureGate();
  if (!fg.isEnabled('mcp_integration')) return null;

  const mcp = bridge.getMcpBridge();
  const stats = mcp.getStats ? mcp.getStats() : null;

  if (!stats || stats.servers?.total === 0) {
    // Return placeholder guidance about MCP capability
    return `
## MCP Integration
MCP (Model Context Protocol) servers can be connected via configuration.
Connected servers expose additional tools from external services.
To connect: configure \`mcp.servers\` in your openclaw config.
`;
  }

  return `
## Connected MCP Servers
MCP manager stats: ${stats.servers?.connected || 0} connected, ${stats.servers?.total || 0} total.
${stats.tools ? `Available external tools: ${stats.tools}` : ''}
`;
}

// ============================================================
// 4. Plugin Enhanced - lifecycle hooks
// ============================================================

/**
 * Notify enhanced plugin system of session lifecycle events.
 */
function notifyPluginLifecycle(event, sessionId, data = {}) {
  const bridge = getBridge();
  if (!bridge) return;

  const fg = bridge.getFeatureGate();
  if (!fg.isEnabled('plugin_enhanced')) return;

  const pe = bridge.getPluginEnhanced();
  if (pe && typeof pe.notify === 'function') {
    pe.notify(event, sessionId, data);
  }
}

// ============================================================
// 5. RemoteBridge + SDKLayer status
// ============================================================

/**
 * Get enhanced runtime status for diagnostics.
 */
function getEnhancedStatus() {
  const bridge = getBridge();
  if (!bridge) return { enhanced: false };

  return bridge.getStatus();
}

/**
 * Build RemoteBridge guidance for system prompt.
 */
function buildRemoteBridgeGuidance() {
  const bridge = getBridge();
  if (!bridge) return null;

  const fg = bridge.getFeatureGate();
  if (!fg.isEnabled('remote_bridge')) return null;

  return `
## Remote Bridge
Remote control is available via the gateway WebSocket (same auth as Control UI).
Gateway methods: \`remote.status\`, \`remote.connect\`, \`remote.disconnect\`, \`remote.send\`
`;
}

/**
 * Build SDKLayer guidance for system prompt.
 */
function buildSDKLayerGuidance() {
  const bridge = getBridge();
  if (!bridge) return null;

  const fg = bridge.getFeatureGate();
  if (!fg.isEnabled('sdk_layer')) return null;

  const sm = bridge.getSdkLayer();
  return `
## SDK Layer
Programmatic access is available via gateway WebSocket methods (no HTTP endpoints exposed):
- \`sdk.prompt\` - one-shot Q&A
- \`sdk.createSession\` - create persistent session
- \`sdk.session.send\` / \`sdk.session.fork\` / \`sdk.session.abort\` - session operations
- \`sdk.listSessions\` / \`sdk.status\` - management
Active sessions: ${sm.listSessions ? sm.listSessions().length : 0}
`;
}

/**
 * Check if RemoteBridge is running.
 */
function isRemoteBridgeRunning() {
  const bridge = getBridge();
  if (!bridge) return false;

  const rb = bridge.getRemoteBridge();
  return rb ? rb.isRunning ? rb.isRunning() : false : false;
}

// ============================================================
// 6. All-in-one pre-request pipeline
// ============================================================

/**
 * Full pre-request pipeline: compression + tool search + permission filtering
 * Called before each agent turn.
 */
function preRequestPipeline(params = {}) {
  const bridge = getBridge();
  if (!bridge) return params;

  const { messages, tools, permissionMode, denyRules, sessionId } = params;

  // 1. Compress messages
  let processedMessages = messages;
  let boundary = null;
  if (messages && messages.length > 0) {
    const compResult = applyMessageCompression(messages);
    processedMessages = compResult.messages;
    boundary = compResult.boundary;
  }

  // 2. Tool search
  let searchInfo = null;
  if (tools && tools.length > 0) {
    searchInfo = buildToolSearchGuidance(tools);
  }

  // 3. Permission filter (applied per-tool at execution time)

  return {
    ...params,
    messages: processedMessages,
    tools,
    boundary,
    searchInfo,
  };
}

/**
 * Build AgentTypes guidance for system prompt.
 * Injects the available sub-agent types and when to use them.
 */
function buildAgentTypeGuidance() {
  const bridge = getBridge();
  if (!bridge) return null;

  const fg = bridge.getFeatureGate();
  if (!fg.isEnabled('fork_subagent')) return null;

  try {
    const { formatAgentTypeList } = require('./AgentTypes.cjs');
    const types = formatAgentTypeList();
    if (!types || types.trim().length === 0) return null;
    return `
## Sub-Agent Types
When spawning sub-agents (sessions_spawn), you can specify an agent type:
${types}
`;
  } catch (_e) { return null; }
}

/**
 * Build thinking-mode guidance for system prompt.
 */
function buildThinkingGuidance() {
  const bridge = getBridge();
  if (!bridge) return null;

  const status = bridge.getThinkingStatus();
  if (!status || !status.enabled) return null;

  const modeLabel = status.mode === 'auto'
    ? `自动开启（原因: ${status.autoReason || '复杂任务'}）`
    : '手动开启';

  return `
## Thinking Mode
🧠 Deep thinking mode is **active** (${modeLabel}).
- Take time to reason through complex problems thoroughly.
- Break down multi-step tasks before executing.
- Consider edge cases and alternative approaches.
- Your thinking process will be visible to the user.
`;
}

// ============================================================
// Export
// ============================================================

module.exports = {
  applyMessageCompression,
  buildToolSearchGuidance,
  buildCoordinatorGuidance,
  buildRemoteBridgeGuidance,
  buildSDKLayerGuidance,
  buildMCPGuidance,
  buildAgentTypeGuidance,
  buildThinkingGuidance,
  enhanceSpawnOptions,
  notifyPluginLifecycle,
  getEnhancedStatus,
  isRemoteBridgeRunning,
  preRequestPipeline,
};
