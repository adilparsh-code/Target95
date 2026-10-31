# ISC Class XII 2027 Priority Subject Coverage Matrix

**Repository:** `adilparsh-code/Target95`  
**Branch:** `freebuff/d864f920a510eeefc74bb186`  
**Audit SHA (this report is current to):** `ddb4c349245be705df24856b7a4982299c78b31f`  
**Scope:** ISC Class XII, examination year **2027**, five priority subjects: Mathematics, Chemistry, Biology, Computer Science, Economics.

This is the durable companion to `docs/audits/ISC_XII_2027_PRIORITY_SUBJECTS_AUDIT.md`. The audit is the narrative; this matrix is the at-a-glance coverage record. Both are updated together.

---

## Legend

Columns used for every subject:

- **verified-topics-and-source** — syllabus topics that were verified here, and the exact source class used.
- **existing-content** — Target95 content that already exists and is relevant.
- **missing-content** — what is required but not yet present.
- **verification-gaps** — unresolved source or verification gaps.
- **routes** — learner-facing or data routes that exist or would be needed.
- **schema-and-validators** — what schema/validator coverage applies.
- **pyqs** — previous-year-question coverage status.
- **practicals-projects** — practical/internal-assessment/project status.
- **assessment-coverage** — how assessment is or could be covered.

Source classes, used consistently:

1. **Official CISCE, direct (here)** — the official CISCE document read directly in this environment.
2. **Official CISCE, accessible mirror/transcription** — the official CISCE document read through an accessible publisher/transcription mirror because cisce.org was not directly fetchable here.
3. **Repository content** — existing Target95 BoardPrep or other repository material.
4. **Secondary/publisher corroboration** — subject-existence or subject-code corroboration from publisher/secondary pages, not an authoritative topic-level syllabus.
5. **Labeled reference/adaptation** — existing repository material reused only as labeled reference, clearly not treated as the verified source of truth for the syllabus year in question.

Status labels for content completeness:

- **Complete and verified** — present, schema-valid, syllabus-accurate, and learner-facing where applicable.
- **Existing but incomplete** — present but missing substance or not yet matching syllabus scope.
- **Missing** — required and not present.
- **Placeholder only** — a registry entry or empty file exists but carries no real educational content.
- **Needs official-source verification** — the 2027 topic-level syllabus cannot be authoritatively verified here, so no chapters are authored or published for it.

---

## 1. ISC Class XII Computer Science (868) — 2027

**verified-topics-and-source**

- Subject code **868**; Paper I Theory 3 hours 70 marks; Paper II Practical 3 hours 30 marks; Java-only (Java 5.0 or later) for 2027; BlueJ recommended; minimum 25 assignments for the year.
- Source class: **Official CISCE, accessible mirror/transcription** — AglaSem and Jagran Josh transcriptions of the official CISCE ISC Class XII Computer Science 2027 syllabus. Direct fetch from cisce.org was not available here (HTTP 403).
- Verified 2027 topic structure:
  - **Section A** — Boolean Algebra; Computer Hardware.
  - **Section B** — Java: introduction to OOP using Java, objects, primitive values/wrapper classes/types/casting, variables/expressions, statements/scope, methods, arrays (1-D and 2-D) and strings, recursion.
  - **Section C** — Inheritance, interfaces and polymorphism; Data structures: stack, queue (including circular queue and dequeue), infix-to-prefix/postfix conversion, singly linked list (insertion, deletion, reversal, sublist, emptiness), binary trees (conceptual: root, internal/external nodes, height, depth, level, size, degree, siblings, subtree, completeness, balancing, traversals); Complexity and Big-O notation.
- Important negative verification: the 2027 syllabus does **not** include Python. Python belongs to the separate CISCE ISC Computer Science 2028 syllabus.

**existing-content**

