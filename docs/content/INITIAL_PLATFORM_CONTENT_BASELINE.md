# Target95 — Initial Platform Content Baseline

**Snapshot inspected:** GitHub `main` at `b82a85d1a7f45935d46d4a69b1c2e1c7ee07094c`  
**Date of inspection:** 2026-11-09  
**Status:** Partial evidence-based baseline; not a full repository tree crawl and not a certification of originality.

## 1. BoardPrep registry facts

The BoardPrep migration validator in `scripts/validate-boardprep-migration.mjs` declares these expected totals and validates actual loaded records against them:

| Measure | Expected by validator |
|---|---:|
| Boards | 3 |
| Classes | 6 |
| Registered subjects | 75 |
| Published chapters | 83 |
| Questions | 1,307 |

These are validator expectations, not a fresh successful execution in this review. The connected GitHub file API was used to inspect source files; no local dependencies or runtime test environment were available through this GitHub-only inspection.

BoardPrep board definitions inspected:
- ICSE (CISCE): Classes IX–X.
- ISC (CISCE): Classes XI–XII.
- CBSE: Classes XI–XII in the BoardPrep registry.

This does not describe all legacy CBSE application routes or all other academic modules in the repository.

## 2. Verified BoardPrep implementation contract

Inspected:
- `src/lib/boardprepContentSchema.mjs`
- `src/lib/boardprepCurriculum.mjs`
- `src/lib/boardprepChapterNav.mjs`

The shared BoardPrep schema supports question types:
`mcq`, `fill-blank`, `short`, `long`, `analytical`, `hots`, `transformation`, `extract`.

Learning block types:
`paragraph`, `terms`, `bullets`, `examples`, `table`.

The chapter validator requires, among other fields:
- kebab-case chapter ID, title, kind, tagline, reviewStatus;
- sourceNote with a string `thirdParty` field and non-empty `boardprep` field;
- overview intro and non-empty facts;
- non-empty learn sections with valid block structures;
- keyPoints, examFocus, vocabulary;
- non-empty questions with unique IDs and valid question structures.

The curriculum loader reads subject metadata from `src/app/data/boardprep/content`. A chapter is discoverable as published only when its registry metadata has `status: "published"`; its `file` path is resolved relative to the subject directory. Navigation uses the same published status filter.

These rules apply to this BoardPrep system. Other legacy content modules must be inspected against their own contracts before being migrated or rewritten.

## 3. ICSE Class IX evidence

The inspected `src/app/data/boardprep/content/icse/class-9/class.json` registers nine subjects:
1. English
2. History & Civics
3. Mathematics
4. Physics
5. Chemistry
6. Biology
7. Geography
8. Hindi
9. Computer Applications

The inspected Biology registry `src/app/data/boardprep/content/icse/class-9/biology/subject.json` contains 11 syllabus-listed chapter entries. In this snapshot all 11 are marked `planned`; none has a `file` reference. This is strong evidence that Biology content is not yet published through this BoardPrep registry on this snapshot. It is not proof that no parallel Biology material exists in legacy modules.

The inspected Geography validator `scripts/validate-icse-ix-geography.mjs` contains an explicit 11-chapter inventory and subject-level checks. The existing audit ledger `docs/audits/PENDING_SUBJECTS_CONTINUATION.md` reports Geography at 11 published chapters and 131 questions, with prior validator, test, lint, build, route, and mobile checks recorded. Those are historical reported results in the ledger, not rerun in this GitHub-only review.

The repository also has a separate ICSE Robotics & AI implementation:
- `src/app/data/icseRoboticsAI.js`
- `src/app/isc/robotics-ai/page.jsx`
- `scripts/validate-cisce-ai.mjs`

The page reads the Class IX units and question bank directly from the Robotics & AI data module. This is a distinct content architecture from BoardPrep chapter JSON. Do not force it into BoardPrep without an approved migration plan.

## 4. CBSE evidence

The inspected `src/app/data/cbse/CBSE_2026_27_MASTER_AUDIT.md` lists eight tracks:
- Class IX Information Technology (402)
- Class X Information Technology (402)
- Class XI Computer Science (083)
- Class XII Computer Science (083)
- Class XI Informatics Practices (065)
- Class XII Informatics Practices (065)
- Class XI Information Technology (802)
- Class XII Information Technology (802)

The audit records 2026–27 syllabus/content mapping as completed, while question-bank and assessment audits remain pending. It also describes a later canonical content pass for these tracks. This is a repository audit claim, not independent verification of every unit, question, mock-test distribution, or student-facing route.

The CBSE legacy curriculum is maintained separately in `src/app/data/cbse/curriculum-2026-27.js` and related source/registry modules. The CBSE class IX/XI BoardPrep paths do not map one-to-one to the BoardPrep board registry inspected above.

The CBSE audit explicitly distinguishes:
- 083 Computer Science (Python);
- 065 Informatics Practices (Python/Pandas/SQL);
- 802 Information Technology (Java);
- 402 Information Technology (separate skill-subject track).

These tracks must not be merged or assigned the wrong language assumptions.

## 5. Known validation entry points

The inspected `package.json` exposes:
- `npm test`
- `npm run lint`
- `npm run validate:data`
- `npm run validate:boardprep`
- `npm run validate:geography`
- `npm run validate:cisce-ai`
- `npm run validate:projects`
- `npm run audit:chapters`
- `npm run audit:links`

Presence of a script does not mean it has been run in this review. Each track needs its own relevant validator and route tests.

## 6. Immediate priorities

1. Reconcile the current Freebuff working tree and uncommitted changes before any Git synchronization. This GitHub snapshot cannot reveal uncommitted local files.
2. Inventory every BoardPrep subject and chapter by reading all registry files and matching chapter file references to files on disk.
3. Audit originality/provenance without making unsupported plagiarism accusations.
4. Start with ICSE Class IX Biology only after its actual route/schema/assets and syllabus baseline are verified; 11 registry entries are currently planned.
5. Audit remaining ICSE IX subjects individually; do not assume the Geography completion report generalizes to them.
6. Audit all eight CBSE tracks' questions, answers, practicals, mock coverage, and student-facing routes.
7. Inventory ISC XI/XII subjects and their actual content/assessment coverage.
8. Inventory legacy Java/Computer Applications, Robotics & AI, ISC CS, and any other non-BoardPrep content systems separately.

## 7. Evidence limitations

- This report was prepared from selected files fetched from GitHub `main`, not a complete repository checkout.
- The current Freebuff workspace may contain uncommitted work not present on GitHub.
- The full 75-subject/83-chapter/1,307-question totals are expected values in a validator; they were not freshly executed here.
- The repository's own audit reports contain useful prior results, but historical results have not been independently rerun in this review.
- No automated plagiarism scan or legal review was performed.
- No changes were made to existing academic content, application code, registries, routes, or assets.

This baseline is intended to accelerate the next audit and authoring batches without confusing registered, authored, validated, and published content.
