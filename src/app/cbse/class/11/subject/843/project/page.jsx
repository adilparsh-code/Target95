import Link from 'next/link';

const code = `import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Day": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    "StudyHours": [2,3,1,4,3,5,2],
    "PracticeQuestions": [8,12,5,16,13,20,9]
})

print(df)
print("\\nAverage study hours:", df["StudyHours"].mean())
print("Average questions:", df["PracticeQuestions"].mean())

df["QuestionsPerHour"] = (
    df["PracticeQuestions"] / df["StudyHours"]
).round(2)

print("\\nDerived metric:")
print(df[["Day", "QuestionsPerHour"]])

plt.bar(df["Day"], df["PracticeQuestions"])
plt.xlabel("Day")
plt.ylabel("Questions completed")
plt.title("Weekly Practice Activity")
plt.tight_layout()
plt.show()
`;

export default function CBSEAIClassXIProject() {
 return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white"><div className="mx-auto max-w-6xl">
  <Link href="/cbse/class/11/subject/843" className="text-sm font-semibold">← Back to CBSE AI XI</Link>
  <header className="mt-6 rounded-3xl bg-gradient-to-br from-sky-700 to-cyan-900 p-8 text-white"><p className="text-sm font-bold uppercase tracking-widest text-sky-200">CBSE AI 843 · Class XI</p><h1 className="mt-2 text-4xl font-black">Data Literacy Mini Study</h1><p className="mt-4 max-w-4xl text-sky-100">A complete project for collecting, cleaning, analysing and visualising a small dataset.</p></header>
  <section className="mt-8 grid gap-6 md:grid-cols-2"><article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Objective</h2><p className="mt-3 leading-7">Study a student's weekly practice activity and communicate patterns using basic descriptive statistics and a chart.</p></article><article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Skills</h2><p className="mt-3 leading-7">Data collection · DataFrame · derived features · mean · visualization · interpretation.</p></article></section>
  <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-slate-100"><h2 className="text-2xl font-black">Complete Python Code</h2><pre className="mt-5 overflow-x-auto rounded-2xl bg-black p-5 text-sm leading-6"><code>{code}</code></pre></section>
  <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Student report</h2><p className="mt-3 leading-7">Include problem statement, source of data, data dictionary, cleaning checks, calculations, chart, findings, limitations, responsible-use note and conclusion.</p></section>
 </div></main>;
}
