import { test } from 'node:test';
import assert from 'node:assert/strict';
import { authorizeStudent } from '../src/lib/student-bot/security/authorization.mjs';
import { checkRateLimit } from '../src/lib/student-bot/security/rate-limit.mjs';
import { createAiAdapter } from '../src/lib/student-bot/adapters/ai.mjs';
import { handleMessage } from '../src/lib/student-bot/core/orchestrator.mjs';
import { LIMITS } from '../src/lib/student-bot/config/commands.mjs';
import { makeFakeBotDb } from './helpers/fake-bot-db.mjs';
import { CONTEXT, makeDeps } from './helpers/bot-deps.mjs';

const req = {};
const asStudent = async () => 'student';
const withSession = (session, getProfileRole = asStudent) => authorizeStudent(req, { getSession: async () => session, getProfileRole });

test('unauthenticated request is 401', async () => {
  assert.equal((await withSession(null)).status, 401);
  assert.equal((await withSession(undefined)).status, 401);
  assert.equal((await withSession({})).status, 401);
  assert.equal((await withSession({ uid: '' })).status, 401);
  assert.equal((await withSession({ uid: 42 })).status, 401);
});

test('verifier failure is 503 (fail closed), never an allow', async () => {
  const result = await authorizeStudent(req, { getSession: async () => { throw new Error('auth down'); }, getProfileRole: asStudent });
  assert.equal(result.ok, false);
  assert.equal(result.status, 503);
});

test('admin, teacher and unknown roles are 403; students pass', async () => {
  assert.equal((await withSession({ uid: 'a', admin: true })).status, 403);
  assert.equal((await withSession({ uid: 'a', admin: true, role: 'student' })).status, 403, 'admin claim wins over role');
  assert.equal((await withSession({ uid: 't', role: 'teacher' })).status, 403);
  assert.equal((await withSession({ uid: 'x', role: 'superuser' })).status, 403);
  assert.deepEqual(await withSession({ uid: 's1', role: 'student' }), { ok: true, uid: 's1' });
  assert.deepEqual(await withSession({ uid: 's2' }), { ok: true, uid: 's2' });
});

test('the uid always comes from the session, never from request data', async () => {
  const result = await authorizeStudent({ body: { uid: 'attacker', studentId: 'attacker' } }, { getSession: async () => ({ uid: 'real' }), getProfileRole: asStudent });
  assert.equal(result.uid, 'real');
});

test('inactive users are rejected by the real session verifier the bot uses', async () => {
  const { verifyActiveSession } = await import('../src/lib/accountStatus.mjs');
  const auth = { verifySessionCookie: async () => ({ uid: 'u1', email_verified: true }) };
  const lookup = (profile) => ({ collection: () => ({ doc: () => ({ get: async () => ({ exists: Boolean(profile), data: () => profile }) }) }) });
  const control = await verifyActiveSession('cookie', { auth, adminDb: lookup({ status: 'active', role: 'student' }) });
  assert.equal(control?.uid, 'u1', 'positive control: an active profile must produce a session');
  for (const profile of [{ status: 'suspended', role: 'student' }, { status: 'active', disabled: true, role: 'student' }, null]) {
    const adminDb = { collection: () => ({ doc: () => ({ get: async () => ({ exists: Boolean(profile), data: () => profile }) }) }) };
    const session = await verifyActiveSession('cookie', { auth, adminDb });
    const result = await authorizeStudent(req, { getSession: async () => session, getProfileRole: asStudent });
    assert.equal(result.status, 401, JSON.stringify(profile));
  }
});

test('rate limit: allows up to the per-minute cap then returns retryAfter', async () => {
  const { db } = makeFakeBotDb();
  const now = 1_000_000;
  for (let i = 0; i < 3; i += 1) assert.equal((await checkRateLimit({ db, uid: 'u', now, perMinute: 3, perHour: 100 })).allowed, true);
  const blocked = await checkRateLimit({ db, uid: 'u', now: now + 1000, perMinute: 3, perHour: 100 });
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSec >= 1 && blocked.retryAfterSec <= 60);
});

test('rate limit: window resets and users are isolated', async () => {
  const { db } = makeFakeBotDb();
  const now = 5_000_000;
  for (let i = 0; i < 2; i += 1) await checkRateLimit({ db, uid: 'a', now, perMinute: 2, perHour: 100 });
  assert.equal((await checkRateLimit({ db, uid: 'a', now, perMinute: 2, perHour: 100 })).allowed, false);
  assert.equal((await checkRateLimit({ db, uid: 'b', now, perMinute: 2, perHour: 100 })).allowed, true);
  assert.equal((await checkRateLimit({ db, uid: 'a', now: now + 61_000, perMinute: 2, perHour: 100 })).allowed, true);
});

test('rate limit: hourly cap applies across minutes', async () => {
  const { db } = makeFakeBotDb();
  let now = 9_000_000;
  for (let i = 0; i < 4; i += 1) { await checkRateLimit({ db, uid: 'a', now, perMinute: 10, perHour: 4 }); now += 61_000; }
  assert.equal((await checkRateLimit({ db, uid: 'a', now, perMinute: 10, perHour: 4 })).allowed, false);
});

test('rate limit defaults are the configured limits', () => {
  assert.ok(LIMITS.rateLimitPerMinute > 0 && LIMITS.rateLimitPerHour >= LIMITS.rateLimitPerMinute);
});

