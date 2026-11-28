// Phase 1 content-correctness regressions (audit baseline bdc6542).
// Expected values were established by compiling and running the snippets with
// a real JVM; the Java-execution test below re-checks them when javac exists.
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { isMcqSelectionCorrect, resolveMcqAnswer } from "../src/lib/study/mcqAnswers.mjs";
import {
  ANSWER_CONTRACTS,
  checkAnswerKey,
  collectInvalidMarkdownMcqs,
  collectInvalidMcqs,
  formatMcqReport,
  isMcqShaped,
} from "../src/lib/study/mcqDiagnostics.mjs";
import { EXCLUDED_SOURCES, SCANNED_SOURCES, scanMcqSources } from "../src/lib/study/mcqSources.mjs";
import { resolveBankMcqAnswer } from "../src/lib/study/mcqAnswers.mjs";
import { computeReachable, extractImports, maskSource } from "../src/lib/study/importGraph.mjs";

let loops;
let markdown;
let chapterContent;
let adapter;
let bank;
let rawBank;

before(async () => {
  register(pathToFileURL(path.join(process.cwd(), "test/helpers/extensionlessLoader.mjs")));
  loops = (await import("../src/app/data/chapter-content/loops-combined.js")).default;
  markdown = await import("../src/lib/markdownContent.js");
  chapterContent = await import("../src/lib/chapterContent.js");
  adapter = await import("../src/lib/questionBankAdapter.js");
  bank = await import("../src/lib/javaChapterQuestionBank.js");
  rawBank = (await import("../src/app/data/question-bank/index.js")).default;
});

const mcq = (id) => loops.mcqs.find((q) => q.id === id);
const outputQ = (id) => loops.outputBasedQuestions.find((q) => q.id === id);

/* ------------------------------ 1. MCQ keys ------------------------------ */

test("dwhile-mcq-28 (retained, teacher decision): do-while with i-- prints 10987", () => {
  const q = mcq("dwhile-mcq-28");
  assert.equal(q.options[q.answer], "10987");
  assert.match(q.explanation, /10, 9, 8, 7/);
});

test("dwhile-mcq-17 (teacher decision 10): replaced by the variable-scope question, id kept", () => {
  const q = mcq("dwhile-mcq-17");
  assert.equal(q.question, "What happens when this code is compiled?\ndo {\n    int n = 5;\n    n--;\n} while (n > 0);");
  assert.deepEqual(q.options, [
    "It compiles and the loop runs 5 times",
    "It compiles and the loop runs once",
    "Compilation error: n is not visible in the while condition",
    "It compiles but throws a runtime error",
  ]);
  assert.equal(q.answer, 2);
  assert.match(q.explanation, /declared inside the braces/);
  assert.match(q.explanation, /scope is that block only/);
  assert.match(q.explanation, /cannot find symbol/);
  assert.match(q.explanation, /declare n before the do statement/);
});

test("dwhile-mcq-25 (approved): body runs once when the condition is false from the start", () => {
  const q = mcq("dwhile-mcq-25");
  assert.equal(q.question, "What is the output?\nint i = 10;\ndo {\n    System.out.print(i);\n    i++;\n} while (i < 5);");
  assert.deepEqual(q.options, ["Nothing is printed", "10", "10 11 12 13 14", "Compilation error"]);
  assert.equal(q.answer, 1);
  assert.match(q.explanation, /at least once/);
});

test("dwhile-mcq-24 (approved): accumulator sum 1+2+3+4 = 10", () => {
  const q = mcq("dwhile-mcq-24");
  assert.match(q.question, /int sum = 0;[\s\S]*while \(i <= 4\);[\s\S]*System\.out\.println\(sum\);/);
  assert.deepEqual(q.options, ["6", "10", "15", "Compilation error"]);
  assert.equal(q.answer, 1);
  assert.match(q.explanation, /1 \+ 2 \+ 3 \+ 4 = 10/);
  assert.match(q.explanation, /5 <= 4 is false/);
});

test("retained duplicates' partners stay unchanged: dwhile-mcq-8 and dwhile-mcq-12", () => {
  assert.equal(mcq("dwhile-mcq-8").options[mcq("dwhile-mcq-8").answer], "123");
  assert.equal(mcq("dwhile-mcq-12").options[mcq("dwhile-mcq-12").answer], "54321");
  assert.match(mcq("dwhile-mcq-8").explanation, /post-increment/);
});

test("dwhile-mcq-20 : continue before i++ never terminates", () => {
  const q = mcq("dwhile-mcq-20");
  assert.match(q.options[q.answer], /infinite loop/i);
  assert.notEqual(q.options[q.answer], "1245");
});

test("dwhile-mcq-22 : i++ in the condition makes the final value 4", () => {
  const q = mcq("dwhile-mcq-22");
  assert.equal(q.options[q.answer], "4");
});

test("original ids of corrected Loops questions are unchanged", () => {
  for (const id of ["dwhile-mcq-17", "dwhile-mcq-20", "dwhile-mcq-22", "dwhile-mcq-28"]) assert.ok(mcq(id), id);
  assert.ok(outputQ("for-ob-46"));
  assert.ok(outputQ("dwhile-ob-24"));
});

/* ----------------------------- 2. Output keys ---------------------------- */

