import { logVerbose } from "../../globals.js";
import { listSkillCommandsForWorkspace } from "../skill-commands.js";
import { buildCommandsMessage, buildHelpMessage } from "../status.js";
import { buildStatusReply } from "./commands-status.js";
import { buildContextReply } from "./commands-context-report.js";
export const handleHelpCommand = async (params, allowTextCommands) => {
    if (!allowTextCommands)
        return null;
    if (params.command.commandBodyNormalized !== "/help")
        return null;
    if (!params.command.isAuthorizedSender) {
        logVerbose(`Ignoring /help from unauthorized sender: ${params.command.senderId || "<unknown>"}`);
        return { shouldContinue: false };
    }
    return {
        shouldContinue: false,
        reply: { text: buildHelpMessage(params.cfg) },
    };
};
export const handleCommandsListCommand = async (params, allowTextCommands) => {
    if (!allowTextCommands)
        return null;
    if (params.command.commandBodyNormalized !== "/commands")
        return null;
    if (!params.command.isAuthorizedSender) {
        logVerbose(`Ignoring /commands from unauthorized sender: ${params.command.senderId || "<unknown>"}`);
        return { shouldContinue: false };
    }
    const skillCommands = params.skillCommands ??
        listSkillCommandsForWorkspace({
            workspaceDir: params.workspaceDir,
            cfg: params.cfg,
        });
    return {
        shouldContinue: false,
        reply: { text: buildCommandsMessage(params.cfg, skillCommands) },
    };
};
export const handleStatusCommand = async (params, allowTextCommands) => {
    if (!allowTextCommands)
        return null;
    const statusRequested = params.directives.hasStatusDirective || params.command.commandBodyNormalized === "/status";
    if (!statusRequested)
        return null;
    if (!params.command.isAuthorizedSender) {
        logVerbose(`Ignoring /status from unauthorized sender: ${params.command.senderId || "<unknown>"}`);
        return { shouldContinue: false };
    }
    const reply = await buildStatusReply({
        cfg: params.cfg,
        command: params.command,
        sessionEntry: params.sessionEntry,
        sessionKey: params.sessionKey,
        sessionScope: params.sessionScope,
        provider: params.provider,
        model: params.model,
        contextTokens: params.contextTokens,
        resolvedThinkLevel: params.resolvedThinkLevel,
        resolvedVerboseLevel: params.resolvedVerboseLevel,
        resolvedReasoningLevel: params.resolvedReasoningLevel,
        resolvedElevatedLevel: params.resolvedElevatedLevel,
        resolveDefaultThinkingLevel: params.resolveDefaultThinkingLevel,
        isGroup: params.isGroup,
        defaultGroupActivation: params.defaultGroupActivation,
        mediaDecisions: params.ctx.MediaUnderstandingDecisions,
    });
    return { shouldContinue: false, reply };
};
export const handleContextCommand = async (params, allowTextCommands) => {
    if (!allowTextCommands)
        return null;
    const normalized = params.command.commandBodyNormalized;
    if (normalized !== "/context" && !normalized.startsWith("/context "))
        return null;
    if (!params.command.isAuthorizedSender) {
        logVerbose(`Ignoring /context from unauthorized sender: ${params.command.senderId || "<unknown>"}`);
        return { shouldContinue: false };
    }
    return { shouldContinue: false, reply: await buildContextReply(params) };
};
export const handleWhoamiCommand = async (params, allowTextCommands) => {
    if (!allowTextCommands)
        return null;
    if (params.command.commandBodyNormalized !== "/whoami")
        return null;
    if (!params.command.isAuthorizedSender) {
        logVerbose(`Ignoring /whoami from unauthorized sender: ${params.command.senderId || "<unknown>"}`);
        return { shouldContinue: false };
    }
    const senderId = params.ctx.SenderId ?? "";
    const senderUsername = params.ctx.SenderUsername ?? "";
    const lines = ["🧭 身份信息", `渠道: ${params.command.channel}`];
    if (senderId)
        lines.push(`用户 ID: ${senderId}`);
    if (senderUsername) {
        const handle = senderUsername.startsWith("@") ? senderUsername : `@${senderUsername}`;
        lines.push(`用户名: ${handle}`);
    }
    if (params.ctx.ChatType === "group") {
        // Show group/chat ID - prefer To (chat destination) for channels like Feishu
        const groupId = params.ctx.To ?? params.ctx.From;
        if (groupId)
            lines.push(`群组 ID: ${groupId}`);
    }
    if (params.ctx.MessageThreadId != null) {
        lines.push(`话题: ${params.ctx.MessageThreadId}`);
    }
    if (senderId) {
        lines.push(`白名单配置: ${senderId}`);
    }
    return { shouldContinue: false, reply: { text: lines.join("\n") } };
};
export function buildCommandsPaginationKeyboard(_page, _totalPages, _prefix) {
    return [];
}
