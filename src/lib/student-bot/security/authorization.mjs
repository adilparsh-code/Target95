// Student-only gate over the project's verified session. Fail-closed: any
// doubt is a denial, and a verifier failure is reported as "unavailable"
// rather than silently allowing access.
export async function authorizeStudent(request, { getSession }) {
  let session;
  try {
    session = await getSession(request);
  } catch {
    return { ok: false, status: 503, code: 'auth_unavailable', error: 'Sign-in check is temporarily unavailable.' };
  }
  if (!session || typeof session.uid !== 'string' || !session.uid) {
    return { ok: false, status: 401, code: 'unauthenticated', error: 'Please sign in to use the study assistant.' };
  }
  // The project treats admin as a custom claim and everything else as the role
  // claim (default student). Only plain students may use the bot.
  const role = session.admin === true ? 'admin' : session.role || 'student';
  if (role !== 'student') {
    return { ok: false, status: 403, code: 'forbidden_role', error: 'The study assistant is for student accounts.' };
  }
  return { ok: true, uid: session.uid };
}
