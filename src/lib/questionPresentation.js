export const DIFFICULTY_COLOR_CLASSES = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

export const QUESTION_TYPE_COLOR_CLASSES = {
  mcq: "bg-purple-100 text-purple-700",
  theory: "bg-blue-100 text-blue-700",
  default: "bg-slate-100 text-slate-700",
};

export function getDifficultyColorClass(difficulty) {
  const normalizedDifficulty = String(difficulty ?? "")
    .trim()
    .toLowerCase();

  return DIFFICULTY_COLOR_CLASSES[normalizedDifficulty] ?? "bg-gray-100 text-gray-700";
}

export function getQuestionTypeColorClass(type) {
  const normalizedType = String(type ?? "")
    .trim()
    .toLowerCase();

  return QUESTION_TYPE_COLOR_CLASSES[normalizedType] ?? QUESTION_TYPE_COLOR_CLASSES.default;
}
