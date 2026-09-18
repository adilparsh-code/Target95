import Link from "next/link";

/**
 * Shared, data-driven renderer for a complete Target95 student project.
 *
 * Every project page presents the full academic package in a consistent order:
 * title → board/class/subject → status/type → problem statement → objectives →
 * learning outcomes → requirements → concepts → algorithm/workflow → complete
 * code → explanation → sample input/output → test cases → edge cases → report
 * format → viva → extensions → syllabus mapping.
 *
 * The component is intentionally tolerant: any optional field can be omitted and
 * the matching section is skipped, so partially authored projects never break.
 */

function renderList(items) {
  return (items || []).filter(Boolean);
}

function Section({ number, title, children, tone = "white" }) {
  const tones = {
    white: "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
    slate: "border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900",
    blue: "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30",
    amber: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30",
    emerald: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30",
  };
  return (
    <section className={`mt-6 rounded-3xl border p-6 shadow-sm sm:p-7 ${tones[tone] || tones.white}`}>
      <h2 className="flex items-start gap-3 text-xl font-black sm:text-2xl">
        {number != null && (
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white dark:bg-white dark:text-slate-900">
            {number}
          </span>
        )}
        <span>{title}</span>
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700 dark:text-slate-200 sm:text-base">{children}</div>
    </section>
  );
}

