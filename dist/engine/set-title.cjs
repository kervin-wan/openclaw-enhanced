// Preload script: set process title to openclaw-enhanced
// Used via Node.js --require flag
if (process.env.OPENCLAW_ENHANCED === '1') {
  process.title = 'openclaw-enhanced';

  // Hook into child_process spawn to also set title on spawned children
  const { spawn, spawnSync } = require('child_process');
  const originalSpawn = spawn;
  const originalSpawnSync = spawnSync;

  const enhancedEnv = { OPENCLAW_ENHANCED: '1', OPENCLAW_PRELOAD: __filename };

  require('child_process').spawn = function (cmd, args, opts) {
    const env = { ...(opts?.env || process.env), ...enhancedEnv };
    return originalSpawn(cmd, args, { ...opts, env });
  };
  require('child_process').spawnSync = function (cmd, args, opts) {
    const env = { ...(opts?.env || process.env), ...enhancedEnv };
    return originalSpawnSync(cmd, args, { ...opts, env });
  };
}
