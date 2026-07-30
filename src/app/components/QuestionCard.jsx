export default function QuestionCard({ question }) {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm transition-all duration-200 hover:shadow-md">
      <p className="text-lg font-semibold leading-relaxed text-gray-900 dark:text-gray-100 sm:text-2xl">
        {question}
      </p>
    </div>
  );
}