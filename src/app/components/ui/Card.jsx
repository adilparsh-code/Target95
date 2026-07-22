"use client";

/**
 * Card — Reusable card component with variants.
 * Supports default, hover (interactive), and dashed (empty state) styles.
 */

export default function Card({
  children,
  className = "",
  variant = "default",
  hover = false,
  onClick,
  ...props
}) {
  const variants = {
    default: "border border-gray-200 bg-white shadow-sm",
    dashed: "border border-dashed border-gray-300 bg-white shadow-sm",
    ghost: "border border-transparent bg-gray-50",
  };

  const hoverStyles = hover
    ? "cursor-pointer transition hover:shadow-md hover:border-gray-300"
    : "";

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`rounded-3xl p-6 ${variants[variant] || variants.default} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = "" }) {
  return (
    <div className={`mb-4 flex items-start justify-between gap-4 ${className}`}>
      <div>
        {title && (
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        )}
        {subtitle && (
          <p className="mt-1 text-sm text-gray-700">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return (
    <div className={`mt-4 flex items-center gap-3 pt-4 ${className}`}>
      {children}
    </div>
  );
}