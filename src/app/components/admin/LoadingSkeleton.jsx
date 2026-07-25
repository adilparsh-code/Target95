export default function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 animate-pulse">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mt-1"></div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-gray-500 my-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="h-8 w-28 bg-gray-200 rounded"></div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-28 bg-gray-200 rounded"></div>
            <div className="h-8 w-36 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}