"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CATEGORIES, DIFFICULTIES, QUESTION_TYPES, QUESTION_COUNTS, getMockTestHistory } from "../../lib/mocktest";
import ProtectedRoute from "../components/ProtectedRoute";
import { javaChapters } from "../data/javaCurriculum";
import ErrorBoundary from "../components/ui/ErrorBoundary";

export default function MockTestNewPage() {
  const router = useRouter();
  const [category, setCategory] = useState("icse-class-10");
  const [difficulty, setDifficulty] = useState("medium");
  const [type, setType] = useState("mixed");
  const [count, setCount] = useState(10);
  const [chapter, setChapter] = useState("all");
  const [mode, setMode] = useState("exam");
  const [duration, setDuration] = useState(30);

  const history = useMemo(() => getMockTestHistory(), []);

  const handleStart = () => {
    router.push(`/mock-test/instructions?category=${category}&chapter=${chapter}&difficulty=${difficulty}&type=${type}&count=${count}&mode=${mode}&duration=${duration}`);
  };

  const handleRetake = (result) => {
    const config = result;
    router.push(`/mock-test/instructions?category=${config.category || "icse-class-10"}&difficulty=${config.difficulty || "medium"}&type=${config.type || "mixed"}&count=${config.totalQuestions || 10}`);
  };

  const softCard = "rounded-[26px] border border-slate-200/80 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.045)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70";
  const option = (active) => `rounded-2xl border p-3.5 text-center transition-all duration-200 ${active ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm dark:border-blue-400 dark:bg-blue-950/45 dark:text-blue-300" : "border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200 dark:hover:border-slate-700"}`;
  const labelClass = "text-sm font-semibold text-slate-900 dark:text-slate-100";
  const selectClass = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal text-slate-800 shadow-sm outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100";

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-transparent">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
          <ErrorBoundary>
            <section className={`${softCard} p-5 sm:p-7`}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Practice / Mock Test</p>
              <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h1 className="text-2xl font-black tracking-[-0.035em] text-slate-950 sm:text-3xl dark:text-white">Build your test.</h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">Set the exam conditions you want to practise under, then start when you’re ready.</p>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">Timed • Configurable • Exam-focused</div>
              </div>
            </section>

            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
              <section className={`${softCard} p-5 sm:p-7`}>
                <div className="flex items-center justify-between gap-4">
                  <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Setup</p><h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">Test configuration</h2></div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">Step 1 of 1</span>
                </div>

                <div className="mt-7">
                  <p className={labelClass}>Test Category</p>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">{CATEGORIES.map((cat) => <button key={cat.id} type="button" onClick={() => setCategory(cat.id)} className={option(category === cat.id)}><span className="text-2xl">{cat.icon}</span><p className="mt-1 text-xs font-semibold">{cat.label}</p></button>)}</div>
                </div>

                <div className="mt-7">
                  <p className={labelClass}>Difficulty Level</p>
                  <div className="mt-3 grid grid-cols-3 gap-3">{DIFFICULTIES.map((diff) => <button key={diff.id} type="button" onClick={() => setDifficulty(diff.id)} className={option(difficulty === diff.id)}><span>{diff.icon}</span><p className="mt-1 text-xs font-semibold">{diff.label}</p></button>)}</div>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>Subject<select defaultValue="java" className={selectClass}><option value="java">Java Programming</option></select></label>
                  <label className={labelClass}>Chapter<select value={chapter} onChange={(event) => setChapter(event.target.value)} className={selectClass}><option value="all">All Chapters</option>{javaChapters.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>Test Mode<select value={mode} onChange={(event) => setMode(event.target.value)} className={selectClass}><option value="practice">Practice Mode</option><option value="exam">Exam Mode</option><option value="revision">Revision Mode</option><option value="timed">Timed Mode</option></select></label>
                  <label className={labelClass}>Duration<select value={duration} onChange={(event) => setDuration(Number(event.target.value))} className={selectClass}><option value={15}>15 minutes</option><option value={30}>30 minutes</option><option value={45}>45 minutes</option><option value={60}>60 minutes</option></select></label>
                </div>

                <div className="mt-7">
                  <p className={labelClass}>Question Type</p>
                  <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">{QUESTION_TYPES.map((qt) => <button key={qt.id} type="button" onClick={() => setType(qt.id)} className={option(type === qt.id)}><span>{qt.icon}</span><p className="mt-1 text-xs font-semibold">{qt.label}</p></button>)}</div>
                </div>

                <div className="mt-7">
                  <p className={labelClass}>Number of Questions</p>
                  <div className="mt-3 grid grid-cols-4 gap-3">{QUESTION_COUNTS.map((n) => <button key={n} type="button" onClick={() => setCount(n)} className={option(count === n)}><p className="text-sm font-bold">{n}</p></button>)}</div>
                </div>

                <button type="button" onClick={handleStart} className="mt-8 w-full rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_14px_30px_rgba(37,99,235,0.25)] dark:hover:bg-blue-500">Start Mock Test</button>
              </section>

              <aside className="space-y-5">
                <section className={`${softCard} p-5 sm:p-6`}>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">History</p>
                  <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">Recent results</h2>
                  {history.length > 0 ? <div className="mt-4 space-y-3">{history.slice(0, 5).map((item) => { const catLabel = item.category?.replace(/-/g, " ") || ""; return <div key={item.id} className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/40"><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{catLabel ? catLabel.replace(/\b\w/g, (c) => c.toUpperCase()) : "Test"}</p><span className={`text-xs font-bold ${item.percentage >= 70 ? "text-green-600" : item.percentage >= 40 ? "text-amber-600" : "text-red-600"}`}>{item.percentage}%</span></div><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Score: {item.score}/{item.totalQuestions} • {item.difficulty}</p><div className="mt-3 flex items-center justify-between"><p className="text-xs text-slate-400">{new Date(item.date).toLocaleDateString()}</p><button type="button" onClick={() => handleRetake(item)} className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Retake</button></div></div>; })}</div> : <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-400">Complete a mock test to see your results here.</div>}
                </section>
                {history.length > 0 && <section className={`${softCard} p-5 sm:p-6`}><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Overview</p><h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">Your numbers</h2><div className="mt-4 space-y-3"><div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-sm dark:bg-slate-950/50"><span className="text-slate-600 dark:text-slate-400">Tests taken</span><span className="font-bold text-slate-950 dark:text-white">{history.length}</span></div><div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-sm dark:bg-slate-950/50"><span className="text-slate-600 dark:text-slate-400">Best score</span><span className="font-bold text-green-600">{Math.max(...history.map((h) => h.percentage))}%</span></div><div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-sm dark:bg-slate-950/50"><span className="text-slate-600 dark:text-slate-400">Average score</span><span className="font-bold text-blue-600">{Math.round(history.reduce((s, h) => s + h.percentage, 0) / history.length)}%</span></div></div></section>}
              </aside>
            </div>
          </ErrorBoundary>
        </div>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
