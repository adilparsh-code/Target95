/**
 * Explicit registry of the MCQ sources that `npm run validate:mcqs` scans, and
 * the sources it does NOT scan. Coverage is whatever is listed here, nothing
 * more: adding a student-facing MCQ source means adding it to SCANNED_SOURCES.
 * Developer-facing tooling only.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { computeReachable } from "./importGraph.mjs";
import {
  ANSWER_CONTRACTS,
  collectInvalidMarkdownMcqs,
  collectInvalidMcqs,
} from "./mcqDiagnostics.mjs";

export const SCANNED_SOURCES = [
  {
    label: "Rich chapter content (src/app/data/chapter-content/*.js, excluding index.js)",
    type: "dir",
    dir: "src/app/data/chapter-content",
    filter: (name) => name.endsWith(".js") && name !== "index.js",
    // Only files reachable from a student route through real imports are scanned.
    reachability: true,
    contract: ANSWER_CONTRACTS.INDEX_OR_TEXT,
  },
  {
    label: "Markdown chapters (introduction / introduction-to-java -> Introduction_to_Java_Class9.md)",
    type: "markdown",
    slugs: ["introduction", "introduction-to-java"],
  },
  {
    label: "Java question bank (src/app/data/question-bank/NN-*.js)",
    type: "dir",
    dir: "src/app/data/question-bank",
    filter: (name) => /^\d\d-.*\.js$/.test(name),
    reachability: true,
    contract: ANSWER_CONTRACTS.LETTER_OR_INDEX,
  },
  {
    label: "ICSE board practice set (src/app/data/icse-board-practice-2026-27.js)",
    type: "file",
    file: "src/app/data/icse-board-practice-2026-27.js",
    contract: ANSWER_CONTRACTS.INDEX_OR_TEXT,
  },
  {
    label: "Mock test questions (src/app/data/mock-test/mockTestQuestions.js)",
    type: "file",
    file: "src/app/data/mock-test/mockTestQuestions.js",
    contract: ANSWER_CONTRACTS.INDEX_OR_TEXT,
  },
];

export const EXCLUDED_SOURCES = [
  "src/app/data/boardprep/** (ICSE/ISC non-Java subjects; separate schemas and their own content validators)",
  "src/app/data/cbse/** (CBSE data; separate schema)",
  "Other top-level packs with options arrays: icseRoboticsAI*.js, iscClassXIContent.js, iscXI*Pack.js, iscXII*.js, javaCurriculum.js",
  "src/data/office/*.json (Office-skills curriculum)",
  "src/utils/*.js (content-generation scripts, not served to students)",
  "Teacher-created or Firestore-stored content (runtime data, not visible to an offline scan)",
  "MCQ text hard-coded inside JSX components, if any (not searched)",
];

async function loadModule(root, relativeFile) {
  const mod = await import(pathToFileURL(path.join(root, relativeFile)).href);
  return mod.default ?? mod;
}

/** Scan the given sources. A file that fails to load is reported as a problem, never skipped. */
export async function scanMcqSources({ root = process.cwd(), sources = SCANNED_SOURCES } = {}) {
  const results = [];

  // Import-graph reachability from the Next.js route files (computed once, only if needed).
  let reach = null;
  const reachability = () => {
    if (!reach) {
      try {
        reach = computeReachable(root);
      } catch (error) {
        reach = { error };
      }
    }
    return reach;
  };

  const merge = (label, parts) => ({
    source: label,
    checked: parts.reduce((n, p) => n + p.checked, 0),
    problems: parts.flatMap((p) => p.problems),
    skipped: parts.flatMap((p) => p.skipped || []),
    notScanned: parts.flatMap((p) => p.notScanned || []),
    unreferenced: parts.flatMap((p) => p.unreferenced || []),
    caveats: parts.flatMap((p) => p.caveats || []),
  });

  for (const source of sources) {
    const parts = [];
    const loadFailure = (file, error) => ({
      source: file,
      checked: 0,
      problems: [{ source: file, id: null, path: "", reason: `source failed to load: ${String(error.message).slice(0, 120)}` }],
      skipped: [],
    });

    if (source.type === "dir") {
      const dir = path.join(root, source.dir);
      let files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(source.filter).sort() : [];
      let failure = null; // a visible failure was already recorded for this source
      if (source.reachability && files.length) {
        const graph = reachability();
        if (graph.error || graph.rootCount === 0) {
          // Without a working reachability analysis nothing may be silently excluded.
          failure = graph.error ? `reachability analysis failed: ${graph.error.message}` : "reachability analysis found no route files";
          parts.push(loadFailure(source.dir, new Error(failure)));
          files = [];
        } else {
          const unreachable = files.filter((name) => !graph.reachable.has(path.join(dir, name)));
          files = files.filter((name) => !unreachable.includes(name));
          const unreferenced = [];
          for (const name of unreachable) {
            const rel = `${source.dir}/${name}`;
            try {
              const info = collectInvalidMcqs(await loadModule(root, rel), rel, { contract: source.contract });
              unreferenced.push({ file: rel, checked: info.checked, invalid: info.problems.length });
            } catch (error) {
              unreferenced.push({ file: rel, checked: 0, invalid: 0, loadError: String(error.message).slice(0, 80) });
            }
          }
          if (unreachable.length) {
            parts.push({
              source: source.dir,
              checked: 0,
              problems: [],
              skipped: [],
              notScanned: unreachable.map((name) => `${source.dir}/${name} (not reachable from any student route through imports)`),
              unreferenced,
            });
          }
          if (graph.unresolvedDynamic.length) {
            parts.push({
              source: source.dir,
              checked: 0,
              problems: [],
              skipped: [],
              caveats: [
                `${graph.unresolvedDynamic.length} reachable file(s) contain non-literal dynamic imports that cannot be resolved: ${graph.unresolvedDynamic.map((d) => d.file).join(", ")}`,
              ],
            });
          }
        }
      }
      if (!files.length && !failure) {
        // Nothing left to scan is a visible failure, never a silent "0 invalid".
        parts.push(loadFailure(source.dir, new Error(source.reachability && fs.existsSync(dir) ? "no reachable files to scan" : "no files found")));
      }
      for (const name of files) {
        const rel = `${source.dir}/${name}`;
        try {
          parts.push(collectInvalidMcqs(await loadModule(root, rel), rel, { contract: source.contract }));
        } catch (error) {
          parts.push(loadFailure(rel, error));
        }
      }
    } else if (source.type === "file") {
      try {
        parts.push(collectInvalidMcqs(await loadModule(root, source.file), source.file, { contract: source.contract }));
      } catch (error) {
        parts.push(loadFailure(source.file, error));
      }
    } else if (source.type === "markdown") {
      try {
        const { getMarkdownChapterContent } = await import(
          pathToFileURL(path.join(root, "src/lib/markdownContent.js")).href
        );
        const seen = new Set();
        for (const slug of source.slugs) {
          const parsed = getMarkdownChapterContent(slug);
          if (!parsed || seen.has(parsed.source)) continue;
          seen.add(parsed.source);
          parts.push(collectInvalidMarkdownMcqs({ mcqs: parsed.content.mcqs }, `markdown/${parsed.source}`));
        }
        if (!parts.length) parts.push(loadFailure("markdown chapters", new Error("no markdown chapter resolved")));
      } catch (error) {
        parts.push(loadFailure("markdown chapters", error));
      }
    }
    results.push(merge(source.label, parts));
  }
  return results;
}
