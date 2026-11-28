"use client";

import React, { useState } from "react";
import Badge from "../ui/Badge";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import BookmarkButton from "./BookmarkButton";
import CompletionToggle from "./CompletionToggle";
import ReportIssueModal from "./ReportIssueModal";
import Link from "next/link";
import {
  QUESTION_PREVIEW_LIMIT,
  getQuestionHref,
  getVisibleQuestions,
} from "../../../lib/study/chapterSections.mjs";

const difficultyVariants = {
  Easy: "secondary",
  Medium: "default",
  Hard: "destructive",
};

const typeLabels = {
  mcq: "Multiple Choice",
  theory: "Theory",
  programming: "Programming",
};

export default function QuestionSection({ chapter, questions }) {
  const [reportModal, setReportModal] = useState(null);
  const [expandedExplanations, setExpandedExplanations] = useState({});
  const [showAll, setShowAll] = useState(false);
  const total = Array.isArray(questions) ? questions.length : 0;
  const visibleQuestions = getVisibleQuestions(questions, showAll);

  const toggleExplanation = (id) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Practice Questions</h2>
          <p className="mt-1 text-sm text-gray-600">
            {total} question{total !== 1 ? "s" : ""} for this chapter
          </p>
        </div>
        {total > 0 && (
          <Link
            href={getQuestionHref(questions[0], chapter)}
            className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Practice All
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {total > 0 ? (
          visibleQuestions.map((q) => (
            <div
              key={q.id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-blue-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge
                      variant={difficultyVariants[q.difficulty] || "default"}
                      className="text-[10px] px-2 py-0.5"
                    >
                      {q.difficulty}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {typeLabels[q.questionType || q.type] || q.questionType || q.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 leading-relaxed">
                    {q.question && q.question.length > 200
                      ? q.question.substring(0, 200) + "..."
                      : q.question}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {q.tags && q.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href={getQuestionHref(q, chapter)}
                    className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    Solve
                  </Link>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 border-t border-gray-200 pt-3 flex-wrap">
                <BookmarkButton questionId={q.id} chapter={chapter} />
                <CompletionToggle questionId={q.id} />
                <button
                  type="button"
                  onClick={() => toggleExplanation(q.id)}
                  className="rounded-xl bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-200"
                >
                  {expandedExplanations[q.id] ? "Hide Explanation" : "Explanation"}
                </button>
                <button
                  type="button"
                  onClick={() => setReportModal(q.id)}
                  className="rounded-xl bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-200"
                >
                  Report
                </button>
              </div>

              {expandedExplanations[q.id] && q.explanation && (
                <div className="mt-3 rounded-xl bg-blue-50 p-3 text-sm text-gray-700">
                  <span className="font-semibold text-blue-800">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-500">
              No questions available for this chapter yet.
            </p>
          </div>
        )}
      </div>

      {total > QUESTION_PREVIEW_LIMIT && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            {showAll
              ? `Show first ${QUESTION_PREVIEW_LIMIT} only`
              : `View all ${total} questions`}
            <ChevronRightIcon className={`h-4 w-4 transition-transform ${showAll ? "-rotate-90" : "rotate-90"}`} />
          </button>
        </div>
      )}

      {reportModal && (
        <ReportIssueModal
          isOpen={!!reportModal}
          onClose={() => setReportModal(null)}
          questionId={reportModal}
          chapter={chapter}
        />
      )}
    </section>
  );
}