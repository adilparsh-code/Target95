"use client";

import { useRouter } from "next/navigation";
import Card from "../ui/Card";
import Button from "../ui/Button";
import PerformanceCard from "./PerformanceCard";
import WeakTopicCard from "./WeakTopicCard";
import RecommendationCard from "./RecommendationCard";
import { usePerformance } from "../../hooks/usePerformance";

export default function ResultSummary() {
  const router = useRouter();
  const { stats, chapterData, loading, error, getRecommendations } = usePerformance();

  // Mock results data - in production, this would come from the completed session
  const mockResults = {
    totalQuestions: 10,
    correct: 7,
    wrong: 2,
    skipped: 1,
    accuracy: 70,
    timeTaken: "24:35",
    score: 70,
    subject: "Java Programming",
    chapter: "Variables & Data Types"
  };

  const recommendations = getRecommendations();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Practice Complete!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {mockResults.subject} • {mockResults.chapter}
        </p>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <PerformanceCard
          title="Total Questions"
          value={mockResults.totalQuestions}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
        <PerformanceCard
          title="Correct"
          value={mockResults.correct}
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
        <PerformanceCard
          title="Wrong"
          value={mockResults.wrong}
          color="red"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        />
        <PerformanceCard
          title="Skipped"
          value={mockResults.skipped}
          color="yellow"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          }
        />
        <PerformanceCard
          title="Accuracy"
          value={`${mockResults.accuracy}%`}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <PerformanceCard
          title="Time Taken"
          value={mockResults.timeTaken}
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Score Card */}
      <Card className="p-8 mb-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your Score</h3>
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          {mockResults.score}/100
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {mockResults.accuracy >= 80 
            ? "Excellent work! You have a strong understanding of this topic." 
            : mockResults.accuracy >= 60 
              ? "Good job! Keep practicing to improve your score." 
              : "You need more practice. Review the material and try again."}
        </p>
      </Card>

      {/* Weak Areas & Recommendations */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Weak Chapters */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Areas to Improve</h3>
          <div className="space-y-4">
            {chapterData?.weakChapters?.length > 0 ? (
              chapterData.weakChapters.map((chapter, index) => (
                <WeakTopicCard
                  key={index}
                  topic={chapter.name}
                  accuracy={chapter.accuracy}
                  totalQuestions={chapter.totalQuestions}
                />
              ))
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">No weak areas detected! Keep up the great work.</p>
              </Card>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recommended Practice</h3>
          <div className="space-y-4">
            {recommendations.length > 0 ? (
              recommendations.map((rec, index) => (
                <RecommendationCard
                  key={index}
                  recommendation={rec}
                  onPractice={() => router.push("/practice/setup")}
                />
              ))
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">Start more practice sessions to get personalized recommendations.</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={() => router.push("/ai-tutor")}
          variant="primary"
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Ask AI Tutor
        </Button>
        <Button
          onClick={() => router.push("/practice/setup")}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Practice Again
        </Button>
        <Button
          onClick={() => router.push("/dashboard")}
          variant="ghost"
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}