# Mock-test content-engine integration: rollout, rollback and behaviour reference

Implemented on branch `feat/content-engine-mocktest` (stacked on `feat/content-engine-p1`). Design rationale: `MOCKTEST_INTEGRATION_ARCHITECTURE.md`. This file is the operator's reference.

## 1. Feature flag (default: OFF)

| | |
|---|---|
| Variable | `MOCKTEST_CE_CATEGORIES` (server environment only; never `NEXT_PUBLIC_`) |
| Default | unset = content-engine source disabled; every attempt is legacy-only, exactly as before |
| Values | comma list of categories, e.g. `icse-class-10` or `icse-class-10,icse-class-9` |
| Allowed in code | `icse-class-10`, `icse-class-9` only. `isc-class-11` needs its own readiness check (add it to `ENABLEABLE_CONTENT_CATEGORIES` in `src/lib/mocktestContent.js` after sign-off). `isc-class-12` has no content and can never be enabled by the flag. Unknown values are ignored. |
| Effect | gates **selection** of new content-engine questions for new attempts. It does not gate resolving or grading of `ce:` ids already stored in attempts. |

Pool when enabled: 230 MCQ + 95 True/False (325 before class/board filters). Excluded: `CH13-MCQ-003`, all 99 output questions, all free-text types, the two quarantined Number Systems questions.

### Rollout stages
1. **Deploy with the flag unset.** Behaviour is identical for students; the new code paths (resume endpoint, key-free delivery, server result on the result page) are live for legacy attempts.
2. **Internal verification (ICSE X):** set `MOCKTEST_CE_CATEGORIES=icse-class-10` on a Preview deployment, redeploy, and run the smoke checklist below with a test account.
3. **ICSE X in production**, then watch results for a few days.
4. **ICSE IX:** only after the ICSE X smoke test passes: `icse-class-10,icse-class-9`.
5. **ISC XI:** separate readiness verification (22 candidate questions, 3-5 per type/difficulty). Not part of this release.
6. **ISC XII:** unavailable until real content exists.

Environment variable changes apply to the next deployment; redeploy after changing it.

### Smoke checklist (per category)
- Setup page shows a higher "available" count than the legacy numbers and a merged chapter list.
- Start a test: questions include `ce:`-id items; no answer or explanation appears in the network response for `POST /api/mock-tests/attempts`.
- Reload mid-test: the same questions return, answers restored, timer not extended.
- Submit: the result page shows "Scored and saved by Target95", correct answers and explanations appear only now.
- Re-submit (browser back, resend): no second result document, same score.
- Turn the network off at submit: an error with "Retry Submit" appears, answers kept; retry after reconnecting succeeds.
- A legacy-only filter (for example class IX, a chapter with only legacy questions) still works.
- `results/{attemptId}` in Firestore has no explanations or answer keys.
- Run `npm run check:mocktest-bundle` against the build you are shipping.

## 2. Rollback

Nothing in Firestore changes shape (attempt and result documents have the same fields; content-engine review entries only carry an extra `source: "content-engine"`). Rollback therefore needs no data repair.

| Level | Action | Effect on students |
|---|---|---|
| 1. Stop serving new content | Unset `MOCKTEST_CE_CATEGORIES` (or remove a category) and redeploy | New attempts are legacy-only. Attempts already started with `ce:` questions still resume and grade. |
| 2. Revert the client | Revert the Phase D commit (`1a9c5c5`) | Player/setup/result return to browser-side resolution. **`ce:` ids cannot resolve in that client**, so only do this together with level 1 and after open `ce:` attempts have been submitted or abandoned. |
| 3. Revert the service | Revert Phase B/C (`e9b2c04`) | The grader no longer knows `ce:` ids; any attempt still `in_progress` with `ce:` ids fails with the existing "could not be resolved" 500 and stays `in_progress`. Do levels 1 and 2 first and wait for the test duration (default max 300 minutes) to drain. |
| 4. Revert Phase A | Revert `e251b69` | Removes the `class` field only. |

Safe order: 1, wait, 2, 3, 4. Level 1 alone is the normal rollback and is instant.

## 3. Behaviour reference

### Duplicate submission and retry
`POST /api/mock-tests/attempts/{id}/submit` is idempotent. The first call grades inside a Firestore transaction and stores `results/{id}`. Any later call returns the stored result with `replay: true`, plus the reveal, and never grades or writes again, even with different answers. This is how a student recovers when the response was lost. Another student's attempt returns 404; an attempt in any other state returns 409. (Previously a second submit returned 409; a lost response could not be recovered.)

### Late submission (documented behaviour, unchanged)
- The server records `startedAtMs` when the attempt is created; the browser clock is never trusted.
- Submitting after the time limit plus a 120 second grace period is **still graded**; the result carries `lateSubmission: true` and the result page tells the student.
- `timeTaken` is capped at the test duration.
- Practice and revision modes are untimed.
- Late submissions are not rejected or penalised. Changing that is a product decision (see section 5).

