# Target95 Web Engine — execution plan and repository audit

Status: Phase 1 internal search foundation and Phase 2 authenticated internal search API are verified green. The Phase 2 branch is synced to the latest Phase 1 head; both push and pull-request workflows passed on 2026-11-24.
Phase 1 branch: `feat/web-engine-foundation`
Phase 2 branch: `feat/web-engine-api`
Phase 1 base: `feat/content-engine-mocktest` (stacked on P1; no PR has been merged by this work).

## Product intent

The Web Engine must provide two complementary search lanes:

1. **Target95 internal search** — curriculum, chapters, study material, question bank, CBSE/Office content and other approved first-party learning sources.
2. **External web search** — current information outside Target95, returned with source attribution and clickable citations.

The two lanes must remain distinguishable in the UI and response contract. Internal curriculum answers are the primary source for board/syllabus questions; external results supplement them when current or broader context is useful. External pages are untrusted evidence, never instructions.

The existing ACE identity and UI should be reused. Do not create a second mascot, duplicate global search modal, or a parallel student search experience.

## Verified repository state (2026-11-23)

- Repository: `adilparsh-code/Target95`; default branch: `main`.
- PR #100 (P0 schema/normalizer/validator/static adapter) is merged.
- PR #103 (grouped-examples search crash fix) is merged.
- PR #101 (P1 canonical identity, chapter selectors, search/bookmark migration) is open, head `6fa5c48`.
- PR #102 (MockTest content-engine delivery and answer-free search projection) is open, head `7e5f864`.
- Phase 1 is stacked on `feat/content-engine-mocktest`; Phase 2 is stacked on Phase 1. No existing branch or PR is modified. No PR is merged.

## Existing capabilities to reuse

- `src/content/identity.mjs`: canonical chapter identity and aliases.
- `src/content/searchProjection.mjs` + generated `src/content/searchIndex.mjs`: allow-listed, answer-free question projection.
- `src/lib/content/searchIndex.js`: client-safe question-index search helper.
- `src/lib/studyCenter.js`: current study chapter search, including the grouped-examples fix now merged in #103.
- `src/data/office`: existing Office content search.
- CBSE chapter/question data and current `StudentGlobalSearch.jsx` integration.
- `getVerifiedSession` in `src/app/lib/server-auth.js`: verified email + active profile session gate.
- Existing API conventions in `src/app/api/ai-tutor/route.js`, including typed auth failures and Firestore-backed per-user rate limiting.

## Important audit findings / gaps

1. The current `StudentGlobalSearch.jsx` performs substantial first-party search in the browser. It searches Office content, study chapters/concepts, CBSE content and the answer-free question index. It is not yet a unified server-side search API.
2. The answer-free question projection is a security boundary. Web Engine must never import the full question catalog into a client-facing search bundle or return answers, answerIndex, model answers, hints or explanations in pre-submit/search responses.
3. The repository has authenticated server API patterns, but this audit did not find an existing generic internal-search endpoint to reuse. Before adding one, trace all consumers and preserve their current filtering/navigation behaviour.
4. No external web-search provider integration or provider-neutral server adapter was found in the inspected code. Provider selection and credentials are unresolved. Do not hard-code a vendor or add a dependency without an explicit decision.
5. `StudentGlobalSearch` is an existing product surface. Extend it or add a clearly approved ACE entry point; do not duplicate it.
6. PR #101/#102 are still unmerged. Keep this work stacked on #102 and do not retarget, merge, rebase, or alter those PRs without approval.

## Target architecture

```
Existing ACE / StudentGlobalSearch UI
                 |
                 v
       Authenticated Search API
                 |
        Query validation + limits
                 |
        Search orchestrator
           /          \\
          v            v
 Target95 adapters   External provider adapter
 (first-party)       (server-only credentials)
          \\            /
           v          v
      Normalise + rank + deduplicate
                 |
                 v
  Typed results with source, URL, snippet,
  retrieval time and citation metadata
                 |
                 v
       UI renders distinct source lanes
```

## API contract

- One authenticated server endpoint: `POST /api/search`, with an explicit internal-only response lane in Phase 2.
- Input is a bounded query and optional validated board/class/subject filters. Never trust client-supplied uid, role, entitlement or project identifiers.
- Internal results include stable ids, canonical chapter identity, result type, safe display text and first-party href.
- External results are reserved for a later provider phase; Phase 2 returns an empty external lane.
- Response separates `internalResults` and `webResults`; it must not merge away source provenance.
- Keep all external provider keys server-only. Do not send student profile data, email, uid or personal learning history to an external provider.
- Treat external snippets/pages as untrusted data. Never execute embedded instructions or render raw HTML.
- Enforce query length, result count, body size and per-user rate limits. Avoid logging raw student queries or secrets.
- Fail closed when session validation, rate limiting or internal search is unavailable.

