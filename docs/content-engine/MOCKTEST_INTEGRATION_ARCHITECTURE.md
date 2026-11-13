# Mock-test integration: architecture review and proposal

Status: PROPOSAL ONLY. Read-only audit. No mock-test implementation file, the 28-question bank, attempt persistence, or the two quarantined Number Systems questions were touched. Implementation needs explicit approval.

Audit date 2026-11-11, branch `feat/content-engine-p1` @ `ed415a6`.

## 0. Corrections to the earlier plan (read these first)

The earlier plan (`P1A_ALIAS_AUDIT_AND_MOCKTEST_PLAN.md` section 3) was written from counts, before tracing the player. Four of its assumptions are wrong or incomplete:

| # | Earlier claim | What the audit found | Consequence |
|---|---|---|---|
| 1 | "425 auto-gradable questions" | Only the 231 MCQs carry options. The 95 true/false and 99 output questions have **no options** (`options: []`). The player shows a textarea when there are no options, and grading is an exact lowercase text match. | Reliably auto-gradable today: **231 MCQ**. True/false (95) becomes reliable only if delivery supplies `["True","False"]` (answers are exactly `True`/`False`). Output (99) needs a grading policy (see 6.3). |
| 2 | "The server never needs to send the answer key" | True for scoring, but the **client player resolves ids from a bundled pool that contains every answer and explanation** (`player/page.jsx` calls `buildMockTestPool`, `mock-test/page.jsx` too). The 28 legacy answers are already in the browser bundle today. | Adding the content-engine bank to that pool would ship ~157 KB of answer keys (uncompressed, 425 questions) and violate requirement 7. CE questions must be **server-delivered, keys stripped**. |
| 3 | "Stored attempts keep resolving through one combined pool" | `gradeAttempt` re-derives the pool from the stored `config` (`buildMockTestPool(config)`), then looks ids up in it. An id only grades if the *current filter semantics* still select it. | Safe for the 28 legacy ids as long as the legacy filter is untouched. For robustness the resolver should look ids up directly, not through the config filter (section 4.3). |
| 4 | "Add class metadata" | Confirmed needed, and the data is there: raw records carry `class` (`ICSE IX` 269, `ICSE X` 549, `ISC XI` 40). The unified question drops it. | Section 6. Chapter id alone cannot decide class (e.g. `inheritance` holds 22 ISC XI and 1 ICSE X auto question; `for-loop` holds IX and X). |

## 1. Current architecture (traced, file by file)

