# Target95 — QA & Build Validation Log

**Date:** 2026-11-27
**Branch:** `freebuff/3502cfafd2ffb57f5724475e`
**Base SHA:** `7ee12c8a` (workspace HEAD; `origin/main` is `fbd3417`, 74 commits ahead)
**Environment:** Node **v24.22.1**, npm **11.19.1**, Linux cloud VM. `javac`/`java` **not installed**. `python3` present at `/usr/bin/python3`. `gh` CLI not installed.
**Dependency install:** `npm ci` → exit 0 (lockfile preserved, no version changes).

---

## Results

| # | Command | Exit | Result |
| --- | --- | --- | --- |
| 1 | `npm run lint` | **0** | ESLint clean |
| 2 | `npm run typecheck` | **0** | `tsc --noEmit` clean over the 5 configured sources |
| 3 | `npm run validate:data` | **0** | 0 errors / 0 warnings; INFO lines only (see note 1) |
| 4 | `npm run validate:boardprep` | **0** | `{boards:3, classes:6, subjects:75, chapters:146, questions:1768, visitedPublishedChapters:146, questionsThroughGetChapter:1768}` |
| 5 | `npm run validate:cisce-ai` | **0** | ISC XI 22, ISC XII 15, ICSE IX 63, ICSE X 28 questions; all answers and explanations present |
| 6 | `npm run validate:projects` | **0** | 6 groups, 20 projects, 0 errors, 0 warnings |
| 7 | `npm run audit:chapters` | **0** | reports 1 unregistered chapter-like file: `src/app/data/chapter-content/10-strings.js` |
| 8 | `npm run audit:links` | **0** | 122 routes, 274 static internal links, 0 broken |
| 9 | `npm test` | **0** | **174 tests, 174 pass, 0 fail, 0 skipped** |
| 10 | `npm run build` | **0** | `✓ Compiled successfully in 4.3s`; Next.js 16.4.3 (Turbopack); full route table prerendered |

### Not run

| Check | Reason |
| --- | --- |
| `npm run test:rules` (Firestore emulator) | Requires downloading the emulator + JDK; not executed here. CI runs it in a dedicated job and it is green on every open PR head except where noted in the baseline. |
| `npm run validate:geography` | Not part of the release gate; `validate:data` covers the same data set. |
| Any Java compilation / execution | **No JDK in this environment.** Zero Java programs compiled or executed. |
| Any Python practical execution | The ISC XII Python practicals exist only on PR #115's branch; none was executed. |
| Similarity / plagiarism scan | No instrumented checker available. |
| Production smoke test | No credentials, no authorization, and `scripts/smoke-prod-auth.mjs` does not exist. |

## Fixes that changed these results

1. **`test/session-availability.test.mjs` — was failing, now 19/19.**
   The file contained a duplicated `export function load(...)` block inside a `data:text/javascript` loader string (four copies, truncated mid-expression) plus a hardcoded absolute workspace path. It could not compile, so no route could be imported and the suite reported phantom 401s. Replaced with:
   - `test/support/alias-loader.mjs` — real on-disk loader resolving `@/` → `src/` with extension/index probing, and `@/app/lib/firebase-admin` → the fake boundary.
   - `test/support/fake-firebase-admin.mjs` — one shared `state` object exported by reference, so error injection reaches already-imported handlers.
   Stale artefacts removed: the `test/fake-admin.mjs → /tmp/real-fake-admin.mjs` symlink (a file that would not exist in CI) is gone.

2. **`scripts/validate-boardprep-migration.mjs` — was exit 1, now exit 0.**
   The cross-check added earlier keyed published chapters by bare `slug`, which is unique only within a subject. `photosynthesis` exists in both ICSE IX Biology and ISC XI Biology, so the script reported a duplicate, counted 145 instead of 146 chapters and 1753 instead of 1768 questions, and never visited 15 real questions (including their answer-integrity checks). Now keyed by `board/class/subject/slug`; composite keys are also checked for duplicates.

3. **`p-block-group-13-14.json` — 4 missing explanations filled.**
   `isc-11-chem-pblock-13-14-q-12` … `-q-15` carried answers but no explanations. Explanations added; answers, IDs, ordering and question text untouched. Published explanation coverage: 1764 → 1768 of 1768.

4. **`.github/workflows/validate.yml` — gate widened.**
   Added `validate:boardprep`, `validate:cisce-ai`, `validate:projects`, `lint` and `typecheck` to the `validate` job. Previously CI never ran them, which is why defect (2) could sit undetected: `validate:data` does not read the BoardPrep registry.

## Notes

1. `validate:data` prints INFO lines such as `[REGISTRY] chapter-content registry chapter not present in javaCurriculum.js: variables-data-types` and `: loops`. These are informational, exit 0, and preexisting — the chapter-content registry contains slugs that the Java curriculum module does not. Not treated as a failure.
2. `audit:chapters` reports `src/app/data/chapter-content/10-strings.js` as an unregistered chapter-like file. Preexisting, exit 0, not a release blocker.
3. Node emits `MODULE_TYPELESS_PACKAGE_JSON` warnings when importing `src/**/*.js` as ESM. Harmless; adding `"type": "module"` to `package.json` would silence it but would also change how every CommonJS config file is parsed — not worth the blast radius.
4. `npm test` currently runs 12 named test files. `test/boardprep-chemistry-isc-xxi.test.mjs` (12 tests, all passing when run directly) is **not** in that list, so CI does not execute it. Adding it is a one-line change to the `test` script; it was left alone here because the file itself is still uncommitted.
5. Re-running `npm ci` after a workspace restore is required before any check that needs `next`, `eslint` or `tsc`. `npm test` alone works with zero dependencies because it only uses Node built-ins.

## Honest summary

Nine of nine configured gates pass, plus the production build. Nothing was skipped to make them pass, no assertion was weakened, and no test was silenced. What is **not** proven by this log: that the app authenticates in production, that any Java or Python program runs correctly, that any question is academically correct, or that any content is free of third-party copyright.