## Phased implementation

| Phase | Work | Exit criteria |
|---|---|---|
| 0 | Repository and product audit | Existing sources, contracts, privacy and dependencies documented |
| 1 | Pure contracts + internal server adapters | Unit tests prove parity with current first-party search and answer-key exclusion |
| 2 | Authenticated API + orchestration | Auth, authorization, validation, rate limits and safe response DTO tested |
| 3 | External provider adapter | Provider selected; server-only key; schema validation, URL validation, attribution and failure tests |
| 4 | Existing UI integration | Extend existing ACE/search surface; preserve keyboard, mobile, filters and route behaviour |
| 5 | QA and rollout | Unit/integration/browser checks; no answer leakage; Preview-only rollout and rollback plan |

## Guardrails

- No Production Firebase/Vercel changes.
- No merges of PRs #101/#102 without explicit approval.
- No P2/P3 scope expansion, route-case changes, deletion of legacy files, duplicate chapter consolidation or changes to quarantined Number Systems questions.
- Do not modify MockTest attempt persistence, grading or feature flags as part of Web Engine work.
- Do not install packages or introduce a paid provider until the provider is selected.
- Preserve current internal search behaviour and answer-free projection guarantees.
- Do not claim external search is implemented until a real provider integration is configured and verified.

## Phase 1 — completed and verified

- Added `src/lib/web-engine/searchContract.mjs`: pure query validation, safe first-party path validation, HTTP(S)-only external URL validation, result DTO normalisation, score bounding, lane separation and deduplication.
- Added `src/lib/web-engine/internalSearch.mjs`, an injectable first-party adapter for Office, study chapters/concepts, CBSE chapters/practice and the answer-free CISCE question index.
- Added `src/lib/web-engine/internalSources.js` as the `server-only` composition root.
- Added focused contract and adapter tests and registered them in `npm test` / `npm run test:web-engine`.
- Corrected the duplicate-result ranking assertion in commit `6b49e80603fe43ba6789a9823249fd84c0f5384b`; the expected order retains the duplicate question's highest score.
- Focused Phase 1 review found three filter defects: board-only ICSE/ISC searches could cross-match, `Computer Science (Java)` did not match the `computer-science` subject filter, and unclassified Office results appeared in academic searches. Fixed these in `internalSearch.mjs` and added regression coverage. Current Phase 1 head `8bf715902eed801d31663fc3cb01fe16a0115c8d` passed push run [45298647431](https://github.com/adilparsh-code/Target95/actions/runs/45298647431) and pull-request run [45298656270](https://github.com/adilparsh-code/Target95/actions/runs/45298656270) on 2026-11-24.
- The later Phase 2 branch review tightened the Phase 1 adapter so ICSE/ISC board-only searches remain distinct, academic filters exclude unclassified Office results, and subject matching handles the registry's `Computer Science (Java)` label.
- Phase 1 lint, typecheck and production build were not part of its focused workflow and are not claimed as verified.

## Phase 2 — authenticated internal API

- Implemented on `feat/web-engine-api`, stacked directly on `feat/web-engine-foundation`; draft PR #114 targets Phase 1.
- Added `POST /api/search` as a Node.js server-only route using `getVerifiedSession` and the server-only `searchTarget95Content` composition root.
- The route allows only student, teacher and admin roles derived from the verified session. Client-supplied uid, role, tenant and entitlement fields are rejected.
- Added strict top-level and filter allow-lists, a 4 KiB streamed JSON body cap, 240-character query validation and supported CBSE/CISCE class/subject combinations.
- Added a Firestore transaction-backed limit of 30 requests per verified user per 60-second window under `users/{uid}/usage/webSearch`. The limiter stores only count and windowStart and fails closed if Firestore is unavailable.
- The API re-normalises results through the Phase 1 contract, returns only safe internal DTO fields, uses private no-store caching and keeps the external lane empty.
- Added focused tests for authentication, role authorization, body limits, filter validation, rate-limit isolation/window reset, failure handling and answer/explanation/private-record exclusion.
- The Phase 2 push and pull-request runs [45298520832](https://github.com/adilparsh-code/Target95/actions/runs/45298520832) and [45298524411](https://github.com/adilparsh-code/Target95/actions/runs/45298524411) passed focused Web Engine tests, the full repository regression suite, ESLint, repository typecheck and the production Next.js build on 2026-11-24. These runs used the same source tree as the subsequent stack-sync merge commit.

## Next implementation task

After Phase 2 CI is green, proceed to Phase 3 only after a web-search provider is explicitly selected. Keep provider credentials server-only, send no student identity or learning history externally, and do not integrate or deploy the UI until the internal API has passed review.
