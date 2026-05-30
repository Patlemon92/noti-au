// Neeve ambient hero — shared between Today and Sleep.
//
// Paints a warm phase-aware gradient INSIDE the host element (a header
// or hero section), plus optional weather wash + particles. The host
// owns the visual; nothing leaks past it. On Today the central focal
// point is the Alys orb (see alys-orb.js) — this module no longer
// paints a sun/moon, just the backdrop atmosphere.
//
// Phase colour palettes mirror NeeveTodayAmbient.jsx (May 2026 brief),
// with the dark "sky cap" radial dropped from day/dawn/dusk per
// Patrick's feedback — daytime stays warm cream/peach throughout.

// Phase palettes — toned WAY down so the home hero reads as a calm
// pale cream backdrop with the Alys orb as the focal point. Each phase
// adds a very subtle warm-to-cream tint shift, not a saturated radial
// burst. Night gets a slightly cooler tint; everything else stays in
// the cream/peach family.
const PHASES = {
  dawn: {
    label: 'Dawn', greet: 'Good morning',
    grad: `radial-gradient(120% 90% at 50% 14%, #fbe6d5 0%, transparent 70%),
           linear-gradient(180deg, #fbf3e9 0%, #f8f1e7 100%)`,
    textOn: '#5a3f2e',
  },
  day: {
    label: 'Day', greet: 'Good afternoon',
    grad: `radial-gradient(120% 90% at 50% 12%, #faeede 0%, transparent 70%),
           linear-gradient(180deg, #fbf5ec 0%, #f8f1e7 100%)`,
    textOn: '#5a3f2e',
  },
  dusk: {
    label: 'Dusk', greet: 'Good evening',
    grad: `radial-gradient(120% 90% at 50% 14%, #f7e0d0 0%, transparent 70%),
           linear-gradient(180deg, #faeede 0%, #f8f1e7 100%)`,
    textOn: '#5a3f2e',
  },
  night: {
    label: 'Night', greet: 'Good night',
    grad: `radial-gradient(120% 90% at 50% 14%, #ece5dc 0%, transparent 70%),
           linear-gradient(180deg, #f3ecde 0%, #f8f1e7 100%)`,
    textOn: '#5a3f2e',
  },
  // Sleep page keeps its warmer, slightly more saturated wash.
  sleep_dawn: {
    label: 'Sleep', greet: '',
    grad: `radial-gradient(110% 68% at 50% -8%, #f4cda7 0%, transparent 52%),
           radial-gradient(120% 76% at 50% 32%, #d98a6e 0%, transparent 60%),
           radial-gradient(132% 66% at 50% 62%, #875b76 0%, transparent 64%),
           linear-gradient(180deg, transparent 58%, #f8f1e7 92%)`,
    textOn: '#fff7f0',
  },
};

const WEATHER = {
  clear:  { label: 'clear',  wash: null,                          particles: null    },
  clouds: { label: 'clouds', wash: 'rgba(190,182,170,.22)',       particles: 'cloud' },
  rain:   { label: 'rain',   wash: 'rgba(120,128,140,.28)',       particles: 'rain'  },
  fog:    { label: 'fog',    wash: 'rgba(232,226,216,.35)',       particles: null    },
};

function phaseFromHour(h) {
  if (h >= 5 && h < 8)  return 'dawn';
  if (h >= 8 && h < 17) return 'day';
  if (h >= 17 && h < 20) return 'dusk';
  return 'night';
}

function greetFromHour(h) {
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Good night';
}

// Open-Meteo WMO weather code → bucket.
function wmoToWeather(c) {
  if (c == null) return 'clear';
  if (c === 0)            return 'clear';
  if (c === 45 || c === 48) return 'fog';
  if (c >= 51)            return 'rain';
  return 'clouds';
}

