# Target95 — GitHub Baseline

**Audit date:** 2026-11-27
**Repository:** `adilparsh-code/Target95`
**Method:** live GitHub REST API reads (public, unauthenticated) + `git fetch` into the review workspace. No previous report was trusted.

---

## 1. Branch baseline

| Item | Value |
| --- | --- |
| Workspace branch | `freebuff/3502cfafd2ffb57f5724475e` (ephemeral review branch) |
| Workspace HEAD | `7ee12c8a235537cd39eca447c62b20480e6c2397` — *feat(target95): add Ace intro and explore all subjects* |
| `origin/main` tip | `fbd341781dfae57e1460e594e0ec902de922b6ce` |
| Ahead / behind vs `origin/main` | **1 ahead / 74 behind** |

**This is the single most important baseline fact.** The review workspace is 74 commits behind `origin/main` and carries one local commit that is not on `origin/main`. Any statement about "current main" in this document refers to `origin/main` at `fbd3417`, not to the workspace tree.

The workspace also holds a large body of uncommitted work (see §5) that exists nowhere on GitHub. It was **not** pulled, reset, stashed or discarded.

## 2. Pull requests (state as reported by the GitHub API)

All pull requests numbered 100 and above. **None are merged.** Merged-PR history for this range is empty.

| PR | Title (abbreviated) | State | Base | Head branch | Head SHA | CI on head | Class |
| --- | --- | --- | --- | --- | --- | --- | --- |
| #115 | audit(java): start provenance review and harden empty-array inputs | open, draft | `feat/java-content-icse-x-isc-xii` | `audit/java-python-originality` | `44f50c09` | validate ✅, firestore-rules ✅, Vercel ✅ | Blocked (stacked on #110) |
| #114 | feat(web-engine): Phase 2 authenticated internal search API | open, draft | `feat/web-engine-foundation` | `feat/web-engine-api` | `1c2b1371` | web-engine-api-checks ✅ | Blocked (stacked on #108) |
| #113 | Feature/target95 student whatsapp bot | open | `main` | `feature/target95-student-whatsapp-bot` | `1211294f` | **Vercel Preview ❌** | Fix required |
| #112 | fix(auth): stop hiding real login errors; fix service worker preload | open | `main` | `fix/google-login-error-visibility` | `a4fc2033` | validate ✅, firestore-rules ✅, Vercel ✅ | Review-ready (auth P0) |
| #111 | security(firestore): block student reads of answer-bearing question docs | open, draft | `main` | `security/restrict-student-question-key-reads` | `fd068789` | validate ✅, firestore-rules ✅ | Review-ready (security P0) |
| #110 | feat: strengthen ICSE X and ISC XII Java content for CISCE 2028 | open, draft | `main` | `feat/java-content-icse-x-isc-xii` | `f15897dc` | validate ✅, firestore-rules ✅ | Review-ready |
| #109 | fix(auth): construct NextRequest for server admin gate | open, draft | `main` | `fix/admin-server-gate-nextrequest` | `994fd74d` | validate ✅, firestore-rules ✅ | Review-ready |
| #108 | feat(web-engine): Phase 1 internal search foundation | open, draft | `feat/content-engine-mocktest` | `feat/web-engine-foundation` | `8bf71590` | web-engine-unit-tests ✅ | Blocked (stacked on #102) |
| #107 | fix: complete Phase 1 content correctness and MCQ validation | **closed, unmerged** | `main` | `fix/phase1-content-correctness` | `b44d7efb` | n/a | Close-candidate confirmed |
| #106 | fix(study): chapter navigation, reading progress… | **closed, unmerged** | `main` | `fix/student-experience-p1` | `cc1029b9` | n/a | Close-candidate confirmed |
| #105 | Boardprep/icse x validation | **closed, unmerged** | `main` | `boardprep/icse-x-validation` | `67ffd5ff` | n/a | Close-candidate confirmed |
| #104 | Boardprep/84 chapter remediation v2 | **closed, unmerged** | `main` | `boardprep/84-chapter-remediation-v2` | `badf76b0` | n/a | Close-candidate confirmed |
| #103 | fix(search): study search threw for chapters with level-grouped examples | **closed, unmerged** | `main` | `fix/study-search-examples-guard` | `4958d637` | n/a | Close-candidate confirmed |
| #102 | feat(mocktest): content-engine questions via server-side delivery (flag off) | open | `feat/content-engine-p1` | `feat/content-engine-mocktest` | `7e5f864f` | Vercel ✅ only | Blocked (stacked on #101) |
| #101 | Content engine P1/P1-A: canonical chapter identity… | open | `main` | `feat/content-engine-p1` | `6fa5c485` | Vercel ✅ only | Needs review before #102 |
| #100 | feat(content): unified content engine P0 | **closed, unmerged** | `main` | `feat/content-engine-p0` | `54fdce80` | n/a | Close-candidate confirmed |

### Stack structure (do not merge out of order)

