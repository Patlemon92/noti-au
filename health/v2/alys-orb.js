// Alys — the orb that represents her, on the home page only.
//
// Patrick's reference is George Francis's generative-orb animation
// (gist 1ccb28bc96c8c777a9442fc9a109cb96): multiple coloured blobs
// drifting through space with a heavy blur over the whole stage, so
// they read as a single soft luminous cloud. We use a plain 2D canvas
// + requestAnimationFrame + a CSS blur filter on the canvas; no PIXI
// dependency. The blobs drift via a small sine-summed noise function,
// the canvas is blurred ~30px, and the wrapping div pulses at the
// user's live heart rate.
//
// Public API:
//   renderAlysOrb({size, palette}) → HTML string. Caller inserts it
//     into the DOM, then calls startAlysOrbAnimation(mount) once it's
//     attached so the canvas animation can begin.
//   startAlysOrbAnimation(host)
//   setAlysOrbHR(host, bpm)
//   wireAlysOrbHR(host)

// Warm Neeve palette, complementary hues. Each colour is a soft
// translucent fill so the blobs blend richly when they overlap.
const ALYS_ORB_PALETTES = {
  warm: [
    'rgba(255, 170, 195, .85)',  // soft pink
    'rgba(255, 210, 145, .85)',  // amber
    'rgba(220, 175, 220, .80)',  // lilac
    'rgba(255, 195, 175, .85)',  // peach
    'rgba(240, 165, 145, .80)',  // salmon
  ],
};

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
    .alys-orb-canvas {
      width: 100%; height: 100%;
      display: block;
      /* Heavy blur dissolves the individual blobs into a single soft
         luminous cloud. saturate gives the colours back some richness
         that blur drains away. */
      filter: blur(28px) saturate(1.25);
      -webkit-filter: blur(28px) saturate(1.25);
    }
    @keyframes alys-orb-pulse {
      0%, 100% { transform: scale(1); }
      30%      { transform: scale(1.035); }
      55%      { transform: scale(0.99); }
      80%      { transform: scale(1.012); }
    }
  `;
  const s = document.createElement('style');
  s.id = 'alys-orb-styles';
  s.textContent = css;
  document.head.appendChild(s);
}

function renderAlysOrb(opts = {}) {
  ensureAlysOrbStyles();
  const size = opts.size || 260;
  const dpr  = Math.min(2, window.devicePixelRatio || 1);
  const px   = Math.round(size * dpr);

  return `
    <div class="alys-orb" style="--orb-size:${size}px" data-hr="resting"
         data-palette="${opts.palette || 'warm'}" aria-label="Alys">
      <canvas class="alys-orb-canvas" width="${px}" height="${px}"
              style="width:${size}px;height:${size}px"></canvas>
    </div>`;
}

// Spawn the canvas animation. Idempotent — calling twice on the same
// host is a no-op (a __started flag is set on the canvas).
function startAlysOrbAnimation(hostOrSelector) {
  const host = typeof hostOrSelector === 'string'
    ? document.querySelector(hostOrSelector)
    : hostOrSelector;
  if (!host) return;
  const orb = host.classList && host.classList.contains('alys-orb')
    ? host
    : host.querySelector('.alys-orb');
  if (!orb) return;
  const canvas = orb.querySelector('canvas.alys-orb-canvas');
  if (!canvas || canvas.__started) return;
  canvas.__started = true;

  const palette = ALYS_ORB_PALETTES[orb.dataset.palette] || ALYS_ORB_PALETTES.warm;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Five blobs distributed loosely around the centre. Each has its own
  // noise offsets so they drift independently and never sync up.
  const blobs = [];
  const N = 5;
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2 + Math.random() * 0.4;
    const dist  = w * (0.10 + Math.random() * 0.10);
    blobs.push({
      cx:      w * 0.5 + Math.cos(angle) * dist,
      cy:      h * 0.5 + Math.sin(angle) * dist,
      r:       w * (0.22 + Math.random() * 0.08),
      color:   palette[i % palette.length],
      offsetX: Math.random() * 1000,
      offsetY: Math.random() * 1000,
      offsetS: Math.random() * 1000,
    });
  }

  // Smooth sine-summed pseudo-noise (no SimplexNoise dep). Output ≈ −1..+1.
  function n(t) {
    return (
      Math.sin(t * 0.7) * 0.5 +
      Math.sin(t * 1.31 + 0.5) * 0.3 +
      Math.sin(t * 2.13 + 1.0) * 0.2
    );
  }

  let raf = 0, running = true;
  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);

    for (const b of blobs) {
      b.offsetX += 0.0028;
      b.offsetY += 0.0028;
      b.offsetS += 0.0035;
      const nx = n(b.offsetX);
      const ny = n(b.offsetY);
      const ns = n(b.offsetS);
      const x  = b.cx + nx * w * 0.16;
      const y  = b.cy + ny * h * 0.16;
      const r  = b.r  * (0.7 + (ns + 1) * 0.18);

      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  // Pause when the tab is hidden to save battery; resume on return.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else if (!running) {
      running = true;
      raf = requestAnimationFrame(frame);
    }
  });
}

// Re-time the orb pulse from a heart-rate value. null/missing → resting.
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
