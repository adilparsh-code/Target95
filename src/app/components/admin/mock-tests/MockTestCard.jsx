import StatusBadge from "../StatusBadge";

export default function MockTestCard({ test, onEdit, onPreview, onResults }) {
  const getScoreColor = (score) => {
    if (score >= 75) return "text-emerald-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {test.title}
            </h3>
            <StatusBadge status={test.status} size="sm" />
          </div>
          <p className="text-xs text-gray-500 truncate">{test.id} · {test.subject} · Class {test.class}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{test.description}</p>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Questions</p>
          <p className="text-sm font-bold text-gray-900">{test.questions}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Duration</p>
          <p className="text-sm font-bold text-gray-900">{test.duration}{test.durationUnit === "min" ? "m" : "h"}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Attempts</p>
          <p className="text-sm font-bold text-gray-900">{test.attempts}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Avg.</p>
          <p className={`text-sm font-bold ${getScoreColor(test.avgScore)}`}>{test.avgScore}%</p>
        </div>
      </div>

      {/* Marks range */}
      {test.highestScore && (
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
          <span>Highest: <span className="font-semibold text-gray-700">{test.highestScore}</span></span>
          <span>Lowest: <span className="font-semibold text-gray-700">{test.lowestScore}</span></span>
          <span>Passing: <span className="font-semibold text-gray-700">{test.passingScore}/{test.maxMarks}</span></span>
        </div>
      )}

      {/* Schedule */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
        <span>📅</span>
        <span>Scheduled: {test.scheduledDate}</span>
        <span className="mx-1">·</span>
        <span>Created: {test.created}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        <button onClick={() => onEdit?.(test)} className="flex-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          Edit
        </button>
        <button onClick={() => onPreview?.(test)} className="flex-1 px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
          Preview
        </button>
        <button onClick={() => onResults?.(test)} className="flex-1 px-3 py-1.5 text-xs font-medium text-violet-600 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors">
          Results
        </button>
      </div>
    </div>
  );
}