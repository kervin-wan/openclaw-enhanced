import { listChannelDocks } from "../channels/dock.js";
import { getActivePluginRegistry } from "../plugins/runtime.js";
import { listThinkingLevels } from "./thinking.js";
import { COMMAND_ARG_FORMATTERS } from "./commands-args.js";
function defineChatCommand(command) {
    const aliases = (command.textAliases ?? (command.textAlias ? [command.textAlias] : []))
        .map((alias) => alias.trim())
        .filter(Boolean);
    const scope = command.scope ?? (command.nativeName ? (aliases.length ? "both" : "native") : "text");
    const acceptsArgs = command.acceptsArgs ?? Boolean(command.args?.length);
    const argsParsing = command.argsParsing ?? (command.args?.length ? "positional" : "none");
    return {
        key: command.key,
        nativeName: command.nativeName,
        description: command.description,
        acceptsArgs,
        args: command.args,
        argsParsing,
        formatArgs: command.formatArgs,
        argsMenu: command.argsMenu,
        textAliases: aliases,
        scope,
    };
}
function defineDockCommand(dock) {
    return defineChatCommand({
        key: `dock:${dock.id}`,
        nativeName: `dock_${dock.id}`,
        description: `切换到 ${dock.id} 进行回复`,
        textAliases: [`/dock-${dock.id}`, `/dock_${dock.id}`],
    });
}
function registerAlias(commands, key, ...aliases) {
    const command = commands.find((entry) => entry.key === key);
    if (!command) {
        throw new Error(`registerAlias: unknown command key: ${key}`);
    }
    const existing = new Set(command.textAliases.map((alias) => alias.trim().toLowerCase()));
    for (const alias of aliases) {
        const trimmed = alias.trim();
        if (!trimmed)
            continue;
        const lowered = trimmed.toLowerCase();
        if (existing.has(lowered))
            continue;
        existing.add(lowered);
        command.textAliases.push(trimmed);
    }
}
function assertCommandRegistry(commands) {
    const keys = new Set();
    const nativeNames = new Set();
    const textAliases = new Set();
    for (const command of commands) {
        if (keys.has(command.key)) {
            throw new Error(`Duplicate command key: ${command.key}`);
        }
        keys.add(command.key);
        const nativeName = command.nativeName?.trim();
        if (command.scope === "text") {
            if (nativeName) {
                throw new Error(`Text-only command has native name: ${command.key}`);
            }
            if (command.textAliases.length === 0) {
                throw new Error(`Text-only command missing text alias: ${command.key}`);
            }
        }
        else if (!nativeName) {
            throw new Error(`Native command missing native name: ${command.key}`);
        }
        else {
            const nativeKey = nativeName.toLowerCase();
            if (nativeNames.has(nativeKey)) {
                throw new Error(`Duplicate native command: ${nativeName}`);
            }
            nativeNames.add(nativeKey);
        }
        if (command.scope === "native" && command.textAliases.length > 0) {
            throw new Error(`Native-only command has text aliases: ${command.key}`);
        }
        for (const alias of command.textAliases) {
            if (!alias.startsWith("/")) {
                throw new Error(`Command alias missing leading '/': ${alias}`);
            }
            const aliasKey = alias.toLowerCase();
            if (textAliases.has(aliasKey)) {
                throw new Error(`Duplicate command alias: ${alias}`);
            }
            textAliases.add(aliasKey);
        }
    }
}
let cachedCommands = null;
let cachedRegistry = null;
let cachedNativeCommandSurfaces = null;
let cachedNativeRegistry = null;
function buildChatCommands() {
    const commands = [
        defineChatCommand({
            key: "help",
            nativeName: "help",
            description: "显示可用命令",
            textAlias: "/help",
        }),
        defineChatCommand({
            key: "commands",
            nativeName: "commands",
            description: "列出所有斜杠命令",
            textAlias: "/commands",
        }),
        defineChatCommand({
            key: "skill",
            nativeName: "skill",
            description: "按名称运行技能",
            textAlias: "/skill",
            args: [
                {
                    name: "name",
                    description: "技能名称",
                    type: "string",
                    required: true,
                },
                {
                    name: "input",
                    description: "技能输入",
                    type: "string",
                    captureRemaining: true,
                },
            ],
        }),
        defineChatCommand({
            key: "status",
            nativeName: "status",
            description: "显示当前状态",
            textAlias: "/status",
        }),
        defineChatCommand({
            key: "allowlist",
            description: "列出/添加/移除白名单条目",
            textAlias: "/allowlist",
            acceptsArgs: true,
            scope: "text",
        }),
        defineChatCommand({
            key: "approve",
            nativeName: "approve",
            description: "批准或拒绝执行请求",
            textAlias: "/approve",
            acceptsArgs: true,
        }),
        defineChatCommand({
            key: "context",
            nativeName: "context",
            description: "解释上下文如何构建和使用",
            textAlias: "/context",
            acceptsArgs: true,
        }),
        defineChatCommand({
            key: "tts",
            nativeName: "tts",
            description: "配置语音合成",
            textAlias: "/tts",
            acceptsArgs: true,
        }),
        defineChatCommand({
            key: "whoami",
            nativeName: "whoami",
            description: "显示你的发送者ID",
            textAlias: "/whoami",
        }),
        defineChatCommand({
            key: "subagents",
            nativeName: "subagents",
            description: "列出/停止/查看子代理运行日志",
            textAlias: "/subagents",
            args: [
                {
                    name: "action",
                    description: "操作: list | stop | log | info | send",
                    type: "string",
                    choices: ["list", "stop", "log", "info", "send"],
                },
                {
                    name: "target",
                    description: "运行ID、索引或会话Key",
                    type: "string",
                },
                {
                    name: "value",
                    description: "额外输入（限制/消息）",
                    type: "string",
                    captureRemaining: true,
                },
            ],
            argsMenu: "auto",
        }),
        defineChatCommand({
            key: "config",
            nativeName: "config",
            description: "显示或设置配置值",
            textAlias: "/config",
            args: [
                {
                    name: "action",
                    description: "操作: show | get | set | unset",
                    type: "string",
                    choices: ["show", "get", "set", "unset"],
                },
                {
                    name: "path",
                    description: "配置路径",
                    type: "string",
                },
                {
                    name: "value",
                    description: "要设置的值",
                    type: "string",
                    captureRemaining: true,
                },
            ],
            argsParsing: "none",
            formatArgs: COMMAND_ARG_FORMATTERS.config,
        }),
        defineChatCommand({
            key: "debug",
            nativeName: "debug",
            description: "设置运行时调试选项",
            textAlias: "/debug",
            args: [
                {
                    name: "action",
                    description: "操作: show | reset | set | unset",
                    type: "string",
                    choices: ["show", "reset", "set", "unset"],
                },
                {
                    name: "path",
                    description: "调试路径",
                    type: "string",
                },
                {
                    name: "value",
                    description: "要设置的值",
                    type: "string",
                    captureRemaining: true,
                },
            ],
            argsParsing: "none",
            formatArgs: COMMAND_ARG_FORMATTERS.debug,
        }),
        defineChatCommand({
            key: "usage",
            nativeName: "usage",
            description: "用量统计或成本摘要",
            textAlias: "/usage",
            args: [
                {
                    name: "mode",
                    description: "模式: off, tokens, full, cost",
                    type: "string",
                    choices: ["off", "tokens", "full", "cost"],
                },
            ],
            argsMenu: "auto",
        }),
        defineChatCommand({
            key: "stop",
            nativeName: "stop",
            description: "停止当前运行",
            textAlias: "/stop",
        }),
        defineChatCommand({
            key: "restart",
            nativeName: "restart",
            description: "重启 Clawdbot",
            textAlias: "/restart",
        }),
        defineChatCommand({
            key: "activation",
            nativeName: "activation",
            description: "设置群组激活模式",
            textAlias: "/activation",
            args: [
                {
                    name: "mode",
                    description: "模式: mention 或 always",
                    type: "string",
                    choices: ["mention", "always"],
                },
            ],
            argsMenu: "auto",
        }),
        defineChatCommand({
            key: "send",
            nativeName: "send",
            description: "设置发送策略",
            textAlias: "/send",
            args: [
                {
                    name: "mode",
                    description: "模式: on, off, inherit",
                    type: "string",
                    choices: ["on", "off", "inherit"],
                },
            ],
            argsMenu: "auto",
        }),
        defineChatCommand({
            key: "reset",
            nativeName: "reset",
            description: "重置当前会话",
            textAlias: "/reset",
            acceptsArgs: true,
        }),
        defineChatCommand({
            key: "new",
            nativeName: "new",
            description: "开始新会话",
            textAlias: "/new",
            acceptsArgs: true,
        }),
        defineChatCommand({
            key: "compact",
            description: "压缩会话上下文",
            textAlias: "/compact",
            scope: "text",
            args: [
                {
                    name: "instructions",
                    description: "额外压缩指令",
                    type: "string",
                    captureRemaining: true,
                },
            ],
        }),
        defineChatCommand({
            key: "think",
            nativeName: "think",
            description: "设置思考深度",
            textAlias: "/think",
            args: [
                {
                    name: "level",
                    description: "等级: off, minimal, low, medium, high, xhigh",
                    type: "string",
                    choices: ({ provider, model }) => listThinkingLevels(provider, model),
                },
            ],
            argsMenu: "auto",
        }),
        defineChatCommand({
            key: "verbose",
            nativeName: "verbose",
            description: "切换详细模式",
            textAlias: "/verbose",
            args: [
                {
                    name: "mode",
                    description: "模式: on 或 off",
                    type: "string",
                    choices: ["on", "off"],
                },
            ],
            argsMenu: "auto",
        }),
        defineChatCommand({
            key: "reasoning",
            nativeName: "reasoning",
            description: "切换推理过程可见性",
            textAlias: "/reasoning",
            args: [
                {
                    name: "mode",
                    description: "模式: on, off, stream",
                    type: "string",
                    choices: ["on", "off", "stream"],
                },
            ],
            argsMenu: "auto",
        }),
        defineChatCommand({
            key: "elevated",
            nativeName: "elevated",
            description: "切换高权限模式",
            textAlias: "/elevated",
            args: [
                {
                    name: "mode",
                    description: "模式: on, off, ask, full",
                    type: "string",
                    choices: ["on", "off", "ask", "full"],
                },
            ],
            argsMenu: "auto",
        }),
        defineChatCommand({
            key: "exec",
            nativeName: "exec",
            description: "设置本会话的执行默认值",
            textAlias: "/exec",
            args: [
                {
                    name: "options",
                    description: "选项: host=... security=... ask=... node=...",
                    type: "string",
                },
            ],
            argsParsing: "none",
        }),
        defineChatCommand({
            key: "model",
            nativeName: "model",
            description: "显示或设置模型",
            textAlias: "/model",
            args: [
                {
                    name: "model",
                    description: "模型ID（提供商/模型 或 ID）",
                    type: "string",
                },
            ],
        }),
        defineChatCommand({
            key: "models",
            nativeName: "models",
            description: "列出模型提供商或可用模型",
            textAlias: "/models",
            argsParsing: "none",
            acceptsArgs: true,
        }),
        defineChatCommand({
            key: "queue",
            nativeName: "queue",
            description: "调整队列设置",
            textAlias: "/queue",
            args: [
                {
                    name: "mode",
                    description: "队列模式",
                    type: "string",
                    choices: ["steer", "interrupt", "followup", "collect", "steer-backlog"],
                },
                {
                    name: "debounce",
                    description: "防抖时长（如 500ms, 2s）",
                    type: "string",
                },
                {
                    name: "cap",
                    description: "队列上限",
                    type: "number",
                },
                {
                    name: "drop",
                    description: "丢弃策略",
                    type: "string",
                    choices: ["old", "new", "summarize"],
                },
            ],
            argsParsing: "none",
            formatArgs: COMMAND_ARG_FORMATTERS.queue,
        }),
        defineChatCommand({
            key: "bash",
            description: "运行主机 shell 命令（仅限本机）",
            textAlias: "/bash",
            scope: "text",
            args: [
                {
                    name: "command",
                    description: "Shell 命令",
                    type: "string",
                    captureRemaining: true,
                },
            ],
        }),
        ...listChannelDocks()
            .filter((dock) => dock.capabilities.nativeCommands)
            .map((dock) => defineDockCommand(dock)),
    ];
    registerAlias(commands, "whoami", "/id");
    registerAlias(commands, "think", "/thinking", "/t");
    registerAlias(commands, "verbose", "/v");
    registerAlias(commands, "reasoning", "/reason");
    registerAlias(commands, "elevated", "/elev");
    assertCommandRegistry(commands);
    return commands;
}
export function getChatCommands() {
    const registry = getActivePluginRegistry();
    if (cachedCommands && registry === cachedRegistry)
        return cachedCommands;
    const commands = buildChatCommands();
    cachedCommands = commands;
    cachedRegistry = registry;
    cachedNativeCommandSurfaces = null;
    return commands;
}
export function getNativeCommandSurfaces() {
    const registry = getActivePluginRegistry();
    if (cachedNativeCommandSurfaces && registry === cachedNativeRegistry) {
        return cachedNativeCommandSurfaces;
    }
    cachedNativeCommandSurfaces = new Set(listChannelDocks()
        .filter((dock) => dock.capabilities.nativeCommands)
        .map((dock) => dock.id));
    cachedNativeRegistry = registry;
    return cachedNativeCommandSurfaces;
}