test("for-ob-46 : every row starts at 5", () => {
  assert.equal(outputQ("for-ob-46").answer, "54321\n5432\n543\n54\n5");
});

test("dwhile-ob-24 : row 1 is '10' because the inner do-while body runs once with k = 0", () => {
  assert.equal(outputQ("dwhile-ob-24").answer, "10\n121\n12321\n1234321");
});

test("for-ob-24 (for-loop twin, k loop does not run) stays '1'", () => {
  assert.equal(outputQ("for-ob-24").answer, "1\n121\n12321\n1234321");
});

const JAVA = {
  "for-ob-46": null, // answer compared to real output
  "dwhile-ob-24": null,
};

test("real JVM output matches the stored answers (skipped when javac is unavailable)", (t) => {
  try {
    execFileSync("javac", ["-version"], { stdio: "ignore" });
  } catch {
    t.skip("javac not available");
    return;
  }
  const dir = mkdtempSync(path.join(tmpdir(), "phase1-java-"));
  const run = (body) => {
    writeFileSync(path.join(dir, "Main.java"), `public class Main { public static void main(String[] a){ ${body} } }`);
    execFileSync("javac", ["Main.java"], { cwd: dir, stdio: "ignore" });
    return execFileSync("java", ["-cp", dir, "Main"], { encoding: "utf8", env: { ...process.env, JAVA_TOOL_OPTIONS: "" } });
  };
  for (const id of Object.keys(JAVA)) {
    assert.equal(run(outputQ(id).question).trimEnd(), outputQ(id).answer.trimEnd(), id);
  }
  const codeOf = (q) => q.question.split("\n").slice(1).join("\n");
  for (const id of ["dwhile-mcq-28", "dwhile-mcq-22", "dwhile-mcq-25", "dwhile-mcq-24"]) {
    const q = mcq(id);
    assert.equal(run(codeOf(q)).trim(), q.options[q.answer], id);
  }
  // dwhile-mcq-17: the keyed option says "Compilation error", so javac must reject it...
  const scope = codeOf(mcq("dwhile-mcq-17"));
  let compilerOutput = "";
  try {
    run(scope);
    assert.fail("dwhile-mcq-17 snippet must NOT compile");
  } catch (error) {
    compilerOutput = String(error.stderr || error.message);
    if (error.code === "ERR_ASSERTION") throw error;
  }
  // ...and the explanation's fix (declare n before the do statement) must compile and run.
  assert.equal(run("int n = 5; do { n--; } while (n > 0); System.out.print(n);").trim(), "0");
  assert.ok(compilerOutput !== undefined);
});

test("javac reports 'cannot find symbol' for the dwhile-mcq-17 snippet (skipped when javac is unavailable)", (t) => {
  try {
    execFileSync("javac", ["-version"], { stdio: "ignore" });
  } catch {
    t.skip("javac not available");
    return;
  }
  const dir = mkdtempSync(path.join(tmpdir(), "phase1-scope-"));
  const code = mcq("dwhile-mcq-17").question.split("\n").slice(1).join("\n");
  writeFileSync(path.join(dir, "Main.java"), `public class Main { public static void main(String[] a){ ${code} } }`);
  const result = spawnSync("javac", ["Main.java"], { cwd: dir, encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /cannot find symbol/);
  assert.match(result.stderr, /variable n/);
});

/* --------------------- 3. One MCQ answer contract (Loops) ---------------- */

test("every Loops MCQ stores an in-range integer option index", () => {
  for (const q of loops.mcqs) {
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, `${q.id}: ${JSON.stringify(q.answer)}`);
  }
});

test("while-mcq-1..5 use index answers that point at the previously stored option text", () => {
  const expected = {
    "while-mcq-1": "The body does not execute",
    "while-mcq-2": "while",
    "while-mcq-3": "321",
    "while-mcq-4": "Update i toward 10",
    "while-mcq-5": "For each required outer-loop iteration",
  };
  for (const [id, text] of Object.entries(expected)) {
    const q = mcq(id);
    assert.equal(typeof q.answer, "number", id);
    assert.equal(q.options[q.answer], text, id);
  }
});

test("McqSection grading: correct and incorrect selections for while-mcq-1..5", () => {
  const sections = chapterContent.getChapterContent({ slug: "loops" }, loops, null);
  for (const id of ["while-mcq-1", "while-mcq-2", "while-mcq-3", "while-mcq-4", "while-mcq-5"]) {
    const q = sections.mcqs.find((item) => item.id === id);
    assert.ok(q, `${id} must survive normalization`);
    assert.equal(isMcqSelectionCorrect(q.answer, q.answer), true, `${id} correct pick`);
    q.options.forEach((_, index) => {
      if (index !== q.answer) assert.equal(isMcqSelectionCorrect(index, q.answer), false, `${id} wrong pick ${index}`);
    });
    assert.equal(isMcqSelectionCorrect(undefined, q.answer), false, `${id} no selection`);
  }
});

