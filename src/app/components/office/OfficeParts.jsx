'use client';
import { useState } from 'react';
import Button from '../ui/Button';

export function LessonSection({ title, children }) { return <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 dark:border-slate-700 dark:bg-slate-900"><h2 className="text-2xl font-bold">{title}</h2>{children}</section>; }
export function ProgressIndicator({ value, total, label }) { return <div className="space-y-2"><p className="text-sm">{label}: {value} / {total} ({Math.round(value / total * 100)}%)</p><progress aria-label={label} value={value} max={total} className="h-3 w-full accent-blue-600" /></div>; }
export function ImageSection({ image }) {
  const [failed, setFailed] = useState(false);
  return <figure className="space-y-3">{failed ? <p role="status" className="rounded-xl border p-5">Visual unavailable. {image.alt}. Use the numbered procedure below.</p> : <div role="region" aria-label="Scrollable command diagram" tabIndex={0} className="overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-600">{/* Local SVG command diagrams use their intrinsic dimensions and expose load failures. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} width="1100" height="320" className="min-w-[760px]" onError={() => setFailed(true)} /></div>}<figcaption className="text-sm text-slate-600 dark:text-slate-300">{image.caption} Scroll horizontally on small screens.</figcaption>{!failed && <a href={image.src} target="_blank" rel="noreferrer" className="inline-block underline focus-visible:outline-2">Open full-size visual (new tab)</a>}</figure>;
}
export function StepByStep({ steps }) { return <ol className="list-decimal space-y-3 pl-6">{steps.map((step, index) => <li key={index}>{step}</li>)}</ol>; }
export function MCQCard({ question, answer, onAnswer }) {
  const [selected, setSelected] = useState(answer === undefined ? '' : String(answer));
  return <fieldset className="space-y-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700"><legend className="px-2 font-semibold">{question.question}</legend>{question.options.map((option, index) => <label key={index} className="flex cursor-pointer gap-3 rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"><input type="radio" name={question.id} value={index} checked={selected === String(index)} onChange={(event) => setSelected(event.target.value)} disabled={answer !== undefined} /><span>{option}</span></label>)}{answer === undefined ? <Button disabled={selected === ''} onClick={() => onAnswer(Number(selected))}>Check answer</Button> : <p role="status">{answer === question.answer ? 'Correct.' : 'Review and try again.'} {question.explanation}</p>}</fieldset>;
}
export function ShortQuestion({ item }) { return <div className="space-y-3"><label className="block font-semibold">{item.question}<textarea className="mt-2 block w-full rounded-lg border border-slate-300 bg-transparent p-3" rows={3} placeholder="Write your explanation here (self-assessed)" /></label><details><summary className="cursor-pointer underline">Compare with a suggested answer</summary><p className="mt-3">{item.answer}</p></details></div>; }
