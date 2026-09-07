import Link from 'next/link';
import { ISC_AI_2027 } from '@/app/data/iscArtificialIntelligence';

export default async function ISCArtificialIntelligencePage({ params }) {
  const { classNumber } = await params;
  const classNo = Number(classNumber);
  const course = ISC_AI_2027.classes[classNo];

  if (!course) return null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/isc" className="text-sm font-semibold text-slate-600 dark:text-slate-400">← ISC Hub</Link>
        <header className="mt-8 rounded-3xl bg-gradient-to-br from-violet-700 to-indigo-900 p-8 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">ISC · Artificial Intelligence (883)</p>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">Class {classNo} AI</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-violet-100">Complete syllabus-aligned theory for ISC Examination Year 2027, with project work kept in a separate section.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
            <span className="rounded-full bg-white/10 px-3 py-1.5">Theory · 70 marks</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Practical · 15 marks</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Projects separate</span>
          </div>
        </header>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">Theory</p>
              <h2 className="mt-1 text-3xl font-black">Syllabus Units</h2>
            </div>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-800 dark:bg-violet-950 dark:text-violet-200">{course.theoryUnits.length} units</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {course.theoryUnits.map((unit) => (
              <article key={unit.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black">{unit.title}</h3>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-slate-800">{unit.weightage} marks</span>
                </div>
                <ul className="mt-5 space-y-2 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {unit.topics.map((topic) => <li key={topic} className="list-disc">{topic}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Separate from theory</p>
          <h2 className="mt-1 text-3xl font-black">AI Projects</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {course.projects.map((project) => (
              <article key={project.id} className="rounded-2xl border border-emerald-200 bg-white p-5 dark:border-emerald-900 dark:bg-slate-900">
                <h3 className="font-black">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.outcome}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
