// Fails closed when the browser Firebase config and the server service account
// point at different Firebase projects, or when a staging deployment points at
// anything but the staging project. Project IDs are not secrets; key material
// is never read or echoed here.
export const STAGING_FIREBASE_PROJECT_ID = "target95-staging";

export class FirebaseProjectMismatchError extends Error {
  constructor(message) {
    super(message);
    this.name = "FirebaseProjectMismatchError";
  }
}

const normalise = (value) => (typeof value === "string" ? value.trim() : "");

export function assertFirebaseProjectConsistency({ clientProjectId, serviceAccountProjectId, appEnv } = {}) {
  const client = normalise(clientProjectId);
  const server = normalise(serviceAccountProjectId);

  if (!client) {
    throw new FirebaseProjectMismatchError("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set; refusing to start Firebase Admin.");
  }
  if (!server) {
    throw new FirebaseProjectMismatchError("FIREBASE_SERVICE_ACCOUNT has no project_id; refusing to start Firebase Admin.");
  }
  if (client !== server) {
    throw new FirebaseProjectMismatchError(
      `Firebase project mismatch: client config is "${client}" but the service account is "${server}". Refusing to start Firebase Admin.`
    );
  }
  if (normalise(appEnv).toLowerCase() === "staging" && client !== STAGING_FIREBASE_PROJECT_ID) {
    throw new FirebaseProjectMismatchError(
      `A staging deployment must use "${STAGING_FIREBASE_PROJECT_ID}" but is configured for "${client}". Refusing to start Firebase Admin.`
    );
  }
  return { projectId: client };
}
