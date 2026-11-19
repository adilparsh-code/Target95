# ICSE Class X Mathematics — Academic Quality Review

Date: 19 November 2026
Branch: `boardprep/icse-x-mathematics-academic-review`
Scope: ICSE, Class X, Mathematics — the 18 existing planned chapters (396 questions)

## Baseline note (important)

The mission named `10badbf335156e4bc84fa7dbd6f51d8b50cd07c7` as the current merged baseline and asked
that `main` be confirmed to contain it. **It does not.** At the time of this review:

- `origin/main` was `81c5880` ("Merge pull request #103") and did **not** contain `10badbf`.
- `10badbf` is the merge commit of PR #105 (`b918c4c` + `67ffd5f`) and is **9 commits ahead of `main`, 0 behind**.
  Those 9 commits include the completed ICSE X Mathematics banks.
- At `origin/main` the Mathematics chapters are partial (0–23 questions per chapter); only at `10badbf`
  do the 18 chapters carry the expected 396 questions.

The review branch was therefore created from `10badbf` so the mission's content scope exists. A PR against
`main` will consequently show those 9 commits as well as this review. This is a baseline defect in the
mission brief, not something this branch can correct without merging PR #105 first.

## Executive summary

| Item | Result |
|---|---|
| Chapters reviewed | 18 |
| Questions reviewed | 396 (144 MCQ, 72 short, 54 fill-blank, 72 analytical, 54 long) |
| Structure | 22 questions per chapter in every chapter: 8 MCQ, 4 short, 3 fill-blank, 4 analytical, 3 long |
| Defects found | 10 |
| Defects fixed | 10 |
| Questions requiring teacher review | 0 unresolved mathematically; 4 presentation/clarification items listed below |
| Validator | Passed (`node scripts/validate-boardprep-migration.mjs`) |
| Tests | Passed (`npm test`) |
| Lint | Passed (`npm run lint`) |
| Typecheck | Passed (`npm run typecheck`) |
| Production build | Not run in this environment (see Technical verification) |
| Publication status | All 18 chapters remain `planned` (registry) and `reviewStatus: draft`; nothing published |

Every prompt, option list, keyed answer and answer text in the 18 chapter files was read and independently
recomputed. MCQ explanations were read in full. Descriptive solutions were verified against the prompt;
descriptive `explanation` fields were read for every item that was corrected and for items whose answer text
was too terse to prove the result (for example `icse-10-math-q-mat-21`, where the working lives in the
explanation). This is stated precisely because the mission requires evidence, not a blanket claim.

## Chapter-wise results

| Chapter | Questions | Mathematical Accuracy | Language | MCQ Review | Status |
|---|---:|---|---|---|---|
| GST (Goods and Services Tax) | 22 | Pass — 1 answer corrected | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Banking | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Shares and Dividends | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Linear Inequations | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Quadratic Equations | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Ratio and Proportion | 22 | Pass — 1 answer completed | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Factorisation of Polynomials | 22 | Pass — 1 option typo | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Matrices | 22 | Pass — 3 items corrected | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Arithmetic Progression | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Coordinate Geometry: Reflection | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Similarity | 22 | Pass — 2 items corrected | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Loci | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Circles | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Constructions | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Mensuration: Cylinder, Cone and Sphere | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Trigonometry: Identities and Heights & Distances | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Statistics | 22 | Pass | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |
| Probability | 22 | Pass — 1 MCQ replaced | Clear | 8/8 verified | Passed internal review; teacher sign-off pending |

## Defect register

Every numerical answer below was recomputed independently before and after correction.

