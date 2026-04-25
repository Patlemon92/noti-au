// =============================================================
// Noti service worker — handles push notifications
// =============================================================
// Registered by tradie.html and admin.html via:
//   navigator.serviceWorker.register('/sw.js')
//
// This file MUST be served from the root of noti.au so the scope
// covers the whole site. Cloudflare Pages serves it from /sw.js
// when this file lives at the root of the repo.
// =============================================================

const CACHE_VERSION = 'noti-v1';

// Install — activate immediately, don't wait for tabs to close
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Activate — take control of all clients right away
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Receive a push from the server
self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (e) {
    payload = {
      title: 'Noti',
      body: event.data ? event.data.text() : 'New job'
    };
  }

  const title = payload.title || 'Noti';
  const options = {
    body:    payload.body || '',
    icon:    payload.icon  || '/icon-192.png',
    badge:   payload.badge || '/icon-72.png',
    tag:     payload.tag   || 'noti-default',
    data:    { url: payload.url || 'https://noti.au/tradie' },
    requireInteraction: payload.requireInteraction === true,
    vibrate: payload.vibrate || [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Tap on a notification — focus existing tab or open new one
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || 'https://noti.au/tradie';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      // If a Noti tab is already open, focus it and navigate
      for (const w of wins) {
        if (w.url.includes('noti.au') && 'focus' in w) {
          if ('navigate' in w) {
            try { w.navigate(url); } catch(e) {}
          }
          return w.focus();
        }
      }
      // Otherwise open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});
