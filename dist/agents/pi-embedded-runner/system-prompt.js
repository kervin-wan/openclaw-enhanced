import { createRequire } from 'node:module';
import { buildAgentSystemPrompt } from "../system-prompt.js";
import { buildToolSummaryMap } from "../tool-summaries.js";

const require = createRequire(import.meta.url);
const isEnhanced = process.env.OPENCLAW_ENHANCED === '1';

let _enhancedRt = null;
function getEnhancedRt() {
  if (!_enhancedRt && isEnhanced) {
    try { _enhancedRt = require('../../engine/EnhancedRuntime.cjs'); } catch(e) {}
  }
  return _enhancedRt;
}

export function buildEmbeddedSystemPrompt(params) {
  const baseParams = {
    workspaceDir: params.workspaceDir,
    defaultThinkLevel: params.defaultThinkLevel,
    reasoningLevel: params.reasoningLevel,
    extraSystemPrompt: params.extraSystemPrompt,
    ownerNumbers: params.ownerNumbers,
    reasoningTagHint: params.reasoningTagHint,
    heartbeatPrompt: params.heartbeatPrompt,
    skillsPrompt: params.skillsPrompt,
    docsPath: params.docsPath,
    ttsHint: params.ttsHint,
    workspaceNotes: params.workspaceNotes,
    reactionGuidance: params.reactionGuidance,
    promptMode: params.promptMode,
    runtimeInfo: params.runtimeInfo,
    messageToolHints: params.messageToolHints,
    sandboxInfo: params.sandboxInfo,
    toolNames: params.tools.map((tool) => tool.name),
    toolSummaries: buildToolSummaryMap(params.tools),
    modelAliasLines: params.modelAliasLines,
    userTimezone: params.userTimezone,
    userTime: params.userTime,
    userTimeFormat: params.userTimeFormat,
    contextFiles: params.contextFiles,
  };

  const originalPrompt = buildAgentSystemPrompt(baseParams);

  if (isEnhanced) {
    return _enhancePrompt(originalPrompt);
  }

  return originalPrompt;
}

function _enhancePrompt(originalPrompt) {
  // Split at first dynamic section (Skills, Memory, or Workspace Files)
  const lines = originalPrompt.split('\n');
  let boundaryLine = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '## Workspace Files (injected)' ||
        line === '## Skills (mandatory)' ||
        line === '## Memory Recall') {
      boundaryLine = i;
      break;
    }
  }

  if (boundaryLine === -1) {
    return originalPrompt;
  }

  const staticPart = lines.slice(0, boundaryLine).join('\n');
  const dynamicPart = lines.slice(boundaryLine).join('\n');

  const cacheKey = require('crypto').createHash('sha256')
    .update(staticPart).digest('hex').substring(0, 12);

  const boundary = `<<<PROMPT_CACHE_STATIC_END>>>\n<!-- cache_key=${cacheKey} -->`;

  const compactAwareness = '[Enhanced] Context: tool results may be cleaned up. Write important info in your response.';

  // Fork + Agent guidance
  const agentGuidance = `## Using Subagents and Forks

### Fork (context-inheriting subagent)
When doing independent work, fork yourself. The fork inherits your full context.
- Write directives, not briefings — it already knows the context.
- DO NOT peek at fork progress. DO NOT predict fork results.
- Launch parallel forks for independent tasks.

### Specialized Agent Types
- **explore**: codebase exploration (read, grep, find, web_fetch — read-only)
- **review**: code review for security/correctness (read, grep, find — read-only)
- **plan**: task planning and decomposition (read, grep, find, web_search — read-only)
- **verification**: independent adversarial verification after 3+ file changes

### Writing Prompts
- Fork: directive (what to do). Specialized agent: briefing (situation + what to do).
- Never write "based on your findings, fix it" — you do the synthesis.
- Include paths, line numbers, specific changes.`;

  // Hook guidance
  const hookGuidance = `## Hooks
Users can configure shell hooks triggered by events (PreToolUse, PostToolUse, SessionStart, etc).
- Treat hook stdout feedback as coming from the user.
- If blocked (exit code 2), adjust your approach or ask user to check hooks config.`;

  // Platform capabilities
  let platformGuidance = '';
  const rt = getEnhancedRt();
  if (rt) {
    try {
      const ts = rt.getToolSearch();
      ts.needsToolSearch([]);
      const tsP = ts.buildGuidancePrompt();
      const parts = [];
      if (tsP) parts.push(tsP);
      parts.push('## Platform Capabilities\n- **SDK Layer**: programmatic session management\n- **Coordinator**: dispatch tasks to multiple workers\n- **Remote Bridge**: remote user collaboration\n- **Feature Gating**: A/B testing and gradual rollouts');
      platformGuidance = parts.join('\n\n');
    } catch(e) {}
  }

  return [
    staticPart,
    '',
    boundary,
    '',
    compactAwareness,
    '',
    agentGuidance,
    '',
    hookGuidance,
    '',
    ...(platformGuidance ? [platformGuidance, ''] : []),
    dynamicPart,
  ].join('\n');
}

export function createSystemPromptOverride(systemPrompt) {
  return systemPrompt.trim();
}

export function applySystemPromptOverrideToSession(session, override) {
  const prompt = override.trim();
  session.agent.setSystemPrompt(prompt);
  const mutableSession = session;
  mutableSession._baseSystemPrompt = prompt;
  mutableSession._rebuildSystemPrompt = () => prompt;
}
