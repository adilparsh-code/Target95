import { cbseSubjectTracks } from './subjects-2026-27';

const byId = (trackId, classId) => ({
  ...cbseSubjectTracks.find((subject) => subject.id === trackId),
  id: `${trackId}-${classId.replace('cbse-class-', 'class-')}`,
  classId,
});

export const cbseSubjects = [
  byId('cbse-402', 'cbse-class-9'),
  byId('cbse-402', 'cbse-class-10'),
  byId('cbse-083', 'cbse-class-11'),
  byId('cbse-083', 'cbse-class-12'),
  byId('cbse-065', 'cbse-class-11'),
  byId('cbse-065', 'cbse-class-12'),
  byId('cbse-802', 'cbse-class-11'),
  byId('cbse-802', 'cbse-class-12'),
];

export { cbseSubjectTracks };
export default cbseSubjects;
