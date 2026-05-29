/**
 * AgentTypes — 专用子代理类型定义
 *
 * 每个 Agent 类型有特定的工具集和系统提示词，用于不同场景：
 * - explore: 代码库探索（只读）
 * - review:  代码审查（只读+分析）
 * - plan:    任务规划（只读+计划）
 */

/**
 * @typedef {Object} AgentType
 * @property {string} type - 类型标识
 * @property {string} whenToUse - 何时使用（注入到主 session 提示词）
 * @property {string[]} tools - 可用工具列表
 * @property {string[]} [disallowedTools] - 禁止的工具
 * @property {string} [systemPrompt] - 特定系统提示词
 * @property {boolean} isBuiltin - 是否内置
 */

const BUILTIN_AGENT_TYPES = [
  {
    type: 'explore',
    whenToUse: '代码库探索：了解项目结构、查找定义、追踪调用链、理解架构。适用于需要搜索多个文件或深层代码理解的场景。',
    tools: ['read', 'grep', 'find', 'web_search', 'web_fetch'],
    disallowedTools: ['write', 'edit', 'apply_patch', 'exec'],
    systemPrompt: `You are a code exploration specialist. Your job is to understand codebases thoroughly.
- Read files, search for patterns, trace call chains
- NEVER modify any files
- Report findings clearly: file paths, line numbers, key structures
- When done, provide a concise summary of what you found`,
    isBuiltin: true,
  },
  {
    type: 'review',
    whenToUse: '代码审查：检查安全性、正确性、最佳实践。适用于 PR review 或代码质量检查。',
    tools: ['read', 'grep', 'find'],
    disallowedTools: ['write', 'edit', 'apply_patch', 'exec'],
    systemPrompt: `You are a code reviewer. Your job is to find issues, not fix them.
- Check for: security vulnerabilities, bugs, logic errors, poor practices
- NEVER modify any files
- Report findings by severity: critical, major, minor, suggestion
- Include specific file paths and line numbers`,
    isBuiltin: true,
  },
  {
    type: 'plan',
    whenToUse: '复杂任务规划：分解大任务、评估方案、制定实施计划。适用于需要先规划再执行的任务。',
    tools: ['read', 'grep', 'find', 'web_search'],
    disallowedTools: ['write', 'edit', 'apply_patch', 'exec'],
    systemPrompt: `You are a planning specialist. Your job is to create actionable plans, not execute them.
- Understand the goal and constraints
- Break work into clear, ordered steps
- Identify dependencies and risks
- NEVER modify any files
- Output a structured plan with phases and acceptance criteria`,
    isBuiltin: true,
  },
];

/**
 * 获取所有内置 Agent 类型
 * @returns {AgentType[]}
 */
function getBuiltinAgentTypes() {
  return [...BUILTIN_AGENT_TYPES];
}

/**
 * 按类型名查找
 * @param {string} typeName
 * @returns {AgentType|undefined}
 */
function findAgentType(typeName) {
  return BUILTIN_AGENT_TYPES.find(a => a.type === typeName);
}

/**
 * 格式化 Agent 类型列表用于系统提示词
 * @returns {string}
 */
function formatAgentTypeList() {
  return BUILTIN_AGENT_TYPES
    .map(a => `- **${a.type}**: ${a.whenToUse} (可用工具: ${a.tools.join(', ')}; 禁用: ${(a.disallowedTools || []).join(', ')})`)
    .join('\n');
}

/**
 * 获取 Agent 的允许工具集（允许 - 禁止）
 * @param {AgentType} agentType
 * @param {Array} allTools
 * @returns {Array}
 */
function getEffectiveTools(agentType, allTools = []) {
  const allow = new Set(agentType.tools);
  const deny = new Set(agentType.disallowedTools || []);
  
  if (allTools.length === 0) {
    return agentType.tools.filter(t => !deny.has(t));
  }
  
  return allTools
    .filter(t => allow.has('all') || allow.has(t.name))
    .filter(t => !deny.has(t.name));
}

module.exports = {
  BUILTIN_AGENT_TYPES,
  getBuiltinAgentTypes,
  findAgentType,
  formatAgentTypeList,
  getEffectiveTools,
};
