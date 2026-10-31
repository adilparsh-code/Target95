import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { isProtectedAdminAccount, manageStudentAccountStatus } from "../src/lib/accountStatus.mjs";
import { reconcileAccounts, parseArgs, main, exitCodeFor } from "../scripts/reconcile-account-status.mjs";
import { makeFakeAccountWorld } from "./helpers/fake-account-world.mjs";

/**
 * In-memory Firestore `users` + `accountStatusLeases` and Firebase Auth (see
 * test/helpers/fake-account-world.mjs). No credentials and no network.
 * `mutations` lists profile and Auth writes (lease bookkeeping excluded).
 * users: { [uid]: { profile, auth?: { disabled, customClaims } | "missing" | Error } }
 */
function makeWorld(users) {
  const fw = makeFakeAccountWorld({ users: structuredClone(Object.fromEntries(Object.entries(users).map(([k, v]) => [k, { ...v, auth: v.auth instanceof Error ? undefined : v.auth }]))) });
  // Errors are not structured-cloneable; serve them from a side table.
  const errorAuth = Object.fromEntries(Object.entries(users).filter(([, u]) => u.auth instanceof Error).map(([k, u]) => [k, u.auth]));
  const auth = {
    ...fw.auth,
    getUser: async (uid) => { if (errorAuth[uid]) throw errorAuth[uid]; return fw.auth.getUser(uid); },
  };
  return {
    ...fw,
    auth,
    get mutations() {
      return fw.mutations
        .filter((m) => !m.op.startsWith("accountStatusLeases"))
        .map((m) => (m.op === "users.update" ? { ...m, op: "profile.update" } : m));
    },
  };
}

const lines = [];
const run = (world, opts = {}) => reconcileAccounts({ db: world.db, auth: world.auth, log: (l) => lines.push(l), now: () => "2026-10-29T00:00:00.000Z", ...opts });

const ACTIVE = { status: "active", disabled: false };
const INACTIVE = { status: "inactive", disabled: true };

describe("isProtectedAdminAccount", () => {
  test("profile role admin, admin claim, or admin role claim protects", () => {
    assert.equal(isProtectedAdminAccount({ role: "admin" }, null), true);
    assert.equal(isProtectedAdminAccount({ role: "student" }, { admin: true }), true);
    assert.equal(isProtectedAdminAccount({}, { admin: true }), true);
    assert.equal(isProtectedAdminAccount(null, { role: "admin" }), true);
  });
  test("non-admin profile and claims do not protect; truthy non-true admin claim is not admin", () => {
    assert.equal(isProtectedAdminAccount({ role: "student" }, null), false);
    assert.equal(isProtectedAdminAccount({ role: "student" }, { admin: false, role: "student" }), false);
    assert.equal(isProtectedAdminAccount({ role: "student" }, { admin: "true" }), false);
  });
});

