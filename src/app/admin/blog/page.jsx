"use client";

import { useEffect, useMemo, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirebaseInstance } from "../../lib/firebase";

const STATUS = ["all", "review", "draft", "published"];

export default function BlogAdminPage() {
  const { auth } = getFirebaseInstance();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("review");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) return;
    return auth.onAuthStateChanged((nextUser) => setUser(nextUser));
  }, [auth]);

  async function api(path, options = {}) {
    if (!user) throw new Error("Please sign in first");
    const token = await user.getIdToken();
    const response = await fetch(path, {
      ...options,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(options.headers || {}) },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Request failed");
    return data;
  }

  async function loadArticles() {
    setBusy(true); setError("");
    try { const data = await api("/api/blog/admin/articles"); setArticles(data.articles || []); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  useEffect(() => {
    if (!user) return;
    const timer = window.setTimeout(() => loadArticles(), 0);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function login(e) {
    e.preventDefault(); setBusy(true); setError("");
    try { await signInWithEmailAndPassword(auth, email, password); setPassword(""); }
    catch (e) { setError(e.message || "Sign-in failed"); }
    finally { setBusy(false); }
  }

  async function save() {
    if (!selected) return;
    setBusy(true); setError(""); setMessage("");
    try { await api("/api/blog/admin/articles", { method: "PATCH", body: JSON.stringify(selected) }); setMessage("Saved."); await loadArticles(); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function requestChanges() {
    if (!selected) return;
    const notes = window.prompt("What should be changed before publishing?", selected.reviewNotes || "");
    if (notes === null) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await api("/api/blog/admin/articles", { method: "POST", body: JSON.stringify({ id: selected.id, action: "request_changes", reviewNotes: notes }) });
      setMessage("Sent back for changes.");
      setSelected(null);
      await loadArticles();
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function publish() {
    if (!selected) return;
    if (!window.confirm("Publish this article to the public Blog?")) return;
    setBusy(true); setError(""); setMessage("");
    try { await api("/api/blog/publish", { method: "POST", body: JSON.stringify({ id: selected.id }) }); setMessage("Published successfully."); setSelected(null); await loadArticles(); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  const visible = useMemo(() => status === "all" ? articles : articles.filter((a) => a.status === status), [articles, status]);

  if (!user) return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-5 py-12 text-gray-900 dark:text-white">
      <div className="mx-auto max-w-md rounded-2xl border bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-bold">Target95 Blog Admin</h1>
        <p className="mt-2 text-sm text-gray-500">Sign in with your verified admin Firebase account.</p>
        <form onSubmit={login} className="mt-6 space-y-4">
          <input className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-950" type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-950" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button disabled={busy || !auth} className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-black">{busy ? "Signing in…" : "Sign in"}</button>
        </form>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div><h1 className="text-3xl font-bold">Blog Review</h1><p className="text-sm text-gray-500">Review, edit and publish AI-assisted drafts.</p></div>
          <button onClick={() => signOut(auth)} className="rounded-lg border px-4 py-2 text-sm">Sign out</button>
        </header>
        <div className="mt-6 flex gap-2 overflow-x-auto">
          {STATUS.map((item) => <button key={item} onClick={() => setStatus(item)} className={`rounded-full px-4 py-2 text-sm ${status === item ? "bg-black text-white dark:bg-white dark:text-black" : "border"}`}>{item}</button>)}
        </div>
        {error && <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</div>}
        {message && <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-300">{message}</div>}
        <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
          <section className="space-y-3">
            {visible.length === 0 && <div className="rounded-xl border p-5 text-sm text-gray-500">No {status === "all" ? "articles" : status + " articles"} found.</div>}
            {visible.map((article) => <button key={article.id} onClick={() => setSelected({ ...article, keywords: Array.isArray(article.keywords) ? article.keywords.join(", ") : article.keywords || "" })} className={`w-full rounded-xl border p-4 text-left ${selected?.id === article.id ? "ring-2 ring-black dark:ring-white" : ""}`}><div className="text-xs uppercase tracking-wide text-gray-500">{article.status} · {article.category}</div><div className="mt-1 font-semibold">{article.title}</div><div className="mt-1 text-xs text-gray-500">{article.id}</div></button>)}
          </section>
          <section className="rounded-xl border bg-white p-5 dark:bg-gray-900">
            {!selected ? <div className="flex min-h-96 items-center justify-center text-gray-500">Select an article to review.</div> : <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><span className="rounded-full border px-3 py-1 text-xs">{selected.status}</span><span className="ml-2 text-xs text-gray-500">{selected.category}</span></div><div className="flex gap-2"><button disabled={busy} onClick={save} className="rounded-lg border px-4 py-2 text-sm">Save</button>{selected.status === "review" && <><button disabled={busy} onClick={requestChanges} className="rounded-lg border px-4 py-2 text-sm">Request changes</button><button disabled={busy} onClick={publish} className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">Publish</button></>}</div></div>
              <div className="space-y-4">
                <label className="block text-sm font-medium">Title<input className="mt-1 w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-950" value={selected.title || ""} onChange={(e) => setSelected({ ...selected, title: e.target.value })} /></label>
                <label className="block text-sm font-medium">Excerpt<textarea rows="3" className="mt-1 w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-950" value={selected.excerpt || ""} onChange={(e) => setSelected({ ...selected, excerpt: e.target.value })} /></label>
                <label className="block text-sm font-medium">Content<textarea rows="22" className="mt-1 w-full rounded-lg border p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-950" value={selected.content || ""} onChange={(e) => setSelected({ ...selected, content: e.target.value })} /></label>
                <div className="grid gap-4 md:grid-cols-2"><label className="block text-sm font-medium">SEO title<input className="mt-1 w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-950" value={selected.seoTitle || ""} onChange={(e) => setSelected({ ...selected, seoTitle: e.target.value })} /></label><label className="block text-sm font-medium">Meta description<input className="mt-1 w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-950" value={selected.metaDescription || ""} onChange={(e) => setSelected({ ...selected, metaDescription: e.target.value })} /></label></div>
                <label className="block text-sm font-medium">Keywords<input className="mt-1 w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-950" value={selected.keywords || ""} onChange={(e) => setSelected({ ...selected, keywords: e.target.value })} /></label>
                <label className="block text-sm font-medium">Editor notes<textarea rows="4" className="mt-1 w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-950" value={selected.editorNotes || ""} onChange={(e) => setSelected({ ...selected, editorNotes: e.target.value })} placeholder="What should be checked or improved before publishing?" /></label>
                <label className="block text-sm font-medium">Source URLs<textarea rows="3" className="mt-1 w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-950" value={Array.isArray(selected.sourceUrls) ? selected.sourceUrls.join("\n") : selected.sourceUrls || ""} onChange={(e) => setSelected({ ...selected, sourceUrls: e.target.value.split("\n").map((v) => v.trim()).filter(Boolean) })} placeholder="One URL per line" /></label>
                <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={Boolean(selected.needsVerification)} onChange={(e) => setSelected({ ...selected, needsVerification: e.target.checked })} /> Needs verification</label>
                <label className="block text-sm font-medium">Research notes<textarea rows="4" className="mt-1 w-full rounded-lg border p-3 dark:border-gray-700 dark:bg-gray-950" value={selected.researchNotes || ""} onChange={(e) => setSelected({ ...selected, researchNotes: e.target.value })} /></label>
              </div>
            </div>}
          </section>
        </div>
      </div>
    </main>
  );
}
