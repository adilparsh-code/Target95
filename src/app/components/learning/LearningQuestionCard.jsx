"use client";

import { useState } from "react";
import BookmarkButton from "../BookmarkButton";
import DifficultyBadge from "../DifficultyBadge";
import useProgress from "../../hooks/useProgress";

const typeLabels = { mcq: "MCQ", theory: "Theory", programming: "Programming" };

export default function LearningQuestionCard({ question, attempt, onAttempt }) {
  const [selection, setSelection] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { markCompleted } = useProgress();
  const submitted = attempt?.submitted;
  const answerCorrect = selection === question.answer;

  function submitMcq() {
    if (selection === null || submitted) return;
    onAttempt(question, answerCorrect);
    markCompleted({ chapter: question.chapter, questionId: question.id });
  }

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-blue-800">{question.section || typeLabels[question.type]}</span>
        <DifficultyBadge difficulty={question.difficulty} />
        <span className="text-gray-500">{question.marks} mark{question.marks > 1 ? "s" : ""} · {question.estimatedTime} min</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900 flex-1">{question.prompt}</h3>
        <div className="flex items-center gap-2 ml-2">
          <BookmarkButton chapter={question.chapter} questionId={question.id} />
          <button
            type="button"
            onClick={() => setShowReport(true)}
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
            title="Report issue"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
          </button>
        </div>
      </div>

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

      {showReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Report Issue</h2>
              <button type="button" onClick={() => setShowReport(false)} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">✕</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowReport(false); }} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">Issue Type</label>
                <select className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
                  <option>Incorrect Answer</option>
                  <option>Typo / Formatting</option>
                  <option>Unclear Question</option>
                  <option>Duplicate Question</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">Description</label>
                <textarea rows={4} required placeholder="Please describe the issue..." className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowReport(false)} className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </article>
  );
}