- New 2027 BoardPrep subject registry: `src/app/data/boardprep/content/isc/class-12/computer-science/subject.json` — 3 sections, 15 planned chapters, Java-only, python-free.
- 16 chapter file shells/registries now exist under `chapters/`, one per registered chapter.
- Completed 2027 draft chapters (reviewStatus `draft`, non-empty, schema-valid, python-free, 23 original practice questions each):
  - Boolean Algebra
  - Methods
  - Recursion
  - Arrays (Single and Double Dimensional) and String Handling
  - Inheritance, Interfaces and Polymorphism
- Also completed in this session: **Computer Hardware** is now a completed 2027 draft chapter (originally a planned shell, now finished), same shape/status/question count.
- Existing non-BoardPrep ISC XII Computer Science track (kept separate, 2028-keyed, preserved):
  - `src/lib/iscSyllabus.js`
  - `src/data/syllabus/isc-class12-boolean-logic-2028.js` (its own `source` field cites the 2028 document)
  - `src/data/iscXIIJavaPythonContent.js`
  - `src/app/data/iscXIIJavaQuestionPack.js`
  - `src/app/isc/class-xii/...` learner-facing modules, including a Python module that is correct for 2028 but not for 2027.

**missing-content**

- 10 chapters still planned/placeholder only for 2027:
  - Section A: (Computer Hardware now completed; Boolean Algebra completed)
  - Section B: OOP/Objects/Primitives; Variables/Expressions; Statements/Scope
  - Section C: Data Structures; Stack; Queue; Singly Linked List; Binary Trees (Conceptual); Complexity and Big-O
- No learner-facing BoardPrep ISC XII 2027 published chapters yet (all 2027 chapters are still `planned` or `draft`, not `published`).
- No official PYQ integration for 2027 yet.

**verification-gaps**

- cisce.org inaccessible here (HTTP 403). 2027 Computer Science was verified via accessible mirror/transcription only, not direct cisce.org fetch.
- The 2027 practical details were read through the accessible transcription; they are consistent with the repository’s existing correct practical framing, but the raw cisce.org document was not read directly here.

**routes**

- Existing learner-facing ISC XII Computer Science route is `src/app/isc/class-xii/...` and is explicitly a 2028 syllabus product today; it is **not** the 2027 BoardPrep route.
- The BoardPrep published-chapter resolver (`getPublishedChapters`, `getChapter`) returns only `status === 'published'` chapters and resolves files from the registry `file` field, so no 2027 chapter is currently returned by that route until published.

**schema-and-validators**

- Schema: `src/lib/boardprepContentSchema.mjs` (`validateChapterRecord`).
- Per-chapter shape used for completed 2027 drafts: `strictMcq: true`, `requireLearningOutcomes: true`, `expectedQuestions: 23` — 0 issues for each completed chapter.
- Focused subject integrity check: `/tmp/cs-integrity.mjs` (untracked, recreated per session) — 15/15 files resolve, id/slug/status match, no unregistered files, python-free.
- Recommended persistent focused validator: `scripts/validate-isc-class-12-computer-science-2027.mjs` (created this session).

**pyqs**

- Not integrated as official PYQs. Existing ISC XII Java question pack provides adapted/corroborating practice but is not labeled as official previous-year questions.

**practicals-projects**

- 2027 practical structure verified here: Paper II Practical 3h/30; three programming problems, attempt one; Planning session (≤90 min) + Examination session (≤90 min); 30-mark split as internal evaluation 10 + visiting examiner assignments 5 + terminal computer solution 15; Java; minimum 25 assignments; no separate mandatory project.
- The existing ISC XII project page already states the official ISC Class XII practical structure does not require a separate project; that framing is consistent and should be preserved.

**assessment-coverage**

- Each completed 2027 draft chapter has 23 original practice questions across MCQ/fill-blank/short/long/analytical types, with marks, answers and explanations.
- No published assessment assets for 2027 yet.

**status-summary**

