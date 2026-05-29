# OpenClaw Enhanced

在你已有的 openclaw（或 openclaw-cn）上加一层增强管线，不改原有代码。

## 安装

前提：Node.js 22+，已装 openclaw 或 openclaw-cn。

```bash
curl -fsSL https://raw.githubusercontent.com/kervin-wan/openclaw-enhanced/master/install.sh | bash
```

装完后：

```bash
openclaw-enhanced           # 启动
openclaw-enhanced gateway   # 只要 gateway
openclaw-enhanced --doctor  # 诊断
```

控制面板地址：http://localhost:18790

## 主要功能

**深度思考** — 三档（自动/强制/关闭）。auto 模式会根据问题内容自动判断要不要深度思考，判断标准是关键词（架构、安全、重构等）。面板上有滑块按钮直接切换。

**模型质量追踪** — 记录每次调用的成功/失败/截断情况，按模型统计，在 /enhanced/status 可以看 JSON，面板上也有可视化。

**响应截断恢复** — 检测四种异常：代码块没闭合、重复循环、乱码、空内容。发现截断自动提示继续。

**模型 fallback** — 安装时自动从你的 openclaw 配置里读取已有模型，构建备用链，主模型挂了自动切下一个。

**功能面板** — 控制台导航栏多一个"功能面板"tab，嵌入式仪表盘显示所有模块状态。

其他：子代理超时告警、上下文压缩增强、Hook 错误追踪、热重载端点、MCP 桥接、多 Agent 协调。

## 配置

数据目录在 `~/.openclaw-enhanced/`：

```
~/.openclaw-enhanced/
  config/
    thinking.conf          # 思考模式: auto / manual / off
    default.conf            # 端口、日志级别等
    openclaw-enhanced.json  # 模型 fallback 链等主配置
  workspace/                # 工作文件
```

环境变量：

| 变量 | 默认值 |
|------|--------|
| OPENCLAW_ENHANCED_PORT | 18790 |
| OPENCLAW_ENHANCED_HOME | ~/.openclaw-enhanced |

## 兼容性

同时兼容 openclaw（npm 官方包 `openclaw`）和 openclaw-cn（`openclaw-cn` 中文版）。装哪个基础版都行，增强版自动适配。

## 安装脚本选项

```bash
bash install.sh --dry-run    # 预览不执行
bash install.sh --force      # 覆盖已有配置
bash install.sh --port 8080  # 指定端口
bash install.sh --home /path # 指定数据目录
```

## 许可

MIT
