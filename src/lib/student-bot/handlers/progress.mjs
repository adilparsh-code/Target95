import { bulletList, reply } from '../core/response-formatter.mjs';

export const REVISION_THRESHOLD = 60;

const when = (ms) => (Number.isFinite(ms) ? new Date(ms).toISOString().slice(0, 10) : '');

async function collect(uid, deps) {
  const [quizzes, mocks] = await Promise.all([deps.progress.listBotQuizzes(uid), deps.progress.listMockResults(uid)]);
  return { quizzes, mocks };
}

const quizLabel = (q, deps) => {
  const title = deps.boardprep.listChapters(q)?.find((c) => c.slug === q.chapterSlug)?.title;
  return title || q.chapterSlug;
};

export async function handleProgress({ uid, deps }) {
  const { quizzes, mocks } = await collect(uid, deps);
  if (!quizzes.length && !mocks.length) {
    return reply('progress', 'You have no saved quiz or mock test results yet, so there is nothing to report. Try QUIZ <chapter> to start.\n\n(Progress stored only in your browser on this device is not visible to me.)');
  }
  const parts = [];
  if (quizzes.length) {
    const lines = quizzes.slice(0, 8).map((q) => `${quizLabel(q, deps)}: ${q.correctCount}/${q.total} (${q.percentage}%) ${when(q.submittedAtMs)}`.trim());
    parts.push(`Chat quizzes (${quizzes.length} submitted):\n${bulletList(lines)}`);
  }
  if (mocks.length) {
    const lines = mocks.slice(0, 8).map((r) => `${[r.subject, r.chapter].filter(Boolean).join(' — ') || 'Mock test'}: ${r.percentage}% ${String(r.date || '').slice(0, 10)}`.trim());
    parts.push(`Mock tests (${mocks.length} saved):\n${bulletList(lines)}`);
  }
  return reply('progress', parts.join('\n\n'));
}

export async function handleRevision({ uid, deps }) {
  const { quizzes, mocks } = await collect(uid, deps);
  // Latest result per chapter/subject label, then flag those below the threshold.
  const latest = new Map();
  for (const q of [...quizzes].sort((a, b) => a.submittedAtMs - b.submittedAtMs)) latest.set(`q:${q.chapterSlug}`, { label: quizLabel(q, deps), pct: q.percentage });
  for (const r of mocks) latest.set(`m:${r.subject}|${r.chapter}`, { label: [r.subject, r.chapter].filter(Boolean).join(' — ') || 'Mock test', pct: r.percentage });
  const weak = [...latest.values()].filter((x) => Number.isFinite(x.pct) && x.pct < REVISION_THRESHOLD).sort((a, b) => a.pct - b.pct);
  if (!latest.size) return reply('revision', 'I have no results of yours to base a revision list on yet. Take a QUIZ first — I will not guess.');
  if (!weak.length) return reply('revision', `Nothing below ${REVISION_THRESHOLD}% in your saved results. Keep practising with QUIZ.`);
  return reply('revision', `Based only on your saved results, revisit (below ${REVISION_THRESHOLD}%):\n${bulletList(weak.map((w) => `${w.label} — ${w.pct}%`))}\n\nUse EXPLAIN <chapter> then QUIZ <chapter> again.`);
}
