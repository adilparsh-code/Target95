/**
 * CBSE 2026-27 competency-focused supplemental practice.
 * Kept as structured data so it can be consumed by the CBSE data layer.
 */

const CBSE_BOARD_PRACTICE_2026_27 = [
  {
    id: "cbse-083-xi-trace-001", subjectCode: "083", classNumber: 11, type: "output-tracing", difficulty: "Hard", marks: 2, chapter: "Python",
    question: "Predict the output: x = [2, 4, 6, 8]; print(x[1:4:2], sum(x[:3]))",
    answer: "[4, 8] 12",
    explanation: "The slice starts at index 1 and takes every second element through index 3: [4, 8]. The first three elements sum to 12."
  },
  {
    id: "cbse-083-xii-debug-001", subjectCode: "083", classNumber: 12, type: "debugging", difficulty: "Hard", marks: 3, chapter: "SQL",
    question: "A query is intended to display departments whose average salary exceeds 50000: SELECT dept, AVG(salary) FROM Employee WHERE AVG(salary) > 50000 GROUP BY dept; Identify and correct the error.",
    answer: "SELECT dept, AVG(salary) FROM Employee GROUP BY dept HAVING AVG(salary) > 50000;",
    explanation: "WHERE filters rows before grouping; HAVING filters groups after aggregate functions are calculated."
  },
  {
    id: "cbse-065-xi-case-001", subjectCode: "065", classNumber: 11, type: "case-based", difficulty: "Medium", marks: 4, chapter: "Pandas",
    question: "A school stores marks in a DataFrame with columns Name, English and Computer. Write the Pandas statement to select students scoring at least 80 in Computer and then display Name and Computer only.",
    answer: "df.loc[df['Computer'] >= 80, ['Name', 'Computer']]",
    explanation: "Boolean indexing filters rows and loc selects the requested columns."
  },
  {
    id: "cbse-065-xii-programming-001", subjectCode: "065", classNumber: 12, type: "programming", difficulty: "Hard", marks: 5, chapter: "SQL",
    question: "Write an SQL query to show each city and the number of customers in that city, but display only cities having at least 10 customers, sorted from highest count to lowest.",
    answer: "SELECT City, COUNT(*) AS CustomerCount FROM Customer GROUP BY City HAVING COUNT(*) >= 10 ORDER BY CustomerCount DESC;",
    explanation: "GROUP BY creates city groups, HAVING applies the minimum count, and ORDER BY sorts the aggregate result."
  },
  {
    id: "cbse-402-x-class10-mcq-001", subjectCode: "402", classNumber: 10, type: "mcq", difficulty: "Medium", marks: 1, chapter: "Database Concepts",
    question: "Which feature prevents two records in a table from having the same value in a primary-key field?",
    options: ["Uniqueness constraint", "Sort order", "Filter", "Formatting"], answer: "Uniqueness constraint",
    explanation: "A primary key uniquely identifies each record, so duplicate key values are not permitted."
  },
  {
    id: "cbse-402-x-case-001", subjectCode: "402", classNumber: 10, type: "case-based", difficulty: "Hard", marks: 4, chapter: "Spreadsheets",
    question: "A teacher has monthly marks in B2:E2 and wants the highest mark in F2, then wants to identify whether the student met a target of 90. Write the formulas for F2 and G2.",
    answer: "F2 = MAX(B2:E2); G2 = IF(F2>=90, \"Target Met\", \"Target Not Met\")",
    explanation: "MAX returns the largest monthly value; IF converts that result into a target-status decision."
  },
  {
    id: "cbse-083-xi-debug-002", subjectCode: "083", classNumber: 11, type: "debugging", difficulty: "Medium", marks: 3, chapter: "Python",
    question: "A student writes total = 0; for n in range(1, 6): total =+ n. The intended result is 15. Identify the operator error and give the corrected statement.",
    answer: "Use total += n. The expression =+ n assigns positive n to total instead of adding n to the existing total.",
    explanation: "=+ is assignment of a positive value; += performs accumulation."
  },
  {
    id: "cbse-083-xii-case-002", subjectCode: "083", classNumber: 12, type: "case-based", difficulty: "Hard", marks: 4, chapter: "SQL",
    question: "A school database has Student(RollNo, Name, Class, Marks). Write a query to display Class and the average Marks for each class, keeping only classes whose average is at least 75 and sorting by average descending.",
    answer: "SELECT Class, AVG(Marks) AS AvgMarks FROM Student GROUP BY Class HAVING AVG(Marks) >= 75 ORDER BY AvgMarks DESC;",
    explanation: "The grouping is by Class, HAVING filters aggregate groups, and ORDER BY ranks the retained class averages."
  },
  {
    id: "cbse-065-xi-trace-002", subjectCode: "065", classNumber: 11, type: "output-tracing", difficulty: "Hard", marks: 3, chapter: "Pandas",
    question: "Predict the result of: import pandas as pd; s = pd.Series([10, 20, 30], index=['A','B','C']); print(s['B'] + s.iloc[0])",
    answer: "30",
    explanation: "s['B'] is 20 by label and s.iloc[0] is 10 by positional index, giving 30."
  },
  {
    id: "cbse-065-xii-debug-002", subjectCode: "065", classNumber: 12, type: "debugging", difficulty: "Hard", marks: 3, chapter: "Pandas",
    question: "A student wants the rows where Marks > 80 but writes df[df['Marks'] > 80 and df['Attendance'] >= 75]. Correct the expression.",
    answer: "Use element-wise &: df[(df['Marks'] > 80) & (df['Attendance'] >= 75)]",
    explanation: "Pandas Series conditions require element-wise logical operators, with each comparison enclosed in parentheses."
  },
  {
    id: "cbse-402-x-programming-002", subjectCode: "402", classNumber: 10, type: "programming", difficulty: "Hard", marks: 5, chapter: "Spreadsheets",
    question: "A worksheet stores five subject marks in B2:F2. Write formulas to calculate the total in G2, percentage in H2 assuming each subject is out of 100, and result in I2 as \"PASS\" only when every subject is at least 33.",
    answer: "G2 = SUM(B2:F2); H2 = G2/5; I2 = IF(MIN(B2:F2)>=33, \"PASS\", \"FAIL\")",
    explanation: "SUM gives the total, division by five gives the percentage, and MIN checks the weakest subject against the pass threshold."
  },
  {
    id: "cbse-402-x-mcq-002", subjectCode: "402", classNumber: 10, type: "mcq", difficulty: "Medium", marks: 1, chapter: "Database Concepts",
    question: "Which database operation is most appropriate when you need to remove only records that satisfy a specified condition?",
    options: ["DELETE with WHERE", "DROP TABLE", "ALTER TABLE", "ORDER BY"], answer: "DELETE with WHERE",
    explanation: "DELETE with a WHERE clause removes matching records while preserving the table structure."
  }
];

export default CBSE_BOARD_PRACTICE_2026_27;
export { CBSE_BOARD_PRACTICE_2026_27 };
