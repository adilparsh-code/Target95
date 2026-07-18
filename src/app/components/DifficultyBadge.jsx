export default function DifficultyBadge({ difficulty }) {

  const styles = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (

    <span
      className={`px-4 py-2 rounded-full font-semibold ${
        styles[difficulty] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {difficulty}
    </span>

  );

}
