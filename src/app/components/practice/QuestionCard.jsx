"use client";

import Card from "../ui/Card";
import Button from "../ui/Button";
import DifficultyBadge from "../DifficultyBadge";

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  onSubmit,
  isSubmitted = false,
  showFeedback = false
}) {
  if (!question) return null;

  const isCorrect = selectedAnswer === question.correctAnswer;
  const hasAnswered = selectedAnswer !== null;

  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <DifficultyBadge difficulty={question.difficulty} />
          {question.chapter ? <span className="rounded bg-slate-100 px-2 py-0.5">{question.chapter}</span> : null}
          {question.marks ? <span className="rounded bg-slate-100 px-2 py-0.5">{question.marks} MARKS</span> : null}
        </div>
      </div>

      {question.question && (
        <p className="mb-4 text-sm font-medium leading-6 text-slate-600">
          Choose the best answer for the question below.
        </p>
      )}

      {question.options?.length ? (
        <div className="space-y-2.5">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === question.correctAnswer;
            let optionClasses = "border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300";
            if (showFeedback && isCorrectOption) optionClasses = "border-emerald-300 bg-emerald-50";
            else if (showFeedback && isSelected && !isCorrectOption) optionClasses = "border-rose-300 bg-rose-50";
            else if (isSelected) optionClasses = "border-blue-600 bg-blue-50";

            return (
              <button
                key={index}
                type="button"
                onClick={() => !showFeedback && onSelectAnswer(option)}
                disabled={showFeedback}
                className={`stitch-choice w-full p-3.5 text-left ${optionClasses} disabled:cursor-default`}
              >
                <div className="flex items-start gap-3">
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold ${isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="pt-1 text-sm leading-6 text-slate-800">{option}</span>
                  {showFeedback && isCorrectOption ? <span className="ml-auto pt-1 text-sm font-bold text-emerald-600">✓</span> : null}
                  {showFeedback && isSelected && !isCorrectOption ? <span className="ml-auto pt-1 text-sm font-bold text-rose-600">×</span> : null}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <textarea
          value={selectedAnswer || ""}
          onChange={(e) => !isSubmitted && onSelectAnswer(e.target.value)}
          disabled={isSubmitted}
          rows={7}
          className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          placeholder="Write your answer here..."
        />
      )}

      {showFeedback && (
        <div className={`mt-4 rounded-xl border p-4 ${isCorrect ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"}`}>
          <p className="text-sm font-bold">{isCorrect ? "Correct!" : "Incorrect"}</p>
          {!isCorrect && <p className="mt-1 text-xs">Correct answer: <strong>{question.correctAnswer}</strong></p>}
          {question.explanation ? <p className="mt-2 border-t border-current/10 pt-2 text-xs leading-5">{question.explanation}</p> : null}
        </div>
      )}

      {!showFeedback && (
        <Button
          onClick={onSubmit}
          disabled={!hasAnswered}
          variant="primary"
          className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-xs font-bold uppercase tracking-wider"
        >
          Check Answer
        </Button>
      )}
    </div>
  );
}