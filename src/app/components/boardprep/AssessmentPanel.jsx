import ChapterBlock from './ChapterBlock';

// A dedicated assessment section inside a chapter.
//
// Map work is part of the internal assessment for this paper, so it is shown
// apart from the ordinary revision questions: it carries its own instructions,
// its own data and its own answer key.
export default function AssessmentPanel({ assessment }) {
  if (!assessment) return null;

  return (
    <section
      aria-labelledby="assessment-heading"
      className="mt-8 rounded-2xl bg-indigo-950 p-6 text-indigo-50 shadow-sm ring-1 ring-indigo-900"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">Assessment</p>
      <h2 id="assessment-heading" className="mt-1 text-2xl font-bold text-white">
        {assessment.title}
      </h2>
      {assessment.marks ? (
        <p className="mt-1 text-sm text-indigo-200">
          {assessment.marks} marks in total
        </p>
      ) : null}

      {assessment.instructions?.length > 0 && (
        <div className="mt-4 rounded-xl bg-indigo-900/70 p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-indigo-200">Instructions</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-indigo-50">
            {assessment.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-5 space-y-4">
        {assessment.exercises?.map((exercise, index) => (
          <article key={exercise.id} className="rounded-xl bg-white p-5 text-slate-900 ring-1 ring-indigo-900">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-800">
                Exercise {index + 1}
              </span>
              {exercise.marks ? (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
                  {exercise.marks} mark{exercise.marks === 1 ? '' : 's'}
                </span>
              ) : null}
            </div>
            <p className="mt-3 font-semibold">{exercise.prompt}</p>

            {exercise.data?.length > 0 && (
              <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                {exercise.data.map((item) => (
                  <div key={item.label} className="rounded-lg bg-slate-50 p-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</dt>
                    <dd className="mt-1 text-sm text-slate-800">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {exercise.table && (
              <div className="mt-3 text-slate-700">
                <ChapterBlock block={exercise.table} />
              </div>
            )}

            <details className="mt-4">
              <summary className="cursor-pointer font-medium text-indigo-700">Show answer key</summary>
              <p className="mt-2">{exercise.answer}</p>
              <p className="mt-2 text-sm text-slate-600">{exercise.explanation}</p>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
