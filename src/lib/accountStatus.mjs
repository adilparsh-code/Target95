/**
 * Account status: one definition shared by the server and the status
 * transition, mirroring isActiveProfile() in firestore.rules.
 *
 * Fail closed: a missing profile, a status other than the string 'active',
 * or a disabled flag other than boolean false is NOT active.
 */
export function isActiveProfile(data) {
  if (!data || typeof data !== "object") return false;
  const disabled = Object.prototype.hasOwnProperty.call(data, "disabled") ? data.disabled : false;
  return data.status === "active" && disabled === false;
}

/** Reads users/{uid} with the Admin SDK and applies isActiveProfile(). */
export async function hasActiveProfile(adminDb, uid) {
  if (!uid || typeof uid !== "string") return false;
  const snap = await adminDb.collection("users").doc(uid).get();
  return snap.exists === true && isActiveProfile(snap.data());
}

/**
 * Server-side session check used by every session-authenticated API.
 * Returns the decoded token only when ALL hold:
 *   - the session cookie verifies with checkRevoked=true (rejects revoked
 *     tokens and disabled Auth users),
 *   - the email is verified,
 *   - users/{uid} is an active profile (same invariant as firestore.rules).
 * Any error fails closed (null).
 */
export async function verifyActiveSession(sessionCookie, { auth, adminDb }) {
  if (!sessionCookie) return null;
  try {
    const decoded = await auth.verifySessionCookie(sessionCookie, true);
    if (decoded?.email_verified !== true) return null;
    if (!(await hasActiveProfile(adminDb, decoded.uid))) return null;
    return decoded;
  } catch {
    return null;
  }
}

