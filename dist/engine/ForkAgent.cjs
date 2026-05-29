/**
 * ForkAgent — 上下文继承的子代理系统
 *
 * Fork vs Spawn 的核心区别：
 * - Spawn: 全新空白 session，需要完整简报
 * - Fork:  继承父级完整上下文 + prompt cache，指令式提示词
 *
 * Fork 的关键行为准则（来自 Claude Code 的经验）：
 * 1. 不偷看 — 不要读子代理的输出文件检查进度
 * 2. 不预测 — 不要猜测或捏造子代理的结果
 * 3. 等通知 — 子代理完成后以通知形式返回结果
 * 4. 指令式 — 提示词写"做什么"，不写"什么情况"（已有上下文）
 */

/**
 * Fork 选项
 * @typedef {Object} ForkOptions
 * @property {string} name - 简短名称（1-2词，用于面板显示）
 * @property {string} directive - 指令（不是背景介绍）
 * @property {string} [subagentType] - 可选专用类型（explore/review/plan）
 * @property {string} [isolation] - 隔离模式（'inline'|'worktree'|'remote'）
 * @property {boolean} [background] - 后台运行（默认前台）
 */

/**
 * Fork 的提示词设计原则
 */
const FORK_PROMPT_GUIDE = {
  fork: {
    style: 'directive',
    description: `Fork yourself when intermediate tool output isn't worth keeping in context.
- The criterion is qualitative — "will I need this output again" — not task size.
- Research: fork open-ended questions. Launch parallel forks for independent investigations.
- Implementation: fork work that requires more than a couple of edits.
- After launching: DO NOT peek at the fork's output file. DO NOT predict or fabricate results.
- The notification arrives as a user message in a later turn — wait for it.
- The prompt is a DIRECTIVE — what to do, not what the situation is. The fork inherits context.`,
  },
  specialized: {
    style: 'briefing',
    description: `When spawning a specialized agent (with subagent_type), it starts with zero context.
Brief it like a smart colleague who just walked in:
- What you're trying to accomplish and why.
- What you've already tried or ruled out.
- Enough context for judgment calls, not just following instructions.
- Specific: file paths, line numbers, what to change — not "based on your findings, fix it."`,
  },
};

/**
 * 构建 Fork 提示词（指令式 — 有上下文继承）
 * @param {ForkOptions} options
 * @returns {string}
 */
function buildForkDirective(options) {
  const { name, directive } = options;
  return [
    `# Fork Directive: ${name}`,
    '',
    'You are a fork of the parent session. You inherit the full conversation context.',
    'Execute the following directive and report back concisely.',
    '',
    directive,
    '',
    'When done: report a concise summary (key findings, actions taken, results).',
    'Include absolute file paths and line numbers where relevant.',
  ].join('\n');
}

/**
 * 构建专用 Agent 简报（简报式 — 零上下文）
 * @param {Object} params
 * @returns {string}
 */
function buildAgentBriefing(params) {
  const { type, goal, context, tried, scope } = params;
  return [
    `# ${type} Agent Task`,
    '',
    `## Goal`,
    goal,
    '',
    context ? `## Context\n${context}\n` : '',
    tried ? `## What's Been Tried\n${tried}\n` : '',
    scope ? `## Scope\n${scope}\n` : '',
    '## Instructions',
    '- Complete the task fully. Don\'t leave it half-done.',
    '- Report findings concisely with specific file paths and line numbers.',
    '- Do NOT modify files unless explicitly asked.',
  ].filter(Boolean).join('\n');
}

/**
 * 构建并行 Agent 启动消息（单次消息启动多个 Agent）
 * @param {ForkOptions[]} forks
 * @returns {string}
 */
function buildParallelLaunch(forks) {
  return forks.map(f => `- **${f.name}**: ${f.directive.substring(0, 120)}${f.directive.length > 120 ? '...' : ''}`).join('\n');
}

/**
 * 注入到系统提示词的 Agent 使用指导
 * @param {Object} opts
 * @param {boolean} opts.forkEnabled - 是否启用 fork
 * @param {Array} opts.agentTypes - 可用的 Agent 类型
 * @returns {string|null}
 */
function buildAgentGuidancePrompt(opts = {}) {
  const { forkEnabled = true, agentTypes = [] } = opts;
  
  const sections = [];

  sections.push('# Using Subagents and Forks');

  if (forkEnabled) {
    sections.push(
      '',
      '## Fork (context-inheriting subagent)',
      'When you need to do independent work but don\'t want tool output polluting your context,',
      'fork yourself. The fork inherits your full conversation context — no briefing needed.',
      '',
      'Rules for forks:',
      '- Write directives, not briefings — the fork already knows the context.',
      '- DO NOT peek: don\'t read the fork\'s output to check progress. Wait for the notification.',
      '- DO NOT predict: don\'t guess or fabricate what the fork found. Only report when notified.',
      '- Launch parallel forks for independent tasks. Serially for dependent ones.',
      '- After launching: continue with other work or respond to the user.',
    );
  }

  if (agentTypes.length > 0) {
    sections.push(
      '',
      '## Specialized Agent Types',
      'Available types (start with zero context — needs full briefing):',
      ...agentTypes.map(a => `- **${a.type}**: ${a.whenToUse}`),
    );
  }

  sections.push(
    '',
    '## Writing Good Prompts',
    '- Fork: write what to do (directive). Not what the situation is.',
    '- Specialized agent: write what the situation is + what to do (briefing).',
    '- Never write "based on your findings, fix the bug" — you do the synthesis.',
    '- Never write "based on the research, implement it" — you understand first.',
    '- Include file paths, line numbers, specific changes — prove you understood.',
  );

  return sections.join('\n');
}

module.exports = {
  FORK_PROMPT_GUIDE,
  buildForkDirective,
  buildAgentBriefing,
  buildParallelLaunch,
  buildAgentGuidancePrompt,
};
