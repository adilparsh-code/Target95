import Link from "next/link";
import { getAllClassXITopicContent } from "@/lib/icseClassXIContent";

const practicals = [
  { title: "Number System Converter", description: "Build a Java utility for binary, octal, decimal and hexadecimal conversion.", topic: "System of Numeration", difficulty: "Medium" },
  { title: "Logic Gate Truth Table", description: "Generate truth tables and verify Boolean expressions.", topic: "Propositional Logic & Hardware", difficulty: "Easy" },
  { title: "Student Class", description: "Create objects, constructors and methods for student records.", topic: "OOP / Objects", difficulty: "Easy" },
  { title: "Array Search & Sort", description: "Implement linear search, binary search and sorting with tracing.", topic: "Arrays", difficulty: "Medium" },
  { title: "String Analyzer", description: "Count vowels, words, digits and analyse String operations.", topic: "Arrays, Strings", difficulty: "Medium" },
  { title: "Text File Analyzer", description: "Read a text file and report lines, words and characters.", topic: "I/O & Text Files", difficulty: "Hard" },
  { title: "Student Performance System", description: "Build the Class XI integrated Java project with classes, arrays, methods and reports.", topic: "Project", difficulty: "Advanced" },
];

export default function ClassXIPracticalsPage() {
  const topics = getAllClassXITopicContent();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">← Target95 Home</Link>
        <section className="mt-6 rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">ISC Class XI</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Practicals & Project Lab</h1>
          <p className="mt-3 max-w-3xl text-slate-300">Learn by building. Every task connects to a syllabus topic and is designed for coding, testing, debugging and viva preparation.</p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {practicals.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.difficulty}</span>
                <span className="text-xs font-medium text-slate-500">{item.topic}</span>
              </div>
              <h2 className="mt-4 text-xl font-bold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              <button className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50">Start Practical</button>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">Syllabus coverage</p>
              <h2 className="mt-1 text-2xl font-bold">{topics.length} Class XI topic foundations connected</h2>
            </div>
            <Link href="/isc/class-xi/project" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Open Project Brief</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
