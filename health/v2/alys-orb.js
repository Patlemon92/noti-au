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
      /* Light blur softens the edge while still letting the morphing
         shape read as a single coherent blob. saturate restores the
         richness the blur drains away. */
      filter: blur(8px) saturate(1.25);
      -webkit-filter: blur(8px) saturate(1.25);
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
  const cx = w / 2;
  const cy = h / 2;
  const baseR = w * 0.32;

  // ── The shell — N points around the perimeter that each wobble
  // radially via their own noise offset. Stitched with a smooth
  // quadratic-bezier curve so the blob always reads as a single
  // organic shape. More points + more random offsets = more "alive".
  const N = 56;
  const shell = [];
  for (let i = 0; i < N; i++) {
    shell.push({
      angle:   (i / N) * Math.PI * 2,
      offset:  Math.random() * 1000,
      speed:   0.0035 + Math.random() * 0.0022,
      amp:     0.10 + Math.random() * 0.08,
    });
  }

  // Internal colour spots that drift WITHIN the blob (clipped to it).
  // They breathe slowly so the inner colour palette is always shifting.
  const spots = [];
  const M = 4;
  for (let i = 0; i < M; i++) {
    const a = (i / M) * Math.PI * 2 + Math.random() * 0.4;
    spots.push({
      cx:      cx + Math.cos(a) * baseR * 0.3,
      cy:      cy + Math.sin(a) * baseR * 0.3,
      r:       baseR * (0.35 + Math.random() * 0.15),
      color:   palette[i % palette.length],
      offsetX: Math.random() * 1000,
      offsetY: Math.random() * 1000,
    });
  }

  // Breathing — the blob's overall radius slowly inhales and exhales.
  // Independent of the HR pulse on the wrapper element.
  let breathT = 0;

  // Smooth sine-summed pseudo-noise. Output ≈ −1..+1.
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

    // Slow breathing: ±5% on the base radius, ~6s cycle.
    breathT += 0.006;
    const breathR = baseR * (1 + Math.sin(breathT) * 0.05);

    // Compute the morphed shell points for this frame.
    const pts = new Array(N);
    for (let i = 0; i < N; i++) {
      const s = shell[i];
      s.offset += s.speed;
      const r = breathR * (1 + n(s.offset) * s.amp);
      pts[i] = {
        x: cx + Math.cos(s.angle) * r,
        y: cy + Math.sin(s.angle) * r,
      };
    }

    // Draw the morphing blob path — smooth quadratic-bezier curve
    // through the midpoints, with each shell point as the control.
    ctx.save();
    ctx.beginPath();
    const mid0 = {
      x: (pts[N - 1].x + pts[0].x) / 2,
      y: (pts[N - 1].y + pts[0].y) / 2,
    };
    ctx.moveTo(mid0.x, mid0.y);
    for (let i = 0; i < N; i++) {
      const cur  = pts[i];
      const next = pts[(i + 1) % N];
      const mx = (cur.x + next.x) / 2;
      const my = (cur.y + next.y) / 2;
      ctx.quadraticCurveTo(cur.x, cur.y, mx, my);
    }
    ctx.closePath();

    // Base fill — warm cream → coral radial gradient so the body
    // already has depth even before the spots are painted.
    const grad = ctx.createRadialGradient(
      cx - baseR * 0.18, cy - baseR * 0.22, 0,
      cx, cy, breathR * 1.05
    );
    grad.addColorStop(0,   'rgba(255, 245, 232, .98)');
    grad.addColorStop(.45, 'rgba(250, 195, 165, .92)');
    grad.addColorStop(.85, 'rgba(220, 110,  80, .88)');
    grad.addColorStop(1,   'rgba(180,  70,  55, .78)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Clip subsequent paints to the blob so colour spots stay inside.
    ctx.clip();

    // Drifting interior colour spots — these are what make the body
    // feel alive: pink + amber + lilac slowly migrating through it.
    for (const sp of spots) {
      sp.offsetX += 0.0032;
      sp.offsetY += 0.0028;
      const nx = n(sp.offsetX);
      const ny = n(sp.offsetY);
      const x  = sp.cx + nx * baseR * 0.45;
      const y  = sp.cy + ny * baseR * 0.45;

      ctx.fillStyle = sp.color;
      ctx.beginPath();
      ctx.arc(x, y, sp.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Soft top-left specular sheen so it reads as a 3D body.
    const sheen = ctx.createRadialGradient(
      cx - baseR * 0.30, cy - baseR * 0.36, 0,
      cx - baseR * 0.30, cy - baseR * 0.36, baseR * 0.55
    );
    sheen.addColorStop(0,   'rgba(255, 255, 255, .55)');
    sheen.addColorStop(.7,  'rgba(255, 255, 255, .08)');
    sheen.addColorStop(1,   'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, w, h);

    ctx.restore();
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
