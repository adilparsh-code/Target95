import Link from "next/link";

const modules = [
  {
    title: "Boolean Algebra",
    description: "Truth tables, logic gates, Boolean laws, minterms/maxterms, canonical SOP/POS and combinational logic.",
    href: "/isc/class-xii/boolean-algebra",
    badge: "Flagship",
    topics: ["Truth Tables", "Logic Gates", "Boolean Laws", "SOP/POS"],
  },
  {
    title: "K-Map",
    description: "2-, 3- and 4-variable Karnaugh maps with Gray-code grids, wrap-around groups and worked examples.",
    href: "/isc/class-xii/k-map",
    badge: "Core Skill",
    topics: ["Gray Code", "Grouping", "Minimisation"],
  },
  {
    title: "Boolean Word Problems",
    description: "Story → Variables → Boolean Expression → Verification, with a keyword decoder and a practice ladder.",
    href: "/isc/class-xii/boolean-algebra/word-problems",
    badge: "Problem Solving",
    topics: ["Translation", "Worked Examples", "Practice"],
  },
];

export default function ISCClassXIIPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/isc" className="text-sm font-medium text-slate-600 hover:text-slate-900">← ICSE &amp; ISC Home</Link>
        <header className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">ISC Class XII · Computer Science</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Learn Class XII smarter.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Choose a learning module designed around concept clarity, exam reasoning and serious practice.</p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Class XII learning modules">
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
