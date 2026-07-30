"use client";

export default function MockTestResults({ result, onRetry }) {
  // Calculate additional metrics
  const accuracy = result.totalQuestions > 0 ? Math.round((result.correctCount / result.totalQuestions) * 100) : 0;
  const timeTaken = result.timeTaken || "45:32"; // Mock time taken
  const mockRank = Math.floor(Math.random() * 500) + 1; // Mock rank

  // Calculate subject-wise performance
  const subjectWise = result.review.reduce((acc, item) => {
    const topic = item.question.topic || "General";
    if (!acc[topic]) acc[topic] = { correct: 0, total: 0 };
    acc[topic].total++;
    if (item.isCorrect) acc[topic].correct++;
    return acc;
  }, {});

  // Determine strengths and weaknesses
  const topics = Object.entries(subjectWise).map(([topic, data]) => ({
    name: topic,
    percentage: Math.round((data.correct / data.total) * 100)
  }));
  const sortedTopics = [...topics].sort((a, b) => b.percentage - a.percentage);
  const strengths = sortedTopics.slice(0, 2).map(t => t.name);
  const weaknesses = sortedTopics.slice(-2).map(t => t.name);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-700 dark:text-gray-300">Mock Test Results</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">You completed your practice test</h1>
        <p className="mt-3 text-base leading-7 text-gray-700 dark:text-gray-400">
          Review your score, accuracy, and each answer before starting another round.
        </p>
      </div>

      {/* Primary Statistics */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">Score</p>
          <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{result.score}/{result.totalQuestions}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">Percentage</p>
          <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{result.percentage}%</p>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">Accuracy</p>
          <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{accuracy}%</p>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">Time Taken</p>
          <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{timeTaken}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">Mock Rank</p>
          <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">#{mockRank}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">Correct</p>
          <p className="mt-3 text-3xl font-bold text-green-600 dark:text-green-400">{result.correctCount}</p>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Performance Summary</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {strengths.map(topic => (
                  <span key={topic} className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">Areas to Improve</h3>
              <div className="flex flex-wrap gap-2">
                {weaknesses.map(topic => (
                  <span key={topic} className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm font-medium">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subject-wise Breakdown */}
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Subject-wise Breakdown</h2>
          <div className="space-y-4">
            {Object.entries(subjectWise).map(([topic, data]) => (
              <div key={topic}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{topic}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {data.correct}/{data.total} ({Math.round((data.correct / data.total) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${(data.correct / data.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review Answers</h2>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">Green means correct, red means incorrect, and yellow marks questions you flagged.</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => window.location.href = '/ai-tutor'}
              className="rounded-xl border border-purple-300 dark:border-purple-700 bg-purple-100 dark:bg-purple-900/30 px-5 py-3 font-semibold text-gray-900 dark:text-white transition hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-200 dark:hover:bg-purple-900/50"
            >
              Ask AI Tutor
            </button>
            <button
              type="button"
              onClick={onRetry}
              className="rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-100 dark:bg-blue-900/30 px-5 py-3 font-semibold text-gray-900 dark:text-white transition hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-200 dark:hover:bg-blue-900/50"
            >
              Retry Test
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {result.review.map((item) => {
            const reviewClass = item.isMarkedForReview
              ? "border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
              : item.isCorrect
                ? "border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20"
                : "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/20";

            return (
              <div key={item.question.id} className={`rounded-2xl border p-6 ${reviewClass}`}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{item.question.question}</p>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold whitespace-nowrap ${
                      item.isMarkedForReview 
                        ? "border-yellow-300 dark:border-yellow-700 bg-white dark:bg-gray-800 text-yellow-800 dark:text-yellow-300" 
                        : item.isCorrect 
                          ? "border-green-300 dark:border-green-700 bg-white dark:bg-gray-800 text-green-800 dark:text-green-300" 
                          : "border-red-300 dark:border-red-700 bg-white dark:bg-gray-800 text-red-800 dark:text-red-300"
                    }">
                      {item.isMarkedForReview ? "Review" : item.isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>
                  
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Your answer</p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">{item.response || "No response provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Correct answer</p>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">{item.correctAnswer}</p>
                    </div>
                  </div>

                  {/* Explanation */}
                  {item.question.explanation && (
                    <div className="mt-2 p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Explanation</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item.question.explanation}</p>
                    </div>
                  )}

                  {/* AI Tutor button for this specific question */}
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => window.location.href = `/ai-tutor?question=${encodeURIComponent(item.question.question)}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Ask AI Tutor about this question
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}