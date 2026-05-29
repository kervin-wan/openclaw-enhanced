# OpenClaw Enhanced — 标准化审计报告

> 审计日期: 2026-05-29
> 审计范围: `/usr/lib/node_modules/openclaw-cn-enhanced/dist/` 全部增强版文件

## 审查结果

### ✅ 已通过的审查项

| # | 审查项 | 结果 |
|---|--------|------|
| 1 | 硬编码路径（/root/）| ✅ 已用 os.homedir() |
| 2 | 硬编码路径（/tmp/）| ✅ 已用 os.tmpdir() |
| 3 | 硬编码端口（18790）| ✅ 环境变量 OPENCLAW_ENHANCED_PORT |
| 4 | 硬编码域名 | ✅ 无硬编码域名 |
| 5 | 硬编码模型名（engine/）| ✅ 无硬编码，从配置读取 |
| 6 | Fallback 链通用化 | ✅ 从基础版配置读取 |
| 7 | 思考模式配置路径 | ✅ os.homedir() + 环境变量 |
| 8 | 数据目录 | ✅ $OPENCLAW_ENHANCED_HOME |
| 9 | 安装脚本 | ✅ 支持 $HOME、--port、--systemd |

### ⚠️ 注意事项

| # | 项目 | 说明 |
|---|------|------|
| 1 | Fallback 链 | 用户需在 openclaw-enhanced.json 中配置自己的模型 |
| 2 | 控制 UI 注入 | SPA 功能面板通过编译 JS 注入，官方升级后需重新注入 |
| 3 | 端口冲突 | 默认 18790，如冲突设置 OPENCLAW_ENHANCED_PORT |

### 📦 发布包内容

- `dist/engine/` — 28 个 CJS 引擎模块
- `dist/agents/` — 增强版代理文件
- `dist/auto-reply/` — 回复管线注入
- `dist/control-ui/` — SPA + 功能面板
- `dist/gateway/` — HTTP/WS 增强
- `skills/` — 30+ 技能模块
- `install.sh` — 一行安装脚本
- `README.md` — 完整文档

### 🔧 修复记录

| 文件 | 问题 | 修复 |
|------|------|------|
| ThinkingManager.cjs | 注释写 /root/ | 改为 $HOME/.openclaw-enhanced/ |
| thinking-toggle.js | 注释写 /root/ | 改为 $HOME/.openclaw-enhanced/ |
| EnhancedSystemPrompt.cjs | /tmp/ 硬编码 | 已用 os.tmpdir() |
