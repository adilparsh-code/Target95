"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GlobalSearch from "./GlobalSearch";

export default function Header({ breadcrumbs = [], pageTitle, onMenuToggle }) {
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut: Cmd/Ctrl + K to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          {/* Left: hamburger + breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile hamburger */}
            <button
              onClick={onMenuToggle}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle sidebar menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <nav aria-label="Breadcrumb" className="hidden sm:block">
              <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link href="/admin" className="hover:text-primary transition-colors">
                    Admin
                  </Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className={`items-center gap-1.5 ${index < breadcrumbs.length - 1 ? 'hidden sm:flex' : 'flex'}`}>
                    <svg className="w-4 h-4 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-primary transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-foreground font-medium" aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Page title (mobile) */}
            <h1 className="text-lg font-semibold text-foreground sm:hidden truncate">
              {pageTitle}
            </h1>
          </div>

          {/* Right: search, notifications, avatar */}
          <div className="flex items-center gap-3">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="relative hidden md:flex items-center gap-2 w-56 lg:w-64 rounded-xl border border-border bg-muted px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Open global search"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="flex-1 text-left">Search admin panel...</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-xs text-muted-foreground bg-card border border-border rounded">
                ⌘K
              </kbd>
            </button>

            {/* Mobile search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition md:hidden"
              aria-label="Open search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Notification bell placeholder */}
            <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition" aria-label="Notifications">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">1</span>
            </button>

            {/* Admin Avatar placeholder */}
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold" aria-label="Admin avatar">
              A
            </div>
          </div>
        </div>

        {/* Page title (desktop) */}
        <div className="hidden sm:block px-4 lg:px-6 pb-3">
          <h1 className="text-2xl font-bold text-foreground">{pageTitle}</h1>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
