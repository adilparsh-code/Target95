"use client";

/**
 * Reusable pagination component.
 * @param {Object} props
 * @param {number} props.currentPage - Current page (0-indexed)
 * @param {number} props.totalPages - Total number of pages
 * @param {number} props.totalItems - Total number of items
 * @param {number} props.pageSize - Items per page
 * @param {Function} props.onPageChange - Page change handler
 * @param {string} props.className - Additional classes
 */
export default function Pagination({
  currentPage = 0,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(0, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages - 1, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(0, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 text-sm ${className}`}
      aria-label="Pagination"
    >
      <span className="text-gray-500">
        Showing <span className="font-medium text-gray-700">{startItem}</span>
        {" – "}
        <span className="font-medium text-gray-700">{endItem}</span>
        {" of "}
        <span className="font-medium text-gray-700">{totalItems}</span>
      </span>

      <div className="flex items-center gap-1">
        {/* First page */}
        <button
          onClick={() => onPageChange?.(0)}
          disabled={currentPage === 0}
          className="px-2 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="First page"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {/* Previous */}
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {/* Page numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {pageNumbers[0] > 0 && (
            <>
              <button
                onClick={() => onPageChange?.(0)}
                className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm"
              >
                1
              </button>
              {pageNumbers[0] > 1 && (
                <span className="px-1 text-gray-400">…</span>
              )}
            </>
          )}

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page + 1}
            </button>
          ))}

          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 2 && (
                <span className="px-1 text-gray-400">…</span>
              )}
              <button
                onClick={() => onPageChange?.(totalPages - 1)}
                className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>

        {/* Last page */}
        <button
          onClick={() => onPageChange?.(totalPages - 1)}
          disabled={currentPage >= totalPages - 1}
          className="px-2 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Last page"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}