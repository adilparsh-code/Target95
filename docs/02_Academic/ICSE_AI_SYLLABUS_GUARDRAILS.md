# ICSE Robotics & Artificial Intelligence — Syllabus Guardrails

**Purpose:** Prevent AI content expansion from drifting outside the syllabus while the question bank is being accelerated.

## Class IX — Examination Year 2027

Use the repository's canonical `src/app/data/icseRoboticsAI.js` as the content contract. The current structure covers these AI/robotics areas:

1. Introduction to Robotics
2. Robot as a System
3. Concepts in Robotics
4. Introduction to Artificial Intelligence
5. Role of Data and Information / Evolution of Computing
6. Introduction to Data and Programming with Python
7. AI Concepts and AI Project Framework

Content must remain student-facing, syllabus-aligned and age-appropriate. Do not add advanced university-level ML, deep-learning mathematics, or unrelated programming topics merely to increase volume.

## Class X — Examination Year 2027

Use `src/app/data/icseRoboticsAIClassX.js` as the current Class X AI contract. The AI portion represented by the repository is **50/100 marks** and covers:

1. Decision Making in Machines / Computers
2. Machine Intelligence and Cybersecurity in Computing
3. Components of AI Project Framework
4. Introduction to Data and Programming with Python

The Class X AI question bank should deliberately include MCQs, short answers, case-based/application questions, output tracing, debugging, programming and HOTS questions, but every question must map back to one of the syllabus topics above.

## Current execution baseline

The Class X source currently contains **28 board-style questions across 4 units** (6 + 6 + 7 + 9). The bank includes MCQ, short-answer, case-study, output-tracing, debugging, programming and HOTS formats. This is a baseline for expansion, not a completion declaration.

Before adding volume, review each unit for topic-level coverage and question quality. Do not pad a unit with repetitive factual questions just to increase the count.

## Non-negotiable content rules

- Never mix **CBSE 402/other CBSE subjects** into CISCE AI content.
- Never mix **CISCE Java** content into Robotics & AI.
- Preserve the explicit **Class IX vs Class X** distinction.
- Do not mark a syllabus unit complete because a page exists; require theory, examples/practical work and meaningful assessment coverage.
- Every generated question must have a clear answer/model solution and board-appropriate difficulty.
- Prefer application, reasoning, tracing and debugging over repetitive factual questions.
- Validate data syntax after each significant content batch.
- Keep `main` as the working branch for this project.

## Quality gate before declaring AI complete

A class is complete only after:

- every syllabus unit/topic has student-facing learning content;
- practical/project activities are represented where applicable;
- question coverage exists across multiple assessment types;
- questions are checked for duplication and syllabus drift;
- answers/explanations are present where needed;
- `npm run validate:data` passes;
- the production build passes.
