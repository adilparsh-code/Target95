# TARGET95+ Content Templates

**Version**: 1.0.0  
**Last Updated**: August 06, 2026  
**Maintained By**: Chief Academic Content Strategist  
**Status**: Official Standard

---

## Document Purpose

This document defines the **official reusable content templates** for every chapter in Target95+. These templates ensure consistency, scalability, and quality across all subjects and boards (ICSE, ISC, CBSE).

### Scope

- Applies to all chapters, topics, and sub-topics
- Covers all board variants: ICSE, ISC, CBSE
- Serves as the single source of truth for content creators, AI generators, and reviewers

### How to Use This Document

1. **Content creators**: Follow the exact structure defined for each template type
2. **AI generators**: Use the field definitions and metadata schema to generate compliant content
3. **Reviewers**: Validate content against these templates before publishing
4. **Developers**: Use the metadata schema to build rendering components

---

## Universal Standards

### Board Compatibility

All templates are **board-agnostic** by default. Use the `boards` field to specify applicability:

| Board Code | Full Name | Notes |
|------------|-----------|-------|
| `ICSE` | Indian Certificate of Secondary Education | Class 10 |
| `ISC` | Indian School Certificate | Class 12 |
| `CBSE` | Central Board of Secondary Education | Class 10 & 12 |

### Difficulty Levels

| Level | Code | Description |
|-------|------|-------------|
| Easy | `E` | Recall and basic understanding |
| Medium | `M` | Application and analysis |
| Hard | `H` | Synthesis, evaluation, and creation |

### Metadata Schema (Required for All Templates)

Every template instance MUST include the following frontmatter:

```yaml
---
template_id: <UNIQUE_ID>
template_type: <TEMPLATE_NAME>
chapter_id: <CHAPTER_ID>
topic_id: <TOPIC_ID>
subject: <SUBJECT>
boards: [ICSE, ISC, CBSE]
difficulty: E | M | H
estimated_time: <minutes>
tags: [<keyword1>, <keyword2>]
version: 1.0
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
author: <AUTHOR_ID>
reviewer: <REVIEWER_ID>
status: draft | review | approved | published
---
```
---

### 1. Theory Template

**Purpose**: Deliver comprehensive conceptual explanations that build foundational understanding of a topic without relying on code or formal definitions.

**Sections**:
1. Introduction / Hook
2. Core Concept Explanation
3. Key Characteristics
4. Types / Categories (if applicable)
5. Real-world Analogies
6. Summary

**Required Fields**:
- `title`: Topic name
- `introduction`: 2-3 sentences introducing the concept
- `core_explanation`: Detailed explanation (200-400 words)
- `key_points`: Array of 3-5 bullet points
- `summary`: 1-2 sentence recap
- `learning_outcome`: What student will understand after reading

**Optional Fields**:
- `analogy`: Real-world comparison
- `types`: Array of concept variants with descriptions
- `visual_aids`: Array of diagram/image references
- `cross_references`: Links to related topics
- `common_misconceptions`: Brief note on what students often misunderstand
- `board_specific_notes`: ICSE/ISC/CBSE variations

**Recommended Length**: 300-600 words  
**Difficulty**: Easy to Medium  
**Expected Learning Outcome**: Student can explain the concept in their own words and identify its key characteristics.

---

### 2. Definition Template

**Purpose**: Provide precise, board-aligned formal definitions that students must memorize and apply in exams.

**Sections**:
1. Term / Phrase
2. Formal Definition
3. Key Components Breakdown
4. Context / Application
5. Related Terms

**Required Fields**:
- `term`: The word or phrase being defined
- `definition`: Exact definition (1-3 sentences)
- `key_components`: Array of 2-4 essential elements
- `context`: Where/how the term is used
- `related_terms`: Array of associated terms

**Optional Fields**:
- `alternative_definitions`: Other accepted phrasings
- `etymology`: Word origin (if relevant)
- `examples`: 1-2 simple examples of usage
- `exceptions`: Cases where definition may not apply
- `mnemonic`: Memory aid
- `board_variations`: ICSE vs ISC vs CBSE wording differences

**Recommended Length**: 100-250 words  
**Difficulty**: Easy  
**Expected Learning Outcome**: Student can write the definition verbatim in exams and recognize the term in context.

---

### 3. Example Template

**Purpose**: Demonstrate step-by-step application of a concept through worked examples, bridging theory and practice.

**Sections**:
1. Problem Statement
2. Given / Known
3. Step-by-Step Solution
4. Final Answer
5. Verification / Check
6. Explanation of Key Steps

**Required Fields**:
- `problem`: Clear problem statement
- `given`: Array of known values or conditions
- `steps`: Array of steps with `description`, `calculation`, and `result`
- `final_answer`: The solution
- `explanation`: Why each step works

**Optional Fields**:
- `alternative_methods`: Other valid approaches
- `common_errors`: Mistakes to avoid
- `variations`: Similar problems with different values
- `visualization`: Diagram or flowchart reference
- `difficulty`: Easy | Medium | Hard
- `time_estimate`: Expected time to solve
- `board_pattern`: How this maps to exam questions

**Recommended Length**: 200-400 words  
**Difficulty**: Easy to Hard  
**Expected Learning Outcome**: Student can independently solve similar problems by following the demonstrated pattern.

---

### 4. Programming Example Template

**Purpose**: Teach programming constructs through annotated, executable code examples with detailed explanations.

**Sections**:
1. Problem Description
2. Algorithm / Logic
3. Complete Code
4. Line-by-Line Explanation
5. Output / Result
6. Key Takeaways

**Required Fields**:
- `problem`: What the program does
- `language`: Programming language (Java / Python / C++)
- `algorithm`: Brief logic description
- `code`: Complete, compilable code block
- `explanations`: Array of `{line_range, explanation}` objects
- `output`: Expected program output
- `key_takeaways`: Array of 3-5 lessons learned

