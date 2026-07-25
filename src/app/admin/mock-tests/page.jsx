"use client";

import { useState, useMemo } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";
import { StatsCardSkeleton, CardGridSkeleton } from "@/app/components/ui/LoadingSkeleton";
import { mockTestStats, placeholderMockTests } from "@/app/data/admin/mockMockTests";
import StatisticsGrid from "@/app/components/admin/mock-tests/StatisticsGrid";
import MockTestCard from "@/app/components/admin/mock-tests/MockTestCard";
import TestTable from "@/app/components/admin/mock-tests/TestTable";
import TestToolbar from "@/app/components/admin/mock-tests/TestToolbar";
import TestForm from "@/app/components/admin/mock-tests/TestForm";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";

export default function AdminMockTestsPage() {
  const [tests, setTests] = useState(placeholderMockTests);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ subject: "", class: "", status: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      if (filters.subject && test.subject !== filters.subject) return false;
      if (filters.class && test.class !== filters.class) return false;
      if (filters.status && test.status !== filters.status) return false;
      return true;
    });
  }, [tests, filters]);

  const handleSave = (test) => {
    if (editingTest) {
      setTests((prev) => prev.map((t) => (t.id === test.id ? { ...t, ...test } : t)));
    } else {
      setTests((prev) => [test, ...prev]);
    }
    setFormOpen(false);
    setEditingTest(null);
  };

  const handleEdit = (test) => {
    setEditingTest(test);
    setFormOpen(true);
  };

  const handleDelete = (test) => {
    setConfirmDialog({
      title: "Delete Mock Test",
      message: `Are you sure you want to delete "${test.title}"? This will also remove all associated data and results.`,
      confirmLabel: "Delete",
      variant: "danger",
      onConfirm: () => {
        setTests((prev) => prev.filter((t) => t.id !== test.id));
        setConfirmDialog(null);
      },
    });
  };

  const handleTogglePublish = (test) => {
    const newStatus = test.status === "published" ? "draft" : "published";
    setTests((prev) =>
      prev.map((t) =>
        t.id === test.id ? { ...t, status: newStatus } : t
      )
    );
  };

  const handleAddNew = () => {
    setEditingTest(null);
    setFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <StatsCardSkeleton count={4} />
        <CardGridSkeleton count={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <StatisticsGrid stats={mockTestStats} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle
          title="Mock Tests"
          subtitle={`${filteredTests.length} of ${tests.length} tests · ${tests.filter((t) => t.status === "published").length} published`}
        />
      </div>

      {/* Toolbar */}
      <TestToolbar
        onAddNew={handleAddNew}
        onToggleFilters={() => setShowFilters((prev) => !prev)}
        showFilters={showFilters}
      />

      {/* Main content */}
      <div className="flex gap-6">
        {/* Filters sidebar */}
        {showFilters && (
          <div className="w-full lg:w-64 shrink-0">
            <AdminCard>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
                  {Object.values(filters).some(Boolean) && (
                    <button onClick={() => setFilters({ subject: "", class: "", status: "" })} className="text-xs text-blue-600 hover:text-blue-700 font-medium">Clear all</button>
                  )}
                </div>
                {/* Subject filter */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</label>
                  <div className="space-y-1">
                    {["Computer Science", "Physics", "Chemistry", "Mathematics", "Biology"].map((s) => (
                      <button key={s} onClick={() => setFilters((p) => ({ ...p, subject: p.subject === s ? "" : s }))}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${filters.subject === s ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Class filter */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</label>
                  <div className="space-y-1">
                    {["9", "10", "11", "12"].map((c) => (
                      <button key={c} onClick={() => setFilters((p) => ({ ...p, class: p.class === c ? "" : c }))}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${filters.class === c ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50"}`}>
                        Class {c}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Status filter */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</label>
                  <div className="space-y-1">
                    {[["published", "Published"], ["draft", "Draft"], ["pending", "Pending Review"]].map(([val, label]) => (
                      <button key={val} onClick={() => setFilters((p) => ({ ...p, status: p.status === val ? "" : val }))}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors ${filters.status === val ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>
        )}

        {/* Tests content */}
        <div className="flex-1 min-w-0">
          {filteredTests.length === 0 ? (
            <AdminCard>
              <EmptyState
                icon="📋"
                title="No tests found"
                description="Try adjusting your filters or create a new mock test."
                action={
                  <button onClick={handleAddNew} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">+ Create Test</button>
                }
              />
            </AdminCard>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTests.map((test) => (
                <div key={test.id} className="relative group">
                  <MockTestCard
                    test={test}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onPreview={(t) => console.log("Preview test:", t.id)}
                    onResults={(t) => console.log("Results for test:", t.id)}
                    onTogglePublish={handleTogglePublish}
                  />
                  {/* Quick actions overlay */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(test)}
                      className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-amber-600 hover:bg-amber-50 transition-colors"
                      title="Edit test"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button
                      onClick={() => handleTogglePublish(test)}
                      className={`p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 transition-colors ${test.status === "published" ? "text-emerald-600 hover:bg-emerald-50" : "text-gray-600 hover:bg-gray-50"}`}
                      title={test.status === "published" ? "Unpublish" : "Publish"}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                    <button
                      onClick={() => handleDelete(test)}
                      className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete test"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <TestTable
              tests={filteredTests}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPreview={(t) => console.log("Preview test:", t.id)}
              onResults={(t) => console.log("Results for test:", t.id)}
            />
          )}

          {/* Results summary */}
          {filteredTests.length > 0 && (
            <p className="text-xs text-gray-400 text-center mt-4">
              Showing {filteredTests.length} of {tests.length} tests
            </p>
          )}
        </div>
      </div>

      {/* Test Form Modal */}
      <TestForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingTest(null); }}
        onSave={handleSave}
        test={editingTest}
      />

      {/* Confirm Dialog */}
      {confirmDialog && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setConfirmDialog(null)}
          onConfirm={confirmDialog.onConfirm}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmLabel={confirmDialog.confirmLabel}
          variant={confirmDialog.variant}
        />
      )}
    </div>
  );
}