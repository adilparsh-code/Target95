# CBSE Practice Questions & Mock Tests — Implementation Status

## Session
2026–27

## Scope
Classes IX–XII across CBSE tracks 402, 083, 065 and 802.

## Current verified state

- Curriculum source registry exists.
- Subject-code separation exists.
- Question-type configuration exists.
- Mock-test configuration exists.
- Practice-question content is intentionally stored separately from configuration.

## Required content layer

For each class/subject track, practice questions must be keyed by:

- board
- session
- class
- subjectCode
- unit/chapter/topic
- questionType
- difficulty
- marks
- competencyLevel
- learningOutcome
- source/reference
- answer/solution

## Mock-test generation requirements

Mock tests must select questions from verified curriculum metadata and must not mix subject codes or classes.

Python separation:

- 083: Python core programming only.
- 065: Python + Pandas + Matplotlib/data handling.
- 402: no Python dependency.
- 802: Java-oriented skill track; no Python dependency.

## Accuracy rule

Do not treat configuration as evidence that question content has been created. Question banks are complete only when real, source-mapped practice questions exist and pass validation.

## Next implementation pass

1. Build/validate class-wise question collections.
2. Add source-mapped practice questions.
3. Integrate the existing shared QuestionPlayer using board/class/subject metadata.
4. Integrate MockTestEngine with curriculum-driven selectors.
5. Validate isolation between ICSE and CBSE.
6. Run lint/build/tests before merge.
