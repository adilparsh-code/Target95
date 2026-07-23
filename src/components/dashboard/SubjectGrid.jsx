"use client";

import Button from "../ui/Button";

const subjects = [
  {
    id: 1,
    name: "Java Programming",
    icon: "☕",
    progress: 75,
    totalQuestions: 150,
    solvedQuestions: 112,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    name: "Boolean Algebra",
    icon: "🔢",
    progress: 45,
    totalQuestions: 80,
    solvedQuestions: 36,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Computer Hardware",
    icon: "🖥️",
    progress: 30,
    totalQuestions: 100,
    solvedQuestions: 30,
    color: "from-gray-500 to-slate-600",
  },
  {
    id: 4,
    name: "Data Structures",
    icon: "📊",
    progress: 60,
    totalQuestions: 120,
    solvedQuestions: 72,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 5,
    name: "Algorithms",
    icon: "⚡",
    progress: 40,
    totalQuestions: 90,
    solvedQuestions: 36,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 6,
    name: "Strings",
    icon: "🔤",
    progress: 85,
    totalQuestions: 60,
    solvedQuestions: 51,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 7,
    name: "Arrays",
    icon: "📋",
    progress: 90,
    totalQuestions: 70,
    solvedQuestions: 63,
    color: "from-teal-500 to-cyan-500",
  },
];

export default function SubjectGrid() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Subjects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{subject.icon}</span>
              <h4 className="font-medium text-gray-900 text-sm leading-tight">
                {subject.name}
              </h4>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{subject.solvedQuestions}/{subject.totalQuestions} solved</span>
                <span className="font-medium">{subject.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${subject.color} h-2 rounded-full transition-all`}
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>
            <Button variant="secondary" size="sm" className="w-full">
              Continue
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}