test("resolveMcqAnswer: valid, legacy text, invalid and missing keys", () => {
  const opts = ["a", "b", "c"];
  assert.deepEqual(resolveMcqAnswer(0, opts), { valid: true, index: 0, reason: null });
  assert.equal(resolveMcqAnswer(2, opts).index, 2);
  assert.equal(resolveMcqAnswer("b", opts).index, 1); // legacy option text
  assert.equal(resolveMcqAnswer(3, opts).valid, false); // out of range
  assert.equal(resolveMcqAnswer(-1, opts).valid, false);
  assert.equal(resolveMcqAnswer(1.5, opts).valid, false);
  assert.equal(resolveMcqAnswer("zzz", opts).valid, false); // matches no option
  assert.equal(resolveMcqAnswer("a", ["a", "a", "b"]).valid, false); // ambiguous text
  for (const missing of [undefined, null, "", "  "]) assert.equal(resolveMcqAnswer(missing, opts).valid, false);
  assert.equal(resolveMcqAnswer(0, ["only one"]).valid, false);
});

test("normalizer never renders an MCQ with an invalid key (no silent option A)", () => {
  const content = {
    mcqs: [
      { id: "ok", question: "q", options: ["x", "y"], answer: 1 },
      { id: "missing", question: "q", options: ["x", "y"] },
      { id: "range", question: "q", options: ["x", "y"], answer: 9 },
      { id: "legacy", question: "q", options: ["x", "y"], answer: "x" },
    ],
  };
  const { mcqs } = chapterContent.getChapterContent({ slug: "t" }, content, null);
  assert.deepEqual(mcqs.map((q) => [q.id, q.answer]), [["ok", 1], ["legacy", 0]]);
});

/* ------------------- 4. Introduction Markdown MCQ parsing ---------------- */

test("Introduction markdown: exactly the 15 real MCQs, ids 1..15, MCQs 1-8 present", () => {
  const source = readFileSync(path.join(process.cwd(), "docs/02_Academic/Introduction_to_Java_Class9.md"), "utf8");
  const { mcqs } = markdown.parseMarkdownMcqs(source);
  assert.equal(mcqs.length, 15);
  assert.deepEqual(mcqs.map((q) => q.id), Array.from({ length: 15 }, (_, i) => `md-mcq-${i + 1}`));
  for (let n = 1; n <= 8; n += 1) assert.ok(mcqs.some((q) => q.id === `md-mcq-${n}`), `MCQ ${n}`);
  assert.equal(new Set(mcqs.map((q) => q.id)).size, 15);
  const keyed = (n) => mcqs[n - 1].options[mcqs[n - 1].answer];
  assert.equal(keyed(1), "Sun Microsystems");
  assert.equal(keyed(2), "JVM");
  assert.equal(keyed(4), "main()"); // teacher decision 8
  assert.equal(keyed(8), "Both A and B"); // teacher decision 9 (Option 1)
  assert.equal(keyed(15), "Hello.class");
});

test("Introduction MCQ 4 (teacher decision 8): reworded question, answer main()", () => {
  const { content } = markdown.getMarkdownChapterContent("introduction-to-java");
  const q4 = content.mcqs.find((q) => q.id === "md-mcq-4");
  assert.equal(q4.question, "Which method is the entry point of a Java application?");
  assert.deepEqual(q4.options, ["main()", "start()", "run()", "execute()"]);
  assert.equal(q4.valid, true);
  assert.equal(q4.options[q4.answer], "main()");
});

test("Introduction MCQ 8 (teacher decision 9, Option 1): complete class declarations, C is the only key", () => {
  const { content } = markdown.getMarkdownChapterContent("introduction-to-java");
  const q8 = content.mcqs.find((q) => q.id === "md-mcq-8");
  assert.equal(q8.question, "Which of the following is a valid class declaration for a Java program?"); // stem unchanged
  assert.deepEqual(q8.options, ["class MyClass { }", "public class MyClass { }", "Both A and B", "None"]);
  assert.equal(q8.answer, 2);
  assert.equal(q8.valid, true);
  const source = readFileSync(path.join(process.cwd(), "docs/02_Academic/Introduction_to_Java_Class9.md"), "utf8");
  assert.equal((source.match(/- [A-D]\) .*✓/g) || []).length, 15, "exactly one ✓ per MCQ, 15 MCQs");
});

test("Introduction MCQ 8 grading: C correct, A / B / D incorrect (through the shared grader)", () => {
  const { content } = markdown.getMarkdownChapterContent("introduction-to-java");
  const q8 = chapterContent.getChapterContent({ slug: "introduction-to-java" }, content, null).mcqs.find((q) => q.id === "md-mcq-8");
  assert.deepEqual([0, 1, 2, 3].map((i) => isMcqSelectionCorrect(i, q8.answer)), [false, false, true, false]);
});

test("both MCQ 8 class declarations really compile (skipped when javac is unavailable)", (t) => {
  try {
    execFileSync("javac", ["-version"], { stdio: "ignore" });
  } catch {
    t.skip("javac not available");
    return;
  }
  const { content } = markdown.getMarkdownChapterContent("introduction-to-java");
  const q8 = content.mcqs.find((q) => q.id === "md-mcq-8");
  for (const declaration of q8.options.slice(0, 2)) {
    const dir = mkdtempSync(path.join(tmpdir(), "phase1-class-"));
    writeFileSync(path.join(dir, "MyClass.java"), `${declaration}\n`);
    const result = spawnSync("javac", ["MyClass.java"], { cwd: dir, encoding: "utf8" });
    assert.equal(result.status, 0, `${declaration}: ${result.stderr}`);
  }
});

