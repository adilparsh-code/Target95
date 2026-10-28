import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { isActiveProfile, hasActiveProfile, transitionAccountStatus } from "../src/lib/accountStatus.mjs";

/**
 * In-memory Firebase Auth + Firestore profile with injectable failures.
 * fail.profile / fail.updateUser / fail.revoke: number of upcoming calls to fail.
 */
function makeWorld({ profile, authDisabled, fail = {} }) {
  const state = {
    profile: { ...profile },
    auth: { disabled: authDisabled, tokensRevokedAt: 0 },
    sessionIssuedAt: 1, // an existing session/ID token minted before the change
    clock: 10,
  };
  const failures = { profile: 0, updateUser: 0, revoke: 0, ...fail };
  const boom = (op) => Object.assign(new Error(`${op} unavailable`), { code: "unavailable" });
  const auth = {
    async updateUser(uid, { disabled }) {
      if (failures.updateUser > 0) { failures.updateUser -= 1; throw boom("auth.updateUser"); }
      state.auth.disabled = disabled;
    },
    async revokeRefreshTokens() {
      if (failures.revoke > 0) { failures.revoke -= 1; throw boom("auth.revoke"); }
      state.auth.tokensRevokedAt = ++state.clock;
    },
  };
  const profileRef = {
    async update(fields) {
      if (failures.profile > 0) { failures.profile -= 1; throw boom("firestore.update"); }
      state.profile = { ...state.profile, ...fields };
    },
  };
  const logs = [];
  const logger = { error: (...a) => logs.push(["error", ...a]), warn: (...a) => logs.push(["warn", ...a]) };
  return { state, auth, profileRef, logger, logs };
}

/** Access policy implied by the two stores (mirrors firestore.rules + server-auth). */
function access({ state }) {
  const profileActive = isActiveProfile(state.profile);
  const sessionValid = !state.auth.disabled && state.auth.tokensRevokedAt < state.sessionIssuedAt;
  return {
    newSignIn: !state.auth.disabled,
    // Firestore rules: an unexpired ID token minted before the change is accepted
    // by Firebase; access then depends only on the profile.
    firestoreWithExistingToken: profileActive,
    serverApiWithExistingSession: sessionValid && profileActive,
  };
}

const ACTIVE = { status: "active", disabled: false, role: "student" };
const INACTIVE = { status: "inactive", disabled: true, role: "student" };
const run = (world, target) => transitionAccountStatus({
  uid: "s1", target, auth: world.auth, profileRef: world.profileRef, actorUid: "admin1", logger: world.logger,
});
const DENIED = { newSignIn: false, firestoreWithExistingToken: false, serverApiWithExistingSession: false };

describe("isActiveProfile (mirrors firestore.rules)", () => {
  test("only status 'active' with disabled false/absent is active", () => {
    assert.equal(isActiveProfile({ status: "active", disabled: false }), true);
    assert.equal(isActiveProfile({ status: "active" }), true);
    for (const p of [null, {}, { status: "inactive" }, { status: "active", disabled: true },
      { status: "active", disabled: "false" }, { status: "ACTIVE" }, { status: true }]) {
      assert.equal(isActiveProfile(p), false, JSON.stringify(p));
    }
  });
  test("hasActiveProfile fails closed for a missing profile", async () => {
    const db = (doc) => ({ collection: () => ({ doc: () => ({ get: async () => doc }) }) });
    assert.equal(await hasActiveProfile(db({ exists: false, data: () => undefined }), "u"), false);
    assert.equal(await hasActiveProfile(db({ exists: true, data: () => INACTIVE }), "u"), false);
    assert.equal(await hasActiveProfile(db({ exists: true, data: () => ACTIVE }), "u"), true);
    assert.equal(await hasActiveProfile(db({ exists: true, data: () => ACTIVE }), ""), false);
  });
});

