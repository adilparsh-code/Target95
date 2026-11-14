# Staging Firebase for Preview testing (target95-staging)

Goal: let the Preview deployment authenticate and write attempts/results **without touching
Production Firebase**. Production deployment keeps Production Firebase; Preview deployments
use the `target95-staging` project. Nothing in this document has been executed against
Firebase yet: the project does not exist until you create it (section 3). Status is tracked
in `EXECUTION_CHECKPOINT.md`.

## 1. Audit of the current code (facts, not assumptions)

| Area | Where | Finding |
|---|---|---|
| Client init | `src/app/lib/firebase.js` | Reads six `NEXT_PUBLIC_FIREBASE_*` values from the environment; `isFirebaseConfigured` is false if any is missing, so a Preview without them runs signed-out only. Values are inlined at build time, so a **redeploy is required** after changing them. |
| Admin init | `src/app/lib/firebase-admin.js` | Single secret `FIREBASE_SERVICE_ACCOUNT` (the whole service-account JSON). Missing/invalid JSON throws; callers return 503 (this is the 503 seen on the current Preview). |
| Auth | `api/auth/session` | Email/Password sign-in client-side, then the ID token is exchanged for a 7-day `session` cookie. Requires `email_verified === true` AND an active profile `users/{uid}` (`status == "active"`, `disabled == false`). Test accounts therefore need a verified email and a profile document: the seed script creates both. |
| Firestore (server) | `getAdminDb()` | Attempts: `users/{uid}/mockAttempts/{id}`; results: `results/{attemptId}`; profile: `users/{uid}`. All server writes use the Admin SDK (rules do not apply to it). |
| Security rules | `firestore.rules` (deployed with `firebase.json`) | Students may read their own `mockAttempts`/`results`; **no** client writes to attempts or results; students cannot change `status`/`role`. `scripts/staging-verify.mjs` tests exactly these. |
| Indexes | `firestore.indexes.json` | Deploy with the rules. |
| Project mapping | no `.firebaserc` | Always pass `--project target95-staging` explicitly. |

### Required staging variables (exact list)

