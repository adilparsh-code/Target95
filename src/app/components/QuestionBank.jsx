"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import useBookmarks from "../hooks/useBookmarks";
import useProgress from "../hooks/useProgress";
import { filterQuestionBank, getQuestionBankFilters, questionBankQuestions } from "@/lib/questionBank";
import { getDifficultyColorClass, getQuestionTypeColorClass } from "@/lib/questionPresentation";

const initialFilters = { search: "", difficulty: "all", chapter: "all", topic: "all", questionType: "all", status: "all" };

export default function QuestionBank() {
  const [filters, setFilters] = useState(initialFilters);
  const [previewId, setPreviewId] = useState(null);
  const [visibleLimit, setVisibleLimit] = useState(24);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { isCompleted } = useProgress();
  const options = useMemo(() => getQuestionBankFilters(), []);
  const questions = useMemo(() => questionBankQuestions.map((question) => ({ ...question, isBookmarked: isBookmarked({ chapter: question.chapter, questionId: question.id }), isCompleted: isCompleted({ chapter: question.chapter, questionId: question.id }) })), [isBookmarked, isCompleted]);
  const results = useMemo(() => filterQuestionBank(questions, filters), [filters, questions]);
  const update = (key, value) => {
    setVisibleLimit(24);
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <header className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">Question Bank</p><h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Browse and practise with confidence</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">Search structured questions across subjects, chapters, topics, and learning outcomes.</p></header>
    <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6" aria-label="Question filters"><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3"><input value={filters.search} onChange={(event) => update("search", event.target.value)} placeholder="Search questions, chapters, topics, or tags" aria-label="Search questions" className="md:col-span-2 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /><Select label="Difficulty" value={filters.difficulty} values={options.difficulties} onChange={(value) => update("difficulty", value)} /><Select label="Chapter" value={filters.chapter} values={options.chapters} onChange={(value) => update("chapter", value)} /><Select label="Topic" value={filters.topic} values={options.topics} onChange={(value) => update("topic", value)} /><Select label="Question type" value={filters.questionType} values={options.questionTypes} onChange={(value) => update("questionType", value)} /><select value={filters.status} onChange={(event) => update("status", event.target.value)} aria-label="Learning status" className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm"><option value="all">All status</option><option value="bookmarked">Bookmarked</option><option value="completed">Completed</option><option value="unsolved">Unsolved</option></select></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold text-gray-700">{results.length} question{results.length === 1 ? "" : "s"} found</p><button type="button" onClick={() => { setFilters(initialFilters); setVisibleLimit(24); }} className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">Reset filters</button></div></section>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{results.slice(0, visibleLimit).map((question) => <QuestionBankCard key={question.id} question={question} preview={previewId === question.id} onPreview={() => setPreviewId((id) => id === question.id ? null : question.id)} onBookmark={() => toggleBookmark({ chapter: question.chapter, questionId: question.id })} />)}</div>
    {results.length > visibleLimit ? <div className="mt-6 text-center"><button type="button" onClick={() => setVisibleLimit((limit) => limit + 24)} className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">Show more questions</button></div> : null}
    {!results.length ? <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">No questions match these filters. Reset them to browse the complete bank.</div> : null}
  </div>;
}

function Select({ label, value, values, onChange }) { return <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm"><option value="all">All {label.toLowerCase()}s</option>{values.map((item) => <option key={item} value={item}>{item}</option>)}</select>; }
function QuestionBankCard({ question, preview, onPreview, onBookmark }) { return <article className="flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"><div className="flex items-start justify-between gap-3"><div className="flex flex-wrap gap-2"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getDifficultyColorClass(question.difficulty)}`}>{question.difficulty}</span><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getQuestionTypeColorClass(question.questionType)}`}>{question.questionType}</span>{question.isCompleted ? <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">Solved</span> : null}</div><button type="button" onClick={onBookmark} aria-label={question.isBookmarked ? "Remove bookmark" : "Bookmark question"} className="shrink-0 rounded-full border border-gray-200 p-2 text-blue-700">{question.isBookmarked ? "★" : "☆"}</button></div><h2 className="mt-4 text-base font-semibold leading-relaxed text-gray-900">{question.question}</h2><div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600"><span>{question.chapter}</span><span>• {question.topic}</span><span>• {question.marks} marks</span><span>• {question.estimatedTime} min</span></div>{preview ? <div className="mt-4 rounded-xl bg-blue-50 p-4 text-sm text-gray-700"><p className="font-semibold text-blue-800">Quick Preview</p><p className="mt-1">{question.explanation}</p>{question.codeSnippet ? <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100"><code>{question.codeSnippet}</code></pre> : null}</div> : null}<div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={onPreview} className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700">{preview ? "Hide Preview" : "Quick Preview"}</button><Link href={question.practiceHref} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Start Practice</Link></div></article>; }
