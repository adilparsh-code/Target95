"use client";

import { useMemo } from "react";

/**
 * Heatmap — Learning activity heatmap (365-day grid).
 * @param {Array} data - Array of { date: 'YYYY-MM-DD', count: number }
 */

function getIntensity(count) {
  if (count === 0) return "bg-gray-100";
  if (count <= 3) return "bg-green-200";
  if (count <= 6) return "bg-green-300";
  if (count <= 10) return "bg-green-400";
  return "bg-green-500";
}

export default function Heatmap({ data = [] }) {
  const weeks = useMemo(() => {
    const cells = data.map((d) => ({
      date: d.date,
      count: d.count,
      intensity: getIntensity(d.count),
    }));
    const grouped = [];
    for (let i = 0; i < cells.length; i += 7) {
      grouped.push(cells.slice(i, i + 7));
    }
    return grouped;
  }, [data]);

  const months = useMemo(() => {
    const monthLabels = [];
    const seen = new Set();
    for (const d of data) {
      const month = d.date.slice(0, 7);
      if (!seen.has(month)) {
        seen.add(month);
        const date = new Date(d.date);
        monthLabels.push(
          date.toLocaleString("default", { month: "short" })
        );
      }
    }
    return monthLabels;
  }, [data]);

  const totalActivity = useMemo(
    () => data.reduce((sum, d) => sum + d.count, 0),
    [data]
  );

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">📊 Learning Heatmap</h3>
        <span className="text-sm text-gray-700">
          {totalActivity} activities this year
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Month labels */}
          <div className="flex gap-0.5 mb-1 ml-8">
            {months.map((month, i) => (
              <span key={i} className="text-xs text-gray-500 flex-1">
                {month}
              </span>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex gap-0.5">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 mr-2">
              {["Mon", "", "Wed", "", "Fri", "", ""].map((day, i) => (
                <span key={i} className="text-xs text-gray-500 h-3 leading-3">
                  {day}
                </span>
              ))}
            </div>

            {/* Cells */}
            <div className="flex gap-0.5 flex-1">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {week.map((cell, ci) => (
                    <div
                      key={ci}
                      className={`w-3 h-3 rounded-sm ${cell.intensity}`}
                      title={`${cell.date}: ${cell.count} activities`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 justify-end">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-gray-100" />
        <div className="w-3 h-3 rounded-sm bg-green-200" />
        <div className="w-3 h-3 rounded-sm bg-green-300" />
        <div className="w-3 h-3 rounded-sm bg-green-400" />
        <div className="w-3 h-3 rounded-sm bg-green-500" />
        <span>More</span>
      </div>
    </div>
  );
}