import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Study", href: "/study" },
  { label: "Practice", href: "/practice/setup" },
  { label: "Mock Tests", href: "/mock-test" },
];

const resources = [
  { label: "Question Bank", href: "/question-bank" },
  { label: "Daily Challenge", href: "/daily-challenge" },
  { label: "Rewards", href: "/rewards" },
  { label: "Dashboard", href: "/dashboard" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { platform: "Facebook", href: "https://facebook.com/target95" },
  { platform: "Twitter", href: "https://twitter.com/target95" },
  { platform: "Instagram", href: "https://instagram.com/target95" },
  { platform: "LinkedIn", href: "https://linkedin.com/company/target95" },
];

function LinkColumn({ title, items }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="group inline-flex items-center text-sm text-slate-400 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 rounded-md"
            >
              <span className="mr-0 w-0 overflow-hidden transition-all duration-200 group-hover:mr-2 group-hover:w-1.5">›</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-white">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/70">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-xl shadow-lg shadow-blue-950/40">🎯</span>
              <span className="text-2xl font-extrabold tracking-tight">Target95<span className="text-blue-400">+</span></span>
            </Link>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              AI-powered learning and exam preparation for ICSE, ISC and CBSE Computer Science students.
            </p>
            <p className="mt-4 inline-flex rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-400">
              Built with care from the Heart of the Three Rivers ❤️
            </p>
          </div>

          <LinkColumn title="Quick Links" items={quickLinks} />
          <LinkColumn title="Resources" items={resources} />
          <LinkColumn title="Company" items={legalLinks} />

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">Contact</h3>
            <a
              href="mailto:support@target95.com"
              className="mt-5 inline-block text-sm text-slate-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 rounded-md"
            >
              support@target95.com
            </a>
            <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-slate-300">Follow us</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.platform}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.platform}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-400 transition-all hover:-translate-y-0.5 hover:border-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                >
                  {item.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-slate-800 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Target95+. All rights reserved.</p>
          <p>Learn smarter. Practice better. Target 95+.</p>
        </div>
      </div>
    </footer>
  );
}
