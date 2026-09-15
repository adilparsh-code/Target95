import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Clock3, GraduationCap, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllCBSE2026_27Classes } from '../data/cbse';

export const metadata = {
  title: 'CBSE Curriculum 2026–27 | Target95',
  description:
    'Access CBSE class-wise syllabus, unit blueprints, practice questions, and mock tests for 2026-27.',
};

const classStyles = {
  9: { label: 'Foundation', tone: 'from-blue-500/10 to-blue-50', accent: 'text-blue-700', icon: '09' },
  10: { label: 'Board year', tone: 'from-emerald-500/10 to-emerald-50', accent: 'text-emerald-700', icon: '10' },
  11: { label: 'Senior secondary', tone: 'from-amber-500/10 to-amber-50', accent: 'text-amber-700', icon: '11' },
  12: { label: 'Board year', tone: 'from-violet-500/10 to-violet-50', accent: 'text-violet-700', icon: '12' },
};

export default function CBSEHomePage() {
  const classes = getAllCBSE2026_27Classes() || [];
  const totalClasses = classes.length;
  const totalSubjects = classes.reduce(
    (sum, item) => sum + (Array.isArray(item?.subjects) ? item.subjects.length : 0),
    0,
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] transition hover:text-[var(--primary)]">
            <span aria-hidden="true">←</span> Target95 Home
          </Link>

          <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-[var(--shadow-md)] dark:bg-slate-900">
            <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-[radial-gradient(circle_at_center,rgba(36,87,214,.14),transparent_68%)] lg:block" />
            <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.25fr_.75fr] lg:p-14">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                  <span className="rounded-full bg-[var(--primary-light)] px-3 py-1.5">CBSE</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 text-[var(--muted-foreground)]">
                    <Clock3 className="h-3.5 w-3.5" /> 2026–27 session
                  </span>
                </div>
                <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  Your CBSE path, organised by class.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
                  Pick your class and move straight into syllabus-aligned learning, practice, and exam preparation — without the clutter.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="#classes" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    Choose your class <ArrowRight className="h-4 w-4" />
                  </Link>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--muted-foreground)]">
                    <Sparkles className="h-4 w-4" /> Built for focused revision
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 self-end lg:pl-8">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-5">
                  <p className="text-3xl font-black">{totalClasses}</p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">classes covered</p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-5">
                  <p className="text-3xl font-black">{totalSubjects}</p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">subjects mapped</p>
                </div>
                <div className="col-span-2 rounded-2xl border border-[var(--border)] bg-white p-5 dark:bg-slate-950">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]"><GraduationCap className="h-5 w-5" /></div>
                    <div><p className="font-bold">One place to prepare</p><p className="text-sm text-[var(--muted-foreground)]">Learn → practise → assess</p></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="classes" className="scroll-mt-24 pt-16">
            <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Curriculum</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Choose your class</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[var(--muted-foreground)]">Start with the class you are studying now. Your subject list is generated from the live CBSE curriculum data.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {classes.map((item) => {
                const classNumber = item?.classNumber;
                const classId = item?.classId || `class-${classNumber}`;
                const subjects = Array.isArray(item?.subjects) ? item.subjects : [];
                const style = classStyles[classNumber] || classStyles[9];

                return (
                  <Link key={classId} href={`/cbse/class/${encodeURIComponent(classNumber)}`} className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[var(--input)] hover:shadow-[var(--shadow-md)] dark:bg-slate-900">
                    <div className={`bg-gradient-to-br ${style.tone} p-6`}>
                      <div className="flex items-start justify-between">
                        <span className={`grid h-12 w-12 place-items-center rounded-xl bg-white text-lg font-black shadow-sm ${style.accent} dark:bg-slate-900`}>{style.icon}</span>
                        <span className="rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] dark:bg-slate-900/70">{style.label}</span>
                      </div>
                      <h3 className="mt-10 text-2xl font-black">Class {classNumber}</h3>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--muted-foreground)]">{subjects.length} subject{subjects.length === 1 ? '' : 's'}</span>
                        <span className="inline-flex items-center gap-1 font-bold text-[var(--primary)] transition group-hover:gap-2">Open <ArrowRight className="h-4 w-4" /></span>
                      </div>
                      <div className="mt-4 flex items-center gap-2 border-t border-[var(--border)] pt-4 text-xs font-semibold text-[var(--muted-foreground)]">
                        <CheckCircle2 className="h-4 w-4 text-[var(--success)]" /> Syllabus-aligned workspace
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              ['01', 'Learn clearly', 'Structured notes and concepts keep each topic easy to navigate.'],
              ['02', 'Practise deliberately', 'Question banks and mock tests turn revision into measurable practice.'],
              ['03', 'Prepare with confidence', 'Use your progress and performance to decide what to revise next.'],
            ].map(([number, title, description]) => (
              <div key={number} className="rounded-2xl border border-[var(--border)] bg-white p-6 dark:bg-slate-900">
                <span className="text-xs font-black tracking-[0.16em] text-[var(--primary)]">{number}</span>
                <h3 className="mt-4 text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{description}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
