# Target95 Admin Security Audit

## Scope

Admin routes, authentication flow, admin content services, input handling, and abuse controls.

## Findings

### Critical / release-blocking
- Client-side role checks are not a security boundary. Admin access must also be enforced by Firebase/Firestore security rules and, for privileged server actions, server-side authorization.
- Admin login needs abuse protection at the authentication boundary. Client-only counters are only friction and do not replace server-side rate limiting.

### High
- Admin settings currently contains UI-only security controls (for example 2FA/session timeout/password-change state). These controls must not be presented as active security features until backed by real authentication/session APIs.
- Admin dashboard contains hard-coded operational metrics/activity entries. These must be labeled mock/demo or replaced with authoritative data before production sign-off.

### SQL injection
- The current project uses Firestore rather than SQL for the admin content gateway. SQL injection is therefore not a direct Firestore query vulnerability.
- User-controlled text still requires validation and safe query construction for any future SQL-backed service or external integration.
- Never concatenate untrusted input into SQL strings; use parameterized queries/prepared statements at any SQL boundary.

### Bot / abuse protection
- Add server-side rate limiting to admin login and privileged write endpoints.
- Add Firebase App Check or an equivalent trusted-client attestation for appropriate Firebase-accessing clients where supported.
- Add reCAPTCHA/Turnstile-style challenge on suspicious/high-volume auth attempts if required by the deployed auth flow.
- Keep client-side rate limiting only as an additional UX layer, not the security control.

## Current safe baseline
- Admin route UI is restricted to authenticated users with an `admin` role in `ProtectedRoute`.
- Authentication is backed by Firebase Auth and the profile role is loaded from Firestore.
- A reusable input/abuse-control helper exists at `src/app/lib/security/adminSecurity.js`.

## Release gate

Do not sign off production admin security until Firebase Auth/Firestore Rules and server-side abuse controls are tested in the deployed environment.
