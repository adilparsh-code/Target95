import Link from "next/link";
import kMap from "@/app/data/iscXIIKMap";

function KMapGrid({ map, selected = [] }) {
  const getHeaderLabel = () => {
    const varCount = map?.variables?.length ?? 4;
    if (varCount === 2) return "A\\B";
    if (varCount === 3) return "A\\BC";
    return "AB\\CD";
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[520px] border-collapse text-center text-sm">
        <thead>
          <tr>
            <th className="border-b border-r border-slate-200 bg-slate-50 p-3">
              {getHeaderLabel()}
            </th>
            {map.columns.map((column) => (
              <th
                key={column}
                className="border-b border-slate-200 bg-slate-950 p-3 text-white"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {map.rows.map((row) => (
            <tr key={row}>
              <th className="border-r border-slate-200 bg-slate-50 p-3 font-semibold">
                {row}
              </th>
              {map.columns.map((column) => {
                const normalizedCol = column.replace(/^[A-Za-z]+=/g, "");
                const cell = map.cells?.find(
                  (item) =>
                    item.row === row &&
                    (item.col === column || item.col === normalizedCol)
                );
                const cellIndex = cell?.index;
                const active = cellIndex !== undefined && selected.includes(cellIndex);

                return (
                  <td
                    key={`${row}-${column}`}
                    className={`border-t border-slate-200 p-4 font-mono font-bold transition-colors ${
                      active
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-800"
                    }`}
                  >
                    {cellIndex ?? ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function KMapPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/isc/class-xii/boolean-algebra"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Boolean Algebra
        </Link>

        <header className="mt-6 rounded-[2rem] bg-slate-950 p-8 text-white md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            ISC Class XII
          </p>
          <h1 className="mt-2 text-4xl font-bold md:text-6xl">
            Karnaugh Maps (K-Maps)
          </h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
            {kMap.bigIdea}
          </p>
        </header>

        <div className="mt-8 grid gap-6">
          <Section title="1. The three rules you must never forget">
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl bg-slate-50 p-5">
                <p className="text-3xl font-bold">2ⁿ</p>
                <p className="mt-2 text-sm text-slate-600">
                  n variables give 2ⁿ cells.
                </p>
              </article>
              <article className="rounded-2xl bg-slate-50 p-5">
                <p className="text-3xl font-bold">1, 2, 4, 8…</p>
                <p className="mt-2 text-sm text-slate-600">
                  Groups can only contain powers of two.
                </p>
              </article>
              <article className="rounded-2xl bg-slate-50 p-5">
                <p className="text-3xl font-bold">Gray code</p>
                <p className="mt-2 text-sm text-slate-600">
                  Use 00, 01, 11, 10 so neighbours differ by one bit.
                </p>
              </article>
            </div>
          </Section>

          <Section title="2. SOP vs POS — know what you group">
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-lg font-bold">SOP</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Group <strong>1s</strong>. Keep variables that stay constant.
                  OR the resulting product terms.
                </p>
                <code className="mt-4 block rounded-xl bg-slate-950 p-4 text-sm text-white">
                  Σm → group 1s → minimal SOP
                </code>
              </article>
              <article className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-lg font-bold">POS</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Group <strong>0s</strong>. Keep variables that stay constant
                  using the POS polarity rule. AND the resulting sum terms.
                </p>
                <code className="mt-4 block rounded-xl bg-slate-950 p-4 text-sm text-white">
                  ΠM → group 0s → minimal POS
                </code>
              </article>
            </div>
          </Section>

          <Section title="3. Two-variable K-map">
            <p className="mb-4 text-sm text-slate-600">
              Example: {kMap.maps.twoVariable.example.expression} →{" "}
              {kMap.maps.twoVariable.example.result}
            </p>
            <KMapGrid
              map={kMap.maps.twoVariable}
              selected={kMap.maps.twoVariable.example.selected}
            />
            <p className="mt-4 text-sm text-slate-600">
              {kMap.maps.twoVariable.example.reason}
            </p>
          </Section>

          <Section title="4. Three-variable K-map">
            <p className="mb-4 text-sm text-slate-600">
              Gray-code columns: 00 → 01 → 11 → 10.
            </p>
            <KMapGrid
              map={kMap.maps.threeVariable}
              selected={kMap.maps.threeVariable.example.selected}
            />
            <div className="mt-4 rounded-2xl bg-slate-50 p-5">
              <p className="font-mono font-semibold">
                {kMap.maps.threeVariable.example.expression} →{" "}
                {kMap.maps.threeVariable.example.result}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {kMap.maps.threeVariable.example.reason}
              </p>
            </div>
          </Section>

          <Section title="5. Four-variable K-map">
            <p className="mb-4 text-sm text-slate-600">
              Both rows and columns follow Gray code: 00, 01, 11, 10.
            </p>
            <KMapGrid
              map={kMap.maps.fourVariable}
              selected={kMap.maps.fourVariable.example.selected}
            />
            <div className="mt-4 rounded-2xl bg-slate-50 p-5">
              <p className="font-mono font-semibold">
                {kMap.maps.fourVariable.example.expression} →{" "}
                {kMap.maps.fourVariable.example.result}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {kMap.maps.fourVariable.example.reason}
              </p>
            </div>
          </Section>

          <Section title="6. Wrap-around, corners and overlap">
            <div className="grid gap-4 md:grid-cols-2">
              {kMap.specialPatterns.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.rule}
                  </p>
                  <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm font-medium">
                    {item.example}
                  </p>
                </article>
              ))}
            </div>
          </Section>

          <Section title="7. Worked POS example">
            <div className="rounded-2xl bg-slate-50 p-6">
              <p className="font-mono text-lg font-semibold">
                {kMap.posExample.expression}
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Group zeros: {kMap.posExample.zeros.join(", ")}. Result:{" "}
                <strong>{kMap.posExample.result}</strong>.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {kMap.posExample.reason}
              </p>
            </div>
          </Section>

          <Section title="8. Exam traps">
            <ul className="grid gap-3 md:grid-cols-2">
              {kMap.examTraps.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900"
                >
                  ⚠️ {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="9. Practice ladder">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {kMap.practice.map((item) => (
                <details
                  key={item.id}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <summary className="cursor-pointer font-semibold">
                    {item.question}
                    <span className="ml-2 text-xs text-slate-500">
                      · {item.difficulty}
                    </span>
                  </summary>
                  <p className="mt-4 text-sm text-slate-700">
                    <strong>Answer:</strong> {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}
