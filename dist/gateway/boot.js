import fs from "node:fs/promises";
import path from "node:path";
import { SILENT_REPLY_TOKEN } from "../auto-reply/tokens.js";
import { resolveAgentIdFromSessionKey, resolveMainSessionKey, } from "../config/sessions/main-session.js";
import { resolveStorePath } from "../config/sessions/paths.js";
import { loadSessionStore, updateSessionStore } from "../config/sessions/store.js";
import { agentCommand } from "../commands/agent.js";
import { createSubsystemLogger } from "../logging/subsystem.js";
import { defaultRuntime } from "../runtime.js";
const log = createSubsystemLogger("gateway/boot");
const BOOT_FILENAME = "BOOT.md";
function generateBootSessionId() {
    const ts = new Date()
        .toISOString()
        .replace(/[T:.Z-]/g, (m) => (m === "T" ? "_" : ""))
        .slice(0, 23);
    const suffix = Math.random().toString(16).slice(2, 10);
    return `boot-${ts}-${suffix}`;
}
function buildBootPrompt(content) {
    return [
        "You are running a boot check. Follow BOOT.md instructions exactly.",
        "",
        "BOOT.md:",
        content,
        "",
        "If BOOT.md asks you to send a message, use the message tool (action=send with channel + target).",
        "Use the `target` field (not `to`) for message tool destinations.",
        `After sending with the message tool, reply with ONLY: ${SILENT_REPLY_TOKEN}.`,
        `If nothing needs attention, reply with ONLY: ${SILENT_REPLY_TOKEN}.`,
    ].join("\n");
}
async function loadBootFile(workspaceDir) {
    const bootPath = path.join(workspaceDir, BOOT_FILENAME);
    try {
        const content = await fs.readFile(bootPath, "utf-8");
        const trimmed = content.trim();
        if (!trimmed)
            return { status: "empty" };
        return { status: "ok", content: trimmed };
    }
    catch (err) {
        const anyErr = err;
        if (anyErr.code === "ENOENT")
            return { status: "missing" };
        throw err;
    }
}
function snapshotMainSessionMapping(params) {
    const agentId = resolveAgentIdFromSessionKey(params.sessionKey);
    const storePath = resolveStorePath(params.cfg.session?.store, { agentId });
    try {
        const store = loadSessionStore(storePath, { skipCache: true });
        const entry = store[params.sessionKey];
        if (!entry) {
            return {
                storePath,
                sessionKey: params.sessionKey,
                canRestore: true,
                hadEntry: false,
            };
        }
        return {
            storePath,
            sessionKey: params.sessionKey,
            canRestore: true,
            hadEntry: true,
            entry: structuredClone(entry),
        };
    }
    catch (err) {
        log.debug("boot: 无法快照主会话映射", {
            sessionKey: params.sessionKey,
            error: String(err),
        });
        return {
            storePath,
            sessionKey: params.sessionKey,
            canRestore: false,
            hadEntry: false,
        };
    }
}
async function restoreMainSessionMapping(snapshot) {
    if (!snapshot.canRestore) {
        return undefined;
    }
    try {
        await updateSessionStore(snapshot.storePath, (store) => {
            if (snapshot.hadEntry && snapshot.entry) {
                store[snapshot.sessionKey] = snapshot.entry;
                return;
            }
            delete store[snapshot.sessionKey];
        });
        return undefined;
    }
    catch (err) {
        return err instanceof Error ? err.message : String(err);
    }
}
export async function runBootOnce(params) {
    const bootRuntime = {
        log: () => { },
        error: (message) => log.error(String(message)),
        exit: defaultRuntime.exit,
    };
    let result;
    try {
        result = await loadBootFile(params.workspaceDir);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        log.error(`boot: failed to read ${BOOT_FILENAME}: ${message}`);
        return { status: "failed", reason: message };
    }
    if (result.status === "missing" || result.status === "empty") {
        return { status: "skipped", reason: result.status };
    }
    const sessionKey = resolveMainSessionKey(params.cfg);
    const message = buildBootPrompt(result.content ?? "");
    const sessionId = generateBootSessionId();
    const mappingSnapshot = snapshotMainSessionMapping({
        cfg: params.cfg,
        sessionKey,
    });
    let agentFailure;
    try {
        await agentCommand({
            message,
            sessionKey,
            sessionId,
            deliver: false,
        }, bootRuntime, params.deps);
    }
    catch (err) {
        agentFailure = err instanceof Error ? err.message : String(err);
        log.error(`boot: agent 运行失败: ${agentFailure}`);
    }
    const mappingRestoreFailure = await restoreMainSessionMapping(mappingSnapshot);
    if (mappingRestoreFailure) {
        log.error(`boot: 恢复主会话映射失败: ${mappingRestoreFailure}`);
    }
    if (!agentFailure && !mappingRestoreFailure) {
        return { status: "ran" };
    }
    const reasonParts = [
        agentFailure ? `agent 运行失败: ${agentFailure}` : undefined,
        mappingRestoreFailure ? `映射恢复失败: ${mappingRestoreFailure}` : undefined,
    ].filter((part) => Boolean(part));
    return { status: "failed", reason: reasonParts.join("; ") };
}
