import { resolveSiteConfig, robotsRules } from "@/lib/siteConfig.mjs";

export default function robots() {
  return robotsRules(resolveSiteConfig());
}
