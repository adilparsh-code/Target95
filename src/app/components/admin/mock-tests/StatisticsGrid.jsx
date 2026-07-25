import DashboardCard from "../DashboardCard";

export default function StatisticsGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <DashboardCard title="Total Tests" value={stats.totalTests} icon="📋" color="amber" />
      <DashboardCard title="Total Attempts" value={stats.totalAttempts} icon="👥" color="blue" />
      <DashboardCard title="Active Tests" value={stats.publishedCount} icon="✅" color="emerald" />
      <DashboardCard title="Avg. Score" value={`${stats.averageScore}%`} icon="📊" color="violet" />
    </div>
  );
}