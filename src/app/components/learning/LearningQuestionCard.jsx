"use client";

import { useState } from "react";

const typeLabels = { mcq: "MCQ", theory: "Theory", programming: "Programming" };

export default function LearningQuestionCard({ question, attempt, onAttempt }) {
  const [selection, setSelection] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const submitted = attempt?.submitted;
  const answerCorrect = selection === question.answer;

  function submitMcq() {
    if (selection === null || submitted) return;
    onAttempt(question, answerCorrect);
  }

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-blue-800">{question.section || typeLabels[question.type]}</span>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">{question.difficulty}</span>
        <span className="text-gray-500">{question.marks} mark{question.marks > 1 ? "s" : ""} · {question.estimatedTime} min</span>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-6 text-gray-900">{question.prompt}</h3>

      {question.type === "mcq" && (
        <div className="mt-4 space-y-2">
          {question.options.map((option, index) => {
            const isAnswer = index === question.answer;
            const isSelected = index === selection;
            const resultClass = submitted && isAnswer ? "border-green-400 bg-green-50" : submitted && isSelected ? "border-red-400 bg-red-50" : isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300";
            return <button key={option} type="button" disabled={submitted} onClick={() => setSelection(index)} className={`block w-full rounded-xl border p-3 text-left text-sm text-gray-800 transition ${resultClass}`}><span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span>{option}</button>;
          })}
          {!submitted ? <button type="button" disabled={selection === null} onClick={submitMcq} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300">Check answer</button> : <p className={`text-sm font-semibold ${attempt.correct ? "text-green-700" : "text-red-700"}`}>{attempt.correct ? "Correct — well done." : "Review the explanation and try a related question."}</p>}
        </div>
      )}

      {question.type === "theory" && <div className="mt-4"><p className="text-sm text-gray-600">Keywords: {question.keywords.join(", ")}</p><button type="button" onClick={() => { setExpanded(!expanded); if (!submitted) onAttempt(question, null); }} className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">{expanded ? "Hide model answer" : "Show model answer"}</button>{expanded && <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-gray-700"><p><strong>Model answer:</strong> {question.modelAnswer}</p><ul className="mt-3 list-disc pl-5">{question.markingPoints.map((point) => <li key={point}>{point}</li>)}</ul></div>}</div>}

      {question.type === "programming" && <div className="mt-4"><button type="button" onClick={() => { setExpanded(!expanded); if (!submitted) onAttempt(question, null); }} className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">{expanded ? "Hide solution guide" : "Open solution guide"}</button>{expanded && <div className="mt-4 space-y-4 text-sm text-gray-700"><p><strong>Constraints:</strong> {question.constraints}</p><p><strong>Flow:</strong> {question.flowExplanation}</p><div className="grid gap-3 sm:grid-cols-2"><pre className="overflow-x-auto rounded-xl bg-slate-900 p-3 text-xs text-slate-100"><strong>Input</strong>{`\n${question.sampleInput}`}</pre><pre className="overflow-x-auto rounded-xl bg-slate-900 p-3 text-xs text-slate-100"><strong>Output</strong>{`\n${question.sampleOutput}`}</pre></div><div><strong>Algorithm</strong><ol className="mt-1 list-decimal pl-5">{question.algorithm.map((step) => <li key={step}>{step}</li>)}</ol></div><pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-5 text-slate-100">{question.javaSolution}</pre><p><strong>Dry run:</strong> {question.dryRun.join(" → ")}</p><p><strong>Output explanation:</strong> {question.outputExplanation}</p><p><strong>Complexity:</strong> {question.timeComplexity} time, {question.spaceComplexity} space.</p><p><strong>Common mistakes:</strong> {question.commonMistakes.join("; ")}</p><p><strong>Optimization tips:</strong> {question.optimizationTips.join(" ")}</p></div>}</div>}

      {submitted && question.type !== "mcq" && <p className="mt-3 text-xs font-semibold text-green-700">Added to your topic practice progress.</p>}
      {submitted && <p className="mt-3 rounded-xl bg-blue-50 p-3 text-sm text-blue-900"><strong>Explanation:</strong> {question.explanation}</p>}
    </article>
  );
}
