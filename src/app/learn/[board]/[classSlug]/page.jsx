import Link from 'next/link';
import { getBoard, getClass, getPublishedChapters, getSubjects } from '@/lib/boardprepCurriculum.mjs';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { board: boardSlug, classSlug } = await params;
  const board = getBoard(boardSlug);
  const classInfo = getClass(boardSlug, classSlug);
  return board && classInfo ? { title: `${classInfo.label} ${board.name} subjects`, description: `Browse available ${classInfo.label} ${board.name} learning subjects and clearly marked upcoming courses.` } : {};
}

export default async function ClassPage({ params }) {
  const { board: boardSlug, classSlug } = await params;
  const board = getBoard(boardSlug);
  const classInfo = getClass(boardSlug, classSlug);
  if (!board || !classInfo) notFound();

  return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900"><div className="mx-auto max-w-6xl"><Link href={`/learn/${boardSlug}`} className="text-sm font-medium text-slate-600">← {board.name}</Link><h1 className="mt-6 text-4xl font-bold">{classInfo.label}</h1><section className="mt-8 grid gap-5 md:grid-cols-3">{getSubjects(boardSlug, classSlug).map((subject) => {
    const publishedCount = getPublishedChapters(boardSlug, classSlug, subject.slug).length;
    const body = <><div className="flex items-start justify-between gap-3"><h2 className="font-bold">{subject.title}</h2><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${publishedCount ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{publishedCount ? "Available" : "Coming soon"}</span></div><p className="mt-2 text-sm text-slate-600">{subject.description}</p>{publishedCount ? <p className="mt-3 text-xs font-semibold text-blue-700">{publishedCount} published chapter{publishedCount === 1 ? "" : "s"} →</p> : <p className="mt-3 text-xs text-slate-500">No published chapters yet.</p>}</>;
    return publishedCount ? <Link key={subject.slug} href={`/learn/${boardSlug}/${classSlug}/${subject.slug}`} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">{body}</Link> : <article key={subject.slug} className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5" aria-label={`${subject.title}: coming soon`}>{body}</article>;
  })}</section></div></main>;
}
