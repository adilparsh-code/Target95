export default function SectionTitle({ title, subtitle, className, ...props }) {
  return (
    <div className={`mb-8 ${className}`} {...props}>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
      {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
    </div>
  );
}