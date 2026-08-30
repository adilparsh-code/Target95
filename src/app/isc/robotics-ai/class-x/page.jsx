import Link from "next/link";
import ai from "@/app/data/icseRoboticsAIClassX";

function Question({ question }) {
  return (
    <details className="rounded-2xl border border-slate-200 bg-white p-4">
      <summary className="cursor-pointer font-semibold text-slate-900">{question.question}</summary>
      <div className="mt-3 space-y-2 text-sm text-slate-600">
        {question.options ? (
          <ol className="list-[upper-alpha] space-y-1 pl-5">
            {question.options.map((option) => <li key={option}>{option}</li>)}
          </ol>
        ) : null}
        <p><span className="font-semibold text-slate-900">Answer:</span> {question.answer}</p>
        {question.explanation ? <p><span className="font-semibold text-slate-900">Why:</span> {question.explanation}</p> : null}
      </div>
    </details>
  );
}

export default function ICSEAIClassXPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/isc/robotics-ai" className="text-sm text-slate-600">← Robotics & AI overview</Link>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800">ICSE · Class X · AI</span>
        </div>

        <header className="mt-6 rounded-[2rem] bg-gradient-to-br from-violet-950 via-fuchsia-900 to-slate-950 p-8 text-white md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">ICSE Robotics & Artificial Intelligence · Class X</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Artificial Intelligence</h1>
          <p className="mt-4 max-w-3xl text-lg text-violet-100">A syllabus-aligned learning path covering decision making, machine intelligence and cybersecurity, the AI Project Framework, and Python data programming.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1.5">4 AI units</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">50 marks</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Theory + practice + Python</span>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {ai.units.map((unit) => (
            <a key={unit.id} href={`#${unit.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5">
              <span className="text-xs font-bold text-violet-700">{unit.weightage} marks</span>
              <h2 className="mt-2 font-bold">{unit.title}</h2>
              <p className="mt-2 text-xs text-slate-500">{unit.questions.length} questions</p>
            </a>
          ))}
        </section>

        <div className="mt-8 space-y-8">
          {ai.units.map((unit) => (
            <section id={unit.id} key={unit.id} className="scroll-mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">{unit.weightage} marks</span>
                  <h2 className="mt-3 text-3xl font-bold">{unit.title}</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{unit.questions.length} practice questions</span>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold">Syllabus scope</h3>
                  <ul className="mt-3 space-y-2 pl-5 text-sm text-slate-600">
                    {unit.topics.map((topic) => <li key={topic} className="list-disc">{topic}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Core theory</h3>
                  <ul className="mt-3 space-y-2 pl-5 text-sm leading-6 text-slate-600">
                    {unit.theory.map((point) => <li key={point} className="list-disc">{point}</li>)}
                  </ul>
                </div>
              </div>

              {unit.workedExamples?.length ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {unit.workedExamples.map((example) => (
                    <div key={example.title} className="rounded-2xl bg-slate-50 p-5">
                      <h3 className="font-bold">{example.title}</h3>
                      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{example.code}</pre>
                      <p className="mt-3 text-sm text-slate-600">{example.conclusion}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-7">
                <h3 className="text-xl font-bold">Board-style practice</h3>
                <div className="mt-4 grid gap-3">
                  {unit.questions.map((question) => <Question key={question.id} question={question} />)}
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-violet-950">Practical & project practice</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {ai.practicalAssignments.map((item) => <li key={item} className="rounded-2xl bg-white p-4 text-sm text-violet-950">{item}</li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
