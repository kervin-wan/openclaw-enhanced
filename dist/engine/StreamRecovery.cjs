/**
 * StreamRecovery.cjs — 响应中断自动恢复
 *
 * 当 API 流中断导致模型返回空响应或严重截断时，
 * 自动检测并触发恢复重试。
 */

// ═══════════════════════════════════════════
// 检测函数
// ═══════════════════════════════════════════

const TRUNCATION_INDICATORS = [
  // Response ends in the middle of a sentence
  (text) => {
    const lastChar = text.trimEnd().slice(-1);
    // Escape \] inside character class to avoid closing it early
    return !/[.。!！?？)）】\]》""'']$/.test(lastChar)
      && text.length > 30;
  },
  // Response ends with unclosed code block
  (text) => /```(?!.*```)/s.test(text),
  // Response ends with unclosed bracket/brace
  (text) => {
    const open = (text.match(/[{[(（【《]/g) || []).length;
    const close = (text.match(/[}\])）】》]/g) || []).length;
    return open > close + 1 && text.length > 30;
  },
];

/**
 * 检查响应是否被截断或静默
 * @returns {{ truncated: boolean, silent: boolean, reason: string|null }}
 */
function analyzeResponse(runResult) {
  // Extract the main text from the run result
  const payloads = runResult?.payloads || [];
  const textParts = [];
  for (const p of payloads) {
    if (p.text && typeof p.text === 'string') {
      textParts.push(p.text);
    }
  }
  const fullText = textParts.join('\n').trim();

  // Check for completely silent response
  if (!fullText || fullText.length < 5) {
    return { truncated: false, silent: true, reason: 'empty-or-near-empty-response' };
  }

  // Check for internal-only responses (NO_REPLY, HEARTBEAT_OK, silent prefix)
  if (/^(NO_REPLY|HEARTBEAT_OK)\s*$/i.test(fullText)) {
    return { truncated: false, silent: false, reason: null };
  }

  // Check truncation indicators
  for (const check of TRUNCATION_INDICATORS) {
    if (check(fullText)) {
      return { truncated: true, silent: false, reason: 'text-appears-truncated' };
    }
  }

  return { truncated: false, silent: false, reason: null };
}

/**
 * 生成续写提示词
 */
function buildContinuationPrompt(partialText) {
  const tail = partialText.slice(-300).trim();
  return [
    '[System: Your previous response was truncated. Continue exactly from where you left off.]',
    '',
    'Previous response ends with:',
    '```',
    tail,
    '```',
    '',
    'Continue naturally from the cut-off point. Do not repeat what was already said.',
  ].join('\n');
}

/**
 * 检查并恢复 — 供 agent-runner-execution 调用
 *
 * @param {Object} runResult - 原始 run result
 * @param {Object} params - 重新运行所需的参数
 * @param {Function} params.retryRunner - 使用新消息重新运行模型的函数
 * @returns {Object|null} 恢复后的 runResult，或 null（无需恢复）
 */
async function checkAndRecover(runResult, params = {}) {
  const analysis = analyzeResponse(runResult);

  if (!analysis.truncated && !analysis.silent) {
    return null; // Response is fine, no recovery needed
  }

  if (!params.retryRunner || typeof params.retryRunner !== 'function') {
    // Can't auto-recover without a runner
    return null;
  }

  const payloads = runResult?.payloads || [];
  const textParts = [];
  for (const p of payloads) {
    if (p.text && typeof p.text === 'string') {
      textParts.push(p.text);
    }
  }
  const partialText = textParts.join('\n').trim();

  const recoveryPrompt = analysis.silent
    ? '[System: Your previous response was empty. Please respond to the user\'s last message.]'
    : buildContinuationPrompt(partialText);

  try {
    const recoveryResult = await params.retryRunner(recoveryPrompt);

    if (recoveryResult && recoveryResult.payloads) {
      // Merge: prefix the partial text with continuation
      const mergedPayloads = [
        ...payloads,
        ...(analysis.silent ? [] : [{ text: '\n\n[--- continued ---]\n' }]),
        ...recoveryResult.payloads,
      ];
      return {
        ...runResult,
        payloads: mergedPayloads,
        _recovered: true,
        _recoveryReason: analysis.reason,
        provider: recoveryResult.provider || runResult.provider,
        model: recoveryResult.model || runResult.model,
      };
    }

    return null; // Recovery attempt failed to produce output
  } catch (e) {
    // Recovery failed silently — return null so original result is used
    return null;
  }
}


// ═══════════════════════════════════════════
// 预响应质量检查 (#6)
// ═══════════════════════════════════════════

const QUALITY_CHECKS = [
  // Unclosed code blocks (3+ open, unmatched close)
  {
    name: 'unclosed-code-block',
    severity: 'warning',
    check: (text) => {
      const opens = (text.match(/```/g) || []).length;
      return opens > 0 && opens % 2 !== 0;
    },
    message: 'Markdown 代码块未闭合',
  },
  // Response repeats same line 5+ times (hallucination loop)
  {
    name: 'repetition-loop',
    severity: 'error',
    check: (text) => {
      const lines = text.split('\n').filter(l => l.trim().length > 10);
      if (lines.length < 5) return false;
      const freq = {};
      for (const l of lines) {
        freq[l] = (freq[l] || 0) + 1;
        if (freq[l] >= 5) return true;
      }
      return false;
    },
    message: '响应循环重复相同内容（幻觉特征）',
  },
  // Too many consecutive identical characters (gibberish)
  {
    name: 'gibberish-chars',
    severity: 'error',
    check: (text) => /(.)\1{40,}/.test(text),
    message: '连续相同字符超长（乱码）',
  },
  // Only emoji/code markers without meaningful content
  {
    name: 'no-meaningful-content',
    severity: 'warning',
    check: (text) => {
      const stripped = text.replace(/```[\s\S]*?```/g, '').replace(/[\s\n\r`>\-*#@!/(){}\[\]\\|;:'".,<>+=$%^&~·]/g, '');
      return text.length > 50 && stripped.length < 10;
    },
    message: '响应无实际内容（仅符号/格式）',
  },
];

/**
 * 预响应质量检查 — 在响应发送前检测质量问题
 * @returns {{ warnings: Array, errors: Array, score: number, passed: boolean }}
 */
function checkQuality(runResult) {
  const payloads = runResult?.payloads || [];
  const textParts = [];
  for (const p of payloads) {
    if (p.text && typeof p.text === 'string') {
      textParts.push(p.text);
    }
  }
  const fullText = textParts.join('\n');
  if (!fullText.trim()) {
    return { warnings: [], errors: [{ name: 'empty-response', severity: 'error', message: '响应为空' }], score: 0, passed: false };
  }

  const warnings = [];
  const errors = [];
  for (const check of QUALITY_CHECKS) {
    if (check.check(fullText)) {
      if (check.severity === 'error') errors.push(check);
      else warnings.push(check);
    }
  }
  const score = Math.max(0, 100 - errors.length * 20 - warnings.length * 5);
  return { warnings, errors, score, passed: errors.length === 0 };
}

module.exports = {
  analyzeResponse,
  buildContinuationPrompt,
  checkAndRecover,
  checkQuality,
  TRUNCATION_INDICATORS,
  QUALITY_CHECKS,
};
