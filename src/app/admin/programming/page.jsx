import { programmingQuestions } from '@/app/data/programmingQuestions';

export const metadata = {
  title: 'Programming Questions | Admin',
};

export default function ProgrammingQuestionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Programming Question System</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Programming Questions Foundation</h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            This admin page exposes the new data-driven programming question foundation for Java and future languages without changing the existing dashboard or authentication flows.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Available Questions</h2>
              <p className="mt-1 text-sm text-slate-600">{programmingQuestions.length} questions are currently available.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {programmingQuestions.map((question) => (
              <article key={question.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{question.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{question.topic} • {question.language} • {question.difficulty}</p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                    {question.chapter}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-700">{question.question}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
