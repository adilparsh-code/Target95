"use client";

import { Suspense } from "react";
import PracticeSetup from "../../components/practice/PracticeSetup";

function PracticeSetupFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );
}

export default function PracticeSetupPage() {
  return (
    <Suspense fallback={<PracticeSetupFallback />}>
      <PracticeSetup />
    </Suspense>
  );
}
