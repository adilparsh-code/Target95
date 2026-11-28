/**
 * Synthetic Firebase Admin SDK boundary for the session/authorization tests.
 *
 * test/support/alias-loader.mjs rewrites `@/app/lib/firebase-admin` to this
 * module so routes can be imported without credentials. The mutable `state`
 * object is shared by reference with the test file, so resets and error
 * injection are visible to the already-imported route handlers.
 */

export const state = {
  token: null,
  profile: null,
  lookupError: null,
  verifyError: null,
  profileReads: 0,
  verifications: [],
};

export function resetState() {
  state.token = { uid: "student", email_verified: true };
  state.profile = { status: "active", disabled: false };
  state.lookupError = null;
  state.verifyError = null;
  state.profileReads = 0;
  state.verifications = [];
}

export function getAdminAuth() {
  return {
    verifySessionCookie: async (cookie, checkRevoked) => {
      state.verifications.push({ cookie, checkRevoked });
      if (state.verifyError) throw state.verifyError;
      return state.token;
    },
    verifyIdToken: async () => {
      throw new Error("verifyIdToken is not stubbed by this test boundary");
    },
    createSessionCookie: async () => "fake-session-cookie",
    revokeRefreshTokens: async () => {},
  };
}

export function getAdminDb() {
  return {
    collection: () => ({
      doc: () => ({
        get: async () => {
          state.profileReads += 1;
          if (state.lookupError) throw state.lookupError;
          return { exists: state.profile !== null, data: () => state.profile };
        },
      }),
    }),
  };
}
