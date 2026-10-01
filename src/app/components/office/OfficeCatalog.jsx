'use client';
import Link from 'next/link';
import { officeApps, getOfficeApp, officeChapterKey } from '@/data/office';
import useOfficeProgress from '@/hooks/useOfficeProgress';
import { ProgressIndicator } from './OfficeParts';

export default function OfficeCatalog({ appId }) {
  const { chapters, isGuest } = useOfficeProgress();
  const app = getOfficeApp(appId);
  const count = (subject) => subject.chapters.filter((chapter) => chapters[officeChapterKey(subject.id, chapter.id)]?.status === 'completed').length;
  const total = officeApps.reduce((sum, subject) => sum + subject.chapters.length, 0);
  const done = officeApps.reduce((sum, subject) => sum + count(subject), 0);
  return <div className="space-y-8">
    <nav aria-label="Breadcrumb" className="text-sm"><Link className="underline" href="/">Target95</Link> / <Link className="underline" href="/office">Office</Link>{app && ` / ${app.name}`}</nav>
    <header className="space-y-4"><p className="text-sm font-semibold uppercase tracking-widest">Learning edition · 2026</p><h1 className={`text-4xl font-bold tracking-tight ${app?.accent || ''}`}>{app ? `${app.name} 2026` : 'Microsoft Office 2026'}</h1><p className="max-w-3xl text-lg">{app?.description || 'Learn Word, Excel and PowerPoint through visual lessons, guided practicals, practice tasks, MCQs and real-world challenges.'}</p><p className="text-sm text-slate-600 dark:text-slate-300">For school students, college students, teachers and general learners. Explain → See → Follow → Practice → Test → Master.</p><p className="text-sm text-slate-600 dark:text-slate-300">2026 is the course edition. Lessons use Microsoft 365 / Office 2024 desktop workflows; controls can vary by version and platform. Visuals are original command diagrams, not screenshots.</p><ProgressIndicator value={app ? count(app) : done} total={app ? app.chapters.length : total} label={app ? `${app.name} chapters completed` : 'Overall Office progress'} /><p className="text-xs">{isGuest ? 'Guest progress is saved in this browser.' : 'Progress is saved in this browser under your signed-in account.'} Cross-device sync is not available.</p></header>
    {!app ? <div className="grid gap-6 md:grid-cols-3">{officeApps.map((subject) => <Link key={subject.id} href={`/office/${subject.id}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm focus-visible:outline-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-900"><h2 className={`text-2xl font-bold ${subject.accent}`}>{subject.name} 2026</h2><p className="my-4">{subject.description}</p><ProgressIndicator value={count(subject)} total={subject.chapters.length} label="Chapters completed" /><p className="mt-4 font-semibold">Explore lessons →</p></Link>)}</div> : <ol className="grid gap-4 sm:grid-cols-2">{app.chapters.map((chapter) => <li key={chapter.id}><Link href={`/office/${app.id}/${chapter.id}`} className="block h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm focus-visible:outline-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-900"><p className={`text-sm font-semibold ${app.accent}`}>Chapter {chapter.number} · {chapters[officeChapterKey(app.id, chapter.id)]?.status === 'completed' ? 'Completed ✓' : 'Ready to learn'}</p><h2 className="mt-2 text-xl font-bold">{chapter.title}</h2><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{chapter.description}</p></Link></li>)}</ol>}
  </div>;
}
