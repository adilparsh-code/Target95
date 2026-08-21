# Class XII Boolean Algebra QA

## Scope
- Boolean language and laws
- Truth tables and gate coverage
- Gate conversions and universal gates
- Minterm/maxterm, canonical SOP/POS
- K-Map
- Encoder, decoder, MUX, half adder, full adder
- Word-problem translation and practice
- Student-facing routes

## Verified repository structure
- `src/app/isc/class-xii/boolean-algebra/page.jsx`
- `src/app/isc/class-xii/boolean-algebra/word-problems/page.jsx`
- `src/app/isc/class-xii/boolean-algebra/canonical-forms/page.jsx`
- `src/app/isc/class-xii/k-map/page.jsx`
- `src/app/data/iscXIIBooleanAlgebra.js`
- `src/app/data/iscXIIBooleanWordProblems.js`
- `src/app/data/iscXIICombinationalLogic.js`
- `src/app/data/iscXIIKMap.js`

## Content checks
- Common gates have truth tables.
- Gate conversion examples are present.
- Minterm/maxterm construction rules are present.
- Canonical SOP/POS conversion workflow is present.
- K-Map data includes 2-, 3-, and 4-variable maps, Gray-code ordering, grouping, wrap-around, overlap and don’t-care guidance.
- Word-problem training includes a translation method, keyword decoder, worked examples, graded practice and common mistakes.
- Encoder, decoder, MUX, half adder and full adder data includes explanations, core rules, truth/select tables and practice/MCQs.

## Known validation limitation
The GitHub-connected PR currently reports Vercel `build-rate-limit` failures. These are infrastructure/quota failures, not evidence of an application-code failure. Production build sign-off therefore remains pending until a build can complete successfully.

## Quality rule
Do not mark the chapter production-green solely because the documentation exists. Student-facing rendering and a successful build must be verified.
