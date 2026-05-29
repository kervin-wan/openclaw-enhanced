import crypto from "node:crypto";
import { abortEmbeddedPiRun } from "../../agents/pi-embedded.js";
import { AGENT_LANE_SUBAGENT } from "../../agents/lanes.js";
import { listSubagentRunsForRequester } from "../../agents/subagent-registry.js";
import { extractAssistantText, resolveInternalSessionKey, resolveMainSessionAlias, sanitizeTextContent, stripToolMessages, } from "../../agents/tools/sessions-helpers.js";
import { loadSessionStore, resolveStorePath, updateSessionStore } from "../../config/sessions.js";
import { callGateway } from "../../gateway/call.js";
import { logVerbose } from "../../globals.js";
import { parseAgentSessionKey } from "../../routing/session-key.js";
import { INTERNAL_MESSAGE_CHANNEL } from "../../utils/message-channel.js";
import { formatAgeShort, formatDurationShort, formatRunLabel, formatRunStatus, sortSubagentRuns, } from "./subagents-utils.js";
import { stopSubagentsForRequester } from "./abort.js";
import { clearSessionQueues } from "./queue.js";
const COMMAND = "/subagents";
const ACTIONS = new Set(["list", "stop", "log", "send", "info", "help"]);
function formatTimestamp(valueMs) {
    if (!valueMs || !Number.isFinite(valueMs) || valueMs <= 0)
        return "n/a";
    return new Date(valueMs).toISOString();
}
function formatTimestampWithAge(valueMs) {
    if (!valueMs || !Number.isFinite(valueMs) || valueMs <= 0)
        return "n/a";
    return `${formatTimestamp(valueMs)} (${formatAgeShort(Date.now() - valueMs)})`;
}
function resolveRequesterSessionKey(params) {
    const raw = params.sessionKey?.trim() || params.ctx.CommandTargetSessionKey?.trim();
    if (!raw)
        return undefined;
    const { mainKey, alias } = resolveMainSessionAlias(params.cfg);
    return resolveInternalSessionKey({ key: raw, alias, mainKey });
}
function resolveSubagentTarget(runs, token) {
    const trimmed = token?.trim();
    if (!trimmed)
        return { error: "Missing subagent id." };
    if (trimmed === "last") {
        const sorted = sortSubagentRuns(runs);
        return { entry: sorted[0] };
    }
    const sorted = sortSubagentRuns(runs);
    if (/^\d+$/.test(trimmed)) {
        const idx = Number.parseInt(trimmed, 10);
        if (!Number.isFinite(idx) || idx <= 0 || idx > sorted.length) {
            return { error: `Invalid subagent index: ${trimmed}` };
        }
        return { entry: sorted[idx - 1] };
    }
    if (trimmed.includes(":")) {
        const match = runs.find((entry) => entry.childSessionKey === trimmed);
        return match ? { entry: match } : { error: `未知子代理会话: ${trimmed}` };
    }
    const byRunId = runs.filter((entry) => entry.runId.startsWith(trimmed));
    if (byRunId.length === 1)
        return { entry: byRunId[0] };
    if (byRunId.length > 1) {
        return { error: `模糊的运行 ID 前缀: ${trimmed}` };
    }
    return { error: `未知子代理 ID: ${trimmed}` };
}
function buildSubagentsHelp() {
    return [
        "🧭 子代理",
        "用法:",
        "- /subagents list",
        "- /subagents stop <id|#|all>",
        "- /subagents log <id|#> [limit] [tools]",
        "- /subagents info <id|#>",
        "- /subagents send <id|#> <message>",
        "",
        "ID: 使用列表索引 (#)、runId 前缀或完整会话密钥。",
    ].join("\n");
}
function normalizeMessageText(text) {
    return text.replace(/\s+/g, " ").trim();
}
export function extractMessageText(message) {
    const role = typeof message.role === "string" ? message.role : "";
    const shouldSanitize = role === "assistant";
    const content = message.content;
    if (typeof content === "string") {
        const normalized = normalizeMessageText(shouldSanitize ? sanitizeTextContent(content) : content);
        return normalized ? { role, text: normalized } : null;
    }
    if (!Array.isArray(content))
        return null;
    const chunks = [];
    for (const block of content) {
        if (!block || typeof block !== "object")
            continue;
        if (block.type !== "text")
            continue;
        const text = block.text;
        if (typeof text === "string") {
            const value = shouldSanitize ? sanitizeTextContent(text) : text;
            if (value.trim()) {
                chunks.push(value);
            }
        }
    }
    const joined = normalizeMessageText(chunks.join(" "));
    return joined ? { role, text: joined } : null;
}
function formatLogLines(messages) {
    const lines = [];
    for (const msg of messages) {
        const extracted = extractMessageText(msg);
        if (!extracted)
            continue;
        const label = extracted.role === "assistant" ? "Assistant" : "User";
        lines.push(`${label}: ${extracted.text}`);
    }
    return lines;
}
function loadSubagentSessionEntry(params, childKey) {
    const parsed = parseAgentSessionKey(childKey);
    const storePath = resolveStorePath(params.cfg.session?.store, { agentId: parsed?.agentId });
    const store = loadSessionStore(storePath);
    return { storePath, store, entry: store[childKey] };
}
export const handleSubagentsCommand = async (params, allowTextCommands) => {
    if (!allowTextCommands)
        return null;
    const normalized = params.command.commandBodyNormalized;
    if (!normalized.startsWith(COMMAND))
        return null;
    if (!params.command.isAuthorizedSender) {
        logVerbose(`Ignoring /subagents from unauthorized sender: ${params.command.senderId || "<unknown>"}`);
        return { shouldContinue: false };
    }
    const rest = normalized.slice(COMMAND.length).trim();
    const [actionRaw, ...restTokens] = rest.split(/\s+/).filter(Boolean);
    const action = actionRaw?.toLowerCase() || "list";
    if (!ACTIONS.has(action)) {
        return { shouldContinue: false, reply: { text: buildSubagentsHelp() } };
    }
    const requesterKey = resolveRequesterSessionKey(params);
    if (!requesterKey) {
        return { shouldContinue: false, reply: { text: "⚠️ 缺少会话密钥。" } };
    }
    const runs = listSubagentRunsForRequester(requesterKey);
    if (action === "help") {
        return { shouldContinue: false, reply: { text: buildSubagentsHelp() } };
    }
    if (action === "list") {
        if (runs.length === 0) {
            return { shouldContinue: false, reply: { text: "🧭 子代理: 此会话无子代理。" } };
        }
        const sorted = sortSubagentRuns(runs);
        const active = sorted.filter((entry) => !entry.endedAt);
        const done = sorted.length - active.length;
        const lines = ["🧭 子代理 (当前会话)", `活动: ${active.length} · 完成: ${done}`];
        sorted.forEach((entry, index) => {
            const status = formatRunStatus(entry);
            const label = formatRunLabel(entry);
            const runtime = entry.endedAt && entry.startedAt
                ? formatDurationShort(entry.endedAt - entry.startedAt)
                : formatAgeShort(Date.now() - (entry.startedAt ?? entry.createdAt));
            const runId = entry.runId.slice(0, 8);
            lines.push(`${index + 1}) ${status} · ${label} · ${runtime} · run ${runId} · ${entry.childSessionKey}`);
        });
        return { shouldContinue: false, reply: { text: lines.join("\n") } };
    }
    if (action === "stop") {
        const target = restTokens[0];
        if (!target) {
            return { shouldContinue: false, reply: { text: "⚙️ 用法: /subagents stop <id|#|all>" } };
        }
        if (target === "all" || target === "*") {
            const { stopped } = stopSubagentsForRequester({
                cfg: params.cfg,
                requesterSessionKey: requesterKey,
            });
            const label = stopped === 1 ? "个子代理" : "个子代理";
            return {
                shouldContinue: false,
                reply: { text: `⚙️ 已停止 ${stopped} ${label}。` },
            };
        }
        const resolved = resolveSubagentTarget(runs, target);
        if (!resolved.entry) {
            return {
                shouldContinue: false,
                reply: { text: `⚠️ ${resolved.error ?? "未知子代理。"}` },
            };
        }
        if (resolved.entry.endedAt) {
            return {
                shouldContinue: false,
                reply: { text: "⚙️ 子代理已结束。" },
            };
        }
        const childKey = resolved.entry.childSessionKey;
        const { storePath, store, entry } = loadSubagentSessionEntry(params, childKey);
        const sessionId = entry?.sessionId;
        if (sessionId) {
            abortEmbeddedPiRun(sessionId);
        }
        const cleared = clearSessionQueues([childKey, sessionId]);
        if (cleared.followupCleared > 0 || cleared.laneCleared > 0) {
            logVerbose(`subagents stop: cleared followups=${cleared.followupCleared} lane=${cleared.laneCleared} keys=${cleared.keys.join(",")}`);
        }
        if (entry) {
            entry.abortedLastRun = true;
            entry.updatedAt = Date.now();
            store[childKey] = entry;
            await updateSessionStore(storePath, (nextStore) => {
                nextStore[childKey] = entry;
            });
        }
        return {
            shouldContinue: false,
            reply: { text: `⚙️ 已请求停止 ${formatRunLabel(resolved.entry)}。` },
        };
    }
    if (action === "info") {
        const target = restTokens[0];
        if (!target) {
            return { shouldContinue: false, reply: { text: "ℹ️ 用法: /subagents info <id|#>" } };
        }
        const resolved = resolveSubagentTarget(runs, target);
        if (!resolved.entry) {
            return {
                shouldContinue: false,
                reply: { text: `⚠️ ${resolved.error ?? "未知子代理。"}` },
            };
        }
        const run = resolved.entry;
        const { entry: sessionEntry } = loadSubagentSessionEntry(params, run.childSessionKey);
        const runtime = run.startedAt && Number.isFinite(run.startedAt)
            ? formatDurationShort((run.endedAt ?? Date.now()) - run.startedAt)
            : "n/a";
        const outcome = run.outcome
            ? `${run.outcome.status}${run.outcome.error ? ` (${run.outcome.error})` : ""}`
            : "n/a";
        const lines = [
            "ℹ️ 子代理信息",
            `状态: ${formatRunStatus(run)}`,
            `标签: ${formatRunLabel(run)}`,
            `任务: ${run.task}`,
            `运行: ${run.runId}`,
            `会话: ${run.childSessionKey}`,
            `会话 ID: ${sessionEntry?.sessionId ?? "n/a"}`,
            `对话历史: ${sessionEntry?.sessionFile ?? "n/a"}`,
            `运行时: ${runtime}`,
            `创建: ${formatTimestampWithAge(run.createdAt)}`,
            `启动: ${formatTimestampWithAge(run.startedAt)}`,
            `结束: ${formatTimestampWithAge(run.endedAt)}`,
            `清理: ${run.cleanup}`,
            run.archiveAtMs ? `归档: ${formatTimestampWithAge(run.archiveAtMs)}` : undefined,
            run.cleanupHandled ? "清理已处理: 是" : undefined,
            `结果: ${outcome}`,
        ].filter(Boolean);
        return { shouldContinue: false, reply: { text: lines.join("\n") } };
    }
    if (action === "log") {
        const target = restTokens[0];
        if (!target) {
            return { shouldContinue: false, reply: { text: "📜 用法: /subagents log <id|#> [limit]" } };
        }
        const includeTools = restTokens.some((token) => token.toLowerCase() === "tools");
        const limitToken = restTokens.find((token) => /^\d+$/.test(token));
        const limit = limitToken ? Math.min(200, Math.max(1, Number.parseInt(limitToken, 10))) : 20;
        const resolved = resolveSubagentTarget(runs, target);
        if (!resolved.entry) {
            return {
                shouldContinue: false,
                reply: { text: `⚠️ ${resolved.error ?? "未知子代理。"}` },
            };
        }
        const history = (await callGateway({
            method: "chat.history",
            params: { sessionKey: resolved.entry.childSessionKey, limit },
        }));
        const rawMessages = Array.isArray(history?.messages) ? history.messages : [];
        const filtered = includeTools ? rawMessages : stripToolMessages(rawMessages);
        const lines = formatLogLines(filtered);
        const header = `📜 子代理日志: ${formatRunLabel(resolved.entry)}`;
        if (lines.length === 0) {
            return { shouldContinue: false, reply: { text: `${header}\n(无消息)` } };
        }
        return { shouldContinue: false, reply: { text: [header, ...lines].join("\n") } };
    }
    if (action === "send") {
        const target = restTokens[0];
        const message = restTokens.slice(1).join(" ").trim();
        if (!target || !message) {
            return {
                shouldContinue: false,
                reply: { text: "✉️ 用法: /subagents send <id|#> <message>" },
            };
        }
        const resolved = resolveSubagentTarget(runs, target);
        if (!resolved.entry) {
            return {
                shouldContinue: false,
                reply: { text: `⚠️ ${resolved.error ?? "未知子代理。"}` },
            };
        }
        const idempotencyKey = crypto.randomUUID();
        let runId = idempotencyKey;
        try {
            const response = (await callGateway({
                method: "agent",
                params: {
                    message,
                    sessionKey: resolved.entry.childSessionKey,
                    idempotencyKey,
                    deliver: false,
                    channel: INTERNAL_MESSAGE_CHANNEL,
                    lane: AGENT_LANE_SUBAGENT,
                },
                timeoutMs: 10_000,
            }));
            if (response?.runId)
                runId = response.runId;
        }
        catch (err) {
            const messageText = err instanceof Error ? err.message : typeof err === "string" ? err : "错误";
            return { shouldContinue: false, reply: { text: `⚠️ 发送失败: ${messageText}` } };
        }
        const waitMs = 30_000;
        const wait = (await callGateway({
            method: "agent.wait",
            params: { runId, timeoutMs: waitMs },
            timeoutMs: waitMs + 2000,
        }));
        if (wait?.status === "timeout") {
            return {
                shouldContinue: false,
                reply: { text: `⏳ 子代理仍在运行 (run ${runId.slice(0, 8)})。` },
            };
        }
        if (wait?.status === "error") {
            return {
                shouldContinue: false,
                reply: {
                    text: `⚠️ 子代理错误: ${wait.error ?? "未知错误"} (run ${runId.slice(0, 8)})。`,
                },
            };
        }
        const history = (await callGateway({
            method: "chat.history",
            params: { sessionKey: resolved.entry.childSessionKey, limit: 50 },
        }));
        const filtered = stripToolMessages(Array.isArray(history?.messages) ? history.messages : []);
        const last = filtered.length > 0 ? filtered[filtered.length - 1] : undefined;
        const replyText = last ? extractAssistantText(last) : undefined;
        return {
            shouldContinue: false,
            reply: {
                text: replyText ?? `✅ 已发送至 ${formatRunLabel(resolved.entry)} (run ${runId.slice(0, 8)})。`,
            },
        };
    }
    return { shouldContinue: false, reply: { text: buildSubagentsHelp() } };
};
