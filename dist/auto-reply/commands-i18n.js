/**
 * 命令的中文国际化支持
 *
 * 提供命令的中文名称、描述和别名，用于：
 * 1. 显示中文帮助菜单
 * 2. 支持中文文本触发命令
 * 3. 适配不支持原生命令菜单的渠道（飞书、企业微信、钉钉等）
 */
export const COMMAND_GROUP_LABELS = {
    conversation: "💬 对话控制",
    model: "🤖 模型设置",
    info: "ℹ️ 信息查询",
    session: "📝 会话管理",
    advanced: "⚙️ 高级功能",
    other: "📦 其他",
};
/**
 * 命令中文翻译映射
 */
export const COMMANDS_I18N = [
    // 对话控制
    {
        key: "new",
        zhName: "新对话",
        zhDescription: "开始新的对话",
        zhAliases: ["新对话", "新会话", "清空"],
        group: "conversation",
    },
    {
        key: "stop",
        zhName: "停止",
        zhDescription: "停止当前回复",
        zhAliases: ["停止", "停", "取消"],
        group: "conversation",
    },
    {
        key: "reset",
        zhName: "重置",
        zhDescription: "重置当前会话",
        zhAliases: ["重置", "重置会话"],
        group: "conversation",
    },
    {
        key: "compact",
        zhName: "压缩",
        zhDescription: "压缩会话上下文",
        zhAliases: ["压缩", "压缩上下文"],
        group: "conversation",
    },
    // 模型设置
    {
        key: "model",
        zhName: "模型",
        zhDescription: "查看或切换 AI 模型",
        zhAliases: ["模型", "切换模型", "换模型"],
        group: "model",
    },
    {
        key: "models",
        zhName: "模型列表",
        zhDescription: "列出可用的模型",
        zhAliases: ["模型列表", "所有模型"],
        group: "model",
    },
    {
        key: "think",
        zhName: "思考",
        zhDescription: "设置思考深度",
        zhAliases: ["思考", "思考模式", "思考深度"],
        group: "model",
    },
    {
        key: "reasoning",
        zhName: "推理",
        zhDescription: "切换推理过程显示",
        zhAliases: ["推理", "显示推理"],
        group: "model",
    },
    // 信息查询
    {
        key: "help",
        zhName: "帮助",
        zhDescription: "显示帮助信息",
        zhAliases: ["帮助", "?", "？"],
        group: "info",
    },
    {
        key: "commands",
        zhName: "命令",
        zhDescription: "列出所有命令",
        zhAliases: ["命令", "菜单", "命令列表"],
        group: "info",
    },
    {
        key: "status",
        zhName: "状态",
        zhDescription: "查看当前状态",
        zhAliases: ["状态", "当前状态"],
        group: "info",
    },
    {
        key: "whoami",
        zhName: "我是谁",
        zhDescription: "显示你的用户 ID",
        zhAliases: ["我是谁", "我的ID", "用户ID"],
        group: "info",
    },
    {
        key: "usage",
        zhName: "用量",
        zhDescription: "显示 Token 用量统计",
        zhAliases: ["用量", "消耗", "token"],
        group: "info",
    },
    {
        key: "context",
        zhName: "上下文",
        zhDescription: "解释上下文的构建和使用",
        zhAliases: ["上下文"],
        group: "info",
    },
    // 会话管理
    {
        key: "verbose",
        zhName: "详细",
        zhDescription: "切换详细模式",
        zhAliases: ["详细", "详细模式"],
        group: "session",
    },
    {
        key: "elevated",
        zhName: "提权",
        zhDescription: "切换提权模式",
        zhAliases: ["提权", "提权模式"],
        group: "session",
    },
    {
        key: "activation",
        zhName: "激活",
        zhDescription: "设置群组激活模式",
        zhAliases: ["激活", "激活模式"],
        group: "session",
    },
    {
        key: "send",
        zhName: "发送",
        zhDescription: "设置发送策略",
        zhAliases: ["发送", "发送策略"],
        group: "session",
    },
    {
        key: "queue",
        zhName: "队列",
        zhDescription: "调整队列设置",
        zhAliases: ["队列", "队列设置"],
        group: "session",
    },
    // 高级功能
    {
        key: "skill",
        zhName: "技能",
        zhDescription: "运行指定技能",
        zhAliases: ["技能", "运行技能"],
        group: "advanced",
    },
    {
        key: "subagents",
        zhName: "子代理",
        zhDescription: "管理子代理运行",
        zhAliases: ["子代理", "子agent"],
        group: "advanced",
    },
    {
        key: "exec",
        zhName: "执行",
        zhDescription: "设置执行默认值",
        zhAliases: ["执行", "执行设置"],
        group: "advanced",
    },
    {
        key: "tts",
        zhName: "语音",
        zhDescription: "配置文字转语音",
        zhAliases: ["语音", "TTS", "朗读"],
        group: "advanced",
    },
    {
        key: "restart",
        zhName: "重启",
        zhDescription: "重启 Clawdbot",
        zhAliases: ["重启"],
        group: "advanced",
    },
    // 其他
    {
        key: "approve",
        zhName: "批准",
        zhDescription: "批准或拒绝执行请求",
        zhAliases: ["批准", "授权"],
        group: "other",
    },
    {
        key: "allowlist",
        zhName: "白名单",
        zhDescription: "管理白名单",
        zhAliases: ["白名单"],
        group: "other",
    },
    {
        key: "config",
        zhName: "配置",
        zhDescription: "查看或设置配置值",
        zhAliases: ["配置", "设置"],
        group: "other",
    },
    {
        key: "debug",
        zhName: "调试",
        zhDescription: "设置运行时调试选项",
        zhAliases: ["调试"],
        group: "other",
    },
    {
        key: "bash",
        zhName: "命令行",
        zhDescription: "运行主机 Shell 命令",
        zhAliases: ["命令行", "shell", "终端"],
        group: "other",
    },
];
// 缓存：中文别名 -> 命令键名
let cachedZhAliasMap = null;
/**
 * 获取中文别名到命令键名的映射
 */
export function getZhAliasToKeyMap() {
    if (cachedZhAliasMap)
        return cachedZhAliasMap;
    const map = new Map();
    for (const cmd of COMMANDS_I18N) {
        if (cmd.zhAliases) {
            for (const alias of cmd.zhAliases) {
                const normalized = alias.trim().toLowerCase();
                if (normalized && !map.has(normalized)) {
                    map.set(normalized, cmd.key);
                }
            }
        }
    }
    cachedZhAliasMap = map;
    return map;
}
/**
 * 根据命令键名获取中文信息
 */
export function getCommandI18n(key) {
    return COMMANDS_I18N.find((cmd) => cmd.key === key);
}
/**
 * 检查文本是否是中文命令别名，返回对应的命令键名
 */
export function matchZhCommandAlias(text) {
    const normalized = text.trim().toLowerCase();
    return getZhAliasToKeyMap().get(normalized) ?? null;
}
