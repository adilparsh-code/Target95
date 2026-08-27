/**
 * Target95 CBSE curriculum map for session 2026-27.
 * Source of truth: official CBSE curriculum pages/PDFs.
 *
 * IMPORTANT:
 * - This file is valid JavaScript (not TypeScript).
 * - All current class/subject records belong here.
 * - Legacy data under ./classes is not authoritative for 2026-27.
 */

export const CBSE_CURRICULUM_SESSION = '2026-27';

const cbse402Class9 = {
  code: '402',
  id: 'cbse-402-class-9',
  name: 'Information Technology',
  category: 'skill-subject',
  syllabusSource: 'CBSE 402 Information Technology Class IX 2026-27',
  sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-IX.pdf',
  pythonRole: 'none',
  assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
  parts: {
    partA: {
      name: 'Employability Skills',
      units: [
        { id: '402-ix-a1', code: '1', name: 'Communication Skills-I', hours: { theory: 6, practical: 4 }, marks: 2 },
        { id: '402-ix-a2', code: '2', name: 'Self-Management Skills-I', hours: { theory: 6, practical: 4 }, marks: 3 },
        { id: '402-ix-a3', code: '3', name: 'Basic ICT Skills-I', hours: { theory: 6, practical: 4 }, marks: 1 },
        { id: '402-ix-a4', code: '4', name: 'Entrepreneurial Skills-I', hours: { theory: 10, practical: 5 }, marks: 3 },
        { id: '402-ix-a5', code: '5', name: 'Green Skills-I', hours: { theory: 3, practical: 2 }, marks: 1 },
      ],
    },
    partB: {
      name: 'Subject Specific Skills',
      units: [
        {
          id: '402-ix-b1', code: '1', name: 'Introduction to IT- ITeS industry', hours: { theory: 2, practical: 4 }, marks: 4,
          learningOutcomes: ['Appreciate the applications of IT'],
          theory: ['Introduction to IT and ITeS','BPO services','BPM industry in India','Structure of the IT-BPM industry','Applications of IT in home computing','Applications of IT in everyday life','IT in library, workplace and education','IT in entertainment and communication','IT in business, science and engineering','IT in banking, insurance and marketing','IT in health care','IT in the government and public service'],
          practicalActivities: ['Identify and list the various IT enabled services','Observe the application of IT in various areas'],
        },
        {
          id: '402-ix-b2', code: '2', name: 'Data Entry & Keyboarding Skills', hours: { theory: 4, practical: 10 }, marks: 6,
          learningOutcomes: ['Use keyboard and mouse for data entry','Use typing software'],
          theory: ['Keyboarding Skills','Types of keys on keyboard','Numeric keypad','Home keys','Guide keys','Typing and deleting text','Typing ergonomics','Positioning of fingers on the keyboard','Allocation of keys to fingers on four different rows','Pointing device – Mouse','Mouse operations','Introduction to Rapid Typing Tutor','Touch typing technique','User interface of Typing Tutor','Typing text and interpret results','Working with lesson editor','Calculating typing speed','Typing rhythm'],
          practicalActivities: ['Identify the keys and its use on the keyboard','Demonstrate to use various keys on the keyboard','Demonstrate to type text, numbers, special characters','Practice correct typing ergonomics','Practice placing fingers on correct keys','Practice various mouse operations','Identify user interface of typing tutor','Practice typing text in typing tutor software','Work in lesson editor','Calculate typing speed'],
        },
        {
          id: '402-ix-b3', code: '3', name: 'Digital Documentation', hours: { theory: 10, practical: 26 }, marks: 10,
          learningOutcomes: ['Create a document using a word processor','Apply Editing features'],
          theory: ['Introduction to word processing','Word processing applications','Introduction to Word Processing tool','Creating a document','Parts of a Word Processor Window','Text editing – Undo and Redo','Moving and copying text','Selecting text'],
          practicalActivities: ['List available word processing applications','Start a new document','Open and save a document','Demonstrate cut, copy, paste, and move text'],
        },
        {
          id: '402-ix-b4', code: '4', name: 'Electronic Spreadsheet', hours: { theory: 18, practical: 35 }, marks: 10,
          learningOutcomes: ['Format data in spreadsheet','Understand referencing','Insert charts'],
          theory: ['Formatting tool','Dialog boxes to format values','Referencing: Relative, Mixed, Absolute','Types of charts'],
          practicalActivities: ['Format cells with decimal places and labels','Demonstrate fill handle for series','Use Relative, Mixed, and Absolute referencing','Create charts in spreadsheet'],
        },
        {
          id: '402-ix-b5', code: '5', name: 'Digital Presentation', hours: { theory: 10, practical: 31 }, marks: 10,
          learningOutcomes: ['Create presentations','Format text and animations','Insert tables and images'],
          theory: ['Concept of presentation','Slide layouts and slide masters','Custom Animation','Inserting graphics and tables'],
          practicalActivities: ['Create presentation using templates','Apply animations and slide transitions','Insert and format images and tables'],
        },
      ],
    },
  },
  practicalAssessment: { practicalExamination: 15, writtenTest: 10, vivaVoce: 10, practicalFileStudentPortfolio: 10, projectVivaVoce: 5 },
};

