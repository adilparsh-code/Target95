"use client";

import { useState, useMemo } from "react";
import SearchBox from "../SearchBox";
import StatusBadge from "../StatusBadge";

function SortHeader({ label, sortKey: sk, activeSortKey, sortDir, onSort }) {
  return (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-gray-700"
      onClick={() => onSort(sk)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {activeSortKey === sk && <span className="text-blue-500">{sortDir === "asc" ? "↑" : "↓"}</span>}
      </span>
    </th>
  );
}

export default function TeacherTable({ teachers = [], onViewProfile, pageSize = 10 }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!search.trim()) return teachers;
    const q = search.toLowerCase();
    return teachers.filter((t) =>
      [t.name, t.email, t.id, t.specialization, t.school, t.city, ...t.subjects].some((v) =>
        v?.toLowerCase().includes(q)
      )
    );
  }, [teachers, search]);

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

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <SearchBox
          placeholder="Search by name, email, subject, school..."
          value={search}
          onChange={(v) => { setSearch(v); setPage(0); }}
          onClear={() => { setSearch(""); setPage(0); }}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <SortHeader label="ID" sortKey="id" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortHeader label="Name" sortKey="name" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subjects</th>
              <SortHeader label="Students" sortKey="students" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortHeader label="Avg. Score" sortKey="avgScore" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortHeader label="Experience" sortKey="experience" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortHeader label="Status" sortKey="status" activeSortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-gray-400">No teachers found.</td>
              </tr>
            ) : (
              paged.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{teacher.id}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onViewProfile?.(teacher)}
                      className="font-medium text-gray-900 hover:text-blue-600 transition-colors text-left"
                    >
                      {teacher.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{teacher.email}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{teacher.students}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${getScoreColor(teacher.avgScore)}`}>{teacher.avgScore}%</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{teacher.experience}y</td>
                  <td className="px-4 py-3"><StatusBadge status={teacher.status} size="sm" /></td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onViewProfile?.(teacher)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      aria-label={`View ${teacher.name} profile`}
                    >
                      👁
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Showing {safePage * pageSize + 1}–{Math.min((safePage + 1) * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="px-2 font-medium text-gray-700">{safePage + 1} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={safePage >= totalPages - 1}
              className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}