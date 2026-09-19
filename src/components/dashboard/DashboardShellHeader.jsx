"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { BellIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";
import useNotifications from "@/app/hooks/useNotifications";

function getInitials(user) {
  return (user?.fullName || user?.email || "T").slice(0, 1).toUpperCase();
}

/**
 * Shared dashboard header: branding, notifications, user menu, mobile nav.
 * Used by both the student dashboard and (adapted) admin layout header.
 */
export default function DashboardHeader({ title, subtitle, user, isLoading, navLinks = [] }) {
  const { logout } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setNotifOpen(false);
    };
    const escape = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setNotifOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Target95+ home">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-lg dark:border-blue-900/60 dark:bg-blue-950/60">🎯</span>
          <span className="hidden text-[17px] font-black tracking-tight text-slate-950 sm:block dark:text-white">
            Target95<span className="text-blue-600 dark:text-blue-400">+</span>
          </span>
        </Link>

        <span className="hidden rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 md:inline dark:bg-blue-950/50 dark:text-blue-300">
          {title}
        </span>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-900"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>

          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotifOpen((o) => !o)}
              className="relative grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
              aria-expanded={notifOpen}
            >
              <BellIcon className="h-5 w-5" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900" role="dialog" aria-label="Notifications panel">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</p>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400">
                      Mark all read
                    </button>
                  )}
                </div>
                <ul className="max-h-80 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
                  {notifications.length === 0 && (
                    <li className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">No notifications yet.</li>
                  )}
                  {notifications.slice(0, 6).map((n) => (
                    <li key={n.id} className={`flex gap-3 px-4 py-3 ${n.read ? "opacity-60" : ""}`}>
                      <span aria-hidden="true">{n.icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{n.title}</p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">{n.message}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">{n.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-900"
              aria-label="Open user menu"
              aria-expanded={menuOpen}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-sm font-bold text-white" aria-hidden="true">
                {isLoading ? "…" : getInitials(user)}
              </span>
              <span className="hidden max-w-[140px] truncate text-sm font-medium text-slate-700 sm:block dark:text-slate-200">
                {isLoading ? "Loading…" : user?.fullName || user?.email || "Student"}
              </span>
              <ChevronDownIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900" role="menu">
                <div className="px-3 py-2">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{user?.fullName || "Student"}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                  {subtitle && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
                </div>
                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                <Link href="/profile" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800" role="menuitem">
                  Profile
                </Link>
                <Link href="/settings" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800" role="menuitem">
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    setMenuOpen(false);
                    await logout();
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                  role="menuitem"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && navLinks.length > 0 && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden dark:border-slate-800 dark:bg-slate-950" aria-label="Dashboard navigation">
          <ul className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  <span aria-hidden="true">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