function Bullets({ items, ordered = false }) {
  const list = renderList(items);
  if (list.length === 0) return null;
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`space-y-2 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}>
      {list.map((item, index) => (
        <li key={`${item}-${index}`} className="leading-7">{item}</li>
      ))}
    </Tag>
  );
}

export default function ProjectView({ project, backHref = "/cbse", backLabel = "Back" }) {
  if (!project) return null;

  const requirements = project.requirements || {};
  const requirementsRows = [
    ["Software", requirements.software],
    ["Libraries / Tools", requirements.libraries],
    ["Data", requirements.data],
    ["Hardware", requirements.hardware],
  ].filter(([, value]) => Array.isArray(value) ? value.length : value);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href={backHref} className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
          ← {backLabel}
        </Link>

        {/* 1–3. Title, board/class/subject, status/type */}
        <header className="mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300">
            {project.boardLabel && <span className="rounded-full bg-white/10 px-3 py-1">{project.boardLabel}</span>}
            {project.classNumber != null && <span className="rounded-full bg-white/10 px-3 py-1">Class {project.classNumber}</span>}
            {project.subjectName && <span className="rounded-full bg-white/10 px-3 py-1">{project.subjectName}</span>}
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{project.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            {project.status && <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-100">Status · {project.status}</span>}
            {project.type && <span className="rounded-full bg-sky-500/20 px-3 py-1 text-sky-100">Type · {project.type}</span>}
            {project.language && <span className="rounded-full bg-violet-500/20 px-3 py-1 text-violet-100">Language · {project.language}</span>}
            {project.difficulty && <span className="rounded-full bg-amber-500/20 px-3 py-1 text-amber-100">Level · {project.difficulty}</span>}
          </div>
          {project.summary && <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200">{project.summary}</p>}
        </header>

        {project.academicNote && (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
            <strong>Academic note:</strong> {project.academicNote}
          </div>
        )}

        {renderList(project.studentInstructions).length > 0 && (
          <section className="mt-6 rounded-3xl border border-sky-200 bg-sky-50 p-6 shadow-sm dark:border-sky-900 dark:bg-sky-950/30 sm:p-7">
            <h2 className="text-xl font-black sm:text-2xl">How to complete this project</h2>
            <ol className="mt-4 space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200 sm:text-base">
              {renderList(project.studentInstructions).map((step, index) => (
                <li key={`${step}-${index}`} className="list-decimal">{step}</li>
              ))}
            </ol>
          </section>
        )}

        {/* 4. Problem statement */}
        {project.problemStatement && (
          <Section number={4} title="Problem statement">
            <p>{project.problemStatement}</p>
          </Section>
        )}

        {/* 5–6. Objectives and learning outcomes */}
        {(renderList(project.objectives).length > 0 || renderList(project.learningOutcomes).length > 0) && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {renderList(project.objectives).length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="flex items-center gap-3 text-xl font-black"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white dark:bg-white dark:text-slate-900">5</span>Objectives</h2>
                <div className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200 sm:text-base"><Bullets items={project.objectives} /></div>
              </div>
            )}
            {renderList(project.learningOutcomes).length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="flex items-center gap-3 text-xl font-black"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white dark:bg-white dark:text-slate-900">6</span>Learning outcomes</h2>
                <div className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200 sm:text-base"><Bullets items={project.learningOutcomes} /></div>
              </div>
            )}
          </div>
        )}

        {/* 7. Requirements */}
        {requirementsRows.length > 0 && (
          <Section number={7} title="Requirements">
            <div className="grid gap-4 sm:grid-cols-2">
              {requirementsRows.map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                  <div className="mt-2 text-sm leading-6"><Bullets items={Array.isArray(value) ? value : [value]} /></div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* 8. Concepts */}
        {renderList(project.concepts).length > 0 && (
          <Section number={8} title="Concepts covered">
            <Bullets items={project.concepts} />
          </Section>
        )}

        {/* 9. Algorithm / workflow */}
        {renderList(project.algorithm).length > 0 && (
          <Section number={9} title="Algorithm / workflow" tone="blue">
            <Bullets items={project.algorithm} ordered />
          </Section>
        )}

        {/* 10. Complete code */}
        {project.code?.content && (
          <section className="mt-6 rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-xl">
            <h2 className="flex items-center gap-3 text-xl font-black sm:text-2xl"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-slate-900">10</span>Complete {project.code.language || project.language || ""} code</h2>
            {project.code.filename && <p className="mt-2 text-sm text-slate-400">Save as <strong className="text-slate-200">{project.code.filename}</strong></p>}
            {project.setup && <p className="mt-2 rounded-xl bg-slate-900 p-3 font-mono text-xs leading-6 text-emerald-300">{project.setup}</p>}
            <pre className="mt-4 max-h-[720px] overflow-auto rounded-2xl bg-black p-5 text-xs leading-6"><code>{project.code.content}</code></pre>
          </section>
        )}

        {/* 11. Code explanation */}
        {renderList(project.codeExplanation).length > 0 && (
          <Section number={11} title="Code explanation">
            <Bullets items={project.codeExplanation} />
          </Section>
        )}

        {/* 12. Sample input / output */}
        {(project.sampleInput || project.sampleOutput) && (
          <Section number={12} title="Sample input / output">
            {project.sampleInput && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Sample input</p>
                <pre className="mt-2 overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-slate-100"><code>{project.sampleInput}</code></pre>
              </div>
            )}
            {project.sampleOutput && (
              <div>
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">Sample output</p>
                <pre className="mt-2 overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-slate-100"><code>{project.sampleOutput}</code></pre>
              </div>
            )}
          </Section>
        )}

        {/* 13. Test cases */}
        {renderList(project.testCases).length > 0 && (
          <Section number={13} title="Test cases">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="border-b border-slate-200 pb-2 pr-4 font-bold dark:border-slate-700">Input / Scenario</th>
                    <th className="border-b border-slate-200 pb-2 pr-4 font-bold dark:border-slate-700">Expected result</th>
                    <th className="border-b border-slate-200 pb-2 font-bold dark:border-slate-700">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {project.testCases.map((testCase, index) => (
                    <tr key={`${testCase.input}-${index}`} className="align-top">
                      <td className="border-b border-slate-100 py-2 pr-4 dark:border-slate-800">{testCase.input}</td>
                      <td className="border-b border-slate-100 py-2 pr-4 dark:border-slate-800">{testCase.expected}</td>
                      <td className="border-b border-slate-100 py-2 text-slate-500 dark:border-slate-800">{testCase.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* 14. Edge cases */}
        {renderList(project.edgeCases).length > 0 && (
          <Section number={14} title="Edge cases" tone="amber">
            <Bullets items={project.edgeCases} />
          </Section>
        )}

        {/* 15. Report format */}
        {renderList(project.reportFormat).length > 0 && (
          <Section number={15} title="Report format">
            <Bullets items={project.reportFormat} ordered />
          </Section>
        )}

        {/* 16. Viva questions */}
        {renderList(project.viva).length > 0 && (
          <Section number={16} title="Viva questions" tone="emerald">
            <Bullets items={project.viva} />
          </Section>
        )}

        {/* 17. Extensions */}
        {renderList(project.extensions).length > 0 && (
          <Section number={17} title="Extensions">
            <Bullets items={project.extensions} />
          </Section>
        )}

        {/* 18. Syllabus mapping */}
        {renderList(project.syllabusMapping).length > 0 && (
          <Section number={18} title="Syllabus mapping">
            <Bullets items={project.syllabusMapping} />
          </Section>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={backHref} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900">
            ← {backLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
