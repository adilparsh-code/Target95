"use client";

import { useMemo } from "react";
import { programmingQuestions } from "@/app/data/programmingQuestions";

const normalizeValue = (value = "") => String(value).trim().toLowerCase();

export function useProgrammingQuestions(filters = {}) {
  const {
    language = "all",
    difficulty = "all",
    chapter = "all",
    topic = "all",
    search = "",
    limit = 0,
  } = filters;

  const questions = useMemo(() => {
    const keyword = normalizeValue(search);

    let result = [...programmingQuestions];

    if (language !== "all") {
      result = result.filter((question) => normalizeValue(question.language) === normalizeValue(language));
    }

    if (difficulty !== "all") {
      result = result.filter((question) => normalizeValue(question.difficulty) === normalizeValue(difficulty));
    }

    if (chapter !== "all") {
      result = result.filter((question) => normalizeValue(question.chapter) === normalizeValue(chapter));
    }

    if (topic !== "all") {
      result = result.filter((question) => normalizeValue(question.topic) === normalizeValue(topic));
    }

    if (keyword) {
      result = result.filter((question) => {
        const searchableText = [
          question.title,
          question.question,
          question.topic,
          question.chapter,
          question.language,
          question.tags?.join(" "),
        ]
          .filter(Boolean)
          .join(" ");

        return normalizeValue(searchableText).includes(keyword);
      });
    }

    if (limit > 0) {
      return result.slice(0, limit);
    }

    return result;
  }, [language, difficulty, chapter, topic, search, limit]);

  return {
    questions,
    total: questions.length,
  };
}

export default useProgrammingQuestions;
