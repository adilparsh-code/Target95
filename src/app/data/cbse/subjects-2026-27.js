export const CBSE_CURRICULUM_SESSION = '2026-27';

export const cbseSubjectTracks = [
  { id: 'cbse-402', code: '402', name: 'Information Technology', classLevels: [9, 10], category: 'skill-subject', pythonRole: 'none' },
  { id: 'cbse-083', code: '083', name: 'Computer Science', classLevels: [11, 12], category: 'academic-subject', pythonRole: 'core-programming', pythonLibraries: [] },
  { id: 'cbse-065', code: '065', name: 'Informatics Practices', classLevels: [11, 12], category: 'academic-subject', pythonRole: 'programming-and-data-handling', pythonLibraries: ['Pandas', 'Matplotlib'] },
  { id: 'cbse-802', code: '802', name: 'Information Technology', classLevels: [11, 12], category: 'skill-subject', pythonRole: 'none' },
];

export const getCBSESubjectTrack = (code) => cbseSubjectTracks.find((subject) => subject.code === String(code)) ?? null;
export default cbseSubjectTracks;
