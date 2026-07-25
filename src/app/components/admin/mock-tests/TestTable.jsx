"use client";

import { useState, useMemo } from "react";
import SearchBox from "../SearchBox";
import StatusBadge from "../StatusBadge";

function SortHeader({ label, sortKey: sk, activeSortKey, sortDir, onSort }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-gray-700" onClick={() => onSort(sk)}>
      <span className="inline-flex items-center gap-1">
        {label}
        {activeSortKey === sk && <span className="text-blue-500">{sortDir === "asc" ? "↑" : "↓"}</span>}
      </span>
    </th>
  );
}

export default function TestTable({ tests = [], onEdit, onPreview, onResults, pageSize = 10 }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!search.trim()) return tests;
    const q = search.toLowerCase();
    return tests.filter((t) =>
      [t.title, t.id, t.subject, t.class, t.status].some((v) => v?.toLowerCase().includes(q))
    );
  }, [tests, search]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey] ?? "";
      const bVal = b[sortKey] ?? "";
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const paged = sorted.slice(safePage * pageSize, (safePage + 1) * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  };

  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <SearchBox placeholder="Search tests by title, subject, class..." value={search} onChange={(v) => { setSearch(v); setPage(0); }} onClear={() => { setSearch(""); setPage(0); }} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <SortHeader label="ID" sortKey="id" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortHeader label="Title" sortKey="title" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</th>
              <SortHeader label="Questions" sortKey="questions" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortHeader label="Duration" sortKey="duration" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortHeader label="Attempts" sortKey="attempts" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortHeader label="Avg. Score" sortKey="avgScore" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortHeader label="Status" sortKey="status" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paged.length === 0 ? (
              <tr><td colSpan={10} className="px-4 py-12 text-center text-gray-400">No tests found.</td></tr>
            ) : (
              paged.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{test.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{test.title}</td>
                  <td className="px-4 py-3 text-gray-600">{test.subject}</td>
                  <td className="px-4 py-3 text-gray-600">Class {test.class}</td>
                  <td className="px-4 py-3 text-gray-600">{test.questions}</td>
                  <td className="px-4 py-3 text-gray-600">{test.duration}{test.durationUnit === "min" ? "m" : "h"}</td>
                  <td className="px-4 py-3 text-gray-600">{test.attempts}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${test.avgScore >= 75 ? "text-emerald-600" : test.avgScore >= 60 ? "text-blue-600" : test.avgScore >= 40 ? "text-amber-600" : "text-rose-600"}`}>
                      {test.avgScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={test.status} size="sm" /></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onEdit?.(test)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" aria-label={`Edit ${test.title}`}>✏️</button>
                      <button onClick={() => onPreview?.(test)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" aria-label={`Preview ${test.title}`}>👁</button>
                      <button onClick={() => onResults?.(test)} className="p-1.5 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors" aria-label={`Results for ${test.title}`}>📊</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Showing {safePage * pageSize + 1}–{Math.min((safePage + 1) * pageSize, sorted.length)} of {sorted.length}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={safePage === 0} className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Previous</button>
            <span className="px-2 font-medium text-gray-700">{safePage + 1} / {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={safePage >= totalPages - 1} className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}