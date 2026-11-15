import { LIMITS } from '../config/commands.mjs';

export const MIN_QUIZ_QUESTIONS = 3;

// Fisher–Yates with an injectable rng so tests are deterministic.
export function shuffle(items, rng = Math.random) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function normaliseQuizSize(count) {
  return LIMITS.quizSizes.includes(count) ? count : LIMITS.defaultQuizSize;
}

// Picks up to `count` questions. If the chapter has fewer validated MCQs than
// requested the quiz is shorter (and says so) rather than padded with anything.
export function pickQuestions(mcqs, count, rng = Math.random) {
  const unique = [...new Map(mcqs.map((q) => [String(q.id), q])).values()];
  return shuffle(unique, rng).slice(0, normaliseQuizSize(count));
}

// The ONLY shape that ever goes to the client before submission: no
// correctIndex, answer, explanation or commonMistake.
export function toClientQuestions(questions) {
  return questions.map((q) => ({ id: String(q.id), prompt: q.prompt, options: [...q.options] }));
}

// Pure, server-side evaluation. `answers` maps question id -> option index.
export function gradeQuiz(questions, answers) {
  const byId = new Map(questions.map((q) => [String(q.id), q]));
  for (const id of Object.keys(answers)) {
    if (!byId.has(id)) return { ok: false, code: 'unknown_question' };
  }
  const review = questions.map((q) => {
    const id = String(q.id);
    const selected = Object.hasOwn(answers, id) ? answers[id] : null;
    const valid = Number.isInteger(selected) && selected >= 0 && selected < q.options.length;
    return {
      id,
      prompt: q.prompt,
      selectedIndex: valid ? selected : null,
      correctIndex: q.correctIndex,
      correct: valid && selected === q.correctIndex,
      explanation: q.explanation || '',
    };
  });
  const bad = Object.entries(answers).some(([id, v]) => {
    const q = byId.get(id);
    return !Number.isInteger(v) || v < 0 || v >= q.options.length;
  });
  if (bad) return { ok: false, code: 'option_out_of_range' };
  const correctCount = review.filter((r) => r.correct).length;
  const total = questions.length;
  return {
    ok: true,
    total,
    correctCount,
    unanswered: review.filter((r) => r.selectedIndex === null).length,
    percentage: total ? Math.round((correctCount / total) * 100) : 0,
    review,
  };
}
