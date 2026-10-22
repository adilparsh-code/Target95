# Target95 — Pending Subjects Continuation Ledger

This ledger records the subject-by-subject continuation of the BoardPrep content
work: what was completed, what was verified, what is still outstanding, and the
exact commands used. Each dated section is appended; earlier sections are never
rewritten.

Sections are ordered newest first.

---

## 2026-10-22 — ICSE Class IX Geography: independent audit and repair

### The starting state, as actually found

The brief for this run named a checkout at `/workspace/Target95-integration` on the branch
`integration/target95-curriculum-quality`, and described a seven-chapter Geography checkpoint
with named helper files. **Neither exists in this environment.** There is no such directory
under `/workspace`, no such local branch, and a read-only fetch of the connected repository shows
no such branch on the remote either. The equivalent baseline is this chat's worktree, on branch
`freebuff/8e542bc2c2b830b28b0e69c8`, at HEAD `7c8cbe7`
(`docs(audit): record the geography completion commit SHA in the ledger`), which sits on
`71880bb` (`feat(boardprep): complete ICSE class IX geography`), which sits on the remote
`main` base `3a22aad`.

The reported checkpoint was checked against the base commit rather than taken on trust:

- At `3a22aad` the Geography subject registry lists all **eleven** chapters with
  `"status": "planned"` and **no `"file"` field**, and the only Geography file in the tree is
  `subject.json` itself. There were **zero chapter files and zero questions**.
- `src/lib/boardprepChapterNav.mjs` did **not** exist at `3a22aad`. It was created by the earlier
  run of this workstream, not reused from somewhere else.

So the "seven already published" chapters in the brief do not exist in this repository: the
earlier run published all eleven. This run did not recreate that implementation from assumption;
it audited the implementation that is actually in the tree, and repaired the defects that audit
found.

### What this run did

A subject-wide integrity audit of all eleven chapter files, followed by repair of the genuine
defects it found. No question, question id, option, answer, explanation or chapter id was
changed, and no question was added or removed.

The audit covered, per chapter: top-level completeness, learning outcomes, lesson structure,
per-block substance, table shape, key points, exam focus, vocabulary, figures, question-level
integrity (unique ids and prompts across the whole subject, MCQ answer/option agreement, mark
values, placeholder text, explanation length, long-answer depth against mark value), and the
map work assessment (self-containment, mark arithmetic, answer-key quality).

### Defects found, and the repairs made

1. **The Geography validator carried a carve-out on the map work assessment.** The rule that
   every map work exercise must carry the data its own answer depends on exempted
   `exercise-directions`, even though the test suite already required that data for *every*
   exercise. The carve-out was removed: the validator now requires each of the six exercises to
   carry a table or a labelled data list, validates the table against the shared block schema,
   and checks that every data row has both a label and a value. Assertion count: 2393 → 2985.
2. **Eight worked-example blocks carried a single example** where every other examples block in
   the subject carries two. Each of the eight was given a second, genuinely different worked
   example. No existing example was replaced.
3. **`weathering-and-denudation` had only three lesson sections**, against a subject norm of four
   or more. Its first lesson was split into *Weathering: the breakdown of rock in place* (physical
   weathering) and a new *Chemical and biological weathering* lesson, re-partitioning the table
   rows and prose that were already there rather than inventing new material, and a fifth
   learning outcome was added for the new split.
4. **The validator had no teaching-depth floors below the chapter level.** Floors were added for
   lessons per chapter (4), blocks per lesson (2), paragraph length (40 words), bullets (3),
   terms (3), examples (2), figures (2), key points (8), vocabulary (6) and learning outcomes (4),
   all set well under the measured depth of every chapter so that a future rewrite is not trapped.
5. **Copy-and-paste defects could pass between chapters.** The validator now detects a repeated
   question prompt or a repeated answer anywhere in the subject, not only inside one chapter, and
   it checks that a chapter carries a minimum of 800 teaching words (prose, lists, tables and
   revision material, excluding the practice questions).
6. **Two tests were added** — one for the teaching depth of every chapter, one asserting that the
   Natural Regions chapter states that the board prints no list of regions — and the map work test
   was strengthened to check the data rows and the table shape of every exercise.

### Counts, measured from the files

