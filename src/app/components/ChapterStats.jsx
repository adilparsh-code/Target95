
"use client";
export default function ChapterStats({ questions }) {
  const total = questions.length;

  const theory = questions.filter(
    (q) => q.type === "theory"
  ).length;

  const mcq = questions.filter(
    (q) => q.type === "mcq"
  ).length;

  const easy = questions.filter(
    (q) => q.difficulty.toLowerCase() === "easy"
  ).length;

  const medium = questions.filter(
    (q) => q.difficulty.toLowerCase() === "medium"
  ).length;

  const hard = questions.filter(
    (q) => q.difficulty.toLowerCase() === "hard"
  ).length;

  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-slate-50 p-6">

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        📊 Chapter Statistics
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">

        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Questions</p>
          <p className="mt-2 text-3xl font-bold text-blue-700">
            {total}
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Theory</p>
          <p className="mt-2 text-3xl font-bold text-indigo-700">
            {theory}
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">MCQ</p>
          <p className="mt-2 text-3xl font-bold text-purple-700">
            {mcq}
          </p>
        </div>

        <div className="rounded-xl bg-green-50 p-4">
          <p className="text-sm text-green-700">Easy</p>
          <p className="mt-2 text-3xl font-bold text-green-700">
            {easy}
          </p>
        </div>

        <div className="rounded-xl bg-yellow-50 p-4">
          <p className="text-sm text-yellow-700">Medium</p>
          <p className="mt-2 text-3xl font-bold text-yellow-700">
            {medium}
          </p>
        </div>

        <div className="rounded-xl bg-red-50 p-4">
          <p className="text-sm text-red-700">Hard</p>
          <p className="mt-2 text-3xl font-bold text-red-700">
            {hard}
          </p>
        </div>

      </div>
    </div>
  );
}