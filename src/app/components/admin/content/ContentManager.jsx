"use client";

import { useMemo, useState } from "react";
import Button from "@/app/components/ui/Button";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import EmptyState from "@/app/components/admin/EmptyState";
import Pagination from "@/app/components/admin/Pagination";
import SearchInput from "@/app/components/admin/SearchInput";
import ContentEditor from "./ContentEditor";
import useContentManager from "@/app/hooks/useContentManager";

const entities = ["subjects", "chapters", "topics", "questions"];
const labels = { subjects: "Subjects", chapters: "Chapters", topics: "Topics", questions: "Questions" };
const PAGE_SIZE = 10;
const displayName = (entity, item) => entity === "questions" ? item.title : item.name;

export default function ContentManager() {
  const [entity, setEntity] = useState("subjects");
  const { items, loading, error, save, remove, refresh } = useContentManager(entity);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...items].filter((item) => !query || [displayName(entity, item), item.subject, item.chapter, item.topic, item.board, item.type, ...(item.tags || [])].filter(Boolean).join(" ").toLowerCase().includes(query)).filter((item) => status === "all" || item.status === status).sort((left, right) => sort === "name" ? displayName(entity, left).localeCompare(displayName(entity, right)) : sort === "oldest" ? String(left.createdAt || "").localeCompare(String(right.createdAt || "")) : String(right.updatedAt || right.createdAt || "").localeCompare(String(left.updatedAt || left.createdAt || "")));
  }, [entity, items, search, status, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const changeEntity = (next) => { setEntity(next); setSearch(""); setStatus("all"); setPage(0); };
  const openCreate = () => { setEditing(null); setEditorOpen(true); };

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Content management</p><h1 className="mt-1 text-3xl font-bold text-gray-900">Learning CMS</h1><p className="mt-2 text-sm text-gray-600">Manage published and draft curriculum content from one secure workspace.</p></div><Button onClick={openCreate}>+ Add {labels[entity].slice(0, -1)}</Button></div>
    <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">{entities.map((item) => <button key={item} type="button" onClick={() => changeEntity(item)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${entity === item ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{labels[item]}</button>)}</div>
    <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]"><SearchInput placeholder={`Search ${labels[entity].toLowerCase()}...`} value={search} onChange={(value) => { setSearch(value); setPage(0); }} onClear={() => setSearch("")} /><select value={status} onChange={(event) => { setStatus(event.target.value); setPage(0); }} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"><option value="all">All statuses</option><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select><select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"><option value="newest">Recently updated</option><option value="oldest">Oldest first</option><option value="name">Name A–Z</option></select></div>
    {loading ? <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">Loading {labels[entity].toLowerCase()}...</div> : error ? <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800"><p>{error}</p><Button className="mt-3" variant="outline" onClick={refresh}>Try again</Button></div> : pageItems.length === 0 ? <div className="rounded-2xl border border-gray-200 bg-white"><EmptyState icon="📚" title={`No ${labels[entity].toLowerCase()} found`} description="Create the first item or adjust the search and filters." action={<Button onClick={openCreate}>Add {labels[entity].slice(0, -1)}</Button>} /></div> : <div className="space-y-3">{pageItems.map((item) => <article key={item.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><div className="flex flex-wrap gap-2"><h2 className="text-lg font-bold text-gray-900">{displayName(entity, item)}</h2><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === "published" ? "bg-green-100 text-green-800" : item.status === "archived" ? "bg-gray-100 text-gray-700" : "bg-amber-100 text-amber-800"}`}>{item.status || "draft"}</span>{item.type && <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">{item.type}</span>}</div><p className="mt-2 text-sm text-gray-600">{[item.subject, item.chapter, item.topic, item.board, item.difficulty, item.marks ? `${item.marks} marks` : null, item.estimatedTime ? `${item.estimatedTime} min` : null].filter(Boolean).join(" · ")}</p>{item.description && <p className="mt-2 text-sm leading-6 text-gray-700">{item.description}</p>}{item.statement && <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-700">{item.statement}</p>}</div><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => { setEditing(item); setEditorOpen(true); }}>Edit</Button><Button variant="outline" size="sm" onClick={() => setConfirmDelete(item)}>Delete</Button></div></div></article>)}</div>}
    <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
    <ContentEditor entity={entity} item={editing} isOpen={editorOpen} onClose={() => { setEditorOpen(false); setEditing(null); }} onSave={async (item) => { await save(item); setPage(0); }} />
    <ConfirmDialog isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} onConfirm={async () => { await remove(confirmDelete.id); setConfirmDelete(null); }} title={`Delete ${labels[entity].slice(0, -1)}`} message={`Delete "${confirmDelete ? displayName(entity, confirmDelete) : ""}"? This cannot be undone.`} confirmLabel="Delete" variant="danger" />
  </div>;
}
