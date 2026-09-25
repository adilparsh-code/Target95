import { NextResponse } from "next/server";
import { getVerifiedSession } from "@/app/lib/server-auth";
import { checkAITutorAccess } from "@/lib/entitlements";

export const runtime = "nodejs";

/**
 * AI Tutor API.
 *
 * Accepts a student question plus optional curriculum context, calls the
 * OpenAI Responses API server-side, and returns a structured tutoring
 * response. The API key stays on the server at all times.
 *
 * When OPENAI_API_KEY is not configured the route reports a typed
 * `unconfigured` status so the client can show an honest notice instead of
 * pretending an AI answered.
 */

const MAX_QUESTION_CHARS = 2000;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour, per-user, in-memory.

const rateBuckets = new Map();

function isRateLimited(uid, limit) {
  const now = Date.now();
  const entry = rateBuckets.get(uid);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateBuckets.set(uid, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

function buildPrompt({ question, subject, chapter, difficulty, questionType }) {
  const contextLines = [
    subject && `Board/subject context: ${subject}`,
    chapter && `Chapter: ${chapter}`,
    difficulty && `Difficulty: ${difficulty}`,
    questionType && `Question type: ${questionType}`,
  ].filter(Boolean);

  return [
    contextLines.length ? contextLines.join("\n") : "Context: ICSE/ISC Computer Science",
    "",
    `Student question: ${question}`,
    "",
    "Answer as a patient ICSE/ISC Computer Science tutor for a school student.",
    "Rules:",
    "1. Ground the explanation in the student's question and the chapter context. Do not invent exam dates, marks schemes or board notices.",
    "2. Keep language simple, exam-oriented, and free of filler.",
    "3. If the question is ambiguous, state the assumption you are making.",
    "4. If you are not confident, say so instead of guessing.",
    "5. Never claim to have run or tested code unless the student supplied output.",
  ].join("\n");
}

function buildSchema() {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      explanation: { type: "string" },
      stepByStep: { type: "array", items: { type: "string" }, maxItems: 8 },
      example: { type: "string" },
      keyPoints: { type: "array", items: { type: "string" }, maxItems: 6 },
      relatedTopics: { type: "array", items: { type: "string" }, maxItems: 5 },
    },
    required: ["explanation", "stepByStep", "example", "keyPoints", "relatedTopics"],
  };
}

async function callOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

  const model = process.env.BLOG_AI_MODEL || "gpt-5.6-luna";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "You are Target95's AI Tutor for ICSE/ISC Computer Science students. Follow the tutor rules supplied in the user message exactly.",
            },
          ],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: prompt }],
        },
      ],
      text: { format: { type: "json_schema", name: "target95_ai_tutor", strict: true, schema: buildSchema() } },
      store: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI provider error (${response.status}): ${errorText.slice(0, 300)}`);
  }

  const result = await response.json();
  const text = result.output_text || "";
  if (!text) throw new Error("AI returned no response text.");

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("AI response was not valid JSON.");
  }
  return parsed;
}

export async function POST(request) {
  const session = await getVerifiedSession(request);
  if (!session) {
    return NextResponse.json(
      { ok: false, status: "unauthenticated", error: "Sign in to use the AI Tutor." },
      { status: 401 }
    );
  }

  // Plan-aware limit from the entitlements foundation (session claims only).
  const access = checkAITutorAccess(session);
  if (!access.allowed) {
    return NextResponse.json(
      { ok: false, status: "forbidden", error: "Your plan does not include the AI Tutor." },
      { status: 403 }
    );
  }

  if (isRateLimited(session.uid, access.limit)) {
    return NextResponse.json(
      { ok: false, status: "rate_limited", error: "You have used your AI Tutor limit for this hour. Please try again later." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const question = String(body?.question || "").trim().slice(0, MAX_QUESTION_CHARS);
  if (!question) {
    return NextResponse.json({ ok: false, error: "A question is required." }, { status: 400 });
  }

  const context = {
    subject: String(body?.subject || "").slice(0, 120),
    chapter: String(body?.chapter || "").slice(0, 120),
    difficulty: String(body?.difficulty || "").slice(0, 40),
    questionType: String(body?.questionType || "").slice(0, 40),
  };

  try {
    const aiResponse = await callOpenAI(buildPrompt({ question, ...context }));
    return NextResponse.json({ ok: true, status: "ok", response: aiResponse });
  } catch (error) {
    const message = String(error?.message || "AI request failed.");

    if (message.includes("OPENAI_API_KEY is not configured")) {
      return NextResponse.json(
        { ok: false, status: "unconfigured", error: "AI Tutor is not configured yet. Please check back soon." },
        { status: 503 }
      );
    }

    console.error("AI Tutor request failed:", message);
    return NextResponse.json(
      { ok: false, status: "ai_error", error: "The AI Tutor could not answer right now. Please try again in a moment." },
      { status: 502 }
    );
  }
}
