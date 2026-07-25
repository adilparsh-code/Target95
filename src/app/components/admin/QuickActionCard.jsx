import Link from "next/link";

export default function QuickActionCard({ title, description, href, icon, color = "blue" }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200",
    indigo: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200",
    emerald: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200",
    amber: "bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200",
    rose: "bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-200",
    violet: "bg-violet-50 text-violet-600 hover:bg-violet-100 border-violet-200",
  };

  const iconBg = {
    blue: "bg-blue-100 text-blue-600",
    indigo: "bg-indigo-100 text-indigo-600",
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
    rose: "bg-rose-100 text-rose-600",
    violet: "bg-violet-100 text-violet-600",
  };

  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 p-4 rounded-lg border ${colorClasses[color]} transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      <div className={`w-10 h-10 rounded-lg ${iconBg[color]} flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-sm text-gray-900 group-hover:text-blue-700 transition-colors">
          {title}
        </p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      <svg className="w-4 h-4 ml-auto shrink-0 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

