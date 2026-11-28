# Target95 Original Educational Content Standard

**Status:** Proposed project-wide standard  
**Scope:** Every registered board, class, subject, chapter, question bank, and learning asset in Target95  
**Purpose:** Establish a distinctive, independently authored educational platform and reduce avoidable intellectual-property risk.

## 1. Core principle

Target95 is an educational learning product, not a digital reproduction of textbooks. New explanations, teaching sequences, examples, questions, diagrams, illustrations, and learning activities must be independently developed for Target95.

Academic facts, standard terminology, mathematical methods, scientific principles, programming concepts, and syllabus requirements must remain accurate. Originality does not mean changing established facts.

This standard does not constitute legal advice or a guarantee of copyright clearance. Obtain qualified legal review before commercial publication where third-party works, literary texts, images, datasets, or ambiguous rights are involved.

## 2. Reference-use boundaries

Use authoritative and appropriately accessible material to verify:
- board syllabus and learning outcomes;
- factual, scientific, historical, mathematical, and technical accuracy;
- standard terminology and examination requirements.

Treat the syllabus as a coverage boundary, not as permission to reproduce a publisher's expression or presentation.

Do not:
- copy textbook prose, solutions, exercises, answer keys, distinctive examples, diagrams, tables, or page designs;
- mechanically paraphrase a source paragraph sentence by sentence;
- trace or closely imitate a protected illustration;
- use scans, screenshots, or photographs of book pages as learning content;
- assume publicly accessible images or PDFs are free to reuse;
- remove watermarks or attribution;
- use third-party assets without recording and checking their license and permitted use.

When source material is uncertain, stop reuse of that material, mark it for human review, and independently author a replacement from legitimate factual/syllabus references.

## 3. Original teaching method

Write as a skilled teacher explaining a concept to the relevant age group. Build understanding progressively rather than mirroring a book's sequence or wording.

For each suitable chapter, consider:
- purpose and learner-friendly introduction;
- measurable learning outcomes;
- concept-by-concept explanations;
- original examples and analogies;
- key terms using accurate standard terminology;
- worked examples or process walkthroughs;
- common misconceptions;
- concise revision notes;
- syllabus-aligned original practice;
- correct answers and explanations;
- safe practical, coding, observation, or application activities.

Do not force identical structures on every subject. Mathematics needs reasoning and worked problems; sciences need accurate processes and diagrams; computing needs tested code and algorithms; languages need original examples and copyright-aware literary analysis; humanities need reliable evidence, chronology, spatial reasoning, and balanced context.

## 4. Original questions and assessment

Create questions independently. Match the actual board, class, syllabus, and existing supported question schema. Do not reproduce commercial question-bank items, proprietary answer keys, or distinctive question sets.

Every item should have an appropriate unique ID, chapter mapping, clear wording, valid answer, appropriate difficulty, and a meaningful explanation or marking guidance where supported. Check calculations, code, scientific claims, and ambiguous wording.

Past-paper use requires separate rights and provenance checks. A board's public availability does not by itself establish permission to republish an entire paper or its protected selection/arrangement.

## 5. Original visual assets

Prefer original SVG, programmatically generated diagrams, charts, maps, timelines, flowcharts, CSS-based learning visualizations, or image-generation outputs that are subsequently checked by a subject expert.

For every asset record:
- stable asset ID and repository path;
- board/class/subject/chapter usage;
- description and educational purpose;
- creator or generation method;
- creation date;
- source/provenance and license evidence, if any;
- human accuracy review;
- accessibility text and caption.

Verify every label, unit, arrow, proportion, symbol, and scientific/technical detail. AI-generated labels must be manually checked. Provide useful alt text; decorative assets should be marked decorative according to the renderer's conventions. Do not invent paths or introduce an unsupported asset mechanism.

## 6. Provenance and review

Maintain a provenance record for every newly authored chapter and asset. Distinguish:
- original Target95 authorship;
- factual verification references;
- licensed third-party material;
- unknown or unresolved provenance.

