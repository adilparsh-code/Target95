"use client";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mt-8 mb-8">
      <input
        type="text"
        placeholder="🔍 Search questions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-xl border-2 border-gray-300 focus:border-blue-600 outline-none text-lg"
      />
    </div>
  );
}