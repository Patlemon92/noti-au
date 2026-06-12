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
  if (!res.ok) {
    // Emit a telemetry event so we can SEE failures landing on users'
    // phones without them having to screenshot the console. Bypasses
    // the api() helper to avoid recursion.
    track('error', 'api_error', { path, status: res.status });
    throw new Error(`${res.status}: ${await res.text()}`);
  }
  return res.json();
}

// =====================================================================
// Telemetry — page views, button taps, surfaced errors.
// Batched + flushed every 5s or on pagehide. Failure to flush is silent
// (we never want telemetry to be load-bearing).
// =====================================================================
const _telemetryBuf = [];
function track(kind, name, props) {
  try {
    _telemetryBuf.push({
      kind, name,
      props: props || null,
      occurred_at: new Date().toISOString(),
    });
    if (_telemetryBuf.length >= 30) _flushTelemetry();
  } catch (_) {}
}

async function _flushTelemetry() {
  if (!_telemetryBuf.length) return;
  const token = getToken();
  if (!token) return; // pre-login events are dropped intentionally
  const batch = _telemetryBuf.splice(0, _telemetryBuf.length);
  try {
    await fetch(API_BASE + '/me/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      keepalive: true,    // survive page unload
      body: JSON.stringify({
        events:   batch,
        platform: 'web',
      }),
    });
  } catch (_) {
    // Drop on the floor — telemetry must never break the app.
  }
}
// Periodic flush + flush on unload.
setInterval(_flushTelemetry, 5000);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) _flushTelemetry();
});
// Capture uncaught errors + promise rejections at the page level.
window.addEventListener('error', e => {
  track('error', 'window_error', {
    message: String(e.message || '').slice(0, 200),
    filename: e.filename, lineno: e.lineno,
  });
});
window.addEventListener('unhandledrejection', e => {
  track('error', 'promise_rejection', {
    reason: String(e.reason && e.reason.message || e.reason || '').slice(0, 200),
  });
});
// Page view on load — uses pathname so it survives querystring noise.
track('view', (location.pathname || '/').replace(/^\/health\/v2\//, '') || 'unknown');

// ── helpers ────────────────────────────────────────────────

function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

// Deterministic one-line summary of a completed check-in. Built purely
// from the answers blob — no LLM, no Alys. Sleep gets a dedicated
// fragment; numeric scales (0-10) get grouped into a short list ordered
// by familiarity; a notes/freeform field if present gets truncated and
// appended. Result reads like: "Slept 8h. Mood 7, fatigue 3, fog 2.
// Noted: chest tight after lunch."
function summariseAnswers(a) {
  if (!a || typeof a !== 'object') return 'Logged a moment ago.';
  const parts  = [];
  const scales = [];
  const SCALE_ORDER = ['mood','energy','fatigue','fog','pain','headache','anxiety','sleep_quality'];
  const SCALE_LABEL = {
    mood: 'mood', energy: 'energy', fatigue: 'fatigue', fog: 'fog',
    pain: 'pain', headache: 'headache', anxiety: 'anxiety',
    sleep_quality: 'sleep quality',
  };

  if (a.sleep != null && a.sleep !== '') {
    const s = Number(a.sleep);
    if (!isNaN(s)) parts.push(`Slept ${s % 1 === 0 ? s : s.toFixed(1)}h`);
  }

  for (const key of SCALE_ORDER) {
    if (a[key] == null || a[key] === '') continue;
    const v = Number(a[key]);
    if (isNaN(v)) continue;
    scales.push(`${SCALE_LABEL[key]} ${v}`);
  }
  if (scales.length) parts.push(scales.join(', '));

  const note = a.notes || a.note || a.freeform || a.anything || '';
  if (typeof note === 'string' && note.trim()) {
    const t = note.trim();
    parts.push('Noted: ' + (t.length > 90 ? t.slice(0, 87) + '…' : t));
  }

  if (!parts.length) return 'Logged a moment ago.';
  return parts.join('. ') + '.';
}

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

// Freshness tier for an ISO timestamp. Drives the colour + "data may be
// paused" hint on Today / Ring. Reflects what iOS background coverage
// actually gives us:
//   fresh    < 15 min  — green-warm pill, ring stream alive
//   warm     15-60 min — taupe, normal between BG wakes
//   stale    1-3 h     — clay, app probably suspended a while
//   cold     > 3 h     — clay + nudge to open the app
function freshnessTier(iso) {
  if (!iso) return 'cold';
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 15 * 60)  return 'fresh';
  if (diff < 60 * 60)  return 'warm';
  if (diff < 180 * 60) return 'stale';
  return 'cold';
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
    strain_score:     'Strain',
    recovery_score:   'Recovery',
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
  // Map source-of-truth unit strings to what people actually read.
  // Source strings come from the ring SDK or our ingest layer — they're
  // sometimes raw field names ('spO2_pct', 'spO2') that should never
  // appear in the UI verbatim.
  const FRIENDLY = {
    'spO2_pct': '%', 'spO2': '%', '%':  '%',
    'degC':    '°C',
    'bpm':     'bpm',
    'ms':      'ms',
    'rpm':     'br/min',
    'mmHg':    'mmHg',
    'score':   '',          // ring 'score' units shouldn't render — they're not a unit
    'state':   '',
    'stage':   '',
    'count':   '',
  };
  if (unit && FRIENDLY[unit] !== undefined) return FRIENDLY[unit];
  // Per-metric fallbacks for cases where unit is missing entirely.
  if (metric === 'spo2')     return '%';
  if (metric === 'temp_skin')return '°C';
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
  // Bucketed trend rows arrive with meta.min/meta.max — capture them
  // so we can draw a faint range band behind the avg line.
  const arr = samples.map((s, i) => {
    if (typeof s !== 'object') return { ts: i, v: s };
    const lo = s.meta && Number.isFinite(s.meta.min) ? s.meta.min : null;
    const hi = s.meta && Number.isFinite(s.meta.max) ? s.meta.max : null;
    return { ts: new Date(s.ts).getTime(), v: s.value, lo, hi };
  });
  arr.sort((a, b) => a.ts - b.ts);

  const W   = container.clientWidth || 300;
  const H   = options.height || 100;
  const pad = 6;
  const axisH = 18;
  const chartH = H - axisH;

  const vs   = arr.map(a => a.v);
  // If samples carry meta.min/meta.max (bucketed data from /ring/trend),
  // include those in the Y-axis range so the band stays inside the
  // chart. Otherwise fall back to just the avg values.
  const lows  = arr.map(a => (a.lo != null && isFinite(a.lo)) ? a.lo : a.v);
  const highs = arr.map(a => (a.hi != null && isFinite(a.hi)) ? a.hi : a.v);
  const min  = Math.min(...lows);
  const max  = Math.max(...highs);
  const vrng = max - min || 1;

  const tMin  = arr[0].ts;
  const tMax  = arr[arr.length - 1].ts;
  const tSpan = tMax - tMin || 1;

  const xFor = t => pad + ((t - tMin) / tSpan) * (W - pad * 2);
  const yFor = v => chartH - pad - ((v - min) / vrng) * (chartH - pad * 2);

  const pts = arr.map(a => [xFor(a.ts), yFor(a.v)]);
  // Smooth path using quadratic-bezier midpoints (matches Today's
  // sparkline treatment). Reads as a soft curve rather than jagged
  // L-segments, even with noisy minute-to-minute samples.
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const mx = (px + cx) / 2;
    const my = (py + cy) / 2;
    d += ` Q ${px} ${py} ${mx} ${my}`;
  }
  if (pts.length > 1) {
    d += ` T ${pts[pts.length - 1][0]} ${pts[pts.length - 1][1]}`;
  }
  const stroke = options.color || '#bf5a3c';

  // Range band — drawn behind the avg line when bucketed data carries
  // min/max per point. Two polyline edges (upper = max, lower = min)
  // joined back to back form a filled area. Reads as "during this
  // bucket, the value swept across this range" without competing with
  // the avg line. Skipped entirely if no min/max present (Today vitals
  // tiles + sleep card still pass raw {ts, value} pairs).
  let bandPath = '';
  if (arr.some(a => a.lo != null && a.hi != null)) {
    const top = arr.map(a => [xFor(a.ts), yFor(a.hi != null ? a.hi : a.v)]);
    const bot = arr.map(a => [xFor(a.ts), yFor(a.lo != null ? a.lo : a.v)]);
    bandPath = `M${top[0][0]},${top[0][1]} `
      + top.slice(1).map(p => `L${p[0]},${p[1]}`).join(' ')
      + ' '
      + bot.slice().reverse().map(p => `L${p[0]},${p[1]}`).join(' ')
      + ' Z';
  }

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
      ${bandPath ? `<path d="${bandPath}" fill="${stroke}" opacity="0.12"
            stroke="none"/>` : ''}
      <path d="${d}" fill="none" stroke="${stroke}" stroke-width="1.6"
            stroke-linecap="round" stroke-linejoin="round"
            vector-effect="non-scaling-stroke"/>
      ${pts.length < 40 ? pts.map(p =>
        `<circle cx="${p[0]}" cy="${p[1]}" r="1.2" fill="${stroke}" opacity=".55"/>`).join('') : ''}
      ${ticks}
      <line class="cursor" x1="0" y1="0" x2="0" y2="${chartH}"
            stroke="${stroke}" stroke-width="1" stroke-dasharray="3,3"
            opacity="0"/>
      <circle class="cursorDot" cx="0" cy="0" r="4"
              fill="${stroke}" opacity="0"/>
      <g class="cursorLabel" opacity="0" transform="translate(0,0)">
        <!-- Wider + taller pill + larger font so the scrub readout is
             actually legible on a phone. Previous 64x18 px clipped any
             text beyond '85 · 30 May' and the 10pt was too small to
             read at arm's length. -->
        <rect x="-58" y="-30" width="116" height="22" rx="6"
              fill="var(--ink)" />
        <text x="0" y="-15" text-anchor="middle"
              font-family="Inter Tight, sans-serif" font-size="12"
              font-weight="600"
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
    // Clamp horizontally so the wider 116px pill stays fully visible.
    const lx = Math.max(60, Math.min(W - 60, x));
    // Always render with at least 30px headroom so the pill never
    // overlaps the cursor dot at the top of the chart.
    lblG.setAttribute('transform', `translate(${lx},${Math.max(34, y)})`);
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
// When a `sleep_session` sample is provided for the same night, its
// startTimeStamp/endTimeStamp pin the chart window and its
// deep_s/light_s/rem_s give authoritative totals (more reliable than
// summing per-stage durations on firmwares that emit sparse detail).
//
// Each stage sample has ts (start) and meta.duration_s. We bucket all
// stage samples within ~24h of the latest, then draw one coloured
// rectangle per block.
function renderHypnogram(container, sleepSamples, sessionSamples) {
  const hasStages   = Array.isArray(sleepSamples)   && sleepSamples.length > 0;
  const hasSessions = Array.isArray(sessionSamples) && sessionSamples.length > 0;
  if (!hasStages && !hasSessions) {
    container.innerHTML = '<div class="empty" style="padding:24px 0">No sleep data yet.</div>';
    return null;
  }

  // Pick the most-recent session (if any) as the chart window anchor.
  const session = hasSessions
    ? sessionSamples.slice().sort((a, b) => new Date(b.ts) - new Date(a.ts))[0]
    : null;

  // Sort stage samples ascending by ts. Defensively re-map raw SDK constants
  // (0xF1=241 deep, 0xF2=242 light, 0xF3=243 rem, 0xF4=244 awake) in case any
  // pre-fix rows are still in flight.
  const remap = { 241: 2, 242: 1, 243: 3, 244: 0 };
  const arr = (sleepSamples || []).slice()
    .map(s => {
      const raw = Math.round(s.value);
      return {
        ts: new Date(s.ts).getTime(),
        stage: (raw in remap) ? remap[raw] : raw,
        dur: (s.meta?.duration_s || 0) * 1000,
      };
    })
    .sort((a, b) => a.ts - b.ts);

  // Default window: 24h around the latest stage sample so naps merge with
  // last night. If a session row is present, prefer its explicit window.
  let tMin, tMax;
  if (session) {
    tMin = new Date(session.ts).getTime();
    const endIso = session.meta?.end_ts;
    tMax = endIso ? new Date(endIso).getTime() : tMin + (session.value * 1000);
  } else {
    const latest = arr[arr.length - 1].ts;
    const win = 24 * 3600 * 1000;
    const filtered = arr.filter(a => latest - a.ts <= win);
    tMin = filtered[0].ts;
    tMax = Math.max(latest, filtered[filtered.length - 1].ts + (filtered[filtered.length - 1].dur || 0));
  }
  const night = arr.filter(a => a.ts >= tMin - 60_000 && a.ts <= tMax + 60_000);
  const span  = (tMax - tMin) || 1;

  // Smooth near-wake flips BEFORE drawing or tallying: a brief awake (<2 min)
  // with sleep on BOTH sides is movement/restlessness (the morning twitchiness
  // where the ring flips WAKE↔LIGHT every minute), not a real awakening. Fold
  // it into light so the hypnogram AND the awake total reflect real
  // wakefulness — standard tracker behaviour. Bed-window total is unchanged;
  // the time just moves awake → light.
  const SMOOTH_MS = 2 * 60 * 1000;
  const isSleepStage = st => st === 1 || st === 2 || st === 3;
  for (let i = 1; i < night.length - 1; i++) {
    const b = night[i];
    if (b.stage !== 0) continue;
    const dur = b.dur || (night[i + 1].ts - b.ts);
    if (dur > 0 && dur < SMOOTH_MS && isSleepStage(night[i - 1].stage) && isSleepStage(night[i + 1].stage)) {
      b.stage = 1; // fold the blip into light
    }
  }

  // Stage-track hypnogram — Patrick's pick after the single-bar
  // version. Four horizontal tracks (Awake / REM / Light / Deep
  // top-to-bottom) each running the full width of the night. A
  // track lights up at time slices when that stage was active.
  // Reads like a CGM glucose track — vertical position carries
  // the stage, no need to remember a colour legend.
  //
  // Scrubbable: drag along the chart and the cursor labels the
  // moment + the active stage at that moment.
  const colorFor = stage => ({
    0: 'var(--stage-awake)',
    1: 'var(--stage-light)',
    2: 'var(--stage-deep)',
    3: 'var(--stage-rem)',
  }[stage] ?? 'var(--ink-mute)');

  const stageOrder  = [0, 3, 1, 2];   // top → bottom
  const stageLabel  = { 0: 'Awake', 3: 'REM', 1: 'Light', 2: 'Deep' };

  // Pre-compute each block's start/end + its stage so we can build
  // per-track segments quickly. Block end = next block's start (or
  // declared duration when no next block).
  const blocks = night.map((b, i) => {
    const next = night[i + 1];
    const end = next ? next.ts : (b.ts + (b.dur || 5 * 60 * 1000));
    return { ts: b.ts, end, stage: b.stage };
  });

  const LABEL_W   = 56;    // px reserved for the stage label gutter
  const TRACK_H   = 22;    // px per track
  const TRACK_GAP = 6;     // px between tracks
  const totalH    = stageOrder.length * (TRACK_H + TRACK_GAP) - TRACK_GAP;

  const fmt = ms => new Date(ms).toLocaleTimeString('en-AU', {
    hour: 'numeric', minute: '2-digit', hour12: false,
  });

  // Build one track row per stage. The faint background bar shows
  // the full night window; coloured segments overlay where the
  // stage was active.
  const tracksHtml = stageOrder.map(stage => {
    const segments = blocks
      .filter(b => b.stage === stage)
      .map(b => {
        const x = ((b.ts  - tMin) / span) * 100;
        const w = ((b.end - b.ts)  / span) * 100;
        if (w <= 0) return '';
        return `<div style="position:absolute;left:${x.toFixed(2)}%;width:${w.toFixed(2)}%;top:0;bottom:0;background:${colorFor(stage)};border-radius:3px"></div>`;
      }).join('');
    return `
      <div style="display:flex;align-items:center;gap:8px;height:${TRACK_H}px;margin-bottom:${TRACK_GAP}px">
        <div style="width:${LABEL_W}px;flex:0 0 ${LABEL_W}px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-mute,#9A8369);font-family:'Inter Tight',sans-serif">${stageLabel[stage]}</div>
        <div style="position:relative;flex:1;height:100%;background:var(--bone-deep,#F2EBE0);border-radius:5px;overflow:hidden">
          ${segments}
        </div>
      </div>`;
  }).join('');

  // Mid-window time tick. Three labels: start, middle, end.
  const tMid = tMin + span / 2;

  // Wrap in a positioned host so the scrub cursor + tooltip can
  // overlay the tracks. Cursor sits in the tracks region only;
  // labels go below.
  const id = 'hyp_' + Math.random().toString(36).slice(2, 8);
  container.innerHTML = `
    <div id="${id}" style="position:relative;touch-action:pan-y">
      ${tracksHtml}
      <div class="hyp-cursor" style="position:absolute;left:${LABEL_W}px;top:0;bottom:0;width:1px;background:var(--ink,#2B2018);opacity:0;pointer-events:none;display:flex;align-items:flex-end;transform:translateX(0);transition:opacity .12s ease"></div>
      <div class="hyp-tip" style="position:absolute;top:-6px;background:var(--ink,#2B2018);color:#fff7f0;padding:5px 9px;border-radius:8px;font-family:'Inter Tight',sans-serif;font-size:11.5px;opacity:0;pointer-events:none;transform:translate(-50%, -100%);white-space:nowrap;transition:opacity .12s ease">—</div>
    </div>
    <div style="display:flex;justify-content:space-between;margin:8px ${LABEL_W + 4}px 0 ${LABEL_W + 4}px;font-size:11px;color:var(--ink-mute,#9A8369);font-family:'Inter Tight',sans-serif">
      <span>${fmt(tMin)}</span>
      <span>${fmt(tMid)}</span>
      <span>${fmt(tMax)}</span>
    </div>`;

  // Wire scrub. Track host width minus label gutter = chart width.
  // Touch X relative to chart maps to a moment in span; we look up
  // the active stage at that moment by scanning blocks.
  const host   = document.getElementById(id);
  const cursor = host.querySelector('.hyp-cursor');
  const tip    = host.querySelector('.hyp-tip');
  function showAt(clientX) {
    const rect = host.getBoundingClientRect();
    const xRel = Math.max(0, Math.min(rect.width, clientX - rect.left));
    // Map xRel (full-width incl. label) to time. Label gutter is
    // dead-zone; clamp to chart range so the cursor doesn't fly off.
    const chartLeft  = LABEL_W;
    const chartRight = rect.width;
    const chartX = Math.max(chartLeft, Math.min(chartRight, xRel));
    const t = tMin + ((chartX - chartLeft) / (chartRight - chartLeft)) * span;
    // Find the block covering this moment.
    const hit = blocks.find(b => b.ts <= t && b.end >= t);
    const stage = hit ? hit.stage : null;
    const label = stage != null ? stageLabel[stage] : '—';
    cursor.style.opacity = '1';
    cursor.style.transform = `translateX(${(chartX - chartLeft).toFixed(1)}px)`;
    tip.style.opacity = '1';
    tip.style.left = chartX + 'px';
    tip.textContent = `${label} · ${fmt(t)}`;
  }
  function hideCursor() {
    cursor.style.opacity = '0';
    tip.style.opacity = '0';
  }
  host.addEventListener('pointerdown', e => { host.setPointerCapture(e.pointerId); showAt(e.clientX); });
  host.addEventListener('pointermove', e => { if (e.buttons || e.pointerType === 'touch') showAt(e.clientX); });
  host.addEventListener('pointerup',     hideCursor);
  host.addEventListener('pointercancel', hideCursor);
  host.addEventListener('pointerleave',  hideCursor);

  // Totals — prefer the session row's authoritative seconds for the
  // sleep stages when present (deep/light/rem), but ALWAYS derive
  // awake from the stage rows. The session.meta record from the SDK
  // doesn't carry an awake_s field (firmware retrospectively folds
  // brief wakes into light); the only honest awake number comes from
  // device-log-derived stage=0 rows.
  const totals = { awake: 0, light: 0, deep: 0, rem: 0 };
  const keys = { 0: 'awake', 1: 'light', 2: 'deep', 3: 'rem' };
  for (const b of night) {
    const k = keys[b.stage];
    if (k) totals[k] += (b.dur || 0) / 60000;
  }
  if (session && (session.meta?.deep_s != null || session.meta?.light_s != null || session.meta?.rem_s != null)) {
    // Session meta overrides for the stages it knows about; awake
    // stays computed from rows so device-log-derived events get
    // counted no matter what the session row says.
    totals.deep  = (session.meta.deep_s  || 0) / 60;
    totals.light = (session.meta.light_s || 0) / 60;
    totals.rem   = (session.meta.rem_s   || 0) / 60;
  }
  // Carve device-log-derived awake out of light. The R11M firmware
  // re-classifies brief wakes as "light" in its session meta — when
  // we then add awake on top, light double-counts. Subtract so the
  // four numbers reconcile to the bed window.
  if (totals.awake > 0 && totals.light > 0) {
    totals.light = Math.max(0, totals.light - totals.awake);
  }
  // Total sleep includes awake (Patrick: "the awake needs to be
  // tallied in the total sleep"). It's the time-in-bed window.
  //   deep + (light − awake) + rem + awake = bed window
  totals.total = totals.deep + totals.light + totals.rem + totals.awake;
  totals.startTs = tMin;
  totals.endTs = tMax;
  return totals;
}

// Wire a refresh callback to fire when the page becomes visible again
// (user switched back from another app/tab without quitting). Also runs
// the callback after a `pageshow` event so iOS bfcache restores trigger
// a fresh load. Call once per page during init.
function onResume(fn) {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      try { fn(); } catch (e) { console.error(e); }
    }
  });
  window.addEventListener('pageshow', e => {
    if (e.persisted) {
      try { fn(); } catch (err) { console.error(err); }
    }
  });
}