| Measure | Before (HEAD `7c8cbe7`) | After |
| --- | --- | --- |
| Published Geography chapters | 11 | 11 |
| Questions | 131 | 131 |
| Question-type mix (mcq / short / fill-blank / long / analytical) | 48 / 34 / 22 / 15 / 12 | 48 / 34 / 22 / 15 / 12 |
| Lesson sections across the subject | 53 | 54 |
| Teaching words across the subject | 22,192 | 23,343 |
| Learning outcomes across the subject | 53 | 54 |
| Data tables across the subject | 27 | 28 |
| Worked-example blocks with fewer than two examples | 8 | 0 |
| Geography validator assertions | 2393 | 2985 |
| Geography tests | 20 | 22 |

No question id, prompt, option, answer or explanation was altered, so the published question
count and the question-type mix are unchanged by design.

### Evidence limitations, unchanged and restated

- **The repository holds no Geography syllabus source.** An exhaustive search found only the
  `subject.json` baseline note; there is no Natural Regions region list, no map sheet and no board
  examination paper anywhere in the tree.
- **Natural Regions of the World.** The CISCE unit prescribes the *aspects* to be covered
  (location, area, climate, natural vegetation, human adaptation) but prints no numbered list of
  regions. The eight regions in the chapter are the standard set for this unit, and the chapter's
  `sourceNote` says exactly that rather than presenting them as an official enumeration. A test
  now asserts that this limitation stays stated in the file.
- **Pollution.** The unit prescribes the types of pollution, their sources, effects and
  preventive measures, and the chapter follows that structure. No case study is presented as
  syllabus-prescribed, because the syllabus prescribes none.
- **Map Reading.** The platform has no map-image component, so the map work assessment is written
  entirely as self-contained textual and tabular exercises. No map image, coordinate, legend or
  survey-sheet data has been invented, and every exercise is answerable from the data printed
  with it.
- No board examination paper was consulted for any chapter. Every question is original practice,
  marked `"origin": "practice"`.

### Files changed by this run

- `src/app/data/boardprep/content/icse/class-9/geography/chapters/weathering-and-denudation.json`
  — lesson split, fifth learning outcome
- `src/app/data/boardprep/content/icse/class-9/geography/chapters/atmosphere.json`
- `src/app/data/boardprep/content/icse/class-9/geography/chapters/earth-as-a-planet.json`
- `src/app/data/boardprep/content/icse/class-9/geography/chapters/earthquakes-and-volcanoes.json`
- `src/app/data/boardprep/content/icse/class-9/geography/chapters/interior-of-the-earth-and-rocks.json`
- `src/app/data/boardprep/content/icse/class-9/geography/chapters/maps-and-their-uses.json`
  — a second worked example added in each
- `scripts/validate-icse-ix-geography.mjs` — carve-out removed, depth floors added
- `test/boardprep-geography.test.mjs` — two tests added, map work test strengthened
- `docs/audits/PENDING_SUBJECTS_CONTINUATION.md` — this section

### Verification results

| Command | Result |
| --- | --- |
| `npm test` | **Pass** — 22/22 tests, 0 failures |
| `npm run validate:geography` | **Pass** — 11 chapters, 131 questions, 48 mcq, 22 fill-blank, 34 short, 15 long, 12 analytical, 6 map work exercises, 2985 assertions |
| `npm run validate:boardprep` | **Pass** — 3 boards, 6 classes, 75 subjects, 83 chapters, 1307 questions |
| `npm run lint` | **Pass** — no findings |
| `git diff --check` | **Pass** — no whitespace errors |
| `npx next build` | **Pass** — compiled in 841ms, 325/325 static pages, exit 0 |
| Route check (headless Chromium, 11 chapter routes + the subject page) | **Pass** — every route returns 200 with its own `h1`, a four-crumb trail, the correct pager position, the right number of lesson articles and answer disclosures, at least one data table, and the six map work exercises on Map Reading; 0 console errors, 0 page errors |
| Mobile layout (375×720, all 11 chapters, with fonts) | **Pass** — the document never overflows horizontally and no element extends past the viewport outside a horizontally scrollable table wrapper |
| Cross-subject regression (a Physics chapter, the Chemistry subject page, the class page, the board page) | **Pass** — 0 failures |

### Environment note

The Cloud VM image ships neither the shared libraries headless Chromium needs nor any system
fonts, and this environment has no root, so the packages could not be installed. They were
instead downloaded from the Ubuntu noble archive and extracted into a workspace-local directory
outside the repository, with `LD_LIBRARY_PATH` and `FONTCONFIG_FILE` pointing at it. Nothing in
the repository changes. The browser run includes a **font sanity check** — ten `W` characters at
36px must measure more than 100px — so that a fontless host cannot produce a false pass, which
is the failure mode the earlier section in this ledger warns about.

