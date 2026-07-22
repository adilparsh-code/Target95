"use client";

import Link from "next/link";
import SearchInput from "./SearchInput";
import NotificationBell from "./NotificationBell";
import AdminAvatar from "./AdminAvatar";

export default function Header({ breadcrumbs = [], pageTitle, onMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Left: hamburger + breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile hamburger */}
          <button
            onClick={onMenuToggle}
            className="p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle sidebar menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav aria-label="Breadcrumb" className="hidden sm:block">
            <ol className="flex items-center gap-1.5 text-sm text-gray-500">
              <li>
                <Link href="/admin" className="hover:text-blue-600 transition-colors">
                  Admin
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className={`items-center gap-1.5 ${index < breadcrumbs.length - 1 ? 'hidden sm:flex' : 'flex'}`}>
                  <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-900 font-medium" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Page title (mobile) */}
          <h1 className="text-lg font-semibold text-gray-900 sm:hidden truncate">
            {pageTitle}
          </h1>
        </div>

        {/* Right: search, notifications, avatar */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block w-56 lg:w-64">
            <SearchInput aria-label="Search admin panel" />
          </div>

          {/* Notification bell */}
          <NotificationBell notificationCount={1} />

          {/* Admin Avatar */}
          <AdminAvatar />
        </div>
      </div>

      {/* Page title (desktop) */}
      <div className="hidden sm:block px-4 lg:px-6 pb-3">
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
      </div>
    </header>
  );
}