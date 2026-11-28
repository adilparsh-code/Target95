# Target95 — Board Subject Content Inventory

**Audit date:** 2026-11-27
**Method:** derived by `scripts/audit/sprint-inventory.mjs` directly from `src/app/data/boardprep/content/**` registries and chapter JSON. Machine-readable output: [`target95-board-subject-inventory.json`](./target95-board-subject-inventory.json).
**Rule:** no number here comes from a README, a PR description or a prior report.

---

## 1. Headline totals (BoardPrep registry)

| Metric | Value |
| --- | --- |
| Boards | 3 (cbse, icse, isc) |
| Classes | 6 |
| Subjects with a registry | 75 |
| Registered chapter entries | 206 |
| **Published chapters** | **146** |
| Draft chapters | **0** |
| Planned chapters | 60 |
| Published questions | **1768** |
| Questions with a resolvable answer | 1768 (100%) |
| Questions with an explanation | 1768 (100%) |
| MCQ questions | 621 |
| MCQs missing an answer index | **0** |
| Duplicate question IDs | **0** |
| Published chapters whose file is missing | **0** |

The registry is internally consistent: 146 published entries, 146 loadable files, 1768 questions counted both from the counts object and by walking `getChapter`.

## 2. The two findings that change the roadmap

### 2.1 BoardPrep contains no Computer track at all

| Board | Class | Subject | Registered chapters | Published |
| --- | --- | --- | --- | --- |
| icse | class-9 | computer-applications | 0 | 0 |
| icse | class-10 | computer-applications | 0 | 0 |
| isc | class-11 | computer-science | 0 | 0 |
| isc | class-12 | computer-science | 0 | 0 |

Every Computer Science / Computer Applications subject is registered in the class manifest but has **zero chapter entries**. The mandate's top content priority ("ICSE X Java, ISC XII Java, ISC XII Python, ISC XI Computer Science, CBSE CS/IP") is therefore not served by the BoardPrep pipeline at all. It is served by legacy modules described in §5. Any plan that assumes BoardPrep coverage of Computer is wrong.

### 2.2 CBSE and ISC XII are empty shells

| Board | Class | Subjects registered | Published chapters | Questions |
| --- | --- | --- | --- | --- |
| cbse | class-11 | 14 | **0** | **0** |
| cbse | class-12 | 14 | **0** | **0** |
| isc | class-12 | 15 | **0** | **0** |

All three are fully scaffolded (every subject has a `subject.json`) and completely empty. 43 of the 75 registered subjects carry no published content.

## 3. Board-wise detail

### ICSE Class IX — 69 published chapters / 1162 questions

| Subject | Registered | Published | Planned | Questions | MCQ |
| --- | --- | --- | --- | --- | --- |
| mathematics | 14 | 14 | 0 | 372 | 69 |
| physics | 9 | 9 | 0 | 234 | 48 |
| english | 19 | 15 | 4 | 173 | 49 |
| history-civics | 14 | 14 | 0 | 168 | 44 |
| geography | 11 | 11 | 0 | 131 | 48 |
| chemistry | 6 | 6 | 0 | 84 | 36 |
| biology | 11 | 0 | 11 | 0 | 0 |
| hindi | 0 | 0 | 0 | 0 | 0 |
| computer-applications | 0 | 0 | 0 | 0 | 0 |

### ICSE Class X — 14 published chapters / 145 questions

| Subject | Registered | Published | Planned | Questions | MCQ |
| --- | --- | --- | --- | --- | --- |
| biology | 14 | 14 | 0 | 145 | 60 |
| mathematics | 18 | 0 | 18 | 0 | 0 |
| chemistry | 12 | 0 | 12 | 0 | 0 |
| physics | 8 | 0 | 8 | 0 | 0 |
| english / geography / hindi / history-civics / computer-applications | 0 | 0 | 0 | 0 | 0 |

ICSE X is the weakest covered CICSE class: one published subject out of the five that have registered chapters.

### ISC Class XI — 63 published chapters / 461 questions

| Subject | Registered | Published | Planned | Questions | MCQ |
| --- | --- | --- | --- | --- | --- |
| english | 16 | 16 | 0 | 80 | 32 |
| biology | 14 | 14 | 0 | 143 | 100 |
| mathematics | 15 | 13 | 2 | 77 | 37 |
| chemistry | 15 | 11 | 4 | 106 | 71 |
| physics | 10 | 9 | 1 | 55 | 27 |
| accountancy / business-studies / commerce / computer-science / economics / geography / hindi / history / political-science | 0 | 0 | 0 | 0 | 0 |

The 63 ISC XI chapters include the 60 unpushed chapter files found in this workspace (see `TARGET95_GITHUB_BASELINE.md` §5).

### ISC Class XII — 0 published chapters

15 registered subjects (accountancy, biology, business-studies, chemistry, commerce, computer-science, economics, english, hindi, history, mathematics, physics, political-science, psychology, sociology), all with zero chapter entries.

### CBSE Class XI and XII — 0 published chapters