### Commit

- Branch: `freebuff/8e542bc2c2b830b28b0e69c8`
- Commit message: `fix(boardprep): audit and repair ICSE class IX geography content depth`
- Commit SHA: `a23dba8dce45fde00d9d03c1a07dc6838e887cc4` (9 files changed, 474 insertions, 18 deletions)
- Follow-up commit: the SHA line above was added in a separate documentation commit immediately
  after the content commit, so that the SHA recorded here is the SHA of the commit that actually
  carries the Geography work.

No push to GitHub and no deployment was performed.

### Remaining work

**None for Geography.** All eleven chapters are published, all 131 questions carry answers and
explanations, the map work assessment carries a complete self-contained answer key, and the
subject now passes a validator that checks the teaching depth of every chapter.

### What this does **not** claim

Geography is one subject of a larger curriculum. This ledger says nothing about the completion
state of Biology (11 planned chapters, none published), Computer Applications, Hindi, the four
planned English chapters, or any other board or class in the platform. The BoardPrep library as a
whole is **not** complete on the basis of this work.

---

## 2026-10-22 — ICSE Class IX Geography (H.C.G. Paper 2) completed

### Scope of this run

The four chapters named in the brief — **Earthquakes and Volcanoes**, **Pollution**,
**Natural Regions of the World** and **Map Reading (with the map work assessment)** —
were the last four of the eleven chapters in the ICSE Class IX Geography syllabus
baseline, and all four are now implemented and published.

A separate, earlier run of the same workstream had already produced the shared
schema helper, the navigation helper, the chapter renderer components and the first
seven chapters. This run verified that foundation, completed the remaining four
chapters, and closed out the verification and commit.

### Chapters completed in this run

| Chapter | Path | Questions |
| --- | --- | --- |
| Earthquakes and Volcanoes | `src/app/data/boardprep/content/icse/class-9/geography/chapters/earthquakes-and-volcanoes.json` | 14 |
| Pollution | `src/app/data/boardprep/content/icse/class-9/geography/chapters/pollution.json` | 13 |
| Natural Regions of the World | `src/app/data/boardprep/content/icse/class-9/geography/chapters/natural-regions-of-the-world.json` | 13 |
| Map Reading | `src/app/data/boardprep/content/icse/class-9/geography/chapters/map-reading.json` | 13 |

### Published Geography totals (measured from the chapter files)

- **Published chapters: 11 of 11** — every chapter in the subject registry now carries
  `"status": "published"` and a `"file"` reference into `chapters/`.
- **Total questions: 131.**
- **Question-type distribution** (computed from the chapter JSON, not from a hand count):

  | Type | Count |
  | --- | --- |
  | mcq | 48 |
  | short | 34 |
  | fill-blank | 22 |
  | long | 15 |
  | analytical | 12 |
  | **Total** | **131** |

- **Map work assessment: 6 exercises, 27 marks.** The exercise marks add up exactly to
  the assessment total, and every exercise carries its own data (a table or a labelled
  data list) so that its answer is derivable from the exercise alone.

### Syllabus source and its limits

- The subject registry already carried an `official-verified` syllabus baseline for
  examination year 2027: *CISCE, ICSE Examination Year 2027 Regulations and Syllabuses —
  Geography (H.C.G. Paper 2, www.cisce.org), corroborated by Oswal Publishers' 2026-27
  reproduction*. That baseline was **not** changed by this work; it is the source used to
  scope the eleven units.
- **Natural Regions of the World — limitation, stated in the chapter itself.** The CISCE
  unit prescribes the *aspects* to be covered (location, area, climate, natural vegetation
  and human adaptation) but does not print a numbered list of regions. The eight regions
  taught in the chapter are the standard set for this unit, and the chapter's `sourceNote`
  says so explicitly rather than presenting them as an official enumeration.
- **Pollution — no invented case studies.** The unit prescribes the types of pollution
  (air, water, soil, radiation, noise), their sources, effects and preventive measures,
  and the chapter follows that structure. No local case study is presented as
  syllabus-prescribed, because the syllabus does not prescribe one.
- **Map Reading — no invented map data.** The platform has no map-image component, so the
  map work assessment is written entirely as self-contained textual and tabular exercises.
  No map image, coordinate, legend or survey-sheet data has been invented, and every
  question is answerable from the exercise data printed with it.
