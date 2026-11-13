/**
 * Loads (starts or resumes) a mock-test attempt for the player. Pure async functions with
 * injected collaborators, so the stale-draft and failure rules are unit-testable:
 *
 *  - A draft that points at a server attempt is resumed from the server (questions are
 *    re-delivered key-free). If that attempt is gone, already submitted, or can no longer be
 *    resolved, the draft is discarded WITH a visible notice and a new attempt starts. Questions
 *    are never silently swapped under existing answers.
 *  - If the server cannot be reached the draft is kept untouched and the student gets an
 *    error with retry; nothing is discarded or reshuffled.
 *  - Content-engine questions only ever come from the server. The bundled legacy pool is used
 *    only for legacy ids (older drafts, signed-out use, or an explicit offline choice).
 */

const STALE_STATUSES = new Set([404, 409, 410]);

const asIdList = (value) => (Array.isArray(value) ? value.map(String) : []);

function pickAnswers(answers, questions) {
  const allowed = new Set(questions.map((question) => String(question.id)));
  return Object.fromEntries(Object.entries(answers && typeof answers === "object" ? answers : {}).filter(([id]) => allowed.has(String(id))));
}

function restoreFromDraft(draft, questions, { duration, serverTimeLeft = null, timed = true }) {
  const draftTime = Number(draft?.timeLeft);
  let timeLeft = Number.isFinite(draftTime) && draftTime >= 0 ? draftTime : duration * 60;
  if (timed && serverTimeLeft !== null) timeLeft = Math.min(timeLeft, serverTimeLeft);
  return {
    answers: pickAnswers(draft?.answers, questions),
    bookmarked: pickAnswers(draft?.bookmarked, questions),
    currentIndex: Math.min(Math.max(Number(draft?.currentIndex) || 0, 0), Math.max(questions.length - 1, 0)),
    timeLeft,
  };
}

function orderLike(ids, questions) {
  const byId = new Map(questions.map((question) => [String(question.id), question]));
  const ordered = ids.map((id) => byId.get(id));
  return ordered.every(Boolean) ? ordered : null;
}

/** Shuffle helper, injectable for tests. */
export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Signed-out / explicitly offline session: legacy questions only, result not saved. */
export function loadLocalSession({ config, count, legacyPool, random = Math.random }) {
  const pool = legacyPool();
  const questions = shuffle(pool, random).slice(0, Math.min(count, pool.length));
  return { phase: "ready", mode: "local", attemptId: null, questions, initial: null, notice: null };
}

/**
 * @returns one of
 *   { phase: "ready", mode: "server"|"local", attemptId, questions, initial, notice }
 *   { phase: "error", stage: "resume"|"start", message, canGoOffline }
 */
export async function loadAttemptSession({ uid, config, duration, count, api, drafts, legacyPool, describeFailure }) {
  const timed = config.mode !== "practice" && config.mode !== "revision";
  let notice = null;
  const draft = drafts.get(config, uid);

  if (draft?.attemptId) {
    const response = await api.resume(String(draft.attemptId));
    if (response.ok && Array.isArray(response.data.questions)) {
      const questions = response.data.questions;
      const ordered = orderLike(asIdList(response.data.questionIds), questions) || questions;
      return {
        phase: "ready",
        mode: "server",
        attemptId: String(draft.attemptId),
        questions: ordered,
        initial: restoreFromDraft(draft, ordered, { duration, serverTimeLeft: response.data.timeLeftSeconds ?? null, timed }),
        notice: null,
      };
    }
    if (!STALE_STATUSES.has(response.status)) {
      // Network failure, 401, 5xx: keep the draft, let the student retry.
      return { phase: "error", stage: "resume", message: describeFailure(response, "resume your test"), canGoOffline: false };
    }
    drafts.clear(config, uid);
    notice = response.status === 409
      ? "Your earlier test was already submitted, so a new test was started."
      : "Your earlier unfinished test could not be resumed, so a new test was started.";
  } else if (draft?.questionIds?.length) {
    // Draft of an unsaved (offline) attempt: only legacy ids can be here. Resolve all-or-nothing.
    const ordered = orderLike(asIdList(draft.questionIds), legacyPool());
    if (ordered) {
      return {
        phase: "ready",
        mode: "local",
        attemptId: null,
        questions: ordered,
        initial: restoreFromDraft(draft, ordered, { duration, timed }),
        notice: null,
      };
    }
    drafts.clear(config, uid);
    notice = "Your earlier unfinished test is no longer available, so a new test was started.";
  }

  const started = await api.start(config);
  if (started.ok && started.data.attemptId && Array.isArray(started.data.questionIds)) {
    const questions = Array.isArray(started.data.questions)
      ? started.data.questions
      : orderLike(asIdList(started.data.questionIds), legacyPool()); // older server: ids only, legacy questions
    if (questions) {
      return { phase: "ready", mode: "server", attemptId: String(started.data.attemptId), questions, initial: null, notice };
    }
  }
  return {
    phase: "error",
    stage: "start",
    message: describeFailure(started, "start your test"),
    canGoOffline: legacyPool().length > 0,
  };
}

/**
 * What the setup screen should show for the current filters.
 *
 * While the server count for the current filters is loading, the local (legacy-only) count
 * is NOT shown as if it were the answer: for content-engine categories it is far too low
 * (often 0), which made the status line flash "No questions match" before jumping to the
 * real number. Instead `pending` is true and the previous server count for the same
 * category is kept as a stale hint. Without a server (disabled / CBSE / signed out) the
 * local numbers are the truth and nothing is pending.
 */
export function resolveAvailability({ enabled, remote, configKey, category, localCount, localChapters }) {
  if (!enabled) return { count: localCount, chapters: localChapters, pending: false };
  const chapters = remote?.category === category ? remote.chapters : localChapters;
  if (remote?.key === configKey) return { count: remote.count, chapters, pending: false };
  const sameCategory = remote?.category === category;
  return { count: sameCategory ? remote.count : localCount, chapters, pending: true };
}

/**
 * View model for the player's "couldn't load your test" screen. Kept pure so the error
 * state (message shown, which actions exist, that Retry is always offered) is testable
 * without a DOM. `canGoOffline` is only true for network failures, never for auth errors.
 */
export function buildPlayerErrorView(error) {
  const actions = [{ id: "retry", label: "Retry", primary: true }];
  if (error?.canGoOffline) actions.push({ id: "offline", label: "Continue without saving" });
  actions.push({ id: "back", label: "Back to Setup" });
  return {
    title: "We couldn't load your test",
    message: error?.message || "Something went wrong while loading your test. Please try again.",
    actions,
  };
}
