import Link from "next/link";
import { notFound } from "next/navigation";
import { getISCXIIJavaPythonContent, ISC_XII_JAVA_PYTHON_CONTENT } from "@/app/data/iscXIIJavaPythonContent";

export function generateStaticParams() {
  return Object.keys(ISC_XII_JAVA_PYTHON_CONTENT).map((topic) => ({ topic }));
}

export default async function ISCClassXIITopicPage({ params }) {
  const { topic } = await params;
  const content = getISCXIIJavaPythonContent(topic);
  if (!content) notFound();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/isc/class-xii" className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">← Class XII</Link>
        <header className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">ISC XII · Section {content.section}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">{content.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{content.overview}</p>
        </header>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black">Core concepts</h2>
          <ul className="mt-5 space-y-3">
            {content.concepts.map((item) => <li key={item} className="rounded-2xl bg-slate-50 p-4 leading-7 dark:bg-slate-950">{item}</li>)}
          </ul>
        </section>

        <section className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-7 dark:border-blue-900 dark:bg-blue-950/30">
          <h2 className="text-2xl font-black">Worked example</h2>
          <p className="mt-4 leading-7">{content.workedExample}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black">Board practice</h2>
          <div className="mt-5 grid gap-5">
            {content.practice.map((item, index) => (
              <article key={`${item.type}-${index}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500">{item.type}</div>
                <h3 className="mt-2 text-lg font-bold">{item.question}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300"><strong>Answer:</strong> {item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