**Optional Fields**:
- `time_complexity`: Big-O notation
- `space_complexity`: Memory usage
- `dry_run`: Manual execution trace
- `edge_cases`: Boundary conditions handled
---
---

### 5. Programming Question Template

**Purpose**: Provide coding exercises for student practice with clear requirements, constraints, and evaluation criteria.

**Sections**:
1. Question Statement
2. Input / Output Format
3. Constraints
4. Sample Test Cases
5. Hints / Guidance
6. Solution Requirements

**Required Fields**:
- `question`: Clear problem statement
- `language`: Required programming language
- `input_format`: How input is provided
- `output_format`: Expected output format
- `constraints`: Array of limits (e.g., 1 <= N <= 100)
- `sample_input`: Example input
- `sample_output`: Example output
- `hints`: Array of 2-3 progressive hints
- `solution_requirements`: Array of must-have elements (e.g., "must use loops", "must handle edge case")

**Optional Fields**:
- `explanation`: Why this problem matters
- `edge_cases_to_consider`: Array of tricky inputs
- `common_mistakes`: Frequent student errors
- `alternative_solutions`: Different valid approaches
- `time_limit`: If for competitive practice
- `space_limit`: Memory constraints
- `difficulty`: Easy | Medium | Hard
- `points`: Marks allocation
- `board_pattern`: ICSE/ISC/CBSE question style alignment

**Recommended Length**: 100-300 words  
**Difficulty**: Easy to Hard  
**Expected Learning Outcome**: Student can write a complete, working solution that handles all specified constraints.


### 6. MCQ Template

**Purpose**: Assess knowledge through multiple-choice questions with one or more correct answers, mirroring board exam patterns.

**Sections**:
1. Question Stem
2. Options
3. Correct Answer(s)
4. Explanation

**Required Fields**:
- `question`: Clear, unambiguous question text
- `options`: Array of exactly 4 options (A, B, C, D)
- `correct_answers`: Array of correct option letters
- `explanation`: Why the correct answer(s) are right and others are wrong
- `topic`: Associated topic/chapter
- `difficulty`: Easy | Medium | Hard

**Optional Fields**:
- `single_correct`: Boolean (true if only one answer is correct)
- `board_source`: ICSE/ISC/CBSE past paper reference
- `year`: Year of question (if from past paper)
- `marks`: Mark allocation
- `negative_marking`: Boolean (true if applicable)
- `tags`: Array of concepts tested
- `common_trap`: Why students choose wrong answers
- `image_required`: Boolean (if diagram is needed)
- `video_explanation`: Link to video solution

**Recommended Length**: 50-150 words  
**Difficulty**: Easy to Hard  
**Expected Learning Outcome**: Student can identify the correct answer and understand the reasoning behind it.

**Format Example**:
```yaml
question: "Which of the following is NOT a primitive data type in Java?"
options:
  - "int"
  - "String"
  - "char"
  - "boolean"
correct_answers: ["B"]
explanation: "String is a class, not a primitive. Primitives are int, char, boolean, byte, short, long, float, double."
```

---

### 7. Output Question Template

**Purpose**: Test students' ability to trace code execution and predict output, a key skill for board exams.

**Sections**:
1. Code Snippet
2. Question
3. Options / Answer Format
4. Explanation

**Required Fields**:
- `question`: "What will be the output of the following code?"
- `language`: Programming language
- `code`: Complete code snippet
- `options`: Array of 4 possible outputs (or `answer_format: "open"` for free response)
- `correct_answer`: The actual output
- `explanation`: Step-by-step trace showing how output is produced

**Optional Fields**:
- `dry_run_table`: Table showing variable values at each step
- `common_mistakes`: What students often predict incorrectly
---

### 8. Debugging Question Template

**Purpose**: Develop debugging skills by presenting code with errors that students must identify and fix.

**Sections**:
1. Problem Statement
2. Buggy Code
3. Task
4. Solution

**Required Fields**:
- `question`: "Identify and correct the errors in the following code"
- `language`: Programming language
- `buggy_code`: Code with intentional errors
- `number_of_errors`: Count of distinct errors
- `corrected_code`: Fully working solution
- `error_list`: Array of `{line_number, error_type, description, fix}` objects

**Optional Fields**:
- `error_types`: Categories of errors (syntax, logical, runtime)
- `hints`: Array of hints for each error
- `common_mistakes`: Related errors students make
- `difficulty`: Easy | Medium | Hard
- `marks`: Mark allocation (typically 2-4 marks per error)
- `board_pattern`: ICSE/ISC/CBSE marking scheme alignment
- `test_cases`: Input/output to verify fix
- `learning_objective`: What debugging skill is being tested

**Recommended Length**: 15-60 lines of buggy code  
**Difficulty**: Medium to Hard  
**Expected Learning Outcome**: Student can identify syntax and logical errors and produce working code.

---

### 9. Previous Year Question Template

**Purpose**: Provide authentic board exam questions from previous years with solutions and marking schemes.

**Sections**:
1. Question Paper Details
2. Original Question
3. Marking Scheme
4. Model Answer
5. Exam Tips

**Required Fields**:
- `source_board`: ICSE | ISC | CBSE
- `year`: Year of examination
- `exam_type`: Board Exam | Prelim | compartment
- `question_number`: Question identifier
- `marks`: Total marks for question
- `question_text`: Original question verbatim
- `answer`: Complete model answer
- `marking_scheme`: Array of `{step, marks}` objects

**Optional Fields**:
- `subject`: Subject name
- `chapter`: Associated chapter/topic
---

### 10. Revision Notes Template

**Purpose**: Provide concise, high-density revision material for last-minute exam preparation.

**Sections**:
1. Topic Overview
2. Key Formulas / Definitions
3. Important Points
4. Quick Comparison Tables
5. Mnemonics
6. Do's and Don'ts

**Required Fields**:
- `topic`: Topic name
- `key_concepts`: Array of 5-10 essential concepts
- `formulas`: Array of critical formulas (if applicable)
- `definitions`: Array of must-know definitions
- `important_points`: Array of exam-critical facts
- `common_mistakes`: Array of frequent errors
- `exam_tips`: Array of board-specific tips

