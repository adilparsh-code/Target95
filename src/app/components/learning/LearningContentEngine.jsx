"use client";

import { useMemo, useState } from "react";
import { getLearningFilterOptions, learningQuestions, searchLearningQuestions } from "../../../lib/learningContent";
import useLearningProgress from "../../hooks/useLearningProgress";
import LearningQuestionCard from "./LearningQuestionCard";
import LearningJourneyNavigation from "./LearningJourneyNavigation";
import TopicRevisionPanel from "./TopicRevisionPanel";

const sections = ["Introduction", "Definition", "Explanation", "Real-life example", "Syntax", "Important points", "Key terms", "Common mistakes", "Tips & tricks", "Revision notes", "Summary", "FAQs"];

const isNonEmpty = (value) => {
  if (Array.isArray(value)) return value.length > 0;
  return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
};

function SelectFilter({ label, value, options, onChange }) {
  return <label className="block text-xs font-semibold text-gray-700"><span className="mb-1 block">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800"><option value="">All {label.toLowerCase()}s</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

export default function LearningContentEngine({ topic, allTopics }) {
  const { attempts, completedTopics, stats, recordAttempt, toggleTopicComplete } = useLearningProgress();
  const [filters, setFilters] = useState({ query: "", subject: "", chapter: topic.title, difficulty: "", type: "" });
  const [practiceDifficulty, setPracticeDifficulty] = useState("All");
  const options = useMemo(() => getLearningFilterOptions(learningQuestions), []);
  const results = useMemo(() => searchLearningQuestions(learningQuestions, filters), [filters]);
  const topicQuestions = topic.questions.filter((question) => practiceDifficulty === "All" || question.difficulty === practiceDifficulty);
  const attemptedInTopic = topic.questions.filter((question) => attempts[question.id]).length;
  const completion = topic.questions.length ? Math.round((attemptedInTopic / topic.questions.length) * 100) : 0;
  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  const contentSections = [
    { title: "Introduction", content: topic.introduction, render: (value) => <p className="mt-2 text-sm leading-6 text-gray-700">{value}</p> },
    { title: "Definition", content: topic.definition, render: (value) => <p className="mt-2 text-sm leading-6 text-gray-700">{value}</p> },
    { title: "Explanation", content: topic.detailedExplanation, render: (value) => <p className="mt-2 text-sm leading-6 text-gray-700">{value}</p> },
    { title: "Real-life example", content: topic.example, render: (value) => <p className="mt-2 text-sm leading-6 text-gray-700">{value}</p> },
    { title: "Syntax", content: topic.syntax, render: (value) => <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-3 text-xs text-slate-100">{value}</pre> },
    { title: "Important points", content: topic.importantPoints, render: (value) => <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">{value.map((item) => <li key={item}>{item}</li>)}</ul> },
    { title: "Key terms", content: topic.keyTerms, render: (value) => <div className="mt-3 flex flex-wrap gap-2">{value.map((term) => <span key={term} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">{term}</span>)}</div> },
    { title: "Common mistakes", content: topic.mistakes, render: (value) => <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">{value.map((item) => <li key={item}>{item}</li>)}</ul> },
    { title: "Tips & tricks", content: topic.tips, render: (value) => <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">{value.map((item) => <li key={item}>{item}</li>)}</ul> },
    { title: "Revision notes", content: topic.revisionNotes, render: (value) => <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">{value.map((item) => <li key={item}>{item}</li>)}</ul> },
    { title: "Summary", content: topic.summary, render: (value) => <p className="mt-2 text-sm leading-6 text-gray-700">{value}</p> },
    { title: "FAQs", content: topic.faqs, render: (value) => <div className="mt-2 space-y-3">{value.map((faq) => <div key={faq.question}><p className="text-sm font-semibold text-gray-800">{faq.question}</p><p className="text-sm text-gray-600">{faq.answer}</p></div>)}</div> },
  ].filter(({ content }) => isNonEmpty(content));

  return <div className="space-y-6">
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm" aria-labelledby="topic-learning-heading">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div><p className="text-sm font-semibold uppercase tracking-widest text-blue-700">{topic.board} · {topic.class} · {topic.subject}</p><h2 id="topic-learning-heading" className="mt-2 text-2xl font-bold text-gray-900">Complete learning path: {topic.title}</h2><p className="mt-2 max-w-3xl leading-7 text-gray-700">{topic.introduction}</p></div><button type="button" onClick={() => toggleTopicComplete(topic.slug)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${completedTopics[topic.slug] ? "bg-green-100 text-green-800" : "bg-blue-600 text-white"}`}>{completedTopics[topic.slug] ? "Topic completed" : "Mark topic complete"}</button></div>
      <LearningJourneyNavigation topic={topic} />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-gray-500">Topic progress</p><p className="text-lg font-bold text-gray-900">{completion}%</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-gray-500">Attempted</p><p className="text-lg font-bold text-gray-900">{stats.attempted}</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-gray-500">Solved</p><p className="text-lg font-bold text-gray-900">{stats.solved}</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-gray-500">Accuracy</p><p className="text-lg font-bold text-gray-900">{stats.accuracy}%</p></div></div>
    </section>

    <section id="learn" className="grid gap-4 md:grid-cols-2">{contentSections.map(({ title, content, render }) => <div key={title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><h3 className="font-bold text-gray-900">{title}</h3>{render(content)}</div>)}</section>

    <section className="rounded-3xl border border-dashed border-blue-300 bg-blue-50 p-6"><h3 className="font-bold text-blue-950">Diagram / illustration</h3><p className="mt-1 text-sm text-blue-900">A curriculum-reviewed visual will be shown here when a visual asset is mapped to this topic.</p></section>

    {isNonEmpty(topic.examTips) && <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-gray-900">Exam tips</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">{topic.examTips.map((tip) => <li key={tip}>{tip}</li>)}</ul></section>}

    <section id="practice" className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="text-xl font-bold text-gray-900">Practice questions</h2><p className="text-sm text-gray-600">MCQ, theory, programming, practice, and challenge questions are tracked as you study.</p></div><div className="flex gap-2">{["All", "Easy", "Medium", "Hard"].map((level) => <button key={level} type="button" onClick={() => setPracticeDifficulty(level)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${practiceDifficulty === level ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>{level}</button>)}</div></div>{topicQuestions.length ? <div className="mt-5 grid gap-4 lg:grid-cols-3">{topicQuestions.map((question) => <LearningQuestionCard key={question.id} question={question} attempt={attempts[question.id]} onAttempt={recordAttempt} />)}</div> : <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-gray-600">No practice questions match this difficulty.</p>}</section>

    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-gray-900">Question search & filters</h2><p className="mt-1 text-sm text-gray-600">Search by chapter, topic, keyword, difficulty, or question type.</p><div className="mt-4 grid gap-3 md:grid-cols-5"><label className="md:col-span-2 text-xs font-semibold text-gray-700"><span className="mb-1 block">Search</span><input value={filters.query} onChange={(event) => updateFilter("query", event.target.value)} placeholder="e.g. loop, Java, medium" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></label><SelectFilter label="Subject" value={filters.subject} options={options.subjects} onChange={(value) => updateFilter("subject", value)} /><SelectFilter label="Chapter" value={filters.chapter} options={options.chapters} onChange={(value) => updateFilter("chapter", value)} /><SelectFilter label="Difficulty" value={filters.difficulty} options={options.difficulties} onChange={(value) => updateFilter("difficulty", value)} /></div><div className="mt-3 max-w-xs"><SelectFilter label="Question type" value={filters.type} options={options.types} onChange={(value) => updateFilter("type", value)} /></div><p className="mt-4 text-sm font-semibold text-gray-700">{results.length} matching question{results.length === 1 ? "" : "s"}</p>{results.length ? <div className="mt-4 grid gap-4 lg:grid-cols-2">{results.slice(0, 6).map((question) => <LearningQuestionCard key={question.id} question={question} attempt={attempts[question.id]} onAttempt={recordAttempt} />)}</div> : <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-gray-600">No questions match the selected filters.</p>}</section>

    <TopicRevisionPanel topic={topic} allTopics={allTopics} />
  </div>;
}
