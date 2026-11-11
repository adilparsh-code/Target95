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
- Branch: `feat/content-engine-p1` (based on `main` 8cced16).
- Last pushed commit: `d0e0442` (remote HEAD equal to local HEAD).
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
| 3 | Report to the user, then wait for review | IN_PROGRESS | report delivered after commit; awaiting user review |
| - | Mock-test migration | PENDING_APPROVAL | plan in P1A_ALIAS_AUDIT_AND_MOCKTEST_PLAN.md |
| - | Alias map consolidation (steps 2-4 of the plan) | PENDING_APPROVAL | |
| - | Quarantined Number Systems mapping | PENDING_APPROVAL | editorial decision |
| - | PR for the P1 branch; merging PR #100 | PENDING_APPROVAL | |

## Latest verification results
- Tests: 211 pass / 0 fail (`npm test`).
- Lint: clean on files changed in P1-A.
- Build: `next build` exit 0 after Step 2.
- Content validation: 0 errors, 28 warnings (18 chapters without questions, 4 shared-content groups, 3 stub chapters, 2 quarantined, 1 duplicate-option MCQ).

## Unresolved issues and dependencies
- ICSE supplemental (`icse-x-*`) questions are listed on chapter pages but the player route cannot open them: 36 dead links (25 before P1-A, 11 more after alias membership).
- Two Number Systems questions quarantined pending an editorial mapping.
- `studyChapterIdentity` has 3 broken legacy entries (`if-else`, `loops`, `arrays`); fixing changes studyCenter output, needs approval.
- `getQuestionBankChapter` has no route consumers (P2 deletion candidate, needs approval).
- Docs `PROJECT_CONTEXT.md` and `AUDIT_REPORT.md` still mention `questions.js`.

## Exact next action
Wait for the user's review of Step 3 report. Do not start mock-test migration, P2 or P3.
