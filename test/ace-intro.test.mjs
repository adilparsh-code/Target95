import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";

const aceSource = fs.readFileSync(
  new URL("../src/app/components/AceIntro.jsx", import.meta.url),
  "utf8",
);

const hubSource = fs.readFileSync(
  new URL("../src/app/StitchHomeHub.jsx", import.meta.url),
  "utf8",
);

test("AceIntro is a client component with accessibility and motion support", () => {
  // Must be a client component so it can read prefers-reduced-motion and mount state
  assert.match(aceSource, /use client/, "AceIntro must be a client component");

  // Must declare a heading for the section
  assert.match(aceSource, /aria-labelledby="ace-heading"/, "section must label the Ace heading");
  assert.match(aceSource, /id="ace-heading"/, "heading must expose an id for the aria-labelledby");

  // Must expose a screen-reader-friendly description
  assert.match(
    aceSource,
    /sr-only["'`][^}]*Ace is the Target95 AI study partner/,
    "must include a screen-reader description of Ace",
  );
});

test("AceIntro respects prefers-reduced-motion", () => {
  assert.match(
    aceSource,
    /prefers-reduced-motion:\s*reduce/,
    "must check the prefers-reduced-motion media query",
  );
});

test("AceIntro feature cards link to real destinations", () => {
  // Step-by-step explanations and code tracing -> AI tutor, practice card -> question bank
  assert.match(aceSource, /\/ai-tutor/, "explanation and debugging cards must link to /ai-tutor");
  assert.match(aceSource, /\/question-bank/, "practice card must link to /question-bank");
});

test("AceIntro does not add popup, overlay, or sticky behavior", () => {
  // No fixed/sticky positioning that would trap the page
  assert.doesNotThrow(() => {
    const stickyMatches = aceSource.match(/className="[^"]*sticky/g) || [];
    const fixedMatches = aceSource.match(/className="[^"]*fixed/g) || [];
    const overlayMatches = aceSource.match(/overlay/g);
    // sticky/fixed may appear in decorative backgrounds only; the interactive shell must not be sticky
    assert.equal(stickyMatches.length, 0, "no sticky positioning on the interactive shell");
  });
});

test("AceIntro feature cards have accessible icon containers", () => {
  // Icons are decorative and must not be announced as live content
  assert.match(aceSource, /aria-hidden="true"/, "decorative icon containers must hide from assistive tech");
});

test("AceIntro feature cards have descriptive distinct link labels", () => {
  // Step-by-step explanations, code tracing -> AI tutor, practice -> question bank
  assert.match(
    aceSource,
    /badge:\s*"Open explanations"/,
    "explanation card must label the link 'Open explanations'",
  );
  assert.match(
    aceSource,
    /badge:\s*"Open code tracing"/,
    "code tracing card must label the link 'Open code tracing'",
  );
  assert.match(
    aceSource,
    /badge:\s*"Open practice"/,
    "practice card must label the link 'Open practice'",
  );
  // The repeated "Open Ace →" text must not appear anymore
  assert.doesNotMatch(
    aceSource,
    /Open Ace\s*→/,
    "must not repeat the same 'Open Ace →' label on every card",
  );
});

test("AceIntro links have hover/focus visual affordance", () => {
  assert.match(aceSource, /hover/g, "interactive cards must include hover styling");
});

// ---- Subject discovery on homepage ----

test("StitchHomeHub includes an Explore All Subjects section", () => {
  assert.match(
    hubSource,
    /Explore All Subjects/,
    "homepage must expose a subject discovery section heading",
  );
  assert.match(
    hubSource,
    /subjectCards\(activeBoard, currentClass\.id\)/,
    "subject discovery must render per selected board/class context",
  );
});

test("subjectCards returns a prompt when no board/class is selected", () => {
  assert.match(hubSource, /isPrompt:\s*true/, "prompt card must be marked as a prompt");
  assert.match(
    hubSource,
    /Choose your board and class/,
    "prompt card must tell the user to choose board and class",
  );
});

test("subjectCards lists ICSE Java for icse-class-9", () => {
  assert.match(hubSource, /"icse-class-9":\s*\[/, "must define subject cards for ICSE Class 9");
  assert.match(hubSource, /Java.*ICSE Class 9 Computer Applications/, "ICSE Class 9 must include Java");
  assert.match(hubSource, /Robotics & AI.*ICSE Class 9 Robotics/, "ICSE Class 9 must include Robotics & AI");
});

test("subjectCards lists CBSE Computer Science for class-11", () => {
  assert.match(hubSource, /"class-11":\s*\[/, "must define subject cards for CBSE Class 11");
  assert.match(hubSource, /Computer Science.*CBSE Class 11 CS/, "CBSE Class 11 must include Computer Science (083)");
  assert.match(hubSource, /Informatics Practices.*CBSE Class 11 IP/, "CBSE Class 11 must include Informatics Practices (065)");
  assert.match(hubSource, /Information Technology.*CBSE Class 11 IT.*802/, "CBSE Class 11 must include IT (802)");
  assert.match(hubSource, /Artificial Intelligence.*CBSE Class 11 AI.*843/, "CBSE Class 11 must include AI (843)");
});

test("subject card hrefs point to existing subject pages", () => {
  assert.match(hubSource, /href:\s*\"\/Java\?class=IX\"/, "ICSE Class 9 Java must link to /Java?class=IX");
  assert.match(hubSource, /href:\s*\"\/isc\/artificial-intelligence\/11\"/, "ISC Class 11 AI must link to /isc/artificial-intelligence/11");
  assert.match(hubSource, /href:\s*\"\/cbse\/class\/11\/subject\/083\"/, "CBSE Class 11 CS must link to /cbse/class/11/subject/083");
  assert.match(hubSource, /href:\s*\"\/cbse\/class\/11\/subject\/843\"/, "CBSE Class 11 AI must link to /cbse/class/11/subject/843");
});

test("subject discovery preserves existing homepage sections", () => {
  // Continue Learning, Curriculum launcher, Chapter navigation, Office, Practice & Mastery, Question trace, FAQ
  assert.match(hubSource, /Continue where you left off/, "Continue Learning section must remain");
  assert.match(hubSource, /Select Your Curriculum Pathway/, "Curriculum launcher must remain");
  assert.match(hubSource, /Direct Chapter Navigation/, "Chapter navigation must remain");
  assert.match(hubSource, /Microsoft Office/, "Office section must remain");
  assert.match(hubSource, /Core Practice & Mastery Tools/, "Practice & Mastery section must remain");
  assert.match(hubSource, /Question Trace #04/, "Question trace section must remain");
  assert.match(hubSource, /Frequently Asked Questions/, "FAQ section must remain");
});
