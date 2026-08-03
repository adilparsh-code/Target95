"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import RewardsCenter from "../components/gamification/RewardsCenter";

export default function RewardsPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <Navbar />
        <div className="h-20 sm:h-24 lg:h-28"></div>
        <RewardsCenter />
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
