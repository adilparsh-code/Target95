"use client";

import { useMemo } from "react";
import useProgress from "../hooks/useProgress";
import ProgressRing from "./ui/ProgressRing";

export default function SubjectProgress({ chapters, questions }) {
  const { isCompleted } = useProgress();

  const { completedCount, totalCount, percentage } = useMemo(() => {
    const total = questions.length;
    const completed = questions.filter((q) =>
      isCompleted({ chapter: q.chapter, questionId: q.id })
    ).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completedCount: completed, totalCount: total, percentage: pct };
  }, [questions, isCompleted]);

  return (
    <div className="flex flex-col items-center">
      <ProgressRing
        progress={percentage}
        size={56}
        strokeWidth={5}
        color="stroke-blue-600"
        bgColor="stroke-gray-200"
        label={`${percentage}%`}
      />
      <p className="mt-1 text-xs text-gray-500">
        {completedCount}/{totalCount} done
      </p>
    </div>
  );
}