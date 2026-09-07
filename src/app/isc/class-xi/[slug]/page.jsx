import Link from "next/link";
import { notFound } from "next/navigation";
import { ISC_XI_TOPICS } from "@/lib/iscSyllabus";
import { getISCClassXIContent } from "@/app/data/iscClassXIContent";
import { ISC_XI_CHAPTER_ENHANCEMENTS } from "@/app/data/iscXIChapterEnhancements";

export function generateStaticParams() {
  return ISC_XI_TOPICS.map((topic) => ({ slug: topic.id }));
}

export default async function ISCClassXIChapterPage({ params }) {
  const { slug } = await params;
  const topic = ISC_XI_TOPICS.find((item) => item.id === slug);
  if (!topic) notFound();

  const content = getISCClassXIContent(slug) || getISCClassXIContent(topic.id) || null;
  const enhancement = ISC_XI_CHAPTER_ENHANCEMENTS[slug] || null;
  const mcqs = content?.mcqs || [];
  const practice = content?.practice || [];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/isc/class-xi" className="text-sm font-medium text-slate-600 hover:text-slate-900">← Back to ISC Class XI</Link>
        <header className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <span>Section {topic.section}</span><span>•</span><span>~{topic.estimatedTime} min</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{topic.title}</h1>
          <p className="mt-4 leading-7 text-slate-600">{enhancement?.overview || content?.learningObjectives?.join(" ") || "Study the chapter concepts and practise exam-style questions."}</p>
        </header>

        {enhancement?.sections?.map((section) => (
          <section key={section.title} className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">{section.title}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              {section.points?.map((point) => <li key={point}>{point}</li>)}
            </ul>
            {section.example && <div className="mt-4 rounded-xl bg-slate-950 p-4 font-mono text-sm leading-6 text-white">{section.example}</div>}
          </section>
        ))}

        {enhancement?.quickPractice?.length > 0 && (
          <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-xl font-bold">Quick practice</h2>
            <div className="mt-4 space-y-3">
              {enhancement.quickPractice.map((item, index) => (
                <details key={item.question} className="rounded-xl bg-white p-4 shadow-sm">
                  <summary className="cursor-pointer font-semibold">{index + 1}. {item.question}</summary>
                  <p className="mt-3 text-sm text-slate-700"><strong>Answer:</strong> {item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {content && (
          <section className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Learning objectives</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {(content.learningObjectives || []).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Remember</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {(content.remember || []).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>
        )}

        {mcqs.length > 0 && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">MCQs</h2>
            <div className="mt-4 space-y-4">
              {mcqs.map((item) => (
                <details key={item.id} className="rounded-xl border border-slate-200 p-4">
                  <summary className="cursor-pointer font-semibold">{item.question}</summary>
                  <ul className="mt-3 space-y-1 text-sm text-slate-600">{item.options?.map((option) => <li key={option}>{option}</li>)}</ul>
                  <p className="mt-3 text-sm"><strong>Answer:</strong> {item.correctAnswer} — {item.explanation}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {practice.length > 0 && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Practice questions</h2>
            <div className="mt-4 space-y-3">
              {practice.map((item) => (
                <details key={item.id} className="rounded-xl border border-slate-200 p-4">
                  <summary className="cursor-pointer font-semibold">{item.question}</summary>
                  <p className="mt-3 text-sm text-slate-700"><strong>Answer:</strong> {item.answer || "Work it out and compare with the chapter notes."}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