**Optional Fields**:
- `comparison_table`: Side-by-side comparison of similar concepts
- `mnemonics`: Memory aids
- `flowcharts`: High-level process diagrams
- `do_and_donts`: Array of `{do, dont}` pairs
- `last_minute_checklist`: Quick verification list
- `board_weightage`: Expected marks allocation
- `quick_facts`: Bullet points of trivia/edge cases
- `self_test_questions`: 2-3 quick check questions

**Recommended Length**: 300-800 words  
**Difficulty**: Easy to Medium  
**Expected Learning Outcome**: Student can refresh entire topic in 15-20 minutes and recall key facts under exam pressure.

---

### 11. Quick Revision Sheet Template

**Purpose**: Create a single-page, printable summary sheet for rapid revision before exams.

**Sections**:
1. Title & Meta
2. Concept Map
3. Critical Formulas
4. One-Liner Definitions
5. Key Differences
6. Common Error List

**Required Fields**:
- `title`: Topic/chapter name
- `subject`: Subject name
- `chapter`: Chapter number and name
- `concept_map`: Bullet hierarchy of all sub-topics
- `formulas`: Array of formulas with brief context
- `definitions`: Array of 1-line definitions
- `key_differences`: Table comparing similar terms
- `common_errors`: Array of must-avoid mistakes
---

### 12. Mock Test Template

**Purpose**: Structure full-length mock tests that simulate real board exam conditions.

**Sections**:
1. Test Instructions
2. Question Paper
3. Answer Key
4. Detailed Solutions
5. Marking Scheme
6. Performance Analysis Guide

**Required Fields**:
- `test_title`: Name of mock test
- `subject`: Subject name
- `board`: ICSE | ISC | CBSE
- `class`: Class 10 | Class 12
- `duration_minutes`: Time limit
- `total_marks`: Sum of all questions
- `instructions`: Array of exam instructions
- `sections`: Array of section objects with `name`, `questions`, `marks`, `time_allocation`
- `questions`: Array of question objects (using appropriate question templates)
- `answer_key`: Array of correct answers
- `solutions`: Detailed solution for each question
- `marking_scheme`: Point-wise marking criteria

**Optional Fields**:
- `difficulty_distribution`: Array of `{level, percentage}`
- `blueprint_alignment`: How closely it matches board pattern
- `cutoff_marks`: Expected passing marks
- `topper_score`: Expected highest marks
- `average_score`: Expected class average
- `time_management_tips`: Section-wise time advice
- `common_pitfalls`: Mistakes students make in this test
- `answer_sheet_template`: Format of answer sheet
- `negative_marking`: Boolean and rules
- `open_book`: Boolean (true if reference allowed)
- `calculator_allowed`: Boolean

**Recommended Length**: 3-4 hours worth of questions  
**Difficulty**: Mixed (Easy 30%, Medium 50%, Hard 20%)  
**Expected Learning Outcome**: Student experiences real exam conditions and identifies weak areas.

---

### 13. AI Tutor Explanation Template

**Purpose**: Structure AI-generated explanations that adapt to student queries, providing personalized, step-by-step guidance.

**Sections**:
1. Student Query Recognition
2. Concept Recap
3. Step-by-Step Explanation
4. Worked Application
5. Check for Understanding
6. Further Resources

**Required Fields**:
- `query_type`: Classification of student question (e.g., "how-to", "why", "debug", "concept")
- `topic`: Topic being explained
- `student_level`: Beginner | Intermediate | Advanced
- `explanation`: Adaptive explanation based on level
- `steps`: Array of numbered steps
- `example`: Relevant worked example
- `check_question`: 1 question to verify understanding
- `encouragement`: Motivational message

**Optional Fields**:
---

### 14. Common Mistakes Template

**Purpose**: Document frequent errors, misconceptions, and pitfalls that students encounter, with corrections and preventive strategies.

**Sections**:
1. Mistake Overview
2. Individual Mistake Entries
3. Correction Strategy
4. Practice to Avoid

**Required Fields**:
- `topic`: Topic/chapter name
- `mistakes`: Array of `{mistake_id, description, why_it_happens, correct_approach, example}` objects
- `prevention_tips`: Array of strategies to avoid mistakes
- `practice_questions`: Array of question IDs that reinforce correct understanding

**Optional Fields**:
- `frequency`: How often this mistake occurs (High/Medium/Low)
- `exam_impact`: Potential marks lost
- `board_specific`: ICSE/ISC/CBSE variations
- `visual_comparison`: Side-by-side wrong vs right approach
- `student_quotes`: Common student confusions (anonymized)
- `teacher_notes`: Additional guidance for educators
- `difficulty`: Easy | Medium | Hard
- `psychological_factors`: Why students make this error
- `quick_fix`: One-sentence correction tip

**Recommended Length**: 200-500 words  
**Difficulty**: Easy to Medium  
**Expected Learning Outcome**: Student recognizes the mistake in their own work and applies the correct approach consistently.

---

### 15. Exam Tips Template

**Purpose**: Provide board-specific exam strategies, time management advice, and marking scheme insights to maximize student performance.

**Sections**:
1. Exam Overview
2. Paper Pattern Analysis
3. Time Management Strategy
4. Question-Type Strategies
5. Common Traps to Avoid
6. Last Week Preparation Plan

**Required Fields**:
- `board`: ICSE | ISC | CBSE
- `class`: Class 10 | Class 12
- `subject`: Subject name
- `exam_duration`: Time limit
- `total_marks`: Maximum marks
- `paper_pattern`: Array of section details with `type`, `questions`, `marks_per_question`, `choice`
- `time_allocation`: Array of `{section, time, strategy}`
- `scoring_tips`: Array of tips to maximize marks
- `common_traps`: Array of mistakes that cost marks
- `last_week_plan`: Day-by-day revision schedule

