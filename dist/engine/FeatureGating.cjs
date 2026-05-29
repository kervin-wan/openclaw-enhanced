/**
 * FeatureGating — 功能门控系统
 *
 * 提供 GrowthBook 风格的功能开关和 A/B 测试：
 * - 布尔开关 (feature('XXX'))
 * - 百分比滚动 (0-100%)
 * - 用户/组白名单
 * - 远程配置（可对接 GrowthBook API）
 */

/**
 * 功能门控管理器
 */
class FeatureGating {
  constructor(config = {}) {
    /** @type {Map<string, Object>} 功能配置 */
    this.features = new Map();
    /** @type {Map<string, Object>} A/B 实验配置 */
    this.experiments = new Map();
    /** @type {Object} 用户属性 */
    this.userAttributes = config.userAttributes || {};
    /** @type {Function|null} 远程配置加载器 */
    this.remoteLoader = config.remoteLoader || null;
  }

  /**
   * 注册功能开关
   */
  registerFeature(id, config) {
    this.features.set(id, {
      id,
      enabled: config.enabled !== false,
      rolloutPercent: config.rolloutPercent ?? 100,
      whitelist: new Set(config.whitelist || []),
      blacklist: new Set(config.blacklist || []),
      description: config.description || '',
      defaultValue: config.defaultValue !== false,
    });
  }

  /**
   * 批量注册
   */
  registerFeatures(features) {
    for (const [id, config] of Object.entries(features)) {
      this.registerFeature(id, config);
    }
  }

  /**
   * 检查功能是否启用
   * 优先级：黑名单 > 白名单 > rollout% > enabled
   */
  isEnabled(featureId) {
    const feature = this.features.get(featureId);
    if (!feature) return false;

    const userId = this.userAttributes.userId || 'anonymous';

    // 黑名单优先
    if (feature.blacklist.has(userId)) return false;

    // 白名单直接放行
    if (feature.whitelist.has(userId)) return true;

    // 百分比滚动
    if (feature.rolloutPercent < 100) {
      const hash = this._hashUser(userId + ':' + featureId);
      if (hash % 100 >= feature.rolloutPercent) return false;
    }

    return feature.enabled;
  }

  /**
   * 注册 A/B 实验
   */
  registerExperiment(id, config) {
    this.experiments.set(id, {
      id,
      variants: config.variants || ['control', 'treatment'],
      weights: config.weights || [50, 50],
      active: config.active !== false,
      description: config.description || '',
    });
  }

  /**
   * 获取用户所在的实验组
   */
  getExperimentVariant(experimentId) {
    const exp = this.experiments.get(experimentId);
    if (!exp || !exp.active) return 'control';

    const userId = this.userAttributes.userId || 'anonymous';
    const hash = this._hashUser(userId + ':' + experimentId);
    const bucket = hash % 100;

    let cumulative = 0;
    for (let i = 0; i < exp.variants.length; i++) {
      cumulative += exp.weights[i] || 0;
      if (bucket < cumulative) return exp.variants[i];
    }

    return exp.variants[0];
  }

  /**
   * 获取功能值（支持 GrowthBook 风格的缓存）
   */
  getValue_CACHED_MAY_BE_STALE(featureId, defaultValue) {
    return this.isEnabled(featureId) ? true : (defaultValue ?? false);
  }

  /**
   * 从远程配置加载
   */
  async loadRemote() {
    if (!this.remoteLoader) return 0;
    try {
      const config = await this.remoteLoader();
      if (config.features) this.registerFeatures(config.features);
      if (config.experiments && Array.isArray(config.experiments)) {
        for (const exp of config.experiments) {
          this.registerExperiment(exp.id, exp);
        }
      }
      return Object.keys(config.features || {}).length;
    } catch (e) {
      console.error('[FeatureGating] Remote load failed:', e.message);
      return 0;
    }
  }

  /**
   * 获取所有功能列表
   */
  listFeatures() {
    return [...this.features.entries()].map(([id, f]) => ({
      id,
      enabled: this.isEnabled(id),
      rolloutPercent: f.rolloutPercent,
      description: f.description,
    }));
  }

  /**
   * 获取统计
   */
  getStats() {
    let enabled = 0, disabled = 0;
    for (const id of this.features.keys()) {
      this.isEnabled(id) ? enabled++ : disabled++;
    }
    return {
      features: { total: this.features.size, enabled, disabled },
      experiments: { total: this.experiments.size, active: [...this.experiments.values()].filter(e => e.active).length },
    };
  }

  /**
   * 确定性 hash
   */
  _hashUser(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}

module.exports = {
  FeatureGating,
};
