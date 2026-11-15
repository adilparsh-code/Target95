// Single source of truth for bot limits and the command catalogue.
export const LIMITS = Object.freeze({
  maxMessageChars: 500,
  maxBodyBytes: 4096,
  quizSizes: [5, 10],
  defaultQuizSize: 5,
  quizTtlMs: 60 * 60 * 1000,
  rateLimitPerMinute: 20,
  rateLimitPerHour: 200,
  maxListItems: 40,
});

export const INTENTS = Object.freeze({
  HELP: 'help',
  SUBJECTS: 'subjects',
  CHAPTERS: 'chapters',
  SET_CONTEXT: 'set_context',
  EXPLAIN: 'explain',
  QUIZ: 'quiz',
  PRACTICE: 'practice',
  HINT: 'hint',
  SOLUTION: 'solution',
  PROGRESS: 'progress',
  REVISION: 'revision',
  UNKNOWN: 'unknown',
});

// Shown by HELP and as quick actions in the UI.
export const COMMAND_HELP = Object.freeze([
  { command: 'HELP', description: 'Show what I can do' },
  { command: 'SET icse class 10 physics', description: 'Choose board, class and subject' },
  { command: 'SUBJECTS', description: 'List subjects for your class' },
  { command: 'CHAPTERS', description: 'List published chapters' },
  { command: 'EXPLAIN [chapter]', description: 'Read a chapter summary' },
  { command: 'QUIZ [chapter] [5|10]', description: 'Take a chapter quiz' },
  { command: 'PRACTICE [topic]', description: 'Java practice problems' },
  { command: 'MY PROGRESS', description: 'Your saved mock test and quiz results' },
  { command: 'REVISION', description: 'Chapters to revisit, from your own results' },
]);