- No board examination paper was consulted for any of the four chapters. Every question is
  original practice, marked `"origin": "practice"`.

### Files changed by this work

Shared infrastructure (created by the earlier run of this workstream, verified here):

- `src/lib/boardprepContentSchema.mjs` — shared chapter, block, question and assessment schema
- `src/lib/boardprepChapterNav.mjs` — flat chapter sequence, neighbours, breadcrumbs, subject stats
- `src/app/components/boardprep/ChapterBlock.jsx`
- `src/app/components/boardprep/ChapterBreadcrumbs.jsx`
- `src/app/components/boardprep/ChapterPager.jsx`
- `src/app/components/boardprep/PracticeCard.jsx`
- `src/app/components/boardprep/AssessmentPanel.jsx`
- `src/app/learn/[board]/[classSlug]/[subjectSlug]/[chapterSlug]/page.jsx`
- `src/app/learn/[board]/[classSlug]/[subjectSlug]/page.jsx`
- `src/lib/boardprepCurriculum.mjs` — added `getChapterQuestionCounts`
- `scripts/validate-icse-ix-geography.mjs` — focused Geography validator
- `test/boardprep-geography.test.mjs` — Geography content, renderer and navigation tests
- `src/app/data/boardprep/content/icse/class-9/geography/subject.json` — chapters published
- `package.json` — `validate:geography` script, Geography test file added to `npm test`
- `scripts/validate-boardprep-migration.mjs` — expected library totals updated for the 11 new chapters

### Verification results

| Command | Result |
| --- | --- |
| `npm test` | **Pass** — 20/20 tests, 0 failures |
| `npm run validate:geography` | **Pass** — 11 chapters, 131 questions, 6 map work exercises, 2393 assertions |
| `npm run validate:boardprep` | **Pass** — 3 boards, 6 classes, 75 subjects, 83 chapters, 1307 questions |
| `npm run lint` | **Pass** — no findings |
| `git diff --check` | **Pass** — no whitespace errors |
| `npx next build` | **Pass** — build succeeded, exit 0 |
| Route verification (headless Chromium, 12 routes) | **Pass** — 11 chapter routes and the subject page return HTTP 200 and render their content |
| Browser check (desktop 1280×900 and mobile 375×720) | **Pass** — no console errors, no page errors, no horizontal overflow |
| Unpublished-chapter route behaviour | **Pass** — a `planned` chapter outside Geography still returns HTTP 404 |

Every one of the eleven chapter routes was checked for rendered content, not only for a
status code: each returns its own `h1`, a four-crumb breadcrumb trail reaching Geography,
a pager that reports the correct position out of eleven, learning outcomes, overview
facts, lesson sections, at least one data table, key points, exam focus, vocabulary, and
one practice card per question. The Map Reading chapter additionally renders the map work
assessment panel with six exercises, each with a working "Show answer key".

The subject landing page reports `11 published chapters · 131 practice questions`, which
matches the chapter files exactly.

### Environment note

The Cloud VM image ships no system fonts, so headless Chromium laid every string out with
zero advance width and the browser assertions could not run against the real text. The
fix was to install the Debian `fonts-dejavu-core` and `fontconfig-config` packages into a
workspace-local directory outside the repository and point `FONTCONFIG_FILE` at it. This
changes nothing in the repository, but a browser run on a host with no fonts installed
will produce misleading zero-width layout results.

### Commit

- Branch: `freebuff/8e542bc2c2b830b28b0e69c8`
- Commit message: `feat(boardprep): complete ICSE class IX geography`
- Commit SHA: `71880bbcaf6068f27e4b6ecd3a027f41d8e399c9` (27 files changed, 7505 insertions, 67 deletions)
- Follow-up commit: the ledger line above was added in a separate documentation commit
  immediately after the content commit, so that the SHA recorded here is the SHA of the
  commit that actually carries the Geography work.

No push to GitHub and no deployment was performed.

### Remaining Geography work

None. The subject is complete against the eleven-unit 2027 syllabus baseline: all eleven
chapters are published, all 131 questions carry answers and explanations, and the map
work assessment carries a full answer key.

### What this does **not** claim

Geography is one subject of a larger curriculum. This ledger says nothing about the
completion state of Biology (11 planned chapters, none published), Computer Applications,
Hindi, the four planned English chapters, or any other board or class in the platform.
The BoardPrep library as a whole is **not** complete on the basis of this work.
