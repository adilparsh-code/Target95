/**
 * Server-side mock-test attempt service (SERVER ONLY).
 *
 * The API routes are thin wrappers around these functions so the whole lifecycle (start,
 * resume, submit, retry, duplicate protection) can be tested with an in-memory Firestore
 * double. `db` is a Firestore Admin instance; `serverTimestamp` is injected so this module
 * does not import firebase-admin.
 *
 * Contract highlights
 *  - Pre-submission payloads contain only toClientQuestion fields: no answers, no explanations.
 *  - Grading happens here, from the stored question ids. The client only sends raw answers.
 *  - Submitting twice never grades twice: the second call returns the stored result
 *    (`replay: true`), which is also how a student safely retries after a lost response.
 */

import {
  buildResultDocument,
  buildReveal,
  gradeAttempt,
  normalizeAttemptConfig,
  resolveAttemptQuestions,
  selectAttemptQuestionIds,
  toClientQuestion,
} from "./mocktestAttempts.js";
import { buildContentPool, resolveContentQuestion } from "./mocktestContent.js";

const ATTEMPT_COLLECTION = "mockAttempts";

const attemptRefFor = (db, uid, attemptId) => db.collection("users").doc(uid).collection(ATTEMPT_COLLECTION).doc(attemptId);

function clientQuestionsFor(config, questionIds) {
  const questions = resolveAttemptQuestions(config, questionIds, { resolveContentQuestion });
  if (questions.some((question) => !question)) return null;
  return questions.map(toClientQuestion);
}

/** Seconds left on the server clock; null for untimed modes. */
function timeLeftSeconds(attempt, config, nowMs) {
  if (config.mode === "practice") return null;
  const elapsed = Math.max(0, Math.round((nowMs - Number(attempt.startedAtMs || nowMs)) / 1000));
  return Math.max(0, config.duration * 60 - elapsed);
}

/** Start an attempt: server chooses the questions and records the start time. */
export async function startAttempt({ db, uid, rawConfig, serverTimestamp, nowMs = Date.now(), env = process.env, random = Math.random }) {
  const config = normalizeAttemptConfig(rawConfig);
  const questionIds = selectAttemptQuestionIds(config, random, { extraPool: buildContentPool(config, env) });
  if (!questionIds.length) return { status: 404, body: { ok: false, error: "No questions are available for this test." } };

  const questions = clientQuestionsFor(config, questionIds);
  if (!questions) return { status: 500, body: { ok: false, error: "Unable to start the test right now." } };

  const ref = db.collection("users").doc(uid).collection(ATTEMPT_COLLECTION).doc();
  await ref.set({
    userId: uid,
    config,
    questionIds,
    startedAtMs: nowMs,
    status: "in_progress",
    createdAt: serverTimestamp(),
  });
  return {
    status: 200,
    body: { ok: true, attemptId: ref.id, questionIds, questions, duration: config.duration, startedAtMs: nowMs },
  };
}

/** Re-deliver the questions of an in-progress attempt (draft resume, other device). */
export async function getAttemptForResume({ db, uid, attemptId, nowMs = Date.now() }) {
  const snap = await attemptRefFor(db, uid, attemptId).get();
  const attempt = snap.exists ? snap.data() : null;
  if (!attempt || attempt.userId !== uid) return { status: 404, body: { ok: false, error: "Attempt not found." } };
  if (attempt.status !== "in_progress") {
    return { status: 409, body: { ok: false, status: attempt.status, error: "This attempt was already submitted." } };
  }
  const config = normalizeAttemptConfig(attempt.config);
  const questionIds = attempt.questionIds.map(String);
  const questions = clientQuestionsFor(config, questionIds);
  // Content that can no longer be resolved must be reported, never silently replaced.
  if (!questions) {
    return { status: 410, body: { ok: false, code: "unresolvable", error: "This test can no longer be resumed." } };
  }
  return {
    status: 200,
    body: {
      ok: true,
      attemptId,
      questionIds,
      questions,
      duration: config.duration,
      startedAtMs: attempt.startedAtMs,
      timeLeftSeconds: timeLeftSeconds(attempt, config, nowMs),
    },
  };
}

function storedResultForReplay(resultDoc) {
  const { createdAt, ...rest } = resultDoc;
  return rest;
}

/** Grade and persist an attempt exactly once; a repeat call returns the stored result. */
export async function submitAttempt({ db, uid, attemptId, answers, serverTimestamp, nowMs = Date.now() }) {
  const attemptRef = attemptRefFor(db, uid, attemptId);
  const resultRef = db.collection("results").doc(attemptId);

  const outcome = await db.runTransaction(async (tx) => {
    const snap = await tx.get(attemptRef);
    if (!snap.exists) return { status: 404, error: "Attempt not found." };
    const attempt = snap.data();
    if (attempt.userId !== uid) return { status: 404, error: "Attempt not found." };

    if (attempt.status === "submitted") {
      const existing = await tx.get(resultRef);
      if (!existing.exists || existing.data().userId !== uid) return { status: 409, error: "This attempt was already submitted." };
      return { status: 200, replay: true, doc: storedResultForReplay(existing.data()), attempt };
    }
    if (attempt.status !== "in_progress") return { status: 409, error: "This attempt was already submitted." };

    const graded = gradeAttempt(attempt, answers, { nowMs, resolveContentQuestion });
    const doc = buildResultDocument({ uid, attemptId, graded, nowIso: new Date(nowMs).toISOString() });
    tx.create(resultRef, { ...doc, createdAt: serverTimestamp() });
    tx.update(attemptRef, { status: "submitted", submittedAt: serverTimestamp() });
    return { status: 200, doc, reveal: graded.reveal };
  });

  if (outcome.status !== 200) return { status: outcome.status, body: { ok: false, error: outcome.error } };

  let reveal = outcome.reveal;
  if (outcome.replay) {
    const config = normalizeAttemptConfig(outcome.attempt.config);
    const questions = resolveAttemptQuestions(config, outcome.attempt.questionIds.map(String), { resolveContentQuestion });
    reveal = questions.every(Boolean) ? buildReveal(questions) : [];
  }
  return {
    status: 200,
    body: { ok: true, replay: Boolean(outcome.replay), result: { id: attemptId, ...outcome.doc }, reveal },
  };
}
