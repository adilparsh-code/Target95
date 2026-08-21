import Link from "next/link";
import practicals from "@/app/data/iscXIPracticalPack";

export default function ISCClassXIPracticalsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ISC Class XI</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">Practicals &amp; Project Lab</h1>
            <p className="mt-3 max-w-3xl text-slate-600">Fresh, chapter-specific Java and Python practicals. Each task includes tests, edge cases and viva preparation.</p>
          </div>
          <Link href="/isc/class-xi/project" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Open Project Lab →</Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {practicals.map((task) => (
            <article key={task.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{task.language}</span>
                <span className="text-xs font-semibold text-slate-500">{task.difficulty}</span>
              </div>
              <h2 className="mt-4 text-xl font-bold">{task.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{task.problem}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full border border-slate-200 px-2 py-1">{task.topic}</span>
                <span className="rounded-full border border-slate-200 px-2 py-1">{task.marks} marks</span>
              </div>
              <div className="mt-5 space-y-2 text-sm text-slate-600">
                <p><strong>Expected:</strong> {task.expectedOutput}</p>
                <p><strong>Tests:</strong> {task.tests.join(" • ")}</p>
                <p><strong>Viva:</strong> {task.viva}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
