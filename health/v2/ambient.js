// Neeve ambient hero — shared between Today and Sleep.
//
// The treatment ported from NeeveTodayAmbient.jsx / NeeveSleepAmbient.jsx
// (Patrick's design brief, May 2026). Full-bleed gradient that reads
// time-of-day + weather, with a glowing orb + two halo rings as focal
// point. Sleep uses a fixed warm-dawn palette regardless of clock.
//
// All values come from the brief — keep them in sync with the JSX
// references if those evolve.

const PHASES = {
  dawn: {
    label: 'Dawn', greet: 'Good morning',
    grad: `radial-gradient(110% 70% at 50% -8%, #c8a6d0 0%, transparent 52%),
           radial-gradient(120% 78% at 50% 34%, #f0a59c 0%, transparent 60%),
           radial-gradient(130% 60% at 50% 60%, #f6c59b 0%, transparent 62%),
           linear-gradient(180deg, transparent 60%, #f8f1e7 100%)`,
    nodeTop: 210, nodeColor: '#fff1da', textOn: '#fff7f0', moon: false,
  },
  day: {
    label: 'Day', greet: 'Good afternoon',
    grad: `radial-gradient(110% 70% at 50% -12%, #bcd7ea 0%, transparent 50%),
           radial-gradient(120% 80% at 50% 32%, #f3c79f 0%, transparent 58%),
           radial-gradient(130% 62% at 50% 62%, #f6dcbb 0%, transparent 60%),
           linear-gradient(180deg, transparent 60%, #f8f1e7 100%)`,
    nodeTop: 150, nodeColor: '#ffffff', textOn: '#5a3f2e', moon: false,
  },
  dusk: {
    label: 'Dusk', greet: 'Good evening',
    grad: `radial-gradient(110% 70% at 50% -8%, #6f5380 0%, transparent 52%),
           radial-gradient(120% 80% at 50% 36%, #de7150 0%, transparent 60%),
           radial-gradient(130% 60% at 50% 60%, #efa45c 0%, transparent 62%),
           linear-gradient(180deg, transparent 60%, #f8f1e7 100%)`,
    nodeTop: 230, nodeColor: '#ffd9a0', textOn: '#fff7f0', moon: false,
  },
  night: {
    label: 'Night', greet: 'Good night',
    grad: `radial-gradient(110% 70% at 50% -10%, #322a47 0%, transparent 55%),
           radial-gradient(120% 80% at 50% 34%, #574367 0%, transparent 60%),
           radial-gradient(130% 62% at 50% 60%, #3a2f4d 0%, transparent 62%),
           linear-gradient(180deg, transparent 60%, #f8f1e7 100%)`,
    nodeTop: 168, nodeColor: '#eef0ff', textOn: '#f3eef7', moon: true,
  },
  // Fixed warm-dawn variant for the Sleep page — "a sunrise after the
  // night, so even a rough night glows warm rather than going cold".
  sleep_dawn: {
    label: 'Sleep', greet: '',
    grad: `radial-gradient(110% 68% at 50% -8%, #f4cda7 0%, transparent 52%),
           radial-gradient(120% 76% at 50% 32%, #d98a6e 0%, transparent 60%),
           radial-gradient(132% 66% at 50% 62%, #875b76 0%, transparent 64%),
           linear-gradient(180deg, transparent 60%, #f8f1e7 100%)`,
    nodeTop: 196, nodeColor: '#ffe7c8', textOn: '#fff7f0', moon: false,
  },
};

