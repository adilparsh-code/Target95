"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
import { usePersonalization } from "../hooks/usePersonalization";

const BOARD_ROUTE_MAP = {
  ICSE: "/Java",
  ISC: "/Java",
  CBSE: "/cbse",
};

const BOARD_LABEL_MAP = {
  ICSE: "ICSE",
  ISC: "ISC",
  CBSE: "CBSE",
};

function getBoardKey(board) {
  return String(board || "ICSE").trim().toUpperCase();
}

export default function QuestionPlayer({
  question,
  chapter,
  chapterQuestions,
  currentIndex,
  previousQuestion,
  nextQuestion,
  board: boardProp,
  basePath: basePathProp,
}) {
  const { markCompleted } = useProgress();
  const [wrongAnswerContext, setWrongAnswerContext] = useState(null);
  const { board: personalizedBoard, class: classData, subject } = usePersonalization();
  const board = getBoardKey(boardProp || personalizedBoard);
  const basePath = basePathProp || BOARD_ROUTE_MAP[board] || "/Java";
  const boardLabel = BOARD_LABEL_MAP[board] || board;

  useEffect(() => {
    markCompleted({ chapter, questionId: question.id });
  }, [chapter, markCompleted, question.id]);

  const handleExplainWithAI = (context) => {
    setWrongAnswerContext(context);
  };

  const chapterLabel = String(chapter).replace(/-/g, " ");
  const questionText = question.prompt || question.question;
  const answer =
    question.modelAnswer ||
    question.solution ||
    question.answer ||
    question.javaSolution;
  const isMultipleChoice =
    question.type === "mcq" ||
    (Array.isArray(question.options) && question.options.length > 0);

  const buildQuestionPath = (questionId) =>
    `${basePath}/${chapter}/question/${questionId}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="rounded-2xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-8 lg:p-10">
          <p className="text-sm text-gray-500">
            Home / {boardLabel} / {chapterLabel}
          </p>

          <Link
            href={basePath}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Chapters
          </Link>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-4xl font-bold text-blue-700">
              📘 Question {question.id}
            </h1>

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
            {question.subjectCode ? (
              <span>• Code {question.subjectCode}</span>
            ) : null}
          </div>

          {isMultipleChoice ? (
            <MCQQuestion
              question={{ ...question, question: questionText }}
              onExplainWithAI={handleExplainWithAI}
            />
          ) : (
            <>
              <QuestionCard question={questionText} />
              <AnswerBox
                answer={answer}
                explanation={question.explanation || question.flowExplanation}
              />
            </>
          )}

          <div className="mt-10">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Jump to Question
            </h3>

            <div className="flex flex-wrap gap-2">
              {chapterQuestions.map((q, index) => (
                <Link
                  key={q.id}
                  href={buildQuestionPath(q.id)}
                  className={`flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full font-bold text-sm transition ${
                    q.id === question.id
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                  }`}
                  aria-label={`Go to question ${index + 1}`}
                >
                  {index + 1}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {previousQuestion ? (
                <Link
                  href={buildQuestionPath(previousQuestion.id)}
                  className="group flex items-center gap-2 rounded-2xl border border-white/50 bg-white/80 px-6 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80 dark:hover:border-blue-600"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  <div>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">Previous</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Question {previousQuestion.id}
                    </span>
                  </div>
                </Link>
              ) : null}
            </div>

            <div>
              {nextQuestion ? (
                <Link
                  href={buildQuestionPath(nextQuestion.id)}
                  className="group ml-auto flex items-center gap-2 rounded-2xl border border-white/50 bg-white/80 px-6 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80 dark:hover:border-blue-600"
                >
                  <div className="text-right">
                    <span className="block text-xs text-gray-500 dark:text-gray-400">Next</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Question {nextQuestion.id}
                    </span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </Link>
              ) : (
                <Link
                  href={basePath}
                  className="group ml-auto flex items-center gap-2 rounded-2xl border border-green-400/50 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="text-right">
                    <span className="block text-xs text-green-100">Complete!</span>
                    <span className="text-sm font-semibold">Finish Chapter</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-green-100 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <QuestionTutorPanel
        question={question}
        wrongAnswerContext={wrongAnswerContext}
        personalization={{
          board,
          class: classData,
          subject,
          chapter,
          questionType: question?.type,
        }}
      />
    </main>
  );
}
