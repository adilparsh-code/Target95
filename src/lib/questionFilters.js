export function normalizeFilterValue(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function filterQuestions({ questions, search = "", difficulty = "all", type = "all" }) {
  const keyword = normalizeFilterValue(search);

  return questions.filter((question) => {
    const normalizedDifficulty = normalizeFilterValue(question.difficulty);
    const normalizedType = normalizeFilterValue(question.type);
    const searchableText = [
      question.question,
      question.answer,
      question.chapter,
      question.id,
      normalizedType,
      normalizedDifficulty,
      Array.isArray(question.options) ? question.options.join(" ") : "",
    ]
      .filter(Boolean)
      .join(" ");

    const matchesSearch =
      !keyword || normalizeFilterValue(searchableText).includes(keyword);

    const matchesDifficulty =
      difficulty === "all" || normalizedDifficulty === normalizeFilterValue(difficulty);

    const matchesType = type === "all" || normalizedType === normalizeFilterValue(type);

    return matchesSearch && matchesDifficulty && matchesType;
  });
}
