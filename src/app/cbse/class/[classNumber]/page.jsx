import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCBSECurriculum } from '@/app/data/cbse';

const CLASS_SUBJECT_MAP = {
  9: ['402'],
  10: ['402'],
  11: ['083', '065', '802'],
  12: ['083', '065', '802'],
};

export default async function CBSEClassPage({ params }) {
  const resolvedParams = await params;
  const classNumber = Number(resolvedParams?.classNumber);

  if (![9, 10, 11, 12].includes(classNumber)) {
    notFound();
  }

  const subjectCodes = CLASS_SUBJECT_MAP[classNumber] || [];
  const subjects = subjectCodes
    .map((code) => getCBSECurriculum(classNumber, code))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/cbse"
          className="inline-flex items-center text-sm font-semibold text-blue-700 hover:underline"
        >
          ← CBSE
        </Link>
        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          CBSE Class {classNumber}
        </h1>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Link
              key={`${classNumber}-${subject.code}`}
              href={`/cbse/class/${classNumber}/subject/${encodeURIComponent(subject.code)}`}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Code {subject.code}
              </p>
              <h2 className="mt-3 text-xl font-bold text-slate-900">
                {subject.name}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Open syllabus and learning content →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
