# Content engine: P1-A alias audit and mock-test plan

Status: audit only. Nothing here deletes a legacy mapping or touches the mock-test engine.

## 1. The four slug maps

| # | Where | What it decides | Consumers (after P1-A) |
|---|---|---|---|
| 1 | `SLUG_MAP` in `lib/javaChapterQuestionBank.js` | which bank file feeds which route slugs (`loops` -> `loops, for-loop, while-loop, do-while-loop`) | `chapterQuestionBankBySlug`: `lib/curriculum.js`, `questionBankAdapter.js` (practiceHref), catalog membership. `allJavaChapterQuestions`: `Stats.jsx`, `questionBankAdapter.js` |
| 2 | implicit, `getQuestionBankChapter` in `lib/questionBankAdapter.js` (exact match on the primary target slug) | what a chapter page listed | none: both routes moved to the content selectors in P1-A |
| 3 | `LEGACY_TO_CANONICAL_SLUG` + `CANONICAL_TO_STUDY_SLUG` in `lib/studyChapterIdentity.js` | study slug <-> canonical slug, content reuse | `lib/studyCenter.js` only |
| 4 | `CANONICAL_IDENTITY` in `content/identity.mjs` (new, P1) | the identity table used by the catalog, selectors, counts, bookmarks | catalog, selectors, `studyCenter` counts |

### Disagreements found
- Map 3 has 3 broken entries: `if-else -> conditional-statements`, `loops -> iterative-statements`, `arrays -> arrays` do not name a canonical chapter, so `adaptStudyChapterIdentity` reports them as `legacy` and drops canonical metadata. Map 4 resolves them to `if-else`, `for-loop`, `arrays-1d`.
- `CANONICAL_TO_STUDY_SLUG` (map 3) equals the `contentSlug` column of map 4 for all 19 canonical chapters (checked by script).
- Map 3 also resolves `constructor` via a plain object lookup; map 4 uses own-property checks.
- Map 2 listed questions by exact primary slug, so `/Java/for-loop`, `/study/introduction`, `/Java/arrays-1d`, `/Java/classes-objects`, `/Java/data-types-variables`, `/study/data-processing-in-java` listed 0 questions while the counts said 43 to 49 (9 of 46 routes disagreed). Fixed in P1-A.

## 2. Safe consolidation strategy (nothing below is done yet)
1. Keep map 4 the only hand-written table. A test already requires that every slug of maps 1 and 3 resolves through it.
2. Rewrite map 3 as a projection of map 4 (`CANONICAL_TO_STUDY_SLUG` = contentSlug, `LEGACY_TO_CANONICAL_SLUG` = aliases). This flips the 3 broken entries from `legacy` to `javaCurriculum` identity in `adaptStudyChapterIdentity`; check what `studyCenter` consumers do with `canonicalSlug` first. Needs approval because it changes studyCenter output.
3. Keep map 1 as content routing but key it by canonical chapter id, deriving route slugs from map 4. Needs approval (touches `curriculum.js`, `Stats.jsx`, adapter).
4. Map 2 (`getQuestionBankChapter`) now has zero route consumers: a P2 deletion candidate after a repeat reference audit and confirmation.
5. Delete nothing until each step's consumers are proven migrated by `grep` plus the consistency tests.

## 3. Mock-test implementation plan (not started; needs approval)

Current flow: config -> `buildMockTestPool` (28 hand-written questions in `mockTestQuestions.js`, ids 1001...) -> `POST /api/mock-tests/attempts` stores `questionIds` -> client renders from its bundled pool -> `POST .../submit` re-resolves ids through the same pool and grades with `gradeAttempt` -> `results/{id}`.

**Stable legacy ids.** The 28 questions keep their numeric ids and stay in `mockTestQuestions.js` unchanged. Content-engine questions enter the pool under a namespaced id (`ce:<question id>`), so ids never collide and never get renumbered.

**Existing attempt compatibility.** `gradeAttempt` resolves stored ids against one combined pool (legacy 28 + content engine). Any in-progress attempt or localStorage draft with a legacy id keeps resolving. Add a test that grades an attempt created before the change. Attempts store `questionIds` only, so no stored document changes.

**Server-authoritative grading.** Unchanged principle: the client sends raw answers only. Grading stays in `gradeAttempt`. For `ce:` questions the answer key is read server-side from the catalog; the client never needs the answer key for scoring.

**Class IX/X metadata.** The bank has `ICSE IX` (269) and `ICSE X` (549) in the legacy records, but the unified question drops it. Add `class` (and keep `marks`) to the unified question, then map `icse-class-9/10` categories onto it. Without this, a Class IX test would draw Class X questions.

**Client bundle size.** The player currently bundles its pool. The full catalog is about 106 KB gzipped. Plan: have `POST /attempts` return the selected question payload (without answer keys) so the player stops importing the pool for content-engine questions; keep the 28-question pool bundled as today.

**Auto-gradable versus manual.** `evaluateMockTestAnswer` is exact text match for `mcq`, `output`, `true-false`, `assertion-reason`; everything else uses a keyword heuristic (`scoreFreeTextAnswer`). Real bank mix: 231 mcq, 95 true-false, 99 output (auto-gradable, 425 total); 92 fill-blank, 140 debugging, 61 programming, 44 case-based, 94 theory (free text, 431 total). Plan: phase 1 admits only the auto-gradable types, flagged `gradable: "auto"`. Free-text types stay out until a grading policy is decided (manual review or heuristic with a visible "not auto-graded" label).

**Rollout order.** (a) schema: add `class`, `gradable`; (b) combined pool behind a flag, with tests for legacy-id attempts; (c) server-delivered payload; (d) enable per category (ICSE X first). Each step reversible.
