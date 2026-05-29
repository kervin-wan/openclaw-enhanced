import path from "node:path";
import { evaluateRequirementsFromMetadata } from "../shared/requirements.js";
import { CONFIG_DIR } from "../utils.js";
import { hasBinary, isBundledSkillAllowed, isConfigPathTruthy, loadWorkspaceSkillEntries, resolveBundledAllowlist, resolveSkillConfig, resolveSkillsInstallPreferences, } from "./skills.js";
import { resolveBundledSkillsContext } from "./skills/bundled-context.js";
function resolveSkillKey(entry) {
    return entry.metadata?.skillKey ?? entry.skill.name;
}
function selectPreferredInstallSpec(install, prefs) {
    if (install.length === 0) {
        return undefined;
    }
    const indexed = install.map((spec, index) => ({ spec, index }));
    const findKind = (kind) => indexed.find((item) => item.spec.kind === kind);
    const brewSpec = findKind("brew");
    const nodeSpec = findKind("node");
    const goSpec = findKind("go");
    const uvSpec = findKind("uv");
    if (prefs.preferBrew && hasBinary("brew") && brewSpec) {
        return brewSpec;
    }
    if (uvSpec) {
        return uvSpec;
    }
    if (nodeSpec) {
        return nodeSpec;
    }
    if (brewSpec) {
        return brewSpec;
    }
    if (goSpec) {
        return goSpec;
    }
    return indexed[0];
}
function normalizeInstallOptions(entry, prefs) {
    // If the skill is explicitly OS-scoped, don't surface install actions on unsupported platforms.
    // (Installers run locally; remote OS eligibility is handled separately.)
    const requiredOs = entry.metadata?.os ?? [];
    if (requiredOs.length > 0 && !requiredOs.includes(process.platform)) {
        return [];
    }
    const install = entry.metadata?.install ?? [];
    if (install.length === 0) {
        return [];
    }
    const platform = process.platform;
    const filtered = install.filter((spec) => {
        const osList = spec.os ?? [];
        return osList.length === 0 || osList.includes(platform);
    });
    if (filtered.length === 0) {
        return [];
    }
    const toOption = (spec, index) => {
        const id = (spec.id ?? `${spec.kind}-${index}`).trim();
        const bins = spec.bins ?? [];
        let label = (spec.label ?? "").trim();
        if (spec.kind === "node" && spec.package) {
            label = `Install ${spec.package} (${prefs.nodeManager})`;
        }
        if (!label) {
            if (spec.kind === "brew" && spec.formula) {
                label = `Install ${spec.formula} (brew)`;
            }
            else if (spec.kind === "node" && spec.package) {
                label = `Install ${spec.package} (${prefs.nodeManager})`;
            }
            else if (spec.kind === "go" && spec.module) {
                label = `Install ${spec.module} (go)`;
            }
            else if (spec.kind === "uv" && spec.package) {
                label = `Install ${spec.package} (uv)`;
            }
            else if (spec.kind === "download" && spec.url) {
                const url = spec.url.trim();
                const last = url.split("/").pop();
                label = `Download ${last && last.length > 0 ? last : url}`;
            }
            else {
                label = "Run installer";
            }
        }
        return { id, kind: spec.kind, label, bins };
    };
    const allDownloads = filtered.every((spec) => spec.kind === "download");
    if (allDownloads) {
        return filtered.map((spec, index) => toOption(spec, index));
    }
    const preferred = selectPreferredInstallSpec(filtered, prefs);
    if (!preferred) {
        return [];
    }
    return [toOption(preferred.spec, preferred.index)];
}
function buildSkillStatus(entry, config, prefs, eligibility, bundledNames) {
    const skillKey = resolveSkillKey(entry);
    const skillConfig = resolveSkillConfig(config, skillKey);
    const disabled = skillConfig?.enabled === false;
    const securityInfo = skillConfig?.security
        ?.securityInfo;
    const allowBundled = resolveBundledAllowlist(config);
    const blockedByAllowlist = !isBundledSkillAllowed(entry, allowBundled);
    const always = entry.metadata?.always === true;
    const emoji = entry.metadata?.emoji ?? entry.frontmatter.emoji;
    const homepageRaw = entry.metadata?.homepage ??
        entry.frontmatter.homepage ??
        entry.frontmatter.website ??
        entry.frontmatter.url;
    const homepage = homepageRaw?.trim() ? homepageRaw.trim() : undefined;
    const bundled = bundledNames && bundledNames.size > 0
        ? bundledNames.has(entry.skill.name)
        : entry.skill.source === "openclaw-bundled";
    const { required, missing, eligible: requirementsSatisfied, configChecks, } = evaluateRequirementsFromMetadata({
        always,
        metadata: entry.metadata,
        hasLocalBin: hasBinary,
        hasRemoteBin: eligibility?.remote?.hasBin,
        hasRemoteAnyBin: eligibility?.remote?.hasAnyBin,
        localPlatform: process.platform,
        remotePlatforms: eligibility?.remote?.platforms,
        isEnvSatisfied: (envName) => Boolean(process.env[envName] ||
            skillConfig?.env?.[envName] ||
            (skillConfig?.apiKey && entry.metadata?.primaryEnv === envName)),
        isConfigSatisfied: (pathStr) => isConfigPathTruthy(config, pathStr),
    });
    const eligible = !disabled && !blockedByAllowlist && requirementsSatisfied;
    return {
        name: entry.skill.name,
        description: entry.skill.description,
        source: entry.skill.source,
        bundled,
        filePath: entry.skill.filePath,
        baseDir: entry.skill.baseDir,
        skillKey,
        primaryEnv: entry.metadata?.primaryEnv,
        emoji,
        homepage,
        always,
        disabled,
        security: { securityInfo: securityInfo },
        blockedByAllowlist,
        eligible,
        requirements: required,
        missing,
        configChecks,
        install: normalizeInstallOptions(entry, prefs ?? resolveSkillsInstallPreferences(config)),
    };
}
export function buildWorkspaceSkillStatus(workspaceDir, opts) {
    const managedSkillsDir = opts?.managedSkillsDir ?? path.join(CONFIG_DIR, "skills");
    const bundledContext = resolveBundledSkillsContext();
    const skillEntries = opts?.entries ??
        loadWorkspaceSkillEntries(workspaceDir, {
            config: opts?.config,
            managedSkillsDir,
            bundledSkillsDir: bundledContext.dir,
        });
    const prefs = resolveSkillsInstallPreferences(opts?.config);
    return {
        workspaceDir,
        managedSkillsDir,
        skills: skillEntries.map((entry) => buildSkillStatus(entry, opts?.config, prefs, opts?.eligibility, bundledContext.names)),
    };
}
