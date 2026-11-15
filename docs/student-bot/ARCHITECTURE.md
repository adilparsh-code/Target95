# Student Learning Bot — Architecture and Test Plan

Status: prototype. A WhatsApp-style web chat at `/student-bot`. There is **no** WhatsApp, Meta or paid-AI dependency.

## Baseline (before any bot code, branch from `main` @ 20d73d6)

| Command | Result |
| --- | --- |
| `npm test` | 184 pass / 0 fail |
| `npm run lint` | exit 0, no output |
| `npm run typecheck` | exit 0 |

No pre-existing failures were found in these three. (`build`, `validate:*` and `test:rules` baselines are recorded in the final report.)

## Findings that shape the design

- Session auth is `getVerifiedSession(request)` (`src/app/lib/server-auth.js`): cookie + verified email + active `users/{uid}` profile, fail-closed. The bot reuses it and adds no auth system.
- Existing student progress (`src/lib/progress/storage.js`) is **browser localStorage only**. The server cannot read it. The only server-side student records are `users/{uid}/mockAttempts`. So "MY PROGRESS" reports (a) the student's own mock-test attempts and (b) the bot's own quiz attempts. Local device progress is never presented as server fact.
- BoardPrep adapter `src/lib/boardprepCurriculum.mjs` already filters to `status === 'published'`. 94 of 206 chapters are published; all have a chapter file. Many carry `syllabusStatus: "unverified"` — the bot says so instead of implying verified syllabus.
- Java practice data (`src/app/data/programming/java/questions.js`, ~19 problems) has no hints field. The bot only shows fields that exist (`algorithm` is shown as the hint step, `code` as the sample solution). Nothing is invented.
- `src/proxy.js` is not touched. API routes enforce auth themselves; the page shows a sign-in link on a 401.

## Module layout (all new, isolated)

```
src/lib/student-bot/
  config/commands.mjs        command table, limits, constants
  core/intent-router.mjs     deterministic router (no LLM)
  core/orchestrator.mjs      route -> handler -> reply (dependency-injected)
  core/response-formatter.mjs  reply shape + safe text
  adapters/boardprep.mjs     published-only read model over boardprepCurriculum
  adapters/programming.mjs   Java practice source (fixture-injectable)
  adapters/ai.mjs            AI provider interface; deterministic when unconfigured
  adapters/transport.mjs     transport boundary (web now, WhatsApp Cloud API later)
  handlers/{help,catalog,explain,quiz,practice,progress}.mjs
  security/input-validation.mjs  size/shape/control-char checks
  security/authorization.mjs     student-only gate over getVerifiedSession
  security/rate-limit.mjs        Firestore-transaction limiter (injectable db)
  state/quiz-store.mjs       server-side attempt persistence (injectable db)
src/app/api/student-bot/{chat,health}/route.js
src/app/api/student-bot/quiz/[attemptId]/submit/route.js
src/app/student-bot/page.jsx + components/ + hooks/useStudentBotChat.js
test/student-bot-*.test.mjs
```

Pure logic lives in `.mjs` modules importable by `node --test` (existing project convention). Routes stay thin.

## Security model

1. **Authorization**: `requireStudent` calls `getVerifiedSession`; missing → 401, verifier failure → 503, `admin === true` or role other than `student` → 403. UID only ever from the session.
2. **Context** (board/class/subject) sent by the client is validated against the BoardPrep curriculum; it is a selector, never identity.
3. **Quiz**: `QUIZ <chapter>` creates `users/{uid}/botQuizAttempts/{id}` server-side (question ids, status, expiry). The client receives prompts and options only — never `correctIndex`, `answer`, `explanation`. Submission is a Firestore transaction: attempt must belong to the session uid, be `in_progress` and unexpired; answers are validated (known ids, integer option index in range, one answer per question); score computed server-side; status flips to `submitted`. A second submit → 409. Answer keys are only returned after submission.
4. **Rate limit**: per-user, per-minute and per-hour, stored at `users/{uid}/botUsage/{window}` via transaction; 429 with `Retry-After`.
5. **Firestore rules**: `botQuizAttempts` and `botUsage` are `read, write: if false` for clients (Admin SDK only). Documents hold no answer key, but denying reads closes any leak path. Emulator tests cover owner, other student, admin, inactive, anonymous.
6. **Output**: replies are plain text with a small structured card payload; the UI renders text as text (no `dangerouslySetInnerHTML`, no Markdown HTML). Logs carry error codes and uids only — never message bodies, cookies or tokens.
7. **Prompt injection**: the router is deterministic. The AI adapter is only for free-text explanation and receives published chapter text as delimited, untrusted context. With no provider configured the reply is labelled "deterministic" and no AI text is produced.

## API

- `POST /api/student-bot/chat` `{ message, context? }` → `{ ok, reply: { text, kind, card?, mode } }`
- `POST /api/student-bot/quiz/{attemptId}/submit` `{ answers: { [questionId]: optionIndex } }` → score and per-question review
- `GET /api/student-bot/health` → `{ ok, ai: { configured } }`, no secrets, no auth data

Errors are `{ ok: false, code, error }` — no stack traces.

## Test plan (maps to the task spec A–L)

| Spec | Test file | Key cases |
| --- | --- | --- |
| A, B | student-bot-intent-router | each command and NL variant, case/whitespace, unknown, injection-looking text |
| C, D | student-bot-boardprep-adapter | published only, planned chapter rejected, invalid slug/path traversal, missing file |
| E, F | student-bot-quiz | no answer key in client payload, scoring, invalid/duplicate answers, empty set, retry, double submit |
| G | student-bot-input-validation | empty, oversized, non-string, control chars, bad body |
| H, I | student-bot-authorization | unauthenticated, inactive, admin, teacher, cross-student attempt access |
| J | student-bot-api | status codes and error shapes via route handlers with injected session |
| K | student-bot-ui | component render, XSS text stays text, empty state |
| L | existing suite | `npm test`, lint, typecheck, build unchanged |
| extra | student-bot-rate-limit, student-bot-ai | limiter window, 429; missing AI config → deterministic label, no fabricated answer |
| rules | test/firestore-rules-student-bot.test.mjs | emulator; skipped honestly if emulator cannot run here |

Security tests do not mock away the checks under test: authorization is tested through the real `requireStudent` with a fake verifier, the same seam `getVerifiedSession` exposes.

## Phases and commits

1. Config, validation, router (+tests)
2. BoardPrep and programming adapters, catalog/explain handlers
3. Quiz engine + store + rate limiter
4. API routes
5. Chat UI
6. Progress handler, Firestore rules, rules tests
7. Full QA and report

## Known limits (stated up front)

- Chat history is localStorage only (prototype, per spec). No server conversation store; no `conversations` route.
- Computer Applications chapters are not published in BoardPrep yet, so the bot will honestly report none.
- Java practice has ~19 problems and no hints field.
- Student code is never executed.