// ── Per-metric explainer — global "how this is calculated" sheet ────
// Lifted out of ring.html so any page can drop a ⓘ button on any
// metric and call openExplainer('hr') to surface the plain-English
// explanation. The sheet HTML is auto-injected into the page on first
// open, so callers don't need to add markup — just the button.
//
// Add new metrics to METRIC_EXPLAINERS as we surface them. Each entry:
//   { title: 'Visible heading', body: '<p>…</p><p>…</p>' }
const METRIC_EXPLAINERS = {
  strain_score: {
    title: 'Strain',
    body: `<p>How much load your body carried today, on a 0–21 scale.
Higher means more cardiovascular load.</p>
<p><b>How it's calculated:</b> we sum the minutes you spent in each HR
zone (light → moderate → hard) and weight harder zones more. HR zones
are anchored to your resting HR + age-predicted max. Refreshed every
~5 minutes throughout the day.</p>
<p>Resting at the desk all day usually lands 5–8. A long walk pushes
it to 12–14. Vigorous exercise can take it past 18.</p>`,
  },
  recovery_score: {
    title: 'Recovery',
    body: `<p>How ready your body is right now, on a 0–100 scale. Computed
from last night's sleep + resting HR + HRV trend.</p>
<p><b>How it's calculated:</b> we score three inputs against your
14-day rolling baseline — sleep duration vs your typical night, RHR
vs your typical morning, and HRV vs your typical overnight median —
then blend them. HRV is weighted most heavily because it's the most
sensitive autonomic-nervous-system signal.</p>
<p>50 is "about average for you". Above 70 means you're in better
shape than usual; below 30 means your nervous system is loaded and a
lighter day is worth considering.</p>`,
  },
  stress_score: {
    title: 'Stress (measured)',
    body: `<p>Your body's stress right now, on a 0–10 scale — worked out from
your own data, not a guess. Higher means more sympathetic ("fight-or-flight")
activation. It's the same 0–10 scale as your check-in stress rating, so you can
compare your <b>measured</b> stress to your <b>felt</b> stress side by side.</p>
<p><b>How it's calculated:</b> two signals against your own baseline — how far
your HRV has dropped below your usual, and how far your heart rate sits above
your resting rate. Low HRV with a raised heart rate is the classic
physiological stress signature.</p>
<p>This is your <b>measured</b> stress. Your check-in stress rating is your
<b>felt</b> stress — the two together say more than either alone.</p>
<p>Built on the well-established finding that heart-rate variability falls and
heart rate rises under sympathetic stress.</p>`,
  },
  hr: {
    title: 'Heart rate',
    body: `<p>The most recent beats-per-minute reading from your ring's PPG
sensor.</p>
<p><b>How it's calculated:</b> the ring's optical sensor samples your
blood-flow waveform at 1000 Hz and the firmware computes a 1-second
rolling HR from peak-to-peak intervals. We log it every ~2 minutes
into the autonomous monitor, plus continuously when the app is open.</p>
<p>The range shown on the card is the true min and max across the
selected window (not averaged). Avg is the mean of all readings.</p>`,
  },
  hrv_rmssd: {
    title: 'HRV (RMSSD)',
    body: `<p>Heart rate variability, in milliseconds. The ms difference
between consecutive heartbeats — a window into how your autonomic
nervous system is balancing recovery vs stress.</p>
<p><b>How it's calculated:</b> the ring identifies successive R-R
intervals from the PPG waveform and computes the root-mean-square of
the successive differences (RMSSD) over a 5-minute window. Higher
generally means better recovery state.</p>
<p>Reference points: 20–30 ms is typical at rest for adults 40+, 30–50
ms for healthy younger adults, 50+ ms is excellent. Your own baseline
matters more than these absolutes.</p>`,
  },
  spo2: {
    title: 'Blood oxygen',
    body: `<p>Percentage of haemoglobin in your blood saturated with
oxygen, measured optically.</p>
<p><b>How it's calculated:</b> the ring's red + infrared LEDs measure
how much light passes through your finger; the ratio at the two
wavelengths is mapped to SpO₂ via a calibration curve.</p>
<p>95–100% is normal at rest. Drops to 92–94% are common during sleep
and not concerning on their own. Consistent readings below 90% are
worth flagging to a doctor.</p>`,
  },
  respiration_rate: {
    title: 'Respiration rate',
    body: `<p>Breaths per minute, derived from your heart-rate waveform
(no separate breathing sensor — the ring infers it).</p>
<p><b>How it's calculated:</b> the ring uses the small HR variations
that happen with each breath (respiratory sinus arrhythmia) to estimate
how fast you're breathing. Computed every 2 minutes from a 5-minute
window.</p>
<p>12–20 br/min is typical at rest. Elevated readings can come from
stress, fever, or just being active before the measurement.</p>`,
  },
  bp: {
    title: 'Blood pressure',
    body: `<p><b>Experimental.</b> The ring estimates BP from the shape
of your PPG waveform — not a real cuff measurement.</p>
<p><b>How it's calculated:</b> the firmware looks at the time delay
between pulse features (pulse transit time) and maps that to a sys/dia
estimate via a population calibration curve. Accuracy depends heavily
on per-user calibration against a real cuff.</p>
<p><b>Use a real cuff for anything that matters.</b> Treat the ring's
number as a trend-spotting tool, not a clinical reading.</p>`,
  },
  steps: {
    title: 'Steps',
    body: `<p>Steps counted today by the ring's accelerometer.</p>
<p><b>How it's calculated:</b> the ring's 3-axis accelerometer runs a
gait-detection filter — only motion patterns that look like walking
get counted (so swinging your arm at a desk doesn't add false steps).
Counter resets at midnight local time.</p>
<p>Cumulative through the day. The number you see is the running total
since 00:00, not the latest measurement.</p>`,
  },
  temp_skin: {
    title: 'Skin temperature',
    body: `<p>Surface temperature measured at the inside of the ring,
in degrees Celsius.</p>
<p><b>How it's calculated:</b> a thermistor in contact with the
finger samples temperature periodically. The reading is influenced by
ambient temperature, finger circulation, and how recently you washed
your hands.</p>
<p>The Δ (delta) version compares each reading to your 14-day rolling
average for the same time of day — useful for spotting fever or
hormonal shifts that absolute readings miss.</p>`,
  },
  stress: {
    title: 'Stress',
    body: `<p>The ring's stress-level estimate, 0–100.</p>
<p><b>How it's calculated:</b> the firmware blends recent HRV (lower
= higher stress score), HR (above your resting baseline = higher
stress), and SDNN trends over a 5-minute window.</p>
<p>0–30 relaxed, 30–60 normal, 60–100 elevated. The score is most
useful as a within-day trend (am I winding up or winding down?), not
as an absolute reading.</p>`,
  },
  sleep_session: {
    title: 'Last night',
    body: `<p>How long you slept last night, broken down by stage.</p>
<p><b>How it's calculated:</b> the ring identifies sleep onset from
HR + motion stilling, then classifies each ~2-minute window into deep
(plum) / light (gold) / REM (sage) / awake (clay) using PPG waveform
features and accelerometer data.</p>
<p><b>About awake time:</b> the R11M firmware almost never emits an
explicit "awake" stage — when you get up briefly, it usually classifies
it as a 20–60 second light blip. We treat those short light blips as
awakenings so your breakdown matches what actually happened.</p>`,
  },
  battery_pct: {
    title: 'Ring battery',
    body: `<p>The ring's remaining charge, 0–100%.</p>
<p><b>How it's calculated:</b> the ring's onboard fuel gauge IC
estimates remaining capacity from voltage + recent discharge rate.
The reading is reported every time the app drains the buffer (~every
few minutes when connected, or on each reconnect).</p>
<p>Typical full charge lasts 24–48h on R11M with our autonomous
monitor at 2-minute intervals. Heavy realtime streaming (eg leaving
the Today page open) burns it faster.</p>`,
  },
};

