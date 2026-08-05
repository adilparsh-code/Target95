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

export default function QuestionPlayer({
  question,
  chapter,
  chapterQuestions,
  currentIndex,
  previousQuestion,
  nextQuestion,
}) {
  const { markCompleted } = useProgress();
  const [wrongAnswerContext, setWrongAnswerContext] = useState(null);

  useEffect(() => {
    markCompleted({ chapter, questionId: question.id });
  }, [chapter, markCompleted, question.id]);

  const handleExplainWithAI = (context) => {
    setWrongAnswerContext(context);
    // The AI Tutor panel will use this context
  };

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
        
        <Link 
           href="/Java" 
           className="mt-3 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
         >
           <ChevronLeft className="w-4 h-4" />
           Back to Chapters
         </Link>

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
          <MCQQuestion 
            question={{ ...question, question: questionText }} 
            onExplainWithAI={handleExplainWithAI}
          />
        ) : (
          <>
            <QuestionCard question={questionText} />
            <AnswerBox answer={answer} explanation={question.explanation || question.flowExplanation} />
          </>
        )}

        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Jump to Question</h3>

          <div className="flex flex-wrap gap-2">
            {chapterQuestions.map((q, index) => (
              <Link
                key={q.id}
                href={`/Java/${chapter}/question/${q.id}`}
                className={`flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full font-bold text-sm transition ${
                  q.id === question.id ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
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
                href={`/Java/${chapter}/question/${previousQuestion.id}`}
                className="flex items-center gap-2 px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">Previous</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Question {previousQuestion.id}</span>
                </div>
              </Link>
            ) : null}
          </div>

          <div>
            {nextQuestion ? (
              <Link
                href={`/Java/${chapter}/question/${nextQuestion.id}`}
                className="flex items-center gap-2 px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-gray-700/50 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group ml-auto"
              >
                <div className="text-right">
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">Next</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Question {nextQuestion.id}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </Link>
            ) : (
              <Link 
                 href="/Java" 
                 className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl border border-green-400/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group ml-auto"
               >
                 <div className="text-right">
                   <span className="text-xs text-green-100 block">Complete!</span>
                   <span className="text-sm font-semibold">Finish Chapter</span>
                 </div>
                 <ChevronRight className="w-5 h-5 text-green-100 group-hover:translate-x-1 transition-transform" />
                </Link>
            )}
          </div>
        </div>
      </div>
      </div>
      <Footer />
      <QuestionTutorPanel question={question} wrongAnswerContext={wrongAnswerContext} />
    </main>
  );
}