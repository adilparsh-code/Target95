/**
 * Target95 CBSE curriculum map for session 2026-27.
 * Source of truth: official CBSE curriculum pages/PDFs.
 */

export const CBSE_CURRICULUM_SESSION = '2026-27';

const seniorTrack = (code, name, category, pythonRole, pythonLibraries = []) => ({
  code,
  id: `cbse-${code}-senior-secondary`,
  name,
  category,
  syllabusSource: `CBSE ${code} ${name} 2026-27`,
  sourceUrl: 'https://cbseacademic.nic.in/',
  pythonRole,
  pythonLibraries,
  assessment: { theoryMarks: 70, practicalMarks: 30, totalMarks: 100 },
  parts: {
    partA: { name: 'Curriculum content', units: [] },
    partB: { name: 'Detailed topics', units: [] },
  },
  practicalAssessment: { practicalExamination: 30 },
});

const cbse402Class9 = {
  code: '402', id: 'cbse-402-class-9', name: 'Information Technology', category: 'skill-subject',
  syllabusSource: 'CBSE 402 Information Technology Class IX 2026-27',
  sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-IX.pdf', pythonRole: 'none',
  assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
  parts: { partA: { name: 'Employability Skills', units: [
    { id: '402-ix-a1', code: '1', name: 'Communication Skills-I', hours: { theory: 6, practical: 4 }, marks: 2 },
    { id: '402-ix-a2', code: '2', name: 'Self-Management Skills-I', hours: { theory: 6, practical: 4 }, marks: 3 },
    { id: '402-ix-a3', code: '3', name: 'Basic ICT Skills-I', hours: { theory: 6, practical: 4 }, marks: 1 },
    { id: '402-ix-a4', code: '4', name: 'Entrepreneurial Skills-I', hours: { theory: 10, practical: 5 }, marks: 3 },
    { id: '402-ix-a5', code: '5', name: 'Green Skills-I', hours: { theory: 3, practical: 2 }, marks: 1 },
  ] }, partB: { name: 'Subject Specific Skills', units: [] } }, practicalAssessment: { practicalExamination: 15, writtenTest: 10, vivaVoce: 10, practicalFileStudentPortfolio: 10, projectVivaVoce: 5 },
};

const cbse402Class10 = {
  code: '402', id: 'cbse-402-class-10', name: 'Information Technology', category: 'skill-subject',
  syllabusSource: 'CBSE 402 Information Technology Class X 2026-27',
  sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-X.pdf', pythonRole: 'none',
  assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 },
  parts: { partA: { name: 'Employability Skills', units: [] }, partB: { name: 'Subject Specific Skills', units: [] } },
  practicalAssessment: { practicalExamination: 20, vivaVoce: 10, projectWorkFieldVisit: 10, portfolioPracticalFile: 10 },
};

const cbse083Class11 = { ...seniorTrack('083', 'Computer Science', 'academic-subject', 'core-programming') };
const cbse083Class12 = { ...seniorTrack('083', 'Computer Science', 'academic-subject', 'core-programming') };
const cbse065Class11 = { ...seniorTrack('065', 'Informatics Practices', 'academic-subject', 'programming-and-data-handling', ['Pandas', 'Matplotlib']) };
const cbse065Class12 = { ...seniorTrack('065', 'Informatics Practices', 'academic-subject', 'programming-and-data-handling', ['Pandas', 'Matplotlib']) };
const cbse802Class11 = { ...seniorTrack('802', 'Information Technology', 'skill-subject', 'none') };
const cbse802Class12 = { ...seniorTrack('802', 'Information Technology', 'skill-subject', 'none') };

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
