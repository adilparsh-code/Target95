import { permanentRedirect } from "next/navigation";

/**
 * Backward-compatible lowercase Java route.
 * Older links used /java/... while the canonical route is /Java/....
 */
export default async function LowercaseJavaChapterRedirect({ params }) {
  const { chapter } = await params;
  permanentRedirect(`/Java/${chapter}`);
}
