# Student Bot: Staging Deployment (Vercel Preview + Firebase `target95-staging`)

Status: preparation only. Nothing in this document has been executed. No Firebase deployment, Vercel deployment, Vercel setting change, user creation or real login has been done or verified.

Staging Firebase project (public identifiers, not secrets):

| Item | Value |
| --- | --- |
| Project ID | `target95-staging` |
| Auth domain | `target95-staging.firebaseapp.com` |
| Storage bucket | `target95-staging.firebasestorage.app` |

## Hard rules

- Staging only. Never use production Firebase credentials, project IDs or Vercel Production variables for this work.
- Never paste a service-account JSON or any secret into chat, a ticket, a commit, a log or `.env.example`.
- `.env.local` and every other `.env*` file stay gitignored. Only `.env.example` (placeholders) is committed.
- `.firebaserc` deliberately has no default project. Every Firebase CLI command must say `--project target95-staging`.

## Safeguards built into the code

| Safeguard | Where | Behaviour |
| --- | --- | --- |
| Project consistency | `src/lib/firebaseProjectCheck.mjs`, called from `src/app/lib/firebase-admin.js` | Admin SDK refuses to start if `NEXT_PUBLIC_FIREBASE_PROJECT_ID` is missing, the service account has no `project_id`, or the two differ. Every Admin-backed route then fails closed (login 401, bot 503). |
| Staging lock | same | With `NEXT_PUBLIC_APP_ENV=staging` the project must be exactly `target95-staging`, even if client and server agree. |
| Non-production = not indexable | `src/lib/siteConfig.mjs`, `src/proxy.js`, `src/app/robots.js`, `src/app/sitemap.js`, `src/app/layout.js` | Any `NEXT_PUBLIC_APP_ENV` other than `production` (or unset), or `VERCEL_ENV` other than `production`, gives `X-Robots-Tag: noindex, nofollow` on every page, `robots.txt` = `Disallow: /`, an empty sitemap, `<meta robots noindex>` and no canonical `Link` header. A mistyped value fails safe (non-indexable). |
| Origin | same | `NEXT_PUBLIC_SITE_URL` (validated bare https origin) drives metadata, Open Graph and blog JSON-LD. Staging never falls back to the production origin. |
| Route protection | `src/proxy.js` | `/student-bot` redirects to `/login?next=/student-bot` without a session cookie. This is a UX gate; every bot API route still authorises on the server. |
| Audit script | `scripts/audit-user-roles.mjs` | Read-only. Allowlist is exactly `["target95-staging"]`; any other project, including production, is refused before any Firebase call. |

## Vercel Preview environment variables (to be entered by the owner)

Scope every variable to **Preview** only. Do not tick Production or Development. This repository does not modify Vercel settings.

| Variable | Value | Secret? |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_ENV` | `staging` | no |
| `NEXT_PUBLIC_SITE_URL` | the stable preview/branch URL, https, no path | no |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `target95-staging` | no |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `target95-staging.firebaseapp.com` | no |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `target95-staging.firebasestorage.app` | no |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | from Firebase console (staging web app) | no, but do not commit |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | from Firebase console | no |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | from Firebase console | no |
| `FIREBASE_SERVICE_ACCOUNT` | staging service-account JSON, one line | **yes, mark Sensitive** |

Leave unset on staging: `OPENAI_API_KEY`, `BLOG_*`, `CRON_SECRET`, `TARGET95_ADMIN_*` (unless an admin test user is needed). The bot works without AI and labels replies as deterministic.

Notes:

- `NEXT_PUBLIC_*` values are inlined at **build** time. After changing any of them, redeploy; a running deployment keeps the old values.
- All six `NEXT_PUBLIC_FIREBASE_*` values are required, including the storage bucket (nothing uses Storage, but the client disables Firebase if it is empty).
- `vercel.json` defines a cron (`/api/blog/scheduler`). Crons run only on Production deployments, so Preview does not run it. Confirm this in the Vercel dashboard before relying on it.
- `VERCEL_ENV` is provided by Vercel automatically; do not set it by hand. Keep "Automatically expose System Environment Variables" enabled so the non-production check has a second signal.
- Protect the preview with Vercel Deployment Protection (or equivalent). `noindex` stops search engines, not visitors.

## Firebase console prerequisites (project `target95-staging`)

1. Register a Web app and copy `apiKey`, `messagingSenderId`, `appId`.
2. Authentication: enable Email/Password (and Google if used). Add the preview domain under Authorized domains.
3. Firestore: create the database in Native mode.
4. Create a service-account key for staging only; store it only in Vercel (Sensitive) or a gitignored local file.
5. Deploy rules and indexes to staging only, after the owner approves (see below).

## Commands that need explicit owner approval (none have been run)

```bash
# Always explicit; never rely on a default project.
npx firebase-tools@14 deploy --only firestore:rules,firestore:indexes --project target95-staging
```

Do not run these against any other project.

## Local run against staging

```bash
cp .env.example .env.local      # then fill in real staging values, locally only
npm run dev
```

`secure` session cookies are only set when `NODE_ENV=production`, so `next dev` over http works. A production build served over plain http on Safari may not keep the cookie; use the https preview instead.

## Test accounts (not created)

Profiles are created by the app on registration (`role: "student"`). A teacher or admin test user needs its role set server-side (the rules forbid clients from setting their own role), for example through `/api/auth/admin/bootstrap` with `TARGET95_ADMIN_BOOTSTRAP_SECRET` and `TARGET95_ADMIN_EMAIL` set for staging. Nothing here creates or edits profiles.

## Audit the role data on staging (read-only)

```bash
FIREBASE_SERVICE_ACCOUNT="$(cat /path/to/staging-key.json)" \
  node scripts/audit-user-roles.mjs --expect-project target95-staging
```

Prints aggregate counts and the verified project ID. `--list` additionally prints UIDs of active accounts whose role is missing or unknown; UIDs are sensitive, keep that output private.

## Known issue: Next.js security advisory and flaky builds

- `package.json` allows `next ^16.4.3` and 16.4.3 is installed. During `npm run build`, Next.js runs an advisory check against the npm registry and reports: `SecurityFatalError: Your version of Next.js is affected by a known security vulnerability`.
- Observed on 2026-11-19: compile and prerender completed every time, but the process exited 1 on 3 of 4 default builds and 0 on the 4th (a staging-mode build also exited 0). The exit status is therefore not deterministic, and a green build exit is not proof the advisory is resolved.
- This is independent of the staging changes: it depends on the installed Next.js version and the registry response.
- This branch does **not** upgrade Next.js or any dependency. Upgrading (and re-running the full test and build suite) is a separate, reviewed change that should be done before this is promoted beyond Preview. A Vercel Preview build may fail for the same reason; if so, retry once and record the outcome rather than assuming success.

## Verification status

| Check | Status |
| --- | --- |
| Unit tests, lint, typecheck, build | see the implementation report |
| Admin/client project mismatch refused | unit-tested only |
| Real Firebase connection with `target95-staging` | **NOT RUN** |
| Real login (student, teacher, admin, inactive) | **NOT RUN** (`REAL_LOGIN_TEST_CHECKLIST.md`) |
| Firestore rules emulator tests (`npm run test:rules`) | **NOT RUN** |
| Rules and indexes deployed to staging | **NOT DONE** |
| Vercel Preview deployed | **NOT DONE** |
