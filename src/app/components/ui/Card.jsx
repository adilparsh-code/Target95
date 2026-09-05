export default function Card({ className = "", hover = false, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-100 dark:shadow-[0_12px_40px_rgba(0,0,0,0.22)] transition-[box-shadow,transform,border-color] duration-300 ${hover ? 'hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.10)] dark:hover:border-blue-800 dark:hover:shadow-[0_18px_45px_rgba(0,0,0,0.32)]' : ''} ${className}`}
      {...props}
    />
  );
}
