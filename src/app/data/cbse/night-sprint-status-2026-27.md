# CBSE Night Sprint Status — 2026–27

## Current state

This sprint prioritizes a production-safe CBSE learning flow without altering the existing ICSE learning flow.

### Completed foundation
- Current 2026–27 CBSE source-of-truth entry point
- Subject-code separation: 402, 083, 065, 802
- Board-aware QuestionPlayer / MockTestPlayer integration
- CBSE question schema and mock-test configuration
- CBSE class → subject → unit routes
- Python scope separation between 083 and 065
- Class IX/X theory-heavy treatment rule

### Required completion gates
- Populate Class IX–XII current curriculum records with complete verified units/outcomes/topics/practicals
- Connect actual practice question banks to every class/subject/unit
- Connect real questions to mock-test blueprints
- Add chapter-level learning pages with question/practice actions
- Verify Class XI/XII 083 Python topics separately from 065 Pandas/Matplotlib topics
- Verify CSV, exception handling and SQL against the exact current subject syllabus before marking complete
- Run `validate:data` and production `next build`
- Route-smoke-test `/cbse`, class pages, subject pages, unit pages, practice and mock-test entry points

## Quality rule
No placeholder content, old-session content, or generic DSA content may be promoted to the CBSE 2026–27 source-of-truth merely to increase coverage.
