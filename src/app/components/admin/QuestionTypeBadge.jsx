/**
 * Reusable badge for displaying question type (Theory, MCQ, Coding).
 * @param {Object} props
 * @param {string} props.type - Question type
 * @param {string} props.size - Badge size: "sm" | "md"
 */
export default function QuestionTypeBadge({ type, size = "sm" }) {
  const config = {
    Theory: { label: "Theory", classes: "bg-purple-50 text-purple-700 ring-1 ring-purple-200" },
    MCQ: { label: "MCQ", classes: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200" },
    Coding: { label: "Coding", classes: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" },
    theory: { label: "Theory", classes: "bg-purple-50 text-purple-700 ring-1 ring-purple-200" },
    mcq: { label: "MCQ", classes: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200" },
  };

  const normalized = type?.charAt(0).toUpperCase() + type?.slice(1).toLowerCase();
  const configItem = config[normalized] || config[type] || {
    label: type || "Unknown",
    classes: "bg-gray-50 text-gray-600 ring-1 ring-gray-200",
  };

  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses} ${configItem.classes}`}
    >
      {configItem.label}
    </span>
  );
}