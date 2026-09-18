import Link from 'next/link';

const code = `students = [
    {"name": "Aisha", "marks": [78, 84, 91]},
    {"name": "Rahul", "marks": [65, 72, 69]},
    {"name": "Sara", "marks": [92, 88, 95]},
    {"name": "Kabir", "marks": [54, 61, 58]}
]

for student in students:
    total = sum(student["marks"])
    average = total / len(student["marks"])
    if average >= 75:
        grade = "A"
    elif average >= 60:
        grade = "B"
    elif average >= 50:
        grade = "C"
    else:
        grade = "D"

    print(student["name"], "Total:", total,
          "Average:", round(average, 2),
          "Grade:", grade)
`;

export default function CBSECSClassXIProject() {
 return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white"><div className="mx-auto max-w-6xl">
  <Link href="/cbse/class/11/subject/083" className="text-sm font-semibold">← Back to CBSE Computer Science XI</Link>
  <header className="mt-6 rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-900 p-8 text-white"><p className="text-sm font-bold uppercase tracking-widest text-blue-200">CBSE Computer Science 083 · Class XI</p><h1 className="mt-2 text-4xl font-black">Student Performance Management System</h1><p className="mt-4 max-w-4xl text-blue-100">A complete Python project using lists, dictionaries, loops, conditions, functions/data processing and validation concepts.</p></header>
  <section className="mt-8 grid gap-6 md:grid-cols-2"><article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Objective</h2><p className="mt-3 leading-7">Store student marks, calculate totals and averages, assign grades and produce a readable performance report.</p></article><article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Report</h2><p className="mt-3 leading-7">Include problem statement, requirements, data structure used, algorithm/logic explanation, source code, sample output, test cases, limitations and future improvements.</p></article></section>
  <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-slate-100"><h2 className="text-2xl font-black">Complete Python Code</h2><pre className="mt-5 overflow-x-auto rounded-2xl bg-black p-5 text-sm leading-6"><code>{code}</code></pre></section>
  <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Viva</h2><ul className="mt-3 list-disc space-y-2 pl-5"><li>Why use a dictionary for one student?</li><li>Why is a list suitable for marks?</li><li>What happens if the marks list is empty?</li><li>How would you add student search?</li><li>How would you store the data permanently?</li></ul></section>
 </div></main>;
}
