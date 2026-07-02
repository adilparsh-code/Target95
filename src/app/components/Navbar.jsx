export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <h1 className="text-3xl font-bold text-blue-600">
          🎯 Target95+
        </h1>

        <div className="flex gap-8 text-gray-700 font-medium">

          <a href="#" className="hover:text-blue-600 transition">
            Home
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            PYQs
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            Practice
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            Mock Test
          </a>

        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          Login
        </button>

      </div>

    </nav>
  );
}