import Link from 'next/link';

// Breadcrumb trail for a BoardPrep chapter page.
// The last crumb is the current page, so it is rendered as text and not a link.
export default function ChapterBreadcrumbs({ trail }) {
  if (!Array.isArray(trail) || !trail.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-slate-900">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="font-medium hover:text-blue-700">
                  {crumb.label}
                </Link>
              )}
              {!isLast && <span aria-hidden="true" className="text-slate-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
