"use client";

import Link from "next/link";

// Error boundaries must be client components. Kept dependency-free (no Navbar)
// so the fallback cannot fail for the same reason the page did.
export default function BlogError({ reset }) {
  return (
    <main id="main-content" className="grid min-h-screen place-items-center bg-slate-50 px-4 dark:bg-slate-950">
      <div role="alert" className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-black text-slate-950 dark:text-white">This page could not be loaded</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Something went wrong while loading the blog. You can try again, or head back to the blog home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => reset()} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Try again</button>
          <Link href="/blog" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-800 transition hover:border-blue-300 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">Blog home</Link>
          <Link href="/" className="rounded-xl px-5 py-3 text-sm font-extrabold text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-blue-400">Home</Link>
        </div>
      </div>
    </main>
  );
}
