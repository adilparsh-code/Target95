"use client";

import { useEffect } from "react";
import Link from "next/link";

import QuestionCard from "./QuestionCard";
import AnswerBox from "./AnswerBox";
import MCQQuestion from "./MCQQuestion";
import ProgressBar from "./ProgressBar";
import DifficultyBadge from "./DifficultyBadge";
import BookmarkButton from "./BookmarkButton";
import useProgress from "../hooks/useProgress";

export default function QuestionPlayer({
  question,
  chapter,
  chapterQuestions,
  currentIndex,
  previousQuestion,
  nextQuestion,
}) {
  const { markCompleted } = useProgress();

  useEffect(() => {
    markCompleted({ chapter, questionId: question.id });
  }, [chapter, markCompleted, question.id]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 py-16">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-500">
          Home / Java / {chapter.replace("-", " ")}
        </p>

        {/* Header */}
        <div className="flex justify-between items-center mt-5">
          <h1 className="text-4xl font-bold text-blue-700">
            📘 Question {question.id}
          </h1>

          <div className="flex items-center gap-3">
            <DifficultyBadge difficulty={question.difficulty} />
            <BookmarkButton chapter={chapter} questionId={question.id} />
          </div>
        </div>

        {/* Progress */}
        <ProgressBar
          current={currentIndex + 1}
          total={chapterQuestions.length}
        />

        {/* Question Type */}
        <p className="text-sm font-semibold text-gray-500 uppercase mt-8">
          {question.type}
        </p>

        {/* Question */}
        {question.type === "theory" ? (
          <>
            <QuestionCard question={question.question} />
            <AnswerBox answer={question.answer} />
          </>
        ) : (
          <MCQQuestion question={question} />
        )}

        {/* Jump Palette */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Jump to Question
          </h3>

          <div className="flex gap-3 flex-wrap">
            {chapterQuestions.map((q) => (
              <Link
                key={q.id}
                href={`/java/${chapter}/question/${q.id}`}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
                  q.id === question.id
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {q.id}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <div>
            {previousQuestion && (
              <Link
                href={`/java/${chapter}/question/${previousQuestion.id}`}
                className="bg-gray-700 text-white px-8 py-3 rounded-xl hover:bg-gray-800"
              >
                ← Previous
              </Link>
            )}
          </div>

          <div>
            {nextQuestion ? (
              <Link
                href={`/java/${chapter}/question/${nextQuestion.id}`}
                className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800"
              >
                Next →
              </Link>
            ) : (
              <Link
                href="/java"
                className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
              >
                🎉 Finish Chapter
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
