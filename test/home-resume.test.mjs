import assert from "node:assert/strict";
import test from "node:test";

import { formatResumeQuestion, getAuthenticatedResumeProgress } from "../src/lib/progress/homeResume.mjs";

function createStorage(recentlyStudied = {}, chapterProgress = {}) {
  return {
    getRecentlyStudied: (userId) => recentlyStudied[userId] || null,
    getChapterProgress: (userId, chapterId) => chapterProgress[`${userId}:${chapterId}`] || null,
  };
}

test("anonymous visitors never receive resume progress", () => {
  const storage = createStorage({ stale: { userId: "stale", lastQuestionId: "19" } });
  assert.equal(getAuthenticatedResumeProgress(storage, null), null);
});

test("progress must belong to the current authenticated user", () => {
  const storage = createStorage({
    current: { userId: "previous", lastChapterId: "arrays", lastQuestionId: "19" },
  });
  assert.equal(getAuthenticatedResumeProgress(storage, "current"), null);
});

test("authenticated progress preserves the saved question", () => {
  const storage = createStorage(
    { current: { userId: "current", lastChapterId: "arrays", lastChapterName: "Arrays", lastQuestionId: "19" } },
    { "current:arrays": { userId: "current", chapterId: "arrays", progress: 78 } },
  );
  const progress = getAuthenticatedResumeProgress(storage, "current");
  assert.equal(progress.questionId, "19");
  assert.equal(progress.chapterProgress.progress, 78);
  assert.equal(formatResumeQuestion(progress.questionId), "Q19");
});

test("authenticated users without saved progress receive no resume state", () => {
  const storage = createStorage({ current: { userId: "current" } });
  assert.equal(getAuthenticatedResumeProgress(storage, "current"), null);
});
