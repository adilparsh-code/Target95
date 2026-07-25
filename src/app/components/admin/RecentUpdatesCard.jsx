import AdminCard from "./AdminCard";

const updateTypeStyles = {
  update: {
    badge: "bg-blue-50 text-blue-700",
    label: "📌 Update",
  },
  improvement: {
    badge: "bg-emerald-50 text-emerald-700",
    label: "✨ Improvement",
  },
  announcement: {
    badge: "bg-amber-50 text-amber-700",
    label: "📢 Announcement",
  },
};

export default function RecentUpdatesCard({ updates }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {updates.map((update, index) => {
        const { badge, label } = updateTypeStyles[update.type] || {};
        return (
          <AdminCard key={index}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${badge}`}>
                  {label}
                </span>
                <span className="text-xs text-gray-400">{update.date}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{update.title}</h3>
              <p className="text-xs text-gray-500">{update.description}</p>
            </div>
          </AdminCard>
        );
      })}
    </div>
  );
}