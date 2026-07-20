import DashboardCard from "../DashboardCard";

export default function TeacherStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard title="Total Teachers" value={stats.totalTeachers} icon="👩‍🏫" color="cyan" />
      <DashboardCard title="Active Teachers" value={stats.activeTeachers} icon="✅" color="emerald" />
      <DashboardCard title="Total Students" value={stats.totalStudents} icon="👨‍🎓" color="violet" />
      <DashboardCard title="Avg. Experience" value={`${stats.averageExperience}y`} icon="📅" color="amber" />
    </div>
  );
}