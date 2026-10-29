import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { isActiveProfile, hasActiveProfile, transitionAccountStatus, verifyActiveSession, decideReconciliation } from "../src/lib/accountStatus.mjs";

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
    updateTime: 100,
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
    async update(fields, precondition) {
      if (failures.profile > 0) { failures.profile -= 1; throw boom("firestore.update"); }
      if (precondition?.lastUpdateTime !== undefined && precondition.lastUpdateTime !== state.updateTime) {
        throw Object.assign(new Error("precondition failed"), { code: 9 });
      }
      state.profile = { ...state.profile, ...fields };
      state.updateTime += 1;
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
const run = (world, target, extra = {}) => transitionAccountStatus({
  uid: "s1", target, auth: world.auth, profileRef: world.profileRef, actorUid: "admin1", logger: world.logger,
  sleep: async () => {}, ...extra,
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

  test("Firestore fails every attempt + Auth succeeds: sign-in and sessions blocked, flagged for retry", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false, fail: { profile: 3 } });
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
    const w = makeWorld({ profile: ACTIVE, authDisabled: false, fail: { profile: 3, updateUser: 1 } });
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

describe("retries, idempotency and audit trail", () => {
  test("Firestore fails twice, third attempt succeeds: fully deactivated", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false, fail: { profile: 2 } });
    const delays = [];
    const r = await run(w, "inactive", { sleep: async (ms) => { delays.push(ms); } });
    assert.equal(r.ok, true);
    assert.deepEqual(delays, [200, 800]);
    assert.deepEqual(access(w), DENIED);
  });

  test("repeated deactivation requests stay deactivated and never re-enable Auth", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false });
    for (let i = 0; i < 3; i += 1) {
      const r = await run(w, "inactive");
      assert.equal(r.ok, true);
      assert.deepEqual(access(w), DENIED);
      assert.equal(w.state.auth.disabled, true);
    }
  });

  test("deactivation retry after partial_profile_only never reactivates", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false, fail: { updateUser: 2 } });
    assert.equal((await run(w, "inactive")).outcome, "partial_profile_only");
    assert.equal((await run(w, "inactive")).outcome, "partial_profile_only");
    assert.equal(w.state.profile.status, "inactive");
    assert.equal(access(w).firestoreWithExistingToken, false);
    assert.equal((await run(w, "inactive")).ok, true);
    assert.deepEqual(access(w), DENIED);
  });

  test("statusSync records target, auth state, result and opId consistently", async () => {
    const w = makeWorld({ profile: ACTIVE, authDisabled: false, fail: { updateUser: 1 } });
    const r = await run(w, "inactive", { opId: "op-123" });
    assert.equal(r.opId, "op-123");
    assert.deepEqual(
      { target: w.state.profile.statusSync.target, auth: w.state.profile.statusSync.auth, result: w.state.profile.statusSync.result, opId: w.state.profile.statusSync.opId },
      { target: "inactive", auth: "failed", result: "partial_profile_only", opId: "op-123" }
    );
    const ok = await run(w, "inactive", { opId: "op-124" });
    assert.equal(ok.ok, true);
    assert.equal(w.state.profile.statusSync.result, "deactivated");
    assert.equal(w.state.profile.statusSync.auth, "synced");
    assert.equal(w.state.profile.statusSync.opId, "op-124");
  });

  test("a failed deactivation is never reported as success", async () => {
    for (const fail of [{ profile: 3 }, { updateUser: 1 }, { revoke: 1 }, { profile: 3, updateUser: 1 }]) {
      const w = makeWorld({ profile: ACTIVE, authDisabled: false, fail });
      const r = await run(w, "inactive");
      assert.equal(r.ok, false, JSON.stringify(fail));
      assert.notEqual(r.httpStatus, 200);
    }
  });

  test("logs carry opId and uid but no token or email material", async () => {
    const w = makeWorld({ profile: { ...ACTIVE, email: "kid@example.com" }, authDisabled: false, fail: { profile: 3 } });
    await run(w, "inactive", { opId: "op-log" });
    const text = JSON.stringify(w.logs);
    assert.match(text, /op-log/);
    assert.doesNotMatch(text, /kid@example\.com|eyJ|idToken|refreshToken|session/i);
  });
});

describe("concurrent reactivation vs deactivation", () => {
  test("reactivation whose profile changed after it was read is rolled back (deactivation wins)", async () => {
    const w = makeWorld({ profile: INACTIVE, authDisabled: true });
    const readTime = w.state.updateTime;
    // A deactivation lands between the admin's read and the reactivation write.
    await w.profileRef.update({ status: "inactive", disabled: true, statusSync: { target: "inactive", auth: "synced" } });
    const r = await run(w, "active", { expectedUpdateTime: readTime });
    assert.equal(r.ok, false);
    assert.equal(r.outcome, "conflict");
    assert.equal(r.httpStatus, 409);
    assert.deepEqual(access(w), DENIED);
  });

  test("reactivation with a current read succeeds", async () => {
    const w = makeWorld({ profile: INACTIVE, authDisabled: true });
    const r = await run(w, "active", { expectedUpdateTime: w.state.updateTime });
    assert.equal(r.ok, true);
    assert.equal(access(w).firestoreWithExistingToken, true);
  });
});

