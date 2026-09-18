import Link from 'next/link';

const code = `import pandas as pd
import matplotlib.pyplot as plt

data = {
    "Student": ["A", "B", "C", "D", "E", "F"],
    "Attendance": [92, 78, 88, 65, 95, 72],
    "Score": [86, 70, 82, 55, 91, 64],
    "Assignments": [10, 8, 9, 6, 10, 7]
}

df = pd.DataFrame(data)

print("=== DATASET ===")
print(df)

print("\\n=== SUMMARY ===")
print(df[["Attendance", "Score", "Assignments"]].describe())

print("\\n=== CLEANING CHECK ===")
print("Missing values:")
print(df.isnull().sum())
print("Duplicate rows:", df.duplicated().sum())

df["SupportNeeded"] = (
    (df["Attendance"] < 75) |
    (df["Score"] < 60) |
    (df["Assignments"] < 7)
)

print("\\n=== AI SUPPORT FLAG ===")
print(df[["Student", "SupportNeeded"]])

plt.scatter(df["Attendance"], df["Score"])
plt.xlabel("Attendance (%)")
plt.ylabel("Score")
plt.title("Attendance vs Score")
plt.show()
`;

export default function ISCClassXIProject() {
  return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
    <div className="mx-auto max-w-6xl">
      <Link href="/isc/artificial-intelligence/11" className="text-sm font-semibold">← Back to ISC XI AI</Link>
      <header className="mt-6 rounded-3xl bg-gradient-to-br from-violet-700 to-indigo-900 p-8 text-white">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-200">ISC AI 883 · Class XI</p>
        <h1 className="mt-2 text-4xl font-black">AI Problem Investigation</h1>
        <p className="mt-4 max-w-4xl text-violet-100">A complete beginner-friendly project combining problem scoping, data processing, visualization and responsible AI thinking.</p>
      </header>
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Problem</h2><p className="mt-3 leading-7">Identify students who may need academic support using attendance, assessment score and assignment completion data. The system is a decision-support aid, not an automatic decision maker.</p></article>
        <article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Learning outcomes</h2><ul className="mt-3 list-disc space-y-2 pl-5"><li>Define stakeholders and a measurable problem.</li><li>Inspect and clean a dataset.</li><li>Use Pandas and Matplotlib.</li><li>Discuss privacy, bias and human oversight.</li></ul></article>
      </section>
      <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-xl"><h2 className="text-2xl font-black">Complete Python Code</h2><pre className="mt-5 overflow-x-auto rounded-2xl bg-black p-5 text-sm leading-6"><code>{code}</code></pre></section>
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Report structure</h2><ol className="mt-3 list-decimal space-y-2 pl-5"><li>Introduction and problem statement</li><li>Stakeholders and 5W1H</li><li>Dataset and data dictionary</li><li>Cleaning and visualization</li><li>Results and limitations</li><li>Ethics, privacy and bias</li><li>Conclusion and future scope</li></ol></article>
        <article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Viva questions</h2><ul className="mt-3 space-y-2"><li>Why is this an AI/data problem?</li><li>Why should missing values be checked?</li><li>Does correlation prove causation?</li><li>Why must a teacher review the flag?</li><li>What privacy risks exist in student data?</li></ul></article>
      </section>
    </div>
  </main>;
}
