import crypto from "node:crypto";
import fs from "node:fs";
import { resolveAgentModelFallbacksOverride } from "../../agents/agent-scope.js";
import { runCliAgent } from "../../agents/cli-runner.js";
import { getCliSessionId } from "../../agents/cli-session.js";
import { runWithModelFallback } from "../../agents/model-fallback.js";
import { isCliProvider } from "../../agents/model-selection.js";
import { runEmbeddedPiAgent } from "../../agents/pi-embedded.js";
import { isCompactionFailureError, isContextOverflowError, isLikelyContextOverflowError, sanitizeUserFacingText, } from "../../agents/pi-embedded-helpers.js";
import { resolveAgentIdFromSessionKey, resolveGroupSessionKey, resolveSessionTranscriptPath, updateSessionStore, } from "../../config/sessions.js";
import { logVerbose } from "../../globals.js";
import { emitAgentEvent, registerAgentRunContext } from "../../infra/agent-events.js";
import { defaultRuntime } from "../../runtime.js";
import { isMarkdownCapableMessageChannel, resolveMessageChannel, } from "../../utils/message-channel.js";
import { stripHeartbeatToken } from "../heartbeat.js";
import { isSilentReplyPrefixText, isSilentReplyText, SILENT_REPLY_TOKEN } from "../tokens.js";
import { buildThreadingToolContext, resolveEnforceFinalTag } from "./agent-runner-utils.js";
import { createBlockReplyPayloadKey } from "./block-reply-pipeline.js";
import { parseReplyDirectives } from "./reply-directives.js";
import { applyReplyTagsToPayload, isRenderablePayload } from "./reply-payloads.js";
export async function runAgentTurnWithFallback(params) {
    let didLogHeartbeatStrip = false;
    let autoCompactionCompleted = false;
    // Track payloads sent directly (not via pipeline) during tool flush to avoid duplicates.
    const directlySentBlockKeys = new Set();
    const runId = params.opts?.runId ?? crypto.randomUUID();
    params.opts?.onAgentRunStart?.(runId);
    if (params.sessionKey) {
        registerAgentRunContext(runId, {
            sessionKey: params.sessionKey,
            verboseLevel: params.resolvedVerboseLevel,
        });
    }
    let runResult;
    let fallbackProvider = params.followupRun.run.provider;
    let fallbackModel = params.followupRun.run.model;
    let didResetAfterCompactionFailure = false;

    // Enhanced: Thinking mode auto-detect — check complexity before each turn
    let thinkingAutoNotification = null;
    let thinkingWasAutoEnabled = false;
    if (process.env.OPENCLAW_ENHANCED === '1' || process.env.OPENCLAW_ENHANCED) {
      try {
        const tm = await import('node:module').then(m => {
          const req = m.createRequire(import.meta.url);
          return req('../../../engine/ThinkingManager.cjs');
        });
        const mgr = tm.getThinkingManager();
        const result = mgr.processTurnStart(params.commandBody || '');
        if (result.notification) {
          thinkingAutoNotification = result.notification;
          thinkingWasAutoEnabled = true;
        }
      } catch (_e) { /* ThinkingManager unavailable */ }
    }

    while (true) {
        try {
            const allowPartialStream = !(params.followupRun.run.reasoningLevel === "stream" && params.opts?.onReasoningStream);
            const normalizeStreamingText = (payload) => {
                if (!allowPartialStream)
                    return { skip: true };
                let text = payload.text;
                if (!params.isHeartbeat && text?.includes("HEARTBEAT_OK")) {
                    const stripped = stripHeartbeatToken(text, {
                        mode: "message",
                    });
                    if (stripped.didStrip && !didLogHeartbeatStrip) {
                        didLogHeartbeatStrip = true;
                        logVerbose("Stripped stray HEARTBEAT_OK token from reply");
                    }
                    if (stripped.shouldSkip && (payload.mediaUrls?.length ?? 0) === 0) {
                        return { skip: true };
                    }
                    text = stripped.text;
                }
                if (isSilentReplyText(text, SILENT_REPLY_TOKEN)) {
                    return { skip: true };
                }
                if (!text)
                    return { skip: true };
                const sanitized = sanitizeUserFacingText(text);
                if (!sanitized.trim())
                    return { skip: true };
                return { text: sanitized, skip: false };
            };
            const handlePartialForTyping = async (payload) => {
                if (isSilentReplyPrefixText(payload.text, SILENT_REPLY_TOKEN)) {
                    return undefined;
                }
                const { text, skip } = normalizeStreamingText(payload);
                if (skip || !text)
                    return undefined;
                await params.typingSignals.signalTextDelta(text);
                return text;
            };
            const blockReplyPipeline = params.blockReplyPipeline;
            const onToolResult = params.opts?.onToolResult;
            const fallbackResult = await runWithModelFallback({
                cfg: params.followupRun.run.config,
                provider: params.followupRun.run.provider,
                model: params.followupRun.run.model,
                fallbacksOverride: resolveAgentModelFallbacksOverride(params.followupRun.run.config, resolveAgentIdFromSessionKey(params.followupRun.run.sessionKey)),
                run: (provider, model) => {
                    // Notify that model selection is complete (including after fallback).
                    // This allows responsePrefix template interpolation with the actual model.
                    params.opts?.onModelSelected?.({
                        provider,
                        model,
                        thinkLevel: params.followupRun.run.thinkLevel,
                    });
                    if (isCliProvider(provider, params.followupRun.run.config)) {
                        const startedAt = Date.now();
                        emitAgentEvent({
                            runId,
                            stream: "lifecycle",
                            data: {
                                phase: "start",
                                startedAt,
                            },
                        });
                        const cliSessionId = getCliSessionId(params.getActiveSessionEntry(), provider);
                        return runCliAgent({
                            sessionId: params.followupRun.run.sessionId,
                            sessionKey: params.sessionKey,
                            sessionFile: params.followupRun.run.sessionFile,
                            workspaceDir: params.followupRun.run.workspaceDir,
                            config: params.followupRun.run.config,
                            prompt: params.commandBody,
                            provider,
                            model,
                            thinkLevel: params.followupRun.run.thinkLevel,
                            timeoutMs: params.followupRun.run.timeoutMs,
                            runId,
                            extraSystemPrompt: params.followupRun.run.extraSystemPrompt,
                            ownerNumbers: params.followupRun.run.ownerNumbers,
                            cliSessionId,
                            images: params.opts?.images,
                        })
                            .then((result) => {
                            // CLI backends don't emit streaming assistant events, so we need to
                            // emit one with the final text so server-chat can populate its buffer
                            // and send the response to TUI/WebSocket clients.
                            const cliText = result.payloads?.[0]?.text?.trim();
                            if (cliText) {
                                emitAgentEvent({
                                    runId,
                                    stream: "assistant",
                                    data: { text: cliText },
                                });
                            }
                            emitAgentEvent({
                                runId,
                                stream: "lifecycle",
                                data: {
                                    phase: "end",
                                    startedAt,
                                    endedAt: Date.now(),
                                },
                            });
                            return result;
                        })
                            .catch((err) => {
                            emitAgentEvent({
                                runId,
                                stream: "lifecycle",
                                data: {
                                    phase: "error",
                                    startedAt,
                                    endedAt: Date.now(),
                                    error: err instanceof Error ? err.message : String(err),
                                },
                            });
                            throw err;
                        });
                    }
                    const authProfileId = provider === params.followupRun.run.provider
                        ? params.followupRun.run.authProfileId
                        : undefined;
                    return runEmbeddedPiAgent({
                        sessionId: params.followupRun.run.sessionId,
                        sessionKey: params.sessionKey,
                        messageProvider: params.sessionCtx.Provider?.trim().toLowerCase() || undefined,
                        messageChatType: params.sessionCtx.ChatType?.trim().toLowerCase() || undefined,
                        agentAccountId: params.sessionCtx.AccountId,
                        messageTo: params.sessionCtx.OriginatingTo ?? params.sessionCtx.To,
                        messageThreadId: params.sessionCtx.MessageThreadId ?? undefined,
                        groupId: resolveGroupSessionKey(params.sessionCtx)?.id,
                        groupChannel: params.sessionCtx.GroupChannel?.trim() ?? params.sessionCtx.GroupSubject?.trim(),
                        groupSpace: params.sessionCtx.GroupSpace?.trim() ?? undefined,
                        // Provider threading context for tool auto-injection
                        ...buildThreadingToolContext({
                            sessionCtx: params.sessionCtx,
                            config: params.followupRun.run.config,
                            hasRepliedRef: params.opts?.hasRepliedRef,
                        }),
                        sessionFile: params.followupRun.run.sessionFile,
                        workspaceDir: params.followupRun.run.workspaceDir,
                        agentDir: params.followupRun.run.agentDir,
                        config: params.followupRun.run.config,
                        skillsSnapshot: params.followupRun.run.skillsSnapshot,
                        prompt: params.commandBody,
                        extraSystemPrompt: params.followupRun.run.extraSystemPrompt,
                        ownerNumbers: params.followupRun.run.ownerNumbers,
                        enforceFinalTag: resolveEnforceFinalTag(params.followupRun.run, provider),
                        provider,
                        model,
                        authProfileId,
                        authProfileIdSource: authProfileId
                            ? params.followupRun.run.authProfileIdSource
                            : undefined,
                        thinkLevel: params.followupRun.run.thinkLevel,
                        verboseLevel: params.followupRun.run.verboseLevel,
                        reasoningLevel: params.followupRun.run.reasoningLevel,
                        execOverrides: params.followupRun.run.execOverrides,
                        toolResultFormat: (() => {
                            const channel = resolveMessageChannel(params.sessionCtx.Surface, params.sessionCtx.Provider);
                            if (!channel)
                                return "markdown";
                            return isMarkdownCapableMessageChannel(channel) ? "markdown" : "plain";
                        })(),
                        bashElevated: params.followupRun.run.bashElevated,
                        timeoutMs: params.followupRun.run.timeoutMs,
                        runId,
                        images: params.opts?.images,
                        abortSignal: params.opts?.abortSignal,
                        blockReplyBreak: params.resolvedBlockStreamingBreak,
                        blockReplyChunking: params.blockReplyChunking,
                        onPartialReply: allowPartialStream
                            ? async (payload) => {
                                const textForTyping = await handlePartialForTyping(payload);
                                if (!params.opts?.onPartialReply || textForTyping === undefined)
                                    return;
                                await params.opts.onPartialReply({
                                    text: textForTyping,
                                    mediaUrls: payload.mediaUrls,
                                });
                            }
                            : undefined,
                        onAssistantMessageStart: async () => {
                            await params.typingSignals.signalMessageStart();
                        },
                        onReasoningStream: params.typingSignals.shouldStartOnReasoning || params.opts?.onReasoningStream
                            ? async (payload) => {
                                await params.typingSignals.signalReasoningDelta();
                                await params.opts?.onReasoningStream?.({
                                    text: payload.text,
                                    mediaUrls: payload.mediaUrls,
                                });
                            }
                            : undefined,
                        onAgentEvent: async (evt) => {
                            // Trigger typing when tools start executing.
                            // Must await to ensure typing indicator starts before tool summaries are emitted.
                            if (evt.stream === "tool") {
                                const phase = typeof evt.data.phase === "string" ? evt.data.phase : "";
                                if (phase === "start" || phase === "update") {
                                    await params.typingSignals.signalToolStart();
                                }
                            }
                            // Track auto-compaction completion
                            if (evt.stream === "compaction") {
                                const phase = typeof evt.data.phase === "string" ? evt.data.phase : "";
                                const willRetry = Boolean(evt.data.willRetry);
                                if (phase === "end" && !willRetry) {
                                    autoCompactionCompleted = true;
                                }
                            }
                        },
                        // Always pass onBlockReply so flushBlockReplyBuffer works before tool execution,
                        // even when regular block streaming is disabled. The handler sends directly
                        // via opts.onBlockReply when the pipeline isn't available.
                        onBlockReply: params.opts?.onBlockReply
                            ? async (payload) => {
                                const { text, skip } = normalizeStreamingText(payload);
                                const hasPayloadMedia = (payload.mediaUrls?.length ?? 0) > 0;
                                if (skip && !hasPayloadMedia)
                                    return;
                                const currentMessageId = params.sessionCtx.MessageSidFull ?? params.sessionCtx.MessageSid;
                                const taggedPayload = applyReplyTagsToPayload({
                                    text,
                                    mediaUrls: payload.mediaUrls,
                                    mediaUrl: payload.mediaUrls?.[0],
                                    replyToId: payload.replyToId,
                                    replyToTag: payload.replyToTag,
                                    replyToCurrent: payload.replyToCurrent,
                                }, currentMessageId);
                                // Let through payloads with audioAsVoice flag even if empty (need to track it)
                                if (!isRenderablePayload(taggedPayload) && !payload.audioAsVoice)
                                    return;
                                const parsed = parseReplyDirectives(taggedPayload.text ?? "", {
                                    currentMessageId,
                                    silentToken: SILENT_REPLY_TOKEN,
                                });
                                const cleaned = parsed.text || undefined;
                                const hasRenderableMedia = Boolean(taggedPayload.mediaUrl) || (taggedPayload.mediaUrls?.length ?? 0) > 0;
                                // Skip empty payloads unless they have audioAsVoice flag (need to track it)
                                if (!cleaned &&
                                    !hasRenderableMedia &&
                                    !payload.audioAsVoice &&
                                    !parsed.audioAsVoice)
                                    return;
                                if (parsed.isSilent && !hasRenderableMedia)
                                    return;
                                const blockPayload = params.applyReplyToMode({
                                    ...taggedPayload,
                                    text: cleaned,
                                    audioAsVoice: Boolean(parsed.audioAsVoice || payload.audioAsVoice),
                                    replyToId: taggedPayload.replyToId ?? parsed.replyToId,
                                    replyToTag: taggedPayload.replyToTag || parsed.replyToTag,
                                    replyToCurrent: taggedPayload.replyToCurrent || parsed.replyToCurrent,
                                });
                                void params.typingSignals
                                    .signalTextDelta(cleaned ?? taggedPayload.text)
                                    .catch((err) => {
                                    logVerbose(`block reply typing signal failed: ${String(err)}`);
                                });
                                // Use pipeline if available (block streaming enabled), otherwise send directly
                                if (params.blockStreamingEnabled && params.blockReplyPipeline) {
                                    params.blockReplyPipeline.enqueue(blockPayload);
                                }
                                else if (params.blockStreamingEnabled) {
                                    // Send directly when flushing before tool execution (no pipeline but streaming enabled).
                                    // Track sent key to avoid duplicate in final payloads.
                                    directlySentBlockKeys.add(createBlockReplyPayloadKey(blockPayload));
                                    await params.opts?.onBlockReply?.(blockPayload);
                                }
                                // When streaming is disabled entirely, blocks are accumulated in final text instead.
                            }
                            : undefined,
                        onBlockReplyFlush: params.blockStreamingEnabled && blockReplyPipeline
                            ? async () => {
                                await blockReplyPipeline.flush({ force: true });
                            }
                            : undefined,
                        shouldEmitToolResult: params.shouldEmitToolResult,
                        shouldEmitToolOutput: params.shouldEmitToolOutput,
                        onToolResult: onToolResult
                            ? (payload) => {
                                // `subscribeEmbeddedPiSession` may invoke tool callbacks without awaiting them.
                                // If a tool callback starts typing after the run finalized, we can end up with
                                // a typing loop that never sees a matching markRunComplete(). Track and drain.
                                const task = (async () => {
                                    const { text, skip } = normalizeStreamingText(payload);
                                    if (skip)
                                        return;
                                    await params.typingSignals.signalTextDelta(text);
                                    await onToolResult({
                                        text,
                                        mediaUrls: payload.mediaUrls,
                                    });
                                })()
                                    .catch((err) => {
                                    logVerbose(`tool result delivery failed: ${String(err)}`);
                                })
                                    .finally(() => {
                                    params.pendingToolTasks.delete(task);
                                });
                                params.pendingToolTasks.add(task);
                            }
                            : undefined,
                    });
                },
            });
            runResult = fallbackResult.result;
            fallbackProvider = fallbackResult.provider;
            fallbackModel = fallbackResult.model;
            // Enhanced: Response quality guard — detect truncated/silent API responses.
            // When the provider stream drops mid-generation, the agent runner returns
            // a "success" result with empty or truncated text. This guard detects those
            // cases and injects a continuation hint so the user knows what happened.
            if (process.env.OPENCLAW_ENHANCED === '1' || process.env.OPENCLAW_ENHANCED) {
              var recoveryAnalysis = null;
              try {
                const recovery = await import('node:module').then(m => {
                  const req = m.createRequire(import.meta.url);
                  return req('../../engine/StreamRecovery.cjs');
                });
                recoveryAnalysis = recovery.analyzeResponse(runResult);
                if (recoveryAnalysis.truncated || recoveryAnalysis.silent) {
                  const payloads = runResult?.payloads || [];
                  const textParts = [];
                  for (const p of payloads) {
                    if (p.text && typeof p.text === 'string') textParts.push(p.text);
                  }
                  const partial = textParts.join('\n');
                  const hint = recoveryAnalysis.silent
                    ? '\n\n⚠️ API 返回了空响应，请重新发送消息或稍后重试。'
                    : '\n\n⚠️ 响应被截断 — API 流中断。如需继续，请回复「继续」。\n最后内容：' + partial.slice(-200);
                  runResult = {
                    ...runResult,
                    payloads: [...payloads, { text: hint }],
                    _streamRecoveryHint: recoveryAnalysis.reason,
                  };
                }
              } catch (_e) { /* StreamRecovery unavailable, skip guard */ }

              // Enhanced: Model quality scoring — track success/failure/truncation per model
              try {
                const mqt = await import('node:module').then(m => {
                  const req = m.createRequire(import.meta.url);
                  return req('../../engine/ModelQualityTracker.cjs');
                });
                const provider = fallbackProvider || (params.provider || 'siliconflow').name;
                const model = fallbackModel || params.model || 'unknown';
                const isSuccess = !(runResult.meta?.error);
                mqt.recordCall(provider, model, {
                  success: isSuccess,
                  truncated: recoveryAnalysis ? recoveryAnalysis.truncated : false,
                  error: runResult.meta?.error?.message || null,
                  latencyMs: null,
                });
              } catch (_e) { /* ModelQualityTracker unavailable, skip tracking */ }
            }
            // Some embedded runs surface context overflow as an error payload instead of throwing.
            // Treat those as a session-level failure and auto-recover by starting a fresh session.
            const embeddedError = runResult.meta?.error;
            if (embeddedError &&
                isContextOverflowError(embeddedError.message) &&
                !didResetAfterCompactionFailure &&
                (await params.resetSessionAfterCompactionFailure(embeddedError.message))) {
                didResetAfterCompactionFailure = true;
                return {
                    kind: "final",
                    payload: {
                        text: "⚠️ 上下文长度超限。已重置对话，请重试。\n\n如需避免此问题，请在配置中将 `agents.defaults.compaction.reserveTokensFloor` 设为 4000 或更高。",
                    },
                };
            }
            if (embeddedError?.kind === "role_ordering") {
                const didReset = await params.resetSessionAfterRoleOrderingConflict(embeddedError.message);
                if (didReset) {
                    return {
                        kind: "final",
                        payload: {
                            text: "⚠️ 消息顺序冲突。已重置对话，请重试。",
                        },
                    };
                }
            }
            break;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            const isContextOverflow = isLikelyContextOverflowError(message);
            const isCompactionFailure = isCompactionFailureError(message);
            const isSessionCorruption = /function call turn comes immediately after/i.test(message);
            const isRoleOrderingError = /incorrect role information|roles must alternate/i.test(message);
            if (isCompactionFailure &&
                !didResetAfterCompactionFailure &&
                (await params.resetSessionAfterCompactionFailure(message))) {
                didResetAfterCompactionFailure = true;
                return {
                    kind: "final",
                    payload: {
                        text: "⚠️ 压缩过程中上下文长度超限。已重置对话，请重试。\n\n如需避免此问题，请在配置中将 `agents.defaults.compaction.reserveTokensFloor` 设为 4000 或更高。",
                    },
                };
            }
            if (isRoleOrderingError) {
                const didReset = await params.resetSessionAfterRoleOrderingConflict(message);
                if (didReset) {
                    return {
                        kind: "final",
                        payload: {
                            text: "⚠️ 消息顺序冲突。已重置对话，请重试。",
                        },
                    };
                }
            }
            // Auto-recover from Gemini session corruption by resetting the session
            if (isSessionCorruption &&
                params.sessionKey &&
                params.activeSessionStore &&
                params.storePath) {
                const sessionKey = params.sessionKey;
                const corruptedSessionId = params.getActiveSessionEntry()?.sessionId;
                defaultRuntime.error(`Session history corrupted (Gemini function call ordering). Resetting session: ${params.sessionKey}`);
                try {
                    // Delete transcript file if it exists
                    if (corruptedSessionId) {
                        const transcriptPath = resolveSessionTranscriptPath(corruptedSessionId);
                        try {
                            fs.unlinkSync(transcriptPath);
                        }
                        catch {
                            // Ignore if file doesn't exist
                        }
                    }
                    // Keep the in-memory snapshot consistent with the on-disk store reset.
                    delete params.activeSessionStore[sessionKey];
                    // Remove session entry from store using a fresh, locked snapshot.
                    await updateSessionStore(params.storePath, (store) => {
                        delete store[sessionKey];
                    });
                }
                catch (cleanupErr) {
                    defaultRuntime.error(`Failed to reset corrupted session ${params.sessionKey}: ${String(cleanupErr)}`);
                }
                return {
                    kind: "final",
                    payload: {
                        text: "⚠️ 会话历史已损坏。已重置对话，请重试！",
                    },
                };
            }
            defaultRuntime.error(`Embedded agent failed before reply: ${message}`);
            const trimmedMessage = message.replace(/\.\s*$/, "");
            const fallbackText = isContextOverflow
                ? "⚠️ 上下文溢出 - 提示词对当前模型来说过长。请尝试更短的消息或支持更长上下文的模型。"
                : isRoleOrderingError
                    ? "⚠️ 消息顺序冲突，请重试。如果问题持续出现，请使用 /new 开启新对话。"
                    : `⚠️ 代理回复前出错：${trimmedMessage}。\n日志：openclaw-enhanced logs --follow`;
            return {
                kind: "final",
                payload: {
                    text: fallbackText,
                },
            };
        }
    }
    return {
        kind: "success",
        runResult,
        fallbackProvider,
        fallbackModel,
        didLogHeartbeatStrip,
        autoCompactionCompleted,
        directlySentBlockKeys: directlySentBlockKeys.size > 0 ? directlySentBlockKeys : undefined,
        // Enhanced: thinking auto-detect notification
        thinkingNotification: thinkingAutoNotification,
    };
}
