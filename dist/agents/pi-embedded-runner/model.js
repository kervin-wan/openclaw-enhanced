import { resolveClawdbotAgentDir } from "../agent-paths.js";
import { DEFAULT_CONTEXT_TOKENS } from "../defaults.js";
import { normalizeModelCompat } from "../model-compat.js";
import { normalizeProviderId } from "../model-selection.js";
import { discoverAuthStorage, discoverModels, } from "../pi-model-discovery.js";
const OPENAI_CODEX_GPT_53_MODEL_ID = "gpt-5.3-codex";
const OPENAI_CODEX_GPT_53_SPARK_MODEL_ID = "gpt-5.3-codex-spark";
const OPENAI_CODEX_TEMPLATE_MODEL_IDS = ["gpt-5.2-codex"];
// pi-ai's built-in Anthropic catalog can lag behind OpenClaw's defaults/docs.
// Add forward-compat fallbacks for known-new IDs by cloning an older template model.
const ANTHROPIC_OPUS_46_MODEL_ID = "claude-opus-4-6";
const ANTHROPIC_OPUS_46_DOT_MODEL_ID = "claude-opus-4.6";
const ANTHROPIC_OPUS_TEMPLATE_MODEL_IDS = ["claude-opus-4-5", "claude-opus-4.5"];
function resolveOpenAICodexGpt53FallbackModel(provider, modelId, modelRegistry) {
    const normalizedProvider = normalizeProviderId(provider);
    const trimmedModelId = modelId.trim();
    if (normalizedProvider !== "openai-codex") {
        return undefined;
    }
    const lower = trimmedModelId.toLowerCase();
    const isGpt53 = lower === OPENAI_CODEX_GPT_53_MODEL_ID;
    const isSpark = lower === OPENAI_CODEX_GPT_53_SPARK_MODEL_ID;
    if (!isGpt53 && !isSpark) {
        return undefined;
    }
    for (const templateId of OPENAI_CODEX_TEMPLATE_MODEL_IDS) {
        const template = modelRegistry.find(normalizedProvider, templateId);
        if (!template) {
            continue;
        }
        return normalizeModelCompat({
            ...template,
            id: trimmedModelId,
            name: trimmedModelId,
            // Spark is a low-latency variant; keep api/baseUrl from template.
            ...(isSpark ? { reasoning: true } : {}),
        });
    }
    return normalizeModelCompat({
        id: trimmedModelId,
        name: trimmedModelId,
        api: "openai-codex-responses",
        provider: normalizedProvider,
        baseUrl: "https://chatgpt.com/backend-api",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: DEFAULT_CONTEXT_TOKENS,
        maxTokens: DEFAULT_CONTEXT_TOKENS,
    });
}
function resolveAnthropicOpus46ForwardCompatModel(provider, modelId, modelRegistry) {
    const normalizedProvider = normalizeProviderId(provider);
    if (normalizedProvider !== "anthropic") {
        return undefined;
    }
    const trimmedModelId = modelId.trim();
    const lower = trimmedModelId.toLowerCase();
    const isOpus46 = lower === ANTHROPIC_OPUS_46_MODEL_ID ||
        lower === ANTHROPIC_OPUS_46_DOT_MODEL_ID ||
        lower.startsWith(`${ANTHROPIC_OPUS_46_MODEL_ID}-`) ||
        lower.startsWith(`${ANTHROPIC_OPUS_46_DOT_MODEL_ID}-`);
    if (!isOpus46) {
        return undefined;
    }
    const templateIds = [];
    if (lower.startsWith(ANTHROPIC_OPUS_46_MODEL_ID)) {
        templateIds.push(lower.replace(ANTHROPIC_OPUS_46_MODEL_ID, "claude-opus-4-5"));
    }
    if (lower.startsWith(ANTHROPIC_OPUS_46_DOT_MODEL_ID)) {
        templateIds.push(lower.replace(ANTHROPIC_OPUS_46_DOT_MODEL_ID, "claude-opus-4.5"));
    }
    templateIds.push(...ANTHROPIC_OPUS_TEMPLATE_MODEL_IDS);
    for (const templateId of [...new Set(templateIds)].filter(Boolean)) {
        const template = modelRegistry.find(normalizedProvider, templateId);
        if (!template) {
            continue;
        }
        return normalizeModelCompat({
            ...template,
            id: trimmedModelId,
            name: trimmedModelId,
        });
    }
    return undefined;
}
// google-antigravity's model catalog in pi-ai can lag behind the actual platform.
// When a google-antigravity model ID contains "opus-4-6" (or "opus-4.6") but isn't
// in the registry yet, clone the opus-4-5 template so the correct api
// ("google-gemini-cli") and baseUrl are preserved.
const ANTIGRAVITY_OPUS_46_STEMS = ["claude-opus-4-6", "claude-opus-4.6"];
const ANTIGRAVITY_OPUS_45_TEMPLATES = ["claude-opus-4-5-thinking", "claude-opus-4-5"];
function resolveAntigravityOpus46ForwardCompatModel(provider, modelId, modelRegistry) {
    if (normalizeProviderId(provider) !== "google-antigravity") {
        return undefined;
    }
    const lower = modelId.trim().toLowerCase();
    const isOpus46 = ANTIGRAVITY_OPUS_46_STEMS.some((stem) => lower === stem || lower.startsWith(`${stem}-`));
    if (!isOpus46) {
        return undefined;
    }
    for (const templateId of ANTIGRAVITY_OPUS_45_TEMPLATES) {
        const template = modelRegistry.find("google-antigravity", templateId);
        if (template) {
            return normalizeModelCompat({
                ...template,
                id: modelId.trim(),
                name: modelId.trim(),
            });
        }
    }
    return undefined;
}
export function buildInlineProviderModels(providers) {
    return Object.entries(providers).flatMap(([providerId, entry]) => {
        const trimmed = providerId.trim();
        if (!trimmed) {
            return [];
        }
        return (entry?.models ?? []).map((model) => ({
            ...model,
            provider: trimmed,
            baseUrl: entry?.baseUrl,
            api: model.api ?? entry?.api,
        }));
    });
}
export function buildModelAliasLines(cfg) {
    const models = cfg?.agents?.defaults?.models ?? {};
    const entries = [];
    for (const [keyRaw, entryRaw] of Object.entries(models)) {
        const model = String(keyRaw ?? "").trim();
        if (!model) {
            continue;
        }
        const alias = String(entryRaw?.alias ?? "").trim();
        if (!alias) {
            continue;
        }
        entries.push({ alias, model });
    }
    return entries
        .toSorted((a, b) => a.alias.localeCompare(b.alias))
        .map((entry) => `- ${entry.alias}: ${entry.model}`);
}
export function resolveModel(provider, modelId, agentDir, cfg) {
    const resolvedAgentDir = agentDir ?? resolveClawdbotAgentDir();
    const authStorage = discoverAuthStorage(resolvedAgentDir);
    const modelRegistry = discoverModels(authStorage, resolvedAgentDir);
    const model = modelRegistry.find(provider, modelId);
    if (!model) {
        const providers = cfg?.models?.providers ?? {};
        const inlineModels = buildInlineProviderModels(providers);
        const normalizedProvider = normalizeProviderId(provider);
        const inlineMatch = inlineModels.find((entry) => normalizeProviderId(entry.provider) === normalizedProvider && entry.id === modelId);
        if (inlineMatch) {
            const normalized = normalizeModelCompat(inlineMatch);
            return {
                model: normalized,
                authStorage,
                modelRegistry,
            };
        }
        // Codex gpt-5.3 forward-compat fallback must be checked BEFORE the generic providerCfg fallback.
        // Otherwise, if cfg.models.providers["openai-codex"] is configured, the generic fallback fires
        // with api: "openai-responses" instead of the correct "openai-codex-responses".
        const codexForwardCompat = resolveOpenAICodexGpt53FallbackModel(provider, modelId, modelRegistry);
        if (codexForwardCompat) {
            return { model: codexForwardCompat, authStorage, modelRegistry };
        }
        const anthropicForwardCompat = resolveAnthropicOpus46ForwardCompatModel(provider, modelId, modelRegistry);
        if (anthropicForwardCompat) {
            return { model: anthropicForwardCompat, authStorage, modelRegistry };
        }
        const antigravityForwardCompat = resolveAntigravityOpus46ForwardCompatModel(provider, modelId, modelRegistry);
        if (antigravityForwardCompat) {
            return { model: antigravityForwardCompat, authStorage, modelRegistry };
        }
        const providerCfg = providers[provider];
        if (providerCfg || modelId.startsWith("mock-")) {
            const fallbackModel = normalizeModelCompat({
                id: modelId,
                name: modelId,
                api: providerCfg?.api ?? "openai-responses",
                provider,
                baseUrl: providerCfg?.baseUrl,
                reasoning: false,
                input: ["text"],
                cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
                contextWindow: providerCfg?.models?.[0]?.contextWindow ?? DEFAULT_CONTEXT_TOKENS,
                maxTokens: providerCfg?.models?.[0]?.maxTokens ?? DEFAULT_CONTEXT_TOKENS,
            });
            return { model: fallbackModel, authStorage, modelRegistry };
        }
        return {
            error: `Unknown model: ${provider}/${modelId}`,
            authStorage,
            modelRegistry,
        };
    }
    return { model: normalizeModelCompat(model), authStorage, modelRegistry };
}
