# Target95 — Academic Quality & Question Integrity Audit

**Audit date:** 2026-11-27
**Scope:** every question reachable from a student-facing route, plus the Java/Python practical sets.
**Method:** `scripts/audit/sprint-inventory.mjs` over all 146 published BoardPrep chapters, plus source review of the validators and routes.

---

## 1. BoardPrep question integrity — measured

| Check | Result |
| --- | --- |
| Published questions | 1768 |
| Missing answer | **0** |
| Missing explanation | **0** (was 4 — fixed this sprint, §3) |
| MCQ questions | 621 |
| MCQ missing a usable answer index | **0** |
| Duplicate question IDs (global) | **0** |
| Duplicate question IDs (within a chapter) | **0** |
| Published chapters with a missing/unparseable file | **0** |
| Answer/option mismatch detected by `validateChapterRecord` | none reported on the published set |

The MCQ answer key is **not** silently defaulted. `src/lib/boardprepContentSchema.mjs` → `answerMatchesOption(answer, option, {strict})` returns `false` when either side is missing, and the validator emits `answer does not match the option at correctIndex`. This preserves the important rule from PR #107: a missing answer can never resolve to option A, and an unresolvable question must be withheld rather than guessed.

`answerMatchesOption` normalises before comparing in non-strict mode. That is correct for prose answers ("New Delhi" vs "new delhi.") but means the strict mode must stay on for MCQ validation — the authored test `test/boardprep-chemistry-isc-xxi.test.mjs` does exactly that (`strictMcq: true`).

## 2. Question mix

Most published questions are not MCQ: 621 of 1768 (35%) are multiple choice, the remaining 1147 are short/text answers. Any future "MCQ bank" claim should be read against 621, not 1768.

| Board / class | Published Q | MCQ |
| --- | --- | --- |
| ICSE IX | 1162 | 294 |
| ICSE X | 145 | 60 |
| ISC XI | 461 | 267 |
| CBSE XI, CBSE XII, ISC XII | 0 | 0 |

## 3. Repair performed this sprint

Four ISC XI Chemistry short-answer questions (`isc-11-chem-pblock-13-14-q-12` … `-q-15`) carried an answer but no explanation. Explanations were **added**, not rewritten: the answers, IDs, ordering and question text are untouched, and each new explanation states what a full-mark answer must contain. Published-question explanation coverage is now 1768/1768.

This closes the open fill-vs-leave decision recorded against this chapter. The decision was **fill**, because (a) it is purely additive, (b) the chapter is `reviewStatus: "published"` and therefore student-visible, and (c) a short-answer question without a marking rationale teaches nothing on review.

## 4. Java practicals — findings

### ICSE Class X (`src/app/data/icseClass10Programs.js`, 20 programs)

Coverage present: 1-D arrays, linear search, binary search, bubble sort, selection sort, string handling (length/charAt, reverse, palindrome, vowels, replace), wrapper classes, custom methods, method overloading, constructors, class/object. Every program ships `code`, `sampleInput`, `sampleOutput` and `concepts`.

**Syllabus-fit defect:** the file contains two 2-D matrix programs — `x-prog-08` "Matrix Addition" and `x-prog-09` "Matrix Diagonal Sum". Two-dimensional arrays are an ISC topic, not ICSE Class X. The file's own header even says the format "intentionally excludes mandatory algorithm/flowchart fields", so it has been curated deliberately — but the matrix pair slipped in.

**Not changed here.** These are committed programs with working code and correct sample output; deleting them is a destructive content decision that belongs to the owner, and PR #115 already carries a `+9/-9` edit to this exact file that looks like the intended replacement. Recommendation: land PR #115's version and delete nothing by hand.

### ISC Class XII

On `main`: no structured ISC XII practical set (see `TARGET95_BOARD_SUBJECT_INVENTORY.md` §5). On PR #115's branch: 20 Java assignments with the required 5 methods / 3 1-D / 5 2-D / 4 strings / 3 inheritance split, plus 5 Python practicals (1 strings, 2 lists, 2 tuples). Those match the prescribed distributions on paper. **Their academic correctness was not reviewed here.**

### Compilation and execution

`javac` and `java` are **not installed** in this environment. **0 programs compiled, 0 executed.** Every statement above about program behaviour comes from reading the source and its declared `sampleOutput`, not from running it. PR #115 adds `test/isc-xii-*-runtime.test.mjs`; those tests would be the first real execution evidence, and they only run where a JDK exists.

### Known code-level risks (static)

- `x-prog-05` Binary Search assumes sorted input but does not check it; sample input is sorted.
- `x-prog-16` `isPrime` uses `i < n` rather than `i * i <= n`; correct but O(n), and it is presented as a model answer.
- `x-prog-01` divides by `n` with no guard for `n = 0`.
- No program validates matrix dimensions (`x-prog-08` reads `r`/`c` from input without bounds).

None of these break the declared sample runs.

## 5. Question-quality risks not covered by any automated check

| Risk | Status |
| --- | --- |
| Ambiguous MCQ options | **Not checked** — no automated ambiguity detection exists |
| Wrong-but-plausible distractors | **Not checked** — requires subject-expert review |
| Explanation contradicts answer | **Not checked** — schema validates presence, not agreement |
| Syllabus mismatch per chapter | **Not checked** — no syllabus map (see inventory §4) |
| Broken chapter links from question records | Covered indirectly by `audit:links` (274 links, 0 broken) |
| Answer-letter balance ("do not mechanically balance") | No balancing logic exists anywhere; verified by inspection of the authoring tools |

Answer-key letter distribution was deliberately **not** measured or adjusted. Mechanically equalising A/B/C/D would corrupt correct keys to improve an aesthetic metric.

## 6. Verdict

The published BoardPrep set is mechanically sound: complete keys, complete explanations, no duplicates, no dangling files. That is a **structural** pass, not an academic one. Not one of the 1768 questions has a recorded subject-expert review, and the repository contains no field in which such a review could be recorded. The next meaningful quality step is a schema field (`reviewedBy`, `reviewedAt`, `reviewNotes`) plus a sampled human review, not more automation.
