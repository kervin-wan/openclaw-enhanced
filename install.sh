#!/usr/bin/env bash
set -euo pipefail

# ── install.sh — openclaw-enhanced 一键安装 ──
# 兼容 openclaw（官方）和 openclaw-cn（中文版）
# curl -fsSL https://raw.githubusercontent.com/kervin-wan/openclaw-enhanced/master/install.sh | bash

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'
log()  { printf "${CYAN}[+]${NC} %s\n" "$*"; }
warn() { printf "${YELLOW}[!]${NC} %s\n" "$*"; }
err()  { printf "${RED}[x]${NC} %s\n" "$*" >&2; }
ok()   { printf "${GREEN}[ok]${NC} %s\n" "$*"; }

ENHANCED_HOME="${OPENCLAW_ENHANCED_HOME:-$HOME/.openclaw-enhanced}"
PORT="${OPENCLAW_ENHANCED_PORT:-18790}"
DRY_RUN=false
FORCE=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=true; shift ;;
    --force)   FORCE=true; shift ;;
    --home)    ENHANCED_HOME="$2"; shift 2 ;;
    --port)    PORT="$2"; shift 2 ;;
    -h|--help) sed -n '2,10p' "$0"; exit 0 ;;
    *) err "Unknown: $1"; exit 1 ;;
  esac
done

# ── 1. 环境检查 ──
log "检查环境..."

if ! command -v node &>/dev/null; then
  err "未找到 Node.js，需要 >= 22.12"
  exit 1
fi
NODE_VER=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VER" -lt 22 ]; then
  err "Node.js $(node -v) 太旧，需要 >= 22"
  exit 1
fi
ok "Node.js $(node -v)"

if ! command -v npm &>/dev/null; then
  err "未找到 npm"
  exit 1
fi

# ── 2. 检测基础版（openclaw 或 openclaw-cn）──
log "检测基础版..."

BASE_PKG=""
BASE_BIN=""
BASE_GLOBAL=""

for pkg in openclaw openclaw-cn; do
  NPM_ROOT="$(npm root -g 2>/dev/null)"
  if [ -d "$NPM_ROOT/$pkg" ]; then
    BASE_PKG="$pkg"
    BASE_GLOBAL="$NPM_ROOT/$pkg"
    break
  fi
done

if [ -z "$BASE_PKG" ]; then
  # 尝试 which 查找
  for bin in openclaw openclaw-cn; do
    if which "$bin" &>/dev/null; then
      BASE_BIN="$bin"
      BASE_PKG="$bin"
      break
    fi
  done
fi

if [ -n "$BASE_PKG" ]; then
  ok "基础版: $BASE_PKG"
else
  warn "未检测到 openclaw 或 openclaw-cn，将自动安装 openclaw"
  BASE_PKG="openclaw"
fi

# ── 3. 检测已有增强版 ──
ENHANCED_GLOBAL="$(npm root -g 2>/dev/null)/openclaw-enhanced"
if [ -d "$ENHANCED_GLOBAL" ]; then
  warn "检测到已有 openclaw-enhanced"
  if [ "$FORCE" != true ]; then
    echo -n "覆盖安装? [y/N] "
    read -r choice
    [[ "$choice" =~ ^[Yy] ]] || exit 0
  fi
fi

# ── 4. 安装增强版 ──
log "安装 openclaw-enhanced..."

ENHANCED_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ "$DRY_RUN" = true ]; then
  echo "[DRY RUN] 会从 $ENHANCED_DIR 安装"
else
  mkdir -p "$ENHANCED_GLOBAL"
  
  # 复制核心文件
  for dir in dist skills config; do
    if [ -d "$ENHANCED_DIR/$dir" ]; then
      cp -r "$ENHANCED_DIR/$dir/" "$ENHANCED_GLOBAL/$dir/"
    fi
  done
  
  # 复制 package.json
  cp "$ENHANCED_DIR/package.json" "$ENHANCED_GLOBAL/" 2>/dev/null || true
  
  # 复制 bin 入口
  if [ -f "$ENHANCED_DIR/dist/enhanced-entry.js" ]; then
    cp "$ENHANCED_DIR/dist/enhanced-entry.js" "$ENHANCED_GLOBAL/dist/"
  fi
  
  # 创建可执行链接
  NPM_PREFIX="$(npm config get prefix 2>/dev/null || echo /usr/local)"
  BIN_DIR="$NPM_PREFIX/bin"
  mkdir -p "$BIN_DIR"
  
  cat > "$BIN_DIR/openclaw-enhanced" << BINEOF
