#!/usr/bin/env node
/**
 * Find and repair Firebase Auth / Firestore account-status mismatches left by
 * a partially failed activate/deactivate (see transitionAccountStatus in
 * src/lib/accountStatus.mjs and "RECONCILE REQUIRED" log lines).
 *
 *   FIREBASE_SERVICE_ACCOUNT='<json>' node scripts/reconcile-account-status.mjs            # dry run (default)
 *   FIREBASE_SERVICE_ACCOUNT='<json>' node scripts/reconcile-account-status.mjs --uid=<uid> # one account
 *   FIREBASE_SERVICE_ACCOUNT='<json>' node scripts/reconcile-account-status.mjs --apply    # repair
 *
 * Only ever reduces access (decideReconciliation):
 *   - profile active, Auth disabled/missing -> profile set inactive
 *   - legacy profile missing status, Auth enabled -> report for backfill
 *   - profile not active, Auth enabled      -> Auth disabled + tokens revoked
 *   - stores agree but statusSync pending/failed -> marker set to synced
 * It never enables an Auth user and never activates a profile; reactivation
 * is always an explicit admin action through the API. Admin accounts are
 * reported but never modified: an account is treated as admin when its
 * profile has role "admin" OR its Firebase Auth custom claims carry
 * admin === true (or role "admin"). If the Auth lookup for an account fails
 * for any reason other than user-not-found, that account is skipped and
 * reported, never changed, and the process exits non-zero.
 *
 * --apply coordination: every account is repaired under the per-account
 * lease shared with PATCH /api/admin/students/[id] (withAccountStatusLease),
 * re-read and re-decided under that lease, and every profile write carries an
 * update-time precondition. A busy lease, a lease error, a precondition
 * conflict or a failed action skips/flags that account (marker kept) and the
 * process exits 2. Dry runs take no lease and write nothing.
 *
 * Arguments are validated before credentials are read: only --apply and
 * --uid=<uid> or --uid <uid> are accepted. An explicit empty --uid= (or a bare
 * --uid) is rejected with exit 64 and never becomes a full scan.
 * Logs contain uids only.
 */

import { pathToFileURL } from "node:url";
import { randomUUID } from "node:crypto";
import { decideReconciliation, isProtectedAdminAccount, withAccountStatusLease } from "../src/lib/accountStatus.mjs";

const isPreconditionFailure = (error) => error?.code === 9 || error?.code === "failed-precondition";

/** Reads the profile and Auth state for one account and decides what to do. */
async function evaluate(snap, auth) {
  const profile = snap.data();
  let authUser = { exists: false, disabled: true };
  let customClaims = null;
  try {
    const record = await auth.getUser(snap.id);
    authUser = { exists: true, disabled: Boolean(record.disabled) };
    customClaims = record.customClaims || null;
  } catch (error) {
    if (error?.code !== "auth/user-not-found") {
      // Fail closed: without authoritative Auth state (including admin
      // claims) this account is never touched.
      return { lookupError: error?.code || "unknown" };
    }
  }
  const decision = decideReconciliation(profile, authUser);
  return { profile, decision, isAdmin: isProtectedAdminAccount(profile, customClaims) };
}

/** A filter must name one Firebase UID and one Firestore document. */
function validateUid(uid) {
  if (typeof uid !== "string" || uid.length === 0 || uid.length > 128 || uid.trim() !== uid
    || uid.includes("/") || Array.from(uid).some((char) => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)
    || uid === "." || uid === ".." || /^__.*__$/u.test(uid)) {
    throw new Error("Invalid --uid: expected a non-empty Firebase UID of at most 128 characters naming one user document.");
  }
  return uid;
}

export function parseReconcileArgs(args) {
  const filters = [];
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === "--uid") {
      const value = args[++i];
      if (value === undefined || value.startsWith("--")) {
        throw new Error("Invalid --uid: expected a following UID value.");
      }
      filters.push(value);
    } else if (args[i].startsWith("--uid=")) {
      filters.push(args[i].slice(6));
    } else if (args[i] !== "--apply") {
      throw new Error(`Unknown argument: ${args[i].slice(0, 40)}`);
    }
  }
  if (filters.length > 1) throw new Error("Invalid --uid: supply the filter only once.");
  return {
    apply: args.includes("--apply"),
    ...(filters.length ? { uid: validateUid(filters[0]) } : {}),
  };
}

/**
 * Reconcile users/{uid} profiles against Firebase Auth. Dry run unless
 * apply === true. Dependencies are injected so the logic is unit-testable
 * without credentials.
 *
 * @param {{ db: object, auth: object, apply?: boolean, uid?: string,
 *           log?: (line: string) => void, now?: () => string }} deps
 */
