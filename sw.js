// =========================
// sw.js — Noti Service Worker
// Handles web push notifications for tradie job alerts.
// Must be served from the root of noti.au
// =========================

self.addEventListener('install', function(e){
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(clients.claim());
});

// Handle incoming push notification
self.addEventListener('push', function(e){
  var data = {};
  try { data = e.data.json(); } catch(err){ data = { title: 'Noti', body: e.data ? e.data.text() : 'New job alert' }; }

  var title   = data.title || 'noti.';
  var options = {
    body:    data.body    || 'A new job is available.',
    icon:    data.icon    || '/icon-192.png',
    badge:   data.badge   || '/icon-72.png',
    tag:     data.tag     || 'noti-job',
    data:    { url: data.url || '/tradie' },
    actions: data.actions || [],
    requireInteraction: true,
    vibrate: [200, 100, 200]
  };

  e.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click — open the job link
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) ? e.notification.data.url : '/tradie';

  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients){
      // If dashboard is already open, focus it
      for (var i = 0; i < windowClients.length; i++){
        var client = windowClients[i];
        if (client.url.indexOf('/tradie') !== -1 && 'focus' in client){
          client.navigate(url);
          return client.focus();
        }
      }
      // Otherwise open a new window
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
