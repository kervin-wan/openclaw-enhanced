/**
 * MCPBridge — MCP (Model Context Protocol) 集成桥接
 *
 * 提供标准化接口连接外部 MCP 服务器，注入其工具和指令。
 * 支持 stdio 和 HTTP 传输两种连接方式。
 */

const { spawn } = require('child_process');

function getVersion() {
  try {
    return require('../../package.json').version;
  } catch {
    return '0.1.0';
  }
}

/**
 * MCP 服务器状态
 */
const ServerState = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error',
};

/**
 * MCP 服务器连接配置
 */
class MCPServerConfig {
  constructor(opts) {
    this.name = opts.name || '';
    this.transport = opts.transport || 'stdio'; // stdio | http
    this.command = opts.command || '';           // stdio: 启动命令
    this.args = opts.args || [];                 // stdio: 命令参数
    this.url = opts.url || '';                   // http: 服务 URL
    this.env = opts.env || {};                   // stdio: 环境变量
    this.timeout = opts.timeout || 30000;        // 连接超时
    this.autoReconnect = opts.autoReconnect !== false;
  }
}

/**
 * MCP 服务器连接实例
 */
class MCPServerConnection {
  constructor(config) {
    this.config = new MCPServerConfig(config);
    this.state = ServerState.DISCONNECTED;
    this.tools = [];
    this.resources = [];
    this.instructions = null;
    this.error = null;
    this.startedAt = null;
    this.lastActivity = null;
  }

  /**
   * 连接服务器（异步，非阻塞）
   */
  async connect() {
    this.state = ServerState.CONNECTING;
    this.startedAt = new Date().toISOString();

    try {
      if (this.config.transport === 'stdio') {
        await this._connectStdio();
      } else if (this.config.transport === 'http') {
        await this._connectHttp();
      } else {
        throw new Error(`Unsupported transport: ${this.config.transport}`);
      }

      this.state = ServerState.CONNECTED;
      this.lastActivity = new Date().toISOString();
    } catch (e) {
      this.state = ServerState.ERROR;
      this.error = e.message;
      throw e;
    }
  }

  /**
   * stdio 方式连接
   */
  async _connectStdio() {
    // stdio MCP 连接通过子进程 stdin/stdout JSON-RPC 通信
    return new Promise((resolve, reject) => {
      const child = spawn(this.config.command, this.config.args, {
        env: { ...process.env, ...this.config.env },
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      const timeout = setTimeout(() => {
        child.kill();
        reject(new Error(`MCP server ${this.config.name} connection timeout`));
      }, this.config.timeout);

      let buffer = '';

      child.stdout.on('data', (data) => {
        buffer += data.toString();
        // 尝试解析 JSON-RPC 响应
        try {
          const lines = buffer.split('\n');
          for (const line of lines) {
            if (!line.trim()) continue;
            const msg = JSON.parse(line);
            if (msg.result) {
              // 服务器初始化响应
              if (msg.result.tools) {
                this.tools = msg.result.tools.map(t => ({
                  name: `mcp__${this.config.name}__${t.name}`,
                  description: t.description || '',
                  inputSchema: t.inputSchema || {},
                  mcpInfo: { serverName: this.config.name, toolName: t.name },
                }));
              }
              if (msg.result.resources) {
                this.resources = msg.result.resources;
              }
              if (msg.result.instructions) {
                this.instructions = msg.result.instructions;
              }
            }
          }
          buffer = ''; // 清空已解析
        } catch (e) {
          // JSON 不完整，继续累积
        }
      });

      child.stderr.on('data', (data) => {
        console.error(`[MCP:${this.config.name}] stderr:`, data.toString().substring(0, 200));
      });

      child.on('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });

      child.on('close', (code) => {
        clearTimeout(timeout);
        if (this.state === ServerState.CONNECTING) {
          reject(new Error(`MCP server ${this.config.name} exited with code ${code}`));
        }
      });

      // 发送初始化请求
      const initMsg = JSON.stringify({
        jsonrpc: '2.0',
        method: 'initialize',
        params: {
          protocolVersion: '0.1.0',
          clientInfo: { name: 'openclaw-enhanced', version: getVersion() },
        },
        id: 1,
      });

      const toolsMsg = JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/list',
        id: 2,
      });

      child.stdin.write(initMsg + '\n');
      child.stdin.write(toolsMsg + '\n');

      // Don't resolve immediately — let the data handler collect responses
      // In a real implementation, we'd track pending requests
      setTimeout(() => {
        clearTimeout(timeout);
        resolve();
      }, 1000);
    });
  }

  /**
   * HTTP 方式连接
   */
  async _connectHttp() {
    // HTTP SSE MCP 连接
    // 简化为 placeholder — 实际实现需要 SSE client
    return Promise.resolve();
  }

  /**
   * 断开连接
   */
  disconnect() {
    this.state = ServerState.DISCONNECTED;
    this.tools = [];
    this.resources = [];
  }
}

/**
 * MCP 管理器 — 管理多个 MCP 服务器连接
 */
class MCPManager {
  constructor() {
    /** @type {Map<string, MCPServerConnection>} */
    this.servers = new Map();
  }

