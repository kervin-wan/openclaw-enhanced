/**
 * PermissionFilter — 权限模式过滤系统
 *
 * 按权限模式筛选可用工具，控制哪些工具需要用户批准。
 *
 * 权限模式：
 * - DEFAULT:     默认模式，危险操作需确认
 * - ACCEPT_EDITS: 文件操作自动批准，其他需确认
 * - BYPASS:      全部自动批准
 * - PLAN:        只读模式（仅安全工具）
 *
 * Deny 规则格式：
 * { tool: "Bash" | "mcp__*" | "*", pattern?: RegExp|string, reason: string }
 */

/**
 * 权限模式枚举
 */
const PermissionMode = {
  DEFAULT: 'default',
  ACCEPT_EDITS: 'accept-edits',
  BYPASS: 'bypass',
  PLAN: 'plan',
  RESTRICTED: 'restricted',
};

/**
 * 工具安全级别
 */
const SafetyLevel = {
  SAFE: 'safe',           // 只读，无副作用
  MODERATE: 'moderate',    // 有副作用但可逆
  DANGEROUS: 'dangerous',  // 破坏性操作
};

/**
 * 内置工具的安全级别映射
 */
const TOOL_SAFETY = {
  read: SafetyLevel.SAFE,
  grep: SafetyLevel.SAFE,
  find: SafetyLevel.SAFE,
  web_search: SafetyLevel.SAFE,
  web_fetch: SafetyLevel.SAFE,
  sessions_list: SafetyLevel.SAFE,
  sessions_history: SafetyLevel.SAFE,
  session_status: SafetyLevel.SAFE,
  agents_list: SafetyLevel.SAFE,
  memory_search: SafetyLevel.SAFE,
  memory_get: SafetyLevel.SAFE,

  write: SafetyLevel.MODERATE,
  edit: SafetyLevel.MODERATE,
  apply_patch: SafetyLevel.MODERATE,
  sessions_send: SafetyLevel.MODERATE,
  sessions_spawn: SafetyLevel.MODERATE,
  message: SafetyLevel.MODERATE,
  browser: SafetyLevel.MODERATE,

  exec: SafetyLevel.DANGEROUS,
  process: SafetyLevel.DANGEROUS,
  gateway: SafetyLevel.DANGEROUS,
  cron: SafetyLevel.DANGEROUS,
  nodes: SafetyLevel.DANGEROUS,
};

/**
 * 根据权限模式判断工具是否需要用户批准
 */
function needsApproval(toolName, mode) {
  const safety = TOOL_SAFETY[toolName.toLowerCase()] || SafetyLevel.MODERATE;

  switch (mode) {
    case PermissionMode.BYPASS:
      return false; // 全部不拦截
    case PermissionMode.PLAN:
      return safety !== SafetyLevel.SAFE; // 仅允许安全工具
    case PermissionMode.ACCEPT_EDITS:
      // 文件操作自动允许，危险仍需确认
      return safety === SafetyLevel.DANGEROUS;
    case PermissionMode.RESTRICTED:
      return true; // 全部拦截
    case PermissionMode.DEFAULT:
    default:
      // 危险操作需确认
      return safety === SafetyLevel.DANGEROUS;
  }
}

/**
 * Deny 规则匹配器
 * @param {string} toolName - 工具名
 * @param {Array} denyRules - deny 规则数组
 * @param {Object} [input] - 工具输入参数（用于 pattern 匹配）
 * @returns {{ matched: boolean, reason?: string }} 
 */
function matchDenyRules(toolName, denyRules = [], input = null) {
  for (const rule of denyRules) {
    // 检查工具名是否匹配
    const toolMatch =
      rule.tool === '*' ||
      rule.tool === toolName ||
      (rule.tool.endsWith('*') && toolName.startsWith(rule.tool.slice(0, -1)));

    if (!toolMatch) continue;

    // 如果有 pattern，检查输入
    if (rule.pattern && input) {
      const inputStr = JSON.stringify(input);
      const pattern = typeof rule.pattern === 'string'
        ? new RegExp(rule.pattern)
        : rule.pattern;
      if (!pattern.test(inputStr)) continue;
    }

    return { matched: true, reason: rule.reason || `Denied by rule: ${rule.tool}` };
  }

  return { matched: false };
}

/**
 * 按权限模式和 deny 规则过滤工具列表
 * @param {Array} tools - 工具数组 [{name, ...}]
 * @param {string} mode - 权限模式
 * @param {Array} [denyRules] - deny 规则
 * @returns {Array} 过滤后的工具
 */
function filterTools(tools, mode, denyRules = []) {
  if (!tools || tools.length === 0) return [];

  let filtered = tools;

  // 1. 按权限模式过滤
  if (mode === PermissionMode.PLAN) {
    filtered = tools.filter(t => {
      const safety = TOOL_SAFETY[t.name?.toLowerCase()] || SafetyLevel.MODERATE;
      return safety === SafetyLevel.SAFE;
    });
  }

  // 2. 按 deny 规则过滤（去掉被完全禁用的工具）
  const blanketDenies = denyRules.filter(r => !r.pattern);
  if (blanketDenies.length > 0) {
    filtered = filtered.filter(t => {
      return !matchDenyRules(t.name, blanketDenies).matched;
    });
  }

  return filtered;
}

/**
 * 获取当前模式下工具需要的批准级别
 * @param {string} toolName
 * @param {string} mode
 * @param {Array} denyRules
 * @param {Object} input
 * @returns {{ needsApproval: boolean, reason?: string }}
 */
function checkToolPermission(toolName, mode, denyRules = [], input = null) {
  // 1. 先检查 deny 规则
  const denyResult = matchDenyRules(toolName, denyRules, input);
  if (denyResult.matched) {
    return { needsApproval: true, denied: true, reason: denyResult.reason };
  }

  // 2. 按模式检查
  return { needsApproval: needsApproval(toolName, mode), denied: false };
}

module.exports = {
  PermissionMode,
  SafetyLevel,
  TOOL_SAFETY,
  needsApproval,
  matchDenyRules,
  filterTools,
  checkToolPermission,
};
