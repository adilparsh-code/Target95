"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CATEGORIES, DIFFICULTIES, QUESTION_TYPES, QUESTION_COUNTS, getMockTestHistory } from "../../lib/mocktest";
import ProtectedRoute from "../components/ProtectedRoute";
import { javaChapters } from "../data/javaCurriculum";
import ErrorBoundary from "../components/ui/ErrorBoundary";

const CBSE_SUBJECTS = {
  "402": "Information Technology",
  "083": "Computer Science",
  "065": "Informatics Practices",
  "802": "Information Technology",
};

export default function MockTestNewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contextBoard = (searchParams.get("board") || "ICSE").toUpperCase();
  const contextClass = Number(searchParams.get("class") || (contextBoard === "ICSE" ? 10 : contextBoard === "ISC" ? 12 : 10));
  const contextSubjectCode = searchParams.get("subjectCode") || "";
  const contextSubject = searchParams.get("subject") || CBSE_SUBJECTS[contextSubjectCode] || "";
  const contextCategory = `${contextBoard.toLowerCase()}-class-${contextClass}`;

  const [category, setCategory] = useState(CATEGORIES.some((item) => item.id === contextCategory) ? contextCategory : "icse-class-10");
  const [difficulty, setDifficulty] = useState("medium");
  const [type, setType] = useState("mixed");
  const [count, setCount] = useState(10);
  const [chapter, setChapter] = useState("all");
  const [mode, setMode] = useState("exam");
  const [duration, setDuration] = useState(contextBoard === "CBSE" ? 30 : 30);
  const history = useMemo(() => getMockTestHistory(), []);

  const activeBoard = category.startsWith("cbse-") ? "CBSE" : category.startsWith("isc-") ? "ISC" : "ICSE";
  const activeClass = Number(category.split("-").pop());
  const activeSubjectCode = activeBoard === "CBSE" ? (contextSubjectCode || (activeClass <= 10 ? "402" : "083")) : "";
  const activeSubject = activeBoard === "CBSE" ? (CBSE_SUBJECTS[activeSubjectCode] || contextSubject || "CBSE Subject") : activeBoard === "ISC" ? "Computer Science (Java)" : "Computer Applications (Java)";

  const handleStart = () => {
    const params = new URLSearchParams({ board: activeBoard, class: String(activeClass), category, chapter, difficulty, type, count: String(count), mode, duration: String(duration) });
    if (activeSubjectCode) params.set("subjectCode", activeSubjectCode);
    params.set("subject", activeSubject);
    router.push(`/mock-test/instructions?${params.toString()}`);
  };

  const handleRetake = (result) => {
    const params = new URLSearchParams({
      board: result.board || (result.category?.startsWith("cbse-") ? "CBSE" : result.category?.startsWith("isc-") ? "ISC" : "ICSE"),
      class: String(result.classNumber || Number(result.category?.split("-").pop()) || 10),
      category: result.category || "icse-class-10",
      chapter: result.chapter || "all",
      difficulty: result.difficulty || "medium",
      type: result.type || "mixed",
      count: String(result.totalQuestions || 10),
      mode: result.mode || "exam",
      duration: String(result.totalTime ? Math.round(result.totalTime / 60) : 30),
    });
    if (result.subjectCode) params.set("subjectCode", result.subjectCode);
    if (result.subject) params.set("subject", result.subject);
    router.push(`/mock-test/instructions?${params.toString()}`);
  };

  const softCard = "rounded-[26px] border border-slate-200/80 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.045)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70";
  const option = (active) => `rounded-2xl border p-3.5 text-center transition-all duration-200 ${active ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm dark:border-blue-400 dark:bg-blue-950/45 dark:text-blue-300" : "border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200"}`;
  const labelClass = "text-sm font-semibold text-slate-900 dark:text-slate-100";
  const selectClass = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal text-slate-800 shadow-sm outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100";

  return <ProtectedRoute><main className="min-h-screen bg-transparent"><Navbar /><div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10"><ErrorBoundary>
    <section className={`${softCard} p-5 sm:p-7`}><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">{activeBoard} • Class {activeClass}{activeSubjectCode ? ` • Code ${activeSubjectCode}` : ""}</p><h1 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl dark:text-white">Build your test.</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">Choose your board, class and subject context, then configure the test.</p></section>
    <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]"><section className={`${softCard} p-5 sm:p-7`}>
      <p className={labelClass}>Test Category</p><div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">{CATEGORIES.map((cat) => <button key={cat.id} type="button" onClick={() => { setCategory(cat.id); setChapter("all"); }} className={option(category === cat.id)}><span className="text-2xl">{cat.icon}</span><p className="mt-1 text-xs font-semibold">{cat.label}</p></button>)}</div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2"><div><p className={labelClass}>Subject</p><div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-200">{activeSubject}{activeSubjectCode ? ` • Code ${activeSubjectCode}` : ""}</div></div><label className={labelClass}>Chapter<select value={chapter} onChange={(e) => setChapter(e.target.value)} className={selectClass}><option value="all">All Chapters</option>{activeBoard === "CBSE" ? <option value="all-topics">All Syllabus Topics</option> : javaChapters.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label></div>
      <div className="mt-7"><p className={labelClass}>Difficulty Level</p><div className="mt-3 grid grid-cols-3 gap-3">{DIFFICULTIES.map((diff) => <button key={diff.id} type="button" onClick={() => setDifficulty(diff.id)} className={option(difficulty === diff.id)}><span>{diff.icon}</span><p className="mt-1 text-xs font-semibold">{diff.label}</p></button>)}</div></div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2"><label className={labelClass}>Test Mode<select value={mode} onChange={(e) => setMode(e.target.value)} className={selectClass}><option value="practice">Practice Mode</option><option value="exam">Exam Mode</option><option value="revision">Revision Mode</option><option value="timed">Timed Mode</option></select></label><label className={labelClass}>Duration<select value={duration} onChange={(e) => setDuration(Number(e.target.value))} className={selectClass}><option value={15}>15 minutes</option><option value={30}>30 minutes</option><option value={45}>45 minutes</option><option value={60}>60 minutes</option></select></label></div>
      <div className="mt-7"><p className={labelClass}>Question Type</p><div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">{QUESTION_TYPES.map((qt) => <button key={qt.id} type="button" onClick={() => setType(qt.id)} className={option(type === qt.id)}><span>{qt.icon}</span><p className="mt-1 text-xs font-semibold">{qt.label}</p></button>)}</div></div>
      <div className="mt-7"><p className={labelClass}>Number of Questions</p><div className="mt-3 grid grid-cols-4 gap-3">{QUESTION_COUNTS.map((n) => <button key={n} type="button" onClick={() => setCount(n)} className={option(count === n)}><p className="text-sm font-bold">{n}</p></button>)}</div></div>
      <button type="button" onClick={handleStart} className="mt-8 w-full rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700">Start Mock Test</button>
    </section>
    <aside className="space-y-5"><section className={`${softCard} p-5 sm:p-6`}><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">History</p><h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">Recent results</h2>{history.length ? <div className="mt-4 space-y-3">{history.slice(0, 5).map((item) => <div key={item.id} className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/40"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{String(item.category || "Test").replace(/-/g, " ")}</p><span className="text-xs font-bold text-blue-600">{item.percentage}%</span></div><p className="mt-1 text-xs text-slate-500">Score: {item.score}/{item.totalQuestions}</p><div className="mt-3 flex justify-end"><button type="button" onClick={() => handleRetake(item)} className="text-xs font-semibold text-blue-600">Retake</button></div></div>)}</div> : <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">Complete a mock test to see results here.</div>}</section></aside></div>
  </ErrorBoundary></div><Footer /></main></ProtectedRoute>;
}
