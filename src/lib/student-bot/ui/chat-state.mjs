// Pure, framework-free chat state for the web simulator. Everything the UI
// needs to decide (history caps, what may be persisted, result formatting) is
// here so it can be tested without a browser.
export const HISTORY_VERSION = 1;
export const MAX_HISTORY_MESSAGES = 100;
export const historyKey = (uid) => `target95.studentBot.v${HISTORY_VERSION}.${uid}`;

let counter = 0;
export const nextId = () => `m${Date.now().toString(36)}${(counter += 1).toString(36)}`;

export function createMessage({ role, text, kind = 'text', card = null, mode = null, now = Date.now(), id = nextId() }) {
  return { id, role, text: String(text ?? ''), kind, card, mode, ts: now };
}

// What is allowed into localStorage: text, kind and timestamps only. Quiz
// questions are dropped (a restored quiz could never be submitted — it is
// server-state) and no tokens, cookies or ids are ever stored.
export function toPersistable(messages) {
  return messages.slice(-MAX_HISTORY_MESSAGES).map((m) => ({
    id: m.id,
    role: m.role === 'user' ? 'user' : 'bot',
    text: String(m.text ?? ''),
    kind: m.kind === 'quiz' ? 'quiz_archived' : String(m.kind ?? 'text'),
    mode: m.mode ?? null,
    ts: Number.isFinite(m.ts) ? m.ts : 0,
    card: m.card?.type === 'quiz' ? { type: 'quiz_archived', chapterTitle: String(m.card.chapterTitle ?? '') } : null,
  }));
}

export function saveHistory(storage, uid, { messages, context }) {
  if (!storage || !uid) return false;
  try {
    storage.setItem(historyKey(uid), JSON.stringify({ v: HISTORY_VERSION, messages: toPersistable(messages), context: context ?? {} }));
    return true;
  } catch {
    return false; // quota, private mode: the chat still works in memory
  }
}

export function loadHistory(storage, uid) {
  const empty = { messages: [], context: {} };
  if (!storage || !uid) return empty;
  try {
    const parsed = JSON.parse(storage.getItem(historyKey(uid)) || 'null');
    if (!parsed || parsed.v !== HISTORY_VERSION || !Array.isArray(parsed.messages)) return empty;
    const messages = parsed.messages
      .filter((m) => m && (m.role === 'user' || m.role === 'bot') && typeof m.text === 'string')
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => createMessage({ ...m, now: m.ts, id: typeof m.id === 'string' ? m.id : nextId() }));
    const c = parsed.context && typeof parsed.context === 'object' ? parsed.context : {};
    const slug = (v) => (typeof v === 'string' && /^[a-z0-9][a-z0-9.-]{0,63}$/.test(v) ? v : undefined);
    return { messages, context: Object.fromEntries(Object.entries({ board: slug(c.board), classSlug: slug(c.classSlug), subjectSlug: slug(c.subjectSlug) }).filter(([, v]) => v)) };
  } catch {
    return empty;
  }
}

export function clearHistory(storage, uid) {
  try {
    storage?.removeItem(historyKey(uid));
  } catch {
    /* nothing to clear */
  }
}

export function formatQuizResult(result) {
  const lines = [`Score: ${result.correctCount}/${result.total} (${result.percentage}%)${result.unanswered ? ` — ${result.unanswered} unanswered` : ''}`];
  result.review.forEach((r, i) => {
    lines.push('', `${i + 1}. ${r.correct ? '✓' : '✗'} ${r.prompt}`);
    if (!r.correct) lines.push(`   Correct option: ${r.correctIndex + 1}`);
    if (r.explanation) lines.push(`   ${r.explanation}`);
  });
  return lines.join('\n');
}

export function apiErrorText(status, body) {
  if (status === 401) return 'Your session has ended. Please sign in again.';
  if (status === 403) return 'The study assistant is for student accounts.';
  if (status === 429) return 'You are sending messages too quickly. Please wait a moment and try again.';
  if (status === 503) return 'The assistant is temporarily unavailable. Please try again shortly.';
  if (typeof body?.error === 'string' && status >= 400 && status < 500) return body.error;
  return 'Something went wrong. Please try again.';
}
