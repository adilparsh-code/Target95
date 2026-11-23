import test from "node:test";
import assert from "node:assert/strict";
import {
  createSearchRateLimiter,
  SEARCH_RATE_LIMIT,
  SEARCH_RATE_WINDOW_MS,
} from "../src/lib/web-engine/searchRateLimit.mjs";

function fakeFirestore() {
  const documents = new Map();
  const reference = (path) => ({
    path,
    collection(name) {
      return reference(path + "/" + name);
    },
    doc(id) {
      return reference(path + "/" + id);
    },
  });

  return {
    documents,
    collection(name) {
      return reference(name);
    },
    async runTransaction(callback) {
      const transaction = {
        async get(ref) {
          const value = documents.get(ref.path);
          return { exists: value !== undefined, data: () => value };
        },
        set(ref, value, options = {}) {
          const current = documents.get(ref.path) || {};
          documents.set(ref.path, options.merge ? { ...current, ...value } : { ...value });
        },
      };
      return callback(transaction);
    },
  };
}

test("uses an atomic per-user Firestore window with the documented default limit", async () => {
  const db = fakeFirestore();
  let nowMs = 1_800_000_000_000;
  const isLimited = createSearchRateLimiter({ db, now: () => nowMs });

  assert.equal(SEARCH_RATE_LIMIT, 60);
  assert.equal(SEARCH_RATE_WINDOW_MS, 60_000);
  assert.equal(await isLimited("verified-user-a"), false);

  for (let index = 1; index < SEARCH_RATE_LIMIT; index += 1) {
    assert.equal(await isLimited("verified-user-a"), false);
  }
  assert.equal(await isLimited("verified-user-a"), true);
  assert.equal(db.documents.get("users/verified-user-a/usage/internalSearch").count, 60);

  assert.equal(await isLimited("verified-user-b"), false);
  assert.equal(db.documents.get("users/verified-user-b/usage/internalSearch").count, 1);

  nowMs += SEARCH_RATE_WINDOW_MS;
  assert.equal(await isLimited("verified-user-a"), false);
  assert.equal(db.documents.get("users/verified-user-a/usage/internalSearch").count, 1);
});

test("rejects missing identity and invalid limiter configuration", async () => {
  const db = fakeFirestore();
  const isLimited = createSearchRateLimiter({ db });
  await assert.rejects(() => isLimited(" "), /verified user id/);
  assert.throws(() => createSearchRateLimiter({ db, limit: 0 }), /positive integers/);
});

test("fails rather than silently disabling the limiter when Firestore is absent", () => {
  assert.throws(() => createSearchRateLimiter(), /Firestore Admin database/);
});
