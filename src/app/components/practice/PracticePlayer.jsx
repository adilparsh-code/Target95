"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import QuestionNavigator from "./QuestionNavigator";
import Button from "../ui/Button";
import { useSession } from "../../hooks/useSession";

export default function PracticePlayer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // In a real implementation, we would fetch the session from the backend using sessionId
  // For now, we'll create mock data to demonstrate the component
  const mockSession = {
    id: sessionId,
    subject: "java",
    chapter: "variables",
    difficulty: "mixed",
    questionCount: 10,
    hasTimer: true,
    duration: 30,
    questions: [
      {
        id: "1",
        question: "Which of the following is a valid Java variable name?",
        options: ["123variable", "variable123", "var-iable", "variable name"],
        correctAnswer: "variable123",
        difficulty: "Easy",
        chapter: "Variables & Data Types",
        explanation: "Java variable names must start with a letter, $, or _, and can only contain letters, digits, $, and _. They cannot start with a digit or contain spaces or special characters like hyphens."
      },
      {
        id: "2",
        question: "What is the size of an int in Java?",
        options: ["8 bytes", "4 bytes", "2 bytes", "1 byte"],
        correctAnswer: "4 bytes",
        difficulty: "Easy",
        chapter: "Variables & Data Types",
        explanation: "In Java, an int is a 32-bit signed integer, which uses 4 bytes of memory. This is consistent across all platforms that support Java."
      },
      {
        id: "3",
        question: "Which of these is not a primitive data type in Java?",
        options: ["boolean", "char", "String", "byte"],
        correctAnswer: "String",
        difficulty: "Medium",
        chapter: "Variables & Data Types",
        explanation: "String is an object type, not a primitive. The 8 primitive types in Java are: byte, short, int, long, float, double, boolean, and char."
      },
      {
        id: "4",
        question: "What is the default value of a boolean instance variable in Java?",
        options: ["true", "false", "null", "0"],
        correctAnswer: "false",
        difficulty: "Medium",
        chapter: "Variables & Data Types",
        explanation: "Instance variables (class members) are initialized to default values. For boolean, the default value is false. Local variables, however, are not initialized and must be set before use."
      },
      {
        id: "5",
        question: "Which keyword is used to define a constant variable in Java?",
        options: ["constant", "static", "final", "immutable"],
        correctAnswer: "final",
        difficulty: "Medium",
        chapter: "Variables & Data Types",
        explanation: "The 'final' keyword is used to create constants. Once a final variable is assigned a value, it cannot be changed. This is commonly used for values that should remain constant throughout the program execution."
      }
    ]
  };

  const {
    session,
    currentQuestion,
    currentIndex,
    loading,
    error,
    isComplete,
    progress,
    timeRemaining,
    nextQuestion,
    previousQuestion,
    submitAnswer,
    toggleFlag,
    completeSession,
    flaggedQuestions
  } = useSession(mockSession);

  const isLastQuestion = currentIndex === (session?.questions?.length || 0) - 1;
  const isLowTime = session?.hasTimer && parseInt(timeRemaining.split(':')[0]) < 5;

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !currentQuestion) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    await submitAnswer(currentQuestion.id, selectedAnswer, isCorrect);
    setShowFeedback(true);
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleCompleteSession();
    } else {
      nextQuestion();
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsSubmitted(false);
    }
  };

  const handleCompleteSession = async () => {
    try {
      await completeSession();
      router.push("/practice/result");
    } catch (err) {
      console.error("Failed to complete session:", err);
    }
  };

  const isFlagged = currentQuestion && flaggedQuestions.includes(currentQuestion.id);

  if (loading && !session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
          <Button onClick={() => router.push("/practice/setup")} variant="secondary" className="mt-4">
            Go Back to Setup
          </Button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => router.push("/practice")} 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Exit
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Practice Session</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{session?.subject} • {session?.chapter}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={toggleFlag}
              variant={isFlagged ? "warning" : "secondary"}
              size="sm"
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill={isFlagged ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {isFlagged ? "Flagged" : "Flag"}
            </Button>
            {session?.hasTimer && (
              <Timer timeRemaining={timeRemaining} isLow={isLowTime} />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <ProgressBar 
            progress={progress} 
            current={currentIndex + 1} 
            total={session?.questions?.length || 0} 
          />
        </div>

        {/* Question Display */}
        <div className="mb-6">
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
            onSubmit={handleSubmitAnswer}
            isSubmitted={isSubmitted}
            showFeedback={showFeedback}
          />
        </div>

        {/* Navigation */}
        {showFeedback && (
          <div className="max-w-4xl mx-auto">
            <QuestionNavigator
              currentIndex={currentIndex}
              totalQuestions={session?.questions?.length || 0}
              onPrevious={() => {
                previousQuestion();
                setSelectedAnswer(null);
                setShowFeedback(false);
                setIsSubmitted(false);
              }}
              onNext={handleNextQuestion}
              onSubmit={handleCompleteSession}
              canSubmit={true}
              isLastQuestion={isLastQuestion}
            />
          </div>
        )}
      </main>
    </div>
  );
}