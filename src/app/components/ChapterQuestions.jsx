"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import QuestionFilters from "./QuestionFilters";

const DIFFICULTY_COLOR_CLASSES = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

const QUESTION_TYPE_COLOR_CLASSES = {
  mcq: "bg-purple-100 text-purple-700",
  default: "bg-blue-100 text-blue-700",
};

function getDifficultyColorClass(difficulty) {
  return (
    DIFFICULTY_COLOR_CLASSES[difficulty.toLowerCase()] ??
    "bg-gray-100 text-gray-700"
  );
}

function getQuestionTypeColorClass(type) {
  return QUESTION_TYPE_COLOR_CLASSES[type] ?? QUESTION_TYPE_COLOR_CLASSES.default;
}

export default function ChapterQuestions({ chapter, questions }) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [type, setType] = useState("all");

  const filteredQuestions = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return questions;

    return questions.filter((q) => {
      return (
        q.question.toLowerCase().includes(keyword) ||
        String(q.id).includes(keyword) ||
        q.type.toLowerCase().includes(keyword) ||
        q.difficulty.toLowerCase().includes(keyword)
      );
    });
  }, [questions, search]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />

      <QuestionFilters
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        type={type}
        setType={setType}
      />
      <p className="mb-5 text-sm text-gray-500">
        Showing <span className="font-semibold">{filteredQuestions.length}</span>{" "}
        of{" "}
        <span className="font-semibold">{questions.length}</span> questions
      </p>

      <div className="space-y-5">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <Link
              key={q.id}
              href={`/java/${chapter}/question/${q.id}`}
              className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    Question {q.id}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {q.question}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-center text-xs font-semibold ${getQuestionTypeColorClass(
                      q.type
                    )}`}
                  >
                    {q.type.toUpperCase()}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-center text-xs font-semibold ${getDifficultyColorClass(
                      q.difficulty
                    )}`}
                  >
                    {q.difficulty}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              No Questions Found
            </h3>

            <p className="mt-2 text-gray-500">
              Try searching with another keyword.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
