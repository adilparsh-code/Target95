"use client";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mt-6 mb-6">
      <label className="mb-2 block text-sm font-semibold text-gray-900" htmlFor="question-search">
        Search questions
      </label>
      <input
        id="question-search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Try: loop, array, Question 5, easy, mcq"
        className="w-full rounded-xl border border-gray-300 bg-white p-4 text-gray-900 font-medium placeholder:text-gray-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />

      <p className="mt-2 text-sm text-gray-900">
        Example: <span className="font-semibold">loop</span>,
        <span className="font-semibold"> array</span>,
        <span className="font-semibold"> Question 5</span>,
        <span className="font-semibold"> easy</span>,
        <span className="font-semibold"> mcq</span>
      </p>
    </div>
  );
}