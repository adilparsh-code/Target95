export default function ScheduleCard({ test }) {
  const scheduledDate = new Date(test.scheduledDate);
  const now = new Date();
  const daysUntil = Math.ceil((scheduledDate - now) / (1000 * 60 * 60 * 24));
  const isPast = scheduledDate < now;
  const isToday = scheduledDate.toDateString() === now.toDateString();

  const getStatusInfo = () => {
    if (isToday) return { label: "Today", color: "bg-blue-50 text-blue-700 border-blue-200" };
    if (isPast) return { label: "Past", color: "bg-gray-50 text-gray-500 border-gray-200" };
    if (daysUntil <= 3) return { label: `${daysUntil} day${daysUntil > 1 ? 's' : ''} left`, color: "bg-amber-50 text-amber-700 border-amber-200" };
    return { label: `${daysUntil} days left`, color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  };

  const statusInfo = getStatusInfo();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Schedule</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Date</span>
          <span className="text-sm font-medium text-gray-900">{formatDate(test.scheduledDate)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Duration</span>
          <span className="text-sm font-medium text-gray-900">{test.duration} {test.durationUnit === "min" ? "minutes" : "hours"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Questions</span>
          <span className="text-sm font-medium text-gray-900">{test.questions}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Max Marks</span>
          <span className="text-sm font-medium text-gray-900">{test.maxMarks}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Passing Score</span>
          <span className="text-sm font-medium text-gray-900">{test.passingScore}</span>
        </div>

        <div className={`mt-3 px-3 py-2 rounded-lg border text-xs font-medium text-center ${statusInfo.color}`}>
          {statusInfo.label}
        </div>
      </div>
    </div>
  );
}