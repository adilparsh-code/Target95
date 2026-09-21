import Link from "next/link";
import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";

/**
 * Teacher accounts are not provisioned yet — no teacher data layer exists, so
 * every /admin/teachers/[id] route renders an honest empty state instead of
 * fabricated demo profiles.
 */
export default async function TeacherProfilePage({ params }) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <AdminCard>
        <EmptyState
          icon="👩‍🏫"
          title="Teacher profiles are not available yet"
          description={`Teacher accounts are not provisioned in the platform yet, so there is no profile to show for "${id}".`}
          action={
            <Link
              href="/admin/students"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Students
            </Link>
          }
        />
      </AdminCard>
    </div>
  );
}
