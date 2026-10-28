#!/usr/bin/env node
/**
 * Backfill users/{uid}.status and users/{uid}.disabled before deploying the
 * account-status Firestore rules.
 *
 * The rules fail closed: a profile without status == 'active' is denied.
 * Older profiles were created without a status field, so run this first.
 *
 *   FIREBASE_SERVICE_ACCOUNT='<json>' node scripts/backfill-account-status.mjs           # dry run (default)
 *   FIREBASE_SERVICE_ACCOUNT='<json>' node scripts/backfill-account-status.mjs --apply   # write changes
 *
 * Never deletes anything. Only profiles whose status is missing or malformed
 * are changed. The status is derived from Firebase Auth (the trusted source):
 * an Auth user that is disabled, missing, or already flagged disabled in the
 * profile becomes 'inactive'; everyone else becomes 'active'.
 */

const VALID = new Set(["active", "inactive"]);

/**
 * Decide the backfill for one profile. Returns null when nothing changes.
 * @param {object} profile    Firestore profile data
 * @param {{exists:boolean, disabled:boolean}} authUser  Firebase Auth state
 */
export function decideAccountStatus(profile = {}, authUser = { exists: false, disabled: true }) {
  const status = profile?.status;
  const hasValidStatus = typeof status === "string" && VALID.has(status);
  const hasValidDisabled = typeof profile?.disabled === "boolean";
  if (hasValidStatus && hasValidDisabled && (status === "active") === !profile.disabled) return null;

  if (hasValidStatus && status === "inactive") return { status: "inactive", disabled: true };

  const inactive = !authUser?.exists || authUser.disabled === true || profile?.disabled === true;
  return inactive ? { status: "inactive", disabled: true } : { status: "active", disabled: false };
}

async function main() {
  const apply = process.argv.includes("--apply");
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

  const snapshot = await db.collection("users").get();
  const counts = { scanned: 0, unchanged: 0, active: 0, inactive: 0 };
  let batch = db.batch();
  let pending = 0;

  for (const doc of snapshot.docs) {
    counts.scanned += 1;
    let authUser = { exists: false, disabled: true };
    try {
      const record = await auth.getUser(doc.id);
      authUser = { exists: true, disabled: Boolean(record.disabled) };
    } catch (error) {
      if (error?.code !== "auth/user-not-found") throw error;
    }
    const change = decideAccountStatus(doc.data(), authUser);
    if (!change) {
      counts.unchanged += 1;
      continue;
    }
    counts[change.status] += 1;
    console.log(`${apply ? "update" : "would update"} users/${doc.id}: status=${change.status} disabled=${change.disabled}`);
    if (apply) {
      batch.update(doc.ref, { ...change, statusBackfilledAt: new Date().toISOString() });
      pending += 1;
      if (pending === 400) {
        await batch.commit();
        batch = db.batch();
        pending = 0;
      }
    }
  }
  if (apply && pending) await batch.commit();
  console.log(JSON.stringify({ mode: apply ? "apply" : "dry-run", ...counts }));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
