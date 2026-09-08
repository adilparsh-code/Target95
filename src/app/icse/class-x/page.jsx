import Link from 'next/link';

export const metadata = { title: 'ICSE Class X Computer Applications | Target95' };

const modules = [
  { title:'Learn Java', text:'Class X Computer Applications theory and chapter-wise learning.', href:'/Java', badge:'Theory' },
  { title:'20 Java Programs', text:'Recommended programming/lab set covering arrays, strings, methods, classes and constructors.', href:'/icse/class-x/programs', badge:'Practice' },
  { title:'Written Project', text:'Disruptive Technologies project guidance, kept separate from normal programming.', href:'/icse/class-x/projects', badge:'Project' },
];

export default function ClassXPage(){return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6"><div className="mx-auto max-w-6xl"><Link href="/" className="text-sm font-medium text-slate-600">← Back to Target95+</Link><header className="mt-6 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-9"><p className="text-sm font-semibold uppercase tracking-wider text-slate-500">CISCE • ICSE • Computer Applications</p><h1 className="mt-2 text-4xl font-bold">Class X</h1><p className="mt-3 max-w-3xl leading-7 text-slate-600">Revise the syllabus, practise Java programs, and complete the written project as separate learning tracks.</p></header><section className="mt-8 grid gap-5 md:grid-cols-3">{modules.map(m=><Link key={m.href} href={m.href} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-slate-300"><span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{m.badge}</span><h2 className="mt-2 text-xl font-bold">{m.title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{m.text}</p><span className="mt-5 inline-block text-sm font-semibold">Open →</span></Link>)}</section></div></main>}
