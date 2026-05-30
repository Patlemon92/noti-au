// Alys — the orb that represents her on the home page.
//
// Patrick's first reference image: a soft translucent soap-bubble
// sphere with an iridescent rim — pink, amber, mint, lilac fringing
// the edge like dichroic refraction, with a near-clear interior and a
// bright top-left specular highlight. Outer halo is barely there.
//
// Built in SVG, not canvas. The iridescent rim is four soft-blurred
// coloured stroke rings each centred at a slightly different point,
// so each colour fringes a different arc of the perimeter. The group
// slowly rotates so the colours migrate around the rim — that's the
// "alive" part. The whole wrapper scale-pulses at the user's live HR.
//
// Public API:
//   renderAlysOrb({size})        → HTML string
//   setAlysOrbHR(host, bpm)
//   wireAlysOrbHR(host)
// startAlysOrbAnimation is kept as a no-op shim for older callers.

function ensureAlysOrbStyles() {
  if (document.getElementById('alys-orb-styles')) return;
  const css = `
    .alys-orb {
      display: inline-block;
      position: relative;
      width: var(--orb-size, 260px);
      height: var(--orb-size, 260px);
      animation: alys-orb-pulse var(--hr-period, 1.2s) ease-in-out infinite;
      will-change: transform;
    }
    .alys-orb svg { display: block; width: 100%; height: 100%; }
    /* The iridescent rim slowly rotates so the coloured fringes drift
       around the bubble perimeter. */
    .alys-orb .orb-rim {
      transform-origin: 160px 160px;
      animation: alys-orb-rim 28s linear infinite;
    }
    @keyframes alys-orb-rim {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes alys-orb-pulse {
      0%, 100% { transform: scale(1); }
      30%      { transform: scale(1.025); }
      55%      { transform: scale(0.995); }
      80%      { transform: scale(1.008); }
    }
  `;
  const s = document.createElement('style');
  s.id = 'alys-orb-styles';
  s.textContent = css;
  document.head.appendChild(s);
}

function renderAlysOrb(opts = {}) {
  ensureAlysOrbStyles();
  const size = opts.size || 280;
  // Unique id suffix so multiple orbs on the same page don't collide
  // on the <defs> ids.
  const sfx = opts.id || 'a' + Math.floor(Math.random() * 1e6).toString(36);

  return `
    <div class="alys-orb" style="--orb-size:${size}px" data-hr="resting" aria-label="Alys">
      <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Outer halo — barely-there warm wash. Lowered opacity so
               it doesn't read as a shadow ring against the flat cream
               page backdrop. -->
          <radialGradient id="orb-${sfx}-halo" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stop-color="rgba(248,205,185,0)"/>
            <stop offset="78%" stop-color="rgba(248,205,185,.14)"/>
            <stop offset="100%" stop-color="rgba(248,205,185,0)"/>
          </radialGradient>

          <!-- Bubble interior: very faint warm-white wash, brighter at
               the top-left so the orb reads as 3D. -->
          <radialGradient id="orb-${sfx}-fill" cx="44%" cy="38%" r="60%">
            <stop offset="0%"   stop-color="rgba(255,255,255,.78)"/>
            <stop offset="55%"  stop-color="rgba(255,248,240,.42)"/>
            <stop offset="100%" stop-color="rgba(255,238,222,.18)"/>
          </radialGradient>

          <!-- Bright top-left specular highlight. -->
          <radialGradient id="orb-${sfx}-sheen" cx="34%" cy="24%" r="18%">
            <stop offset="0%"   stop-color="rgba(255,255,255,1)"/>
            <stop offset="65%"  stop-color="rgba(255,255,255,.35)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
          </radialGradient>

          <filter id="orb-${sfx}-rim" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="7"/>
          </filter>
          <filter id="orb-${sfx}-sheen-blur">
            <feGaussianBlur stdDeviation="6"/>
          </filter>
        </defs>

        <!-- Outer halo. -->
        <circle cx="160" cy="160" r="156" fill="url(#orb-${sfx}-halo)"/>

        <!-- Iridescent rim — four blurred coloured rings whose centres
             sit at slightly different points so each colour fringes a
             different arc of the perimeter. The group slowly rotates,
             dragging the colours around the rim. -->
        <g class="orb-rim" filter="url(#orb-${sfx}-rim)">
          <circle cx="152" cy="148" r="120" fill="none"
                  stroke="rgba(255,170,200,.85)" stroke-width="5"/>
          <circle cx="168" cy="153" r="120" fill="none"
                  stroke="rgba(255,212,140,.80)" stroke-width="5"/>
          <circle cx="158" cy="172" r="120" fill="none"
                  stroke="rgba(155,215,210,.78)" stroke-width="5"/>
          <circle cx="170" cy="168" r="120" fill="none"
                  stroke="rgba(215,180,235,.78)" stroke-width="5"/>
        </g>

        <!-- Translucent interior so the rim shines through cleanly. -->
        <circle cx="160" cy="160" r="120" fill="url(#orb-${sfx}-fill)"/>

        <!-- Soft top-left highlight (blurred ellipse). -->
        <g filter="url(#orb-${sfx}-sheen-blur)">
          <ellipse cx="125" cy="118" rx="32" ry="18"
                   fill="rgba(255,255,255,.75)"/>
        </g>

        <!-- A second crisper specular for the bright pinpoint. -->
        <circle cx="160" cy="160" r="120" fill="url(#orb-${sfx}-sheen)"/>
      </svg>
    </div>`;
}

// startAlysOrbAnimation kept as a no-op so older today.html boot code
// that calls it doesn't break — the SVG is now self-animating via CSS.
function startAlysOrbAnimation(_host) { /* no-op */ }

// Re-time the wrapper pulse from a heart-rate value. null/missing → resting.
function setAlysOrbHR(host, bpm) {
  if (!host) return;
  const orb = host.classList && host.classList.contains('alys-orb')
    ? host
    : host.querySelector('.alys-orb');
  if (!orb) return;
  const v = Number(bpm);
  if (!isFinite(v) || v < 30 || v > 220) {
    orb.dataset.hr = 'resting';
    orb.style.removeProperty('--hr-period');
    return;
  }
  // Clamp so a sprint reading doesn't strobe and a low HR doesn't freeze.
  const period = Math.min(1.4, Math.max(0.45, 60 / v));
  orb.dataset.hr = String(Math.round(v));
  orb.style.setProperty('--hr-period', period.toFixed(2) + 's');
}

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
