# Student Bot on WhatsApp: status and plan

Purpose (from the owner): most students stay on WhatsApp and few will use the website, so the bot must let a student read lessons and practise on WhatsApp. The web chat at `/student-bot` stays as a prototype and test console.

Status: the WhatsApp transport is **built and unit-tested, but not live**. Nothing here has been connected to Meta, deployed to Firebase, or tested with a real phone.

## What exists (all in this branch)

| Piece | File | Notes |
| --- | --- | --- |
| Webhook (GET verify, POST messages) | `src/app/api/student-bot/whatsapp/route.js` | Thin route. Logic is in `core/whatsapp-api.mjs`. |
| Webhook logic | `src/lib/student-bot/core/whatsapp-api.mjs` | Signature first, then identity, active-student check, rate limit, existing bot logic. |
| Signature check | `adapters/whatsapp-signature.mjs` | HMAC-SHA256 of the raw body, constant-time compare. |
| Payload parser | `adapters/whatsapp-payload.mjs` | Text messages to our number only; caps 20 per payload. |
| Reply formatter | `adapters/whatsapp-format.mjs` | Plain text, chunks of at most 1200 characters, at most 4 messages. |
| Sender | `adapters/whatsapp-sender.mjs` | Graph API call; errors carry only the HTTP status. |
| Wiring | `src/lib/student-bot/whatsapp-wiring.js` | Reads `WHATSAPP_*` env. Identity, sessions and dedupe are deliberately **not** wired. |
| Tests | `test/student-bot-whatsapp.test.mjs` | 27 tests, each safeguard mutation-checked. |

Fail-closed behaviour: no Meta settings gives 503; a bad signature gives 401 before the body is parsed; with no identity store wired, inbound messages get 503 and nothing is sent; an unlinked number or a non-student account is ignored silently (the bot never messages strangers).

## What is NOT built (needs the owner)

1. **Identity: phone number to student.** Students cannot use Google login on WhatsApp. The webhook needs a trusted store that maps a verified WhatsApp number to a `users/{uid}` student profile. This is a database design change and needs approval under `AGENTS.md`. Options to decide between: link by a one-time code the student gets from a teacher, or create the profile on first message after consent. Phone numbers are personal data; store a hash where possible and never log them.
2. **Conversation state.** The student's chosen board, class and subject must be remembered between messages (the web UI keeps it in the browser). Needs a small per-student document, written only by the Admin SDK.
3. **Message de-duplication.** Meta re-delivers when it does not get a 200 in time. A store of seen message ids is required before this goes live.
4. **Quizzes on WhatsApp.** Answering needs multi-step state. For now `QUIZ` replies that it is not available and creates no attempt.
5. **Firestore rules.** Any new collection must be `read, write: if false` for clients (Admin SDK only), with emulator tests, like `botQuizAttempts` and `botUsage`.
6. **Consent and minors.** Many students are minors. What you collect, how consent is given and how it is stored is a decision for the school and its legal advisor; this document is not legal advice.

## Meta setup (checklist, verify against Meta's current documentation)

1. Create a Meta app with the WhatsApp product and a business account. Start with Meta's **test phone number**; it works without business verification and only reaches numbers you list.
2. Copy the app secret, the phone number id and a **permanent** access token (a system-user token, not the 24-hour test token) into the server environment as `WHATSAPP_APP_SECRET`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`. Choose a long random `WHATSAPP_VERIFY_TOKEN`. Never commit these.
3. In the Meta app, set the callback URL to `https://<host>/api/student-bot/whatsapp` and the verify token, then subscribe to the `messages` field.
4. **Preview deployments are behind Vercel Deployment Protection, so Meta cannot reach them.** Use a Production deployment or a protected-bypass setup that the owner approves; this branch changes neither.
5. Real students need a verified business, an approved display name and, for messages outside the 24-hour customer window, approved message templates. Pricing is per conversation category and changes; check Meta's pricing page before estimating cost.

## Suggested order

1. Owner decides identity and consent (items 1 and 6 above).
2. Build the identity, session and de-dupe stores in the Admin SDK with rules and emulator tests (needs approval).
3. Connect Meta's test number; try it with two or three known phones.
4. Add quizzes over WhatsApp.
5. Business verification, templates, then real students.

## Known limits of this change

- Not run against Meta or a real phone.
- `npm run build` still ends with the Next.js 16.4.3 advisory error described in `STAGING_DEPLOYMENT.md`; the route compiles.
- Messages are processed inside the webhook request. That is fine for the deterministic bot; if a slow AI provider is added later, replies should move to a background step so Meta gets its 200 quickly.
