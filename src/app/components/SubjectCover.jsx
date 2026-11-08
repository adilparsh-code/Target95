// Decorative cover art for a subject. Original SVGs live in public/images/subjects/<slug>.svg;
// any subject without its own artwork falls back to default.svg. Alt text is empty because the
// subject title is always rendered next to the cover.
// Subject slugs that share artwork with another subject.
const COVER_ALIASES = {
  "history-civics": "history",
  "english-core": "english",
  "computer-applications": "computer",
  "computer-science": "computer",
};

const COVER_SLUGS = new Set([
  "biology", "physics", "chemistry", "mathematics", "english", "hindi", "geography", "history",
  "political-science", "economics", "business-studies", "accountancy", "sociology", "psychology",
  "commerce", "computer",
]);

export function getSubjectCoverSrc(subjectSlug) {
  const slug = COVER_ALIASES[subjectSlug] || subjectSlug;
  return `/images/subjects/${COVER_SLUGS.has(slug) ? slug : "default"}.svg`;
}

export default function SubjectCover({ subjectSlug, className = "w-full" }) {
  return (
    // SVG artwork: next/image optimisation adds nothing for vector files.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getSubjectCoverSrc(subjectSlug)}
      alt=""
      width={640}
      height={320}
      loading="lazy"
      decoding="async"
      className={`aspect-[2/1] object-cover ${className}`.trim()}
    />
  );
}
