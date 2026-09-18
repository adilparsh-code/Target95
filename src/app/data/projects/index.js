import { ISC_AI_XI_PROJECTS_FULL } from "./iscAIProjectsXI";
import { ISC_AI_XII_PROJECTS_FULL } from "./iscAIProjectsXII";
import { CBSE_843_XI_PROJECTS_FULL } from "./cbseAI843ProjectsXI";
import { CBSE_843_XII_PROJECTS_FULL } from "./cbseAI843ProjectsXII";
import { CBSE_083_PROJECTS } from "./cbseCS083Projects";

const ISC_AI_PROJECTS = [...ISC_AI_XI_PROJECTS_FULL, ...ISC_AI_XII_PROJECTS_FULL];
const CBSE_843_PROJECTS = [...CBSE_843_XI_PROJECTS_FULL, ...CBSE_843_XII_PROJECTS_FULL];

/**
 * Central project registry for Target95.
 *
 * Each group is a board + class + subject project lab. Project pages under
 * `<basePath>/[slug]` render the full 18-section student package; `<basePath>`
 * renders the index of every project in the group.
 *
 * Boards are kept strictly separate: ISC AI 883 never mixes with CBSE AI 843,
 * and CBSE Computer Science 083 has its own registry.
 */

const byClass = (projects, classNumber) => projects.filter((project) => Number(project.classNumber) === Number(classNumber));

export const PROJECT_GROUPS = {
  "isc-ai-11": {
    board: "ISC",
    boardLabel: "ISC Artificial Intelligence (883)",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    heading: "ISC AI 883 · Class XI Project Lab",
    intro: "Complete ISC Class XI Artificial Intelligence project packages, each with runnable Python code, sample output, tests and viva preparation. Project work is kept separate from the theory syllabus.",
    basePath: "/isc/artificial-intelligence/11/project",
    backHref: "/isc/artificial-intelligence/11",
    backLabel: "ISC XI AI",
    projects: byClass(ISC_AI_PROJECTS, 11),
  },
  "isc-ai-12": {
    board: "ISC",
    boardLabel: "ISC Artificial Intelligence (883)",
    classNumber: 12,
    subjectName: "Artificial Intelligence",
    heading: "ISC AI 883 · Class XII Project Lab",
    intro: "Complete ISC Class XII Artificial Intelligence project packages with runnable Python implementations, setup instructions, meaningful sample output and responsible-AI discussion.",
    basePath: "/isc/artificial-intelligence/12/project",
    backHref: "/isc/artificial-intelligence/12",
    backLabel: "ISC XII AI",
    projects: byClass(ISC_AI_PROJECTS, 12),
  },
  "cbse-11-843": {
    board: "CBSE",
    boardLabel: "CBSE Artificial Intelligence (843)",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    heading: "CBSE AI 843 · Class XI Project Lab",
    intro: "Complete CBSE Class XI Artificial Intelligence project packages. Coding projects ship runnable code; research and design projects ship a full student package instead of forced code.",
    basePath: "/cbse/class/11/subject/843/project",
    backHref: "/cbse/class/11/subject/843",
    backLabel: "CBSE AI XI",
    projects: byClass(CBSE_843_PROJECTS, 11),
  },
  "cbse-12-843": {
    board: "CBSE",
    boardLabel: "CBSE Artificial Intelligence (843)",
    classNumber: 12,
    subjectName: "Artificial Intelligence",
    heading: "CBSE AI 843 · Class XII Project Lab",
    intro: "Complete CBSE Class XII Artificial Intelligence project packages, each genuinely usable by a student for the 2026-27 session.",
    basePath: "/cbse/class/12/subject/843/project",
    backHref: "/cbse/class/12/subject/843",
    backLabel: "CBSE AI XII",
    projects: byClass(CBSE_843_PROJECTS, 12),
  },
  "cbse-11-083": {
    board: "CBSE",
    boardLabel: "CBSE Computer Science (083)",
    classNumber: 11,
    subjectName: "Computer Science",
    heading: "CBSE Computer Science 083 · Class XI Project Lab",
    intro: "Complete CBSE Class XI Computer Science project packages with runnable Python code, validation, sample input/output, test cases, edge cases, report structure, viva and syllabus mapping.",
    basePath: "/cbse/class/11/subject/083/project",
    backHref: "/cbse/class/11/subject/083",
    backLabel: "CBSE Computer Science XI",
    projects: byClass(CBSE_083_PROJECTS, 11),
  },
  "cbse-12-083": {
    board: "CBSE",
    boardLabel: "CBSE Computer Science (083)",
    classNumber: 12,
    subjectName: "Computer Science",
    heading: "CBSE Computer Science 083 · Class XII Project Lab",
    intro: "Complete CBSE Class XII Computer Science project packages with SQL schema, sample data, joins, aggregate queries, Python integration, analytics and full execution instructions.",
    basePath: "/cbse/class/12/subject/083/project",
    backHref: "/cbse/class/12/subject/083",
    backLabel: "CBSE Computer Science XII",
    projects: byClass(CBSE_083_PROJECTS, 12),
  },
};

export function getProjectGroup(key) {
  return PROJECT_GROUPS[key] || null;
}

export function getProjectList(key) {
  const group = PROJECT_GROUPS[key];
  return group ? group.projects : [];
}

export function getProject(key, slug) {
  const group = PROJECT_GROUPS[key];
  if (!group) return null;
  return group.projects.find((project) => project.slug === slug) || null;
}

/** Registry key for a CBSE subject project lab, or null when none is authored. */
export function getCBSEProjectGroupKey(classNumber, subjectCode) {
  const key = `cbse-${classNumber}-${subjectCode}`;
  return PROJECT_GROUPS[key] ? key : null;
}

/** Lightweight {id, title, outcome} list for a CBSE subject page card grid. */
export function getCBSEProjectCards(classNumber, subjectCode) {
  const key = getCBSEProjectGroupKey(classNumber, subjectCode);
  if (!key) return null;
  return PROJECT_GROUPS[key].projects.map((project) => ({
    id: project.slug,
    title: project.title,
    outcome: project.shortOutcome || project.summary,
    href: `${PROJECT_GROUPS[key].basePath}/${project.slug}`,
  }));
}

export default PROJECT_GROUPS;
