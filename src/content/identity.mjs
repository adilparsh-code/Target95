// Canonical chapter identity (P1).
//
// Target95 grew three slug namespaces for the same Java chapters:
//   A. canonical   - javaCurriculum.js           (routes /Java/[chapter], roadmap)
//   B. study       - javaChapters.js, studyCenter, chapter-content (routes /study/[slug])
//   C. bank        - javaChapterQuestionBank / ICSE board bank (question chapter slugs,
//                    including slugified chapter titles such as "Number Systems")
//
// A chapter's unified id is its canonical slug when one exists, otherwise its
// study slug. Everything else that must keep resolving is listed here, once.
// Nothing in this file renames a route or moves content; it only records which
// existing slug means which chapter.

/**
 * canonicalId -> { aliases, contentSlug }
 *   aliases     other slugs that resolve to this chapter (each slug may appear once)
 *   contentSlug study slug whose authored material this chapter renders; several
 *               canonical chapters share one (reported by the validator, not merged)
 */
export const CANONICAL_IDENTITY = Object.freeze({
  'introduction-to-java': { aliases: ['introduction'], contentSlug: 'introduction' },
  'data-types-variables': { aliases: ['variables-data-types'], contentSlug: 'variables-data-types' },
  operators: { aliases: [], contentSlug: 'operators' },
  'input-in-java': { aliases: ['data-processing-in-java'], contentSlug: 'data-processing-in-java' },
  if: { aliases: [], contentSlug: 'if-else' },
  'if-else': { aliases: [], contentSlug: 'if-else' },
  'nested-if': { aliases: [], contentSlug: 'if-else' },
  switch: { aliases: [], contentSlug: 'if-else' },
  'for-loop': { aliases: ['loops'], contentSlug: 'loops' },
  'while-loop': { aliases: [], contentSlug: 'loops' },
  'do-while-loop': { aliases: [], contentSlug: 'loops' },
  methods: { aliases: [], contentSlug: 'methods' },
  'arrays-1d': { aliases: ['arrays'], contentSlug: 'arrays' },
  'arrays-2d': { aliases: [], contentSlug: 'arrays' },
  strings: { aliases: [], contentSlug: 'strings' },
  'classes-objects': {
    aliases: ['class-as-basis-of-computation', 'class-as-the-basis-of-computation'],
    contentSlug: 'class-as-basis-of-computation',
  },
  encapsulation: { aliases: [], contentSlug: 'class-as-basis-of-computation' },
  constructors: { aliases: ['constructor'], contentSlug: 'constructor' },
  inheritance: { aliases: [], contentSlug: 'class-as-basis-of-computation' },
});

/**
 * Slugs that have no chapter in the Java course. Questions under them are kept
 * (never dropped) but held out of chapter-scoped selectors until a human maps
 * them. slug -> reason.
 */
export const QUARANTINED_CHAPTER_SLUGS = Object.freeze({
  'number-systems':
    'ICSE X "Number Systems" (Armstrong / palindrome digit arithmetic) has no matching chapter in the Java curriculum; needs an editorial decision before mapping.',
});

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

/** Every alias slug -> canonical id. */
export const ALIAS_TO_CANONICAL = Object.freeze(
  Object.fromEntries(
    Object.entries(CANONICAL_IDENTITY).flatMap(([id, { aliases }]) => aliases.map((alias) => [alias, id])),
  ),
);

/** Canonical id for a slug, or null. Uses own-property checks (no prototype keys such as "constructor"). */
export function canonicalIdFor(slug) {
  if (typeof slug !== 'string') return null;
  if (hasOwn(CANONICAL_IDENTITY, slug)) return slug;
  return hasOwn(ALIAS_TO_CANONICAL, slug) ? ALIAS_TO_CANONICAL[slug] : null;
}

export const identityFor = (id) => (typeof id === 'string' && hasOwn(CANONICAL_IDENTITY, id) ? CANONICAL_IDENTITY[id] : null);

export const quarantineReasonFor = (slug) =>
  typeof slug === 'string' && hasOwn(QUARANTINED_CHAPTER_SLUGS, slug) ? QUARANTINED_CHAPTER_SLUGS[slug] : null;

/** "Number Systems" / "String Handling" style chapter labels -> slug form. */
export const slugifyChapterLabel = (label) =>
  String(label ?? '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Structural problems in the table itself (empty list = sound). */
export function checkIdentityTable() {
  const problems = [];
  const owner = new Map();
  for (const [id, { aliases }] of Object.entries(CANONICAL_IDENTITY)) {
    for (const alias of aliases) {
      if (alias === id) problems.push(`${id} lists itself as an alias`);
      if (hasOwn(CANONICAL_IDENTITY, alias)) problems.push(`alias "${alias}" is also a canonical id`);
      if (owner.has(alias)) problems.push(`alias "${alias}" claimed by "${owner.get(alias)}" and "${id}"`);
      owner.set(alias, id);
    }
  }
  for (const slug of Object.keys(QUARANTINED_CHAPTER_SLUGS)) {
    if (canonicalIdFor(slug)) problems.push(`quarantined slug "${slug}" also resolves to a chapter`);
  }
  return problems;
}
