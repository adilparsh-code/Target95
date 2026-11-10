# CLAUDE.md — Workspace checkpoint notes

## Startup facts for this workspace
- This is a Freebuff chat workspace at `/workspace/chats/e416fc825b754c70b52799ac`.
- The chat branch is `freebuff/e416fc825b754c70b52799ac`; it has no upstream configured.
- At the time of the checkpoint, `HEAD` was identical to `origin/main`:
  - commit `8cced16a1f09aec81f12d299ea13e3730990ba6f`
  - message: `Merge pull request #97 from adilparsh-code/feat/hindi-grammar-icse`
  - `feat: ICSE IX/X Hindi language section (draft, syllabus unverified)`
- The only uncommitted file at checkpoint time was:
  - `P2P3_CONTINUATION_LEDGER.md` (new, created this session to record the resume point)
- Project identity:
  - repo `adilparsh-code/Target95`
  - remotes `origin` (https) and `origin-ssh` (git@github)
  - Node project with `package.json` scripts including `validate:data`, `validate:boardprep`,
    `validate:geography`, `validate:cisce-ai`, `validate:projects`, `test`, `lint`, `typecheck`.

## Target95 boardprep content reality at checkpoint
- The boardprep content tree under `src/app/data/boardprep/content` contains many completed subjects.
- ICSE Class IX Biology is **registered but not authored** at checkpoint time:
  - `src/app/data/boardprep/content/icse/class-9/biology/subject.json` exists.
  - It lists 11 planned chapters, all `status: planned`, no `file` field.
  - The subject directory contains **only** `subject.json`; there is no `chapters/` folder and
    no chapter JSON files, so 0 Biology questions exist on disk at checkpoint time.
- ICSE Class IX Biology chapters that the registry names:
  - the-cell
  - tissues
  - flower
  - pollination-and-fertilisation
  - seeds-and-germination
  - respiration-in-plants
  - absorption-by-roots
  - transpiration
  - diversity-in-animal-kingdom
  - economic-importance-of-bacteria-and-fungi
  - nutrition
- Existing analogous completed content that can be used as a schema and style template:
  - ICSE Class X Biology: `src/app/data/boardprep/content/icse/class-10/biology/chapters/*.json`
  - ICSE Class IX Geography validator: `scripts/validate-icse-ix-geography.mjs`
- Shared BoardPrep schema/lib files:
  - `src/lib/boardprepContentSchema.mjs` (shared validate checks)
  - `src/lib/boardprepChapterNav.mjs` (sequence, neighbours, breadcrumbs, stats)
  - `src/lib/boardprepCurriculum.mjs` (subject/chapter/counts resolution)
  - `scripts/validate-boardprep-migration.mjs` (whole-library totals validator)
  - `scripts/validate-data.mjs` and `src/lib/validation/academicDataValidator.mjs` (broader validation)

## What "P2/P3 ICSE Class IX Biology" means here
- The prior session narrative described a P2/P3 continuation ledger and Biology work plan that
  are **not present in this workspace**.
- Do not assume those files exist. Validate any claim about prior Biology chapter files against
  the actual filesystem and the actual reachable Git objects before continuing.
- Do not look for the prior session's ledger under alternate names as if it were a hidden file;
  if it is not readable in this workspace, treat the resume point as "named artifacts missing,
  resume from the current measured state".

## Resume rule for ICSE Class IX Biology
- Resume point in this workspace: 0 of 11 Biology chapters authored, 0 of 132 questions.
- The next action is to author chapters in reading order from the subject registry, 12 questions
  each, validate each against `src/lib/boardprepContentSchema.mjs`, register them in
  `src/app/data/boardprep/content/icse/class-9/biology/subject.json`, and run a
  Biology-specific validator modeled on `scripts/validate-icse-ix-geography.mjs`.

## Git discipline for this repo
- This branch has no upstream; do not push to `main`, and do not force push.
- When checkpointing, stage explicitly by path; do not use `git add .`.
- Never commit secrets, keys, credentials, `node_modules`, caches, or generated junk.
- Preserve existing committed content; the boardprep chapters and registry files already on
  `main` are the source of truth for the other subjects.
- If a file is ambiguous or appears to be a temporary script, inspect it before including it.
