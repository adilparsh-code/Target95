"use client";

import { buildPlayerErrorView } from "@/lib/mocktestSession";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { clearMockTestDraft, saveMockTestDraft, saveMockTestResult, storeMockTestResultForSession } from "../../../lib/mocktest";
import { trackEvent, LEARNING_EVENTS } from "@/lib/analyticsEvents";
import { useAuth } from "@/context/AuthContext";
import useMockAttemptSession from "@/app/hooks/useMockAttemptSession";
import { describeFailure, submitAttemptRequest } from "@/lib/mocktestClient";
import { buildLocalResult, buildServerResult } from "@/lib/mocktestResult";

function formatTime(seconds) { const m = Math.floor(seconds / 60); const s = seconds % 60; return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`; }

const PAGE_SHELL = "min-h-screen bg-gradient-to-b from-white to-blue-50";

function StatusScreen({ title, message, children }) {
  return <main className={PAGE_SHELL}><Navbar /><div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-32 text-center"><h1 className="text-3xl font-bold text-gray-900">{title}</h1><p className="text-gray-700">{message}</p><div className="flex flex-wrap justify-center gap-3">{children}</div></div><Footer /></main>;
}

/**
 * One running test. All state starts from `session` (questions, attempt id, restored draft),
 * so a restored draft can never be paired with a different question set.
 */
function ActiveTest({ session, testConfig }) {
  const router = useRouter();
  const { user } = useAuth();
  const { board, classNumber, subjectCode, subject, category, difficulty, type, chapter, mode, duration } = testConfig;
  const { questions, attemptId, initial, notice } = session;

  const [currentIndex, setCurrentIndex] = useState(initial?.currentIndex ?? 0);
  const [answers, setAnswers] = useState(initial?.answers ?? {});
  const [bookmarked, setBookmarked] = useState(initial?.bookmarked ?? {});
  const [timeLeft, setTimeLeft] = useState(initial?.timeLeft ?? duration * 60);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });
  const submittingRef = useRef(false);
  const autoSubmitFiredRef = useRef(false);

  const current = questions[currentIndex] || null;
  const hasAnswer = (id) => Boolean(String(answers[id] ?? "").trim());
  const answeredCount = questions.filter((q) => hasAnswer(q.id)).length;
  const bookmarkedCount = Object.values(bookmarked).filter(Boolean).length;
  const progress = questions.length ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;
  const isTimed = mode !== "practice" && mode !== "revision";

  // Draft: ids + answers only. The questions themselves are re-delivered by the server on resume.
  useEffect(() => {
    if (user?.uid && !submitted) saveMockTestDraft(testConfig, { attemptId, questionIds: questions.map((q) => q.id), currentIndex, answers, bookmarked, timeLeft }, user.uid);
  }, [submitted, testConfig, questions, currentIndex, answers, bookmarked, timeLeft, user?.uid, attemptId]);

  const finish = useCallback((result) => {
    setSubmitted(true);
    saveMockTestResult(result, user?.uid);
    storeMockTestResultForSession(result, user?.uid);
    clearMockTestDraft(testConfig, user?.uid);
    trackEvent(LEARNING_EVENTS.MOCK_TEST_COMPLETED, { board, chapterId: chapter, difficulty, score: result.score, total: result.totalQuestions, percentage: result.percentage });
    router.push("/mock-test/result");
  }, [user?.uid, testConfig, board, chapter, difficulty, router]);

  // Server-saved attempts are graded by the server and the result shown is the server's. A failure
  // is visible and retryable (the server replays the stored result if an earlier call succeeded).
  const submit = useCallback(async () => {
    if (submittingRef.current || submitted) return;
    submittingRef.current = true;
    setSubmitState({ status: "submitting", message: "" });

    if (!attemptId) {
      finish(buildLocalResult({ questions, answers, config: testConfig, bookmarkedCount, timeTaken: Math.max(0, duration * 60 - timeLeft), userId: user?.uid || null }));
      return;
    }

    const response = await submitAttemptRequest(attemptId, answers);
    if (response.ok && response.data.result) {
      finish(buildServerResult({ serverResult: response.data.result, reveal: response.data.reveal, questions, bookmarkedCount }));
      return;
    }
    submittingRef.current = false;
    setShowSubmit(true);
    setSubmitState({ status: "error", message: describeFailure(response, "submit your test") });
  }, [submitted, attemptId, finish, questions, answers, testConfig, bookmarkedCount, duration, timeLeft, user?.uid]);

  // The countdown only ticks; submission is triggered separately through a ref, so answering a
  // question (which re-creates `submit`) does not restart the interval and steal seconds.
  const submitRef = useRef(submit);
  useEffect(() => { submitRef.current = submit; }, [submit]);
  useEffect(() => { if (!questions.length || submitted || !isTimed) return undefined; const timer = setInterval(() => setTimeLeft((previous) => Math.max(0, previous - 1)), 1000); return () => clearInterval(timer); }, [questions.length, submitted, isTimed]);
  // Time-up submits once automatically; if that fails the student retries by hand (no retry loop).
  useEffect(() => { if (isTimed && questions.length && !submitted && timeLeft <= 0 && !autoSubmitFiredRef.current) { autoSubmitFiredRef.current = true; submitRef.current(); } }, [isTimed, questions.length, submitted, timeLeft]);

  if (!current) return null;
  const isSubmitting = submitState.status === "submitting";

  return <main className={PAGE_SHELL}><Navbar /><div className="h-20" /><div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{notice && <p role="status" className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{notice}</p>}{!attemptId && <p role="status" className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">This test is not connected to your account, so its result will not be saved.</p>}<div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">{board} • Class {classNumber}{subjectCode ? ` • Code ${subjectCode}` : ""}</p><h1 className="mt-2 text-2xl font-bold text-gray-900">{subject || "Mock Test"}</h1><p className="mt-1 text-sm text-gray-600">Question {currentIndex + 1} of {questions.length}</p></div><div className="flex gap-3"><div className="rounded-xl border px-4 py-3 font-semibold">⏱️ {formatTime(timeLeft)}</div><div className="rounded-xl border px-4 py-3 font-semibold">✅ {answeredCount}/{questions.length}</div></div></div><div className="mt-5 h-2 rounded-full bg-gray-200"><div className="h-full rounded-full bg-blue-600" style={{ width: `${progress}%` }} /></div></div>
<div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between gap-3"><div className="flex gap-2"><span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{current.type}</span><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold">{current.difficulty}</span></div><button onClick={() => setBookmarked((p) => ({ ...p, [current.id]: !p[current.id] }))} className="rounded-xl border px-3 py-2 text-sm">{bookmarked[current.id] ? "📌 Bookmarked" : "📌 Bookmark"}</button></div><h2 className="mt-5 text-xl font-bold leading-relaxed text-gray-900">{current.question}</h2><div className="mt-6">{current.options?.length ? <div className="space-y-3">{current.options.map((option) => <button key={option} onClick={() => setAnswers((p) => ({ ...p, [current.id]: option }))} className={`w-full rounded-xl border p-4 text-left font-semibold ${answers[current.id] === option ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300"}`}>{option}</button>)}</div> : <textarea value={answers[current.id] || ""} onChange={(e) => setAnswers((p) => ({ ...p, [current.id]: e.target.value }))} rows={7} className="w-full rounded-xl border border-gray-300 p-4 text-gray-900" placeholder={current.type === "programming" ? "Write your code here..." : "Type your answer here..."} />}</div></section><aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="font-bold text-gray-900">Question Navigator</h2><div className="mt-4 grid grid-cols-5 gap-2">{questions.map((q, i) => <button key={q.id} onClick={() => setCurrentIndex(i)} className={`h-10 rounded-lg border text-sm font-semibold ${i === currentIndex ? "border-blue-500 bg-blue-100" : hasAnswer(q.id) ? "border-green-400 bg-green-50" : "border-gray-300"}`}>{i + 1}</button>)}</div><div className="mt-6 flex gap-3"><button disabled={!currentIndex} onClick={() => setCurrentIndex((i) => i - 1)} className="rounded-xl border px-4 py-2 disabled:opacity-40">Previous</button><button disabled={currentIndex === questions.length - 1} onClick={() => setCurrentIndex((i) => i + 1)} className="rounded-xl border px-4 py-2 disabled:opacity-40">Next</button></div><button onClick={() => setShowSubmit(true)} className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Submit Test</button></aside></div></div>{showSubmit && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div className="mx-4 max-w-md rounded-2xl bg-white p-6"><h2 className="text-xl font-bold">Submit Test?</h2><p className="mt-2 text-sm text-gray-700">You have answered {answeredCount} of {questions.length} questions.</p>{submitState.status === "error" && <p role="alert" className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{submitState.message} Your answers are saved on this device.</p>}<div className="mt-5 flex gap-3"><button onClick={submit} disabled={isSubmitting} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-60">{isSubmitting ? "Submitting…" : submitState.status === "error" ? "Retry Submit" : "Yes, Submit"}</button><button onClick={() => setShowSubmit(false)} disabled={isSubmitting} className="rounded-xl border px-5 py-3 disabled:opacity-60">Continue</button></div></div></div>}<Footer /></main>;
}

