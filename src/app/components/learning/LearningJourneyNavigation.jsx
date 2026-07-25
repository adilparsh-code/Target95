"use client";

import Link from "next/link";

export default function LearningJourneyNavigation({ topic }) {
  return (
    <nav className="mt-5 flex flex-wrap items-center gap-2 text-sm font-semibold" aria-label="Learning journey">
      <Link href="/study" className="rounded-lg bg-gray-100 px-3 py-2 text-gray-700 transition hover:bg-gray-200">Subject</Link>
      <span aria-hidden="true" className="text-gray-400">/</span>
      <Link href={`/study/${topic.slug}`} className="rounded-lg bg-gray-100 px-3 py-2 text-gray-700 transition hover:bg-gray-200">Chapter</Link>
      <span aria-hidden="true" className="text-gray-400">/</span>
      <span className="rounded-lg bg-gray-100 px-3 py-2 text-gray-700">Topic</span>
      <a href="#learn" className="rounded-lg bg-blue-50 px-3 py-2 text-blue-800 transition hover:bg-blue-100">Learn</a>
      <a href="#practice" className="rounded-lg bg-blue-50 px-3 py-2 text-blue-800 transition hover:bg-blue-100">Practice</a>
      <a href="#revision" className="rounded-lg bg-blue-50 px-3 py-2 text-blue-800 transition hover:bg-blue-100">Revision</a>
    </nav>
  );
}
