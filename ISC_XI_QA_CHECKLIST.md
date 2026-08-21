# ISC Class XI Final QA Checklist

## Content
- [x] 13 syllabus topic records mapped
- [x] Fresh-question policy defined to avoid Class X copies
- [x] 16 Java practicals defined
- [x] 6 Python assignments defined
- [x] Project brief defined
- [ ] Full chapter-by-chapter question-depth audit
- [ ] Output/tracing/debugging coverage verified for every applicable Java topic
- [ ] Every MCQ verified for answer/explanation consistency

## Student-facing
- [x] Practicals & Project Lab route exists
- [x] Practical page now reads from a dedicated task dataset
- [x] Project route exists
- [ ] Verify all links/routes in a running app

## Technical
- [ ] `npm run validate:data`
- [ ] `npm run lint`
- [ ] `npm run build`

## Current CI blocker
Vercel checks are currently failing with the platform's build-rate-limit target, so a passing production build cannot yet be claimed from GitHub status alone.
