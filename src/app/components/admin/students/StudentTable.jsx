"use client";

import { useState, useMemo } from "react";
import SearchBox from "../SearchBox";
import StatusBadge from "../StatusBadge";

export default function StudentTable({ students = [], onViewProfile, pageSize = 10 }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!search.trim()) return students;
    const q = search.toLowerCase();
    return students.filter((s) =>
      [s.name, s.email, s.id, s.class, s.school, s.city].some((v) => v?.toLowerCase().includes(q))
    );
  }, [students, search]);

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

  const SortHeader = ({ label, sortKey: sk }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-gray-700" onClick={() => handleSort(sk)}>
      <span className="inline-flex items-center gap-1">
        {label}
        {sortKey === sk && <span className="text-blue-500">{sortDir === "asc" ? "↑" : "↓"}</span>}
      </span>
    </th>
  );

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <SearchBox placeholder="Search by name, email, class, school..." value={search} onChange={(v) => { setSearch(v); setPage(0); }} onClear={() => { setSearch(""); setPage(0); }} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <SortHeader label="ID" sortKey="id" />
              <SortHeader label="Name" sortKey="name" />
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <SortHeader label="Class" sortKey="class" />
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">School</th>
              <SortHeader label="Solved" sortKey="questionsSolved" />
              <SortHeader label="Avg. Score" sortKey="avgScore" />
              <SortHeader label="Attendance" sortKey="attendance" />
              <SortHeader label="Status" sortKey="status" />
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paged.length === 0 ? (
              <tr><td colSpan={11} className="px-4 py-12 text-center text-gray-400">No students found.</td></tr>
            ) : (
              paged.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{student.id}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => onViewProfile?.(student)} className="font-medium text-gray-900 hover:text-blue-600 transition-colors text-left">
                      {student.name}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{student.email}</td>
                  <td className="px-4 py-3 text-gray-600">{student.class}</td>
                  <td className="px-4 py-3 text-gray-600">{student.grade}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-[150px] truncate">{student.school}</td>
                  <td className="px-4 py-3 text-gray-600">{student.questionsSolved}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${getScoreColor(student.avgScore)}`}>{student.avgScore}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${student.attendance >= 80 ? "text-emerald-600" : student.attendance >= 60 ? "text-blue-600" : student.attendance >= 40 ? "text-amber-600" : "text-rose-600"}`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={student.status} size="sm" /></td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => onViewProfile?.(student)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" aria-label={`View ${student.name} profile`}>
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