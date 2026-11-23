# ICSE Class X and ISC Class XII Java Content — 2028 Alignment

## Source of truth

This implementation is aligned to the official CISCE Examination Year 2028 syllabi:

- [ICSE Computer Applications (86), Examination Year 2028](https://cisce.org/wp-content/uploads/2026/01/18.-Computer-Applications.pdf)
- [ISC Computer Science (868), Examination Year 2028](https://cisce.org/wp-content/uploads/2026/01/25.-Computer-Science.pdf)

Do not use older syllabus-year gap reports to override these documents.

## ICSE Class X

### Theory scope
Eight topic IDs remain canonical in `icseClassXContent.js`. The Class X lesson index and dynamic lesson route render this content independently of the mixed `/Java` chapter catalogue.

The Arrays theory scope covers single-dimensional arrays, including searching and sorting. String Handling also includes String arrays:
- alphabetical sorting with Bubble Sort and Selection Sort;
- linear search for a String in an array.

The numeric 2D matrix programs were removed from the recommended Class X program list. The 20-program list remains an expanded practice recommendation; the official minimum is 15 laboratory assignments.

String replacement practicals use `replace(char, char)`, matching the prescribed Class X method.

### Student routes
- `/icse/class-x/lessons` — topic index
- `/icse/class-x/lessons/[topic]` — lesson content
- `/icse/class-x/programs` — recommended 20 Java programs

## ISC Class XII

### Java theory scope
The four Section B Java topics are:
1. Methods — object as parameter and return data type
2. Arrays (single and double dimensional), String Handling
3. Recursion
4. Inheritance and Interfaces

The enriched lessons cover:
- passing and returning objects and arrays;
- row-major and column-major address calculations;
- Bubble, Selection and Insertion Sort;
- String operations and mutable `StringBuffer`;
- solving systems of linear equations;
- factorial, GCD, binary search, number-base conversion and Tower of Hanoi;
- inheritance, abstract classes, `java.lang.Object`, protected visibility, overriding and dynamic binding.

**Interfaces are conceptual only** in the 2028 Class XII syllabus. The lesson explains the construct but does not require students to write interface-implementation programs.

### Practical assignment distribution
CISCE specifies a minimum of 25 Class XII assignments: 20 Java and 5 Python. The Java portion is distributed as follows:

| Java assignment area | Required programs |
|---|---:|
| Methods — objects as parameters and return data types | 5 |
| Single-dimensional arrays | 3 |
| Double-dimensional arrays | 5 |
| String handling | 4 |
| Inheritance | 3 |
| **Total Java** | **20** |

The Python assignment minimum is 5 (one Strings, two Lists, two Tuples). The terminal practical paper presents three Java programming problems; the candidate attempts one.

The 20 Java assignments live in `src/app/data/iscXIIJavaPracticalAssignments.js` and are rendered on the relevant lesson pages with an algorithm outline, Java source, sample input and expected output.

## Validation added

`test/java-content-2028.test.mjs` checks:
- all eight ICSE Class X topic records;
- 20 unique ICSE Class X recommended programs and the String-array / character-replacement scope;
- exactly 20 ISC Class XII Java assignments with the official 5/3/5/4/3 split;
- required ISC XII Java concepts and conceptual-only interface scope.

The focused test is included in the repository's `npm test` script.
