import Link from "next/link";

const milestones = [
  "Problem understanding & requirements",
  "Class and data design",
  "Constructors and methods",
  "Search and sort logic",
  "Validation and edge cases",
  "Testing and report generation",
  "Viva preparation",
];

export default function ClassXIProjectPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <Link href="/isc/class-xi/practicals" className="text-sm font-medium text-slate-600 hover:text-slate-900">← Back to Practicals</Link>
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">ISC Class XI Project</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Student Performance Management System</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">A guided Java project that turns the year’s concepts into one working application. Students build and explain the solution instead of submitting an unexplained code dump.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 p-4"><p className="text-xs font-semibold text-slate-500">Language</p><p className="mt-1 font-bold">Java</p></div>
            <div className="rounded-2xl bg-slate-100 p-4"><p className="text-xs font-semibold text-slate-500">Level</p><p className="mt-1 font-bold">ISC XI</p></div>
            <div className="rounded-2xl bg-slate-100 p-4"><p className="text-xs font-semibold text-slate-500">Core focus</p><p className="mt-1 font-bold">OOP + Arrays + Methods</p></div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Required features</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Add and display student records.</li>
              <li>Search by roll number.</li>
              <li>Calculate total, average and grade.</li>
              <li>Find highest/lowest performers.</li>
              <li>Sort records by marks.</li>
              <li>Validate invalid marks and missing searches.</li>
              <li>Generate a clean student report.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Build milestones</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-600">
              {milestones.map((milestone, index) => (
                <li key={milestone} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{index + 1}</span><span>{milestone}</span></li>
              ))}
            </ol>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Minimum testing</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["Empty record set", "One student", "Multiple students", "Equal marks / ties", "Invalid marks", "Search hit + miss", "Highest/lowest tie", "Boundary values"].map((test) => (
              <div key={test} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">{test}</div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
          <h2 className="text-2xl font-bold">Viva checkpoints</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Be prepared to explain your class design, constructor choices, methods, search/sort algorithm, validation logic and one edge case without reading the source code.</p>
        </section>
      </div>
    </main>
  );
}
