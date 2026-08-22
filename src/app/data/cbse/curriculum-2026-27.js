/**
 * Target95 CBSE curriculum map for session 2026-27.
 * Source of truth: official CBSE curriculum pages/PDFs.
 * Tracks are intentionally separate by subject code.
 */

export const CBSE_CURRICULUM_SESSION = '2026-27';

const cbse402Class9 = {
  code: '402',
  id: 'cbse-402-class-9',
  name: 'Information Technology',
  category: 'skill-subject',
  syllabusSource: 'CBSE 402 Information Technology Class IX 2026-27',
  pythonRole: 'none',
  assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
  parts: {
    partA: {
      name: 'Employability Skills',
      units: [
        { id: '402-ix-a1', code: '1', name: 'Communication Skills-I', hours: 10, marks: 2 },
        { id: '402-ix-a2', code: '2', name: 'Self-Management Skills-I', hours: 10, marks: 3 },
        { id: '402-ix-a3', code: '3', name: 'Basic Information and Communication Technology Skills-I', hours: 10, marks: 1 },
        { id: '402-ix-a4', code: '4', name: 'Entrepreneurial Skills-I', hours: 15, marks: 3 },
        { id: '402-ix-a5', code: '5', name: 'Green Skills-I', hours: 5, marks: 1 },
      ],
    },
    partB: {
      name: 'Subject Specific Skills',
      units: [
        {
          id: '402-ix-b1',
          code: '1',
          name: 'Introduction to IT-ITeS industry',
          hours: { theory: 2, practical: 4 },
          marks: 4,
          topics: [
            'Introduction to IT and ITeS',
            'BPO services',
            'BPM industry in India',
            'Structure of the IT-BPM industry',
            'Applications of IT in home computing',
            'Applications of IT in everyday life',
            'IT in library, workplace and education',
            'IT in entertainment and communication',
            'IT in business, science and engineering',
            'IT in banking, insurance and marketing',
            'IT in health care',
            'IT in government and public service',
          ],
        },
        {
          id: '402-ix-b2',
          code: '2',
          name: 'Data Entry & Keyboarding Skills',
          hours: { theory: 4, practical: 10 },
          marks: 6,
          topics: [
            'Keyboarding skills',
            'Types of keys on keyboard',
            'Numeric keypad',
            'Home keys',
            'Guide keys',
            'Typing and deleting text',
            'Typing ergonomics',
            'Finger positioning and key allocation on four rows',
            'Pointing device - mouse',
            'Mouse operations',
            'Rapid Typing Tutor',
            'Touch typing technique',
            'Typing Tutor user interface',
            'Typing text and interpreting results',
            'Lesson editor',
            'Typing speed',
            'Typing rhythm',
          ],
        },
        {
          id: '402-ix-b3',
          code: '3',
          name: 'Digital Documentation',
          hours: { theory: 10, practical: 26 },
          marks: 10,
          topics: [
            'Introduction to word processing',
            'Word processing applications',
            'Word processing tool and window',
            'Creating, opening, saving and closing documents',
            'Document views',
            'Text editing',
            'Undo and redo',
            'Selecting, moving, copying, cutting and pasting text',
            'Find and replace',
            'Jumping to page number',
            'Non-printing characters',
            'Spelling and grammar',
            'Synonyms and thesaurus',
            'Formatting text and paragraphs',
            'Alignment, indentation and spacing',
            'Bullets and numbering',
            'Page formatting',
            'Headers and footers',
            'Tables',
            'Images and drawing objects',
          ],
        },
        {
          id: '402-ix-b4',
          code: '4',
          name: 'Electronic Spreadsheet',
          hours: { theory: 18, practical: 35 },
          marks: 10,
          topics: [
            'Introduction to spreadsheets',
            'Spreadsheet interface and workbook',
            'Entering and editing data',
            'Cell references',
            'Formulas and operators',
            'Functions',
            'Formatting cells',
            'Sorting and filtering data',
            'Charts',
            'Printing spreadsheets',
          ],
        },
        {
          id: '402-ix-b5',
          code: '5',
          name: 'Digital Presentation',
          hours: { theory: 10, practical: 31 },
          marks: 10,
          topics: [
            'Introduction to presentations',
            'Presentation software interface',
            'Creating presentations',
            'Slides and layouts',
            'Text and formatting',
            'Images and objects',
            'Slide master and themes',
            'Transitions',
            'Animations',
            'Slide show and presentation delivery',
          ],
        },
      ],
    },
  },
  practicalAssessment: {
    practicalExamination: 15,
    writtenTest: 10,
    vivaVoce: 10,
    practicalFileStudentPortfolio: 10,
    projectVivaVoce: 5,
  },
};

export const cbseCurriculum2026_27 = {
  board: 'CBSE',
  session: CBSE_CURRICULUM_SESSION,
  classes: {
    9: { classId: 'cbse-class-9', subjects: [cbse402Class9] },
    10: { classId: 'cbse-class-10', subjects: [] },
    11: { classId: 'cbse-class-11', subjects: [] },
    12: { classId: 'cbse-class-12', subjects: [] },
  },
};

export const getCBSECurriculum = (classNumber, subjectCode) => {
  const classData = cbseCurriculum2026_27.classes[classNumber];
  if (!classData) return null;
  return classData.subjects.find((subject) => subject.code === String(subjectCode)) ?? null;
};

export default cbseCurriculum2026_27;
