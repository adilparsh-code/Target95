"use client";

import Button from "../ui/Button";

export default function QuestionNavigator({ 
  currentIndex, 
  totalQuestions, 
  onPrevious, 
  onNext, 
  onSubmit,
  canSubmit = false,
  isLastQuestion = false
}) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
      <Button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        variant="secondary"
        className="flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </Button>

      <div className="flex gap-3">
        {!isLastQuestion ? (
          <Button
            onClick={onNext}
            disabled={currentIndex === totalQuestions - 1}
            variant="primary"
            className="flex items-center gap-2"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            variant="success"
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Submit All
          </Button>
        )}
      </div>
    </div>
  );
}