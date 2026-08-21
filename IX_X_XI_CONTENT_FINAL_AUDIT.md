# Target95 — Class IX, X & XI Final Content-Quality Audit

## Scope

Final content-quality pass for ICSE/ISC Class IX, X and XI. This audit focuses on actual student-facing content and data, not planning documents.

## Quality gates

### Class IX
- Syllabus/chapter coverage: review against `src/lib/icseSyllabus.js`.
- Questions/MCQs: check for chapter relevance, answer correctness, explanations, difficulty balance and duplicates.
- Programming/output/debugging: verify applicable topics contain meaningful practice.
- No out-of-syllabus content presented as core board content.

### Class X
- Syllabus/chapter coverage: review against the ICSE registry.
- Questions/MCQs: verify fresh wording, correct answers, explanations and exam-level progression.
- Programming/output/debugging: verify applicable topics have graded practice.
- Practical/project content must remain usable and discoverable from the student experience.

### Class XI
- All 13 ISC topic records are expected in the current content layer.
- MCQs must have answer + explanation.
- Practice must be chapter-specific and more demanding than overlapping Class X concepts.
- Practical coverage: 15+ Java tasks and 5+ Python assignments, plus the project experience.
- Student-facing Practical Lab and Project routes must use the actual data layer.

## Cross-grade rules

1. Shared concepts are allowed; copied questions are not.
2. No duplicate IDs within a grade/content collection.
3. Answers must agree with question/options.
4. Explanations must justify the keyed answer, not merely repeat it.
5. Difficulty must be appropriate to grade and topic.
6. Output/tracing/debugging questions must contain enough information to produce a deterministic answer.
7. Programming tasks must have clear requirements and testable outcomes.
8. Avoid low-value bulk generation and trivial duplicates.
9. Do not treat documentation text as evidence that content exists; verify actual data/UI sources.
10. Firebase/backend features are out of scope for this content-quality gate.

## Validation evidence

The repository includes an academic data validator at `src/lib/validation/academicDataValidator.mjs`; it is the preferred structural validation mechanism for existing legacy chapter/question data.

## Current conclusion

Content-quality sign-off should be granted only after the grade-specific questions/answers and applicable output/debugging coverage are checked against the actual data layer and the validator/build checks pass on the final commit.

This file is the single IX-XI content audit; do not create additional grade-specific audit documents unless a new release gate is introduced.
