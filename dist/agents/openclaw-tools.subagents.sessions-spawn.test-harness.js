import { vi } from "vitest";
const hoisted = vi.hoisted(() => {
    const callGatewayMock = vi.fn();
    const defaultConfigOverride = {
        session: {
            mainKey: "main",
            scope: "per-sender",
        },
    };
    const state = { configOverride: defaultConfigOverride };
    return { callGatewayMock, defaultConfigOverride, state };
});
export function getCallGatewayMock() {
    return hoisted.callGatewayMock;
}
export function resetSessionsSpawnConfigOverride() {
    hoisted.state.configOverride = hoisted.defaultConfigOverride;
}
export function setSessionsSpawnConfigOverride(next) {
    hoisted.state.configOverride = next;
}
export async function getSessionsSpawnTool(opts) {
    // Dynamic import: ensure harness mocks are installed before tool modules load.
    const { createOpenClawTools } = await import("./openclaw-tools.js");
    const tool = createOpenClawTools(opts).find((candidate) => candidate.name === "sessions_spawn");
    if (!tool) {
        throw new Error("missing sessions_spawn tool");
    }
    return tool;
}
vi.mock("../gateway/call.js", () => ({
    callGateway: (opts) => hoisted.callGatewayMock(opts),
}));
// Some tools import callGateway via "../../gateway/call.js" (from nested folders). Mock that too.
vi.mock("../../gateway/call.js", () => ({
    callGateway: (opts) => hoisted.callGatewayMock(opts),
}));
vi.mock("../config/config.js", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        loadConfig: () => hoisted.state.configOverride,
        resolveGatewayPort: () => 18789,
    };
});
// Same module, different specifier (used by tools under src/agents/tools/*).
vi.mock("../../config/config.js", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        loadConfig: () => hoisted.state.configOverride,
        resolveGatewayPort: () => 18789,
    };
});
