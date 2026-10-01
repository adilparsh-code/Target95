# Microsoft Office 2026 Learning Hub

## Scope and audit

Implemented inside `adilparsh-code/Target95`, based on main commit `a795eff6fa537271aac1b373ed126ed3282ed865`. No separate application or project was created.

The audit identified Next.js App Router, the existing Navbar/Footer, Tailwind styling and reusable Button, StudentGlobalSearch, AuthContext, and the localStorage-backed progressStorage. No dedicated Office routes, Office screenshot library, or copied standalone target95-office code were found. Existing CBSE Office content remains intact.

The implementation adds isolated routes, data and components. Shared changes are limited to Office discovery in the desktop/mobile navigation, student search and sitemap. No authentication, database, exam, syllabus or question-bank changes were made. No dependencies were added and package files were preserved.

## Routes and content

- `/office`
- `/office/word`, `/office/excel`, `/office/powerpoint`
- `/office/[appId]/[chapterId]`

| Curriculum | Chapters |
| --- | ---: |
| Word | 22 |
| Excel | 24 |
| PowerPoint | 20 |
| Total | 66 |

Each chapter includes objectives, explanation/concepts, a command visual, a numbered procedure, expected result, tips, common mistakes, guided and independent practice, two MCQs with feedback, two self-assessed short questions, a challenge and summary.

Totals: 66 guided practicals, 66 independent tasks, 66 challenges, 18 real-world mini projects, 132 MCQs and 132 short questions. The Excel project chapter covers marksheet, budget, attendance, salary, result analysis, sales, inventory, expenses and grading. PowerPoint includes six audience-specific project briefs; Word includes newsletter, report and mail merge briefs.

## Progress and assessment

Progress uses the existing progressStorage with namespaced `office-*` chapter IDs. Signed-in users are keyed by their existing Firebase UID; guests use a separate browser-local guest key. Account changes remount the assessment state to prevent one account's answers being shown to another. Quiz answers/scores and practical checklist states persist across navigation/reload. Storage events refresh cross-tab progress.

Completion requires every guided checklist item, independent practice, the challenge and a fully correct quiz. Practical work and short answers are self-assessed; the application cannot inspect installed Office documents. MCQ retry clears the attempt. The established persistence is browser-local, not cloud synced, and storage-clearing removes progress.

## Visual and version policy

All 66 assets are original local SVG command maps with meaningful names, alt text, captions and topic associations. They are explicitly labelled instructional diagrams, not Microsoft screenshots. Horizontally scrollable visuals and a full-size link preserve readable text on small screens. Failed images fall back to command descriptions and the procedure.

**The requirement for authentic UI screenshots remains open.** No screenshots were present in the repository and no Microsoft Office installation/capture source was available in this environment. The hub should receive owned, licensed, version-verified interface captures before claiming screenshot-based teaching. These command maps explain command locations but do not substitute for authentic UI captures.

“2026” is the learning edition label. Microsoft documentation currently describes Microsoft 365 and Office 2024, so the UI states that the curriculum uses those desktop workflows. Mac/web and edition differences are noted. Sources checked:

- https://www.microsoft.com/en-in/microsoft-365/get-started-with-office-2024
- https://support.microsoft.com/en-us/office/lifecycle/office-2024-and-office-ltsc-2024-faq

## Verification

- Full repository lint passed (`npm run lint`); focused Office lint also passed.
- Production build passed, including all 66 statically generated lesson routes.
- `node scripts/validate-office.mjs` passed: counts, schema, image existence, answer indexes, duplicate IDs, search terms and completion prerequisites.
- Production runtime HTTP checks passed for 70 pages + 66 assets (136 successful responses), plus invalid app/chapter 404s.
- No standalone TypeScript check script exists; Next build's checking phase passed.
- `git diff --check` passed.

`npm ci` hit an existing incomplete optional-platform lockfile. Declared dependencies were restored with `npm install --ignore-scripts --package-lock=false --no-audit --no-fund`; neither dependency manifest nor lockfile was changed.

## Remaining QA

Browser installation failed because the environment returned truncated Chromium downloads. Desktop/mobile rendering, actual keyboard interactions, image-error UI, storage persistence in a browser, console/hydration errors and authenticated account switching have not been browser-tested. These checks remain required before production rollout; HTTP/data checks are not equivalent to interactive browser QA.

The lesson content is a practical baseline and needs teacher/editor review and authentic screenshots before it can be described as the complete visual teaching product requested. Do not merge/deploy as fully finished until those gaps are resolved.

## Files

Created: Office route layout/pages, OfficeCatalog/OfficeLesson/OfficeParts, useOfficeProgress, three curriculum JSON files plus their registry, 66 local SVGs, two validation scripts and this report.

Modified: Navbar.jsx, StudentGlobalSearch.jsx and sitemap.js.
