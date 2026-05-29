import { setCliSessionId } from "../../agents/cli-session.js";
import { deriveSessionTotalTokens, hasNonzeroUsage, } from "../../agents/usage.js";
import { updateSessionStoreEntry, } from "../../config/sessions.js";
import { logVerbose } from "../../globals.js";
export async function persistSessionUsageUpdate(params) {
    const { storePath, sessionKey } = params;
    if (!storePath || !sessionKey) {
        return;
    }
    const label = params.logLabel ? `${params.logLabel} ` : "";
    if (hasNonzeroUsage(params.usage)) {
        try {
            await updateSessionStoreEntry({
                storePath,
                sessionKey,
                update: async (entry) => {
                    const input = params.usage?.input ?? 0;
                    const output = params.usage?.output ?? 0;
                    const resolvedContextTokens = params.contextTokensUsed ?? entry.contextTokens;
                    const hasPromptTokens = typeof params.promptTokens === "number" &&
                        Number.isFinite(params.promptTokens) &&
                        params.promptTokens > 0;
                    const hasFreshContextSnapshot = Boolean(params.lastCallUsage) || hasPromptTokens;
                    // Use last-call usage for totalTokens when available. The accumulated
                    // `usage.input` sums input tokens from every API call in the run
                    // (tool-use loops, compaction retries), overstating actual context.
                    // `lastCallUsage` reflects only the final API call — the true context.
                    const usageForContext = params.lastCallUsage ?? params.usage;
                    const totalTokens = hasFreshContextSnapshot
                        ? deriveSessionTotalTokens({
                            usage: usageForContext,
                            contextTokens: resolvedContextTokens,
                            promptTokens: params.promptTokens,
                        })
                        : undefined;
                    const patch = {
                        inputTokens: input,
                        outputTokens: output,
                        // Missing a last-call snapshot means context utilization is stale/unknown.
                        totalTokens,
                        totalTokensFresh: typeof totalTokens === "number",
                        modelProvider: params.providerUsed ?? entry.modelProvider,
                        model: params.modelUsed ?? entry.model,
                        contextTokens: resolvedContextTokens,
                        systemPromptReport: params.systemPromptReport ?? entry.systemPromptReport,
                        updatedAt: Date.now(),
                    };
                    const cliProvider = params.providerUsed ?? entry.modelProvider;
                    if (params.cliSessionId && cliProvider) {
                        const nextEntry = { ...entry, ...patch };
                        setCliSessionId(nextEntry, cliProvider, params.cliSessionId);
                        return {
                            ...patch,
                            cliSessionIds: nextEntry.cliSessionIds,
                            claudeCliSessionId: nextEntry.claudeCliSessionId,
                        };
                    }
                    return patch;
                },
            });
        }
        catch (err) {
            logVerbose(`failed to persist ${label}usage update: ${String(err)}`);
        }
        return;
    }
    if (params.modelUsed || params.contextTokensUsed) {
        try {
            await updateSessionStoreEntry({
                storePath,
                sessionKey,
                update: async (entry) => {
                    const patch = {
                        modelProvider: params.providerUsed ?? entry.modelProvider,
                        model: params.modelUsed ?? entry.model,
                        contextTokens: params.contextTokensUsed ?? entry.contextTokens,
                        systemPromptReport: params.systemPromptReport ?? entry.systemPromptReport,
                        updatedAt: Date.now(),
                    };
                    const cliProvider = params.providerUsed ?? entry.modelProvider;
                    if (params.cliSessionId && cliProvider) {
                        const nextEntry = { ...entry, ...patch };
                        setCliSessionId(nextEntry, cliProvider, params.cliSessionId);
                        return {
                            ...patch,
                            cliSessionIds: nextEntry.cliSessionIds,
                            claudeCliSessionId: nextEntry.claudeCliSessionId,
                        };
                    }
                    return patch;
                },
            });
        }
        catch (err) {
            logVerbose(`failed to persist ${label}model/context update: ${String(err)}`);
        }
    }
}
