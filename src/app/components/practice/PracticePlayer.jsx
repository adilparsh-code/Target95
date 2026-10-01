"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import QuestionNavigator from "./QuestionNavigator";
import Button from "../ui/Button";
import { useSession } from "../../hooks/useSession";
import { SessionService } from "../../services/SessionService";
import { PracticeService } from "../../services/PracticeService";
import { evaluateMockTestAnswer } from "../../../lib/mocktest";

const BOARD_LABEL = { ICSE: "ICSE", ISC: "ISC", CBSE: "CBSE" };

export default function PracticePlayer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");
  const [loadedSession, setLoadedSession] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [navigatorOpen, setNavigatorOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadSession() {
      if (!sessionId) { setLoadError("No practice session was specified."); return; }
      try {
        setLoadError(null);
        const sessionService = new SessionService();
        const practiceService = new PracticeService();
        const session = await sessionService.getSession(sessionId);
        if (session.status === "completed") { router.replace(`/practice/result?id=${sessionId}`); return; }
        const questions = await practiceService.getQuestionsByIds(session.questions || [], {
          board: session.board,
          classNumber: session.classNumber,
          subjectCode: session.subjectCode,
          subject: session.subject,
          chapter: session.chapter,
          difficulty: session.difficulty,
        });
        if (!questions.length) throw new Error("This practice session has no available questions.");
        if (!cancelled) setLoadedSession({ ...session, questions });
      } catch (error) {
        if (!cancelled) setLoadError(error.message || "Failed to load practice session.");
      }
    }
    loadSession();
    return () => { cancelled = true; };
  }, [sessionId, router]);

  const { session, currentQuestion, currentIndex, answers, loading, error, isComplete, progress, timeRemaining, nextQuestion, previousQuestion, submitAnswer, toggleFlag, completeSession, flaggedQuestions } = useSession(loadedSession);
  const isLastQuestion = currentIndex === (session?.questions?.length || 0) - 1;
  const [minutes, seconds] = timeRemaining.split(":").map(Number);
  const isLowTime = session?.hasTimer && (minutes < 5 || (minutes === 5 && seconds === 0));
  const board = BOARD_LABEL[String(session?.board || "ICSE").toUpperCase()] || "ICSE";

  useEffect(() => {
    if (!currentQuestion) return;
    const savedAnswer = answers.find(item => item.questionId === currentQuestion.id);
    setSelectedAnswer(savedAnswer?.answer ?? null);
    setShowFeedback(Boolean(savedAnswer));
    setIsSubmitted(Boolean(savedAnswer));
  }, [currentQuestion, answers]);

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !currentQuestion || isSubmitted) return;
    const correctAnswer = currentQuestion.correctAnswer ?? currentQuestion.answer;
    const isCorrect = evaluateMockTestAnswer({ ...currentQuestion, type: currentQuestion.type || currentQuestion.questionType }, selectedAnswer, correctAnswer);
    await submitAnswer(currentQuestion.id, selectedAnswer, isCorrect);
    setShowFeedback(true);
    setIsSubmitted(true);
  };

  const handleCompleteSession = async () => {
    try { await completeSession(); router.push(`/practice/result?id=${sessionId}`); }
    catch (err) { console.error("Failed to complete practice session:", err); }
  };

  const isFlagged = currentQuestion && flaggedQuestions.includes(currentQuestion.id);

  if (!loadedSession && !loadError) return <div className="flex min-h-screen items-center justify-center bg-[#f8f8fc]"><div className="text-center"><div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" /><p className="text-sm text-slate-500">Loading your practice session…</p></div></div>;
  if (loadError || error) return <div className="flex min-h-screen items-center justify-center bg-[#f8f8fc] px-4"><div className="w-full max-w-xl rounded-2xl border border-red-200 bg-white p-6 text-red-700 shadow-sm"><p>{loadError || error}</p><Button onClick={() => router.push("/practice/setup")} variant="secondary" className="mt-4">Go Back to Setup</Button></div></div>;
  if (isComplete) return <div className="flex min-h-screen items-center justify-center bg-[#f8f8fc]"><div className="text-center"><div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" /><p className="text-sm text-slate-500">Preparing your results…</p></div></div>;

  const questions = session?.questions || [];
  const percent = questions.length ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

  return (
    <div className="stitch-practice min-h-screen bg-[#f8f8fc] text-slate-900">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/95 shadow-[0_1px_3px_rgba(15,23,42,.05)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-3 px-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <button type="button" onClick={() => router.push("/practice")} className="text-base text-slate-500" aria-label="Exit practice">×</button>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-600 text-white font-bold">T</div>
            <div className="min-w-0"><p className="truncate text-[18px] font-black tracking-tight">Target95<span className="text-blue-600">+</span></p><p className="truncate text-[10px] font-bold uppercase tracking-wider text-teal-700">{board} {session?.classNumber || ""} • {session?.subject || "Computer Applications"}</p></div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setNavigatorOpen(true)} className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-700" aria-label="Open question navigator">▦</button>
            {session?.hasTimer ? <Timer timeRemaining={timeRemaining} isLow={isLowTime} /> : <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs text-slate-600">Practice</span>}
          </div>
        </div>
      </header>

      <div className="sticky top-14 z-30 border-b border-slate-200 bg-white px-4 py-2.5 shadow-sm">
        <div className="mx-auto flex max-w-2xl flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-600"><strong className="font-bold text-blue-700">Q {String(currentIndex + 1).padStart(2,"0")}</strong> /{questions.length}</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{percent}%</span>
          </div>
          <ProgressBar progress={percent} current={currentIndex + 1} total={questions.length} />
        </div>
      </div>

      <main className="mx-auto w-full max-w-2xl px-4 pb-36 pt-4">
        <article className="stitch-surface p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-teal-700">ICSE SPECIMEN / BOARD PRACTICE</span>
              {currentQuestion?.marks ? <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-600">{currentQuestion.marks} MARKS</span> : null}
            </div>
            {currentQuestion?.difficulty ? <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">{String(currentQuestion.difficulty).toUpperCase()}</span> : null}
          </div>
          <h1 className="mt-4 font-[var(--stitch-font-display)] text-lg font-bold leading-snug tracking-tight text-slate-950 sm:text-xl">{currentQuestion?.question}</h1>
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
            onSubmit={handleSubmitAnswer}
            isSubmitted={isSubmitted}
            showFeedback={showFeedback}
          />
        </article>
      </main>

      <footer className="stitch-bottom-bar fixed bottom-0 left-0 right-0 z-40 px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-2">
          <button type="button" onClick={previousQuestion} disabled={!currentIndex} className="flex min-h-10 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">← Prev</button>
          <button type="button" onClick={toggleFlag} className={`flex min-h-10 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold ${isFlagged ? "border-amber-300 bg-amber-50 text-amber-700" : "border-slate-200 bg-white text-slate-600"}`}>{isFlagged ? "⚑ Flagged" : "⚐ Review"}</button>
          <button type="button" onClick={() => isLastQuestion ? handleCompleteSession() : nextQuestion()} disabled={loading} className="flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm disabled:opacity-50">{isLastQuestion ? "Finish" : "Save & Next"} →</button>
        </div>
      </footer>

      {navigatorOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-slate-950/60 p-0 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Question Navigator">
          <div className="w-full rounded-t-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between"><h2 className="text-lg font-bold">Question Navigator</h2><button type="button" onClick={() => setNavigatorOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border">×</button></div>
            <div className="mt-4 grid grid-cols-6 gap-2">
              {questions.map((q, i) => <button key={q.id} type="button" onClick={() => { const delta = i-currentIndex; if (delta < 0) for(let x=0;x<Math.abs(delta);x++) previousQuestion(); else for(let x=0;x<delta;x++) nextQuestion(); setNavigatorOpen(false); }} className={`h-9 rounded-lg text-[11px] font-bold ${i===currentIndex?"border-2 border-blue-600 bg-white text-blue-700":answers.some((a)=>a.questionId===q.id)?"bg-emerald-600 text-white":"bg-slate-100 text-slate-600"}`}>{String(i+1).padStart(2,"0")}</button>)}
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">Answered: {answers.length} • Remaining: {Math.max(questions.length-answers.length,0)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
