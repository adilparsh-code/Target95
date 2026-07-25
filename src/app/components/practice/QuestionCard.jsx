"use client";

import Card from "../ui/Card";
import Button from "../ui/Button";
import DifficultyBadge from "../DifficultyBadge";

export default function QuestionCard({ 
  question, 
  selectedAnswer, 
  onSelectAnswer,
  onSubmit,
  isSubmitted = false,
  showFeedback = false
}) {
  if (!question) return null;

  const isCorrect = selectedAnswer === question.correctAnswer;
  const hasAnswered = selectedAnswer !== null;

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 md:p-8">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {question.question}
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <DifficultyBadge difficulty={question.difficulty} />
            {question.chapter && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {question.chapter}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === question.correctAnswer;
          
          let optionClasses = "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-600";
          
          if (showFeedback && isCorrectOption) {
            optionClasses = "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-500";
          } else if (showFeedback && isSelected && !isCorrectOption) {
            optionClasses = "border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500";
          } else if (isSelected) {
            optionClasses = "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500";
          }

          return (
            <button
              key={index}
              onClick={() => !showFeedback && onSelectAnswer(option)}
              disabled={showFeedback}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${optionClasses}
                disabled:cursor-default
              `}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-800 dark:text-gray-200">{option}</span>
                {showFeedback && isCorrectOption && (
                  <svg className="w-5 h-5 text-green-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {showFeedback && isSelected && !isCorrectOption && (
                  <svg className="w-5 h-5 text-red-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback section - shown after submission */}
      {showFeedback && (
        <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-400">Correct!</h4>
                  <p className="text-green-700 dark:text-green-300 text-sm mt-1">Great job! You got it right.</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-400">Incorrect</h4>
                  <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                    The correct answer is: <strong>{question.correctAnswer}</strong>
                  </p>
                </div>
              </>
            )}
          </div>
          
          {/* Explanation */}
          {question.explanation && (
            <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Explanation:</h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{question.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      {!showFeedback && (
        <Button
          onClick={onSubmit}
          disabled={!hasAnswered}
          variant="primary"
          className="w-full"
        >
          Submit Answer
        </Button>
      )}
    </Card>
  );
}