import Link from "next/link";

const modules = [
  {
    title: "Boolean Algebra & Logic Gates",
    description: "Truth tables, Boolean laws, logic gates, gate conversion, minterms/maxterms, canonical SOP/POS and worked examples.",
    href: "/isc/class-xii/boolean-algebra",
    badge: "Flagship",
    topics: ["Truth Tables", "Logic Gates", "Boolean Laws", "SOP/POS"],
  },
  {
    title: "Canonical Forms",
    description: "Canonical SOP/POS, minterms and maxterms are covered in the main Boolean Algebra module.",
    href: "/isc/class-xii/boolean-algebra/canonical-forms",
    badge: "Core Skill",
    topics: ["Minterms", "Maxterms", "Σm / ΠM", "Conversion"],
  },
  {
    title: "K-Map",
    description: "Karnaugh-map based minimisation with guided examples and exam traps.",
    href: "/isc/class-xii/k-map",
    badge: "Core Skill",
    topics: ["Gray Code", "Grouping", "Minimisation"],
  },
  {
    title: "Combinational Logic",
    description: "Combinational-circuit concepts, encoders, decoders, multiplexers, half adders and full adders.",
    href: "/isc/class-xii/combinational-logic",
    badge: "Application",
    topics: ["Half Adder", "Full Adder", "MUX", "Truth Tables"],
  },
  {
    title: "Boolean Word Problems",
    description: "Translate real-world statements into Boolean expressions and verify the result.",
    href: "/isc/class-xii/boolean-algebra/word-problems",
    badge: "Problem Solving",
    topics: ["Translation", "Worked Examples", "Practice"],
  },
  {
    title: "Class XII Practice Test",
    description: "Timed ISC-style practice covering Boolean algebra, logic gates, adders, K-Maps and word problems.",
    href: "/mock-test?board=ISC&class=12&subject=Computer%20Science",
    badge: "Exam Mode",
    topics: ["Practice Test", "Board Style", "Timed"],
  },
];

export default function ISCClassXIIPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/isc" className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">← ICSE &amp; ISC Home</Link>
        <header className="mt-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">ISC Class XII · Computer Science</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Learn Class XII smarter.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">Access the mapped Class XII learning modules from one student-facing hub, with routes that point only to verified pages.</p>
        </header>
        <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="ISC Class XII learning modules">
          {modules.map((module) => (
            <Link key={`${module.title}-${module.href}`} href={module.href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white dark:bg-white dark:text-slate-950">{module.badge}</span>
                <span className="text-sm font-semibold text-slate-400">Open →</span>
              </div>
              <h2 className="mt-6 text-2xl font-black">{module.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{module.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {module.topics.map((topic) => <span key={topic} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">{topic}</span>)}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}