import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";

function StatusBadge({ status }) {
  const map = {
    implemented: {
      label: "Implemented and verified",
      className:
        "inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 shadow-sm",
    },
    partial: {
      label: "Partially implemented",
      className:
        "inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800 shadow-sm",
    },
    planned: {
      label: "Planned / under review",
      className:
        "inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm",
    },
  };
  const style = map[status] || map.planned;
  return (
    <span className={style.className}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full">
        {status === "implemented" ? (
          <span className="bg-current" />
        ) : null}
      </span>
      {style.label}
    </span>
  );
}

function CommitmentCard({ icon, title, status, html }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-200 hover:shadow-md">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl"
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <StatusBadge status={status} />
        </div>
        <div
          className="mt-2 text-sm leading-6 text-slate-700"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

function Accordion({ id, title, children }) {
  return (
    <details className="group border-slate-200 bg-white shadow-sm" id={id}>
      <summary className="cursor-pointer list-none border-slate-200 px-5 py-4 font-semibold text-slate-900 shadow-sm outline-none transition-colors hover:bg-blue-50 focus-visible:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-300">
        <span className="flex items-center gap-2">
          <svg
            aria-hidden="true"
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6 15 12 9 18" />
          </svg>
          {title}
          <svg
            aria-hidden="true"
            className="ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:-translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
          </svg>
        </span>
      </summary>
      <div className="px-5 pb-5 text-slate-700">{children}</div>
    </details>
  );
}

export const metadata = {
  title: "Privacy & Data Protection | Target95",
  description:
    "How Target95 explains India's DPDP Act, 2023 and DPDP Rules, 2025, and the platform's privacy, child-safety, data-minimisation and AI-usage commitments.",
};

export default function PrivacyAndDataProtectionPage() {
  const reviewedDate = "27 October 2026";

  const commitments = [
    {
      icon: "🛡️",
      title: "Privacy by design",
      status: "planned",
      html: `<p>Target95 aims to consider privacy and child safety when designing new features. A formal, documented privacy-by-design review process for every new feature is planned and is not yet verified in the codebase.</p>`,
    },
    {
      icon: "📉",
      title: "Data minimisation",
      status: "implemented",
      html: `<p>The client-side learning-event helper keeps event parameters small and drops sensitive keys such as <code>password</code>, <code>token</code>, <code>email</code> and <code>user_id</code> before any event leaves the browser. Practice sessions are filtered before they are saved, and only content identifiers and aggregate counts are used for client-side events.</p>`,
    },
    {
      icon: "📝",
      title: "Transparent notices",
      status: "implemented",
      html: `<p>Target95 publishes a Privacy Policy and this transparency page. Notices describe the kinds of information handled and the main purposes. A detailed, flow-by-flow disclosure of every recipient and purpose is not yet published and remains a work item.</p>`,
    },
    {
      icon: "👪",
      title: "Child safety and parental consent",
      status: "planned",
      html: `<p>Target95 intends to assess applicable requirements for children and parental consent and to implement enforceable controls where needed. The current codebase does not include a verified, enforced parental-consent flow or a confirmed under-13 gate, so this commitment is recorded as planned rather than verified.</p>`,
    },
    {
      icon: "🔒",
      title: "Security",
      status: "partial",
      html: `<p>Target95 uses signed session cookies, server-side session verification, per-user Firestore paths, restricted API routes, and security response headers such as <code>X-Content-Type-Options</code>, <code>X-Frame-Options</code> and <code>Referrer-Policy</code>. A complete, independently verified security review, vulnerability scanning and configuration hardening plan are partially implemented and remain ongoing work.</p>`,
    },
    {
      icon: "🤖",
      title: "Responsible AI",
      status: "implemented",
      html: `<p>The AI Tutor key is kept server-side and calls are routed through <code>/api/ai-tutor</code>, which verifies the session, applies per-user rate limits and enforces plan access. Client-side events are designed not to send names, emails, tokens or free-form user input. Whether identifiable student data reaches external providers for other features is reviewed feature by feature and is not fully documented yet.</p>`,
    },
    {
      icon: "🧹",
      title: "Retention and deletion",
      status: "partial",
      html: `<p>Signed-in users can view and delete some stored items in the product, and service classes exist that can remove Firestore records. A documented, tested retention schedule for all data categories and a complete deletion workflow that covers logs, caches and third-party data are partially implemented and remain work items.</p>`,
    },
    {
      icon: "🚨",
      title: "Incident response",
      status: "planned",
      html: `<p>Target95 intends to maintain a process for investigating incidents and meeting applicable notification obligations where they apply. A documented incident-response runbook with defined roles, timelines and notification triggers is planned and is not yet verified in the codebase.</p>`,
    },
    {
      icon: "🤝",
      title: "Third-party accountability",
      status: "partial",
      html: `<p>Target95 reviews provider roles where it uses Firebase, an OpenAI-backed AI Tutor route and the existing client-side event foundation. A complete, current inventory of every external recipient, its purpose, its location and its data-processing terms is partially implemented and is being documented in the data-inventory table on this page.</p>`,
    },
    {
      icon: "🔁",
      title: "Continuous improvement",
      status: "implemented",
      html: `<p>Target95 reviews its privacy pages, product behaviour and commitments as the platform changes. This page carries a last-reviewed date and points to official sources so readers can compare the platform's statements against the law.</p>`,
    },
  ];

  const dataRows = [
    {
      category: "Account authentication",
      collected: "Yes, when signed in",
      purpose: "Account creation, sign-in, session management, abuse prevention",
      storageOrRecipient: "Server-signed session cookies verified by Firebase Admin SDK",
      retention: "Needs verification — no published retention schedule found in the repository",
    },
    {
      category: "Profile and account identifiers",
      collected: "Yes, where the product stores a signed-in profile",
      purpose: "Personalising the experience, supporting progress and account operations",
      storageOrRecipient: "Firestore user-scoped documents where implemented",
      retention: "Needs verification — per-user deletion exists for some features, not confirmed for all",
    },
    {
      category: "Practice sessions and answers",
      collected: "Yes, when signed in and using practice features",
      purpose: "Saving work in progress, recording results, supporting progress and statistics",
      storageOrRecipient: "Firestore paths under <code>users/{uid}/practiceSessions</code> and <code>users/{uid}/practiceAnswers</code>",
      retention: "Needs verification — deletion is possible for some features, retention period not published",
    },
    {
      category: "Practice progress and statistics",
      collected: "Yes, when signed in and using practice features",
      purpose: "Supporting dashboards, streak and progress indicators",
      storageOrRecipient: "Firestore, e.g. <code>users/{uid}/practiceStatistics</code>",
      retention: "Needs verification",
    },
    {
      category: "AI Tutor conversations",
      collected: "Yes, when signed in and using the AI Tutor",
      purpose: "Saving and loading tutoring conversations for the signed-in user",
      storageOrRecipient: "Firestore under <code>users/{uid}/aiChats</code>; the AI response is generated server-side through <code>/api/ai-tutor</code>",
      retention: "Needs verification — conversations can be deleted by the user for that feature",
    },
    {
      category: "Client-side learning events",
      collected: "Yes — limited and sanitised",
      purpose: "Debugging and, when an analytics sink is wired, understanding the learning funnel",
      storageOrRecipient: "Client-side helper only today; sensitive keys are dropped and only content identifiers and aggregate counters are kept",
      retention: "No external analytics sink is verified as active in this codebase",
    },
    {
      category: "Blog and public content",
      collected: "Not from students",
      purpose: "Publishing articles and study content",
      storageOrRecipient: "Firestore blog collections; readers do not provide personal data to view them",
      retention: "Content is published by administrators, not collected from students",
    },
    {
      category: "Server logs, errors and support data",
      collected: "Possibly, indirectly",
      purpose: "Operating the platform, debugging and responding to support requests",
      storageOrRecipient: "Deployment and logging infrastructure not fully inventoried in the repository",
      retention: "Needs verification — retention of logs and error data is not documented in the repository",
    },
    {
      category: "Cookies and session tokens",
      collected: "Yes",
      purpose: "Maintaining authentication sessions and platform behaviour",
      storageOrRecipient: "Browser cookies and server session verification",
      retention: "Needs verification — cookie and session retention behaviour is not fully documented",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="h-20 sm:h-24 lg:h-28"></div>

      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Top summary */}
          <div className="mb-10 rounded-3xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm">
            <p className="stitch-eyebrow text-blue-600">Student & Parent Transparency</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Your Learning Matters. Your Privacy Matters Too.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
              Target95 is committed to building a learning environment that respects students&apos; privacy,
              supports child safety and handles personal information responsibly. This page explains India&apos;s
              Digital Personal Data Protection framework and the concrete commitments Target95 currently makes.
            </p>
            <p className="mt-4 flex items-start gap-2 rounded-xl border border-slate-200 bg-blue-50/70 p-4 text-sm leading-6 text-blue-900">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-base">
                ℹ️
              </span>
              This is an educational transparency page, not a claim of legal certification or legal advice.
              For the exact legal position, read the official sources linked near the bottom of this page.
            </p>
          </div>

          {/* Section A */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="stitch-eyebrow text-blue-600">Section A</h2>
            <h3 className="stitch-heading text-2xl sm:text-3xl">Understanding India&apos;s DPDP law</h3>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
              <p>
                India&apos;s <strong>Digital Personal Data Protection Act, 2023</strong> establishes a framework for
                the lawful processing of digital personal data. It is designed to balance the need to process data
                for lawful purposes with the protection of individuals&apos; personal information.
              </p>
              <p>
                The <strong>Digital Personal Data Protection Rules, 2025</strong> provide supporting rules under the
                Act and help give the framework practical detail.
              </p>
              <p>
                The framework addresses ideas that appear in many privacy laws:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li><strong>Transparency</strong> — people should understand what is happening with their data.</li>
                <li><strong>Consent</strong> — processing should have a lawful basis, with clear notice in many cases.</li>
                <li><strong>Purpose limitation</strong> — data should generally be used for the purposes explained.</li>
                <li><strong>Data minimisation</strong> — only the data needed for a purpose should be collected.</li>
                <li><strong>Security</strong> — personal data should be protected with reasonable safeguards.</li>
                <li><strong>Retention</strong> — data should not be kept longer than necessary without a valid reason.</li>
                <li><strong>Individual rights</strong> — the framework provides ways for individuals to exercise certain rights.</li>
              </ul>
              <p>
                Different provisions can come into force at different times. Some rules and notifications are already
                in effect, while other provisions may take effect later. This page does not try to restate every
                commencement date; the official text and notifications are the authority.
              </p>
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm leading-6 text-amber-900">
                <p>
                  <strong>Important:</strong> This is an educational summary, not legal advice and not a substitute
                  for the Act, the Rules, official notifications, or qualified legal counsel.
                </p>
              </div>
            </div>
          </div>

          {/* Section B */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="stitch-eyebrow text-blue-600">Section B</h2>
            <h3 className="stitch-heading text-2xl sm:text-3xl">Penalties explained accurately</h3>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
              <p>
                The Act&apos;s Schedule provides maximum monetary penalties for specified breaches. Those penalties are
                not automatic fines; they are subject to the statutory process, the applicable provisions, the facts of
                the case and the commencement status of the relevant requirements.
              </p>
              <p>
                A calm, accurate way to read the penalty figures is: they describe the upper limit for a particular
                kind of breach, not a penalty that every website automatically faces.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Failure to implement reasonable security safeguards that results in a breach may attract a penalty of up to&nbsp;<strong>₹250 crore</strong>.</li>
                <li>Certain failures to notify a personal data breach may attract a penalty of up to&nbsp;<strong>₹200 crore</strong>.</li>
                <li>Breaches of certain obligations relating to children may attract a penalty of up to&nbsp;<strong>₹200 crore</strong>.</li>
                <li>Other breaches may carry separate statutory penalty limits depending on the provision and the facts.</li>
              </ul>
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-sm leading-6 text-blue-900">
                <p>
                  <strong>Read calmly:</strong> The applicable violation, statutory provisions, commencement status and
                  facts matter. A platform does not become liable for a ₹250 crore penalty simply by existing online.
                </p>
              </div>
            </div>
          </div>

          {/* Section C */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="stitch-eyebrow text-blue-600">Section C</h2>
            <h3 className="stitch-heading text-2xl sm:text-3xl">What this means for students and parents</h3>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
              <ul className="list-disc space-y-2 pl-5">
                <li>Personal information should only be collected for clearly explained purposes.</li>
                <li>Students should not be asked to share unnecessary personal information.</li>
                <li>Where applicable, parental-consent and child-data requirements must be assessed and followed.</li>
                <li>Personal information should receive appropriate access controls and security safeguards.</li>
                <li>Data should not be retained indefinitely without a valid reason.</li>
                <li>Applicable rights, grievance channels and deletion or correction processes should be explained clearly.</li>
                <li>AI tools and external providers should be assessed before personal student data is shared with them.</li>
              </ul>
              <p className="text-sm leading-6 text-slate-600">
                Important: not every educational-institution exemption automatically applies to an ed-tech platform.
                Target95 must assess its own role, the data it actually processes and the circumstances that apply to it.
                This page describes Target95&apos;s own transparency and commitments, not a blanket legal exemption.
              </p>
            </div>
          </div>

          {/* Section D */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="stitch-eyebrow text-blue-600">Section D</h2>
            <h3 className="stitch-heading text-2xl sm:text-3xl">Target95&apos;s commitments</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Each commitment below is labelled as <strong>Implemented and verified</strong>,
              <strong>Partially implemented</strong> or <strong>Planned / under review</strong>.
              A commitment is marked “Implemented and verified” only when repository evidence and tests support it.
            </p>
            <div className="mt-5 space-y-4">
              {commitments.map((item) => (
                <CommitmentCard key={item.title} {...item} />
              ))}
            </div>
          </div>

          {/* Section E */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="stitch-eyebrow text-blue-600">Section E</h2>
            <h3 className="stitch-heading text-2xl sm:text-3xl">What data does Target95 collect?</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This inventory is built from the current codebase and configuration. It separates personal data from
              anonymous usage information. Where a fact could not be verified from the repository, it is marked
              <strong>“Needs verification”</strong> rather than guessed.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm leading-6 text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Data category</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Collected?</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Storage or recipient (where verified)</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Retention / deletion (where verified)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {dataRows.map((row) => (
                    <tr key={row.category} className="bg-white">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.category}</td>
                      <td className="px-4 py-3">{row.collected}</td>
                      <td className="px-4 py-3">{row.purpose}</td>
                      <td className="px-4 py-3">{row.storageOrRecipient}</td>
                      <td className="px-4 py-3 text-slate-600">{row.retention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              <strong>Anonymous usage information</strong> such as aggregate learning events is kept minimal on the
              client side today and is designed not to include names, emails, tokens or free-form user input.
            </p>
          </div>

          {/* Section F */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="stitch-eyebrow text-blue-600">Section F</h2>
            <h3 className="stitch-heading text-2xl sm:text-3xl">Parents&apos; and students&apos; privacy controls</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The controls below are based on what the platform actually provides today. If a process is not yet
              available, it is marked as a gap rather than invented.
            </p>
            <div className="mt-5 space-y-4">
              <Accordion id="privacy-questions" title="Privacy questions and general enquiries">
                <p className="text-sm leading-6 text-slate-700">
                  For privacy questions, write to{" "}
                  <a href="mailto:support@target95.com" className="font-semibold text-blue-600 hover:text-blue-700">
                    support@target95.com
                  </a>{" "}
                  or use the <a href="/contact" className="font-semibold text-blue-600 hover:text-blue-700">Contact Us</a> page.
                </p>
              </Accordion>

              <Accordion id="access-correct-delete" title="Access, correction and deletion requests">
                <p className="text-sm leading-6 text-slate-700">
                  Where signed-in users can manage their own data, those features are provided in the product. For
                  account-level access, correction or deletion requests, contact{" "}
                  <a href="mailto:support@target95.com" className="font-semibold text-blue-600 hover:text-blue-700">
                    support@target95.com
                  </a> and describe the request clearly.
                </p>
                <p className="mt-2 text-sm leading-6 text-amber-900">
                  <strong>Implementation gap:</strong> A self-service, documented deletion or data-export workflow that
                  covers every data category is not yet verified in the repository. Submitted requests are handled on a
                  case-by-case basis until that workflow is complete.
                </p>
              </Accordion>

              <Accordion id="consent" title="Consent withdrawal">
                <p className="text-sm leading-6 text-slate-700">
                  Where a feature depends on a user&apos;s choices, those choices are managed through the product. For
                  consent-related questions that are not covered by a product control, contact{" "}
                  <a href="mailto:support@target95.com" className="font-semibold text-blue-600 hover:text-blue-700">
                    support@target95.com
                  </a>.
                </p>
                <p className="mt-2 text-sm leading-6 text-amber-900">
                  <strong>Implementation gap:</strong> A complete, enforced consent-management and withdrawal flow is not
                  yet verified in the repository.
                </p>
              </Accordion>

              <Accordion id="child-data" title="Child-data and parental-consent questions">
                <p className="text-sm leading-6 text-slate-700">
                  Parents and students with questions about children&apos;s data should write to{" "}
                  <a href="mailto:support@target95.com" className="font-semibold text-blue-600 hover:text-blue-700">
                    support@target95.com
                  </a> and describe the concern clearly.
                </p>
                <p className="mt-2 text-sm leading-6 text-amber-900">
                  <strong>Implementation gap:</strong> An enforced parental-consent flow and a confirmed under-13 gate are
                  not yet verified in the repository.
                </p>
              </Accordion>

              <Accordion id="complaints" title="Complaints and grievances">
                <p className="text-sm leading-6 text-slate-700">
                  To raise a complaint or a privacy concern, use the{" "}
                  <a href="/contact" className="font-semibold text-blue-600 hover:text-blue-700">Contact Us</a> page or
                  email <a href="mailto:support@target95.com" className="font-semibold text-blue-600 hover:text-blue-700">
                    support@target95.com
                  </a>.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  If you believe your personal data has been affected or mishandled, describe the concern as clearly as
                  possible so it can be investigated.
                </p>
              </Accordion>
            </div>
          </div>

          {/* Section G */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="stitch-eyebrow text-blue-600">Section G</h2>
            <h3 className="stitch-heading text-2xl sm:text-3xl">Privacy status and last reviewed date</h3>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Last reviewed: {reviewedDate}</p>
                <p className="mt-1 text-slate-600">
                  Legal requirements and platform practices may change. This page will be updated when the platform or the
                  law changes in material ways.
                </p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4">
                <p className="font-semibold text-slate-900">Where to go next</p>
                <ul className="mt-2 space-y-2 pl-5">
                  <li>Full Privacy Policy: <a href="/privacy" className="font-semibold text-blue-600 hover:text-blue-700">/privacy</a></li>
                  <li>Terms of Service: <a href="/terms" className="font-semibold text-blue-600 hover:text-blue-700">/terms</a></li>
                  <li>Contact / support: <a href="/contact" className="font-semibold text-blue-600 hover:text-blue-700">/contact</a></li>
                </ul>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm leading-6 text-amber-900">
                <p>
                  Target95 does not display fake badges such as &ldquo;DPDP Compliant&rdquo;, &ldquo;Government Certified&rdquo; or &ldquo;Legally
                  Approved&rdquo; on this page. This page is educational transparency, not a compliance certification.
                </p>
              </div>
            </div>
          </div>

          {/* Official sources */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="stitch-eyebrow text-blue-600">Read official sources</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Official sources are the authority. The links below point to the Act, the Rules and official announcements.
              Verify the latest amendments, corrigenda, exemptions and commencement notifications before relying on any
              specific legal claim.
            </p>
            <div className="mt-4 space-y-3">
              <a
                href="https://www.indiacode.nic.in/indiacode/handle/123456789/22037?view_type=browse"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/40 hover:text-blue-700"
              >
                <span className="text-sm font-semibold text-slate-900">Digital Personal Data Protection Act, 2023 — India Code</span>
                <span className="text-sm text-slate-400 transition-transform group-hover:translate-x-1">↗</span>
              </a>
              <a
                href="https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/40 hover:text-blue-700"
              >
                <span className="text-sm font-semibold text-slate-900">Digital Personal Data Protection Rules, 2025 — MeitY</span>
                <span className="text-sm text-slate-400 transition-transform group-hover:translate-x-1">↗</span>
              </a>
              <a
                href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655&lang=2&reg=48"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/40 hover:text-blue-700"
              >
                <span className="text-sm font-semibold text-slate-900">Official announcement — Press Information Bureau</span>
                <span className="text-sm text-slate-400 transition-transform group-hover:translate-x-1">↗</span>
              </a>
              <a
                href="https://www.indiacode.nic.in/bitstream/123456789/22037/1/a2023-22.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/40 hover:text-blue-700"
              >
                <span className="text-sm font-semibold text-slate-900">Act document — India Code</span>
                <span className="text-sm text-slate-400 transition-transform group-hover:translate-x-1">↗</span>
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  );
}
