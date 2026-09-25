"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

/**
 * Teacher dashboards are not part of the platform yet — there is no teacher
 * role in the data layer, so this page shows an honest empty state instead of
 * fabricated demo students.
 */
export default function TeacherDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["teacher", "admin"]}>
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <div className="h-20 sm:h-24 lg:h-28"></div>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700">Teacher Dashboard</p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Teacher Workspace</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">
              Teacher accounts are not provisioned yet, so there is no class or student data to display here.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to your dashboard
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
