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

export default function PracticePlayer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");
  const [loadedSession, setLoadedSession] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    const isCorrect = selectedAnswer === correctAnswer;
    await submitAnswer(currentQuestion.id, selectedAnswer, isCorrect);
    setShowFeedback(true);
    setIsSubmitted(true);
  };

  const handleCompleteSession = async () => {
    try { await completeSession(); router.push(`/practice/result?id=${sessionId}`); }
    catch (err) { console.error("Failed to complete session:", err); }
  };
  const isFlagged = currentQuestion && flaggedQuestions.includes(currentQuestion.id);

  if (!loadedSession && !loadError) return <div className="flex min-h-screen items-center justify-center"><div className="text-center"><div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" /><p className="text-gray-500">Loading your practice session…</p></div></div>;
  if (loadError || error) return <div className="mx-auto max-w-4xl px-4 py-12"><div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">{loadError || error}<Button onClick={() => router.push("/practice/setup")} variant="secondary" className="mt-4">Go Back to Setup</Button></div></div>;
  if (isComplete) return <div className="flex min-h-screen items-center justify-center"><div className="text-center"><div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" /><p className="text-gray-500">Preparing your results…</p></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3"><div className="flex items-center gap-4"><Button onClick={() => router.push("/practice")} variant="ghost" size="sm">✕ Exit</Button><div><h1 className="text-lg font-semibold text-gray-900 dark:text-white">Practice Session</h1><p className="text-sm text-gray-500 dark:text-gray-400">{session?.board ? `${session.board} • Class ${session.classNumber}${session.subjectCode ? ` • Code ${session.subjectCode}` : ""} • ` : ""}{session?.subject} • {session?.chapter || "All Chapters"}</p></div></div><div className="flex items-center gap-3"><Button onClick={toggleFlag} variant={isFlagged ? "warning" : "secondary"} size="sm">{isFlagged ? "⚑ Flagged" : "⚐ Flag"}</Button>{session?.hasTimer && <Timer timeRemaining={timeRemaining} isLow={isLowTime} />}</div></div></header>
      <main className="mx-auto max-w-7xl px-4 py-6"><div className="mb-6"><ProgressBar progress={progress} current={currentIndex + 1} total={session?.questions?.length || 0} /></div><div className="mb-6"><QuestionCard question={currentQuestion} selectedAnswer={selectedAnswer} onSelectAnswer={setSelectedAnswer} onSubmit={handleSubmitAnswer} isSubmitted={isSubmitted} showFeedback={showFeedback} /></div><div className="mx-auto max-w-4xl"><QuestionNavigator currentIndex={currentIndex} totalQuestions={session?.questions?.length || 0} onPrevious={previousQuestion} onNext={() => isLastQuestion ? handleCompleteSession() : nextQuestion()} onSubmit={handleCompleteSession} canSubmit={!loading} isLastQuestion={isLastQuestion} /></div></main>
    </div>
  );
}
