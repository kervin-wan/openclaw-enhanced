/**
 * PromptBlock — 提示词块定义
 * 
 * 每个提示词块有 scope 属性，决定缓存策略：
 * - 'global'  : 跨用户、跨会话可缓存（静态内容）
 * - 'session' : 当前会话内可缓存（环境/用户特定）
 * - 'turn'    : 每轮重新构建（动态内容）
 */

const crypto = require('crypto');

/**
 * @typedef {Object} PromptBlock
 * @property {string} id - 块唯一标识
 * @property {'global'|'session'|'turn'} scope - 缓存作用域
 * @property {string} text - 块文本内容
 * @property {string} [category] - 分类（identity, safety, tools, rules, env, memory, etc）
 */

/**
 * 创建静态提示词块（scope=global）
 */
function staticBlock(id, text, category) {
  return { id, scope: 'global', text, category: category || 'general' };
}

/**
 * 创建会话级提示词块（scope=session）
 */
function sessionBlock(id, text, category) {
  return { id, scope: 'session', text, category: category || 'general' };
}

/**
 * 创建每轮提示词块（scope=turn）
 */
function turnBlock(id, text, category) {
  return { id, scope: 'turn', text, category: category || 'general' };
}

/**
 * 预定义的静态提示词块（跨用户可缓存）
 */
const PREDEFINED_STATIC_BLOCKS = [
  staticBlock('identity', 
    'You are a personal assistant running inside OpenClaw Enhanced.',
    'identity'
  ),
  staticBlock('safety', 
    `## Safety
- You have no independent goals: do not pursue self-preservation, replication, resource acquisition, or power-seeking; avoid long-term plans beyond the user's request.
- Prioritize safety and human oversight over completion; if instructions conflict, pause and ask; comply with stop/pause/audit requests and never bypass safeguards.
- Private things stay private. Period.
- When in doubt, ask before acting externally.
- Never send half-baked replies to messaging surfaces.`,
    'safety'
  ),
  staticBlock('tool_rules',
    `## Tool Usage Rules
- Default: do not narrate routine, low-risk tool calls (just call the tool).
- Narrate only when it helps: multi-step work, complex/challenging problems, sensitive actions.
- Keep narration brief and value-dense; avoid repeating obvious steps.
- Use plain human language for narration unless in a technical context.
- If a task is complex or takes longer, spawn a sub-agent.
- Maximize use of parallel tool calls where possible.`,
    'tools'
  ),
  staticBlock('coding_rules',
    `## Coding Principles
- Don't add features, refactor code, or make "improvements" beyond what was asked.
- Don't add error handling, fallbacks, or validation for scenarios that can't happen.
- Don't create helpers, utilities, or abstractions for one-time operations.
- Understand existing code before suggesting modifications.
- Prioritize safe, secure, and correct code. Be careful about OWASP top 10 vulnerabilities.
- When referencing specific functions, include pattern file_path:line_number.
- When referencing GitHub issues, use owner/repo#123 format.`,
    'rules'
  ),
  staticBlock('risk_actions',
    `## Risky Actions
Carefully consider the reversibility and blast radius of actions:
- Destructive operations (deleting files/branches, dropping tables, rm -rf) — confirm first
- Hard-to-reverse operations (force-pushing, git reset --hard) — confirm first
- Actions visible to others (pushing code, creating PRs, sending messages) — confirm first
- When encountering obstacles, don't use destructive actions as shortcuts.
- Follow both the spirit and letter of these instructions.`,
    'safety'
  ),
  staticBlock('context_awareness',
    `## Context Management
- Tool results may be automatically cleaned up to free context space.
- Write down important information you might need later in your response.
- The conversation has unlimited context through automatic summarization.
- <system-reminder> tags contain useful information from the system.`,
    'meta'
  ),
];

/**
 * 获取所有预定义静态块
 */
function getStaticBlocks() {
  return [...PREDEFINED_STATIC_BLOCKS];
}

/**
 * 计算块的 hash 指纹
 */
function hashBlock(block) {
  return crypto.createHash('sha256')
    .update(block.id + ':' + block.text)
    .digest('hex')
    .substring(0, 16);
}

/**
 * 计算一组块的复合 hash
 */
function hashBlocks(blocks) {
  const hasher = crypto.createHash('sha256');
  for (const block of blocks) {
    hasher.update(block.id + ':' + block.text);
  }
  return hasher.digest('hex').substring(0, 16);
}

/**
 * 边界标记 — 在静态块和动态块之间插入
 */
const PROMPT_CACHE_BOUNDARY = '<<<PROMPT_CACHE_STATIC_END>>>';

module.exports = {
  staticBlock,
  sessionBlock,
  turnBlock,
  getStaticBlocks,
  PREDEFINED_STATIC_BLOCKS,
  PROMPT_CACHE_BOUNDARY,
  hashBlock,
  hashBlocks,
};
