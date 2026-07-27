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
import Navbar from "./Navbar";
import Footer from "./Footer";
import QuestionTutorPanel from "./ai-tutor/QuestionTutorPanel";

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

  const chapterLabel = String(chapter).replace(/-/g, " ");
  const questionText = question.prompt || question.question;
  const answer = question.modelAnswer || question.javaSolution || question.answer || question.solution;
  const isMultipleChoice = question.type === "mcq" || (Array.isArray(question.options) && question.options.length > 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="rounded-2xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8 lg:p-10">
        <p className="text-sm text-gray-500">Home / Java / {chapterLabel}</p>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl font-bold text-blue-700">📘 Question {question.id}</h1>

          <div className="flex items-center gap-3">
            <DifficultyBadge difficulty={question.difficulty} />
            <BookmarkButton chapter={chapter} questionId={question.id} />
          </div>
        </div>

        <div className="mt-8">
          <ProgressBar current={currentIndex + 1} total={chapterQuestions.length} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          <span>{question.type}</span>
          {question.topic ? <span>• {question.topic}</span> : null}
          {question.marks ? <span>• {question.marks} marks</span> : null}
        </div>

        {isMultipleChoice ? (
          <MCQQuestion question={{ ...question, question: questionText }} />
        ) : (
          <>
            <QuestionCard question={questionText} />
            <AnswerBox answer={answer} explanation={question.explanation || question.flowExplanation} />
          </>
        )}

        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Jump to Question</h3>

          <div className="flex flex-wrap gap-3">
            {chapterQuestions.map((q) => (
              <Link
                key={q.id}
                href={`/java/${chapter}/question/${q.id}`}
                className={`flex h-12 w-12 items-center justify-center rounded-full font-bold transition ${
                  q.id === question.id ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {q.id}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {previousQuestion ? (
              <Link
                href={`/java/${chapter}/question/${previousQuestion.id}`}
                className="inline-flex rounded-xl bg-gray-700 px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                ← Previous
              </Link>
            ) : null}
          </div>

          <div>
            {nextQuestion ? (
              <Link
                href={`/java/${chapter}/question/${nextQuestion.id}`}
                className="inline-flex rounded-xl bg-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                Next →
              </Link>
            ) : (
              <Link href="/java" className="inline-flex rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700">
                🎉 Finish Chapter
              </Link>
            )}
          </div>
        </div>
      </div>
      </div>
      <Footer />
      <QuestionTutorPanel question={question} />
    </main>
  );
}
