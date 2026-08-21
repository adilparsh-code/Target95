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

export default function BooleanAlgebraPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">← Target95 Home</Link>

        <header className="mt-6 rounded-[2rem] bg-slate-950 p-8 text-white md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">ISC Class XII · Flagship Chapter</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Boolean Algebra</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{booleanAlgebra.tagline}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {booleanAlgebra.learningPath.map((item, index) => (
                <article key={item.id} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold">{index + 1}</div>
                  <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.goal}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section number="02" title="Think in patterns, not memorisation">
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

          <Section number="03" title="Boolean law deck">
            <div className="grid gap-4 md:grid-cols-2">
              {booleanAlgebra.lawDeck.map((law) => (
                <article key={law.name} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">{law.name}</h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Pattern</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {law.rules.map((rule) => <code key={rule} className="rounded-lg bg-slate-950 px-3 py-2 text-sm text-white">{rule}</code>)}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{law.intuition}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section number="04" title="Worked examples — see every rewrite">
            <div className="grid gap-5 lg:grid-cols-3">
              {booleanAlgebra.workedExamples.map((example) => (
                <article key={example.id} className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{example.level}</p>
                  <h3 className="mt-2 text-lg font-bold">{example.title}</h3>
                  <div className="mt-4 rounded-xl bg-slate-950 p-4 font-mono text-sm text-white">{example.expression}</div>
                  <div className="mt-4 space-y-3">
                    {example.steps.map((step, index) => (
                      <div key={`${example.id}-${index}`} className="rounded-xl bg-slate-50 p-4">
                        <p className="font-mono text-sm font-semibold">{step.line}</p>
                        <p className="mt-1 text-xs text-slate-500">{step.law} · {step.reason}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600"><strong>Exam tip:</strong> {example.examTip}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section number="05" title="Truth-table challenges">
            <div className="grid gap-4 md:grid-cols-3">
              {booleanAlgebra.truthTableChallenges.map((item) => (
                <article key={item.id} className="rounded-2xl border border-slate-200 p-5">
                  <code className="text-sm font-semibold">{item.expression}</code>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.prompt}</p>
                  <details className="mt-4 rounded-xl bg-slate-50 p-4">
                    <summary className="cursor-pointer text-sm font-semibold">Reveal result</summary>
                    <p className="mt-2 font-mono text-sm">{item.answer}</p>
                  </details>
                </article>
              ))}
            </div>
          </Section>

          <Section number="06" title="MCQ + output + debugging">
            <div className="grid gap-6 lg:grid-cols-3">
              <div>
                <h3 className="font-bold">MCQs</h3>
                <div className="mt-3 space-y-3">
                  {booleanAlgebra.mcqs.map((item) => (
                    <details key={item.id} className="rounded-xl border border-slate-200 p-4">
                      <summary className="cursor-pointer text-sm font-semibold">{item.question}</summary>
                      <ul className="mt-3 space-y-1 text-sm text-slate-600">{item.options.map((option) => <li key={option}>{option}</li>)}</ul>
                      <p className="mt-3 text-sm"><strong>Answer:</strong> {item.answer}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.explanation}</p>
                    </details>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold">Output tracing</h3>
                <div className="mt-3 space-y-3">
                  {booleanAlgebra.outputTracing.map((item) => (
                    <details key={item.id} className="rounded-xl border border-slate-200 p-4">
                      <summary className="cursor-pointer text-sm font-semibold">{item.question}</summary>
                      <p className="mt-3 text-sm"><strong>Answer:</strong> {item.answer}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.explanation}</p>
                    </details>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold">Debugging</h3>
                <div className="mt-3 space-y-3">
                  {booleanAlgebra.debugging.map((item) => (
                    <details key={item.id} className="rounded-xl border border-slate-200 p-4">
                      <summary className="cursor-pointer text-sm font-semibold">{item.task}</summary>
                      <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-white">{item.buggySteps.join("\n")}</pre>
                      <p className="mt-3 text-sm"><strong>Correction:</strong> {item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section number="07" title="Practice ladder">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {booleanAlgebra.practice.map((item) => (
                <article key={item.id} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{item.difficulty}</span>
                    <span className="text-xs font-semibold text-slate-500">{item.marks} marks</span>
                  </div>
                  <p className="mt-4 text-sm font-semibold">{item.question}</p>
                  <details className="mt-4 rounded-xl bg-slate-50 p-4">
                    <summary className="cursor-pointer text-sm font-semibold">Show solution</summary>
                    <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
                  </details>
                </article>
              ))}
            </div>
          </Section>

          <Section number="08" title="Exam strategy">
            <ol className="grid gap-3 md:grid-cols-2">
              {booleanAlgebra.examStrategy.map((item, index) => (
                <li key={item} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  <span className="mr-2 font-bold">{index + 1}.</span>{item}
                </li>
              ))}
            </ol>
          </Section>
        </div>
      </div>
    </main>
  );
}
