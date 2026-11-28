# Java and Python Content Provenance Register

**Status:** Initial audit in progress  
**Branch:** `audit/java-python-originality`  
**Audit baseline:** PR #110 head `f15897dcb122742871e976e0a53842b0ab76132f`  
**Purpose:** Record what has and has not been checked before the Target95 release. This is an engineering/editorial audit record, not a legal opinion or copyright-clearance certificate.

## 1. Scope inspected

| Area | Repository source | Initial finding | Status |
|---|---|---|---|
| ICSE Class X Java programs | `src/app/data/icseClass10Programs.js` | 20 recommended programs are present. The file contains source code, problem statements, variables, sample input/output and concepts. Individual source provenance is not recorded in the content records. | Requires provenance review |
| ICSE Class X lesson content | `src/app/data/icseClassXContent.js` | Eight syllabus topic records are present. Per-topic author/source history is not recorded in the inspected content shape. | Requires provenance review |
| ISC Class XII Java practicals | `src/app/data/iscXIIJavaPracticalAssignments.js` | 20 assignments with algorithms, code and sample runs; 5/3/5/4/3 distribution. Per-assignment author/source history is not recorded. | Requires provenance review |
| ISC Class XII Java/Python theory | `src/app/data/iscXIIJavaPythonContent.js` | Java lesson explanations, examples, diagrams and practice items are present. A complete per-section provenance trail was not established in this initial pass. | Requires provenance review |
| Java content tests | `test/java-content-2028.test.mjs` | Checks syllabus coverage, assignment counts and selected regressions. It is not a plagiarism or similarity test. | Reviewed |
| Java runtime tests | `test/isc-xii-java-practicals-runtime.test.mjs` | Compiles and executes the 20 ICSE X and 20 ISC XII Java samples against their declared outputs. It does not establish originality. | Test design reviewed; latest execution not run in this audit |
| Java diagrams | `public/visuals/icse-java/` (referenced by lesson data) | The lesson data references SVG diagrams. Creator, source and license evidence for each asset must be checked individually. | Requires asset audit |

## 2. Legitimate reference boundary

The Java implementation identifies the official CISCE Examination Year 2028 syllabi as its academic scope references:

- ICSE Computer Applications (86): https://cisce.org/wp-content/uploads/2026/01/18.-Computer-Applications.pdf
- ISC Computer Science (868): https://cisce.org/wp-content/uploads/2026/01/25.-Computer-Science.pdf

These documents may be used to verify syllabus coverage and prescribed concepts. Their use as a syllabus reference does not grant permission to reproduce publisher explanations, exercises, diagrams, answer keys or page layouts.

Java language behaviour should be checked against authoritative Java documentation where a technical claim needs verification. Standard algorithms, language syntax and established technical facts should be expressed accurately; originality must come from Target95's own explanations, examples, teaching sequence, question wording and implementation choices.

## 3. What this audit does and does not establish

- The inspected source files contain substantial structured teaching and programming material.
- The automated Java runtime test is designed to compile and run the 40 sample programs and compare their outputs.
- Passing a compiler, unit test, syllabus mapping or runtime test does **not** establish copyright originality.
- No external similarity scan or line-by-line comparison against commercial textbooks/question banks has been completed as part of this initial pass.
- No legal clearance is claimed.
- Absence of a source record is treated as **unknown provenance**, not proof of copying and not proof of originality.

## 4. Required remediation before a strong originality claim

1. Review every ICSE X and ISC XII Java program individually. Record whether the problem statement, algorithm explanation, code, sample data and output were independently authored or derived from a documented permitted source.
2. Re-author any material that closely tracks a textbook, guide, website, commercial question bank or distinctive worked example. Do not perform sentence-by-sentence paraphrasing.
3. Review every theory section for distinctive wording, sequence, examples and diagrams; rewrite from the syllabus and independently verified technical facts where provenance is unclear.
4. Inventory every referenced SVG and other visual asset. Record creator, creation method, source, license evidence, intended use and alt text. Replace assets whose rights cannot be established.
5. Add provenance metadata in a way compatible with the existing content schema and renderer. Do not introduce unconsumed fields into student-facing records without tracing the actual data contract.
6. Run the existing Java compilation/runtime suite, academic validators, tests, lint, typecheck and production build on the final branch head.
7. Obtain qualified legal review before making a commercial or public-facing claim of copyright clearance where third-party material or uncertain rights remain.

## 5. Release gate

Use only these states: **PASSED**, **FAILED**, **BLOCKED**, **NOT RUN**, **REQUIRES MANUAL REVIEW**.

| Gate | Initial state |
|---|---|
| Syllabus alignment | Existing automated coverage; final independent academic review still required |
| Java compilation/runtime | Test exists; latest head execution NOT RUN in this audit |
| Program-by-program provenance | REQUIRES MANUAL REVIEW |
| Theory text originality | REQUIRES MANUAL REVIEW |
| SVG/image rights | REQUIRES MANUAL REVIEW |
| External similarity review | NOT RUN |
| Legal copyright clearance | NOT RUN |

Do not describe the Java/Python library as fully copyright-cleared until the unresolved gates have evidence and the appropriate human/legal review is complete.

## 6. Next work sequence

- Complete the 40-program Java editorial and edge-case audit first.
- Correct confirmed academic, algorithmic and input-validation defects without changing stable IDs or content contracts.
- Complete the theory and SVG provenance inventory.
- Then audit the five ISC XII Python assignments and the remaining Python content.
- Keep all changes on this audit branch / associated pull request; do not merge or deploy to production as part of this audit.

## ISC Class XII Python assignment gap — verified against 2028 syllabus

The repository's ISC Class XII academic alignment document records the CISCE minimum as **5 Python assignments**: one Strings, two Lists and two Tuples. The current student content file `src/app/data/iscXIIJavaPythonContent.js` contains a general Python theory/practice section, including five programming-style practice prompts, but this is not a five-assignment practical register with the prescribed category distribution, full problem statements, algorithms, source code, sample input/output and validation. Do not count those five prompts as the five practical assignments.

### Current findings
- Existing section key: `python` (Programming in Python), with 3 linked SVG diagrams.
- Existing practice array: 14 mixed items (tracing, debugging, programming, MCQ and reasoning); the 5 programming-type items are practice questions, not five formally distributed practical assignments.
- Official category target to implement and validate: Strings 1, Lists 2, Tuples 2.
- The 20 Java practical assignments are separately stored in `src/app/data/iscXIIJavaPracticalAssignments.js`; their completeness does not satisfy the separate Python minimum.

### Release action
Create a separate Python practical data module with exactly five original, syllabus-aligned assignments distributed Strings 1 / Lists 2 / Tuples 2. Each assignment should include its own objective, algorithm, Python 3 source, sample input, expected output, edge cases and tests. Validate each program with automated execution and verify the renderer exposes the five practicals as a distinct practical section. Record the author/source evidence for each item. No similarity scan or legal copyright clearance has been performed; this audit is a scope finding, not a legal conclusion.
