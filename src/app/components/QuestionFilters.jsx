"use client";

export default function QuestionFilters({
  difficulty,
  setDifficulty,
  type,
  setType,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <label className="text-sm font-semibold text-gray-900">
        <span className="mb-2 block">Difficulty</span>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white p-4 text-base font-semibold text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        >
          <option value="all">📊 All Difficulty</option>
          <option value="easy">🟢 Easy</option>
          <option value="medium">🟡 Medium</option>
          <option value="hard">🔴 Hard</option>
        </select>
      </label>

      <label className="text-sm font-semibold text-gray-900">
        <span className="mb-2 block">Question type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        >
          <option value="all">📘 All Types</option>
          <option value="theory">📖 Theory</option>
          <option value="mcq">📝 MCQ</option>
        </select>
      </label>
    </div>
  );
}