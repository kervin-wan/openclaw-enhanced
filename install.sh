#!/usr/bin/env bash
# ================================================================
# OpenClaw Enhanced — One-line Installer
# ================================================================
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/jiulingyun/openclaw-cn/main/install.sh | bash
#   bash install.sh --dry-run
#   bash install.sh --branch main
#   bash install.sh --force
#
# What it does:
#   1. Checks prerequisites (bash, node >= 18, npm)
#   2. Detects base openclaw-cn installation
#   3. Installs/upgrades openclaw-cn-enhanced via npm
#   4. Creates ~/.openclaw-enhanced/ config directory
#   5. Writes default thinking.conf (skips if exists)
#   6. Copies workspace files from base if missing
#   7. Shows next steps to restart gateway
#
# Design principles:
#   - Uses $HOME, never hardcodes /root
#   - Never overwrites existing user config
#   - Clear step-by-step output
#   - Clean error messages on failure
#   - Supports --dry-run, --force, --branch, --help
# ================================================================

set -euo pipefail

# ── Colors ──────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ── Globals ─────────────────────────────────────────────────────
DRY_RUN=false
FORCE=false
QUIET=false
BRANCH=""
INSTALL_METHOD=""    # npm | github-tarball | manual
ENHANCED_HOME="${HOME}/.openclaw-enhanced"
BASE_PKG="openclaw-cn"
ENHANCED_PKG="openclaw-cn-enhanced"
NPM_REGISTRY="${NPM_REGISTRY:-https://registry.npmjs.org}"
GITHUB_REPO="${GITHUB_REPO:-jiulingyun/openclaw-cn}"
GITHUB_REF="${GITHUB_REF:-main}"

# ── Helpers ─────────────────────────────────────────────────────

log()  { echo -e "  ${CYAN}→${NC} $*"; }
ok()   { echo -e "  ${GREEN}✓${NC} $*"; }
warn() { echo -e "  ${YELLOW}⚠${NC} $*" >&2; }
err()  { echo -e "  ${RED}✗${NC} $*" >&2; }
info() { echo -e "    ${BLUE}$*${NC}"; }

header() {
  echo ""
  echo -e "${BOLD}${BLUE}┌──────────────────────────────────────────────────┐${NC}"
  printf  "${BOLD}${BLUE}│${NC}  %-48s ${BOLD}${BLUE}│${NC}\n" "$*"
  echo -e "${BOLD}${BLUE}└──────────────────────────────────────────────────┘${NC}"
  echo ""
}

die() {
  echo ""
  echo -e "  ${RED}${BOLD}INSTALL FAILED${NC}"
  echo -e "  ${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "  $*"
  echo ""
  exit 1
}

dry_run() {
  if [ "$DRY_RUN" = true ]; then
    echo -e "  ${YELLOW}[DRY RUN]${NC} Would execute: $*"
    return 0
  fi
  return 1
}

maybe_run() {
  if dry_run "$*"; then return 0; fi
  eval "$*"
}

command_exists() { command -v "$1" >/dev/null 2>&1; }

check_global_pkg() {
  # Returns 0 if the npm global package is installed
  npm list -g "$1" --depth=0 >/dev/null 2>&1
}

get_global_pkg_path() {
  # Returns the installation directory of a global npm package
  local root
  root="$(npm root -g 2>/dev/null || echo "")"
  if [ -n "$root" ] && [ -d "$root/$1" ]; then
    echo "$root/$1"
  fi
}

get_bin_path() {
  # Returns the full path to a binary
  local bin
  bin="$(command -v "$1" 2>/dev/null || echo "")"
  if [ -n "$bin" ]; then
    readlink -f "$bin" 2>/dev/null || echo "$bin"
  fi
}

# ── Usage ───────────────────────────────────────────────────────

usage() {
  cat <<EOF
${BOLD}OpenClaw Enhanced — One-line Installer${NC}

Usage: bash install.sh [OPTIONS]

${BOLD}Options:${NC}
  --dry-run        Preview actions without making changes
  --force          Overwrite existing config files (default: skip)
  --quiet          Suppress info messages, show only errors
  --branch <ref>   Install from a specific GitHub branch/tag
                   (default: main, used for manual tarball fallback)
  --npm-tag <tag>  npm dist-tag to install (e.g. "latest", "beta")
                   (default: latest)
  --registry <url> npm registry URL (default: https://registry.npmjs.org)
  --help           Show this help message

${BOLD}Examples:${NC}
  bash install.sh                  # Normal install
  bash install.sh --dry-run        # Preview only
  bash install.sh --force          # Full reinstall, overwrite configs
  bash install.sh --branch dev     # Install dev branch

${BOLD}One-liner:${NC}
  curl -fsSL https://raw.githubusercontent.com/jiulingyun/openclaw-cn/main/install.sh | bash

${BOLD}What this script does:${NC}
  1. Check prerequisites (bash, node>=18, npm)
  2. Detect base openclaw-cn installation
  3. Install openclaw-cn-enhanced (npm or GitHub tarball)
  4. Create ~/.openclaw-enhanced/ config directory
  5. Write default thinking.conf (skips if exists)
  6. Copy workspace files from base if missing
  7. Show next steps to restart gateway
EOF
  exit 0
}

# ── Step 1: Check Environment ───────────────────────────────────

check_prerequisites() {
  header "Step 1/7: Checking Environment"

  # Bash
  if [ -z "${BASH_VERSION:-}" ]; then
    die "This script requires bash. Please run: bash install.sh"
  fi
  ok "bash ${BASH_VERSION}"

  # Node.js
  if ! command_exists node; then
    die "Node.js is not installed.\n\n  Install it from: https://nodejs.org/\n  Minimum required: Node.js 18+"
  fi
  local node_ver
  node_ver="$(node -v 2>/dev/null | sed 's/v//')"
  local node_major="${node_ver%%.*}"
  if [ "$node_major" -lt 18 ]; then
    die "Node.js $node_ver is too old.\n\n  Minimum required: Node.js 18+\n  Current: $node_ver\n  Upgrade from: https://nodejs.org/"
  fi
  ok "Node.js v${node_ver}"

  # npm
  if ! command_exists npm; then
    die "npm is not installed. It usually comes with Node.js.\n\n  Install Node.js from: https://nodejs.org/"
  fi
  local npm_ver
  npm_ver="$(npm -v 2>/dev/null)"
  ok "npm v${npm_ver}"

  # Home directory
  if [ -z "${HOME:-}" ]; then
    die "\$HOME is not set. Please set your home directory."
  fi
  ok "\$HOME = ${HOME}"

  log "Environment checks passed."
}

# ── Step 2: Check Base Package ──────────────────────────────────

check_base_package() {
  header "Step 2/7: Checking Base openclaw-cn"

  local base_path=""
  local base_bin=""

  # Check if openclaw binary exists
  base_bin="$(get_bin_path openclaw)" || true
  if [ -n "$base_bin" ]; then
    ok "Found openclaw binary: ${base_bin}"
  fi

  # Check npm global
  if check_global_pkg "$BASE_PKG"; then
    base_path="$(get_global_pkg_path "$BASE_PKG")"
    ok "Found $BASE_PKG in global npm: ${base_path}"
  elif check_global_pkg "clawdbot-cn"; then
    # Some versions use clawdbot-cn as the package name
    base_path="$(get_global_pkg_path "clawdbot-cn")"
    ok "Found clawdbot-cn in global npm: ${base_path}"
  fi

  # Check common paths
  if [ -z "$base_path" ]; then
    local guess_paths=(
      "/usr/lib/node_modules/$BASE_PKG"
      "/usr/local/lib/node_modules/$BASE_PKG"
      "${HOME}/.nvm/versions/node/*/lib/node_modules/$BASE_PKG"
      "/opt/homebrew/lib/node_modules/$BASE_PKG"
    )
    for gp in "${guess_paths[@]}"; do
      # Expand globs
      for dir in $gp; do
        if [ -d "$dir/dist" ]; then
          base_path="$dir"
          break 2
        fi
      done
    done
  fi

  if [ -z "$base_path" ]; then
    warn "$BASE_PKG is not installed."
    echo ""
    echo -e "  ${YELLOW}openclaw-cn-enhanced requires the base package 'openclaw-cn'.${NC}"
    echo ""
    echo -e "  ${BOLD}Install the base package first:${NC}"
    echo -e "    npm install -g openclaw-cn"
    echo -e "    openclaw onboard --install-daemon"
    echo ""
    echo -e "  Continue anyway? The enhanced package shares entry points"
    echo -e "  with the base and may not work without it."
    echo ""
    if [ "$DRY_RUN" = false ]; then
      read -r -p "  Continue without base package? [y/N] " reply
      case "$reply" in
        [Yy]*) log "Continuing without base package..." ;;
        *) die "Aborted. Install base package first:\n  npm install -g openclaw-cn" ;;
      esac
    else
      log "[DRY RUN] Would prompt to continue without base package"
    fi
  else
    # Get package version
    local pkg_ver
    pkg_ver="$(node -e "try{console.log(require('${base_path}/package.json').version)}catch(e){console.log('unknown')}" 2>/dev/null)" || pkg_ver="unknown"
    ok "Base version: ${pkg_ver}"

    # Export for later use
    BASE_PKG_PATH="$base_path"
  fi
}