function _ensureExplainerSheet() {
  if (document.getElementById('explainer-sheet')) return;
  // Inject the sheet markup once per page lifetime. Uses the same
  // .sheet / .sheet-backdrop styling each surface already has — if a
  // page lacks those rules the sheet will look bare but still work.
  const html = `
    <div class="sheet-backdrop" id="explainer-bd" onclick="closeExplainer()"></div>
    <div class="sheet" id="explainer-sheet">
      <div class="sheet-grip"></div>
      <h2 id="explainer-title">—</h2>
      <div id="explainer-body" style="font-size:14.5px;line-height:1.55;color:var(--ink-2,#2b2018);"></div>
    </div>`;
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  document.body.appendChild(wrap);
}

function openExplainer(metric) {
  _ensureExplainerSheet();
  const ex = METRIC_EXPLAINERS[metric];
  if (!ex) return;
  document.getElementById('explainer-title').textContent = ex.title;
  document.getElementById('explainer-body').innerHTML   = ex.body;
  document.getElementById('explainer-bd').classList.add('open');
  document.getElementById('explainer-sheet').classList.add('open');
}
function closeExplainer() {
  const bd = document.getElementById('explainer-bd');
  const sh = document.getElementById('explainer-sheet');
  if (bd) bd.classList.remove('open');
  if (sh) sh.classList.remove('open');
}

