/**
 * CBSE 2026-27 senior-secondary Python/data topics.
 * Scope is separated by subject code; do not merge 083 and 065 libraries.
 */

export const CBSE_PYTHON_SQL_2026_27 = {
  '083': {
    name: 'Computer Science',
    classes: [11, 12],
    python: {
      role: 'core-programming',
      csv: {
        enabled: true,
        focus: ['CSV files', 'reading records', 'searching records', 'writing/append operations where prescribed'],
      },
      exceptionHandling: {
        enabled: true,
        focus: ['exceptions', 'try-except-finally', 'raising/handling exceptions'],
      },
    },
    sql: {
      enabled: true,
      focus: ['database concepts', 'SQL queries', 'Python-SQL connectivity'],
    },
  },
  '065': {
    name: 'Informatics Practices',
    classes: [11, 12],
    python: {
      role: 'programming-and-data-handling',
      csv: {
        enabled: true,
        focus: ['CSV data handling', 'import/export data with Pandas where prescribed'],
      },
      exceptionHandling: {
        enabled: false,
        note: 'Do not inherit the 083 exception-handling chapter unless explicitly prescribed by the current 065 syllabus.',
      },
      libraries: ['Pandas', 'Matplotlib'],
    },
    sql: {
      enabled: true,
      focus: ['SQL queries', 'aggregate functions', 'database concepts', 'Pandas-SQL import/export where prescribed'],
    },
  },
};

export const getCBSEPythonSQLTrack = (subjectCode) =>
  CBSE_PYTHON_SQL_2026_27[String(subjectCode)] ?? null;

export default CBSE_PYTHON_SQL_2026_27;
