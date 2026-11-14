/**
 * Safety guard for every staging script.
 *
 * The staging scripts hold admin credentials and write data, so they refuse to run unless
 * EVERY identifier they can see points at the staging Firebase project. A production (or any
 * other) credential fails closed. Errors name the field that is wrong but never echo a
 * secret value.
 */

export const STAGING_PROJECT_ID = "target95-staging";

const CLIENT_KEYS = [
  ["NEXT_PUBLIC_FIREBASE_PROJECT_ID", (v) => v === STAGING_PROJECT_ID],
  ["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", (v) => v === `${STAGING_PROJECT_ID}.firebaseapp.com`],
  ["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", (v) => v.startsWith(`${STAGING_PROJECT_ID}.`)],
];

const REQUIRED_CLIENT_KEYS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

/** Parse a service-account JSON string; throws a secret-free error. */
export function parseServiceAccount(raw) {
  let parsed;
  try {
    parsed = JSON.parse(String(raw || ""));
  } catch {
    throw new Error("Service account is missing or is not valid JSON.");
  }
  if (!parsed || typeof parsed !== "object") throw new Error("Service account JSON has the wrong shape.");
  return parsed;
}

/** Problems with the service account relative to the staging project (empty = ok). */
export function serviceAccountProblems(account) {
  const problems = [];
  if (account.type !== "service_account") problems.push("service account: type is not service_account");
  if (account.project_id !== STAGING_PROJECT_ID) problems.push(`service account: project_id is not ${STAGING_PROJECT_ID}`);
  if (typeof account.client_email !== "string" || !account.client_email.endsWith(`@${STAGING_PROJECT_ID}.iam.gserviceaccount.com`)) {
    problems.push(`service account: client_email does not belong to ${STAGING_PROJECT_ID}`);
  }
  if (!account.private_key || !account.client_email) problems.push("service account: private_key or client_email missing");
  return problems;
}

/** Problems with the client (NEXT_PUBLIC_*) configuration (empty = ok). */
export function clientConfigProblems(env) {
  const problems = [];
  for (const key of REQUIRED_CLIENT_KEYS) {
    if (!env[key]) problems.push(`${key} is not set`);
  }
  for (const [key, isStaging] of CLIENT_KEYS) {
    if (env[key] && !isStaging(String(env[key]))) problems.push(`${key} does not point at ${STAGING_PROJECT_ID}`);
  }
  return problems;
}

/**
 * Throws unless the service account (when given) and the client config (when `requireClient`)
 * all identify the staging project. Returns the parsed service account.
 */
export function assertStagingConfig({ env = process.env, rawServiceAccount, requireClient = true } = {}) {
  const problems = [];
  let account = null;
  if (rawServiceAccount !== undefined) {
    account = parseServiceAccount(rawServiceAccount);
    problems.push(...serviceAccountProblems(account));
  }
  if (requireClient) problems.push(...clientConfigProblems(env));
  if (problems.length) {
    throw new Error(`Refusing to run: configuration is not the ${STAGING_PROJECT_ID} staging project.\n - ${problems.join("\n - ")}`);
  }
  return account;
}
