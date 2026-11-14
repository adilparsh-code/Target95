import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";

/**
 * Local-only storage for the staging test-account passwords.
 * The file lives outside the repository (default ~/.target95-staging/test-accounts.json,
 * mode 0600). The scripts never print passwords; a path inside the repo is refused so a
 * password can never be committed by accident.
 */
export function credentialsPath(env = process.env) {
  const target = path.resolve(env.STAGING_CREDENTIALS_FILE || path.join(os.homedir(), ".target95-staging", "test-accounts.json"));
  const repoRoot = path.resolve(process.cwd());
  if (target === repoRoot || target.startsWith(`${repoRoot}${path.sep}`)) {
    throw new Error("Refusing to keep credentials inside the repository. Set STAGING_CREDENTIALS_FILE to a path outside it.");
  }
  return target;
}

export function readCredentials(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return {};
  }
}

export function writeCredentials(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, { mode: 0o600 });
  fs.chmodSync(file, 0o600);
}

/** 24 random bytes, base64url: strong, no shell-hostile characters. */
export function generatePassword() {
  return crypto.randomBytes(24).toString("base64url");
}
