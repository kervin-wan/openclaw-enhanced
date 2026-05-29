import crypto from "node:crypto";
import { Type } from "@sinclair/typebox";
import { formatThinkingLevels, normalizeThinkLevel } from "../../auto-reply/thinking.js";
import { loadConfig } from "../../config/config.js";
import { callGateway } from "../../gateway/call.js";
import { isSubagentSessionKey, normalizeAgentId, parseAgentSessionKey, } from "../../routing/session-key.js";
import { normalizeDeliveryContext } from "../../utils/delivery-context.js";
import { resolveAgentConfig } from "../agent-scope.js";
import { AGENT_LANE_SUBAGENT } from "../lanes.js";
import { optionalStringEnum } from "../schema/typebox.js";
import { buildSubagentSystemPrompt } from "../subagent-announce.js";
import { registerSubagentRun } from "../subagent-registry.js";
import { jsonResult, readStringParam } from "./common.js";
import { resolveDisplaySessionKey, resolveInternalSessionKey, resolveMainSessionAlias, } from "./sessions-helpers.js";
const SessionsSpawnToolSchema = Type.Object({
    task: Type.String(),
    label: Type.Optional(Type.String()),
    agentId: Type.Optional(Type.String()),
    model: Type.Optional(Type.String()),
    thinking: Type.Optional(Type.String()),
    runTimeoutSeconds: Type.Optional(Type.Number({ minimum: 0 })),
    // Back-compat alias. Prefer runTimeoutSeconds.
    timeoutSeconds: Type.Optional(Type.Number({ minimum: 0 })),
    cleanup: optionalStringEnum(["delete", "keep"]),
    fork: Type.Optional(Type.Boolean()),
    forkName: Type.Optional(Type.String()),
});
function splitModelRef(ref) {
    if (!ref)
        return { provider: undefined, model: undefined };
    const trimmed = ref.trim();
    if (!trimmed)
        return { provider: undefined, model: undefined };
    const [provider, model] = trimmed.split("/", 2);
    if (model)
        return { provider, model };
    return { provider: undefined, model: trimmed };
}
function normalizeModelSelection(value) {
    if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed || undefined;
    }
    if (!value || typeof value !== "object")
        return undefined;
    const primary = value.primary;
    if (typeof primary === "string" && primary.trim())
        return primary.trim();
    return undefined;
}
export function createSessionsSpawnTool(opts) {
    return {
        label: "Sessions",
        name: "sessions_spawn",
        description: "Spawn a background sub-agent run in an isolated session and announce the result back to the requester chat.",
        parameters: SessionsSpawnToolSchema,
        execute: async (_toolCallId, args) => {
            const params = args;
            const task = readStringParam(params, "task", { required: true });
            const label = typeof params.label === "string" ? params.label.trim() : "";
            const requestedAgentId = readStringParam(params, "agentId");
            const modelOverride = readStringParam(params, "model");
            const thinkingOverrideRaw = readStringParam(params, "thinking");
            const forkMode = params.fork === true;
            // Enhanced FeatureGate: check if fork is enabled via IntegrationBridge
            if (forkMode && process.env.OPENCLAW_ENHANCED === '1') {
              try {
                const { createRequire: cr } = await import('node:module');
                const req = cr(import.meta.url);
                const bridge = req('../../engine/IntegrationBridge.cjs');
                if (!bridge.getFeatureGate().isEnabled('fork_subagent')) {
                  forkMode = false;
                }
              } catch (e) { /* gate unavailable */ }
            }
            const forkName = typeof params.forkName === "string" ? params.forkName.trim() : "";
            const cleanup = params.cleanup === "keep" || params.cleanup === "delete"
                ? params.cleanup
                : "keep";
            const requesterOrigin = normalizeDeliveryContext({
                channel: opts?.agentChannel,
                accountId: opts?.agentAccountId,
                to: opts?.agentTo,
                threadId: opts?.agentThreadId,
            });
            const runTimeoutSeconds = (() => {
                const explicit = typeof params.runTimeoutSeconds === "number" && Number.isFinite(params.runTimeoutSeconds)
                    ? Math.max(0, Math.floor(params.runTimeoutSeconds))
                    : undefined;
                if (explicit !== undefined)
                    return explicit;
                const legacy = typeof params.timeoutSeconds === "number" && Number.isFinite(params.timeoutSeconds)
                    ? Math.max(0, Math.floor(params.timeoutSeconds))
                    : undefined;
                return legacy ?? 0;
            })();
            let modelWarning;
            let modelApplied = false;
            const cfg = loadConfig();
            const { mainKey, alias } = resolveMainSessionAlias(cfg);
            const requesterSessionKey = opts?.agentSessionKey;
            if (typeof requesterSessionKey === "string" && isSubagentSessionKey(requesterSessionKey)) {
                return jsonResult({
                    status: "forbidden",
                    error: "sessions_spawn is not allowed from sub-agent sessions",
                });
            }
            const requesterInternalKey = requesterSessionKey
                ? resolveInternalSessionKey({
                    key: requesterSessionKey,
                    alias,
                    mainKey,
                })
                : alias;
            const requesterDisplayKey = resolveDisplaySessionKey({
                key: requesterInternalKey,
                alias,
                mainKey,
            });
            const requesterAgentId = normalizeAgentId(opts?.requesterAgentIdOverride ?? parseAgentSessionKey(requesterInternalKey)?.agentId);
            const targetAgentId = requestedAgentId
                ? normalizeAgentId(requestedAgentId)
                : requesterAgentId;
            if (targetAgentId !== requesterAgentId) {
                const allowAgents = resolveAgentConfig(cfg, requesterAgentId)?.subagents?.allowAgents ?? [];
                const allowAny = allowAgents.some((value) => value.trim() === "*");
                const normalizedTargetId = targetAgentId.toLowerCase();
                const allowSet = new Set(allowAgents
                    .filter((value) => value.trim() && value.trim() !== "*")
                    .map((value) => normalizeAgentId(value).toLowerCase()));
                if (!allowAny && !allowSet.has(normalizedTargetId)) {
                    const allowedText = allowAny
                        ? "*"
                        : allowSet.size > 0
                            ? Array.from(allowSet).join(", ")
                            : "none";
                    return jsonResult({
                        status: "forbidden",
                        error: `agentId is not allowed for sessions_spawn (allowed: ${allowedText})`,
                    });
                }
            }
            const childSessionKey = `agent:${targetAgentId}:subagent:${crypto.randomUUID()}`;
            
            // Enhanced Fork: read parent messages and inject as context
            let forkContextMessages = "";
            if (forkMode && requesterSessionKey) {
              try {
                const historyRes = await callGateway({
                  method: "chat.history",
                  params: { sessionKey: requesterSessionKey, limit: 50 },
                  timeoutMs: 5_000,
                });
                if (historyRes?.messages && Array.isArray(historyRes.messages)) {
                  const recentMsgs = historyRes.messages.slice(-100);
                  forkContextMessages = recentMsgs.map(m => {
                    const role = m.role || (m.type === 'user' ? 'user' : 'assistant');
                    const text = typeof m.content === 'string' ? m.content 
                      : Array.isArray(m.content) ? m.content.filter(b => b.type === 'text').map(b => b.text).join(' ') 
                      : '';
                    return `[${role}]: ${text.substring(0, 300)}`;
                  }).join('\n');
                }
              } catch (e) { /* history unavailable, continue without */ }
            }

            // Build fork directive with parent context
            const forkContextBlock = forkContextMessages 
              ? `\n\n--- Parent Conversation Context ---\n${forkContextMessages}\n--- End Context ---` 
              : "";
            const forkDirective = forkMode ? `[FORK from ${requesterInternalKey}]

You inherit the full context of the parent conversation.
Directive: ${forkName ? forkName + " - " : ""}${task}${forkContextBlock}

Execute directly. Report concisely.` : null;
            const spawnedByKey = requesterInternalKey;
            const targetAgentConfig = resolveAgentConfig(cfg, targetAgentId);
            const resolvedModel = normalizeModelSelection(modelOverride) ??
                normalizeModelSelection(targetAgentConfig?.subagents?.model) ??
                normalizeModelSelection(cfg.agents?.defaults?.subagents?.model);
            const resolvedThinkingDefaultRaw = readStringParam(targetAgentConfig?.subagents ?? {}, "thinking") ??
                readStringParam(cfg.agents?.defaults?.subagents ?? {}, "thinking");
            let thinkingOverride;
            const thinkingCandidateRaw = thinkingOverrideRaw || resolvedThinkingDefaultRaw;
            if (thinkingCandidateRaw) {
                const normalized = normalizeThinkLevel(thinkingCandidateRaw);
                if (!normalized) {
                    const { provider, model } = splitModelRef(resolvedModel);
                    const hint = formatThinkingLevels(provider, model);
                    return jsonResult({
                        status: "error",
                        error: `Invalid thinking level "${thinkingCandidateRaw}". Use one of: ${hint}.`,
                    });
                }
                thinkingOverride = normalized;
            }
            if (resolvedModel) {
                try {
                    await callGateway({
                        method: "sessions.patch",
                        params: { key: childSessionKey, model: resolvedModel },
                        timeoutMs: 10_000,
                    });
                    modelApplied = true;
                }
                catch (err) {
                    const messageText = err instanceof Error ? err.message : typeof err === "string" ? err : "error";
                    const recoverable = messageText.includes("invalid model") || messageText.includes("model not allowed");
                    if (!recoverable) {
                        return jsonResult({
                            status: "error",
                            error: messageText,
                            childSessionKey,
                        });
                    }
                    modelWarning = messageText;
                }
            }
            const childSystemPrompt = buildSubagentSystemPrompt({
                requesterSessionKey,
                requesterOrigin,
                childSessionKey,
                label: label || undefined,
                task,
            });
            const childIdem = crypto.randomUUID();
            let childRunId = childIdem;
            try {
                const response = (await callGateway({
                    method: "agent",
                    params: {
                        message: task,
                        sessionKey: childSessionKey,
                        channel: requesterOrigin?.channel,
                        idempotencyKey: childIdem,
                        deliver: false,
                        lane: AGENT_LANE_SUBAGENT,
                        extraSystemPrompt: forkMode && forkDirective ? forkDirective : childSystemPrompt,
                        thinking: thinkingOverride,
                        timeout: runTimeoutSeconds > 0 ? runTimeoutSeconds : undefined,
                        label: label || undefined,
                        spawnedBy: spawnedByKey,
                        groupId: opts?.agentGroupId ?? undefined,
                        groupChannel: opts?.agentGroupChannel ?? undefined,
                        groupSpace: opts?.agentGroupSpace ?? undefined,
                    },
                    timeoutMs: 10_000,
                }));
                if (typeof response?.runId === "string" && response.runId) {
                    childRunId = response.runId;
                }
            }
            catch (err) {
                const messageText = err instanceof Error ? err.message : typeof err === "string" ? err : "error";
                return jsonResult({
                    status: "error",
                    error: messageText,
                    childSessionKey,
                    runId: childRunId,
                });
            }
            registerSubagentRun({
                runId: childRunId,
                childSessionKey,
                requesterSessionKey: requesterInternalKey,
                requesterOrigin,
                requesterDisplayKey,
                task,
                cleanup,
                label: label || undefined,
                runTimeoutSeconds,
            });
            return jsonResult({
                status: "accepted",
                childSessionKey,
                runId: childRunId,
                modelApplied: resolvedModel ? modelApplied : undefined,
                warning: modelWarning,
            });
        },
    };
}
