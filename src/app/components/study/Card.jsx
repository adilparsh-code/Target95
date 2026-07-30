"use client";

import { BeakerIcon, BookOpenIcon, LightBulbIcon, ListBulletIcon, SparklesIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const iconMap = {
  default: ListBulletIcon,
  beaker: BeakerIcon,
  book: BookOpenIcon,
  bulb: LightBulbIcon,
  sparkles: SparklesIcon,
  check: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
};

export default function Card({ title, icon = "default", children, className = "" }) {
  const Icon = iconMap[icon] || iconMap.default;

  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all duration-200 hover:shadow-md dark:hover:border-gray-600 ${className}`}>
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      </div>
      <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}