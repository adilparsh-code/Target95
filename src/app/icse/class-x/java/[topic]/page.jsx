import Link from "next/link";
import { notFound } from "next/navigation";
import { CLASS_X_TOPICS } from "@/lib/icseSyllabus";
import { getICSEClassXContent } from "@/app/data/icseClassXContent";

export function generateStaticParams() {
  return CLASS_X_TOPICS.filter((topic) => !topic.isProject).map((topic) => ({ topic: topic.topicId }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  const content = getICSEClassXContent(topic);
  return content ? { title: `${content.title} | ICSE Class X Java | Target95` } : {};
}

function Section({ title, children }) {
  if (!children) return null;
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ICSEClassXJavaTopicPage({ params }) {
  const { topic } = await params;
  const content = getICSEClassXContent(topic);
  if (!content) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6">
      <article className="mx-auto max-w-4xl">
        <Link href="/icse/class-x/java" className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">← All Class X Java chapters</Link>
        <header className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">ICSE Class X · Computer Applications</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{content.title}</h1>
        </header>

        <Section title="Learning objectives">
          {Array.isArray(content.learningObjectives) && <ul className="list-disc space-y-2 pl-5 leading-7">{content.learningObjectives.map((item) => <li key={item}>{item}</li>)}</ul>}
        </Section>
        <Section title="Key concepts">
          {Array.isArray(content.keyConcepts) && <ul className="list-disc space-y-2 pl-5 leading-7">{content.keyConcepts.map((item) => <li key={item}>{item}</li>)}</ul>}
        </Section>
        <Section title="Remember">
          {Array.isArray(content.remember) && <ul className="list-disc space-y-2 pl-5 leading-7">{content.remember.map((item) => <li key={item}>{item}</li>)}</ul>}
        </Section>
        <Section title="Multiple-choice questions">
          {Array.isArray(content.mcqs) && <div className="space-y-4">{content.mcqs.map((item) => <details key={item.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"><summary className="cursor-pointer font-semibold">{item.question}</summary><ul className="mt-3 space-y-2 text-sm">{item.options.map((option) => <li key={option}>{option}</li>)}</ul><p className="mt-3 text-sm font-bold">Correct option: {item.correctAnswer}</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.explanation}</p></details>)}</div>}
        </Section>
        <Section title="Board-style practice">
          {Array.isArray(content.practice) && <div className="space-y-4">{content.practice.map((item) => <details key={item.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"><summary className="cursor-pointer font-semibold">{item.question}</summary><p className="mt-3 text-sm text-slate-600 dark:text-slate-300"><span className="font-bold">Suggested answer:</span> {item.answer}</p><p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{item.marks} marks · {item.difficulty} · {item.type}</p></details>)}</div>}
        </Section>
        <Section title="Practical tasks">
          {Array.isArray(content.practicalTasks) && <ul className="list-disc space-y-2 pl-5 leading-7">{content.practicalTasks.map((item) => <li key={item}>{item}</li>)}</ul>}
        </Section>
        <Section title="Exam tips">
          {Array.isArray(content.examTips) && <ul className="list-disc space-y-2 pl-5 leading-7">{content.examTips.map((item) => <li key={item}>{item}</li>)}</ul>}
        </Section>
      </article>
    </main>
  );
}