```
#101  feat/content-engine-p1            (base main)
  └─ #102  feat/content-engine-mocktest (base = #101 head)
       └─ #108  feat/web-engine-foundation (base = #102 head)
            └─ #114  feat/web-engine-api  (base = #108 head)

#110  feat/java-content-icse-x-isc-xii  (base main)
  └─ #115  audit/java-python-originality (base = #110 head)
```

Merging #102, #108, #114 or #115 before its parent would import an incomplete dependency.

### What CI actually proves

`.github/workflows/validate.yml` runs, in order: lockfile check, `npm ci`, `validate:data`, `audit:chapters`, `audit:links`, `npm run build`, `npm test`. A second job runs the Firestore rules suites under the emulator.

It does **not** run `npm run lint`, `npm run typecheck`, `validate:boardprep`, `validate:cisce-ai`, `validate:projects`, or `validate:geography`. A green "validate" check therefore does **not** mean the BoardPrep registry is internally consistent — that is exactly how the count-mismatch regression described in `TARGET95_QA_VALIDATION_LOG.md` survived unnoticed. This gap is fixed in this sprint (§6).

`main` has **no branch protection evidence and no CI on the workspace's own commit**; the 74-commit gap also means several of these branches were cut from a `main` that has since moved.

## 3. Unresolved review comments

Not retrievable without an authenticated API token; `gh` is not installed in this environment. **Status: UNKNOWN.** Treat every PR above as having unread review comments until reviewed in GitHub's UI.

## 4. Mergeability / conflicts

`mergeable_state` was not populated for open PRs at read time (GitHub computes it lazily). **Status: UNKNOWN** for all open PRs. Because `origin/main` moved 74 commits past the workspace, the PRs targeting `main` (#109, #110, #111, #112, #113, #101) are the most likely to conflict.

## 5. Local work not present on GitHub

Modified (tracked, uncommitted):

- `scripts/validate-boardprep-migration.mjs`
- `src/app/api/admin/_helpers.js`
- `src/app/api/ai-tutor/route.js`
- `src/app/api/auth/session/route.js`
- `src/app/api/mock-tests/attempts/route.js`
- `src/app/api/mock-tests/attempts/[id]/submit/route.js`
- `src/app/data/boardprep/content/isc/class-11/{biology,chemistry,english,mathematics,physics}/subject.json`
- `src/app/data/iscXIIJavaPythonContent.js`
- `src/app/isc/class-xii/[topic]/page.jsx`
- `src/app/lib/server-auth.js`
- `src/lib/boardprepCurriculum.mjs`
- `test/session-availability.test.mjs`

Untracked and not on GitHub:

- `src/app/data/boardprep/content/isc/class-11/*/chapters/` — **60 new ISC XI chapter files** (Biology 14, Chemistry 11, English 16, Mathematics 13, Physics 9)
- `test/boardprep-chemistry-isc-xxi.test.mjs`
- `test/support/{alias-loader,fake-firebase-admin}.mjs`
- `scripts/audit/sprint-inventory.mjs`
- `scripts/inventory-isc-xi-science.mjs`
- `*.subject.json.bak` backups, `ISC_XI_XII_BATCH1_*.md`, `tmp/`, and ~90 `.log` scratch files

The 60 new ISC XI chapter files are the substance behind the jump from 83 published chapters (the old hardcoded expectation) to 146. They are unpushed and unbacked-up.

## 6. Actions taken in this sprint

1. `test/session-availability.test.mjs` repaired — it had a duplicated, syntactically broken `data:` loader string and a hardcoded absolute workspace path, so it could not import any route. Replaced with a real loader module (`test/support/alias-loader.mjs`) and a shared fake Admin SDK (`test/support/fake-firebase-admin.mjs`). 19/19 pass.
2. `scripts/validate-boardprep-migration.mjs` corrected — it keyed published chapters by bare `slug`, which is only unique per subject, producing false duplicate/`count` failures. Now keyed by `board/class/subject/slug`. Exit 0, 146 chapters / 1768 questions reconciled.
3. CI gap closed — `validate:boardprep`, `validate:cisce-ai`, `validate:projects`, `lint` and `typecheck` added to `validate.yml`.

## 7. Recommended next actions (owner decisions required)

1. **Recover the workspace.** 60 unpublished ISC XI chapter files and 13 modified source files exist on one ephemeral branch. Commit them to a named branch and push before anything else. This is the highest-value, lowest-risk action available.
2. **Rebase or re-cut PRs onto current `main`** (`fbd3417`); the 74-commit drift invalidates the "green CI" claim for anything branched earlier.
3. Review #112 and #109 first — they are small, `main`-based, CI-green and sit on the P0 authentication path.
4. Merge #101 → #102 → #108 → #114 in order, or close the whole web-engine stack and rebuild it; a four-deep draft stack that has never been merged is a maintenance liability.
5. Do not merge #113 until the Vercel Preview failure is explained.
