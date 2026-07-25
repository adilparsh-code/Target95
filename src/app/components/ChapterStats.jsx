
"use client";
import useBookmarks from "../hooks/useBookmarks";
import useProgress from "../hooks/useProgress";

export default function ChapterStats({ questions }) {
  const { isBookmarked } = useBookmarks();
  const { isCompleted } = useProgress();

  const stats = [
    { label: "Total Questions", value: questions.length, accent: "bg-white text-blue-700" },
    { label: "Theory", value: questions.filter((q) => q.type === "theory").length, accent: "bg-white text-indigo-700" },
    { label: "MCQ", value: questions.filter((q) => q.type === "mcq").length, accent: "bg-white text-purple-700" },
    { label: "Easy", value: questions.filter((q) => String(q.difficulty).toLowerCase() === "easy").length, accent: "bg-green-50 text-green-700" },
    { label: "Medium", value: questions.filter((q) => String(q.difficulty).toLowerCase() === "medium").length, accent: "bg-yellow-50 text-yellow-700" },
    { label: "Hard", value: questions.filter((q) => String(q.difficulty).toLowerCase() === "hard").length, accent: "bg-red-50 text-red-700" },
    { label: "Bookmarked", value: questions.filter((q) => isBookmarked({ chapter: q.chapter, questionId: q.id })).length, accent: "bg-blue-50 text-gray-900" },
    { label: "Completed", value: questions.filter((q) => isCompleted({ chapter: q.chapter, questionId: q.id })).length, accent: "bg-green-50 text-gray-900" },
  ];

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-slate-50 p-6" aria-labelledby="chapter-stats-heading">
      <h2 id="chapter-stats-heading" className="mb-6 text-2xl font-bold text-gray-800">
        📊 Chapter Statistics
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-xl p-4 shadow-sm ${stat.accent}`}>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
