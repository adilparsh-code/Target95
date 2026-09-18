import Link from "next/link";

/**
 * Shared index/listing page for a board + class + subject project lab.
 * Every card links to the project's real page (basePath/[slug]); nothing here
 * is a dead or decorative card.
 */
export default function ProjectIndex({ group }) {
  if (!group) return null;
  const projects = group.projects || [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href={group.backHref} className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
          ← {group.backLabel}
        </Link>

        <header className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-300">{group.boardLabel}</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{group.heading || "Project Lab"}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
            {group.intro || "Complete, student-ready project packages. Project work is intentionally kept separate from the theory syllabus."}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-white/10 px-3 py-1">{projects.length} projects</span>
            {group.classNumber != null && <span className="rounded-full bg-white/10 px-3 py-1">Class {group.classNumber}</span>}
            {group.subjectName && <span className="rounded-full bg-white/10 px-3 py-1">{group.subjectName}</span>}
          </div>
        </header>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`${group.basePath}/${project.slug}`}
              className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">Project {index + 1}</span>
                <span className="text-sm font-semibold text-slate-400 group-hover:text-emerald-600">Open →</span>
              </div>
              <h2 className="mt-4 text-xl font-black group-hover:text-emerald-700">{project.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.shortOutcome || project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                {project.language && <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">{project.language}</span>}
                {project.type && <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">{project.type}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
