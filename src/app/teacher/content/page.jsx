"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import ContentManager from "@/app/components/admin/content/ContentManager";

export default function TeacherContentPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "teacher"]}>
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ContentManager />
        </div>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