test("Introduction: all 15 MCQs are valid and shown to students, no parse errors", () => {
  const { content } = markdown.getMarkdownChapterContent("introduction-to-java");
  assert.deepEqual(content.mcqErrors, []);
  const shown = chapterContent.getChapterContent({ slug: "introduction-to-java" }, content, null).mcqs;
  assert.equal(shown.length, 15);
  assert.equal(shown.find((q) => q.id === "md-mcq-4").options[shown.find((q) => q.id === "md-mcq-4").answer], "main()");
});

test("MD parser ignores numbered items outside the MCQ section and keeps headings out of explanations", () => {
  const md = [
    "# T",
    "## Practice Questions",
    "1. **Explain JVM.**",
    "   - A) not an mcq option",
    "## MCQs",
    "### Part one",
    "1. **Q one?**",
    "   - A) x ✓",
    "   - B) y",
    "### Part two",
    "2. **Q two?**",
    "   - A) x",
    "   - B) y ✓",
    "---",
    "## Programming Questions",
    "3. **Write code.**",
    "   - A) nope",
  ].join("\n");
  const { mcqs, errors } = markdown.parseMarkdownMcqs(md);
  assert.deepEqual(mcqs.map((q) => [q.id, q.answer, q.explanation]), [["md-mcq-1", 0, ""], ["md-mcq-2", 1, ""]]);
  assert.equal(errors.length, 0);
});

test("MD parser: missing, multiple and duplicate keys are validation errors", () => {
  const md = [
    "## MCQs",
    "1. **No key?**",
    "   - A) x",
    "   - B) y",
    "2. **Two keys?**",
    "   - A) x ✓",
    "   - B) y ✓",
    "3. **Fine?**",
    "   - A) x",
    "   - B) y ✓",
    "3. **Same number again?**",
    "   - A) x ✓",
    "   - B) y",
  ].join("\n");
  const { mcqs, errors } = markdown.parseMarkdownMcqs(md);
  assert.deepEqual(mcqs.map((q) => q.valid), [false, false, true, false]);
  assert.ok(mcqs.every((q) => q.valid || q.answer === null));
  assert.match(errors[0].error, /missing/);
  assert.match(errors[1].error, /ambiguous/);
  assert.match(errors[2].error, /duplicate/);
  assert.deepEqual(markdown.parseMarkdownMcqs("# no mcq section\n## Other\n1. **Q?**\n   - A) x ✓\n   - B) y").mcqs, []);
});

/* ------------- 5. Question bank: canonical vs alias slugs ---------------- */

const ALIAS_GROUPS = [
  ["introduction", "introduction-to-java"],
  ["loops", "for-loop", "while-loop", "do-while-loop"],
  ["constructor", "constructors"],
  ["if-else", "if", "nested-if", "switch"],
  ["arrays", "arrays-1d", "arrays-2d"],
];

test("every canonical and alias slug keeps its authored questions", () => {
  for (const group of ALIAS_GROUPS) {
    for (const slug of group) {
      const questions = adapter.getQuestionBankChapter(slug);
      assert.ok(questions.length >= 40, `${slug} has ${questions.length}`);
      assert.deepEqual(
        new Set(bank.chapterQuestionBankBySlug[slug].map((q) => q.id)),
        new Set(questions.filter((q) => bank.chapterQuestionBankBySlug[slug].some((b) => b.id === q.id)).map((q) => q.id)),
        slug,
      );
    }
  }
});

test("aliases of one bank chapter expose the same stable question ids", () => {
  for (const group of ALIAS_GROUPS) {
    const idSets = group.map((slug) => bank.chapterQuestionBankBySlug[slug].map((q) => q.id).sort().join("|"));
    assert.equal(new Set(idSets).size, 1, group.join(","));
    const served = group.map((slug) => new Set(adapter.getQuestionBankChapter(slug).map((q) => q.id)));
    for (const id of bank.chapterQuestionBankBySlug[group[0]].map((q) => q.id)) {
      for (const set of served) assert.ok(set.has(id), `${id} missing`);
    }
  }
});

test("duplicate protection: ids unique per chapter and across the global bank", () => {
  for (const slug of ["for-loop", "constructors", "introduction", "loops"]) {
    const ids = adapter.getQuestionBankChapter(slug).map((q) => q.id);
    assert.equal(new Set(ids).size, ids.length, slug);
  }
  const globalIds = adapter.questionBankQuestions.map((q) => q.id);
  assert.equal(new Set(globalIds).size, globalIds.length);
  assert.equal(bank.allJavaChapterQuestions.length, new Set(bank.allJavaChapterQuestions.map((q) => q.id)).size);
});

test("constructors serves the authored constructor questions; unknown slug stays empty", () => {
  const ids = new Set(adapter.getQuestionBankChapter("constructors").map((q) => q.id));
  for (const q of bank.chapterQuestionBankBySlug.constructor) assert.ok(ids.has(q.id), q.id);
  assert.deepEqual(adapter.getQuestionBankChapter("no-such-chapter"), []);
  assert.deepEqual(adapter.getQuestionBankChapter(undefined), []);
});

