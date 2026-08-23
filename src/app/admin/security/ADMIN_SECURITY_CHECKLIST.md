# Admin Security Checklist

## Current controls
- `/admin` route uses `ProtectedRoute` with `allowedRoles=["admin"]`.
- Firestore write rules allow content writes only for approved teacher/admin roles.
- Authentication uses Firebase Auth rather than custom password storage.
- Login has normalized email validation and a honeypot field.

## Required production controls
- Firebase App Check must be enabled for production where supported.
- Firebase Auth protections / anti-abuse controls must be enabled in the Firebase console.
- Admin role changes must be restricted to trusted server-side/admin tooling; clients must not self-promote.
- Firestore rules are the authoritative authorization boundary.
- Any future SQL-backed API must use parameterized queries / ORM bindings; never concatenate user input into SQL.
- Add server-side rate limiting / bot protection to any custom API endpoint before production.
- Keep secrets out of client code and use environment-managed credentials.

## Important distinction
Target95 currently uses Firestore, so classic SQL injection is not the primary attack vector in the existing admin CRUD path. The relevant risks are unauthorized writes, credential abuse, automated form submissions, and malicious query/input payloads.

Do not mark production security sign-off complete until Firebase rules, Auth abuse controls, App Check, and any custom API rate limiting have been verified in the deployed environment.
