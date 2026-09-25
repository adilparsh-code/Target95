/**
 * Feature-gating foundation (no payments yet).
 *
 * Single source of truth for what each plan can access, so the product can
 * later wire real billing without hunting for scattered limits. Nothing here
 * locks existing public educational content — gates apply only to metered
 * features (AI Tutor usage today; premium libraries and advanced analytics
 * are documented but not enforced yet).
 *
 * Plan resolution reads ONLY from the verified session token claims
 * (server-side `getVerifiedSession`), never from client-supplied fields.
 * A student cannot unlock premium by editing request bodies.
 */

export const PLANS = {
  free: {
    aiTutor: { enabled: true, promptsPerHour: 20 },
    mockTestLibrary: "core",
    questionBankScope: "full",
    analyticsScope: "basic",
  },
  premium: {
    aiTutor: { enabled: true, promptsPerHour: 60 },
    mockTestLibrary: "full",
    questionBankScope: "full",
    analyticsScope: "advanced",
  },
};

export const DEFAULT_PLAN = "free";

/**
 * Resolve the student's plan from a verified session token.
 * Accepts the decoded token from getVerifiedSession(request).
 */
export function resolvePlanFromSession(session) {
  if (!session) return DEFAULT_PLAN;
  // Admins get premium-equivalent access for evaluation.
  if (session.admin === true) return "premium";
  return session.plan === "premium" ? "premium" : DEFAULT_PLAN;
}

export function getEntitlements(plan = DEFAULT_PLAN) {
  return PLANS[plan] || PLANS[DEFAULT_PLAN];
}

/**
 * Check AI Tutor access for a verified session.
 * Returns { allowed, limit } — the caller enforces the limit server-side.
 */
export function checkAITutorAccess(session) {
  const plan = resolvePlanFromSession(session);
  const entitlements = getEntitlements(plan);
  return {
    allowed: entitlements.aiTutor.enabled === true,
    limit: entitlements.aiTutor.promptsPerHour,
  };
}

/**
 * Check mock-test library scope. "core" keeps every existing public test
 * available; "full" adds the future premium library without changing
 * existing behaviour for current students.
 */
export function getMockTestLibraryScope(session) {
  const plan = resolvePlanFromSession(session);
  return getEntitlements(plan).mockTestLibrary;
}

/**
 * Check analytics scope. "basic" is what students see today; "advanced"
 * unlocks future deep analytics (documented, not implemented).
 */
export function getAnalyticsScope(session) {
  const plan = resolvePlanFromSession(session);
  return getEntitlements(plan).analyticsScope;
}
