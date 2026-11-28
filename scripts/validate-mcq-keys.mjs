#!/usr/bin/env node
// Lists every scanned MCQ whose answer key cannot be resolved.
// DEVELOPER-FACING tool: run it from the terminal or CI. It is not a
// teacher/admin dashboard (that is a separate Phase 2 backlog item).
// Coverage is limited to the sources registered in src/lib/study/mcqSources.mjs;
// the report prints both what was scanned and what was not.
// Usage: npm run validate:mcqs   (exit code 1 when any MCQ is invalid or a source fails to load)
import { formatMcqReport } from "../src/lib/study/mcqDiagnostics.mjs";
import { EXCLUDED_SOURCES, scanMcqSources } from "../src/lib/study/mcqSources.mjs";

const results = await scanMcqSources({ root: process.cwd() });
console.log(formatMcqReport(results, { exclusions: EXCLUDED_SOURCES }));
process.exit(results.some((result) => result.problems.length) ? 1 : 0);
