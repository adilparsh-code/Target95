import Link from "next/link";
import { ICSE_CLASS_IX_PROJECT, ICSE_CLASS_IX_PROJECT_SOURCE } from "@/app/data/icseClassIXProjects";

export const metadata = {
  title: "Ethical Computing Project | ICSE Class IX | Target95+",
  description:
    "A syllabus-aligned ICSE Class IX Ethical Computing written-project guide with structure, evidence ideas, assessment and viva preparation.",
};

const checklist = [
  "Keep the project focused on the official Ethical Computing scope.",
  "Use your own words; quote or attribute material when needed.",
  "Record sources for facts, definitions and external images.",
  "Use examples that are understandable and relevant to Class IX students.",
  "Proofread headings, tables, captions and references before submission.",
  "Be able to explain every section instead of memorising the report.",
];

export default function EthicalComputingProjectPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/icse/class-ix/projects" className="text-sm font-medium text-slate-600 hover:text-slate-900">
          ← Back to Class IX Projects
        </Link>

        <section className="mt-6 rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-white/10 px-3 py-1.5">ICSE Class IX</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">Computer Applications (86)</span>
            <span className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-emerald-200">Official syllabus requirement</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            {ICSE_CLASS_IX_PROJECT.title}
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300">
            {ICSE_CLASS_IX_PROJECT.officialRequirement} Target95 adds the structure,
            research guidance and viva preparation below; these additions are learning support,
            not extra CISCE requirements.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Official scope</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {ICSE_CLASS_IX_PROJECT.officialScope.map((item) => (
                <div key={item} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Marks</p>
            <p className="mt-2 text-4xl font-bold">20</p>
            <p className="mt-1 text-sm text-slate-500">Written project</p>
            <div className="mt-5 space-y-2 text-sm">
              {ICSE_CLASS_IX_PROJECT.assessment.writtenProjectBreakdown.map((item) => (
                <div key={item.criterion} className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span>{item.criterion}</span>
                  <strong>{item.marks}</strong>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recommended project title</p>
              <h2 className="mt-2 text-2xl font-bold">{ICSE_CLASS_IX_PROJECT.suggestedTitle}</h2>
            </div>
            <span className="text-sm text-slate-500">Use as a starting point; your school may set its own title.</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ICSE_CLASS_IX_PROJECT.targetOutcomes.map((outcome, index) => (
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
            This is Target95&apos;s recommended learning/report structure. It is designed to cover the official scope while matching the CISCE written-project marking headings.
          </p>
          <div className="mt-6 space-y-3">
            {ICSE_CLASS_IX_PROJECT.sections.map((section) => (
              <div key={section.title} className="grid gap-2 rounded-xl border border-slate-100 p-4 md:grid-cols-[250px_1fr]">
                <h3 className="font-bold">{section.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{section.purpose}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold">Evidence ideas</h2>
            <p className="mt-2 text-sm text-slate-600">Choose evidence that helps you explain the topic; do not add decoration just to increase page count.</p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {ICSE_CLASS_IX_PROJECT.evidenceIdeas.map((idea) => (
                <li key={idea} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />{idea}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold">Submission checklist</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
              {checklist.map((item) => (
                <li key={item} className="flex gap-3"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs text-white">✓</span>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-6 rounded-2xl bg-slate-900 p-7 text-white shadow-sm">
          <h2 className="text-2xl font-bold">Viva preparation</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {ICSE_CLASS_IX_PROJECT.vivaQuestions.map((question, index) => (
              <div key={question} className="rounded-xl bg-white/5 p-4 text-sm leading-6 text-slate-200">
                <span className="mr-2 font-bold text-white">Q{index + 1}.</span>{question}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-bold text-amber-950">Source and verification</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            Verified against the CISCE {ICSE_CLASS_IX_PROJECT_SOURCE.sourceTitle} ({ICSE_CLASS_IX_PROJECT_SOURCE.sourceDate}).
            The official syllabus says the Ethical Computing project is part of Internal Assessment and specifies a 20-mark written-project component with the breakdown shown above.
          </p>
          <a
            href={ICSE_CLASS_IX_PROJECT_SOURCE.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-amber-950 underline underline-offset-4"
          >
            Open official CISCE syllabus PDF ↗
          </a>
        </section>
      </div>
    </main>
  );
}
