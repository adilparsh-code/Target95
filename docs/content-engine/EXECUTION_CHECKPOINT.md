# Content engine: execution checkpoint

Persistent state for the Target95 content-engine work. On every resumed session:
read this file, compare it with the real repository (`git status`, `git log`,
`git ls-remote`), confirm the last operation finished, then resume the first
task that is not COMPLETED and is approved. Never repeat completed work.

Statuses: COMPLETED, IN_PROGRESS, BLOCKED, PENDING_APPROVAL, NOT_VERIFIED.
A task is COMPLETED only with evidence recorded next to it.

## Git safety rules (standing)
- Never overwrite uncommitted work. Never force-push. Never reset or discard changes without explicit approval.
- Verify the remote HEAD before pushing; never duplicate a completed commit.
- Do not merge PRs without explicit approval.
- No P2 or P3 work. No deletion of legacy files. Do not change Java/java route casing.
- Do not modify `mocktestQuestions.js` or `mocktestAttempts`. Mock-test migration is not approved yet.
- The two Number Systems questions (`icse-x-numbers-program-003`, `icse-x-numbers-case-004`) stay quarantined.
- Do not consolidate duplicate chapters.

## Repository state (last verified 2026-11-11)
- Repo: adilparsh-code/target95, working copy `/home/claude/target95` (re-clone with `git clone --depth 1` if missing).
- Branch: `feat/content-engine-mocktest` (stacked on `feat/content-engine-p1` @ 1178499; P1 is stacked on P0 `feat/content-engine-p0`; main 8cced16).
- Last pushed commit: see `git log` (ed415a6 = Step 2; the mock-test architecture doc commit follows it).
- PR #100 (`feat/content-engine-p0` -> `main`): open, not merged. P1 has no PR yet.
- The stop hook sometimes reports "unpushed commits / no remote branch"; this is a false alarm when `git ls-remote --heads origin feat/content-engine-p1` equals local HEAD.
- Uncommitted files: see the task log below (updated at each milestone).

## Task log
| Step | Task | Status | Evidence |
|---|---|---|---|
| P0 | schema, validator, static adapter | COMPLETED | commit dfce6a7, PR #100 open |
| P1 | identity table, mocktest.js + StudentGlobalSearch migration | COMPLETED | commit f7005f5 |
| P1 | BookmarksList + study centre counts | COMPLETED | commit 29e1d30 |
| P1-A | chapter question consistency (/study, /Java, question player) | COMPLETED | commit d0e0442 pushed; `npm test` 209/209; `next build` exit 0 (re-checked tests 2026-11-11); 0 count/list mismatches |
| 1 | P1-A final verification | COMPLETED | remote HEAD d0e0442 == local; tests 209/209; build log ends `BUILD_EXIT 0` |
| 2 | ICSE supplemental question player support | COMPLETED | `recordToPlayerQuestion` adapter wired into catalog playerIndex; dead links 36 -> 0 (test no longer exempts icse-); `npm test` 211/211; eslint clean; `next build` exit 0 |
| 3 | Report to the user, then wait for review | COMPLETED | Step 2 reviewed and ACCEPTED by user |
| 4 | MockTest integration: architecture review (read-only) | COMPLETED | `MOCKTEST_INTEGRATION_ARCHITECTURE.md` written; no implementation file touched; PR #100 verified open/unmerged/clean |
| 5 | MockTest implementation (approved 2026-11-12) | COMPLETED | decisions: 230 MCQ + 95 T/F (=325), exclude CH13-MCQ-003, output, free text; T/F options ["True","False"]; flag default off; ICSE X first, IX after smoke test, ISC XI needs readiness, ISC XII unavailable; no plan gating; stacked PRs, no merges |
| 5A | Phase A: class metadata + legacy golden fixture | COMPLETED | commit e251b69; npm test 217/217 |
| 5B | Phase B: server pool + per-attempt delivery | COMPLETED | commit e9b2c04 (with 5C). `mocktestContent.js` (325 pool, flag `MOCKTEST_CE_CATEGORIES` default off, ICSE X/IX enableable only), `mocktestService.js`, routes POST attempts / GET attempts/[id] / GET availability; key-free payloads; npm test 245/245; committed together with 5C |
| 5C | Phase C: legacy compat + authoritative grading | COMPLETED | `gradeAttempt` resolver (legacy direct lookup, `ce:` via server resolver), `reveal` never stored, idempotent submit (replay), late-submission flagged not rejected; golden legacy tests green; 245/245 |
| 5D | Phase D: client integration + results | COMPLETED | commit 1a9c5c5. `mocktestClient/Session/Result.js`, `useMockAttemptSession`, player/result/setup pages; submit failure = visible retry, lost-response replay, stale drafts discarded with notice; npm test 263/263, eslint clean, `next build` exit 0 |
| 5E | Phase E: rollout flag, regression, bundle audit, docs | COMPLETED | `MOCKTEST_ROLLOUT_AND_ROLLBACK.md`, `scripts/check-mocktest-bundle.mjs` (PASS: 0 static mock-test chunks embed the bank; 1 on-demand catalog chunk via global search), flag default OFF tested; npm test 265/265, eslint clean, `next build` exit 0 |
| 6 | Report mock-test implementation to user, wait for review | IN_PROGRESS | branch pushed; no PR created for it; no merges |
| - | Enable the flag in any environment; ISC XI readiness; output-question grading policy; search answer-free index; attempt expiry/rate limit | PENDING_APPROVAL | see MOCKTEST_ROLLOUT_AND_ROLLBACK.md section 5 |
| - | Alias map consolidation (steps 2-4 of the plan) | PENDING_APPROVAL | |
| - | Quarantined Number Systems mapping | PENDING_APPROVAL | editorial decision |
| - | PR for the P1 branch; merging PR #100 | PENDING_APPROVAL | |

## Latest verification results
- Tests: 265 pass / 0 fail (`npm test`).
- Lint: clean on files changed in P1-A.
- Build: `next build` exit 0 after Step 2.
- Content validation: 0 errors, 28 warnings (18 chapters without questions, 4 shared-content groups, 3 stub chapters, 2 quarantined, 1 duplicate-option MCQ).

## Unresolved issues and dependencies
- ICSE supplemental (`icse-x-*`) questions are listed on chapter pages but the player route cannot open them: 36 dead links (25 before P1-A, 11 more after alias membership).
- Two Number Systems questions quarantined pending an editorial mapping.
- `studyChapterIdentity` has 3 broken legacy entries (`if-else`, `loops`, `arrays`); fixing changes studyCenter output, needs approval.
- `getQuestionBankChapter` has no route consumers (P2 deletion candidate, needs approval).
- Mock-test audit: reliably auto-gradable CE questions are 230 MCQ + 95 true/false (needs fixed True/False options); 99 output questions need a grading policy; the earlier "425" figure is superseded. Legacy answer keys are already in the client bundle (pre-existing).
- Docs `PROJECT_CONTEXT.md` and `AUDIT_REPORT.md` still mention `questions.js`.

## Exact next action
Wait for the user's review of the mock-test implementation report. Do not enable the flag, start P2/P3, merge or rebase PR #100 / any PR, or force-push.
