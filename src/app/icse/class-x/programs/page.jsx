import Link from 'next/link';
import programs from '@/app/data/icseClass10Programs';

export const metadata = { title: 'ICSE Class X Java Programs | Target95' };

export default function ClassXProgramsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/icse/class-x" className="text-sm font-medium text-slate-600 hover:text-slate-900">← Back to Class X</Link>
        <header className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">ICSE • Computer Applications • Class X</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Java Programming Practice</h1>
          <p className="mt-3 max-w-3xl text-slate-600">20 recommended programs covering the Class X programming progression. Normal programming/lab work is kept separate from the Disruptive Technologies written project.</p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm"><span className="rounded-full bg-slate-100 px-3 py-1">20 programs</span><span className="rounded-full bg-slate-100 px-3 py-1">Easy → Hard</span><span className="rounded-full bg-slate-100 px-3 py-1">No mandatory algorithm/flowchart</span></div>
        </header>
        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {programs.map((p, i) => (
            <article key={p.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Program {i + 1}</p><h2 className="mt-1 text-xl font-semibold">{p.title}</h2></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium">{p.difficulty}</span></div>
              <p className="mt-3 text-sm font-medium text-slate-500">{p.topic}</p><p className="mt-2 text-sm leading-6 text-slate-700">{p.question}</p>
              <details className="mt-4"><summary className="cursor-pointer text-sm font-semibold">View solution</summary><pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-5 text-slate-100"><code>{p.code}</code></pre><div className="mt-4 grid gap-3 sm:grid-cols-2"><div><p className="text-xs font-semibold uppercase text-slate-400">Variables</p><p className="mt-1 text-sm">{p.variables}</p></div><div><p className="text-xs font-semibold uppercase text-slate-400">Sample input</p><pre className="mt-1 whitespace-pre-wrap text-sm">{p.sampleInput}</pre></div></div><div className="mt-3"><p className="text-xs font-semibold uppercase text-slate-400">Sample output</p><pre className="mt-1 whitespace-pre-wrap text-sm">{p.sampleOutput}</pre></div></details>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