describe("reconcileAccounts admin protection and fail-closed lookups", () => {
  test("1. profile.role === 'admin' protects the account even with --apply", async () => {
    const w = makeWorld({ a1: { profile: { ...INACTIVE, role: "admin" }, auth: { disabled: false, customClaims: {} } } });
    const r = await run(w, { apply: true });
    assert.equal(r.skippedAdmin, 1);
    assert.deepEqual(w.mutations, []);
  });

  test("2. customClaims.admin === true protects when profile role is missing or non-admin", async () => {
    const w = makeWorld({
      noRole: { profile: { ...INACTIVE }, auth: { disabled: false, customClaims: { admin: true } } },
      student: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false, customClaims: { admin: true } } },
      activeNoAuth: { profile: { ...ACTIVE, role: "teacher" }, auth: { disabled: true, customClaims: { admin: true } } },
    });
    const r = await run(w, { apply: true });
    assert.equal(r.skippedAdmin, 3);
    assert.equal(r.repaired, 0);
    assert.deepEqual(w.mutations, []);
  });

  test("3. an Auth lookup failure skips the account (no mutation) and is counted", async () => {
    const w = makeWorld({
      broken: { profile: { ...INACTIVE, role: "student" }, auth: Object.assign(new Error("boom"), { code: "auth/internal-error" }) },
      unknown: { profile: { ...ACTIVE, role: "student" }, auth: new Error("network") },
    });
    const r = await run(w, { apply: true });
    assert.equal(r.lookupErrors, 2);
    assert.equal(r.repaired, 0);
    assert.deepEqual(w.mutations, []);
    assert.ok(lines.some((l) => l.includes("users/broken") && l.includes("auth lookup failed")));
  });

  test("4. ordinary non-admin accounts follow decideReconciliation under --apply", async () => {
    const w = makeWorld({
      inactiveEnabled: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false, customClaims: { role: "student" } } },
      activeDisabled: { profile: { ...ACTIVE, role: "student" }, auth: { disabled: true } },
      gone: { profile: { ...ACTIVE, role: "student" }, auth: "missing" },
      fine: { profile: { ...ACTIVE, role: "student" }, auth: { disabled: false } },
    });
    const r = await run(w, { apply: true });
    assert.equal(r.repaired, 3);
    assert.equal(r.consistent, 1);
    assert.deepEqual(w.mutations.filter((m) => m.uid === "inactiveEnabled").map((m) => m.op), ["auth.updateUser", "auth.revoke", "profile.update"]);
    assert.deepEqual(w.mutations.find((m) => m.uid === "inactiveEnabled" && m.op === "auth.updateUser").props, { disabled: true });
    for (const uid of ["activeDisabled", "gone"]) {
      const ms = w.mutations.filter((m) => m.uid === uid);
      assert.equal(ms.length, 1);
      assert.equal(ms[0].fields.status, "inactive");
      assert.equal(ms[0].fields.disabled, true);
    }
    assert.equal(w.mutations.some((m) => m.uid === "fine"), false);
  });

  test("5. dry run (the default, and any non-true apply) performs no mutations", async () => {
    const users = {
      inactiveEnabled: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false } },
      activeDisabled: { profile: { ...ACTIVE, role: "student" }, auth: { disabled: true } },
      stale: { profile: { ...INACTIVE, statusSync: { target: "inactive", auth: "pending" } }, auth: { disabled: true } },
    };
    for (const opts of [{}, { apply: false }, { apply: "yes" }, { apply: 1 }]) {
      const w = makeWorld(users);
      const r = await run(w, opts);
      assert.equal(r.mode, "dry-run");
      assert.equal(r.repaired, 0);
      assert.deepEqual(w.mutations, []);
    }
  });

  test("6. no path enables Auth or reactivates a profile", async () => {
    const authStates = [{ disabled: false }, { disabled: true }, { disabled: false, customClaims: { admin: true } }, "missing"];
    const profiles = [
      ACTIVE, INACTIVE, { status: "active", disabled: true }, { status: "pending" },
      { ...INACTIVE, statusSync: { target: "active", auth: "pending" } },
      { ...INACTIVE, statusSync: { target: "inactive", auth: "failed" } },
      { ...ACTIVE, statusSync: { target: "active", auth: "failed" } },
      { ...ACTIVE, statusSync: { target: "inactive", auth: "pending" } },
    ];
    const users = {};
    profiles.forEach((p, i) => authStates.forEach((a, j) => { users[`u${i}_${j}`] = { profile: { ...p, role: "student" }, auth: a }; }));
    const w = makeWorld(users);
    await run(w, { apply: true });
    for (const m of w.mutations) {
      if (m.op === "auth.updateUser") assert.deepEqual(m.props, { disabled: true }, `enabled Auth for ${m.uid}`);
      if (m.op === "profile.update") {
        assert.notEqual(m.fields.status, "active", `activated ${m.uid}`);
        if ("disabled" in m.fields) assert.equal(m.fields.disabled, true);
        if (m.fields.statusSync) assert.notEqual(m.fields.statusSync.target === "active" && "status" in m.fields, true);
      }
    }
  });

  test("--uid targets one account and ignores a missing profile", async () => {
    const w = makeWorld({ one: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false } }, two: { profile: { ...INACTIVE }, auth: { disabled: false } } });
    const r = await run(w, { uid: "one" });
    assert.equal(r.scanned, 1);
    const none = await run(w, { uid: "nope" });
    assert.equal(none.scanned, 0);
  });
});

