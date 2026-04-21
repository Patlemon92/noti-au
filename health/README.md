# Noti Health — web app

Six-surface progressive web app. Deploys to Cloudflare Pages. Talks to `noti-health-api` worker.

## File layout

```
noti-health-web/
├── _redirects              ← clean URL routing (e.g. /checkin/:id → /checkin.html?session=:id)
├── index.html              ← landing, redirects by auth state
├── login.html              ← SMS OTP login
├── home.html               ← time-of-day home screen
├── checkin.html            ← one-question-at-a-time check-in flow
├── alys.html               ← chat with Alys
├── record.html             ← self-understanding surface (patterns, stats)
├── export.html             ← configurable PDF export picker
├── profile.html            ← settings, check-in times, template tags
└── manifest-health.json    ← PWA manifest (install-to-home-screen)
```

## Setup

1. Deploy to Cloudflare Pages as its own project, or add these files to the existing noti.au Pages project.
2. Update the `API` constant at the top of each HTML file to point at your deployed `noti-health-api` worker URL (typically `https://noti-health-api.ancient-bread-01fe.workers.dev`).
3. If deploying alongside the Trade app, merge the `_redirects` file contents into Trade's existing `_redirects`.

## API endpoints the frontend expects

All endpoints are on the `noti-health-api` worker. Auth is a Bearer token from `/auth/verify`, stored in `localStorage.noti_token`.

### Public
- `POST /auth/code`    → `{ phone } → { success }`
- `POST /auth/verify`  → `{ phone, code } → { success, token, user }`
- `GET  /session/:id`  → `{ slot, sections, user: { name } }`
- `POST /session/:id/answer`    → `{ key, value }`
- `POST /session/:id/complete`  → `{ done, reply }`

### Authenticated (`Authorization: Bearer <token>`)
- `GET  /me`                     → `{ id, name, phone, morningTime, eveningTime, onboarded, templates }`
- `GET  /me/checkins?days=30`    → `{ checkins: [{ slot, completed_at, answers }] }`
- `GET  /me/patterns?days=30`    → `{ patterns, weekly, headaches, free_text }`
- `GET  /me/messages?limit=50`   → `{ messages: [{ direction, body, mode, created_at }] }`
- `POST /me/message`             → `{ body }`
- `POST /me/schedule`            → `{ morningTime, eveningTime }`
- `POST /me/templates`           → `{ enabled: [...] }`
- `POST /me/start-checkin`       → `{ slot } → { sessionId }`   *(home page uses this)*
- `POST /me/export`              → `{ days, recipient, note, sections } → { url }`

Some of these (`/me/schedule`, `/me/templates`, `/me/start-checkin`, `/me/export`) are frontend-facing but not yet implemented in the worker — they'll need to be added to `src/workers/api.js`. See the matching comments in the worker code.

## Design language notes

- **Colours are time-of-day aware on home and checkin**. The page applies a class (`t-midday`, `t-evening`, `t-night`) based on local hour, which swaps the `--bg`, `--ink`, `--cta` CSS variables. Record, profile, and export stay on the calm cream palette regardless of time.
- **Font**: Inter for UI, Crimson Pro italic for serif accents (patient voice on the PDF preview).
- **Espresso (#4A1B0C) is the primary action colour on warm gradients; deep plum (#2C1530) takes over on evening/night.**
- **Coral (#D85A30) is used as a quiet accent — the rule on the PDF cover, the "active" highlight — never as a fill.**

## Known gaps to close later

- The PWA service worker (for offline/push) isn't included — copy Trade's `sw.js` and adapt when you need it.
- The export actually produces a server-rendered HTML URL you can print to PDF; a proper PDF-generation worker is a future task (see spec §7.6).
- Onboarding: a new user is expected to exist in the Users table before they can log in. A proper onboarding flow (phone → first check-in → templates) is not in this bundle.
