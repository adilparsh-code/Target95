// Decorative cover art for a subject. Original SVGs live in public/images/subjects/<slug>.svg;
// any subject without its own artwork falls back to default.svg. Alt text is empty because the
// subject title is always rendered next to the cover.
const COVER_SLUGS = new Set(["biology"]);

export function getSubjectCoverSrc(subjectSlug) {
  return `/images/subjects/${COVER_SLUGS.has(subjectSlug) ? subjectSlug : "default"}.svg`;
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
