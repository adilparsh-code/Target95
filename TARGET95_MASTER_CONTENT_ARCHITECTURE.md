# TARGET95_MASTER_CONTENT_ARCHITECTURE.md
## Permanent Academic Database Specification for All Platform Content
**Chief Academic Information Architect**  
**Date: August 8, 2026**  
*Master content architecture for CISCE (ICSE/ISC) and CBSE boards - applies to every chapter created for Target95*

---

## EXECUTIVE SUMMARY
This document establishes the permanent database schema and information architecture for all Target95 academic content. It standardizes chapter structure, metadata, search filters, and naming conventions to ensure consistency across all boards, classes, and subjects, while enabling all required platform features (progress tracking, AI tutor integration, personalized learning, and exam preparation).

---

## 1. CORE CHAPTER DATABASE SCHEMA
### Standardized Structure for Every Chapter
| Section | Purpose | Required/Optional | Data Type | Recommended Size | Dependencies |
|---------|---------|-------------------|-----------|------------------|--------------|
| **Board** | Defines the education board the chapter aligns with (CISCE/CBSE) | Required | String (enum) | Max 20 characters | None |
| **Class** | Grade level (10 for ICSE, 11/12 for ISC/CBSE) | Required | Integer | 2 digits | Board |
| **Subject** | Specific subject (Computer Science, Physics, etc.) | Required | String | Max 50 characters | Board, Class |
| **Chapter** | Unique chapter identifier with title and slug | Required | Object | N/A (contains chapterTitle, chapterSlug, chapterId) | Board, Class, Subject |
| **Learning Objectives** | Lists measurable student outcomes after completing the chapter | Required | Array of strings | 5-8 objectives per chapter | Introduction |
| **Prerequisites** | Identifies prior chapters/concepts needed to understand the current chapter | Required | Array of objects | 3-5 prerequisites (each with chapterId, chapterTitle) | Learning Objectives |
| **Introduction** | Opens the chapter with a brief overview of why the topic matters | Required | String | 150-300 words | Prerequisites |
| **Theory** | Core academic content explaining the chapter's concepts | Required | Array of objects | 2000-5000 words (broken into subsections) | Introduction |
| **Definitions** | Formal academic definitions of all core chapter terms | Required | Array of objects | 15-30 definitions per chapter | Theory |
| **Key Terms** | Alphabetized glossary of all critical terminology | Required | Array of strings | 20-40 terms per chapter | Definitions |
| **Examples** | Worked examples demonstrating concept application | Required | Array of objects | 8-15 examples per chapter | Key Terms |
| **Diagrams** | Visual learning assets mapped to relevant theory sections | Required | Array of objects | 5-15 diagrams per chapter (vector format) | Examples |
| **Important Notes** | Highlighted critical points that appear frequently in board exams | Required | Array of strings | 5-10 notes per chapter | Diagrams |
| **Common Mistakes** | Addresses pervasive student errors I've observed in 20+ years of teaching | Required | Array of objects | 10-15 mistakes per chapter with explanations | Important Notes |
| **Programming** | Code examples, structure, and syntax content (for CS chapters only) | Conditional (required for CS, optional otherwise) | Array of objects | 10-20 code snippets per chapter | Common Mistakes |
| **Practice Questions** | Formative assessment questions to test basic understanding | Required | Array of question objects (see metadata schema) | 25-35 practice questions per chapter | Programming |
| **MCQs** | Objective multiple-choice questions aligned with Section A of board exams | Required | Array of question objects | 30 MCQs per chapter | Practice Questions |
| **Output Questions** | Code tracing questions that ask students to predict program output | Conditional (CS only) | Array of question objects | 5-8 output questions per chapter | MCQs |
| **Debugging Questions** | Error analysis questions that ask students to fix broken code | Conditional (CS only) | Array of question objects | 2-4 debugging questions per chapter | Output Questions |
| **Previous Year Questions** | Past board exam questions mapped to the chapter's topics | Required | Array of question objects | 15-20 PYQs per chapter (2018-2025) | Debugging Questions |
| **Mock Tests** | Links to full-length mock assessments that include chapter topics | Required | Array of objects | 3-5 mock test IDs per chapter | PYQs |
| **AI Tutor Topics** | Common doubts, misconceptions, and explanation strategies for the AI | Required | Array of objects | 10-15 AI tutor topics per chapter | Mock Tests |
| **Revision Notes** | Comprehensive review content for the entire chapter | Required | String | 500-1000 words | AI Tutor Topics |
| **Quick Revision Sheet** | One-page printable summary of all key chapter concepts | Required | Object (PDF link + key points) | 1-page PDF; 20-30 bullet points | Revision Notes |
| **Difficulty** | Overall chapter difficulty level | Required | String (enum: easy/medium/hard) | Max 10 characters | Quick Revision Sheet |
| **Estimated Study Time** | Total time required to complete the chapter (including all assessments) | Required | Integer (minutes) | 180-480 minutes (3-8 hours) | Difficulty |
| **Exam Weightage** | Percentage of board exam marks allocated to this chapter's topics | Required | Float | 5-20% | Estimated Study Time |

