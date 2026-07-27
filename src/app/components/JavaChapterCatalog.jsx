"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useProgress from "../hooks/useProgress";

const filters = {
  difficulty: ["All", "Beginner", "Intermediate", "Advanced"],
  status: ["All", "Completed", "In Progress", "Not Started"],
};

function getProgress(chapter, isCompleted) {
  const completed = chapter.questions.filter((question) => isCompleted({ chapter: chapter.slug, questionId: question.id })).length;
  const percentage = Math.round((completed / chapter.questionCount) * 100);
  return { completed, percentage, status: percentage === 100 ? "Completed" : completed ? "In Progress" : "Not Started" };
}

export default function JavaChapterCatalog({ subject }) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [status, setStatus] = useState("All");
  const { isCompleted } = useProgress();
  const progress = useMemo(() => subject.chapters.map((chapter) => ({ chapter, ...getProgress(chapter, isCompleted) })), [isCompleted, subject.chapters]);
  const totals = useMemo(() => {
    const completed = progress.reduce((total, item) => total + item.completed, 0);
    const questions = subject.chapters.reduce((total, chapter) => total + chapter.questionCount, 0);
    const next = progress.flatMap(({ chapter }) => chapter.questions.map((question) => ({ ...question, chapterSlug: chapter.slug }))).find((question) => !isCompleted({ chapter: question.chapterSlug, questionId: question.id }));
    return { completed, questions, percentage: questions ? Math.round((completed / questions) * 100) : 0, next };
  }, [isCompleted, progress, subject.chapters]);
  const visible = useMemo(() => progress.filter((item) => {
    const text = [item.chapter.title, item.chapter.description, ...item.chapter.topics].join(" ").toLowerCase();
    return (!search.trim() || text.includes(search.trim().toLowerCase())) && (difficulty === "All" || item.chapter.difficulty === difficulty) && (status === "All" || item.status === status);
  }), [difficulty, progress, search, status]);
  const minutesLeft = Math.round(subject.estimatedStudyTime * ((totals.questions - totals.completed) / totals.questions));

  return <div className="py-8 sm:py-12">
    <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">CISCE Computer Science</p><div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><h1 className="text-3xl font-bold text-blue-700 sm:text-4xl md:text-5xl">Java Programming</h1><p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-lg">{subject.description}</p></div><Link href={totals.next ? `/java/${totals.next.chapterSlug}/question/${totals.next.id}` : "/java"} className="inline-flex shrink-0 justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">Continue Learning</Link></div><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"><Stat value={subject.chapters.length} label="Chapters" /><Stat value={totals.questions} label="Questions" /><Stat value={`${Math.round(subject.estimatedStudyTime / 60)}h`} label="Study time" /><Stat value={`${totals.percentage}%`} label="Complete" /></div></section>
    <section className="mt-6 rounded-2xl border border-gray-200 bg-slate-50 p-5 sm:p-6"><div className="flex items-center justify-between gap-4"><div><h2 className="text-xl font-bold text-gray-900">Your Java Progress</h2><p className="mt-1 text-sm text-gray-600">{totals.completed} completed · {totals.questions - totals.completed} remaining · approximately {minutesLeft} minutes left</p></div><p className="text-2xl font-bold text-blue-700">{totals.percentage}%</p></div><div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200"><div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${totals.percentage}%` }} /></div></section>
    <section className="mt-10"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Java Chapters</h2><p className="mt-1 text-sm text-gray-600">Search a concept or filter by difficulty and progress.</p></div><p className="text-sm font-semibold text-gray-600">{visible.length} of {subject.chapters.length} chapters</p></div><div className="mt-5 grid gap-3 md:grid-cols-3"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search chapters" aria-label="Search chapters" className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /><Filter value={difficulty} options={filters.difficulty} label="Difficulty" onChange={setDifficulty} /><Filter value={status} options={filters.status} label="Progress status" onChange={setStatus} /></div><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((item) => <ChapterCard key={item.chapter.slug} {...item} />)}</div></section>
  </div>;
}

function Stat({ value, label }) { return <div className="rounded-xl border border-gray-200 bg-white p-3 text-center"><p className="text-2xl font-bold text-blue-700">{value}</p><p className="mt-1 text-xs text-gray-500">{label}</p></div>; }
function Filter({ value, options, label, onChange }) { return <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">{options.map((option) => <option key={option}>{option}</option>)}</select>; }
function ChapterCard({ chapter, completed, percentage, status }) { return <article className="flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-start justify-between gap-3"><h3 className="text-lg font-bold text-gray-900">{chapter.title}</h3><span className="shrink-0 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">{chapter.difficulty}</span></div><p className="mt-2 text-sm leading-relaxed text-gray-600">{chapter.description}</p><div className="mt-4 flex flex-wrap gap-2 text-xs font-medium"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-gray-700">{chapter.questionCount} questions</span><span className="rounded-full bg-purple-100 px-2.5 py-1 text-purple-700">{chapter.estimatedTime} min</span><span className="rounded-full bg-green-100 px-2.5 py-1 text-green-700">{status}</span></div><div className="mt-5"><div className="flex justify-between text-xs font-semibold text-gray-600"><span>{completed} completed</span><span>{percentage}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200"><div className="h-full rounded-full bg-blue-600" style={{ width: `${percentage}%` }} /></div></div><Link href={`/java/${chapter.slug}`} className="mt-5 inline-flex w-full justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">Start Learning</Link></article>; }
