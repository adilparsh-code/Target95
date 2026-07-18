"use client";

import { useState, useMemo } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";
import { StatsCardSkeleton, CardGridSkeleton } from "@/app/components/admin/LoadingSkeleton";
import { mockTestStats, placeholderMockTests } from "@/app/data/admin/mockMockTests";
import StatisticsGrid from "@/app/components/admin/mock-tests/StatisticsGrid";
import MockTestCard from "@/app/components/admin/mock-tests/MockTestCard";
import TestTable from "@/app/components/admin/mock-tests/TestTable";
import TestToolbar from "@/app/components/admin/mock-tests/TestToolbar";

export default function AdminMockTestsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ subject: "", class: "", status: "" });
  const [isLoading, setIsLoading] = useState(false);

  const filteredTests = useMemo(() => {
    return placeholderMockTests.filter((test) => {
      if (filters.subject && test.subject !== filters.subject) return false;
      if (filters.class && test.class !== filters.class) return false;
      if (filters.status && test.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const handleEdit = (test) => console.log("Edit test:", test.id);
  const handlePreview = (test) => console.log("Preview test:", test.id);
  const handleResults = (test) => console.log("Results for test:", test.id);
  const handleAddNew = () => console.log("Create new test");

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
        <SectionTitle title="Mock Tests" subtitle="Create and manage practice tests" />
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
                <MockTestCard
                  key={test.id}
                  test={test}
                  onEdit={handleEdit}
                  onPreview={handlePreview}
                  onResults={handleResults}
                />
              ))}
            </div>
          ) : (
            <TestTable
              tests={filteredTests}
              onEdit={handleEdit}
              onPreview={handlePreview}
              onResults={handleResults}
            />
          )}
        </div>
      </div>
    </div>
  );
}