---

## 2. QUESTION METADATA SCHEMA
### Standardized Metadata for Every Question Created
| Field | Purpose | Required/Optional | Data Type | Recommended Size | Dependencies |
|-------|---------|-------------------|-----------|------------------|--------------|
| **Board** | Board alignment for the question (CISCE/CBSE) | Required | String (enum) | Max 20 characters | None |
| **Class** | Grade level the question is intended for | Required | Integer | 2 digits | Board |
| **Subject** | Subject the question belongs to | Required | String | Max 50 characters | Board, Class |
| **Chapter** | Chapter ID and title the question is mapped to | Required | Object | chapterId, chapterTitle | Subject |
| **Topic** | Core chapter topic the question assesses | Required | String | Max 100 characters | Chapter |
| **Subtopic** | Specific sub-topic the question focuses on | Required | String | Max 150 characters | Topic |
| **Difficulty** | Question difficulty level | Required | String (enum: easy/medium/hard) | Max 10 characters | Subtopic |
| **Bloom Level** | Bloom's taxonomy classification (L1-L6) | Required | String (enum: remember/understand/apply/analyze/evaluate/create) | Max 20 characters | Difficulty |
| **Marks** | Number of board exam marks the question is worth | Required | Integer | 1-10 marks | Bloom Level |
| **Question Type** | Classification of the question format | Required | String (enum: mcq/assertionReason/trueFalse/fillBlanks/output/debugging/programming/theory/pyq/caseStudy) | Max 30 characters | Marks |
| **Year** | Year the PYQ appeared in board exams (null for non-PYQ questions) | Conditional (required for PYQs, optional otherwise) | Integer | 4 digits (2018-2025) | Question Type |
| **Source** | Origin of the question (board exam/practice/mock/created) | Required | String | Max 50 characters | Year |
| **Explanation Available** | Indicates if a detailed answer explanation exists | Required | Boolean | True/False | Source |
| **Diagram Required** | Specifies if the question requires a diagram to answer | Required | Boolean | True/False | Explanation Available |

---

## 3. STUDENT SEARCH FILTER ARCHITECTURE
### All Filters Available to Students for Content Discovery
| Filter | Purpose | Filter Type | Supported Values | Dependencies |
|--------|---------|-------------|------------------|--------------|
| **Board** | Filter content by education board | Single select | CISCE, CBSE | None |
| **Class** | Filter content by grade level | Single select | 10, 11, 12 | Board |
| **Chapter** | Filter questions/content by specific chapter | Multi-select | All chapter IDs for selected board/class | Class |
| **Difficulty** | Filter content by difficulty level | Multi-select | Easy, Medium, Hard | Chapter |
| **Topic** | Filter content by core chapter topic | Multi-select | All topics for selected chapters | Chapter |
| **PYQ Year** | Filter previous year questions by exam year | Range select | 2018-2025 | Topic |
| **Marks** | Filter questions by allocated marks | Range select | 1-10 marks | PYQ Year |
| **Question Type** | Filter content by question format | Multi-select | MCQ, Assertion-Reason, True/False, Fill Blanks, Output, Debugging, Programming, Theory, PYQ | Marks |
| **Content Category** | Filter high-level content type | Single select | Programming, Theory, Revision | Question Type |

### Filter Logic Implementation
All filters are cumulative (AND logic) - students can combine multiple filters to find exactly the content they need. The platform will automatically disable filter options that have no matching content for the current filter set.

