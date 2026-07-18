import StatusBadge from "../StatusBadge";

export default function StudentCard({ student, onViewProfile }) {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    return "text-rose-600";
  };

  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
      {/* Header with avatar */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {getInitials(student.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors cursor-pointer"
              onClick={() => onViewProfile?.(student)}
            >
              {student.name}
            </h3>
            <StatusBadge status={student.status} size="sm" />
          </div>
          <p className="text-xs text-gray-500 truncate">{student.email}</p>
          <p className="text-xs text-gray-400 truncate">{student.school} · {student.city}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Class</p>
          <p className="text-sm font-bold text-gray-900">{student.class} · {student.grade}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Solved</p>
          <p className="text-sm font-bold text-gray-900">{student.questionsSolved}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Avg.</p>
          <p className={`text-sm font-bold ${getScoreColor(student.avgScore)}`}>{student.avgScore}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Tests</p>
          <p className="text-sm font-bold text-gray-900">{student.testsAttempted}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Attendance</p>
          <p className="text-sm font-bold text-gray-900">{student.attendance}%</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <span>📅 Joined {student.joined}</span>
        <span>🕐 {student.lastActive === new Date().toISOString().split("T")[0] ? "Today" : student.lastActive}</span>
      </div>

      {/* Actions */}
      <button
        onClick={() => onViewProfile?.(student)}
        className="w-full px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        View Profile
      </button>
    </div>
  );
}