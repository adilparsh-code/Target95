#!/usr/bin/env node
/**
 * READ-ONLY audit of users/{uid}.role. Never writes, never deletes.
 *
 * Run against STAGING only. Two independent checks must both pass:
 *   1. the project must be in STAGING_PROJECT_ALLOWLIST (below, reviewed in code,
 *      only "target95-staging"; an empty list makes the script refuse to run), and
 *   2. --expect-project must equal both an allowlisted id and the service
 *      account's project_id.
 *
 *   FIREBASE_SERVICE_ACCOUNT="$(cat /path/to/staging-key.json)" \
 *     node scripts/audit-user-roles.mjs --expect-project <staging-project-id>
 *
 *   ... --list   also prints the UIDs of ACTIVE accounts whose role is missing or
 *                unknown. UIDs are sensitive identifiers: keep that output private.
 *
 * Safety properties
 *  - Refuses to start (before any Firebase call) unless the project is on the
 *    staging allowlist, --expect-project names it, and the service account's
 *    project_id is the same. Any other project, including production, is refused
 *    even when --expect-project and the key agree with each other.
 *  - Also refuses ids that look like production (prod/production/live) even if
 *    someone adds one to the allowlist by mistake.
 *  - Reads only the fields role, status and disabled (Firestore field projection),
 *    so emails, names and other profile data are never downloaded.
 *  - Processes one page at a time; it keeps counters, not profiles. Only with
 *    --list does it also keep the UIDs of the flagged accounts.
 *  - Default output is aggregate counts and the verified project id. No emails or
 *    personal data are ever printed.
 *  - The only Firestore call is a query .get(); there is no write path.
 */
import { pathToFileURL } from "node:url";

export const PAGE_SIZE = 500;
export const READ_FIELDS = Object.freeze(["role", "status", "disabled"]);
const PROJECT_ID = /^[a-z][a-z0-9-]{3,60}$/;

// The ONLY project this script will ever read. Changing this list is a reviewed
// code change. Never add a production project id.
export const STAGING_PROJECT_ALLOWLIST = Object.freeze(["target95-staging"]);

// Belt and braces: an id that looks like production is refused even if allowlisted.
const LOOKS_LIKE_PRODUCTION = /(^|[-_])(prod|production|live)([-_]|$)/i;

// Strict: only these exact lowercase values are recognised. "Student", "STUDENT",
// " student" and "teacher " are 'unknown', never silently normalised.
export function classifyRole(profile) {
  const role = profile?.role;
  if (role === "student" || role === "teacher" || role === "admin") return role;
  return role === undefined || role === null || role === "" ? "missing" : "unknown";
}

// Same rule as isActiveProfile() in src/lib/accountStatus.mjs and firestore.rules.
export function isActive(profile) {
  if (!profile || typeof profile !== "object") return false;
  const disabled = Object.prototype.hasOwnProperty.call(profile, "disabled") ? profile.disabled : false;
  return profile.status === "active" && disabled === false;
}

const emptyByRole = () => ({ student: 0, teacher: 0, admin: 0, missing: 0, unknown: 0 });

export function createAggregator({ list = false } = {}) {
  const roles = emptyByRole();
  const activeByRole = emptyByRole();
  const inactiveByRole = emptyByRole();
  const flagged = [];
  let total = 0;
  let inactive = 0;
  let activeLegacyRisk = 0;
  return {
    record(uid, data) {
      total += 1;
      const kind = classifyRole(data);
      roles[kind] += 1;
      const active = isActive(data);
      if (!active) {
        inactive += 1;
        inactiveByRole[kind] += 1;
      } else {
        activeByRole[kind] += 1;
        if (kind === "missing" || kind === "unknown") {
          activeLegacyRisk += 1;
          if (list) flagged.push({ uid, role: kind });
        }
      }
    },
    report() {
      const nonStudent = (by) => ({ total: by.teacher + by.admin + by.missing + by.unknown, teacher: by.teacher, admin: by.admin, missing: by.missing, unknown: by.unknown });
      const inactiveNonStudent = nonStudent(inactiveByRole).total;
      return {
        total,
        roles: { ...roles },
        // Profiles whose role is not exactly 'student', in ANY account status.
        nonStudentRoleProfiles: nonStudent(roles),
        // The same, restricted to ACTIVE accounts: these are the real role-based denials
        // (inactive accounts are already denied by the session check).
        activeNonStudentRoleProfiles: nonStudent(activeByRole),
        // Profiles that are not active, in ANY role.
        inactiveProfiles: { total: inactive, byRole: { ...inactiveByRole } },
        // Profiles that are both inactive AND non-student (counted in both lines above).
        inactiveAndNonStudent: inactiveNonStudent,
        // The migration-relevant number: active accounts with a missing or unknown role.
        activeMissingOrUnknownRole: activeLegacyRisk,
        note: "nonStudentRoleProfiles and inactiveProfiles overlap (see inactiveAndNonStudent); never add them together.",
        flagged: flagged.slice(),
      };
    },
  };
}