**Optional Fields**:
- `marking_scheme_insights`: How partial marking works
- `presentation_tips`: Formatting for handwritten answers
- `calculator_tips`: Efficient calculator use (if allowed)
- `formula_sheet_strategy`: How to use provided formulas
- `stress_management`: Techniques during exam
- `post_exam_checklist`: What to verify before submitting
- `topper_secrets`: Habits of high scorers
- `board_specific_rules`: ICSE/ISC/CBSE unique rules
- `frequency_analysis`: Which chapters are most frequently asked
- `important_questions`: Array of must-practice questions
- `cutoff_trends`: Historical passing trends

**Recommended Length**: 500-1000 words  
**Difficulty**: Easy  
**Expected Learning Outcome**: Student enters exam with clear strategy, reducing anxiety and maximizing score potential.
- `analogies`: Age-appropriate comparisons
- `visual_aids`: Diagram references
- `common_confusions`: Related misconceptions to address
- `prerequisites`: Prior knowledge needed
- `extension`: Advanced variation for advanced students
---

## Template Implementation Guidelines

### For Content Creators

1. **Always include frontmatter** — Metadata is mandatory for filtering and organization
2. **Use board field** — Explicitly state which boards the content applies to
3. **Maintain consistent formatting** — Follow markdown standards defined in this document
4. **Validate completeness** — All required fields must be populated
5. **Keep optional fields minimal** — Only include optional fields if they add value

### For AI Generators

1. **Parse template_id** — Generate unique identifiers following pattern: `<board>_<subject>_<chapter>_<type>_<seq>`
2. **Validate metadata** — Check all required frontmatter fields before generation
3. **Respect difficulty** — Align content complexity with assigned difficulty level
4. **Board alignment** — Use board-specific terminology and patterns
5. **Learning outcome focus** — Ensure generated content achieves stated outcomes

### For Developers

1. **Build reusable components** — Create React components that render any template type
2. **Use metadata for filtering** — Enable filtering by board, difficulty, subject, chapter
3. **Support progressive disclosure** — Show summaries by default, expand for details
4. **Enable bookmarking** — Allow students to save templates for later review
5. **Track engagement** — Log time spent and completion rates per template

---

## Quality Checklist

Before any template is marked as `approved`, verify:

- [ ] All required fields are populated
- [ ] Metadata frontmatter is complete and valid
- [ ] Content aligns with stated learning outcomes
- [ ] Board-specific variations are correctly marked
- [ ] Difficulty level matches actual content complexity
- [ ] Language is age-appropriate for target class
- [ ] No factual errors in definitions, formulas, or explanations
- [ ] Code examples are syntactically correct and executable
- [ ] Markdown formatting is consistent
- [ ] Links and cross-references are valid

---

## Template Usage Analytics

Track the following metrics for each template instance:

| Metric | Description |
|--------|-------------|
| `views` | Number of times viewed |
| `completion_rate` | Percentage of users who read to end |
| `time_spent` | Average reading time |
| `bookmark_count` | Times saved by students |
| `feedback_score` | Student rating (1-5) |
| `effectiveness` | Improvement in related test scores |

---

## Version Control

- **Current Version**: 1.0.0
- **Change Log**: Maintained in CHANGELOG.md
- **Review Cycle**: Quarterly
- **Approval Authority**: Chief Academic Content Strategist

---

## Support

For questions about template usage or proposed changes:
- **Email**: academic@target95.vercel.app
- **GitHub Issues**: Tag with `content-template`
- **Slack**: #academic-content channel

---

**Document End**

*This is a living document. All content creators, AI systems, and reviewers must adhere to these templates to maintain consistency and quality across Target95+.*
---

## Template Implementation Guidelines

### For Content Creators

1. **Always include frontmatter** — Metadata is mandatory for filtering and organization
2. **Use board field** — Explicitly state which boards the content applies to
3. **Maintain consistent formatting** — Follow markdown standards defined in this document
4. **Validate completeness** — All required fields must be populated
5. **Keep optional fields minimal** — Only include optional fields if they add value

### For AI Generators

1. **Parse template_id** — Generate unique identifiers following pattern: `<board>_<subject>_<chapter>_<type>_<seq>`
2. **Validate metadata** — Check all required frontmatter fields before generation
3. **Respect difficulty** — Align content complexity with assigned difficulty level
4. **Board alignment** — Use board-specific terminology and patterns
5. **Learning outcome focus** — Ensure generated content achieves stated outcomes

### For Developers

1. **Build reusable components** — Create React components that render any template type
2. **Use metadata for filtering** — Enable filtering by board, difficulty, subject, chapter
3. **Support progressive disclosure** — Show summaries by default, expand for details
4. **Enable bookmarking** — Allow students to save templates for later review
5. **Track engagement** — Log time spent and completion rates per template

---

## Quality Checklist

Before any template is marked as `approved`, verify:

- [ ] All required fields are populated
- [ ] Metadata frontmatter is complete and valid
- [ ] Content aligns with stated learning outcomes
- [ ] Board-specific variations are correctly marked
- [ ] Difficulty level matches actual content complexity
- [ ] Language is age-appropriate for target class
- [ ] No factual errors in definitions, formulas, or explanations
- [ ] Code examples are syntactically correct and executable
- [ ] Markdown formatting is consistent
- [ ] Links and cross-references are valid

---

## Template Usage Analytics

Track the following metrics for each template instance:

| Metric | Description |
|--------|-------------|
| `views` | Number of times viewed |
| `completion_rate` | Percentage of users who read to end |
| `time_spent` | Average reading time |
| `bookmark_count` | Times saved by students |
| `feedback_score` | Student rating (1-5) |
| `effectiveness` | Improvement in related test scores |

---

## Version Control

- **Current Version**: 1.0.0
- **Change Log**: Maintained in CHANGELOG.md
- **Review Cycle**: Quarterly
- **Approval Authority**: Chief Academic Content Strategist

