export default function Card({ className = "", hover = false, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white text-slate-900 shadow-[var(--shadow-md)] dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-100 dark:shadow-[var(--shadow-md)] transition-[box-shadow,transform,border-color,background-color] duration-300 ${hover ? 'hover:-translate-y-1 hover:border-blue-200/90 hover:shadow-[var(--shadow-lg)] dark:hover:border-blue-800 dark:hover:shadow-[var(--shadow-lg)]' : ''} ${className}`}
      {...props}
    />
  );
}
