import { LIMITS } from '../config/commands.mjs';
import { gradeQuiz } from '../core/quiz-engine.mjs';

// Server-controlled quiz attempts at users/{uid}/botQuizAttempts/{attemptId}.
// The document records which questions were issued, never an answer key; the
// key is re-read from published BoardPrep content at grading time. Client
// access is denied by firestore.rules (Admin SDK only).
const attemptsOf = (db, uid) => db.collection('users').doc(uid).collection('botQuizAttempts');

export async function createAttempt({ db, uid, context, chapterSlug, questionIds, now = Date.now() }) {
  const ref = attemptsOf(db, uid).doc();
  await ref.set({
    userId: uid,
    board: context.board,
    classSlug: context.classSlug,
    subjectSlug: context.subjectSlug,
    chapterSlug,
    questionIds,
    total: questionIds.length,
    status: 'in_progress',
    createdAtMs: now,
    expiresAtMs: now + LIMITS.quizTtlMs,
  });
  return { attemptId: ref.id, expiresAtMs: now + LIMITS.quizTtlMs };
}

// Another student's attempt id is indistinguishable from a missing one (not_found).
export async function readOwnAttempt({ db, uid, attemptId }) {
  if (typeof attemptId !== 'string' || !/^[A-Za-z0-9]{8,40}$/.test(attemptId)) return null;
  const snap = await attemptsOf(db, uid).doc(attemptId).get();
  if (!snap.exists) return null;
  const data = snap.data();
  return data.userId === uid ? data : null;
}

/**
 * Grades and finalises an attempt exactly once. `loadQuestions(attempt)` must
 * return the validated MCQs for the issued ids from published content.
 */
export async function submitAttempt({ db, uid, attemptId, answers, loadQuestions, now = Date.now() }) {
  const attempt = await readOwnAttempt({ db, uid, attemptId });
  if (!attempt) return { ok: false, status: 404, code: 'attempt_not_found' };
  if (attempt.status !== 'in_progress') return { ok: false, status: 409, code: 'already_submitted' };
  if (now > attempt.expiresAtMs) return { ok: false, status: 410, code: 'attempt_expired' };

  const questions = await loadQuestions(attempt);
  if (!questions || questions.length !== attempt.questionIds.length) {
    return { ok: false, status: 409, code: 'quiz_content_changed' };
  }
  const graded = gradeQuiz(questions, answers);
  if (!graded.ok) return { ok: false, status: 400, code: graded.code };

  const ref = attemptsOf(db, uid).doc(attemptId);
  const outcome = await db.runTransaction(async (tx) => {
    const fresh = await tx.get(ref);
    const current = fresh.exists ? fresh.data() : null;
    if (!current || current.userId !== uid) return { ok: false, status: 404, code: 'attempt_not_found' };
    if (current.status !== 'in_progress') return { ok: false, status: 409, code: 'already_submitted' };
    tx.set(ref, {
      ...current,
      status: 'submitted',
      submittedAtMs: now,
      correctCount: graded.correctCount,
      percentage: graded.percentage,
      unanswered: graded.unanswered,
      results: graded.review.map((r) => ({ id: r.id, selectedIndex: r.selectedIndex, correct: r.correct })),
    });
    return { ok: true };
  });
  if (!outcome.ok) return outcome;
  return { ok: true, result: graded };
}

// Recent submitted attempts for the progress view. Orders by one field only
// so no composite index (a Firebase config change) is needed.
export async function listSubmittedAttempts({ db, uid, limit = 50 }) {
  const snap = await attemptsOf(db, uid).orderBy('createdAtMs', 'desc').limit(limit).get();
  return snap.docs.map((d) => d.data()).filter((a) => a.status === 'submitted' && a.userId === uid);
}
