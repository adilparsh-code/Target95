import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ISC_AI_2027 } from '@/app/data/iscArtificialIntelligence';
import { ISC_AI_883_PRACTICE } from '@/app/data/iscArtificialIntelligencePractice';
import { getProjectGroup } from '@/app/data/projects';

function PracticeQuestion({ question }) {
  return (
    <details className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">
        {question.question}
      </summary>
      <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <p><span className="font-semibold text-slate-900 dark:text-white">Type:</span> {question.type} · {question.marks} mark(s)</p>
        {question.options ? <ol className="list-[upper-alpha] space-y-1 pl-5">{question.options.map((option) => <li key={option}>{option}</li>)}</ol> : null}
        <p><span className="font-semibold text-slate-900 dark:text-white">Answer:</span> {question.answer}</p>
        <p><span className="font-semibold text-slate-900 dark:text-white">Explanation:</span> {question.explanation}</p>
      </div>
    </details>
  );
}

export function generateStaticParams() {
  return [11, 12].map((classNumber) => ({ classNumber: String(classNumber) }));
}

export default async function ISCArtificialIntelligencePage({ params }) {
  const { classNumber } = await params;
  const classNo = Number(classNumber);
  const course = ISC_AI_2027.classes[classNo];
  const practice = classNo === 11 ? ISC_AI_883_PRACTICE.classXI : ISC_AI_883_PRACTICE.classXII;

  if (!course) notFound();

  // Prefer the project registry so every card links to its real project page.
  const projectGroup = getProjectGroup(`isc-ai-${classNo}`);
  const projectCards = projectGroup
    ? projectGroup.projects.map((project) => ({ slug: project.slug, title: project.title, outcome: project.shortOutcome || project.summary }))
    : course.projects.map((project) => ({ slug: null, title: project.title, outcome: project.outcome }));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/isc" className="text-sm font-semibold text-slate-600 dark:text-slate-400">← ISC Hub</Link>
        <header className="mt-8 rounded-3xl bg-gradient-to-br from-violet-700 to-indigo-900 p-8 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">ISC · Artificial Intelligence (883)</p>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">Class {classNo} AI</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-violet-100">Complete syllabus-aligned theory for ISC Examination Year 2027, with project work kept in a separate section.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
            <span className="rounded-full bg-white/10 px-3 py-1.5">Theory · 70 marks</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Practical · 15 marks</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Projects separate</span>
          </div>
        </header>

        <section className="mt-10" id="theory">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">Theory</p>
              <h2 className="mt-1 text-3xl font-black">Syllabus Units</h2>
            </div>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-800 dark:bg-violet-950 dark:text-violet-200">{course.theoryUnits.length} units</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {course.theoryUnits.map((unit) => (
              <article key={unit.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black">{unit.title}</h3>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-slate-800">{unit.weightage} marks</span>
                </div>
                <ul className="mt-5 space-y-2 pl-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {unit.topics.map((topic) => <li key={topic} className="list-disc">{topic}</li>)}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4 text-sm font-semibold dark:border-slate-800">
                  <Link href={`/isc/artificial-intelligence/${classNo}/unit/${unit.id}`} className="text-violet-700 hover:underline dark:text-violet-300">Open unit learning page →</Link>
                  <Link href={`/isc/artificial-intelligence/${classNo}/practice#${unit.id}`} className="text-slate-600 hover:underline dark:text-slate-300">Practice this unit →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30" id="practice">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">Practice</p>
              <h2 className="mt-1 text-3xl font-black text-amber-950 dark:text-amber-50">Unit-linked board practice</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-amber-900 dark:text-amber-100">Every question includes its answer and explanation. Questions are grouped by this class&apos;s own ISC 883 units.</p>
            </div>
            <Link href={`/isc/artificial-intelligence/${classNo}/practice`} className="rounded-xl bg-amber-900 px-4 py-2 text-sm font-bold text-white hover:bg-amber-800">Open full practice →</Link>
          </div>
          <div className="mt-7 space-y-8">
            {course.theoryUnits.map((unit) => {
              const questions = practice.filter((question) => question.unitId === unit.id);
              return <section id={unit.id} key={unit.id} className="scroll-mt-6">
                <h3 className="text-xl font-black text-amber-950 dark:text-amber-50">{unit.title} <span className="text-sm font-medium">({questions.length} questions)</span></h3>
                <div className="mt-3 grid gap-3 lg:grid-cols-2">{questions.map((question) => <PracticeQuestion key={question.id} question={question} />)}</div>
              </section>;
            })}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Separate from theory</p>
          <h2 className="mt-1 text-3xl font-black">AI Projects</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {projectCards.map((project) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-black">{project.title}</h3>
                    {project.slug && <span className="text-sm font-semibold text-emerald-600">Open →</span>}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.outcome}</p>
                </>
              );
              return project.slug ? (
                <Link key={project.slug} href={`/isc/artificial-intelligence/${classNo}/project/${project.slug}`} className="group rounded-2xl border border-emerald-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-emerald-900 dark:bg-slate-900">
                  {inner}
                </Link>
              ) : (
                <article key={project.title} className="rounded-2xl border border-emerald-200 bg-white p-5 dark:border-emerald-900 dark:bg-slate-900">
                  {inner}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
