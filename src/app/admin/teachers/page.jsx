"use client";

import Link from "next/link";
import AdminCard from "@/app/components/admin/AdminCard";
import SectionTitle from "@/app/components/admin/SectionTitle";
import EmptyState from "@/app/components/admin/EmptyState";

/**
 * Teacher accounts are not provisioned yet — there is no teacher role in the
 * platform data layer, so this section intentionally shows an empty state
 * instead of fabricated demo accounts.
 */
export default function AdminTeachersPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Teachers" subtitle="Manage teacher accounts and assignments" />
      <AdminCard>
        <EmptyState
          icon="👩‍🏫"
          title="Teacher accounts are not available yet"
          description="Teacher management will appear here once teacher accounts are provisioned in the platform. No teacher data exists yet, so nothing is shown."
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
