import StatusBadge from "./StatusBadge";

export default function RecentActivityCard({ activities }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="divide-y divide-gray-100">
        {activities.map((item, index) => (
          <div key={index} className="p-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <StatusBadge status={item.status} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{item.action}</p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{item.detail}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}