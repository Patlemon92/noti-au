// Alys — the orb that represents her across the app.
//
// A single luminous sphere with a marbled multi-colour gradient inside
// (soft pink / peach / lilac / amber blended on a cream base) and a
// soft outer glow. Same orb is Alys's identity mark: home hero, chat
// avatar, brand notification mark.
//
// The orb pulses at the user's live heart rate (60 / bpm seconds per
// beat, clamped 0.45–1.4s); a slow internal "drift" animation keeps
// her feeling alive even when no HR sample is available.
//
// Public API:
//   renderAlysOrb({size, palette}) → HTML string
//   setAlysOrbHR(host, bpm)        → re-time the pulse from a heart-rate
//   wireAlysOrbHR(host)            → poll /ring/samples and set HR

const ALYS_ORB_PALETTES = {
  // Default — warm, dreamy, soft. Matches the Neeve design brief.
  warm: {
    base:  ['#fff5ec', '#ffdfcf', '#f9b7a7'],   // cream → peach
    blobs: [
      { cx: 25, cy: 55, r: 42, color: 'rgba(255, 180, 200, .72)' }, // pink
      { cx: 75, cy: 58, r: 42, color: 'rgba(255, 210, 140, .62)' }, // amber
      { cx: 58, cy: 80, r: 32, color: 'rgba(200, 170, 220, .55)' }, // lilac
    ],
    glow:  'rgba(255, 200, 180, .55)',
  },
  // Cool variant for the Sleep page — same shape, dawn-violet palette.
  dawn: {
    base:  ['#fff5ec', '#ffe1cf', '#e9a78f'],
    blobs: [
      { cx: 28, cy: 50, r: 42, color: 'rgba(255, 195, 195, .72)' },
      { cx: 72, cy: 58, r: 42, color: 'rgba(228, 168, 190, .65)' },
      { cx: 55, cy: 82, r: 34, color: 'rgba(180, 140, 200, .55)' },
    ],
    glow:  'rgba(245, 190, 175, .55)',
  },
};

function ensureAlysOrbStyles() {
  if (document.getElementById('alys-orb-styles')) return;
  const css = `
    .alys-orb {
      display: inline-block;
      position: relative;
      width: var(--orb-size, 200px);
      height: var(--orb-size, 200px);
      animation: alys-orb-pulse var(--hr-period, 1.2s) ease-in-out infinite;
      will-change: transform;
    }
    .alys-orb svg { display: block; width: 100%; height: 100%; }
    .alys-orb-blobs {
      transform-origin: 50% 50%;
      animation: alys-orb-drift 18s ease-in-out infinite;
    }
    @keyframes alys-orb-pulse {
      0%, 100% { transform: scale(1); }
      30%      { transform: scale(1.035); }
      55%      { transform: scale(0.99); }
      80%      { transform: scale(1.012); }
    }
    @keyframes alys-orb-drift {
      0%, 100% { transform: rotate(0deg); }
      50%      { transform: rotate(14deg); }
    }
  `;
  const s = document.createElement('style');
  s.id = 'alys-orb-styles';
  s.textContent = css;
  document.head.appendChild(s);
}

function renderAlysOrb(opts = {}) {
  ensureAlysOrbStyles();
  const size    = opts.size    || 220;
  const palette = ALYS_ORB_PALETTES[opts.palette] || ALYS_ORB_PALETTES.warm;
  // Unique id suffix so multiple orbs on the same page don't collide.
  const sfx = opts.id || 'a' + Math.floor(Math.random() * 1e6).toString(36);

  const blobsSvg = palette.blobs.map((b, i) => `
    <radialGradient id="orb-${sfx}-b${i}" cx="${b.cx}%" cy="${b.cy}%" r="${b.r}%">
      <stop offset="0%"   stop-color="${b.color}"/>
      <stop offset="100%" stop-color="${b.color.replace(/,\s*\.?\d+\)/, ', 0)')}"/>
    </radialGradient>`).join('');

  const blobsCircles = palette.blobs.map((_, i) =>
    `<circle cx="120" cy="120" r="100" fill="url(#orb-${sfx}-b${i})"/>`).join('');

  return `
    <div class="alys-orb" style="--orb-size:${size}px" data-hr="resting" aria-label="Alys">
      <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="orb-${sfx}-base" cx="40%" cy="38%" r="68%">
            <stop offset="0%"   stop-color="${palette.base[0]}"/>
            <stop offset="55%"  stop-color="${palette.base[1]}"/>
            <stop offset="100%" stop-color="${palette.base[2]}"/>
          </radialGradient>
          ${blobsSvg}
          <radialGradient id="orb-${sfx}-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stop-color="${palette.glow}"/>
            <stop offset="58%"  stop-color="${palette.glow.replace(/,\s*\.?\d+\)/, ', .22)')}"/>
            <stop offset="100%" stop-color="${palette.glow.replace(/,\s*\.?\d+\)/, ', 0)')}"/>
          </radialGradient>
          <radialGradient id="orb-${sfx}-sheen" cx="32%" cy="26%" r="26%">
            <stop offset="0%"   stop-color="rgba(255,255,255,.95)"/>
            <stop offset="70%"  stop-color="rgba(255,255,255,.18)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
          </radialGradient>
          <radialGradient id="orb-${sfx}-shadow" cx="58%" cy="72%" r="48%">
            <stop offset="0%"   stop-color="rgba(180,90,75,0)"/>
            <stop offset="70%"  stop-color="rgba(180,90,75,0)"/>
            <stop offset="100%" stop-color="rgba(180,90,75,.18)"/>
          </radialGradient>
          <filter id="orb-${sfx}-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.6"/>
          </filter>
        </defs>

        <!-- Outer halo: large soft circle behind the sphere -->
        <circle cx="120" cy="120" r="118" fill="url(#orb-${sfx}-glow)"/>

        <!-- Sphere base + colour blobs (slow drift) -->
        <g class="alys-orb-blobs" filter="url(#orb-${sfx}-soft)">
          <circle cx="120" cy="120" r="100" fill="url(#orb-${sfx}-base)"/>
          ${blobsCircles}
        </g>

        <!-- Bottom-right inner shadow gives the orb depth -->
        <circle cx="120" cy="120" r="100" fill="url(#orb-${sfx}-shadow)"/>

        <!-- Top-left specular highlight (not blurred, not drifting) -->
        <circle cx="120" cy="120" r="100" fill="url(#orb-${sfx}-sheen)"/>
      </svg>
    </div>`;
}

// Re-time the orb pulse from a heart-rate value. Pass null/missing to
// fall back to the resting cadence.
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
  // Clamp the pulse band so a sprint reading doesn't strobe and a low
  // HR doesn't look frozen.
  const period = Math.min(1.4, Math.max(0.45, 60 / n));
  orb.dataset.hr = String(Math.round(n));
  orb.style.setProperty('--hr-period', period.toFixed(2) + 's');
}

// Optional helper — poll /ring/samples?metric=hr&limit=1 every 30s and
// set HR. Used by pages that don't already have ring samples in hand.
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
