import { createBoardprepAdapter } from '../../src/lib/student-bot/adapters/boardprep.mjs';
import { createProgrammingAdapter } from '../../src/lib/student-bot/adapters/programming.mjs';
import { createAiAdapter } from '../../src/lib/student-bot/adapters/ai.mjs';
import { createProgressSource } from '../../src/lib/student-bot/state/progress-source.mjs';
import { makeFakeBotDb } from './fake-bot-db.mjs';

export const CONTEXT = { board: 'icse', classSlug: 'class-10', subjectSlug: 'hindi' };

export function makeDeps({ seed = {}, now = 1_700_000_000_000, rng = () => 0.5, ai } = {}) {
  const fake = makeFakeBotDb(seed);
  const logs = [];
  const deps = {
    db: fake.db,
    boardprep: createBoardprepAdapter(),
    programming: createProgrammingAdapter(),
    ai: ai ?? createAiAdapter(),
    progress: createProgressSource(fake.db),
    now: () => now,
    rng,
    logger: { error: (...a) => logs.push(a) },
  };
  return { deps, fake, logs };
}

// Role lookup against the same fake db: users/{uid}.role, like production.
export const profileRoleFrom = (db) => async (uid) => (await db.collection('users').doc(uid).get()).data()?.role;
