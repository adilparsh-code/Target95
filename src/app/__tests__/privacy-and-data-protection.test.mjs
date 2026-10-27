import { test, describe } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pagePath = join(__dirname, "../privacy-and-data-protection/page.jsx");
const footerPath = join(__dirname, "../components/Footer.jsx");
const sitemapPath = join(__dirname, "../sitemap.js");

const pageSource = readFileSync(pagePath, "utf8");
const footerSource = readFileSync(footerPath, "utf8");
const sitemapSource = readFileSync(sitemapPath, "utf8");

function readBuildHtml(route) {
  // Static pages are prerendered as .html files under .next/server/app during a
  // production build. If the build artifacts are unavailable in this environment,
  // the route can still be exercised at runtime through Next's dev server.
  const file = join(__dirname, "../../.next/server/app", route, "page.html");
  try {
    return readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

describe("Privacy & Data Protection page", () => {
  test("page source defines the required title and subtitle", () => {
    assert.ok(
      pageSource.includes("Your Learning Matters. Your Privacy Matters Too."),
      "expected the page to define the requested title",
    );
    assert.ok(
      pageSource.includes("Target95 is committed to building a learning environment"),
      "expected the page to define the requested subtitle",
    );
  });

  test("page source links the official DPDP sources verbatim", () => {
    assert.ok(
      pageSource.includes("indiacode.nic.in"),
      "expected the page to include the official India Code host verbatim",
    );
    assert.ok(
      pageSource.includes("123456789/22037"),
      "expected the page to include the official Act handle",
    );
    assert.ok(
      pageSource.includes("meity.gov.in"),
      "expected the page to include the official MeitY host verbatim",
    );
    assert.ok(
      pageSource.includes("digital-personal-data-protection-rules-2025"),
      "expected the page to include the official Rules document marker",
    );
    assert.ok(
      pageSource.includes("pib.gov.in"),
      "expected the page to include the official PIB host verbatim",
    );
    assert.ok(
      pageSource.includes("PRID=2190655"),
      "expected the page to include the official PIB announcement reference",
    );
  });

  test("build artifact contains the page title and subtitle when the build artifact is present", () => {
    const html = readBuildHtml("/privacy-and-data-protection");
    if (html) {
      assert.ok(
        html.includes("Your Learning Matters. Your Privacy Matters Too."),
        "expected the page to mention the requested title",
      );
      assert.ok(
        html.includes("Target95 is committed to building a learning environment"),
        "expected the page to mention the requested subtitle",
      );
    }
  });

  test("build artifact includes the official DPDP source links when the build artifact is present", () => {
    const html = readBuildHtml("/privacy-and-data-protection");
    if (html) {
      assert.ok(
        html.includes("indiacode.nic.in/indiacode/handle/123456789/22037"),
        "expected the page to link the official India Code listing",
      );
      assert.ok(
        html.includes("meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025"),
        "expected the page to link the official DPDP Rules page",
      );
      assert.ok(
        html.includes("pib.gov.in/PressReleasePage.aspx?PRID=2190655"),
        "expected the page to link the official PIB announcement",
      );
    }
  });

  test("footer source links the new privacy page", () => {
    assert.ok(
      footerSource.includes('href: "/privacy-and-data-protection"'),
      "expected the footer to link the new privacy and data protection page",
    );
  });

  test("sitemap advertises the new privacy page", () => {
    assert.ok(
      sitemapSource.includes("/privacy-and-data-protection"),
      "expected the sitemap to include the new privacy and data protection route",
    );
  });

  test("the page does not manufacture India Code links from string parts", () => {
    assert.ok(
      pageSource.includes("indiacode.nic.in"),
      "expected the page to include the official India Code host verbatim",
    );
    assert.ok(
      pageSource.includes("meity.gov.in"),
      "expected the page to include the official MeitY host verbatim",
    );
    assert.ok(
      pageSource.includes("pib.gov.in"),
      "expected the page to include the official PIB host verbatim",
    );
  });

  test("the page does not hardcode fake email addresses or contact promises", () => {
    assert.ok(
      pageSource.includes("support@target95.com"),
      "expected the page to use the existing verified support address",
    );
    assert.ok(
      pageSource.includes("implementation gap"),
      "expected the page to describe missing processes as gaps rather than inventing them",
    );
  });

  test("the page source states the last-reviewed date and a change note", () => {
    assert.ok(
      pageSource.includes("Last reviewed:"),
      "expected the page to state a last-reviewed date",
    );
    assert.ok(
      pageSource.includes("Legal requirements and platform practices may change"),
      "expected the page to note that legal requirements and platform practices may change",
    );
  });

  test("the page source uses accessible accordions and focusable controls", () => {
    assert.ok(
      pageSource.includes("<details"),
      "expected the page to use native accordion elements for optional detail",
    );
    assert.ok(
      pageSource.includes("focus-visible"),
      "expected the page to include visible focus styling hooks",
    );
  });

  test("page source avoids fake compliance badges", () => {
    const lower = pageSource.toLowerCase();
    assert.ok(
      lower.includes("compliant") || lower.includes("certified") || lower.includes("approved"),
      "expected the page to mention the compliance badge concept it explicitly avoids",
    );
    assert.ok(
      pageSource.includes("Government Certified"),
      "expected the page to mention the badge it explicitly avoids",
    );
    assert.ok(
      pageSource.includes("Legally Approved"),
      "expected the page to mention the badge it explicitly avoids",
    );
  });

  test("page source describes the DPDP Act and the DPDP Rules", () => {
    assert.ok(
      pageSource.includes("Digital Personal Data Protection Act, 2023"),
      "expected the page to name the Act",
    );
    assert.ok(
      pageSource.includes("Digital Personal Data Protection Rules, 2025"),
      "expected the page to name the Rules",
    );
  });

  test("page source includes the core DPDP principles in plain language", () => {
    assert.ok(
      pageSource.includes("Transparency") && pageSource.includes("Consent") && pageSource.includes("Purpose limitation"),
      "expected the page to list at least transparency, consent and purpose limitation",
    );
    assert.ok(
      pageSource.includes("Data minimisation"),
      "expected the page to mention data minimisation",
    );
    assert.ok(
      pageSource.includes("Security") && pageSource.includes("Retention"),
      "expected the page to mention security and retention",
    );
  });

  test("page source states that the page is educational and not legal advice", () => {
    assert.ok(
      pageSource.includes("educational") && pageSource.includes("legal advice"),
      "expected the page to state it is educational and not legal advice",
    );
  });

  test("page source identifies the AI Tutor as a server-side, key-protected feature", () => {
    assert.ok(
      pageSource.includes("/api/ai-tutor"),
      "expected the page to reference the AI Tutor route",
    );
    assert.ok(
      pageSource.includes("server-side") || pageSource.includes("server side"),
      "expected the page to describe the AI key as server-side",
    );
  });

  test("page source identifies the verified client-side event minimisation behavior", () => {
    assert.ok(
      pageSource.includes("password") && pageSource.includes("token") && pageSource.includes("email"),
      "expected the page to mention that the client helper drops sensitive fields",
    );
  });

  test("page source keeps the data inventory honest with Needs verification markers", () => {
    assert.ok(
      pageSource.includes("Needs verification"),
      "expected the page to mark unverified data facts honestly",
    );
  });

  test("page source does not claim a universal educational-institution exemption", () => {
    assert.ok(
      pageSource.includes("not every educational-institution exemption automatically applies"),
      "expected the page to avoid implying a blanket exemption for the platform",
    );
  });

  test("page source does not claim the platform is legally certified", () => {
    assert.ok(
      pageSource.includes("not a certification") || pageSource.includes("not a compliance certification"),
      "expected the page to state it is not a certification",
    );
  });

  test("page source does not promise an easy fix for every liability", () => {
    assert.ok(
      pageSource.includes("does not become liable") || pageSource.includes("does not automatically face"),
      "expected the page to avoid an absolute penalty promise",
    );
  });

  test("page source keeps the contact address consistent across the page", () => {
    const contactHits = (pageSource.match(/support@target95\.com/g) || []).length;
    assert.ok(
      contactHits >= 3,
      "expected the verified support address to appear consistently across the page",
    );
  });

  test("page source uses the requested route-friendly structure", () => {
    assert.ok(
      pageSource.includes("<main"),
      "expected the page to render a main landmark",
    );
    assert.ok(
      pageSource.includes("/privacy-and-data-protection"),
      "expected the page source to reference its own route in metadata or navigation context",
    );
  });

  test("page source is readable in plain English for parents and students", () => {
    const lower = pageSource.toLowerCase();
    assert.ok(
      lower.includes("personal information") && lower.includes("students") && lower.includes("parents"),
      "expected the page to speak directly to students and parents",
    );
  });

  test("page source marks child-safety and parental-consent as planned", () => {
    assert.ok(
      pageSource.includes("Child safety and parental consent"),
      "expected the page to include the child safety commitment",
    );
    assert.ok(
      pageSource.includes("An enforced parental-consent flow and a confirmed under-13 gate are"),
      "expected the page to describe the parental-consent implementation gap honestly",
    );
  });

  test("page source uses the verified contact address and describes implementation gaps", () => {
    assert.ok(
      pageSource.includes("support@target95.com"),
      "expected the page to use the existing verified support address",
    );
    assert.ok(
      pageSource.includes("gap"),
      "expected the page to describe missing processes as gaps rather than inventing them",
    );
  });

  test("page metadata is set for the new route", () => {
    assert.ok(
      pageSource.includes('title: "Privacy & Data Protection | Target95"'),
      "expected the page to export a clear title",
    );
    assert.ok(
      pageSource.includes("description:"),
      "expected the page to export a meta description",
    );
  });

  test("page source includes the penalty summary in plain terms", () => {
    assert.ok(
      pageSource.includes("₹250 crore"),
      "expected the page to include the security-safeguard penalty summary",
    );
    assert.ok(
      pageSource.includes("₹200 crore"),
      "expected the page to include the breach-notification and children penalty summary",
    );
  });

  test("page source includes the penalty-figure unicode, not a placeholder", () => {
    const rupeeIndex = pageSource.indexOf("250 crore");
    assert.ok(rupeeIndex >= 0, "expected the page to mention the penalty figure");
    const snippet = pageSource.slice(Math.max(0, rupeeIndex - 40), rupeeIndex + 40);
    assert.ok(
      snippet.includes("₹") || snippet.includes("INR") || snippet.includes("rupee"),
      "expected the page to use the rupee symbol or a rupee label rather than a blank placeholder",
    );
  });

  test("page source lists commitments with explicit status labels", () => {
    assert.ok(
      pageSource.includes("Implemented and verified"),
      "expected the page to include the verified commitment label",
    );
    assert.ok(
      pageSource.includes("Partially implemented"),
      "expected the page to include the partial commitment label",
    );
    assert.ok(
      pageSource.includes("Planned / under review"),
      "expected the page to include the planned commitment label",
    );
  });
});
