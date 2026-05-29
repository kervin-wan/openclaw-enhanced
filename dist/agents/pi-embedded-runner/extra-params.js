import { streamSimple } from "@mariozechner/pi-ai";
import { log } from "./logger.js";
/**
 * Resolve provider-specific extra params from model config.
 * Used to pass through stream params like temperature/maxTokens.
 *
 * @internal Exported for testing only
 */
export function resolveExtraParams(params) {
    const modelKey = `${params.provider}/${params.modelId}`;
    const modelConfig = params.cfg?.agents?.defaults?.models?.[modelKey];
    return modelConfig?.params ? { ...modelConfig.params } : undefined;
}
/**
 * Resolve cacheRetention from extraParams, supporting both new `cacheRetention`
 * and legacy `cacheControlTtl` values for backwards compatibility.
 *
 * Mapping: "5m" → "short", "1h" → "long"
 *
 * Only applies to Anthropic provider (OpenRouter uses openai-completions API
 * with hardcoded cache_control, not the cacheRetention stream option).
 */
function resolveCacheRetention(extraParams, provider) {
    if (provider !== "anthropic") {
        return undefined;
    }
    // Prefer new cacheRetention if present
    const newVal = extraParams?.cacheRetention;
    if (newVal === "none" || newVal === "short" || newVal === "long") {
        return newVal;
    }
    // Fall back to legacy cacheControlTtl with mapping
    const legacy = extraParams?.cacheControlTtl;
    if (legacy === "5m") {
        return "short";
    }
    if (legacy === "1h") {
        return "long";
    }
    return undefined;
}
function createStreamFnWithExtraParams(baseStreamFn, extraParams, provider) {
    if (!extraParams || Object.keys(extraParams).length === 0) {
        return undefined;
    }
    const streamParams = {};
    if (typeof extraParams.temperature === "number") {
        streamParams.temperature = extraParams.temperature;
    }
    if (typeof extraParams.maxTokens === "number") {
        streamParams.maxTokens = extraParams.maxTokens;
    }
    const cacheRetention = resolveCacheRetention(extraParams, provider);
    if (cacheRetention) {
        // @ts-ignore -- cherry-pick upstream type mismatch
        // @ts-ignore -- cherry-pick upstream type mismatch
        streamParams.cacheRetention = cacheRetention;
    }
    if (Object.keys(streamParams).length === 0) {
        return undefined;
    }
    log.debug(`creating streamFn wrapper with params: ${JSON.stringify(streamParams)}`);
    const underlying = baseStreamFn ?? streamSimple;
    const wrappedStreamFn = (model, context, options) => underlying(model, context, {
        ...streamParams,
        ...options,
    });
    return wrappedStreamFn;
}
/**
 * Apply extra params (like temperature) to an agent's streamFn.
 *
 * @internal Exported for testing
 */
export function applyExtraParamsToAgent(agent, cfg, provider, modelId, extraParamsOverride) {
    const extraParams = resolveExtraParams({
        cfg,
        provider,
        modelId,
    });
    const override = extraParamsOverride && Object.keys(extraParamsOverride).length > 0
        ? Object.fromEntries(Object.entries(extraParamsOverride).filter(([, value]) => value !== undefined))
        : undefined;
    const merged = Object.assign({}, extraParams, override);
    const wrappedStreamFn = createStreamFnWithExtraParams(agent.streamFn, merged, provider);
    if (wrappedStreamFn) {
        log.debug(`applying extraParams to agent streamFn for ${provider}/${modelId}`);
        agent.streamFn = wrappedStreamFn;
    }
}
