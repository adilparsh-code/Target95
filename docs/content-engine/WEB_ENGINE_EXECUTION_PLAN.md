# Target95 Web Engine — execution plan and repository audit

Status: Phase 0 audit recorded; Phase 1 adapter, server-only source composition and unit tests authored (execution not yet verified).
Branch: `feat/web-engine-foundation`
Base: `feat/content-engine-mocktest` (stacked on P1; no PR has been merged by this work).

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
- PR #102 (MockTest content-engine delivery and answer-free search projection) is open, head `7e5f864`, based on P1.
- This branch is based on `feat/content-engine-mocktest` so it can reuse the answer-free search projection. No existing branch or PR is modified. No PR is merged.

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
           /          \
          v            v
 Target95 adapters   External provider adapter
 (first-party)       (server-only credentials)
          \            /
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

### API contract (proposal; implement only after adapter audit)

- One authenticated server endpoint, preferably `POST /api/search`, with explicit `scope: "internal" | "web" | "all"`.
- Input is a bounded query and optional validated board/class/subject filters. Never trust client-supplied uid, role, entitlement or project identifiers.
- Internal results include stable ids, canonical chapter identity, result type, safe display text and first-party href.
- External results include title, snippet, canonical HTTP(S) URL, domain, provider/source label and retrieval timestamp. No fabricated citations.
- Response separates `internalResults` and `webResults`; it must not merge away source provenance.
- Return typed statuses for unauthenticated, invalid query, rate-limited, provider-unconfigured, provider-unavailable and success.
- Keep all external provider keys server-only. Do not send student profile data, email, uid or personal learning history to the external provider.
- Treat external snippets/pages as untrusted data. Never execute embedded instructions or render raw HTML.
- Enforce query length, result count, timeout, per-user rate limits and provider response size. Avoid logging raw student queries or secrets.
- Fail gracefully: internal search remains usable if external search is unconfigured or down, and vice versa.

## Phased implementation

| Phase | Work | Exit criteria |
|---|---|---|
| 0 | Repository and product audit | Existing sources, consumers, contracts, privacy and dependencies documented |
| 1 | Pure contracts + internal server adapters | Unit tests prove parity with current first-party search and answer-key exclusion |
| 2 | Authenticated API + orchestration | Auth, validation, rate limits, timeout, typed failures and stable response contract tested |
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

## Work started on 2026-11-23

- Created `feat/web-engine-foundation` from the current `feat/content-engine-mocktest` head; no existing branch or PR was changed.
- Added `src/lib/web-engine/searchContract.mjs`: pure query validation, safe first-party path validation, HTTP(S)-only external URL validation, result DTO normalisation, score bounding, lane separation and deduplication.
- Added `test/web-engine-search-contract.test.mjs` covering invalid queries, unsafe paths/URLs, URL fragment removal, lane separation, ranking and deduplication.
- Added `src/lib/web-engine/internalSearch.mjs`, an injectable adapter that maps the existing Office, study chapter/concept, CBSE and answer-free question search sources into the common first-party DTO. It copies only display-safe fields and preserves the existing board/class routing rules.
- Added `src/lib/web-engine/internalSources.js` as the server-only composition root. It wires the existing Office search, study-center search, generated answer-free CISCE question index, CBSE chapter registry and CBSE practice source into the adapter. CBSE source records contain answer-bearing fields, so the composition root is protected with Next.js `server-only`; only allow-listed result fields leave the adapter.
- Added `test/web-engine-internal-search.test.mjs` for source composition, CBSE class/subject filtering, navigation URLs and answer/explanation exclusion. Registered both test files in `npm test` and `npm run test:web-engine`.
- Added `npm run test:web-engine` and included the new test in `npm test`.
- These files were committed through GitHub's repository API. No local runtime is available in this session, so tests, lint and build have **not** been run. Do not treat them as passing until executed in a development workspace.
- No UI, API route, external provider, secrets, Firebase, Vercel, MockTest logic or feature flags were changed.

## Next implementation task

Execute `npm run test:web-engine`, the full test suite, lint and build in a Node-enabled workspace. Fix any failures before moving to Phase 2. Then implement the authenticated, rate-limited internal search endpoint. Keep external provider integration separate until a provider is selected.