// Pages through users/ using field projection; one page in memory at a time.
export async function auditUsers(db, { pageSize = PAGE_SIZE, list = false } = {}) {
  const agg = createAggregator({ list });
  let last = null;
  let pages = 0;
  for (;;) {
    let query = db.collection("users").orderBy("__name__").select(...READ_FIELDS).limit(pageSize);
    if (last) query = query.startAfter(last);
    const page = await query.get(); // read only
    if (page.empty || !page.docs.length) break;
    pages += 1;
    for (const doc of page.docs) agg.record(doc.id, doc.data());
    last = page.docs[page.docs.length - 1];
    if (page.docs.length < pageSize) break;
  }
  return { ...agg.report(), pages };
}

export function parseArgs(argv) {
  const args = { list: false, expectProject: null, unknown: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--list") args.list = true;
    else if (a === "--expect-project") { args.expectProject = argv[i + 1] ?? null; i += 1; }
    else if (a.startsWith("--expect-project=")) args.expectProject = a.slice("--expect-project=".length);
    else args.unknown.push(a);
  }
  return args;
}

// Runs before any Firebase call. Never echoes the key material.
export function verifyProject(rawServiceAccount, expectedProject, allowedProjects = STAGING_PROJECT_ALLOWLIST) {
  if (!Array.isArray(allowedProjects) || allowedProjects.length === 0) {
    return { ok: false, error: "No staging project is configured. Set STAGING_PROJECT_ALLOWLIST in the script (reviewed change) before running." };
  }
  if (!expectedProject || !PROJECT_ID.test(expectedProject)) {
    return { ok: false, error: "Pass --expect-project <staging-project-id> (lowercase project id)." };
  }
  if (LOOKS_LIKE_PRODUCTION.test(expectedProject)) {
    return { ok: false, error: `Refusing to run: "${expectedProject}" looks like a production project.` };
  }
  if (!allowedProjects.includes(expectedProject)) {
    return { ok: false, error: `Refusing to run: "${expectedProject}" is not on the staging allowlist.` };
  }
  let parsed;
  try {
    parsed = JSON.parse(rawServiceAccount);
  } catch {
    return { ok: false, error: "FIREBASE_SERVICE_ACCOUNT is not valid JSON." };
  }
  const actual = parsed?.project_id;
  if (typeof actual !== "string" || !actual) return { ok: false, error: "The service account has no project_id." };
  if (LOOKS_LIKE_PRODUCTION.test(actual) || !allowedProjects.includes(actual)) {
    return { ok: false, error: `Refusing to run: service account project "${actual}" is not an allowlisted staging project.` };
  }
  if (actual !== expectedProject) {
    return { ok: false, error: `Refusing to run: service account project "${actual}" does not match expected "${expectedProject}".` };
  }
  return { ok: true, projectId: actual, serviceAccount: parsed };
}

async function defaultCreateDb(serviceAccount) {
  const { cert, initializeApp } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  return getFirestore(initializeApp({ credential: cert(serviceAccount) }));
}

// Returns a process exit code. Dependencies are injectable for tests.
export async function runAudit({ env = process.env, argv = process.argv.slice(2), createDb = defaultCreateDb, stdout = console.log, stderr = console.error, pageSize = PAGE_SIZE, allowedProjects = STAGING_PROJECT_ALLOWLIST } = {}) {
  const args = parseArgs(argv);
  if (args.unknown.length) { stderr(`Unknown argument(s): ${args.unknown.join(" ")}`); return 2; }
  const raw = env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) { stderr("FIREBASE_SERVICE_ACCOUNT is not set."); return 1; }
  const verified = verifyProject(raw, args.expectProject, allowedProjects);
  if (!verified.ok) { stderr(verified.error); return 1; }
  if (args.list) stderr("WARNING: --list prints UIDs, which are sensitive identifiers. Do not share or store this output.");

  let result;
  try {
    const db = await createDb(verified.serviceAccount);
    result = await auditUsers(db, { pageSize, list: args.list });
  } catch (error) {
    stderr(`audit failed: ${error?.code || error?.name || "error"}`);
    return 1;
  }
  const { flagged, ...aggregates } = result;
  stdout(JSON.stringify({ projectId: verified.projectId, readOnly: true, ...aggregates }, null, 2));
  if (args.list) for (const f of flagged) stdout(`${f.role}\t${f.uid}`);
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  runAudit().then((code) => process.exit(code));
}
