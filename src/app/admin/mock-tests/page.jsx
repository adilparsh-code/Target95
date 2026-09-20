"use client";

import { useEffect, useMemo, useState } from "react";
import SectionTitle from "@/app/components/admin/SectionTitle";
import AdminCard from "@/app/components/admin/AdminCard";
import EmptyState from "@/app/components/admin/EmptyState";
import Modal from "@/app/components/ui/Modal";
import Button from "@/app/components/ui/Button";
import { StatsGridSkeleton } from "@/app/components/ui/LoadingSkeleton";
import StatisticsGrid from "@/app/components/admin/mock-tests/StatisticsGrid";
import MockTestCard from "@/app/components/admin/mock-tests/MockTestCard";
import TestTable from "@/app/components/admin/mock-tests/TestTable";
import TestToolbar from "@/app/components/admin/mock-tests/TestToolbar";
import TestForm from "@/app/components/admin/mock-tests/TestForm";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import SearchInput from "@/app/components/admin/SearchInput";
import useAdminData from "@/app/hooks/useAdminData";
import { saveContent, deleteContent } from "@/app/services/ContentService";

function formatDateTime(ms) {
  if (!ms) return "—";
  return new Date(ms).toLocaleString();
}

function TestDetailModal({ testId, onClose }) {
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`/api/admin/mock-tests/${testId}`, { cache: "no-store", signal: controller.signal });
        const payload = await res.json().catch(() => null);
        if (!res.ok || !payload?.success) {
          throw new Error(payload?.error || "Unable to load test details.");
        }
        if (!cancelled) setDetail(payload);
      } catch (err) {
        if (!cancelled && err?.name !== "AbortError") setError(err.message || "Unable to load test details.");
      }
    })();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [testId]);

  const test = detail?.test;

  return (
    <Modal isOpen onClose={onClose} title={test ? test.title : "Mock test details"} size="2xl">
      {error ? (
        <p className="py-6 text-center text-sm text-red-600">{error}</p>
      ) : !detail ? (
        <div className="space-y-3 py-2" aria-label="Loading test details">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="max-h-[70vh] space-y-6 overflow-y-auto pr-1">
          {/* Blueprint */}
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Test blueprint</h3>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              {[
                ["Board", test.board],
                ["Class", test.class ? `Class ${test.class}` : "—"],
                ["Subject", test.subject],
                ["Questions", test.questionCount ?? "—"],
                ["Duration", test.duration ? `${test.duration} min` : "—"],
                ["Max marks", test.maxMarks ?? "—"],
                ["Passing marks", test.passingScore ?? 0],
                ["Difficulty", test.difficulty || "all"],
                ["Question type", test.type || "mixed"],
                ["Status", test.status],
                ["Scheduled", test.scheduledDate || "Not scheduled"],
                ["Updated", formatDateTime(test.updatedAt)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                  <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</dt>
                  <dd className="mt-0.5 font-semibold capitalize text-gray-800">{String(value ?? "—")}</dd>
                </div>
              ))}
            </dl>
            {test.instructions && (
              <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Student instructions</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-blue-900">{test.instructions}</p>
              </div>
            )}
          </section>

          {/* Attempts */}
          <section>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Attempts</h3>
              <div className="flex gap-4 text-xs text-gray-600">
                <span>Total: <strong>{detail.stats.attempts}</strong></span>
                <span>Average: <strong>{detail.stats.averageScore}%</strong></span>
                <span>Best: <strong>{detail.stats.bestScore}%</strong></span>
              </div>
            </div>
            {detail.attempts.length === 0 ? (
              <p className="mt-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                No student attempts recorded for this test yet.
              </p>
            ) : (
              <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Student</th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Score</th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Correct</th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Time</th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {detail.attempts.slice(0, 20).map((attempt) => (
                      <tr key={attempt.id}>
                        <td className="px-4 py-2 font-mono text-xs text-gray-500">{attempt.userId ? `${attempt.userId.slice(0, 8)}…` : "—"}</td>
                        <td className="px-4 py-2 font-semibold text-gray-800">{attempt.percentage}%</td>
                        <td className="px-4 py-2 text-gray-600">{attempt.correctCount}/{attempt.totalQuestions}</td>
                        <td className="px-4 py-2 text-gray-600">{attempt.timeTaken ? `${Math.round(attempt.timeTaken / 60)} min` : "—"}</td>
                        <td className="px-4 py-2 text-gray-600">{formatDateTime(attempt.completedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}
    </Modal>
  );
}

export default function AdminMockTestsPage() {
  const { data, loading, error, refresh } = useAdminData("/api/admin/mock-tests");
  const tests = useMemo(() => data?.tests || [], [data]);
  const stats = useMemo(
    () => data?.stats || { totalTests: 0, totalAttempts: 0, publishedCount: 0, draftCount: 0, averageScore: 0 },
    [data]
  );

  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ class: "", status: "", board: "" });
  const [formOpen, setFormOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [detailTestId, setDetailTestId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const flashSuccess = (message) => {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(null), 2500);
  };

  const filteredTests = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tests.filter((test) => {
      if (filters.class && String(test.class) !== filters.class) return false;
      if (filters.status && String(test.status) !== filters.status) return false;
      if (q && !`${test.title} ${test.description} ${test.subject} ${test.board}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [tests, search, filters]);

  const handleSave = async (test) => {
    setActionError(null);
    try {
      await saveContent("mockTests", test);
      setFormOpen(false);
      setEditingTest(null);
      refresh();
      flashSuccess(editingTest ? "Mock test updated." : "Mock test created.");
    } catch (err) {
      setActionError(err.message || "Unable to save the mock test.");
      throw err;
    }
  };

  const handleTogglePublish = (test) => {
    const nextStatus = test.status === "published" ? "draft" : "published";
    setActionError(null);
    (async () => {
      try {
        await saveContent("mockTests", { ...test, status: nextStatus });
        refresh();
        flashSuccess(nextStatus === "published" ? "Test published." : "Test unpublished.");
      } catch (err) {
        setActionError(err.message || "Unable to update the test.");
      }
    })();
  };

  const handleDelete = (test) => {
    setConfirmDialog({
      title: "Delete Mock Test",
      message: `Permanently delete "${test.title}"? This cannot be undone.`,
      confirmLabel: "Delete",
      variant: "danger",
      onConfirm: async () => {
        setConfirmDialog(null);
        setActionError(null);
        try {
          await deleteContent("mockTests", test.id);
          refresh();
          flashSuccess("Mock test deleted.");
        } catch (err) {
          setActionError(err.message || "Unable to delete the test.");
        }
      },
    });
  };

  const handleAddNew = () => {
    setEditingTest(null);
    setFormOpen(true);
  };

  const showSkeleton = loading && tests.length === 0;

  return (
    <div className="space-y-6">
      {showSkeleton ? (
        <StatsGridSkeleton count={4} />
      ) : (
        <StatisticsGrid stats={stats} />
      )}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <SectionTitle
          title="Mock Tests"
          subtitle={`${filteredTests.length} of ${tests.length} tests · ${stats.publishedCount} published`}
        />
        <div className="flex rounded-lg border border-gray-200 overflow-hidden" role="group" aria-label="View mode">
          {["grid", "table"].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                viewMode === mode ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
              aria-pressed={viewMode === mode}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <AdminCard>
          <EmptyState
            type="mocktests"
            title="Couldn't load mock tests"
            description={error}
            primaryAction={refresh}
            primaryActionLabel="Retry"
          />
        </AdminCard>
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-md">
              <SearchInput
                placeholder="Search tests by title, description…"
                value={search}
                onChange={setSearch}
                onClear={() => setSearch("")}
              />
            </div>
            <TestToolbar
              onAddNew={handleAddNew}
              onToggleFilters={() => setShowFilters((prev) => !prev)}
              showFilters={showFilters}
            />
          </div>

          {showFilters && (
            <AdminCard>
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Class</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[["", "All"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"]].map(([value, label]) => (
                      <button
                        key={value || "all"}
                        type="button"
                        onClick={() => setFilters((p) => ({ ...p, class: value }))}
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          filters.class === value ? "bg-blue-50 font-medium text-blue-700 ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50"
                        }`}
                        aria-pressed={filters.class === value}
                      >
                        {label === "All" ? "All" : `Class ${label}`}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[["", "All"], ["published", "Published"], ["draft", "Draft"], ["archived", "Archived"]].map(([value, label]) => (
                      <button
                        key={value || "all"}
                        type="button"
                        onClick={() => setFilters((p) => ({ ...p, status: value }))}
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          filters.status === value ? "bg-blue-50 font-medium text-blue-700 ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50"
                        }`}
                        aria-pressed={filters.status === value}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Board</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[["", "All"], ["ICSE", "ICSE"], ["ISC", "ISC"], ["CBSE", "CBSE"]].map(([value, label]) => (
                      <button
                        key={value || "all"}
                        type="button"
                        onClick={() => setFilters((p) => ({ ...p, board: value }))}
                        className={`rounded-lg px-3 py-1.5 text-sm ${
                          (filters.board || "") === value ? "bg-blue-50 font-medium text-blue-700 ring-1 ring-blue-200" : "text-gray-600 hover:bg-gray-50"
                        }`}
                        aria-pressed={(filters.board || "") === value}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </AdminCard>
          )}

          {(actionError || successMessage) && (
            <div
              role="status"
              className={`rounded-xl border px-4 py-3 text-sm ${
                actionError ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {actionError || successMessage}
            </div>
          )}

          <div className="flex gap-6">
            <div className="min-w-0 flex-1">
              {!showSkeleton && filteredTests.length === 0 ? (
                <AdminCard>
                  <EmptyState
                    type="mocktests"
                    title="No tests found"
                    description={
                      search || filters.class || filters.status || filters.board
                        ? "Try adjusting your search or filters."
                        : "Create your first mock test to get started."
                    }
                    primaryAction={handleAddNew}
                    primaryActionLabel="Create Test"
                  />
                </AdminCard>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {filteredTests.map((test) => (
                    <MockTestCard
                      key={test.id}
                      test={test}
                      onEdit={(t) => {
                        setEditingTest(t);
                        setFormOpen(true);
                      }}
                      onPreview={(t) => setDetailTestId(t.id)}
                      onResults={(t) => setDetailTestId(t.id)}
                      onTogglePublish={handleTogglePublish}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <TestTable
                  tests={filteredTests}
                  onEdit={(t) => {
                    setEditingTest(t);
                    setFormOpen(true);
                  }}
                  onPreview={(t) => setDetailTestId(t.id)}
                  onResults={(t) => setDetailTestId(t.id)}
                  onTogglePublish={handleTogglePublish}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </>
      )}

      <TestForm
        key={formOpen ? `open-${editingTest?.id ?? "new"}` : "closed"}
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingTest(null);
        }}
        onSave={handleSave}
        test={editingTest}
      />

      {detailTestId && <TestDetailModal testId={detailTestId} onClose={() => setDetailTestId(null)} />}

      <ConfirmDialog
        isOpen={Boolean(confirmDialog)}
        onClose={() => setConfirmDialog(null)}
        onConfirm={confirmDialog?.onConfirm}
        title={confirmDialog?.title}
        message={confirmDialog?.message}
        confirmLabel={confirmDialog?.confirmLabel}
        variant={confirmDialog?.variant}
      />
    </div>
  );
}
