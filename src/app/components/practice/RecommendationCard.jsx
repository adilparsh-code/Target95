"use client";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const priorityColors = {
  high: "warning",
  medium: "primary",
  low: "secondary"
};

const priorityLabels = {
  high: "High Priority",
  medium: "Medium Priority",
  low: "Low Priority"
};

const typeIcons = {
  "weak_area": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.166 2.502-2.5V5.5c0-1.334-.959-2.5-2.502-2.5H5.062c-1.54 0-2.503 1.166-2.503 2.5v14c0 1.334.963 2.5 2.503 2.5z" />
    </svg>
  ),
  "mixed": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  "timed": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

export default function RecommendationCard({ recommendation, onPractice }) {
  const { type, title, description, priority, chapter } = recommendation;

  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          {typeIcons[type] || typeIcons["mixed"]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
            <Badge variant={priorityColors[priority]}>{priorityLabels[priority]}</Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{description}</p>
          {chapter && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">Topic: {chapter}</p>
          )}
          <Button size="sm" variant="primary" onClick={onPractice}>
            Start Practice
          </Button>
        </div>
      </div>
    </Card>
  );
}