const cbse402Class10 = {
  code: '402', id: 'cbse-402-class-10', name: 'Information Technology', category: 'skill-subject',
  syllabusSource: 'CBSE 402 Information Technology Class X 2026-27',
  sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-X.pdf', pythonRole: 'none',
  assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
  parts: {
    partA: {
      name: 'Employability Skills',
      units: [
        { id: '402-x-a1', code: '1', name: 'Communication Skills-II', hours: { theory: 6, practical: 4 }, marks: 2 },
        { id: '402-x-a2', code: '2', name: 'Self-Management Skills-II', hours: { theory: 6, practical: 4 }, marks: 3 },
        { id: '402-x-a3', code: '3', name: 'ICT Skills-II', hours: { theory: 6, practical: 4 }, marks: 1 },
        { id: '402-x-a4', code: '4', name: 'Entrepreneurial Skills-II', hours: { theory: 10, practical: 5 }, marks: 3 },
        { id: '402-x-a5', code: '5', name: 'Green Skills-II', hours: { theory: 3, practical: 2 }, marks: 1 },
      ],
    },
    partB: {
      name: 'Subject Specific Skills',
      units: [
        {
          id: '402-x-b1', code: '1', name: 'Digital Documentation (Advanced) using LibreOffice Writer', hours: { theory: 12, practical: 18 }, marks: 8,
          chapters: [{ number: 1, title: 'Introduction to Styles' }, { number: 2, title: 'Working with Images' }, { number: 3, title: 'Advanced Features of Writer' }],
          learningOutcomes: ['Apply styles to create consistent formatting','Insert and format images and drawing objects','Create and maintain a Table of Contents','Use and edit templates','Track and review changes'],
          theory: ['Styles and Formatting','Inserting images, resizing, cropping','Drawing objects properties','Table of Contents hierarchy','Templates management','Track Changes and comments'],
          practicalActivities: ['Apply styles using Styles panel','Position images with wrapping and alignment','Generate Table of Contents','Manage templates','Track, accept, and reject changes'],
        },
        {
          id: '402-x-b2', code: '2', name: 'Electronic Spreadsheet (Advanced) using LibreOffice Calc', hours: { theory: 15, practical: 23 }, marks: 10,
          chapters: [{ number: 4, title: 'Analyse data using scenarios and goal seek' }, { number: 5, title: 'Using Macros in Spreadsheet' }, { number: 6, title: 'Linking Spreadsheet Data' }, { number: 7, title: 'Share and Review a Spreadsheet' }],
          learningOutcomes: ['Consolidate data and apply what-if analysis','Use Goal Seek and Solver','Record and execute macros','Link data across external sources'],
          theory: ['Consolidating Data and Subtotals','What-if Scenarios, Goal Seek, Solver','Macro creation and functions','External links and shared spreadsheets'],
          practicalActivities: ['Create What-if scenarios','Record and run simple macros','Link external data sources','Merge and compare spreadsheets'],
        },
        {
          id: '402-x-b3', code: '3', name: 'Database Management System using LibreOffice Base', hours: { theory: 18, practical: 27 }, marks: 12,
          chapters: [{ number: 8, title: 'Introduction to DBMS' }, { number: 9, title: 'Starting with LibreOffice Base' }, { number: 10, title: 'Working with Multiple Tables' }, { number: 11, title: 'Queries in Base' }, { number: 12, title: 'Forms and Reports' }],
          learningOutcomes: ['Understand RDBMS concepts','Create tables and assign primary keys','Establish table relationships','Construct queries, forms, and reports'],
          theory: ['RDBMS terminology','Data types and primary key','Relationships and referential integrity','Queries, forms, and reports'],
          practicalActivities: ['Build database tables with Design View','Define One-to-Many relationships','Run criteria-based queries','Generate custom forms and reports'],
        },
        {
          id: '402-x-b4', code: '4', name: 'Maintain Healthy, Safe and Secure Working Environment', hours: { theory: 15, practical: 22 }, marks: 10,
          chapters: [{ number: 13, title: 'Health, Safety and Security at Workplace' }, { number: 14, title: 'Workplace Quality Measures' }, { number: 15, title: 'Prevent Accidents and Emergencies' }],
          learningOutcomes: ['Identify workplace hazards and follow safety protocols','Apply ergonomics and maintain environmental quality','Execute emergency evacuation and first aid procedures'],
          theory: ['Safety policies and hazard controls','Office ergonomics and health safety','Emergency services and accident handling'],
          practicalActivities: ['Demonstrate basic first aid and fire safety','Simulate workplace evacuation plans'],
        },
      ],
    },
  },
  practicalAssessment: { practicalExamination: 20, vivaVoce: 10, projectWorkFieldVisit: 10, portfolioPracticalFile: 10 },
};