const WEATHER = {
  clear:  { label: 'clear',  wash: null,                          nodeScale: 1.0,  nodeDim: 1.0,  particles: null    },
  clouds: { label: 'clouds', wash: 'rgba(190,182,170,.34)',       nodeScale: 1.5,  nodeDim: 0.45, particles: 'cloud' },
  rain:   { label: 'rain',   wash: 'rgba(120,128,140,.42)',       nodeScale: 1.3,  nodeDim: 0.30, particles: 'rain'  },
  fog:    { label: 'fog',    wash: 'rgba(232,226,216,.5)',        nodeScale: 1.8,  nodeDim: 0.25, particles: null    },
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

// Inject the ambient hero CSS once per page load.
function ensureAmbientStyles() {
  if (document.getElementById('ambient-styles')) return;
  const css = `
  /* Host clips the orb + halo rings so the warm box-shadow can't bleed
     down into the content cards below the hero. min-height makes sure
     the halos always have room even when the hero content shrinks
     (e.g. after a check-in is logged and the CTA + lede hide). */
  .amb-host { position: relative; overflow: hidden; min-height: 580px; }
  /* Gradient is a fixed full-viewport background so the warm
     atmosphere extends behind every section of the page, not just
     the hero band. The orb and halo rings stay positioned relative
     to the host so they only appear in the hero area at the top. */
  .amb-grad-fixed {
    position: fixed; inset: 0; z-index: -1; pointer-events: none;
    transition: background 1.2s ease;
  }
  /* Once mountAmbient runs, page body becomes transparent so the
     fixed gradient layer shows through. Tag set on <html>. */
  html[data-amb-on="1"] body { background: transparent !important; }
  .amb-halo-outer {
    position: absolute; left: 50%; transform: translateX(-50%);
    width: 280px; height: 280px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,.4);
    z-index: 0; animation: amb-halo 7s ease-in-out infinite;
  }
  .amb-halo-inner {
    position: absolute; left: 50%; transform: translateX(-50%);
    width: 164px; height: 164px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,.32);
    z-index: 0;
  }
  .amb-core {
    position: absolute; left: 50%; border-radius: 50%; z-index: 1;
    transform: translate(-50%, 0);
    animation: amb-glow 6s ease-in-out infinite;
  }
  /* Text colour on hero content adapts to phase. Warm/dark phases get
     light cream text; day phase gets a warm brown so it reads on the
     more transparent gradient. */
  .ambient-text { color: #fff7f0; transition: color 1s ease; }
  [data-amb-phase="day"] .ambient-text { color: #5a3f2e; }
  [data-amb-phase="day"] .amb-pill { background: rgba(255,255,255,.6); color: #5a3f2e; border-color: rgba(91,63,46,.15); }
  /* Make sure the pill text reads against the chosen background. */
  .amb-pill { color: #fff7f0; }
  .amb-wash { position: absolute; top: 0; left: 0; right: 0; height: 640px; z-index: 1; animation: amb-fade 1s both; }
  .amb-clouds, .amb-rain { position: absolute; left: 0; right: 0; pointer-events: none; }
  .amb-rain { top: 0; height: 480px; z-index: 1; overflow: hidden; }
  .amb-rain span {
    position: absolute; top: -30px; width: 1.5px; height: 22px;
    background: linear-gradient(rgba(255,255,255,.5), transparent);
    animation: amb-raindrop linear infinite;
  }
  .amb-clouds { top: 120px; height: 220px; z-index: 1; }
  .amb-clouds span {
    position: absolute; border-radius: 99px;
    background: rgba(245,240,232,.7); filter: blur(16px);
  }
  .amb-content {
    position: relative; z-index: 2;
    max-width: 440px; margin: 0 auto; padding: 0 22px;
  }
  .amb-pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 14px; border-radius: 99px;
    background: rgba(255,255,255,.22); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,.3); font-size: 12.5px;
  }
  .amb-eyebrow {
    font-size: 12px; letter-spacing: 2.2px; text-transform: uppercase;
    font-weight: 600; opacity: 0.9;
  }
  .amb-title {
    font-family: 'Fraunces', Georgia, serif;
    font-weight: 500; font-size: 56px; letter-spacing: -1px; line-height: 1;
    text-shadow: 0 2px 22px rgba(80,40,30,.28);
  }
  .amb-cta {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 20px; border-radius: 99px; cursor: pointer;
    font-family: inherit; font-size: 14.5px; font-weight: 500;
    color: #fff7f0; background: rgba(255,255,255,.2);
    backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,.3);
  }
  .amb-cta-dark {
    background: #2b2018; color: #fff7f0;
    box-shadow: 0 14px 30px -16px rgba(40,25,15,.7);
    padding: 16px 24px; border: none;
    width: 100%; max-width: 340px;
    font-size: 16px; font-weight: 500;
    border-radius: 99px; cursor: pointer; font-family: inherit;
    text-decoration: none; text-align: center;
  }
  .amb-cta { text-decoration: none; }
  @keyframes amb-glow { 0%,100%{transform:translate(-50%,0) scale(1)} 50%{transform:translate(-50%,-6px) scale(1.05)} }
  @keyframes amb-halo { 0%,100%{opacity:.45} 50%{opacity:.8} }
  @keyframes amb-fade { from{opacity:0} to{opacity:1} }
  @keyframes amb-raindrop { to { transform: translateY(150px); } }
  @keyframes amb-up { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
  .amb-card-anim { animation: amb-up .55s both; }
  `;
  const style = document.createElement('style');
  style.id = 'ambient-styles';
  style.textContent = css;
  document.head.appendChild(style);
}

// Public: mountAmbient({ host, phase?, weather?, coreSize?, height? })
// - host: parent element to inject into (will append the gradient,
//   orb layers, weather wash + particles BEFORE its existing children
//   so content stays interactive on top)
// - phase: override phase key; default = computed from local time
// - weather: override weather key; default = 'clear'
// - coreSize: orb diameter in px; default 56 (Today) / 60 (Sleep)
// - height: hero band height in px (default 640)
function mountAmbient({ host, phase, weather = 'clear', coreSize = 56 }) {
  ensureAmbientStyles();
  if (!host) return null;
  host.classList.add('amb-host');

  const phaseKey = phase || phaseFromHour(new Date().getHours());
  const p = PHASES[phaseKey] || PHASES.day;
  const w = WEATHER[weather] || WEATHER.clear;

  // Tag the host so [data-amb-phase] CSS selectors can adapt text
  // colours and pill background to the active phase. Tag the html
  // element too so the body background can become transparent and
  // reveal the fixed gradient layer.
  host.setAttribute('data-amb-phase', phaseKey);
  document.documentElement.setAttribute('data-amb-on', '1');

  // Strip any prior ambient layers in case this is a re-mount.
  host.querySelectorAll(':scope > .amb-layer').forEach(el => el.remove());

  // Gradient is painted onto a SINGLETON fixed layer that lives at the
  // top of the document — full-viewport, behind everything, persists
  // across page sections instead of being clipped to the hero band.
  let grad = document.getElementById('amb-grad-fixed');
  if (!grad) {
    grad = document.createElement('div');
    grad.id = 'amb-grad-fixed';
    grad.className = 'amb-grad-fixed';
    grad.setAttribute('aria-hidden', 'true');
    document.body.appendChild(grad);
  }
  grad.style.background = p.grad;

  const layers = [];

  // Halo rings.
  const outer = document.createElement('div');
  outer.className = 'amb-halo-outer amb-layer';
  outer.style.top = (p.nodeTop - 110) + 'px';
  outer.style.opacity = (0.3 + 0.4 * w.nodeDim).toString();
  layers.push(outer);

  const inner = document.createElement('div');
  inner.className = 'amb-halo-inner amb-layer';
  inner.style.top = (p.nodeTop - 52) + 'px';
  inner.style.opacity = (0.28 + 0.4 * w.nodeDim).toString();
  layers.push(inner);

  // Core glow.
  const core = document.createElement('div');
  core.className = 'amb-core amb-layer';
  const size = coreSize * (w.nodeScale * 0.45 + 0.55);
  core.style.top = p.nodeTop + 'px';
  core.style.width = size + 'px';
  core.style.height = size + 'px';
  core.style.opacity = (0.55 + 0.45 * w.nodeDim).toString();
  const moonBg = `radial-gradient(circle at 62% 42%, #fff 0%, ${p.nodeColor} 58%, transparent 76%)`;
  const sunBg  = `radial-gradient(circle, #fff 0%, ${p.nodeColor} 60%, transparent 76%)`;
  core.style.background = p.moon ? moonBg : sunBg;
  const shadowColour = p.moon ? 'rgba(220,225,255,.55)' : 'rgba(255,238,210,.72)';
  core.style.boxShadow = `0 0 ${46 * (w.nodeScale * 0.45 + 0.55)}px ${16 * w.nodeDim}px ${shadowColour}`;
  layers.push(core);

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

  // Insert all layers at the start so content above stays interactive.
  for (let i = layers.length - 1; i >= 0; i--) host.prepend(layers[i]);

  return { phase: phaseKey, weather, phaseDef: p, weatherDef: w, greet: greetFromHour(new Date().getHours()) };
}

// Fetch current weather for the user. Hits the new /me/weather worker
// endpoint which uses the user's cached lat/long + Open-Meteo. Returns
// { temp, weather, label } or null on any failure.
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
