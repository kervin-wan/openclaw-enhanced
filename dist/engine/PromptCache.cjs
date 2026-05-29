/**
 * PromptCache — 提示词缓存键管理
 * 
 * 基于静态块的 hash 生成缓存键，用于 API 层的 prompt caching。
 * 跨会话相同的静态块产生相同的缓存键 → API 可以复用缓存。
 */

const crypto = require('crypto');
const { PROMPT_CACHE_BOUNDARY } = require('./PromptBlock.cjs');

/**
 * 缓存策略配置
 */
const CACHE_CONFIG = {
  // 缓存键的 TTL（ms）— 默认 5 分钟
  defaultTTL: 5 * 60 * 1000,
  // 静态块 hash 算法
  hashAlgorithm: 'sha256',
  // hash 截断长度（字符）
  hashLength: 12,
};

/**
 * 从静态块数组生成缓存键
 * @param {Array<{id: string, text: string}>} staticBlocks
 * @returns {string} 缓存键
 */
function generateCacheKey(staticBlocks) {
  const hasher = crypto.createHash(CACHE_CONFIG.hashAlgorithm);
  for (const block of staticBlocks) {
    hasher.update(block.id);
    hasher.update('\x00');
    hasher.update(block.text);
    hasher.update('\x00');
  }
  return hasher.digest('hex').substring(0, CACHE_CONFIG.hashLength);
}

/**
 * 从静态块数组生成缓存断点标记
 * 此标记后的内容不在全局缓存范围内
 */
function generateCacheBreakpoint(staticBlocks) {
  const key = generateCacheKey(staticBlocks);
  return `${PROMPT_CACHE_BOUNDARY}\n<!-- cache_key=${key} -->`;
}

/**
 * 分离静态和动态块
 * @param {Array} blocks - 所有提示词块
 * @returns {{ static: Array, dynamic: Array }}
 */
function splitBlocks(blocks) {
  const staticBlocks = [];
  const dynamicBlocks = [];
  
  for (const block of blocks) {
    if (block.scope === 'global') {
      staticBlocks.push(block);
    } else {
      dynamicBlocks.push(block);
    }
  }
  
  return { static: staticBlocks, dynamic: dynamicBlocks };
}

/**
 * 将 blocks 组装为最终的提示词文本数组
 * 在静态块和动态块之间插入缓存边界标记
 * 
 * @param {Array} blocks - 所有提示词块（按顺序）
 * @returns {string[]} - 提示词行数组（带边界标记）
 */
function assembleWithBoundary(blocks) {
  const { static: staticBlocks, dynamic: dynamicBlocks } = splitBlocks(blocks);
  const lines = [];
  
  // 静态块
  for (const block of staticBlocks) {
    lines.push(block.text);
    lines.push('');
  }
  
  // 缓存边界
  if (dynamicBlocks.length > 0) {
    lines.push(generateCacheBreakpoint(staticBlocks));
    lines.push('');
  }
  
  // 动态块
  for (const block of dynamicBlocks) {
    lines.push(block.text);
    lines.push('');
  }
  
  return lines;
}

/**
 * 获取当前静态块的缓存键（不含边界标记）
 * 可用于 API 请求头标注
 */
function getStaticCacheKey(staticBlocks) {
  return generateCacheKey(staticBlocks);
}

/**
 * 比较两个缓存键是否相同
 */
function cacheKeyEquals(a, b) {
  return a === b;
}

module.exports = {
  CACHE_CONFIG,
  generateCacheKey,
  generateCacheBreakpoint,
  splitBlocks,
  assembleWithBoundary,
  getStaticCacheKey,
  cacheKeyEquals,
};