  /**
   * 添加并连接服务器
   * @param {Object} config
   * @returns {Promise<MCPServerConnection>}
   */
  async addServer(config) {
    if (this.servers.has(config.name)) {
      throw new Error(`MCP server ${config.name} already exists`);
    }

    const conn = new MCPServerConnection(config);
    this.servers.set(config.name, conn);

    try {
      await conn.connect();
    } catch (e) {
      console.error(`[MCP] Failed to connect ${config.name}:`, e.message);
    }

    return conn;
  }

  /**
   * 移除服务器
   */
  removeServer(name) {
    const conn = this.servers.get(name);
    if (conn) {
      conn.disconnect();
      this.servers.delete(name);
    }
  }

  /**
   * 获取所有已连接服务器的工具
   */
  getAllTools() {
    const tools = [];
    for (const [, conn] of this.servers) {
      if (conn.state === ServerState.CONNECTED) {
        tools.push(...conn.tools);
      }
    }
    return tools;
  }

  /**
   * 获取所有服务器的指令（用于注入系统提示词）
   */
  getAllInstructions() {
    const instructions = [];
    for (const [name, conn] of this.servers) {
      if (conn.state === ServerState.CONNECTED && conn.instructions) {
        instructions.push(`## ${name}\n${conn.instructions}`);
      }
    }
    return instructions.length > 0 ? instructions.join('\n\n') : null;
  }

  /**
   * 获取所有服务器的资源
   */
  getAllResources() {
    const resources = [];
    for (const [name, conn] of this.servers) {
      if (conn.state === ServerState.CONNECTED) {
        resources.push(...conn.resources.map(r => ({
          ...r,
          serverName: name,
        })));
      }
    }
    return resources;
  }

  /**
   * 重连服务器
   */
  async reconnect(name) {
    const conn = this.servers.get(name);
    if (!conn) throw new Error(`MCP server ${name} not found`);
    conn.disconnect();
    return conn.connect();
  }

  /**
   * 获取统计
   */
  getStats() {
    let connected = 0, connecting = 0, disconnected = 0, error = 0;
    let totalTools = 0, totalResources = 0;

    for (const [, conn] of this.servers) {
      if (conn.state === ServerState.CONNECTED) { connected++; totalTools += conn.tools.length; totalResources += conn.resources.length; }
      else if (conn.state === ServerState.CONNECTING) connecting++;
      else if (conn.state === ServerState.DISCONNECTED) disconnected++;
      else if (conn.state === ServerState.ERROR) error++;
    }

    return {
      servers: { total: this.servers.size, connected, connecting, disconnected, error },
      tools: totalTools,
      resources: totalResources,
    };
  }
}

module.exports = {
  ServerState,
  MCPServerConfig,
  MCPServerConnection,
  MCPManager,
};
