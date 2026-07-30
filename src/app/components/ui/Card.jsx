export default function Card({ className, hover = false, ...props }) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 transition-all duration-200 ${hover ? 'hover:shadow-lg hover:-translate-y-1 dark:hover:border-gray-600' : ''} ${className}`}
      {...props}
    />
  );
}