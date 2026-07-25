"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Questions", href: "/admin/questions", icon: "❓" },
  { label: "Subjects", href: "/admin/subjects", icon: "📚" },
  { label: "AI Generator", href: "/admin/ai-generator", icon: "🤖" },
  { label: "Generated Questions", href: "/admin/generated-questions", icon: "📝" },
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
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-card border-r border-border shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Admin navigation sidebar"
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">Target95</span>
            <span className="px-2 py-0.5 text-xs font-semibold text-primary bg-primary-light rounded-full">
              Admin
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
              focus:ring-primary focus:ring-offset-2
              ${isActive
                ? "bg-primary-light text-primary border-l-4 border-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground border-l-4 border-transparent"
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
          <div className="my-2 border-t border-border" />

          {/* Logout */}
          <button
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2"
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