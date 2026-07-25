export default function ProgressBar({ current, total }) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="mt-8">
      <p className="text-center text-lg font-semibold text-primary mb-4">
        Progress: {current} of {total} Questions
      </p>

      <div
        className="w-full bg-muted rounded-full h-4"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Progress: ${current} of ${total} questions completed`}
      >
        <div
          className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}