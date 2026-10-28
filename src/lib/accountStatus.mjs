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
 * Change a student's account status across Firestore and Firebase Auth so
 * that every partial failure leaves the account LESS privileged, never more.
 *
 * Access depends on both stores:
 *   - Firestore rules and server APIs require an active profile.
 *   - Sign-in and existing server sessions require an enabled Auth user
 *     with unrevoked refresh tokens.
 *
 * Deactivate (target 'inactive'):
 *   1. Firestore -> inactive first. Rules and server APIs deny at once,
 *      including requests that carry a still-valid ID token.
 *   2. Auth -> disabled + revoke refresh tokens, ALWAYS attempted, even if
 *      step 1 failed, because blocking sign-in is still the safe direction.
 *   3. If step 1 failed, retry the Firestore write once after step 2.
 *   No rollback ever re-enables anything.
 *
 * Reactivate (target 'active'):
 *   1. Auth -> enabled first. While the profile is still inactive, rules and
 *      server APIs keep denying, so this alone grants nothing.
 *   2. Firestore -> active.
 *   3. If step 2 fails, roll Auth back to disabled and revoke tokens issued
 *      in the gap. If the rollback also fails the account is still denied
 *      everywhere that reads the profile; it is flagged for reconciliation.
 *
 * Every write is idempotent, so retrying the same request reconciles.
 *
 * @returns {{ ok: boolean, httpStatus: number, outcome: string, message: string }}
 */
export async function transitionAccountStatus({
  uid,
  target,
  auth,
  profileRef,
  actorUid = "admin",
  now = () => new Date().toISOString(),
  logger = console,
}) {
  if (target !== "active" && target !== "inactive") {
    throw new Error(`Invalid account status target: ${target}`);
  }
  const context = { uid, target, actorUid };
  const errorInfo = (error) => ({ code: error?.code || null, message: error?.message || String(error) });
  const profileFields = (authSync) => ({
    status: target,
    disabled: target === "inactive",
    statusUpdatedAt: now(),
    statusUpdatedBy: actorUid,
    statusSync: { target, auth: authSync, at: now() },
  });
  const markSync = async (authSync) => {
    try {
      await profileRef.update({ statusSync: { target, auth: authSync, at: now() } });
    } catch (error) {
      logger.warn("[account-status] could not record sync marker", { ...context, authSync, error: errorInfo(error) });
    }
  };

  if (target === "inactive") {
    let firestoreError = null;
    try {
      await profileRef.update(profileFields("pending"));
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

    if (firestoreError) {
      try {
        await profileRef.update(profileFields(authError ? "failed" : "synced"));
        firestoreError = null;
      } catch (error) {
        firestoreError = error;
      }
    }

    if (!firestoreError && !authError) {
      await markSync("synced");
      return { ok: true, httpStatus: 200, outcome: "deactivated", message: "Account deactivated." };
    }

    if (firestoreError && authError) {
      logger.error("[account-status] RECONCILE REQUIRED deactivate: Firestore write failed and Auth disable/revoke did not complete; the profile is still active", {
        ...context, firestoreError: errorInfo(firestoreError), authError: errorInfo(authError),
      });
      return { ok: false, httpStatus: 500, outcome: "unchanged", message: "Deactivation failed. The profile is still active. Please retry." };
    }

    if (firestoreError) {
      logger.error("[account-status] RECONCILE REQUIRED deactivate: Auth disabled and tokens revoked, but the Firestore profile is still active", {
        ...context, firestoreError: errorInfo(firestoreError),
      });
      return {
        ok: false, httpStatus: 502, outcome: "partial_auth_only",
        message: "Sign-in and sessions are blocked, but the profile could not be updated. Retry to finish deactivation.",
      };
    }

    await markSync("failed");
    logger.error("[account-status] RECONCILE REQUIRED deactivate: profile is inactive (access denied) but Firebase Auth could not be disabled", {
      ...context, authError: errorInfo(authError),
    });
    return {
      ok: false, httpStatus: 502, outcome: "partial_profile_only",
      message: "Access is blocked, but Firebase Auth could not be disabled. Retry to finish deactivation.",
    };
  }

  // target === 'active'
  try {
    await auth.updateUser(uid, { disabled: false });
  } catch (error) {
    logger.error("[account-status] reactivate: Auth enable failed; account remains inactive", { ...context, error: errorInfo(error) });
    return { ok: false, httpStatus: 500, outcome: "unchanged", message: "Reactivation failed. The account is still inactive. Please retry." };
  }

  try {
    await profileRef.update(profileFields("synced"));
    return { ok: true, httpStatus: 200, outcome: "activated", message: "Account activated." };
  } catch (firestoreError) {
    try {
      await auth.updateUser(uid, { disabled: true });
      await auth.revokeRefreshTokens(uid);
      logger.error("[account-status] reactivate: Firestore write failed; Auth rolled back to disabled", { ...context, error: errorInfo(firestoreError) });
      return { ok: false, httpStatus: 500, outcome: "rolled_back", message: "Reactivation failed and was rolled back. The account is still inactive. Please retry." };
    } catch (rollbackError) {
      logger.error("[account-status] RECONCILE REQUIRED reactivate: Firestore write and Auth rollback both failed; Auth is enabled but the profile is inactive, so access stays denied", {
        ...context, firestoreError: errorInfo(firestoreError), rollbackError: errorInfo(rollbackError),
      });
      return {
        ok: false, httpStatus: 502, outcome: "partial_auth_enabled",
        message: "Reactivation did not finish. The account can sign in but still has no access. Retry to finish reactivation.",
      };
    }
  }
}
