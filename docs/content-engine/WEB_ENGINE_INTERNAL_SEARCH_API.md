# Target95 Internal Search API

Status: Phase 2 implementation on `feat/web-engine-api`, stacked on the verified Phase 1 branch `feat/web-engine-foundation`.

## Endpoint

- Method: `POST`
- Path: `/api/search`
- Runtime: Node.js; the route is marked `server-only`.
- Authentication: the existing HttpOnly session cookie, verified by `getVerifiedSession` (revocation check, verified email and active profile).
- Allowed roles: student, teacher and admin. The admin claim and role are read only from the verified session. Unknown roles are denied.
- Cache policy: `private, no-store`; responses vary by Cookie.

Example request:

```json
{
  "query": "Java arrays",
  "filters": {
    "board": "CISCE",
    "class": "icse-class-10",
    "subject": "computer-applications"
  }
}
```

Only `query` and optional `filters` are accepted at the top level. Only `board`, `class` and `subject` are accepted inside filters. Unknown fields, including `uid`, `role`, `userId`, tenant ids and entitlement claims, are rejected.

## Validation

- JSON content type is required.
- The streamed request body is capped at 4 KiB; Content-Length is checked early but is not trusted as the only limit.
- Query is normalised and limited to 240 characters by the Phase 1 search contract.
- Board values: `CBSE`, `CISCE`, `ICSE` or `ISC`.
- Supported class ids: `cbse-class-9` through `cbse-class-12`, `icse-class-9`, `icse-class-10`, `isc-class-11`, `isc-class-12`.
- A CBSE board filter requires a supported class because the current adapter searches CBSE content by class and subject.
- CBSE subject codes: 402 for classes 9–10; 083, 065 or 802 for classes 11–12.
- CISCE subject ids: `java`, `computer-applications`, `computer-science`; class-specific combinations are validated before search.
- If class is supplied without board, board is derived from the class id. If subject is supplied, board or class must also be supplied.

## Search and privacy boundary

- The route calls the server-only `searchTarget95Content` composition root. It does not import source catalogs into a client bundle.
- Search receives only the validated query and canonical filters. Identity and role are not passed to the adapter.
- The adapter uses the answer-free CISCE question projection and allow-listed display fields from the CBSE source. The API normalises results again through the Phase 1 contract.
- Response DTO fields are limited to id, source, type, title, snippet, href, score, board, class, chapterId and retrievedAt.
- The endpoint returns an empty `webResults` lane. External web search is not implemented by this phase.
- Answer keys, correct answers, model answers, explanations, private student records, identifiers and secrets are not response fields.
- Search terms are not written to the rate-limit document or logged by the route.

## Rate limiting

- Firestore transaction-backed, per verified user.
- 30 requests per 60-second window.
- Stored only at `users/{verifiedUid}/usage/webSearch` as count and windowStart.
- The limiter is shared across serverless instances and fails closed with 503 if Firestore is unavailable.
- A blocked request returns 429 with a Retry-After header. No raw query, answer content or profile fields are stored.

## Responses

| HTTP | Status | Meaning |
|---|---|---|
| 200 | `internal_only` | Safe first-party results; external lane empty |
| 400 | `invalid_request`, `invalid_query` or `invalid_filters` | Body or filters are invalid |
| 401 | `unauthenticated` | No verified active session |
| 403 | `forbidden` | Session role is not allowed |
| 413 | `payload_too_large` | Body exceeds 4 KiB |
| 415 | `unsupported_media_type` | JSON content type required |
| 429 | `rate_limited` | Per-user window exhausted |
| 503 | `unavailable` | Session, limiter or internal source unavailable |

## Verification

Run `npm run test:web-engine` for the pure contract, internal adapter, API validation/auth/privacy and Firestore limiter tests. The latest Phase 2 push run [45275068885](https://github.com/adilparsh-code/Target95/actions/runs/45275068885) and pull-request run [45275079542](https://github.com/adilparsh-code/Target95/actions/runs/45275079542) both passed the focused and repository regression suites, ESLint, repository typecheck and production Next.js build on 2026-11-23.
