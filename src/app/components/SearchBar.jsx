"use client";

export default function SearchBar({ search, setSearch }) {
  return (

    
    <div className="mt-8 mb-8">
      <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="🔍 Search: loop, array, Question 5, easy, mcq..."
  className="w-full rounded-xl border-2 border-gray-300 bg-white p-4 text-gray-900 font-medium placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
/>

      <p className="mt-2 text-sm text-gray-500">
  Example: <span className="font-semibold">loop</span>,
  <span className="font-semibold"> array</span>,
  <span className="font-semibold"> Question 5</span>,
  <span className="font-semibold"> easy</span>,
  <span className="font-semibold"> mcq</span>
</p>
    </div>
  );
}