import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCBSECurriculum } from '@/app/data/cbse';

const subjectsByClass = {
  9: ['402'],
  10: ['402'],
  11: ['083', '065', '802'],
  12: ['083', '065', '802'],
};

export default async function CBSESubjectPage({ params }) {
  const resolvedParams = await params;
  const classNumber = Number(resolvedParams?.classNumber);
  const subjectCode = String(resolvedParams?.subjectCode || '');

  if (![9, 10, 11, 12].includes(classNumber) || !subjectsByClass[classNumber].includes(subjectCode)) {
    notFound();
  }

  const subject = getCBSECurriculum(classNumber, subjectCode);
  if (!subject) notFound();

  const units = [
    ...(subject.parts?.partA?.units || []),
    ...(subject.parts?.partB?.units || []),
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href={`/cbse/class/${classNumber}`} className="text-sm font-semibold text-blue-700 hover:underline">
          ← Class {classNumber}
        </Link>
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">CBSE • Code {subject.code}</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{subject.name}</h1>
          <p className="mt-2 text-sm text-slate-600">Session 2026–27 • syllabus-aligned learning, practice and mock tests</p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {units.map((unit) => (
            <Link
              key={unit.id}
              href={`/cbse/class/${classNumber}/subject/${subjectCode}/unit/${unit.id}`}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Unit {unit.code}</p>
              <h2 className="mt-2 text-lg font-bold text-slate-900">{unit.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{unit.theory?.length || 0} theory topics • {unit.practicalActivities?.length || 0} practical activities</p>
              <span className="mt-4 inline-block text-sm font-semibold text-blue-700">Open unit →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