---

## Support

For questions about template usage or proposed changes:
- **Email**: academic@target95.vercel.app
- **GitHub Issues**: Tag with `content-template`
- **Slack**: #academic-content channel

---

**Document End**

*This is a living document. All content creators, AI systems, and reviewers must adhere to these templates to maintain consistency and quality across Target95+.*
# TARGET95 OFFICIAL CHAPTER CONTENT TEMPLATES
*Standardized Templates for ICSE, ISC, and CBSE Curricula*

---

## TABLE OF CONTENTS
1. Theory Template
2. Definition Template
3. Example Template
4. Programming Example Template
5. Programming Question Template
6. MCQ Template
7. Output Question Template
8. Debugging Question Template
9. Previous Year Question Template
10. Revision Notes Template
11. Quick Revision Sheet Template
12. Mock Test Template
13. AI Tutor Explanation Template
14. Common Mistakes Template
15. Exam Tips Template

---

---

## 1. THEORY TEMPLATE

### PURPOSE
To present comprehensive, curriculum-aligned explanatory content that builds foundational understanding of core chapter concepts, connecting prior knowledge to new topics and ensuring full coverage of board-mandated learning objectives.

### SECTIONS
- Concept Overview
- Core Explanation
- Sub-topic Breakdowns (with internal cross-references)
- Real-world Connections
- Inter-topic Linkages
- Summary Takeaways

### REQUIRED FIELDS
- Chapter ID
- Topic Name
- Curriculum Board (ICSE/ISC/CBSE)
- Class Level
- Core Concept Statement
- Sub-topic list aligned to board syllabus
- Learning objective alignment
- Last curriculum update verification date

### OPTIONAL FIELDS
- Historical context of the concept
- Advanced extension notes (for high-achieving students)
- Multimedia resource links (videos, simulations)
- Research citations (for ISC/CBSE Class 11-12)
- Language translations (regional Indian languages)

### RECOMMENDED LENGTH
- ICSE (Classes 9-10): 800-1500 words per major theory block
- ISC/CBSE (Classes 11-12): 1200-2500 words per major theory block

### DIFFICULTY
- Aligned to board curriculum progression: Beginner (Class 9) → Intermediate (Class 11) → Advanced (Class 12)
- Marked with complexity score (1-5) to scaffold learning.

### EXPECTED LEARNING OUTCOME
Students can explain the core concept in their own words, identify its applications, and connect it to other chapter topics to solve foundational problems.

---

## 2. DEFINITION TEMPLATE

### PURPOSE
To provide clear, concise, board-exam-aligned definitions of key terms, ensuring students memorize and understand terminology required for scoring full marks in subjective and objective questions.

### SECTIONS
- Term Heading
- Formal Board-Approved Definition
- Simplified Lay Explanation
- Contextual Usage Example
- Related Terms (with links)
- Common Misconceptions Clarification

### REQUIRED FIELDS
- Term Name
- Associated Chapter/Topic
- Curriculum Board
- Class Level
- Formal definition sourced from board-prescribed textbook
- One contextual usage example
- Related terms list

### OPTIONAL FIELDS
- Etymology of the term (for theoretical subjects)
- Visual representation link (diagram/infographic)
- Pronunciation guide (for technical terms)
- Usage in past year questions (PYQ tags)

### RECOMMENDED LENGTH
50-150 words per definition.

### DIFFICULTY
Uniform for all curricula: Matches board requirement for term complexity at respective class level.

### EXPECTED LEARNING OUTCOME
Students can recall the exact formal definition to write in exams and use the term correctly in problem-solving and descriptive answers.

---

## 3. EXAMPLE TEMPLATE

### PURPOSE
To illustrate abstract concepts with concrete, relatable examples that reinforce theory learning and demonstrate how concepts are applied in practical scenarios.

### SECTIONS
- Example Reference ID
- Concept Linked To
- Step-by-Step Explanation
- Solution Breakdown
- Key Takeaway from Example
- Variation Prompt (to test extension)

### REQUIRED FIELDS
- Associated Theory Topic ID
- Curriculum Board
- Class Level
- Problem statement for the example
- Step-by-step solution
- Link back to parent theory content

### OPTIONAL FIELDS
- Visual aid (diagram, chart)
- Alternative solution method
- Real-world origin of the example scenario
- PYQ alignment tag (if adapted from past board question)

### RECOMMENDED LENGTH
150-400 words per example, excluding calculations/diagrams.

### DIFFICULTY
Progressive: Matches the complexity of the linked theory concept (1-5 scale).

### EXPECTED LEARNING OUTCOME
Students can replicate the example's logic to solve similar problems and adapt the concept to variation scenarios.

---

## 4. PROGRAMMING EXAMPLE TEMPLATE

### PURPOSE
To teach coding concepts through working, board-aligned programs that follow syntactical rules, demonstrate best practices, and explain line-by-line execution for Computer Science/Informatics Practices curricula.

### SECTIONS
- Program Objective
- Complete Code Snippet (with syntax highlighting)
- Line-by-Line Explanation
- Sample Input/Output
- Dry Run Walkthrough
- Modification Suggestions (to extend learning)
- Common Pitfalls in the Code

### REQUIRED FIELDS
- Linked Programming Concept (e.g., loops, functions)
- Curriculum Board
- Class Level
- Programming Language (Python/Java/C++ as per board syllabus)
- Full functional code
- Sample input and output pairs
- Dry run table for code execution
- Link to parent theory topic on programming concept

### OPTIONAL FIELDS
- Alternative implementation (e.g., recursive vs iterative)
- Time/space complexity analysis (for ISC/CBSE Class 12)
- Debugging exercise snippet
- IDE execution link (cloud-based)

### RECOMMENDED LENGTH
300-800 words of explanation, excluding code length.

### DIFFICULTY
Aligned to board programming syllabus: Beginner (Class 9-10 syntax) → Intermediate (Class 11 OOP) → Advanced (Class 12 data structures)

