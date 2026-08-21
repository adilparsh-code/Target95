"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "../ui/Card";
import Button from "../ui/Button";
import PerformanceCard from "./PerformanceCard";
import WeakTopicCard from "./WeakTopicCard";
import RecommendationCard from "./RecommendationCard";
import { usePerformance } from "../../hooks/usePerformance";
import { SessionService } from "../../services/SessionService";

function formatDuration(startTime, completedAt) {
  const start = startTime?.toDate ? startTime.toDate() : new Date(startTime);
  const end = completedAt?.toDate ? completedAt.toDate() : new Date(completedAt);
  if (Number.isNaN(start?.getTime?.()) || Number.isNaN(end?.getTime?.())) return "—";
  const seconds = Math.max(0, Math.round((end - start) / 1000));
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

export default function ResultSummary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");
  const { chapterData, loading: performanceLoading, error: performanceError, getRecommendations } = usePerformance();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function loadResult() {
      if (!sessionId) {
        setError("No practice result was specified.");
        setLoading(false);
        return;
      }
      try {
        const result = await new SessionService().getSession(sessionId);
        if (!result.results) throw new Error("Practice results are not available yet.");
        if (!cancelled) setSession(result);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load practice results.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadResult();
    return () => { cancelled = true; };
  }, [sessionId]);

  const recommendations = getRecommendations();
  const results = session?.results;
  const totalQuestions = results?.total ?? 0;
  const accuracy = results?.accuracy ?? 0;
  const subjectName = session?.subject || "Practice";
  const chapterName = session?.chapter || "All Chapters";

  if (loading || performanceLoading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>;
  }

  if (error || performanceError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="p-6 text-red-700 dark:text-red-400">{error || performanceError}</Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium text-blue-600 mb-2">Practice Complete</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Practice Result</h1>
        <p className="text-gray-600 dark:text-gray-400">{subjectName} • {chapterName}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <PerformanceCard title="Total Questions" value={totalQuestions} />
        <PerformanceCard title="Correct" value={results?.correct ?? 0} color="green" />
        <PerformanceCard title="Wrong" value={results?.wrong ?? 0} color="red" />
        <PerformanceCard title="Skipped" value={results?.skipped ?? 0} color="yellow" />
        <PerformanceCard title="Accuracy" value={`${accuracy}%`} color="blue" />
        <PerformanceCard title="Time Taken" value={formatDuration(session?.startTime, session?.completedAt)} color="purple" />
      </div>

      <Card className="p-8 mb-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Score</h2>
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          {results?.score ?? 0}/{totalQuestions}
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {accuracy >= 90 ? "Excellent — you are operating at Target95+ level." : accuracy >= 75 ? "Good progress. Focus on the mistakes below and push for 95+." : "Keep practicing. Review weak areas before attempting the next set."}
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Areas to Improve</h3>
          <div className="space-y-4">
            {chapterData?.weakChapters?.length > 0 ? chapterData.weakChapters.map((chapter, index) => (
              <WeakTopicCard key={index} topic={chapter.name} accuracy={chapter.accuracy} totalQuestions={chapter.totalQuestions} />
            )) : <Card className="p-6 text-center"><p className="text-gray-500">Complete more sessions to identify weak topics.</p></Card>}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recommended Practice</h3>
          <div className="space-y-4">
            {recommendations.length > 0 ? recommendations.map((rec, index) => (
              <RecommendationCard key={index} recommendation={rec} onPractice={() => router.push("/practice/setup")} />
            )) : <Card className="p-6 text-center"><p className="text-gray-500">Keep practicing to unlock personalized recommendations.</p></Card>}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={() => router.push("/practice/setup")} variant="primary">Practice Again</Button>
        <Button onClick={() => router.push("/ai-tutor")} variant="secondary">Ask AI Tutor</Button>
        <Button onClick={() => router.push("/dashboard")} variant="ghost">Go to Dashboard</Button>
      </div>
    </div>
  );
}
