"use client";

import Card from "../ui/Card";
import Button from "../ui/Button";

export default function WeakTopicCard({ topic, accuracy, totalQuestions }) {
  const getAccuracyColor = () => {
    if (accuracy < 40) return "text-red-600 dark:text-red-400";
    if (accuracy < 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-blue-600 dark:text-blue-400";
  };

  const getProgressColor = () => {
    if (accuracy < 40) return "bg-red-500";
    if (accuracy < 60) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">{topic}</h4>
        <span className={`font-bold ${getAccuracyColor()}`}>{accuracy}%</span>
      </div>
      
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-3">
        <div 
          className={`h-full ${getProgressColor()} rounded-full transition-all duration-300`}
          style={{ width: `${accuracy}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {totalQuestions} questions attempted
        </span>
        <Button size="sm" variant="secondary">
          Practice
        </Button>
      </div>
    </Card>
  );
}