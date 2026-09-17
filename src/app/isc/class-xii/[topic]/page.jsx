import Link from "next/link";
import { notFound } from "next/navigation";
import { getISCXIIJavaPythonContent, ISC_XII_JAVA_PYTHON_CONTENT } from "@/app/data/iscXIIJavaPythonContent";

export function generateStaticParams() {
  return Object.keys(ISC_XII_JAVA_PYTHON_CONTENT).map((topic) => ({ topic }));
}

const TYPE_LABELS = {
  tracing: "Output Tracing",
  debugging: "Debugging",
  programming: "Programming",
  mcq: "MCQ",
  reasoning: "Reasoning",
};

const TYPE_COLORS = {
  tracing: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900",
  debugging: "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900",
  programming: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900",
  mcq: "bg-violet-50 border-violet-200 dark:bg-violet-950/30 dark:border-violet-900",
  reasoning: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900",
};

function PracticeItem({ item, index }) {
  const colorClass = TYPE_COLORS[item.type] || "bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800";
  const label = TYPE_LABELS[item.type] || item.type;

  if (item.type === "mcq") {
    return (
      <details className={`rounded-3xl border p-6 ${colorClass}`}>
        <summary className="cursor-pointer">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 mr-3">{label}</span>
          <span className="font-bold">{item.question}</span>
        </summary>
        <ul className="mt-4 space-y-2">
          {(item.options || []).map((opt) => (
            <li key={opt} className="rounded-xl bg-white/60 dark:bg-slate-800/60 px-4 py-2 text-sm">{opt}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-bold">Answer: {item.answer}</p>
        {item.explanation && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.explanation}</p>}
      </details>
    );
  }

  return (
    <article className={`rounded-3xl border p-6 ${colorClass}`}>
      <div className="text-xs font-black uppercase tracking-wider text-slate-500">{label}</div>
      <h3 className="mt-2 text-lg font-bold leading-7">{item.question}</h3>
      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
        <strong>Answer:</strong> {item.answer}
      </p>
    </article>
  );
}

export default async function ISCClassXIITopicPage({ params }) {
  const { topic } = await params;
  const content = getISCXIIJavaPythonContent(topic);
  if (!content) notFound();

  const practiceByType = (content.practice || []).reduce((acc, item) => {
    const t = item.type || "other";
    if (!acc[t]) acc[t] = [];
    acc[t].push(item);
    return acc;
  }, {});

  const typeOrder = ["tracing", "debugging", "programming", "mcq", "reasoning", "other"];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/isc/class-xii" className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
          ← Class XII
        </Link>

        <header className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            ISC XII · Section {content.section}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">{content.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{content.overview}</p>
        </header>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black">Core concepts</h2>
          <ul className="mt-5 space-y-3">
            {content.concepts.map((item, i) => (
              <li key={i} className="rounded-2xl bg-slate-50 p-4 leading-7 dark:bg-slate-950">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-7 dark:border-blue-900 dark:bg-blue-950/30">
          <h2 className="text-2xl font-black">Worked example</h2>
          <p className="mt-4 leading-7">{content.workedExample}</p>
          {content.workedExampleCode && (
            <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-xs leading-6 text-slate-100">
              <code>{content.workedExampleCode}</code>
            </pre>
          )}
        </section>

        {Array.isArray(content.related) && content.related.length > 0 && (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-black">Related Class XII lessons</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {content.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-2xl font-black">Board practice</h2>
          {typeOrder.map((type) => {
            const items = practiceByType[type];
            if (!items || items.length === 0) return null;
            return (
              <div key={type} className="mt-6">
                <h3 className="mb-3 text-lg font-bold text-slate-700 dark:text-slate-300">
                  {TYPE_LABELS[type] || type}
                </h3>
                <div className="grid gap-4">
                  {items.map((item, index) => (
                    <PracticeItem key={`${type}-${index}`} item={item} index={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
