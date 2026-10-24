# BoardPrep chapter authoring specification

This is the contract every BoardPrep chapter record must satisfy. It is derived
from the reviewed ICSE Class IX Geography chapters (the deepest audited subject
in the library) and from the shared schema in
`src/lib/boardprepContentSchema.mjs`.

A chapter is a JSON file under
`src/app/data/boardprep/content/<board>/<class>/<subject>/chapters/<slug>.json`.
The file name must equal the chapter `slug` in the subject registry.

## 1. Top level

```jsonc
{
  "schemaVersion": 1,
  "id": "<registry id, verbatim>",
  "title": "<registry title, verbatim>",
  "kind": "<registry kind>",
  "tagline": "one line, at most 120 characters, that says what the chapter is about",
  "reviewStatus": "draft",
  "sourceNote": {
    "thirdParty": "",
    "boardprep": "Original study material written by BoardPrep for the CISCE ICSE Class <N> <Subject> syllabus (official-verified baseline, examination year 2027). Every numerical result in this chapter was independently recomputed. No board examination paper was consulted, so every question is original practice and not a previous year question."
  },
  "overview": { "intro": "...", "facts": [ { "label": "...", "value": "..." } ] },
  "learningOutcomes": [ "..." ],
  "learn": [ { "id": "...", "title": "...", "blocks": [ ... ] } ],
  "figures": [ { "caption": "...", "description": "...", "labels": [ "..." ] } ],
  "keyPoints": [ "..." ],
  "examFocus": [ "..." ],
  "vocabulary": [ { "word": "...", "meaning": "..." } ],
  "questions": [ ... ]
}
```

`sourceNote.thirdParty` is `""` because the material is original. It must still be
present as a string. `reviewStatus` is `"draft"` for newly authored material.

## 2. Depth floors (all are hard requirements)

| Element | Minimum |
| --- | --- |
| `learn` lesson sections | 4 |
| blocks per lesson | 2 |
| words in a `paragraph` block | 40 |
| items in a `bullets` block | 3 |
| items in a `terms` block | 3 |
| items in an `examples` block | 2 |
| `table` blocks per chapter | 1 |
| `figures` | 2 |
| `keyPoints` | 8 |
| `examFocus` | 3 |
| `vocabulary` | 6 |
| `learningOutcomes` | 4 |
| total teaching words (excluding questions) | 800 |
| `questions` | 8 |

A chapter should land at roughly 1000–1600 teaching words, because the floor is a
trap for a thin rewrite, not a target.

## 3. Block types

Only these five types are used, and the renderer knows all of them:

- `paragraph` — `{ "type": "paragraph", "text": "..." }`
- `bullets` — `{ "type": "bullets", "items": [ "..." ] }`
- `terms` — `{ "type": "terms", "items": [ { "term": "...", "meaning": "..." } ] }`
- `examples` — `{ "type": "examples", "items": [ { "text": "...", "note": "..." } ] }`
- `table` — `{ "type": "table", "caption": "...", "columns": [ "..." ], "rows": [ [ "..." ] ] }`

Every table row must have exactly as many cells as there are columns, and every
cell must be a non-empty string.

## 4. Questions

Each question object:

```jsonc
{
  "id": "<chapter-prefix>-<short-slug>-<nn>",   // lowercase kebab-case, unique in the subject
  "type": "mcq" | "fill-blank" | "short" | "long" | "analytical",
  "difficulty": "easy" | "medium" | "hard",
  "marks": 1,                                    // positive integer
  "origin": "practice",                          // always "practice"
  "prompt": "...",
  "options": [ "..." ],                          // mcq only, at least 4
  "correctIndex": 0,                             // mcq only
  "answer": "...",                               // mcq: character-for-character the keyed option
  "explanation": "...",                          // at least 20 characters, real teaching
  "commonMistake": "..."                         // optional but preferred
}
```

Rules:

- The `answer` of an MCQ must equal the option at `correctIndex` exactly, including
  capitalisation and spacing.
- A non-MCQ question must not carry `options`.
- No placeholder answers (`tbd`, `n/a`, `...`).
- No two questions in the same subject may repeat a prompt, and no two may repeat
  an answer string.
- The mix should cover every type; a chapter of eight questions should carry at
  least one MCQ, one fill-in-the-blank, one short, one long and one analytical.
- `marks` should reflect the work: 1 for a single fact, 2 for a short explanation
  or one calculation, 3 for a multi-step or multi-point answer, 4 for a full
  structured answer or two linked calculations.
- `explanation` must state the reasoning, not repeat the answer.

## 5. Numerical and scientific integrity

This is the part that matters most, and it is checked mechanically.

- **Every number in an answer or explanation must be arithmetically derivable
  from the question.** Recompute each one.
- In any worked calculation, write the substitution as an explicit chain of
  equalities, for example
  `Area = 3.5 x 4 x 2 = 28 cm squared` — never a bare result.
- Keep the working to the arithmetic that a Class IX or Class X student can do
  with a calculator for trigonometry and mensuration, and without one for
  algebra and physics.
- Use the house notation for units: `m per second`, `N`, `kg`, `cm`, `metre`,
  `square units`, `cubic units`, `per cent`. Write squares and cubes in words.
- State the assumption before using a formula: "taking pi as 22/7" or
  "taking g as 9.8 m per second squared".
- A correct answer with a wrong intermediate step is a wrong answer. Check every
  line of the working.
- Do not write a claim about a board, an examiner, a mark scheme, a previous year
  paper or an official diagram. There is no such evidence in this repository.

## 6. Scope discipline

- Stay inside the syllabus scope the subject registry records for the chapter.
- Do not add a topic that the registry blurb does not cover, and do not leave out
  one that it does.
- Do not present a teaching illustration as an official board diagram.
- A figure `description` is a specification for a drawing the student could
  make; it is not a claim that such a figure appears in any board paper.

## 7. Verification before hand-off

Each chapter must satisfy the shared schema, and the subject must satisfy its
own focused validator. Run them before reporting the work as done.
