export default function KpiCard({ title, value, subtitle, icon, trend, trendUp = true, color = "blue" }) {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    indigo: "from-indigo-500 to-indigo-600",
    emerald: "from-emerald-500 to-emerald-600",
    amber: "from-amber-500 to-amber-600",
    rose: "from-rose-500 to-rose-600",
    violet: "from-violet-500 to-violet-600",
    cyan: "from-cyan-500 to-cyan-600",
    orange: "from-orange-500 to-orange-600",
    teal: "from-teal-500 to-teal-600",
  };

  const bgMap = {
    blue: "bg-blue-50",
    indigo: "bg-indigo-50",
    emerald: "bg-emerald-50",
    amber: "bg-amber-50",
    rose: "bg-rose-50",
    violet: "bg-violet-50",
    cyan: "bg-cyan-50",
    orange: "bg-orange-50",
    teal: "bg-teal-50",
  };

  const textMap = {
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    rose: "text-rose-600",
    violet: "text-violet-600",
    cyan: "text-cyan-600",
    orange: "text-orange-600",
    teal: "text-teal-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{typeof value === "number" ? value.toLocaleString() : value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${bgMap[color] || bgMap.blue} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
          <span className={textMap[color] || textMap.blue}>{icon}</span>
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          <span className={trendUp ? "text-emerald-600" : "text-red-500"}>
            {trendUp ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
          <span className="text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );
}