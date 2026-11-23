import Link from "next/link";
import { CLASS_X_TOPICS } from "@/lib/icseSyllabus";
import { ICSE_CLASS_X_CONTENT_MAP } from "@/app/data/icseClassXContent";

const javaTopics = CLASS_X_TOPICS.filter((topic) => !topic.isProject);

export const metadata = {
  title: "ICSE Class X Java Chapters | Target95",
  description: "Chapter-wise ICSE Class X Java learning content, practice and practical tasks.",
};

export default function ICSEClassXJavaPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/icse/class-x" className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
          ← ICSE Class X
        </Link>
        <header className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">ICSE · Computer Applications</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Class X Java</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
            Study the seven Java-focused syllabus topics in sequence. Each chapter includes its available learning objectives, key concepts, revision points and board-style practice.
          </p>
        </header>
        <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="ICSE Class X Java chapters">
          {javaTopics.map((topic, index) => {
            const content = ICSE_CLASS_X_CONTENT_MAP[topic.topicId];
            return (
              <Link
                key={topic.topicId}
                href={`/icse/class-x/java/${topic.topicId}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Chapter {index + 1}</span>
                  <span className="text-xs font-semibold text-slate-500">{content ? `${content.mcqs?.length || 0} MCQs · ${content.practice?.length || 0} practice` : "Content pending"}</span>
                </div>
                <h2 className="mt-3 text-xl font-black">{topic.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{topic.description}</p>
                <span className="mt-5 inline-flex text-sm font-bold text-blue-700 dark:text-blue-400">Study chapter →</span>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
