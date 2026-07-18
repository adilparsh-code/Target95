"use client";

import { useMemo, useState } from "react";
import useProgress from "../hooks/useProgress";
import SearchBar from "./SearchBar";
import QuestionFilters from "./QuestionFilters";
import QuestionListItem from "./QuestionListItem";
import { filterQuestions } from "../../lib/questionFilters";

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
      <section className="mt-10 rounded-2xl border border-gray-200 bg-slate-50 p-6" aria-labelledby="question-browser-heading">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 id="question-browser-heading" className="text-lg font-bold text-gray-900">🔎 Find Questions</h3>
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
      </section>

      <div className="mt-6 space-y-5" role="list" aria-label="Question list">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => {
            const completed = isCompleted({ chapter, questionId: q.id });

            return (
              <div key={q.id} role="listitem">
                <QuestionListItem chapter={chapter} question={q} completed={completed} />
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
