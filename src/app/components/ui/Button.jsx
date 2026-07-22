const variantStyles = {
  default: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
  destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground focus:ring-accent",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary",
  ghost: "hover:bg-accent hover:text-accent-foreground focus:ring-accent",
  link: "text-primary underline-offset-4 hover:underline focus:ring-primary",
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
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClass} ${sizeClass} ${className}`}
      {...props}
    />
  );
}