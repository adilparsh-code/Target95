/**
 * Target95 CBSE curriculum map for session 2026-27.
 * Source of truth: official CBSE curriculum pages/PDFs.
 */

import legacyCBSEClass11 from './classes/class11/index.js';
import legacyCBSEClass12 from './classes/class12/index.js';
import CBSE_402_CLASS9_2026_27 from './class9-402-2026-27-sources.js';

export const CBSE_CURRICULUM_SESSION = '2026-27';

const class9PartAUnits = CBSE_402_CLASS9_2026_27.partA.units.map((unit) => ({
  id: `402-ix-a${unit.code}`, code: String(unit.code), name: unit.title,
  learningOutcomes: [], theory: [], practicalActivities: [], chapters: [],
  hours: unit.hours, marks: unit.marks,
}));

const class9PartBUnits = CBSE_402_CLASS9_2026_27.partB.units.map((unit) => ({
  id: `402-ix-b${unit.code}`, code: String(unit.code), name: unit.title,
  learningOutcomes: [], theory: [], practicalActivities: [], chapters: [],
  hours: { theory: unit.theoryHours, practical: unit.practicalHours }, marks: unit.marks,
}));

const cbse402Class9 = {
  code: '402', id: 'cbse-402-class-9', name: 'Information Technology', category: 'skill-subject',
  syllabusSource: 'CBSE 402 Information Technology Class IX 2026-27',
  sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-IX.pdf',
  pythonRole: 'none',
  assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
  parts: {
    partA: { name: 'Employability Skills', units: class9PartAUnits },
    partB: { name: 'Subject Specific Skills', units: class9PartBUnits },
  },
  practicalAssessment: { practicalExamination: 15, writtenTest: 10, vivaVoce: 10, practicalFileStudentPortfolio: 10, projectVivaVoce: 5 },
};

const class10PartAUnits = [
  { id: '402-x-a1', code: '1', name: 'Communication Skills-II', hours: { theory: 6, practical: 4 }, marks: 2 },
  { id: '402-x-a2', code: '2', name: 'Self-Management Skills-II', hours: { theory: 6, practical: 4 }, marks: 3 },
  { id: '402-x-a3', code: '3', name: 'Basic ICT Skills-II', hours: { theory: 6, practical: 4 }, marks: 1 },
  { id: '402-x-a4', code: '4', name: 'Entrepreneurial Skills-II', hours: { theory: 10, practical: 5 }, marks: 3 },
  { id: '402-x-a5', code: '5', name: 'Green Skills-II', hours: { theory: 3, practical: 2 }, marks: 1 },
];

const class10PartBUnits = [
  { id: '402-x-b1', code: '1', name: 'Digital Documentation (Advanced)', hours: { theory: 10, practical: 26 }, marks: 10 },
  { id: '402-x-b2', code: '2', name: 'Electronic Spreadsheet (Advanced)', hours: { theory: 18, practical: 35 }, marks: 10 },
  { id: '402-x-b3', code: '3', name: 'Database Management System', hours: { theory: 10, practical: 20 }, marks: 10 },
  { id: '402-x-b4', code: '4', name: 'Maintain Healthy, Safe and Secure Working Environment', hours: { theory: 6, practical: 10 }, marks: 10 },
];

const cbse402Class10 = {
  code: '402', id: 'cbse-402-class-10', name: 'Information Technology', category: 'skill-subject',
  syllabusSource: 'CBSE 402 Information Technology Class X 2026-27',
  sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-X.pdf',
  pythonRole: 'none',
  assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
  parts: { partA: { name: 'Employability Skills', units: class10PartAUnits }, partB: { name: 'Subject Specific Skills', units: class10PartBUnits } },
  practicalAssessment: { practicalExamination: 20, vivaVoce: 10, projectWorkFieldVisit: 10, portfolioPracticalFile: 10 },
};

const class11Units = legacyCBSEClass11.units.map((unit) => ({
  id: unit.id, code: String(unit.unitNumber), name: unit.title,
  learningOutcomes: unit.chapters?.flatMap((chapter) => chapter.learningObjectives || []) || [],
  theory: unit.chapters?.map((chapter) => chapter.title) || [],
  practicalActivities: unit.chapters?.filter((chapter) => chapter.metadata?.isPractical).map((chapter) => chapter.title) || [],
  chapters: unit.chapters || [],
}));

