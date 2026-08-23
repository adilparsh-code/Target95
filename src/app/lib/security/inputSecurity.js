const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeText(value, maxLength = 120) {
  return String(value ?? "")
    .replace(CONTROL_CHARS, "")
    .trim()
    .slice(0, maxLength);
}

export function validateEmail(value) {
  const email = sanitizeText(value, 254).toLowerCase();
  return EMAIL_RE.test(email) ? email : null;
}

export function validatePassword(value) {
  const password = String(value ?? "");
  return password.length >= 8 && password.length <= 128 ? password : null;
}

export function validateHumanForm({ email, password, honeypot }) {
  if (sanitizeText(honeypot, 200)) {
    return { ok: false, message: "Unable to complete this request." };
  }

  const normalizedEmail = validateEmail(email);
  if (!normalizedEmail) {
    return { ok: false, message: "Enter a valid email address." };
  }

  if (!validatePassword(password)) {
    return { ok: false, message: "Password must be 8–128 characters." };
  }

  return { ok: true, email: normalizedEmail };
}
