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
 * Logs contain uids only.
 */

import { pathToFileURL } from "node:url";
import { decideReconciliation, isProtectedAdminAccount } from "../src/lib/accountStatus.mjs";

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
export async function reconcileAccounts({ db, auth, apply = false, uid, log = console.log, now = () => new Date().toISOString() }) {
  if (uid !== undefined) validateUid(uid);
  const docs = uid !== undefined
    ? [await db.collection("users").doc(uid).get()].filter((d) => d.exists)
    : (await db.collection("users").get()).docs;
  const counts = { scanned: 0, consistent: 0, repaired: 0, reported: 0, skippedAdmin: 0, lookupErrors: 0, conflicts: 0 };
  const at = now();

  for (const doc of docs) {
    counts.scanned += 1;
    const profile = doc.data();
    let authUser = { exists: false, disabled: true };
    let customClaims = null;
    try {
      const record = await auth.getUser(doc.id);
      authUser = { exists: true, disabled: Boolean(record.disabled) };
      customClaims = record.customClaims || null;
    } catch (error) {
      if (error?.code !== "auth/user-not-found") {
        // Fail closed: without authoritative Auth state (including admin
        // claims) this account is never touched.
        counts.lookupErrors += 1;
        log(`skipped (auth lookup failed: ${error?.code || "unknown"}) users/${doc.id}`);
        continue;
      }
    }
    const decision = decideReconciliation(profile, authUser);
    if (!decision) {
      counts.consistent += 1;
      continue;
    }
    if (isProtectedAdminAccount(profile, customClaims)) {
      counts.skippedAdmin += 1;
      log(`report-only (admin) users/${doc.id}: ${decision.issue}`);
      continue;
    }
    if (decision.actions.length === 0) {
      counts.reported += 1;
      log(`report-only users/${doc.id}: ${decision.issue}`);
      continue;
    }
    log(`${apply ? "repair" : "would repair"} users/${doc.id}: ${decision.issue} -> ${decision.actions.join(", ")}`);
    if (apply !== true) {
      counts.reported += 1;
      continue;
    }
    const marker = { target: "inactive", auth: "synced", result: "reconciled", opId: `reconcile-${at}`, at };
    try {
      for (const action of decision.actions) {
        if (action === "profile:deactivate") {
          await doc.ref.update({ status: "inactive", disabled: true, statusUpdatedAt: at, statusUpdatedBy: "reconcile-script", statusSync: marker }, { lastUpdateTime: doc.updateTime });
        } else if (action === "auth:disable") {
          await auth.updateUser(doc.id, { disabled: true });
        } else if (action === "auth:revoke") {
          await auth.revokeRefreshTokens(doc.id);
          await doc.ref.update({ statusSync: marker });
        } else if (action === "marker:clear") {
          await doc.ref.update({ statusSync: { ...profile.statusSync, auth: "synced", result: "reconciled", at } });
        }
      }
    } catch (error) {
      if (error?.code !== 9 && error?.code !== "failed-precondition") throw error;
      counts.conflicts += 1;
      log(`conflict users/${doc.id}: profile changed since it was read; retry reconciliation`);
      continue;
    }
    counts.repaired += 1;
  }
  return { mode: apply === true ? "apply" : "dry-run", ...counts };
}

async function main() {
  const options = parseReconcileArgs(process.argv.slice(2));
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    console.error("FIREBASE_SERVICE_ACCOUNT is not set.");
    process.exit(1);
  }
  const { cert, initializeApp } = await import("firebase-admin/app");
  const { getAuth } = await import("firebase-admin/auth");
  const { getFirestore } = await import("firebase-admin/firestore");
  const app = initializeApp({ credential: cert(JSON.parse(raw)) });
  const summary = await reconcileAccounts({ db: getFirestore(app), auth: getAuth(app), ...options });
  console.log(JSON.stringify(summary));
  if (summary.lookupErrors > 0 || summary.conflicts > 0) process.exitCode = 2;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error?.code || "", error?.message || error);
    process.exit(1);
  });
}