# ── Step 3: Check Enhanced Package Status ───────────────────────

check_enhanced_status() {
  header "Step 3/7: Checking Enhanced Package Status"

  local enhanced_path=""
  local enhanced_ver=""
  local enhanced_bin=""

  # Check bin
  enhanced_bin="$(get_bin_path openclaw-enhanced)" || true
  if [ -n "$enhanced_bin" ]; then
    ok "Found openclaw-enhanced binary: ${enhanced_bin}"
  fi

  # Check npm global
  if check_global_pkg "$ENHANCED_PKG"; then
    enhanced_path="$(get_global_pkg_path "$ENHANCED_PKG")"
    enhanced_ver="$(node -e "try{console.log(require('${enhanced_path}/package.json').version)}catch(e){console.log('unknown')}" 2>/dev/null)" || enhanced_ver="unknown"
    ok "Found $ENHANCED_PKG v${enhanced_ver} at: ${enhanced_path}"

    # Export
    ENHANCED_PKG_PATH="$enhanced_path"
    ENHANCED_PKG_VER="$enhanced_ver"
    INSTALL_METHOD="upgrade"
  else
    # Search for manual installation
    local guess_paths=(
      "/usr/lib/node_modules/$ENHANCED_PKG"
      "/usr/local/lib/node_modules/$ENHANCED_PKG"
      "${HOME}/.nvm/versions/node/*/lib/node_modules/$ENHANCED_PKG"
      "/opt/homebrew/lib/node_modules/$ENHANCED_PKG"
    )
    for gp in "${guess_paths[@]}"; do
      for dir in $gp; do
        if [ -d "$dir/dist/engine" ]; then
          enhanced_path="$dir"
          enhanced_ver="$(node -e "try{console.log(require('${enhanced_path}/package.json').version)}catch(e){console.log('unknown')}" 2>/dev/null)" || enhanced_ver="unknown"
          ok "Found manual installation v${enhanced_ver} at: ${enhanced_path}"
          ENHANCED_PKG_PATH="$enhanced_path"
          ENHANCED_PKG_VER="$enhanced_ver"
          INSTALL_METHOD="upgrade"
          return 0
        fi
      done
    done
    warn "$ENHANCED_PKG is not installed. Will install fresh."
    INSTALL_METHOD="fresh"
  fi
}

# ── Step 4: Install Enhanced Package ────────────────────────────

