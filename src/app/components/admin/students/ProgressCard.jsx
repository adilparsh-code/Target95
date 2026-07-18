export default function ProgressCard({ title, value, maxValue, color = "blue", subtitle, icon }) {
  const percentage = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;

  const colorMap = {
    blue: { bar: "bg-blue-500", bg: "bg-blue-50", text: "text-blue-600" },
    emerald: { bar: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600" },
    amber: { bar: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-600" },
    violet: { bar: "bg-violet-500", bg: "bg-violet-50", text: "text-violet-600" },
    rose: { bar: "bg-rose-500", bg: "bg-rose-50", text: "text-rose-600" },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {value}
            {maxValue && <span className="text-sm font-normal text-gray-400">/{maxValue}</span>}
          </p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center text-lg`}>
            {icon}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={maxValue}
          aria-label={`${title}: ${value} out of ${maxValue}`}
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className={`text-xs font-medium ${colors.text}`}>{percentage}%</span>
        {maxValue && <span className="text-xs text-gray-400">Remaining: {maxValue - value}</span>}
      </div>
    </div>
  );
}