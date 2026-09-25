import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ISC_AI_2027 } from '@/app/data/iscArtificialIntelligence';
import { ISC_AI_883_PRACTICE } from '@/app/data/iscArtificialIntelligencePractice';

export function generateStaticParams() {
  return Object.entries(ISC_AI_2027.classes).flatMap(([classNumber, course]) =>
    course.theoryUnits.map((unit) => ({ classNumber, unitId: unit.id })),
  );
}

export default async function ISC_AI_UnitPage({ params }) {
  const { classNumber, unitId } = await params;
  const classNo = Number(classNumber);
  const course = ISC_AI_2027.classes[classNo];
  const unit = course?.theoryUnits.find((item) => item.id === unitId);
  if (!unit) notFound();

  const practice = classNo === 11 ? ISC_AI_883_PRACTICE.classXI : ISC_AI_883_PRACTICE.classXII;
  const questions = practice.filter((question) => question.unitId === unit.id);
  const nextUnit = course.theoryUnits[(course.theoryUnits.findIndex((item) => item.id === unit.id) + 1) % course.theoryUnits.length];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link href={`/isc/artificial-intelligence/${classNo}`} className="text-sm font-semibold text-slate-600 dark:text-slate-400">← ISC AI Class {classNo}</Link>
        <header className="mt-6 rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-300">ISC · AI 883 · Class {classNo}</p>
          <h1 className="mt-3 text-3xl font-black md:text-5xl">{unit.title}</h1>
          <p className="mt-3 text-slate-300">Syllabus unit · {unit.weightage} marks</p>
        </header>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black">Learning map</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Use this unit map to learn the official topic sequence, then attempt the checked practice before moving on.</p>
          <ol className="mt-6 space-y-4">
            {unit.topics.map((topic, index) => (
              <li key={topic} className="flex gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-100 text-sm font-black text-violet-800 dark:bg-violet-950 dark:text-violet-200">{index + 1}</span>
                <div>
                  <h3 className="font-bold">{topic}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">Define the key idea in your own words, connect it to a real example, and note one limitation or interpretation caution.</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-amber-950 dark:text-amber-50">Unit practice · {questions.length} questions</h2>
            <Link href={`/isc/artificial-intelligence/${classNo}/practice#${unit.id}`} className="text-sm font-bold text-amber-900 underline dark:text-amber-200">Open full practice →</Link>
          </div>
          <div className="mt-5 space-y-3">
            {questions.map((question) => <details key={question.id} className="rounded-2xl border border-amber-200 bg-white p-4 dark:border-amber-900 dark:bg-slate-900">
              <summary className="cursor-pointer font-semibold">{question.question}</summary>
              <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {question.options ? <ol className="list-[upper-alpha] space-y-1 pl-5">{question.options.map((option) => <li key={option}>{option}</li>)}</ol> : null}
                <p><span className="font-semibold text-slate-900 dark:text-white">Answer:</span> {question.answer}</p>
                <p><span className="font-semibold text-slate-900 dark:text-white">Explanation:</span> {question.explanation}</p>
              </div>
            </details>)}
          </div>
        </section>

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <Link href={`/isc/artificial-intelligence/${classNo}`} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold hover:bg-white dark:border-slate-700 dark:hover:bg-slate-900">All Class {classNo} units</Link>
          <Link href={`/isc/artificial-intelligence/${classNo}/unit/${nextUnit.id}`} className="rounded-xl bg-violet-700 px-4 py-3 text-sm font-bold text-white hover:bg-violet-800">Next unit: {nextUnit.title} →</Link>
        </div>
      </div>
    </main>
  );
}
