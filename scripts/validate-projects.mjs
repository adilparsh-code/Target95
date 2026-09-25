#!/usr/bin/env node
/**
 * Project package validator.
 *
 * Every project card on a student-facing page must point at a complete,
 * honest package: problem statement, instructions, learning outcomes,
 * requirements, algorithm, test cases, report structure, viva questions and
 * syllabus mapping. Coding projects must additionally ship runnable code with
 * a sample input, sample output and test cases.
 *
 * Run with: npm run validate:projects
 */

import { PROJECT_GROUPS } from "../src/app/data/projects/index.js";

const REQUIRED_TEXT = [
  "title",
  "summary",
  "problemStatement",
  "boardLabel",
  "difficulty",
];

const REQUIRED_LIST = [
  "objectives",
  "learningOutcomes",
  "concepts",
  "algorithm",
  "testCases",
  "edgeCases",
  "reportFormat",
  "viva",
  "syllabusMapping",
  "extensions",
];

const REQUIRED_OBJECT = ["requirements"];

const CODING_TEXT = ["language", "setup", "sampleInput", "sampleOutput"];
const CODING_LIST = ["codeExplanation"];

const findings = [];
const seenSlugs = new Map();

function isFilledText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isFilledList(value) {
  return Array.isArray(value) && value.length > 0;
}

function isFilledObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function checkProject(groupKey, project) {
  const label = `${groupKey}/${project?.slug || "unknown"}`;

  if (!isFilledText(project?.slug)) {
    findings.push({ level: "ERROR", label, message: "Missing slug." });
    return;
  }

  const key = `${groupKey}:${project.slug}`;
  if (seenSlugs.has(key)) {
    findings.push({ level: "ERROR", label, message: "Duplicate slug inside the project group." });
  } else {
    seenSlugs.set(key, label);
  }

  for (const field of REQUIRED_TEXT) {
    if (!isFilledText(project[field])) {
      findings.push({ level: "ERROR", label, message: `Missing or empty "${field}".` });
    }
  }

  for (const field of REQUIRED_LIST) {
    if (!isFilledList(project[field])) {
      findings.push({ level: "ERROR", label, message: `Missing or empty "${field}" list.` });
    }
  }

  for (const field of REQUIRED_OBJECT) {
    if (!isFilledObject(project[field])) {
      findings.push({ level: "ERROR", label, message: `Missing "${field}" object.` });
    }
  }

  const requirements = project.requirements || {};
  for (const section of ["software", "libraries", "data", "hardware"]) {
    if (!isFilledList(requirements[section])) {
      findings.push({ level: "ERROR", label, message: `requirements.${section} is missing or empty.` });
    }
  }

  if (isFilledText(project.title) && !/^[A-Z0-9]/.test(project.title.trim())) {
    findings.push({ level: "WARNING", label, message: `Title is not in sentence/title case: "${project.title}"` });
  }

  if (project.code) {
    for (const field of CODING_TEXT) {
      if (!isFilledText(project[field])) {
        findings.push({ level: "ERROR", label, message: `Coding project is missing "${field}".` });
      }
    }
    for (const field of CODING_LIST) {
      if (!isFilledList(project[field])) {
        findings.push({ level: "ERROR", label, message: `Coding project is missing "${field}".` });
      }
    }
    if (!isFilledText(project.code?.content)) {
      findings.push({ level: "ERROR", label, message: "Coding project has empty code.content." });
    }
    if (project.code?.content && /TODO|PLACEHOLDER|your code here/i.test(project.code.content)) {
      findings.push({ level: "ERROR", label, message: "code.content still contains placeholder text." });
    }
    if (isFilledText(project.code?.filename) && !/\.(py|sql|java|c|cpp)$/i.test(project.code.filename)) {
      findings.push({ level: "WARNING", label, message: `Unexpected code filename: ${project.code.filename}` });
    }
  }

  for (const testCase of project.testCases || []) {
    if (!isFilledText(testCase.input) || !isFilledText(testCase.expected)) {
      findings.push({ level: "ERROR", label, message: "A test case is missing input or expected output." });
    }
  }
}

let projectCount = 0;

for (const [groupKey, group] of Object.entries(PROJECT_GROUPS)) {
  if (!isFilledText(group.basePath) || !isFilledText(group.backHref) || !isFilledList(group.projects)) {
    findings.push({ level: "ERROR", label: groupKey, message: "Project group is missing basePath, backHref or projects." });
    continue;
  }
  for (const project of group.projects) {
    projectCount += 1;
    checkProject(groupKey, project);
  }
}

const errors = findings.filter((finding) => finding.level === "ERROR");
const warnings = findings.filter((finding) => finding.level === "WARNING");

console.log("TARGET95 PROJECT VALIDATION");
console.log(`Groups: ${Object.keys(PROJECT_GROUPS).length}`);
console.log(`Projects: ${projectCount}`);
console.log(`ERRORS: ${errors.length}`);
console.log(`WARNINGS: ${warnings.length}`);

for (const finding of findings) {
  console.log(`${finding.level} [${finding.label}] ${finding.message}`);
}

if (errors.length) {
  console.error("\n❌ Project validation failed.");
  process.exit(1);
}

console.log("\n✅ Every registered project package is complete.");
