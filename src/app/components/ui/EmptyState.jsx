export default function EmptyState({ title, description, icon, className, ...props }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-12 text-center ${className}`}
      {...props}
    >
      {icon && <div className="text-6xl text-gray-400">{icon}</div>}
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}