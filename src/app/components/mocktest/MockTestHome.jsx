"use client";

import { useMemo, useState } from "react";
import javaChapters from "../../data/javaChapters";

export default function MockTestHome({ onStart, history }) {
  const [chapter, setChapter] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [questionCount, setQuestionCount] = useState(10);
  const [type, setType] = useState("mixed");

  const recentHistory = useMemo(() => history.slice(0, 3), [history]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="mock-test-heading">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Mock Test</p>
        <h1 id="mock-test-heading" className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Create a timed practice exam</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">
          Choose a chapter, difficulty, number of questions, and question type to generate a fresh mock test that fits your revision goal.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Test Setup</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-gray-900">
              <span className="mb-2 block">Chapter</span>
              <select
                value={chapter}
                onChange={(event) => setChapter(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Chapters</option>
                {javaChapters.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-gray-900">
              <span className="mb-2 block">Difficulty</span>
              <select
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <label className="text-sm font-semibold text-gray-900">
              <span className="mb-2 block">Number of Questions</span>
              <select
                value={questionCount}
                onChange={(event) => setQuestionCount(Number(event.target.value))}
                className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </label>

            <label className="text-sm font-semibold text-gray-900">
              <span className="mb-2 block">Question Type</span>
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="mixed">Mixed</option>
                <option value="theory">Theory</option>
                <option value="mcq">MCQ</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={() => onStart({ chapter, difficulty, questionCount, type })}
            className="mt-6 rounded-xl border border-blue-300 bg-blue-100 px-5 py-3 font-semibold text-gray-900 transition hover:border-blue-400 hover:bg-blue-200"
          >
            Start Mock Test
          </button>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Recent Test History</h2>
          <div className="mt-6 space-y-3">
            {recentHistory.length > 0 ? (
              recentHistory.map((item) => (
                <div key={item.id} className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-700">
                    {item.score}/{item.totalQuestions} correct • {item.percentage}%
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-gray-300 bg-slate-50 p-4 text-sm text-gray-700">
                Your recent mock test history will appear here after you complete a test.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
