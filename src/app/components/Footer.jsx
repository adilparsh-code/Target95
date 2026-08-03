import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-black/80 backdrop-blur-sm overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/[0.05] via-transparent to-purple-900/[0.05] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand and Tagline */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-3xl font-bold tracking-tight">🎯 Target95</h2>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              AI Powered Learning Platform for ICSE & ISC Computer Science
              Students.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              From the Heart of the Three Rivers{" "}
              <span
                className="inline-block text-red-500"
                aria-label="love"
                role="img"
              >
                ❤️
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold tracking-wider uppercase text-gray-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Study", href: "/study" },
                { label: "Practice", href: "/java" },
                { label: "Mock Tests", href: "/mock-test" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold tracking-wider uppercase text-gray-300">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Question Bank", href: "/question-bank" },
                { label: "Daily Challenge", href: "/daily-challenge" },
                { label: "Rewards", href: "/rewards" },
                { label: "Dashboard", href: "/dashboard" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact and Social */}
          <div>
            <h3 className="text-lg font-semibold tracking-wider uppercase text-gray-300">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:support@target95.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                >
                  support@target95.com
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <h3 className="text-lg font-semibold tracking-wider uppercase text-gray-300">
                Social Media
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  { platform: "Facebook", href: "https://facebook.com/target95" },
                  { platform: "Twitter", href: "https://twitter.com/target95" },
                  { platform: "Instagram", href: "https://instagram.com/target95" },
                  { platform: "LinkedIn", href: "https://linkedin.com/company/target95" },
                ].map((item) => (
                  <li key={item.platform}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.platform}
                      className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                    >
                      {item.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; 2026 Target95. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