const class12Units = legacyCBSEClass12?.units?.map((unit) => ({
  id: unit.id, code: String(unit.unitNumber), name: unit.title,
  learningOutcomes: unit.chapters?.flatMap((chapter) => chapter.learningObjectives || []) || [],
  theory: unit.chapters?.map((chapter) => chapter.title) || [],
  practicalActivities: unit.chapters?.filter((chapter) => chapter.metadata?.isPractical).map((chapter) => chapter.title) || [],
  chapters: unit.chapters || [],
})) || [];

const makeUnit = (id, code, name, theory, practicalActivities = [], marks = null, hours = null) => ({
  id, code: String(code), name, learningOutcomes: [], theory, practicalActivities,
  chapters: [], ...(marks !== null ? { marks } : {}), ...(hours !== null ? { hours } : {}),
});

const cbse065Class11Units = [
  makeUnit('065-xi-u1', 1, 'Introduction to Computer System', [
    'Introduction to computer and computing: evolution of computing devices',
    'Components of a computer system and their interconnections',
    'Input/output devices',
    'Computer memory: units, primary and secondary memory',
    'Data deletion, recovery and related security concerns',
  ], [], 10),
  makeUnit('065-xi-u2', 2, 'Introduction to Python', [
    'Python programming language and features',
    'Python program structure, modes and tokens',
    'Variables, constants, keywords and identifiers',
    'Data types, operators and expressions',
    'Input/output and type conversion',
    'Control flow: conditional statements and loops',
    'Strings, lists and dictionaries',
  ], ['Write, execute and debug Python programs using core data types, lists and dictionaries'], 25),
  makeUnit('065-xi-u3', 3, 'Database Concepts and the Structured Query Language', [
    'Database concepts and relational database management systems',
    'Database, table, record, field, domain and keys',
    'SQL data types and database/table creation',
    'INSERT, UPDATE, DELETE and SELECT statements',
    'WHERE, ORDER BY and aggregate functions',
    'GROUP BY, HAVING and relational operations',
  ], ['Create tables and perform SQL queries on a relational database'], 30),
  makeUnit('065-xi-u4', 4, 'Introduction to Emerging Trends', [
    'Artificial Intelligence and Machine Learning',
    'Natural Language Processing and immersive technologies',
    'Internet of Things, robotics and blockchain',
    'Cloud computing and big data',
  ], [], 5),
];

const cbse065Class12Units = [
  makeUnit('065-xii-u1', 1, 'Data Handling using Pandas and Data Visualization', [
    'Introduction to Python libraries: Pandas and Matplotlib',
    'Series: creation, indexing, selection and operations',
    'DataFrame: creation, indexing, selection, adding/deleting rows and columns',
    'Importing/exporting data and handling CSV data',
    'Data visualization using line, bar, histogram and pie charts',
  ], ['Create Series/DataFrames and visualize data with Matplotlib'], 25),
  makeUnit('065-xii-u2', 2, 'Database Query using SQL', [
    'Revision of database concepts and SQL',
    'Aggregate functions: MAX, MIN, AVG, SUM and COUNT',
    'GROUP BY and HAVING clauses',
    'Joins and queries using multiple tables',
    'Import/export data between SQL database and Pandas',
  ], ['Design and execute SQL queries and exchange data between SQL and Pandas'], 25),
  makeUnit('065-xii-u3', 3, 'Introduction to Computer Networks', [
    'Computer network and its advantages',
    'Network types and topologies',
    'Networking devices and transmission media',
    'Internet, web, URL, browser and web services',
    'Internet security issues and safe browser configuration',
  ], ['Identify network devices, topologies and basic internet-security settings'], 10),
  makeUnit('065-xii-u4', 4, 'Societal Impacts', [
    'Digital footprint, digital identity and data privacy',
    'Intellectual property rights, plagiarism and open-source licensing',
    'Cybercrime and cyber laws',
    'Technology impact on society, gender and disability issues',
    'E-waste and responsible digital citizenship',
  ], [], 10),
];