function ensureAmbientStyles() {
  if (document.getElementById('ambient-styles')) return;
  const css = `
  /* Host: gradient + weather wash live inside it, clipped by overflow.
     No fixed full-viewport layer — the page below the hero stays
     plain cream so nothing leaks into content cards as a shadow. */
  .amb-host { position: relative; overflow: hidden; isolation: isolate; }
  .amb-grad-layer {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    transition: background 1.2s ease;
  }

  /* Hero text — most phases now use a soft cream backdrop so the
     warm-brown ink reads cleanly. Only sleep_dawn (deep warm wash)
     uses cream text. */
  .ambient-text { color: #5a3f2e; transition: color 1s ease; }
  [data-amb-phase="sleep_dawn"] .ambient-text { color: #fff7f0; }
  .amb-pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 14px; border-radius: 99px;
    background: rgba(255,255,255,.6); color: #5a3f2e;
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(91,63,46,.15); font-size: 12.5px;
  }
  [data-amb-phase="sleep_dawn"] .amb-pill {
    background: rgba(255,255,255,.22); color: #fff7f0;
    border-color: rgba(255,255,255,.3);
  }

  .amb-content {
    position: relative; z-index: 2;
    max-width: 440px; margin: 0 auto; padding: 0 22px;
  }

  /* Weather wash + particles. Absolute, clipped to host. */
  .amb-wash { position: absolute; inset: 0; z-index: 1; pointer-events: none; animation: amb-fade 1s both; }
  .amb-clouds, .amb-rain { position: absolute; left: 0; right: 0; pointer-events: none; }
  .amb-rain { top: 0; height: 480px; z-index: 1; overflow: hidden; }
  .amb-rain span {
    position: absolute; top: -30px; width: 1.5px; height: 22px;
    background: linear-gradient(rgba(255,255,255,.5), transparent);
    animation: amb-raindrop linear infinite;
  }
  .amb-clouds { top: 80px; height: 220px; z-index: 1; }
  .amb-clouds span {
    position: absolute; border-radius: 99px;
    background: rgba(245,240,232,.55); filter: blur(18px);
  }

  /* The dark CTA pill ("Log something" / "Start check-in") still gets
     paint here so home page can use it inline without re-defining. */
  .amb-cta-dark {
    background: #2b2018; color: #fff7f0;
    box-shadow: 0 14px 30px -16px rgba(40,25,15,.7);
    padding: 16px 26px; border: none;
    min-width: 220px; max-width: 340px;
    font-size: 16px; font-weight: 500;
    border-radius: 99px; cursor: pointer; font-family: inherit;
    text-decoration: none; text-align: center;
  }

  @keyframes amb-fade { from{opacity:0} to{opacity:1} }
  @keyframes amb-raindrop { to { transform: translateY(150px); } }
  `;
  const style = document.createElement('style');
  style.id = 'ambient-styles';
  style.textContent = css;
  document.head.appendChild(style);
}

// Public: mountAmbient({ host, phase?, weather? })
// - host: hero element (header/section). Gradient + wash mount INSIDE
//   it, clipped to its bounds. Existing children stay interactive on
//   top.
// - phase: override; default = computed from local clock.
// - weather: override; default = 'clear'.
function mountAmbient({ host, phase, weather = 'clear' }) {
  ensureAmbientStyles();
  if (!host) return null;
  host.classList.add('amb-host');

  const phaseKey = phase || phaseFromHour(new Date().getHours());
  const p = PHASES[phaseKey] || PHASES.day;
  const w = WEATHER[weather] || WEATHER.clear;

  host.setAttribute('data-amb-phase', phaseKey);

  // Clean up the obsolete fixed-viewport gradient if a prior mount
  // left one behind, and any prior in-host layers.
  const stale = document.getElementById('amb-grad-fixed');
  if (stale) stale.remove();
  document.documentElement.removeAttribute('data-amb-on');
  host.querySelectorAll(':scope > .amb-layer').forEach(el => el.remove());

  const layers = [];

  // Gradient layer — absolute inside host, full bleed.
  const grad = document.createElement('div');
  grad.className = 'amb-grad-layer amb-layer';
  grad.style.background = p.grad;
  grad.setAttribute('aria-hidden', 'true');
  layers.push(grad);

  // Weather wash.
  if (w.wash) {
    const wash = document.createElement('div');
    wash.className = 'amb-wash amb-layer';
    wash.style.background = w.wash;
    layers.push(wash);
  }

  // Particles.
  if (w.particles === 'rain') {
    const rain = document.createElement('div');
    rain.className = 'amb-rain amb-layer';
    rain.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 26; i++) {
      const drop = document.createElement('span');
      drop.style.left = (((i * 3.9) + (i % 3) * 2) % 100) + '%';
      drop.style.animationDuration = (0.7 + (i % 4) * 0.18) + 's';
      drop.style.animationDelay = ((i % 7) * 0.12) + 's';
      rain.appendChild(drop);
    }
    layers.push(rain);
  }
  if (w.particles === 'cloud') {
    const clouds = document.createElement('div');
    clouds.className = 'amb-clouds amb-layer';
    clouds.setAttribute('aria-hidden', 'true');
    const blobs = [[20, 150, .5], [62, 200, .4], [40, 120, .35]];
    blobs.forEach(([l, ww, o], i) => {
      const b = document.createElement('span');
      b.style.top = (30 + i * 26) + 'px';
      b.style.left = l + '%';
      b.style.width = ww + 'px';
      b.style.height = '60px';
      b.style.opacity = String(o);
      clouds.appendChild(b);
    });
    layers.push(clouds);
  }

  // Insert layers at the start so content above stays interactive.
  for (let i = layers.length - 1; i >= 0; i--) host.prepend(layers[i]);

  return { phase: phaseKey, weather, phaseDef: p, weatherDef: w, greet: greetFromHour(new Date().getHours()) };
}

// Current weather for the signed-in user. Hits /me/weather → Open-Meteo.
async function fetchUserWeather() {
  try {
    const r = await api('/me/weather');
    if (!r || r.weather_code == null) return null;
    const weather = wmoToWeather(Number(r.weather_code));
    return { temp: r.temperature != null ? Math.round(r.temperature) : null, weather, label: WEATHER[weather].label };
  } catch (_) {
    return null;
  }
}
