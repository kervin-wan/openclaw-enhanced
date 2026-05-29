/**
 * EnhancedSystemPrompt — 增强版系统提示词构建器
 * 
 * 包装现有的 buildAgentSystemPrompt，添加：
 * 1. 静态/动态分层（缓存边界标记）
 * 2. 缓存键生成
 * 3. Micro Compact 知情机制注入
 * 4. 结构化的提示词报告
 * 
 * 设计原则：最少侵入，复用现有构建逻辑。
 */

const crypto = require('crypto');
const { PROMPT_CACHE_BOUNDARY } = require('./PromptBlock.cjs');

/**
 * 动态加载 ESM 模块（buildAgentSystemPrompt）
 * 因为父包是 "type": "module"，dist/agents/system-prompt.js 是 ESM
 */
async function loadBuildAgentSystemPrompt() {
  const mod = await import('../agents/system-prompt.js');
  return mod.buildAgentSystemPrompt;
}

/** @type {Function|null} */
let _buildAgentSystemPrompt = null;

/**
 * 获取 buildAgentSystemPrompt（延迟加载）
 */
async function getBuildFn() {
  if (!_buildAgentSystemPrompt) {
    _buildAgentSystemPrompt = await loadBuildAgentSystemPrompt();
  }
  return _buildAgentSystemPrompt;
}

/**
 * 提示词结构分析
 * 
 * 现有 buildAgentSystemPrompt 输出的行序：
 * 
 * [静态部分] — 跨用户可缓存
 *   - "You are a personal assistant..." (identity)
 *   - "## Tooling" ... 工具列表 (tools)
 *   - "## Tool Call Style" (style)
 *   - "## Safety" (safety)
 *   - "## OpenClaw CLI Quick Reference" (cli)
 * 
 * [半静态部分] — 取决于加载的 skills/memory 工具
 *   - "## Skills (mandatory)" / loaded skills (skills)
 *   - "## Memory Recall" (memory)
 *   - "## OpenClaw Self-Update" (gateway)
 *   - "## Model Aliases" (aliases)
 *   - "## Workspace" (workspace)
 * 
 * [动态部分] — 每会话变化
 *   - "## Workspace Files (injected)" + context files
 *   - "## Reply Tags" / "## Messaging"
 *   - "## Reactions" / "## Reasoning Format"
 *   - "## Silent Replies" / "## Heartbeats"
 *   - "## Runtime"
 *   - "## Project Context" + files
 *   - "## Group Chat Context" (extra)
 *   - "## Subagent Context"
 * 
 * 缓存边界策略：
 * - 在静态部分和动态部分之间插入边界标记
 * - 使用 "## Workspace Files (injected)" 作为分界点
 */

/**
 * 识别提示词中的边界分界点
 * "## Workspace Files (injected)" 是静态内容和动态内容的自然分界
 */
const BOUNDARY_ANCHOR = '## Workspace Files (injected)';

/**
 * 需要从静态部分移到动态部分的标记
 * （这些依赖于会话特定的 skills/memory/tools 状态）
 */
const SEMI_DYNAMIC_ANCHORS = [
  '## Skills (mandatory)',
  '## Memory Recall',
];

/**
 * 判断一行是否属于动态部分
 */
function isDynamicSection(line) {
  // 在 boundary anchor 之后的都是动态
  return false; // 由 splitAtBoundary 处理
}

/**
 * 在提示词文本中查找边界位置并分离
 * @param {string} promptText - 完整提示词
 * @returns {{static: string, dynamic: string, boundaryIndex: number}}
 */
function splitAtBoundary(promptText) {
  const lines = promptText.split('\n');
  
  // 查找边界锚点
  let boundaryLine = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === BOUNDARY_ANCHOR || line.startsWith('## Workspace Files')) {
      boundaryLine = i;
      break;
    }
  }
  
  if (boundaryLine === -1) {
    // 没找到边界，全部当作静态（降级处理）
    console.warn('[EnhancedSystemPrompt] Boundary anchor not found, treating entire prompt as static');
    return {
      static: promptText,
      dynamic: '',
      boundaryIndex: lines.length,
    };
  }
  
  // 再向前查找半动态内容（Skills, Memory），把它们也纳入动态部分
  let actualBoundary = boundaryLine;
  for (const anchor of SEMI_DYNAMIC_ANCHORS) {
    for (let i = 0; i < boundaryLine; i++) {
      if (lines[i].trim() === anchor) {
        actualBoundary = Math.min(actualBoundary, i);
        break;
      }
    }
  }
  
  const staticLines = lines.slice(0, actualBoundary);
  const dynamicLines = lines.slice(actualBoundary);
  
  return {
    static: staticLines.join('\n'),
    dynamic: dynamicLines.join('\n'),
    boundaryIndex: actualBoundary,
  };
}

/**
 * 从静态文本生成缓存键
 */
function generateCacheKey(staticText) {
  return crypto.createHash('sha256')
    .update(staticText)
    .digest('hex')
    .substring(0, 12);
}

