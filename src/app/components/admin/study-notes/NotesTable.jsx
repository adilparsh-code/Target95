"use client";

import { useState, useMemo } from "react";
import SearchBox from "../SearchBox";
import NotesStatusBadge from "./NotesStatusBadge";

export default function NotesTable({ notes = [], onPreview, onEdit, onDelete, pageSize = 10 }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!search.trim()) return notes;
    const q = search.toLowerCase();
    return notes.filter((n) =>
      [n.title, n.chapter, n.subject, n.type, n.class, n.id].some((v) =>
        v?.toLowerCase().includes(q)
      )
    );
  }, [notes, search]);

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
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-gray-700"
      onClick={() => handleSort(sk)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sortKey === sk && (
          <span className="text-blue-500">{sortDir === "asc" ? "↑" : "↓"}</span>
        )}
      </span>
    </th>
  );

  const typeColors = {
    PDF: "bg-rose-50 text-rose-600",
    Video: "bg-blue-50 text-blue-600",
    Document: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="space-y-4">
      <div className="max-w-sm">
        <SearchBox
          placeholder="Search by title, chapter, type..."
          value={search}
          onChange={(v) => { setSearch(v); setPage(0); }}
          onClear={() => { setSearch(""); setPage(0); }}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <SortHeader label="ID" sortKey="id" />
              <SortHeader label="Title" sortKey="title" />
              <SortHeader label="Chapter" sortKey="chapter" />
              <SortHeader label="Subject" sortKey="subject" />
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</th>
              <SortHeader label="Status" sortKey="status" />
              <SortHeader label="Views" sortKey="views" />
              <SortHeader label="Uploaded" sortKey="uploaded" />
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center text-gray-400">No notes found.</td>
              </tr>
            ) : (
              paged.map((note) => (
                <tr key={note.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{note.id}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onPreview?.(note)}
                      className="font-medium text-gray-900 hover:text-blue-600 transition-colors text-left"
                    >
                      {note.title}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{note.chapter}</td>
                  <td className="px-4 py-3 text-gray-600">{note.subject}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${typeColors[note.type] || "bg-gray-50 text-gray-600"}`}>
                      {note.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">Class {note.class}</td>
                  <td className="px-4 py-3"><NotesStatusBadge status={note.status} size="sm" /></td>
                  <td className="px-4 py-3 text-gray-600">{note.views}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{note.uploaded}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onPreview?.(note)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" aria-label={`Preview ${note.title}`}>
                        👁
                      </button>
                      <button onClick={() => onEdit?.(note)} className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" aria-label={`Edit ${note.title}`}>
                        ✏️
                      </button>
                      <button onClick={() => onDelete?.(note)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" aria-label={`Delete ${note.title}`}>
                        🗑
                      </button>
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