| # | Chapter | Question ID | Severity | Original problem | Correction made | Verification |
|---|---|---|---|---|---|---|
| 1 | Similarity | `icse-10-math-q-sim-16` | High | "Two similar triangles have equal areas. Their scale factor is:" keyed option B "ratio 1:4". Equal areas force a scale factor whose square is 1, so the factor is 1. No option was correct. | Option changed to "ratio 1:1" and `answer` to "ratio 1:1"; keyed position unchanged. | Area factor = (linear factor)²; equal areas ⇒ factor 1. Explanation already stated this. |
| 2 | Matrices | `icse-10-math-q-mat-20` | High | Prompt asked for the column sums of **both** A and B, then "hence predict" the sum of entries of AB. Column sums of B cannot determine that sum; the supplied justification (5×7 + 5×7 = 70) is numerically right by coincidence only. | Prompt now asks for column sums of A and **row sums** of B; answer derives Σ_k (column sum of A)_k × (row sum of B)_k = 5×6 + 5×8 = 70, and confirms against AB. | AB = [[8,12],[27,23]], entries total 70. |
| 3 | Matrices | `icse-10-math-q-mat-22` | Medium | Prompt said "A non-zero matrix times the zero matrix…", but the answer and explanation argued from two non-zero matrices ("Neither factor is zero"). The prompt's premise cannot demonstrate failure of cancellation. | Prompt now asks for two non-zero matrices A (2×2) and C (2×3) with product zero; answer uses A=[[1,0],[0,0]], C=[[0,0,0],[1,2,3]]; explanation adds the multiplication check. | AC = 2×3 zero matrix; both factors non-zero. |
| 4 | GST | `icse-10-math-q-gst-14` | Medium | Answer claimed "only the last stage… pays the government", contradicting its own explanation (each stage pays output minus credit) and the arithmetic (manufacturer 900, wholesaler 360, retailer 360). | Answer rewritten: each stage pays tax on value added; payments sum to the tax on the final sale; O1 + (O2−O1) + (O3−O2) = O3. | Three-stage example already in the chapter totals 1620 = 18% of 9000. |
| 5 | Probability | `icse-10-math-q-prob-12` | Medium | Prompt repeated the substance of `icse-10-math-q-prob-01` (fair coin, probability of head), giving two MCQs on the same single fact. | Replaced with a distinct item: 5 red and 7 black balls, P(black) = 7/12; keyed at A as before; new explanation and common mistake. | 7 of 12 balls black; distractor 7/5 is black:red. |
| 6 | Ratio and Proportion | `icse-10-math-q-rat-22` | Low | Prompt asked for three values (constant, y at x=10, x at y=32); answer gave only the constant and y. | Answer now: constant 4, y = 40, x = 8. | y = 4x; 32/4 = 8. The explanation already had x = 8. |
| 7 | Factorisation | `icse-10-math-q-fac-03` | Low | Option and answer read "7." with a stray full stop, unlike the other options. | Option and answer changed to "7". | Keyed option equals answer after correction. |
| 8 | Matrices | `icse-10-math-q-mat-03` | Low | Option and answer read "3." with a stray full stop. | Changed to "3". | Keyed option equals answer. |
| 9 | Matrices | `icse-10-math-q-mat-12` | Low | Option and answer read "5." with a stray full stop. | Changed to "5". | Keyed option equals answer. |
| 10 | Similarity | `icse-10-math-q-sim-03` | Low | Option and answer read "6." with a stray full stop. | Changed to "6". | BPT: 2/3 = 4/EC ⇒ EC = 6. |

No question IDs were changed and no question was deleted. All chapters retain 22 questions.

## Unresolved issues (teacher attention requested)

These are not mathematical errors; they are presentation or completeness items that a teacher should settle.

1. **Circles — figure/question mapping.** Four prompts (`circles-04`, `-05`, `-07`, `-10`) say "In the diagram",
   while the chapter declares three figures. Each prompt is answerable from its own data, but the intended
   diagram for each question is not identified. A teacher should confirm which figure belongs to each prompt.
2. **Shares — explanation cites data not in the stem.** `icse-10-math-q-shr-02` explains the distractor 240 as
   14400 / 60, but the stem never states a nominal value of ₹60. The explanation should be reworded or the
   nominal value added to the stem.
3. **Statistics — empirical-relation check.** `icse-10-math-q-stats-09(iv)` compares 3×Median − 2×Mean = 39 with
   the computed mode 41.25 and calls it "reasonably close". The arithmetic is correct; whether the gap is
   acceptable is a teaching judgement.
4. **Descriptive answers are terse.** Many long/analytical answers give only the final result or a one-line
   argument (for example `mat-21` answers "A itself"). The step-by-step working is sometimes only in the
   explanation field. Before student-facing publication, answers should be expanded into full solutions.
5. **Originality.** All content is marked as BoardPrep-authored in `sourceNote`. No comparison against
   textbooks, guidebooks or online banks was performed in this review, so no plagiarism clearance is claimed.

## Technical verification

Commands run in the review worktree on `10badbf` + this branch's changes:

| Command | Result |
|---|---|
| `node scripts/validate-boardprep-migration.mjs` | Exit 0 — `{boards:3, classes:6, subjects:75, chapters:94, questions:1380}`; 94 published + 55 planned file-backed + 21 unregistered chapter files validated |
| `npm test` | Exit 0 — all tests pass (including the new Mathematics regression test) |
| `npm run lint` | Exit 0 |
| `npm run typecheck` | Exit 0 |
| Ad-hoc duplicate-prompt scan (all 155 chapter files, 935 MCQs) | 0 duplicate prompt groups involving ICSE X Mathematics after fixes |
| Ad-hoc MCQ integrity scan (18 chapters) | 0 issues: 4 options per MCQ, `answer` equals `options[correctIndex]`, no duplicate options, no missing explanations |
| `npm run build` | Not run — production build needs environment configuration not present in this workspace |

The new regression test is
`ICSE X Mathematics MCQ banks keep their structure and one keyed option each`
in `test/boardprep-content-integrity.test.mjs`. It asserts 18 chapters × 22 questions, 144 MCQs, four options
each, `answer === options[correctIndex]`, no repeated prompts within the subject, `reviewStatus: draft`, and
retention of the corrected MCQ ID.

## Publication readiness

- All 18 chapters remain **`status: planned`** in the subject registry and **`reviewStatus: draft`** in the
  chapter files. No publication settings or reader behaviour were changed.
- All 18 chapters passed this internal review and are ready for **teacher approval**.
- No chapter is approved, published or exposed to students by this branch.
- The `main`-does-not-contain-`10badbf` baseline discrepancy must be resolved before the PR is merged,
  otherwise the PR will carry the 9 commits of PR #105 as well as this review.
