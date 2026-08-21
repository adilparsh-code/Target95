import { Suspense } from "react";
import ResultSummary from "../../components/practice/ResultSummary";

function ResultSummaryFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );
}

export default function PracticeResultPage() {
  return (
    <Suspense fallback={<ResultSummaryFallback />}>
      <ResultSummary />
    </Suspense>
  );
}