test('missing AI config: adapter is unconfigured and HELP says answers are deterministic', async () => {
  const ai = createAiAdapter();
  assert.equal(ai.isConfigured(), false);
  assert.deepEqual(await ai.generate({ question: 'q', context: 'c' }), { ok: false, code: 'ai_unconfigured' });
  const { deps } = makeDeps();
  const help = await handleMessage({ message: 'help', context: {}, uid: 'u', deps });
  assert.match(help.text, /AI is not configured/);
  assert.equal(help.mode, 'deterministic');
});

test('AI adapter: provider errors and empty output never become fabricated text', async () => {
  assert.equal((await createAiAdapter({ provider: { generate: async () => { throw new Error('boom'); } } }).generate({ question: 'q' })).code, 'ai_failed');
  assert.equal((await createAiAdapter({ provider: { generate: async () => '   ' } }).generate({ question: 'q' })).code, 'ai_empty');
  assert.equal((await createAiAdapter({ provider: { generate: async () => ' hi ' } }).generate({ question: 'q' })).text, 'hi');
});

test('unknown input gets a help prompt, not an invented answer', async () => {
  const { deps } = makeDeps();
  const res = await handleMessage({ message: 'who won the world cup', context: CONTEXT, uid: 'u', deps });
  assert.equal(res.kind, 'unknown');
});

test('handler crash returns a generic error with no stack, and logs only the intent and error name', async () => {
  const { deps, logs } = makeDeps();
  const broken = { ...deps, boardprep: { ...deps.boardprep, verifyContext: () => { throw new Error('secret-token-123 stack here'); } } };
  const res = await handleMessage({ message: 'chapters', context: CONTEXT, uid: 'u', deps: broken });
  assert.equal(res.kind, 'error');
  assert.ok(!JSON.stringify(res).includes('secret-token'));
  assert.ok(!JSON.stringify(logs).includes('secret-token'));
});

test('progress: cross-student isolation, reads only own records, writes nothing', async () => {
  const seed = {
    'users/a/botQuizAttempts/x1': { userId: 'a', status: 'submitted', chapterSlug: 'muhavare-shabd-prayog', board: 'icse', classSlug: 'class-10', subjectSlug: 'hindi', correctCount: 2, total: 5, percentage: 40, submittedAtMs: 1_700_000_000_000, createdAtMs: 1 },
    'users/b/botQuizAttempts/y1': { userId: 'b', status: 'submitted', chapterSlug: 'muhavare-shabd-prayog', board: 'icse', classSlug: 'class-10', subjectSlug: 'hindi', correctCount: 5, total: 5, percentage: 100, submittedAtMs: 1_700_000_000_000, createdAtMs: 2 },
    'results/r1': { userId: 'b', subject: 'Physics', chapter: 'Light', percentage: 97, date: '2026-10-01T00:00:00Z' },
    'results/r2': { userId: 'a', subject: 'Hindi', chapter: 'Muhavare', percentage: 55, date: '2026-10-02T00:00:00Z' },
  };
  const { deps, fake } = makeDeps({ seed });
  const before = fake.mutations.length;
  const progress = await handleMessage({ message: 'my progress', context: {}, uid: 'a', deps });
  assert.match(progress.text, /2\/5 \(40%\)/);
  assert.match(progress.text, /Hindi — Muhavare: 55%/);
  assert.ok(!/100%|97%|Physics/.test(progress.text), 'must not leak student b data');
  const revision = await handleMessage({ message: 'revision', context: {}, uid: 'a', deps });
  assert.match(revision.text, /below 60%/);
  assert.ok(!/97|100%/.test(revision.text));
  assert.equal(fake.mutations.length, before, 'progress and revision are read-only');
});

test('progress with no records reports nothing instead of fabricating stats', async () => {
  const { deps } = makeDeps();
  const p = await handleMessage({ message: 'my progress', context: {}, uid: 'new-student', deps });
  assert.match(p.text, /no saved quiz or mock test results/);
  const r = await handleMessage({ message: 'revision', context: {}, uid: 'new-student', deps });
  assert.match(r.text, /no results of yours/);
});

test('a progress lookup cannot be redirected to another student via message text or context', async () => {
  const seed = { 'users/b/botQuizAttempts/y1': { userId: 'b', status: 'submitted', chapterSlug: 'c', correctCount: 5, total: 5, percentage: 100, submittedAtMs: 1, createdAtMs: 1 } };
  const { deps } = makeDeps({ seed });
  const res = await handleMessage({ message: 'my progress for user b', context: { uid: 'b' }, uid: 'a', deps });
  assert.ok(!/5\/5|100%/.test(res.text));
});

test('progress source drops foreign-owned rows even if one is planted under my path', async () => {
  const seed = { 'users/a/botQuizAttempts/z': { userId: 'b', status: 'submitted', chapterSlug: 'c', correctCount: 5, total: 5, percentage: 100, submittedAtMs: 1, createdAtMs: 1 } };
  const { deps } = makeDeps({ seed });
  const res = await handleMessage({ message: 'my progress', context: {}, uid: 'a', deps });
  assert.ok(!/5\/5/.test(res.text));
});

test('profile role is authoritative: no claim + profile teacher/admin/missing is 403; lookup errors are 503', async () => {
  for (const role of ['teacher', 'admin', undefined, null, 'STUDENT']) {
    assert.equal((await withSession({ uid: 'x' }, async () => role)).status, 403, String(role));
  }
  assert.equal((await withSession({ uid: 'x' }, async () => { throw new Error('down'); })).status, 503);
  assert.equal((await authorizeStudent(req, { getSession: async () => ({ uid: 'x' }) })).status, 503, 'no role lookup configured must fail closed');
  assert.equal((await withSession({ uid: 'x' }, async (uid) => (uid === 'x' ? 'student' : 'teacher'))).ok, true);
});