describe("P1: failed token revocation is never treated as reconciled", () => {
  const failedDeactivation = (auth = "failed") => ({ ...INACTIVE, role: "student", statusSync: { target: "inactive", auth, result: auth === "failed" ? "partial_profile_only" : "pending", opId: "op-1", at: "t0" } });

  for (const markerAuth of ["failed", "pending"]) {
    test(`${markerAuth} deactivation marker + disabled Auth: revoke fails -> marker kept, exit 2; retry revokes then clears`, async () => {
      const w = makeWorld({ s1: { profile: failedDeactivation(markerAuth), auth: { disabled: true } } });
      w.failures.revoke = 1;
      const first = await run(w, { apply: true });
      assert.equal(first.applyErrors, 1);
      assert.equal(first.repaired, 0);
      assert.equal(exitCodeFor(first), 2);
      assert.equal(w.profile("s1").statusSync.auth, markerAuth, "marker must survive a failed revocation");
      assert.deepEqual(w.mutations, [], "nothing written when revocation fails");
      assert.equal(w.lease("s1"), null, "lease released after the failure");

      const second = await run(w, { apply: true });
      assert.equal(second.repaired, 1);
      assert.equal(exitCodeFor(second), 0);
      assert.deepEqual(w.mutations.map((m) => m.op), ["auth.revoke", "profile.update"], "revoke strictly before clearing");
      const cleared = w.mutations[1];
      assert.equal(cleared.fields.statusSync.auth, "synced");
      assert.equal(cleared.fields.statusSync.target, "inactive");
      assert.ok(cleared.precondition?.lastUpdateTime, "marker write is preconditioned");
      assert.equal(w.authOf("s1").disabled, true, "never re-enabled");

      const third = await run(w, { apply: true });
      assert.equal(third.consistent, 1, "recovered state is stable");
    });
  }

  test("deactivation marker with no Auth user: nothing to revoke, marker cleared", async () => {
    const w = makeWorld({ s1: { profile: failedDeactivation(), auth: "missing" } });
    const r = await run(w, { apply: true });
    assert.equal(r.repaired, 1);
    assert.deepEqual(w.mutations.map((m) => m.op), ["profile.update"]);
  });

  test("dry run reports the revocation but writes nothing", async () => {
    lines.length = 0;
    const w = makeWorld({ s1: { profile: failedDeactivation(), auth: { disabled: true } } });
    const r = await run(w);
    assert.equal(r.mode, "dry-run");
    assert.deepEqual(w.mutations, []);
    assert.equal(w.lease("s1"), null, "dry run takes no lease");
    assert.ok(lines.some((l) => l.includes("would repair users/s1") && l.includes("auth:revoke, marker:clear")));
  });
});