- 2027 topic-level syllabus: **verified here** (accessible mirror/transcription).
- Registry: **present and complete for 2027 structure**.
- Chapters: **5 completed drafts** (Boolean Algebra; Methods; Recursion; Arrays & Strings; Inheritance/Interfaces/Polymorphism) **plus Computer Hardware now completed this session**; **10 still planned/placeholder**.
- Python: **excluded** from 2027.
- 2028 track: **preserved and separate**.

---

## 2. ISC Class XII Mathematics — 2027

**verified-topics-and-source**

- Subject existence for ISC Class XII is corroborated by secondary/publisher pages that list Mathematics among the released ISC Class XII subjects and point to cisce.org as the source.
- Source class for topic-level syllabus: **Needs official-source verification.** No authoritative 2027 topic-level Mathematics syllabus was read here.
- **Do not invent 2027 Mathematics topics.**

**existing-content**

- BoardPrep subject registry exists: `src/app/data/boardprep/content/isc/class-12/mathematics/subject.json`.
- No BoardPrep chapters registered for ISC XII Mathematics in the BoardPrep layer.
- Not started in this session.

**missing-content**

- Syllabus-aligned 2027 BoardPrep chapters for Mathematics are missing, and cannot be created safely without an authoritative 2027 topic source.

**verification-gaps**

- cisce.org inaccessible here (HTTP 403).
- No authoritative 2027 topic-level Mathematics syllabus available here.

**routes/schema-and-validators/pyqs/practicals-projects/assessment-coverage**

- Same BoardPrep schema/resolver contract would apply if chapters are added later.
- Not started; no assessment assets for 2027 Mathematics exist in this batch.
- Practical/internal-assessment/project requirements for 2027 Mathematics are not verified here.

**status-summary**

- 2027 topic-level syllabus: **needs official-source verification**.
- Chapters: **none**.
- Action: **do not author or publish until an authoritative 2027 topic source is available**.

---

## 3. ISC Class XII Chemistry — 2027

**verified-topics-and-source**

- Subject existence for ISC Class XII is corroborated by secondary/publisher pages listing Chemistry among the released ISC Class XII subjects.
- Source class for topic-level syllabus: **Needs official-source verification.** No authoritative 2027 topic-level Chemistry syllabus was read here.
- **Do not invent 2027 Chemistry topics.**

**existing-content**

- BoardPrep subject registry exists: `src/app/data/boardprep/content/isc/class-12/chemistry/subject.json`.
- No BoardPrep chapters registered for ISC XII Chemistry in the BoardPrep layer.
- Not started in this session.

**missing-content**

- Syllabus-aligned 2027 BoardPrep chapters for Chemistry are missing, and cannot be created safely without an authoritative 2027 topic source.

**verification-gaps**

- cisce.org inaccessible here (HTTP 403).
- No authoritative 2027 topic-level Chemistry syllabus available here.

**routes/schema-and-validators/pyqs/practicals-projects/assessment-coverage**

- Same BoardPrep schema/resolver contract would apply if chapters are added later.
- Not started; no assessment assets for 2027 Chemistry exist in this batch.
- Practical/internal-assessment/project requirements for 2027 Chemistry are not verified here.

**status-summary**

- 2027 topic-level syllabus: **needs official-source verification**.
- Chapters: **none**.
- Action: **do not author or publish until an authoritative 2027 topic source is available**.

---

## 4. ISC Class XII Biology — 2027

**verified-topics-and-source**

- Subject existence for ISC Class XII is corroborated by secondary/publisher pages listing Biology among the released ISC Class XII subjects.
- Source class for topic-level syllabus: **Needs official-source verification.** No authoritative 2027 topic-level Biology syllabus was read here.
- **Do not invent 2027 Biology topics.**

**existing-content**

- BoardPrep subject registry exists: `src/app/data/boardprep/content/isc/class-12/biology/subject.json`.
- No BoardPrep chapters registered for ISC XII Biology in the BoardPrep layer.
- Not started in this session.

