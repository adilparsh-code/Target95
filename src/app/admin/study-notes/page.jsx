"use client";

import AdminCard from "@/app/components/admin/AdminCard";
import SectionTitle from "@/app/components/admin/SectionTitle";
import EmptyState from "@/app/components/admin/EmptyState";

/**
 * Study notes are not persisted yet — no notes data layer exists, so this
 * section intentionally shows an empty state instead of fabricated demo notes.
 */
export default function AdminStudyNotesPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Study Notes" subtitle="Manage study materials and resources" />
      <AdminCard>
        <EmptyState
          icon="📝"
          title="Study notes storage is not connected yet"
          description="Notes management will appear here once a study-notes data layer is connected. No note data exists yet, so nothing is shown."
        />
      </AdminCard>
    </div>
  );
}
