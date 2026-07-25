"use client";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { usePractice } from "../../hooks/usePractice";
import { useRouter } from "next/navigation";

export default function PracticeSetup() {
  const router = useRouter();
  const { settings, updateSettings, startPractice, loading, error } = usePractice();

  const subjects = [
    { id: "java", name: "Java Programming" },
    { id: "python", name: "Python" },
    { id: "javascript", name: "JavaScript" },
    { id: "dsa", name: "Data Structures & Algorithms" }
  ];

  const chapters = {
    java: [
      { id: "introduction", name: "Introduction to Java" },
      { id: "variables", name: "Variables & Data Types" },
      { id: "operators", name: "Operators" },
      { id: "control-flow", name: "Control Flow" },
      { id: "methods", name: "Methods" },
      { id: "oops", name: "Object-Oriented Programming" }
    ],
    python: [
      { id: "introduction", name: "Introduction to Python" },
      { id: "variables", name: "Variables & Data Types" },
      { id: "control-flow", name: "Control Flow" },
      { id: "functions", name: "Functions" },
      { id: "oops", name: "Object-Oriented Programming" }
    ],
    javascript: [
      { id: "introduction", name: "Introduction to JavaScript" },
      { id: "variables", name: "Variables & Data Types" },
      { id: "functions", name: "Functions" },
      { id: "dom", name: "DOM Manipulation" },
      { id: "async", name: "Async JavaScript" }
    ],
    dsa: [
      { id: "arrays", name: "Arrays" },
      { id: "linked-lists", name: "Linked Lists" },
      { id: "stacks", name: "Stacks & Queues" },
      { id: "trees", name: "Trees" },
      { id: "graphs", name: "Graphs" },
      { id: "sorting", name: "Sorting Algorithms" }
    ]
  };

  const difficulties = [
    { id: "easy", name: "Easy", description: "Foundational concepts" },
    { id: "medium", name: "Medium", description: "Intermediate problems" },
    { id: "hard", name: "Hard", description: "Advanced challenges" },
    { id: "mixed", name: "Mixed", description: "All difficulty levels" }
  ];

  const questionCounts = [10, 20, 30, 50];

  const availableChapters = chapters[settings.subject] || [];

  const handleStartPractice = async () => {
    try {
      const session = await startPractice();
      if (session?.id) {
        router.push(`/practice/session?id=${session.id}`);
      }
    } catch (err) {
      // Error is already handled in the hook
      console.error("Failed to start practice:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Start a New Practice Session
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your practice session to focus on areas where you need the most improvement
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Subject Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject</h3>
          <div className="space-y-2">
            {subjects.map(subject => (
              <button
                key={subject.id}
                onClick={() => updateSettings({ subject: subject.id, chapter: "" })}
                className={`w-full p-3 text-left border-2 rounded-lg transition-all ${
                  settings.subject === subject.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                }`}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </Card>

        {/* Chapter Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Chapter</h3>
          <div className="space-y-2">
            {settings.subject ? (
              <>
                <button
                  onClick={() => updateSettings({ chapter: "" })}
                  className={`w-full p-3 text-left border-2 rounded-lg transition-all ${
                    !settings.chapter
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500"
                      : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                  }`}
                >
                  All Chapters
                </button>
                {availableChapters.map(chapter => (
                  <button
                    key={chapter.id}
                    onClick={() => updateSettings({ chapter: chapter.id })}
                    className={`w-full p-3 text-left border-2 rounded-lg transition-all ${
                      settings.chapter === chapter.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500"
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                    }`}
                  >
                    {chapter.name}
                  </button>
                ))}
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                Please select a subject first
              </p>
            )}
          </div>
        </Card>

        {/* Difficulty Selection */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Difficulty</h3>
          <div className="space-y-2">
            {difficulties.map(difficulty => (
              <button
                key={difficulty.id}
                onClick={() => updateSettings({ difficulty: difficulty.id })}
                className={`w-full p-3 text-left border-2 rounded-lg transition-all ${
                  settings.difficulty === difficulty.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                }`}
              >
                <div className="font-medium text-gray-900 dark:text-white">{difficulty.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{difficulty.description}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Question Count & Timer */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Number of Questions
            </label>
            <div className="grid grid-cols-4 gap-2">
              {questionCounts.map(count => (
                <button
                  key={count}
                  onClick={() => updateSettings({ questionCount: count })}
                  className={`p-2 text-center border-2 rounded-lg transition-all ${
                    settings.questionCount === count
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500"
                      : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Enable Timer</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Simulate exam conditions</p>
              </div>
              <button
                onClick={() => updateSettings({ hasTimer: !settings.hasTimer })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.hasTimer ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.hasTimer ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {settings.hasTimer && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration (minutes)
                </label>
                <Input
                  type="number"
                  min={5}
                  max={180}
                  value={settings.duration}
                  onChange={(e) => updateSettings({ duration: parseInt(e.target.value) || 30 })}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={handleStartPractice}
          disabled={loading || !settings.subject}
          variant="primary"
          size="lg"
          className="px-12"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Starting Practice...
            </>
          ) : (
            "Start Practice"
          )}
        </Button>
      </div>
    </div>
  );
}