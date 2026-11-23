import Link from "next/link";
import { getAllClassXTopicContent } from "@/lib/icseClassXContent";

export const metadata = { title: "ICSE Class X Java Lessons | Target95" };

export default function ICSEClassXLessonsPage() {
  const topics = getAllClassXTopicContent();
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/icse/class-x" className="text-sm font-semibold text-slate-600 hover:text-slate-900">← Back to Class X</Link>
        <header className="mt-6 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-9">
          <p className="text-sm font-bold uppercase tracking-wider text-slate-500">CISCE · ICSE · 2028 syllabus</p>
          <h1 className="mt-2 text-4xl font-black">Class X Computer Applications</h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">Eight syllabus-aligned lessons with core concepts, revision points, MCQs, exam practice and practical tasks. Disruptive Technologies remains a separate theory/project topic.</p>
        </header>
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <Link key={topic.topicId} href={`/icse/class-x/lessons/${topic.topicId}`} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-blue-300">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Lesson {index + 1}</p>
              <h2 className="mt-2 text-xl font-bold">{topic.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{topic.learningObjectives?.[0]}</p>
              <p className="mt-4 text-sm font-semibold text-blue-700">Open lesson →</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