const cbse802Class11PartA = [
  makeUnit('802-xi-a1', 1, 'Communication Skills-III', [], [], 2, 10),
  makeUnit('802-xi-a2', 2, 'Self-Management Skills-III', [], [], 3, 10),
  makeUnit('802-xi-a3', 3, 'ICT Skills-III', [], [], 1, 10),
  makeUnit('802-xi-a4', 4, 'Entrepreneurial Skills-III', [], [], 3, 15),
  makeUnit('802-xi-a5', 5, 'Green Skills-III', [], [], 1, 5),
];

const cbse802Class11PartB = [
  makeUnit('802-xi-b1', 1, 'Computer Organization', ['Computer fundamentals and components', 'CPU, memory and storage', 'Input/output devices and peripheral interfaces'], ['Identify components and configure basic computer hardware'], 5, { theory: 15, practical: 15 }),
  makeUnit('802-xi-b2', 2, 'Networking And Internet', ['Computer networks and types', 'Network topologies, devices and transmission media', 'Internet services and protocols', 'Cyber safety and responsible internet use'], ['Build/configure a basic network and practice internet/network troubleshooting'], 10, { theory: 15, practical: 25 }),
  makeUnit('802-xi-b3', 3, 'Office Automation Tools', ['Word processing and document formatting', 'Spreadsheets, formulas and charts', 'Presentation creation and delivery'], ['Create documents, spreadsheets and presentations using office automation tools'], 10, { theory: 15, practical: 30 }),
  makeUnit('802-xi-b4', 4, 'RDBMS', ['Database concepts', 'Tables, fields, records and keys', 'SQL commands and queries', 'Basic database administration'], ['Create tables, insert/update records and execute MySQL queries'], 10, { theory: 15, practical: 20 }),
  makeUnit('802-xi-b5', 5, 'Fundamentals of Java', ['Introduction to Java and object-oriented programming', 'Java language elements and operators', 'Control flow and arrays', 'Classes and objects', 'Basic exception handling'], ['Write, compile and execute Java programs covering the prescribed fundamentals'], 15, { theory: 25, practical: 35 }),
];

const cbse802Class12PartA = [
  makeUnit('802-xii-a1', 1, 'Communication Skills-IV', [], [], 2, 10),
  makeUnit('802-xii-a2', 2, 'Self-Management Skills-IV', [], [], 3, 10),
  makeUnit('802-xii-a3', 3, 'Information and Communication Technology Skills-IV', [], [], 1, 10),
  makeUnit('802-xii-a4', 4, 'Entrepreneurial Skills-IV', [], [], 3, 15),
  makeUnit('802-xii-a5', 5, 'Green Skills-IV', [], [], 1, 5),
];

const cbse802Class12PartB = [
  makeUnit('802-xii-b1', 1, 'Database Concepts – RDBMS Tool', ['Basics of RDBMS', 'Creating and opening databases', 'Creating and populating tables', 'Modifying table content and structure', 'Ordering and grouping', 'Operating with multiple tables'], ['Create databases/tables and execute SQL queries in an RDBMS tool'], 15, { theory: 30, practical: 45 }),
  makeUnit('802-xii-b2', 2, 'Operating Web Based Applications', ['Web-based applications and services', 'Using web applications safely and effectively', 'Browser configuration and internet security'], ['Operate and evaluate web-based applications using safe browsing practices'], 10, { theory: 15, practical: 20 }),
  makeUnit('802-xii-b3', 3, 'JAVA', ['Fundamentals of Java programming', 'Introduction to Java and Object Oriented Programming', 'Java language elements and operators', 'Control flow and arrays', 'Class design', 'Exception handling and assertions', 'Threads', 'Wrapper classes', 'String manipulation'], ['Write and execute Java programs using the prescribed OOP, arrays, exceptions, threads and strings topics'], 20, { theory: 30, practical: 50 }),
  makeUnit('802-xii-b4', 4, 'Work Integrated Learning IT – DMA', ['Work-integrated learning and digital media applications', 'Planning, creating and presenting an IT-based workplace project'], ['Complete a workplace-oriented IT/DMA activity or project'], 5, { theory: 10, practical: 10 }),
];

