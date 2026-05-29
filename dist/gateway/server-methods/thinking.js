/**
 * server-methods/thinking.js — Thinking mode gateway handlers
 */

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

let _thinkingModule = null;
function getThinkingModule() {
  if (!_thinkingModule) {
    try {
      _thinkingModule = require('../../engine/ThinkingManager.cjs');
    } catch (_) {
      _thinkingModule = null;
    }
  }
  return _thinkingModule;
}

const thinkingHandlers = {
  'thinking.status': {
    description: 'Get thinking mode status',
    handler: async () => {
      const tm = getThinkingModule();
      if (!tm) return { enabled: false, mode: 'off' };
      return tm.getThinkingStatus();
    },
  },
  'thinking.toggle': {
    description: 'Toggle thinking mode on/off',
    handler: async () => {
      const tm = getThinkingModule();
      if (!tm) return { error: 'Thinking module not available' };
      return tm.toggleThinking();
    },
  },
  'thinking.enable': {
    description: 'Force enable thinking mode',
    handler: async () => {
      const tm = getThinkingModule();
      if (!tm) return { error: 'Thinking module not available' };
      // Call internal enable
      const result = tm.processTurnStart('enable thinking mode');
      // Force persistent
      require('../../engine/ThinkingManager.cjs').toggleThinking();
      return tm.getThinkingStatus();
    },
  },
  'thinking.disable': {
    description: 'Force disable thinking mode',
    handler: async () => {
      const tm = getThinkingModule();
      if (!tm) return { error: 'Thinking module not available' };
      // Call internal disable
      tm.processTurnEnd();
      return tm.getThinkingStatus();
    },
  },
};

export { thinkingHandlers };
