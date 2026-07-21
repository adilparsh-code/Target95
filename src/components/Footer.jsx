import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/java", label: "Practice" },
  { href: "/mock-test", label: "Mock Tests" },
  { href: "/dashboard", label: "Dashboard" },
];

const subjects = [
  { href: "/java", label: "Java" },
  { href: "/java/arrays", label: "Arrays" },
  { href: "/java/strings", label: "Strings" },
  { href: "/java/number-system", label: "Number System" },
  { href: "/java/boolean-algebra", label: "Boolean Algebra" },
];

const resources = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

const socials = [
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.505 2.505 0 011.768-1.768C5.746 5 12 5 12 5s6.255 0 7.812.418z" clipRule="evenodd" />
        <path d="M9.75 15.02l5.25-3.02-5.25-3.02v6.04z" />
      </svg>
    ),
  },
];

const linkHoverClass =
  "text-gray-400 transition-all duration-300 hover:text-blue-400 hover:translate-x-0.5";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-950 overflow-hidden">
      {/* Glassmorphism gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.02] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {/* Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* ---- Brand Section ---- */}
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-block text-3xl font-bold tracking-tight text-white transition-opacity duration-300 hover:opacity-80"
            >
              🎯 Target95
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              AI Powered Learning Platform for ICSE & ISC Computer Science
              Students.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full bg-white/[0.05] p-2.5 text-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-400 hover:scale-110"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ---- Quick Links ---- */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-200">
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkHoverClass + " inline-block text-sm"}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Subjects ---- */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-200">
              Subjects
            </h3>
            <ul className="space-y-3.5">
              {subjects.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className={linkHoverClass + " inline-block text-sm"}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Resources ---- */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-200">
              Resources
            </h3>
            <ul className="space-y-3.5">
              {resources.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className={linkHoverClass + " inline-block text-sm"}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Bottom Bar ---- */}
        <div className="relative mt-16 border-t border-gray-800 pt-8">
          {/* Subtle glow line */}
          <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

          <p className="text-center text-sm leading-relaxed text-gray-500">
            &copy; {year} Target95. Built with{" "}
            <span className="inline-block text-red-500 animate-pulse" aria-label="love">
              ❤️
            </span>{" "}
            using Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}