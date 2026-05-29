#!/usr/bin/env node
// ============================================================
// OpenClaw Enhanced — 增强版入口
//
// 职责：
// 1. 设置增强版环境变量（独立端口、数据目录）
// 2. 注册全部 28 个增强引擎模块到全局
// 3. 委托给 openclaw-cn 原始入口（spawn 子进程）
// ============================================================

const path = require('path');
const fs   = require('fs');
const os   = require('os');

// ── 1. 确定路径 ─────────────────────────────────────
const HOME          = os.homedir();
const ENHANCED_HOME = process.env.OPENCLAW_ENHANCED_HOME
  || path.join(HOME, '.openclaw-enhanced');
const ENHANCED_PORT = parseInt(
  process.env.OPENCLAW_ENHANCED_PORT || '18790', 10);

// 确保数据目录
const SUBDIRS = ['workspace', 'config', 'sessions', 'logs', 'memory', 'stats', 'tmp'];
for (const d of SUBDIRS) {
  fs.mkdirSync(path.join(ENHANCED_HOME, d), { recursive: true });
}

// ── 2. 环境变量 ─────────────────────────────────────
process.env.OPENCLAW_ENHANCED        = '1';
process.env.OPENCLAW_ENHANCED_HOME   = ENHANCED_HOME;
process.env.OPENCLAW_ENHANCED_DATA_DIR = ENHANCED_HOME;
process.env.OPENCLAW_ENHANCED_PORT   = String(ENHANCED_PORT);

// 将增强版目录暴露给 openclaw-cn
process.env.OPENCLAW_HOME = ENHANCED_HOME;

// ── 3. 加载引擎模块 ────────────────────────────────
const ENGINE_DIR = path.join(__dirname, 'engine');
const engines = {};

if (fs.existsSync(ENGINE_DIR)) {
  for (const f of fs.readdirSync(ENGINE_DIR)) {
    if (!f.endsWith('.cjs')) continue;
    const name = f.replace(/\.cjs$/, '');
    try {
      engines[name] = require(path.join(ENGINE_DIR, f));
    } catch (e) {
      // 非关键模块加载失败不阻断启动
      console.error(`[Enhanced] Failed to load engine/${f}:`, e.message);
    }
  }
}

// ── 4. 全局注册 ─────────────────────────────────────
global.__OPENCLAW_ENHANCED__ = {
  version:   '0.1.0',
  startTime: Date.now(),
  home:      ENHANCED_HOME,
  port:      ENHANCED_PORT,
  engines,
};

// ── 5. 查找 openclaw-cn 入口 ───────────────────────
let originalEntry = null;
const candidates = [
  // npm 全局安装
  path.join(
    process.env.npm_config_prefix || '/usr/local',
    'lib/node_modules/openclaw-cn-enhanced/dist/entry.js'),
  // 常见路径
  '/usr/lib/node_modules/openclaw-cn-enhanced/dist/entry.js',
  '/usr/local/lib/node_modules/openclaw-cn-enhanced/dist/entry.js',
  // HOME 安装
  path.join(HOME, 'node_modules/openclaw-cn-enhanced/dist/entry.js'),
  // require.resolve
];

// Try require.resolve first
try {
  originalEntry = require.resolve('openclaw-cn-enhanced/dist/entry.js');
} catch (_) { /* not found */ }

// Fallback: scan candidates
if (!originalEntry || !fs.existsSync(originalEntry)) {
  for (const c of candidates) {
    if (fs.existsSync(c)) { originalEntry = c; break; }
  }
}

if (!originalEntry || !fs.existsSync(originalEntry)) {
  console.error('[Enhanced] FATAL: cannot find openclaw-cn-enhanced/dist/entry.js');
  console.error('[Enhanced] Install: npm install -g openclaw-cn-enhanced');
  process.exit(1);
}

// ── 6. 复制 workspace 初始文件 ─────────────────────
const INIT_FILES = ['SOUL.md', 'IDENTITY.md', 'AGENTS.md', 'MEMORY.md', 'USER.md'];
for (const fn of INIT_FILES) {
  const dst = path.join(ENHANCED_HOME, 'workspace', fn);
  if (!fs.existsSync(dst)) {
    const src = path.join(HOME, '.openclaw', 'workspace', fn);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dst);
    }
  }
}

// ── 7. 默认 thinking 配置 ──────────────────────────
const thinkingConf = path.join(ENHANCED_HOME, 'config', 'thinking.conf');
if (!fs.existsSync(thinkingConf)) {
  fs.writeFileSync(thinkingConf, 'auto', 'utf-8');
}

// ── 8. 启动日志 ─────────────────────────────────────
const logFile = path.join(ENHANCED_HOME, 'logs', 'enhanced-startup.log');
fs.appendFileSync(logFile, JSON.stringify({
  timestamp: new Date().toISOString(),
  event:     'startup',
  version:   '0.1.0',
  home:      ENHANCED_HOME,
  port:      ENHANCED_PORT,
  pid:       process.pid,
  nodeVersion: process.version,
  engines:   Object.keys(engines).length + ' loaded',
}) + '\n');

console.error(
  `[Enhanced v0.1.0] ${Object.keys(engines).length}/28 engines loaded | ` +
  `port=${ENHANCED_PORT} | home=${ENHANCED_HOME}`);

// ── 9. 委托给 openclaw-cn ──────────────────────────
const { spawn } = require('child_process');
const args  = process.argv.slice(2);

const child = spawn(process.execPath, [
  ...process.execArgv,
  originalEntry,
  ...args,
], {
  stdio: 'inherit',
  env:   process.env,
});

child.on('exit', (code) => {
  fs.appendFileSync(logFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    event:     'shutdown',
    exitCode:  code,
  }) + '\n');
  process.exit(code || 0);
});

process.on('SIGINT',  () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));