import Link from "next/link";

const modules = [
  {
    title: "Practicals & Project Lab",
    description: "21 fresh, chapter-specific Java and Python practicals — each with tests, edge cases and viva prep.",
    href: "/isc/class-xi/practicals",
    badge: "21 Tasks",
    topics: ["Java", "Python", "Arrays", "OOP", "File I/O"],
  },
  {
    title: "Student Performance Management System",
    description: "The guided Class XI project — build one working Java application instead of submitting an unexplained code dump.",
    href: "/isc/class-xi/project",
    badge: "Project",
    topics: ["OOP", "Arrays", "Search & Sort", "Viva Prep"],
  },
];

export default function ISCClassXIPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/isc" className="text-sm font-medium text-slate-600 hover:text-slate-900">← ICSE &amp; ISC Home</Link>
        <header className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">ISC Class XI · Computer Science</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Learn Class XI smarter.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Practicals built around real exam skills, plus one guided project that ties the whole year together.</p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2" aria-label="Class XI learning modules">
          {modules.map((module) => (
            <Link key={module.href} href={module.href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">{module.badge}</span>
                <span className="text-sm text-slate-400 group-hover:text-slate-700">Open →</span>
              </div>
              <h2 className="mt-5 text-2xl font-bold">{module.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{module.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {module.topics.map((topic) => <span key={topic} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">{topic}</span>)}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