describe("deactivation", () => {
  test("success: denied everywhere", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false });
    const r = await run(w, "inactive");
    assert.equal(r.ok, true);
    assert.deepEqual(access(w), DENIED);
    assert.equal(w.state.profile.statusSync.auth, "synced");
  });

  test("Firestore fails (twice) + Auth succeeds: sign-in and sessions blocked, flagged for retry", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false, fail: { profile: 2 } });
    const r = await run(w, "inactive");
    assert.equal(r.ok, false);
    assert.equal(r.outcome, "partial_auth_only");
    assert.equal(r.httpStatus, 502);
    const a = access(w);
    assert.equal(a.newSignIn, false);
    assert.equal(a.serverApiWithExistingSession, false);
    // Residual: Firestore still honours an unexpired ID token (<= 1 hour).
    assert.equal(a.firestoreWithExistingToken, true);
    assert.ok(w.logs.some(([lvl, msg]) => lvl === "error" && msg.includes("RECONCILE REQUIRED")));

    const retry = await run(w, "inactive");
    assert.equal(retry.ok, true);
    assert.deepEqual(access(w), DENIED);
  });

  test("Firestore fails once, retry after Auth succeeds: fully deactivated", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false, fail: { profile: 1 } });
    const r = await run(w, "inactive");
    assert.equal(r.ok, true);
    assert.deepEqual(access(w), DENIED);
  });

  test("Firestore succeeds + Auth fails: access denied immediately, flagged", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false, fail: { updateUser: 1 } });
    const r = await run(w, "inactive");
    assert.equal(r.ok, false);
    assert.equal(r.outcome, "partial_profile_only");
    const a = access(w);
    assert.equal(a.firestoreWithExistingToken, false);
    assert.equal(a.serverApiWithExistingSession, false);
    assert.equal(a.newSignIn, true); // can sign in, but every read/write is denied
    assert.equal(w.state.profile.status, "inactive");
    assert.equal(w.state.profile.statusSync.auth, "failed");

    const retry = await run(w, "inactive");
    assert.equal(retry.ok, true);
    assert.deepEqual(access(w), DENIED);
  });

  test("Firestore succeeds + token revocation fails: still denied, flagged", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false, fail: { revoke: 1 } });
    const r = await run(w, "inactive");
    assert.equal(r.outcome, "partial_profile_only");
    assert.equal(access(w).firestoreWithExistingToken, false);
    assert.equal(access(w).serverApiWithExistingSession, false);
  });

  test("both stores fail: reported as unchanged, never claims success", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false, fail: { profile: 2, updateUser: 1 } });
    const r = await run(w, "inactive");
    assert.equal(r.ok, false);
    assert.equal(r.outcome, "unchanged");
    assert.equal(r.httpStatus, 500);
  });
});

describe("reactivation", () => {
  test("success: allowed everywhere for new sign-ins", async () => {
    const w = makeWorld({ profile: INACTIVE, authDisabled: true });
    const r = await run(w, "active");
    assert.equal(r.ok, true);
    assert.equal(access(w).newSignIn, true);
    assert.equal(access(w).firestoreWithExistingToken, true);
    assert.equal(w.state.profile.status, "active");
    assert.equal(w.state.profile.disabled, false);
  });

  test("Auth fails: nothing changes, still denied", async () => {
    const w = makeWorld({ profile: INACTIVE, authDisabled: true, fail: { updateUser: 1 } });
    const r = await run(w, "active");
    assert.equal(r.outcome, "unchanged");
    assert.deepEqual(access(w), DENIED);
  });

  test("Auth succeeds + Firestore fails: Auth rolled back, tokens revoked, still denied", async () => {
    const w = makeWorld({ profile: INACTIVE, authDisabled: true, fail: { profile: 1 } });
    const r = await run(w, "active");
    assert.equal(r.ok, false);
    assert.equal(r.outcome, "rolled_back");
    assert.deepEqual(access(w), DENIED);
    assert.ok(w.state.auth.tokensRevokedAt > 0);
  });

  test("Firestore fails + rollback fails: can sign in but has no access; flagged", async () => {
    const w = makeWorld({ profile: INACTIVE, authDisabled: true, fail: { profile: 1, updateUser: 0 } });
    // first updateUser (enable) succeeds, the rollback updateUser fails
    const original = w.auth.updateUser;
    let calls = 0;
    w.auth.updateUser = async (uid, opts) => {
      calls += 1;
      if (calls === 2) throw Object.assign(new Error("auth down"), { code: "unavailable" });
      return original(uid, opts);
    };
    const r = await run(w, "active");
    assert.equal(r.outcome, "partial_auth_enabled");
    assert.equal(r.httpStatus, 502);
    const a = access(w);
    assert.equal(a.newSignIn, true);
    assert.equal(a.firestoreWithExistingToken, false);
    assert.equal(a.serverApiWithExistingSession, false);
    assert.ok(w.logs.some(([lvl, msg]) => lvl === "error" && msg.includes("RECONCILE REQUIRED")));
  });

  test("invalid target is rejected", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false });
    await assert.rejects(run(w, "banned"), /Invalid account status target/);
  });
});
