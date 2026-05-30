// Alys — the orb that represents her across the app.
//
// Two glowing circles fused into a peanut/blob via an SVG gooey filter.
// The same orb is the brand mark: it appears in the chat header, the
// notification icon, and the home page hero. On the home page it pulses
// at the user's live heart rate; everywhere else it pulses on a steady
// 1.2s rest cadence so she still feels alive.
//
// Public API:
//   renderAlysOrb(opts)   →  HTML string, insert into a wrapper
//   wireAlysOrbHR(host)   →  start polling /me/latest-hr to drive pulse
//   setAlysOrbHR(host, bpm)
//
// Defaults to a 160×90 peanut on a warm-orange gradient. Pass size to
// scale; the inner SVG viewBox is fixed so all sizing is via CSS width.

function alysOrbStyles() {
  // Injects shared styles once per document. Idempotent — safe to call
  // every page.
  if (document.getElementById('alys-orb-styles')) return;
  const css = `
    .alys-orb {
      display: inline-block;
      position: relative;
      filter: drop-shadow(0 18px 50px rgba(220, 110, 75, .35))
              drop-shadow(0 4px 14px rgba(220, 110, 75, .22));
      animation: alys-orb-pulse var(--hr-period, 1.2s) ease-in-out infinite;
      transition: transform .3s ease;
    }
    .alys-orb svg { display: block; width: 100%; height: auto; }
    @keyframes alys-orb-pulse {
      0%, 100% { transform: scale(1); }
      30%      { transform: scale(1.045); }
      55%      { transform: scale(0.985); }
      80%      { transform: scale(1.015); }
    }
    /* When HR is missing or stale, a gentler resting pulse. */
    .alys-orb[data-hr="resting"] { animation-duration: 1.2s; }
  `;
  const s = document.createElement('style');
  s.id = 'alys-orb-styles';
  s.textContent = css;
  document.head.appendChild(s);
}

// Render the orb HTML. The SVG uses a unique-ish ID suffix so multiple
// orbs on the same page (chat + nav, etc.) don't collide on the
// <defs> ids.
function renderAlysOrb(opts = {}) {
  alysOrbStyles();
  const size = opts.size || 180;
  const suffix = opts.id || 'a' + Math.floor(Math.random() * 1e6).toString(36);
  const grad = `orb-g-${suffix}`;
  const goo  = `orb-goo-${suffix}`;
  const sheen = `orb-sheen-${suffix}`;

  // viewBox 200×110 → peanut spans ~78% of width with overlap. Adjust
  // circle centers to control how much they "fuse" — closer = single
  // blob, further = clearly two lobes.
  return `
    <div class="alys-orb" style="width:${size}px" data-hr="resting" aria-label="Alys">
      <svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="${grad}" cx="40%" cy="35%" r="80%">
            <stop offset="0%"  stop-color="#fff7ec"/>
            <stop offset="18%" stop-color="#fde0c6"/>
            <stop offset="48%" stop-color="#f3a07e"/>
            <stop offset="78%" stop-color="#dc5f3e"/>
            <stop offset="100%" stop-color="#a83a23"/>
          </radialGradient>
          <radialGradient id="${sheen}" cx="35%" cy="22%" r="35%">
            <stop offset="0%"  stop-color="rgba(255,250,240,.95)"/>
            <stop offset="60%" stop-color="rgba(255,250,240,.18)"/>
            <stop offset="100%" stop-color="rgba(255,250,240,0)"/>
          </radialGradient>
          <filter id="${goo}">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="b"/>
            <feColorMatrix in="b" mode="matrix"
                           values="1 0 0 0 0
                                   0 1 0 0 0
                                   0 0 1 0 0
                                   0 0 0 22 -10" result="g"/>
            <feComposite in="SourceGraphic" in2="g" operator="atop"/>
          </filter>
        </defs>
        <g filter="url(#${goo})">
          <circle cx="74"  cy="55" r="38" fill="url(#${grad})"/>
          <circle cx="128" cy="55" r="38" fill="url(#${grad})"/>
        </g>
        <!-- A second sheen layer adds the soft top-left highlight -->
        <circle cx="74"  cy="55" r="36" fill="url(#${sheen})"/>
        <circle cx="128" cy="55" r="36" fill="url(#${sheen})"/>
      </svg>
    </div>`;
}

// Set the orb's pulse cadence from a heart-rate value. Calling with
// null/undefined falls back to the resting cadence.
function setAlysOrbHR(host, bpm) {
  if (!host) return;
  const orb = host.classList && host.classList.contains('alys-orb')
    ? host
    : host.querySelector('.alys-orb');
  if (!orb) return;
  const n = Number(bpm);
  if (!isFinite(n) || n < 30 || n > 220) {
    orb.dataset.hr = 'resting';
    orb.style.removeProperty('--hr-period');
    return;
  }
  // 60s / bpm = seconds per beat. Clamp to a sensible band so a fast
  // sprint reading (HR 160) doesn't strobe and a low HR (HR 45)
  // doesn't look frozen.
  const period = Math.min(1.4, Math.max(0.45, 60 / n));
  orb.dataset.hr = String(Math.round(n));
  orb.style.setProperty('--hr-period', period.toFixed(2) + 's');
}

// Wire the orb to a live HR polling loop. Pulls the latest hr sample
// from /ring/samples?metric=hr&limit=1; refreshes every 30s. Returns
// a stop function. Best-effort — never throws.
function wireAlysOrbHR(host) {
  let stopped = false;
  async function tick() {
    if (stopped) return;
    try {
      const r = await api('/ring/samples?metric=hr&limit=1');
      const s = (r && r.samples && r.samples[0]) || null;
      if (s && s.value != null) setAlysOrbHR(host, s.value);
    } catch (_) {}
  }
  tick();
  const id = setInterval(tick, 30000);
  return () => { stopped = true; clearInterval(id); };
}
