/**
 * RemoteBridge — 远程控制桥接
 *
 * Web ↔ CLI 双向通信协议：
 * - 远程用户通过 Web 发送消息
 * - 远程用户批准/拒绝工具调用
 * - 状态同步
 */

/** 连接状态 */
const BridgeState = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  RECONNECTING: 'reconnecting',
  FAILED: 'failed',
};

/** 远程消息类型 */
const RemoteMessageType = {
  USER_PROMPT: 'user_prompt',      // 用户消息
  PERMISSION_RESPONSE: 'permission_response', // 权限批准/拒绝
  CONTROL: 'control',              // 控制消息 (abort/set_model)
  STATUS_SYNC: 'status_sync',      // 状态同步
};

class RemoteBridge {
  constructor(config = {}) {
    this.sessionUrl = config.sessionUrl || '';
    this.environmentId = config.environmentId || '';
    this.bridgeSessionId = config.bridgeSessionId || '';
    this.state = BridgeState.DISCONNECTED;

    /** 待处理的权限请求 */
    this.pendingPermissions = new Map();

    /** 入站消息队列 */
    this.inboundQueue = [];

    /** 出站消息队列 */
    this.outboundQueue = [];

    /** 状态变化回调 */
    this.stateCallbacks = [];

    /** 计数器 */
    this.stats = {
      messagesSent: 0,
      messagesReceived: 0,
      permissionsRequested: 0,
      permissionsResolved: 0,
    };
  }

  /**
   * 连接
   */
  async connect() {
    this.state = BridgeState.CONNECTING;
    // 实际实现通过 WebSocket 连接
    this.state = BridgeState.CONNECTED;
    this._notifyState('connected');
  }

  /**
   * 发送消息到远程
   */
  send(message) {
    this.outboundQueue.push({
      ...message,
      timestamp: new Date().toISOString(),
      bridgeSessionId: this.bridgeSessionId,
    });
    this.stats.messagesSent++;
  }

  /**
   * 发送结果
   */
  sendResult() {
    this.send({ type: 'result', timestamp: new Date().toISOString() });
  }

  /**
   * 发送控制请求
   */
  sendControlRequest(request) {
    this.send({ type: RemoteMessageType.CONTROL, request });
  }

  /**
   * 发送控制响应
   */
  sendControlResponse(response) {
    this.send({ type: RemoteMessageType.CONTROL, response, isResponse: true });
  }

  /**
   * 接收入站消息（远程发来的）
   */
  async *receiveInbound() {
    while (this.inboundQueue.length > 0) {
      yield this.inboundQueue.shift();
      this.stats.messagesReceived++;
    }
  }

  /**
   * 接收权限响应
   */
  async *receivePermissions() {
    for (const [id, permission] of this.pendingPermissions) {
      yield { id, ...permission };
      this.stats.permissionsResolved++;
    }
    this.pendingPermissions.clear();
  }

  /**
   * 请求权限（等待远程用户批准/拒绝）
   */
  requestPermission(toolName, input) {
    const id = `perm-${Date.now()}`;
    this.pendingPermissions.set(id, {
      toolName,
      input,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    });
    this.stats.permissionsRequested++;
    this.send({
      type: RemoteMessageType.PERMISSION_RESPONSE,
      permissionId: id,
      toolName,
      input,
    });
    return id;
  }

  /**
   * 状态变化监听
   */
  onStateChange(callback) {
    this.stateCallbacks.push(callback);
  }

  _notifyState(state, detail = '') {
    for (const cb of this.stateCallbacks) {
      try { cb(state, detail); } catch (e) { /* best-effort */ }
    }
  }

  /**
   * 断开连接
   */
  async teardown() {
    this.state = BridgeState.DISCONNECTED;
    this._notifyState('disconnected');
  }

  getStats() {
    return {
      state: this.state,
      ...this.stats,
      pendingPermissions: this.pendingPermissions.size,
      outboundQueue: this.outboundQueue.length,
      inboundQueue: this.inboundQueue.length,
    };
  }
}

module.exports = {
  RemoteBridge,
  BridgeState,
  RemoteMessageType,
};