install_enhanced() {
  header "Step 4/7: Installing openclaw-cn-enhanced"

  local npm_tag="${NPM_TAG:-latest}"

  if [ "$INSTALL_METHOD" = "upgrade" ]; then
    log "Upgrading existing installation..."

    # Check if npm registry has a newer version
    local latest_ver
    latest_ver="$(npm view "$ENHANCED_PKG" version 2>/dev/null || echo "")"
    if [ -n "$latest_ver" ] && [ "$latest_ver" != "$ENHANCED_PKG_VER" ] && [ "$FORCE" = false ]; then
      info "npm registry has v${latest_ver}, you have v${ENHANCED_PKG_VER}"
      info "Run with --force to reinstall, or use --npm-tag for a specific version"
    fi

    if [ "$FORCE" = false ]; then
      ok "Already installed v${ENHANCED_PKG_VER}. Use --force to reinstall."
      return 0
    fi
  fi

  # ── Method 1: npm install (primary) ──
  log "Attempting npm install..."
  local npm_cmd="npm install -g ${ENHANCED_PKG}@${npm_tag}"
  local npm_args="--registry=${NPM_REGISTRY}"

  if maybe_run "$npm_cmd $npm_args"; then
    ENHANCED_PKG_PATH="$(get_global_pkg_path "$ENHANCED_PKG")"
    ENHANCED_PKG_VER="$(node -e "try{console.log(require('${ENHANCED_PKG_PATH}/package.json').version)}catch(e){console.log('unknown')}" 2>/dev/null)" || ENHANCED_PKG_VER="unknown"
    ENHANCED_PKG_BIN="$(get_bin_path openclaw-enhanced)" || true
    ok "Installed v${ENHANCED_PKG_VER} via npm"
    info "Package path: ${ENHANCED_PKG_PATH}"
    info "Binary: ${ENHANCED_PKG_BIN:-openclaw-enhanced}"
    INSTALL_METHOD="npm"
    return 0
  fi

  warn "npm install failed."

  # ── Method 2: GitHub tarball (fallback) ──
  log "Attempting GitHub tarball download..."
  local tarball_url="https://api.github.com/repos/${GITHUB_REPO}/tarball/${GITHUB_REF}"
  local tmp_dir
  tmp_dir="$(mktemp -d /tmp/openclaw-enhanced-install.XXXXXX)"

  if command_exists curl; then
    info "Downloading from: ${tarball_url}"

    if [ "$DRY_RUN" = true ]; then
      info "[DRY RUN] Would download tarball to ${tmp_dir}"
      info "[DRY RUN] Would extract and copy to npm global root"
    else
      if curl -fsSL "$tarball_url" -o "${tmp_dir}/enhanced.tar.gz" 2>/dev/null; then
        ok "Downloaded tarball"

        # Extract
        cd "$tmp_dir"
        tar xzf enhanced.tar.gz --strip-components=1 2>/dev/null || {
          warn "Failed to extract tarball. Trying alternative extraction..."
          # The GitHub tarball nests everything in a repo-ref dir
          local extracted_dir
          extracted_dir="$(tar tzf enhanced.tar.gz 2>/dev/null | head -1 | cut -d/ -f1)"
          tar xzf enhanced.tar.gz 2>/dev/null
          if [ -d "$extracted_dir" ]; then
            mv "$extracted_dir"/* . 2>/dev/null || true
            mv "$extracted_dir"/.[!.]* . 2>/dev/null || true
          fi
        }

        # Copy to npm global root
        local npm_root
        npm_root="$(npm root -g)"
        local target_dir="${npm_root}/${ENHANCED_PKG}"

        mkdir -p "$target_dir"
        cp -r ./* "$target_dir/" 2>/dev/null || true
        cp -r ./.??* "$target_dir/" 2>/dev/null || true

        # Create bin symlink
        local npm_bin
        npm_bin="$(npm bin -g 2>/dev/null || echo "${npm_root}/../bin")"
        if [ -f "$target_dir/bin/openclaw-enhanced" ]; then
          ln -sf "$target_dir/bin/openclaw-enhanced" "${npm_bin}/openclaw-enhanced" 2>/dev/null || true
          chmod +x "$target_dir/bin/openclaw-enhanced" 2>/dev/null || true
          chmod +x "${npm_bin}/openclaw-enhanced" 2>/dev/null || true
        fi

        ok "Installed via GitHub tarball"
        INSTALL_METHOD="github-tarball"
        ENHANCED_PKG_PATH="$target_dir"

        # Cleanup
        rm -rf "$tmp_dir"
        return 0
      else
        warn "Failed to download tarball."
      fi
    fi
  else
    warn "curl is not available. Skipping GitHub download."
  fi

  # ── Method 3: Manual instructions (last resort) ──
  warn "Automatic installation failed."
  echo ""
  echo -e "  ${YELLOW}${BOLD}Manual Installation Instructions:${NC}"
  echo ""
  echo -e "  1. Clone the repository:"
  echo -e "     git clone https://github.com/${GITHUB_REPO}.git"
  echo -e ""
  echo -e "  2. Navigate to the enhanced package directory and run:"
  echo -e "     cd openclaw-cn"
  echo -e "     npm install -g ."
  echo -e ""
  echo -e "  3. Or install directly from npm (requires network):"
  echo -e "     npm install -g ${ENHANCED_PKG}"
  echo ""

  if [ "$DRY_RUN" = true ]; then
    log "[DRY RUN] Manual install instructions shown. Skipping abort."
    return 0
  fi

  die "Could not install ${ENHANCED_PKG} automatically.\n\n  Please follow the manual instructions above."
}

# ── Step 5: Configure ───────────────────────────────────────────

configure_enhanced() {
  header "Step 5/7: Setting Up Configuration"

  # Create enhanced home directory
  if [ ! -d "$ENHANCED_HOME" ]; then
    maybe_run "mkdir -p '$ENHANCED_HOME'"
    ok "Created ${ENHANCED_HOME}/"
  else
    ok "Config directory exists: ${ENHANCED_HOME}/"
  fi

  # Create subdirectories
  local subdirs=("workspace" "config" "sessions" "logs" "memory" "stats" "cron" "scripts" "subagents" "devices" "identity")
  for d in "${subdirs[@]}"; do
    if [ ! -d "${ENHANCED_HOME}/${d}" ]; then
      maybe_run "mkdir -p '${ENHANCED_HOME}/${d}'"
      info "Created ${ENHANCED_HOME}/${d}/"
    fi
  done

  # ── thinking.conf ──
  local thinking_conf="${ENHANCED_HOME}/thinking.conf"
  if [ -f "$thinking_conf" ] && [ "$FORCE" = false ]; then
    local current_think
    current_think="$(cat "$thinking_conf" 2>/dev/null | tr -d '\n' | xargs)"
    ok "thinking.conf exists (mode: ${current_think:-empty}). Use --force to overwrite."
  else
    maybe_run "echo 'auto' > '$thinking_conf'"
    ok "thinking.conf created (default mode: auto)"
  fi

  # ── Default config if missing ──
  local enhanced_conf="${ENHANCED_HOME}/openclaw-enhanced.json"
  if [ ! -f "$enhanced_conf" ]; then
    if [ "$DRY_RUN" = false ]; then
      # 从用户已有的 openclaw-cn 配置中读取模型信息
      node --input-type=module -e "
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const home = homedir();
const paths = ['${HOME}/.openclaw/openclaw.json', '${HOME}/.clawdbot/config.json'];
let modelRefs = [];
let fallbacks = [];

for (const p of paths) {
  try {
    const cfg = JSON.parse(readFileSync(p, 'utf8'));
    const defaults = cfg.agents?.defaults;
    if (defaults?.model?.primary) modelRefs.push(defaults.model.primary);
    if (defaults?.fallbacks) fallbacks = defaults.fallbacks;
    if (defaults?.models) {
      for (const [ref, info] of Object.entries(defaults.models)) {
        if (!modelRefs.includes(ref)) modelRefs.push(ref);
      }
    }
    if (modelRefs.length > 0) break;
  } catch {}
}

// 如果读不到已有配置，使用通用占位说明
const modelsObj = {};
for (const ref of modelRefs) {
  const label = ref.split('/').pop() || ref;
  modelsObj[ref] = { alias: label };
}
if (modelRefs.length === 0) {
  modelRefs = ['YOUR_MODEL_REF_HERE'];
  modelsObj['YOUR_MODEL_REF_HERE'] = { alias: 'YOUR_MODEL_NAME' };
  fallbacks = ['YOUR_FALLBACK_MODEL_REF'];
}

const config = {
  gateway: { port: ${ENHANCED_PORT}, mode: 'local', bind: 'lan', auth: { mode: 'token' } },
  agents: {
    defaults: {
      model: { primary: modelRefs[0] },
      models: modelsObj,
      fallbacks: fallbacks.length > 0 ? fallbacks : modelRefs.slice(1)
    }
  },
  meta: { lastTouchedVersion: '0.1.0', lastTouchedAt: new Date().toISOString() }
};

mkdirSync('${ENHANCED_HOME}', { recursive: true });
writeFileSync('${enhanced_conf}', JSON.stringify(config, null, 2));
console.log('configured');
" 2>/dev/null || {
        # Node fallback 失败：写入最小配置
        cat > "$enhanced_conf" <<'JSONEOF'
{
  "gateway": { "port": 18790, "mode": "local", "bind": "lan", "auth": { "mode": "token" } },
  "agents": {
    "defaults": {
      "model": { "primary": "YOUR_MODEL_REF_HERE" },
      "models": { "YOUR_MODEL_REF_HERE": { "alias": "YOUR_MODEL_NAME" } },
      "fallbacks": []
    }
  },
  "_comment": "请根据你的 openclaw-cn 配置修改 model.primary、models 和 fallbacks"
}
JSONEOF
      }
      ok "Created openclaw-enhanced.json (auto-detected models from your config)"
    else
      log "[DRY RUN] Would create openclaw-enhanced.json"
    fi
  else
    ok "openclaw-enhanced.json exists. Skipping."
  fi

  # ── Copy workspace files from base if missing ──
  local base_ws=""
  if [ -d "${HOME}/.openclaw/workspace" ]; then
    base_ws="${HOME}/.openclaw/workspace"
  elif [ -d "${HOME}/.clawdbot/workspace" ]; then
    base_ws="${HOME}/.clawdbot/workspace"
  fi

  if [ -n "$base_ws" ]; then
    local enhanced_ws="${ENHANCED_HOME}/workspace"
    for f in SOUL.md IDENTITY.md AGENTS.md MEMORY.md USER.md TOOLS.md HEARTBEAT.md; do
      if [ -f "${base_ws}/${f}" ] && [ ! -f "${enhanced_ws}/${f}" ]; then
        maybe_run "cp '${base_ws}/${f}' '${enhanced_ws}/${f}'"
        info "Copied ${f} from base workspace"
      fi
    done
  fi
}

# ── Step 6: Verify ──────────────────────────────────────────────

verify_installation() {
  header "Step 6/7: Verifying Installation"

  local all_ok=true

  # Check package path
  if [ -n "${ENHANCED_PKG_PATH:-}" ] && [ -d "${ENHANCED_PKG_PATH:-}/dist/engine" ]; then
    ok "Package directory: ${ENHANCED_PKG_PATH}"

    # Count engine modules
    local module_count
    module_count="$(ls "${ENHANCED_PKG_PATH}/dist/engine/"*.cjs 2>/dev/null | wc -l)"
    info "${module_count} engine modules found"
  else
    err "Enhanced package directory not found or incomplete"
    all_ok=false
  fi

  # Check binary
  if command_exists openclaw-enhanced; then
    ok "Binary: $(command -v openclaw-enhanced)"
  else
    warn "openclaw-enhanced not in PATH"
    info "You can run it directly: node ${ENHANCED_PKG_PATH:-/usr/lib/node_modules/openclaw-cn-enhanced}/dist/enhanced-entry.js"
  fi

  # Check config
  if [ -d "$ENHANCED_HOME" ]; then
    ok "Config directory: ${ENHANCED_HOME}/"
    [ -f "${ENHANCED_HOME}/thinking.conf" ] && info "thinking.conf ✓" || info "thinking.conf (will be created at first run)"
  fi

  if [ "$all_ok" = false ]; then
    warn "Some checks failed. See above for details."
  fi
}

# ── Step 7: Next Steps ──────────────────────────────────────────

show_next_steps() {
  header "Step 7/7: Next Steps"

  local port="${ENHANCED_PORT:-18790}"

  echo ""
  echo -e "  ${GREEN}${BOLD}Installation complete!${NC}"
  echo ""
  echo -e "  ${BOLD}To start the enhanced gateway:${NC}"
  echo ""
  echo -e "    ${CYAN}openclaw-enhanced gateway${NC}"
  echo ""
  echo -e "  ${BOLD}Or to restart an existing gateway with enhancements:${NC}"
  echo ""
  if command_exists systemctl 2>/dev/null; then
    echo -e "    ${CYAN}openclaw gateway stop${NC}    # Stop current gateway"
    echo -e "    ${CYAN}openclaw-enhanced gateway --port ${port}${NC}"
    echo ""
    echo -e "  Or install as a systemd service:"
    echo -e "    ${CYAN}openclaw-enhanced gateway --install-daemon${NC}"
  else
    echo -e "    ${CYAN}openclaw gateway stop${NC}    # Stop current gateway"
    echo -e "    ${CYAN}openclaw-enhanced gateway --port ${port}${NC}"
  fi
  echo ""
  echo -e "  The enhanced UI is available at:"
  echo -e "    ${CYAN}http://localhost:${port}${NC}"
  echo ""
  echo -e "  ${BOLD}Enhanced features:${NC}"
  echo -e "    • Three-level deep thinking (off / auto / manual)"
  echo -e "    • Model quality tracking & auto-fallback"
  echo -e "    • Enhanced system prompt injection"
  echo -e "    • Stream recovery & micro-compaction"
  echo -e "    • Prompt caching & block management"
  echo -e "    • SDK layer for programmatic access"
  echo -e "    • Remote bridge for multi-device control"
  echo -e "    • Enhanced control UI dashboard"
  echo ""
  echo -e "  ${BOLD}Configuration:${NC}"
  echo -e "    thinking.conf:  ${ENHANCED_HOME}/thinking.conf  (values: off, auto, manual)"
  echo -e "    main config:    ${ENHANCED_HOME}/openclaw-enhanced.json"
  echo ""

  if [ "$DRY_RUN" = true ]; then
    echo -e "  ${YELLOW}[DRY RUN] No changes were made.${NC}"
    echo -e "  Run without --dry-run to actually install."
    echo ""
  fi
}

# ── Banner ──────────────────────────────────────────────────────

banner() {
  echo ""
  echo -e "${BOLD}${BLUE}"
  echo "   ╔═══════════════════════════════════════════╗"
  echo "   ║     OpenClaw Enhanced Installer          ║"
  echo "   ║     v0.2.0  —  Chinese Community Edition  ║"
  echo "   ╚═══════════════════════════════════════════╝"
  echo -e "${NC}"
  echo ""
  echo "  This script will install the enhanced package"
  echo "  alongside your existing openclaw-cn installation."
  echo ""
  echo "  Config directory: ${ENHANCED_HOME}"
  echo ""
}

# ── Main ────────────────────────────────────────────────────────

main() {
  banner

  check_prerequisites
  check_base_package
  check_enhanced_status
  install_enhanced
  configure_enhanced
  verify_installation
  show_next_steps
}

# ── Parse Args ──────────────────────────────────────────────────

NPM_TAG="latest"

while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --force)
      FORCE=true
      shift
      ;;
    --quiet)
      QUIET=true
      shift
      ;;
    --branch)
      GITHUB_REF="$2"
      shift 2
      ;;
    --npm-tag)
      NPM_TAG="$2"
      shift 2
      ;;
    --registry)
      NPM_REGISTRY="$2"
      shift 2
      ;;
    --help|-h)
      usage
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage."
      exit 1
      ;;
  esac
done

mai  # ── Auto-detect models from base openclaw-cn config ──
  log "Auto-detecting models from base config..."
  
  # Try to find base config
  BASE_CONFIG=""
  for candidate in "$HOME/.openclaw/openclaw.json" "$HOME/.openclaw/config.json" \
                     "$HOME/.openclaw-cn/config.json" "$HOME/.openclaw-cn/openclaw.json"; do
    if [ -f "$candidate" ]; then
      BASE_CONFIG="$candidate"
      break
    fi
  done
  
  if [ -n "$BASE_CONFIG" ]; then
    ok "Found base config: $BASE_CONFIG"
    node --input-type=module -e "
      import { readFileSync, writeFileSync } from 'fs';
      const base = JSON.parse(readFileSync('$BASE_CONFIG', 'utf8'));
      const models = base.agents?.defaults?.models || {};
      const modelIds = Object.keys(models);
      const primary = modelIds[0] || 'your-model-id';
      const fallbacks = modelIds.slice(1);
      const modelsEntry = {};
      for (const id of modelIds) {
        modelsEntry[id] = { alias: models[id]?.alias || id.split('/').pop() };
      }
      const config = {
        version: '0.1.0',
        enhanced: { bridgeEnabled: true, featureGating: true, modelQualityTracking: true, streamRecovery: true },
        agents: { defaults: { model: { primary }, models: modelsEntry, fallbacks } },
        meta: { lastTouchedVersion: '0.1.0', lastTouchedAt: null }
      };
      writeFileSync('$ENHANCED_HOME/config/openclaw-enhanced.json', JSON.stringify(config, null, 2));
      console.log('Generated config with ' + modelIds.length + ' models from base config');
    " 2>/dev/null || {
      warn "Could not parse base config. Writing generic template with YOUR_MODEL_HERE placeholder."
      cat > "$ENHANCED_HOME/config/openclaw-enhanced.json" << 'JSONEOF'
{
  "version": "0.1.0",
  "enhanced": {
    "bridgeEnabled": true,
    "featureGating": true,
    "modelQualityTracking": true,
    "streamRecovery": true
  },
  "agents": {
    "defaults": {
      "model": { "primary": "YOUR_MODEL_HERE" },
      "models": {},
      "fallbacks": []
    }
  },
  "meta": {
    "lastTouchedVersion": "0.1.0"
  }
}
JSONEOF
    }
  else
    warn "No base config found. Writing generic template with YOUR_MODEL_HERE placeholder."
    cat > "$ENHANCED_HOME/config/openclaw-enhanced.json" << 'JSONEOF'
{
  "version": "0.1.0",
  "enhanced": {
    "bridgeEnabled": true,
    "featureGating": true,
    "modelQualityTracking": true,
    "streamRecovery": true
  },
  "agents": {
    "defaults": {
      "model": { "primary": "YOUR_MODEL_HERE" },
      "models": {},
      "fallbacks": []
    }
  },
  "meta": {
    "lastTouchedVersion": "0.1.0"
  }
}
JSONEOF
  fi
bin/env bash
# ================================================================
# OpenClaw Enhanced — One-line Installer
# ================================================================
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/jiulingyun/openclaw-cn/main/install.sh | bash
#   bash install.sh --dry-run
#   bash install.sh --branch main
#   bash install.sh --force
#
# What it does:
#   1. Checks prerequisites (bash, node >= 18, npm)
#   2. Detects base openclaw-cn installation
#   3. Installs/upgrades openclaw-cn-enhanced via npm
#   4. Creates ~/.openclaw-enhanced/ config directory
#   5. Writes default thinking.conf (skips if exists)
#   6. Copies workspace files from base if missing
#   7. Shows next steps to restart gateway
#
# Design principles:
#   - Uses $HOME, never hardcodes /root
#   - Never overwrites existing user config
#   - Clear step-by-step output
#   - Clean error messages on failure
#   - Supports --dry-run, --force, --branch, --help
# ================================================================

set -euo pipefail

# ── Colors ──────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ── Globals ─────────────────────────────────────────────────────
DRY_RUN=false
FORCE=false
QUIET=false
BRANCH=""
INSTALL_METHOD=""    # npm | github-tarball | manual
ENHANCED_HOME="${HOME}/.openclaw-enhanced"
BASE_PKG="openclaw-cn"
ENHANCED_PKG="openclaw-cn-enhanced"
NPM_REGISTRY="${NPM_REGISTRY:-https://registry.npmjs.org}"
GITHUB_REPO="${GITHUB_REPO:-jiulingyun/openclaw-cn}"
GITHUB_REF="${GITHUB_REF:-main}"

# ── Helpers ─────────────────────────────────────────────────────

log()  { echo -e "  ${CYAN}→${NC} $*"; }
ok()   { echo -e "  ${GREEN}✓${NC} $*"; }
warn() { echo -e "  ${YELLOW}⚠${NC} $*" >&2; }
err()  { echo -e "  ${RED}✗${NC} $*" >&2; }
info() { echo -e "    ${BLUE}$*${NC}"; }

header() {
  echo ""
  echo -e "${BOLD}${BLUE}┌──────────────────────────────────────────────────┐${NC}"
  printf  "${BOLD}${BLUE}│${NC}  %-48s ${BOLD}${BLUE}│${NC}\n" "$*"
  echo -e "${BOLD}${BLUE}└──────────────────────────────────────────────────┘${NC}"
  echo ""
}

die() {
  echo ""
  echo -e "  ${RED}${BOLD}INSTALL FAILED${NC}"
  echo -e "  ${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "  $*"
  echo ""
  exit 1
}

dry_run() {
  if [ "$DRY_RUN" = true ]; then
    echo -e "  ${YELLOW}[DRY RUN]${NC} Would execute: $*"
    return 0
  fi
  return 1
}

maybe_run() {
  if dry_run "$*"; then return 0; fi
  eval "$*"
}

command_exists() { command -v "$1" >/dev/null 2>&1; }

check_global_pkg() {
  # Returns 0 if the npm global package is installed
  npm list -g "$1" --depth=0 >/dev/null 2>&1
}

get_global_pkg_path() {
  # Returns the installation directory of a global npm package
  local root
  root="$(npm root -g 2>/dev/null || echo "")"
  if [ -n "$root" ] && [ -d "$root/$1" ]; then
    echo "$root/$1"
  fi
}

get_bin_path() {
  # Returns the full path to a binary
  local bin
  bin="$(command -v "$1" 2>/dev/null || echo "")"
  if [ -n "$bin" ]; then
    readlink -f "$bin" 2>/dev/null || echo "$bin"
  fi
}

# ── Usage ───────────────────────────────────────────────────────

usage() {
  cat <<EOF
${BOLD}OpenClaw Enhanced — One-line Installer${NC}

Usage: bash install.sh [OPTIONS]

${BOLD}Options:${NC}
  --dry-run        Preview actions without making changes
  --force          Overwrite existing config files (default: skip)
  --quiet          Suppress info messages, show only errors
  --branch <ref>   Install from a specific GitHub branch/tag
                   (default: main, used for manual tarball fallback)
  --npm-tag <tag>  npm dist-tag to install (e.g. "latest", "beta")
                   (default: latest)
  --registry <url> npm registry URL (default: https://registry.npmjs.org)
  --help           Show this help message

${BOLD}Examples:${NC}
  bash install.sh                  # Normal install
  bash install.sh --dry-run        # Preview only
  bash install.sh --force          # Full reinstall, overwrite configs
  bash install.sh --branch dev     # Install dev branch

${BOLD}One-liner:${NC}
  curl -fsSL https://raw.githubusercontent.com/jiulingyun/openclaw-cn/main/install.sh | bash

${BOLD}What this script does:${NC}
  1. Check prerequisites (bash, node>=18, npm)
  2. Detect base openclaw-cn installation
  3. Install openclaw-cn-enhanced (npm or GitHub tarball)
  4. Create ~/.openclaw-enhanced/ config directory
  5. Write default thinking.conf (skips if exists)
  6. Copy workspace files from base if missing
  7. Show next steps to restart gateway
EOF
  exit 0
}

# ── Step 1: Check Environment ───────────────────────────────────

check_prerequisites() {
  header "Step 1/7: Checking Environment"

  # Bash
  if [ -z "${BASH_VERSION:-}" ]; then
    die "This script requires bash. Please run: bash install.sh"
  fi
  ok "bash ${BASH_VERSION}"

  # Node.js
  if ! command_exists node; then
    die "Node.js is not installed.\n\n  Install it from: https://nodejs.org/\n  Minimum required: Node.js 18+"
  fi
  local node_ver
  node_ver="$(node -v 2>/dev/null | sed 's/v//')"
  local node_major="${node_ver%%.*}"
  if [ "$node_major" -lt 18 ]; then
    die "Node.js $node_ver is too old.\n\n  Minimum required: Node.js 18+\n  Current: $node_ver\n  Upgrade from: https://nodejs.org/"
  fi
  ok "Node.js v${node_ver}"

  # npm
  if ! command_exists npm; then
    die "npm is not installed. It usually comes with Node.js.\n\n  Install Node.js from: https://nodejs.org/"
  fi
  local npm_ver
  npm_ver="$(npm -v 2>/dev/null)"
  ok "npm v${npm_ver}"

  # Home directory
  if [ -z "${HOME:-}" ]; then
    die "\$HOME is not set. Please set your home directory."
  fi
  ok "\$HOME = ${HOME}"

  log "Environment checks passed."
}

# ── Step 2: Check Base Package ──────────────────────────────────

check_base_package() {
  header "Step 2/7: Checking Base openclaw-cn"

  local base_path=""
  local base_bin=""

  # Check if openclaw binary exists
  base_bin="$(get_bin_path openclaw)" || true
  if [ -n "$base_bin" ]; then
    ok "Found openclaw binary: ${base_bin}"
  fi

  # Check npm global
  if check_global_pkg "$BASE_PKG"; then
    base_path="$(get_global_pkg_path "$BASE_PKG")"
    ok "Found $BASE_PKG in global npm: ${base_path}"
  elif check_global_pkg "clawdbot-cn"; then
    # Some versions use clawdbot-cn as the package name
    base_path="$(get_global_pkg_path "clawdbot-cn")"
    ok "Found clawdbot-cn in global npm: ${base_path}"
  fi

  # Check common paths
  if [ -z "$base_path" ]; then
    local guess_paths=(
      "/usr/lib/node_modules/$BASE_PKG"
      "/usr/local/lib/node_modules/$BASE_PKG"
      "${HOME}/.nvm/versions/node/*/lib/node_modules/$BASE_PKG"
      "/opt/homebrew/lib/node_modules/$BASE_PKG"
    )
    for gp in "${guess_paths[@]}"; do
      # Expand globs
      for dir in $gp; do
        if [ -d "$dir/dist" ]; then
          base_path="$dir"
          break 2
        fi
      done
    done
  fi

  if [ -z "$base_path" ]; then
    warn "$BASE_PKG is not installed."
    echo ""
    echo -e "  ${YELLOW}openclaw-cn-enhanced requires the base package 'openclaw-cn'.${NC}"
    echo ""
    echo -e "  ${BOLD}Install the base package first:${NC}"
    echo -e "    npm install -g openclaw-cn"
    echo -e "    openclaw onboard --install-daemon"
    echo ""
    echo -e "  Continue anyway? The enhanced package shares entry points"
    echo -e "  with the base and may not work without it."
    echo ""
    if [ "$DRY_RUN" = false ]; then
      read -r -p "  Continue without base package? [y/N] " reply
      case "$reply" in
        [Yy]*) log "Continuing without base package..." ;;
        *) die "Aborted. Install base package first:\n  npm install -g openclaw-cn" ;;
      esac
    else
      log "[DRY RUN] Would prompt to continue without base package"
    fi
  else
    # Get package version
    local pkg_ver
    pkg_ver="$(node -e "try{console.log(require('${base_path}/package.json').version)}catch(e){console.log('unknown')}" 2>/dev/null)" || pkg_ver="unknown"
    ok "Base version: ${pkg_ver}"

    # Export for later use
    BASE_PKG_PATH="$base_path"
  fi
}

