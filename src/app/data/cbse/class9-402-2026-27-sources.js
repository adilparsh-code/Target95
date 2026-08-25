/**
 * CBSE Class IX Information Technology (402) - 2026-27 source registry.
 * Sources are official CBSE publications only.
 */

export const CBSE_402_CLASS9_2026_27 = {
  board: 'CBSE',
  session: '2026-27',
  class: 9,
  subjectCode: '402',
  subject: 'Information Technology',
  verificationStatus: 'official-syllabus-verified',
  syllabus: {
    url: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-IX.pdf',
    title: 'Information Technology (402), Class IX, Session 2026-2027',
    authority: 'CBSE Department of Skill Education',
  },
  assessment: {
    theory: 50,
    practical: 50,
    total: 100,
    subjectSpecificTheory: 40,
    employabilityTheory: 10,
    practicalWork: 35,
    projectAndPortfolio: 15,
  },
  partA: {
    title: 'Employability Skills',
    source: 'Official CBSE 2026-27 syllabus',
    units: [
      { code: 1, title: 'Communication Skills-I', hours: 10, marks: 2 },
      { code: 2, title: 'Self-Management Skills-I', hours: 10, marks: 3 },
      { code: 3, title: 'Basic Information and Communication Technology Skills-I', hours: 10, marks: 1 },
      { code: 4, title: 'Entrepreneurial Skills-I', hours: 15, marks: 3 },
      { code: 5, title: 'Green Skills-I', hours: 5, marks: 1 },
    ],
  },
  partB: {
    title: 'Subject Specific Skills',
    source: 'Official CBSE 2026-27 syllabus',
    units: [
      { code: 1, title: 'Introduction to IT-ITeS industry', theoryHours: 2, practicalHours: 4, marks: 4 },
      { code: 2, title: 'Data Entry & Keyboarding Skills', theoryHours: 4, practicalHours: 10, marks: 6 },
      { code: 3, title: 'Digital Documentation', theoryHours: 10, practicalHours: 26, marks: 10 },
      { code: 4, title: 'Electronic Spreadsheet', theoryHours: 18, practicalHours: 35, marks: 10 },
      { code: 5, title: 'Digital Presentation', theoryHours: 10, practicalHours: 31, marks: 10 },
    ],
  },
  practicalAssessment: {
    practicalExamination: 15,
    writtenTest: 10,
    vivaVoce: 10,
    practicalFileStudentPortfolio: 10,
    projectVivaVoce: 5,
  },
  booksAndSupportMaterial: [
    {
      type: 'student-textbook',
      title: 'Information Technology - Class IX',
      publisher: 'CBSE',
      officialRegistry: 'CBSE Skill Education Books and Support Material',
      registryUrl: 'https://cbseacademic.nic.in/skill-education-books_archive.html',
      historicalUnitStructure: [
        'Unit 1: Introduction to IT-ITeS Industry',
        'Unit 2: Data Entry and Keyboarding Skills',
        'Unit 3: Digital Documentation',
        'Unit 4: Electronic Spreadsheet',
        'Unit 5: Digital Presentation',
      ],
      note: 'Use the current 2026-27 syllabus as the curriculum authority. The textbook is a supporting learning resource and must not override the current syllabus.',
    },
    {
      type: 'employability-skills',
      title: 'Employability Skills - Class IX',
      publisher: 'CBSE',
      officialRegistry: 'CBSE Skill Education Books and Support Material',
      registryUrl: 'https://cbseacademic.nic.in/skill-education-books_archive.html',
    },
  ],
  sampleQuestionPaper: {
    url: 'https://cbseacademic.nic.in/web_material/Curriculum26/SQP_MS_IX/402_Information_Tech_SQP.pdf',
    note: 'Use as assessment-pattern evidence, not as a replacement for the 2026-27 curriculum document.',
  },
};

export default CBSE_402_CLASS9_2026_27;