const seniorTrack = (code, name, category, pythonRole, pythonLibraries = []) => ({
  code, id: `cbse-${code}-senior-secondary`, name, category,
  syllabusSource: `CBSE ${code} ${name} 2026-27`, sourceUrl: 'https://cbseacademic.nic.in/',
  pythonRole, pythonLibraries,
  assessment: { theoryMarks: 70, practicalMarks: 30, totalMarks: 100 },
  parts: { partA: { name: 'Curriculum content', units: [] }, partB: { name: 'Detailed topics', units: [] } },
  practicalAssessment: { practicalExamination: 30 },
});

const cbse083Class11 = {
  ...seniorTrack('083', 'Computer Science', 'academic-subject', 'core-programming'),
  parts: { partA: { name: 'Core Curriculum', units: class11Units }, partB: { name: 'Practical Topics', units: [] } },
};
const cbse083Class12 = {
  ...seniorTrack('083', 'Computer Science', 'academic-subject', 'core-programming'),
  parts: { partA: { name: 'Core Curriculum', units: class12Units }, partB: { name: 'Practical Topics', units: [] } },
};

const cbse065Class11 = {
  ...seniorTrack('065', 'Informatics Practices', 'academic-subject', 'programming-and-data-handling', ['Pandas', 'Matplotlib']),
  parts: { partA: { name: 'Curriculum content', units: cbse065Class11Units }, partB: { name: 'Practical Topics', units: [] } },
};
const cbse065Class12 = {
  ...seniorTrack('065', 'Informatics Practices', 'academic-subject', 'programming-and-data-handling', ['Pandas', 'Matplotlib']),
  parts: { partA: { name: 'Curriculum content', units: cbse065Class12Units }, partB: { name: 'Practical Topics', units: [] } },
};
const cbse802Class11 = {
  ...seniorTrack('802', 'Information Technology', 'skill-subject', 'none'),
  assessment: { theoryMarks: 60, practicalMarks: 40, totalMarks: 100 },
  parts: { partA: { name: 'Employability Skills', units: cbse802Class11PartA }, partB: { name: 'Subject Specific Skills', units: cbse802Class11PartB } },
  practicalAssessment: { officeAutomationTools: 15, javaProgramme: 10, mysqlCommands: 5, practicalFile: 5, vivaVoce: 5, projectWork: 10 },
};
const cbse802Class12 = {
  ...seniorTrack('802', 'Information Technology', 'skill-subject', 'none'),
  assessment: { theoryMarks: 60, practicalMarks: 40, totalMarks: 100 },
  parts: { partA: { name: 'Employability Skills', units: cbse802Class12PartA }, partB: { name: 'Subject Specific Skills', units: cbse802Class12PartB } },
  practicalAssessment: { javaProgram: 10, sqlQueries: 10, practicalFile: 10, vivaVoce: 5, projectWork: 5 },
};

export const cbseCurriculum2026_27 = {
  board: 'CBSE',
  session: CBSE_CURRICULUM_SESSION,
  classes: {
    9: { classId: 'cbse-class-9', subjects: [cbse402Class9] },
    10: { classId: 'cbse-class-10', subjects: [cbse402Class10] },
    11: { classId: 'cbse-class-11', subjects: [cbse083Class11, cbse065Class11, cbse802Class11] },
    12: { classId: 'cbse-class-12', subjects: [cbse083Class12, cbse065Class12, cbse802Class12] },
  },
};

export const getCBSECurriculum = (classNumber, subjectCode) => {
  const targetClass = cbseCurriculum2026_27.classes[classNumber];
  if (!targetClass) return null;
  return targetClass.subjects.find((subject) => subject.code === String(subjectCode)) ?? null;
};

export const getAllCBSE2026_27Classes = () =>
  Object.entries(cbseCurriculum2026_27.classes).map(([classNumber, data]) => ({
    classNumber: Number(classNumber), ...data,
  }));

export default cbseCurriculum2026_27;
