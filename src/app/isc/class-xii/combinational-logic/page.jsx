import Link from "next/link";
import combinational from "@/app/data/iscXIICombinationalLogic";

function Card({ title, children }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="text-xl font-bold">{title}</h3><div className="mt-3">{children}</div></article>;
}

function TruthTable({ rows, columns }) {
  return <div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full text-center text-sm"><thead className="bg-slate-950 text-white"><tr>{columns.map((c)=><th key={c} className="px-3 py-2">{c}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i} className="border-t border-slate-200">{columns.map((c)=><td key={c} className="px-3 py-2 font-mono">{r[c]}</td>)}</tr>)}</tbody></table></div>;
}

export default function CombinationalLogicPage(){
  return <main className="min-h-screen bg-slate-50 text-slate-900"><div className="mx-auto max-w-6xl px-6 py-10">
    <Link href="/isc/class-xii" className="text-sm font-semibold text-slate-600">← ISC Class XII</Link>
    <header className="mt-6 rounded-[2rem] bg-slate-950 p-8 text-white"><p className="text-sm uppercase tracking-[0.2em] text-slate-400">ISC Class XII · Combinational Logic</p><h1 className="mt-3 text-4xl font-black md:text-6xl">Adders, MUX, Encoder & Decoder</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">Understand each circuit from its input-output behaviour, then practise ISC-style applications.</p></header>
    <div className="mt-8 grid gap-6">
      <Card title={combinational.halfAdder.title}><p className="text-sm leading-6 text-slate-600">{combinational.halfAdder.idea}</p><div className="mt-4 grid gap-4 md:grid-cols-2"><div><code className="block rounded-xl bg-slate-950 p-4 text-sm text-white">{combinational.halfAdder.equations.join("\n")}</code><p className="mt-3 text-sm text-slate-600">{combinational.halfAdder.example}</p></div><TruthTable rows={combinational.halfAdder.truthTable} columns={["A","B","S","C"]}/></div></Card>
      <Card title={combinational.fullAdder.title}><p className="text-sm leading-6 text-slate-600">{combinational.fullAdder.idea}</p><div className="mt-4 grid gap-4 md:grid-cols-2"><div><code className="block rounded-xl bg-slate-950 p-4 text-sm text-white">{combinational.fullAdder.equations.join("\n")}</code><p className="mt-3 text-sm text-slate-600">{combinational.fullAdder.construction}</p></div><TruthTable rows={combinational.fullAdder.truthTable} columns={["A","B","Cin","S","Cout"]}/></div></Card>
      <div className="grid gap-6 md:grid-cols-3"><Card title={combinational.encoder.title}><p className="text-sm text-slate-600">{combinational.encoder.idea}</p><p className="mt-2 text-sm font-semibold">{combinational.encoder.keyRule}</p></Card><Card title={combinational.decoder.title}><p className="text-sm text-slate-600">{combinational.decoder.idea}</p><p className="mt-2 text-sm font-semibold">{combinational.decoder.keyRule}</p></Card><Card title={combinational.multiplexer.title}><p className="text-sm text-slate-600">{combinational.multiplexer.idea}</p><code className="mt-3 block rounded-xl bg-slate-950 p-3 text-xs text-white">{combinational.multiplexer.equation}</code></Card></div>
      <Card title="Practice set"><div className="grid gap-4 md:grid-cols-2">{combinational.practice.map((q)=><article key={q.id} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase text-slate-500">{q.difficulty}</p><p className="mt-2 text-sm font-semibold">{q.question}</p><p className="mt-2 text-sm text-slate-700"><strong>Answer:</strong> {q.answer}</p></article>)}</div></Card>
      <Card title="Quick MCQ check"><div className="grid gap-4 md:grid-cols-2">{combinational.mcqs.map((q)=><details key={q.id} className="rounded-xl border border-slate-200 p-4"><summary className="cursor-pointer font-semibold">{q.question}</summary><div className="mt-3 space-y-2 text-sm text-slate-700">{q.options.map((o)=><p key={o}>• {o}</p>)}<p className="font-semibold">Answer: {q.answer}</p><p>{q.explanation}</p></div></details>)}</div></Card>
      <Card title="Viva / oral revision"><ul className="space-y-2 text-sm text-slate-700">{combinational.viva.map((q)=><li key={q}>• {q}</li>)}</ul></Card>
    </div>
  </div></main>;
}
