import Link from "next/link";
import { ICSE_CLASS_X_PROJECT, ICSE_CLASS_X_PROJECT_SOURCE } from "@/app/data/icseClassXProjects";

export const metadata = {
  title: "ICSE Class X Written Project | Disruptive Technologies | Target95+",
  description:
    "Syllabus-aligned ICSE Class X Disruptive Technologies written-project guide with report structure, evidence ideas, checklist and viva preparation.",
};

const checklist = [
  "Keep the project inside the official Disruptive Technologies scope.",
  "Give at least one everyday or Indian example for every technology you cover.",
  "State one benefit and one risk per technology instead of only positives.",
  "Use your own words and attribute any quoted material.",
  "Record every source, including the date you accessed it.",
  "Label diagrams, tables and images with captions and figure numbers.",
  "Proofread headings, tables and references before submission.",
  "Be ready to explain any line of the report in the viva.",
];

const practice = [
  { label: "Chapter practice questions", href: ICSE_CLASS_X_PROJECT_SOURCE.practiceChapter },
  { label: "Class X theory and chapter track", href: "/Java" },
  { label: "Class X programming practice", href: "/icse/class-x/programs" },
  { label: "Robotics & AI track (separate)", href: "/icse/robotics-ai/class-x" },
];

export default function ClassXProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href="/icse/class-x" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Back to Class X
        </Link>

        <section className="mt-6 rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-white/10 px-3 py-1.5">ICSE Class X</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Computer Applications (86)</span>
            <span className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-emerald-200">
              Official syllabus topic
            </span>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            {ICSE_CLASS_X_PROJECT.title}
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300">
            {ICSE_CLASS_X_PROJECT.officialRequirement} The structure, evidence ideas and viva
            preparation below are Target95 learning support built on that official scope.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Official scope
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {ICSE_CLASS_X_PROJECT.officialScope.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Syllabus unit</p>
            <p className="mt-2 text-3xl font-bold">{ICSE_CLASS_X_PROJECT_SOURCE.syllabusUnit}</p>
            <p className="mt-1 text-sm text-slate-500">Class X Computer Applications</p>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              The project is kept separate from the Java programming assignments. Practise the
              programming syllabus on its own page instead of mixing it into this report.
            </p>
            <Link
              href="/icse/class-x/programs"
              className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Class X programs →
            </Link>
          </aside>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Recommended project title
          </p>
          <h2 className="mt-2 text-2xl font-bold">{ICSE_CLASS_X_PROJECT.suggestedTitle}</h2>
          <p className="mt-2 text-sm text-slate-600">
            Use this as a starting point. Narrow the title if your school sets its own scope.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ICSE_CLASS_X_PROJECT.targetOutcomes.map((outcome, index) => (
              <div key={outcome} className="rounded-xl bg-slate-50 p-4">
                <span className="text-xs font-bold text-slate-400">OUTCOME {index + 1}</span>
                <p className="mt-2 text-sm leading-6 text-slate-700">{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-bold">Suggested report structure</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Follow this order so every section of the official topic is covered. Each row states what
            the examiner should be able to read in that section.
          </p>
          <div className="mt-6 space-y-3">
            {ICSE_CLASS_X_PROJECT.sections.map((section) => (
              <div
                key={section.title}
                className="grid gap-2 rounded-xl border border-slate-100 p-4 md:grid-cols-[250px_1fr]"
              >
                <h3 className="font-bold">{section.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{section.purpose}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold">Evidence ideas</h2>
            <p className="mt-2 text-sm text-slate-600">
              Choose evidence that helps you explain the technology. Do not add decoration only to
              increase the page count.
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {ICSE_CLASS_X_PROJECT.evidenceIdeas.map((idea) => (
                <li key={idea} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                  {idea}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold">Submission checklist</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {checklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs text-white">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-6 rounded-2xl bg-slate-900 p-7 text-white shadow-sm">
          <h2 className="text-2xl font-bold">Viva preparation</h2>
          <p className="mt-2 text-sm text-slate-300">
            Practise these answers aloud. Each one is answerable using only what the official topic
            covers.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {ICSE_CLASS_X_PROJECT.vivaQuestions.map((question, index) => (
              <div key={question} className="rounded-xl bg-white/5 p-4 text-sm leading-6 text-slate-200">
                <span className="mr-2 font-bold text-white">Q{index + 1}.</span>
                {question}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {practice.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-sm font-semibold text-slate-900">{item.label}</span>
              <span className="mt-2 block text-sm text-slate-500">Open →</span>
            </Link>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-950">Scope and verification</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            The scope above is taken from the Target95 ICSE syllabus registry entry
            {` `}
            <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">
              {ICSE_CLASS_X_PROJECT_SOURCE.sourceRegistry}
            </code>{" "}
            (topic{" "}
            <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">
              {ICSE_CLASS_X_PROJECT_SOURCE.topicId}
            </code>
            , unit {ICSE_CLASS_X_PROJECT_SOURCE.syllabusUnit}) and matches the Class X practice chapter
            at{" "}
            <Link
              href={ICSE_CLASS_X_PROJECT_SOURCE.practiceChapter}
              className="font-semibold underline underline-offset-4"
            >
              {ICSE_CLASS_X_PROJECT_SOURCE.practiceChapter}
            </Link>
            . Mark weight and submission format are set by your school, so confirm them with your
            teacher before submission.
          </p>
        </section>
      </div>
    </main>
  );
}
