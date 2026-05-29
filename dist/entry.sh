#!/usr/bin/env bash
# OpenClaw Enhanced Launcher
# 设置增强版环境变量后启动原始 openclaw-cn

set -e

# Resolve the actual script path (follow symlinks)
SCRIPT="$(readlink -f "$0")"
ENHANCED_ROOT="$(cd "$(dirname "$(dirname "$SCRIPT")")" && pwd)"
ENHANCED_HOME="${OPENCLAW_ENHANCED_HOME:-$HOME/.openclaw-enhanced}"
ENHANCED_PORT="${OPENCLAW_ENHANCED_PORT:-18790}"

# 创建增强版数据目录
mkdir -p "$ENHANCED_HOME"/{workspace,config,sessions,logs,memory,stats}

# 复制初始 workspace 文件（如果不存在）
for f in SOUL.md IDENTITY.md AGENTS.md MEMORY.md USER.md; do
  if [ ! -f "$ENHANCED_HOME/workspace/$f" ] && [ -f "$HOME/.openclaw/workspace/$f" ]; then
    cp "$HOME/.openclaw/workspace/$f" "$ENHANCED_HOME/workspace/$f"
  fi
done

# 设置增强版环境变量
export OPENCLAW_ENHANCED=1
export OPENCLAW_ENHANCED_HOME="$ENHANCED_HOME"
export OPENCLAW_ENHANCED_DATA_DIR="$ENHANCED_HOME"
export OPENCLAW_ENHANCED_PORT="$ENHANCED_PORT"

# 关键：OPENCLAW_STATE_DIR 直接指定配置/数据目录（不会被附加 .openclaw）
# 原版代码 resolveConfigDir 优先读取此变量
export OPENCLAW_STATE_DIR="$ENHANCED_HOME"

# 显式指定 systemd 服务名（避免 restart 重启原版）
export OPENCLAW_SYSTEMD_UNIT="openclaw-enhanced-gateway"
export OPENCLAW_CONFIG_PATH="$ENHANCED_HOME/openclaw-enhanced.json"
# OPENCLAW_HOME 用于路径显示和 workspace 解析
export OPENCLAW_HOME="$ENHANCED_HOME"

# 日志
echo "[openclaw-enhanced] home=$ENHANCED_HOME port=$ENHANCED_PORT" >&2

# 自动注入 enhanced 端口（gateway 模式且未指定 --port）
ARGS=("$@")
if [[ " ${ARGS[*]} " =~ gateway ]] && [[ ! " ${ARGS[*]} " =~ --port ]] && [[ ! " ${ARGS[*]} " =~ -p[[:space:]] ]]; then
  ARGS+=(--port "$ENHANCED_PORT")
  echo "[openclaw-enhanced] Auto-injecting --port $ENHANCED_PORT" >&2
fi

# 调用原始 openclaw（使用增强版 package 中的 dist/entry.js）
exec node "$ENHANCED_ROOT/dist/entry.js" "${ARGS[@]}"
