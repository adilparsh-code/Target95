// Decorative cover art for a subject. Original SVGs live in public/images/subjects/<slug>.svg;
// any subject without its own artwork falls back to default.svg. Alt text is empty because the
// subject title is always rendered next to the cover.
// Subject slugs that share artwork with another subject.
const COVER_ALIASES = {
  "history-civics": "history",
  "english-core": "english",
  "computer-applications": "computer",
  "computer-science": "computer",
  // Home picker ids and CBSE subject codes (402/802 IT, 083 CS, 065 Informatics Practices, 843 AI).
  java: "computer",
  402: "computer",
  "065": "computer",
  "083": "computer",
  802: "computer",
  843: "ai",
};

const COVER_SLUGS = new Set([
  "biology", "physics", "chemistry", "mathematics", "english", "hindi", "geography", "history",
  "political-science", "economics", "business-studies", "accountancy", "sociology", "psychology",
  "commerce", "computer", "ai",
]);

// Subjects with artwork per class, keyed "<subject>-<classSlug>".
const CLASS_COVER_SLUGS = new Set([
  "physics-class-9", "physics-class-10", "physics-class-11", "physics-class-12",
  "chemistry-class-9", "chemistry-class-10", "chemistry-class-11", "chemistry-class-12",
]);

export function getSubjectCoverSrc(subjectSlug, classSlug) {
  const classCover = `${subjectSlug}-${classSlug}`;
  if (CLASS_COVER_SLUGS.has(classCover)) return `/images/subjects/${classCover}.svg`;
  const slug = COVER_ALIASES[subjectSlug] || subjectSlug;
  return `/images/subjects/${COVER_SLUGS.has(slug) ? slug : "default"}.svg`;
}

// Robotics / AI tracks get the AI artwork; every other track here is computing.
export function getTrackCoverSlug(title) {
  return /\b(AI|Robotics|Artificial)\b/i.test(title) ? "ai" : "computer";
}

export default function SubjectCover({ subjectSlug, classSlug, className = "w-full" }) {
  return (
    // SVG artwork: next/image optimisation adds nothing for vector files.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getSubjectCoverSrc(subjectSlug, classSlug)}
      alt=""
      width={640}
      height={320}
      loading="lazy"
      decoding="async"
      className={`aspect-[2/1] object-cover ${className}`.trim()}
    />
  );
}
