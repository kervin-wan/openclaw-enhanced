/**
 * thinking-toggle.js — 深度思考滑块开关
 * 状态持久化到 $HOME/.openclaw-enhanced/thinking.conf
 * 通过 HTTP /thinking/state 端点读/写
 */
(function() {
  'use strict';

  const STATE_URL = '/thinking/state';
  let currentMode = 'off';
  let btn = null, knob = null, labelEl = null;
  let injected = false;

  // ═══ HTTP calls ═══
  async function getState() {
    const r = await fetch(STATE_URL);
    if (!r.ok) throw new Error('status ' + r.status);
    const d = await r.json();
    return d.mode || 'off';
  }

  async function setMode(mode) {
    const r = await fetch(STATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode }),
    });
    if (!r.ok) throw new Error('post ' + r.status);
    const d = await r.json();
    return d.mode || mode;
  }

  // ═══ Create slider toggle ═══
  function createBtn() {
    const b = document.createElement('button');
    b.id = 'tt-btn';
    b.type = 'button';

    const l = document.createElement('span');
    labelEl = l;

    const k = document.createElement('span');
    knob = k;

    b.appendChild(l);
    b.appendChild(k);

    // Pill: fixed width, text-left / knob-right
    Object.assign(b.style, {
      flexShrink:'0', width:'90px', height:'32px',
      display:'inline-flex', alignItems:'center',
      justifyContent:'space-between',
      gap:'0', padding:'0 2px', border:'1px solid #d4d4d8', borderRadius:'9999px',
      cursor:'pointer', transition:'all .25s cubic-bezier(.16,1,.3,1)',
      userSelect:'none', outline:'none', alignSelf:'center',
      background:'#fafafa', position:'relative',
      overflow:'hidden',
    });

    // Label: left side, hidden when off
    Object.assign(l.style, {
      fontSize:'12px', fontWeight:'500',
      fontFamily:"system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
      padding:'0 0 0 10px', whiteSpace:'nowrap',
      transition:'all .25s cubic-bezier(.16,1,.3,1)',
      opacity:'0', flexShrink:'0',
      overflow:'hidden', maxWidth:'0',
    });

    // Knob: right side, fixed circle
    Object.assign(k.style, {
      display:'block', flexShrink:'0',
      width:'24px', height:'24px', borderRadius:'50%',
      border:'1px solid #d4d4d8', background:'#ffffff',
      transition:'all .25s cubic-bezier(.16,1,.3,1)',
      boxShadow:'0 1px 3px rgba(0,0,0,.08)',
      order:'2',
    });

    b.addEventListener('click', async () => {
      const map = { off: 'auto', auto: 'manual', manual: 'off' };
      try {
        const newMode = await setMode(map[currentMode] || 'off');
        updateUI(newMode);
      } catch (_) {}
    });

    return b;
  }

  function updateUI(mode) {
    currentMode = mode;
    if (!btn || !knob || !labelEl) return;
    const b = btn, k = knob, l = labelEl;
    k.style.animation = '';

    if (mode === 'manual') {
      b.style.background = '#7c3aed'; b.style.borderColor = '#7c3aed';
      b.style.boxShadow = '0 0 0 1px rgba(124,58,237,.18)';
      b.style.justifyContent = 'space-between';
      k.style.background = '#ffffff'; k.style.borderColor = '#c4b5fd';
      l.style.maxWidth = '60px'; l.style.opacity = '1'; l.style.color = '#fff';
      l.textContent = '深度思考';
      b.title = '手动开启 — 点击切换';
    } else if (mode === 'auto') {
      b.style.background = '#166534'; b.style.borderColor = '#166534';
      b.style.boxShadow = '0 0 0 1px rgba(22,101,52,.2)';
      b.style.justifyContent = 'space-between';
      k.style.background = '#f0fdf4'; k.style.borderColor = '#bbf7d0';
      k.style.animation = 'tt-pulse 2.5s infinite';
      l.style.maxWidth = '60px'; l.style.opacity = '1'; l.style.color = '#fff';
      l.textContent = '自动检测';
      b.title = '自动检测 — 点击切换';
    } else {
      b.style.background = '#fafafa'; b.style.borderColor = '#d4d4d8';
      b.style.boxShadow = 'none';
      b.style.justifyContent = 'flex-start';
      k.style.background = '#ffffff'; k.style.borderColor = '#d4d4d8';
      l.style.maxWidth = '0'; l.style.opacity = '0';
      b.title = '关闭 — 点击切换';
    }
  }

  // ═══ Poll state ═══
  let pollTimer = null;
  function startPoll() {
    if (pollTimer) return;
    pollTimer = setInterval(async () => {
      try { updateUI(await getState()); } catch (_) {}
    }, 5000);
  }

  // ═══ Inject ═══
  function inject() {
    if (btn?.isConnected) return;
    const row = document.querySelector('.chat-compose__row');
    if (!row) return;
    const field = row.querySelector('.chat-compose__field');
    if (!field) return;

    if (!btn || !btn.isConnected) {
      btn = createBtn();
    }
    row.insertBefore(btn, field);
    // Apply current state
    updateUI(currentMode);
    injected = true;
    startPoll();
  }

  function init() {
    const s = document.createElement('style');
    s.textContent = '@keyframes tt-pulse{0%,100%{opacity:1}50%{opacity:.7}}';
    document.head.appendChild(s);

    inject();
    [800, 2000, 4000, 8000].forEach(t => setTimeout(inject, t));
    setInterval(inject, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
