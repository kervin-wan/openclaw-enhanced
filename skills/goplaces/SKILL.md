---
name: 地点搜索
description: 通过goplaces命令行工具查询Google地点API（新版），用于文本搜索、地点详情、解析和评论。用于人性化的地点查找或脚本的JSON输出。
homepage: https://github.com/steipete/goplaces
metadata: {"clawdbot":{"emoji":"📍","requires":{"bins":["goplaces"],"env":["GOOGLE_PLACES_API_KEY"]},"primaryEnv":"GOOGLE_PLACES_API_KEY","install":[{"id":"brew","kind":"brew","formula":"steipete/tap/goplaces","bins":["goplaces"],"label":"Install goplaces (brew)"}]}}
---

# goplaces

Modern Google Places API (New) CLI. Human output by default, `--json` for scripts.

Install
- Homebrew: `brew install steipete/tap/goplaces`

Config
- `GOOGLE_PLACES_API_KEY` required.
- Optional: `GOOGLE_PLACES_BASE_URL` for testing/proxying.

Common commands
- Search: `goplaces search "coffee" --open-now --min-rating 4 --limit 5`
- Bias: `goplaces search "pizza" --lat 40.8 --lng -73.9 --radius-m 3000`
- Pagination: `goplaces search "pizza" --page-token "NEXT_PAGE_TOKEN"`
- Resolve: `goplaces resolve "Soho, London" --limit 5`
- Details: `goplaces details <place_id> --reviews`
- JSON: `goplaces search "sushi" --json`

Notes
- `--no-color` or `NO_COLOR` disables ANSI color.
- Price levels: 0..4 (free → very expensive).
- Type filter sends only the first `--type` value (API accepts one).