### EXPECTED LEARNING OUTCOME
Students can write, execute, and explain the code, modify it to meet new requirements, and identify and fix common syntax/logic errors in similar programs.

---

## 5. PROGRAMMING QUESTION TEMPLATE

### PURPOSE
To assess students' ability to apply programming concepts to solve original problems, aligned to board exam question patterns and difficulty level.

### SECTIONS
- Question Statement
- Input Specifications
- Output Specifications
- Constraints (input limits, time limits)
- Sample Input/Output
- Explanation of Sample Output
- Marking Scheme (board-aligned)
- Hints (scaffolded support)

### REQUIRED FIELDS
- Question ID
- Curriculum Board
- Class Level
- Programming Language
- Clear problem statement
- Input/output format specifications
- Functional test cases (minimum 3)
- Marking rubric aligned to board exam pattern
- Linked concept tags

### OPTIONAL FIELDS
- Edge case test cases
- Solution code link
- Common error breakdown
- PYQ alignment tag
- Time complexity requirement

### RECOMMENDED LENGTH
100-300 words for question statement, excluding test cases.

### DIFFICULTY
Class-aligned: 1-5 scale (1 = basic syntax check, 5 = complex logic application with multiple concepts)

### EXPECTED LEARNING OUTCOME
Students can analyze the problem, design a logical solution, write syntactically correct code, and test it against all provided test cases to pass all evaluation criteria.

---

## 6. MCQ TEMPLATE

### PURPOSE
To assess factual understanding, conceptual clarity, and quick problem-solving ability through objective questions aligned to board exam (including CBT/board objective section) patterns.

### SECTIONS
- Question Stem
- Options (A, B, C, D)
- Correct Answer
- Explanation for Correct Answer
- Explanation for Distractors (why other options are wrong)
- Concept Tags
- Difficulty Tag

### REQUIRED FIELDS
- Question ID
- Curriculum Board
- Class Level
- Linked chapter/topic ID
- Clear question stem
- 4 plausible options (1 correct, 3 distractors)
- Correct answer identifier
- Explanation of correct answer
- Source alignment to board syllabus
- Mark assigned (as per board pattern)

### OPTIONAL FIELDS
- Negative marking note (as per board rules)
- PYQ year tag (if sourced from past paper)
- Calculation steps (for numerical MCQs)
- Common student mistake that leads to choosing distractor
- Image-based question attachment link

### RECOMMENDED LENGTH
Stem: 20-100 words; each option: 5-30 words.

### DIFFICULTY
3-tier: Easy (factual recall), Medium (conceptual application), Hard (multi-concept problem-solving)

### EXPECTED LEARNING OUTCOME
Students can distinguish between correct and incorrect information, apply concepts to choose the right answer, and understand why distractors are invalid to reinforce conceptual clarity.

---

## 7. OUTPUT QUESTION TEMPLATE

### PURPOSE
To assess students' ability to trace code execution, predict output, and understand program flow for computer science curricula, aligned to board exam question patterns.

### SECTIONS
- Code Snippet
- Question Prompt (predict the output)
- Sample Correct Output
- Line-by-Line Execution Trace
- Common Incorrect Outputs & Explanations
- Marking Scheme

### REQUIRED FIELDS
- Question ID
- Curriculum Board
- Class Level
- Programming Language
- Complete, error-free code snippet
- Clear question instruction
- Correct output
- Execution trace table
- Marking rubric
- Linked concept tags (e.g., loop execution, function calls)

### OPTIONAL FIELDS
- Modified code variation question
- Common logic error explanation
- PYQ alignment tag
- Dry run video link

### RECOMMENDED LENGTH
Code snippet up to 50 lines; explanation up to 300 words.

### DIFFICULTY
Progressive: 1-5 scale (1 = simple print statements, 5 = complex recursion/data structure output tracing)

### EXPECTED LEARNING OUTCOME
Students can trace program flow line-by-line, track variable values, and accurately predict the output of any given code snippet aligned to their syllabus.

---

## 8. DEBUGGING QUESTION TEMPLATE

### PURPOSE
To assess students' ability to identify, diagnose, and fix syntax, logical, and runtime errors in code, reinforcing understanding of programming fundamentals and common pitfalls.

### SECTIONS
- Buggy Code Snippet
- Question Prompt (identify and fix errors)
- Number of Errors Specified
- Error Classification (syntax/logic/runtime)
- Corrected Code
- Explanation of Each Bug
- Common Student Misconceptions Leading to Bugs
- Marking Scheme

### REQUIRED FIELDS
- Question ID
- Curriculum Board
- Class Level
- Programming Language
- Buggy code with 1-3 errors (as per board pattern)
- Clear instruction to debug
- Correct fixed code
- Line-by-line bug explanation
- Marking rubric
- Linked concept tags

### OPTIONAL FIELDS
- Additional hidden edge case bug
- Runtime error message simulation
- PYQ alignment tag
- Step-by-step debugging framework guide

### RECOMMENDED LENGTH
Code snippet up to 40 lines; explanation up to 400 words.

### DIFFICULTY
3-tier: Easy (syntax errors), Medium (simple logical errors), Hard (complex logical/runtime errors)

### EXPECTED LEARNING OUTCOME
Students can identify different types of code errors, debug them to produce a functional program, and avoid common pitfalls in their own coding practice.

---

## 9. PREVIOUS YEAR QUESTION (PYQ) TEMPLATE

### PURPOSE
To organize past board exam questions with solutions, marking schemes, and analysis to help students practice exam-aligned problems and understand question patterns.

### SECTIONS
- Question Metadata
- Full Question Text
- Official Board Marking Scheme
- Model Answer
- Step-by-Step Solution
- Common Student Mistakes in the Question
- Concept Weightage Analysis
- Repeat Occurrence Tag (if asked multiple times)

### REQUIRED FIELDS
- PYQ ID
- Exam Year & Board (ICSE/ISC/CBSE)
- Class Level
- Full question text (exact from board paper)
- Official board marking scheme
- Comprehensive model answer
- Linked chapter/topic tags
- Marks assigned (as per original paper)

