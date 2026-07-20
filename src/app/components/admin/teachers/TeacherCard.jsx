import StatusBadge from "../StatusBadge";

export default function TeacherCard({ teacher, onViewProfile }) {
  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
      {/* Header with avatar */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {getInitials(teacher.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors cursor-pointer"
              onClick={() => onViewProfile?.(teacher)}
            >
              {teacher.name}
            </h3>
            <StatusBadge status={teacher.status} size="sm" />
          </div>
          <p className="text-xs text-gray-500 truncate">{teacher.email}</p>
          <p className="text-xs text-gray-400 truncate">{teacher.school} · {teacher.city}</p>
        </div>
      </div>

      {/* Specialization */}
      <p className="text-xs font-medium text-blue-600 mb-3 truncate">{teacher.specialization}</p>

      {/* Subjects */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {teacher.subjects.map((subject) => (
          <span
            key={subject}
            className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-full"
          >
            {subject}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Students</p>
          <p className="text-sm font-bold text-gray-900">{teacher.students}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Classes</p>
          <p className="text-sm font-bold text-gray-900">{teacher.classes}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Avg.</p>
          <p className={`text-sm font-bold ${getScoreColor(teacher.avgScore)}`}>{teacher.avgScore}%</p>
        </div>
      </div>

      {/* Experience & Joined */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <span>💼 {teacher.experience} yrs exp.</span>
        <span>📅 Joined {teacher.joined}</span>
      </div>

      {/* Actions */}
      <button
        onClick={() => onViewProfile?.(teacher)}
        className="w-full px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        View Profile
      </button>
    </div>
  );
}