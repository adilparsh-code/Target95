/**
 * CBSE Computer Science (083) — Class XI and Class XII project packages.
 * Separate subject from CBSE AI 843; never mixed.
 */

export const CBSE_083_PROJECTS = [
  {
    slug: "student-performance-management-system",
    title: "Student Performance Management System",
    boardLabel: "CBSE Computer Science 083 · Class XI",
    classNumber: 11,
    subjectName: "Computer Science",
    status: "Guided project",
    type: "Coding + report",
    language: "Python",
    difficulty: "Intermediate",
    summary:
      "A complete, validated console application that stores student marks, computes totals/averages/grades, searches records, summarises the class and saves data to a file.",
    shortOutcome: "Build a validated Python app with dictionaries, lists, functions and file persistence.",
    academicNote:
      "Aligned with the CBSE Class XI Computer Science project work. Follow your school's instructions for the final report format.",
    problemStatement:
      "A teacher needs a reliable way to store each student's subject marks, compute totals, averages and grades, search for a student quickly and keep the data between runs. The program must validate every input (empty names, duplicate roll numbers, non-numeric or out-of-range marks) instead of crashing or storing bad data.",
    objectives: [
      "Model one student as a dictionary and the class as a dictionary of records.",
      "Compute total, average and grade with clearly separated functions.",
      "Validate results before writing them into the record.",
      "Search records and summarise class statistics.",
      "Persist data to a file so it survives between runs.",
    ],
    learningOutcomes: [
      "Use dictionaries, lists and functions together in one program.",
      "Write robust input validation instead of trusting user input.",
      "Apply the DRY principle by reusing a single summarise() function.",
      "Read and write JSON files in Python.",
      "Explain the logic and data structures in a viva.",
    ],
    requirements: {
      software: ["Python 3.10+"],
      libraries: ["Standard library only: json, os, sys"],
      data: ["The built-in demo data, or a students.json file created by the program"],
      hardware: ["Any laptop/desktop that runs Python"],
    },
    concepts: [
      "Dictionaries and nested data structures",
      "Functions and parameter passing",
      "Input validation and defensive programming",
      "Conditional grade logic",
      "File handling (JSON read/write)",
      "Menu-driven program design",
    ],
    algorithm: [
      "Load existing records from the data file if present.",
      "Validate a new record: name, roll number and marks.",
      "Store or reject the record and report the reason.",
      "Compute total, average and grade for each student.",
      "Print a formatted report and search for a roll number.",
      "Summarise the class (average and topper).",
      "Save all records back to disk on exit.",
    ],
    code: {
      language: "Python",
      filename: "student_performance_management_system.py",
      content: `"""
Student Performance Management System - CBSE Computer Science 083, Class XI
A complete, validated console application with file persistence.
Run with --demo for a scripted demo, or with no arguments for the interactive menu.
"""

import json
import os
import sys

DATA_FILE = "students.json"


def load_students():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_students(students):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(students, f, indent=2)


def is_valid_name(name):
    return isinstance(name, str) and name.strip() != ""


def is_valid_marks(marks):
    if len(marks) < 1:
        return False
    for m in marks:
        try:
            value = float(m)
        except (TypeError, ValueError):
            return False
        if value < 0 or value > 100:
            return False
    return True


def compute_grade(average):
    if average >= 75:
        return "A"
    if average >= 60:
        return "B"
    if average >= 50:
        return "C"
    return "D"


def summarise(marks):
    total = sum(marks)
    average = total / len(marks)
    return total, round(average, 2), compute_grade(average)


def add_student(students, roll, name, marks):
    if not is_valid_name(name):
        return "Error: name cannot be empty."
    if roll in students:
        return "Error: roll " + roll + " already exists."
    if not is_valid_marks(marks):
        return "Error: marks must be numbers between 0 and 100."
    students[roll] = {"name": name.strip(), "marks": [float(m) for m in marks]}
    return "Added " + name.strip() + " (Roll " + roll + ")."


def search_student(students, roll):
    return students.get(roll)


def class_summary(students):
    if not students:
        return "No students on record."
    averages = []
    topper = None
    for roll, data in students.items():
        _, avg, _ = summarise(data["marks"])
        averages.append(avg)
        if topper is None or avg > topper[1]:
            topper = (data["name"], avg)
    class_avg = round(sum(averages) / len(averages), 2)
    return "Class average: " + str(class_avg) + " | Topper: " + topper[0] + " (" + str(topper[1]) + ")"


def print_report(students):
    print("Roll   Name        Total   Average  Grade")
    print("-" * 46)
    for roll in sorted(students):
        data = students[roll]
        total, avg, grade = summarise(data["marks"])
        print(roll.ljust(6), data["name"].ljust(11), str(total).ljust(7), str(avg).ljust(8), grade)


def demo():
    students = {}
    print("=== Student Performance Management System (demo) ===")
    print(add_student(students, "101", "Aisha", [78, 84, 91]))
    print(add_student(students, "102", "Rahul", [65, 72, 69]))
    print(add_student(students, "103", "Sara", [92, 88, 95]))
    print(add_student(students, "101", "Duplicate", [50, 50, 50]))
    print(add_student(students, "104", "", [60, 60, 60]))
    print(add_student(students, "105", "Kabir", [54, 61, 120]))
    print()
    print_report(students)
    print()
    print(class_summary(students))
    print()
    print("Search 102:", search_student(students, "102"))
    print("Search 999:", search_student(students, "999"))


def main():
    students = load_students()
    while True:
        print("\\n1 Add  2 Report  3 Search  4 Summary  5 Save  6 Exit")
        choice = input("Choice: ").strip()
        if choice == "1":
            roll = input("Roll: ").strip()
            name = input("Name: ").strip()
            marks = input("Marks (space separated): ").split()
            print(add_student(students, roll, name, marks))
        elif choice == "2":
            print_report(students)
        elif choice == "3":
            roll = input("Roll: ").strip()
            record = search_student(students, roll)
            print(record if record else "Not found.")
        elif choice == "4":
            print(class_summary(students))
        elif choice == "5":
            save_students(students)
            print("Saved to " + DATA_FILE)
        elif choice == "6":
            save_students(students)
            print("Goodbye.")
            break
        else:
            print("Invalid choice.")


if __name__ == "__main__":
    if "--demo" in sys.argv:
        demo()
    else:
        main()
`,
    },
    setup: "No installation needed. Run: python student_performance_management_system.py --demo",
    codeExplanation: [
      "students is a dictionary keyed by roll number; each value is itself a dictionary of name and marks.",
      "is_valid_name and is_valid_marks centralise validation so every add goes through the same checks.",
      "summarise() is the single source of truth for total, average and grade (DRY principle).",
      "class_summary() reuses summarise() while scanning for the topper — one pass, no duplication.",
      "load_students()/save_students() use JSON so the class data survives between runs.",
      "demo() exercises the validation paths so the sample output shows both successes and errors.",
    ],
    sampleInput: "Run with --demo (no typing). In interactive mode you choose 1-6 and enter roll, name and marks.",
    sampleOutput: `=== Student Performance Management System (demo) ===
Added Aisha (Roll 101).
Added Rahul (Roll 102).
Added Sara (Roll 103).
Error: roll 101 already exists.
Error: name cannot be empty.
Error: marks must be numbers between 0 and 100.

Roll   Name        Total   Average  Grade
----------------------------------------------
101    Aisha       253.0   84.33    A
102    Rahul       206.0   68.67    B
103    Sara        275.0   91.67    A

Class average: 81.56 | Topper: Sara (91.67)

Search 102: {'name': 'Rahul', 'marks': [65.0, 72.0, 69.0]}
Search 999: None`,
    testCases: [
      { input: "Roll 101, Aisha, [78,84,91]", expected: "Added; average 84.33, grade A", note: "Normal success" },
      { input: "Roll 101 again", expected: "Error: roll 101 already exists.", note: "Duplicate roll" },
      { input: "Empty name", expected: "Error: name cannot be empty.", note: "Validation" },
      { input: "Marks [54,61,120]", expected: "Error: marks must be numbers between 0 and 100.", note: "Out-of-range mark" },
      { input: "Marks ['abc', 50]", expected: "Error: marks must be numbers between 0 and 100.", note: "Non-numeric mark" },
      { input: "Search roll 999", expected: "None (not found)", note: "Missing record" },
    ],
    edgeCases: [
      "Empty marks list — rejected before dividing by zero.",
      "Average exactly 75, 60 or 50 — verify the boundary grade (A/B/C).",
      "Name with only spaces — treated as empty after strip().",
      "A very long marks list — average still correct.",
      "students.json missing on first run — load_students() returns an empty dictionary instead of crashing.",
    ],
    reportFormat: [
      "1. Problem statement and objectives",
      "2. Requirements (software)",
      "3. Data structures used (dictionary of dictionaries)",
      "4. Algorithm and function list",
      "5. Source code",
      "6. Sample input and output",
      "7. Test cases and edge cases",
      "8. Limitations and future improvements",
    ],
    viva: [
      "Why use a dictionary for one student?",
      "Why is a list suitable for the marks?",
      "What happens if the marks list is empty, and how is it prevented?",
      "How would you add a subject-wise search?",
      "Why separate summarise() from print_report()?",
      "How does JSON persistence differ from saving to a text file?",
    ],
    extensions: [
      "Add a subject-wise report with per-subject class averages.",
      "Add a CSV export for spreadsheet use.",
      "Support editing and deleting records.",
      "Add a simple login so only the teacher can edit records.",
    ],
    syllabusMapping: [
      "Maps to CBSE Computer Science 083 Class XI: Python programming, lists, dictionaries, functions.",
      "Maps to file handling with Python.",
      "Maps to the project work expected in the CBSE practical assessment (projectWork).",
      "Supports computational-thinking and problem-decomposition outcomes.",
    ],
  },
  {
    slug: "library-management-analytics-system",
    title: "Library Management & Analytics System",
    boardLabel: "CBSE Computer Science 083 · Class XII",
    classNumber: 12,
    subjectName: "Computer Science",
    status: "Guided project",
    type: "Coding + report",
    language: "SQL + Python",
    difficulty: "Advanced",
    summary:
      "A complete relational database project: schema with primary and foreign keys, sample data, JOIN and aggregate queries, plus Python integration and analytics.",
    shortOutcome: "Design a normalised schema, query it with JOINs and aggregates, and analyse the results in Python.",
    academicNote:
      "Aligned with the CBSE Class XII Computer Science database project work. Uses SQLite so it runs with no server; the same SQL works in MySQL.",
    problemStatement:
      "A school library records books, members and issue records. The teacher wants answers to real questions: which books are currently issued, which books are never issued, how many times each member borrows, and what fraction of books are returned on time. Build the relational schema, load sample data, write the JOIN and aggregate queries, and add a Python layer that turns the query results into analytics.",
    objectives: [
      "Design normalised tables with primary keys and foreign keys.",
      "Insert realistic sample data.",
      "Write INNER JOIN, LEFT JOIN and GROUP BY aggregate queries.",
      "Run the queries from Python and process the results.",
      "Compute a derived analytics metric in Python.",
    ],
    learningOutcomes: [
      "Explain primary keys, foreign keys and referential integrity.",
      "Distinguish INNER JOIN from LEFT JOIN.",
      "Use GROUP BY with aggregate functions.",
      "Connect Python to a database and read query results.",
      "Present analytics derived from raw SQL output.",
    ],
    requirements: {
      software: ["Python 3.10+", "Any SQL tool (optional, for exploring the schema)"],
      libraries: ["sqlite3 (standard library). For MySQL, mysql-connector-python."],
      data: ["The built-in sample data inserted by the program"],
      hardware: ["Any laptop/desktop that runs Python"],
    },
    concepts: [
      "Relational model: tables, primary keys, foreign keys",
      "Normalisation and avoiding data duplication",
      "INNER JOIN and LEFT JOIN",
      "GROUP BY and aggregate functions (COUNT, SUM)",
      "Database connectivity from Python",
      "Derived metrics and analytics",
    ],
    algorithm: [
      "Create the books, members and issue_records tables.",
      "Insert sample books, members and issue records.",
      "Query all books with a simple SELECT.",
      "Use an INNER JOIN to list books currently issued.",
      "Use a LEFT JOIN to find books never issued.",
      "Use GROUP BY to count issues per member.",
      "Compute an on-time return rate in Python from the SQL result.",
    ],
    code: {
      language: "Python",
      filename: "library_management_analytics_system.py",
      content: `"""
Library Management & Analytics System - CBSE Computer Science 083, Class XII
SQL relational schema (SQLite) + JOIN/aggregate queries + Python analytics.

The SQLite database is created in memory so the project runs with no server.
"""

import sqlite3

SCHEMA = """
CREATE TABLE books (
    book_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT
);
CREATE TABLE members (
    member_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE TABLE issue_records (
    issue_id INTEGER PRIMARY KEY,
    book_id INTEGER,
    member_id INTEGER,
    issue_date TEXT,
    returned INTEGER DEFAULT 0,
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (member_id) REFERENCES members(member_id)
);
"""

SAMPLE_DATA = """
INSERT INTO books VALUES (1, 'Python Basics', 'A. Khan');
INSERT INTO books VALUES (2, 'Computer Networks', 'R. Singh');
INSERT INTO books VALUES (3, 'Data Science', 'S. Ali');
INSERT INTO books VALUES (4, 'Discrete Maths', 'P. Rao');
INSERT INTO members VALUES (11, 'Aisha');
INSERT INTO members VALUES (12, 'Rahul');
INSERT INTO members VALUES (13, 'Sara');
INSERT INTO issue_records VALUES (101, 1, 11, '2026-07-10', 1);
INSERT INTO issue_records VALUES (102, 3, 12, '2026-07-12', 0);
INSERT INTO issue_records VALUES (103, 1, 13, '2026-07-14', 0);
INSERT INTO issue_records VALUES (104, 2, 11, '2026-07-15', 1);
"""


def setup(conn):
    conn.executescript(SCHEMA)
    conn.executescript(SAMPLE_DATA)
    conn.commit()


def run(conn, title, sql):
    print()
    print("--- " + title + " ---")
    cur = conn.execute(sql)
    columns = [d[0] for d in cur.description]
    print(" | ".join(columns))
    for row in cur.fetchall():
        print(" | ".join(str(v) for v in row))


def main():
    conn = sqlite3.connect(":memory:")
    setup(conn)

    run(conn, "All books", "SELECT book_id, title, author FROM books ORDER BY book_id")

    run(conn, "INNER JOIN: currently issued books (not returned)",
        "SELECT b.title, m.name, i.issue_date "
        "FROM issue_records i "
        "JOIN books b ON b.book_id = i.book_id "
        "JOIN members m ON m.member_id = i.member_id "
        "WHERE i.returned = 0 "
        "ORDER BY i.issue_date")

    run(conn, "LEFT JOIN: books never issued",
        "SELECT b.title "
        "FROM books b "
        "LEFT JOIN issue_records i ON i.book_id = b.book_id "
        "WHERE i.book_id IS NULL")

    run(conn, "Aggregate: issues per member",
        "SELECT m.name, COUNT(i.issue_id) AS issues "
        "FROM members m "
        "JOIN issue_records i ON i.member_id = m.member_id "
        "GROUP BY m.name "
        "ORDER BY issues DESC, m.name")

    run(conn, "Aggregate: total issues / returned count",
        "SELECT COUNT(*) AS total, SUM(returned) AS returned_count FROM issue_records")

    cur = conn.execute(
        "SELECT m.name, COUNT(*) AS issues, SUM(i.returned) AS returned "
        "FROM issue_records i JOIN members m ON m.member_id = i.member_id "
        "GROUP BY m.name"
    )
    rows = cur.fetchall()
    print()
    print("--- On-time return rate (Python analytics) ---")
    rates = []
    for name, issues, returned in rows:
        rate = round(returned / issues * 100, 1)
        rates.append(rate)
        print(name + ": " + str(rate) + "%")
    print("Average on-time rate:", round(sum(rates) / len(rates), 1), "%")

    conn.close()


if __name__ == "__main__":
    main()
`,
    },
    setup: "No installation needed (sqlite3 is built in). Run: python library_management_analytics_system.py",
    codeExplanation: [
      "books and members are parent tables; issue_records references them through foreign keys.",
      "The INNER JOIN keeps only rows that match in both tables — currently issued books.",
      "The LEFT JOIN keeps every book and filters for the ones with no matching issue record.",
      "GROUP BY with COUNT() produces the issues-per-member table; SUM() totals the returns.",
      "Python then derives an on-time return rate that SQL alone would not present as a percentage.",
    ],
    sampleInput: "No input required — the program builds the database and prints every query result.",
    sampleOutput: `
--- All books ---
book_id | title | author
1 | Python Basics | A. Khan
2 | Computer Networks | R. Singh
3 | Data Science | S. Ali
4 | Discrete Maths | P. Rao

--- INNER JOIN: currently issued books (not returned) ---
title | name | issue_date
Data Science | Rahul | 2026-07-12
Python Basics | Sara | 2026-07-14

--- LEFT JOIN: books never issued ---
title
Discrete Maths

--- Aggregate: issues per member ---
name | issues
Aisha | 2
Rahul | 1
Sara | 1

--- Aggregate: total issues / returned count ---
total | returned_count
4 | 2

--- On-time return rate (Python analytics) ---
Aisha: 100.0%
Rahul: 0.0%
Sara: 0.0%
Average on-time rate: 33.3 %`,
    testCases: [
      { input: "All books query", expected: "4 rows (book_id 1-4)", note: "Basic SELECT" },
      { input: "INNER JOIN for unreturned books", expected: "2 rows (Data Science, Python Basics)", note: "JOIN + WHERE" },
      { input: "LEFT JOIN for never-issued books", expected: "Discrete Maths", note: "LEFT JOIN with IS NULL" },
      { input: "Issues per member", expected: "Aisha 2, Rahul 1, Sara 1", note: "GROUP BY" },
      { input: "Total issues / returned", expected: "4 / 2", note: "Aggregate" },
    ],
    edgeCases: [
      "A book with zero issue records must still appear in the LEFT JOIN result.",
      "SUM(returned) returns NULL for an empty table — guard with IFNULL/COALESCE in production.",
      "Deleting a book referenced by issue_records should be blocked by the foreign key.",
      "Duplicate member names must stay separate because member_id is the key.",
      "Division by zero is avoided because issues is always at least 1 when grouped from issue_records.",
    ],
    reportFormat: [
      "1. Problem statement and objectives",
      "2. Entity list and relationships (ER description)",
      "3. Schema with keys and data types",
      "4. Sample data",
      "5. Queries: SELECT, INNER JOIN, LEFT JOIN, GROUP BY",
      "6. Python integration",
      "7. Analytics and interpretation",
      "8. Execution instructions",
      "9. Test cases and edge cases",
      "10. Limitations and future scope",
    ],
    viva: [
      "What is a primary key, and why is book_id one?",
      "Why is a foreign key used in issue_records?",
      "What is the difference between INNER JOIN and LEFT JOIN?",
      "What does COUNT(*) count in the aggregate query?",
      "Why is the return rate computed in Python instead of SQL?",
      "What is a DataFrame, and how would Pandas simplify the analytics step?",
    ],
    extensions: [
      "Add a fine calculation for late returns using due dates.",
      "Add a members table view with the number of books currently held.",
      "Switch the schema to MySQL with mysql-connector-python.",
      "Load the query results into a Pandas DataFrame and plot a bar chart.",
    ],
    syllabusMapping: [
      "Maps to CBSE Computer Science 083 Class XII: database concepts, SQL, JOINs, aggregate functions.",
      "Maps to interface of Python with an SQL database (projectWork assessment).",
      "Maps to data handling and visualisation expectations.",
      "Supports the CBSE practical assessment structure (Java/SQL/practical file/viva).",
    ],
  },
];
