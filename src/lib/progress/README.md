# Student Learning Progress System

A comprehensive, reusable progress tracking system for the Target95 learning platform.

## Features

### 1. Learning Progress Tracking
- Total Questions Solved
- Correct/Wrong Answers
- Accuracy Percentage
- Total Study Time
- Chapters Completed
- Current Streak & Best Streak
- Last Activity Timestamp

### 2. Chapter Progress
- Status: Not Started / In Progress / Completed
- Progress Percentage
- Questions Solved per Chapter
- Chapter-level Accuracy
- Study Time per Chapter

### 3. Recently Studied
- Last Visited Chapter
- Last Visited Question
- Resume Learning functionality
- Total Visits counter

### 4. Continue Learning Helpers
- Get Next Question
- Get Next Chapter
- Get Resume Position
- Get Learning Path
- Study Recommendations

### 5. Achievement Engine
- First Question (≥1 solved)
- 10 Questions (≥10 solved)
- 50 Questions (≥50 solved)
- 100 Questions (≥100 solved)
- 95% Accuracy (≥95% with ≥10 questions)
- 7-Day Streak (≥7 consecutive days)

### 6. Utility Functions
All pure functions for easy testing and reuse:
- `calculateAccuracy()`
- `calculateProgress()`
- `calculateCompletion()`
- `getNextQuestion()`
- `getNextChapter()`
- `getResumeData()`
- `formatStudyTime()`
- `calculateStreak()`

### 7. Local Persistence
- localStorage-based storage
- Firebase-ready architecture
- Easy migration path

## Architecture

```
src/lib/progress/
├── models.js          # Data models and schemas
├── utils.js           # Pure utility functions
├── achievements.js    # Achievement engine logic
├── storage.js         # Persistence layer (localStorage)
├── continueLearning.js # Continue learning helpers
└── index.js           # Main export file

src/hooks/
├── useProgressTracker.js   # Unified progress tracking
├── useChapterProgress.js   # Chapter-level progress
└── useRecentlyStudied.js   # Recently studied tracking
```

## Usage

### Basic Usage

```javascript
import useProgressTracker from "@/hooks/useProgressTracker";

function MyComponent() {
  const {
    stats,
    recordQuestionAttempt,
    completeChapter,
    achievements,
    resumeData
  } = useProgressTracker();

  // Record a question attempt
  const handleQuestionComplete = (isCorrect) => {
    recordQuestionAttempt(isCorrect, 2); // 2 minutes study time
  };

  return (
    <div>
      <p>Questions Solved: {stats.totalQuestionsSolved}</p>
      <p>Accuracy: {stats.accuracy}%</p>
      <p>Current Streak: {stats.currentStreak} days</p>
    </div>
  );
}
```

### Chapter Progress

```javascript
import useChapterProgress from "@/hooks/useChapterProgress";

function ChapterPage({ userId, chapterId }) {
  const {
    status,
    progressPercentage,
    recordQuestion,
    complete
  } = useChapterProgress(userId, chapterId);

  const handleQuestionAnswer = (isCorrect) => {
    recordQuestion(isCorrect, 2);
  };

  return (
    <div>
      <p>Status: {status}</p>
      <p>Progress: {progressPercentage}%</p>
    </div>
  );
}
```

### Recently Studied

```javascript
import useRecentlyStudied from "@/hooks/useRecentlyStudied";

function ResumeButton() {
  const { resumeData, recordChapterVisit } = useRecentlyStudied();

  if (!resumeData.hasResumeData) {
    return <p>No recent activity</p>;
  }

  return (
    <Link href={`/java/${resumeData.chapterId}`}>
      Resume {resumeData.chapterName}
    </Link>
  );
}
```

### Achievement Engine

```javascript
import { checkAchievements, getNextAchievement } from "@/lib/progress";

const stats = {
  totalQuestionsSolved: 15,
  correctAnswers: 14,
  accuracy: 93,
  currentStreak: 7,
};

const achievements = checkAchievements(stats);
const nextAchievement = getNextAchievement(stats);
```

### Utility Functions

```javascript
import {
  calculateAccuracy,
  calculateProgress,
  getNextQuestion,
  getResumeData
} from "@/lib/progress";

// Calculate accuracy
const accuracy = calculateAccuracy(8, 10); // 80

// Calculate progress
const progress = calculateProgress(5, 10); // 50

// Get next question
const nextQuestion = getNextQuestion(chapterProgress, questions);

// Get resume data
const resume = getResumeData(recentlyStudied);
```

## Data Models

### LearningProgress
```javascript
{
  userId: string,
  totalQuestionsSolved: number,
  correctAnswers: number,
  wrongAnswers: number,
  accuracy: number,
  totalStudyTime: number, // minutes
  chaptersCompleted: number,
  currentStreak: number,
  bestStreak: number,
  lastActivity: string | null
}
```

### ChapterProgress
```javascript
{
  userId: string,
  chapterId: string,
  subjectId: string,
  status: "not_started" | "in_progress" | "completed",
  questionsSolved: number,
  correctAnswers: number,
  totalQuestions: number,
  accuracy: number,
  studyTime: number,
  lastVisited: string | null,
  completedAt: string | null
}
```

### RecentlyStudied
```javascript
{
  userId: string,
  lastChapterId: string | null,
  lastChapterName: string | null,
  lastQuestionId: string | null,
  lastQuestionTitle: string | null,
  lastSubjectId: string | null,
  lastActivity: string | null,
  totalVisits: number
}
```

## Firebase Migration

The system is designed for easy Firebase integration. To migrate from localStorage to Firebase:

1. Update `src/lib/progress/storage.js`:
   - Replace localStorage calls with Firebase Firestore calls
   - Use existing `ProgressService` from `src/lib/firestore/database.js`

2. The hook API remains unchanged:
   ```javascript
   // No changes needed in hooks
   const { recordQuestionAttempt } = useProgressTracker();
   ```

3. Update storage methods to use Firebase:
   ```javascript
   // Example Firebase implementation
   async saveLearningProgress(userId, progress) {
     await ProgressService.create({
       ...progress,
       userId,
     });
   }
   ```

## Integration with Existing System

The new progress system is designed to work alongside the existing system:

- **useProgressTracker**: Unified hook that can replace/extend existing progress tracking
- **Backward Compatible**: Doesn't modify existing hooks or components
- **Non-Intrusive**: Can be adopted incrementally

## Testing

All utility functions are pure and easily testable:

```javascript
import { calculateAccuracy, calculateProgress } from "@/lib/progress";

// Test calculateAccuracy
console.assert(calculateAccuracy(8, 10) === 80);
console.assert(calculateAccuracy(0, 0) === 0);
console.assert(calculateAccuracy(10, 10) === 100);

// Test calculateProgress
console.assert(calculateProgress(5, 10) === 50);
console.assert(calculateProgress(0, 10) === 0);
console.assert(calculateProgress(10, 10) === 100);
```

## Performance Considerations

- **localStorage**: Fast for small datasets, synchronous
- **React State**: Optimized with useMemo and useCallback
- **No Re-renders**: Computed values cached with useMemo
- **Memory Efficient**: Only loads data when user is authenticated

## Future Enhancements

- Firebase integration for multi-device sync
- Analytics and insights
- Social features (leaderboards, sharing)
- Advanced achievement system
- Learning path recommendations
- Study time tracking with Pomodoro integration

## Notes

- All functions are pure where possible
- No side effects in utility functions
- Storage abstraction allows easy backend swaps
- Hooks follow React best practices
- Fully typed with JSDoc comments