| Stage | Where | What happens |
|---|---|---|
| Setup | `app/mock-test/page.jsx` (client, `ProtectedRoute`) | Picks category (`icse-class-9/10`, `isc-class-11/12`, `cbse-class-*`), chapter, difficulty, type, count, mode, duration. Computes "N questions available" and the chapter dropdown **in the browser** via `buildMockTestPool` and `getMockTestChapterOptions` (both read the bundled legacy pool). Navigates to `/mock-test/instructions` with query params. |
| Config normalisation | `lib/mocktestAttempts.js` `normalizeAttemptConfig` | Shared by client and server. Clamps count (1-100), duration (1-300), validates board, slug-safe category/chapter/difficulty/type. |
| Pool | `buildMockTestPool(config)` | ICSE/ISC: filters the 28-question `mockTestQuestions` by `category`, `difficulty` (lowercase), `type`, `chapter`. CBSE: `getCBSEMockQuestions` normalised. Shared by player, setup page, server. |
| Attempt creation | `POST /api/mock-tests/attempts` | `getVerifiedSession` (checkRevoked, verified email, active profile) -> `normalizeAttemptConfig` -> `selectAttemptQuestionIds` (server shuffle) -> writes `users/{uid}/mockAttempts/{id}` `{userId, config, questionIds, startedAtMs, status:"in_progress", createdAt}` via Admin SDK. Responds `{attemptId, questionIds, duration, startedAtMs}`. **Ids only; no question text.** |
| Delivery | `mock-test/player/page.jsx` | Client calls the API, then resolves ids against its **own bundled pool** (`restoredIds` -> `byId`). If the API fails (`attemptError`) it silently falls back to a local shuffle and the attempt is never saved server-side. |
| Draft saving | `lib/mocktest.js` `saveMockTestDraft` | `localStorage` key per user and config: `{attemptId, questionIds, currentIndex, answers, bookmarked, timeLeft}`. On reload the draft ids are resolved against the bundled pool; if any id does not resolve, the page **silently reshuffles a fresh question set** (`restored.length === restoredIds.length` guard) while the old answers stay keyed by old ids. |
| Submission | player `submit()` -> `POST /attempts/{id}/submit` | Client computes its own result first (display only), stores it in `sessionStorage`, fires the submit request with `.catch(() => {})` (a failed save is invisible), then routes to `/mock-test/result`. |
| Grading | `submit/route.js` + `gradeAttempt` | Firestore transaction: attempt must belong to the uid and be `in_progress` (one submit only). `gradeAttempt` re-resolves the stored ids, `sanitizeAnswers` keeps only string answers for ids in the attempt, grades via `evaluateMockTestAnswer`, caps `timeTaken`, flags `lateSubmission` (not rejected). Creates `results/{attemptId}` (`source:"server-graded"`) and marks the attempt `submitted`. Rules: `mockAttempts` and `results` are write-denied for clients. |
| Result display | `mock-test/result/page.jsx` | Reads the **client-computed** result from `sessionStorage`, not the server document. Correct answers and explanations come from the bundled pool. |
| History | `lib/mocktest.js` | `localStorage` list of the last 20 client results (retake button). |

### Pre-existing weaknesses found (not introduced by this work)
1. Answer keys and explanations for legacy and CBSE questions are in the client bundle, so a student can read them before submitting. Grading is server-authoritative; answer *secrecy* is not.
2. The displayed result is client-computed; only the stored result is server-graded. They agree today because both run `evaluateMockTestAnswer`, but they are two code paths.
3. A failed submit request is swallowed; the student sees a result that was never saved.
4. A draft whose ids no longer resolve silently reshuffles questions.
5. Late submissions are flagged but never rejected or down-weighted.
6. `getMockTestLibraryScope` (entitlements) exists and is unused by the mock-test routes.

None of these are fixed by this proposal unless stated; 1, 3 and 4 become relevant to CE questions and are addressed for the new path only.

## 2. Legacy id compatibility (all 28 verified)

| Check | Result |
|---|---|
| Count / uniqueness | 28 questions, 28 unique ids, all numeric (1001-4008) |
| Categories | icse-class-9: 8, icse-class-10: 6, isc-class-11: 6, isc-class-12: 8 |
| Types | mcq 11, theory 6, programming 6, output 5 |
| MCQ integrity | every MCQ has >= 2 options and an answer that is one of them |
| Pool per category through the live `buildMockTestPool` | 8 / 6 / 6 / 8, matches the data |
| Legacy attempt round trip | `selectAttemptQuestionIds` -> `gradeAttempt` resolves and grades (5 of 5) |
| Collision with CE ids | **0** (CE ids look like `CH01-MCQ-001`; none are numeric) |
| Legacy chapter slugs through the identity table | `introduction-to-java`, `operators`, `strings`, `methods`, `constructors`: canonical ids. `arrays` -> `arrays-1d`. `conditional-statements` and `iterative-statements`: resolve as aliases but are **not** canonical ids. |

The last row matters for the chapter filter: legacy questions are stored with chapter slugs that do not all equal CE chapter ids. A merged chapter dropdown must normalise through the identity table (`aliasIndex`), while the legacy question keeps its original `chapter` string untouched so stored attempts and `config.chapter` values still match.

