/**
 * SnipCompact — 激进上下文压缩引擎
 *
 * 相比 MicroCompact（只清理工具结果），SnipCompact 会：
 * 1. 删除整个中间段的消息（保留头尾）
 * 2. 为被删除的部分生成 LLM 摘要
 * 3. 注入详细 boundary 告知模型
 *
 * 适用场景：超长会话，MicroCompact 不够用了
 */

/**
 * 默认配置
 */
const DEFAULT_CONFIG = {
  /** 触发 Snip 的消息数阈值 */
  triggerThreshold: 80,
  /** 保留头部消息数（建立任务上下文） */
  preserveHead: 20,
  /** 保留尾部消息数（最新工作状态） */
  preserveTail: 15,
  /** 两次 Snip 之间最小间隔（消息数） */
  minInterval: 30,
  /** 是否自动触发（false = 手动触发） */
  autoTrigger: false,
};

/**
 * SnipCompact 引擎
 */
class SnipCompactEngine {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.snipCount = 0;
    this.lastSnipMsgCount = 0;
    this.totalTokensSaved = 0;
  }

  /**
   * 检查是否需要 Snip
   */
  needsSnip(messages) {
    const count = messages.length;
    if (count < this.config.triggerThreshold) return false;
    if (count - this.lastSnipMsgCount < this.config.minInterval) return false;
    return true;
  }

  /**
   * 执行 Snip 压缩
   * @param {Array} messages - 消息数组（会被原地修改）
   * @returns {{ messages: Array, summary: string, boundary: string, stats: Object }}
   */
  snip(messages) {
    const total = messages.length;
    const head = this.config.preserveHead;
    const tail = this.config.preserveTail;

    if (total <= head + tail + 5) {
      return { messages, summary: '', boundary: '', stats: { snipped: 0, kept: total, level: 'skipped' } };
    }

    // 分离头、中、尾
    const headMsgs = messages.slice(0, head);
    const snippedMsgs = messages.slice(head, total - tail);
    const tailMsgs = messages.slice(total - tail);

    const snippedCount = snippedMsgs.length;
    const keptCount = headMsgs.length + tailMsgs.length;

    // 估算节省的 token
    let tokensSaved = 0;
    for (const msg of snippedMsgs) {
      tokensSaved += this._estimateMsgTokens(msg);
    }

    // 生成摘要
    const summary = this._generateSummary(snippedMsgs);

    // 生成 boundary
    const boundary = this._buildSnipBoundary({
      snipped: snippedCount,
      kept: keptCount,
      tokensSaved,
      summary,
    });

    // 原地替换消息数组
    messages.length = 0;
    messages.push(...headMsgs);
    // 插入 boundary 消息
    messages.push({
      type: 'system',
      subtype: 'compact_boundary',
      content: boundary,
      compactMetadata: {
        snippedCount,
        tokensSaved,
        snipIndex: this.snipCount + 1,
        preservedHead: head,
        preservedTail: tail,
        summary,
      },
      timestamp: new Date().toISOString(),
    });
    messages.push(...tailMsgs);

    // 更新状态
    this.snipCount++;
    this.lastSnipMsgCount = messages.length;
    this.totalTokensSaved += tokensSaved;

    return {
      messages,
      summary,
      boundary,
      stats: {
        snipped: snippedCount,
        kept: keptCount,
        tokensSaved,
        level: 'snip',
        snipIndex: this.snipCount,
      },
    };
  }

  /**
   * 构建 Snip 边界消息
   */
  _buildSnipBoundary(info) {
    return `<system-reminder>
[SnipCompact #${info.snipIndex}] Context has been compressed.
${info.snipped} messages were removed to free ~${Math.round(info.tokensSaved)} tokens.
The conversation has been restructured:
  - First ${this.config.preserveHead} messages: preserved (task setup and early context)
  - Middle ${info.snipped} messages: removed (summarized below)
  - Last ${this.config.preserveTail} messages: preserved (recent work)

Summary of removed content:
${info.summary || '(No summary available — the removed content was mostly tool results)'}

Important: Write down any critical information from the summary that you need for future work.
</system-reminder>`;
  }

  /**
   * 生成被删除内容的摘要（不含 LLM 调用，纯文本提取）
   * 实际实现中可调用 LLM 生成更好的摘要
   */
  _generateSummary(messages) {
    if (messages.length === 0) return '';

    // 提取关键行
    const keyLines = [];
    const toolUses = new Set();
    const toolResults = [];
    let assistantTexts = [];

    for (const msg of messages) {
      const blocks = msg?.message?.content;
      if (!Array.isArray(blocks)) continue;

      for (const block of blocks) {
        if (block.type === 'tool_use') {
          toolUses.add(`${block.name}`);
        } else if (block.type === 'tool_result' && typeof block.content === 'string') {
          const short = block.content.substring(0, 80).replace(/\n/g, ' ');
          if (short.length > 10) toolResults.push(short);
        } else if (block.type === 'text' && block.text) {
          const text = block.text.substring(0, 120).replace(/\n/g, ' ');
          if (text.length > 20) assistantTexts.push(text);
        }
      }
    }

    const parts = [];
    if (toolUses.size > 0) {
      parts.push(`Tools used: ${[...toolUses].slice(0, 10).join(', ')}`);
    }
    if (assistantTexts.length > 0) {
      parts.push(`Key outputs: ${assistantTexts.slice(0, 5).join(' | ')}`);
    }
    if (toolResults.length > 0) {
      parts.push(`Results: ${toolResults.slice(0, 5).join(' | ')}`);
    }

    return parts.join('\n');
  }

  /**
   * 估算单个消息的 token 数
   */
  _estimateMsgTokens(msg) {
    try {
      const str = JSON.stringify(msg?.message || msg);
      return Math.ceil(str.length / 4);
    } catch {
      return 100;
    }
  }

  /**
   * 获取统计
   */
  getStats() {
    return {
      snipCount: this.snipCount,
      totalTokensSaved: this.totalTokensSaved,
      lastSnipMsgCount: this.lastSnipMsgCount,
      config: this.config,
    };
  }

  reset() {
    this.snipCount = 0;
    this.lastSnipMsgCount = 0;
    this.totalTokensSaved = 0;
    return this;
  }
}

module.exports = {
  SnipCompactEngine,
  DEFAULT_CONFIG,
};
