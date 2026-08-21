import Link from "next/link";
import wordProblems from "@/app/data/iscXIIBooleanWordProblems";

function Card({ children, className = "" }) {
  return <article className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</article>;
}

export default function BooleanWordProblemsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/isc/class-xii/boolean-algebra" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Back to Boolean Algebra
        </Link>

        <header className="mt-6 rounded-[2rem] bg-slate-950 p-8 text-white md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">ISC Class XII · Problem Solving</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Boolean Word Problems</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            Stop guessing which law or gate to use. Learn to convert an everyday situation into a precise Boolean model.
          </p>
        </header>

        <section className="mt-8">
          <Card>
            <h2 className="text-2xl font-bold">The translation method</h2>
            <ol className="mt-5 space-y-3">
              {wordProblems.method.map((step) => (
                <li key={step} className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {step}
                </li>
              ))}
            </ol>
          </Card>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-bold">Keyword decoder</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {wordProblems.keywordDecoder.map((item) => (
              <Card key={item.phrase}>
                <p className="text-sm font-semibold text-slate-500">{item.phrase}</p>
                <h3 className="mt-2 text-lg font-bold">{item.operator}</h3>
                <code className="mt-3 block rounded-xl bg-slate-950 p-3 text-sm text-white">{item.example}</code>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Worked examples</p>
              <h2 className="mt-1 text-2xl font-bold">Story → Variables → Expression → Verification</h2>
            </div>
          </div>
          <div className="mt-4 grid gap-5 lg:grid-cols-2">
            {wordProblems.workedExamples.map((item) => (
              <Card key={item.id}>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">{item.level}</span>
                  <span className="text-xs font-semibold text-slate-500">{item.id}</span>
                </div>
                <p className="mt-4 text-base leading-7 text-slate-800">{item.story}</p>
                <div className="mt-4 grid gap-2">
                  {item.variableMap.map((line) => <code key={line} className="rounded-lg bg-slate-50 p-3 text-sm">{line}</code>)}
                </div>
                <div className="mt-4 rounded-xl bg-slate-950 p-4 font-mono text-sm text-white">{item.expression}</div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{item.explanation}</p>
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm"><strong>Check:</strong> {item.testCase}</div>
                <p className="mt-4 text-sm text-slate-500"><strong>Exam tip:</strong> {item.examTip}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Practice ladder</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {wordProblems.practice.map((item) => (
              <Card key={item.id}>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">{item.difficulty}</span>
                  <span className="text-xs font-semibold text-slate-500">{item.marks} marks</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-800">{item.story}</p>
                <p className="mt-3 text-sm font-semibold">{item.ask}</p>
                <details className="mt-4 rounded-xl bg-slate-50 p-4">
                  <summary className="cursor-pointer text-sm font-semibold">Reveal answer</summary>
                  <p className="mt-3 font-mono text-sm">{item.answer}</p>
                </details>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-bold">Common mistakes</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {wordProblems.commonMistakes.map((mistake) => <li key={mistake}>• {mistake}</li>)}
            </ul>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Challenge modes</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {wordProblems.challengeSet.map((challenge, index) => <li key={challenge}><span className="mr-2 font-bold">{index + 1}.</span>{challenge}</li>)}
            </ol>
          </Card>
        </section>
      </div>
    </main>
  );
}
