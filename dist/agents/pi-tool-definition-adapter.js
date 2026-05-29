import { logDebug, logError } from "../logger.js";
import { getGlobalHookRunner } from "../plugins/hook-runner-global.js";
import { consumeAdjustedParamsForToolCall, isToolWrappedWithBeforeToolCallHook, runBeforeToolCallHook, } from "./pi-tools.before-tool-call.js";
import { normalizeToolName } from "./tool-policy.js";
import { jsonResult } from "./tools/common.js";
function isPlainObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function describeToolExecutionError(err) {
    if (err instanceof Error) {
        const message = err.message?.trim() ? err.message : String(err);
        return { message, stack: err.stack };
    }
    return { message: String(err) };
}
export function toToolDefinitions(tools) {
    return tools.map((tool) => {
        const name = tool.name || "tool";
        const normalizedName = normalizeToolName(name);
        const beforeHookWrapped = isToolWrappedWithBeforeToolCallHook(tool);
        return {
            name,
            label: tool.label ?? name,
            description: tool.description ?? "",
            // biome-ignore lint/suspicious/noExplicitAny: TypeBox schema from pi-agent-core uses a different module instance.
            parameters: tool.parameters,
            execute: async (toolCallId, params, onUpdate, _ctx, signal) => {
                // KNOWN: pi-coding-agent `ToolDefinition.execute` has a different signature/order
                // than pi-agent-core `AgentTool.execute`. This adapter keeps our existing tools intact.
                let executeParams = params;
                try {
                    if (!beforeHookWrapped) {
                        const hookOutcome = await runBeforeToolCallHook({
                            toolName: name,
                            params,
                            toolCallId,
                        });
                        if (hookOutcome.blocked) {
                            throw new Error(hookOutcome.reason);
                        }
                        executeParams = hookOutcome.params;
                    }
                    const result = await tool.execute(toolCallId, executeParams, signal, onUpdate);
                    const afterParams = beforeHookWrapped
                        ? (consumeAdjustedParamsForToolCall(toolCallId) ?? executeParams)
                        : executeParams;
                    // Call after_tool_call hook
                    const hookRunner = getGlobalHookRunner();
                    if (hookRunner?.hasHooks("after_tool_call")) {
                        try {
                            await hookRunner.runAfterToolCall({
                                toolName: name,
                                params: isPlainObject(afterParams) ? afterParams : {},
                                result,
                            }, { toolName: name });
                        }
                        catch (hookErr) {
                            logDebug(`after_tool_call hook failed: tool=${normalizedName} error=${String(hookErr)}`);
                        }
                    }
                    return result;
                }
                catch (err) {
                    if (signal?.aborted)
                        throw err;
                    const name = err && typeof err === "object" && "name" in err
                        ? String(err.name)
                        : "";
                    if (name === "AbortError") {
                        throw err;
                    }
                    if (beforeHookWrapped) {
                        consumeAdjustedParamsForToolCall(toolCallId);
                    }
                    const described = describeToolExecutionError(err);
                    if (described.stack && described.stack !== described.message) {
                        logDebug(`tools: ${normalizedName} failed stack:\n${described.stack}`);
                    }
                    logError(`[tools] ${normalizedName} failed: ${described.message}`);
                    return jsonResult({
                        status: "error",
                        tool: normalizedName,
                        error: described.message,
                    });
                }
            },
        };
    });
}
// Convert client tools (OpenResponses hosted tools) to ToolDefinition format
// These tools are intercepted to return a "pending" result instead of executing
export function toClientToolDefinitions(tools, onClientToolCall) {
    return tools.map((tool) => {
        const func = tool.function;
        return {
            name: func.name,
            label: func.name,
            description: func.description ?? "",
            parameters: func.parameters,
            execute: async (toolCallId, params, _onUpdate, _ctx, _signal) => {
                // Notify handler that a client tool was called
                if (onClientToolCall) {
                    onClientToolCall(func.name, params);
                }
                // Return a pending result - the client will execute this tool
                return jsonResult({
                    status: "pending",
                    tool: func.name,
                    message: "Tool execution delegated to client",
                });
            },
        };
    });
}
