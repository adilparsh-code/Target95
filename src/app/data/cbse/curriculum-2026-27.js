/**
 * Target95 CBSE curriculum map for session 2026-27.
 * Source of truth: official CBSE curriculum pages/PDFs.
 * Tracks are intentionally separate by subject code.
 */

export const CBSE_CURRICULUM_SESSION = '2026-27';

export const cbseCurriculum2026_27 = {
  board: 'CBSE',
  session: CBSE_CURRICULUM_SESSION,
  classes: {
    9: {
      classId: 'cbse-class-9',
      subjects: [
        {
          code: '402',
          id: 'cbse-402-class-9',
          name: 'Information Technology',
          category: 'skill-subject',
          syllabusSource: 'CBSE 402 Information Technology Class IX 2026-27',
          pythonRole: 'none',
          units: [
            { id: '402-ix-part-a', name: 'Employability Skills', status: 'official-unit-group' },
            { id: '402-ix-part-b', name: 'Subject Specific Skills', status: 'official-unit-group' },
          ],
        },
      ],
    },
    10: {
      classId: 'cbse-class-10',
      subjects: [
        {
          code: '402',
          id: 'cbse-402-class-10',
          name: 'Information Technology',
          category: 'skill-subject',
          syllabusSource: 'CBSE 402 Information Technology Class X 2026-27',
          pythonRole: 'none',
          units: [
            { id: '402-x-part-a', name: 'Employability Skills', status: 'official-unit-group' },
            { id: '402-x-digital-documentation', name: 'Digital Documentation (Advanced) using LibreOffice Writer', marks: 8 },
            { id: '402-x-electronic-spreadsheet', name: 'Electronic Spreadsheet (Advanced) using LibreOffice Calc', marks: 10 },
            { id: '402-x-dbms', name: 'Database Management System using LibreOffice Base', marks: 12 },
            { id: '402-x-safe-work-environment', name: 'Maintain Healthy, Safe and Secure Working Environment', marks: 10 },
          ],
        },
      ],
    },
    11: {
      classId: 'cbse-class-11',
      subjects: [
        {
          code: '083',
          id: 'cbse-083-class-11',
          name: 'Computer Science',
          category: 'academic-subject',
          syllabusSource: 'CBSE 083 Computer Science Class XI 2026-27',
          pythonRole: 'core-programming',
          pythonLibraries: [],
          units: [
            { id: '083-xi-computer-systems-organisation', name: 'Computer Systems and Organisation', marks: 10 },
            { id: '083-xi-computational-thinking-programming-1', name: 'Computational Thinking and Programming – I', marks: 45 },
            { id: '083-xi-society-law-ethics', name: 'Society, Law and Ethics', marks: 15 },
          ],
        },
        {
          code: '065',
          id: 'cbse-065-class-11',
          name: 'Informatics Practices',
          category: 'academic-subject',
          syllabusSource: 'CBSE 065 Informatics Practices Class XI 2026-27',
          pythonRole: 'programming-and-data-handling',
          pythonLibraries: ['Pandas', 'Matplotlib'],
          units: [
            { id: '065-xi-computer-system', name: 'Introduction to computer system', marks: 10 },
            { id: '065-xi-python', name: 'Introduction to Python', marks: 25 },
            { id: '065-xi-sql', name: 'Database concepts and the Structured Query Language', marks: 30 },
            { id: '065-xi-emerging-trends', name: 'Introduction to Emerging Trends', marks: 5 },
          ],
        },
        {
          code: '802',
          id: 'cbse-802-class-11',
          name: 'Information Technology',
          category: 'skill-subject',
          syllabusSource: 'CBSE 802 Information Technology Class XI & XII 2026-27',
          pythonRole: 'none',
          primaryProgrammingLanguage: 'Java',
          units: [],
        },
      ],
    },
    12: {
      classId: 'cbse-class-12',
      subjects: [
        {
          code: '083',
          id: 'cbse-083-class-12',
          name: 'Computer Science',
          category: 'academic-subject',
          syllabusSource: 'CBSE 083 Computer Science Class XII 2026-27',
          pythonRole: 'core-programming',
          pythonLibraries: [],
          units: [],
        },
        {
          code: '065',
          id: 'cbse-065-class-12',
          name: 'Informatics Practices',
          category: 'academic-subject',
          syllabusSource: 'CBSE 065 Informatics Practices Class XII 2026-27',
          pythonRole: 'programming-and-data-handling',
          pythonLibraries: ['Pandas', 'Matplotlib'],
          units: [],
        },
        {
          code: '802',
          id: 'cbse-802-class-12',
          name: 'Information Technology',
          category: 'skill-subject',
          syllabusSource: 'CBSE 802 Information Technology Class XI & XII 2026-27',
          pythonRole: 'none',
          primaryProgrammingLanguage: 'Java',
          units: [],
        },
      ],
    },
  },
};

export const getCBSECurriculum = (classNumber, subjectCode) => {
  const classData = cbseCurriculum2026_27.classes[classNumber];
  if (!classData) return null;
  return classData.subjects.find((subject) => subject.code === String(subjectCode)) ?? null;
};

export default cbseCurriculum2026_27;
