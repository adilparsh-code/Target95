import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCBSECurriculum } from '@/app/data/cbse';

export default async function CBSEUnitPage({ params }) {
  const resolvedParams = await params;
  const classNumber = Number(resolvedParams?.classNumber);
  const subjectCode = String(resolvedParams?.subjectCode || '');
  const unitId = String(resolvedParams?.unitId || '');
  const subject = getCBSECurriculum(classNumber, subjectCode);

  if (!subject) notFound();

  const units = [
    ...(subject.parts?.partA?.units || []),
    ...(subject.parts?.partB?.units || []),
  ];
  const unit = units.find((item) => item.id === unitId);
  if (!unit) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href={`/cbse/class/${classNumber}/subject/${subjectCode}`} className="text-sm font-semibold text-blue-700 hover:underline">
          ← {subject.name}
        </Link>
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">CBSE {classNumber} • Code {subjectCode}</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Unit {unit.code}: {unit.name}</h1>
          <p className="mt-2 text-sm text-slate-600">Learning outcomes, theory topics and practical activities</p>
        </div>

        {unit.learningOutcomes?.length ? (
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Learning Outcomes</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {unit.learningOutcomes.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </section>
        ) : null}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Theory Topics</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
              {(unit.theory || []).map((item) => <li key={item}>{item}</li>)}
            </ol>
          </section>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Practical Activities</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
              {(unit.practicalActivities || []).map((item) => <li key={item}>{item}</li>)}
            </ol>
          </section>
        </div>

        {unit.chapters?.length ? (
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Chapters</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {unit.chapters.map((chapter) => (
                <div key={chapter.number} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold text-slate-500">Chapter {chapter.number}</p>
                  <p className="mt-1 font-semibold text-slate-900">{chapter.title}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
