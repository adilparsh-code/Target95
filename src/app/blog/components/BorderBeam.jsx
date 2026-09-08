export default function BorderBeam({ className = "" }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] ${className}`}>
      <span className="absolute -inset-[1px] rounded-[inherit] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#60a5fa_330deg,#a78bfa_350deg,transparent_360deg)] opacity-70 animate-spin" />
      <span className="absolute inset-px rounded-[inherit] bg-inherit" />
    </span>
  );
}