describe("reconcile vs PATCH coordination (per-account lease)", () => {
  const route = (w, target) => manageStudentAccountStatus({
    db: w.db, auth: w.auth, uid: "s1", target, actorUid: "admin1", logger: w.logger,
    transitionOptions: { sleep: async () => {}, retryDelaysMs: [] },
  });

  test("reactivation mid-flight (Auth enabled, profile still inactive): reconcile is skipped as busy and writes nothing", async () => {
    const w = makeWorld({ s1: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: true } } });
    const gate = w.pauseAt("profileUpdate");
    const patch = route(w, "active");
    await gate.reached;
    // Exactly the window the review describes: Auth enabled, profile inactive.
    assert.equal(w.authOf("s1").disabled, false);
    assert.equal(w.profile("s1").status, "inactive");
    const before = w.mutations.length;
    const r = await run(w, { apply: true, uid: "s1" });
    assert.equal(r.busy, 1);
    assert.equal(r.repaired, 0);
    assert.equal(exitCodeFor(r), 2);
    assert.equal(w.mutations.length, before, "reconcile made no Auth or profile write");
    gate.release();
    const res = await patch;
    assert.equal(res.status, 200);
    assert.equal(w.profile("s1").status, "active");
    assert.equal(w.authOf("s1").disabled, false);
    const after = await run(w, { apply: true, uid: "s1" });
    assert.equal(after.consistent, 1, "no false repair after the reactivation finished");
  });

  test("simultaneous reconciliation runs with the same timestamp cannot share a lease", async () => {
    const w = makeWorld({ s1: { profile: INACTIVE, auth: { disabled: false } } });
    const gate = w.pauseAt("updateUser:true");
    const first = run(w, { apply: true, uid: "s1" });
    await gate.reached;
    const second = await run(w, { apply: true, uid: "s1" });
    assert.equal(second.busy, 1);
    assert.equal(second.repaired, 0);
    gate.release();
    assert.equal((await first).repaired, 1);
  });

  test("reconcile mid-repair: a concurrent reactivation gets 409 and changes nothing", async () => {
    const w = makeWorld({ s1: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false } } });
    const gate = w.pauseAt("updateUser:true");
    const rec = run(w, { apply: true, uid: "s1" });
    await gate.reached;
    const before = w.mutations.length;
    const res = await route(w, "active");
    assert.equal(res.status, 409);
    assert.equal(res.body.outcome, "busy");
    assert.equal(w.mutations.length, before, "PATCH made no Auth or profile write");
    gate.release();
    const r = await rec;
    assert.equal(r.repaired, 1);
    assert.equal(w.authOf("s1").disabled, true);
    assert.equal(w.profile("s1").status, "inactive");
    assert.equal(w.lease("s1"), null);
    // After reconcile releases, the admin can retry and reactivate.
    const retry = await route(w, "active");
    assert.equal(retry.status, 200);
  });

  test("profile changed during the repair (writer outside the lease): conflict, marker not written, exit 2", async () => {
    const w = makeWorld({ s1: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false } } });
    const gate = w.pauseAt("updateUser:true");
    const rec = run(w, { apply: true, uid: "s1" });
    await gate.reached;
    w.touchProfile("s1", { status: "active", disabled: false });
    gate.release();
    const r = await rec;
    assert.equal(r.conflicts, 1);
    assert.equal(r.repaired, 0);
    assert.equal(exitCodeFor(r), 2);
    assert.equal(w.profile("s1").statusSync, undefined, "no marker claims the account is synced");
    assert.equal(w.mutations.some((m) => m.op === "profile.update"), false);
  });

  test("an unexpired lease held by another writer blocks both writers; an expired one does not", async () => {
    const live = makeFakeAccountWorld({ users: { s1: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false } } }, leases: { s1: { holder: "other", expiresAtMs: Date.now() + 60_000 } } });
    const r = await reconcileAccounts({ db: live.db, auth: live.auth, apply: true, log: () => {} });
    assert.equal(r.busy, 1);
    assert.equal((await route(live, "active")).status, 409);
    assert.equal(live.mutations.length, 0);

    const stale = makeFakeAccountWorld({ users: { s1: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false } } }, leases: { s1: { holder: "crashed", expiresAtMs: Date.now() - 1 } } });
    const r2 = await reconcileAccounts({ db: stale.db, auth: stale.auth, apply: true, log: () => {} });
    assert.equal(r2.repaired, 1);
    assert.equal(stale.lease("s1"), null);
  });

  test("lease unavailable: reconcile skips (exit 2), PATCH returns 503, nothing written", async () => {
    const w = makeWorld({ s1: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false } } });
    w.failures.transaction = 1;
    const r = await run(w, { apply: true, uid: "s1" });
    assert.equal(r.leaseErrors, 1);
    assert.equal(exitCodeFor(r), 2);
    w.failures.transaction = 1;
    assert.equal((await route(w, "active")).status, 503);
    assert.deepEqual(w.mutations, []);
  });

  test("state changed between the first read and the lease: re-decided under the lease", async () => {
    const w = makeWorld({ s1: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false } } });
    // Simulate an admin finishing a reactivation right after the scan read.
    let reads = 0;
    const db = { ...w.db, collection: (name) => {
      const c = w.db.collection(name);
      if (name !== "users") return c;
      return { ...c, doc: (id) => { const ref = c.doc(id); return { ...ref, get: async () => { reads += 1; if (reads === 2) w.touchProfile("s1", { status: "active", disabled: false }); return ref.get(); } }; } };
    } };
    const r = await reconcileAccounts({ db, auth: w.auth, apply: true, uid: "s1", log: () => {} });
    assert.equal(r.repaired, 0);
    assert.equal(r.consistent, 1);
    assert.equal(w.mutations.some((m) => m.op === "auth.updateUser"), false, "never disabled a just-reactivated user");
  });
});

