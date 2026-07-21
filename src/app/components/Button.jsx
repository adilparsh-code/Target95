export default function Button({ text, type }) {
  const baseClass =
    "px-8 py-4 rounded-xl font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800",
    secondary:
      "border-2 border-blue-600 text-blue-700 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:bg-blue-50 hover:border-blue-700",
  };

  return <button className={`${baseClass} ${variants[type] || variants.primary}`}>{text}</button>;
}