/**
 * Target95 CBSE curriculum map for session 2026-27.
 * Source of truth: official CBSE curriculum pages/PDFs.
 */

// Import complete class data with units and chapters
import legacyCBSEClass11 from './classes/class11/index.js';
import legacyCBSEClass12 from './classes/class12/index.js';
import CBSE_402_CLASS9_2026_27 from './class9-402-2026-27-sources.js';

export const CBSE_CURRICULUM_SESSION = '2026-27';

const class9PartAUnits = CBSE_402_CLASS9_2026_27.partA.units.map(unit => ({ id: `402-ix-a${unit.code}`, code: String(unit.code), name: unit.title, learningOutcomes: [], theory: [], practicalActivities: [], chapters: [], hours: unit.hours, marks: unit.marks }));
const class9PartBUnits = CBSE_402_CLASS9_2026_27.partB.units.map(unit => ({ id: `402-ix-b${unit.code}`, code: String(unit.code), name: unit.title, learningOutcomes: [], theory: [], practicalActivities: [], chapters: [], hours: { theory: unit.theoryHours, practical: unit.practicalHours }, marks: unit.marks }));

const cbse402Class9 = {
  code: '402', id: 'cbse-402-class-9', name: 'Information Technology', category: 'skill-subject',
  syllabusSource: 'CBSE 402 Information Technology Class IX 2026-27',
  sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-IX.pdf', pythonRole: 'none',
  assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
  parts: { partA: { name: 'Employability Skills', units: class9PartAUnits }, partB: { name: 'Subject Specific Skills', units: class9PartBUnits } },
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
  sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-X.pdf', pythonRole: 'none',
  assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
  parts: { partA: { name: 'Employability Skills', units: class10PartAUnits }, partB: { name: 'Subject Specific Skills', units: class10PartBUnits } },
  practicalAssessment: { practicalExamination: 20, vivaVoce: 10, projectWorkFieldVisit: 10, portfolioPracticalFile: 10 },
};

const class11Units = legacyCBSEClass11.units.map(unit => ({ id: unit.id, code: String(unit.unitNumber), name: unit.title, learningOutcomes: unit.chapters?.flatMap(ch => ch.learningObjectives || []) || [], theory: unit.chapters?.map(ch => ch.title) || [], practicalActivities: unit.chapters?.filter(ch => ch.metadata?.isPractical).map(ch => ch.title) || [], chapters: unit.chapters || [] }));
const class12Units = legacyCBSEClass12?.units?.map(unit => ({ id: unit.id, code: String(unit.unitNumber), name: unit.title, learningOutcomes: unit.chapters?.flatMap(ch => ch.learningObjectives || []) || [], theory: unit.chapters?.map(ch => ch.title) || [], practicalActivities: unit.chapters?.filter(ch => ch.metadata?.isPractical).map(ch => ch.title) || [], chapters: unit.chapters || [] })) || [];

const seniorTrack = (code, name, category, pythonRole, pythonLibraries = []) => ({
  code, id: `cbse-${code}-senior-secondary`, name, category,
  syllabusSource: `CBSE ${code} ${name} 2026-27`, sourceUrl: 'https://cbseacademic.nic.in/', pythonRole, pythonLibraries,
  assessment: { theoryMarks: 70, practicalMarks: 30, totalMarks: 100 },
  parts: { partA: { name: 'Curriculum content', units: [] }, partB: { name: 'Detailed topics', units: [] } },
  practicalAssessment: { practicalExamination: 30 },
});

const cbse083Class11 = { ...seniorTrack('083', 'Computer Science', 'academic-subject', 'core-programming'), parts: { partA: { name: 'Core Curriculum', units: class11Units }, partB: { name: 'Practical Topics', units: [] } } };
const cbse083Class12 = { ...seniorTrack('083', 'Computer Science', 'academic-subject', 'core-programming'), parts: { partA: { name: 'Core Curriculum', units: class12Units }, partB: { name: 'Practical Topics', units: [] } } };
// Do not reuse Computer Science units for IP/IT. Keep these records empty until their dedicated 2026-27 datasets are verified.
const cbse065Class11 = seniorTrack('065', 'Informatics Practices', 'academic-subject', 'programming-and-data-handling', ['Pandas', 'Matplotlib']);
const cbse065Class12 = seniorTrack('065', 'Informatics Practices', 'academic-subject', 'programming-and-data-handling', ['Pandas', 'Matplotlib']);
const cbse802Class11 = seniorTrack('802', 'Information Technology', 'skill-subject', 'none');
const cbse802Class12 = seniorTrack('802', 'Information Technology', 'skill-subject', 'none');

export const cbseCurriculum2026_27 = {
  board: 'CBSE', session: CBSE_CURRICULUM_SESSION,
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
  return targetClass.subjects.find((s) => s.code === String(subjectCode)) ?? null;
};

export default cbseCurriculum2026_27;