export async function reconcileAccounts({ db, auth, apply = false, uid, log = console.log, now = () => new Date().toISOString(), leaseOptions = {} }) {
  if (uid !== undefined) validateUid(uid);
  const docs = uid !== undefined
    ? [await db.collection("users").doc(uid).get()].filter((d) => d.exists)
    : (await db.collection("users").get()).docs;
  const counts = { scanned: 0, consistent: 0, repaired: 0, reported: 0, skippedAdmin: 0, lookupErrors: 0, busy: 0, leaseErrors: 0, conflicts: 0, applyErrors: 0 };
  const at = now();
  const opId = `reconcile-${randomUUID()}`;

  for (const doc of docs) {
    counts.scanned += 1;
    const first = await evaluate(doc, auth);
    if (first.lookupError) {
      counts.lookupErrors += 1;
      log(`skipped (auth lookup failed: ${first.lookupError}) users/${doc.id}`);
      continue;
    }
    if (!first.decision) { counts.consistent += 1; continue; }
    if (first.isAdmin) {
      counts.skippedAdmin += 1;
      log(`report-only (admin) users/${doc.id}: ${first.decision.issue}`);
      continue;
    }
    if (first.decision.actions.length === 0) {
      counts.reported += 1;
      log(`report-only users/${doc.id}: ${first.decision.issue}`);
      continue;
    }
    log(`${apply === true ? "repair" : "would repair"} users/${doc.id}: ${first.decision.issue} -> ${first.decision.actions.join(", ")}`);
    if (apply !== true) { counts.reported += 1; continue; }

    const lease = await withAccountStatusLease({ db, uid: doc.id, holder: `${opId}:${doc.id}`, logger: { error: () => {}, warn: () => {} }, ...leaseOptions }, async () => {
      // Re-read and re-decide under the lease; act only on this state.
      const snap = await db.collection("users").doc(doc.id).get();
      if (!snap.exists) return "gone";
      const cur = await evaluate(snap, auth);
      if (cur.lookupError) return "lookup_error";
      if (!cur.decision || cur.decision.actions.length === 0) return "resolved";
      if (cur.isAdmin) return "admin";
      const guard = { lastUpdateTime: snap.updateTime };
      const marker = { target: "inactive", auth: "synced", result: "reconciled", opId, at };
      let authTouched = false;
      for (const action of cur.decision.actions) {
        if (action === "profile:deactivate") {
          await snap.ref.update({ status: "inactive", disabled: true, statusUpdatedAt: at, statusUpdatedBy: "reconcile-script", statusSync: marker }, guard);
        } else if (action === "auth:disable") {
          await auth.updateUser(snap.id, { disabled: true });
          authTouched = true;
        } else if (action === "auth:revoke") {
          await auth.revokeRefreshTokens(snap.id);
          authTouched = true;
        } else if (action === "marker:clear") {
          await snap.ref.update({ statusSync: { ...cur.profile.statusSync, auth: "synced", result: "reconciled", at } }, guard);
          authTouched = false;
        }
      }
      // Record the Auth repair on the profile only if it is unchanged since
      // the read under the lease (a precondition failure is a conflict).
      if (authTouched) await snap.ref.update({ statusSync: marker }, guard);
      return "repaired";
    }).catch((error) => ({ ok: true, value: isPreconditionFailure(error) ? "conflict" : { error } }));

    if (!lease.ok) {
      if (lease.reason === "busy") { counts.busy += 1; log(`skipped (status change in progress) users/${doc.id}`); }
      else { counts.leaseErrors += 1; log(`skipped (lease unavailable) users/${doc.id}`); }
      continue;
    }
    const outcome = lease.value;
    if (outcome === "repaired") counts.repaired += 1;
    else if (outcome === "conflict") { counts.conflicts += 1; log(`RECONCILE CONFLICT users/${doc.id}: profile changed during repair; marker not written, rerun`); }
    else if (outcome === "lookup_error") { counts.lookupErrors += 1; log(`skipped (auth lookup failed under lease) users/${doc.id}`); }
    else if (outcome === "admin") { counts.skippedAdmin += 1; log(`report-only (admin) users/${doc.id}`); }
    else if (outcome === "gone" || outcome === "resolved") { counts.consistent += 1; log(`no longer needs repair users/${doc.id}`); }
    else { counts.applyErrors += 1; log(`FAILED users/${doc.id}: ${outcome?.error?.code || "error"}; marker kept, rerun`); }
  }
  return { mode: apply === true ? "apply" : "dry-run", ...counts };
}

/** Exit code for a summary: 2 whenever any account was skipped or flagged for safety. */
export function exitCodeFor(summary) {
  return summary.lookupErrors + summary.busy + summary.leaseErrors + summary.conflicts + summary.applyErrors > 0 ? 2 : 0;
}

/** Validate CLI arguments before loading credentials. */
export function parseArgs(argv) {
  try {
    const options = parseReconcileArgs(argv);
    return { apply: options.apply, uid: options.uid ?? "" };
  } catch (error) {
    return { error: error.message };
  }
}

export async function main({
  argv = process.argv.slice(2),
  env = process.env,
  loadFirebase = defaultLoadFirebase,
  out = console.log,
  err = console.error,
} = {}) {
  const args = parseArgs(argv);
  if (args.error) {
    err(`${args.error} Usage: reconcile-account-status.mjs [--uid=<uid> | --uid <uid>] [--apply]`);
    return 64;
  }
  const raw = env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    err("FIREBASE_SERVICE_ACCOUNT is not set.");
    return 1;
  }
  const { db, auth } = await loadFirebase(raw);
  const summary = await reconcileAccounts({ db, auth, apply: args.apply, ...(args.uid ? { uid: args.uid } : {}), log: out });
  out(JSON.stringify(summary));
  return exitCodeFor(summary);
}

async function defaultLoadFirebase(raw) {
  const { cert, initializeApp } = await import("firebase-admin/app");
  const { getAuth } = await import("firebase-admin/auth");
  const { getFirestore } = await import("firebase-admin/firestore");
  const app = initializeApp({ credential: cert(JSON.parse(raw)) });
  return { db: getFirestore(app), auth: getAuth(app) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then((code) => { process.exitCode = code; }, (error) => {
    console.error(error?.code || "", error?.message || error);
    process.exit(1);
  });
}