# ── Step 3: Check Enhanced Package Status ───────────────────────

check_enhanced_status() {
  header "Step 3/7: Checking Enhanced Package Status"

  local enhanced_path=""
  local enhanced_ver=""
  local enhanced_bin=""

  # Check bin
  enhanced_bin="$(get_bin_path openclaw-enhanced)" || true
  if [ -n "$enhanced_bin" ]; then
    ok "Found openclaw-enhanced binary: ${enhanced_bin}"
  fi

  # Check npm global
  if check_global_pkg "$ENHANCED_PKG"; then
    enhanced_path="$(get_global_pkg_path "$ENHANCED_PKG")"
    enhanced_ver="$(node -e "try{console.log(require('${enhanced_path}/package.json').version)}catch(e){console.log('unknown')}" 2>/dev/null)" || enhanced_ver="unknown"
    ok "Found $ENHANCED_PKG v${enhanced_ver} at: ${enhanced_path}"

    # Export
    ENHANCED_PKG_PATH="$enhanced_path"
    ENHANCED_PKG_VER="$enhanced_ver"
    INSTALL_METHOD="upgrade"
  else
    # Search for manual installation
    local guess_paths=(
      "/usr/lib/node_modules/$ENHANCED_PKG"
      "/usr/local/lib/node_modules/$ENHANCED_PKG"
      "${HOME}/.nvm/versions/node/*/lib/node_modules/$ENHANCED_PKG"
      "/opt/homebrew/lib/node_modules/$ENHANCED_PKG"
    )
    for gp in "${guess_paths[@]}"; do
      for dir in $gp; do
        if [ -d "$dir/dist/engine" ]; then
          enhanced_path="$dir"
          enhanced_ver="$(node -e "try{console.log(require('${enhanced_path}/package.json').version)}catch(e){console.log('unknown')}" 2>/dev/null)" || enhanced_ver="unknown"
          ok "Found manual installation v${enhanced_ver} at: ${enhanced_path}"
          ENHANCED_PKG_PATH="$enhanced_path"
          ENHANCED_PKG_VER="$enhanced_ver"
          INSTALL_METHOD="upgrade"
          return 0
        fi
      done
    done
    warn "$ENHANCED_PKG is not installed. Will install fresh."
    INSTALL_METHOD="fresh"
  fi
}