| Variable | Vercel scope | Secret? | Source |
|---|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Preview, branch `feat/content-engine-mocktest` | no (public web config) | Firebase web app config |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | same | no | `target95-staging.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | same | no | `target95-staging` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | same | no | web app config |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | same | no | web app config |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | same | no | web app config |
| `FIREBASE_SERVICE_ACCOUNT` | same | **yes, mark Sensitive** | staging service-account JSON |
| `MOCKTEST_CE_CATEGORIES` | already set: Preview + that branch = `icse-class-10` | no | done |

Not needed for this test: `OPENAI_API_KEY`, blog/cron secrets, `TARGET95_ADMIN_*`.

Observation (not changed): the Production environment list contains only the six
`NEXT_PUBLIC_FIREBASE_*` variables and **no** `FIREBASE_SERVICE_ACCOUNT`. Either Production
server auth is supplied another way (for example a team-level shared variable) or Production
session validation currently returns 503 as Preview does. Worth checking in the Vercel
dashboard; it is outside this task and was not touched.

## 2. Staging architecture

- Production deployment -> Production-scoped variables -> Production Firebase (unchanged).
- Preview deployment of `feat/content-engine-mocktest` -> Preview + branch-scoped variables -> `target95-staging` only. Other Preview branches get no Firebase config (signed-out only), which is the safe default.
- No code change is needed for the split: the app already reads everything from the environment. Safety is enforced by `scripts/lib/stagingGuard.mjs`: the staging scripts refuse to run unless the service account (`project_id`, `client_email`) and the client config (project id, auth domain, bucket) all say `target95-staging`. A production credential fails closed and is never echoed (`test/staging-guard.test.mjs`).
- Test data lives only in staging; the credentials file is outside the repo and `.gitignore` blocks `.env.staging*`, `*service-account*.json`, `test-accounts.json`.

## 3. Manual Firebase steps (needs your Google account; none of it has been done)

1. **Create the project.** console.firebase.google.com -> Add project -> name `target95-staging`. The project **ID must be exactly `target95-staging`** (IDs are globally unique; if it is taken, Firebase appends digits: tell me the real ID and I will update `STAGING_PROJECT_ID` in the guard). Turn Google Analytics off.
2. **Email/Password sign-in.** Build -> Authentication -> Get started -> Sign-in method -> Email/Password -> Enable (leave "Email link" off).
3. **Firestore.** Build -> Firestore Database -> Create database -> Standard edition, a location near your students, **Production mode** (locked; the rules below open only what is needed).
4. **Authorized domains.** Authentication -> Settings -> Authorized domains -> Add domain: `target95-git-feat-content-engine-mocktest-my-self18.vercel.app` (the stable branch alias; Firebase does not accept wildcards).
5. **Web app config.** Project settings -> General -> Your apps -> add a Web app `target95-staging-web` -> copy the six config values (not secrets).
6. **Service account.** Project settings -> Service accounts -> Generate new private key. Save the JSON **outside the repo**, for example `~/.target95-staging/service-account.json`, then `chmod 600` it. Do not paste it into chat, Git or tickets.
7. **Deploy rules and indexes** (from a checkout of this branch on your machine):
   `npx firebase-tools login`
   `npx firebase-tools deploy --only firestore:rules,firestore:indexes --project target95-staging`

## 4. Vercel configuration

In Vercel -> project `target95` -> Settings -> Environment Variables, add the seven Firebase variables from section 1 with **Environments: Preview only** and **Git Branch: `feat/content-engine-mocktest`**. Paste the service-account JSON only into the Vercel form (mark it Sensitive). Never tick Production or Development.
Then tell me. I will (a) list variable names and scopes (no values), (b) confirm Production gained nothing and still has no `MOCKTEST_CE_CATEGORIES`, (c) redeploy the approved commit, and (d) check the Preview bundle embeds `target95-staging` and no other project id.

## 5. Test accounts

Two dedicated students, both ICSE Class 10, verified email, active profile:
- `icseX`: main smoke-test account.
- `retry`: second account for failure/retry and cross-account access checks.

Create them on your machine (passwords are generated, stored only in `~/.target95-staging/test-accounts.json` with mode 0600, and never printed):

```
export STAGING_SERVICE_ACCOUNT_FILE=~/.target95-staging/service-account.json
npm ci
npm run staging:seed
```

## 6. Verification

Create `~/.target95-staging/env.sh` containing `export NEXT_PUBLIC_FIREBASE_...=...` for the six client values (outside the repo), then:

```
. ~/.target95-staging/env.sh
npm run staging:verify
```

It prints PASS/FAIL for: Admin SDK on the staging project, Auth reachable, Firestore write/read/delete, both profiles active, emails verified, client sign-in, and the security rules (signed-out denied; student reads own data; cannot read the other student; cannot change status or role; cannot create results or attempts). "No production data access" is enforced by the guard (every identifier must be the staging project) rather than by observation.

## 7. Preview smoke test (12 checks) - run in the browser

Open the Preview through the Vercel share link, sign in as `icseX`, keep DevTools -> Network open. Record the evidence next to each row.

| # | Check | How | Pass when | Evidence |
|---|---|---|---|---|
| 1 | ICSE X questions load | Mock Test -> ICSE, Class 10 -> start | `GET /api/mock-tests/availability` shows `contentEnabled: true`; test opens with questions | screenshot + response |
| 2 | Only eligible questions | `POST /api/mock-tests/attempts` response | content-engine ids are `ce:` with type `mcq`/`true-false` only; no output/free-text; true/false options exactly True/False | response excerpt |
| 3 | No keys before submission | same response + `GET .../attempts/{id}` | no `answer`, `explanation`, `correct*`, `answerIndex` keys anywhere | search of response |
| 4 | Navigation | Next/Previous/navigator | each jump shows the right question; answers stay | screenshot |
| 5 | Draft recovery | answer 3, reload | same questions, same order, answers restored | before/after |
| 6 | Failed submit + retry | DevTools Offline -> Submit | visible error and "Retry Submit"; online -> retry succeeds; one result doc | screenshot + Firestore |
| 7 | Server grading | answer a known mix (use repo answers) | score equals hand-computed | calc + result |
| 8 | Result page | after submit | score matches `results/{attemptId}` in Firestore | screenshot |
| 9 | Duplicate submission | replay the submit request (Copy as fetch) | `replay: true`, same score, still one result doc | response |
| 10 | Late submission | exam mode, duration 1 min, wait > 3 min, submit | graded, `lateSubmission: true`, time capped, notice shown | result doc |
| 11 | Global search mid-attempt | open search, type a term | only the answer-free index chunk loads; no `explanation`/`answer` text in any response | network list |
| 12 | Legacy-only config | choose ICSE Class 9 (flag off for IX) or CBSE | only numeric legacy ids; test grades normally | response |

Any check you cannot complete stays BLOCKED, not PASS.
