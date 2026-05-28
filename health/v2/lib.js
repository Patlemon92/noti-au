// Shared lib for Neeve v2 pages.
// Auth + API client + helpers.

const API_BASE = 'https://api.noti.au';
const TOKEN_KEY = 'neeve_token';

// Token storage. The iOS app will inject the token via JS bridge before
// loading the page; web users sign in via /health/login.html (v1 page).
function getToken() {
  // Order: query param (?token=...), iOS-injected window var, localStorage
  const urlToken = new URLSearchParams(window.location.search).get('token');
  if (urlToken) {
    localStorage.setItem(TOKEN_KEY, urlToken);
    // Clean the URL
    history.replaceState({}, '', window.location.pathname);
    return urlToken;
  }
  if (window.NEEVE_TOKEN) return window.NEEVE_TOKEN;
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(t) { localStorage.setItem(TOKEN_KEY, t); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }

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
  if (Number.isInteger(value) || value === Math.round(value)) return Math.round(value).toString();
  return value.toFixed(1);
}

function metricLabel(metric) {
  return {
    hr:               'Heart rate',
    hrv_rmssd:        'HRV',
    spo2:             'Blood oxygen',
    temp_skin:        'Skin temp',
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

// Render an SVG sparkline into a container.
function renderSparkline(container, values, options = {}) {
  if (!values || values.length === 0) {
    container.innerHTML = '<div class="caption" style="padding:16px 0">No data yet.</div>';
    return;
  }
  const W = container.clientWidth || 300;
  const H = options.height || 80;
  const pad = 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = (W - pad * 2) / Math.max(1, values.length - 1);

  const pts = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = H - pad - ((v - min) / range) * (H - pad * 2);
    return [x, y];
  });
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');

  const stroke = options.color || 'var(--terra)';
  container.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" preserveAspectRatio="none">
      <path d="${d}" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="1.5" fill="${stroke}"/>`).join('')}
    </svg>
  `;
}

// Bottom nav HTML (call once per page; pass active tab id).
function renderNav(active) {
  const items = [
    { id: 'today',  href: '/health/v2/today.html',  label: 'Today',
      icon: '<path d="M3 12 12 3l9 9M5 10v10h14V10"/>' },
    { id: 'ring',   href: '/health/v2/ring.html',   label: 'Ring',
      icon: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/>' },
    { id: 'history', href: '/health/v2/history.html', label: 'History',
      icon: '<path d="M3 12h4l3-7 4 14 3-7h4"/>' },
    { id: 'settings', href: '/health/profile.html', label: 'Settings',
      icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>' },
  ];
  return `<nav class="nav">${items.map(i => `
    <a class="nav-item ${i.id === active ? 'active' : ''}" href="${i.href}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${i.icon}</svg>
      <span>${i.label}</span>
    </a>`).join('')}</nav>`;
}
