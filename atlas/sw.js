/* ============================================================
   The Wellness Atlas — service worker
   Makes the app installable and fully usable offline.
   All paths are relative so it works under any sub-path
   (e.g. https://noti.au/atlas/). Bump CACHE to ship updates.
   ============================================================ */
const CACHE = "atlas-v14";

/* App shell + data, precached on install. Relative to the SW's
   own location, which is the app's scope root. */
const PRECACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./data/acupressure.js",
  "./data/oils.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", (event) => {
  // {cache: 'reload'} is the load-bearing detail here. The default
  // c.addAll() goes through the HTTP cache, and Cloudflare Pages serves
  // assets with Cache-Control: public, max-age=14400 — so the BROWSER
  // cache layer can return stale app.js/styles.css to the SW install,
  // which then stores them under the NEW cache name. Bumping CACHE
  // doesn't help because the browser is still handing back yesterday's
  // bytes. Forcing reload bypasses every cache layer above us and goes
  // straight to the network for the precache fetch.
  event.waitUntil(
    caches.open(CACHE)
      .then((c) =>
        Promise.all(PRECACHE.map((u) =>
          fetch(new Request(u, { cache: "reload" }))
            .then((res) => (res && res.ok) ? c.put(u, res) : null)
            .catch(() => null)
        ))
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
  // The page footer's "refresh" button talks to the SW with these
  // two messages. getVersion lets the button stamp its own label
  // dynamically; clearCache nukes every Atlas cache so the next
  // reload re-precaches with the freshly-deployed shell.
  if (event.data === "getVersion") {
    event.source && event.source.postMessage &&
      event.source.postMessage({ type: "version", cache: CACHE });
  }
  if (event.data === "clearCache") {
    event.waitUntil(
      caches.keys()
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .then(() => {
          if (event.source && event.source.postMessage) {
            event.source.postMessage({ type: "cleared" });
          }
        })
    );
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  /* Navigations: network-first so the app stays fresh online,
     fall back to the cached shell when offline. */
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  /* Google Fonts: cache-first, then refresh in the background. */
  if (FONT_HOSTS.indexOf(url.hostname) !== -1) {
    event.respondWith(
      caches.open(CACHE).then((c) =>
        c.match(req).then((hit) => {
          const net = fetch(req).then((res) => {
            if (res && res.status === 200) c.put(req, res.clone());
            return res;
          }).catch(() => hit);
          return hit || net;
        })
      )
    );
    return;
  }

  /* Same-origin assets: stale-while-revalidate. Hit the cache for
     a fast paint, then always fire a background fetch that updates
     the cache for the next navigation. The previous cache-first
     impl trapped users on stale app.js whenever we shipped — the
     new HTML would land (navigations are network-first) but its
     <script src="app.js"> kept resolving to the cached copy, so
     UI updates never reached them without a manual cache clear.
     SWR fixes that without sacrificing offline use. */
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE).then((c) =>
        c.match(req).then((hit) => {
          const net = fetch(req).then((res) => {
            if (res && res.status === 200 && res.type === "basic") {
              c.put(req, res.clone());
            }
            return res;
          }).catch(() => hit);
          return hit || net;
        })
      )
    );
  }
});
