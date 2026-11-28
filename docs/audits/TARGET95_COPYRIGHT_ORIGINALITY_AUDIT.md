# Target95 — Copyright & Originality Audit

**Audit date:** 2026-11-27
**Scope:** all student-facing content groups reachable from the app.
**Standing rule for this document:** nothing here is a legal clearance. No item is described as "copyright safe" or "legally cleared", because no independent legal review and no similarity scan has been performed.

---

## 1. What evidence exists today

| Artefact | Location / branch | State |
| --- | --- | --- |
| Platform copyright policy | `COPYRIGHT.md` (on `main`) | Present. States Target95 claims ownership of its own material, disclaims ownership of third-party board material, gives a takedown address and an India/Copyright Act 1957 note. Contains the correct caveat that it "is not legal advice". |
| Java program-by-program checklist | `docs/content/JAVA_PROGRAM_PROVENANCE_CHECKLIST.md` on PR #115 branch | 40 data rows (20 ICSE X + 20 ISC XII). Every row reads `REQUIRES MANUAL REVIEW` / `NOT RECORDED`. |
| Python program checklist | `docs/content/PYTHON_PROGRAM_PROVENANCE_CHECKLIST.md` on PR #115 branch | 5 data rows (1 strings, 2 lists, 2 tuples). Every row `REQUIRES MANUAL REVIEW` / `NOT RECORDED`. |
| Java/Python provenance register | `docs/content/JAVA_PYTHON_PROVENANCE_REGISTER.md` on PR #115 branch | 16-row area register, correctly self-described as "an engineering/editorial audit record, not a legal opinion or copyright-clearance certificate". |
| Per-chapter provenance for BoardPrep | — | **Does not exist.** No chapter JSON carries author, source or review fields. |
| Similarity scan | — | **NOT RUN.** No instrumented similarity checker is available in this environment. |

The PR #115 checklists are the right shape and are honestly filled: they record unknowns as unknowns rather than inventing authorship. They are also **entirely unverified** — 45 of 45 rows are open. A checklist that says "NOT RECORDED" everywhere is a work queue, not evidence of originality.

## 2. Provenance register — content groups

Status vocabulary is fixed and used strictly.

| # | Content group | Path | Type | Source evidence | Originality | Similarity | Academic | Final status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ICSE X Java programs (20) | `src/app/data/icseClass10Programs.js` | code + problem statements + sample I/O | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 2 | ISC XII Java practicals (20) | PR #115 branch `iscXIIJavaPracticalAssignments.js` | code + algorithms + sample runs | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 3 | ISC XII Python practicals (5) | PR #115 branch `iscXIIJavaPythonPracticalAssignments.js` | code + sample I/O | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 4 | ISC XI practical pack (21) | `src/app/data/iscXIPracticalPack.js` | assignment specs | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 5 | ISC XII Java/Python lessons (10 topics) | `src/app/data/iscXIIJavaPythonContent.js` | prose + snippets | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 6 | Core Java/CS chapters (32 study routes) | `src/app/data/{javaCurriculum,javaChapters,chapters,arrays,strings,methods,loops,constructor,numberSystem,operators,variables}.js` | prose + examples | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 7 | BoardPrep ICSE IX chapters (69 / 1162 Q) | `src/app/data/boardprep/content/icse/class-9/**` | JSON lessons + questions | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 8 | BoardPrep ICSE X chapters (14 / 145 Q) | `.../icse/class-10/**` | JSON lessons + questions | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 9 | BoardPrep ISC XI chapters (63 / 461 Q) | `.../isc/class-11/**` | JSON lessons + questions | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 10 | CBSE curriculum/practice modules | `src/app/data/cbse/**` (55 files) | JS modules + markdown | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 11 | CISCE AI question banks | `iscArtificialIntelligence*.js`, `icseRoboticsAI*.js` | questions | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 12 | Board practice / PYQ packs | `icse-board-practice-2026-27.js`, `iscXIIBooleanAlgebra*.js`, `iscXIIKMap.js` | questions | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 13 | Office Learning Hub content | `src/app/office/**` | prose lessons | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 14 | Blog / AI-generated content | `src/app/lib/blog*`, blog routes | prose | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 15 | Diagrams, images, screenshots | `public/`, `docs/Images`, generated visual registries | media | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |
| 16 | Question-bank / mock-test banks | `src/app/data/question-bank/**`, `mock-test/**` | questions | `NOT RECORDED` | `ORIGINALITY_UNREVIEWED` | `SIMILARITY_REVIEW_PENDING` | `UNKNOWN` | `SOURCE_UNKNOWN` |

**Zero groups are `APPROVED_FOR_PUBLICATION` on provenance grounds.** That is the honest finding: the repository has no per-content attribution, and the question "did someone copy this from a textbook or a coaching solution?" has never been asked or answered for any of the 1768 BoardPrep questions, the 40 Java programs, or the 5 Python practicals.

## 3. Specific risks worth naming

1. **Board-style questions.** ICSI/ICSE/ISC questions frequently appear in commercial "10 years solved papers" compilations. A question that reproduces a board paper verbatim is a board-paper reproduction, not original work; BoardPrep chapter JSON carries no field distinguishing "authored in the style of" from "taken from the 2023 paper". This distinction must be added before any provenance claim can be made.
2. **`examYears: [2027]` and PYQ labelling.** The read model comment states it "never invents years, PYQ labels, or content", which is the correct intent — but nothing in the schema enforces that a question marked as a past-year question actually is one. A mislabelled PYQ is both an accuracy and an attribution problem.
3. **Java programs are the highest copy risk in the repo.** Textbook Java exercises ("WAP to check whether a number is prime") are near-identical across every ICSE textbook. The code may be independently typed and still be derivative of a specific published exercise set. Similarity review, not authorship review, is what would settle it.
4. **AI-generated content (blog, AI tutor).** No record of which content is machine-generated. Several jurisdictions require disclosure; more importantly, generated prose can reproduce training data. `ORIGINALITY_UNREVIEWED` applies.
5. **`docs/Images` and `public/` media.** No licence record for any image. Diagrams reproducing textbook figures are the classic copyright failure mode.

## 4. What a real clearance process would require

1. Pick a similarity instrument and run it per content group; record tool name, date, scope, results and limitations. A percentage is evidence, never proof.
2. Add provenance fields to the BoardPrep chapter schema (`author`, `sourceType`, `sourceRef`, `reviewedBy`, `reviewedAt`) so the register can be derived from data instead of maintained by hand.
3. Review the 45 open checklist rows in PR #115 with actual evidence.
4. Review media licences separately from text.
5. Only then move any group to `APPROVED_FOR_PUBLICATION`.

## 5. Statement

Nothing in this audit establishes that Target95 content is free of third-party copyright. The platform policy in `COPYRIGHT.md` is a reasonable public-facing notice, and the PR #115 registers are a reasonable start, but **no content group has completed an originality or similarity review**. Unknown stays unknown.
