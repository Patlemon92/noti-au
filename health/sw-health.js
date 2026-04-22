// =============================================================
// sw-health.js — Noti Health service worker
// Scoped to /health/ so it never touches Trade pages.
// Handles: push events, notification clicks, minimal cache for offline.
// =============================================================

const CACHE_VERSION = 'noti-health-v3';
const SHELL_ASSETS = [
  '/health/login',
  '/health/home',
  '/health/manifest.json'
];

// ── Install: cache the shell so the app is usable offline ─────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

// ── Activate: clean up old caches ─────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: network-first for HTML, cache-first for static assets ─
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Only handle /health/* requests — leave everything else for Trade's SW
  if (!url.pathname.startsWith('/health/')) return;

  // For HTML navigations, network-first (always get latest)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/health/home'))
    );
    return;
  }

  // For everything else, cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// ── Push: display a notification ──────────────────────────────
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: 'Noti', body: event.data?.text() || '' };
  }

  const title = data.title || 'Noti';
  const options = {
    body: data.body || '',
    icon: '/health/icon-192.png',
    badge: '/health/icon-192.png',
    tag: data.tag || 'noti-health',
    data: {
      url: data.url || '/health/home',
      ...data.data
    },
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || [],
    timestamp: Date.now()
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// ── Notification click: open or focus the relevant page ───────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/health/home';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a Noti Health window is already open, focus it and navigate
      for (const client of clientList) {
        if (new URL(client.url).pathname.startsWith('/health/')) {
          client.focus();
          return client.navigate(targetUrl);
        }
      }
      // Otherwise open a new window
      return self.clients.openWindow(targetUrl);
    })
  );
});

// ── Push-subscription-change: browser re-issued our subscription ──
// Happens when the browser rotates keys. We need to re-send to backend.
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil((async () => {
    try {
      const vapidPubKey = await (await fetch('/health/api/push/public-key')).text();
      const newSub = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(vapidPubKey)
      });
      // Re-register with backend — but we don't have auth token in SW context,
      // so post it through any open client
      const clientList = await self.clients.matchAll();
      for (const client of clientList) {
        client.postMessage({ type: 'resubscribe', subscription: newSub.toJSON() });
      }
    } catch (e) {
      console.error('SW: resubscribe failed', e);
    }
  })());
});

function urlB64ToUint8Array(b64) {
  const padding = '='.repeat((4 - b64.length % 4) % 4);
  const base64 = (b64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
