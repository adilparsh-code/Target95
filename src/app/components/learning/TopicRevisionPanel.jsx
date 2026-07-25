"use client";

import Link from "next/link";

export default function TopicRevisionPanel({ topic, allTopics }) {
  const relatedTopics = allTopics.filter((item) => item.slug !== topic.slug).slice(0, 4);

  return (
    <div id="revision" className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Frequently asked PYQs</h2>
          <div className="mt-4 space-y-3">
            {topic.pyqs.map((question) => <div key={question.prompt} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold text-blue-700">{question.year} · {question.marks} marks</p><p className="mt-1 text-sm leading-6 text-gray-800">{question.prompt}</p></div>)}
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Expected questions</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-gray-800">{topic.expectedQuestions.map((question) => <li key={question}>{question}</li>)}</ul>
        </div>
      </section>
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Related topics</h2>
        <div className="mt-4 flex flex-wrap gap-2">{relatedTopics.map((item) => <Link key={item.slug} href={`/study/${item.slug}`} className="rounded-full border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-50">{item.title}</Link>)}</div>
      </section>
    </div>
  );
}
