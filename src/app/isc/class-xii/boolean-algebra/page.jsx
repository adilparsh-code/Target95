import Link from "next/link";
import booleanAlgebra from "@/app/data/iscXIIBooleanAlgebra";

function Section({ number, title, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{number}</p>
      <h2 className="mt-1 text-2xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function TruthTable({ title, rows, columns = ["A", "B", "Y"] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold">{title}</div>
      <div className="overflow-x-auto">
        <table className="w-full text-center text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>{columns.map((column) => <th key={column} className="px-4 py-3 font-semibold">{column}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${title}-${index}`} className="border-t border-slate-200">
                {columns.map((column) => <td key={column} className="px-4 py-3 font-mono font-semibold">{row[column]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function BooleanAlgebraPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">← Target95 Home</Link>
        <header className="mt-6 rounded-[2rem] bg-slate-950 p-8 text-white md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">ISC Class XII · Flagship Chapter</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Boolean Algebra</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{booleanAlgebra.tagline}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {booleanAlgebra.masteryChecks.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-slate-400">{item.success}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="mt-8 grid gap-6">
          <Section number="01" title="The learning path">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {booleanAlgebra.learningPath.map((item, index) => (
                <article key={item.id} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold">{index + 1}</div>
                  <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.goal}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section number="02" title="Boolean language — the keywords you must own">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {booleanAlgebra.terminology.map((item) => (
                <article key={item.term} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-lg font-bold">{item.term}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.meaning}</p>
                  <code className="mt-4 block rounded-xl bg-slate-950 p-3 text-sm text-white">{item.example}</code>
                </article>
              ))}
            </div>
          </Section>

          <Section number="03" title="Gate cheat sheet — one glance before you solve">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {booleanAlgebra.gateTable.map((item) => (
                <article key={item.gate} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">{item.gate}</h3>
                    <code className="rounded-lg bg-slate-950 px-2 py-1 text-sm text-white">{item.notation}</code>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-800">{item.plain}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.mental}</p>
                  <TruthTable title={`${item.gate} truth table`} rows={item.gate === "NOT" ? [] : booleanAlgebra.truthTables[item.gate] || []} />
                </article>
              ))}
            </div>
            <div className="mt-4 max-w-md"><TruthTable title="NOT truth table" rows={booleanAlgebra.notTruthTable} columns={["A", "Y"]} /></div>
          </Section>

          <Section number="04" title="Truth tables — build them like a machine">
            <div className="grid gap-5 lg:grid-cols-2">
              <article className="rounded-2xl bg-slate-50 p-6">
                <h3 className="text-lg font-bold">The 5-step method</h3>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  {booleanAlgebra.truthTableMethod.map((step, index) => <li key={step}><span className="mr-2 font-bold">{index + 1}.</span>{step.replace(/^\d+\.\s*/, "")}</li>)}
                </ol>
              </article>
              <article className="rounded-2xl bg-slate-50 p-6">
                <h3 className="text-lg font-bold">Rows rule</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700"><strong>n variables → 2ⁿ rows.</strong> Two variables give 4 rows; three variables give 8 rows. Never skip an input combination.</p>
                <code className="mt-4 block rounded-xl bg-slate-950 p-4 font-mono text-sm text-white">00 → 01 → 10 → 11</code>
              </article>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {Object.entries(booleanAlgebra.truthTables).map(([gate, rows]) => <TruthTable key={gate} title={`${gate} — full 2-input truth table`} rows={rows} />)}
            </div>
          </Section>

          <Section number="05" title="Think in patterns, not memorisation">
            <div className="grid gap-5 lg:grid-cols-3">
              {booleanAlgebra.mentalModels.map((model) => (
                <article key={model.title} className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-bold">{model.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{model.explanation}</p>
                  <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium">{model.example}</div>
                </article>
              ))}
            </div>
          </Section>

          <Section number="06" title="Boolean law deck">
            <div className="grid gap-4 md:grid-cols-2">
              {booleanAlgebra.lawDeck.map((law) => (
                <article key={law.name} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-lg font-bold">{law.name}</h3><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Pattern</span></div>
                  <div className="mt-4 flex flex-wrap gap-2">{law.rules.map((rule) => <code key={rule} className="rounded-lg bg-slate-950 px-3 py-2 text-sm text-white">{rule}</code>)}</div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{law.intuition}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section number="07" title="Worked examples — see every rewrite">
            <div className="grid gap-5 lg:grid-cols-3">
              {booleanAlgebra.workedExamples.map((example) => (
                <article key={example.id} className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{example.level}</p>
                  <h3 className="mt-2 text-lg font-bold">{example.title}</h3>
                  <div className="mt-4 rounded-xl bg-slate-950 p-4 font-mono text-sm text-white">{example.expression}</div>
                  <div className="mt-4 space-y-3">{example.steps.map((step, index) => <div key={`${example.id}-${index}`} className="rounded-xl bg-slate-50 p-4"><p className="font-mono text-sm font-semibold">{step.line}</p><p className="mt-1 text-xs text-slate-500">{step.law} · {step.reason}</p></div>)}</div>
                  <p className="mt-4 text-sm leading-6 text-slate-600"><strong>Exam tip:</strong> {example.examTip}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section number="08" title="Truth-table challenges">
            <div className="grid gap-4 md:grid-cols-2">
              {booleanAlgebra.truthTableChallenges.map((item) => (
                <article key={item.id} className="rounded-2xl border border-slate-200 p-5">
                  <code className="text-sm font-semibold">{item.expression}</code>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.task}</p>
                  <details className="mt-4 rounded-xl bg-slate-50 p-4"><summary className="cursor-pointer text-sm font-semibold">Reveal result</summary><p className="mt-2 font-mono text-sm">{item.answer}</p></details>
                </article>
              ))}
            </div>
          </Section>

          <Section number="09" title="Minterms, maxterms, SOP & POS">
            <div className="grid gap-4 md:grid-cols-2">
              {booleanAlgebra.terminology.filter((item) => ["Minterm", "Maxterm", "Canonical SOP", "Canonical POS", "SOP", "POS"].includes(item.term)).map((item) => (
                <article key={item.term} className="rounded-2xl border border-slate-200 p-5"><h3 className="font-bold">{item.term}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.meaning}</p><code className="mt-3 block rounded-xl bg-slate-950 p-3 text-sm text-white">{item.example}</code></article>
              ))}
            </div>
          </Section>

          <Section number="10" title="MCQ + output + debugging">
            <div className="grid gap-6 lg:grid-cols-3">
              <div><h3 className="font-bold">MCQs</h3><div className="mt-3 space-y-3">{booleanAlgebra.mcqs.map((item) => <details key={item.id} className="rounded-xl border border-slate-200 p-4"><summary className="cursor-pointer text-sm font-semibold">{item.question}</summary><ul className="mt-3 space-y-1 text-sm text-slate-600">{item.options.map((option) => <li key={option}>{option}</li>)}</ul><p className="mt-3 text-sm"><strong>Answer:</strong> {item.answer}</p><p className="mt-1 text-sm text-slate-600">{item.explanation}</p></details>)}</div></div>
              <div><h3 className="font-bold">Output tracing</h3><div className="mt-3 space-y-3">{booleanAlgebra.outputTracing.map((item) => <details key={item.id} className="rounded-xl border border-slate-200 p-4"><summary className="cursor-pointer text-sm font-semibold">{item.question}</summary><p className="mt-3 text-sm"><strong>Answer:</strong> {item.answer}</p><p className="mt-1 text-sm text-slate-600">{item.explanation}</p></details>)}</div></div>
              <div><h3 className="font-bold">Debugging</h3><div className="mt-3 space-y-3">{booleanAlgebra.debugging.map((item) => <details key={item.id} className="rounded-xl border border-slate-200 p-4"><summary className="cursor-pointer text-sm font-semibold">{item.task}</summary><pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-white">{item.buggySteps.join("\n")}</pre><p className="mt-3 text-sm"><strong>Correction:</strong> {item.answer}</p></details>)}</div></div>
            </div>
          </Section>

          <Section number="11" title="Practice ladder">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {booleanAlgebra.practice.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 p-5"><div className="flex items-center justify-between gap-3"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{item.difficulty}</span><span className="text-xs font-semibold text-slate-500">{item.marks} marks</span></div><p className="mt-4 text-sm font-semibold">{item.question}</p><details className="mt-4 rounded-xl bg-slate-50 p-4"><summary className="cursor-pointer text-sm font-semibold">Show solution</summary><p className="mt-2 text-sm text-slate-700">{item.answer}</p></details></article>)}
            </div>
          </Section>

          <Section number="12" title="Exam strategy">
            <ol className="grid gap-3 md:grid-cols-2">{booleanAlgebra.examStrategy.map((item, index) => <li key={item} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"><span className="mr-2 font-bold">{index + 1}.</span>{item}</li>)}</ol>
          </Section>
        </div>
      </div>
    </main>
  );
}