Stored attempts hold only `config` and `questionIds` (strings such as `"1001"`), so nothing about the bank's shape is persisted. That is what makes this migration reversible.

## 3. The CE question pool (verified)

Live questions: 856 (2 quarantined, excluded). By type: mcq 231, true-false 95, output 99, fill-blank 92, debugging 140, programming 61, case-based 44, theory 94.

| Candidate set | Count | Verdict |
|---|---|---|
| MCQ | 231 | Ready. Answer text is always one of the options; no whitespace edge cases. 1 has duplicate options (`CH13-MCQ-003`): keep out until content is fixed (the validator already warns). |
| True/false | 95 | Ready **if delivery adds `["True","False"]`**. Answers are exactly `True` or `False`. A fixed two-value option list is a presentation rule, not new content. |
| Output | 99 | **Not ready for auto-grading.** No options; all 99 carry their code inside the question text (no `codeSnippet` field populated, 0 of 99); 11 answers are multi-line; a student's `\r\n` or space-for-newline answer is graded wrong (verified), and the comparison is case-insensitive, which Java output is not. |
| assertion-reason | 0 | None in the bank. |
| Free text (fill-blank, debugging, programming, case-based, theory) | 431 | Out of scope: heuristic keyword grading, not auto-gradable. |

Phase-1 eligible pool: **230 MCQ + 95 true/false = 325**. Output joins only after the policy in 6.3 is approved (up to 424 with `CH13-MCQ-003` excluded). 4 of the auto candidates have no explanation, so the reveal step must tolerate an empty explanation.

Class breakdown of the 425 candidates: ICSE IX 133, ICSE X 270, ISC XI 22, ISC XII 0.

## 4. Proposed architecture

### 4.1 Principles
1. Legacy path stays byte-for-byte as is for the 28 questions (same ids, same pool function, same grading).
2. CE questions are never in a client bundle with their keys. They are delivered by the server per attempt.
3. Grading and the answer reveal are server-side only, after submission.
4. Every change is additive; the whole CE path sits behind one server flag.

### 4.2 Id model
- Legacy: unchanged numeric ids, stored as strings (`"1001"`).
- CE: `ce:<catalog id>` (e.g. `ce:CH01-MCQ-001`). The prefix routes resolution to the right source and makes a collision impossible even if a numeric id or a future legacy id ever matches. `sanitizeAnswers` and the draft code treat ids as opaque strings, so `:` is safe (verified in code; add a test).

### 4.3 Server-side resolver
New module `lib/mocktestResolver.js` (pure, node-testable):
- `resolveAttemptQuestion(id)` -> legacy question when the id has no prefix; CE question (catalog `recordIndex`/unified question) when it starts with `ce:`.
- `gradeAttempt` switches from "rebuild pool from config, look ids up" to "look each id up directly". For legacy ids this returns the same object `buildMockTestPool` returns today, so grades are identical (proved by a golden test). This removes the dependency on filter semantics for historical attempts.
- CE grading policy: MCQ and true/false are exact-match after trim (same as today). Output (once approved) uses a normaliser (trim, `\r\n` -> `\n`, collapse trailing whitespace per line), case-**sensitive**; legacy output questions keep today's comparison so no historical grade changes.
- CE questions get their own `gradeVersion` in the stored review so a future policy change never re-interprets old results.

### 4.4 Pool building
`buildMockTestPool(config)` stays. A new server function `buildAttemptPool(config)` = legacy pool for the category **plus**, when `MOCKTEST_CE_POOL=on`, eligible CE questions where:
- `class` matches the category (6.1), `board` matches, difficulty (lower-cased) and type match, chapter matches through the identity table,
- the question passes `validateQuestion` with no findings, type is in the phase-1 eligible set, id not quarantined.

Legacy questions are always included when the filters match (so existing tests keep their question mix); selection stays a uniform shuffle over the combined set. A minimum share for legacy is **not** proposed (legacy is 6-8 per category; it would dominate small tests).

