/**
 * CBSE 2026-27 senior-secondary Python/data topics.
 * Subject codes are intentionally separated.
 */

export const CBSE_PYTHON_SQL_2026_27 = {
  '083': {
    name: 'Computer Science',
    classes: [11, 12],
    python: {
      role: 'core-programming',
      csv: { enabled: true, focus: ['CSV files', 'reading records', 'searching records', 'writing and append operations where prescribed'] },
      exceptionHandling: { enabled: true, focus: ['exceptions', 'try-except-finally', 'raising and handling exceptions'] },
    },
    sql: { enabled: true, focus: ['database concepts', 'SQL queries', 'Python-SQL connectivity'] },
  },
  '065': {
    name: 'Informatics Practices',
    classes: [11, 12],
    python: {
      role: 'programming-and-data-handling',
      csv: { enabled: true, focus: ['CSV data handling', 'import/export with Pandas where prescribed'] },
      exceptionHandling: { enabled: false, note: 'Do not inherit 083 exception handling unless explicitly prescribed by the current 065 syllabus.' },
      libraries: ['Pandas', 'Matplotlib'],
    },
    sql: { enabled: true, focus: ['SQL queries', 'aggregate functions', 'database concepts', 'Pandas-SQL import/export where prescribed'] },
  },
};

export const getCBSEPythonSQLTrack = (subjectCode) => CBSE_PYTHON_SQL_2026_27[String(subjectCode)] ?? null;

export default CBSE_PYTHON_SQL_2026_27;
