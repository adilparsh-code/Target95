export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-950 overflow-hidden">
      {/* Glassmorphism gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.02] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {/* Brand */}
          <div className="text-3xl font-bold tracking-tight text-white">
            🎯 Target95
          </div>

          {/* Tagline */}
          <p className="text-sm leading-relaxed text-gray-400 max-w-md">
            AI Powered Learning Platform for ICSE & ISC Computer Science Students.
          </p>

          {/* Heart */}
          <p className="text-sm text-gray-500">
            From the Heart of the Three Rivers{" "}
            <span className="inline-block text-red-500" aria-label="love">
              ❤️
            </span>
          </p>

          {/* Copyright */}
          <div className="pt-4 border-t border-gray-800 w-full max-w-xs">
            <p className="text-sm text-gray-500">
              &copy; {year} Target95
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}