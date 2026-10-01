"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackEvent, LEARNING_EVENTS } from "@/lib/analyticsEvents";

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

const BOARD_ROUTE_MAP = { ICSE: "/Java", ISC: "/Java", CBSE: "/cbse" };

function getBoardKey(board) { return String(board || "ICSE").trim().toUpperCase(); }

const sampleCode = (question) =>
  question?.code || question?.codeSnippet || question?.program || [
    "public static int binSearch(int[] arr, int key) {",
    "    int low = 0, high = arr.length - 1;",
    "    while (low <= high) {",
    "        int mid = (low + high) / 2;",
    "        if (arr[mid] == key) return mid;",
    "        else if (arr[mid] < key) low = mid;",
    "        else high = mid - 1;",
    "    }",
    "    return -1;",
    "}",
  ].join("\n");

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
  const [navigatorOpen, setNavigatorOpen] = useState(false);

  const board = getBoardKey(boardProp || personalizedBoard);
  const basePath = basePathProp || BOARD_ROUTE_MAP[board] || "/Java";
  const questionText = question.prompt || question.question;
  const answer = question.modelAnswer || question.solution || question.answer || question.javaSolution;
  const isMultipleChoice = question.type === "mcq" || (Array.isArray(question.options) && question.options.length > 0);
  const progress = chapterQuestions.length ? Math.round(((currentIndex + 1) / chapterQuestions.length) * 100) : 0;
  const code = useMemo(() => sampleCode(question), [question]);

  useEffect(() => {
    trackEvent(LEARNING_EVENTS.QUESTION_ATTEMPTED, { chapterId: chapter, questionId: question.id });
  }, [chapter, question.id]);

  const handleExplainWithAI = (context) => setWrongAnswerContext(context);
  const handleQuestionSubmit = () => markCompleted({ chapter, questionId: question.id });
  const buildQuestionPath = (questionId) => `${basePath}/${chapter}/question/${questionId}`;
  const chapterLabel = String(chapter).replace(/-/g, " ");

  return (
    <main className="stitch-question-player min-h-screen bg-[#f8f8fc] text-slate-900">
      <Navbar />

      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 px-4 py-2.5 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs text-slate-700 shadow-sm">
              <strong className="text-blue-700">Q {String(currentIndex + 1).padStart(2, "0")}</strong> /{chapterQuestions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] text-slate-600">schedule {String(Math.max(1, 24 - currentIndex)).padStart(2, "0")}:00</span>
              <button type="button" onClick={() => setNavigatorOpen(true)} className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-700" aria-label="Open question navigator">▦</button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{progress}%</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-2xl px-4 pb-36 pt-4">
        <article className="stitch-surface p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
              <span className="rounded border border-teal-200 bg-teal-50 px-2 py-0.5 text-teal-700">{board} SPECIMEN 2024</span>
              <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-600">SEC B • {question.marks || 5} MARKS</span>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">↑ 78% ACCURACY</span>
          </div>

          <h1 className="mt-4 font-[var(--stitch-font-display)] text-lg font-bold leading-snug tracking-tight text-slate-950 sm:text-xl">{questionText}</h1>

          <div className="mt-4 overflow-hidden rounded-lg border border-slate-800 bg-[#0b1220] text-slate-200 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 bg-[#111827] px-3 py-1.5 text-[10px] text-slate-400">
              <span className="font-mono">{question.fileName || "BinarySearchCore.java"}</span>
              <button type="button" onClick={() => navigator.clipboard?.writeText(code)} className="flex items-center gap-1 text-[10px] font-semibold text-slate-300 hover:text-white">⧉ Copy</button>
            </div>
            <pre className="overflow-x-auto p-3 font-mono text-[11px] leading-5"><code>{code}</code></pre>
          </div>

          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs leading-5 text-slate-700">
            <strong className="text-slate-900">Choose one correct answer for this question.</strong>
            {question.topic ? <span className="ml-1 text-slate-500">Topic: {question.topic}</span> : null}
          </div>

          {isMultipleChoice ? (
            <MCQQuestion question={{ ...question, question: questionText }} onSubmit={handleQuestionSubmit} onExplainWithAI={handleExplainWithAI} />
          ) : (
            <>
              <QuestionCard question={questionText} />
              <AnswerBox answer={answer} explanation={question.explanation || question.flowExplanation} onRevealAnswer={handleQuestionSubmit} />
            </>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {[["hint","💡 Give me a hint"],["explanation","🔍 Explain line"],["analysis","⏱️ Why this answer?"]].map(([action,label]) => (
              <button key={action} type="button" onClick={() => setWrongAnswerContext({ action })} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm">{label}</button>
            ))}
          </div>
        </article>
      </main>

      <footer className="stitch-bottom-bar fixed bottom-0 left-0 right-0 z-40 px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-2">
          <Link href={previousQuestion ? buildQuestionPath(previousQuestion.id) : basePath} className="flex min-h-10 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">← Prev</Link>
          <Link href={buildQuestionPath(question.id)} className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"><BookmarkButton chapter={chapter} questionId={question.id} /> Review</Link>
          {nextQuestion ? (
            <Link href={buildQuestionPath(nextQuestion.id)} className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm">Save & Next →</Link>
          ) : (
            <Link href={basePath} className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm">Finish →</Link>
          )}
        </div>
      </footer>

      {navigatorOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-slate-950/60 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full rounded-t-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between"><h2 className="font-[var(--stitch-font-display)] text-lg font-bold">Question Navigator</h2><button type="button" onClick={() => setNavigatorOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-slate-200">×</button></div>
            <div className="mt-4 grid grid-cols-6 gap-2">
              {chapterQuestions.map((q, index) => <Link key={q.id} href={buildQuestionPath(q.id)} onClick={() => setNavigatorOpen(false)} className={`stitch-palette-item ${index === currentIndex ? "is-current" : ""}`}>{String(index + 1).padStart(2, "0")}</Link>)}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <QuestionTutorPanel question={question} wrongAnswerContext={wrongAnswerContext} personalization={{ board, class: classData, subject, chapter, questionType: question?.type }} />
    </main>
  );
}
