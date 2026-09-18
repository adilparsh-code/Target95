import Link from 'next/link';

const code = `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

df = pd.DataFrame({
    "StudyHours": [1,2,3,4,5,6,7,8,9,10],
    "Score": [42,45,51,55,60,64,68,73,78,82]
})

X = df[["StudyHours"]]
y = df["Score"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)

pred = model.predict(X_test)

print("Coefficient:", model.coef_[0])
print("Intercept:", model.intercept_)
print("MAE:", mean_absolute_error(y_test, pred))
print("R2:", r2_score(y_test, pred))

new_data = pd.DataFrame({"StudyHours": [6.5]})
print("Estimated score:", model.predict(new_data)[0])

print("\\nDo not interpret this as a guaranteed score.")
print("Correlation/association does not prove causation.")
`;

export default function CBSEAIClassXIIProject() {
 return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white"><div className="mx-auto max-w-6xl">
  <Link href="/cbse/class/12/subject/843" className="text-sm font-semibold">← Back to CBSE AI XII</Link>
  <header className="mt-6 rounded-3xl bg-gradient-to-br from-fuchsia-700 to-purple-900 p-8 text-white"><p className="text-sm font-bold uppercase tracking-widest text-fuchsia-200">CBSE AI 843 · Class XII</p><h1 className="mt-2 text-4xl font-black">AI Capstone — Score Prediction Study</h1><p className="mt-4 max-w-4xl text-fuchsia-100">A complete teaching capstone using data science methodology and simple linear regression.</p></header>
  <section className="mt-8 grid gap-6 md:grid-cols-2"><article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Workflow</h2><ol className="mt-3 list-decimal space-y-2 pl-5"><li>Understand the problem.</li><li>Prepare and inspect data.</li><li>Select feature and target.</li><li>Train/test the model.</li><li>Evaluate MAE and R².</li><li>Communicate limitations.</li></ol></article><article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Responsible AI</h2><p className="mt-3 leading-7">This educational dataset is synthetic and small. Predictions must not be used to grade or label real students. Explain uncertainty and avoid claiming that study time alone causes a particular score.</p></article></section>
  <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-slate-100"><h2 className="text-2xl font-black">Complete Python Code</h2><pre className="mt-5 overflow-x-auto rounded-2xl bg-black p-5 text-sm leading-6"><code>{code}</code></pre></section>
  <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Viva questions</h2><ul className="mt-3 list-disc space-y-2 pl-5"><li>What are X and y?</li><li>Why is test data kept separate?</li><li>What does MAE tell us?</li><li>What does R² mean?</li><li>Why is a prediction not a guarantee?</li><li>What ethical issue could arise from using real student data?</li></ul></section>
 </div></main>;
}
