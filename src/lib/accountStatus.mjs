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
 * Invalid sessions fail closed (null). Profile lookup failures propagate so
 * callers can deny access with 503 while preserving the session cookie.
 */
export async function verifyActiveSession(sessionCookie, { auth, adminDb }) {
  if (!sessionCookie) return null;
  let decoded;
  try {
    decoded = await auth.verifySessionCookie(sessionCookie, true);
  } catch {
    return null;
  }
  if (decoded?.email_verified !== true) return null;
  if (!(await hasActiveProfile(adminDb, decoded.uid))) return null;
  return decoded;
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
 *   1. Auth -> enabled first. While the profile is still inactive, rules and
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
 * Reconciliation decision for one account, used by
 * scripts/reconcile-account-status.mjs. Only ever moves toward LESS access:
 *   - Auth disabled/missing but profile active  -> profile inactive
 *   - legacy profile missing status, Auth enabled -> report for backfill
 *   - profile not active but Auth enabled        -> disable Auth + revoke
 *   - statusSync left pending/failed while both stores agree -> clear marker
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
  if (profile && !Object.prototype.hasOwnProperty.call(profile, "status") && authEnabled) {
    return { issue: "profile_needs_backfill", actions: [] };
  }
  if (profile && !profileActive && authEnabled) {
    return { issue: "profile_inactive_auth_enabled", actions: ["auth:disable", "auth:revoke"] };
  }
  const marker = profile?.statusSync;
  if (marker && (marker.auth === "pending" || marker.auth === "failed")) {
    const markerMatchesState = (marker.target === "active") === profileActive;
    // Clear only when the marker describes the state both stores now agree
    // on; anything else is surfaced for a human, never auto-resolved.
    return markerMatchesState
      ? { issue: `stale_marker_${marker.auth}`, actions: ["marker:clear"] }
      : { issue: "marker_state_mismatch", actions: [] };
  }
  return null;
}
