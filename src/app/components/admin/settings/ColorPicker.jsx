"use client";

const defaultColors = [
  { name: "Blue", value: "blue", class: "bg-blue-600" },
  { name: "Indigo", value: "indigo", class: "bg-indigo-600" },
  { name: "Emerald", value: "emerald", class: "bg-emerald-600" },
  { name: "Violet", value: "violet", class: "bg-violet-600" },
  { name: "Rose", value: "rose", class: "bg-rose-600" },
  { name: "Amber", value: "amber", class: "bg-amber-600" },
  { name: "Cyan", value: "cyan", class: "bg-cyan-600" },
  { name: "Orange", value: "orange", class: "bg-orange-600" },
];

export default function ColorPicker({ colors = defaultColors, selected, onChange, label }) {
  return (
    <div className="space-y-3">
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onChange?.(color.value)}
            className={`w-9 h-9 rounded-full ${color.class} ${
              selected === color.value
                ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                : "hover:scale-105"
            } transition-all duration-200`}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
    </div>
  );
}