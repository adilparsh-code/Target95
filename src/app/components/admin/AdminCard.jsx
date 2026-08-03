export default function AdminCard({ children, className = "", padding = true }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${
        padding ? "p-5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

