// Renders one content block of a BoardPrep chapter.
//
// Every block type in the shared schema has a renderer here. A block type that
// the renderer does not know about falls back to its text, so new content never
// renders as an empty gap.

export default function ChapterBlock({ block }) {
  if (!block || typeof block !== 'object') return null;

  if (block.type === 'paragraph') {
    return <p className="leading-7">{block.text}</p>;
  }

  if (block.type === 'bullets') {
    return (
      <ul className="list-disc space-y-2 pl-5">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === 'examples') {
    return (
      <div className="space-y-3">
        {block.items.map((item) => (
          <div key={item.text} className="rounded-xl bg-slate-50 p-4">
            <p>{item.text}</p>
            <p className="mt-2 text-sm text-slate-600">{item.note}</p>
          </div>
        ))}
      </div>
    );
  }

  if (block.type === 'terms') {
    return (
      <dl className="grid gap-3 sm:grid-cols-2">
        {block.items.map((item) => (
          <div key={item.term} className="rounded-xl bg-blue-50 p-3">
            <dt className="font-semibold text-blue-900">{item.term}</dt>
            <dd className="mt-1 text-sm text-slate-700">{item.meaning}</dd>
          </div>
        ))}
      </dl>
    );
  }

  if (block.type === 'table') {
    return (
      <figure className="overflow-hidden rounded-xl ring-1 ring-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="bg-slate-50 px-4 py-3 text-left font-semibold text-slate-800">
              {block.caption}
            </caption>
            <thead>
              <tr className="bg-slate-50 text-slate-700">
                {block.columns.map((column) => (
                  <th key={column} scope="col" className="px-4 py-2 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {block.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${index}`} className="px-4 py-2 align-top text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </figure>
    );
  }

  // Unknown block type: fall back to the text it carries.
  return <p className="leading-7">{block.text}</p>;
}
