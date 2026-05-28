// Shared lib for Neeve v2 pages.
// Auth + API client + helpers.

const API_BASE = 'https://api.noti.au';
// Token interop: v1 PWA pages (alys.html, profile.html, record.html,
// export.html, checkin.html) read 'noti_token'. v2 lib reads/writes
// BOTH so a user signing in via either side can navigate freely.
const TOKEN_KEYS = ['neeve_token', 'noti_token'];

function getToken() {
  const urlToken = new URLSearchParams(window.location.search).get('token');
  if (urlToken) {
    setToken(urlToken);
    history.replaceState({}, '', window.location.pathname);
    return urlToken;
  }
  if (window.NEEVE_TOKEN) { setToken(window.NEEVE_TOKEN); return window.NEEVE_TOKEN; }
  for (const k of TOKEN_KEYS) {
    const v = localStorage.getItem(k);
    if (v) return v;
  }
  return null;
}

function setToken(t) {
  for (const k of TOKEN_KEYS) localStorage.setItem(k, t);
}
function clearToken() {
  for (const k of TOKEN_KEYS) localStorage.removeItem(k);
  localStorage.removeItem('noti_user');
}

async function api(path, opts = {}) {
  const token = getToken();
  if (!token) {
    // Redirect to v1 login page (existing OTP flow)
    window.location.href = '/health/login.html';
    throw new Error('no token');
  }
  const res = await fetch(API_BASE + path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...(opts.headers || {}),
    },
  });
  if (res.status === 401) {
    clearToken();
    window.location.href = '/health/login.html';
    throw new Error('unauthorised');
  }
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  return res.json();
}

// ── helpers ────────────────────────────────────────────────

function formatAgo(iso) {
  if (!iso) return '—';
  const dt = new Date(iso);
  const diff = (Date.now() - dt.getTime()) / 1000;
  if (diff < 60)        return 'just now';
  if (diff < 3600)      return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)     return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 7 * 86400) return `${Math.floor(diff / 86400)}d ago`;
  return dt.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}

function formatValue(metric, value) {
  if (value == null) return '—';
  if (metric === 'temp_skin') return value.toFixed(1);
  // Show sign for delta values so +0.15 vs -0.20 reads clearly
  if (metric === 'temp_delta') return (value >= 0 ? '+' : '') + value.toFixed(2);
  if (Number.isInteger(value) || value === Math.round(value)) return Math.round(value).toString();
  return value.toFixed(1);
}

function metricLabel(metric) {
  return {
    hr:               'Heart rate',
    hrv_rmssd:        'HRV',
    spo2:             'Blood oxygen',
    temp_skin:        'Skin temp',
    temp_delta:       'Skin temp Δ',
    steps:            'Steps today',
    sleep_stage:      'Sleep',
    ecg_summary:      'ECG',
    bp_sys:           'BP systolic',
    bp_dia:           'BP diastolic',
    respiration_rate: 'Respiration',
    stress:           'Stress',
    vo2max:           'VO₂ max',
    glucose:          'Glucose',
  }[metric] || metric;
}

function metricUnit(metric, unit) {
  if (metric === 'sleep_stage') return ''; // stage value is labelled in pill
  return unit || '';
}

// Group samples by metric, keep latest per metric.
function latestPerMetric(samples) {
  const out = {};
  for (const s of samples) {
    if (!out[s.metric] || new Date(s.ts) > new Date(out[s.metric].ts)) {
      out[s.metric] = s;
    }
  }
  return out;
}

// Group by metric, returning sorted ascending arrays.
function groupByMetric(samples) {
  const out = {};
  for (const s of samples) {
    (out[s.metric] = out[s.metric] || []).push(s);
  }
  for (const k in out) out[k].sort((a, b) => new Date(a.ts) - new Date(b.ts));
  return out;
}

