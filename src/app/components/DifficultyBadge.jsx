export default function DifficultyBadge({ difficulty }) {
  const badgeStyles = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeStyles[difficulty]}`}>
      {difficulty}
    </span>
  );
}