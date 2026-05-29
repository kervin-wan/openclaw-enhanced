# OpenClaw Enhanced

> 🔧 OpenClaw 增强版 — 22 引擎管线扩展，三档深度思考，模型质量追踪

一行命令安装，在 [openclaw-cn](https://github.com/jiulingyun/openclaw-cn) 基础上零侵入注入增强能力。

## 🚀 快速安装

```bash
curl -fsSL https://raw.githubusercontent.com/jiulingyun/openclaw-enhanced/main/install.sh | bash
```

或手动：

```bash
git clone https://github.com/jiulingyun/openclaw-enhanced.git
cd openclaw-enhanced
bash install.sh
```

**前提条件：** Node.js >= 22.12，已安装 `openclaw-cn`。

安装完成后：

```bash
openclaw-enhanced           # 启动增强版
openclaw-enhanced gateway   # 仅 Gateway
openclaw-enhanced --doctor  # 诊断模式
```

## ✨ 增强能力（21 项）

### 🧠 智能推理
- **三档深度思考** — off / auto / manual，auto 模式自动检测问题复杂度关键词
- **思考模式持久化** — 配置写入文件，重启保持；控制面板三态滑块直达

### 📊 可观测性
- **模型质量追踪** — 按模型实时统计成功/失败/截断率
- **Hook 错误可观测** — 错误计数 + 最后错误暴露到 API
- **功能门控仪表盘** — 14 个模块开关 + `/enhanced/dashboard` 可视化面板
- **热重载端点** — `/enhanced/reload` 不重启重置所有模块状态

### 🔄 稳定性
- **响应截断恢复** — 4 项质量检测（未闭合代码块/重复循环/乱码/空内容）
- **子代理超时告警** — sweeper 每 60s 扫描，超时自动通知父会话
- **模型 Fallback 链** — 自动切换，失败不中断
- **子代理公告重试** — 3 次指数退避重试

### 🧹 上下文管理
- **SnipCompact 增强** — 80% 阈值自动触发压缩
- **MicroCompact** — 微压缩策略

### 🌐 扩展能力
- **多 Agent 协调器** — 自动拆分并行任务
- **SDK 程序化调用** — 8 个 RPC 方法（prompt / session / fork / status）
- **Remote Bridge 远程协作** — WebSocket 远程批准/拒绝工具调用
- **MCP Bridge** — 模型上下文协议桥接
- **ToolSearch 增强** — 23 个工具按关键词搜索

### 🎨 体验
- **思考模式按钮** — 控制面板固定宽度胶囊滑块，三态文字不重叠
- **探索/审查代理** — `explore`（只读代码探索）和 `review`（安全审查）两种代理类型

## ⚙️ 配置

配置文件位于 `~/.openclaw-enhanced/config/`：

| 文件 | 说明 |
|------|------|
| `thinking.conf` | 思考模式（auto/manual/off） |
| `default.conf` | 全局配置（端口、日志级别等） |

### 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `OPENCLAW_ENHANCED_PORT` | 18790 | 控制面板端口 |
| `OPENCLAW_ENHANCED_HOME` | ~/.openclaw-enhanced | 数据目录 |
| `ENHANCED_THINKING_MODE` | auto | 思考模式 |
| `ENHANCED_LOG_LEVEL` | info | 日志级别 |

### Model Fallback 配置

Fallback 链继承自 `openclaw-cn` 的模型配置，无需额外设置。增强版会自动读取已配置的模型并构建 fallback 链。

在 `openclaw-enhanced.json` 中可自定义：

```json
{
  "agents": {
    "defaults": {
      "fallbacks": [
        "your-primary-model",
        "your-backup-model-1",
        "your-backup-model-2"
      ]
    }
  }
}
```

## 📡 API 端点

| 端点 | 说明 |
|------|------|
| `GET /enhanced/status` | 完整模块状态 JSON |
| `POST /enhanced/reload` | 热重载所有模块 |
| `GET /enhanced/dashboard` | 功能面板仪表盘 |

WebSocket RPC（SDK Layer）：
- `sdk.prompt` — 一次性问答
- `sdk.createSession` — 创建会话
- `sdk.session.send` / `sdk.session.fork` / `sdk.session.abort`
- `sdk.listSessions` / `sdk.status`

## 🏗️ 架构

```
openclaw-cn（基础网关）
    │
    ▼
IntegrationBridge.cjs  ←── 核心胶水层
    │
    ├── engine/（28 个 .cjs 模块）
    │   ├── ThinkingManager    → 三档思考 + 复杂度检测
    │   ├── ModelQualityTracker → 模型调用统计
    │   ├── StreamRecovery     → 截断检测 + 续写
    │   ├── FeatureGating      → 14 模块功能开关
    │   ├── Coordinator        → 多 Agent 协调
    │   ├── SDKLayer           → 程序化调用接口
    │   ├── RemoteBridge       → 远程协作桥接
    │   └── ...
    │
    ├── gateway/ → HTTP 端点 + WebSocket 方法
    ├── agents/  → 子代理增强
    ├── auto-reply/ → 回复管线注入
    └── control-ui/ → 功能面板 + 思考按钮
```

## 🔄 版本兼容

| 增强版 | 基础版最低版本 |
|--------|---------------|
| 0.1.x | openclaw-cn >= 0.2.0 |

## 📄 许可

MIT License

## 🙏 致谢

基于 [openclaw-cn](https://github.com/jiulingyun/openclaw-cn) 构建。感谢 OpenClaw 社区。
