/**
 * Small, UI-safe CBSE 2026-27 content registry.
 * The canonical curriculum data remains in curriculum-2026-27.js.
 * This file exists to prevent the generic Java subject from being used by CBSE routes.
 */

export const CBSE_SUBJECT_CONTENT_2026_27 = {
  '402': {
    9: { label: 'Information Technology (402)', role: 'skill-subject', route: '/cbse/class/9/subject/402' },
    10: { label: 'Information Technology (402)', role: 'skill-subject', route: '/cbse/class/10/subject/402' },
  },
  '083': {
    11: { label: 'Computer Science (083)', role: 'Python + Computer Science', route: '/cbse/class/11/subject/083' },
    12: { label: 'Computer Science (083)', role: 'Python + Computer Science', route: '/cbse/class/12/subject/083' },
  },
  '065': {
    11: { label: 'Informatics Practices (065)', role: 'Python + Pandas + Matplotlib + SQL', route: '/cbse/class/11/subject/065' },
    12: { label: 'Informatics Practices (065)', role: 'Python + Pandas + Matplotlib + SQL', route: '/cbse/class/12/subject/065' },
  },
  '802': {
    11: { label: 'Information Technology (802)', role: 'skill-subject', route: '/cbse/class/11/subject/802' },
    12: { label: 'Information Technology (802)', role: 'skill-subject', route: '/cbse/class/12/subject/802' },
  },
};

export const getCBSESubjectContent = (classNumber, subjectCode) =>
  CBSE_SUBJECT_CONTENT_2026_27[String(subjectCode)]?.[Number(classNumber)] ?? null;

export default CBSE_SUBJECT_CONTENT_2026_27;