### 4.5 Delivery without keys
- `POST /api/mock-tests/attempts` keeps its response and adds `questions`: for each id, `{id, type, difficulty, question, options, marks}` with **no `answer`, `answerIndex`, `explanation`, `hint`, `tags`, `chapter` slug beyond what the UI shows**. True/false gets `options: ["True","False"]`.
- New `GET /api/mock-tests/attempts/{id}`: same sanitised payload for an `in_progress` attempt owned by the caller, plus `startedAtMs`. Used for draft resume and cross-device resume, so ids never have to be resolved from a client pool.
- Player change (small): prefer `questions` from the server; legacy ids may still resolve from the bundled pool (compat), CE ids never do. Fail **closed** for CE: if the attempt API is unavailable the player shows an error for CE categories instead of the current silent local fallback (no keys exist locally to fall back to).
- Setup page: "N available" and the chapter dropdown need counts without shipping questions. Add `GET /api/mock-tests/availability?...` (counts only) or ship a tiny generated count snapshot like `questionStats.mjs`. Recommended: the snapshot (no network on every filter change, freshness-tested like the study counts).

### 4.6 Submission and reveal
- Submit keeps its contract (`{answers}` -> grade -> `results/{id}`), plus the response includes `reveal`: per question `{questionId, correctAnswer, explanation}` computed server-side **after** the transaction commits. `reveal` is **not** stored in `results` (avoids bloating documents and storing keys next to user data).
- The result page uses the server response (score, review, reveal) when present; legacy attempts keep their client-computed display until the player is moved over. Both agree for legacy because the grading function is the same.
- The player must stop swallowing submit errors for attempts that have `ce:` ids (show a retry), because the reveal now depends on that response.

### 4.7 Data-flow diagram

```
                SETUP (browser)                         SERVER (Next route, Admin SDK)                      FIRESTORE
  category/class/chapter/diff/type
   |  counts from generated snapshot
   v
  /mock-test/instructions -> /mock-test/player
   |
   |  POST /api/mock-tests/attempts {config}
   |------------------------------------------------> verify session -> normalizeAttemptConfig
   |                                                   buildAttemptPool = legacy(28) [+ CE if flag]
   |                                                   shuffle -> pick ids  ("1001", "ce:CH01-MCQ-001")
   |                                                   ------------------------------------------------> users/{uid}/mockAttempts/{id}
   |                                                                                                      {config, questionIds, startedAtMs,
   |                                                                                                       status:in_progress}   (unchanged shape)
   |<---- {attemptId, questionIds, questions[no keys], duration, startedAtMs}
   |
   |  answers + drafts in localStorage (ids + answers only)
   |  resume: GET /attempts/{id} ---------------------> owner + in_progress check -> sanitised questions
   |
   |  POST /attempts/{id}/submit {answers}
   |------------------------------------------------> txn: attempt owned, in_progress
   |                                                   resolver: id -> question (legacy | ce:)
   |                                                   sanitizeAnswers -> grade (server only)
   |                                                   ------------------------------------------------> results/{id} (create), attempt -> submitted
   |<---- {result, reveal[correctAnswer, explanation]}  (reveal not stored)
   v
  result page renders server result + reveal
```

## 5. Compatibility matrix

