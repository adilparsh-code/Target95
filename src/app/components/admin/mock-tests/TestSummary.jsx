import StatusBadge from "../StatusBadge";

export default function TestSummary({ test }) {
  const getScoreColor = (score) => {
    if (score >= 75) return "text-emerald-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-gray-900">{test.title}</h2>
            <StatusBadge status={test.status} size="sm" />
          </div>
          <p className="text-sm text-gray-500">{test.id} · {test.subject} · Class {test.class}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{test.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Questions</p>
          <p className="text-2xl font-bold text-gray-900">{test.questions}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Duration</p>
          <p className="text-2xl font-bold text-gray-900">{test.duration} {test.durationUnit === "min" ? "min" : "hr"}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Max Marks</p>
          <p className="text-2xl font-bold text-gray-900">{test.maxMarks}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Avg. Score</p>
          <p className={`text-2xl font-bold ${getScoreColor(test.avgScore)}`}>{test.avgScore}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Attempts</p>
          <p className="text-2xl font-bold text-gray-900">{test.attempts}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Highest</p>
          <p className="text-2xl font-bold text-emerald-600">{test.highestScore}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Lowest</p>
          <p className="text-2xl font-bold text-rose-600">{test.lowestScore}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Passing</p>
          <p className="text-2xl font-bold text-gray-900">{test.passingScore}/{test.maxMarks}</p>
        </div>
      </div>
    </div>
  );
}