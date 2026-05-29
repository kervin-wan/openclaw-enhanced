/**
 * gateway-methods.cjs — 将 Coordinator / RemoteBridge / SDKLayer 
 * 注册为 gateway 内部方法，复用已有 WebSocket 认证，不暴露新端口。
 */

let _thinkingManager = null;
function getThinkingManager() {
  if (!_thinkingManager) {
    try { _thinkingManager = require('./ThinkingManager.cjs'); }
    catch (_e) { _thinkingManager = null; }
  }
  return _thinkingManager;
}

// ============================================================
// Thinking Manager 方法
// ============================================================

function getThinkingMethods() {
  const tm = getThinkingManager();
  if (!tm) return {};
  return tm.gatewayMethods;
}

let _bridge = null;
function getBridge() {
  if (!_bridge) {
    try { _bridge = require('./IntegrationBridge.cjs'); }
    catch (_e) { _bridge = null; }
  }
  return _bridge;
}

// ============================================================
// Coordinator 方法
// ============================================================

const coordinatorMethods = {
  'coordinator.createWorker': {
    description: 'Create a coordinator worker for multi-agent task distribution',
    handler: async (params) => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      const coord = bridge.getCoordinator();
      const worker = coord.createWorker({
        name: params.name || `worker-${Date.now()}`,
        model: params.model,
        tools: params.tools,
      });
      return { workerId: worker.sessionId, name: params.name };
    },
  },
  'coordinator.listWorkers': {
    description: 'List all coordinator workers and their status',
    handler: async () => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      return bridge.getCoordinator().listWorkers();
    },
  },
  'coordinator.stats': {
    description: 'Get coordinator statistics',
    handler: async () => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      return bridge.getCoordinator().getStats();
    },
  },
};

// ============================================================
// RemoteBridge 方法（走 gateway WebSocket，不独立端口）
// ============================================================

const remoteBridgeMethods = {
  'remote.status': {
    description: 'Get remote bridge connection status',
    handler: async () => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      const rb = bridge.getRemoteBridge();
      return { state: rb.state, stats: rb.getStats() };
    },
  },
  'remote.connect': {
    description: 'Initialize remote bridge connection via gateway WebSocket',
    handler: async (params) => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      const rb = bridge.getRemoteBridge();
      if (params.sessionUrl) rb.sessionUrl = params.sessionUrl;
      if (params.environmentId) rb.environmentId = params.environmentId;
      await rb.connect();
      return { state: rb.state, sessionUrl: rb.sessionUrl };
    },
  },
  'remote.disconnect': {
    description: 'Disconnect remote bridge',
    handler: async () => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      const rb = bridge.getRemoteBridge();
      rb.teardown();
      return { state: rb.state };
    },
  },
  'remote.send': {
    description: 'Send a message through the remote bridge',
    handler: async (params) => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      const rb = bridge.getRemoteBridge();
      rb.send(params.type || 'user_prompt', params.payload || {});
      return { sent: true };
    },
  },
};

// ============================================================
// SDKLayer 方法（走 gateway WebSocket，不暴露 HTTP）
// ============================================================

// SDKLayer prompt is a standalone function, not a SessionManager method
let _promptFn = null;
function getPromptFn() {
  if (!_promptFn) {
    try { _promptFn = require('./SDKLayer.cjs').prompt; }
    catch (_e) { _promptFn = null; }
  }
  return _promptFn;
}

const sdkMethods = {
  'sdk.prompt': {
    description: 'One-shot Q&A via SDK (no HTTP endpoint, uses gateway auth)',
    handler: async (params) => {
      const prompt = getPromptFn();
      if (!prompt) return { error: 'SDK prompt not available' };
      const result = await prompt(params.message, {
        model: params.model,
        systemPrompt: params.systemPrompt,
      });
      return result;
    },
  },
  'sdk.createSession': {
    description: 'Create a persistent SDK session',
    handler: async (params) => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      const sm = bridge.getSdkLayer();
      const session = sm.createSession({
        model: params.model,
        permissionMode: params.permissionMode,
        maxTurns: params.maxTurns,
        workspaceDir: params.workspaceDir,
      });
      return { sessionId: session.sessionId };
    },
  },
  'sdk.session.send': {
    description: 'Send a message to an SDK session',
    handler: async (params) => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      const sm = bridge.getSdkLayer();
      const sessions = sm.listSessions();
      const found = sessions.find(s => s.id === params.sessionId || s.sessionId === params.sessionId);
      if (!found) return { error: 'Session not found' };
      const session = sm.resumeSession(params.sessionId);
      if (!session) return { error: 'Could not resume session' };
      const result = await session.send(params.message);
      return result;
    },
  },
  'sdk.session.fork': {
    description: 'Fork an SDK session',
    handler: async (params) => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      const sm = bridge.getSdkLayer();
      const session = sm.resumeSession(params.sessionId);
      if (!session) return { error: 'Session not found' };
      const fork = session.fork({ directive: params.directive });
      return { forkId: fork.sessionId };
    },
  },
  'sdk.session.abort': {
    description: 'Abort an SDK session',
    handler: async (params) => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      const sm = bridge.getSdkLayer();
      const session = sm.resumeSession(params.sessionId);
      if (!session) return { error: 'Session not found' };
      session.abort();
      return { aborted: true };
    },
  },
  'sdk.listSessions': {
    description: 'List all SDK sessions',
    handler: async () => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      return bridge.getSdkLayer().listSessions();
    },
  },
  'sdk.status': {
    description: 'Get SDK layer status',
    handler: async () => {
      const bridge = getBridge();
      if (!bridge) return { error: 'Enhanced not available' };
      const sm = bridge.getSdkLayer();
      const sessions = sm.listSessions();
      return { activeSessions: sessions.length, sessions };
    },
  },
};

// ============================================================
// 功能启用
// ============================================================

function enableAllFeatureFlags() {
  const bridge = getBridge();
  if (!bridge) return { error: 'Enhanced not available' };
  const fg = bridge.getFeatureGate();
  fg.registerFeatures({
    coordinator: { enabled: true, description: 'Multi-agent coordination via sessions_spawn' },
    remote_bridge: { enabled: true, description: 'Remote control via gateway WebSocket' },
    sdk_layer: { enabled: true, description: 'SDK API via gateway methods (no HTTP)' },
  });
  return { coordinator: fg.isEnabled('coordinator'), remote_bridge: fg.isEnabled('remote_bridge'), sdk_layer: fg.isEnabled('sdk_layer') };
}

// ============================================================
// 注册到 gateway
// ============================================================

function registerGatewayMethods(gatewayContext) {
  const allMethods = getAllMethods();
  for (const [name, def] of Object.entries(allMethods)) {
    if (gatewayContext && gatewayContext.registerMethod) {
      gatewayContext.registerMethod(name, def);
    }
  }
  return { registered: Object.keys(allMethods).length, methods: Object.keys(allMethods) };
}

function getAllMethods() {
  // Enhanced: Thinking Manager methods
  let thinkingMethods = {};
  try { thinkingMethods = require('./ThinkingManager.cjs').gatewayMethods; }
  catch (_e) { /* ThinkingManager unavailable */ }
  return { ...coordinatorMethods, ...remoteBridgeMethods, ...sdkMethods, ...thinkingMethods };
}

module.exports = {
  coordinatorMethods,
  remoteBridgeMethods,
  sdkMethods,
  enableAllFeatureFlags,
  registerGatewayMethods,
  getAllMethods,
};
