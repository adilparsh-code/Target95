import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllClassXTopicContent, getClassXTopicContent } from "@/lib/icseClassXContent";

export function generateStaticParams() {
  return getAllClassXTopicContent().map((topic) => ({ topic: topic.topicId }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  const content = getClassXTopicContent(topic);
  return content ? { title: `${content.title} | ICSE Class X | Target95` } : {};
}

export default async function ICSEClassXLessonPage({ params }) {
  const { topic } = await params;
  const content = getClassXTopicContent(topic);
  if (!content) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/icse/class-x/lessons" className="text-sm font-semibold text-slate-600 hover:text-slate-900">← All Class X lessons</Link>
        <header className="mt-6 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">ICSE Class X · Computer Applications</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">{content.title}</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">{content.learningObjectives?.join(" ")}</p>
        </header>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-black">Key concepts</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">{content.keyConcepts?.map((item) => <li key={item} className="rounded-xl bg-slate-50 p-3 text-sm leading-6">{item}</li>)}</ul>
        </section>

        <section className="mt-6 rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-200">
          <h2 className="text-xl font-black">Remember</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">{content.remember?.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        {content.mcqs?.length > 0 && <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-black">Quick MCQs</h2>
          <div className="mt-4 grid gap-4">{content.mcqs.map((item) => <details key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <summary className="cursor-pointer font-bold">{item.question}</summary>
            <ul className="mt-3 space-y-2 text-sm">{item.options?.map((option) => <li key={option}>{option}</li>)}</ul>
            <p className="mt-3 text-sm font-bold text-green-700">Answer: {item.correctAnswer}</p>
            <p className="mt-1 text-sm text-slate-600">{item.explanation}</p>
          </details>)}</div>
        </section>}

        {content.practice?.length > 0 && <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-black">Board practice</h2>
          <div className="mt-4 grid gap-3">{content.practice.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{item.difficulty} · {item.type} · {item.marks} marks</p>
            <h3 className="mt-2 font-semibold leading-6">{item.question}</h3>
            {item.answer && <details className="mt-3"><summary className="cursor-pointer text-sm font-bold text-blue-700">Show answer / approach</summary><p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p></details>}
          </article>)}</div>
        </section>}

        {content.practicalTasks?.length > 0 && <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-black">Practical tasks</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6">{content.practicalTasks.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>}

        {content.examTips?.length > 0 && <section className="mt-6 rounded-3xl bg-blue-50 p-6 ring-1 ring-blue-200">
          <h2 className="text-xl font-black">Exam tips</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">{content.examTips.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>}
      </div>
    </main>
  );
}
