"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CATEGORIES, DIFFICULTIES, QUESTION_TYPES, QUESTION_COUNTS, getMockTestHistory } from "../../lib/mocktest";

export default function MockTestNewPage() {
  const router = useRouter();
  const [category, setCategory] = useState("icse-class-10");
  const [difficulty, setDifficulty] = useState("medium");
  const [type, setType] = useState("mixed");
  const [count, setCount] = useState(10);

  const history = useMemo(() => getMockTestHistory(), []);

  const handleStart = () => {
    router.push(`/mock-test/instructions?category=${category}&difficulty=${difficulty}&type=${type}&count=${count}`);
  };

  const handleRetake = (result) => {
    const config = result;
    router.push(`/mock-test/instructions?category=${config.category || "icse-class-10"}&difficulty=${config.difficulty || "medium"}&type=${config.type || "mixed"}&count=${config.totalQuestions || 10}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">
            Mock Test
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Test Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">
            Choose your class, difficulty, question type, and number of questions to generate a timed mock test.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Setup */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Test Configuration</h2>

            {/* Category */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Test Category</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`rounded-2xl border p-4 text-center transition ${
                      category === cat.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <p className="mt-1 text-xs font-semibold">{cat.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Difficulty Level</p>
              <div className="grid grid-cols-3 gap-3">
                {DIFFICULTIES.map((diff) => (
                  <button
                    key={diff.id}
                    type="button"
                    onClick={() => setDifficulty(diff.id)}
                    className={`rounded-2xl border p-3 text-center transition ${
                      difficulty === diff.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    <span>{diff.icon}</span>
                    <p className="mt-1 text-xs font-semibold">{diff.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Type */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Question Type</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                {QUESTION_TYPES.map((qt) => (
                  <button
                    key={qt.id}
                    type="button"
                    onClick={() => setType(qt.id)}
                    className={`rounded-2xl border p-3 text-center transition ${
                      type === qt.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    <span>{qt.icon}</span>
                    <p className="mt-1 text-xs font-semibold">{qt.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Number of Questions</p>
              <div className="grid grid-cols-4 gap-3">
                {QUESTION_COUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCount(n)}
                    className={`rounded-2xl border p-3 text-center transition ${
                      count === n
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    <p className="text-sm font-bold">{n}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleStart}
              className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Start Mock Test
            </button>
          </div>

          {/* History Sidebar */}
          <div className="space-y-6">
            {/* Recent Results */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Recent Results</h2>
              {history.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {history.slice(0, 5).map((item) => {
                    const catLabel = item.category?.replace(/-/g, " ") || "";
                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-gray-200 bg-slate-50 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-900">
                            {catLabel ? catLabel.replace(/\b\w/g, (c) => c.toUpperCase()) : "Test"}
                          </p>
                          <span className={`text-xs font-bold ${
                            item.percentage >= 70 ? "text-green-600" : item.percentage >= 40 ? "text-yellow-600" : "text-red-600"
                          }`}>
                            {item.percentage}%
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-700">
                          Score: {item.score}/{item.totalQuestions} • {item.difficulty}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleRetake(item)}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                          >
                            Retake
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-slate-50 p-6 text-center text-sm text-gray-700">
                  Complete a mock test to see your results here.
                </div>
              )}
            </div>

            {/* Stats Summary */}
            {history.length > 0 && (
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900">Overall Stats</h2>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Tests Taken</span>
                    <span className="font-bold text-gray-900">{history.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Best Score</span>
                    <span className="font-bold text-green-600">
                      {Math.max(...history.map((h) => h.percentage))}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Average Score</span>
                    <span className="font-bold text-blue-600">
                      {Math.round(history.reduce((s, h) => s + h.percentage, 0) / history.length)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}