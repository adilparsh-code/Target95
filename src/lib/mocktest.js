import questions from "../app/data/questions";

const VALID_CHAPTERS = new Set(["all", "introduction", "variables-data-types", "operators", "if-else", "loops", "methods", "arrays", "strings", "constructor"]);
const VALID_DIFFICULTIES = new Set(["all", "easy", "medium", "hard"]);
const VALID_TYPES = new Set(["mixed", "theory", "mcq"]);
const VALID_STATUSES = new Set(["Not Started", "Studying", "Completed"]);

export function normalizeMockText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function sanitizeText(value) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim();
}

export function getMockTestQuestionPool({ chapter, difficulty, type }) {
  const safeChapter = VALID_CHAPTERS.has(chapter) ? chapter : "all";
  const safeDifficulty = VALID_DIFFICULTIES.has(difficulty) ? difficulty : "all";
  const safeType = VALID_TYPES.has(type) ? type : "mixed";

  return questions.filter((question) => {
    const matchesChapter = safeChapter === "all" || question.chapter === safeChapter;
    const matchesDifficulty =
      safeDifficulty === "all" ||
      normalizeMockText(question.difficulty).join("") === normalizeMockText(safeDifficulty).join("");
    const matchesType =
      safeType === "mixed" ||
      question.type.toLowerCase() === safeType ||
      (safeType === "theory" && question.type.toLowerCase() === "theory") ||
      (safeType === "mcq" && question.type.toLowerCase() === "mcq");

    return matchesChapter && matchesDifficulty && matchesType;
  });
}

export function generateMockTestQuestions({ chapter, difficulty, type, count }) {
  const pool = getMockTestQuestionPool({ chapter, difficulty, type });
  const safeCount = Math.min(Math.max(Number(count) || 5, 1), pool.length || 1);

  if (pool.length === 0) {
    return [];
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, safeCount);
}

export function calculateMockTestResult(questions, answers, markedForReview) {
  let correctCount = 0;
  let wrongCount = 0;
  let reviewedCount = 0;

  const review = questions.map((question) => {
    const response = answers[question.id];
    const safeResponse = sanitizeText(response ?? "");
    const isMarkedForReview = Boolean(markedForReview[question.id]);
    let isCorrect = false;

    if (question.type.toLowerCase() === "mcq") {
      isCorrect = safeResponse === sanitizeText(question.answer);
    } else {
      const normalizedInput = normalizeMockText(safeResponse);
      const normalizedAnswer = normalizeMockText(question.answer);

      if (normalizedInput.length === 0) {
        isCorrect = false;
      } else {
        const overlap = normalizedAnswer.filter((token) => normalizedInput.includes(token));
        isCorrect = overlap.length > 0;
      }
    }

    if (isCorrect) {
      correctCount += 1;
    } else {
      wrongCount += 1;
    }

    if (isMarkedForReview) {
      reviewedCount += 1;
    }

    return {
      question,
      response: safeResponse,
      isCorrect,
      isMarkedForReview,
      correctAnswer: sanitizeText(question.answer),
      selectedOption: question.type.toLowerCase() === "mcq" ? safeResponse : null,
    };
  });

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return {
    score: correctCount,
    totalQuestions,
    correctCount,
    wrongCount,
    reviewedCount,
    percentage,
    accuracy,
    review,
  };
}

export function formatTime(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function getMockTestTitle(config) {
  const safeConfig = config ?? {};
  const chapterLabel = safeConfig.chapter === "all" ? "All Chapters" : sanitizeText(safeConfig.chapter || "All Chapters");
  const difficultyLabel = safeConfig.difficulty === "all" ? "Mixed Difficulty" : sanitizeText(safeConfig.difficulty || "Mixed Difficulty");
  const typeLabel = safeConfig.type === "mixed" ? "Mixed Types" : sanitizeText(safeConfig.type || "Mixed Types");

  return `${chapterLabel} • ${difficultyLabel} • ${typeLabel}`;
}

export function sanitizeStudyStatus(value) {
  const safeValue = sanitizeText(value);
  return VALID_STATUSES.has(safeValue) ? safeValue : "Not Started";
}
