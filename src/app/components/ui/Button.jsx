const variantStyles = {
  default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 focus:ring-2 focus:ring-blue-300/70 dark:focus:ring-blue-400/40 hover:shadow-lg hover:shadow-blue-600/15",
  destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 focus:ring-2 focus:ring-red-300/70 hover:shadow-lg hover:shadow-red-600/15",
  outline: "border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-300 focus:ring-2 focus:ring-blue-300/50",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 focus:ring-2 focus:ring-slate-300/60",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white focus:ring-2 focus:ring-slate-300/60",
  link: "text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300 focus:ring-2 focus:ring-blue-300/50",
};

const sizeStyles = {
  default: "h-10 px-4",
  sm: "h-9 px-3 rounded-lg text-xs",
  lg: "h-11 px-8 rounded-xl",
};

export default function Button({ className = "", variant = "default", size = "default", ...props }) {
  const variantClass = variantStyles[variant] || variantStyles.default;
  const sizeClass = sizeStyles[size] || sizeStyles.default;

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${variantClass} ${sizeClass} ${className}`}
      {...props}
    />
  );
}
