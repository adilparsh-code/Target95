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
 *   - profile not active, Auth enabled      -> Auth disabled + tokens revoked
 *   - stores agree but statusSync pending/failed -> marker set to synced
 * It never enables an Auth user and never activates a profile; reactivation
 * is always an explicit admin action through the API. Admin accounts are
 * reported but never modified. Logs contain uids only.
 */

import { pathToFileURL } from "node:url";
import { decideReconciliation } from "../src/lib/accountStatus.mjs";

async function main() {
  const apply = process.argv.includes("--apply");
  const uidArg = process.argv.find((a) => a.startsWith("--uid="))?.slice(6) || "";
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    console.error("FIREBASE_SERVICE_ACCOUNT is not set.");
    process.exit(1);
  }
  const { cert, initializeApp } = await import("firebase-admin/app");
  const { getAuth } = await import("firebase-admin/auth");
  const { getFirestore } = await import("firebase-admin/firestore");
  const app = initializeApp({ credential: cert(JSON.parse(raw)) });
  const auth = getAuth(app);
  const db = getFirestore(app);

  const docs = uidArg
    ? [await db.collection("users").doc(uidArg).get()].filter((d) => d.exists)
    : (await db.collection("users").get()).docs;
  const counts = { scanned: 0, consistent: 0, repaired: 0, reported: 0, skippedAdmin: 0 };
  const at = new Date().toISOString();

  for (const doc of docs) {
    counts.scanned += 1;
    const profile = doc.data();
    let authUser = { exists: false, disabled: true };
    try {
      const record = await auth.getUser(doc.id);
      authUser = { exists: true, disabled: Boolean(record.disabled) };
    } catch (error) {
      if (error?.code !== "auth/user-not-found") throw error;
    }
    const decision = decideReconciliation(profile, authUser);
    if (!decision) {
      counts.consistent += 1;
      continue;
    }
    if (profile?.role === "admin") {
      counts.skippedAdmin += 1;
      console.log(`report-only (admin) users/${doc.id}: ${decision.issue}`);
      continue;
    }
    if (decision.actions.length === 0) {
      counts.reported += 1;
      console.log(`report-only users/${doc.id}: ${decision.issue}`);
      continue;
    }
    console.log(`${apply ? "repair" : "would repair"} users/${doc.id}: ${decision.issue} -> ${decision.actions.join(", ")}`);
    if (!apply) {
      counts.reported += 1;
      continue;
    }
    const marker = { target: "inactive", auth: "synced", result: "reconciled", opId: `reconcile-${at}`, at };
    for (const action of decision.actions) {
      if (action === "profile:deactivate") {
        await doc.ref.update({ status: "inactive", disabled: true, statusUpdatedAt: at, statusUpdatedBy: "reconcile-script", statusSync: marker });
      } else if (action === "auth:disable") {
        await auth.updateUser(doc.id, { disabled: true });
      } else if (action === "auth:revoke") {
        await auth.revokeRefreshTokens(doc.id);
        await doc.ref.update({ statusSync: marker });
      } else if (action === "marker:clear") {
        await doc.ref.update({ statusSync: { ...profile.statusSync, auth: "synced", result: "reconciled", at } });
      }
    }
    counts.repaired += 1;
  }
  console.log(JSON.stringify({ mode: apply ? "apply" : "dry-run", ...counts }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error?.code || "", error?.message || error);
    process.exit(1);
  });
}
