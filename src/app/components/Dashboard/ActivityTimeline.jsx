"use client";

/**
 * ActivityTimeline — Recent activity timeline component.
 * @param {Array} activities - Array of { id, type, title, subject, time, score? }
 */

const typeConfig = {
  completed: { icon: "✅", color: "text-green-600 bg-green-50" },
  bookmarked: { icon: "🔖", color: "text-yellow-600 bg-yellow-50" },
  test: { icon: "📝", color: "text-blue-600 bg-blue-50" },
  started: { icon: "🚀", color: "text-purple-600 bg-purple-50" },
};

export default function ActivityTimeline({ activities = [] }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">🕐 Recent Activity</h3>
      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-slate-50 p-6 text-center text-sm text-gray-700">
          Start practicing to build your activity feed.
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const config = typeConfig[activity.type] || typeConfig.completed;
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-slate-50 p-3"
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm ${config.color}`}>
                  {config.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <span className="whitespace-nowrap text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-700">{activity.subject}</span>
                    {activity.score && (
                      <span className="text-xs font-semibold text-blue-600">{activity.score}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}