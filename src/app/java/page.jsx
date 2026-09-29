import { permanentRedirect } from "next/navigation";

/**
 * Backward-compatible lowercase Java index route.
 * Older links used /java while the canonical route is /Java.
 */
export default function LowercaseJavaIndexRedirect() {
  permanentRedirect("/Java");
}
