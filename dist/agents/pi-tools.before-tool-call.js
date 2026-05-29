import { createSubsystemLogger } from "../logging/subsystem.js";
import { getGlobalHookRunner } from "../plugins/hook-runner-global.js";
import { isPlainObject } from "../utils.js";
import { normalizeToolName } from "./tool-policy.js";
const log = createSubsystemLogger("agents/tools");
const BEFORE_TOOL_CALL_WRAPPED = Symbol("beforeToolCallWrapped");
const adjustedParamsByToolCallId = new Map();
const MAX_TRACKED_ADJUSTED_PARAMS = 1024;
export async function runBeforeToolCallHook(args) {
    const toolName = normalizeToolName(args.toolName || "tool");
    const params = args.params;
    const hookRunner = getGlobalHookRunner();
    if (!hookRunner?.hasHooks("before_tool_call")) {
        return { blocked: false, params: args.params };
    }
    try {
        const normalizedParams = isPlainObject(params) ? params : {};
        const hookResult = await hookRunner.runBeforeToolCall({
            toolName,
            params: normalizedParams,
        }, {
            toolName,
            agentId: args.ctx?.agentId,
            sessionKey: args.ctx?.sessionKey,
        });
        if (hookResult?.block) {
            return {
                blocked: true,
                reason: hookResult.blockReason || "Tool call blocked by plugin hook",
            };
        }
        if (hookResult?.params && isPlainObject(hookResult.params)) {
            if (isPlainObject(params)) {
                return { blocked: false, params: { ...params, ...hookResult.params } };
            }
            return { blocked: false, params: hookResult.params };
        }
    }
    catch (err) {
        const toolCallId = args.toolCallId ? ` toolCallId=${args.toolCallId}` : "";
        log.warn(`before_tool_call hook failed: tool=${toolName}${toolCallId} error=${String(err)}`);
    }
    // Enhanced: execute additional hooks via HookSystem
  if (process.env.OPENCLAW_ENHANCED === '1') {
    try {
      const { createRequire } = await import('node:module');
      const require = createRequire(import.meta.url);
      const rt = require('../../engine/EnhancedRuntime.cjs');
      const hookResults = await rt.executeHooks('PreToolUse', {
        toolName: toolName,
        input: JSON.stringify(normalizedParams),
        sessionId: args.ctx?.sessionKey || 'unknown',
      });
      if (hookResults && hookResults.length > 0) {
        const blocked = hookResults.some(r => r.exitCode === 2);
        const feedback = hookResults.filter(r => r.stdout).map(r => r.stdout).join('\n');
        if (blocked) {
          return { blocked: true, reason: 'Blocked by enhanced hook (exit code 2)' };
        }
        if (feedback && isPlainObject(params)) {
          return { blocked: false, params: { ...params, _hookFeedback: feedback } };
        }
      }
    } catch (e) { /* enhanced hooks unavailable */ }
  }
  return { blocked: false, params };
}
export function wrapToolWithBeforeToolCallHook(tool, ctx) {
    const execute = tool.execute;
    if (!execute) {
        return tool;
    }
    const toolName = tool.name || "tool";
    const wrappedTool = {
        ...tool,
        execute: async (toolCallId, params, signal, onUpdate) => {
            const outcome = await runBeforeToolCallHook({
                toolName,
                params,
                toolCallId,
                ctx,
            });
            if (outcome.blocked) {
                throw new Error(outcome.reason);
            }
            if (toolCallId) {
                adjustedParamsByToolCallId.set(toolCallId, outcome.params);
                if (adjustedParamsByToolCallId.size > MAX_TRACKED_ADJUSTED_PARAMS) {
                    const oldest = adjustedParamsByToolCallId.keys().next().value;
                    if (oldest) {
                        adjustedParamsByToolCallId.delete(oldest);
                    }
                }
            }
            return await execute(toolCallId, outcome.params, signal, onUpdate);
        },
    };
    Object.defineProperty(wrappedTool, BEFORE_TOOL_CALL_WRAPPED, {
        value: true,
        enumerable: false,
    });
    return wrappedTool;
}
export function isToolWrappedWithBeforeToolCallHook(tool) {
    const taggedTool = tool;
    return taggedTool[BEFORE_TOOL_CALL_WRAPPED] === true;
}
export function consumeAdjustedParamsForToolCall(toolCallId) {
    const params = adjustedParamsByToolCallId.get(toolCallId);
    adjustedParamsByToolCallId.delete(toolCallId);
    return params;
}
export const __testing = {
    BEFORE_TOOL_CALL_WRAPPED,
    adjustedParamsByToolCallId,
    runBeforeToolCallHook,
    isPlainObject,
};
