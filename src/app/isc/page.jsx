import Link from "next/link";

const sections = [
  {
    title: "ICSE Class IX · Robotics & AI",
    description: "Robotics and Artificial Intelligence learning modules for ICSE Class IX.",
    href: "/isc/robotics-ai",
    badge: "ICSE IX",
  },
  {
    title: "ICSE Class X · AI",
    description: "Syllabus-aligned Class X Artificial Intelligence theory, Python and board-style practice.",
    href: "/isc/robotics-ai/class-x",
    badge: "ICSE X",
  },
  {
    title: "ISC Class XI",
    description: "Practicals and project work for ISC Class XI Computer Science.",
    href: "/isc/class-xi",
    badge: "ISC",
  },
  {
    title: "ISC Class XII",
    description: "Boolean Algebra, Logic Gates, K-Maps and related problem solving.",
    href: "/isc/class-xii",
    badge: "ISC",
  },
];

export default function ISCHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">← Target95 Home</Link>
        <header className="mt-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">ICSE &amp; ISC Computer Science</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Choose your class.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">A direct learning hub for the ICSE and ISC Computer Science content already available in Target95.</p>
        </header>
        <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4" aria-label="ICSE and ISC classes">
          {sections.map((section) => (
            <Link key={section.href} href={section.href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900">
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white dark:bg-white dark:text-slate-950">{section.badge}</span>
              <h2 className="mt-6 text-2xl font-black">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{section.description}</p>
              <span className="mt-6 inline-flex font-bold text-blue-600 dark:text-blue-400">Open section <span className="ml-2 transition-transform group-hover:translate-x-1">→</span></span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
