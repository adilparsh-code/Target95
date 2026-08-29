/**
 * Curated CBSE 2026-27 practice bank seed.
 * Real question content is separated from UI and mock configuration.
 */

const q = (id, classNumber, subjectCode, topic, questionType, question, correctAnswer, marks, difficulty, explanation, options = []) => ({
  id, board: 'CBSE', session: '2026-27', classNumber, subjectCode: String(subjectCode),
  topicId: topic, questionType, question, options, correctAnswer, marks, difficulty,
  competencyLevel: difficulty === 'hard' ? 'Analysing' : difficulty === 'medium' ? 'Applying' : 'Understanding',
  explanation, source: 'CBSE 2026-27 syllabus-aligned practice', tags: ['cbse', String(subjectCode), `class-${classNumber}`],
});

export const CBSE_PRACTICE_QUESTIONS_2026_27 = [
  q('cbse-402-ix-001', 9, '402', 'it-enabled-services', 'mcq', 'Which statement best describes an IT-enabled service (ITeS)?', 'A service whose delivery is supported by information technology.', 1, 'easy', 'ITeS uses IT infrastructure to improve or deliver services.', ['A service unrelated to technology', 'A service whose delivery is supported by information technology', 'Only a hardware repair service', 'Only a banking service']),
  q('cbse-402-ix-002', 9, '402', 'keyboard-ergonomics', 'short-answer', 'State two correct ergonomic practices to follow while typing.', 'Keep the back supported and wrists/fingers in a relaxed, neutral position.', 2, 'easy', 'Good posture and relaxed hand positioning reduce strain.'),
  q('cbse-402-x-001', 10, '402', 'styles', 'mcq', 'What is the main advantage of using Styles in Writer?', 'Consistent formatting across a document.', 1, 'easy', 'Styles allow repeated formatting to be applied consistently and updated centrally.', ['Consistent formatting across a document.', 'Automatic internet access', 'Database encryption', 'Spreadsheet calculation']),
  q('cbse-402-x-002', 10, '402', 'relationships', 'short-answer', 'What is the purpose of a primary key in a relational database table?', 'It uniquely identifies each record in the table.', 2, 'easy', 'A primary key provides unique identification for rows/records.'),
  q('cbse-083-xi-001', 11, '083', 'python-exceptions', 'mcq', 'Which block is used to handle an exception in Python?', 'except', 1, 'easy', 'The except block handles exceptions raised in the corresponding try block.', ['if', 'except', 'switch', 'case']),
  q('cbse-083-xi-002', 11, '083', 'python-csv', 'programming', 'Write a Python statement that opens marks.csv for reading with newline handling.', "open('marks.csv', 'r', newline='')", 2, 'medium', 'Using open with read mode and newline parameter is appropriate for CSV text handling.'),
  q('cbse-083-xii-001', 12, '083', 'sql-select', 'mcq', 'Which SQL command retrieves selected rows from a table?', 'SELECT', 1, 'easy', 'SELECT is used to retrieve data from one or more tables.', ['SELECT', 'INSERT', 'UPDATE', 'DELETE']),
  q('cbse-083-xii-002', 12, '083', 'python-sql', 'short-answer', 'Why should a program validate database input before executing an SQL operation?', 'To reduce invalid data and unsafe or unintended database operations.', 2, 'medium', 'Validation improves data quality and helps prevent unintended database operations.'),
  q('cbse-065-xi-001', 11, '065', 'pandas-dataframe', 'mcq', 'Which Pandas structure is two-dimensional and commonly used for tabular data?', 'DataFrame', 1, 'easy', 'A DataFrame stores labelled two-dimensional tabular data.', ['Series', 'DataFrame', 'Tuple', 'Dictionary']),
  q('cbse-065-xi-002', 11, '065', 'csv-pandas', 'short-answer', 'Name the Pandas function commonly used to read a CSV file.', 'read_csv()', 1, 'easy', 'read_csv() loads tabular CSV data into a DataFrame.'),
  q('cbse-065-xii-001', 12, '065', 'matplotlib', 'mcq', 'Which Matplotlib function is commonly used to create a line plot?', 'plot()', 1, 'easy', 'plot() is the standard Matplotlib function for line graphs.', ['plot()', 'barh()', 'hist2d()', 'scatter_matrix()']),
  q('cbse-065-xii-002', 12, '065', 'sql-aggregate', 'short-answer', 'What is the purpose of an aggregate function such as AVG() in SQL?', 'It calculates a summary value over a group or set of rows.', 2, 'easy', 'Aggregate functions summarise multiple rows into a single result value.'),
  q('cbse-802-xi-001', 11, '802', 'employability', 'mcq', 'Which practice most directly improves workplace data security?', 'Using strong passwords and following access-control rules.', 1, 'easy', 'Strong authentication and controlled access reduce unauthorised access.', ['Using strong passwords and following access-control rules.', 'Sharing passwords', 'Disabling all updates', 'Using unknown USB devices']),
  q('cbse-802-xii-001', 12, '802', 'workplace-safety', 'scenario', 'A workstation user experiences repeated wrist discomfort. Which immediate workplace action is most appropriate?', 'Review ergonomics and adjust posture, keyboard and mouse position.', 2, 'medium', 'Ergonomic adjustment is a first-line workplace safety response.', []),
];

export const getCBSEPracticeQuestions = (classNumber, subjectCode) =>
  CBSE_PRACTICE_QUESTIONS_2026_27.filter((item) => item.classNumber === Number(classNumber) && item.subjectCode === String(subjectCode));

export default CBSE_PRACTICE_QUESTIONS_2026_27;