14 registered subjects per class (accountancy, biology, business-studies, chemistry, economics, english-core, geography, hindi, history, mathematics, physics, political-science, psychology, sociology), all empty. CBSE content lives outside BoardPrep in `src/app/data/cbse/` (55 files of curriculum/practice modules) and is served by dedicated routes — see §5.

## 4. Coverage against official syllabus

| Metric | Status |
| --- | --- |
| Official syllabus topic totals per track | **UNKNOWN** |
| Topics mapped to content | **UNKNOWN** |
| Topics missing | **UNKNOWN** |

The registry carries no machine-readable syllabus map. Each chapter entry has `syllabusStatus: "listed"` and `examYears: [2027]`, but nothing links a chapter to a numbered syllabus topic, and no authoritative syllabus file is stored in the repository. Producing a real topic-coverage percentage requires importing the official CISCE/CBSE syllabus documents first. This report deliberately does not estimate it.

## 5. Non-BoardPrep computer content (the real Computer inventory)

Computer material is delivered by legacy data modules and their own routes, not by BoardPrep.

| Source | What it is | Volume | Verified |
| --- | --- | --- | --- |
| `src/app/data/icseClass10Programs.js` | ICSE X Java program set | 20 programs, each with code, sample input, sample output, concepts | Static read only — **no Java compiler in this environment** |
| `src/app/data/iscXIPracticalPack.js` | ISC XI practical assignments | 21 (15 Java, 6 Python) with problem, expected output, tests, viva question | Static read only |
| `src/app/data/iscXIIJavaPythonContent.js` | ISC XII Java/Python lesson topics | 10 topics (methods, arrays/strings, recursion, inheritance/interface, Python, data structures, stack, queue, trees, complexity) | Static read only |
| `src/app/data/iscXIIJavaQuestionPack.js` | ISC XII Java question pack | module present, imports `./iscXIICurriculum` | Not importable by plain Node (extensionless import) |
| `src/app/data/javaCurriculum.js`, `javaChapters.js`, `java.js`, `chapters.js`, `arrays.js`, `strings.js`, `methods.js`, `loops.js`, `constructor.js`, `numberSystem.js`, `operators.js`, `variables.js` | Core Java/CS chapter lessons consumed by `/study/[slug]` | 32 study routes prerendered by `next build` | Route generation verified by build |
| `src/app/data/cbse/` | CBSE 2026-27 curriculum + practice modules | 55 files | Not censused here |

### Java/Python practical distribution vs the prescribed ISC XII split

The mandate specifies ISC XII as 5 methods, 3 single-dimension arrays, 5 double-dimension arrays, 4 string handling, 3 inheritance = 20 practicals.

**On `main`: no such set exists.** `iscXIIJavaPythonContent.js` is lesson material with prose and code snippets, not structured assignments, and `iscXIPracticalPack.js` is ISC **XI**.

**On PR #115's branch (`audit/java-python-originality`) it does exist and is complete:** `src/app/data/iscXIIJavaPracticalAssignments.js` (20 assignments) and `src/app/data/iscXIIJavaPythonPracticalAssignments.js` (+196 lines) with runtime tests `test/isc-xii-java-practicals-runtime.test.mjs` and `test/isc-xii-python-practicals-runtime.test.mjs`. PR #115 also edits `icseClass10Programs.js` (+9/-9), which appears to be the off-syllabus matrix-program replacement described in `TARGET95_ACADEMIC_QUALITY_AUDIT.md` §4.

So the ISC XII practical gap is a **merge gap, not an authoring gap**: the content exists and is unmerged. Nothing in this audit reviewed its academic correctness.

### Compilation and execution status

`javac` and `java` are **not installed** in this environment. **Zero** Java programs were compiled or executed in this audit. Python 3 is available at `/usr/bin/python3`, but no Python practical file was independently executed because the ISC XII Python practicals (the only set that would need it) do not exist. Every program claim in this document is static inspection only.

## 6. Status legend used in the JSON

| Field | Meaning |
| --- | --- |
| `published` | registry `status: "published"` and file loads |
| `planned` | registry `status: "planned"` — never student-visible |
| `draft` | registry `status: "draft"` — currently zero anywhere |
| `syllabusTopics`, `syllabusTopicsMapped`, `academicReview` | always `"UNKNOWN"` — no evidence in repo |
| `originalityReview` | always `"ORIGINALITY_UNREVIEWED"` — see the copyright audit |

## 7. What this inventory says to do next

1. Publish or unpublish ICSE X Mathematics/Chemistry/Physics deliberately: 38 planned chapters exist and are invisible to students today.
2. Decide whether CBSE and ISC XII BoardPrep scaffolds should stay: 43 registered subjects with zero content inflate the subject count without serving a student.
3. Treat Computer content as a separate delivery track. Adding it to BoardPrep would be a large migration; extending the existing legacy modules is cheaper and already wired to routes.
4. Build the ISC XII practical sets (20 Java, 5 Python) as real content — nothing in the repo does this today.
