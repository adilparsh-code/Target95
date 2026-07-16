"use client";

export default function QuestionFilters({
  difficulty,
  setDifficulty,
  type,
  setType,
}) {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="rounded-xl border-2 border-gray-300 p-4 outline-none focus:border-blue-600"
      >
        <option value="all">📊 All Difficulty</option>
        <option value="easy">🟢 Easy</option>
        <option value="medium">🟡 Medium</option>
        <option value="hard">🔴 Hard</option>
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="rounded-xl border-2 border-gray-300 p-4 outline-none focus:border-blue-600"
      >
        <option value="all">📘 All Types</option>
        <option value="theory">📖 Theory</option>
        <option value="mcq">📝 MCQ</option>
      </select>

    </div>
  );
}