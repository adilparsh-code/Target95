const variantStyles = {
  default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300",
  destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300",
  outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-300",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300",
  ghost: "text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300",
  link: "text-blue-600 underline-offset-4 hover:underline focus:ring-2 focus:ring-blue-300",
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
      className={`inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus:outline-none ${variantClass} ${sizeClass} ${className}`}
      {...props}
    />
  );
}