| Scenario | Before | After (flag off) | After (flag on) | Evidence required |
|---|---|---|---|---|
| New attempt, ICSE IX/X, ISC XI/XII legacy-only pool | works | identical | legacy + CE mix | golden test of pool + ids |
| In-progress attempt created before deploy (numeric ids) | grades | grades | grades (direct id lookup, same object) | test: pre-change fixture graded identically |
| Submitted attempt / stored `results` doc | read-only | unchanged | unchanged (never re-graded; submit is once-only) | n/a, code reading + test that submit on `submitted` -> 409 |
| localStorage draft with numeric ids | resumes | resumes | resumes | test |
| localStorage draft with `ce:` ids when flag later turned off | n/a | resolver still resolves `ce:` (flag gates **selection**, not resolution) | resumes | test |
| `config.chapter` of an old attempt (`conditional-statements`, `arrays`) | matches | matches | unchanged for legacy; CE uses the identity table | test |
| Retake button from history (`category`, `chapter`, `difficulty`, `type`) | works | works | works; may draw CE questions | test |
| CBSE pool | unchanged | unchanged | unchanged (not part of this work) | test |
| Attempt API down | silent local fallback | same | legacy: same; CE categories: explicit error, no fallback | test |
| Admin analytics reading `results` | reads fields | same | same fields; no new required fields | field diff |
| Firestore rules | deny client writes | unchanged | unchanged (no new collection) | rules test already exists |

## 6. Class IX/X filtering and board selection

### 6.1 Mapping (data-backed)
| Category | Raw `class` | Raw `board` | Auto-candidates |
|---|---|---|---|
| `icse-class-9` | `ICSE IX` | ICSE | 133 |
| `icse-class-10` | `ICSE X` | ICSE | 270 |
| `isc-class-11` | `ISC XI` | ISC | 22 |
| `isc-class-12` | none | none | 0 (legacy only) |
| `cbse-class-*` | n/a | n/a | out of scope |

- Add `class` to `UnifiedQuestion` (additive; `toUnifiedQuestion` copies it through). The category map lives next to the pool code, not in the content module.
- Do **not** infer class from chapter id: `for-loop` holds both IX (22) and X (1); `inheritance` holds ISC XI (22) and ICSE X (1).
- Board is already carried (`ICSE`/`ISC`). The category -> board prefix already exists in `normalizeAttemptConfig`.
- Thin pools: ISC XI has 3-5 questions per type per difficulty, so many filter combinations will be below 5. The setup message ("only N match") already handles that; no padding with other classes.

### 6.2 Chapter filter
Dropdown options = union of legacy chapter slugs and CE canonical chapter ids for the category, de-duplicated through `aliasIndex` (`arrays` and `arrays-1d` become one entry). Selecting it passes the canonical id; the pool matches CE by `chapterIds` (membership, so sibling chapters keep their questions) and legacy by `chapter` equal to the selected id **or any of its aliases**. Existing `config.chapter` values from history keep working.

### 6.3 Decisions needed from you
1. **Output questions:** (a) leave out of phase 1 (recommended), (b) include with the whitespace normaliser and case-sensitive compare, (c) include as self-marked ("reveal answer, mark yourself"), which is not server-authoritative.
2. **True/false options:** confirm the fixed `["True","False"]` presentation.
3. **Default flag state at deploy:** off (recommended), then enable ICSE X first.
4. **Plan gating:** use the unused `mockTestLibrary: "core" | "full"` entitlement for the CE library, or keep it available to all students (current behaviour for the 28).

## 7. Security analysis

