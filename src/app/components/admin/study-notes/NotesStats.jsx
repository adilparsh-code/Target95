import DashboardCard from "../DashboardCard";

export default function NotesStats({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <DashboardCard title="Total Notes" value={stats.totalNotes} icon="📝" color="emerald" />
      <DashboardCard title="PDF Notes" value={stats.totalPDFs} icon="📄" color="rose" />
      <DashboardCard title="Videos" value={stats.totalVideos} icon="🎥" color="blue" />
      <DashboardCard title="Published" value={stats.publishedCount} icon="✅" color="emerald" />
      <DashboardCard title="Total Views" value={stats.totalViews} icon="👁" color="violet" />
      <DashboardCard title="Downloads" value={stats.totalDownloads} icon="📥" color="amber" />
    </div>
  );
}