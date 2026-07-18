"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getStudyChapters } from "../../../lib/studyCenter";
import useStudyProgress from "../../hooks/useStudyProgress";

export default function StudyHome() {
  const chapters = useMemo(() => getStudyChapters(), []);
  const [search, setSearch] = useState("");
  const { progress } = useStudyProgress();

  const filteredChapters = chapters.filter((chapter) => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      chapter.title.toLowerCase().includes(query) ||
      chapter.slug.toLowerCase().includes(query) ||
      chapter.difficulty.toLowerCase().includes(query)
    );
  });

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="study-home-heading">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Study Center</p>
        <h1 id="study-home-heading" className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Learn before you practice</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">
          Explore chapter notes, key concepts, and revision points before attempting practice questions.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <label className="text-sm font-semibold text-gray-900" htmlFor="study-search">
          <span className="mb-2 block">Search notes</span>
          <input
            id="study-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            placeholder="Search by chapter or difficulty"
          />
        </label>
      </div>

      <div className="grid gap-5 lg:grid-cols-2" role="list" aria-label="Study chapters">
        {filteredChapters.map((chapter) => {
          const status = progress[chapter.slug] ?? "Not Started";
          const percentComplete = status === "Completed" ? 100 : status === "Studying" ? 60 : 0;

          return (
            <article key={chapter.slug} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm" role="listitem">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{chapter.title}</h2>
                  <p className="mt-2 text-sm text-gray-700">{chapter.difficulty}</p>
                </div>
                <span className="rounded-full border border-gray-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-gray-700">
                  {status}
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-slate-50 p-3">
                  <p className="text-sm text-gray-700">Questions</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">{chapter.totalQuestions}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-slate-50 p-3">
                  <p className="text-sm text-gray-700">Study Time</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">{chapter.estimatedStudyTime}</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-slate-50 p-3">
                  <p className="text-sm text-gray-700">Difficulty</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">{chapter.easyCount} easy</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm text-gray-700">
                  <span>Reading Progress</span>
                  <span>{percentComplete}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${percentComplete}%` }} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/study/${chapter.slug}`}
                  className="rounded-xl border border-blue-300 bg-blue-100 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-blue-400 hover:bg-blue-200"
                >
                  Continue Studying
                </Link>
                <Link
                  href={`/java/${chapter.slug}`}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400"
                >
                  Practice Questions
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
