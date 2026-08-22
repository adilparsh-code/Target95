import Link from "next/link";
import roboticsAI from "@/app/data/icseRoboticsAI";

function UnitCard({ unit, index }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Unit {index + 1}</span>
        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">{unit.part}</span>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{unit.weightage} marks</span>
      </div>
      <h2 className="mt-3 text-2xl font-bold text-slate-900">{unit.title}</h2>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <h3 className="font-semibold text-slate-900">What you will learn</h3>
          <ul className="mt-2 space-y-2 pl-5 text-sm text-slate-600">
            {unit.learningGoals.map((item) => <li key={item} className="list-disc">{item}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Key concepts</h3>
          <ul className="mt-2 space-y-2 pl-5 text-sm text-slate-600">
            {unit.keyConcepts.map((item) => <li key={item} className="list-disc">{item}</li>)}
          </ul>
        </div>
      </div>

      {unit.workedExamples?.length ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {unit.workedExamples.map((example) => (
            <div key={example.title} className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">Worked example: {example.title}</h3>
              {example.scenario && <p className="mt-2 text-sm text-slate-600">{example.scenario}</p>}
              {example.conclusion && <p className="mt-2 text-sm font-medium text-slate-800">{example.conclusion}</p>}
              {example.reasoning && <ol className="mt-2 space-y-1 pl-5 text-sm text-slate-600">{example.reasoning.map((item) => <li key={item} className="list-decimal">{item}</li>)}</ol>}
              {example.flow && <ol className="mt-2 space-y-1 pl-5 text-sm text-slate-600">{example.flow.map((item) => <li key={item} className="list-decimal">{item}</li>)}</ol>}
              {example.walkthrough && <ol className="mt-2 space-y-1 pl-5 text-sm text-slate-600">{example.walkthrough.map((item) => <li key={item} className="list-decimal">{item}</li>)}</ol>}
              {example.framework && <ol className="mt-2 space-y-1 pl-5 text-sm text-slate-600">{example.framework.map((item) => <li key={item} className="list-decimal">{item}</li>)}</ol>}
            </div>
          ))}
        </div>
      ) : null}

      {unit.examQuestions?.length ? (
        <div className="mt-6">
          <h3 className="font-semibold text-slate-900">Exam practice</h3>
          <div className="mt-3 grid gap-3">
            {unit.examQuestions.map((question) => (
              <details key={question.id} className="rounded-2xl border border-slate-200 p-4">
                <summary className="cursor-pointer font-medium text-slate-900">{question.question}</summary>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p><span className="font-semibold text-slate-900">Answer:</span> {question.answer}</p>
                  {question.explanation ? <p><span className="font-semibold text-slate-900">Why:</span> {question.explanation}</p> : null}
                </div>
              </details>
            ))}
          </div>
        </div>
      ) : null}

      {unit.practicalTasks?.length ? (
        <div className="mt-6 rounded-2xl border border-dashed border-violet-200 bg-violet-50/50 p-5">
          <h3 className="font-semibold text-violet-950">Practical / activity tasks</h3>
          <ul className="mt-2 space-y-2 pl-5 text-sm text-violet-900">
            {unit.practicalTasks.map((task) => <li key={task} className="list-disc">{task}</li>)}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export default function RoboticsAIPage() {
  const units = roboticsAI.classIX.units;
  const questionBank = roboticsAI.classIX.questionBank;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/" className="text-sm text-slate-600">← Target95 Home</Link>

        <header className="mt-6 rounded-[2rem] bg-gradient-to-br from-violet-950 via-fuchsia-900 to-slate-950 p-8 text-white md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-200">ICSE · Class IX · Robotics & AI</p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Robotics & Artificial Intelligence</h1>
          <p className="mt-4 max-w-3xl text-lg text-violet-100">{roboticsAI.overview}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1.5">7 syllabus units</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">100-mark written paper</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Theory + projects + Python</span>
          </div>
        </header>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold">How to use this chapter set</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Read the concept notes, study the worked examples, attempt the exam questions without opening the answer, then complete the practical tasks. The goal is understanding first and exam performance second.</p>
        </section>

        <div className="mt-8 grid gap-6">
          {units.map((unit, index) => <UnitCard key={unit.id} unit={unit} index={index} />)}
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold">Mixed practice</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {questionBank.mcqs.map((question) => (
              <details key={question.id} className="rounded-2xl border border-slate-200 p-4">
                <summary className="cursor-pointer font-semibold">{question.question}</summary>
                <div className="mt-3 text-sm text-slate-600">
                  <p><span className="font-semibold text-slate-900">Answer:</span> {question.answer}</p>
                  <p className="mt-1">{question.explanation}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold">Output & tracing</h2>
            <div className="mt-4 space-y-3">
              {questionBank.outputTracing.map((item) => (
                <details key={item.id} className="rounded-2xl border p-4">
                  <summary className="cursor-pointer font-medium">{item.question}</summary>
                  <p className="mt-2 text-sm text-slate-600">Answer: {item.answer}</p>
                  {item.explanation ? <p className="mt-1 text-xs text-slate-500">{item.explanation}</p> : null}
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold">Assertion & reasoning</h2>
            <div className="mt-4 space-y-3">
              {questionBank.assertionReasoning.map((item) => (
                <details key={item.id} className="rounded-2xl border p-4">
                  <summary className="cursor-pointer font-medium">{item.assertion}</summary>
                  <p className="mt-2 text-sm text-slate-600">Reason: {item.reason}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold">Case studies & projects</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {questionBank.caseStudies.map((caseStudy) => (
              <article key={caseStudy.id} className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-semibold">{caseStudy.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{caseStudy.prompt}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead><tr className="border-b"><th className="px-3 py-3">Criterion</th><th className="px-3 py-3">Excellent performance</th></tr></thead>
              <tbody>
                {questionBank.projectRubric.map((row) => <tr key={row.criterion} className="border-b last:border-b-0"><td className="px-3 py-3 font-medium">{row.criterion}</td><td className="px-3 py-3 text-slate-600">{row.excellent}</td></tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-amber-950">Class X status</h2>
          <p className="mt-2 text-sm text-amber-900">{roboticsAI.classX.note}</p>
          <ul className="mt-4 grid gap-2 md:grid-cols-2">
            {roboticsAI.classX.plannedUnits.map((item) => <li key={item} className="rounded-xl bg-white/70 p-3 text-sm">{item}</li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
