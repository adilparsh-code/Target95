import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ISC_AI_2027 } from '@/app/data/iscArtificialIntelligence';
import { ISC_AI_883_PRACTICE } from '@/app/data/iscArtificialIntelligencePractice';

export function generateStaticParams() {
  return [11, 12].map((classNumber) => ({ classNumber: String(classNumber) }));
}

export default async function ISC_AI_PracticePage({ params }) {
  const { classNumber } = await params;
  const classNo = Number(classNumber);
  const course = ISC_AI_2027.classes[classNo];
  if (!course) notFound();
  const questions = classNo === 11 ? ISC_AI_883_PRACTICE.classXI : ISC_AI_883_PRACTICE.classXII;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href={`/isc/artificial-intelligence/${classNo}`} className="text-sm font-semibold text-slate-600 dark:text-slate-400">← ISC AI Class {classNo}</Link>
        <header className="mt-6 rounded-3xl bg-amber-900 p-8 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-200">ISC · AI 883 · Class {classNo}</p>
          <h1 className="mt-3 text-3xl font-black md:text-5xl">Board practice bank</h1>
          <p className="mt-3 max-w-3xl leading-7 text-amber-100">{questions.length} checked questions across all {course.theoryUnits.length} syllabus units, including MCQ, direct/conceptual, application, case-based, numerical/data and HOTS/programming practice.</p>
        </header>

        <div className="mt-8 space-y-10">
          {course.theoryUnits.map((unit) => {
            const unitQuestions = questions.filter((question) => question.unitId === unit.id);
            return <section id={unit.id} key={unit.id} className="scroll-mt-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-400">Unit {course.theoryUnits.indexOf(unit) + 1} · {unit.weightage} marks</p>
                  <h2 className="mt-1 text-2xl font-black">{unit.title}</h2>
                </div>
                <Link href={`/isc/artificial-intelligence/${classNo}/unit/${unit.id}`} className="text-sm font-bold text-violet-700 underline dark:text-violet-300">Review unit →</Link>
              </div>
              <div className="mt-4 space-y-3">
                {unitQuestions.map((question) => <details key={question.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <summary className="cursor-pointer font-semibold">{question.question}</summary>
                  <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <p><span className="font-semibold text-slate-900 dark:text-white">Type:</span> {question.type} · {question.difficulty} · {question.marks} mark(s)</p>
                    {question.options ? <ol className="list-[upper-alpha] space-y-1 pl-5">{question.options.map((option) => <li key={option}>{option}</li>)}</ol> : null}
                    <p><span className="font-semibold text-slate-900 dark:text-white">Answer:</span> {question.answer}</p>
                    <p><span className="font-semibold text-slate-900 dark:text-white">Explanation:</span> {question.explanation}</p>
                  </div>
                </details>)}
              </div>
            </section>;
          })}
        </div>
      </div>
    </main>
  );
}