A provenance record is evidence of process, not a legal certificate.

Use a review state supported by the actual repository model. Never invent a new status field or mark something published merely because a file exists. A chapter is publishable only after its content, data contract, assets, student-facing route, and repository-specific approval requirements have been verified.

## 7. Technical compatibility

Before authoring a content track:
1. inspect the active repository instructions and working tree;
2. identify the actual registry and source of truth;
3. inspect the schema and validators;
4. trace chapter loading, rendering, routes, and navigation;
5. inspect supported block/question/asset forms;
6. inspect actual publication and review lifecycle;
7. test with the existing validators where possible.

Reuse existing contracts. Do not add fields, routes, dependencies, registries, or publication states based only on this document.

### Verified BoardPrep observations on the inspected main snapshot

The BoardPrep implementation inspected for this document shows:
- `src/lib/boardprepContentSchema.mjs` defines shared question types: `mcq`, `fill-blank`, `short`, `long`, `analytical`, `hots`, `transformation`, and `extract`.
- Shared learning block types include `paragraph`, `terms`, `bullets`, `examples`, and `table`.
- The chapter validator requires chapter metadata, sourceNote, overview, learn sections/blocks, keyPoints, examFocus, vocabulary, and a non-empty questions array; optional stricter requirements exist for outcomes and assessment.
- `src/lib/boardprepCurriculum.mjs` reads subject metadata and returns only chapter records whose metadata status is `published`; the chapter metadata `file` field resolves content relative to the subject directory.
- `src/lib/boardprepChapterNav.mjs` also filters chapter navigation to `status === 'published'`.

These are observations of the inspected GitHub `main` snapshot, not proof that every legacy or non-BoardPrep subject uses the same system. Re-check the active implementation branch and subject-specific validators before applying them elsewhere.

## 8. Subject-specific quality gates

- **Mathematics:** verify every derivation, calculation, graph, diagram, and answer.
- **Physics:** verify laws, units, dimensions, formula use, diagrams, and numerical solutions.
- **Chemistry:** verify formulae, equations, structures, reactions, nomenclature, and safety instructions.
- **Biology:** verify organism/structure labels, processes, classifications, and diagrams.
- **Computer Science / Applications:** test code where execution is available; verify language/version and board-specific constraints, algorithms, dry runs, and outputs.
- **Languages:** independently write grammar examples and comprehension passages; do not reproduce full copyrighted literary works or extensive extracts. Review permissions before using any literary text.
- **History / Civics:** verify dates, chronology, context, causation, and balanced interpretation.
- **Geography:** verify maps, place labels, data, diagrams, units, and spatial claims.
- **AI / Robotics:** verify technical explanations, code, workflows, safety, and responsible-use guidance.
- **Value and other subjects:** use respectful, age-appropriate, subject-specific pedagogy and verify factual claims.

## 9. QA and publication

Report checks as **PASSED**, **FAILED**, **BLOCKED**, **NOT RUN**, or **REQUIRES MANUAL REVIEW**. Never report blocked or unrun checks as passed.

Definition of subject completion:
- syllabus mapping is evidenced;
- all required chapters have substantive content;
- explanations and examples are independently authored;
- questions and answers are reviewed;
- required visuals are original or properly licensed and documented;
- provenance is recorded;
- schema validation passes;
- student-facing discovery and rendering are verified;
- repository publication/review requirements are satisfied;
- remaining limitations are disclosed.

File existence or chapter count alone is not completion.

## 10. Change safety

Preserve all existing user work. Do not reset, clean, discard, or overwrite unrelated changes. Do not install dependencies, perform database/Firebase changes, delete files, or change application architecture without following the project's approval rules. Do not commit, push, merge, or deploy without explicit authorization.

## 11. Governance

This is a proposed content standard. Before treating it as a legal policy, have it reviewed by qualified counsel familiar with Indian copyright law and the actual intended content sources, licensing, and commercial distribution model.
