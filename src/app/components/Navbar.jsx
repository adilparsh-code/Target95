import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <h1 className="text-3xl font-bold text-blue-600">🎯 Target95+</h1>

        <div className="flex gap-8 font-medium text-gray-700">
          <Link href="/" className="transition hover:text-blue-600">
            Home
          </Link>

          <Link href="/dashboard" className="transition hover:text-blue-600">
            Dashboard
          </Link>

          <a href="#" className="transition hover:text-blue-600">
            PYQs
          </a>

          <Link href="/mock-test" className="transition hover:text-blue-600">
            Mock Test
          </Link>

          <Link href="/study" className="transition hover:text-blue-600">
            Study
          </Link>

          <a href="#" className="transition hover:text-blue-600">
            Practice
          </a>
        </div>

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
          Login
        </button>
      </div>
    </nav>
  );
}