### OPTIONAL FIELDS
- Video solution link
- Similar PYQ list
- Blueprint alignment (which board syllabus section it maps to)
- Student performance data (percentage of students who scored full marks)
- scanned copy of original board paper link

### RECOMMENDED LENGTH
Variable by question type, but model answer aligned to word limit specified in board marking scheme.

### DIFFICULTY
Aligned to original board exam difficulty: Classified as per board's internal difficulty rating for past questions.

### EXPECTED LEARNING OUTCOME
Students can solve the PYQ to score full marks as per board marking scheme, recognize repeated question patterns, and apply the same logic to similar questions in future exams.

---

## 10. REVISION NOTES TEMPLATE

### PURPOSE
To provide comprehensive, chapter-end recap notes that condense all core theory, definitions, and formulas into a structured study resource for pre-exam revision.

### SECTIONS
- Chapter Overview
- Core Concepts Recap (sub-topic wise)
- Key Definitions List
- Formulas/Key Equations Cheat Sheet
- Important Diagrams/Flowcharts
- Weightage Analysis (board exam marks for each sub-topic)
- High-Priority Questions List

### REQUIRED FIELDS
- Chapter ID
- Curriculum Board
- Class Level
- Sub-topic wise recap of all core concepts
- Complete list of key definitions
- All formulas/key equations with context
- Board exam marks weightage per sub-topic
- 10-15 high-priority practice questions
- Alignment to latest board syllabus

### OPTIONAL FIELDS
- Mind map link (interactive/visual)
- Cross-chapter linkage notes
- Common mistake recap
- Exam-specific mnemonics
- Audio revision notes link

### RECOMMENDED LENGTH
- ICSE (Class 9-10): 1500-2500 words per chapter
- ISC/CBSE (Class 11-12): 2500-4000 words per chapter

### DIFFICULTY
Consolidated: Recaps all difficulty levels of concepts covered in the chapter.

### EXPECTED LEARNING OUTCOME
Students can use the revision notes to recap all chapter content in 2-3 hours, identify high-weightage topics to prioritize, and practice key questions to reinforce learning.

---

## 11. QUICK REVISION SHEET TEMPLATE

### PURPOSE
To provide a 1-page (condensed) last-minute revision resource that captures only the most critical, high-yield facts, formulas, and pointers for 15-minute pre-exam recap.

### SECTIONS
- Chapter Header
- Top 20 Core Facts Bullet Points
- Must-Know Formulas/Definitions
- 5 Most Common PYQs
- Last-Minute Exam Pointers
- Common Mistakes to Avoid

### REQUIRED FIELDS
- Chapter ID
- Curriculum Board
- Class Level
- 20 bullet points of only non-negotiable core facts
- All high-frequency formulas/definitions
- Top 5 most repeated PYQs from the chapter
- 10 last-minute exam pointers
- 5 most common mistakes to avoid

### OPTIONAL FIELDS
- Print-friendly PDF version
- Infographic summary link
- Mnemonic aids for key lists
- Mobile-optimized version link

### RECOMMENDED LENGTH
Max 500 words total; strictly condensed for 15-minute revision.

### DIFFICULTY
High-yield only: Focuses on the most frequently tested concepts in board exams.

### EXPECTED LEARNING OUTCOME
Students can recap all critical chapter content in under 15 minutes, recall key formulas/facts during exams, and avoid common costly mistakes.

---

## 12. MOCK TEST TEMPLATE

### PURPOSE
To provide a full-length, board-exact pattern practice test that simulates exam conditions, assesses overall chapter mastery, and provides detailed performance feedback.

### SECTIONS
- Test Instructions (exact as board exam)
- Section-wise Questions (aligned to board paper pattern)
- Marking Scheme (exact board rules including negative marking if applicable)
- Time Limit (exact as board exam for the chapter/unit)
- Answer Key
- Detailed Solution Explanations
- Performance Analysis Dashboard Framework
- Improvement Recommendations

### REQUIRED FIELDS
- Mock Test ID
- Curriculum Board
- Class Level
- Exact question paper pattern matching current board format
- Total marks matching board section weightage
- Time limit aligned to board exam duration for the test
- Complete answer key with explanations
- Question-wise difficulty tags
- Syllabus coverage confirmation (100% of chapter topics)
- Performance metrics framework (accuracy, speed, concept gaps)

### OPTIONAL FIELDS
- Online test attempt link (CBT simulation)
- Benchmark data (average student score)
- Customizable difficulty variant
- Printable question paper PDF
- Answer sheet template (exact board answer sheet format)

### RECOMMENDED LENGTH
Exact as board exam: For a full chapter test, matches the number of questions and time allotted in the official board blueprint.

### DIFFICULTY
Exact replica of board exam: Mix of easy, medium, and hard questions in the same proportion as past board papers.

### EXPECTED LEARNING OUTCOME
Students can take the mock test under exam conditions to assess their preparation level, identify concept gaps, and improve performance on weak areas before the actual board exam.

---

## 13. AI TUTOR EXPLANATION TEMPLATE

### PURPOSE
To provide personalized, conversational explanations that adapt to student's learning pace, clarify doubts, and break down complex concepts into simple, digestible language.

### SECTIONS
- Student Doubt Context
- Simplified Explanation (avoiding jargon)
- Analogy to Relatable Scenario
- Step-by-Step Clarification
- Follow-up Check for Understanding
- Additional Resource Links
- Common Follow-up Doubts Pre-empted

### REQUIRED FIELDS
- Linked Concept ID
- Curriculum Board
- Class Level
- Original student doubt transcription
- Jargon-free simplified explanation
- Relatable real-world analogy
- 2-3 check-in questions to assess understanding
- Link to full theory content for the concept
- Pre-empted common follow-up doubts list