/* ----------------- 6. Teacher/admin diagnostics + duplicates ------------- */

const mk = (extra) => ({ id: "x", question: "q?", options: ["a", "b", "c"], ...extra });

test("diagnostics detect MCQs by structure: options + question text, not by an answer property", () => {
  assert.equal(isMcqShaped(mk({})), true); // no answer property at all
  assert.equal(isMcqShaped({ id: "x", assertion: "A", options: ["t", "f"] }), true);
  assert.equal(isMcqShaped({ id: "x", question: "q", options: [] }), false);
  assert.equal(isMcqShaped({ id: "x", options: ["a", "b"] }), false); // no question text
  assert.equal(isMcqShaped({ question: "q" }), false);
});

test("REGRESSION: an MCQ with options but NO answer property must be reported (never omitted)", () => {
  const result = collectInvalidMcqs({ mcqs: [mk({ id: "no-answer-prop" })] }, "unit");
  assert.equal(result.checked, 1, "the MCQ must be counted as checked");
  assert.equal(result.problems.length, 1, "the MCQ without an answer property must be reported");
  assert.equal(result.problems[0].id, "no-answer-prop");
  assert.match(result.problems[0].reason, /missing answer key \(no answer or correctAnswer property\)/);
});

test("answer-key cases: missing, null, blank, invalid, out-of-range, ambiguous, valid", () => {
  const cases = [
    ["missing property", mk({}), false, /missing answer key/],
    ["answer null", mk({ answer: null }), false, /empty answer key/],
    ["answer undefined", mk({ answer: undefined }), false, /empty answer key/],
    ["answer blank string", mk({ answer: "   " }), false, /empty answer key/],
    ["correctAnswer null, no answer", mk({ correctAnswer: null }), false, /empty answer key/],
    ["text matches no option", mk({ answer: "zzz" }), false, /matches no option/],
    ["non-integer index", mk({ answer: 1.5 }), false, /outside 0\.\.2/],
    ["negative index", mk({ answer: -1 }), false, /outside 0\.\.2/],
    ["out-of-range index", mk({ answer: 3 }), false, /outside 0\.\.2/],
    ["wrong type", mk({ answer: true }), false, /missing answer key|invalid/],
    ["ambiguous text", mk({ options: ["x", "x", "y"], answer: "x" }), false, /more than one option/],
    ["single option", mk({ options: ["only"], answer: 0 }), false, /fewer than 2 options/],
    ["valid index", mk({ answer: 2 }), true, null],
    ["valid index 0", mk({ answer: 0 }), true, null],
    ["valid legacy text", mk({ answer: "b" }), true, null],
    ["valid correctAnswer text", mk({ correctAnswer: "c" }), true, null],
  ];
  for (const [label, node, valid, reason] of cases) {
    const result = checkAnswerKey(node);
    assert.equal(result.valid, valid, label);
    if (reason) assert.match(result.reason, reason, label);
  }
});

test("letter contract (question bank): letters map to options; text, out-of-range and missing are invalid", () => {
  const L = ANSWER_CONTRACTS.LETTER_OR_INDEX;
  assert.equal(checkAnswerKey(mk({ correctAnswer: "B" }), L).valid, true);
  assert.equal(checkAnswerKey(mk({ correctAnswer: " c " }), L).valid, true);
  assert.equal(checkAnswerKey(mk({ answer: 1 }), L).valid, true);
  assert.match(checkAnswerKey(mk({ correctAnswer: "D" }), L).reason, /letter D is outside the 3 options/);
  assert.match(checkAnswerKey(mk({ correctAnswer: "A + B" }), L).reason, /expected a single option letter/);
  assert.match(checkAnswerKey(mk({ answer: 3 }), L).reason, /outside 0\.\.2/);
  assert.match(checkAnswerKey(mk({}), L).reason, /missing answer key/);
  assert.match(checkAnswerKey(mk({ correctAnswer: null }), L).reason, /empty answer key/);
});

test("collectInvalidMcqs: nested paths, per-source labels and skipped options arrays", () => {
  const data = {
    mcqs: [mk({ id: "good", answer: 0 }), mk({ id: "no-key" }), mk({ id: "range", answer: 9 })],
    nested: { more: [{ id: "bad-text", question: "q", options: ["x", "y"], answer: "zzz" }] },
    widget: { id: "ui-select", options: ["small", "large"] }, // not a question
  };
  const result = collectInvalidMcqs(data, "unit");
  assert.equal(result.checked, 4);
  assert.deepEqual(result.problems.map((p) => p.id), ["no-key", "range", "bad-text"]);
  assert.equal(result.problems[2].path, "nested.more[0]");
  assert.deepEqual(result.skipped.map((p) => p.id), ["ui-select"]);
  const report = formatMcqReport([result], { exclusions: ["somewhere"] });
  assert.match(report, /4 MCQs checked, 3 invalid, 1 options-arrays skipped/);
  assert.match(report, /INVALID unit :: no-key/);
  assert.match(report, /SKIPPED unit :: ui-select/);
  assert.match(report, /NOT scanned/);
});

