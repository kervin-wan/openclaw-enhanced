# OpenClaw Enhanced

## 这是什么

openclaw 是一个多通道 AI 网关，能接 Telegram、WhatsApp、Discord 等渠道，背后调大模型回答问题。但实际用起来会发现几个问题：

1. 有些问题需要深度思考（比如系统架构分析），有些不用（"今天天气怎样"），但原始版本没有自动判断机制
2. 模型调用偶尔截断、失败，没有地方追踪质量
3. 上下文用满了就报错，不会主动压缩
4. 子代理卡死了没人通知
5. 想加个新功能得改源码，容易和上游更新冲突

这个增强版就是来解决这些问题的。它在 openclaw 外面包了一层，不改原有代码，通过管线注入的方式插进去。你装的 openclaw 完全不受影响，该升级升级。

用户能感觉到的变化：

- 复杂问题自动深度思考，简单问题不浪费时间
- 回复被截断时能检测出来，提示你继续
- 上下文满了自动压缩，不会突然报错
- 控制面板多了"功能面板"tab，能看到所有模块运行状态
- 思考模式有个滑块按钮，随时切换
- 模型调用质量有统计，哪个模型靠谱一目了然

## 安装

需要 Node.js 22+，已装 openclaw 或 openclaw-cn。

```bash
curl -fsSL https://raw.githubusercontent.com/kervin-wan/openclaw-enhanced/master/install.sh | bash
```

装完后：

```bash
openclaw-enhanced           # 启动
openclaw-enhanced gateway   # 只启动 gateway
openclaw-enhanced --doctor  # 诊断
```

控制面板：`http://localhost:18790`

## 怎么做到的

增强版不修改 openclaw 本身任何一行代码。核心是一个叫 IntegrationBridge 的模块，gateway 启动时自动挂载。

三层注入：

1. **引擎层** — 28 个 .cjs 模块，每个负责独立功能。IntegrationBridge 统一初始化，单例管理
2. **管线注入** — runtime-patches.cjs 在 auto-reply、gateway、agents 三条关键路径插入增强逻辑
3. **UI 注入** — index.html 里加载 thinking-toggle.js 和 feature-panel.js，控制面板出现新控件

## 功能

### 深度思考

三档：auto（自动检测）、manual（强制思考）、off（关闭）。

auto 模式的判断逻辑在 ThinkingManager 里：解析用户消息里的关键词，加权打分。架构、安全、重构、漏洞这类词权重 2 分，分析、调试、优化、API 这类词权重 1 分，多文件操作 +3，子代理调用 +3，错误上下文 +2。总分 > 4 就开启深度思考。

思考状态持久化到 `~/.openclaw-enhanced/thinking.conf`，重启后保持。控制面板上有一个固定宽度的三态胶囊滑块，直接切换。

### 模型质量追踪

每次模型调用完成后记录结果：成功/失败/截断。数据在内存里维护，通过 `/enhanced/status` 返回 JSON。控制面板的仪表盘有可视化统计。

记录维度：
- 按型号统计调用次数、成功率、截断率
- 按 Provider 分组（SiliconFlow、DeepSeek 等）
- 当前活跃的请求数

### 响应截断恢复

StreamRecovery 模块在每次回复完成后做 4 项检查：

1. 未闭合的代码块 — 三个反引号开头但没闭合
2. 重复循环 — 相同内容反复出现
3. 乱码/无意义内容 — 不可读字符比例过高
4. 空内容 — 完全无有效回复

检测到问题后自动给出提示，帮你判断要不要续写。另外还拦截了内部信号（NO_REPLY、HEARTBEAT_OK）防止误报。

### 模型 Fallback

安装时自动读你的 openclaw 配置，提取已有的模型列表，按顺序构建备用链。主模型失败后按链依次尝试下一个。不需要额外配置。

如果装了多个 Provider（比如 SiliconFlow + DeepSeek 直连），fallback 会跨 Provider 切换。