### OPTIONAL FIELDS
- Multilingual explanation support
- Interactive simulation link
- Personalized practice question recommendation
- Student's past performance context integration
- Video explanation clip link

### RECOMMENDED LENGTH
200-600 words, conversational tone.

### DIFFICULTY
Adaptive: Adjusts to student's self-reported difficulty level with the concept (1-5 scale).

### EXPECTED LEARNING OUTCOME
Students can resolve their specific doubt, understand the concept through relatable analogy, and answer the check-in questions to confirm their understanding before moving forward.

---

## 14. COMMON MISTAKES TEMPLATE

### PURPOSE
To highlight and correct the most frequent errors students make in the chapter, preventing costly mistakes in board exams and reinforcing conceptual clarity.

### SECTIONS
- Mistake ID & Heading
- Incorrect Approach/Answer
- Why the Mistake Occurs (root cause)
- Correct Approach/Answer
- Conceptual Clarification to Avoid Repeat
- Example of the Mistake in a PYQ
- Practice Question to Test Understanding

### REQUIRED FIELDS
- Linked Chapter/Topic ID
- Curriculum Board
- Class Level
- Description of the common mistake
- Root cause analysis (why students make this error)
- Step-by-step correction of the mistake
- Conceptual clarification to prevent recurrence
- Example of the mistake from a past PYQ
- One practice question to test mastery
- Frequency tag (how often this mistake appears in student answers)

### OPTIONAL FIELDS
- Student error data (percentage of students who make this mistake)
- Visual aid to highlight the error point
- Mnemonic to avoid the mistake
- Link to similar common mistakes in related topics

### RECOMMENDED LENGTH
150-300 words per mistake entry.

### DIFFICULTY
Targeted to the most persistent errors students face with the chapter's concepts.

### EXPECTED LEARNING OUTCOME
Students can recognize the common mistake in their own work, avoid it in exams, and apply the correct conceptual approach to solve related problems accurately.

---

## 15. EXAM TIPS TEMPLATE

### PURPOSE
To provide strategic, chapter-specific and general board exam preparation tips that help students maximize their scores, manage time effectively, and avoid common exam-day mistakes.

### SECTIONS
- Chapter-Specific Preparation Tips
- Question-Solving Strategy (by question type)
- Time Management Plan for the Chapter's Questions
- Last-Minute Preparation Pointers
- Exam-Day Do's and Don'ts
- Score Maximization Hacks (as per board marking scheme)

### REQUIRED FIELDS
- Curriculum Board
- Class Level
- Chapter-specific preparation roadmap
- Question-type wise solving strategy (MCQs, subjective, programming)
- Time allocation guide for the chapter's questions in the board exam
- 10 last-minute preparation tips
- 5 exam-day do's and 5 don'ts
- Marking scheme aligned score maximization tips (step marking, keyword focus)

### OPTIONAL FIELDSS
- Personalized study plan generator link
- Stress management tips for exam season
- Answer writing tips for subjective papers (presentation hacks)
- PYQ solving strategy
- Revision schedule template link

### RECOMMENDED LENGTH
300-800 words total, actionable and specific.

### DIFFICULTY
Universal: Applicable to all students preparing for the board exam, regardless of their current proficiency level.

### EXPECTED LEARNING OUTCOME
Students can apply the exam tips to structure their preparation, manage time during exams, and maximize their scores by adhering to board marking scheme requirements and avoiding common exam-day errors.

---

---

## Template Implementation Guidelines

### For Content Creators

1. **Always include frontmatter** — Metadata is mandatory for filtering and organization
2. **Use board field** — Explicitly state which boards the content applies to
3. **Maintain consistent formatting** — Follow markdown standards defined in this document
4. **Validate completeness** — All required fields must be populated
5. **Keep optional fields minimal** — Only include optional fields if they add value

### For AI Generators

1. **Parse template_id** — Generate unique identifiers following pattern: `<board>_<subject>_<chapter>_<type>_<seq>`
2. **Validate metadata** — Check all required frontmatter fields before generation
3. **Respect difficulty** — Align content complexity with assigned difficulty level
4. **Board alignment** — Use board-specific terminology and patterns
5. **Learning outcome focus** — Ensure generated content achieves stated outcomes

### For Developers

1. **Build reusable components** — Create React components that render any template type
2. **Use metadata for filtering** — Enable filtering by board, difficulty, subject, chapter
3. **Support progressive disclosure** — Show summaries by default, expand for details
4. **Enable bookmarking** — Allow students to save templates for later review
5. **Track engagement** — Log time spent and completion rates per template

---

## Quality Checklist

Before any template is marked as `approved`, verify:

- [ ] All required fields are populated
- [ ] Metadata frontmatter is complete and valid
- [ ] Content aligns with stated learning outcomes
- [ ] Board-specific variations are correctly marked
- [ ] Difficulty level matches actual content complexity
- [ ] Language is age-appropriate for target class
- [ ] No factual errors in definitions, formulas, or explanations
- [ ] Code examples are syntactically correct and executable
- [ ] Markdown formatting is consistent
- [ ] Links and cross-references are valid

---

## Template Usage Analytics

Track the following metrics for each template instance:

| Metric | Description |
|--------|-------------|
| `views` | Number of times viewed |
| `completion_rate` | Percentage of users who read to end |
| `time_spent` | Average reading time |
| `bookmark_count` | Times saved by students |
| `feedback_score` | Student rating (1-5) |
| `effectiveness` | Improvement in related test scores |

---

## Version Control

- **Current Version**: 1.0.0
- **Change Log**: Maintained in CHANGELOG.md
- **Review Cycle**: Quarterly
- **Approval Authority**: Chief Academic Content Strategist

---

## Support

For questions about template usage or proposed changes:
- **Email**: academic@target95.vercel.app
- **GitHub Issues**: Tag with `content-template`
- **Slack**: #academic-content channel

---

**Document End**

*This is a living document. All content creators, AI systems, and reviewers must adhere to these templates to maintain consistency and quality across Target95+.*