test("scanMcqSources reports a seeded MCQ without an answer property, and a file that fails to load", async () => {
  const root = mkdtempSync(path.join(tmpdir(), "mcq-scan-"));
  const { mkdirSync } = await import("node:fs");
  mkdirSync(path.join(root, "data"));
  writeFileSync(
    path.join(root, "data/seeded.mjs"),
    'export default { mcqs: [{ id: "seed-ok", question: "q", options: ["a","b"], answer: 1 }, { id: "seed-no-answer", question: "q", options: ["a","b"] }] };'
  );
  writeFileSync(path.join(root, "data/broken.mjs"), "export default {{{");
  const results = await scanMcqSources({
    root,
    sources: [
      { label: "seeded", type: "file", file: "data/seeded.mjs", contract: ANSWER_CONTRACTS.INDEX_OR_TEXT },
      { label: "broken", type: "file", file: "data/broken.mjs", contract: ANSWER_CONTRACTS.INDEX_OR_TEXT },
      { label: "missing dir", type: "dir", dir: "data/nope", filter: () => true, contract: ANSWER_CONTRACTS.INDEX_OR_TEXT },
    ],
  });
  assert.deepEqual(results[0].problems.map((p) => p.id), ["seed-no-answer"]);
  assert.equal(results[0].checked, 2);
  assert.match(results[1].problems[0].reason, /source failed to load/);
  assert.match(results[2].problems[0].reason, /no files found/);
});