在 `openclaw-enhanced.json` 里可以手动指定顺序：

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "deepseek/deepseek-v4-pro" },
      "fallbacks": [
        "siliconflow/Pro/moonshotai/Kimi-K2.6",
        "siliconflow/Pro/zai-org/GLM-5.1"
      ]
    }
  }
}
```

### 功能门控

14 个功能模块都可以独立开关。FeatureGating 模块管理，`/enhanced/status` 可查看状态，控制面板仪表盘可视化。

当前默认开放的模块：IntegrationBridge、MicroCompact、SnipCompact、HookSystem、ToolSearch、SessionEngine、ForkRuntime、MCPBridge、PluginEnhanced、PermissionFilter、ThinkingManager、ModelQualityTracker、StreamRecovery、Coordinator。

### 子代理超时告警

sweeper 每 60 秒扫描所有活跃子代理，发现超时的（`runTimeoutSeconds` 到期）自动向父会话发送通知。避免子代理卡死后悄悄超时。

另外子代理完成公告有 3 次指数退避重试，解决竞态条件下公告丢失的问题。

### 上下文压缩

SnipCompact 在上下文使用率达到 80% 时自动触发压缩，保留关键信息的同时缩减 token。MicroCompact 做更轻量的微压缩。

### 多 Agent 协调

Coordinator 可以把复杂任务拆成多个并行子代理。已注册但默认关闭，在配置里打开即可。

### Hook 错误可观测

Hook 执行出错时记录错误信息 + 时间戳，通过 `/enhanced/status` 暴露。可以在功能面板看到。

### 热重载

`POST /enhanced/reload` 不重启 gateway 就重置所有增强模块的内部状态（模型追踪数据、Hook 计数、功能门控缓存等），重新初始化。适合配置变更后即时生效。

### SDK + Remote Bridge

**SDK Layer** — 8 个 WebSocket RPC 方法：
- `sdk.prompt` — 一次性问答
- `sdk.createSession` — 创建持久会话
- `sdk.session.send` / `sdk.session.fork` / `sdk.session.abort`
- `sdk.listSessions` / `sdk.status`

**Remote Bridge** — 远程用户通过 WebSocket 批准/拒绝工具调用，`remote.connect`、`remote.send`、`remote.status`、`remote.disconnect`。

两者默认关闭，在 `openclaw-enhanced.json` 里设置 `sdk_layer: true` / `remote_bridge: true` 即可。

### 其他

- **MCP Bridge** — MCP 协议桥接，连接外部工具服务（默认开启）
- **ToolSearch 增强** — 23 个工具按关键词搜索（默认开启）
- **Prompt Builder / Cache** — 系统提示词构建 + 缓存边界注入（默认开启）
- **Permission Filter** — Token/频率限制过滤（默认开启）
- **探索/审查代理** — `explore` 和 `review` 两种专用子代理类型

## 配置

数据目录 `~/.openclaw-enhanced/`：

```
~/.openclaw-enhanced/
  config/
    thinking.conf            # auto / manual / off
    default.conf              # 端口、日志
    openclaw-enhanced.json    # 模型 fallback、功能开关
  workspace/                  # 工作文件
  memory/                     # 记忆
  logs/                       # 日志
  stats/                      # 统计
```

环境变量：

| 变量 | 默认值 |
|------|--------|
| OPENCLAW_ENHANCED_PORT | 18790 |
| OPENCLAW_ENHANCED_HOME | ~/.openclaw-enhanced |
| ENHANCED_THINKING_MODE | auto |

## API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| /enhanced/status | GET | 所有模块状态（引擎、模型质量、Hook 错误等） |
| /enhanced/reload | POST | 热重载所有模块（不重启进程） |
| /enhanced/dashboard | GET | 功能面板 HTML |

## 引擎模块清单（28 个）

`dist/engine/` 下的 `.cjs` 文件，启动时由 IntegrationBridge 统一加载：

```
IntegrationBridge    核心胶水层
ThinkingManager      三档思考 + 复杂度检测
ModelQualityTracker  模型调用统计
StreamRecovery       截断检测 + 续写
FeatureGating        14 模块功能开关
Coordinator          多 Agent 协调
SDKLayer             程序化调用接口
RemoteBridge         远程协作桥接
MCPBridge            MCP 协议桥接
SessionEngine        会话管理
ForkAgent            子代理 fork
ForkRuntime          子代理运行时
AgentTypes           代理类型定义
HookSystem           全局 Hook 事件
HookIntegration      Hook 管线注入
MicroCompact         微压缩
SnipCompact          智能压缩
ToolSearch           工具搜索
PermissionFilter     权限过滤
PluginEnhanced       插件增强
EnhancedSystemPrompt 系统提示词增强
PromptBuilder        提示词构建
PromptBlock          提示词区块
PromptCache          提示词缓存
EnhancedRuntime      运行时增强
runtime-patches      管线补丁注入
gateway-methods      WS 方法注册
set-title            标题设置
```

## 兼容性

同时兼容 openclaw（npm: `openclaw`）和 openclaw-cn（npm: `openclaw-cn`）。安装脚本自动检测。

## 安装脚本参数

```bash
bash install.sh --dry-run    # 预览
bash install.sh --force      # 覆盖已有配置
bash install.sh --port 8080  # 指定端口
bash install.sh --home /path # 数据目录
```

## 许可

MIT
