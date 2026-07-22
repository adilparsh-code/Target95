"use client";

/**
 * ProgressRing — SVG circular progress indicator.
 * @param {number} progress - 0 to 100
 * @param {number} size - diameter in px
 * @param {number} strokeWidth - thickness of ring
 * @param {string} color - stroke color class
 * @param {string} bgColor - background ring color class
 * @param {string} label - optional center label
 */

export default function ProgressRing({
  progress = 0,
  size = 80,
  strokeWidth = 6,
  color = "stroke-blue-600",
  bgColor = "stroke-gray-200",
  label,
  className = "",
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(Math.max(progress, 0), 100) / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={bgColor}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${color} transition-all duration-500 ease-out`}
        />
      </svg>
      {label && (
        <span className="absolute text-sm font-bold text-gray-900">{label}</span>
      )}
    </div>
  );
}