**missing-content**

- Syllabus-aligned 2027 BoardPrep chapters for Biology are missing, and cannot be created safely without an authoritative 2027 topic source.

**verification-gaps**

- cisce.org inaccessible here (HTTP 403).
- No authoritative 2027 topic-level Biology syllabus available here.

**routes/schema-and-validators/pyqs/practicals-projects/assessment-coverage**

- Same BoardPrep schema/resolver contract would apply if chapters are added later.
- Not started; no assessment assets for 2027 Biology exist in this batch.
- Practical/internal-assessment/project requirements for 2027 Biology are not verified here.

**status-summary**

- 2027 topic-level syllabus: **needs official-source verification**.
- Chapters: **none**.
- Action: **do not author or publish until an authoritative 2027 topic source is available**.

---

## 5. ISC Class XII Economics — 2027

**verified-topics-and-source**

- Subject existence for ISC Class XII is corroborated by secondary/publisher pages listing Economics among the released ISC Class XII subjects.
- Source class for topic-level syllabus: **Needs official-source verification.** No authoritative 2027 topic-level Economics syllabus was read here.
- **Do not invent 2027 Economics topics.**

**existing-content**

- BoardPrep subject registry exists: `src/app/data/boardprep/content/isc/class-12/economics/subject.json`.
- No BoardPrep chapters registered for ISC XII Economics in the BoardPrep layer.
- Not started in this session.

**missing-content**

- Syllabus-aligned 2027 BoardPrep chapters for Economics are missing, and cannot be created safely without an authoritative 2027 topic source.

**verification-gaps**

- cisce.org inaccessible here (HTTP 403).
- No authoritative 2027 topic-level Economics syllabus available here.

**routes/schema-and-validators/pyqs/practicals-projects/assessment-coverage**

- Same BoardPrep schema/resolver contract would apply if chapters are added later.
- Not started; no assessment assets for 2027 Economics exist in this batch.
- Practical/internal-assessment/project requirements for 2027 Economics are not verified here.

**status-summary**

- 2027 topic-level syllabus: **needs official-source verification**.
- Chapters: **none**.
- Action: **do not author or publish until an authoritative 2027 topic source is available**.

---

## Summary matrix (status only)

| Priority subject | 2027 topic-level syllabus verified here | Registry present | Chapters registered (BoardPrep) | Completed 2027 draft chapters (this session) | Still planned/placeholder | Python in 2027? | Status |
|---|---|---|---|---|---|---|---|
| Computer Science (868) | Yes — accessible mirror/transcription | Yes, rebuilt for 2027 | Yes, 15 | Boolean Algebra; Methods; Recursion; Arrays & Strings; Inheritance/Interfaces/Polymorphism; Computer Hardware | 10 | No — excluded | Proceed on verified 2027 basis |
| Mathematics | No | Yes (stub) | None | None | N/A | N/A | Needs official-source verification |
| Chemistry | No | Yes (stub) | None | None | N/A | N/A | Needs official-source verification |
| Biology | No | Yes (stub) | None | None | N/A | N/A | Needs official-source verification |
| Economics | No | Yes (stub) | None | None | N/A | N/A | Needs official-source verification |

---

## Source-class reminder

- For Computer Science 2027, the verified topics are labeled **Official CISCE, accessible mirror/transcription**, not **Official CISCE, direct (here)** and not secondary-only. The cisce.org direct fetch was not available here.
- For Mathematics, Chemistry, Biology, Economics 2027, the only available evidence here is **secondary/publisher corroboration** for subject existence. Topic-level syllabus is **needs official-source verification**.
- The existing ISC XII Computer Science 2028 materials are **labeled reference/adaptation** only and are not treated as the 2027 source of truth.

---

*Companion to `docs/audits/ISC_XII_2027_PRIORITY_SUBJECTS_AUDIT.md`. Both are current to commit `ddb4c349245be705df24856b7a4982299c78b31f`.*