test("shipped coverage: every registered source is scanned with real MCQ counts; exclusions are listed", async () => {
  const results = await scanMcqSources({ root: process.cwd() });
  const byLabel = Object.fromEntries(results.map((r) => [r.source.split(" (")[0], r]));
  assert.equal(results.length, SCANNED_SOURCES.length);
  assert.ok(byLabel["Rich chapter content"].checked >= 410);
  assert.equal(byLabel["Markdown chapters"].checked, 15);
  assert.ok(byLabel["Java question bank"].checked >= 230);
  assert.ok(byLabel["Mock test questions"].checked >= 16);
  assert.deepEqual(results.flatMap((r) => r.problems), [], "shipped content must have no invalid keys");
  const notScanned = results.flatMap((r) => r.notScanned || []).join("\n");
  assert.match(notScanned, /chapter-content\/10-strings\.js \(not reachable/); // 10-strings-master.js is the imported one
  assert.doesNotMatch(notScanned, /10-strings-master/);
  assert.match(notScanned, /19-boolean-algebra\.js/);
  assert.match(notScanned, /08-system-of-numeration\.js/);
  assert.ok(EXCLUDED_SOURCES.some((e) => /boardprep/.test(e)));
  assert.ok(EXCLUDED_SOURCES.some((e) => /Firestore/.test(e)));
});

test("diagnostics report Markdown MCQs with a missing key", () => {
  const parsed = markdown.parseMarkdownMcqs("## MCQs\n1. **Q?**\n   - A) x\n   - B) y\n");
  const result = collectInvalidMarkdownMcqs(parsed, "md");
  assert.deepEqual(result.problems.map((p) => [p.id, p.reason]), [["md-mcq-1", "missing answer key (no ✓ on any option)"]]);
});

test("npm run validate:mcqs passes on shipped content and states its coverage limits", () => {
  const out = execFileSync("node", ["scripts/validate-mcq-keys.mjs"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  assert.match(out, /developer-facing/);
  assert.match(out, /, 0 invalid,/);
  assert.match(out, /NOT scanned \(coverage is limited to the sources above, not repo-wide\)/);
  assert.match(out, /boardprep/);
});

test("Loops and Introduction MCQ sections: unique ids and NO duplicate question text (allow-list is empty)", () => {
  const KNOWN = new Set(); // 17/28, 8/25 and 12/24 were all resolved by the approved replacements
  const norm = (text) => String(text).replace(/\s+/g, " ").trim().toLowerCase();
  const { content } = markdown.getMarkdownChapterContent("introduction-to-java");
  for (const [label, list] of [
    ["loops", chapterContent.getChapterContent({ slug: "loops" }, loops, null).mcqs],
    ["intro", chapterContent.getChapterContent({ slug: "introduction-to-java" }, content, null).mcqs],
  ]) {
    assert.equal(new Set(list.map((q) => q.id)).size, list.length, `${label}: duplicate ids`);
    const byText = new Map();
    for (const q of list) byText.set(norm(q.question), [...(byText.get(norm(q.question)) || []), q.id]);
    for (const ids of byText.values()) {
      if (ids.length > 1) assert.ok(KNOWN.has(ids.join("|")), `${label}: duplicate question text ${ids.join(",")}`);
    }
  }
});

test("bank per-chapter lists contain no duplicate question text", () => {
  const norm = (text) => String(text).replace(/\s+/g, " ").trim().toLowerCase();
  for (const slug of ["introduction-to-java", "for-loop", "while-loop", "do-while-loop", "constructors"]) {
    const texts = adapter.getQuestionBankChapter(slug).map((q) => norm(q.question));
    assert.equal(new Set(texts).size, texts.length, slug);
  }
});

/* --------- 7. Bank normalizer: no silent option A (technical hardening) -- */

test("resolveBankMcqAnswer: missing, unresolvable, valid 0, valid non-zero, out-of-range", () => {
  assert.match(resolveBankMcqAnswer({}, 4).reason, /missing answer key/); // missing answer index
  assert.match(resolveBankMcqAnswer({ correctAnswer: null }, 4).reason, /empty answer key/);
  assert.match(resolveBankMcqAnswer({ correctAnswer: "  " }, 4).reason, /empty answer key/);
  assert.match(resolveBankMcqAnswer({ correctAnswer: "A + B" }, 4).reason, /expected a single option letter/); // unresolvable
  assert.match(resolveBankMcqAnswer({ answer: "text" }, 4).reason, /expected a single option letter/);
  assert.match(resolveBankMcqAnswer({ answer: true }, 4).reason, /invalid answer key type/);
  assert.deepEqual(resolveBankMcqAnswer({ answer: 0 }, 4), { valid: true, index: 0, reason: null }); // valid index 0
  assert.deepEqual(resolveBankMcqAnswer({ correctAnswer: "A" }, 4), { valid: true, index: 0, reason: null });
  assert.deepEqual(resolveBankMcqAnswer({ correctAnswer: "" , answer: 0 }, 4), { valid: true, index: 0, reason: null });
  assert.equal(resolveBankMcqAnswer({ correctAnswer: "C" }, 4).index, 2); // valid non-zero
  assert.equal(resolveBankMcqAnswer({ correctAnswer: " d " }, 4).index, 3);
  assert.equal(resolveBankMcqAnswer({ answer: 3 }, 4).index, 3);
  assert.match(resolveBankMcqAnswer({ answer: 4 }, 4).reason, /outside 0\.\.3/); // out of range
  assert.match(resolveBankMcqAnswer({ answer: -1 }, 4).reason, /outside 0\.\.3/);
  assert.match(resolveBankMcqAnswer({ answer: 1.5 }, 4).reason, /outside 0\.\.3/);
  assert.match(resolveBankMcqAnswer({ correctAnswer: "E" }, 4).reason, /letter E is outside the 4 options/);
  assert.equal(resolveBankMcqAnswer(undefined, 4).valid, false);
});

test("bank normalizer drops unresolvable MCQs (never option A) and reports them; valid keys keep their index", () => {
  const base = { id: "t-1", question: "q?", options: ["A) w", "B) x", "C) y", "D) z"] };
  const problems = [];
  const run = (extra, type = "mcq") => bank.normalizeRealQuestion({ ...base, ...extra }, type, "loops", (p) => problems.push(p));

  assert.equal(run({}), null, "missing key");
  assert.equal(run({ correctAnswer: "Z" }), null, "out-of-range letter");
  assert.equal(run({ correctAnswer: "see explanation" }), null, "unresolvable text");
  assert.equal(run({ answer: 9 }), null, "out-of-range index");
  assert.equal(run({ answer: null }), null, "null key");
  assert.deepEqual(problems.map((p) => p.id), ["t-1", "t-1", "t-1", "t-1", "t-1"]);
  assert.equal(problems.length, 5);

  const zero = run({ correctAnswer: "A" });
  assert.equal(zero.answer, 0);
  assert.equal(zero.correctAnswer, "w");
  assert.equal(run({ answer: 0 }).answer, 0);
  const three = run({ correctAnswer: "D" });
  assert.equal(three.answer, 3);
  assert.equal(three.correctAnswer, "z");
  assert.equal(run({ answer: 2 }).answer, 2);
  assert.equal(run({ correctAnswer: "B" }).id, "t-1", "ids are preserved");

  // non-MCQ categories are untouched by the MCQ key rule
  const output = bank.normalizeRealQuestion({ id: "o-1", question: "q", expectedOutput: "42" }, "output", "loops");
  assert.equal(output.answer, "42");
});

test("shipped question bank: nothing was dropped and every valid answer is exactly what the old logic produced", () => {
  assert.deepEqual(bank.invalidBankQuestions, [], "no shipped bank MCQ may have an unresolvable key");
  const letterToIndex = (letter) => {
    const n = String(letter || "").trim().toUpperCase().charCodeAt(0) - 65;
    return Number.isFinite(n) && n >= 0 && n <= 25 ? n : null;
  };
  const served = new Map();
  for (const q of bank.allJavaChapterQuestions) if (q.type === "mcq") served.set(q.id, q);
  let compared = 0;
  const mapped = new Set(Object.keys(bank.chapterQuestionBankBySlug));
  for (const chapter of rawBank.chapters) {
    for (const category of ["mcqs", "assertionReasons"]) {
      for (const raw of chapter[category] || []) {
        const entry = served.get(String(raw.id));
        if (!entry) continue; // chapter not mapped to a Java route
        const old = raw.correctAnswer ? letterToIndex(raw.correctAnswer) : typeof raw.answer === "number" ? raw.answer : null;
        assert.equal(entry.answer, old, `${raw.id}: answer index changed`);
        compared += 1;
      }
    }
  }
  assert.equal(compared, served.size, "every served bank MCQ was compared against the old logic");
  assert.ok(compared >= 200, `only ${compared} MCQs compared`);
  assert.ok(mapped.size > 20);
});

/* ------------------ 8. Reachability / import detection ------------------- */

function makeProject(files) {
  const root = mkdtempSync(path.join(tmpdir(), "mcq-graph-"));
  for (const [file, text] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    writeFileSync(path.join(root, file), text);
  }
  return root;
}

test("import detection: masks comments and strings, handles real import forms only", () => {
  const source = [
    '// import "./commented-line";',
    '/* import "./commented-block"; */',
    'const text = "import \'./in-string\'";',
    "const tpl = `import './in-template'`;",
    'import a from "./a";',
    'import {',
    '  b,',
    '  c',
    '} from "./multi-line";',
    'import "./side-effect";',
    'export * from "./re-export";',
    'export { d } from "./re-export-named";',
    'const lazy = dynamic(() => import("./lazy"));',
    'const r = require("./req");',
    'const p = <p>Don\'t break "./jsx-text"</p>;',
    "const t = import(`./tpl-${x}`);",
    'import e from "@/lib/aliased";',
    'import k from "firebase/firestore";',
  ].join("\n");
  const { specifiers, unresolvedDynamic } = extractImports(source);
  assert.deepEqual(
    specifiers.sort(),
    ["./a", "./lazy", "./multi-line", "./re-export", "./re-export-named", "./req", "./side-effect", "@/lib/aliased", "firebase/firestore"].sort()
  );
  assert.equal(unresolvedDynamic, 1, "the template-literal dynamic import is reported, not guessed");
  assert.equal(maskSource('x = "abc"; // c').includes("abc"), false);
});

test("reachability: 10-strings must not count as imported just because 10-strings-master is", () => {
  const root = makeProject({
    "src/app/page.jsx": 'import chapters from "./data";\nimport extra from "@/lib/extra";\n// import "./data/10-strings";\n',
    "src/app/data/index.js": 'import master from "./10-strings-master";\nexport default [master];\n',
    "src/app/data/10-strings-master.js": "export default {};\n",
    "src/app/data/10-strings.js": "export default {};\n",
    "src/lib/extra.js": 'export { x } from "./deep";\n',
    "src/lib/deep.js": "export const x = 1;\n",
    "src/app/orphan/page-like.js": "export default 1;\n",
  });
  const { reachable, rootCount, unresolvedDynamic } = computeReachable(root);
  const has = (rel) => reachable.has(path.join(root, rel));
  assert.equal(rootCount, 1);
  assert.equal(has("src/app/data/index.js"), true); // directory import resolves to index.js
  assert.equal(has("src/app/data/10-strings-master.js"), true);
  assert.equal(has("src/app/data/10-strings.js"), false);
  assert.equal(has("src/lib/deep.js"), true); // alias + re-export chain
  assert.equal(has("src/app/orphan/page-like.js"), false);
  assert.deepEqual(unresolvedDynamic, []);
});

test("registry: unreachable files are listed as not scanned (with informational counts); reachable ones are scanned", async () => {
  const mcq = (id, extra) => `{ id: "${id}", question: "q", options: ["a","b"], ${extra} }`;
  const root = makeProject({
    "src/app/page.jsx": 'import data from "./data";\n',
    "src/app/data/index.js": 'import live from "./live";\nexport default [live];\n',
    "src/app/data/live.js": `export default { mcqs: [${mcq("live-ok", "answer: 0")}] };\n`,
    "src/app/data/orphan.js": `export default { mcqs: [${mcq("orphan-bad", 'answer: "zzz"')}] };\n`,
  });
  const [result] = await scanMcqSources({
    root,
    sources: [{ label: "data", type: "dir", dir: "src/app/data", filter: (n) => n !== "index.js", reachability: true, contract: ANSWER_CONTRACTS.INDEX_OR_TEXT }],
  });
  assert.equal(result.checked, 1);
  assert.deepEqual(result.problems, [], "unreachable file problems must not be counted as failures");
  assert.match(result.notScanned.join("\n"), /orphan\.js \(not reachable/);
  assert.deepEqual(result.unreferenced, [{ file: "src/app/data/orphan.js", checked: 1, invalid: 1 }]);
  assert.match(formatMcqReport([result]), /Unreferenced files \(informational only/);
});

test("registry: if reachability cannot be established, the failure is visible (nothing silently excluded)", async () => {
  const root = makeProject({ "src/app/data/live.js": "export default {};\n" }); // no route files at all
  const [result] = await scanMcqSources({
    root,
    sources: [{ label: "data", type: "dir", dir: "src/app/data", filter: () => true, reachability: true, contract: ANSWER_CONTRACTS.INDEX_OR_TEXT }],
  });
  assert.equal(result.problems.length, 1);
  assert.match(result.problems[0].reason, /reachability analysis found no route files/);
});

test("shipped project: reachable chapter-content files are the ones index.js imports; 10-strings.js is unreferenced", () => {
  const root = process.cwd();
  const { reachable, rootCount, unresolvedDynamic } = computeReachable(root);
  assert.ok(rootCount > 100);
  const rel = (f) => path.join(root, "src/app/data/chapter-content", f);
  for (const f of ["loops-combined.js", "constructors.js", "operators.js", "10-strings-master.js", "arrays-combined.js"]) {
    assert.equal(reachable.has(rel(f)), true, f);
  }
  assert.equal(reachable.has(rel("10-strings.js")), false);
  assert.deepEqual(unresolvedDynamic, [], "no unresolvable dynamic imports among reachable files");
});