function MockTestPlayerContent() {
  const router = useRouter(); const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const category = searchParams.get("category") || "icse-class-10";
  const board = (searchParams.get("board") || (category.startsWith("cbse-") ? "CBSE" : category.startsWith("isc-") ? "ISC" : "ICSE")).toUpperCase();
  const classNumber = Number(searchParams.get("class") || category.split("-").pop() || 10);
  const subjectCode = searchParams.get("subjectCode") || ""; const subject = searchParams.get("subject") || "";
  const difficulty = searchParams.get("difficulty") || "medium"; const type = searchParams.get("type") || "mixed";
  const count = Math.max(1, Number(searchParams.get("count") || 10)); const chapter = searchParams.get("chapter") || "all";
  const mode = searchParams.get("mode") || "exam"; const duration = Math.max(1, Number(searchParams.get("duration") || 30));
  const testConfig = useMemo(() => ({ board, classNumber, subjectCode, subject, category, chapter, difficulty, type, count, mode, duration }), [board, classNumber, subjectCode, subject, category, chapter, difficulty, type, count, mode, duration]);

  const attempt = useMockAttemptSession({ uid: user?.uid || null, config: testConfig, duration, count, authLoading });
  const backToSetup = () => router.push(`/mock-test?board=${board}&class=${classNumber}${subjectCode ? `&subjectCode=${subjectCode}` : ""}`);

  if (attempt.phase === "loading") return <main className={PAGE_SHELL}><Navbar /><div className="flex justify-center py-32 text-gray-700">Preparing your test…</div><Footer /></main>;

  if (attempt.phase === "error") {
    const view = buildPlayerErrorView(attempt.error);
    const handlers = { retry: attempt.retry, offline: attempt.goOffline, back: backToSetup };
    return <StatusScreen title={view.title} message={view.message}>
      {view.actions.map((action) => <button key={action.id} onClick={handlers[action.id]} className={action.primary ? "rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white" : "rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900"}>{action.label}</button>)}
    </StatusScreen>;
  }

  if (!attempt.session.questions.length) return <StatusScreen title="No questions available" message="No questions match this board, class, subject and filter combination."><button onClick={backToSetup} className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">Back to Setup</button></StatusScreen>;

  // Keyed by attempt so a different attempt always starts from its own state.
  return <ActiveTest key={attempt.session.attemptId || "local"} session={attempt.session} testConfig={testConfig} />;
}

export default function MockTestPlayerPage() { return <Suspense fallback={<main className="min-h-screen"><Navbar /><div className="flex justify-center py-24">Loading test…</div><Footer /></main>}><MockTestPlayerContent /></Suspense>; }
