import { cbseSubjectTracks } from "../data/cbse/subjects";

const CISCE_SUBJECTS = {
  "icse-class-9": [
    { id: "java", label: "Java", detail: "Computer Applications", icon: "☕", href: "/Java" },
    { id: "ai", label: "Artificial Intelligence", detail: "Robotics & AI", icon: "✦", href: "/icse/robotics-ai" },
  ],
  "icse-class-10": [
    { id: "java", label: "Java", detail: "Computer Applications", icon: "☕", href: "/Java" },
    { id: "ai", label: "Artificial Intelligence", detail: "Robotics & AI", icon: "✦", href: "/icse/robotics-ai/class-x" },
  ],
  "isc-class-11": [
    { id: "java", label: "Java", detail: "Computer Science", icon: "☕", href: "/Java" },
    { id: "ai", label: "Artificial Intelligence", detail: "ISC AI 883", icon: "✦", href: "/isc/artificial-intelligence/11" },
  ],
  "isc-class-12": [
    { id: "java", label: "Java", detail: "Computer Science", icon: "☕", href: "/Java" },
    { id: "ai", label: "Artificial Intelligence", detail: "ISC AI 883", icon: "✦", href: "/isc/artificial-intelligence/12" },
  ],
};

export const curriculumClasses = {
  cisce: [
    { id: "icse-class-9", label: "IX", title: "ICSE Class 9" },
    { id: "icse-class-10", label: "X", title: "ICSE Class 10" },
    { id: "isc-class-11", label: "XI", title: "ISC Class 11" },
    { id: "isc-class-12", label: "XII", title: "ISC Class 12" },
  ],
  cbse: [
    { id: "class-9", label: "IX", title: "CBSE Class 9" },
    { id: "class-10", label: "X", title: "CBSE Class 10" },
    { id: "class-11", label: "XI", title: "CBSE Class 11" },
    { id: "class-12", label: "XII", title: "CBSE Class 12" },
  ],
};

const subjectIcon = (code) => code === "843" ? "✦" : code === "065" ? "▦" : "⌨";

export function getSubjectsForBoardClass(board, classId) {
  if (board === "cisce") return CISCE_SUBJECTS[classId] || [];
  if (board !== "cbse") return [];

  const classNumber = Number(String(classId).replace("class-", ""));
  return cbseSubjectTracks
    .filter((subject) => subject.classLevels.includes(classNumber))
    .map((subject) => ({
      id: subject.code,
      label: subject.name,
      detail: `CBSE subject ${subject.code}`,
      icon: subjectIcon(subject.code),
      href: `/cbse/class/${classNumber}/subject/${subject.code}`,
    }));
}
