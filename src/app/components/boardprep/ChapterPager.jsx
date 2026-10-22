import Link from 'next/link';

// Previous / next pager for a BoardPrep chapter page.
// The position label always reflects the flat, published chapter order of the
// subject, so the first and last chapter show only one direction.
export default function ChapterPager({ previous, next, position, total }) {
  return (
    <nav aria-label="Chapter navigation" className="mt-10 border-t border-slate-200 pt-6">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
        Chapter {position} of {total}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {previous ? (
          <Link
            href={previous.href}
            rel="prev"
            className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:ring-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">← Previous</span>
            <span className="mt-1 block font-medium text-slate-800">{previous.title}</span>
          </Link>
        ) : (
          <span aria-hidden="true" className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={next.href}
            rel="next"
            className="rounded-xl bg-white p-4 text-right shadow-sm ring-1 ring-slate-200 transition hover:ring-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Next →</span>
            <span className="mt-1 block font-medium text-slate-800">{next.title}</span>
          </Link>
        ) : (
          <span aria-hidden="true" className="hidden sm:block" />
        )}
      </div>
    </nav>
  );
}
