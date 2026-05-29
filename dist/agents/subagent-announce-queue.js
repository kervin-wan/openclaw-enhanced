import { defaultRuntime } from "../runtime.js";
import { deliveryContextKey, normalizeDeliveryContext, } from "../utils/delivery-context.js";
import { applyQueueDropPolicy, buildCollectPrompt, buildQueueSummaryPrompt, hasCrossChannelItems, waitForQueueDebounce, } from "../utils/queue-helpers.js";
const ANNOUNCE_QUEUES = new Map();
function previewQueueSummaryPrompt(queue) {
    return buildQueueSummaryPrompt({
        state: {
            dropPolicy: queue.dropPolicy,
            droppedCount: queue.droppedCount,
            summaryLines: [...queue.summaryLines],
        },
        noun: "announce",
    });
}
function clearQueueSummaryState(queue) {
    queue.droppedCount = 0;
    queue.summaryLines = [];
}
export function resetAnnounceQueuesForTests() {
    // Test isolation: other suites may leave a draining queue behind in the worker.
    // Clearing the map alone isn't enough because drain loops capture `queue` by reference.
    for (const queue of ANNOUNCE_QUEUES.values()) {
        queue.items.length = 0;
        queue.summaryLines.length = 0;
        queue.droppedCount = 0;
        queue.lastEnqueuedAt = 0;
    }
    ANNOUNCE_QUEUES.clear();
}
function getAnnounceQueue(key, settings, send) {
    const existing = ANNOUNCE_QUEUES.get(key);
    if (existing) {
        existing.mode = settings.mode;
        existing.debounceMs =
            typeof settings.debounceMs === "number"
                ? Math.max(0, settings.debounceMs)
                : existing.debounceMs;
        existing.cap =
            typeof settings.cap === "number" && settings.cap > 0
                ? Math.floor(settings.cap)
                : existing.cap;
        existing.dropPolicy = settings.dropPolicy ?? existing.dropPolicy;
        existing.send = send;
        return existing;
    }
    const created = {
        items: [],
        draining: false,
        lastEnqueuedAt: 0,
        mode: settings.mode,
        debounceMs: typeof settings.debounceMs === "number" ? Math.max(0, settings.debounceMs) : 1000,
        cap: typeof settings.cap === "number" && settings.cap > 0 ? Math.floor(settings.cap) : 20,
        dropPolicy: settings.dropPolicy ?? "summarize",
        droppedCount: 0,
        summaryLines: [],
        send,
    };
    ANNOUNCE_QUEUES.set(key, created);
    return created;
}
function scheduleAnnounceDrain(key) {
    const queue = ANNOUNCE_QUEUES.get(key);
    if (!queue || queue.draining) {
        return;
    }
    queue.draining = true;
    void (async () => {
        try {
            let forceIndividualCollect = false;
            while (queue.items.length > 0 || queue.droppedCount > 0) {
                await waitForQueueDebounce(queue);
                if (queue.mode === "collect") {
                    if (forceIndividualCollect) {
                        const next = queue.items[0];
                        if (!next) {
                            break;
                        }
                        await queue.send(next);
                        queue.items.shift();
                        continue;
                    }
                    const isCrossChannel = hasCrossChannelItems(queue.items, (item) => {
                        if (!item.origin) {
                            return {};
                        }
                        if (!item.originKey) {
                            return { cross: true };
                        }
                        return { key: item.originKey };
                    });
                    if (isCrossChannel) {
                        forceIndividualCollect = true;
                        const next = queue.items[0];
                        if (!next) {
                            break;
                        }
                        await queue.send(next);
                        queue.items.shift();
                        continue;
                    }
                    const items = queue.items.slice();
                    const summary = previewQueueSummaryPrompt(queue);
                    const prompt = buildCollectPrompt({
                        title: "[Queued announce messages while agent was busy]",
                        items,
                        summary,
                        renderItem: (item, idx) => `---\nQueued #${idx + 1}\n${item.prompt}`.trim(),
                    });
                    const last = items.at(-1);
                    if (!last) {
                        break;
                    }
                    await queue.send({ ...last, prompt });
                    queue.items.splice(0, items.length);
                    if (summary) {
                        clearQueueSummaryState(queue);
                    }
                    continue;
                }
                const summaryPrompt = previewQueueSummaryPrompt(queue);
                if (summaryPrompt) {
                    const next = queue.items[0];
                    if (!next) {
                        break;
                    }
                    await queue.send({ ...next, prompt: summaryPrompt });
                    queue.items.shift();
                    clearQueueSummaryState(queue);
                    continue;
                }
                const next = queue.items[0];
                if (!next) {
                    break;
                }
                await queue.send(next);
                queue.items.shift();
            }
        }
        catch (err) {
            // Keep items in queue and retry after debounce; avoid hot-loop retries.
            queue.lastEnqueuedAt = Date.now();
            defaultRuntime.error?.(`announce queue drain failed for ${key}: ${String(err)}`);
        }
        finally {
            queue.draining = false;
            if (queue.items.length === 0 && queue.droppedCount === 0) {
                ANNOUNCE_QUEUES.delete(key);
            }
            else {
                scheduleAnnounceDrain(key);
            }
        }
    })();
}
export function enqueueAnnounce(params) {
    const queue = getAnnounceQueue(params.key, params.settings, params.send);
    queue.lastEnqueuedAt = Date.now();
    const shouldEnqueue = applyQueueDropPolicy({
        queue,
        summarize: (item) => item.summaryLine?.trim() || item.prompt.trim(),
    });
    if (!shouldEnqueue) {
        if (queue.dropPolicy === "new") {
            scheduleAnnounceDrain(params.key);
        }
        return false;
    }
    const origin = normalizeDeliveryContext(params.item.origin);
    const originKey = deliveryContextKey(origin);
    queue.items.push({ ...params.item, origin, originKey });
    scheduleAnnounceDrain(params.key);
    return true;
}
