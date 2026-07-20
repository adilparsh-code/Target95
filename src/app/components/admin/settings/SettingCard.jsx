"use client";

export default function SettingCard({ children, className = "", padding = true, hover = true }) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm ${
        hover ? "hover:shadow-md hover:border-gray-300" : ""
      } transition-all duration-200 ${
        padding ? "p-5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}