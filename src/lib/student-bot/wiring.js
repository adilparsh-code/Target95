import { getVerifiedSession } from "@/app/lib/server-auth";
import { getAdminDb } from "@/app/lib/firebase-admin";
import { createBoardprepAdapter } from "./adapters/boardprep.mjs";
import { createProgrammingAdapter } from "./adapters/programming.mjs";
import { createAiAdapter } from "./adapters/ai.mjs";
import { createProgressSource } from "./state/progress-source.mjs";

// Real dependencies for the API routes. Kept out of the pure core so tests
// never need Firebase credentials.
const boardprep = createBoardprepAdapter();
const programming = createProgrammingAdapter();
const ai = createAiAdapter(); // no verified provider configured in this prototype

export function getRouteContext() {
  const db = getAdminDb();
  return {
    getSession: getVerifiedSession,
    deps: {
      db,
      boardprep,
      programming,
      ai,
      progress: createProgressSource(db),
      now: () => Date.now(),
      rng: Math.random,
      logger: console,
    },
  };
}

export { ai as aiAdapter };

// Misconfigured server (e.g. no Firebase Admin credentials) is a clean 503,
// never an unhandled exception and never an unauthenticated pass-through.
export function withRouteContext(run) {
  let context;
  try {
    context = getRouteContext();
  } catch (error) {
    console.error("student-bot unavailable", { name: error?.name });
    return Response.json(
      { ok: false, code: "unavailable", error: "The study assistant is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  return run(context);
}
