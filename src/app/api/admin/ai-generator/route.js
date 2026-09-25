import { adminGuard } from "@/app/api/admin/_helpers";
import { cleanString, toInt } from "@/app/lib/admin-validation";
import { extractResponseText } from "@/app/lib/blog-ai-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/ai-generator
 *
 * Real, server-side question generation for the admin AI generator.
 * The provider key never leaves the server. When the key is not configured
 * the route reports a typed `unconfigured` status so the admin UI can say so
 * honestly instead of showing invented questions.
 *
 * Request:  { subject, class, board, chapter, questionType, difficulty, numberOfQuestions }
 * Response: { success: true, questions: [...] }  |  { success: false, status, error }
 */

const MAX_QUESTIONS = 20;

const MARKS_BY_TYPE = {
  mcq: 1,
  "one word": 1,
  "fill in the blanks": 1,
  "true false": 1,
  "assertion reason": 2,
  "match the following": 2,
  "very short answer": 2,
  "short answer": 3,
  "long answer": 5,
  "programming questions": 10,
  "output based questions": 3,
  "debugging questions": 3,
  "find the error": 3,
  "dry run questions": 4,
  "case study questions": 8,
  "algorithm writing": 5,
  "pseudocode questions": 5,
};

const TIME_BY_TYPE = {
  mcq: 1,
  "one word": 1,
  "fill in the blanks": 1,
  "true false": 1,
  "assertion reason": 2,
  "match the following": 2,
  "very short answer": 2,
  "short answer": 5,
  "long answer": 10,
  "programming questions": 20,
  "output based questions": 5,
  "debugging questions": 5,
  "find the error": 5,
  "dry run questions": 8,
  "case study questions": 15,
  "algorithm writing": 10,
  "pseudocode questions": 10,
};

const BLOOM_LEVELS = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];

function buildSchema() {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      questions: {
        type: "array",
        maxItems: MAX_QUESTIONS,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            question: { type: "string" },
            options: { type: "array", items: { type: "string" }, maxItems: 6 },
            answer: { type: "string" },
            explanation: { type: "string" },
            bloomsLevel: { type: "string", enum: BLOOM_LEVELS },
          },
          required: ["question", "options", "answer", "explanation", "bloomsLevel"],
        },
      },
    },
    required: ["questions"],
  };
}

function buildPrompt({ subject, className, board, chapter, questionType, difficulty, count }) {
  return [
    `Board: ${board}`,
    `Class: ${className}`,
    `Subject: ${subject}`,
    `Chapter: ${chapter}`,
    `Question type: ${questionType}`,
    `Difficulty: ${difficulty}`,
    "",
    `Write ${count} exam-ready ${questionType.toLowerCase()} question(s) for ${board} Class ${className} ${subject}, chapter "${chapter}".`,
    "",
    "Rules:",
    "1. Only use concepts that belong to the stated chapter. Do not invent board notices, marks schemes or dates.",
    "2. The answer must be correct and specific enough to mark.",
    "3. The explanation must state why the answer is correct in 2-4 sentences.",
    "4. Provide four options only for multiple-choice questions; otherwise return an empty options array.",
    "5. Keep the student language simple and exam-oriented.",
  ].join("\n");
}

async function callOpenAI(prompt, count) {
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
              text:
                "You are Target95's question author for ICSE, ISC and CBSE Computer Science. Produce accurate, syllabus-aligned questions only.",
            },
          ],
        },
        { role: "user", content: [{ type: "input_text", text: prompt }] },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "target95_generated_questions",
          strict: true,
          schema: buildSchema(),
        },
      },
      store: false,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`AI provider error (${response.status}): ${detail.slice(0, 300)}`);
  }

  const result = await response.json();
  const text = extractResponseText(result);

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("AI response was not valid JSON.");
  }

  const questions = Array.isArray(parsed.questions) ? parsed.questions.slice(0, count) : [];
  if (!questions.length) throw new Error("AI returned no usable questions.");
  return questions;
}

export async function POST(request) {
  const guard = await adminGuard(request);
  if (!guard.ok) return guard.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const subject = cleanString(body?.subject, { maxLength: 120 });
  const className = cleanString(body?.class, { maxLength: 20 });
  const board = cleanString(body?.board, { maxLength: 20 });
  const chapter = cleanString(body?.chapter, { maxLength: 160 });
  const questionType = cleanString(body?.questionType, { maxLength: 80 });
  const difficulty = cleanString(body?.difficulty, { maxLength: 20 });
  const count = toInt(body?.numberOfQuestions, { min: 1, max: MAX_QUESTIONS, fallback: 5 });

  if (!subject || !className || !board || !chapter || !questionType || !difficulty) {
    return Response.json(
      { success: false, error: "Subject, class, board, chapter, question type and difficulty are required." },
      { status: 400 }
    );
  }

  try {
    const generated = await callOpenAI(
      buildPrompt({ subject, className, board, chapter, questionType, difficulty, count }),
      count
    );

    const now = new Date().toISOString();
    const typeKey = questionType.toLowerCase();
    const tags = [subject, chapter, difficulty, questionType].filter(Boolean);
    const adminUid = guard.admin?.uid || "admin";

    const questions = generated
      .map((item, index) => ({
        id: `ai-${now}-${index}`,
        question: cleanString(item.question, { maxLength: 2000 }),
        options: Array.isArray(item.options)
          ? item.options.map((option) => cleanString(option, { maxLength: 300, allowNewlines: false })).filter(Boolean)
          : [],
        answer: cleanString(item.answer, { maxLength: 2000 }),
        explanation: cleanString(item.explanation, { maxLength: 2000 }),
        difficulty,
        chapter,
        subject,
        questionType,
        board,
        class: className,
        marks: MARKS_BY_TYPE[typeKey] || 2,
        estimatedTime: TIME_BY_TYPE[typeKey] || 5,
        bloomsLevel: BLOOM_LEVELS.includes(item.bloomsLevel) ? item.bloomsLevel : "Understand",
        tags: [...tags, `question-${index + 1}`],
        status: "Draft",
        createdBy: adminUid,
        createdAt: now,
        updatedAt: now,
      }))
      .filter((question) => question.question && question.answer);

    if (!questions.length) {
      return Response.json(
        { success: false, status: "ai_error", error: "The AI returned incomplete questions. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ success: true, questions, provider: "openai" });
  } catch (error) {
    const message = String(error?.message || "Generation failed.");

    if (message.includes("OPENAI_API_KEY is not configured")) {
      return Response.json(
        {
          success: false,
          status: "unconfigured",
          error: "AI generation is not configured on this deployment. No questions were invented — ask an admin to set OPENAI_API_KEY.",
        },
        { status: 503 }
      );
    }

    console.error("Admin question generation failed:", message);
    return Response.json(
      { success: false, status: "ai_error", error: "The AI could not generate questions right now. Please try again." },
      { status: 502 }
    );
  }
}
