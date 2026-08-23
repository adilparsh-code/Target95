# Admin Bot Protection

## Controls

- Admin login: maximum 5 attempts per 15 minutes per server-side identity/rate-limit key.
- Password reset: maximum 3 requests per 15 minutes.
- Admin content writes: maximum 30 writes per minute.
- Firebase App Check should be enabled for production client integrity/abuse resistance.
- Server-side enforcement must remain authoritative; client-side counters are UX only.
- Admin role authorization must be enforced by backend/Firebase Security Rules, not only by React route guards.

## SQL injection

Target95 currently uses Firebase/Firestore for the admin content gateway rather than a SQL database. SQL injection is therefore not the current database attack surface. If SQL is introduced later, every query must use parameterized/prepared statements and never concatenate user input.

## Production gate

Do not mark bot protection as fully complete until the deployed environment has server-side rate limiting and Firebase App Check (or an equivalent server-verified bot challenge) enabled and tested.
