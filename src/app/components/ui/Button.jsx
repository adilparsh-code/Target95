const variantStyles = {
  default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg",
  destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg",
  outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md",
  ghost: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 hover:scale-[1.02] active:scale-[0.98]",
  link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700",
};

const sizeStyles = {
  default: "h-10 py-2 px-4",
  sm: "h-9 px-3 rounded-md",
  lg: "h-11 px-8 rounded-md",
};

export default function Button({ className, variant = "default", size = "default", ...props }) {
  const variantClass = variantStyles[variant] || variantStyles.default;
  const sizeClass = sizeStyles[size] || sizeStyles.default;

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 ${variantClass} ${sizeClass} ${className}`}
      {...props}
    />
  );
}