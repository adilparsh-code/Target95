"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import mockTestQuestions from "../../data/mock-test/mockTestQuestions";
import { saveMockTestResult } from "../../../lib/mocktest";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function MockTestPlayerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "icse-class-10";
  const difficulty = searchParams.get("difficulty") || "medium";
  const type = searchParams.get("type") || "mixed";
  const count = parseInt(searchParams.get("count") || "10", 10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [bookmarked, setBookmarked] = useState({});
  const [timeLeft, setTimeLeft] = useState(count * 90);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasSubmittedRef = useRef(false);

  const filteredQuestions = useMemo(() => {
    let pool = mockTestQuestions.filter((q) => {
      const catMatch = q.category === category;
      const diffMatch = difficulty === "all" || q.difficulty === difficulty;
      const typeMatch = type === "mixed" || q.type === type;
      return catMatch && diffMatch && typeMatch;
    });
    if (pool.length === 0) return [];
    const shuffled = shuffleArray(pool);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }, [category, difficulty, type, count]);

  const questions = filteredQuestions;
  const currentQuestion = questions[currentIndex] || null;
  const answeredCount = Object.keys(answers).length;
  const bookmarkedCount = Object.keys(bookmarked).filter((k) => bookmarked[k]).length;
  const progressPercent = questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

  const handleSubmit = useCallback(() => {
    if (hasSubmittedRef.current || isSubmitted) return;
    hasSubmittedRef.current = true;
    setIsSubmitted(true);

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    const review = questions.map((q) => {
      const userAnswer = answers[q.id] || "";
      let isCorrect = false;
      if (q.type === "mcq" || q.type === "output") {
        isCorrect = userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase();
      } else if (q.type === "theory") {
        const norm = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
        const input = norm(userAnswer);
        const ans = norm(q.answer);
        isCorrect = input.length > 0 && (ans.includes(input) || input.includes(ans));
      } else {
        const norm = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
        const input = norm(userAnswer);
        const ans = norm(q.answer);
        isCorrect = input.length > 0 && input === ans;
      }
      if (!userAnswer) {
        unanswered++;
        wrong++;
      } else if (isCorrect) {
        correct++;
      } else {
        wrong++;
      }
      return {
        question: q,
        userAnswer: userAnswer || "No answer",
        correctAnswer: q.answer,
        isCorrect: userAnswer ? isCorrect : false,
        explanation: q.explanation,
        marks: q.marks || 1,
      };
    });

    const totalQuestions = questions.length;
    const score = correct;
    const percentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
    const accuracy = totalQuestions > 0 ? Math.round((correct / (correct + wrong - unanswered)) * 100) : 0;

    const result = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date: new Date().toISOString(),
      category,
      difficulty,
      type,
      score,
      totalQuestions,
      correctCount: correct,
      wrongCount: wrong,
      unansweredCount: unanswered,
      percentage,
      accuracy,
      timeTaken: count * 90 - timeLeft,
      totalTime: count * 90,
      bookmarkedCount,
      review,
    };

    saveMockTestResult(result);
    sessionStorage.setItem("mock-test-result", JSON.stringify(result));
    router.push("/mock-test/result");
  }, [questions, answers, bookmarkedCount, count, timeLeft, category, difficulty, type, router, isSubmitted]);

  useEffect(() => {
    if (questions.length === 0 || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmit, questions.length, isSubmitted]);

  const updateAnswer = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const toggleBookmark = (qId) => {
    setBookmarked((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const getQuestionStatus = (index) => {
    const q = questions[index];
    if (!q) return "unanswered";
    if (bookmarked[q.id]) return "bookmarked";
    if (answers[q.id]) return "answered";
    return "unanswered";
  };

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900">No questions available</h1>
          <p className="text-gray-700">Try different filter settings to generate a test.</p>
          <button
            type="button"
            onClick={() => router.push("/mock-test")}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Mock Test</p>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">Timed Practice Session</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${timeLeft < 60 ? "border-red-300 bg-red-50 text-red-700" : "border-gray-200 bg-slate-50 text-gray-900"}`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
              <div className="rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-gray-900">
                ✅ {answeredCount}/{questions.length} Answered
              </div>
              <div className="rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-gray-900">
                📌 {bookmarkedCount} Bookmarked
              </div>
            </div>
          </div>
          <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold text-gray-700">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCurrentIndex((p) => Math.max(p - 1, 0))}
                disabled={currentIndex === 0}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400 disabled:opacity-50"
              >
                ← Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex((p) => Math.min(p + 1, questions.length - 1))}
                disabled={currentIndex === questions.length - 1}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400 disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Question Area */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {currentQuestion.type.toUpperCase()}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {currentQuestion.marks} mark{currentQuestion.marks > 1 ? "s" : ""}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    currentQuestion.difficulty === "easy" ? "bg-green-100 text-green-700" :
                    currentQuestion.difficulty === "medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900 leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => toggleBookmark(currentQuestion.id)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition whitespace-nowrap ${
                  bookmarked[currentQuestion.id]
                    ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                    : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
                }`}
              >
                {bookmarked[currentQuestion.id] ? "📌 Bookmarked" : "📌 Bookmark"}
              </button>
            </div>

            {/* Answer Area */}
            <div className="mt-6">
              {(currentQuestion.type === "mcq" || currentQuestion.type === "output") && currentQuestion.options ? (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateAnswer(currentQuestion.id, option)}
                        className={`w-full rounded-2xl border p-4 text-left text-sm font-semibold transition ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <label className="text-sm font-semibold text-gray-900" htmlFor="answer">
                    Your Answer
                  </label>
                  <textarea
                    id="answer"
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => updateAnswer(currentQuestion.id, e.target.value)}
                    rows={6}
                    className="mt-3 w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder={currentQuestion.type === "programming" ? "Write your code here..." : "Type your response here..."}
                  />
                </div>
              )}
            </div>

            {/* Hint */}
            {currentQuestion.hint && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-semibold text-blue-600 hover:text-blue-700">
                  💡 Show Hint
                </summary>
                <p className="mt-2 rounded-xl bg-blue-50 p-4 text-sm text-gray-700">
                  {currentQuestion.hint}
                </p>
              </details>
            )}
          </div>

          {/* Navigation Sidebar */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Question Navigator</h2>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const status = getQuestionStatus(index);
                const isCurrent = index === currentIndex;
                let btnClass = "border-gray-300 bg-white text-gray-900 hover:border-gray-400";
                if (isCurrent) btnClass = "border-blue-500 bg-blue-100 text-blue-700";
                else if (status === "bookmarked") btnClass = "border-yellow-400 bg-yellow-50 text-yellow-700";
                else if (status === "answered") btnClass = "border-green-400 bg-green-50 text-green-700";
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`flex h-10 w-full items-center justify-center rounded-lg border text-xs font-semibold ${btnClass}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-700">
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded border border-green-400 bg-green-50" /> Answered</span>
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded border border-yellow-400 bg-yellow-50" /> Bookmarked</span>
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded border border-gray-300 bg-white" /> Unanswered</span>
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded border border-blue-500 bg-blue-100" /> Current</span>
            </div>

            <button
              type="button"
              onClick={() => setShowSubmitDialog(true)}
              className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>

      {/* Submit Dialog */}
      {showSubmitDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">Submit Mock Test?</h2>
            <p className="mt-2 text-sm text-gray-700">
              You have answered {answeredCount} of {questions.length} questions.
              {answeredCount < questions.length && (
                <span className="block mt-1 font-semibold text-yellow-600">
                  {questions.length - answeredCount} question{questions.length - answeredCount > 1 ? "s" : ""} left unanswered.
                </span>
              )}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setShowSubmitDialog(false);
                  handleSubmit();
                }}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Yes, Submit
              </button>
              <button
                type="button"
                onClick={() => setShowSubmitDialog(false)}
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 hover:border-gray-400"
              >
                Continue Test
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

export default function MockTestPlayerPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
        <Footer />
      </main>
    }>
      <MockTestPlayerContent />
    </Suspense>
  );
}