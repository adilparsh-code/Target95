import Link from "next/link";

const sections = [
  {
    title: "ICSE Class IX",
    description: "Robotics & AI — exam-ready units with learning goals and weightage.",
    href: "/isc/robotics-ai",
    badge: "ICSE",
  },
  {
    title: "ISC Class XI",
    description: "Java & Python practicals plus the guided Student Performance Management System project.",
    href: "/isc/class-xi",
    badge: "ISC",
  },
  {
    title: "ISC Class XII",
    description: "Boolean Algebra, K-Maps, and word-problem translation — built around exam reasoning.",
    href: "/isc/class-xii",
    badge: "ISC",
  },
];

export default function ISCHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">← Target95 Home</Link>
        <header className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">ICSE &amp; ISC Computer Science</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Choose your class.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Concept-first modules, practicals and exam-style practice for ICSE Class IX and ISC Class XI-XII.</p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="ICSE and ISC class sections">
          {sections.map((section) => (
            <Link key={section.href} href={section.href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">{section.badge}</span>
                <span className="text-sm text-slate-400 group-hover:text-slate-700">Open →</span>
              </div>
              <h2 className="mt-5 text-2xl font-bold">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{section.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
