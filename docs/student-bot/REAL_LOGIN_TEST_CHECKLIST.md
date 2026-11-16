# Student Bot — real-login test checklist

Run against a **non-production** Firebase project (or the local emulators) with throw-away test accounts. Never use production credentials, and never commit tokens, cookies or passwords.

## Setup
1. `npm run test:rules` passes locally (needs the Firestore emulator).
2. Use a dev/staging Firebase project or the Auth + Firestore emulators. Create four test accounts with verified email: `student-active`, `student-inactive` (profile `status: "suspended"`), `teacher-test` (profile `role: "teacher"`, **no** custom claim), `admin-test` (admin claim). Create a second active student `student-other`.
3. `npm run build && npm run start`, open `/student-bot` with DevTools console and Network tabs open.

## Cases (record PASS/FAIL, status code, and any console error)

| # | Actor | Action | Expected |
|---|---|---|---|
| 1 | Not signed in | Open `/student-bot` | Redirect/prompt to sign in; no chat UI |
| 2 | Not signed in | `curl -i -X POST /api/student-bot/chat -H 'content-type: application/json' -d '{"message":"help"}'` | 401, `{ok:false,code:"unauthenticated"}`; no Firestore writes |
| 3 | Active student | HELP | Reply labelled "from course content"; says AI not configured |
| 4 | Active student | `SET icse class 10 hindi`, CHAPTERS, `EXPLAIN muhavare` | Context chip updates; only published chapters listed; summary shown |
| 5 | Active student | `EXPLAIN <a planned/unpublished chapter title>` | "could not find a published chapter" — never content |
| 6 | Active student | `QUIZ muhavare-shabd-prayog 5`, check Network response | No `correctIndex`, `answer`, `explanation` in the response; attempt doc appears in Firestore under that student |
| 7 | Active student | Submit quiz | Score + review shown; second submit -> 409 "already submitted"; Submit button disabled |
| 8 | Active student | MY PROGRESS, REVISION | Shows only the submitted quiz; "nothing yet" for a fresh student; no invented data |
| 9 | `student-other` | `POST /api/student-bot/quiz/<student-active attemptId>/submit` | 404 |
| 10 | Active student | Send 21+ messages within a minute | 429 with `Retry-After` |
| 11 | Active student | Message > 500 chars; invalid JSON; body `{"message":5}` | 400/413 structured errors, no stack traces |
| 12 | `teacher-test` | Open page and call chat API | 403 `forbidden_role` (verifies the profile-role check, since there is no claim) |
| 13 | `admin-test` | Same | 403 |
| 14 | `student-inactive` | Same (use a still-valid session cookie if possible) | 401 |
| 15 | Active student | In browser console as the signed-in student, read/write `users/<uid>/botQuizAttempts` and `botUsage` with the client SDK | All denied (`permission-denied`) |
| 16 | Active student | Reload page | History restored from localStorage for this uid; quiz cards shown as ended; other account on same browser sees no history |
| 17 | Any | Mobile viewport 390px, keyboard-only navigation, dark mode | No horizontal scroll; focus visible; readable contrast |
| 18 | Any | Console | No unexpected errors |

Record results in the PR; leave cases NOT RUN if the environment is unavailable.
