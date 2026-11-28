# Target95 — BoardPrep Publication Governance Audit

**Audit date:** 2026-11-27
**Method:** read model review (`src/lib/boardprepCurriculum.mjs`), all three registry levels, route inspection, and the sprint census.

---

## 1. Registry chain

```
content/<board>/board.json
content/<board>/<classSlug>/class.json          -> { subjects: [{ slug, title }] }
content/<board>/<classSlug>/<subjectSlug>/subject.json
      sections[] -> groups[] -> chapters[]      -> { id, slug, title, kind, status, file, ... }
content/<board>/<classSlug>/<subjectSlug>/<file>  (chapter JSON: lessons, questions)
```

| Level | Present | Note |
| --- | --- | --- |
| Boards | 3 (`cbse`, `icse`, `isc`) | each with `board.json` |
| Classes | 6 | each with `class.json` |
| Subjects | 75 registered, 75 with `subject.json` | no dangling subject references — `validate:boardprep` would fail on a missing registry |
| Chapter entries | 206 | 146 published, 60 planned, 0 draft |
| Chapter files for published entries | 146 found, 0 missing | verified by walking `getChapter` |

## 2. Route surface

BoardPrep is served by four nested routes:

- `/learn/[board]`
- `/learn/[board]/[classSlug]`
- `/learn/[board]/[classSlug]/[subjectSlug]`
- `/learn/[board]/[classSlug]/[subjectSlug]/[chapterSlug]`

All four call the read model, and `getPublishedChapters()` filters on `status === "published"` **before** any chapter is exposed. `getChapter()` additionally returns `null` unless the metadata is both published **and** carries a `file`. There is no code path that can render a `planned` chapter.

**Verified:** with 60 planned chapters across ICSE X (mathematics 18, chemistry 12, physics 8) and ISC XI (chemistry 4, mathematics 2, physics 1) plus ICSE IX biology (11), none is student-visible. `next build` prerendered the route set without emitting any of them.

## 3. Publication state by board

| Board / class | Published | Planned | Draft | Student-visible? |
| --- | --- | --- | --- | --- |
| ICSE IX | 69 | 11 | 0 | yes, 69 chapters |
| ICSE X | 14 | 38 | 0 | yes, 14 chapters |
| ISC XI | 63 | 7 | 0 | yes, 63 chapters |
| ISC XII | 0 | 0 | 0 | nothing to show — 15 subjects registered, all empty |
| CBSE XI | 0 | 0 | 0 | nothing to show — 14 subjects registered, all empty |
| CBSE XII | 0 | 0 | 0 | nothing to show — 14 subjects registered, all empty |

## 4. Governance rules and their current state

| Rule | State |
| --- | --- |
| ICSE IX and ISC XI frozen unless an approved task requires change | **Breached in this workspace, legitimately or not** — 60 new ISC XI chapter files and 5 modified ISC XI `subject.json` files are uncommitted here. These were an approved ISC XI science batch per the workspace notes, but they are not on `main`. |
| New chapters stay `planned` | Honoured — 60 planned entries exist and stay invisible |
| New content stays `reviewStatus: draft` | **Cannot be checked.** No published chapter in the census carries `reviewStatus: "draft"`; the field exists per chapter, and the two Chemistry chapters checked in `test/boardprep-chemistry-isc-xxi.test.mjs` are `reviewStatus: "published"`. Status and `reviewStatus` are two different fields and the registry-level validator only checks the former. |
| Do not auto-publish | Honoured — no code publishes; publication is a data edit |
| Do not inflate published counts | Honoured in `main`; the uncommitted batch raises published from 83 to 146 |
| ICSE X Biology/Hindi legacy structure preserved | ICSE X Biology is the only populated ICSE X subject (14/14 published); Hindi has no chapters. Preserved. |
| Do not mechanically expand every chapter to 22 questions | Honoured — question counts vary (55–372 by subject); no uniform padding |
| CBSE isolated from CISCE | Separate board directories, separate `board.json`. **No cross-board import found.** Note that PR #113 adds `src/app/context/AuthContext.js` and rewrites `src/app/lib/firebase-admin.js`, and a separate branch is named `codex/fix-java-contamination-in-cbse-083` — historical cross-contamination in CBSE 083 is implied by that branch name and should be confirmed fixed. |

## 5. Defects found

### 5.1 Slug uniqueness was being enforced globally (fixed)

`scripts/validate-boardprep-migration.mjs` keyed published chapters by bare `slug`. Slugs are unique per subject, not globally — `photosynthesis` exists in both ICSE IX Biology and ISC XI Biology. The validator therefore reported a phantom duplicate and a 146-vs-145 chapter mismatch, and skipped 15 real questions. Fixed to key by `board/class/subject/slug`; 146/146 and 1768/1768 now reconcile.

### 5.2 `ISCP-11` p-block registry ID mismatch (open, preexisting, not fixed)

`subject.json` registers the p-block chapter as `id: "isc-11-chem-p-block-13"` while the chapter file declares `id: "isc-11-chem-pblock-13-14"`. Question IDs use the file's form. Routing is by `slug`, so nothing breaks, but the registry ID and the content ID disagree, which is a trap for any future ID-keyed lookup. Left unchanged deliberately: changing either ID requires a migration plan for the question IDs that embed it.

### 5.3 Three subject registries carry `.bak` files in-tree

`isc/class-11/{biology,chemistry,mathematics,physics}/subject.json.bak` exist as untracked backups. They are not read by the read model, but they are ship-adjacent clutter in a directory that is scanned by `dirs()`. Harmless today (`dirs()` requires `board.json` at the board level only) but should not be committed.

### 5.4 Empty boards are still navigable

`/learn/cbse` and `/learn/isc/class-12` are valid routes that list 14–15 subjects, each of which opens to an empty subject page. This is not a data bug, but it is a student-facing dead end that inflates the apparent curriculum. Recommendation: hide subjects with no published chapters, or show an explicit "coming soon" state.

## 6. Verdict

Publication governance is **structurally sound**: publication is data-driven, enforced in one read model, and no unpublished content leaks to a route. It is **operationally weak**: nothing in CI checked registry consistency until this sprint, `reviewStatus` is unvalidated at the registry level, and 43 registered subjects are empty shells that students can navigate into.