### Pre-submission payload
Only `id, type, difficulty, question, options, marks, topic, chapter`. True/False options are exactly `["True","False"]`. Never `answer`, `answerIndex`, `correctAnswer`, `explanation`, `hint`, `tags`.

### Post-submission reveal
Returned only in the submit response: `[{questionId, correctAnswer, explanation}]`. Not written to Firestore.

### Drafts
Local drafts hold ids and answers. On resume the questions are re-delivered by `GET /api/mock-tests/attempts/{id}`. If that attempt is missing (404), already submitted (409) or no longer resolvable (410), the draft is discarded with a visible notice and a new attempt starts; old answers are never attached to new questions. If the server cannot be reached the draft is kept and a retry is offered. After a failed start, "Continue without saving" (legacy questions only, result not saved) is offered explicitly.

## 4. Test traceability (the 23 planned cases)

| # | Planned case | Where |
|---|---|---|
| 1 | All 28 legacy ids resolve; pools 8/6/6/8 | `mocktest-legacy-compat` |
| 2 | Golden grading of every legacy question | `mocktest-legacy-compat` |
| 3 | Pre-change attempt fixture grades | `mocktest-legacy-compat`, `mocktest-content-engine` (numeric attempt through the service) |
| 4 | Existing attempt tests unchanged and green | `mocktest-attempts` (untouched) |
| 5 | Draft restore with numeric ids | `mocktest-client-flow` (offline draft) |
| 6 | Double submit / foreign uid | `mocktest-content-engine` (duplicate, ownership); behaviour change: replay instead of 409 |
| 7 | Eligibility, quarantine exclusion | `mocktest-content-engine` |
| 8 | Class / board, no cross-class leakage | `mocktest-content-engine` |
| 9 | Chapter aliases and membership | `mocktest-content-engine` |
| 10 | Difficulty case handling | `mocktest-content-engine` |
| 11 | `ce:` ids, no collisions, accepted by answer sanitising | `mocktest-content-engine` |
| 12 | True/False options and grading | `mocktest-content-engine` |
| 13 | MCQ grading, duplicate-option MCQ excluded | `mocktest-content-engine` |
| 14 | Key-leak test over the whole pool | `mocktest-content-engine` (answer-key exposure audit; start and resume payloads) |
| 15 | GET on submitted / foreign attempt | `mocktest-content-engine` |
| 16 | Reveal absent from stored documents | `mocktest-content-engine` |
| 17 | Forged payloads | `mocktest-content-engine` (forged answers/ids/scores); oversized answers in `mocktest-attempts` |
| 18 | Flag off | `mocktest-content-engine` (flag off; resume and grade after flag off; default environment) |
| 19 | Bundle check | `npm run check:mocktest-bundle` (needs a build; not part of `npm test`) |
| 20 | Rate limit / open-attempt cap | **Not implemented** (see section 5) |
| 21 | Full test suite, lint, build | run and recorded in `EXECUTION_CHECKPOINT.md` |
| 22 | Setup counts equal server pool sizes | Partly: every chapter option for ICSE IX and X equals its pool, and flag-off equals legacy. The full difficulty x type grid is not exhaustively tested |
| 23 | Player shows an error, not a local shuffle, when the API fails | Session-loader level (`mocktest-client-flow`). The React screen itself is not rendered in a test |

Additional: submission failure, lost response, retry, stale draft (3 causes), network/401/503/500 on resume, start failure, offline choice, older-server compatibility, server-calculated result display, late submission, time-left from the server clock, CBSE unaffected.

## 5. Known limits and residual risks (not hidden)

1. **Global search still ships the whole catalog on demand.** `StudentGlobalSearch` lazy-loads the content catalog (which includes answers and explanations for all content-engine questions) the first time search is opened, on any page, including during a mock test. The bundle audit confirms no mock-test page loads the bank statically (0 chunks), but one on-demand chunk holds all 325 candidate answers. A student who opens search mid-test and inspects the network can read them. Fix: give search an answer-free generated index (a small follow-up, not done because it changes the search feature). The same questions are also visible with answers in the practice player by design.
2. **Legacy answers remain in the client bundle** (28 legacy questions and CBSE). Unchanged by choice (approved scope); moving them to server delivery uses the same endpoints.
3. **No rate limit or open-attempt cap.** A cap on `in_progress` attempts would lock out students who abandon tests, because attempts never expire. It needs an expiry rule first. Deferred.
4. **Late submissions are accepted.** See section 3.
5. **Not verified in a browser or against real Firebase.** All flows were exercised against an in-memory Firestore double and the real service code, plus a production build. End-to-end behaviour (auth cookies, real transactions) is covered only by the smoke checklist above.
6. **Output questions (99) stay excluded** until a grading policy is approved.
7. **Setup count flicker:** while a new count is loading from the server the local legacy count is shown briefly.
