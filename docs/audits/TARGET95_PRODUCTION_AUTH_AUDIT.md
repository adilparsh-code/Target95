# Target95 — Production Authentication Audit (P0)

**Audit date:** 2026-11-27
**Scope:** the full sign-in → session-cookie → server-authorization chain, traced in source.
**Constraint:** no production access, no credentials, no environment changes. This document diagnoses from code; it does not claim a production fix.

---

## 1. Reported production symptoms

1. Public curriculum routes work.
2. Login page renders.
3. Authenticated APIs return **503**.
4. Dashboard / practice / mock-test redirect to login.

Two competing hypotheses were recorded previously: a Firebase Admin service-account initialisation failure, and a Firestore profile read/create failure before the session request (raised by PR #112).

## 2. The chain, as implemented

| # | Step | File | Failure mode |
| --- | --- | --- | --- |
| 1 | Firebase client init | `src/app/lib/firebase.js` | `isFirebaseConfigured()` false → login shows a configuration message |
| 2 | Email/password sign-in | `src/context/AuthContext.js` `login` | unverified email → sign out |
| 3 | Google sign-in | `AuthContext.js` `loginWithGoogle` | unverified → sign out |
| 4 | Profile read/create | `AuthContext.js` `buildUser`, `register`, `loginWithGoogle` | **`getDoc`/`setDoc` on `users/{uid}`** |
| 5 | ID token | `firebaseUser.getIdToken()` | — |
| 6 | `POST /api/auth/session` | `src/app/api/auth/session/route.js` | every error → **401** |
| 7 | Admin init | `src/app/lib/firebase-admin.js` | `FIREBASE_SERVICE_ACCOUNT` missing / not JSON → **throws** |
| 8 | Session cookie creation | `route.js` `createSessionCookie` | → 401 |
| 9 | `GET /api/auth/session` | `route.js` `GET` | verify throws → **503** |
| 10 | Server role verification | `src/app/lib/server-auth.js` | throws → caller responds 503 |
| 11 | Dashboard / practice / mock-test | guarded routes | redirect to login |
| 12 | Logout / revocation | `route.js` `DELETE` | swallows revoke errors |

### The decisive asymmetry

`src/app/lib/firebase-admin.js`:

```js
function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT is not configured.");
  try { return JSON.parse(raw); }
  catch { throw new Error("FIREBASE_SERVICE_ACCOUNT is not valid JSON."); }
}
```

`getServiceAccount()` is called from `getAdminApp()`, which is called by **both** `getAdminAuth()` and `getAdminDb()`.

In `GET /api/auth/session`, `getAdminAuth()` and `getAdminDb()` are evaluated inside the `try` that maps **any** error to **503**:

```js
try {
  decodedToken = await verifyActiveSession(sessionCookie, { auth: getAdminAuth(), adminDb: getAdminDb() });
} catch (error) {
  return jsonResponse({ error: "Session validation is temporarily unavailable." }, { status: 503 });
}
```

So a missing or malformed `FIREBASE_SERVICE_ACCOUNT` produces **exactly** the observed 503 on `GET /api/auth/session` and on every guarded API — with no other symptom.

`src/lib/accountStatus.mjs` deliberately re-throws anything that is not a known credential code (`auth/argument-error`, `session-cookie-expired`, `session-cookie-revoked`, `user-disabled`, `user-not-found`). Configuration and network errors propagate, by design, so that an outage never clears a valid cookie.

## 3. Root-cause assessment

| Candidate | Evidence | Verdict |
| --- | --- | --- |
| Missing / invalid `FIREBASE_SERVICE_ACCOUNT` | Reproduces the 503 shape exactly, on every authenticated route, with the login page and public routes unaffected. Code path is unconditional. | **Most probable (primary hypothesis)** |
| Malformed service account JSON only in `private_key` newlines | `JSON.parse` succeeds but `cert()` throws on a doubly escaped `\\n` key — also surfaces as 503 via the same `try`. | **Plausible variant of the same root cause** |
| Wrong Firebase project (client and admin projects differ) | Would produce `auth/invalid-credential` / `argument-error` → mapped to **401**, and a redirect, not a 503. | Inconsistent with the 503 symptom |
| Firestore profile read/create failure before the session request | `buildUser()` is wrapped in `try/catch` in `onAuthStateChanged` and falls back to a minimal user object, so it does **not** block sign-in. `register()` does surface the error, but that yields an inline form error, not a 503. | **Not the cause of the 503**; a real but separate UX issue |
| `cookies()` misuse in route handlers | Would throw at request time and produce 503 on any runtime that lacks it; a real risk on Next 15/16 where `cookies()` is async. | **Secondary risk — must be verified on the deployed runtime** |
| Revoked / expired cookie | Maps to 401 + cookie clear, not 503. | Ruled out |

**Conclusion:** the 503 is a server-side Admin SDK initialisation failure. The single fact that resolves it is whether `FIREBASE_SERVICE_ACCOUNT` exists and parses and yields a usable key in the Vercel production environment. That cannot be checked from this workspace, and must not be printed if it is.

## 4. Secondary defect found while tracing

`src/app/api/auth/session/route.js` `GET` reads the cookie as:

```js
const sessionCookie = request.cookies?.get?.("session")?.value ?? "";
```

while `src/app/lib/server-auth.js` reads it as:

```js
request.cookies.get("session")?.value
```

Two different cookie access idioms across the auth surface. On Next 15/16 `cookies()` is **async**; if production runs a version where `request.cookies` is not pre-populated, both forms fail differently and the guards 503. This is why `test/session-availability.test.mjs` now exercises the optional-chaining form: it is the form that degrades to "no cookie" instead of throwing. `server-auth.js` still uses the non-optional form and should be aligned.

## 5. Security review of the chain

| Control | State |
| --- | --- |
| Session cookie flags | `HttpOnly; Path=/` always; `Secure; SameSite=Strict` only when `NODE_ENV === "production"` |
| `POST` content-type check | present (rejects non-JSON) |
| Token length guard | `> 12000` rejected |
| `email_verified` enforced | yes, in `POST` and in `verifyActiveSession` |
| `checkRevoked` | `true` on every session verification |
| Active-profile invariant | enforced on the server **and** mirrored in `firestore.rules` |
| Fail-closed on outage | yes — 503 without clearing the cookie |
| Error leakage | generic messages only; `console.error` logs the error object, not the token |
| Answer-key exposure | see PR #111 (open, draft) and `TARGET95_ACADEMIC_QUALITY_AUDIT.md` |

Two hardening notes:

- `DELETE` matches `session=` by string splitting rather than the cookie parser, and intentionally swallows revoke failures. Acceptable, but it means logout can report success while the refresh token stays live until expiry.
- `getAdminApp()` returns `getApps()[0]`. If any other default app is ever initialised in the same isolate, the admin SDK silently binds to it. Prefer an explicitly named app.

## 6. Owner-side verification (no secrets in chat)

1. Vercel → Project → Settings → Environment Variables → confirm `FIREBASE_SERVICE_ACCOUNT` exists for the **Production** target (not only Preview).
2. Confirm the value is a single-line JSON service-account key from the **same** Firebase project as the client config (`NEXT_PUBLIC_FIREBASE_PROJECT_ID`).
3. Confirm the key's `private_key` contains real newline escapes (`\n`), not doubled (`\\n`).
4. Redeploy (env changes need a new deployment).
5. Sign in, then in DevTools check `GET /api/auth/session` returns **200** with `{"authenticated":true}`.
6. Check Vercel runtime logs for `Session validation failed:` — the error text distinguishes "not configured", "not valid JSON", and a `cert()` parse failure without exposing the key.

## 7. Smoke script

`scripts/smoke-prod-auth.mjs` **does not exist** in the repository (verified: `ls scripts | grep -i smoke` returns nothing). There is nothing to review, and no production smoke test was run. Creating one is worthwhile, but it must be written to never print a token or cookie, never revoke other sessions, and never write mock-test attempts — none of which can be verified for a script that is not present.
