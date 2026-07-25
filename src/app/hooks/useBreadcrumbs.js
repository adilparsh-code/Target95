"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

const pageTitles = {
  "/admin": "Dashboard",
  "/admin/questions": "Questions",
  "/admin/questions/new": "New Question",
  "/admin/ai-generator": "AI Question Generator",
  "/admin/generated-questions": "Generated Questions",
  "/admin/chapters": "Chapters",
  "/admin/study-notes": "Study Notes",
  "/admin/study-notes/new": "New Study Note",
  "/admin/mock-tests": "Mock Tests",
  "/admin/mock-tests/new": "New Mock Test",
  "/admin/students": "Students",
  "/admin/teachers": "Teachers",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
  "/admin/settings/general": "General Settings",
  "/admin/settings/academic": "Academic Settings",
  "/admin/settings/appearance": "Appearance Settings",
  "/admin/settings/notifications": "Notification Settings",
  "/admin/settings/security": "Security Settings",
  "/admin/settings/backup": "Backup Settings",
  "/admin/settings/features": "Feature Settings",
  "/admin/settings/profile": "Profile Settings",
  "/admin/settings/roles": "Roles & Permissions",
  "/admin/settings/system": "System Info",
};

export function useBreadcrumbs() {
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

  return { breadcrumbs, pageTitle };
}