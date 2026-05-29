/**
 * ThinkingManager.cjs — 思考模式管理
 * 状态持久化到 $HOME/.openclaw-enhanced/thinking.conf
 * 值: off / auto / manual
 */

const path = require('path');
const fs = require('fs');
const os = require('os');

const CONF_PATH = path.join(os.homedir(), '.openclaw-enhanced', 'thinking.conf');

function readConf() {
  try { return fs.readFileSync(CONF_PATH, 'utf-8').trim() || 'off'; }
  catch (_) { return 'off'; }
}

function writeConf(mode) {
  try { fs.writeFileSync(CONF_PATH, mode + '\n', 'utf-8'); return true; }
  catch (_) { return false; }
}

// ═══════════ Complexity detection ═══════════

const COMPLEX_KEYWORDS = [
  '分析','debug','调试','架构','设计','实现','重构','系统',
  '复杂','修复','排查','审查','优化','安全','审计',
  'review','refactor','implement','complex',
  '漏洞','加密','认证','并发','分布式','数据库','网络',
  '性能','调优','迁移','升级','接口','API','协议',
  '代码审查','架构设计','系统设计',
  '并行','拆分','多线程','异步','缓存','负载均衡',
  '算法','数据结构','设计模式',
  'analyze','architecture','debug','refactor',
  'optimize','security','audit','vulnerability',
  'encryption','authentication','concurrent',
  'distributed','performance','migration',
  'code review','architecture design',
  'parallel','algorithm','data structure','database',
];

const HIGH_SCORE_KW = new Set([
  '架构','architecture','重构','refactor',
  '安全','security','审计','audit',
  '设计','design','实现','implement',
  '复杂','complex','拆分','并行','parallel',
  '漏洞','vulnerability','加密','encryption',
  '数据库','database','分布式','distributed',
  '系统','网络',
]);

function detectComplexity(message) {
  if (!message || typeof message !== 'string') return { complex: false, reason: null, score: 0 };
  const text = message.trim();
  if (text.length < 10) return { complex: false, reason: null, score: 0 };

  let score = 0;
  const reasons = [];

  if (text.length > 200) { score += 2; reasons.push('long message'); }
  else if (text.length > 100) { score += 1; }

  const lower = text.toLowerCase();
  let highHits = 0, totalHits = 0;
  for (const kw of COMPLEX_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) {
      totalHits++;
      if (HIGH_SCORE_KW.has(kw)) highHits++;
    }
  }
  if (highHits > 0) { score += Math.min(highHits * 2, 6); reasons.push(highHits + ' high-priority keywords'); }
  else if (totalHits > 0) { score += Math.min(totalHits, 3); reasons.push(totalHits + ' keywords'); }

  const filePaths = (text.match(/[/\\][\w.\-\/\\]+/g) || []).filter(p => {
    const ext = p.match(/\.(\w+)$/);
    return ext && ['js','cjs','mjs','ts','py','java','go','rs','cpp','c','html','css'].includes(ext[1]);
  });
  if (filePaths.length >= 3) { score += 3; reasons.push('multi-file task'); }
  else if (filePaths.length >= 1) { score += 1; reasons.push('file-level task'); }

  if (/派.*子代理|spawn.*agent|sessions_spawn|并行.*代理|多个.*代理/.test(text)) {
    score += 3; reasons.push('multi-agent coordination');
  }

  if (/error|bug|crash|崩溃|报错|异常|故障|stack trace|堆栈/.test(lower)) {
    score += 2; reasons.push('debugging/error context');
  }

  return { complex: score >= 4, reason: reasons.join(', ') || null, score };
}

// ═══════════ Turn lifecycle ═══════════

function processTurnStart(message) {
  const conf = readConf();
  
  if (conf === 'manual') {
    // User manually enabled — force thinking ON
    return { notification: null, thinkingEnabled: true, mode: 'manual' };
  }
  
  if (conf === 'off') {
    return { notification: null, thinkingEnabled: false, mode: 'off' };
  }
  
  // conf === 'auto' — detect complexity
  const analysis = detectComplexity(message);
  if (analysis.complex) {
    return {
      notification: '🔍 检测到复杂任务，已自动开启深度思考模式',
      thinkingEnabled: true,
      mode: 'auto',
      reason: analysis.reason,
      score: analysis.score,
    };
  }
  return { notification: null, thinkingEnabled: false, mode: 'auto' };
}

function processTurnEnd() {
  return { notification: null };
}

// ═══════════ State API ═══════════

function getState() {
  const mode = readConf();
  return { mode };
}

function setState(mode) {
  if (!['off', 'auto', 'manual'].includes(mode)) return { error: 'invalid mode' };
  writeConf(mode);
  return { ok: true, mode };
}

// ═══════════ Status / Gateway API ═══════════

function getThinkingStatus() {
  return { mode: readConf() };
}

function toggleThinking() {
  const current = readConf();
  // Cycle: off → auto → manual → off
  const next = current === 'off' ? 'auto' : current === 'auto' ? 'manual' : 'off';
  writeConf(next);
  return { mode: next };
}

const gatewayMethods = {
  'thinking.status': {
    description: 'Get thinking mode',
    handler: async () => getThinkingStatus(),
  },
  'thinking.toggle': {
    description: 'Toggle thinking mode (off→auto→manual→off)',
    handler: async () => toggleThinking(),
  },
};

module.exports = {
  detectComplexity,
  processTurnStart,
  processTurnEnd,
  toggleThinking,
  getThinkingStatus,
  getState,
  setState,
  gatewayMethods,
};
