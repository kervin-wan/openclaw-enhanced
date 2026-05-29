---
name: 八度睡眠控制器
description: 控制Eight睡眠舱（状态、温度、闹钟、计划）。
homepage: https://eightctl.sh
metadata: {"clawdbot":{"emoji":"🎛️","requires":{"bins":["eightctl"]},"install":[{"id":"go","kind":"go","module":"github.com/steipete/eightctl/cmd/eightctl@latest","bins":["eightctl"],"label":"Install eightctl (go)"}]}}
---

# eightctl

Use `eightctl` for Eight Sleep pod control. Requires auth.

Auth
- Config: `~/.config/eightctl/config.yaml`
- Env: `EIGHTCTL_EMAIL`, `EIGHTCTL_PASSWORD`

Quick start
- `eightctl status`
- `eightctl on|off`
- `eightctl temp 20`

Common tasks
- Alarms: `eightctl alarm list|create|dismiss`
- Schedules: `eightctl schedule list|create|update`
- Audio: `eightctl audio state|play|pause`
- Base: `eightctl base info|angle`

Notes
- API is unofficial and rate-limited; avoid repeated logins.
- Confirm before changing temperature or alarms.