describe("verifyActiveSession (server API guard)", () => {
  const dbWith = (doc) => ({ collection: () => ({ doc: () => ({ get: async () => doc }) }) });
  const authReturning = (decoded) => ({ verifySessionCookie: async (cookie, checkRevoked) => {
    assert.equal(checkRevoked, true);
    if (decoded instanceof Error) throw decoded;
    return decoded;
  } });
  const verified = { uid: "s1", email_verified: true };

  test("active profile + valid session is allowed", async () => {
    assert.deepEqual(await verifyActiveSession("c", { auth: authReturning(verified), adminDb: dbWith({ exists: true, data: () => ACTIVE }) }), verified);
  });
  test("inactive profile is denied even with a valid, unrevoked session", async () => {
    assert.equal(await verifyActiveSession("c", { auth: authReturning(verified), adminDb: dbWith({ exists: true, data: () => INACTIVE }) }), null);
  });
  test("missing profile is denied", async () => {
    assert.equal(await verifyActiveSession("c", { auth: authReturning(verified), adminDb: dbWith({ exists: false, data: () => undefined }) }), null);
  });
  test("revoked or disabled-user session is denied", async () => {
    const revoked = Object.assign(new Error("revoked"), { code: "auth/session-cookie-revoked" });
    assert.equal(await verifyActiveSession("c", { auth: authReturning(revoked), adminDb: dbWith({ exists: true, data: () => ACTIVE }) }), null);
  });
  test("unverified email and missing cookie are denied", async () => {
    assert.equal(await verifyActiveSession("c", { auth: authReturning({ uid: "s1", email_verified: false }), adminDb: dbWith({ exists: true, data: () => ACTIVE }) }), null);
    assert.equal(await verifyActiveSession("", { auth: authReturning(verified), adminDb: dbWith({ exists: true, data: () => ACTIVE }) }), null);
  });
  test("profile lookup failure propagates without granting access", async () => {
    const brokenDb = { collection: () => ({ doc: () => ({ get: async () => { throw new Error("firestore down"); } }) }) };
    await assert.rejects(verifyActiveSession("c", { auth: authReturning(verified), adminDb: brokenDb }), /firestore down/);
  });
});

describe("decideReconciliation (never increases access)", () => {
  const enabled = { exists: true, disabled: false };
  const disabled = { exists: true, disabled: true };
  test("partial_auth_only state -> deactivate profile", () => {
    assert.deepEqual(decideReconciliation(ACTIVE, disabled), { issue: "profile_active_auth_disabled", actions: ["profile:deactivate"] });
    assert.deepEqual(decideReconciliation(ACTIVE, { exists: false, disabled: true }).actions, ["profile:deactivate"]);
  });
  test("partial_profile_only / partial_auth_enabled state -> disable Auth", () => {
    assert.deepEqual(decideReconciliation({ ...INACTIVE, statusSync: { target: "inactive", auth: "failed" } }, enabled).actions, ["auth:disable", "auth:revoke"]);
    assert.deepEqual(decideReconciliation({ ...INACTIVE, statusSync: { target: "active", auth: "synced" } }, enabled).actions, ["auth:disable", "auth:revoke"]);
  });
  test("legacy profiles with enabled Auth need backfill without Auth changes", () => {
    for (const profile of [{}, { role: "student" }, { disabled: false }, { disabled: true }, { statusSync: { target: "inactive", auth: "failed" } }]) {
      assert.deepEqual(decideReconciliation(profile, enabled), { issue: "profile_needs_backfill", actions: [] });
    }
    assert.equal(decideReconciliation({}, disabled), null);
    assert.deepEqual(decideReconciliation(INACTIVE, enabled), { issue: "profile_inactive_auth_enabled", actions: ["auth:disable", "auth:revoke"] });
    assert.deepEqual(decideReconciliation({ status: "active", disabled: true }, enabled).actions, ["auth:disable", "auth:revoke"]);
  });
  test("consistent states need nothing", () => {
    assert.equal(decideReconciliation(ACTIVE, enabled), null);
    assert.equal(decideReconciliation(INACTIVE, disabled), null);
    assert.equal(decideReconciliation(null, enabled), null);
  });
  test("stale markers are cleared only when they match the agreed state", () => {
    assert.deepEqual(decideReconciliation({ ...INACTIVE, statusSync: { target: "inactive", auth: "pending" } }, disabled).actions, ["marker:clear"]);
    assert.deepEqual(decideReconciliation({ ...ACTIVE, statusSync: { target: "inactive", auth: "failed" } }, enabled), { issue: "marker_state_mismatch", actions: [] });
  });
  test("no decision ever enables Auth or activates a profile", () => {
    const profiles = [null, ACTIVE, INACTIVE, {}, { status: "active", disabled: true }];
    const auths = [enabled, disabled, { exists: false, disabled: true }];
    for (const p of profiles) for (const a of auths) {
      const d = decideReconciliation(p, a);
      for (const action of d?.actions || []) assert.match(action, /^(profile:deactivate|auth:disable|auth:revoke|marker:clear)$/);
    }
  });
});

test("reconcile script entry point runs and refuses to start without credentials", async () => {
  const { spawnSync } = await import("node:child_process");
  const { fileURLToPath } = await import("node:url");
  const script = fileURLToPath(new URL("../scripts/reconcile-account-status.mjs", import.meta.url));
  const env = { ...process.env };
  delete env.FIREBASE_SERVICE_ACCOUNT;
  const result = spawnSync(process.execPath, [script], { env, encoding: "utf8" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /FIREBASE_SERVICE_ACCOUNT is not set/);
});
