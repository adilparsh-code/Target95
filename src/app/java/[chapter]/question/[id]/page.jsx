import { permanentRedirect } from "next/navigation";

/**
 * Backward-compatible lowercase Java question route.
 * The canonical question route lives under /Java/....
 */
export default async function LowercaseJavaQuestionRedirect({ params }) {
  const { chapter, id } = await params;
  permanentRedirect(`/Java/${chapter}/question/${id}`);
}
