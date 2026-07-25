"use client";

import { Clock, AlertCircle } from "lucide-react";
import Button from "@/app/components/ui/Button";

const upcomingTests = [
  {
    id: 1,
    name: "Java Fundamentals Mock Test",
    date: "Jul 28, 2025",
    time: "10:00 AM",
    duration: "2 hours",
    questions: 50,
  },
  {
    id: 2,
    name: "Data Structures Assessment",
    date: "Aug 5, 2025",
    time: "2:00 PM",
    duration: "1.5 hours",
    questions: 40,
  },
];

export default function UpcomingMockTests() {
  if (upcomingTests.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Mock Tests</h3>
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No upcoming mock tests scheduled.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Mock Tests</h3>
      <div className="space-y-4">
        {upcomingTests.map((test) => (
          <div
            key={test.id}
            className="border border-gray-100 rounded-lg p-4 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{test.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {test.date} at {test.time} • {test.duration} • {test.questions} questions
                </p>
              </div>
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            </div>
            <Button className="w-full mt-4" variant="secondary">
              Prepare for Test
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}