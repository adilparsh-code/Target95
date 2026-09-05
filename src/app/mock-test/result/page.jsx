"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getTopicPerformance } from "../../../lib/mocktest";

export default function MockTestResultPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("mock-test-result");
      setResult(stored ? JSON.parse(stored) : null);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <ResultShell><div className="flex items-center justify-center py-24"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" /></div></ResultShell>;

  if (!result) return <ResultShell><div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-20 text-center"><h1 className="text-3xl font-bold text-gray-900">No results found</h1><p className="text-gray-700">Complete a mock test to see your results here.</p><button type="button" onClick={() => router.push("/mock-test")} className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Take a Mock Test</button></div></ResultShell>;

  const review = Array.isArray(result.review) ? result.review : [];
  const categoryLabel = result.category?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Test";
  const timeTaken = Math.max(0, Number(result.timeTaken) || 0);
  const timeTakenMin = Math.floor(timeTaken / 60);
  const timeTakenSec = timeTaken % 60;
  const topicPerformance = getTopicPerformance(review);
  const weakTopics = topicPerformance.filter((topic) => topic.accuracy < 70).slice(0, 3);
  const strongTopics = [...topicPerformance].sort((a, b) => b.accuracy - a.accuracy || b.total - a.total).filter((topic) => topic.accuracy >= 70).slice(0, 3);

  const clearAndGoToSetup = () => {
    sessionStorage.removeItem("mock-test-result");
    router.push("/mock-test");
  };

  return <ResultShell>
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Mock Test Results</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Test Complete!</h1>
        <p className="mt-3 text-base leading-7 text-gray-700">{categoryLabel} — {result.difficulty ? `${result.difficulty.charAt(0).toUpperCase()}${result.difficulty.slice(1)} Difficulty` : "Mixed Difficulty"}</p>
        <p className="mt-1 text-sm text-gray-600">{result.board || "ICSE"} • Class {result.classNumber || "—"}{result.subjectCode ? ` • Code ${result.subjectCode}` : ""}{result.subject ? ` • ${result.subject}` : ""}</p>
      </div>

      <section className="grid gap-6 lg:grid-cols-2" aria-label="Performance analysis">
        <TopicList title="Topics to strengthen" description="Revisit these concepts before your next test." topics={weakTopics} emptyText="No weak topics were identified in this test." tone="red" />
        <TopicList title="Strong topics" description="Keep these concepts fresh with quick revision." topics={strongTopics} emptyText="Complete more questions to identify strong topics." tone="green" />
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <Metric label="Score" value={`${result.score}/${result.totalQuestions}`} />
          <Metric label="Percentage" value={`${result.percentage}%`} />
          <Metric label="Accuracy" value={`${result.accuracy ?? result.percentage}%`} />
          <Metric label="Time Taken" value={`${timeTakenMin}m ${timeTakenSec}s`} />
          <Metric label="Bookmarked" value={String(result.bookmarkedCount ?? 0)} />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Breakdown label="Correct" value={result.correctCount ?? 0} className="border-green-200 bg-green-50 text-green-700" />
          <Breakdown label="Wrong" value={result.wrongCount ?? 0} className="border-red-200 bg-red-50 text-red-700" />
          <Breakdown label="Unanswered" value={result.unansweredCount ?? 0} className="border-gray-200 bg-gray-50 text-gray-700" />
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-xl font-bold text-gray-900">Answer Review</h2><p className="mt-1 text-sm text-gray-700">Review each question, correct answers and explanations.</p></div>
          <button type="button" onClick={clearAndGoToSetup} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">New Test</button>
        </div>
        <div className="mt-6 space-y-4">
          {review.map((item, index) => {
            const unanswered = item.userAnswer === "No answer" || !String(item.userAnswer ?? "").trim();
            return <article key={`${item.question?.id || "question"}-${index}`} className={`rounded-2xl border p-5 ${item.isCorrect ? "border-green-300 bg-green-50" : unanswered ? "border-gray-300 bg-gray-50" : "border-red-300 bg-red-50"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><span className="text-xs font-semibold text-gray-500">Q{index + 1}</span><span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700">{String(item.question?.type || "question").toUpperCase()}</span><span className="text-xs text-gray-500">({item.marks || 1} mark{(item.marks || 1) > 1 ? "s" : ""})</span></div>
                  <p className="mt-2 font-semibold text-gray-900">{item.question?.question}</p>
                  <p className="mt-3 text-sm text-gray-700"><span className="font-semibold">Your answer:</span> {item.userAnswer || "No answer"}</p>
                  {!item.isCorrect && <p className="mt-1 text-sm text-green-700"><span className="font-semibold">Correct answer:</span> {item.correctAnswer}</p>}
                  {item.explanation && <details className="mt-3"><summary className="cursor-pointer text-sm font-semibold text-blue-600">💡 Explanation</summary><p className="mt-2 rounded-lg bg-white p-3 text-sm text-gray-700">{item.explanation}</p></details>}
                </div>
                <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${item.isCorrect ? "bg-green-200 text-green-800" : unanswered ? "bg-gray-200 text-gray-700" : "bg-red-200 text-red-800"}`}>{item.isCorrect ? "Correct" : unanswered ? "Unanswered" : "Incorrect"}</span>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">🏆 Leaderboard</h2>
        <p className="mt-1 text-sm text-gray-700">Live leaderboard integration is not enabled yet.</p>
      </section>
    </div>
  </ResultShell>;
}

function ResultShell({ children }) {
  return <main className="min-h-screen bg-gradient-to-b from-white to-blue-50"><Navbar /><div className="h-20 sm:h-24 lg:h-28" />{children}<Footer /></main>;
}

function Metric({ label, value }) {
  return <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 text-center"><p className="text-sm font-semibold text-gray-700">{label}</p><p className="mt-2 text-3xl font-bold text-blue-600">{value}</p></div>;
}

function Breakdown({ label, value, className }) {
  return <div className={`rounded-xl border p-4 text-center ${className}`}><p className="text-sm font-semibold">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>;
}

function TopicList({ title, description, topics, emptyText, tone }) {
  const classes = tone === "green" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800";
  return <section className={`rounded-3xl border ${tone === "green" ? "border-green-200" : "border-red-200"} bg-white p-6 shadow-sm`}><h2 className="text-xl font-bold text-gray-900">{title}</h2><p className="mt-1 text-sm text-gray-700">{description}</p>{topics.length ? <ul className="mt-5 space-y-3">{topics.map((topic) => <li key={topic.topic} className={`flex items-center justify-between gap-3 rounded-xl border p-4 ${classes}`}><span className="text-sm font-semibold">{topic.topic}</span><span className="shrink-0 text-sm font-bold">{topic.correct}/{topic.total} · {topic.accuracy}%</span></li>)}</ul> : <p className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">{emptyText}</p>}</section>;
}
