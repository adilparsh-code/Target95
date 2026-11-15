import { LIMITS } from '../config/commands.mjs';

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

// Per-user limiter held in Firestore so it works across serverless instances
// (same approach as the AI tutor route). Only the Admin SDK touches it.
// users/{uid}/botUsage/chat = { minute: {start,count}, hour: {start,count} }
export async function checkRateLimit({ db, uid, now = Date.now(), perMinute = LIMITS.rateLimitPerMinute, perHour = LIMITS.rateLimitPerHour }) {
  const ref = db.collection('users').doc(uid).collection('botUsage').doc('chat');
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.exists ? snap.data() : {};
    const roll = (win, size) => (win && now - Number(win.start) < size ? { start: win.start, count: Number(win.count) || 0 } : { start: now, count: 0 });
    const minute = roll(data.minute, MINUTE);
    const hour = roll(data.hour, HOUR);
    if (minute.count >= perMinute) return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((minute.start + MINUTE - now) / 1000)) };
    if (hour.count >= perHour) return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((hour.start + HOUR - now) / 1000)) };
    tx.set(ref, { minute: { start: minute.start, count: minute.count + 1 }, hour: { start: hour.start, count: hour.count + 1 } });
    return { allowed: true };
  });
}
