export default function Input({ className, ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}