import { Metadata } from 'next';
import Link from 'next/link';
import { getCBSEClassesByYear } from '../data/cbse';

export const metadata: Metadata = {
  title: 'CBSE Curriculum 2026–27 | Target95',
  description: 'Access CBSE class-wise syllabus, unit blueprints, practice questions, and mock tests for 2026-27.',
};

export default async function CBSEHomePage() {
  const targetYearKey = "2026-27";
  const displayAcademicYear = "2026–27"; 

  // Resolved asynchronously to maintain App Router data fetching standards
  const classes = (await getCBSEClassesByYear(targetYearKey)) || [];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
            Target95 • CBSE
          </p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            CBSE {displayAcademicYear}
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Choose your class to access the curriculum, practice questions, and mock tests.
          </p>
        </header>

        {classes.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No classes configured for academic year {displayAcademicYear}.
          </div>
        ) : (
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {classes.map(({ classNumber, classId, subjects = [] }) => {
              const subjectCount = subjects.length;
              const targetHref = `/cbse/class/${classNumber}`;

              return (
                <Link
                  key={classId || `class-${classNumber}`}
                  href={targetHref}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl" aria-hidden="true">
                        📘
                      </span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        CBSE
                      </span>
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-slate-900">
                      Class {classNumber}
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                      {subjectCount} subject track{subjectCount === 1 ? '' : 's'} configured
                    </p>
                  </div>

                  <div className="mt-5 text-sm font-semibold text-blue-700 group-hover:underline">
                    Open class →
                  </div>
                </Link>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
