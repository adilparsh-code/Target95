import { needsContextReply, reply, truncate } from '../core/response-formatter.mjs';
import { MIN_QUIZ_QUESTIONS, normaliseQuizSize, pickQuestions, toClientQuestions } from '../core/quiz-engine.mjs';
import { createAttempt, submitAttempt } from '../state/quiz-store.mjs';

export async function handleQuiz({ args, context, uid, deps }) {
  const verified = deps.boardprep.verifyContext(context);
  if (!verified.ok || !verified.context.subjectSlug) return needsContextReply();
  if (!args.topic) return reply('follow_up', 'Which chapter? Send CHAPTERS, then QUIZ <chapter> (add 5 or 10 for the length).');
  if (args.count !== null && args.count !== undefined && ![5, 10].includes(args.count)) {
    return reply('follow_up', 'Quizzes have 5 or 10 questions. Try QUIZ <chapter> 5 or QUIZ <chapter> 10.');
  }

  const found = deps.boardprep.findChapter(verified.context, args.topic);
  if (found.status === 'none') return reply('info', `I could not find a published chapter matching "${truncate(args.topic, 60)}".`);
  if (found.status === 'ambiguous') {
    return reply('follow_up', `That matches several chapters:\n${found.matches.map((c) => `• ${c.title}`).join('\n')}\nPlease be more specific.`);
  }
  const slug = found.matches[0].slug;
  const loaded = deps.boardprep.loadChapter(verified.context, slug);
  if (!loaded.ok) return reply('info', 'That chapter is not available right now.', { code: loaded.code });

  const mcqs = deps.boardprep.getMcqs(loaded.chapter);
  if (mcqs.length < MIN_QUIZ_QUESTIONS) {
    return reply('info', `"${loaded.chapter.title}" has only ${mcqs.length} validated multiple-choice question(s) — not enough for a quiz. I will not make questions up.`);
  }
  const size = normaliseQuizSize(args.count ?? undefined);
  const picked = pickQuestions(mcqs, size, deps.rng);
  const { attemptId, expiresAtMs } = await createAttempt({
    db: deps.db, uid, context: verified.context, chapterSlug: slug, questionIds: picked.map((q) => String(q.id)), now: deps.now(),
  });
  const shortNote = picked.length < size ? ` Only ${picked.length} validated questions exist for this chapter, so the quiz is shorter than ${size}.` : '';
  return reply('quiz', `Quiz: ${loaded.chapter.title} — ${picked.length} questions.${shortNote} Choose one answer for each, then submit.`, {
    card: { type: 'quiz', attemptId, expiresAtMs, chapterTitle: loaded.chapter.title, questions: toClientQuestions(picked) },
  });
}

// Rebuilds the issued questions, in issued order, from published content.
export function makeQuestionLoader(boardprep) {
  return async (attempt) => {
    const loaded = boardprep.loadChapter(attempt, attempt.chapterSlug);
    if (!loaded.ok) return null;
    const byId = new Map(boardprep.getMcqs(loaded.chapter).map((q) => [String(q.id), q]));
    const questions = attempt.questionIds.map((id) => byId.get(id));
    return questions.every(Boolean) ? questions : null;
  };
}

export function submitQuizAttempt({ deps, uid, attemptId, answers }) {
  return submitAttempt({ db: deps.db, uid, attemptId, answers, loadQuestions: makeQuestionLoader(deps.boardprep), now: deps.now() });
}
