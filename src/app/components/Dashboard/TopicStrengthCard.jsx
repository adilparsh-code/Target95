"use client";

export default function TopicStrengthCard({ topics, type, className = "" }) {
  const isWeak = type === "weak";
  const headerColor = isWeak ? "text-orange-700" : "text-emerald-700";
  const borderColor = isWeak ? "border-orange-200" : "border-emerald-200";
  const bgColor = isWeak ? "bg-orange-50" : "bg-emerald-50";
  const progressColor = isWeak ? "bg-orange-500" : "bg-emerald-500";
  const progressBg = isWeak ? "bg-orange-100" : "bg-emerald-100";

  return (
    <div className={`rounded-2xl border ${borderColor} ${bgColor} p-5 ${className}`}>
      <h3 className={`font-semibold ${headerColor} mb-4`}>
        {isWeak ? "⚠️ Weak Topics" : "💪 Strong Topics"}
      </h3>
      <div className="space-y-4">
        {topics.map((topic) => (
          <div key={topic.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">{topic.title}</span>
              <span className="text-xs font-medium text-gray-600">{topic.accuracy}%</span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${progressBg}`}>
              <div
                className={`h-full rounded-full ${progressColor} transition-all duration-500`}
                style={{ width: `${topic.accuracy}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">{topic.subject} • {topic.questionsAttempted} attempts</p>
          </div>
        ))}
      </div>
    </div>
  );
}