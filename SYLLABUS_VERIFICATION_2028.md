# Target95+ — Official Syllabus Verification (CISCE Examination Year 2028)

**Verification date:** 21 August 2026  
**Sources:** Official CISCE 2028 syllabus PDFs for ICSE Computer Applications (86) and ISC Computer Science (868).

## Important correction

The existing `ISC_CONTENT_GAP_REPORT.md` is useful as a historical audit, but it is **not a reliable source of truth for the 2028 syllabus**. In particular, it treats Boolean Algebra, Stack, Queue, Trees and some other items as standalone ISC requirements. The official 2028 ISC Computer Science document instead defines **13 units across three sections**: Hardware (3), Java (8), and Python/Conceptual aspects (2).

Target95 must therefore be verified against the official 2028 CISCE syllabus before adding or deleting content.

## ICSE Class IX — Computer Applications

Official theory topics:

1. Introduction to Object Oriented Programming Concepts
2. Elementary Concept of Objects and Classes
3. Identifiers and Literals
4. Operators in Java
5. Basic Structure of a Class in Java
6. Data Processing in Java
7. Mathematical Library Methods
8. Conditional Statements in Java
9. Looping / Iterative Statements in Java
10. Nested for Loops
11. Ethical Computing

Internal assessment requirements:
- Minimum **15 laboratory assignments** during the year.
- Written project on Ethical Computing.
- Practical work is assessed through class design, variable description, coding/documentation, and execution/output.

## ICSE Class X — Computer Applications

Official theory topics:

1. Revision of Class IX syllabus
2. Library Classes
3. Arrays
4. String Handling
5. Class as the Basis of all Computation
6. Constructors
7. Custom Methods
8. Disruptive Technologies

Internal assessment requirements:
- Minimum **15 laboratory assignments** during the year.
- Written project on Disruptive Technologies.
- Practical coverage includes methods, constructors, library classes, arrays, sorting/searching, and string handling.

## ISC Class XI — Computer Science

### Section A — Hardware (25 marks)

1. System of Numeration
   - Binary, octal, decimal, hexadecimal
   - Base conversion
   - Addition, subtraction and multiplication in different bases
   - 1's and 2's complement for addition/subtraction

2. Encodings
   - ASCII
   - ISCII
   - Unicode

3. Propositional Logic, Hardware Implementation, Arithmetic Operations
   - Propositional variables and well-formed formulae
   - Truth values and truth tables
   - Logical connectives
   - Satisfiable, unsatisfiable and valid formulae
   - AND, OR, NOT, NAND, NOR, XOR, XNOR
   - Half adder and full adder

### Section B — Java (30 marks)

4. Introduction to Object Oriented Programming using Java
5. Objects
6. Primitive Values, Wrapper Classes, Types and Casting
7. Variables, Expressions
8. Statements, Scope
9. Methods and Constructors
10. Arrays, Strings
11. Basic Input/Output and Text File Handling

### Section C — Python and Conceptual Aspects (15 marks)

12. Introduction to Python
   - Installation/IDE
   - Fundamentals and execution modes
   - Character set, tokens, variables, comments
   - Data types
   - Input/output and errors
   - Operators and expressions
   - Type conversion
   - Conditional and iterative flow
   - Nested loops

13. Trends in Computing and Ethical Issues
   - AI
   - IoT
   - VR/AR
   - Cybersecurity, privacy, netiquette, spam, phishing, digital arrest
   - Intellectual property, copyright, patents, trademarks
   - Free Software Foundation, open source and licensing

Practical requirement:
- Minimum **20 assignments** for the year: **15 Java + 5 Python**.
- One project based on Trends in Computing and Ethical Issues.
- Practical paper contains Java programming problems with a planning session and examination session.

## ISC Class XII — Computer Science

**Action:** verify the Class XII section directly from the official CISCE 2028 document before implementation. Do not reuse the older 19-chapter/Boolean-Algebra assumptions in `ISC_CONTENT_GAP_REPORT.md` as the source of truth.

## Repository verification status

### ICSE IX/X
- The repository already has an explicit ICSE syllabus registry in `src/lib/icseSyllabus.js`.
- The registry broadly matches the official 11-topic Class IX / 8-topic Class X structure.
- It still needs a **topic-by-topic content audit**, especially exact subtopics, exclusions, practical assignment coverage and project requirements.
- Example correction to watch: ICSE X official syllabus specifies sorting/searching techniques on **single-dimensional arrays only**; content must not silently broaden this to 2-D sorting/searching.

### ISC XI/XII
- The repository's older ISC gap report is incomplete/outdated for the 2028 syllabus.
- ISC XI currently lacks a clean authoritative registry covering Hardware + Java + Python + conceptual topics.
- This is now the first major content-completion track.

## Implementation order

1. Build an authoritative ISC XI/XII syllabus registry from the official 2028 syllabus.
2. Audit every existing chapter/content file against that registry.
3. Mark each topic as `complete`, `partial`, `missing`, or `out-of-scope`.
4. Complete missing **ISC XI Hardware + Python** content first because these are absent from the current Java-centric implementation.
5. Complete missing Java/File Handling content.
6. Perform the same exact content-depth audit for ICSE IX/X.
7. Only after the syllabus map is verified, create/expand question banks, PYQs, practical assignments and mock tests.

## Source references

- Official CISCE ICSE 2028 Computer Applications (86): `https://cisce.org/wp-content/uploads/2026/01/18.-Computer-Applications.pdf`
- Official CISCE ISC 2028 Computer Science (868): `https://cisce.org/wp-content/uploads/2026/01/25.-Computer-Science.pdf`