/// HTML snippet for a small ⓘ button positioned in the corner of any
/// card. Pages can string-concat this into a card template — pair it
/// with a positioned card (relative/absolute) and the global .stat-help
/// CSS that Ring page defines (or roll equivalent inline styles).
function explainerButton(metric) {
  if (!METRIC_EXPLAINERS[metric]) return '';
  return `<button class="stat-help" type="button"
    onclick="event.preventDefault();event.stopPropagation();openExplainer('${metric}')"
    aria-label="How this number is calculated"><svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6.6"/><path d="M8 7.2v3.6" stroke-linecap="round"/><circle cx="8" cy="5" r=".5" fill="currentColor" stroke="none"/></svg></button>`;
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
    { id: 'checkin',  href: '/health/v2/record.html', label: 'Record',
      icon: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M16 3v4M8 3v4M4 11h16M9 16l2 2 4-4"/>' },
    { id: 'ring',     href: '/health/v2/ring.html',   label: 'Ring',
      icon: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/>' },
    { id: 'more',     href: '/health/v2/more.html', label: 'More',
      icon: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>' },
  ];
  return `<nav class="nav">${items.map(i => `
    <a class="nav-item ${i.id === active ? 'active' : ''}" href="${i.href}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${i.icon}</svg>
      <span>${i.label}</span>
    </a>`).join('')}</nav>`;
}
