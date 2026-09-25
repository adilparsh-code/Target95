/**
 * CBSE 2026-27 senior-secondary content index.
 * Keeps subject tracks explicit so legacy content cannot silently cross-load.
 */
export const CBSE_SENIOR_CONTENT_INDEX = {
  11: {
    '083': {
      name: 'Computer Science',
      pythonLibraries: [],
      focus: ['Computer Systems and Organisation', 'Computational Thinking and Programming - I', 'Society, Law, and Ethics'],
      specialTopics: ['Python programming', 'strings', 'lists', 'tuples', 'dictionaries', 'functions'],
    },
    '065': {
      name: 'Informatics Practices',
      pythonLibraries: [],
      focus: ['Introduction to Computer System', 'Introduction to Python', 'Database concepts and SQL', 'Emerging Trends'],
      specialTopics: ['Python programming', 'strings', 'lists', 'dictionaries', 'SQL', 'emerging trends'],
    },
    '802': {
      name: 'Information Technology',
      pythonLibraries: [],
      focus: ['Computer Organization', 'Networking And Internet', 'Office Automation Tools', 'RDBMS', 'Fundamentals of Java'],
      specialTopics: ['Java programming', 'SQL', 'office automation', 'networking'],
    },
  },
  12: {
    '083': {
      name: 'Computer Science',
      pythonLibraries: [],
      focus: ['Computational Thinking and Programming - II', 'Computer Networks', 'Database Management'],
      specialTopics: ['Python programming', 'CSV handling', 'exception handling', 'SQL/database concepts'],
    },
    '065': {
      name: 'Informatics Practices',
      pythonLibraries: ['Pandas', 'Matplotlib'],
      focus: ['Data Handling using Pandas', 'Data Visualization', 'Database Query using SQL', 'Societal Impacts'],
      specialTopics: ['Pandas DataFrame', 'CSV with Pandas', 'Matplotlib', 'SQL'],
    },
    '802': {
      name: 'Information Technology',
      pythonLibraries: [],
      focus: ['Database Concepts – RDBMS Tool', 'Operating Web Based Applications', 'JAVA', 'Work Integrated Learning IT – DMA'],
      specialTopics: ['Java programming', 'SQL', 'web applications', 'work-integrated learning'],
    },
  },
};

export const getCBSESeniorContentIndex = (classNumber, subjectCode) =>
  CBSE_SENIOR_CONTENT_INDEX[Number(classNumber)]?.[String(subjectCode)] ?? null;

export default CBSE_SENIOR_CONTENT_INDEX;
