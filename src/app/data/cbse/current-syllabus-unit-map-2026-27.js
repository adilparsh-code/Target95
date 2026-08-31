/**
 * CBSE 2026-27 current-session unit map.
 * This is a verification guard: current official syllabus names/marks are kept
 * separate from legacy chapter data until each chapter is explicitly audited.
 */

export const CBSE_CURRENT_UNIT_MAP_2026_27 = {
  '402': {
    9: [
      { code: 'A1', name: 'Communication Skills-I', marks: 2, theory: true, practical: true },
      { code: 'A2', name: 'Self-Management Skills-I', marks: 3, theory: true, practical: true },
      { code: 'A3', name: 'Basic Information and Communication Technology Skills-I', marks: 1, theory: true, practical: true },
      { code: 'A4', name: 'Entrepreneurial Skills-I', marks: 3, theory: true, practical: true },
      { code: 'A5', name: 'Green Skills-I', marks: 1, theory: true, practical: true },
      { code: 'B1', name: 'Introduction to IT-ITeS industry', marks: 4, theory: true, practical: true },
      { code: 'B2', name: 'Data Entry & Keyboarding Skills', marks: 6, theory: true, practical: true },
      { code: 'B3', name: 'Digital Documentation', marks: 10, theory: true, practical: true },
      { code: 'B4', name: 'Electronic Spreadsheet', marks: 10, theory: true, practical: true },
      { code: 'B5', name: 'Digital Presentation', marks: 10, theory: true, practical: true },
    ],
    10: [
      { code: 'A1', name: 'Communication Skills-II', marks: 2, theory: true, practical: true },
      { code: 'A2', name: 'Self-Management Skills-II', marks: 3, theory: true, practical: true },
      { code: 'A3', name: 'Basic ICT Skills-II', marks: 1, theory: true, practical: true },
      { code: 'A4', name: 'Entrepreneurial Skills-II', marks: 3, theory: true, practical: true },
      { code: 'A5', name: 'Green Skills-II', marks: 1, theory: true, practical: true },
      { code: 'B1', name: 'Digital Documentation (Advanced)', marks: 10, theory: true, practical: true },
      { code: 'B2', name: 'Electronic Spreadsheet (Advanced)', marks: 10, theory: true, practical: true },
      { code: 'B3', name: 'Database Management System', marks: 10, theory: true, practical: true },
      { code: 'B4', name: 'Maintain Healthy, Safe and Secure Working Environment', marks: 10, theory: true, practical: true },
    ],
  },
  '083': {
    11: [
      { code: '1', name: 'Computer Systems and Organisation', marks: 10 },
      { code: '2', name: 'Computational Thinking and Programming-I', marks: 45 },
      { code: '3', name: 'Society, Law, and Ethics', marks: 15 },
    ],
    12: [
      { code: '1', name: 'Computational Thinking and Programming-II', marks: 40 },
      { code: '2', name: 'Computer Networks', marks: 10 },
      { code: '3', name: 'Database Management', marks: 20 },
    ],
  },
  '065': {
    11: [
      { code: '1', name: 'Introduction to computer system', marks: 10 },
      { code: '2', name: 'Introduction to Python', marks: 25 },
      { code: '3', name: 'Database concepts and the Structured Query Language', marks: 30 },
      { code: '4', name: 'Introduction to Emerging Trends', marks: 5 },
    ],
    12: [
      { code: '1', name: 'Data Handling using Pandas and Data Visualization', marks: 25 },
      { code: '2', name: 'Database Query using SQL', marks: 25 },
      { code: '3', name: 'Introduction to Computer Networks', marks: 10 },
      { code: '4', name: 'Societal Impacts', marks: 10 },
    ],
  },
  '802': {
    11: [],
    12: [],
  },
};

export const getCurrentCBSEUnits = (subjectCode, classNumber) =>
  CBSE_CURRENT_UNIT_MAP_2026_27[String(subjectCode)]?.[Number(classNumber)] ?? [];

export default CBSE_CURRENT_UNIT_MAP_2026_27;
