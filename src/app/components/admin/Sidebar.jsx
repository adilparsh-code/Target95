"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Questions", href: "/admin/questions", icon: "❓" },
  { label: "Chapters", href: "/admin/chapters", icon: "📚" },
  { label: "Study Notes", href: "/admin/study-notes", icon: "📝" },
  { label: "Mock Tests", href: "/admin/mock-tests", icon: "📋" },
  { label: "Students", href: "/admin/students", icon: "👨‍🎓" },
  { label: "Teachers", href: "/admin/teachers", icon: "👩‍🏫" },
  { label: "Analytics", href: "/admin/analytics", icon: "📈" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Admin navigation sidebar"
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">Target95</span>
            <span className="px-2 py-0.5 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
              Admin
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 lg:hidden"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const linkClasses = `
              flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium 
              transition-all duration-200 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2
              ${isActive
                ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
              }
            `;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={linkClasses.trim()}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="text-lg" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-2 border-t border-gray-200" />

          {/* Logout */}
          <button
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Logout from admin panel"
          >
            <span className="text-lg" aria-hidden="true">🚪</span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
}