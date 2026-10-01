'use client';
import { useState } from 'react';
import Link from 'next/link';
import { getOfficeApp, officeChapterKey, canCompleteOfficeChapter } from '@/data/office';
import useOfficeProgress from '@/hooks/useOfficeProgress';
import Button from '../ui/Button';
import { LessonSection, ImageSection, StepByStep, MCQCard, ShortQuestion } from './OfficeParts';

export default function OfficeLesson({ appId, chapter }) {
  const progress = useOfficeProgress();
  if (!progress.ready) return <p role="status">Loading your learning progress…</p>;
  return <LessonContent key={`${progress.userId}/${appId}/${chapter.id}`} appId={appId} chapter={chapter} progress={progress} />;
}

function LessonContent({ appId, chapter, progress }) {
  const app = getOfficeApp(appId);
  const { chapters, update, ready } = progress;
  const saved = chapters[officeChapterKey(appId, chapter.id)] || {};
  const [answers, setAnswers] = useState(saved.quizAnswers || {});
  const [checks, setChecks] = useState(saved.practicalChecks || {});
  const [independent, setIndependent] = useState(saved.independentDone || false);
  const [challengeDone, setChallengeDone] = useState(saved.challengeDone || false);
  const score = chapter.mcqs.filter((q) => answers[q.id] === q.answer).length;
  const canComplete = canCompleteOfficeChapter(chapter, { checks, independent, challengeDone, answers });
  const previous = app.chapters[chapter.number - 2];
  const next = app.chapters[chapter.number];
  const saveAnswer = (id, value) => {
    const updated = { ...answers, [id]: value };
    setAnswers(updated);
    update(appId, chapter.id, { quizAnswers: updated, quizScore: chapter.mcqs.filter((q) => updated[q.id] === q.answer).length, totalQuestions: chapter.mcqs.length, status: saved.status === 'completed' ? 'completed' : 'in_progress' });
  };
  return <article className="mx-auto max-w-4xl space-y-6">
    <nav aria-label="Breadcrumb" className="text-sm"><Link className="underline" href="/office">Office</Link> / <Link className="underline" href={`/office/${appId}`}>{app.name}</Link> / Chapter {chapter.number}</nav>
    <header className="space-y-3"><p className={`font-semibold ${app.accent}`}>{app.name} · Chapter {chapter.number} of {app.chapters.length}</p><h1 className="text-3xl font-bold sm:text-4xl">{chapter.title}</h1><p>{chapter.description}</p><p role="status" className="text-sm">{saved.status === 'completed' ? 'Chapter completed ✓' : 'Complete the practicals and pass the quick check to master this chapter.'}</p></header>
    <LessonSection title="What you will learn"><ul className="list-disc space-y-2 pl-5">{chapter.objectives.map((text) => <li key={text}>{text}</li>)}</ul>{chapter.concepts.map((text) => <p key={text}>{text}</p>)}</LessonSection>
    <LessonSection title="See it"><ImageSection image={chapter.image} /></LessonSection>
    <LessonSection title="Step by step"><StepByStep steps={chapter.steps} /><p className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800"><strong>Expected result: </strong>{chapter.expectedResult}</p></LessonSection>
    <LessonSection title="Practice with me"><p>{chapter.guidedPractical.task}</p><p className="text-sm">Do the work in your installed Office application, then check each step.</p>{chapter.guidedPractical.checklist.map((text, index) => <label key={text} className="flex gap-3"><input type="checkbox" checked={!!checks[index]} onChange={(event) => { const practicalChecks = { ...checks, [index]: event.target.checked }; setChecks(practicalChecks); update(appId, chapter.id, { practicalChecks }); }} /><span>{text}</span></label>)}</LessonSection>
    <LessonSection title="Your turn"><p>{chapter.independentPractice}</p><label className="flex gap-3"><input type="checkbox" checked={independent} onChange={(event) => { setIndependent(event.target.checked); update(appId, chapter.id, { independentDone: event.target.checked }); }} />I completed and checked my independent practice.</label></LessonSection>
    {chapter.projects && <LessonSection title="Real-world mini projects"><div className="grid gap-4 sm:grid-cols-2">{chapter.projects.map((project) => <div key={project.title} className="space-y-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700"><h3 className="text-lg font-bold">{project.title}</h3><p>{project.task}</p><p className="text-sm"><strong>Verify: </strong>{project.expectedResult}</p></div>)}</div></LessonSection>}
    <LessonSection title="Quick check"><p aria-live="polite">Score: {score} / {chapter.mcqs.length}{saved.quizScore !== undefined && ` · Last saved score: ${saved.quizScore}`}</p>{chapter.mcqs.map((question) => <MCQCard key={`${question.id}-${Object.keys(answers).length === 0 ? 'fresh' : 'attempt'}`} question={question} answer={answers[question.id]} onAnswer={(value) => saveAnswer(question.id, value)} />)}<Button variant="outline" onClick={() => { setAnswers({}); update(appId, chapter.id, { quizAnswers: {}, quizScore: 0 }); }}>Retry quiz</Button></LessonSection>
    <LessonSection title="Short questions">{chapter.shortQuestions.map((item) => <ShortQuestion key={item.question} item={item} />)}</LessonSection>
    <LessonSection title="Challenge"><p>{chapter.challenge}</p><label className="flex gap-3"><input type="checkbox" checked={challengeDone} onChange={(event) => { setChallengeDone(event.target.checked); update(appId, chapter.id, { challengeDone: event.target.checked }); }} />I completed the challenge and reviewed my output.</label></LessonSection>
    <LessonSection title="Tips and common mistakes"><ul className="list-disc space-y-2 pl-5">{chapter.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul><h3 className="font-bold">Avoid these mistakes</h3>{chapter.mistakes.map((text) => <p key={text}>{text}.</p>)}</LessonSection>
    <LessonSection title="Key points"><ul className="list-disc space-y-2 pl-5">{chapter.keyPoints.map((text) => <li key={text}>{text}</li>)}</ul><Button disabled={!ready || !canComplete || saved.status === 'completed'} onClick={() => update(appId, chapter.id, { status: 'completed', progress: 100, completedAt: new Date().toISOString() })}>{saved.status === 'completed' ? 'Chapter completed' : 'Complete chapter'}</Button><p className="text-sm">Complete all practical checklists and answer both MCQs correctly to unlock completion. Practical and short-answer work is self-assessed.</p></LessonSection>
    <nav aria-label="Chapter navigation" className="flex flex-wrap justify-between gap-4">{previous ? <Link className="underline" href={`/office/${appId}/${previous.id}`}>← {previous.title}</Link> : <Link className="underline" href={`/office/${appId}`}>← All chapters</Link>}{next ? <Link className="underline" href={`/office/${appId}/${next.id}`}>{next.title} →</Link> : <Link className="underline" href={`/office/${appId}`}>Back to curriculum →</Link>}</nav>
  </article>;
}
