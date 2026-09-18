# Target95 project data schema

Each project data file exports a single ESM array. Example:

```js
export const EXAMPLE_PROJECTS = [
  {
    slug: "kebab-case-unique",
    title: "Human Title",
    boardLabel: "CBSE AI 843 · Class XI",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    status: "Guided project",        // e.g. Guided project | Optional capstone
    type: "Coding + report",         // Coding + report | Research & design
    language: "Python",              // omit when no code
    difficulty: "Intermediate",
    summary: "1-2 sentence overview.",
    shortOutcome: "ONE line for index cards.",
    academicNote: "optional note about board rules",
    problemStatement: "Paragraph.",
    objectives: ["..."],
    learningOutcomes: ["..."],
    requirements: { software: ["..."], libraries: ["..."], data: ["..."], hardware: ["..."] },
    concepts: ["..."],
    algorithm: ["step 1", "step 2"],
    code: { language: "Python", filename: "name.py", content: `...full runnable code...` }, // omit if no code
    setup: "pip install ...",           // omit if no code
    codeExplanation: ["..."],           // omit if no code
    sampleInput: "text",                // omit if no code
    sampleOutput: "real printed output",// omit if no code
    testCases: [ { input: "...", expected: "...", note: "..." } ],
    edgeCases: ["..."],
    reportFormat: ["1. ...", "2. ..."],
    viva: ["..."],
    extensions: ["..."],
    syllabusMapping: ["Maps to <board syllabus unit>"]
  }
];
```

Rules:
- Field names must match `src/components/projects/ProjectView.jsx` exactly.
- `code.content` is a JS template literal and must not contain backtick characters or the sequence `${`. Escape literal backslashes as `\\`.
- Code must be complete and runnable (no placeholders). `sampleOutput` must match what the code prints.
- Plain ASCII in code. Use the middle dot · only in boardLabel strings.
- Keep board content strictly separated (ISC AI 883, CBSE AI 843, CBSE CS 083, ICSE never mixed).
