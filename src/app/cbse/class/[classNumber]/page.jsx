import Link from 'next/link';
import { notFound } from 'next/navigation';
import CbseCurriculum2026_27 from "@/app/data/cbse/curriculum-2026-27";

export async function generateStaticParams() {
  return [9, 10, 11, 12].map((classNumber) => ({ classNumber: String(classNumber) }));
}

const CLASS_SUBJECT_MAP = {
  9: ["402"],
  10: ["402"],
  11: ["083", "065", "802"],
  12: ["083", "065", "802"],
};

export default async function ClassPage({ params }) {
  const { classNumber } = await params;
  const classNum = Number(classNumber);
  const allowedSubjects = CLASS_SUBJECT_MAP[classNum];

  if (!allowedSubjects) notFound();

  const classData = CbseCurriculum2026_27?.classes?.[classNum];
  if (!classData) notFound();

  const subjects = allowedSubjects
    .map((code) => classData.subjects?.find((subject) => String(subject.code) === code))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/cbse" className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-700">
          ← Back to CBSE
        </Link>
        <div className="mt-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">CBSE 2026–27</p>
          <h1 className="mt-2 text-4xl font-extrabold">Class {classNum}</h1>
          <p className="mt-3 max-w-3xl text-blue-100">Choose a subject to open its syllabus, learning content, practice questions, and mock tests.</p>
        </div>
        <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Link key={`${classNum}-${subject.code}`} href={`/cbse/class/${classNum}/subject/${subject.code}`} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Subject Code {subject.code}</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">{subject.name}</h2>
              <p className="mt-2 text-sm text-slate-600">
                {subject.pythonLibraries?.length ? `Python • ${subject.pythonLibraries.join(' • ')}` : subject.pythonRole === 'core-programming' ? 'Python • Core programming' : 'Curriculum-aligned learning track'}
              </p>
              <span className="mt-6 inline-flex text-sm font-semibold text-blue-700 group-hover:underline">Open subject →</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
