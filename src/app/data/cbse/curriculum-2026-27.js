export const CBSE_CURRICULUM_SESSION = '2026-27';

const tracks = {
  402: [9, 10],
  083: [11, 12],
  065: [11, 12],
  802: [11, 12],
};

const subjects = {
  9: {
    '402': { code: '402', id: 'cbse-402-class-9', name: 'Information Technology', syllabusSource: 'CBSE 402 Information Technology Class IX 2026-27', sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-IX.pdf', category: 'skill-subject', pythonRole: 'none', assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 }, parts: { partA: { name: 'Employability Skills', units: [] }, partB: { name: 'Subject Specific Skills', units: [] } }, practicalAssessment: { practicalExamination: 15, writtenTest: 10, vivaVoce: 10, practicalFileStudentPortfolio: 10, projectVivaVoce: 5 } },
  },
  10: {
    '402': { code: '402', id: 'cbse-402-class-10', name: 'Information Technology', syllabusSource: 'CBSE 402 Information Technology Class X 2026-27', sourceUrl: 'https://cbseacademic.nic.in/web_material/Curriculum27/sec/402-IT-X.pdf', category: 'skill-subject', pythonRole: 'none', assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 }, parts: { partA: { name: 'Employability Skills', units: [] }, partB: { name: 'Subject Specific Skills', units: [] } }, practicalAssessment: { practicalExamination: 20, vivaVoce: 10, projectWorkFieldVisit: 10, portfolioPracticalFile: 10 } },
  },
  11: {
    '083': { code: '083', id: 'cbse-083-class-11', name: 'Computer Science', syllabusSource: 'CBSE Computer Science 083 Class XI 2026-27', sourceUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Computer_Science_SecP2_2026-27.pdf', category: 'academic-subject', pythonRole: 'core-programming', assessment: { theoryMarks: 70, practicalMarks: 30, totalMarks: 100 }, parts: { partA: { name: 'Computer Systems and Organisation', units: [] }, partB: { name: 'Computational Thinking and Programming-I', units: [] } }, practicalAssessment: { practicalExamination: 30 } },
    '065': { code: '065', id: 'cbse-065-class-11', name: 'Informatics Practices', syllabusSource: 'CBSE Informatics Practices 065 Class XI 2026-27', sourceUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Informatics_Practices_SecP2_2026-27.pdf', category: 'academic-subject', pythonRole: 'programming-and-data-handling', pythonLibraries: ['Pandas', 'Matplotlib'], assessment: { theoryMarks: 70, practicalMarks: 30, totalMarks: 100 }, parts: { partA: { name: 'Computer System', units: [] }, partB: { name: 'Python and Data Management', units: [] } }, practicalAssessment: { practicalExamination: 30 } },
    '802': { code: '802', id: 'cbse-802-class-11', name: 'Information Technology', syllabusSource: 'CBSE Information Technology 802 Class XI 2026-27', sourceUrl: 'https://cbseacademic.nic.in/', category: 'skill-subject', pythonRole: 'none', assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 }, parts: { partA: { name: 'Employability Skills', units: [] }, partB: { name: 'Subject Specific Skills', units: [] } }, practicalAssessment: { practicalExamination: 30 } },
  },
  12: {
    '083': { code: '083', id: 'cbse-083-class-12', name: 'Computer Science', syllabusSource: 'CBSE Computer Science 083 Class XII 2026-27', sourceUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SrSec/Computer_Science_SrSec_2026-27.pdf', category: 'academic-subject', pythonRole: 'core-programming', assessment: { theoryMarks: 70, practicalMarks: 30, totalMarks: 100 }, parts: { partA: { name: 'Computational Thinking and Programming-II', units: [] }, partB: { name: 'Computer Networks', units: [] } }, practicalAssessment: { practicalExamination: 30 } },
    '065': { code: '065', id: 'cbse-065-class-12', name: 'Informatics Practices', syllabusSource: 'CBSE Informatics Practices 065 Class XII 2026-27', sourceUrl: 'https://cbseacademic.nic.in/', category: 'academic-subject', pythonRole: 'programming-and-data-handling', pythonLibraries: ['Pandas', 'Matplotlib'], assessment: { theoryMarks: 70, practicalMarks: 30, totalMarks: 100 }, parts: { partA: { name: 'Data Handling using Pandas', units: [] }, partB: { name: 'Database Query using SQL', units: [] } }, practicalAssessment: { practicalExamination: 30 } },
    '802': { code: '802', id: 'cbse-802-class-12', name: 'Information Technology', syllabusSource: 'CBSE Information Technology 802 Class XII 2026-27', sourceUrl: 'https://cbseacademic.nic.in/', category: 'skill-subject', pythonRole: 'none', assessment: { theoryMarks: 50, practicalMarks: 50, totalMarks: 100 }, parts: { partA: { name: 'Employability Skills', units: [] }, partB: { name: 'Subject Specific Skills', units: [] } }, practicalAssessment: { practicalExamination: 30 } },
  },
};

export const cbseCurriculum2026_27 = {
  board: 'CBSE', session: CBSE_CURRICULUM_SESSION,
  classes: Object.fromEntries(Object.entries(subjects).map(([classNumber, subjectMap]) => [classNumber, { classId: `cbse-class-${classNumber}`, subjects: Object.values(subjectMap) }])),
};

export const getCBSECurriculum = (classNumber, subjectCode) => subjects[classNumber]?.[String(subjectCode)] ?? null;
export const getAllCBSE2026_27Classes = () => Object.entries(cbseCurriculum2026_27.classes).map(([classNumber, data]) => ({ classNumber: Number(classNumber), ...data }));
export default cbseCurriculum2026_27;
