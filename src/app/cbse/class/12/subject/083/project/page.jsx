import Link from 'next/link';

const sql = `CREATE DATABASE school_library;
USE school_library;

CREATE TABLE books (
    book_id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100),
    available BOOLEAN DEFAULT TRUE
);

CREATE TABLE issue_record (
    issue_id INT PRIMARY KEY,
    book_id INT,
    student_name VARCHAR(100),
    issue_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

INSERT INTO books VALUES
(1, 'Python Basics', 'A. Khan', TRUE),
(2, 'Computer Networks', 'R. Singh', TRUE),
(3, 'Data Science', 'S. Ali', TRUE);

INSERT INTO issue_record VALUES
(101, 1, 'Aisha', '2026-07-10'),
(102, 3, 'Rahul', '2026-07-12');

SELECT b.title, b.author, i.student_name, i.issue_date
FROM books b
JOIN issue_record i ON b.book_id = i.book_id;

SELECT b.title
FROM books b
LEFT JOIN issue_record i ON b.book_id = i.book_id
WHERE i.book_id IS NULL;

SELECT COUNT(*) AS total_books FROM books;
`;

const python = `import pandas as pd

data = {
    "Student": ["Aisha", "Rahul", "Sara", "Kabir"],
    "BooksIssued": [4, 2, 6, 1],
    "ReturnedOnTime": [4, 1, 5, 1]
}

df = pd.DataFrame(data)
df["OnTimeRate"] = (df["ReturnedOnTime"] / df["BooksIssued"] * 100).round(2)

print(df)
print("\\nAverage on-time rate:", df["OnTimeRate"].mean())
`;

export default function CBSECSClassXIIProject() {
 return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white"><div className="mx-auto max-w-6xl">
  <Link href="/cbse/class/12/subject/083" className="text-sm font-semibold">← Back to CBSE Computer Science XII</Link>
  <header className="mt-6 rounded-3xl bg-gradient-to-br from-indigo-700 to-violet-900 p-8 text-white"><p className="text-sm font-bold uppercase tracking-widest text-indigo-200">CBSE Computer Science 083 · Class XII</p><h1 className="mt-2 text-4xl font-black">Library Management &amp; Analytics System</h1><p className="mt-4 max-w-4xl text-indigo-100">A complete project combining Python/Pandas data handling with a relational SQL database and joins/aggregation.</p></header>
  <section className="mt-8 grid gap-6 md:grid-cols-2"><article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Database design</h2><p className="mt-3 leading-7">Books and issue records are stored in related tables. The project demonstrates primary keys, foreign keys, INSERT, SELECT, JOIN and aggregate queries.</p></article><article className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Python analytics</h2><p className="mt-3 leading-7">Pandas is used to calculate an on-time return rate and summarise the dataset.</p></article></section>
  <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-slate-100"><h2 className="text-2xl font-black">Complete SQL Code</h2><pre className="mt-5 overflow-x-auto rounded-2xl bg-black p-5 text-sm leading-6"><code>{sql}</code></pre></section>
  <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-slate-100"><h2 className="text-2xl font-black">Complete Python Code</h2><pre className="mt-5 overflow-x-auto rounded-2xl bg-black p-5 text-sm leading-6"><code>{python}</code></pre></section>
  <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"><h2 className="text-2xl font-black">Viva</h2><ul className="mt-3 list-disc space-y-2 pl-5"><li>What is a primary key?</li><li>Why is a foreign key used?</li><li>What does an INNER JOIN do?</li><li>Why use COUNT()?</li><li>What is a Pandas DataFrame?</li></ul></section>
 </div></main>;
}
