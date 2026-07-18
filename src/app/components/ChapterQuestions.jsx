"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import useProgress from "../hooks/useProgress";
import SearchBar from "./SearchBar";
import QuestionFilters from "./QuestionFilters";
import { filterQuestions } from "../../lib/questionFilters";

const DIFFICULTY_COLOR_CLASSES = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

const QUESTION_TYPE_COLOR_CLASSES = {
  mcq: "bg-purple-100 text-purple-700",
  theory: "bg-blue-100 text-blue-700",
  default: "bg-slate-100 text-slate-700",
};

function getDifficultyColorClass(difficulty) {
  return (
    DIFFICULTY_COLOR_CLASSES[difficulty.toLowerCase()] ??
    "bg-gray-100 text-gray-700"
  );
}

function getQuestionTypeColorClass(type) {
  return QUESTION_TYPE_COLOR_CLASSES[type?.toLowerCase()] ?? QUESTION_TYPE_COLOR_CLASSES.default;
}

export default function ChapterQuestions({ chapter, questions }) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [type, setType] = useState("all");
  const { isCompleted } = useProgress();

  const filteredQuestions = useMemo(() => {
    return filterQuestions({
      questions,
      search,
      difficulty,
      type,
    });
  }, [difficulty, questions, search, type]);

  return (
    <>
      <div className="mt-10 rounded-2xl border border-gray-200 bg-slate-50 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">🔎 Find Questions</h3>
            <p className="text-sm text-gray-900">
              Filter by keyword, difficulty, or question type.
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-900">
            Showing <span className="text-gray-900">{filteredQuestions.length}</span> of {questions.length}
          </p>
        </div>

        <SearchBar search={search} setSearch={setSearch} />

        <QuestionFilters
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          type={type}
          setType={setType}
        />
      </div>

      <div className="mt-6 space-y-5">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => {
            const completed = isCompleted({ chapter, questionId: q.id });

            return (
              <div key={q.id} className="relative">
                <Link
                  href={`/java/${chapter}/question/${q.id}`}
                  className={`block rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg ${
                    completed
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 pr-12">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">Question {q.id}</h3>
                      <p className="mt-2 text-gray-900">{q.question}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-center text-xs font-semibold ${getQuestionTypeColorClass(q.type)}`}
                      >
                        {q.type.toUpperCase()}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-center text-xs font-semibold ${getDifficultyColorClass(q.difficulty)}`}
                      >
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                </Link>

                <BookmarkButton
                  chapter={chapter}
                  questionId={q.id}
                  className="absolute right-5 top-5"
                />
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900">No Questions Found</h3>
            <p className="mt-2 text-gray-900">
              Try a different keyword, or reset the filters to see the full list.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
