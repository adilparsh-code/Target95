"use client";

import { useState } from "react";
import { useBreadcrumbs } from "../../hooks/useBreadcrumbs";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { breadcrumbs, pageTitle } = useBreadcrumbs();

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