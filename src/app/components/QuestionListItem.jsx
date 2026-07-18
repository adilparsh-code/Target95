"use client";

import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import { getDifficultyColorClass, getQuestionTypeColorClass } from "../../lib/questionPresentation";

export default function QuestionListItem({ chapter, question, completed }) {
  return (
    <div className="relative">
      <Link
        href={`/java/${chapter}/question/${question.id}`}
        className={`block rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg ${
          completed ? "border-green-300 bg-green-50" : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex items-start justify-between gap-4 pr-12">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">Question {question.id}</h3>
            <p className="mt-2 text-gray-900">{question.question}</p>
          </div>

          <div className="flex flex-col gap-2">
            <span
              className={`rounded-full px-3 py-1 text-center text-xs font-semibold ${getQuestionTypeColorClass(question.type)}`}
            >
              {String(question.type ?? "").toUpperCase()}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-center text-xs font-semibold ${getDifficultyColorClass(question.difficulty)}`}
            >
              {question.difficulty}
            </span>
          </div>
        </div>
      </Link>

      <BookmarkButton chapter={chapter} questionId={question.id} className="absolute right-5 top-5" />
    </div>
  );
}
