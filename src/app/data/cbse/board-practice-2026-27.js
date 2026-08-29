/**
 * CBSE 2026-27 competency-focused supplemental practice.
 * Kept as structured data so it can be consumed by the CBSE data layer.
 */

const CBSE_BOARD_PRACTICE_2026_27 = [
  {
    id: "cbse-083-xi-trace-001",
    subjectCode: "083",
    classNumber: 11,
    type: "output-tracing",
    difficulty: "Hard",
    marks: 2,
    chapter: "Python",
    question: "Predict the output: x = [2, 4, 6, 8]; print(x[1:4:2], sum(x[:3]))",
    answer: "[4, 8] 12",
    explanation: "The slice starts at index 1 and takes every second element through index 3: [4, 8]. The first three elements are 2, 4 and 6, whose sum is 12."
  },
  {
    id: "cbse-083-xii-debug-001",
    subjectCode: "083",
    classNumber: 12,
    type: "debugging",
    difficulty: "Hard",
    marks: 3,
    chapter: "SQL",
    question: "A query is intended to display departments whose average salary exceeds 50000: SELECT dept, AVG(salary) FROM Employee WHERE AVG(salary) > 50000 GROUP BY dept; Identify and correct the error.",
    answer: "Use HAVING instead of WHERE for the aggregate condition: SELECT dept, AVG(salary) FROM Employee GROUP BY dept HAVING AVG(salary) > 50000;",
    explanation: "WHERE filters rows before grouping; HAVING filters groups after aggregate functions such as AVG() have been calculated."
  },
  {
    id: "cbse-065-xi-case-001",
    subjectCode: "065",
    classNumber: 11,
    type: "case-based",
    difficulty: "Medium",
    marks: 4,
    chapter: "Pandas",
    question: "A school stores marks in a DataFrame with columns Name, English and Computer. Write the Pandas statement to select students scoring at least 80 in Computer and then display Name and Computer only.",
    answer: "df.loc[df['Computer'] >= 80, ['Name', 'Computer']]",
    explanation: "Boolean indexing first filters the rows; the second argument to loc selects only the requested columns."
  },
  {
    id: "cbse-065-xii-programming-001",
    subjectCode: "065",
    classNumber: 12,
    type: "programming",
    difficulty: "Hard",
    marks: 5,
    chapter: "SQL",
    question: "Write an SQL query to show each city and the number of customers in that city, but display only cities having at least 10 customers, sorted from highest count to lowest.",
    answer: "SELECT City, COUNT(*) AS CustomerCount FROM Customer GROUP BY City HAVING COUNT(*) >= 10 ORDER BY CustomerCount DESC;",
    explanation: "GROUP BY forms one group per city, HAVING applies the minimum-count condition, and ORDER BY sorts the resulting aggregate rows."
  },
  {
    id: "cbse-402-x-class10-mcq-001",
    subjectCode: "402",
    classNumber: 10,
    type: "mcq",
    difficulty: "Medium",
    marks: 1,
    chapter: "Database Concepts",
    question: "Which feature prevents two records in a table from having the same value in a primary-key field?",
    options: ["Uniqueness constraint", "Sort order", "Filter", "Formatting"],
    answer: "Uniqueness constraint",
    explanation: "A primary key uniquely identifies each record, so duplicate key values are not permitted."
  },
  {
    id: "cbse-402-x-case-001",
    subjectCode: "402",
    classNumber: 10,
    type: "case-based",
    difficulty: "Hard",
    marks: 4,
    chapter: "Spreadsheets",
    question: "A teacher has monthly marks in B2:E2 and wants the highest mark in F2, then wants to identify whether the student met a target of 90. Write the formulas for F2 and G2.",
    answer: "F2 = MAX(B2:E2); G2 = IF(F2>=90, \"Target Met\", \"Target Not Met\")",
    explanation: "MAX returns the largest monthly value; IF converts that result into a clear target-status decision."
  }
];

export default CBSE_BOARD_PRACTICE_2026_27;
export { CBSE_BOARD_PRACTICE_2026_27 };