const DEFAULT_RETRY_DELAYS_MS = [200, 800];
const sleepMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const defaultOpId = () =>
  (globalThis.crypto?.randomUUID?.() ?? `op-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);

/**
 * Change a student's account status across Firestore and Firebase Auth so
 * that every partial failure leaves the account LESS privileged, never more.
 *
 * Access depends on both stores:
 *   - Firestore rules and server APIs require an active profile.
 *   - Sign-in and existing server sessions require an enabled Auth user
 *     with unrevoked refresh tokens.
 *   - A Firebase ID token already issued stays valid for Firestore until it
 *     expires (at most 1 hour after issue); Firestore rules see only the
 *     token's frozen claims and the profile document, never live Auth state.
 *
 * Deactivate (target 'inactive'):
 *   1. Firestore -> inactive first. Rules and server APIs deny at once,
 *      including requests that carry a still-valid ID token.
 *   2. Auth -> disabled + revoke refresh tokens, ALWAYS attempted, even if
 *      step 1 failed, because blocking sign-in is still the safe direction.
 *   3. If step 1 failed, retry the Firestore write with bounded backoff.
 *   No path ever re-enables anything.
 *   Residual: if every Firestore attempt fails, a previously issued ID token
 *   can still pass Firestore rules until it expires (<= 1 hour). No Firestore
 *   rule can learn about the deactivation without a successful Firestore
 *   write, so this window cannot be closed here; it is reported as
 *   'partial_auth_only' and repaired by retry or the reconcile script.
 *
 * Reactivate (target 'active'):
 *   0. Revoke refresh tokens first, so sessions from before a deactivation
 *      whose revocation failed can never be restored. Failure -> no change.
 *   1. Auth -> enabled. While the profile is still inactive, rules and
 *      server APIs keep denying, so this alone grants nothing.
 *   2. Firestore -> active, guarded by `expectedUpdateTime` when given, so a
 *      deactivation that landed after the caller read the profile wins.
 *   3. If step 2 fails, roll Auth back to disabled and revoke tokens issued
 *      in the gap. If the rollback also fails the account is still denied
 *      everywhere that reads the profile; it is flagged for reconciliation.
 *
 * Every write is idempotent; retrying the same request converges, and a
 * deactivation retry can never reactivate. Each attempt carries an opId that
 * appears in statusSync and in every log line (no tokens or personal data).
 *
 * @returns {{ ok: boolean, httpStatus: number, outcome: string, message: string, opId: string }}
 */
export async function transitionAccountStatus({
  uid,
  target,
  auth,
  profileRef,
  actorUid = "admin",
  expectedUpdateTime = null,
  now = () => new Date().toISOString(),
  logger = console,
  sleep = sleepMs,
  retryDelaysMs = DEFAULT_RETRY_DELAYS_MS,
  opId = defaultOpId(),
}) {
  if (target !== "active" && target !== "inactive") {
    throw new Error(`Invalid account status target: ${target}`);
  }
  const context = { opId, uid, target, actorUid };
  const errorInfo = (error) => ({ code: error?.code ?? null, message: String(error?.message || error).slice(0, 300) });
  const sync = (auth, result) => ({ target, auth, result, opId, at: now() });
  const profileFields = (authSync, result) => ({
    status: target,
    disabled: target === "inactive",
    statusUpdatedAt: now(),
    statusUpdatedBy: actorUid,
    statusSync: sync(authSync, result),
  });
  const markSync = async (authSync, result) => {
    try {
      await profileRef.update({ statusSync: sync(authSync, result) });
    } catch (error) {
      // Access state is already correct; only the audit marker is stale.
      logger.warn("[account-status] could not record statusSync marker", { ...context, authSync, result, error: errorInfo(error) });
    }
  };
  const done = (ok, httpStatus, outcome, message) => ({ ok, httpStatus, outcome, message, opId });

  if (target === "inactive") {
    let firestoreError = null;
    try {
      await profileRef.update(profileFields("pending", "pending"));
    } catch (error) {
      firestoreError = error;
      logger.error("[account-status] deactivate: Firestore write failed; disabling Auth anyway", { ...context, error: errorInfo(error) });
    }

    let authError = null;
    try {
      await auth.updateUser(uid, { disabled: true });
      await auth.revokeRefreshTokens(uid);
    } catch (error) {
      authError = error;
    }

    for (let i = 0; firestoreError && i < retryDelaysMs.length; i += 1) {
      await sleep(retryDelaysMs[i]);
      try {
        await profileRef.update(profileFields(authError ? "failed" : "synced", authError ? "partial_profile_only" : "deactivated"));
        firestoreError = null;
      } catch (error) {
        firestoreError = error;
      }
    }

    if (!firestoreError && !authError) {
      await markSync("synced", "deactivated");
      return done(true, 200, "deactivated", "Account deactivated.");
    }

    if (firestoreError && authError) {
      logger.error("[account-status] RECONCILE REQUIRED deactivate: Firestore write failed and Auth disable/revoke did not complete; the profile is still active", {
        ...context, firestoreError: errorInfo(firestoreError), authError: errorInfo(authError),
      });
      return done(false, 500, "unchanged", "Deactivation failed. The profile is still active. Please retry.");
    }

    if (firestoreError) {
      logger.error("[account-status] RECONCILE REQUIRED deactivate: Auth disabled and tokens revoked, but the Firestore profile is still active; already-issued ID tokens can reach Firestore until they expire (<= 1h)", {
        ...context, firestoreError: errorInfo(firestoreError),
      });
      return done(false, 502, "partial_auth_only",
        "Sign-in and sessions are blocked, but the profile could not be updated. Retry now to finish deactivation.");
    }

    await markSync("failed", "partial_profile_only");
    logger.error("[account-status] RECONCILE REQUIRED deactivate: profile is inactive (access denied) but Firebase Auth could not be disabled or tokens not revoked", {
      ...context, authError: errorInfo(authError),
    });
    return done(false, 502, "partial_profile_only",
      "Access is blocked, but Firebase Auth could not be disabled. Retry to finish deactivation.");
  }

  // target === 'active'
  // Revoke BEFORE enabling Auth. A deactivation whose token revocation failed
  // (partial_profile_only, or a pending/failed statusSync marker) leaves
  // pre-deactivation sessions and refresh tokens unrevoked; enabling Auth
  // alone would bring them back. Revoking here makes every reactivation start
  // from a clean session state, whatever the earlier marker says. If the
  // revocation fails nothing has changed and the account stays inactive.
  try {
    await auth.revokeRefreshTokens(uid);
  } catch (error) {
    logger.error("[account-status] reactivate: token revocation failed; Auth not enabled, account remains inactive", { ...context, error: errorInfo(error) });
    return done(false, 500, "unchanged", "Reactivation failed. The account is still inactive. Please retry.");
  }
  try {
    await auth.updateUser(uid, { disabled: false });
  } catch (error) {
    logger.error("[account-status] reactivate: Auth enable failed; account remains inactive", { ...context, error: errorInfo(error) });
    return done(false, 500, "unchanged", "Reactivation failed. The account is still inactive. Please retry.");
  }

  try {
    const fields = profileFields("synced", "activated");
    if (expectedUpdateTime) await profileRef.update(fields, { lastUpdateTime: expectedUpdateTime });
    else await profileRef.update(fields);
    return done(true, 200, "activated", "Account activated.");
  } catch (firestoreError) {
    const conflict = firestoreError?.code === 9 || firestoreError?.code === "failed-precondition";
    try {
      await auth.updateUser(uid, { disabled: true });
      await auth.revokeRefreshTokens(uid);
      logger.error(`[account-status] reactivate: ${conflict ? "profile changed concurrently" : "Firestore write failed"}; Auth rolled back to disabled`, {
        ...context, error: errorInfo(firestoreError),
      });
      return conflict
        ? done(false, 409, "conflict", "The account was changed by another request. It is still inactive. Reload and retry.")
        : done(false, 500, "rolled_back", "Reactivation failed and was rolled back. The account is still inactive. Please retry.");
    } catch (rollbackError) {
      logger.error("[account-status] RECONCILE REQUIRED reactivate: Firestore write and Auth rollback both failed; Auth is enabled but the profile is inactive, so access stays denied", {
        ...context, firestoreError: errorInfo(firestoreError), rollbackError: errorInfo(rollbackError),
      });
      return done(false, 502, "partial_auth_enabled",
        "Reactivation did not finish. The account can sign in but still has no access. Retry to finish reactivation.");
    }
  }
}

/**
 * True when reconciliation or the admin status route must leave an account
 * untouched because it belongs to an administrator. Checks BOTH the Firestore profile and the authoritative
 * Firebase Auth custom claims (requireAdmin trusts the `admin` claim), so a
 * missing, stale or inconsistent profile role cannot expose an admin to an
 * automated disable. Only used to skip work; it grants nothing.
 *
 * @param {object|null} profile     users/{uid} data
 * @param {object|null} customClaims UserRecord.customClaims from the Admin SDK
 */
export function isProtectedAdminAccount(profile, customClaims) {
  if (profile?.role === "admin") return true;
  if (customClaims?.admin === true) return true;
  if (customClaims?.role === "admin") return true;
  return false;
}

/**
 * Decides whether PATCH /api/admin/students/[id] may change this account's
 * status. Protects administrators identified by EITHER the Firestore profile
 * role or the authoritative Firebase Auth custom claims (see
 * isProtectedAdminAccount), so a stale or missing profile role cannot expose a
 * claim-admin to deactivation by another admin.
 *
 * Fails closed: any Auth lookup error other than auth/user-not-found blocks the
 * change (503) and the target is never mutated. auth/user-not-found means there
 * is no Auth record and therefore no claims; the profile role alone decides,
 * matching scripts/reconcile-account-status.mjs. Only blocks; it grants nothing.
 *
 * @param {{ uid: string, profile: object|null, auth: { getUser: Function }, logger?: Console }} args
 * @returns {Promise<{ ok: true } | { ok: false, httpStatus: number, reason: string, message: string }>}
 */
export async function checkAccountStatusManageable({ uid, profile, auth, logger = console }) {
  const blockedAdmin = { ok: false, httpStatus: 403, reason: "admin", message: "Admin accounts cannot be managed here." };
  if (isProtectedAdminAccount(profile, null)) return blockedAdmin;

  let customClaims = null;
  try {
    const record = await auth.getUser(uid);
    customClaims = record?.customClaims || null;
  } catch (error) {
    if (error?.code !== "auth/user-not-found") {
      // Log the error code only: no message, token or personal data.
      logger.error("[account-status] admin route: Auth lookup failed; refusing status change", { uid, code: error?.code ?? null });
      return { ok: false, httpStatus: 503, reason: "auth_lookup_failed", message: "Could not verify this account right now. No changes were made." };
    }
  }
  if (isProtectedAdminAccount(profile, customClaims)) return blockedAdmin;
  return { ok: true };
}

/**
 * Reconciliation decision for one account, used by
 * scripts/reconcile-account-status.mjs. Only ever moves toward LESS access:
 *   - Auth disabled/missing but profile active  -> profile inactive
 *   - profile not active but Auth enabled        -> disable Auth + revoke
 *   - statusSync left pending/failed while both stores agree -> clear marker
 *     (for a deactivation marker with an existing Auth user, revoke refresh
 *     tokens first: the failure may have been the revocation itself)
 * Never enables an Auth user and never activates a profile.
 *
 * @param {object|null} profile   users/{uid} data (null when missing)
 * @param {{exists:boolean, disabled:boolean}} authUser
 * @returns {{ issue: string, actions: string[] } | null}
 */
export function decideReconciliation(profile, authUser) {
  const authEnabled = authUser?.exists === true && authUser.disabled === false;
  const profileActive = isActiveProfile(profile);
  if (profile && profileActive && !authEnabled) {
    return { issue: "profile_active_auth_disabled", actions: ["profile:deactivate"] };
  }
  if (profile && !profileActive && authEnabled) {
    return { issue: "profile_inactive_auth_enabled", actions: ["auth:disable", "auth:revoke"] };
  }
  const marker = profile?.statusSync;
  if (marker && (marker.auth === "pending" || marker.auth === "failed")) {
    const markerMatchesState = (marker.target === "active") === profileActive;
    // Clear only when the marker describes the state both stores now agree
    // on; anything else is surfaced for a human, never auto-resolved.
    if (!markerMatchesState) return { issue: "marker_state_mismatch", actions: [] };
    // A pending/failed DEACTIVATION marker may mean token revocation never
    // completed (Auth disabled, revokeRefreshTokens failed). Revoke again
    // before clearing; the script keeps the marker if revocation fails.
    if (marker.target === "inactive" && authUser?.exists === true) {
      return { issue: `stale_marker_${marker.auth}`, actions: ["auth:revoke", "marker:clear"] };
    }
    return { issue: `stale_marker_${marker.auth}`, actions: ["marker:clear"] };
  }
  return null;
}

/**
 * Per-account mutual exclusion shared by every writer of account status:
 * PATCH /api/admin/students/[id] (via manageStudentAccountStatus) and
 * scripts/reconcile-account-status.mjs in --apply mode. Both acquire
 * accountStatusLeases/{uid} in a Firestore transaction before any Auth or
 * profile write and release it afterwards, so reconciliation can never act on
 * the intermediate state of a reactivation (Auth enabled, profile not yet
 * active) and a reactivation can never interleave with reconciliation writes.
 *
 * The collection has no client rule (firestore.rules denies by default); only
 * the Admin SDK touches it. A lease expires after ttlMs so a crashed holder
 * cannot block an account forever. LIMITATION: Firebase Auth writes cannot be
 * fenced by a Firestore lease, so exclusion holds only while the holder
 * finishes within ttlMs. Writers therefore also use update-time preconditions
 * on profile writes and treat a precondition failure as a conflict.
 */
export const ACCOUNT_STATUS_LEASE_COLLECTION = "accountStatusLeases";
export const ACCOUNT_STATUS_LEASE_TTL_MS = 120_000;

export async function withAccountStatusLease({ db, uid, holder, ttlMs = ACCOUNT_STATUS_LEASE_TTL_MS, nowMs = () => Date.now(), logger = console }, fn) {
  const ref = db.collection(ACCOUNT_STATUS_LEASE_COLLECTION).doc(uid);
  let acquired;
  try {
    acquired = await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = snap.exists ? snap.data() : null;
      if (data && data.holder !== holder && Number(data.expiresAtMs) > nowMs()) return false;
      tx.set(ref, { uid, holder, expiresAtMs: nowMs() + ttlMs, acquiredAt: new Date(nowMs()).toISOString() });
      return true;
    });
  } catch (error) {
    logger.error("[account-status] lease acquisition failed; no change made", { uid, holder, code: error?.code ?? null });
    return { ok: false, reason: "lease_error" };
  }
  if (!acquired) return { ok: false, reason: "busy" };
  try {
    return { ok: true, value: await fn() };
  } finally {
    try {
      await db.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        if (snap.exists && snap.data()?.holder === holder) tx.delete(ref);
      });
    } catch (error) {
      // Safe: the lease simply expires after ttlMs.
      logger.warn("[account-status] lease release failed; it will expire", { uid, holder, code: error?.code ?? null });
    }
  }
}

/**
 * Core of PATCH /api/admin/students/[id] after caller authorization and input
 * validation. Under the per-account lease it reads the profile, applies admin
 * protection (profile role + Auth custom claims, fail closed), and runs
 * transitionAccountStatus with the update time read UNDER THE LEASE as the
 * reactivation precondition.
 *
 * @returns {Promise<{ status: number, body: object }>}
 */
export async function manageStudentAccountStatus({ db, auth, uid, target, actorUid, logger = console, opId = defaultOpId(), transitionOptions = {} }) {
  const lease = await withAccountStatusLease({ db, uid, holder: `admin-route:${opId}`, logger }, async () => {
    const ref = db.collection("users").doc(uid);
    const userDoc = await ref.get();
    if (!userDoc.exists) return { status: 404, body: { success: false, error: "Student not found." } };
    const manageable = await checkAccountStatusManageable({ uid, profile: userDoc.data() || null, auth, logger });
    if (!manageable.ok) return { status: manageable.httpStatus, body: { success: false, error: manageable.message } };
    const result = await transitionAccountStatus({
      uid, target, auth, profileRef: ref, actorUid, logger, opId,
      // Rejects reactivation if the profile changed after THIS read (taken
      // under the lease). Changes before this read are not detected here.
      expectedUpdateTime: target === "active" ? userDoc.updateTime : null,
      ...transitionOptions,
    });
    if (!result.ok) {
      return { status: result.httpStatus, body: { success: false, error: result.message, outcome: result.outcome, opId: result.opId, retryable: true } };
    }
    return { status: 200, body: { success: true, student: { id: uid, status: target, disabled: target === "inactive" } } };
  });
  if (lease.ok) return lease.value;
  if (lease.reason === "busy") {
    return { status: 409, body: { success: false, error: "Another status change for this account is in progress. No changes were made. Retry shortly.", outcome: "busy", retryable: true } };
  }
  return { status: 503, body: { success: false, error: "Could not start the status change. No changes were made. Please retry.", outcome: "lease_error", retryable: true } };
}
