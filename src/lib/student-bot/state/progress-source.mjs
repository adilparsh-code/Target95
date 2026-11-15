import { listSubmittedAttempts } from './quiz-store.mjs';

// Read-only. Reads only the signed-in student's own records; never writes.
//  - bot quiz attempts: users/{uid}/botQuizAttempts (this feature)
//  - server-graded mock tests: results where userId == uid (existing feature)
// Browser localStorage progress is not visible to the server and is not used.
export function createProgressSource(db) {
  return {
    listBotQuizzes: (uid) => listSubmittedAttempts({ db, uid, limit: 50 }),
    async listMockResults(uid) {
      const snap = await db.collection('results').where('userId', '==', uid).limit(50).get();
      return snap.docs.map((d) => d.data()).filter((r) => r.userId === uid);
    },
  };
}
