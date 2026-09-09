import Link from "next/link";

const modules = [
  {
    title: "Boolean Algebra",
    description: "Propositional logic, Boolean laws, truth tables, SOP/POS, minterms, maxterms, canonical/cardinal forms and K-map reduction up to four variables.",
    href: "/isc/class-xii/boolean-algebra",
    badge: "Section A",
    topics: ["Truth Tables", "Boolean Laws", "SOP/POS", "K-Maps"],
  },
  {
    title: "Computer Hardware",
    description: "Logic gates and circuit applications including half adders, full adders, encoders, decoders, multiplexers and universal NAND/NOR designs.",
    href: "/isc/class-xii/combinational-logic",
    badge: "Section A",
    topics: ["Gates", "Adders", "Encoders", "MUX"],
  },
  {
    title: "Methods – Object Parameters & Return",
    description: "Pass objects to methods, return object references and design reusable board-level algorithms.",
    href: "/isc/class-xii/methods-object-parameter-return",
    badge: "Section B",
    topics: ["Methods", "Objects", "Return Values"],
  },
  {
    title: "Arrays & String Handling",
    description: "Single and double-dimensional arrays, searching, sorting, matrix processing and Java String operations.",
    href: "/isc/class-xii/arrays-strings",
    badge: "Section B",
    topics: ["1D Arrays", "2D Arrays", "Search", "Strings"],
  },
  {
    title: "Recursion",
    description: "Base cases, recursive decomposition, tracing call/return sequences and writing terminating recursive algorithms.",
    href: "/isc/class-xii/recursion",
    badge: "Section B",
    topics: ["Base Case", "Tracing", "Algorithms"],
  },
  {
    title: "Inheritance & Interface",
    description: "Inheritance, overriding, dynamic method dispatch and interface-based design with board-style tracing and debugging.",
    href: "/isc/class-xii/inheritance-interface",
    badge: "Section B",
    topics: ["Inheritance", "Overriding", "Interface", "Polymorphism"],
  },
  {
    title: "Programming in Python",
    description: "Python variables, control flow, functions and core collections with output tracing, debugging and programming practice.",
    href: "/isc/class-xii/python",
    badge: "Section C",
    topics: ["Python", "Functions", "Lists", "Dictionaries"],
  },
  {
    title: "Data Structures",
    description: "Stacks, queues and structure-selection reasoning with practical tracing and debugging.",
    href: "/isc/class-xii/data-structures",
    badge: "Section C",
    topics: ["Stack", "Queue", "LIFO", "FIFO"],
  },
  {
    title: "Complexity & Big O",
    description: "Analyse growth of running time and additional space and compare common algorithmic complexity classes.",
    href: "/isc/class-xii/complexity-big-o",
    badge: "Section C",
    topics: ["Big O", "O(n)", "O(log n)", "O(n²)"],
  },
  {
    title: "Class XII Practice Test",
    description: "Timed ISC-style practice across the Class XII syllabus.",
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
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">The Class XII hub now maps the official 2028 syllabus into student-facing learning modules, practice and exam mode.</p>
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
