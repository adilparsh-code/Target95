import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";
import { placeholderTeachers } from "@/app/data/admin/mockTeachers";
import TeacherProfileClient from "./TeacherProfileClient";

export async function generateStaticParams() {
  return placeholderTeachers.map((t) => ({ id: String(t.id) }));
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "performance", label: "Performance" },
  { id: "students", label: "Students" },
  { id: "activity", label: "Activity" },
];

export default async function TeacherProfilePage({ params }) {
  const { id } = await params;
  const teacher = placeholderTeachers.find((t) => t.id === id);

  if (!teacher) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <AdminCard>
          <EmptyState icon="👩‍🏫" title="Teacher not found" description="The teacher you're looking for doesn't exist." />
        </AdminCard>
      </div>
    );
  }

  return <TeacherProfileClient teacher={teacher} tabs={tabs} />;
}