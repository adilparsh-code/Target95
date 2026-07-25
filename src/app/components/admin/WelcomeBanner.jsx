export default function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Welcome back, Admin! 👋</h2>
          <p className="text-blue-100 mt-1 text-sm">
            Here&apos;s what&apos;s happening with Target95 today.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="px-3 py-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
            📅 {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </div>
    </div>
  );
}