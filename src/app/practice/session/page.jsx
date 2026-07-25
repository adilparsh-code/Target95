"use client";

import { Suspense } from "react";
import PracticePlayer from "../../components/practice/PracticePlayer";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function PracticeSessionPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <PracticePlayer />
      </Suspense>
    </ProtectedRoute>
  );
}
