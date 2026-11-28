import { getSubjects, getPublishedChapters, getChapter, getSubject } from '../src/lib/boardprepCurriculum.mjs';
import fs from 'node:fs';
import path from 'node:path';

const BOARD = 'isc';
const CLASS_SLUG = 'class-11';
const SUBJECTS = ['biology', 'chemistry', 'physics', 'mathematics'];

const subjectDir = (subjectSlug) => path.join(process.cwd(), 'src/app/data/boardprep/content', BOARD, CLASS_SLUG, subjectSlug);

for (const subjectSlug of SUBJECTS) {
  const subject = getSubject(BOARD, CLASS_SLUG, subjectSlug);
  if (!subject) {
    console.log(`\n=== ${subjectSlug} ===`);
    console.log('Subject registry not found.');
    continue;
  }

  const allRegistered = [];
  for (const section of subject.sections || []) {
    for (const group of section.groups || []) {
      for (const chapter of group.chapters || []) {
        allRegistered.push({ ...chapter, sectionId: section.id, sectionSlug: section.slug, groupId: group.id, groupTitle: group.title });
      }
    }
  }

  const missingFiles = [];
  for (const chapter of allRegistered) {
    if (!chapter.file) continue;
    const file = path.join(subjectDir(subjectSlug), ...chapter.file.split('/'));
    if (!fs.existsSync(file)) {
      missingFiles.push({ id: chapter.id, slug: chapter.slug, file: chapter.file });
    }
  }

  const published = allRegistered.filter((ch) => ch.status === 'published');
  const planned = allRegistered.filter((ch) => ch.status === 'planned');
  const plannedOrOther = allRegistered.filter((ch) => ch.status !== 'published');

  const failedGetChapter = [];
  for (const chapter of published) {
    const loaded = getChapter(BOARD, CLASS_SLUG, subjectSlug, chapter.slug);
    if (!loaded) {
      failedGetChapter.push({ slug: chapter.slug, id: chapter.id, file: chapter.file });
    }
  }

  const questionableMeta = [];
  for (const chapter of allRegistered) {
    const issues = [];
    if (!chapter.id) issues.push('missing id');
    if (!chapter.slug) issues.push('missing slug');
    if (!chapter.title) issues.push('missing title');
    if (!chapter.blurb && chapter.status === 'published') issues.push('published chapter has no blurb');
    if (typeof chapter.syllabusStatus === 'string' && !['listed', 'official-verified', 'pending'].includes(chapter.syllabusStatus)) {
      issues.push(`questionable syllabusStatus: ${chapter.syllabusStatus}`);
    }
    if (issues.length) {
      questionableMeta.push({ slug: chapter.slug, id: chapter.id, status: chapter.status, issues });
    }
  }

  console.log(`\n=== ${subjectSlug} ===`);
  console.log(`title: ${subject.title}`);
  console.log(`total registered chapters: ${allRegistered.length}`);
  console.log(`published chapters: ${published.length}`);
  console.log(`planned chapters: ${planned.length}`);
  console.log(`planned/other chapters: ${plannedOrOther.length}`);
  console.log('chapter order (registered):');
  for (const ch of allRegistered) {
    console.log(`  - ${ch.id} | slug=${ch.slug} | title="${ch.title}" | status=${ch.status} | blurb=${JSON.stringify(ch.blurb)}`);
  }
  console.log(`missing chapter files: ${missingFiles.length}`);
  for (const m of missingFiles) {
    console.log(`  - missing ${m.file} for ${m.id} (slug ${m.slug})`);
  }
  console.log(`published chapters that fail getChapter: ${failedGetChapter.length}`);
  for (const f of failedGetChapter) {
    console.log(`  - ${f.id} (slug ${f.slug}) file=${f.file}`);
  }
  console.log(`chapters with questionable metadata: ${questionableMeta.length}`);
  for (const q of questionableMeta) {
    console.log(`  - ${q.id} (slug ${q.slug}, status ${q.status}): ${q.issues.join(', ')}`);
  }
}