// Render an SVG sparkline with time axis. Pass samples [{ts, value}],
// not bare values. The X-axis below the line shows start/middle/end times
// (formatted as 'h:mm a' if span ≤ 24h, else 'Day Mon d').
function renderSparkline(container, samples, options = {}) {
  if (!samples || samples.length === 0) {
    container.innerHTML = '<div class="caption" style="padding:16px 0">No data yet.</div>';
    return;
  }
  // Back-compat: if caller passed raw values not objects, wrap them.
  const arr = samples.map((s, i) => typeof s === 'object'
    ? { ts: new Date(s.ts).getTime(), v: s.value }
    : { ts: i, v: s }
  );
  arr.sort((a, b) => a.ts - b.ts);

  const W   = container.clientWidth || 300;
  const H   = options.height || 100;
  const pad = 6;
  const axisH = 18;
  const chartH = H - axisH;

  const vs   = arr.map(a => a.v);
  const min  = Math.min(...vs);
  const max  = Math.max(...vs);
  const vrng = max - min || 1;

  const tMin  = arr[0].ts;
  const tMax  = arr[arr.length - 1].ts;
  const tSpan = tMax - tMin || 1;

  const xFor = t => pad + ((t - tMin) / tSpan) * (W - pad * 2);
  const yFor = v => chartH - pad - ((v - min) / vrng) * (chartH - pad * 2);

  const pts = arr.map(a => [xFor(a.ts), yFor(a.v)]);
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const stroke = options.color || 'var(--terra)';

  // Time-axis formatting
  const sameDay = tSpan < 28 * 3600 * 1000; // ≤ ~1 day
  const fmt = ms => {
    const d = new Date(ms);
    return sameDay
      ? d.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()
      : d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const tickTs = [tMin, tMin + tSpan / 2, tMax];
  const ticks = tickTs.map(t => `
    <text x="${xFor(t)}" y="${H - 4}" text-anchor="${
      t === tMin ? 'start' : t === tMax ? 'end' : 'middle'
    }" font-size="10" fill="var(--ink-mute)" font-family="Inter Tight, sans-serif">
      ${fmt(t)}
    </text>`).join('');

  const id = 'spk_' + Math.random().toString(36).slice(2, 8);
  container.innerHTML = `
    <svg id="${id}" viewBox="0 0 ${W} ${H}" width="100%" height="${H}"
         preserveAspectRatio="none" style="touch-action:none">
      <line x1="${pad}" y1="${chartH}" x2="${W - pad}" y2="${chartH}"
            stroke="var(--hair)" stroke-width="1"/>
      <path d="${d}" fill="none" stroke="${stroke}" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"/>
      ${pts.length < 60 ? pts.map(p =>
        `<circle cx="${p[0]}" cy="${p[1]}" r="1.5" fill="${stroke}"/>`).join('') : ''}
      ${ticks}
      <line class="cursor" x1="0" y1="0" x2="0" y2="${chartH}"
            stroke="${stroke}" stroke-width="1" stroke-dasharray="3,3"
            opacity="0"/>
      <circle class="cursorDot" cx="0" cy="0" r="4"
              fill="${stroke}" opacity="0"/>
      <g class="cursorLabel" opacity="0" transform="translate(0,0)">
        <rect x="-32" y="-22" width="64" height="18" rx="4"
              fill="var(--ink)" />
        <text x="0" y="-10" text-anchor="middle"
              font-family="Inter Tight, sans-serif" font-size="10"
              fill="var(--bone)" class="cursorTxt"></text>
      </g>
    </svg>
  `;

  // Wire up touch/mouse scrubbing
  const svg = document.getElementById(id);
  const cursor = svg.querySelector('.cursor');
  const dot    = svg.querySelector('.cursorDot');
  const lblG   = svg.querySelector('.cursorLabel');
  const lblT   = svg.querySelector('.cursorTxt');

  function hit(clientX) {
    const rect = svg.getBoundingClientRect();
    const xRel = ((clientX - rect.left) / rect.width) * W;
    // Find nearest sample
    let best = 0, bestDist = Infinity;
    for (let i = 0; i < arr.length; i++) {
      const dx = Math.abs(xFor(arr[i].ts) - xRel);
      if (dx < bestDist) { bestDist = dx; best = i; }
    }
    const a = arr[best];
    const x = xFor(a.ts), y = yFor(a.v);
    cursor.setAttribute('x1', x); cursor.setAttribute('x2', x);
    cursor.setAttribute('opacity', 1);
    dot.setAttribute('cx', x); dot.setAttribute('cy', y);
    dot.setAttribute('opacity', 1);
    const lx = Math.max(34, Math.min(W - 34, x));
    lblG.setAttribute('transform', `translate(${lx},${Math.max(20, y)})`);
    lblG.setAttribute('opacity', 1);
    const vStr  = (Number.isInteger(a.v) ? a.v : a.v.toFixed(1)).toString();
    const tStr  = fmt(a.ts);
    lblT.textContent = `${vStr} · ${tStr}`;
  }
  function clear() {
    cursor.setAttribute('opacity', 0);
    dot.setAttribute('opacity', 0);
    lblG.setAttribute('opacity', 0);
  }
  svg.addEventListener('pointerdown', e => { svg.setPointerCapture(e.pointerId); hit(e.clientX); });
  svg.addEventListener('pointermove', e => { if (e.buttons || e.pointerType === 'touch') hit(e.clientX); });
  svg.addEventListener('pointerup',     clear);
  svg.addEventListener('pointercancel', clear);
  svg.addEventListener('pointerleave',  clear);
}

// ── Sleep hypnogram ────────────────────────────────────────
// Renders a stage-vs-time chart from sleep_stage samples:
//   stage 0 = awake (yellow lane, top)
//   stage 1 = light (rose lane)
//   stage 2 = deep  (plum lane, bottom)
//   stage 3 = rem   (terra lane, second-top)
//
// Each sample has ts (start) and meta.duration_s. We bucket all samples
// of one night (samples whose ts is within ~24h of the latest), then
// draw a coloured rectangle per stage block + thin connector lines.
function renderHypnogram(container, sleepSamples) {
  if (!sleepSamples || sleepSamples.length === 0) {
    container.innerHTML = '<div class="empty" style="padding:24px 0">No sleep data yet.</div>';
    return null; // no summary
  }
  // Sort ascending by ts
  const arr = sleepSamples.slice()
    .map(s => ({
      ts: new Date(s.ts).getTime(),
      stage: Math.round(s.value),
      dur: (s.meta?.duration_s || 0) * 1000,
    }))
    .sort((a, b) => a.ts - b.ts);

  // Group: take everything within 14h of the latest sample (one night)
  const latest = arr[arr.length - 1].ts;
  const window = 14 * 3600 * 1000;
  const night = arr.filter(a => latest - a.ts <= window);

  const tMin = night[0].ts;
  const tMax = Math.max(latest, night[night.length - 1].ts + (night[night.length - 1].dur || 0));
  const span = (tMax - tMin) || 1;

  const W = container.clientWidth || 340;
  const H = 140;
  const pad = 6;
  const axisH = 18;
  const chartH = H - axisH;
  const laneH = chartH / 4;

  // Lane order (top → bottom): awake, rem, light, deep
  const laneFor = stage => ({ 0: 0, 3: 1, 1: 2, 2: 3 }[stage] ?? 2);
  const colorFor = stage => ({
    0: 'var(--butter-deep)', // awake
    3: 'var(--terra)',       // rem
    1: 'var(--rose-deep)',   // light
    2: 'var(--plum)',        // deep
  }[stage] ?? 'var(--ink-mute)');

  const xFor = t => pad + ((t - tMin) / span) * (W - pad * 2);

  // Build blocks. Default duration: 5 min if not provided.
  const rects = night.map(b => {
    const x1 = xFor(b.ts);
    const x2 = xFor(b.ts + (b.dur || 5 * 60 * 1000));
    const w = Math.max(2, x2 - x1);
    const lane = laneFor(b.stage);
    const y = lane * laneH;
    const h = laneH - 4;
    return `<rect x="${x1}" y="${y + 2}" width="${w}" height="${h}"
                   fill="${colorFor(b.stage)}" rx="2"/>`;
  }).join('');

  // Connector lines between adjacent blocks (stage transitions)
  let lines = '';
  for (let i = 1; i < night.length; i++) {
    const a = night[i - 1];
    const b = night[i];
    if (a.stage === b.stage) continue;
    const x = xFor(b.ts);
    const y1 = laneFor(a.stage) * laneH + laneH / 2;
    const y2 = laneFor(b.stage) * laneH + laneH / 2;
    lines += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"
                    stroke="var(--ink-mute)" stroke-width="0.5" opacity="0.4"/>`;
  }

  const fmt = ms => new Date(ms).toLocaleTimeString('en-AU', {
    hour: 'numeric', minute: '2-digit', hour12: false,
  });

  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" preserveAspectRatio="none">
      ${lines}
      ${rects}
      <text x="${pad}" y="${H - 4}" font-size="10" fill="var(--ink-mute)"
            font-family="Inter Tight, sans-serif">${fmt(tMin)}</text>
      <text x="${W - pad}" y="${H - 4}" text-anchor="end" font-size="10"
            fill="var(--ink-mute)" font-family="Inter Tight, sans-serif">${fmt(tMax)}</text>
    </svg>
  `;

  // Return totals for the caller to render summary tiles
  const totals = { awake: 0, light: 0, deep: 0, rem: 0 };
  const keys = { 0: 'awake', 1: 'light', 2: 'deep', 3: 'rem' };
  for (const b of night) {
    const k = keys[b.stage];
    if (k) totals[k] += (b.dur || 0) / 60000; // → minutes
  }
  totals.total = totals.awake + totals.light + totals.deep + totals.rem;
  totals.startTs = tMin;
  totals.endTs = tMax;
  return totals;
}

// Bottom nav HTML (call once per page; pass active tab id).
// Five items — covers everything the v1 PWA exposed so nothing's hidden:
// Today (v2) · Alys (v1 chat) · Check-in (v1 daily) · Ring (v2 device) · More (v1 profile)
// 'More' page is v1 profile.html which links to records, export PDF, sign out.
function renderNav(active) {
  const items = [
    { id: 'today',    href: '/health/v2/today.html',  label: 'Today',
      icon: '<path d="M3 12 12 3l9 9M5 10v10h14V10"/>' },
    { id: 'alys',     href: '/health/v2/alys.html',   label: 'Alys',
      icon: '<path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.3A8 8 0 1 1 21 12Z"/>' },
    { id: 'checkin',  href: '/health/v2/checkin.html', label: 'Check-in',
      icon: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M16 3v4M8 3v4M4 11h16M9 16l2 2 4-4"/>' },
    { id: 'ring',     href: '/health/v2/ring.html',   label: 'Ring',
      icon: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/>' },
    { id: 'more',     href: '/health/v2/profile.html', label: 'More',
      icon: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>' },
  ];
  return `<nav class="nav">${items.map(i => `
    <a class="nav-item ${i.id === active ? 'active' : ''}" href="${i.href}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${i.icon}</svg>
      <span>${i.label}</span>
    </a>`).join('')}</nav>`;
}
