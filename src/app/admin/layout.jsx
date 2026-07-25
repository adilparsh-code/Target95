"use client";

import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AdminRootLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