#!/usr/bin/env bash
set -e
export OPENCLAW_ENHANCED_HOME="\${OPENCLAW_ENHANCED_HOME:-\$HOME/.openclaw-enhanced}"
export OPENCLAW_ENHANCED_PORT="\${OPENCLAW_ENHANCED_PORT:-18790}"
ENHANCED_GLOBAL="\$(npm root -g 2>/dev/null)/openclaw-enhanced"
exec node "\$ENHANCED_GLOBAL/dist/enhanced-entry.js" "\$@"
BINEOF
  chmod +x "$BIN_DIR/openclaw-enhanced"
  
  ok "文件安装完成"
fi

# ── 5. 配置 ──
log "配置..."

mkdir -p "$ENHANCED_HOME"/{workspace,config,logs,memory,stats,tmp}

# thinking 模式
if [ ! -f "$ENHANCED_HOME/config/thinking.conf" ] || [ "$FORCE" = true ]; then
  echo "auto" > "$ENHANCED_HOME/config/thinking.conf"
  ok "thinking.conf (auto)"
fi

# 主配置（从基础版自动读取模型）
if [ ! -f "$ENHANCED_HOME/config/openclaw-enhanced.json" ] || [ "$FORCE" = true ]; then
  # 尝试读取基础版配置
  BASE_CONF=""
  for candidate in "$HOME/.openclaw/openclaw.json" "$HOME/.openclaw-cn/openclaw.json" \
                   "$HOME/.openclaw-cn/config.json"; do
    [ -f "$candidate" ] && { BASE_CONF="$candidate"; break; }
  done
  
  if [ -n "$BASE_CONF" ]; then
    log "从 $BASE_CONF 读取模型配置..."
    node -e "
      const { readFileSync, writeFileSync, mkdirSync } = require('fs');
      const base = JSON.parse(readFileSync('$BASE_CONF','utf8'));
      const defaults = base.agents?.defaults || {};
      const models = defaults.models || {};
      const modelIds = Object.keys(models);
      const primary = modelIds[0] || 'YOUR_MODEL_ID';
      const fallbacks = modelIds.slice(1);
      
      const modelsObj = {};
      for (const id of modelIds) modelsObj[id] = { alias: models[id]?.alias || id.split('/').pop() };
      
      const cfg = {
        gateway: { port: $PORT },
        agents: { defaults: { model: { primary }, models: modelsObj, fallbacks } },
        meta: { lastTouched: new Date().toISOString() }
      };
      mkdirSync('$ENHANCED_HOME/config', { recursive: true });
      writeFileSync('$ENHANCED_HOME/config/openclaw-enhanced.json', JSON.stringify(cfg, null, 2));
      console.log('Models loaded:', modelIds.length);
    " 2>/dev/null || {
      # fallback: 空模板
      cat > "$ENHANCED_HOME/config/openclaw-enhanced.json" << JSONEOF
{
  "gateway": { "port": $PORT },
  "agents": {
    "defaults": {
      "model": { "primary": "YOUR_MODEL_ID" },
      "models": {},
      "fallbacks": []
    }
  }
}
JSONEOF
      warn "无法读取基础版配置，请手动编辑 openclaw-enhanced.json"
    }
  else
    cat > "$ENHANCED_HOME/config/openclaw-enhanced.json" << JSONEOF
{
  "gateway": { "port": $PORT },
  "agents": {
    "defaults": {
      "model": { "primary": "YOUR_MODEL_ID" },
      "models": {},
      "fallbacks": []
    }
  }
}
JSONEOF
    warn "未找到基础版配置，请手动编辑 openclaw-enhanced.json"
  fi
  ok "openclaw-enhanced.json"
fi

# ── 6. 验证 ──
log "验证安装..."

ENGINE_COUNT=$(ls "$ENHANCED_GLOBAL/dist/engine/"*.cjs 2>/dev/null | wc -l)
if [ "$ENGINE_COUNT" -ge 20 ]; then
  ok "引擎模块: $ENGINE_COUNT 个"
else
  err "引擎模块不足 ($ENGINE_COUNT)，安装可能不完整"
  exit 1
fi

# ── 完成 ──
printf "\n${GREEN}安装完成${NC}\n\n"
echo "  命令: openclaw-enhanced"
echo "  面板: http://localhost:$PORT"
echo "  配置: $ENHANCED_HOME/config/"
echo ""
