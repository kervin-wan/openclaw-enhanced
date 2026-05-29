/**
 * ModelQualityTracker.cjs — 模型质量评分系统
 * 
 * 追踪每个 provider/model 的成功率、截断率、平均响应时间
 * 暴露给 IntegrationBridge 的 getStatus() 用于可视化
 */

let models = new Map();
let totalRequests = 0;
let trackedSince = Date.now();

/**
 * 记录一次模型调用的结果
 */
function recordCall(provider, model, result) {
  totalRequests++;
  const key = `${provider}/${model}`;
  if (!models.has(key)) {
    models.set(key, {
      provider,
      model,
      total: 0,
      success: 0,
      failure: 0,
      truncated: 0,
      totalLatencyMs: 0,
      lastCallAt: null,
      lastError: null,
    });
  }
  const entry = models.get(key);
  entry.total++;
  entry.lastCallAt = Date.now();

  if (result.latencyMs) {
    entry.totalLatencyMs += result.latencyMs;
  }

  if (result.success) {
    entry.success++;
    if (result.truncated) {
      entry.truncated++;
    }
  } else {
    entry.failure++;
    entry.lastError = result.error || null;
  }
}

/**
 * 获取汇总统计
 */
function getStats() {
  const list = [];
  for (const [key, entry] of models) {
    list.push({
      key,
      provider: entry.provider,
      model: entry.model,
      total: entry.total,
      success: entry.success,
      failure: entry.failure,
      truncated: entry.truncated,
      successRate: entry.total > 0 ? (entry.success / entry.total * 100).toFixed(1) : '0.0',
      truncationRate: entry.success > 0 ? (entry.truncated / entry.success * 100).toFixed(1) : '0.0',
      avgLatencyMs: entry.totalLatencyMs ? Math.round(entry.totalLatencyMs / entry.total) : 0,
      lastCallAt: entry.lastCallAt,
      lastError: entry.lastError,
    });
  }
  // Sort by success rate descending
  list.sort((a, b) => parseFloat(b.successRate) - parseFloat(a.successRate));
  return {
    models: list,
    totalRequests,
    trackedSince,
  };
}

/**
 * 获取最佳模型（按成功率排序）
 */
function getBestModel() {
  const stats = getStats();
  if (stats.models.length === 0) return null;
  return stats.models[0];
}

/**
 * 获取有问题的模型（失败率 > 50% 或截断率 > 30%）
 */
function getProblematic() {
  return getStats().models.filter(m => {
    const failRate = parseFloat((100 - parseFloat(m.successRate)).toFixed(1));
    return failRate > 50 || parseFloat(m.truncationRate) > 30;
  });
}

/**
 * 重置追踪数据
 */
function reset() {
  models.clear();
  totalRequests = 0;
  trackedSince = Date.now();
}

module.exports = { recordCall, getStats, getBestModel, getProblematic, reset };
