"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

const pageTitles = {
  "/admin": "Dashboard",
  "/admin/questions": "Questions",
  "/admin/chapters": "Chapters",
  "/admin/study-notes": "Study Notes",
  "/admin/mock-tests": "Mock Tests",
  "/admin/students": "Students",
  "/admin/teachers": "Teachers",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
};

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const { breadcrumbs, pageTitle } = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs = [];
    let accumulated = "";

    for (const segment of segments) {
      accumulated += `/${segment}`;
      const label = pageTitles[accumulated] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      crumbs.push({ label, href: accumulated === pathname ? undefined : accumulated });
    }

    return {
      breadcrumbs: crumbs.slice(0, -1), // exclude current page from breadcrumbs
      pageTitle: pageTitles[pathname] || "Dashboard",
    };
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header
          breadcrumbs={breadcrumbs}
          pageTitle={pageTitle}
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