| Threat | Today | Proposed |
|---|---|---|
| Student reads answers before submit | Possible for 28 legacy + CBSE (in bundle) | CE: not possible (never in a bundle or pre-submit payload). Legacy: unchanged, documented; optional later step moves legacy delivery to the same API. |
| Forged score / marks | Ignored (server grades) | Same |
| Grading another student's attempt | Blocked (read from `users/{uid}`) | Same; new GET uses the same path and `userId` check |
| Replay / double submit | Blocked (`in_progress` + `tx.create`) | Same |
| Answers for ids outside the attempt | Dropped by `sanitizeAnswers` | Same; `ce:` ids are just strings in the allowed set |
| Key leakage through `reveal` | n/a | `reveal` is only returned from the submit response after the attempt is marked `submitted`; the GET endpoint refuses non-`in_progress` attempts and never includes keys |
| Key leakage through errors / logs | n/a | Do not log question payloads; errors return generic text |
| Enumeration of the bank by creating attempts | Possible only for ids | Each attempt exposes at most `count` (<= 100) stripped questions; add a per-user rate limit on `POST /attempts` (reuse the project's existing limiter if present) and cap open `in_progress` attempts |
| Time-limit bypass | `lateSubmission` flag only | Unchanged; recommend (separate approval) rejecting or marking attempts beyond grace |
| Content tampering in the client draft | Draft holds ids and answers only | Same; server only trusts ids that belong to the stored attempt |
| New attack surface | n/a | One new GET route, one optional counts route. Both require a verified active session and only return data for the caller |

Keys never cross the wire before submission for CE content. Stripped payload size for all 425 candidates is ~100 KB uncompressed (a 20-question test is a few KB), so the server-delivery cost is negligible next to the ~106 KB gzip a bundled bank would have added.

## 8. Migration sequence and rollback

| Step | Change | Reversible by | Gate |
|---|---|---|---|
| M0 | Approve decisions in 6.3; this doc merged | n/a | your approval |
| M1 | Schema: add `class` to `UnifiedQuestion` + validator warning when missing; regenerate stats. No mock-test file touched. | revert commit | content tests |
| M2 | New `lib/mocktestResolver.js` + golden tests (legacy ids grade identically; `ce:` ids resolve). Not wired in. | delete file | tests pass |
| M3 | Wire resolver into `gradeAttempt` (direct id lookup). Legacy grades must be unchanged. Flag off. | revert commit | golden + full suite |
| M4 | `buildAttemptPool` + `MOCKTEST_CE_POOL` flag (default off), `class`/board/chapter filters. | flag, then revert | pool tests |
| M5 | Delivery: `questions` in the attempt response, `GET /attempts/{id}`, key-stripping serializer, fail-closed player branch, submit `reveal`, result page uses it. | flag off hides CE; legacy path untouched | security tests (section 9) |
| M6 | Setup page counts/chapters from the snapshot (union of legacy + CE). | revert commit | UI check |
| M7 | Enable for ICSE X in a preview deployment, verify end to end with a test account, then ICSE IX, then ISC XI. | flag off | manual + automated |
| M8 | Decide output questions (6.3-1). | n/a | separate approval |

**Rollback design.** The flag gates only *selection*. Resolution of `ce:` ids always stays on, so an attempt started while the flag was on can still be graded and resumed after the flag is turned off. Stored documents never change shape (no migration of Firestore data), so rolling back code needs no data repair. If the resolver itself had to be reverted, only attempts holding `ce:` ids would fail; they fail with the existing "could not be resolved" 500 and remain `in_progress`, which is why M7 starts on a preview with throwaway accounts and the flag can stay off in production until verified.

## 9. Test plan

Legacy (must pass before and after every step, using fixtures captured from the current code):
1. All 28 ids resolve per category; pool sizes 8/6/6/8.
2. Golden grading: for each legacy question, correct and wrong answers give the same `isCorrect`, `marks`, `score`, `percentage` as the pre-change `gradeAttempt` (snapshot generated from the current commit).
3. A pre-change attempt fixture (`config` + numeric `questionIds`) grades after M3.
4. Existing `mocktest-attempts.test.mjs` unchanged and green (forged scores, outsiders, duplicates, tampered sets, time cap, uid-only identity).
5. Draft restore with numeric ids; reshuffle guard behaviour unchanged for legacy.
6. `submit` twice -> 409; foreign uid -> 404.

New CE pool:
7. Eligibility: only mcq/true-false (phase 1), validator-clean, not quarantined; the two Number Systems ids never appear in any pool, any category, any filter.
8. Class/board: `icse-class-9` yields only `ICSE IX`, `icse-class-10` only `ICSE X`, `isc-class-11` only `ISC XI`, `isc-class-12` CE-free; no cross-class leakage on shared chapters (`for-loop`, `inheritance`).
9. Chapter filter through aliases (`arrays` = `arrays-1d`), membership siblings, `conditional-statements` legacy slug.
10. Difficulty case handling (legacy lowercase vs CE `Easy/Medium/Hard`).
11. Ids: `ce:` prefix, no collisions with legacy, `sanitizeAnswers` accepts them.
12. True/false delivered with `["True","False"]`; exact-match grade; unanswered/wrong/right.
13. MCQ grade, duplicate-option question excluded.

Security (the important set):
14. **Key-leak test:** serialise every attempt response and every `GET` payload and assert no `answer`, `answerIndex`, `correctAnswer`, `explanation`, `hint` field and that no answer string appears as a standalone key; run over the whole eligible pool.
15. `GET` on a `submitted` attempt returns 409/404 with no questions; on another user's attempt 404.
16. `reveal` present only in the submit response, absent from `results/{id}` and the attempt document.
17. Forged payloads: scores, `userId`, `ce:` ids not in the attempt, non-string answers, 5000+ char answers.
18. Flag off: new attempts contain no `ce:` ids; an existing `ce:` attempt still grades.
19. Bundle test: a build-output check that no CE answer text from a sampled question appears in the client chunks of `/mock-test/player` and `/mock-test`.
20. Rate limit / open-attempt cap behaviour.

Integration / regression:
21. Full `npm test`, lint on changed files, `next build`.
22. Setup page: counts and chapter dropdown equal the server pool sizes for every category/difficulty/type combination (generated table test, like the study-count freshness test).
23. Player: CE attempt with API failure shows an error, not a local shuffle.

## 10. Git and PR safety (verified 2026-11-11)

| Item | State |
|---|---|
| PR #100 (`feat/content-engine-p0` -> `main`) | **open, not merged**, not draft, 1 commit (`dfce6a7`), 7 files, mergeable `clean`. Checks on `dfce6a7`: validate success, firestore-rules success, Vercel Preview Comments success, CodeRabbit skipped. One bot review comment (sibling-chapter aliases, P2) is addressed in P1-A on the P1 branch, not on PR #100's branch. |
| `main` | `8cced16` |
| `feat/content-engine-p1` | `ed415a6` pushed, 0 uncommitted files. It is **stacked on** `feat/content-engine-p0` (the P0 commit is in its history). |

Proposed PR strategy (nothing done; needs approval):
1. Keep PR #100 as the P0 PR. Do not rebase it. Its open bot comment is already resolved by code on the P1 branch.
2. Open the P1 PR with **base = `feat/content-engine-p0`** so its diff shows only P1/P1-A/Step 2 (and this doc), not P0 again. After #100 merges, retarget the P1 PR to `main` (GitHub does this automatically when the base branch is deleted; if it does not, change the base, no rebase needed because histories are linear).
3. Alternative if you prefer a single review: close nothing, merge #100 first, then open the P1 PR against `main`.
4. No merge, rebase, or force-push happens without your explicit approval. The mock-test implementation (M1-M8) would go on a **new branch** from the P1 tip (`feat/content-engine-mocktest`), as its own PR, so it can be reverted independently.

## 11. Open risks and honest limits
- This audit proves the legacy path and the CE data by script. It did not run the app in a browser or against Firestore; end-to-end behaviour (cookies, transaction, resume across devices) is verified only at M7.
- The "425" figure should no longer be quoted. Reliably auto-gradable now: 230 MCQ + 95 true/false = 325 after the options rule; 99 output are conditional on a policy; everything else is free text.
- The pool is small per class/difficulty for ISC XI (22 questions total) and zero for ISC XII. Enabling CE for those would barely change tests; it is not worth the risk until content grows.
- Moving the 28 legacy questions to server delivery (closing weakness 1 fully) is possible with the same API but changes the player for existing students; deliberately left as a later, separate approval.
- Pre-existing weaknesses 2-6 in section 1 remain unless you approve fixing them.
