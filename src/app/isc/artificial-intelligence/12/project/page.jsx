import Link from 'next/link';

const code = `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report

data = {
    "Hours": [1,2,2,3,3,4,5,5,6,7,7,8],
    "Attendance": [60,65,70,72,75,78,80,82,85,88,92,95],
    "Assignments": [3,4,4,5,5,6,7,7,8,8,9,10],
    "Pass": [0,0,0,0,0,1,1,1,1,1,1,1]
}

df = pd.DataFrame(data)

X = df[["Hours", "Attendance", "Assignments"]]
y = df["Pass"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)

model = DecisionTreeClassifier(max_depth=3, random_state=42)
model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
print(classification_report(y_test, predictions, zero_division=0))

new_student = pd.DataFrame([{
    "Hours": 5,
    "Attendance": 84,
    "Assignments": 8
}])

prediction = model.predict(new_student)[0]
print("Predicted class:", "Pass" if prediction == 1 else "Needs support")

print("\\nIMPORTANT: This prediction is educational only.")
print("Human review, context and responsible use are required.")
`;

export default function ISCClassXIIProject() {
  return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
    <div className="mx-auto max-w-6xl">
      <Link href="/isc/artificial-intelligence/12" className="text-sm font-semibold">← Back to ISC XII AI</Link>
      <header className="mt-6 rounded-3xl bg-gradient-to-br from-emerald-700 to-teal-900 p-8 text-white">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-200">ISC AI 883 · Class XII</p>
        <h1 className="mt-2 text-4xl font-black">Machine Learning Application</h1>
        <p className="mt-4 max-w-4xl text-emerald-100">A complete end-to-end ML project covering data preparation, train/test split, decision-tree classification and evaluation.</p>
      </header>
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Project workflow</h2><ol className="mt-3 list-decimal space-y-2 pl-5"><li>Define the problem and target.</li><li>Prepare the dataset.</li><li>Split training and testing data.</li><li>Train a decision-tree model.</li><li>Evaluate predictions.</li><li>Interpret limitations and ethics.</li></ol></article>
        <article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Important limitation</h2><p className="mt-3 leading-7">The dataset is intentionally small for teaching. It must not be used for real student admissions, grading or high-impact decisions. A real deployment requires representative data, validation, privacy safeguards and human oversight.</p></article>
      </section>
      <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-xl"><h2 className="text-2xl font-black">Complete Python Code</h2><pre className="mt-5 overflow-x-auto rounded-2xl bg-black p-5 text-sm leading-6"><code>{code}</code></pre></section>
      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Viva</h2><div className="mt-4 grid gap-3 md:grid-cols-2"><p>What is the target variable?</p><p>Why do we split training and testing data?</p><p>What does accuracy measure?</p><p>What is overfitting?</p><p>Why is human oversight necessary?</p><p>How can biased data affect the model?</p></div></section>
    </div>
  </main>;
}
