export default function EmptyState({ icon = "📂", title, description, action, iconBg }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className={`text-5xl mb-4 ${iconBg ? 'w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl' : ''}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}