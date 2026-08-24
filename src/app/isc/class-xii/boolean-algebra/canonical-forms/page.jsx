import Link from "next/link";
import canonicalForms from "@/app/data/iscXIIBooleanCanonicalForms";

export default function BooleanCanonicalFormsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/isc/class-xii/boolean-algebra" className="text-sm font-medium text-slate-600 hover:text-slate-900">← Boolean Algebra</Link>
        <header className="mt-6 rounded-[2rem] bg-slate-950 p-8 text-white md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">ISC Class XII · Boolean Algebra</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">Truth Table → Minterm → Maxterm → Canonical SOP/POS</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{canonicalForms.title}. No blind memorisation: follow the row and the notation tells you exactly what to build.</p>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Minterm rule</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{canonicalForms.minterm}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Maxterm rule</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{canonicalForms.maxterm}</p>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">The two symbols students confuse</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {canonicalForms.notation.map((item) => (
              <div key={item.symbol} className="rounded-xl bg-slate-50 p-5">
                <code className="text-2xl font-bold">{item.symbol}</code>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.meaning}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {canonicalForms.examples.map((example) => (
            <article key={example.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">{example.title}</h2>
              <p className="mt-3 text-sm text-slate-500">Rows: {example.rows.join(", ")} · Binary: {example.binary.join(" → ")}</p>
              <div className="mt-4 space-y-2">
                {example.terms.map((term) => <div key={term} className="rounded-xl bg-slate-950 p-3 font-mono text-sm text-white">{term}</div>)}
              </div>
              <div className="mt-4 rounded-xl border border-slate-200 p-4 font-mono text-sm font-semibold">{example.result}</div>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Exam traps</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {canonicalForms.traps.map((trap) => <li key={trap} className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{trap}</li>)}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Practice</h2>
          <div className="mt-4 space-y-3">
            {canonicalForms.practice.map((item) => (
              <details key={item.id} className="rounded-xl border border-slate-200 p-4">
                <summary className="cursor-pointer text-sm font-semibold">{item.question}</summary>
                <p className="mt-3 text-sm text-slate-700"><strong>Answer:</strong> {item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
