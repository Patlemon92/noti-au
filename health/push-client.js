// =============================================================
// push-client.js — client-side helper for PWA + push notifications
// Include on every page: <script src="/health/push-client.js"></script>
//
// What it does:
//   1. Registers the service worker at /health/sw.js (scoped to /health/)
//   2. Exposes window.NotiPush with: subscribe(), unsubscribe(), status()
//   3. Listens for resubscribe messages from the SW
//
// What it does NOT do:
//   - Does not auto-prompt for permission. Call NotiPush.subscribe() from a
//     UI button after user intent (button click).
// =============================================================

(function() {
  const API = window.__NOTI_API__ || 'https://noti-health-api.ancient-bread-01fe.workers.dev';

  // ── Detect environment ──────────────────────────────────
  const supportsServiceWorker = 'serviceWorker' in navigator;
  const supportsPush          = 'PushManager' in window;
  const isStandalone          = window.matchMedia('(display-mode: standalone)').matches
                             || window.navigator.standalone === true;
  const isIOS                 = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // ── Register SW on page load ────────────────────────────
  if (supportsServiceWorker) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/health/sw.js', { scope: '/health/' })
        .catch((e) => console.warn('SW registration failed:', e));
    });

    // Listen for resubscribe messages
    navigator.serviceWorker.addEventListener('message', async (event) => {
      if (event.data?.type === 'resubscribe' && event.data.subscription) {
        await sendSubscriptionToBackend(event.data.subscription);
      }
    });
  }

  // ── Helpers ─────────────────────────────────────────────
  function urlB64ToUint8Array(b64) {
    const padding = '='.repeat((4 - b64.length % 4) % 4);
    const base64 = (b64 + padding).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  async function getVapidPublicKey() {
    const res = await fetch(API + '/push/public-key');
    if (!res.ok) throw new Error('Could not fetch VAPID key');
    const data = await res.json();
    return data.publicKey;
  }

  async function sendSubscriptionToBackend(subJSON) {
    const token = localStorage.getItem('noti_token');
    if (!token) throw new Error('Not signed in');
    const res = await fetch(API + '/me/push/subscribe', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint: subJSON.endpoint,
        keys:     subJSON.keys,
        platform: detectPlatform(),
        userAgent: navigator.userAgent
      })
    });
    if (!res.ok) throw new Error('Failed to save subscription');
    return res.json();
  }

  function detectPlatform() {
    if (isIOS) return 'ios';
    if (/Android/.test(navigator.userAgent)) return 'android';
    return 'desktop';
  }

  // ── Public API on window.NotiPush ───────────────────────
  window.NotiPush = {
    // Returns: 'unsupported' | 'needs_install' | 'needs_permission' | 'denied' | 'enabled'
    async status() {
      if (!supportsServiceWorker || !supportsPush) return 'unsupported';
      if (isIOS && !isStandalone)                  return 'needs_install';  // iOS: must install first
      const permission = Notification.permission;
      if (permission === 'denied')                 return 'denied';
      if (permission === 'default')                return 'needs_permission';
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      return sub ? 'enabled' : 'needs_permission';
    },

    // Call from a UI button click. Prompts for permission if needed,
    // subscribes, and registers the subscription with the backend.
    async subscribe() {
      if (!supportsServiceWorker || !supportsPush) {
        throw new Error('This browser does not support push.');
      }
      if (isIOS && !isStandalone) {
        throw new Error('On iPhone, add Noti to your home screen first.');
      }

      // Request permission (user gesture required for prompt on some platforms)
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') throw new Error('Permission not granted');

      const reg = await navigator.serviceWorker.ready;

      // Check if already subscribed
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        const vapidKey = await getVapidPublicKey();
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(vapidKey)
        });
      }

      await sendSubscriptionToBackend(sub.toJSON());
      return 'enabled';
    },

    async unsubscribe() {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (!sub) return 'already_unsubscribed';

      await sub.unsubscribe();

      const token = localStorage.getItem('noti_token');
      if (token) {
        await fetch(API + '/me/push/unsubscribe', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: sub.endpoint })
        }).catch(() => {});
      }
      return 'unsubscribed';
    },

    // Convenience
    isStandalone, isIOS, supportsPush
  };
})();