/**
 * 构建增强版系统提示词
 * 
 * @param {Object} params - 原始 buildAgentSystemPrompt 的参数
 * @param {Object} [opts] - 增强选项
 * @param {boolean} [opts.enableCacheBoundary=true] - 是否插入缓存边界
 * @param {boolean} [opts.enableCompactAwareness=true] - 是否注入 micro compact 知情
 * @param {boolean} [opts.enableReport=true] - 是否返回分析报告
 * @returns {{prompt: string, cacheKey: string, report: Object}}
 */
async function buildEnhancedSystemPrompt(params, opts = {}) {
  const {
    enableCacheBoundary = true,
    enableCompactAwareness = true,
    enableReport = true,
  } = opts;
  
  // 1. 用现有 builder 生成完整提示词
  const buildAgentSystemPrompt = await getBuildFn();
  const fullPrompt = buildAgentSystemPrompt(params);
  
  // 2. 分离静态/动态部分
  const { static: staticPart, dynamic: dynamicPart, boundaryIndex } = splitAtBoundary(fullPrompt);
  
  // 3. 生成缓存键
  const cacheKey = enableCacheBoundary ? generateCacheKey(staticPart) : null;
  
  // 4. 组装最终提示词
  let enhancedPrompt;
  if (enableCacheBoundary) {
    const boundaryLine = cacheKey 
      ? `${PROMPT_CACHE_BOUNDARY}\n<!-- cache_key=${cacheKey} -->`
      : PROMPT_CACHE_BOUNDARY;
    
    // Micro Compact 知情机制
    const compactAwareness = enableCompactAwareness
      ? `\n<!-- [Enhanced] Context management: tool results may be cleaned up. Write important info in your response. -->`
      : '';
    
    enhancedPrompt = [
      staticPart,
      '',
      boundaryLine,
      compactAwareness,
      '',
      dynamicPart,
    ].join('\n');
  } else {
    enhancedPrompt = fullPrompt;
  }
  
  // 5. 分析报告
  const report = enableReport ? buildReport(fullPrompt, staticPart, dynamicPart, boundaryIndex, cacheKey) : null;
  
  return {
    prompt: enhancedPrompt,
    cacheKey,
    report,
  };
}

/**
 * 构建提示词分析报告
 */
function buildReport(fullPrompt, staticPart, dynamicPart, boundaryIndex, cacheKey) {
  const fullLines = fullPrompt.split('\n');
  const staticLines = staticPart.split('\n');
  const dynamicLines = dynamicPart.split('\n');
  
  const totalChars = fullPrompt.length;
  const staticChars = staticPart.length;
  const dynamicChars = dynamicPart.length;
  
  // 估算 token 数（简单估算：约 4 chars/token）
  const estimatedTokens = Math.ceil(totalChars / 4);
  const staticTokens = Math.ceil(staticChars / 4);
  const dynamicTokens = Math.ceil(dynamicChars / 4);
  
  return {
    version: 'enhanced-v1',
    cacheKey,
    structure: {
      totalLines: fullLines.length,
      staticLines: staticLines.length,
      dynamicLines: dynamicLines.length,
      boundaryLineIndex: boundaryIndex,
    },
    tokens: {
      total: estimatedTokens,
      static: staticTokens,
      dynamic: dynamicTokens,
      cacheablePercent: Math.round((staticTokens / estimatedTokens) * 100),
    },
    chars: {
      total: totalChars,
      static: staticChars,
      dynamic: dynamicChars,
    },
    savings: {
      description: 'Static portion can be cached across users/sessions',
      cacheableChars: staticChars,
      cacheableTokens: staticTokens,
    },
  };
}

/**
 * 从 systemPromptReport 记录缓存统计
 * 可用于监控和优化
 */
function recordCacheStats(report, sessionId) {
  if (!report) return;
  
  const stats = {
    timestamp: new Date().toISOString(),
    sessionId,
    cacheKey: report.cacheKey,
    cacheablePercent: report.tokens.cacheablePercent,
    totalTokens: report.tokens.total,
    cacheableTokens: report.tokens.static,
  };
  
  // 写入到 stats 日志
  try {
    const fs = require('fs');
    const path = require('path');
    const os = require('os');
    const statsDir = process.env.OPENCLAW_ENHANCED_DATA_DIR 
      ? path.join(process.env.OPENCLAW_ENHANCED_DATA_DIR, 'stats')
      : path.join(os.tmpdir(), 'openclaw-enhanced-stats');
    
    if (!fs.existsSync(statsDir)) {
      fs.mkdirSync(statsDir, { recursive: true });
    }
    
    const statsFile = path.join(statsDir, 'prompt-cache-stats.jsonl');
    fs.appendFileSync(statsFile, JSON.stringify(stats) + '\n');
  } catch (err) {
    // stats 记录失败不影响主流程
    console.error('[EnhancedSystemPrompt] Failed to record cache stats:', err.message);
  }
}

module.exports = {
  buildEnhancedSystemPrompt,
  splitAtBoundary,
  generateCacheKey,
  buildReport,
  recordCacheStats,
  BOUNDARY_ANCHOR,
  PROMPT_CACHE_BOUNDARY,
};
