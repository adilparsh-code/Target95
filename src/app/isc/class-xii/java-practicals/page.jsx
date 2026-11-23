import Link from "next/link";
import { ISC_XII_JAVA_PRACTICALS, ISC_XII_JAVA_PRACTICAL_COUNTS } from "@/app/data/iscXIIJavaPracticalAssignments";

export const metadata = { title: "ISC Class XII Java Practical Assignments | Target95" };

const categories = [
  "Methods",
  "Single-dimensional arrays",
  "Double-dimensional arrays",
  "String handling",
  "Inheritance",
];

export default function ISCClassXIIJavaPracticalsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/isc/class-xii" className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">← ISC Class XII</Link>
        <header className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400">ISC · Computer Science · Java</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">Java Practical Assignments</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">Twenty structured Java assignments arranged by the prescribed Class XII practical distribution. Each solution includes its objective, variables, algorithm, complete source code and sample run.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => <span key={category} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{category}: {ISC_XII_JAVA_PRACTICAL_COUNTS[category]}</span>)}
          </div>
        </header>
        {categories.map((category) => {
          const assignments = ISC_XII_JAVA_PRACTICALS.filter((item) => item.category === category);
          return (
            <section key={category} className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-black">{category}</h2>
                <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-bold dark:bg-slate-800">{assignments.length} assignments</span>
              </div>
              <div className="grid gap-4">
                {assignments.map((item, index) => (
                  <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{item.id} · {item.difficulty}</p>
                      <span className="text-xs font-semibold text-slate-500">Assignment {index + 1}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.objective}</p>
                    <details className="mt-4">
                      <summary className="cursor-pointer rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold dark:bg-slate-800">Open complete solution</summary>
                      <div className="mt-4 grid gap-5">
                        <div>
                          <h4 className="text-sm font-bold">Variables</h4>
                          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.variables}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold">Algorithm</h4>
                          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.algorithm.map((step, i) => <li key={i}>{step}</li>)}</ol>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold">Java Program</h4>
                          <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100"><code>{item.code}</code></pre>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div><h4 className="text-sm font-bold">Sample Input</h4><pre className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">{item.sampleInput}</pre></div>
                          <div><h4 className="text-sm font-bold">Sample Output</h4><pre className="mt-2 whitespace-pre-wrap rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">{item.sampleOutput}</pre></div>
                        </div>
                        <div><h4 className="text-sm font-bold">Concepts</h4><div className="mt-2 flex flex-wrap gap-2">{item.concepts.map((concept) => <span key={concept} className="rounded-full border border-slate-200 px-3 py-1 text-xs dark:border-slate-700">{concept}</span>)}</div></div>
                      </div>
                    </details>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
