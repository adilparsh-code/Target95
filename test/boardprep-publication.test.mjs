import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { getBoards, getSubject, getSubjects, getPublishedChapters, getChapter } from "../src/lib/boardprepCurriculum.mjs";

const chaptersOf = (manifest) =>
  (manifest.sections || []).flatMap((section) => section.groups || []).flatMap((group) => group.chapters || []);

// Regression for the ICSE Class X Mathematics publication discrepancy: the
// subject was merged with all 18 chapter files present but every manifest
// entry marked "planned", so the class page showed "Coming soon" with zero
// published chapters. Publication is driven by the manifest status, and a
// published chapter must always be a complete, loadable chapter.
test("ICSE class X Mathematics publishes all 18 chapters with full question sets", () => {
  const chapters = getPublishedChapters("icse", "class-10", "mathematics");
  assert.equal(chapters.length, 18);
  for (const meta of chapters) {
    const chapter = getChapter("icse", "class-10", "mathematics", meta.slug);
    assert.ok(chapter, `${meta.slug} must load`);
    assert.ok(chapter.questions.length >= 8, `${meta.slug} must carry at least 8 questions`);
  }
});

// A published chapter is never empty: the class page labels a subject
// Available through these chapters alone, so an unloadable or empty chapter
// must never pass as published.
test("every published chapter across all boards loads with at least 8 questions", () => {
  for (const board of getBoards())
    for (const classInfo of board.classes || [])
      for (const subject of getSubjects(board.slug, classInfo.slug))
        for (const meta of getPublishedChapters(board.slug, classInfo.slug, subject.slug)) {
          const chapter = getChapter(board.slug, classInfo.slug, subject.slug, meta.slug);
          assert.ok(chapter, `${meta.id} must load`);
          assert.ok(chapter.questions.length >= 8, `${meta.id} must carry at least 8 questions`);
        }
});

// Every chapter file a manifest references must exist and parse, whatever its
// status. Malformed draft files once shipped because the tooling only opened
// published chapters; a broken draft has to fail here, before publication.
// Manifest entries with no file are syllabus listings still awaiting content —
// legitimate, but they must never be published.
test("every manifest-referenced chapter file exists and parses as JSON", () => {
  const root = path.join(process.cwd(), "src/app/data/boardprep/content");
  for (const board of getBoards())
    for (const classInfo of board.classes || [])
      for (const subject of getSubjects(board.slug, classInfo.slug)) {
        const manifest = getSubject(board.slug, classInfo.slug, subject.slug);
        assert.ok(manifest, `${board.slug}/${classInfo.slug}/${subject.slug} manifest must exist`);
        for (const meta of chaptersOf(manifest)) {
          if (!meta.file) {
            assert.notEqual(meta.status, "published", `${meta.id} is a syllabus listing without content and must not be published`);
            continue;
          }
          const file = path.join(root, board.slug, classInfo.slug, subject.slug, ...meta.file.split("/"));
          assert.ok(fs.existsSync(file), `${meta.id}: ${meta.file} must exist`);
          assert.doesNotThrow(() => JSON.parse(fs.readFileSync(file, "utf8")), `${meta.file} must parse`);
        }
      }
});

// Status logic: the publication filter admits only "published" entries, so
// drafts and planned chapters are never exposed as available content.
test("publication filter exposes only chapters marked published", () => {
  for (const board of getBoards())
    for (const classInfo of board.classes || [])
      for (const subject of getSubjects(board.slug, classInfo.slug)) {
        const manifest = getSubject(board.slug, classInfo.slug, subject.slug);
        const published = new Set(
          getPublishedChapters(board.slug, classInfo.slug, subject.slug).map((chapter) => chapter.id),
        );
        for (const meta of chaptersOf(manifest)) {
          if (meta.status === "published") assert.ok(published.has(meta.id), `${meta.id} must be exposed`);
          else assert.ok(!published.has(meta.id), `${meta.id} (status ${meta.status}) must not be exposed`);
        }
      }
});
