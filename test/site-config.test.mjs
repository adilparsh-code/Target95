import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { PRODUCTION_ORIGIN, LOCAL_ORIGIN, canonicalLinkHeader, parseOrigin, resolveSiteConfig, robotsRules } from "../src/lib/siteConfig.mjs";

test("production default (no env) is unchanged: production origin, indexable, canonical", () => {
  const site = resolveSiteConfig({});
  assert.deepEqual(site, { appEnv: "production", indexable: true, isStaging: false, origin: PRODUCTION_ORIGIN });
  assert.equal(canonicalLinkHeader(site, "/Java/x"), `<${PRODUCTION_ORIGIN}/Java/x>; rel="canonical"`);
  const robots = robotsRules(site);
  assert.equal(robots.rules.allow, "/");
  assert.equal(robots.sitemap, `${PRODUCTION_ORIGIN}/sitemap.xml`);
});

test("explicit production on Vercel production stays indexable", () => {
  const site = resolveSiteConfig({ NEXT_PUBLIC_APP_ENV: "production", VERCEL_ENV: "production" });
  assert.equal(site.indexable, true);
  assert.equal(site.origin, PRODUCTION_ORIGIN);
});

test("staging: not indexable, no canonical, disallow all, no sitemap, never the production origin", () => {
  const site = resolveSiteConfig({ NEXT_PUBLIC_APP_ENV: "staging", NEXT_PUBLIC_SITE_URL: "https://stage.example.vercel.app" });
  assert.equal(site.indexable, false);
  assert.equal(site.isStaging, true);
  assert.equal(site.origin, "https://stage.example.vercel.app");
  assert.equal(canonicalLinkHeader(site, "/x"), null);
  const robots = robotsRules(site);
  assert.deepEqual(robots, { rules: { userAgent: "*", disallow: "/" } });
  assert.equal("sitemap" in robots, false);
});

test("staging without NEXT_PUBLIC_SITE_URL never falls back to the production origin", () => {
  const withVercel = resolveSiteConfig({ NEXT_PUBLIC_APP_ENV: "staging", VERCEL_URL: "t95-git-x.vercel.app" });
  assert.equal(withVercel.origin, "https://t95-git-x.vercel.app");
  assert.equal(resolveSiteConfig({ NEXT_PUBLIC_APP_ENV: "staging" }).origin, LOCAL_ORIGIN);
});

test("any Vercel non-production environment is non-indexable even without NEXT_PUBLIC_APP_ENV", () => {
  for (const vercelEnv of ["preview", "development"]) {
    const site = resolveSiteConfig({ VERCEL_ENV: vercelEnv });
    assert.equal(site.indexable, false, vercelEnv);
    assert.notEqual(site.origin, PRODUCTION_ORIGIN, vercelEnv);
  }
});

test("a mistyped environment name fails safe (non-indexable)", () => {
  for (const appEnv of ["stagng", "prod", "test", "Preview"]) {
    assert.equal(resolveSiteConfig({ NEXT_PUBLIC_APP_ENV: appEnv }).indexable, false, appEnv);
  }
  assert.equal(resolveSiteConfig({ NEXT_PUBLIC_APP_ENV: " STAGING " }).isStaging, true);
});

test("an invalid NEXT_PUBLIC_SITE_URL is ignored, never trusted", () => {
  for (const bad of ["not a url", "ftp://x.test", "http://evil.test", "https://u:p@x.test", "https://x.test/path", "https://x.test/?q=1", "javascript:alert(1)", "", "  "]) {
    assert.equal(parseOrigin(bad), null, bad);
  }
  assert.equal(resolveSiteConfig({ NEXT_PUBLIC_SITE_URL: "https://x.test/path" }).origin, PRODUCTION_ORIGIN);
  assert.equal(parseOrigin("http://localhost:3000"), "http://localhost:3000");
  assert.equal(parseOrigin("https://x.test"), "https://x.test");
});

test("no source file still hardcodes the production origin for canonical/robots/sitemap/metadata", () => {
  for (const file of ["src/proxy.js", "src/app/robots.js", "src/app/sitemap.js", "src/app/layout.js", "src/app/lib/blog.js"]) {
    const src = fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.equal(src.includes("target95.web.app"), false, file);
  }
});

test("proxy protects /student-bot and noindexes every page when non-production (static guard)", () => {
  const src = fs.readFileSync(new URL("../src/proxy.js", import.meta.url), "utf8");
  assert.match(src, /protectedPrefixes\s*=\s*\[[^\]]*"\/student-bot"/s);
  assert.match(src, /if \(!site\.indexable\) return noindex\(response\)/);
  assert.match(src, /canonicalLinkHeader\(site, pathname\)/);
});
