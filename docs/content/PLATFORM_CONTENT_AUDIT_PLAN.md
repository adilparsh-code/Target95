# Target95 Platform-Wide Content Audit and Implementation Plan

**Status:** Audit plan; not an assertion that the inventory has already been completed.  
**Scope:** All boards, all registered classes, all registered subjects, all chapters, all practice banks, and all visual assets in this repository.

## 1. Mission

Create Target95's original educational experience through independently authored explanations, examples, questions, answers, diagrams, and teaching activities. Preserve correct syllabus coverage and existing project architecture.

This plan does not authorize indiscriminate rewriting or publication.

## 2. Phase 0 — repository baseline

- Read `AGENTS.md` and any nested project instructions.
- Record the exact workspace, branch, HEAD, and full working-tree state.
- Preserve existing modified and untracked files, including content, scripts, and audit artifacts.
- Identify default branch versus active development branch. Do not treat GitHub default-branch content as a substitute for a user's uncommitted workspace.
- No destructive Git commands, dependency installation, commits, pushes, merges, or deployments unless separately authorized.

## 3. Phase 1 — inventory all academic tracks

Discover the actual registered boards, classes, subjects, units, chapters, routes, lesson modules, practice banks, and assets. Use registries and runtime loaders as source evidence.

For every board/class/subject combination report:
- exact registry identity and path;
- registered chapter count;
- chapters with content files;
- chapters marked planned/draft/review/published under the actual contract;
- chapters discoverable by student routes;
- missing files and orphaned files;
- question counts by supported type;
- visual assets and usage references;
- validator/test coverage;
- quality and provenance review state.

Do not invent counts. Distinguish registration, file presence, published metadata, successful loading, and verified student-facing rendering.

## 4. Phase 2 — architecture map

For each content system, trace:
- schema and data model;
- registry/discovery;
- loader and path resolution;
- renderer and route;
- supported content blocks;
- question validation and display;
- asset resolution and rendering;
- publication and review gate;
- validators and tests.

There may be more than one academic content architecture. Do not force legacy subject systems into BoardPrep's schema without a separately justified migration design and approval.

## 5. Phase 3 — originality and teaching-quality audit

Audit existing content without assuming it is copied or original.

Classify each chapter/asset:
- **Keep:** demonstrably suitable; no change currently indicated.
- **Improve:** retain sound original material and strengthen teaching quality.
- **Create:** required syllabus content is missing.
- **Replace after review:** provenance or originality concern needs human assessment and independently authored replacement.
- **Needs expert review:** unresolved factual, rights, or syllabus question.

Do not make plagiarism claims from intuition or superficial phrase matches. Record specific evidence and escalate uncertain material for human/legal review. No third-party text/image should be reused without a recorded basis for permission.

## 6. Phase 4 — authoring methodology

Develop subject-specific original explanations, examples, worked examples, misconceptions, revision notes, practicals, and assessments. Follow the applicable syllabus and age level.

Question counts and chapter lengths should be determined by coverage and learning value, not artificial uniformity.

Questions must be independently authored and answer-verified. Use only supported schema structures unless a separately approved engineering change is needed.

## 7. Phase 5 — visual asset production

Build a visual requirement map per chapter. Prefer original SVG/programmatic illustrations and reviewed generated visuals. Verify scientific/technical accuracy and accessibility. Maintain asset provenance and check every asset reference and rendering path.

Do not source arbitrary web images or trace book diagrams.

## 8. Phase 6 — student experience and QA

Verify subject discovery, chapter navigation, page rendering, mobile layouts, diagrams, questions, answers, and error states. Run existing validators and tests where available.

Report each result as PASSED / FAILED / BLOCKED / NOT RUN / REQUIRES MANUAL REVIEW.

Do not publish on file creation alone. Apply the exact repository publication/review contract.

## 9. Prioritization

Rank the backlog using:
1. syllabus importance and student impact;
2. missing or inaccessible syllabus coverage;
3. correctness and rights concerns;
4. broken discovery/rendering;
5. weak explanations or question quality;
6. missing high-value visuals;
7. validation gaps.

Work subject-by-subject and chapter-batch-by-chapter-batch. Complete and verify a batch before beginning the next.

## 10. Required deliverables

- Complete board/class/subject/chapter inventory.
- Content architecture map.
- Originality/provenance risk register.
- Academic quality audit.
- Visual asset inventory and gap map.
- Prioritized implementation backlog.
- Subject-by-subject completion tracker.
- Validation and publication evidence.

## 11. Current-snapshot note

The inspected GitHub `main` version contains a BoardPrep curriculum adapter and schema. In that BoardPrep path, chapter discovery/navigation filters metadata by `status === 'published'`, and the chapter loader resolves the metadata `file` path relative to the subject folder. The shared schema supports specific learning blocks and question types. These findings must not be generalized to other legacy content systems until their own routes, schemas, and loaders are inspected.

The Class IX Biology subject file currently visible on GitHub `main` lists 11 planned chapter entries and does not show chapter file references in those entries. This observation applies only to the fetched main-branch snapshot. It does not establish the state of a local working tree or other branch.
