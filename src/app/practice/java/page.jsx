import Link from 'next/link';
import javaQuestions from '@/app/data/programming/java/questions';

export const metadata = {
  title: 'Java Practice Lab | Target95',
  description: 'Progressive, syllabus-aligned Java coding practice for Target95 students.',
};

const levelOrder = ['Starter', 'Easy', 'Practice', 'Medium', 'Exam', 'Challenge'];

function levelFor(question) {
  if (question.difficulty === 'Easy') return 'Starter';
  if (question.difficulty === 'Medium') return 'Practice';
  return question.difficulty;
}

export default function JavaPracticeLabPage() {
  const levels = levelOrder.map((level) => ({
    level,
    items: javaQuestions.filter((question) => levelFor(question) === level),
  })).filter((group) => group.items.length);

  const chapters = [...new Set(javaQuestions.map((question) => question.chapter))];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">← Back to Target95</Link>

        <header className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Java • ICSE Class X</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Practice Lab</h1>
          <p className="mt-3 max-w-3xl text-slate-600">A progressive coding bank built for Target95: start with focused skills, move into exam-style problems, then finish with multi-concept challenges. The problem wording is original and is not copied from any external practice site.</p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">{javaQuestions.length} coding problems</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">{chapters.length} topic areas</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">Starter → Challenge</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">Java + ICSE aligned</span>
          </div>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {levels.map(({ level, items }) => (
            <section key={level} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Level</p>
                  <h2 className="mt-1 text-2xl font-bold">{level}</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">{items.length} problems</span>
              </div>

              <div className="mt-5 space-y-4">
                {items.map((question, index) => (
                  <article key={question.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{level} {index + 1} • {question.chapter}</p>
                        <h3 className="mt-1 text-lg font-semibold">{question.title}</h3>
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium">{question.marks} marks</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{question.question}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500"><strong>Constraint:</strong> {question.constraints}</p>
                    <details className="mt-4">
                      <summary className="cursor-pointer text-sm font-semibold">Show test example & solution</summary>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sample input</p>
                          <pre className="mt-2 whitespace-pre-wrap text-sm">{question.sampleInput}</pre>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Expected output</p>
                          <pre className="mt-2 whitespace-pre-wrap text-sm">{question.sampleOutput}</pre>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-700"><strong>Approach:</strong> {question.algorithm}</p>
                      <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-5 text-slate-100"><code>{question.code || '// Write your Java solution here.\n// Use the sample input/output above to self-check.'}</code></pre>
                      <p className="mt-3 text-sm leading-6 text-slate-600"><strong>Why it matters:</strong> {question.explanation}</p>
                    </details>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </section>

        <footer className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-600">
          <strong>Next practice-engine step:</strong> this first launch slice provides the progressive bank and expected-output checks. The browser code runner/test-case execution layer should be added only after the execution backend is wired and sandboxed; it should not pretend that a static page has live compilation.
        </footer>
      </div>
    </main>
  );
}
