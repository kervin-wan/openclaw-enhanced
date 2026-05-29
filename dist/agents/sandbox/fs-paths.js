import path from "node:path";
import { resolveSandboxInputPath, resolveSandboxPath } from "../sandbox-paths.js";
import { SANDBOX_AGENT_WORKSPACE_MOUNT } from "./constants.js";
export function parseSandboxBindMount(spec) {
    const trimmed = spec.trim();
    if (!trimmed) {
        return null;
    }
    const parts = trimmed.split(":");
    if (parts.length < 2) {
        return null;
    }
    const hostToken = (parts[0] ?? "").trim();
    const containerToken = (parts[1] ?? "").trim();
    if (!hostToken || !containerToken || !path.posix.isAbsolute(containerToken)) {
        return null;
    }
    const optionsToken = parts.slice(2).join(":").trim().toLowerCase();
    const optionParts = optionsToken
        ? optionsToken
            .split(",")
            .map((entry) => entry.trim())
            .filter(Boolean)
        : [];
    const writable = !optionParts.includes("ro");
    return {
        hostRoot: path.resolve(hostToken),
        containerRoot: normalizeContainerPath(containerToken),
        writable,
    };
}
export function buildSandboxFsMounts(sandbox) {
    const mounts = [
        {
            hostRoot: path.resolve(sandbox.workspaceDir),
            containerRoot: normalizeContainerPath(sandbox.containerWorkdir),
            writable: sandbox.workspaceAccess === "rw",
            source: "workspace",
        },
    ];
    if (sandbox.workspaceAccess !== "none" &&
        path.resolve(sandbox.agentWorkspaceDir) !== path.resolve(sandbox.workspaceDir)) {
        mounts.push({
            hostRoot: path.resolve(sandbox.agentWorkspaceDir),
            containerRoot: SANDBOX_AGENT_WORKSPACE_MOUNT,
            writable: sandbox.workspaceAccess === "rw",
            source: "agent",
        });
    }
    for (const bind of sandbox.docker.binds ?? []) {
        const parsed = parseSandboxBindMount(bind);
        if (!parsed) {
            continue;
        }
        mounts.push({
            hostRoot: parsed.hostRoot,
            containerRoot: parsed.containerRoot,
            writable: parsed.writable,
            source: "bind",
        });
    }
    return dedupeMounts(mounts);
}
export function resolveSandboxFsPathWithMounts(params) {
    const mountsByContainer = [...params.mounts].toSorted((a, b) => b.containerRoot.length - a.containerRoot.length);
    const mountsByHost = [...params.mounts].toSorted((a, b) => b.hostRoot.length - a.hostRoot.length);
    const input = params.filePath;
    const inputPosix = normalizePosixInput(input);
    if (path.posix.isAbsolute(inputPosix)) {
        const containerMount = findMountByContainerPath(mountsByContainer, inputPosix);
        if (containerMount) {
            const rel = path.posix.relative(containerMount.containerRoot, inputPosix);
            const hostPath = rel
                ? path.resolve(containerMount.hostRoot, ...toHostSegments(rel))
                : containerMount.hostRoot;
            return {
                hostPath,
                containerPath: rel
                    ? path.posix.join(containerMount.containerRoot, rel)
                    : containerMount.containerRoot,
                relativePath: toDisplayRelative({
                    containerPath: rel
                        ? path.posix.join(containerMount.containerRoot, rel)
                        : containerMount.containerRoot,
                    defaultContainerRoot: params.defaultContainerRoot,
                }),
                writable: containerMount.writable,
            };
        }
    }
    const hostResolved = resolveSandboxInputPath(input, params.cwd);
    const hostMount = findMountByHostPath(mountsByHost, hostResolved);
    if (hostMount) {
        const relHost = path.relative(hostMount.hostRoot, hostResolved);
        const relPosix = relHost ? relHost.split(path.sep).join(path.posix.sep) : "";
        const containerPath = relPosix
            ? path.posix.join(hostMount.containerRoot, relPosix)
            : hostMount.containerRoot;
        return {
            hostPath: hostResolved,
            containerPath,
            relativePath: toDisplayRelative({
                containerPath,
                defaultContainerRoot: params.defaultContainerRoot,
            }),
            writable: hostMount.writable,
        };
    }
    // Preserve legacy error wording for out-of-sandbox paths.
    resolveSandboxPath({
        filePath: input,
        cwd: params.cwd,
        root: params.defaultWorkspaceRoot,
    });
    throw new Error(`Path escapes sandbox root (${params.defaultWorkspaceRoot}): ${input}`);
}
function dedupeMounts(mounts) {
    const seen = new Set();
    const deduped = [];
    for (const mount of mounts) {
        const key = `${mount.hostRoot}=>${mount.containerRoot}`;
        if (seen.has(key)) {
            continue;
        }
        seen.add(key);
        deduped.push(mount);
    }
    return deduped;
}
function findMountByContainerPath(mounts, target) {
    for (const mount of mounts) {
        if (isPathInsidePosix(mount.containerRoot, target)) {
            return mount;
        }
    }
    return null;
}
function findMountByHostPath(mounts, target) {
    for (const mount of mounts) {
        if (isPathInsideHost(mount.hostRoot, target)) {
            return mount;
        }
    }
    return null;
}
function isPathInsidePosix(root, target) {
    const rel = path.posix.relative(root, target);
    if (!rel) {
        return true;
    }
    return !(rel.startsWith("..") || path.posix.isAbsolute(rel));
}
function isPathInsideHost(root, target) {
    const rel = path.relative(root, target);
    if (!rel) {
        return true;
    }
    return !(rel.startsWith("..") || path.isAbsolute(rel));
}
function toHostSegments(relativePosix) {
    return relativePosix.split("/").filter(Boolean);
}
function toDisplayRelative(params) {
    const rel = path.posix.relative(params.defaultContainerRoot, params.containerPath);
    if (!rel) {
        return "";
    }
    if (!rel.startsWith("..") && !path.posix.isAbsolute(rel)) {
        return rel;
    }
    return params.containerPath;
}
function normalizeContainerPath(value) {
    const normalized = path.posix.normalize(value);
    return normalized === "." ? "/" : normalized;
}
function normalizePosixInput(value) {
    return value.replace(/\\/g, "/").trim();
}
