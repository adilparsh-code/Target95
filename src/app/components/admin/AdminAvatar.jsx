export default function AdminAvatar({ name = "Admin" }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
        {initial}
      </div>
      <span className="hidden lg:block text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
}