# ── Step 4: Install Enhanced Package ────────────────────────────

install_enhanced() {
  header "Step 4/7: Installing openclaw-cn-enhanced"

  local npm_tag="${NPM_TAG:-latest}"

  if [ "$INSTALL_METHOD" = "upgrade" ]; then
    log "Upgrading existing installation..."

    # Check if npm registry has a newer version
    local latest_ver
    latest_ver="$(npm view "$ENHANCED_PKG" version 2>/dev/null || echo "")"
    if [ -n "$latest_ver" ] && [ "$latest_ver" != "$ENHANCED_PKG_VER" ] && [ "$FORCE" = false ]; then
      info "npm registry has v${latest_ver}, you have v${ENHANCED_PKG_VER}"
      info "Run with --force to reinstall, or use --npm-tag for a specific version"
    fi

    if [ "$FORCE" = false ]; then
      ok "Already installed v${ENHANCED_PKG_VER}. Use --force to reinstall."
      return 0
    fi
  fi

  # ── Method 1: npm install (primary) ──
  log "Attempting npm install..."
  local npm_cmd="npm install -g ${ENHANCED_PKG}@${npm_tag}"
  local npm_args="--registry=${NPM_REGISTRY}"

  if maybe_run "$npm_cmd $npm_args"; then
    ENHANCED_PKG_PATH="$(get_global_pkg_path "$ENHANCED_PKG")"
    ENHANCED_PKG_VER="$(node -e "try{console.log(require('${ENHANCED_PKG_PATH}/package.json').version)}catch(e){console.log('unknown')}" 2>/dev/null)" || ENHANCED_PKG_VER="unknown"
    ENHANCED_PKG_BIN="$(get_bin_path openclaw-enhanced)" || true
    ok "Installed v${ENHANCED_PKG_VER} via npm"
    info "Package path: ${ENHANCED_PKG_PATH}"
    info "Binary: ${ENHANCED_PKG_BIN:-openclaw-enhanced}"
    INSTALL_METHOD="npm"
    return 0
  fi

  warn "npm install failed."

  # ── Method 2: GitHub tarball (fallback) ──
  log "Attempting GitHub tarball download..."
  local tarball_url="https://api.github.com/repos/${GITHUB_REPO}/tarball/${GITHUB_REF}"
  local tmp_dir
  tmp_dir="$(mktemp -d /tmp/openclaw-enhanced-install.XXXXXX)"

  if command_exists curl; then
    info "Downloading from: ${tarball_url}"

    if [ "$DRY_RUN" = true ]; then
      info "[DRY RUN] Would download tarball to ${tmp_dir}"
      info "[DRY RUN] Would extract and copy to npm global root"
    else
      if curl -fsSL "$tarball_url" -o "${tmp_dir}/enhanced.tar.gz" 2>/dev/null; then
        ok "Downloaded tarball"

        # Extract
        cd "$tmp_dir"
        tar xzf enhanced.tar.gz --strip-components=1 2>/dev/null || {
          warn "Failed to extract tarball. Trying alternative extraction..."
          # The GitHub tarball nests everything in a repo-ref dir
          local extracted_dir
          extracted_dir="$(tar tzf enhanced.tar.gz 2>/dev/null | head -1 | cut -d/ -f1)"
          tar xzf enhanced.tar.gz 2>/dev/null
          if [ -d "$extracted_dir" ]; then
            mv "$extracted_dir"/* . 2>/dev/null || true
            mv "$extracted_dir"/.[!.]* . 2>/dev/null || true
          fi
        }

        # Copy to npm global root
        local npm_root
        npm_root="$(npm root -g)"
        local target_dir="${npm_root}/${ENHANCED_PKG}"

        mkdir -p "$target_dir"
        cp -r ./* "$target_dir/" 2>/dev/null || true
        cp -r ./.??* "$target_dir/" 2>/dev/null || true

        # Create bin symlink
        local npm_bin
        npm_bin="$(npm bin -g 2>/dev/null || echo "${npm_root}/../bin")"
        if [ -f "$target_dir/bin/openclaw-enhanced" ]; then
          ln -sf "$target_dir/bin/openclaw-enhanced" "${npm_bin}/openclaw-enhanced" 2>/dev/null || true
          chmod +x "$target_dir/bin/openclaw-enhanced" 2>/dev/null || true
          chmod +x "${npm_bin}/openclaw-enhanced" 2>/dev/null || true
        fi

        ok "Installed via GitHub tarball"
        INSTALL_METHOD="github-tarball"
        ENHANCED_PKG_PATH="$target_dir"

        # Cleanup
        rm -rf "$tmp_dir"
        return 0
      else
        warn "Failed to download tarball."
      fi
    fi
  else
    warn "curl is not available. Skipping GitHub download."
  fi

  # ── Method 3: Manual instructions (last resort) ──
  warn "Automatic installation failed."
  echo ""
  echo -e "  ${YELLOW}${BOLD}Manual Installation Instructions:${NC}"
  echo ""
  echo -e "  1. Clone the repository:"
  echo -e "     git clone https://github.com/${GITHUB_REPO}.git"
  echo -e ""
  echo -e "  2. Navigate to the enhanced package directory and run:"
  echo -e "     cd openclaw-cn"
  echo -e "     npm install -g ."
  echo -e ""
  echo -e "  3. Or install directly from npm (requires network):"
  echo -e "     npm install -g ${ENHANCED_PKG}"
  echo ""

  if [ "$DRY_RUN" = true ]; then
    log "[DRY RUN] Manual install instructions shown. Skipping abort."
    return 0
  fi

  die "Could not install ${ENHANCED_PKG} automatically.\n\n  Please follow the manual instructions above."
}

# ── Step 5: Configure ───────────────────────────────────────────

configure_enhanced() {
  header "Step 5/7: Setting Up Configuration"

  # Create enhanced home directory
  if [ ! -d "$ENHANCED_HOME" ]; then
    maybe_run "mkdir -p '$ENHANCED_HOME'"
    ok "Created ${ENHANCED_HOME}/"
  else
    ok "Config directory exists: ${ENHANCED_HOME}/"
  fi

  # Create subdirectories
  local subdirs=("workspace" "config" "sessions" "logs" "memory" "stats" "cron" "scripts" "subagents" "devices" "identity")
  for d in "${subdirs[@]}"; do
    if [ ! -d "${ENHANCED_HOME}/${d}" ]; then
      maybe_run "mkdir -p '${ENHANCED_HOME}/${d}'"
      info "Created ${ENHANCED_HOME}/${d}/"
    fi
  done

  # ── thinking.conf ──
  local thinking_conf="${ENHANCED_HOME}/thinking.conf"
  if [ -f "$thinking_conf" ] && [ "$FORCE" = false ]; then
    local current_think
    current_think="$(cat "$thinking_conf" 2>/dev/null | tr -d '\n' | xargs)"
    ok "thinking.conf exists (mode: ${current_think:-empty}). Use --force to overwrite."
  else
    maybe_run "echo 'auto' > '$thinking_conf'"
    ok "thinking.conf created (default mode: auto)"
  fi

  # ── Default config if missing ──
  local enhanced_conf="${ENHANCED_HOME}/openclaw-enhanced.json"
  if [ ! -f "$enhanced_conf" ]; then
    if [ "$DRY_RUN" = false ]; then
      # 从用户已有的 openclaw-cn 配置中读取模型信息
      node --input-type=module -e "
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

const home = homedir();
const paths = ['${HOME}/.openclaw/openclaw.json', '${HOME}/.clawdbot/config.json'];
let modelRefs = [];
let fallbacks = [];

for (const p of paths) {
  try {
    const cfg = JSON.parse(readFileSync(p, 'utf8'));
    const defaults = cfg.agents?.defaults;
    if (defaults?.model?.primary) modelRefs.push(defaults.model.primary);
    if (defaults?.fallbacks) fallbacks = defaults.fallbacks;
    if (defaults?.models) {
      for (const [ref, info] of Object.entries(defaults.models)) {
        if (!modelRefs.includes(ref)) modelRefs.push(ref);
      }
    }
    if (modelRefs.length > 0) break;
  } catch {}
}

// 如果读不到已有配置，使用通用占位说明
const modelsObj = {};
for (const ref of modelRefs) {
  const label = ref.split('/').pop() || ref;
  modelsObj[ref] = { alias: label };
}
if (modelRefs.length === 0) {
  modelRefs = ['YOUR_MODEL_REF_HERE'];
  modelsObj['YOUR_MODEL_REF_HERE'] = { alias: 'YOUR_MODEL_NAME' };
  fallbacks = ['YOUR_FALLBACK_MODEL_REF'];
}

const config = {
  gateway: { port: ${ENHANCED_PORT}, mode: 'local', bind: 'lan', auth: { mode: 'token' } },
  agents: {
    defaults: {
      model: { primary: modelRefs[0] },
      models: modelsObj,
      fallbacks: fallbacks.length > 0 ? fallbacks : modelRefs.slice(1)
    }
  },
  meta: { lastTouchedVersion: '0.1.0', lastTouchedAt: new Date().toISOString() }
};

mkdirSync('${ENHANCED_HOME}', { recursive: true });
writeFileSync('${enhanced_conf}', JSON.stringify(config, null, 2));
console.log('configured');
" 2>/dev/null || {
        # Node fallback 失败：写入最小配置
        cat > "$enhanced_conf" <<'JSONEOF'
{
  "gateway": { "port": 18790, "mode": "local", "bind": "lan", "auth": { "mode": "token" } },
  "agents": {
    "defaults": {
      "model": { "primary": "YOUR_MODEL_REF_HERE" },
      "models": { "YOUR_MODEL_REF_HERE": { "alias": "YOUR_MODEL_NAME" } },
      "fallbacks": []
    }
  },
  "_comment": "请根据你的 openclaw-cn 配置修改 model.primary、models 和 fallbacks"
}
JSONEOF
      }
      ok "Created openclaw-enhanced.json (auto-detected models from your config)"
    else
      log "[DRY RUN] Would create openclaw-enhanced.json"
    fi
  else
    ok "openclaw-enhanced.json exists. Skipping."
  fi

  # ── Copy workspace files from base if missing ──
  local base_ws=""
  if [ -d "${HOME}/.openclaw/workspace" ]; then
    base_ws="${HOME}/.openclaw/workspace"
  elif [ -d "${HOME}/.clawdbot/workspace" ]; then
    base_ws="${HOME}/.clawdbot/workspace"
  fi

  if [ -n "$base_ws" ]; then
    local enhanced_ws="${ENHANCED_HOME}/workspace"
    for f in SOUL.md IDENTITY.md AGENTS.md MEMORY.md USER.md TOOLS.md HEARTBEAT.md; do
      if [ -f "${base_ws}/${f}" ] && [ ! -f "${enhanced_ws}/${f}" ]; then
        maybe_run "cp '${base_ws}/${f}' '${enhanced_ws}/${f}'"
        info "Copied ${f} from base workspace"
      fi
    done
  fi
}

# ── Step 6: Verify ──────────────────────────────────────────────

verify_installation() {
  header "Step 6/7: Verifying Installation"

  local all_ok=true

  # Check package path
  if [ -n "${ENHANCED_PKG_PATH:-}" ] && [ -d "${ENHANCED_PKG_PATH:-}/dist/engine" ]; then
    ok "Package directory: ${ENHANCED_PKG_PATH}"

    # Count engine modules
    local module_count
    module_count="$(ls "${ENHANCED_PKG_PATH}/dist/engine/"*.cjs 2>/dev/null | wc -l)"
    info "${module_count} engine modules found"
  else
    err "Enhanced package directory not found or incomplete"
    all_ok=false
  fi

  # Check binary
  if command_exists openclaw-enhanced; then
    ok "Binary: $(command -v openclaw-enhanced)"
  else
    warn "openclaw-enhanced not in PATH"
    info "You can run it directly: node ${ENHANCED_PKG_PATH:-/usr/lib/node_modules/openclaw-cn-enhanced}/dist/enhanced-entry.js"
  fi

  # Check config
  if [ -d "$ENHANCED_HOME" ]; then
    ok "Config directory: ${ENHANCED_HOME}/"
    [ -f "${ENHANCED_HOME}/thinking.conf" ] && info "thinking.conf ✓" || info "thinking.conf (will be created at first run)"
  fi

  if [ "$all_ok" = false ]; then
    warn "Some checks failed. See above for details."
  fi
}

# ── Step 7: Next Steps ──────────────────────────────────────────

show_next_steps() {
  header "Step 7/7: Next Steps"

  local port="${ENHANCED_PORT:-18790}"

  echo ""
  echo -e "  ${GREEN}${BOLD}Installation complete!${NC}"
  echo ""
  echo -e "  ${BOLD}To start the enhanced gateway:${NC}"
  echo ""
  echo -e "    ${CYAN}openclaw-enhanced gateway${NC}"
  echo ""
  echo -e "  ${BOLD}Or to restart an existing gateway with enhancements:${NC}"
  echo ""
  if command_exists systemctl 2>/dev/null; then
    echo -e "    ${CYAN}openclaw gateway stop${NC}    # Stop current gateway"
    echo -e "    ${CYAN}openclaw-enhanced gateway --port ${port}${NC}"
    echo ""
    echo -e "  Or install as a systemd service:"
    echo -e "    ${CYAN}openclaw-enhanced gateway --install-daemon${NC}"
  else
    echo -e "    ${CYAN}openclaw gateway stop${NC}    # Stop current gateway"
    echo -e "    ${CYAN}openclaw-enhanced gateway --port ${port}${NC}"
  fi
  echo ""
  echo -e "  The enhanced UI is available at:"
  echo -e "    ${CYAN}http://localhost:${port}${NC}"
  echo ""
  echo -e "  ${BOLD}Enhanced features:${NC}"
  echo -e "    • Three-level deep thinking (off / auto / manual)"
  echo -e "    • Model quality tracking & auto-fallback"
  echo -e "    • Enhanced system prompt injection"
  echo -e "    • Stream recovery & micro-compaction"
  echo -e "    • Prompt caching & block management"
  echo -e "    • SDK layer for programmatic access"
  echo -e "    • Remote bridge for multi-device control"
  echo -e "    • Enhanced control UI dashboard"
  echo ""
  echo -e "  ${BOLD}Configuration:${NC}"
  echo -e "    thinking.conf:  ${ENHANCED_HOME}/thinking.conf  (values: off, auto, manual)"
  echo -e "    main config:    ${ENHANCED_HOME}/openclaw-enhanced.json"
  echo ""

  if [ "$DRY_RUN" = true ]; then
    echo -e "  ${YELLOW}[DRY RUN] No changes were made.${NC}"
    echo -e "  Run without --dry-run to actually install."
    echo ""
  fi
}

# ── Banner ──────────────────────────────────────────────────────

banner() {
  echo ""
  echo -e "${BOLD}${BLUE}"
  echo "   ╔═══════════════════════════════════════════╗"
  echo "   ║     OpenClaw Enhanced Installer          ║"
  echo "   ║     v0.2.0  —  Chinese Community Edition  ║"
  echo "   ╚═══════════════════════════════════════════╝"
  echo -e "${NC}"
  echo ""
  echo "  This script will install the enhanced package"
  echo "  alongside your existing openclaw-cn installation."
  echo ""
  echo "  Config directory: ${ENHANCED_HOME}"
  echo ""
}

# ── Main ────────────────────────────────────────────────────────

main() {
  banner

  check_prerequisites
  check_base_package
  check_enhanced_status
  install_enhanced
  configure_enhanced
  verify_installation
  show_next_steps
}

# ── Parse Args ──────────────────────────────────────────────────

NPM_TAG="latest"

while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --force)
      FORCE=true
      shift
      ;;
    --quiet)
      QUIET=true
      shift
      ;;
    --branch)
      GITHUB_REF="$2"
      shift 2
      ;;
    --npm-tag)
      NPM_TAG="$2"
      shift 2
      ;;
    --registry)
      NPM_REGISTRY="$2"
      shift 2
      ;;
    --help|-h)
      usage
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage."
      exit 1
      ;;
  esac
done

main