import Link from "next/link";
import { ICSE_CLASS_IX_PROJECT } from "@/app/data/icseClassIXProjects";

export const metadata = {
  title: "ICSE Class IX Projects | Target95+",
  description:
    "Verified ICSE Class IX Computer Applications project guidance, assessment structure and viva preparation.",
};

export default function ICSEClassIXProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Back to Target95+
        </Link>

        <section className="mt-6 rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
            CISCE · ICSE Class IX · Computer Applications
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Class IX Projects
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            This section starts with the project explicitly required in the current
            CISCE syllabus. We keep the official requirement separate from Target95
            guidance so students know what the board requires and what is our teaching support.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                {ICSE_CLASS_IX_PROJECT.class}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Official syllabus topic
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold">{ICSE_CLASS_IX_PROJECT.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {ICSE_CLASS_IX_PROJECT.officialRequirement}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {ICSE_CLASS_IX_PROJECT.officialScope.map((item) => (
                <div key={item} className="rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/icse/class-ix/projects/ethical-computing"
              className="mt-7 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Open project guide →
            </Link>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Assessment</p>
            <p className="mt-2 text-3xl font-bold">20 marks</p>
            <p className="mt-1 text-sm text-slate-500">Written project</p>
            <div className="mt-6 space-y-3">
              {ICSE_CLASS_IX_PROJECT.assessment.writtenProjectBreakdown.map((item) => (
                <div key={item.criterion} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                  <span className="text-slate-600">{item.criterion}</span>
                  <span className="font-bold text-slate-900">{item.marks}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-500">
              Written project is part of the 100-mark Internal Assessment; the remaining 80 marks are assignments.
            </p>
          </aside>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">Target95 project method</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Understand", "Learn the official scope before choosing examples."],
              ["Research", "Collect reliable information and record references."],
              ["Write", "Build a clear introduction, content, presentation and conclusion."],
              ["Defend", "Prepare to explain your work in a viva without memorising paragraphs."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl bg-slate-50 p-4">
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
