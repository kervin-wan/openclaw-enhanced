import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { resolveRequiredHomeDir } from "../infra/home-dir.js";
import { runCommandWithTimeout } from "../process/exec.js";
import { isSubagentSessionKey } from "../routing/session-key.js";
import { resolveUserPath } from "../utils.js";
import { resolveWorkspaceTemplateDir } from "./workspace-templates.js";
/**
 * Migrate legacy workspace directory on gateway startup.
 * Currently a no-op in the Chinese fork (no legacy directories to migrate).
 */
export async function migrateWorkspaceIfNeeded() {
    return { migrated: false };
}
export function resolveDefaultAgentWorkspaceDir(env = process.env, homedir = os.homedir) {
    const home = resolveRequiredHomeDir(env, homedir);
    const profile = env.OPENCLAW_PROFILE?.trim();
    if (profile && profile.toLowerCase() !== "default") {
        return path.join(home, ".openclaw", `workspace-${profile}`);
    }
    return path.join(home, ".openclaw", "workspace");
}
export const DEFAULT_AGENT_WORKSPACE_DIR = resolveDefaultAgentWorkspaceDir();
export const DEFAULT_AGENTS_FILENAME = "AGENTS.md";
export const DEFAULT_SOUL_FILENAME = "SOUL.md";
export const DEFAULT_TOOLS_FILENAME = "TOOLS.md";
export const DEFAULT_IDENTITY_FILENAME = "IDENTITY.md";
export const DEFAULT_USER_FILENAME = "USER.md";
export const DEFAULT_HEARTBEAT_FILENAME = "HEARTBEAT.md";
export const DEFAULT_BOOTSTRAP_FILENAME = "BOOTSTRAP.md";
export const DEFAULT_MEMORY_FILENAME = "MEMORY.md";
export const DEFAULT_MEMORY_ALT_FILENAME = "memory.md";
const workspaceTemplateCache = new Map();
let gitAvailabilityPromise = null;
function stripFrontMatter(content) {
    if (!content.startsWith("---")) {
        return content;
    }
    const endIndex = content.indexOf("\n---", 3);
    if (endIndex === -1) {
        return content;
    }
    const start = endIndex + "\n---".length;
    let trimmed = content.slice(start);
    trimmed = trimmed.replace(/^\s+/, "");
    return trimmed;
}
async function loadTemplate(name) {
    const cached = workspaceTemplateCache.get(name);
    if (cached) {
        return cached;
    }
    const pending = (async () => {
        const templateDir = await resolveWorkspaceTemplateDir();
        const templatePath = path.join(templateDir, name);
        try {
            const content = await fs.readFile(templatePath, "utf-8");
            return stripFrontMatter(content);
        }
        catch {
            throw new Error(`Missing workspace template: ${name} (${templatePath}). Ensure docs/reference/templates are packaged.`);
        }
    })();
    workspaceTemplateCache.set(name, pending);
    try {
        return await pending;
    }
    catch (error) {
        workspaceTemplateCache.delete(name);
        throw error;
    }
}
/** Set of recognized bootstrap filenames for runtime validation */
const VALID_BOOTSTRAP_NAMES = new Set([
    DEFAULT_AGENTS_FILENAME,
    DEFAULT_SOUL_FILENAME,
    DEFAULT_TOOLS_FILENAME,
    DEFAULT_IDENTITY_FILENAME,
    DEFAULT_USER_FILENAME,
    DEFAULT_HEARTBEAT_FILENAME,
    DEFAULT_BOOTSTRAP_FILENAME,
    DEFAULT_MEMORY_FILENAME,
    DEFAULT_MEMORY_ALT_FILENAME,
]);
async function writeFileIfMissing(filePath, content) {
    try {
        await fs.writeFile(filePath, content, {
            encoding: "utf-8",
            flag: "wx",
        });
        return true;
    }
    catch (err) {
        const anyErr = err;
        if (anyErr.code !== "EEXIST") {
            throw err;
        }
        return false;
    }
}
async function hasGitRepo(dir) {
    try {
        await fs.stat(path.join(dir, ".git"));
        return true;
    }
    catch {
        return false;
    }
}
async function isGitAvailable() {
    if (gitAvailabilityPromise) {
        return gitAvailabilityPromise;
    }
    gitAvailabilityPromise = (async () => {
        try {
            const result = await runCommandWithTimeout(["git", "--version"], { timeoutMs: 2_000 });
            return result.code === 0;
        }
        catch {
            return false;
        }
    })();
    return gitAvailabilityPromise;
}
async function ensureGitRepo(dir, isBrandNewWorkspace) {
    if (!isBrandNewWorkspace) {
        return;
    }
    if (await hasGitRepo(dir)) {
        return;
    }
    if (!(await isGitAvailable())) {
        return;
    }
    try {
        await runCommandWithTimeout(["git", "init"], { cwd: dir, timeoutMs: 10_000 });
    }
    catch {
        // Ignore git init failures; workspace creation should still succeed.
    }
}
export async function ensureAgentWorkspace(params) {
    const rawDir = params?.dir?.trim() ? params.dir.trim() : DEFAULT_AGENT_WORKSPACE_DIR;
    const dir = resolveUserPath(rawDir);
    await fs.mkdir(dir, { recursive: true });
    if (!params?.ensureBootstrapFiles) {
        return { dir };
    }
    const agentsPath = path.join(dir, DEFAULT_AGENTS_FILENAME);
    const soulPath = path.join(dir, DEFAULT_SOUL_FILENAME);
    const toolsPath = path.join(dir, DEFAULT_TOOLS_FILENAME);
    const identityPath = path.join(dir, DEFAULT_IDENTITY_FILENAME);
    const userPath = path.join(dir, DEFAULT_USER_FILENAME);
    const heartbeatPath = path.join(dir, DEFAULT_HEARTBEAT_FILENAME);
    const bootstrapPath = path.join(dir, DEFAULT_BOOTSTRAP_FILENAME);
    const isBrandNewWorkspace = await (async () => {
        const paths = [agentsPath, soulPath, toolsPath, identityPath, userPath, heartbeatPath];
        const existing = await Promise.all(paths.map(async (p) => {
            try {
                await fs.access(p);
                return true;
            }
            catch {
                return false;
            }
        }));
        return existing.every((v) => !v);
    })();
    const agentsTemplate = await loadTemplate(DEFAULT_AGENTS_FILENAME);
    const soulTemplate = await loadTemplate(DEFAULT_SOUL_FILENAME);
    const toolsTemplate = await loadTemplate(DEFAULT_TOOLS_FILENAME);
    const identityTemplate = await loadTemplate(DEFAULT_IDENTITY_FILENAME);
    const userTemplate = await loadTemplate(DEFAULT_USER_FILENAME);
    const heartbeatTemplate = await loadTemplate(DEFAULT_HEARTBEAT_FILENAME);
    const wroteAgents = await writeFileIfMissing(agentsPath, agentsTemplate);
    const wroteSoul = await writeFileIfMissing(soulPath, soulTemplate);
    const wroteTools = await writeFileIfMissing(toolsPath, toolsTemplate);
    const wroteIdentity = await writeFileIfMissing(identityPath, identityTemplate);
    const wroteUser = await writeFileIfMissing(userPath, userTemplate);
    const wroteHeartbeat = await writeFileIfMissing(heartbeatPath, heartbeatTemplate);
    const wroteAnyCoreBootstrapFile = wroteAgents || wroteSoul || wroteTools || wroteIdentity || wroteUser || wroteHeartbeat;
    if (isBrandNewWorkspace || wroteAnyCoreBootstrapFile) {
        const bootstrapTemplate = await loadTemplate(DEFAULT_BOOTSTRAP_FILENAME);
        await writeFileIfMissing(bootstrapPath, bootstrapTemplate);
    }
    await ensureGitRepo(dir, isBrandNewWorkspace);
    return {
        dir,
        agentsPath,
        soulPath,
        toolsPath,
        identityPath,
        userPath,
        heartbeatPath,
        bootstrapPath,
    };
}
async function resolveMemoryBootstrapEntries(resolvedDir) {
    const candidates = [
        DEFAULT_MEMORY_FILENAME,
        DEFAULT_MEMORY_ALT_FILENAME,
    ];
    const entries = [];
    for (const name of candidates) {
        const filePath = path.join(resolvedDir, name);
        try {
            await fs.access(filePath);
            entries.push({ name, filePath });
        }
        catch {
            // optional
        }
    }
    if (entries.length <= 1) {
        return entries;
    }
    const seen = new Set();
    const deduped = [];
    for (const entry of entries) {
        let key = entry.filePath;
        try {
            key = await fs.realpath(entry.filePath);
        }
        catch { }
        if (seen.has(key)) {
            continue;
        }
        seen.add(key);
        deduped.push(entry);
    }
    return deduped;
}
export async function loadWorkspaceBootstrapFiles(dir) {
    const resolvedDir = resolveUserPath(dir);
    const entries = [
        {
            name: DEFAULT_AGENTS_FILENAME,
            filePath: path.join(resolvedDir, DEFAULT_AGENTS_FILENAME),
        },
        {
            name: DEFAULT_SOUL_FILENAME,
            filePath: path.join(resolvedDir, DEFAULT_SOUL_FILENAME),
        },
        {
            name: DEFAULT_TOOLS_FILENAME,
            filePath: path.join(resolvedDir, DEFAULT_TOOLS_FILENAME),
        },
        {
            name: DEFAULT_IDENTITY_FILENAME,
            filePath: path.join(resolvedDir, DEFAULT_IDENTITY_FILENAME),
        },
        {
            name: DEFAULT_USER_FILENAME,
            filePath: path.join(resolvedDir, DEFAULT_USER_FILENAME),
        },
        {
            name: DEFAULT_HEARTBEAT_FILENAME,
            filePath: path.join(resolvedDir, DEFAULT_HEARTBEAT_FILENAME),
        },
        {
            name: DEFAULT_BOOTSTRAP_FILENAME,
            filePath: path.join(resolvedDir, DEFAULT_BOOTSTRAP_FILENAME),
        },
    ];
    entries.push(...(await resolveMemoryBootstrapEntries(resolvedDir)));
    const result = [];
    for (const entry of entries) {
        try {
            const content = await fs.readFile(entry.filePath, "utf-8");
            result.push({
                name: entry.name,
                path: entry.filePath,
                content,
                missing: false,
            });
        }
        catch {
            result.push({ name: entry.name, path: entry.filePath, missing: true });
        }
    }
    return result;
}
const SUBAGENT_BOOTSTRAP_ALLOWLIST = new Set([DEFAULT_AGENTS_FILENAME, DEFAULT_TOOLS_FILENAME]);
export function filterBootstrapFilesForSession(files, sessionKey) {
    if (!sessionKey || !isSubagentSessionKey(sessionKey)) {
        return files;
    }
    return files.filter((file) => SUBAGENT_BOOTSTRAP_ALLOWLIST.has(file.name));
}
export async function loadExtraBootstrapFiles(dir, extraPatterns) {
    if (!extraPatterns.length) {
        return [];
    }
    const resolvedDir = resolveUserPath(dir);
    let realResolvedDir = resolvedDir;
    try {
        realResolvedDir = await fs.realpath(resolvedDir);
    }
    catch {
        // Keep lexical root if realpath fails.
    }
    // Resolve glob patterns into concrete file paths
    const resolvedPaths = new Set();
    for (const pattern of extraPatterns) {
        if (pattern.includes("*") || pattern.includes("?") || pattern.includes("{")) {
            try {
                const matches = fs.glob(pattern, { cwd: resolvedDir });
                for await (const m of matches) {
                    resolvedPaths.add(m);
                }
            }
            catch {
                // glob not available or pattern error — fall back to literal
                resolvedPaths.add(pattern);
            }
        }
        else {
            resolvedPaths.add(pattern);
        }
    }
    const result = [];
    for (const relPath of resolvedPaths) {
        const filePath = path.resolve(resolvedDir, relPath);
        // Guard against path traversal — resolved path must stay within workspace
        if (!filePath.startsWith(resolvedDir + path.sep) && filePath !== resolvedDir) {
            continue;
        }
        try {
            // Resolve symlinks and verify the real path is still within workspace
            const realFilePath = await fs.realpath(filePath);
            if (!realFilePath.startsWith(realResolvedDir + path.sep) &&
                realFilePath !== realResolvedDir) {
                continue;
            }
            // Only load files whose basename is a recognized bootstrap filename
            const baseName = path.basename(relPath);
            if (!VALID_BOOTSTRAP_NAMES.has(baseName)) {
                continue;
            }
            const content = await fs.readFile(realFilePath, "utf-8");
            result.push({
                name: baseName,
                path: filePath,
                content,
                missing: false,
            });
        }
        catch {
            // Silently skip missing extra files
        }
    }
    return result;
}
