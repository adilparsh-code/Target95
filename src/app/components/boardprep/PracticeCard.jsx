const TYPE_LABELS = {
  mcq: 'Multiple choice',
  'fill-blank': 'Fill in the blank',
  short: 'Short answer',
  long: 'Long answer',
  analytical: 'Analytical',
  hots: 'Higher order thinking',
  transformation: 'Transformation',
  extract: 'Extraction',
};

const DIFFICULTY_STYLES = {
  easy: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  hard: 'bg-rose-50 text-rose-700 ring-rose-200',
};

// One practice question, used at the foot of every BoardPrep chapter page.
export default function PracticeCard({ question, number }) {
  if (!question) return null;

  const typeLabel = TYPE_LABELS[question.type] || question.type;
  const difficultyStyle = DIFFICULTY_STYLES[question.difficulty] || DIFFICULTY_STYLES.medium;

  return (
    <article className="rounded-xl border border-slate-200 p-4">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
          Q{number}. {typeLabel}
        </span>
        <span className={`rounded-full px-2.5 py-1 ring-1 ${difficultyStyle}`}>{question.difficulty}</span>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-800">{question.marks} mark{question.marks === 1 ? '' : 's'}</span>
      </div>
      <p className="mt-3 font-semibold">{question.prompt}</p>
      {question.options?.length > 0 && (
        <ul className="mt-3 list-disc pl-5 text-sm">
          {question.options.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      )}
      <details className="mt-3">
        <summary className="cursor-pointer font-medium text-blue-700">Show answer</summary>
        <p className="mt-2">{question.answer}</p>
        <p className="mt-2 text-sm text-slate-600">{question.explanation}</p>
        {question.commonMistake && (
          <p className="mt-2 text-sm text-amber-800">
            <span className="font-semibold">Common mistake: </span>
            {question.commonMistake}
          </p>
        )}
      </details>
    </article>
  );
}
