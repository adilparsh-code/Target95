export default function ProgressBar({ current, total }) {

  const percentage = (current / total) * 100;

  return (

    <div className="mt-8">

      <p className="text-center text-lg font-semibold text-blue-700 mb-4">
        Progress : {current} of {total} Questions
      </p>

      <div className="w-full bg-gray-200 rounded-full h-4">

        <div
          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-4 rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        ></div>

      </div>

    </div>

  );
}