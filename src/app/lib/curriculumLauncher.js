import { cbseSubjectTracks } from "../data/cbse/subjects";
import { cisceCurricula } from "../data/boardprep/cisceCurricula";

// CISCE subject options come from the BoardPrep class registries (generated into
// cisceCurricula), so the launcher never advertises subjects the board curriculum
// does not register and every option opens a BoardPrep route instead of an
// unrelated Java/AI learning path.
const CISCE_BY_CLASS = Object.fromEntries(cisceCurricula.map((item) => [item.id, item]));
const SUBJECT_ICONS = { "computer-applications": "☕", "computer-science": "⌨" };

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

// BoardPrep class page for a launcher selection; null when the board has none.
export function getClassHref(board, classId) {
  return board === "cisce" ? CISCE_BY_CLASS[classId]?.href || null : null;
}

export function getSubjectsForBoardClass(board, classId) {
  if (board === "cisce") {
    const curriculum = CISCE_BY_CLASS[classId];
    if (!curriculum) return [];
    return curriculum.subjects.map((subject) => ({
      id: subject.id,
      label: subject.label,
      detail: curriculum.title,
      icon: SUBJECT_ICONS[subject.id] || "▣",
      href: subject.href,
    }));
  }
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
