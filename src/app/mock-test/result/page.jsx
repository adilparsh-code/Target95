"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getMockTestHistory } from "../../../lib/mocktest";

export default function MockTestResultPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("mock-test-result");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        setResult(null);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900">No results found</h1>
          <p className="text-gray-700">Complete a mock test to see your results here.</p>
          <button
            type="button"
            onClick={() => router.push("/mock-test")}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Take a Mock Test
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  const categoryLabel = result.category?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Test";
  const timeTakenMin = Math.floor(result.timeTaken / 60);
  const timeTakenSec = result.timeTaken % 60;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Mock Test Results</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Test Complete!</h1>
          <p className="mt-3 text-base leading-7 text-gray-700">
            {categoryLabel} — {result.difficulty?.charAt(0).toUpperCase() + result.difficulty?.slice(1) || "Mixed"} Difficulty
          </p>
        </div>

        {/* Score Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 text-center">
              <p className="text-sm font-semibold text-gray-700">Score</p>
              <p className={`mt-2 text-4xl font-bold ${result.percentage >= 70 ? "text-green-600" : result.percentage >= 40 ? "text-yellow-600" : "text-red-600"}`}>
                {result.score}/{result.totalQuestions}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 text-center">
              <p className="text-sm font-semibold text-gray-700">Percentage</p>
              <p className={`mt-2 text-4xl font-bold ${result.percentage >= 70 ? "text-green-600" : result.percentage >= 40 ? "text-yellow-600" : "text-red-600"}`}>
                {result.percentage}%
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 text-center">
              <p className="text-sm font-semibold text-gray-700">Accuracy</p>
              <p className="mt-2 text-4xl font-bold text-blue-600">
                {result.accuracy || result.percentage}%
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 text-center">
              <p className="text-sm font-semibold text-gray-700">Time Taken</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {timeTakenMin}m {timeTakenSec}s
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 text-center">
              <p className="text-sm font-semibold text-gray-700">Bookmarked</p>
              <p className="mt-2 text-4xl font-bold text-yellow-600">{result.bookmarkedCount}</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">
              <p className="text-sm font-semibold text-green-700">Correct</p>
              <p className="mt-1 text-2xl font-bold text-green-700">{result.correctCount}</p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
              <p className="text-sm font-semibold text-red-700">Wrong</p>
              <p className="mt-1 text-2xl font-bold text-red-700">{result.wrongCount}</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
              <p className="text-sm font-semibold text-gray-700">Unanswered</p>
              <p className="mt-1 text-2xl font-bold text-gray-700">{result.unansweredCount}</p>
            </div>
          </div>
        </div>

        {/* Answer Review */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Answer Review</h2>
              <p className="mt-1 text-sm text-gray-700">
                Review each question and see the correct answers with explanations.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem("mock-test-result");
                  router.push("/mock-test");
                }}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                New Test
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {result.review.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-5 ${
                  item.isCorrect
                    ? "border-green-300 bg-green-50"
                    : item.userAnswer === "No answer"
                    ? "border-gray-300 bg-gray-50"
                    : "border-red-300 bg-red-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-500">Q{idx + 1}</span>
                      <span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700">
                        {item.question.type?.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">({item.marks} mark{item.marks > 1 ? "s" : ""})</span>
                    </div>
                    <p className="mt-2 font-semibold text-gray-900">{item.question.question}</p>
                    <div className="mt-3 space-y-1 text-sm">
                      <p className="text-gray-700">
                        <span className="font-semibold">Your answer:</span> {item.userAnswer}
                      </p>
                      {!item.isCorrect && (
                        <p className="text-green-700">
                          <span className="font-semibold">Correct answer:</span> {item.correctAnswer}
                        </p>
                      )}
                    </div>
                    {item.explanation && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm font-semibold text-blue-600">💡 Explanation</summary>
                        <p className="mt-2 rounded-lg bg-white p-3 text-sm text-gray-700">{item.explanation}</p>
                      </details>
                    )}
                  </div>
                  <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                    item.isCorrect ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                  }`}>
                    {item.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard UI */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">🏆 Leaderboard</h2>
          <p className="mt-1 text-sm text-gray-700">
            Compare your score with other students (leaderboard data coming soon).
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">Rank</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Student</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Score</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Accuracy</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { rank: 1, name: "You", score: `${result.score}/${result.totalQuestions}`, accuracy: `${result.percentage}%`, time: `${timeTakenMin}m ${timeTakenSec}s` },
                  { rank: 2, name: "—", score: "—", accuracy: "—", time: "—" },
                  { rank: 3, name: "—", score: "—", accuracy: "—", time: "—" },
                ].map((row) => (
                  <tr key={row.rank} className={`${row.name === "You" ? "bg-blue-50 font-semibold" : "bg-white"}`}>
                    <td className="px-4 py-3 text-gray-900">{row.rank}</td>
                    <td className="px-4 py-3 text-gray-900">{row.name}</td>
                    <td className="px-4 py-3 text-gray-700">{row.score}</td>
                    <td className="px-4 py-3 text-gray-700">{row.accuracy}</td>
                    <td className="px-4 py-3 text-gray-700">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}