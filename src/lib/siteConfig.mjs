// Single source of truth for the public site origin and search-engine policy.
//
// Production behaviour is the default: with no environment variables set, the
// origin is PRODUCTION_ORIGIN and the site is indexable, exactly as before.
// Any non-production deployment (NEXT_PUBLIC_APP_ENV other than "production",
// or a Vercel environment other than "production") is NOT indexable and never
// advertises a canonical URL.
export const PRODUCTION_ORIGIN = "https://target95.web.app";
export const LOCAL_ORIGIN = "http://localhost:3000";

const clean = (value) => String(value ?? "").trim().toLowerCase();

// Accepts a bare origin only: https (or http on localhost), no credentials,
// path, query or hash. Anything else is rejected rather than "fixed".
export function parseOrigin(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }
  const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.protocol !== "https:" && !(url.protocol === "http:" && isLocal)) return null;
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") return null;
  return url.origin;
}

export function resolveSiteConfig(env = process.env) {
  const appEnv = clean(env.NEXT_PUBLIC_APP_ENV);
  const vercelEnv = clean(env.VERCEL_ENV);
  // Fail safe: an unknown or mistyped environment name is treated as non-production.
  const indexable =
    (appEnv === "" || appEnv === "production") && (vercelEnv === "" || vercelEnv === "production");

  const configured = parseOrigin(env.NEXT_PUBLIC_SITE_URL);
  const vercelHost = typeof env.VERCEL_URL === "string" ? parseOrigin(`https://${env.VERCEL_URL.trim()}`) : null;
  const origin = configured || (indexable ? PRODUCTION_ORIGIN : vercelHost || LOCAL_ORIGIN);

  return { appEnv: appEnv || "production", indexable, isStaging: appEnv === "staging", origin };
}

// Headers a non-production deployment adds to every page response.
export const NOINDEX_VALUE = "noindex, nofollow";

export function canonicalLinkHeader(site, pathname) {
  return site.indexable ? `<${site.origin}${pathname}>; rel="canonical"` : null;
}

export function robotsRules(site) {
  if (!site.indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/dashboard", "/profile", "/settings", "/login", "/register", "/forgot-password"],
    },
    sitemap: `${site.origin}/sitemap.xml`,
  };
}
