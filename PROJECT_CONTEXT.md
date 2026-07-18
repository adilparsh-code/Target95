# Target95 Project Context

## Project overview

Target95+ is an AI-powered learning platform for ICSE and ISC Computer Science students. Its current implementation is a Next.js App Router application focused on Java chapter practice. It presents a marketing-style home page, lets learners select a Java chapter, and supports question-by-question practice with theory and MCQ formats.

The app currently uses static JavaScript data files; there is no backend, authentication, database, AI service, or persistence layer. Firebase is identified as a future technology in `AGENTS.md`.

## Technology and architecture

- Next.js 16.2.9 with the App Router and React 19.2.4. (The project rules reference Next.js 15; package metadata is the source of truth for the installed version.)
- Tailwind CSS 4 for styling, loaded through `src/app/globals.css`.
- ESLint 9 with the Next Core Web Vitals configuration.
- React Compiler enabled in `next.config.mjs`.
- `@/*` resolves to `src/*` through `jsconfig.json`; current imports are predominantly relative.

### Rendering model

Route pages are server components by default. The dynamic chapter and question pages await their route parameters, resolve matching static data, and call `notFound()` if the requested data does not exist.

Interactive leaf components use the `"use client"` boundary:

- `AnswerBox` reveals theory answers.
- `MCQQuestion` tracks selected and submitted answers.
- `ChapterQuestions` manages the search and filter-control state.
- `SearchBar` and `QuestionFilters` receive controlled state and setters.
- `ChapterStats` is client-marked, though it currently performs only synchronous derived display calculations.

### Data flow

```text
Static data modules
  ├─ javaChapters.js ──> /java ──> /java/[chapter]
  └─ questions.js ─────> /java/[chapter] ──> /java/[chapter]/question/[id]
                                                └─ QuestionPlayer
                                                     ├─ QuestionCard + AnswerBox (theory)
                                                     └─ MCQQuestion (multiple choice)
```

## Folder structure

```text
src/app/
├─ layout.js                         Root HTML layout, Geist fonts, metadata
├─ page.js                           Marketing home page
├─ globals.css                       Tailwind import and global theme styles
├─ java/
│  ├─ page.jsx                       Java chapter catalogue
│  └─ [chapter]/
│     ├─ page.jsx                    Chapter summary and stats
│     └─ question/[id]/page.jsx      Individual question route
├─ components/                       Reusable visual and interactive UI
│  ├─ landing-page components         Navbar, Hero, Stats, Features, HowItsWorks, Subjects, Footer
│  ├─ shared UI                       Button, DifficultyBadge, ProgressBar, SectionTitle
│  └─ question UI                     ChapterQuestions, SearchBar, QuestionFilters,
│                                    ChapterStats, QuestionPlayer, QuestionCard,
│                                    AnswerBox, MCQQuestion
└─ data/                             Local static content and subject/chapter metadata
   ├─ questions.js                   Active question source used by routes
   ├─ javaChapters.js                Java chapter catalogue
   ├─ features.js, subjects.js       Landing-page content
   └─ java/                          Beginning of an alternate chapter question bank

public/                              Default Next.js static SVG assets
```

Several data files are currently empty (`arrays.js`, `chapters.js`, `constructor.js`, `java.js`, `loops.js`, `methods.js`, `numberSystem.js`, `operators.js`, `string.js`, `strings.js`, and `variables.js`). `src/app/data/java/index.js` exposes an alternate question-bank structure, but the routes currently consume `src/app/data/questions.js` instead.

## Existing features

### Landing page

- Static navigation, hero, product statistics, feature cards, learning-flow cards, subject cards, and footer.
- Product messaging for previous-year questions, AI teaching, Java practice, mock tests, analytics, and leaderboards.
- Subject cards are present, but are labelled "Coming Soon" and their buttons do not yet navigate.

### Java learning flow

- `/java` lists nine Java chapters from `javaChapters.js`.
- `/java/[chapter]` validates the chapter slug, shows chapter metadata, a displayed question count, and live statistics calculated from the active question list.
- `/java/[chapter]/question/[id]` validates the requested chapter/question pair and provides next/previous navigation plus a jump palette.
- Theory questions show their answer on learner action.
- MCQs allow a selection, submission, and correct/incorrect feedback.
- A progress bar reflects the learner's position within the current chapter question list.

### Search and filter UI

- `ChapterQuestions` supports case-insensitive text search against question text, ID, type, and difficulty.
- Difficulty and type selectors are rendered and maintain local state.
- The chapter page currently does not render `ChapterQuestions`; it instead displays a placeholder test panel. Consequently, neither search nor the selector UI is reachable in the current route flow.
- The selector state is not yet applied to the displayed question results. This is an existing incomplete integration, not current functionality.

## Current roadmap

The explicit current focus in `AGENTS.md` is:

1. Improve question filters.
2. Enhance search.
3. Maintain clean architecture.
4. Preserve existing functionality.

Near-term implementation work implied by the current codebase:

- Replace the chapter page's test placeholder with the existing `ChapterQuestions` component when that integration is intentionally approved.
- Apply the existing difficulty and type state to `ChapterQuestions` result filtering.
- Expand `questions.js` so each catalogue chapter has real practice content and the displayed chapter counts align with available data.
- Complete or consolidate the two static question-data structures before adding more chapter content.

## Future roadmap

These items are product-direction signals from the README, landing-page copy, and project rules; they are not implemented features:

- AI explanations/tutoring for learner questions.
- Previous-year-question coverage for ICSE and ISC Computer Science.
- Java programming exercises and step-by-step solutions.
- Mock tests.
- Chapter-wise performance analytics and learner progress tracking.
- Leaderboards.
- Authentication and persistent learner data, with Firebase listed as the planned backend technology.
- Additional Computer Science subjects beyond the initial Java practice flow.

## Development guidelines

- Read `AGENTS.md` before work. For Next.js changes, consult the relevant guide under `node_modules/next/dist/docs/` first because project rules warn of version-specific breaking changes.
- Use functional, reusable components with one clear responsibility each.
- Use Tailwind CSS only; do not introduce a second styling system.
- Build mobile-first and preserve responsive behavior.
- Favor the existing App Router pattern: keep data-fetching and route validation in server pages, and isolate state/event handlers in small client components.
- Keep data interfaces consistent. Active questions require `id`, `chapter`, `type`, `question`, `answer`, and `difficulty`; MCQs additionally require `options`.
- Do not rewrite working code or modify unrelated files. Explain material architectural changes before implementing them.
- Avoid unnecessary dependencies and preserve the existing static-data approach until a backend migration is deliberately scoped.
- For each completed feature, run relevant tests/lint and a production build, then commit with a meaningful message and push to GitHub, as required by `AGENTS.md`.
- Keep product metadata, reachable UI, static data counts, and roadmap claims aligned as the project evolves.

## Known implementation notes

- The root metadata still contains the default `create-next-app` title and description.
- The page route currently includes a JSX comment written as text, which the project-wide linter flags.
- `QuestionPlayer` uses `useState` without importing it, so the question-player route requires that fix before it can render reliably.
- `MCQQuestion` calls the optional `onSubmit` prop without a fallback, while `QuestionPlayer` does not currently pass one.
- `DifficultyBadge` uses a single-quoted string instead of a template literal for its dynamic class list, so its difficulty color mapping is not interpolated.
- The root layout relies on remote Google Geist fonts during production builds; builds require network access to fetch those fonts unless the font strategy changes.

These observations are documented for planning only; no application code was changed while preparing this file.
