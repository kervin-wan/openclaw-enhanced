import { execDocker } from "./docker.js";
import { buildSandboxFsMounts, resolveSandboxFsPathWithMounts, } from "./fs-paths.js";
export function createSandboxFsBridge(params) {
    return new SandboxFsBridgeImpl(params.sandbox);
}
class SandboxFsBridgeImpl {
    sandbox;
    mounts;
    constructor(sandbox) {
        this.sandbox = sandbox;
        this.mounts = buildSandboxFsMounts(sandbox);
    }
    resolvePath(params) {
        const target = this.resolveResolvedPath(params);
        return {
            hostPath: target.hostPath,
            relativePath: target.relativePath,
            containerPath: target.containerPath,
        };
    }
    async readFile(params) {
        const target = this.resolveResolvedPath(params);
        const result = await this.runCommand('set -eu; cat -- "$1"', {
            args: [target.containerPath],
            signal: params.signal,
        });
        return result.stdout;
    }
    async writeFile(params) {
        const target = this.resolveResolvedPath(params);
        this.ensureWriteAccess(target, "write files");
        const buffer = Buffer.isBuffer(params.data)
            ? params.data
            : Buffer.from(params.data, params.encoding ?? "utf8");
        const script = params.mkdir === false
            ? 'set -eu; cat >"$1"'
            : 'set -eu; dir=$(dirname -- "$1"); if [ "$dir" != "." ]; then mkdir -p -- "$dir"; fi; cat >"$1"';
        await this.runCommand(script, {
            args: [target.containerPath],
            stdin: buffer,
            signal: params.signal,
        });
    }
    async mkdirp(params) {
        const target = this.resolveResolvedPath(params);
        this.ensureWriteAccess(target, "create directories");
        await this.runCommand('set -eu; mkdir -p -- "$1"', {
            args: [target.containerPath],
            signal: params.signal,
        });
    }
    async remove(params) {
        const target = this.resolveResolvedPath(params);
        this.ensureWriteAccess(target, "remove files");
        const flags = [params.force === false ? "" : "-f", params.recursive ? "-r" : ""].filter(Boolean);
        const rmCommand = flags.length > 0 ? `rm ${flags.join(" ")}` : "rm";
        await this.runCommand(`set -eu; ${rmCommand} -- "$1"`, {
            args: [target.containerPath],
            signal: params.signal,
        });
    }
    async rename(params) {
        const from = this.resolveResolvedPath({ filePath: params.from, cwd: params.cwd });
        const to = this.resolveResolvedPath({ filePath: params.to, cwd: params.cwd });
        this.ensureWriteAccess(from, "rename files");
        this.ensureWriteAccess(to, "rename files");
        await this.runCommand('set -eu; dir=$(dirname -- "$2"); if [ "$dir" != "." ]; then mkdir -p -- "$dir"; fi; mv -- "$1" "$2"', {
            args: [from.containerPath, to.containerPath],
            signal: params.signal,
        });
    }
    async stat(params) {
        const target = this.resolveResolvedPath(params);
        const result = await this.runCommand('set -eu; stat -c "%F|%s|%Y" -- "$1"', {
            args: [target.containerPath],
            signal: params.signal,
            allowFailure: true,
        });
        if (result.code !== 0) {
            const stderr = result.stderr.toString("utf8");
            if (stderr.includes("No such file or directory")) {
                return null;
            }
            const message = stderr.trim() || `stat failed with code ${result.code}`;
            throw new Error(`stat failed for ${target.containerPath}: ${message}`);
        }
        const text = result.stdout.toString("utf8").trim();
        const [typeRaw, sizeRaw, mtimeRaw] = text.split("|");
        const size = Number.parseInt(sizeRaw ?? "0", 10);
        const mtime = Number.parseInt(mtimeRaw ?? "0", 10) * 1000;
        return {
            type: coerceStatType(typeRaw),
            size: Number.isFinite(size) ? size : 0,
            mtimeMs: Number.isFinite(mtime) ? mtime : 0,
        };
    }
    async runCommand(script, options = {}) {
        const dockerArgs = [
            "exec",
            "-i",
            this.sandbox.containerName,
            "sh",
            "-c",
            script,
            "moltbot-sandbox-fs",
        ];
        if (options.args?.length) {
            dockerArgs.push(...options.args);
        }
        // @ts-ignore -- cherry-pick upstream type mismatch
        // @ts-ignore -- cherry-pick upstream type mismatch
        return execDocker(dockerArgs, {
            // @ts-ignore -- cherry-pick upstream type mismatch
            input: options.stdin,
            allowFailure: options.allowFailure,
            signal: options.signal,
        });
    }
    ensureWriteAccess(target, action) {
        if (!allowsWrites(this.sandbox.workspaceAccess) || !target.writable) {
            throw new Error(`Sandbox path is read-only; cannot ${action}: ${target.containerPath}`);
        }
    }
    resolveResolvedPath(params) {
        return resolveSandboxFsPathWithMounts({
            filePath: params.filePath,
            cwd: params.cwd ?? this.sandbox.workspaceDir,
            defaultWorkspaceRoot: this.sandbox.workspaceDir,
            defaultContainerRoot: this.sandbox.containerWorkdir,
            mounts: this.mounts,
        });
    }
}
function allowsWrites(access) {
    return access === "rw";
}
function coerceStatType(typeRaw) {
    if (!typeRaw) {
        return "other";
    }
    const normalized = typeRaw.trim().toLowerCase();
    if (normalized.includes("directory")) {
        return "directory";
    }
    if (normalized.includes("file")) {
        return "file";
    }
    return "other";
}
