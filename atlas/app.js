/* ============================================================
   The Wellness Atlas — app logic
   Reads window.ACUPRESSURE and window.OILS (loaded before this file).
   ============================================================ */
(function () {
  "use strict";

  /* ---- meridian config: code -> name / element / colour ---- */
  var MERIDIANS = {
    LU: { name: "Lung",            element: "Metal", color: "#9aa6ad" },
    LI: { name: "Large Intestine", element: "Metal", color: "#b8924a" },
    ST: { name: "Stomach",         element: "Earth", color: "#c79a3c" },
    SP: { name: "Spleen",          element: "Earth", color: "#caa247" },
    HT: { name: "Heart",           element: "Fire",  color: "#a8392a" },
    SI: { name: "Small Intestine", element: "Fire",  color: "#c25b48" },
    BL: { name: "Bladder",         element: "Water", color: "#3f6b54" },
    KI: { name: "Kidney",          element: "Water", color: "#2c4d3c" },
    PC: { name: "Pericardium",     element: "Fire",  color: "#b94a3a" },
    TE: { name: "Triple Burner",   element: "Fire",  color: "#bd6a4e" },
    GB: { name: "Gallbladder",     element: "Wood",  color: "#6b8e3d" },
    LV: { name: "Liver",           element: "Wood",  color: "#557a36" },
    CV: { name: "Conception Vessel", element: "Ren", color: "#8a6d3b" },
    GV: { name: "Governing Vessel",  element: "Du",  color: "#7a5c2e" },
    EX: { name: "Extra Points",      element: "",    color: "#7d6a98" }
  };
  var MERIDIAN_ORDER = ["LU","LI","ST","SP","HT","SI","BL","KI","PC","TE","GB","LV","CV","GV","EX"];

  /* ---- chakra config: key -> name / colour ---- */
  var CHAKRAS = {
    root:     { name: "Root",         color: "#b0413e" },
    sacral:   { name: "Sacral",       color: "#d97a34" },
    solar:    { name: "Solar Plexus", color: "#c79a3c" },
    heart:    { name: "Heart",        color: "#4a8a5a" },
    throat:   { name: "Throat",       color: "#3f7fa0" },
    thirdeye: { name: "Third Eye",    color: "#4b4f9b" },
    crown:    { name: "Crown",        color: "#7d6a98" }
  };
  var CHAKRA_ORDER = ["root","sacral","solar","heart","throat","thirdeye","crown"];

  /* ---- body-map markers: point code -> view / position / side ----
     x,y are coordinates on a 200 x 470 schematic figure. s:"both"
     mirrors the dot to the other side; s:"mid" is a single midline dot. */
  var POINT_MAP = [
    /* front */
    { c: "EX-HN 3", v: "front", x: 100, y: 36,  s: "mid"  },
    { c: "EX-HN 5", v: "front", x: 74,  y: 44,  s: "both" },
    { c: "BL 2",    v: "front", x: 90,  y: 40,  s: "both" },
    { c: "GB 14",   v: "front", x: 84,  y: 38,  s: "both" },
    { c: "ST 2",    v: "front", x: 88,  y: 52,  s: "both" },
    { c: "LI 20",   v: "front", x: 92,  y: 58,  s: "both" },
    { c: "GV 26",   v: "front", x: 100, y: 68,  s: "mid"  },
    { c: "ST 6",    v: "front", x: 80,  y: 72,  s: "both" },
    { c: "CV 22",   v: "front", x: 100, y: 100, s: "mid"  },
    { c: "ST 9",    v: "front", x: 92,  y: 92,  s: "both" },
    { c: "KI 27",   v: "front", x: 90,  y: 112, s: "both" },
    { c: "LU 1",    v: "front", x: 66,  y: 120, s: "both" },
    { c: "CV 17",   v: "front", x: 100, y: 140, s: "mid"  },
    { c: "LV 14",   v: "front", x: 84,  y: 150, s: "both" },
    { c: "CV 12",   v: "front", x: 100, y: 170, s: "mid"  },
    { c: "SP 15",   v: "front", x: 82,  y: 188, s: "both" },
    { c: "ST 25",   v: "front", x: 88,  y: 190, s: "both" },
    { c: "CV 6",    v: "front", x: 100, y: 205, s: "mid"  },
    { c: "CV 4",    v: "front", x: 100, y: 220, s: "mid"  },
    { c: "LU 5",    v: "front", x: 52,  y: 205, s: "both" },
    { c: "PC 3",    v: "front", x: 56,  y: 206, s: "both" },
    { c: "PC 6",    v: "front", x: 52,  y: 232, s: "both" },
    { c: "LU 9",    v: "front", x: 46,  y: 250, s: "both" },
    { c: "LU 7",    v: "front", x: 49,  y: 252, s: "both" },
    { c: "HT 7",    v: "front", x: 43,  y: 254, s: "both" },
    { c: "LI 4",    v: "front", x: 44,  y: 283, s: "both" },
    { c: "PC 8",    v: "front", x: 48,  y: 287, s: "both" },
    { c: "SP 10",   v: "front", x: 92,  y: 300, s: "both" },
    { c: "SP 9",    v: "front", x: 92,  y: 335, s: "both" },
    { c: "ST 36",   v: "front", x: 86,  y: 345, s: "both" },
    { c: "GB 34",   v: "front", x: 80,  y: 345, s: "both" },
    { c: "SP 6",    v: "front", x: 90,  y: 415, s: "both" },
    { c: "LV 3",    v: "front", x: 86,  y: 444, s: "both" },
    { c: "ST 44",   v: "front", x: 90,  y: 448, s: "both" },
    /* back */
    { c: "GV 20",   v: "back",  x: 100, y: 22,  s: "mid"  },
    { c: "GB 20",   v: "back",  x: 88,  y: 52,  s: "both" },
    { c: "BL 10",   v: "back",  x: 92,  y: 56,  s: "both" },
    { c: "GV 16",   v: "back",  x: 100, y: 60,  s: "mid"  },
    { c: "GV 14",   v: "back",  x: 100, y: 74,  s: "mid"  },
    { c: "GB 21",   v: "back",  x: 76,  y: 100, s: "both" },
    { c: "BL 11",   v: "back",  x: 88,  y: 106, s: "both" },
    { c: "BL 13",   v: "back",  x: 90,  y: 118, s: "both" },
    { c: "SI 11",   v: "back",  x: 80,  y: 126, s: "both" },
    { c: "BL 15",   v: "back",  x: 90,  y: 132, s: "both" },
    { c: "BL 17",   v: "back",  x: 90,  y: 148, s: "both" },
    { c: "BL 18",   v: "back",  x: 90,  y: 164, s: "both" },
    { c: "BL 20",   v: "back",  x: 90,  y: 178, s: "both" },
    { c: "BL 23",   v: "back",  x: 90,  y: 200, s: "both" },
    { c: "GV 4",    v: "back",  x: 100, y: 200, s: "mid"  },
    { c: "BL 25",   v: "back",  x: 90,  y: 214, s: "both" },
    { c: "BL 32",   v: "back",  x: 96,  y: 232, s: "both" },
    { c: "BL 28",   v: "back",  x: 92,  y: 234, s: "both" },
    { c: "GB 30",   v: "back",  x: 78,  y: 252, s: "both" },
    { c: "BL 36",   v: "back",  x: 86,  y: 300, s: "both" },
    { c: "TE 5",    v: "back",  x: 52,  y: 235, s: "both" },
    { c: "SI 3",    v: "back",  x: 40,  y: 283, s: "both" },
    { c: "LI 4",    v: "back",  x: 46,  y: 283, s: "both" },
    { c: "BL 40",   v: "back",  x: 88,  y: 335, s: "both" },
    { c: "BL 57",   v: "back",  x: 88,  y: 382, s: "both" },
    { c: "BL 60",   v: "back",  x: 84,  y: 425, s: "both" },
    { c: "KI 3",    v: "back",  x: 92,  y: 425, s: "both" },
    { c: "BL 67",   v: "back",  x: 84,  y: 448, s: "both" },
    { c: "KI 1",    v: "back",  x: 90,  y: 452, s: "both" }
  ];

  /* ---- state ---- */
  var state = {
    tab: "points", query: "", filter: "all",
    mapView: "front", mapVB: { x: 0, y: 0, w: 200, h: 470 }
  };

  var els = {
    tabs:   document.getElementById("tabs"),
    search: document.getElementById("search"),
    chips:  document.getElementById("chips"),
    count:  document.getElementById("count"),
    grid:   document.getElementById("grid"),
    empty:  document.getElementById("empty"),
    mapView:   document.getElementById("mapView"),
    mapDetail: document.getElementById("mapDetail"),
    addOil:    document.getElementById("addOil"),
    oilModal:  document.getElementById("oilModal")
  };

  /* ---- user-added oils: AI-assisted authoring, saved on the device ----
     AI fill posts {name} to this endpoint and expects an oil object back
     (note, family, chakra[], scent, goodFor, benefit, warning). The endpoint
     is a small Worker that calls the Claude API — set it via
     window.ATLAS_AI_ENDPOINT or by editing the line below. */
  var AI_ENDPOINT = (typeof window !== "undefined" && window.ATLAS_AI_ENDPOINT) ||
                    "https://api.noti.au/atlas/oil";
  // Ask-the-atlas: posts {intention, context:{setting,avoid}} and gets back
  // {points:[], blend:{}, caution, ask_id}. Requires the SMS login token.
  var ASK_ENDPOINT = "https://api.noti.au/atlas/ask";
  var ASK_HISTORY_KEY = "atlas_ask_history";
  function loadAskHistory() {
    try { return JSON.parse(localStorage.getItem(ASK_HISTORY_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function saveAskHistory(arr) {
    try { localStorage.setItem(ASK_HISTORY_KEY, JSON.stringify(arr.slice(0, 20))); }
    catch (e) {}
  }
  var CUSTOM_KEY = "atlas_custom_oils";
  function loadCustomOils() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_KEY) || "[]"); } catch (e) { return []; }
  }
  function saveCustomOils(arr) {
    try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(arr)); } catch (e) {}
  }
  function mergeCustomOils() {
    var custom = loadCustomOils();
    window.OILS = (window.OILS || []).filter(function (o) { return !o.__custom; })
      .concat(custom.map(function (o) { o.__custom = true; return o; }));
    _themesReady = false; // recompute cross-links to include custom oils
  }

  /* ---- helpers ---- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function meridianOf(p) { return MERIDIANS[p.m] || { name: p.m, color: "#b08436" }; }

  /* ---- chip bar (rebuilt per tab) ---- */
  function buildChips() {
    var html = '<button class="chip ' + (state.filter === "all" ? "active" : "") +
               '" data-f="all"' + (state.filter === "all" ? ' style="background:var(--ink)"' : "") +
               ">All</button>";
    if (state.tab === "points" || state.tab === "map") {
      // Same meridian set used on both — the map filters its markers
      // by the chip exactly like the points list filters its cards.
      MERIDIAN_ORDER.forEach(function (code) {
        var m = MERIDIANS[code], on = state.filter === code;
        html += '<button class="chip ' + (on ? "active" : "") + '" data-f="' + code + '"' +
                (on ? ' style="background:' + m.color + '"' : "") + ">" +
                '<span class="dot" style="background:' + m.color + '"></span>' +
                esc(code) + " · " + esc(m.name) + "</button>";
      });
    } else {
      CHAKRA_ORDER.forEach(function (key) {
        var c = CHAKRAS[key], on = state.filter === key;
        html += '<button class="chip ' + (on ? "active" : "") + '" data-f="' + key + '"' +
                (on ? ' style="background:' + c.color + '"' : "") + ">" +
                '<span class="dot" style="background:' + c.color + '"></span>' +
                esc(c.name) + "</button>";
      });
    }
    els.chips.innerHTML = html;
  }

  /* ---- search matching ---- */
  function pointMatches(p, q) {
    if (!q) return true;
    var hay = [p.c, p.p, p.n, meridianOf(p).name, (p.t || []).join(" "),
               p.loc, p.find, p.uses, p.emo, p.spirit].join(" ").toLowerCase();
    return hay.indexOf(q) !== -1;
  }
  function oilMatches(o, q) {
    if (!q) return true;
    var chakraNames = (o.chakra || []).map(function (k) { return CHAKRAS[k] ? CHAKRAS[k].name : k; }).join(" ");
    var hay = [o.name, o.scent, o.family, o.note, o.goodFor, o.benefit, chakraNames]
              .join(" ").toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  /* ---- shared-concern themes: link points <-> oils that help the same things ---- */
  var THEMES = [
    { k: "sleep",       label: "sleep",                kw: ["insomnia", "sleep", "restless"] },
    { k: "anxiety",     label: "anxiety",              kw: ["anxiet", "anxious", "nervous", "panic", "worry"] },
    { k: "stress",      label: "stress & tension",     kw: ["stress", "tension", "overwhelm", "relax"] },
    { k: "grief",       label: "grief & low mood",     kw: ["grief", "sorrow", "sadness", "low mood", "depress", "despair", "melanchol"] },
    { k: "anger",       label: "anger & irritability", kw: ["anger", "irritab", "frustrat", "rage", "resent", "temper"] },
    { k: "focus",       label: "focus & clarity",      kw: ["focus", "clarity", "memory", "concentrat", "fog", "clear-head", "alert"] },
    { k: "headache",    label: "headache",             kw: ["headache", "migraine"] },
    { k: "digestion",   label: "digestion",            kw: ["digest", "bloat", "nausea", "stomach", "indigestion", "appetite", "constipat", "diarrho"] },
    { k: "menstrual",   label: "menstrual & hormonal", kw: ["period", "menstr", "hormon", "menopause", "cramp"] },
    { k: "immunity",    label: "immunity & colds",     kw: ["immun", "cold", "flu", "antimicrobial", "antiviral"] },
    { k: "energy",      label: "energy & fatigue",     kw: ["fatigue", "energ", "exhaust", "vitality", "burnout", "tonic", "stamina"] },
    { k: "circulation", label: "circulation & warmth", kw: ["circulation", "cold hand", "cold limb", "warming", "warmth"] },
    { k: "pain",        label: "aches & pain",         kw: ["pain", "ache", "muscul", "joint", "stiff", "sciatica", "spasm"] },
    { k: "respiratory", label: "breathing",            kw: ["cough", "asthma", "respiratory", "congestion", "breath", "sinus", "wheez"] },
    { k: "skin",        label: "skin",                 kw: ["skin", "eczema", "acne", "blemish", "rash", "itch"] },
    { k: "calm",        label: "calm & grounding",     kw: ["ground", "calm", "settle", "soothe", "tranquil", "peace", "centre", "center"] }
  ];
  var THEME_LABEL = {};
  THEMES.forEach(function (t) { THEME_LABEL[t.k] = t.label; });

  function themeKeysFor(text) {
    var keys = [];
    for (var i = 0; i < THEMES.length; i++) {
      var kw = THEMES[i].kw;
      for (var j = 0; j < kw.length; j++) {
        if (text.indexOf(kw[j]) !== -1) { keys.push(THEMES[i].k); break; }
      }
    }
    return keys;
  }
  var _themesReady = false;
  function buildThemes() {
    if (_themesReady) return;
    (window.OILS || []).forEach(function (o) {
      o.__th = themeKeysFor((o.name + " " + (o.goodFor || "") + " " + (o.benefit || "") + " " + (o.scent || "")).toLowerCase());
    });
    (window.ACUPRESSURE || []).forEach(function (p) {
      p.__th = themeKeysFor((p.n + " " + (p.uses || "") + " " + (p.emo || "") + " " + (p.spirit || "")).toLowerCase());
    });
    _themesReady = true;
  }
  function shared(a, b) { return (a || []).filter(function (k) { return (b || []).indexOf(k) !== -1; }); }

  function relatedOilsFor(p) {
    buildThemes();
    if (!p.__th || !p.__th.length) return [];
    return (window.OILS || []).map(function (o) { return { item: o, sh: shared(p.__th, o.__th) }; })
      .filter(function (x) { return x.sh.length; })
      .sort(function (a, b) { return b.sh.length - a.sh.length; }).slice(0, 3);
  }
  function relatedPointsFor(o) {
    buildThemes();
    if (!o.__th || !o.__th.length) return [];
    return (window.ACUPRESSURE || []).map(function (p) { return { item: p, sh: shared(o.__th, p.__th) }; })
      .filter(function (x) { return x.sh.length; })
      .sort(function (a, b) { return b.sh.length - a.sh.length; }).slice(0, 3);
  }
  function linkSection(title, cls, entries) {
    if (!entries.length) return "";
    var chips = entries.map(function (e) {
      return '<button class="xlink" data-q="' + esc(e.q) + '" title="Shares: ' +
             esc(e.sh.map(function (k) { return THEME_LABEL[k] || k; }).join(", ")) + '">' + esc(e.name) + "</button>";
    }).join("");
    return '<div class="links"><span class="lab ' + cls + '">' + title + "</span>" + chips + "</div>";
  }

  /* ---- card renderers ---- */
  function warnHTML(text) {
    return '<div class="warn"><svg viewBox="0 0 24 24"><path d="M12 2 1 21h22L12 2z"></path>' +
           '<line x1="12" y1="9" x2="12" y2="14"></line><circle cx="12" cy="17.5" r="0.6"></circle></svg>' +
           '<span>' + esc(text) + '</span></div>';
  }
  function block(lab, cls, text) {
    if (!text) return "";
    return '<p class="block"><span class="lab ' + cls + '">' + lab + '</span>' + esc(text) + '</p>';
  }

  function pointCard(p) {
    var m = meridianOf(p);
    var tags = (p.t || []).map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    var loc = '<div class="loc"><span class="lab">Where to find it</span>' + esc(p.loc) +
              (p.find ? '<span class="findcue">' + esc(p.find) + "</span>" : "") + "</div>";
    return '<article class="card" style="--accent:' + m.color + '">' +
             '<span class="code">' + esc(p.c) + "</span>" +
             '<span class="pin">' + esc(p.p) + "</span>" +
             "<h3>" + esc(p.n) + "</h3>" +
             '<div class="meridian">' + esc(m.name) + " channel" +
                (m.element ? " · " + esc(m.element) : "") + "</div>" +
             (tags ? '<div class="tagrow">' + tags + "</div>" : "") +
             loc +
             block("Good for", "uses", p.uses) +
             block("Emotional", "emo", p.emo) +
             block("Spirit", "spirit", p.spirit) +
             (p.warn ? warnHTML(p.warn) : "") +
             linkSection("Pairs with oils", "linkoil", relatedOilsFor(p).map(function (x) {
               return { q: x.item.name, name: x.item.name, sh: x.sh };
             })) +
           "</article>";
  }

  function oilCard(o) {
    var keys = o.chakra || [];
    var accent = keys.length && CHAKRAS[keys[0]] ? CHAKRAS[keys[0]].color : "#b08436";
    var dots = keys.map(function (k) {
      var c = CHAKRAS[k]; if (!c) return "";
      return '<span class="cdot" style="background:' + c.color + '">' + esc(c.name) + "</span>";
    }).join("");
    var noteline = [o.note ? o.note + " note" : "", o.family].filter(Boolean).join(" · ");
    return '<article class="card" style="--accent:' + accent + '">' +
             '<span class="code">' + esc(o.family || "Oil") + "</span>" +
             "<h3>" + esc(o.name) + "</h3>" +
             (noteline ? '<div class="noteline">' + esc(noteline) + "</div>" : "") +
             (dots ? '<div class="chakras">' + dots + "</div>" : "") +
             block("Scent", "scent", o.scent) +
             block("Good for", "good", o.goodFor) +
             block("Benefit", "benefit", o.benefit) +
             (o.warning ? warnHTML(o.warning) : "") +
             linkSection("Supporting points", "linkpt", relatedPointsFor(o).map(function (x) {
               return { q: x.item.c, name: x.item.c + " · " + x.item.n, sh: x.sh };
             })) +
             (o.__custom ? '<div class="customrow"><span class="custombadge">Added by you</span>' +
               '<button class="oilrm" type="button" data-rm="' + esc(o.name) + '">Remove</button></div>' : "") +
           "</article>";
  }

  /* ---- full-width section header used in combined search ---- */
  function sectionHead(label, n) {
    return '<h2 class="sectionhead">' + esc(label) + " <span>" + n + "</span></h2>";
  }

  /* ---- point lookup by code, for the body map ---- */
  var _idx = null;
  function mapIndex() {
    if (_idx) return _idx;
    _idx = {};
    (window.ACUPRESSURE || []).forEach(function (p) { _idx[p.c] = p; });
    return _idx;
  }

  /* ---- schematic figure (front / back) ---- */
  function figureSVG(view) {
    var s = '<g class="figure">' +
      '<ellipse cx="100" cy="48" rx="23" ry="29"/>' +
      '<path d="M90,74 C90,82 90,88 88,93 L112,93 C110,88 110,82 110,74 Z"/>' +
      '<path d="M72,96 C82,90 118,90 128,96 C140,101 137,150 133,176 C130,198 128,218 126,236 C124,247 114,250 100,250 C86,250 76,247 74,236 C72,218 70,198 67,176 C63,150 60,101 72,96 Z"/>' +
      '<path d="M73,99 C58,103 51,116 50,132 L45,210 C44,232 42,250 41,262 C40,272 44,278 49,277 C54,276 55,268 56,258 L62,200 L70,128 C72,114 80,108 78,103 Z"/>' +
      '<path d="M127,99 C142,103 149,116 150,132 L155,210 C156,232 158,250 159,262 C160,272 156,278 151,277 C146,276 145,268 144,258 L138,200 L130,128 C128,114 120,108 122,103 Z"/>' +
      '<ellipse cx="45" cy="285" rx="8" ry="11"/>' +
      '<ellipse cx="155" cy="285" rx="8" ry="11"/>' +
      '<path d="M76,247 C74,300 76,360 82,418 C84,432 88,438 92,432 C95,372 95,310 96,256 Z"/>' +
      '<path d="M124,247 C126,300 124,360 118,418 C116,432 112,438 108,432 C105,372 105,310 104,256 Z"/>' +
      '<path d="M82,430 C80,444 84,452 92,451 C98,450 96,438 95,431 Z"/>' +
      '<path d="M118,430 C120,444 116,452 108,451 C102,450 104,438 105,431 Z"/>' +
      "</g>";
    if (view === "back") {
      s += '<line class="spine" x1="100" y1="96" x2="100" y2="245"/>' +
           '<path class="hint" d="M84,108 q-6,16 2,30"/><path class="hint" d="M116,108 q6,16 -2,30"/>';
    } else {
      s += '<path class="hint" d="M82,104 Q100,112 118,104"/>';
    }
    return s;
  }

  /* ---- pan & zoom over the figure ----
     Phones: pinch with two pointers, single-pointer drag to pan,
     ~12px deadzone before drag counts so a quick tap on a dot
     doesn't accidentally shove the body (Patrick: "it does move
     around easily"). Desktop keeps wheel-zoom.
     Stage host gets touch-action:none so iOS doesn't try to scroll
     the page during a gesture. */
  var _svg = null, _drag = null, _moved = false;
  var _pts = Object.create(null); // pointerId → {x, y}
  var _pinch = null;              // {dist, vbW, vbH, cx, cy} at pinch start
  var DRAG_DEADZONE = 10;

  function applyVB() {
    if (!_svg) return;
    var v = state.mapVB;
    _svg.setAttribute("viewBox", v.x + " " + v.y + " " + v.w + " " + v.h);
    _svg.classList.toggle("zoom", v.w < 140);
  }
  function clampPan() {
    var v = state.mapVB, m = 24;
    v.x = Math.max(-m, Math.min(200 - v.w + m, v.x));
    v.y = Math.max(-m, Math.min(470 - v.h + m, v.y));
  }
  function zoomMap(factor) {
    var v = state.mapVB, cx = v.x + v.w / 2, cy = v.y + v.h / 2;
    v.w = Math.max(46, Math.min(200, v.w * factor));
    v.h = v.w * (470 / 200);
    v.x = cx - v.w / 2; v.y = cy - v.h / 2;
    clampPan(); applyVB();
  }
  // Zoom around a screen point so what was under the user's fingers
  // stays under them. Maps client-x/y → viewBox space via the SVG's
  // bounding rect, then anchors the new viewBox on that point.
  function zoomAround(factor, sx, sy) {
    if (!_svg) return;
    var rect = _svg.getBoundingClientRect();
    var v = state.mapVB;
    var fx = (sx - rect.left) / rect.width;
    var fy = (sy - rect.top)  / rect.height;
    var ax = v.x + v.w * fx;
    var ay = v.y + v.h * fy;
    var nw = Math.max(46, Math.min(200, v.w * factor));
    var nh = nw * (470 / 200);
    v.w = nw; v.h = nh;
    v.x = ax - nw * fx;
    v.y = ay - nh * fy;
    clampPan(); applyVB();
  }
  function resetMap() { state.mapVB = { x: 0, y: 0, w: 200, h: 470 }; applyVB(); }

  /* Fullscreen toggle — flips a class on the map section so the
     CSS can pin it to the viewport. We keep the bar + body visible
     so you can still pan/pinch + read details inside the fullscreen
     overlay; on small phones this is the only way to actually get
     the figure big enough to tap a point on the foot or hand. */
  function toggleFullscreen() {
    var sec = document.getElementById("mapSection");
    if (!sec) return;
    var on = sec.classList.toggle("fullscreen");
    // Lock body scroll while fullscreen so iOS doesn't bounce.
    document.body.style.overflow = on ? "hidden" : "";
    // Reset the viewBox so the figure fits the new container.
    resetMap();
  }

  /* ---- point info popup, anchored at the tapped marker ---- */
  function hidePopup() {
    var p = document.getElementById("mapPop");
    if (p) p.classList.add("hidden");
  }
  function showPopup(pt) {
    var pop = document.getElementById("mapPop");
    if (!pop) return;
    pop.innerHTML = '<div class="popwrap"><button class="popclose" type="button" aria-label="Close">✕</button>' +
                    '<div class="popcard">' + pointCard(pt) + "</div></div>";
    pop.classList.remove("hidden");
  }

  function _ptList() {
    var out = [];
    for (var k in _pts) out.push(_pts[k]);
    return out;
  }
  function _dist(a, b) {
    var dx = a.x - b.x, dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function _onPointerDown(e) {
    if (!_svg) return;
    // Capture the pointer so we keep receiving moves even if the
    // finger slides off the SVG.
    try { _svg.setPointerCapture(e.pointerId); } catch (_) {}
    _pts[e.pointerId] = { x: e.clientX, y: e.clientY };

    var list = _ptList();
    if (list.length === 2) {
      // Second finger → start pinch. Cache the starting distance and
      // the viewBox so we can scale relative to it.
      var v = state.mapVB;
      _pinch = {
        dist: _dist(list[0], list[1]),
        vbW:  v.w, vbH: v.h,
        cx:   (list[0].x + list[1].x) / 2,
        cy:   (list[0].y + list[1].y) / 2,
      };
      _drag = null;
      _moved = true;
      hidePopup();
    } else if (list.length === 1) {
      // First finger → arm a single-pointer drag, but don't commit
      // until movement crosses the deadzone (lets taps through to
      // the dot click handler).
      _drag = {
        x: e.clientX, y: e.clientY,
        vx: state.mapVB.x, vy: state.mapVB.y,
        rectW: _svg.getBoundingClientRect().width,
      };
      _moved = false;
    }
  }

  function _onPointerMove(e) {
    if (!_svg || !(e.pointerId in _pts)) return;
    _pts[e.pointerId] = { x: e.clientX, y: e.clientY };
    var list = _ptList();

    if (list.length >= 2 && _pinch) {
      var d = _dist(list[0], list[1]);
      if (d <= 0 || _pinch.dist <= 0) return;
      // Pinch ratio < 1 → fingers closer → zoom in (smaller viewBox).
      // Anchor zoom on the pinch midpoint at start so the body grows
      // out from where the fingers are.
      var ratio = _pinch.dist / d;
      var v = state.mapVB;
      var nw = Math.max(46, Math.min(200, _pinch.vbW * ratio));
      var nh = nw * (470 / 200);
      // Use zoomAround so re-pinching across the screen keeps tracking.
      var midX = (list[0].x + list[1].x) / 2;
      var midY = (list[0].y + list[1].y) / 2;
      // Compute factor relative to *current* width so zoomAround
      // produces the same final size whether we got there in one
      // step or many.
      var factor = nw / v.w;
      zoomAround(factor, midX, midY);
      return;
    }

    if (_drag) {
      var dx = e.clientX - _drag.x, dy = e.clientY - _drag.y;
      if (!_moved && (Math.abs(dx) > DRAG_DEADZONE || Math.abs(dy) > DRAG_DEADZONE)) {
        _moved = true;
        hidePopup();
      }
      if (!_moved) return;
      var s = state.mapVB.w / _drag.rectW;
      state.mapVB.x = _drag.vx - dx * s;
      state.mapVB.y = _drag.vy - dy * s;
      clampPan(); applyVB();
    }
  }

  function _onPointerEnd(e) {
    if (e.pointerId in _pts) {
      try { _svg.releasePointerCapture(e.pointerId); } catch (_) {}
      delete _pts[e.pointerId];
    }
    var list = _ptList();
    if (list.length < 2) _pinch = null;
    if (list.length === 0) _drag = null;
  }

  function bindMapStage() {
    _svg = document.getElementById("bodysvg");
    if (!_svg) return;
    applyVB();
    // touch-action:none lets pointer events handle pan/pinch without
    // iOS hijacking them for page scroll or double-tap zoom. Set on
    // the stage parent in styles.css; redundant inline just in case.
    _svg.style.touchAction = "none";
    _svg.addEventListener("pointerdown",   _onPointerDown);
    _svg.addEventListener("pointermove",   _onPointerMove);
    _svg.addEventListener("pointerup",     _onPointerEnd);
    _svg.addEventListener("pointercancel", _onPointerEnd);
    _svg.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoomAround(e.deltaY > 0 ? 1.12 : 0.89, e.clientX, e.clientY);
    }, { passive: false });
  }

  /* ---- ask the atlas: intention → 1–2 points + 2–3 oil blend ----
     One Claude call per ask, gated behind the SMS login token. The
     server logs cost + content to Supabase so we can see who asked
     for what and how much it cost. */
  var _askState = {
    setting: "diffuser",   // diffuser | roll-on | bath | massage | any
    avoid:   {},           // { pregnancy?: true, children?: true, phototoxic?: true }
    busy:    false,
    last:    null,         // last response, kept so a tab-away/back doesn't lose it
    error:   "",
  };

  function renderAsk() {
    els.empty.classList.add("hidden");
    var s = _askState;
    var settings = [
      { k: "diffuser", n: "Diffuser" },
      { k: "roll-on",  n: "Roll-on"  },
      { k: "bath",     n: "Bath"     },
      { k: "massage",  n: "Massage"  },
      { k: "any",      n: "Any"      },
    ];
    var avoids = [
      { k: "phototoxic", n: "Sun-safe"   },
      { k: "pregnancy",  n: "Pregnancy"  },
      { k: "children",   n: "Children"   },
    ];
    var settingChips = settings.map(function (x) {
      return '<button type="button" class="askchip ' + (s.setting === x.k ? "on" : "") +
             '" data-ask-setting="' + x.k + '">' + esc(x.n) + "</button>";
    }).join("");
    var avoidChips = avoids.map(function (x) {
      return '<button type="button" class="askchip ' + (s.avoid[x.k] ? "on" : "") +
             '" data-ask-avoid="' + x.k + '">' + esc(x.n) + "</button>";
    }).join("");

    var history = loadAskHistory();
    var historyHtml = "";
    if (history.length) {
      historyHtml = '<div class="askhist">' +
        '<h3 class="askhisth">Recent</h3>' +
        history.slice(0, 5).map(function (h, i) {
          return '<button type="button" class="askhisti" data-ask-replay="' + i + '">' +
                 '<span class="askhinten">' + esc(h.intention) + "</span>" +
                 '<span class="askhintb">' + esc(h.setting || "any") + "</span></button>";
        }).join("") + "</div>";
    }

    els.grid.innerHTML =
      '<section class="askpanel">' +
        '<p class="asklead">Tell the atlas what you\'re sitting with. It will offer a point or two to press, and a small oil blend to mix.</p>' +
        '<div class="askform">' +
          '<label class="asklab" for="askInput">Intention</label>' +
          '<textarea id="askInput" class="askinput" rows="2" maxlength="200" ' +
            'placeholder="settle before sleep · morning heaviness · grief sitting heavy"></textarea>' +
          '<div class="askrow"><span class="asksub">Application</span><div class="askchiprow">' + settingChips + "</div></div>" +
          '<div class="askrow"><span class="asksub">Avoid</span><div class="askchiprow">' + avoidChips + "</div></div>" +
          '<div class="asksubmitrow">' +
            '<button type="button" id="askSubmit" class="asksubmit"' + (s.busy ? " disabled" : "") + ">" +
              (s.busy ? "…" : "Ask the atlas") + "</button>" +
          "</div>" +
          (s.error ? '<p class="askerr">' + esc(s.error) + "</p>" : "") +
        "</div>" +
        '<div id="askResult" class="askresult">' + (s.last ? renderAskCard(s.last) : "") + "</div>" +
        historyHtml +
      "</section>";

    var input = document.getElementById("askInput");
    if (input && !s.busy && !s.last) { try { input.focus(); } catch (e) {} }
  }

  function renderAskCard(r) {
    if (!r) return "";
    var pts = (r.points || []).map(function (p) {
      return '<div class="askpt"><span class="askptc">' + esc(p.code) + "</span>" +
             '<span class="askptn">' + esc(p.name) + "</span>" +
             '<span class="askpti">' + esc(p.instruction || "") + "</span></div>";
    }).join("");
    var blend = r.blend || { oils: [], method: "", total_drops: 0 };
    var oils = (blend.oils || []).map(function (o) {
      return '<div class="askoil">' +
        '<span class="askoild">' + esc(String(o.drops)) + '<small>drops</small></span>' +
        '<span class="askoilm"><span class="askoiln">' + esc(o.name) + "</span>" +
        '<span class="askoilw">' + esc(o.why || "") + "</span></span></div>";
    }).join("");
    return '<article class="askcardwrap"><div class="askcard">' +
      '<p class="askunderstood">' + esc(r.intention_understood || "") + "</p>" +
      (pts ? '<div class="askseck"><span class="asssecl">Press</span>' + pts + "</div>" : "") +
      (oils ? '<div class="askseck"><span class="asssecl">Blend · ' + esc(blend.method || "") +
             ' · ' + esc(String(blend.total_drops || 0)) + ' drops</span>' + oils + "</div>" : "") +
      (r.caution ? '<p class="askcaution">' + esc(r.caution) + "</p>" : "") +
    "</div></article>";
  }

  function submitAsk() {
    var s = _askState;
    if (s.busy) return;
    var input = document.getElementById("askInput");
    var intention = (input && input.value || "").trim();
    if (!intention) { s.error = "What would you like the atlas to help with?"; renderAsk(); return; }
    var token = "";
    try { token = localStorage.getItem("noti_token") || ""; } catch (e) {}
    if (!token) {
      s.error = "Please sign in again — your session has timed out.";
      renderAsk();
      setTimeout(function () { location.replace("/atlas/login.html"); }, 1200);
      return;
    }
    var avoid = Object.keys(s.avoid).filter(function (k) { return s.avoid[k]; });
    s.busy = true; s.error = ""; renderAsk();
    fetch(ASK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      body: JSON.stringify({
        intention: intention,
        context: { setting: s.setting === "any" ? null : s.setting, avoid: avoid },
      }),
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        s.busy = false;
        if (!res.ok) {
          s.error = res.body && res.body.error === "unauthorized"
            ? "Please sign in again."
            : "The atlas couldn't answer just now. Try again in a moment.";
          renderAsk(); return;
        }
        s.last = res.body;
        // Save to local history for the recent strip.
        var h = loadAskHistory();
        h.unshift({
          intention: intention,
          setting:   s.setting === "any" ? "" : s.setting,
          avoid:     avoid,
          response:  res.body,
          ts:        Date.now(),
        });
        saveAskHistory(h);
        renderAsk();
      })
      .catch(function (e) {
        s.busy = false;
        s.error = "Network issue — try again.";
        renderAsk();
      });
  }

  function renderMap() {
    els.empty.classList.add("hidden");
    var view = state.mapView, dict = mapIndex();

    // Meridian chip applies to the map too. "all" passes everything;
    // anything else narrows to markers whose point belongs to that
    // meridian. The other markers stay visible but dimmed so the
    // body still reads as a body, not a sparse field of dots.
    var activeMer = state.filter;
    var markers = POINT_MAP.filter(function (m) { return m.v === view; }).map(function (m) {
      var pt = dict[m.c];
      if (!pt) return "";
      var color = meridianOf(pt).color;
      var matches = activeMer === "all" || pt.m === activeMer;
      var dimClass = matches ? "" : " dim";
      function dot(cx) {
        return '<g class="mkg' + dimClass + '" data-c="' + esc(m.c) + '">' +
               '<circle class="mkhit" cx="' + cx + '" cy="' + m.y + '" r="6"/>' +
               '<circle class="mk" cx="' + cx + '" cy="' + m.y + '" r="2.8" fill="' + color + '">' +
               "<title>" + esc(m.c) + " · " + esc(pt.n) + "</title></circle>" +
               '<text class="mlabel" x="' + (cx < 100 ? cx - 4.5 : cx + 4.5) + '" y="' + (m.y + 1.6) +
               '" text-anchor="' + (cx < 100 ? "end" : "start") + '">' + esc(m.c) + "</text></g>";
      }
      return m.s === "both" ? dot(m.x) + dot(200 - m.x) : dot(m.x);
    }).join("");

    var present = {};
    POINT_MAP.forEach(function (m) { var pt = dict[m.c]; if (pt) present[pt.m] = 1; });
    var legend = MERIDIAN_ORDER.filter(function (c) { return present[c]; }).map(function (c) {
      return '<span class="lgi"><i style="background:' + MERIDIANS[c].color + '"></i>' + esc(c) + "</span>";
    }).join("");

    state.mapVB = { x: 0, y: 0, w: 200, h: 470 };
    els.mapView.innerHTML =
      '<div class="mapbar">' +
        '<div class="mapToggle">' +
          '<button class="mtg ' + (view === "front" ? "on" : "") + '" data-view="front">Front</button>' +
          '<button class="mtg ' + (view === "back"  ? "on" : "") + '" data-view="back">Back</button>' +
        "</div>" +
        '<div class="zoomctl">' +
          '<button class="zbtn" data-z="out" aria-label="Zoom out">−</button>' +
          '<button class="zbtn" data-z="reset" aria-label="Reset view">⤢</button>' +
          '<button class="zbtn" data-z="in" aria-label="Zoom in">+</button>' +
          '<button class="zbtn" data-z="full" aria-label="Toggle full screen" title="Full screen">⛶</button>' +
        "</div>" +
      "</div>" +
      '<div class="mapstage">' +
        '<svg class="bodysvg" id="bodysvg" viewBox="0 0 200 470" xmlns="http://www.w3.org/2000/svg" aria-label="Acupressure body map">' +
          figureSVG(view) + markers + "</svg>" +
      "</div>" +
      '<p class="maptip">Drag to move · + / − to zoom · tap a point — details open right there</p>' +
      '<div class="legend">' + legend + "</div>" +
      '<div class="mappop hidden" id="mapPop"></div>';
    bindMapStage();
  }

  /* ---- chrome (which bits of the page are visible) ---- */
  function isSearching() { return state.query.trim() !== ""; }

  function syncPanels() {
    var searching = isSearching(), panels = document.querySelectorAll(".tabpanel");
    for (var i = 0; i < panels.length; i++) {
      var show = !searching && panels[i].getAttribute("data-for") === state.tab;
      panels[i].classList.toggle("hidden", !show);
    }
  }

  function applyChrome() {
    var onMap = state.tab === "map" && !isSearching();
    var onAsk = state.tab === "ask" && !isSearching();
    // Chips appear on the map tab (filtering markers) and on the points
    // tab (filtering list). Hidden during search + on the Ask tab where
    // the chip facet doesn't apply.
    els.chips.classList.toggle("hidden", isSearching() || onAsk);
    // The grid is the host for list / map / ask renders — never hide it
    // when the active tab IS one of those, just let renderX paint into it.
    els.grid.classList.toggle("hidden", onMap);
    els.count.classList.toggle("hidden", onMap || onAsk);
    if (els.addOil) els.addOil.classList.toggle("hidden", !(state.tab === "oils" && !isSearching()));
  }

  /* ---- single-dataset list for the active tab ---- */
  function renderList() {
    var q = state.query.trim().toLowerCase(), items, html;
    if (state.tab === "oils") {
      items = (window.OILS || []).filter(function (o) {
        return (state.filter === "all" || (o.chakra || []).indexOf(state.filter) !== -1) && oilMatches(o, q);
      });
      html = items.map(oilCard).join("");
      els.count.textContent = items.length + " of " + (window.OILS || []).length + " oils";
    } else {
      items = (window.ACUPRESSURE || []).filter(function (p) {
        return (state.filter === "all" || p.m === state.filter) && pointMatches(p, q);
      });
      html = items.map(pointCard).join("");
      els.count.textContent = items.length + " of " + (window.ACUPRESSURE || []).length + " points";
    }
    els.grid.innerHTML = html;
    els.empty.classList.toggle("hidden", items.length !== 0);
  }

  /* ---- combined search across BOTH points and oils ---- */
  function renderSearch(q) {
    var pts  = (window.ACUPRESSURE || []).filter(function (p) { return pointMatches(p, q); });
    var oils = (window.OILS || []).filter(function (o) { return oilMatches(o, q); });
    var html = "";
    if (pts.length)  html += sectionHead("Acupressure points", pts.length) + pts.map(pointCard).join("");
    if (oils.length) html += sectionHead("Essential oils", oils.length) + oils.map(oilCard).join("");
    els.grid.innerHTML = html;
    var n = pts.length + oils.length;
    els.empty.classList.toggle("hidden", n !== 0);
    els.count.textContent = n + " result" + (n === 1 ? "" : "s") + " · " + pts.length + " points · " + oils.length + " oils";
  }

  /* ---- render dispatch ---- */
  function render() {
    syncPanels();
    applyChrome();
    var q = state.query.trim().toLowerCase();
    if (q) { renderSearch(q); return; }
    if (state.tab === "map") { renderMap(); return; }
    if (state.tab === "ask") { renderAsk(); return; }
    renderList();
  }

  /* ---- oil authoring modal (AI-assisted) ---- */
  function _v(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
  function _set(id, v) { var el = document.getElementById(id); if (el && v != null) el.value = v; }

  function chakraBoxes() {
    return CHAKRA_ORDER.map(function (k) {
      var c = CHAKRAS[k];
      return '<label class="ckbox"><input type="checkbox" value="' + k + '">' +
             '<i style="background:' + c.color + '"></i>' + esc(c.name) + "</label>";
    }).join("");
  }
  function openOilModal() {
    var m = els.oilModal;
    if (!m) return;
    m.innerHTML =
      '<div class="opanel">' +
        '<button class="popclose" data-x type="button" aria-label="Close">✕</button>' +
        '<h3 class="otitle">Add an essential oil</h3>' +
        '<p class="ohelp">Type a name and let AI fill the details — or enter them yourself. Saved on this device.</p>' +
        '<div class="ofield"><label>Oil name</label>' +
          '<div class="genrow"><input id="oName" type="text" autocomplete="off" placeholder="e.g. Lavender">' +
          '<button id="oGen" class="genbtn" type="button">✨ Generate</button></div></div>' +
        '<div id="oMsg" class="omsg"></div>' +
        '<div class="ogrid2">' +
          '<div class="ofield"><label>Note</label><select id="oNote"><option>Top</option><option>Middle</option><option>Base</option></select></div>' +
          '<div class="ofield"><label>Family</label><input id="oFamily" type="text" placeholder="Floral, Woody…"></div>' +
        "</div>" +
        '<div class="ofield"><label>Chakras</label><div class="ckboxes">' + chakraBoxes() + "</div></div>" +
        '<div class="ofield"><label>Scent</label><textarea id="oScent" rows="2"></textarea></div>' +
        '<div class="ofield"><label>Good for</label><textarea id="oGood" rows="2"></textarea></div>' +
        '<div class="ofield"><label>Benefit · emotional / energetic</label><textarea id="oBenefit" rows="2"></textarea></div>' +
        '<div class="ofield"><label>Warning · optional</label><input id="oWarn" type="text"></div>' +
        '<div class="oactions"><button class="obtn ghost" data-x type="button">Cancel</button>' +
          '<button id="oSave" class="obtn" type="button">Save oil</button></div>' +
      "</div>";
    m.classList.remove("hidden");
    var n = document.getElementById("oName"); if (n) n.focus();
  }
  function closeOilModal() { if (els.oilModal) els.oilModal.classList.add("hidden"); }

  function fillOilForm(d) {
    _set("oNote", d.note); _set("oFamily", d.family); _set("oScent", d.scent);
    _set("oGood", d.goodFor); _set("oBenefit", d.benefit); _set("oWarn", d.warning || "");
    var chs = d.chakra || [], boxes = els.oilModal.querySelectorAll(".ckboxes input");
    for (var i = 0; i < boxes.length; i++) boxes[i].checked = chs.indexOf(boxes[i].value) !== -1;
  }
  function generateOil() {
    var name = _v("oName"), msg = document.getElementById("oMsg"), btn = document.getElementById("oGen");
    if (!name) { msg.textContent = "Enter an oil name first."; return; }
    if (!AI_ENDPOINT) {
      msg.innerHTML = "AI fill isn’t connected yet — fill the fields in by hand, or set up the generator endpoint.";
      return;
    }
    btn.disabled = true; msg.textContent = "Asking AI…";
    fetch(AI_ENDPOINT, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name })
    })
      .then(function (r) { if (!r.ok) throw new Error("bad"); return r.json(); })
      .then(function (d) { fillOilForm(d); msg.textContent = "Filled in — review, then Save."; })
      .catch(function () { msg.textContent = "Couldn’t generate — try again or fill it in manually."; })
      .then(function () { btn.disabled = false; });
  }
  function saveOil() {
    var name = _v("oName"), msg = document.getElementById("oMsg");
    if (!name) { if (msg) msg.textContent = "Give the oil a name."; return; }
    var checked = els.oilModal.querySelectorAll(".ckboxes input:checked"), chakra = [];
    for (var i = 0; i < checked.length; i++) chakra.push(checked[i].value);
    var oil = {
      name: name, note: _v("oNote"), family: _v("oFamily"), chakra: chakra,
      scent: _v("oScent"), goodFor: _v("oGood"), benefit: _v("oBenefit"), __custom: true
    };
    var warn = _v("oWarn"); if (warn) oil.warning = warn;
    var custom = loadCustomOils(); custom.push(oil); saveCustomOils(custom);
    mergeCustomOils();
    closeOilModal();
    state.tab = "oils"; state.query = name;
    if (els.search) els.search.value = name;
    var tabs = els.tabs.querySelectorAll(".tab");
    for (var j = 0; j < tabs.length; j++) tabs[j].classList.toggle("active", tabs[j].getAttribute("data-tab") === "oils");
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function removeCustomOil(name) {
    saveCustomOils(loadCustomOils().filter(function (o) { return o.name !== name; }));
    mergeCustomOils();
    render();
  }

  /* ---- events ---- */
  els.tabs.addEventListener("click", function (e) {
    var btn = e.target.closest(".tab");
    if (!btn) return;
    var tab = btn.getAttribute("data-tab");
    if (tab === state.tab) return;
    // Don't blanket-reset the filter on tab change — map ↔ points
    // share the meridian set so the user's pick should travel with
    // them. Reset only when switching between meridian-set tabs and
    // chakra-set tabs (oils), because the chip vocabulary changes.
    var wasMer = state.tab === "points" || state.tab === "map";
    var nowMer = tab === "points" || tab === "map";
    if (wasMer !== nowMer) state.filter = "all";
    state.tab = tab;
    var all = els.tabs.querySelectorAll(".tab");
    for (var i = 0; i < all.length; i++) all[i].classList.toggle("active", all[i] === btn);
    // Map shares the meridian chips with the points tab, so it
    // needs them rendered too (was: cleared on map enter).
    buildChips();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  els.chips.addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    state.filter = btn.getAttribute("data-f");
    buildChips(); render();
  });

  els.search.addEventListener("input", function (e) {
    state.query = e.target.value;
    render();
  });

  /* ---- cross-links: tap a paired oil / supporting point to look it up ---- */
  document.addEventListener("click", function (e) {
    var rm = e.target.closest(".oilrm");
    if (rm) { removeCustomOil(rm.getAttribute("data-rm")); return; }

    // Ask-the-atlas chips + submit + history replay.
    var sChip = e.target.closest("[data-ask-setting]");
    if (sChip) {
      _askState.setting = sChip.getAttribute("data-ask-setting");
      renderAsk(); return;
    }
    var aChip = e.target.closest("[data-ask-avoid]");
    if (aChip) {
      var k = aChip.getAttribute("data-ask-avoid");
      _askState.avoid[k] = !_askState.avoid[k];
      renderAsk(); return;
    }
    var submit = e.target.closest("#askSubmit");
    if (submit) { submitAsk(); return; }
    var hi = e.target.closest("[data-ask-replay]");
    if (hi) {
      var idx = parseInt(hi.getAttribute("data-ask-replay"), 10) || 0;
      var h = loadAskHistory()[idx];
      if (h) {
        _askState.last = h.response;
        _askState.setting = h.setting || "any";
        _askState.avoid = {};
        (h.avoid || []).forEach(function (a) { _askState.avoid[a] = true; });
        renderAsk();
      }
      return;
    }

    var x = e.target.closest(".xlink");
    if (!x) return;
    els.search.value = x.getAttribute("data-q");
    state.query = x.getAttribute("data-q");
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---- add-an-oil authoring ---- */
  if (els.addOil) els.addOil.addEventListener("click", openOilModal);
  if (els.oilModal) els.oilModal.addEventListener("click", function (e) {
    if (e.target === els.oilModal || e.target.closest("[data-x]")) { closeOilModal(); return; }
    if (e.target.closest("#oGen")) { generateOil(); return; }
    if (e.target.closest("#oSave")) { saveOil(); return; }
  });

  /* ---- body-map interactions: view toggle, region zoom, point taps ---- */
  els.mapView.addEventListener("click", function (e) {
    if (e.target.closest(".popclose") || e.target.id === "mapPop") { hidePopup(); return; }
    var view = e.target.closest(".mtg");
    if (view) { state.mapView = view.getAttribute("data-view"); renderMap(); return; }
    var z = e.target.closest(".zbtn");
    if (z) {
      var k = z.getAttribute("data-z");
      if (k === "in")        zoomMap(0.8);
      else if (k === "out")  zoomMap(1.25);
      else if (k === "full") toggleFullscreen();
      else                   resetMap();
      hidePopup(); return;
    }
    if (_moved) { _moved = false; return; }
    var g = e.target.closest(".mkg");
    if (!g) return;
    var code = g.getAttribute("data-c"), pt = mapIndex()[code];
    if (!pt) return;
    g.parentNode.appendChild(g); // raise above neighbours so it isn't hidden
    var groups = els.mapView.querySelectorAll(".mkg");
    for (var i = 0; i < groups.length; i++) {
      groups[i].classList.toggle("on", groups[i].getAttribute("data-c") === code);
    }
    showPopup(pt);
  });

  /* ---- init ---- */
  mergeCustomOils();
  buildChips();
  render();
})();

/* ============================================================
   Footer refresh button — pulls the live SW cache version into
   its label, taps to drop every cache + reload so the next
   navigation re-precaches the freshly-deployed shell.
   ============================================================ */
(function setupVersionRefresh() {
  var btn = document.getElementById("version-refresh");
  if (!btn || !("serviceWorker" in navigator)) return;

  navigator.serviceWorker.addEventListener("message", function (e) {
    if (!e || !e.data) return;
    if (e.data.type === "version" && e.data.cache) {
      // "atlas-v9" → "atlas v9 · refresh"
      btn.textContent = String(e.data.cache).replace(/^atlas-/, "atlas ") + " · refresh";
    }
    if (e.data.type === "cleared") {
      // Force a navigation rather than location.reload() so the SW
      // intercept goes through the fresh shell path.
      window.location.replace(window.location.pathname);
    }
  });

  navigator.serviceWorker.ready.then(function (reg) {
    var sw = reg.active || reg.waiting || reg.installing;
    if (sw) sw.postMessage("getVersion");
  });

  // Force a navigation past any cached shell. Query-string defeats
  // SWs that match by exact URL; the location.replace navigation
  // gets handled network-first by the SW we ship anyway.
  function hardReload() {
    var url = window.location.pathname + "?fresh=" + Date.now()
              + window.location.hash;
    window.location.replace(url);
  }

  btn.addEventListener("click", function () {
    btn.disabled = true;
    btn.textContent = "refreshing…";

    // Three independent escape paths run in parallel so a stuck SW
    // (e.g. the v7/v8 one without our clearCache handler) can't trap
    // the user. Whichever finishes first triggers the reload via the
    // 'cleared' message; otherwise the safety-net hardReload fires.
    //
    //   A) Ask the controlling SW to clear its caches (only useful
    //      when the SW is recent enough to know the message).
    //   B) Unregister every Atlas SW directly from the page, so the
    //      next navigation has no SW intercepting at all.
    //   C) Delete every cache by name from the page context — works
    //      regardless of SW version.
    var sw = navigator.serviceWorker.controller;
    if (sw) { try { sw.postMessage("clearCache"); } catch (_) {} }

    var unregP = navigator.serviceWorker.getRegistrations
      ? navigator.serviceWorker.getRegistrations().then(function (regs) {
          return Promise.all(regs.map(function (r) {
            try { return r.unregister(); } catch (_) { return null; }
          }));
        }).catch(function () {})
      : Promise.resolve();

    var cacheP = (window.caches && caches.keys)
      ? caches.keys().then(function (keys) {
          return Promise.all(keys.map(function (k) {
            try { return caches.delete(k); } catch (_) { return null; }
          }));
        }).catch(function () {})
      : Promise.resolve();

    Promise.all([unregP, cacheP]).then(hardReload, hardReload);

    // Belt + braces: even if the promises hang for some iOS reason,
    // we reload within 3.5s.
    setTimeout(hardReload, 3500);
  });
})();