describe("CLI arguments (validated before credentials or any write)", () => {
  test("parseArgs accepts --apply and both UID forms", () => {
    assert.deepEqual(parseArgs([]), { apply: false });
    assert.deepEqual(parseArgs(["--apply"]), { apply: true });
    assert.deepEqual(parseArgs(["--uid=abc"]), { apply: false, uid: "abc" });
    assert.deepEqual(parseArgs(["--apply", "--uid=abc"]), { apply: true, uid: "abc" });
    assert.deepEqual(parseArgs(["--uid", "abc"]), { apply: false, uid: "abc" });
    assert.deepEqual(parseArgs(["--uid", "abc", "--apply"]), { apply: true, uid: "abc" });
    for (const bad of [["--uid="], ["--apply", "--uid="], ["--uid=", "--apply"], ["--uid"], ["--uid", "--apply"], ["--uid", ""], ["--uid=.."], ["--uid=__reserved__"], ["--uid=x\n"], ["--uid", "a", "--uid=b"], ["--uid=   "], ["--uid= abc"], ["--uid=a", "--uid=b"], ["--uid=a/b"], [`--uid=${"x".repeat(129)}`], ["--aply"], ["abc"]]) {
      assert.ok(parseArgs(bad).error, `should reject ${JSON.stringify(bad)}`);
    }
  });

  for (const argv of [["--uid="], ["--apply", "--uid="], ["--uid"]]) {
    test(`main ${JSON.stringify(argv)} exits 64 without loading credentials, scanning or writing`, async () => {
      let loaded = 0;
      const errs = [];
      const code = await main({ argv, env: { FIREBASE_SERVICE_ACCOUNT: "{not used}" }, loadFirebase: async () => { loaded += 1; throw new Error("must not load"); }, out: () => {}, err: (l) => errs.push(l) });
      assert.equal(code, 64);
      assert.equal(loaded, 0, "credentials/Firebase never loaded");
      assert.match(errs.join("\n"), /Invalid --uid/);
    });
  }

  test("omitted --uid keeps the full scan (dry run, fake world)", async () => {
    const w = makeWorld({ a: { profile: { ...INACTIVE }, auth: { disabled: false } }, b: { profile: { ...ACTIVE }, auth: { disabled: false } } });
    const out = [];
    const code = await main({ argv: [], env: { FIREBASE_SERVICE_ACCOUNT: "x" }, loadFirebase: async () => ({ db: w.db, auth: w.auth }), out: (l) => out.push(l), err: () => {} });
    assert.equal(code, 0);
    const summary = JSON.parse(out.at(-1));
    assert.equal(summary.mode, "dry-run");
    assert.equal(summary.scanned, 2);
    assert.deepEqual(w.mutations, []);
  });

  test("--uid=<uid> scans exactly one account; missing credentials exit 1 before loading", async () => {
    const w = makeWorld({ a: { profile: { ...INACTIVE }, auth: { disabled: false } }, b: { profile: { ...ACTIVE }, auth: { disabled: false } } });
    const out = [];
    assert.equal(await main({ argv: ["--uid=a"], env: { FIREBASE_SERVICE_ACCOUNT: "x" }, loadFirebase: async () => ({ db: w.db, auth: w.auth }), out: (l) => out.push(l), err: () => {} }), 0);
    assert.equal(JSON.parse(out.at(-1)).scanned, 1);
    let loaded = 0;
    assert.equal(await main({ argv: [], env: {}, loadFirebase: async () => { loaded += 1; }, out: () => {}, err: () => {} }), 1);
    assert.equal(loaded, 0);
  });

  test("lookup errors make main exit 2", async () => {
    const w = makeWorld({ a: { profile: { ...INACTIVE }, auth: Object.assign(new Error("x"), { code: "auth/internal-error" }) } });
    assert.equal(await main({ argv: [], env: { FIREBASE_SERVICE_ACCOUNT: "x" }, loadFirebase: async () => ({ db: w.db, auth: w.auth }), out: () => {}, err: () => {} }), 2);
  });
});