const trackOnly = (code, classNumber, name, category, pythonRole) => ({
  code, id: `cbse-${code}-class-${classNumber}`, name, category, pythonRole,
  syllabusSource: `CBSE ${code} ${name} Class ${classNumber} 2026-27`,
  sourceUrl: `https://cbseacademic.nic.in/`,
  assessment: { theoryMarks: 0, practicalMarks: 0, totalMarks: 0 },
  parts: { partA: { name: 'Employability / common skills', units: [] }, partB: { name: 'Subject Specific Skills', units: [] } },
  practicalAssessment: {},
  status: 'curriculum-structure-ready',
});

export const cbseCurriculum2026_27 = {
  board: 'CBSE',
  session: CBSE_CURRICULUM_SESSION,
  classes: {
    9: { classId: 'cbse-class-9', subjects: [cbse402Class9] },
    10: { classId: 'cbse-class-10', subjects: [cbse402Class10] },
    11: { classId: 'cbse-class-11', subjects: [trackOnly('083', 11, 'Computer Science', 'academic-subject', 'core-programming'), trackOnly('065', 11, 'Informatics Practices', 'academic-subject', 'programming-and-data-handling'), trackOnly('802', 11, 'Information Technology', 'skill-subject', 'none')] },
    12: { classId: 'cbse-class-12', subjects: [trackOnly('083', 12, 'Computer Science', 'academic-subject', 'core-programming'), trackOnly('065', 12, 'Informatics Practices', 'academic-subject', 'programming-and-data-handling'), trackOnly('802', 12, 'Information Technology', 'skill-subject', 'none')] },
  },
};

export const getCBSECurriculum = (classNumber, subjectCode) => {
  const targetClass = cbseCurriculum2026_27.classes[classNumber];
  if (!targetClass) return null;
  return targetClass.subjects.find((s) => s.code === String(subjectCode)) ?? null;
};

export default cbseCurriculum2026_27;