---

## 4. NAMING CONVENTIONS STANDARD
### Permanent Rules for All Content Files and Assets
#### CHAPTER NAMING CONVENTION
Format: `[board-code]-[class]-[subject-code]-[chapter-id]-[chapter-slug].js`
- Board codes: `cisce-icse`, `cisce-isc`, `cbse`
- Subject codes: `cs` (Computer Science), `phy` (Physics), `che` (Chemistry), `math` (Mathematics), `eng` (English)
- Chapter IDs: 2-digit zero-padded sequence number (01, 02, ... 19)
- Example: `cisce-icse-cs-01-introduction-to-java.js`

#### TOPIC NAMING CONVENTION
Format: `[chapter-slug]-[topic-id]-[topic-slug]`
- Topic IDs: 2-digit sequence number
- Example: `introduction-to-java-01-jvm-architecture`

#### SUBTOPIC NAMING CONVENTION
Format: `[topic-slug]-[subtopic-id]-[subtopic-slug]`
- Subtopic IDs: 2-digit sequence number
- Example: `jvm-architecture-01-bytecode-execution`

#### QUESTION NAMING CONVENTION
Format: `[board-code]-[class]-[subject-code]-[chapter-id]-[question-type]-[question-id]`
- Question IDs: 3-digit zero-padded sequence number
- Example: `cisce-icse-cs-01-mcq-001`
- PYQ question format: `[board-code]-[class]-[subject-code]-[chapter-id]-pyq-[year]-[sequence-id]`
- Example: `cisce-icse-cs-01-pyq-2025-001`

#### IMAGE & DIAGRAM NAMING CONVENTION
Format: `[chapter-slug]-diagram-[diagram-id]-[diagram-slug].[format]`
- Diagram IDs: 2-digit sequence number
- Format: Always vector `.svg` for scalability
- Example: `introduction-to-java-diagram-01-jvm-stack.svg`

#### FILE ORGANIZATION STANDARD
```
src/
└── app/
    └── data/
        ├── [board]/
        │   ├── [class]/
        │   │   ├── [subject]/
        │   │   │   ├── chapter-content/
        │   │   │   ├── question-bank/
        │   │   │   ├── diagrams/
        │   │   │   └── revision-sheets/
```
- All content is stored in board/class/subject directory structure to avoid file conflicts
- All assets for a chapter are stored in the same subject directory for easy access
- Revision sheets and diagrams are stored separately from core chapter content for caching optimization

---

## 5. DATABASE RELATIONSHIP MAPPING
### Core Entity Relationships
1. **Board → Class → Subject → Chapter**: One-to-many relationship (one board has many classes, one class has many subjects, one subject has many chapters)
2. **Chapter → Questions**: One-to-many relationship (one chapter has many questions of all types)
3. **Chapter → Diagrams**: One-to-many relationship (one chapter has many diagrams)
4. **Chapter → Mock Tests**: Many-to-many relationship (one chapter appears in many mock tests, one mock test has many chapters)
5. **Question → AI Tutor**: One-to-one relationship (every question has an associated AI tutor explanation strategy)

### Foreign Key Requirements
All database records must include the parent entity's unique ID to maintain referential integrity:
- Every chapter includes boardId, classId, subjectId
- Every question includes chapterId, topicId, subtopicId
- Every diagram includes chapterId and theorySectionId
- Every mock test includes an array of chapterIds and questionIds

---

## 6. IMPLEMENTATION REQUIREMENTS
### Mandatory Technical Constraints
1. All chapter files must follow the naming convention exactly to avoid CMS import errors
2. All metadata fields must be populated for every question to enable search filter functionality
3. All diagrams must be vector SVG format with descriptive alt text for accessibility
4. All content must adhere to the schema to maintain consistency across the platform
5. All foreign keys must be valid to ensure database referential integrity

### CMS Integration Requirements
The Target95 content management system must:
- Auto-generate all unique IDs (chapterId, questionId, diagramId) to eliminate manual errors
- Enforce the schema to prevent missing required fields during content creation
- Validate all naming conventions before allowing content to be published
- Automatically update all related records if a parent entity is modified
- Generate search indexes for all filterable fields to ensure fast query performance