describe("UID and legacy profile safety", () => {
  test("programmatic malformed UID never accesses the database", async () => {
    const db = { collection: () => assert.fail("must not access database") };
    for (const uid of ["", " ", " leading", "trailing ", "one/two", ".", "..", "__reserved__", "a".repeat(129), "one\n", null, 42]) {
      await assert.rejects(reconcileAccounts({ db, auth: {}, apply: true, uid }), /Invalid --uid/);
    }
  });
  test("deactivation detects a concurrent profile update and never overwrites it", async () => {
    const w = makeWorld({ one: { profile: ACTIVE, auth: { disabled: true } } });
    const gate = w.pauseAt("profileUpdate");
    const repair = run(w, { apply: true });
    await gate.reached;
    w.touchProfile("one", { statusUpdatedBy: "admin" });
    gate.release();
    const result = await repair;
    assert.equal(result.conflicts, 1);
    assert.equal(exitCodeFor(result), 2);
    assert.equal(w.profile("one").status, "active");
    assert.equal(w.profile("one").statusUpdatedBy, "admin");
    assert.deepEqual(w.mutations, []);
  });
  test("legacy profiles are report-only; explicit inactivity disables and revokes", async () => {
    const w = makeWorld({ legacy: { profile: { role: "student" }, auth: { disabled: false } }, inactive: { profile: INACTIVE, auth: { disabled: false } } });
    const summary = await run(w, { apply: true });
    assert.equal(summary.reported, 1);
    assert.equal(summary.repaired, 1);
    assert.equal(w.mutations.some((m) => m.uid === "legacy"), false);
    assert.deepEqual(w.mutations.filter((m) => m.uid === "inactive").map((m) => m.op), ["auth.updateUser", "auth.revoke", "profile.update"]);
  });
  test("both UID forms filter the actual CLI operation", async () => {
    for (const argv of [["--uid=a"], ["--uid", "a"]]) {
      const w = makeWorld({ a: { profile: INACTIVE, auth: { disabled: false } }, b: { profile: INACTIVE, auth: { disabled: false } } });
      const out = [];
      assert.equal(await main({ argv, env: { FIREBASE_SERVICE_ACCOUNT: "x" }, loadFirebase: async () => ({ db: w.db, auth: w.auth }), out: (line) => out.push(line), err: () => {} }), 0);
      assert.equal(JSON.parse(out.at(-1)).scanned, 1);
    }
  });
});
