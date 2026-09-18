/**
 * ISC Artificial Intelligence (883) · Class XI — full project packages.
 *
 * Each object matches the schema rendered by
 * src/components/projects/ProjectView.jsx (18-section student package) and is
 * consumed by src/app/data/projects/index.js under the "isc-ai-11" group.
 *
 * Every project ships complete, runnable Python, the real printed output,
 * test cases, edge cases, report structure, viva prep and syllabus mapping.
 */

export const ISC_AI_XI_PROJECTS_FULL = [
  {
    slug: "ai-problem-investigation",
    title: "AI Problem Investigation",
    boardLabel: "ISC AI 883 · Class XI",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Coding + report",
    language: "Python",
    difficulty: "Beginner",
    summary:
      "A decision-support study that turns everyday school records into a transparent rule-based model which flags students who may need academic support, then explains the flags in a written report.",
    shortOutcome:
      "Build a rule-based model that flags students needing academic support from attendance, scores and assignment data.",
    problemStatement:
      "A class teacher has a spreadsheet of student records but not enough time to read every row. The school wants an early-warning system that points to the students who may need academic support, so help can arrive before exams rather than after. Because the decision affects real people, the system must be transparent: every flag must be explainable from the recorded data, and the program must never be treated as a punishment or a final judgement. Your task is to frame this as an AI problem investigation, define the inputs and the decision rule, build the tool, and report both the results and the ethical limits of using it.",
    objectives: [
      "Frame a real school need as an AI/decision-support problem and state the inputs and the output clearly.",
      "Load and organise student records with the pandas library.",
      "Design a transparent, rule-based support score that a Class XI student can justify in a viva.",
      "Apply the rule to every record and flag students whose support score crosses a threshold.",
      "Summarise findings with counts and averages, and save one chart as visual evidence.",
      "Discuss why an explainable rule is preferable to a black-box model for this sensitive decision.",
    ],
    learningOutcomes: [
      "Explain what an AI problem investigation is and why defining the problem comes before coding.",
      "Create a pandas DataFrame from Python dictionaries and compute a column with apply().",
      "Write clear if/elif decision rules and tune a threshold to control false alarms.",
      "Produce a short written report that connects data evidence to a responsible recommendation.",
    ],
    requirements: {
      software: [
        "Python 3.10 or newer",
        "VS Code, Thonny or another editor",
        "A terminal (PowerShell, Command Prompt or the VS Code terminal)",
      ],
      libraries: [
        "pandas (for tabular data)",
        "matplotlib (for the summary chart)",
      ],
      data: [
        "A small student dataset: name, attendance percent, average score, assignments completed.",
        "This project uses 10 built-in sample records; a real study can read the same columns from a CSV.",
      ],
      hardware: [
        "Any laptop or desktop that runs Python",
        "About 200 MB of free disk space and no special GPU",
      ],
    },
    concepts: [
      "AI problem framing and problem definition",
      "Data collection and data quality (missing, wrong or duplicated records)",
      "Decision support versus fully automated decisions",
      "Rule-based classification and thresholds",
      "Explainable AI: every flag must be traceable to the data",
      "Data ethics: consent, privacy and avoiding unfair labelling",
    ],
    algorithm: [
      "State the problem: identify students who may need academic support, using only attendance, average score and assignments completed.",
      "Collect the records into a table with one row per student.",
      "Define a transparent support score: add points for low attendance, low average score and few completed assignments, with a heavier weight for the most serious cases.",
      "Compute the support score for every student and store it as a new column.",
      "Apply the decision threshold: flag a student as needing support when the score is 3 or more.",
      "Sort the table so the highest-risk students appear first and print the decision-support report.",
      "Summarise the findings with totals and averages for the written report.",
      "Draw a horizontal bar chart of support scores and save it as evidence.",
      "Interpret the results, note the ethical limits, and recommend that flags be confirmed by a teacher before any action.",
    ],
    code: {
      language: "Python",
      filename: "support_flags.py",
      content: `"""
Project 1: AI Problem Investigation
ISC Artificial Intelligence (883) - Class XI
Flags students who may need academic support using attendance,
average score and assignment-submission data.
"""

import pandas as pd
import matplotlib.pyplot as plt

# ------------------------------------------------------------------
# 1. The dataset. In a real investigation this would be read from a
#    CSV exported by the school, e.g. pd.read_csv("students.csv").
# ------------------------------------------------------------------
records = [
    {"name": "Aarav",  "attendance_pct": 92, "avg_score": 78, "assignments_done": 9},
    {"name": "Diya",   "attendance_pct": 68, "avg_score": 41, "assignments_done": 4},
    {"name": "Kabir",  "attendance_pct": 85, "avg_score": 55, "assignments_done": 6},
    {"name": "Meera",  "attendance_pct": 74, "avg_score": 48, "assignments_done": 5},
    {"name": "Rohan",  "attendance_pct": 96, "avg_score": 88, "assignments_done": 10},
    {"name": "Sana",   "attendance_pct": 61, "avg_score": 35, "assignments_done": 3},
    {"name": "Vihaan", "attendance_pct": 88, "avg_score": 71, "assignments_done": 8},
    {"name": "Ananya", "attendance_pct": 79, "avg_score": 62, "assignments_done": 7},
    {"name": "Ishaan", "attendance_pct": 55, "avg_score": 52, "assignments_done": 6},
    {"name": "Neha",   "attendance_pct": 90, "avg_score": 66, "assignments_done": 5},
]

df = pd.DataFrame(records)

# ------------------------------------------------------------------
# 2. A transparent rule-based "support score".
#    Low attendance, low average score and few assignments each add
#    risk points. A rule-based model is used first because a Class XI
#    student can defend every number in the viva.
# ------------------------------------------------------------------
def support_score(row):
    score = 0
    if row["attendance_pct"] < 75:
        score += 2
    elif row["attendance_pct"] < 85:
        score += 1
    if row["avg_score"] < 50:
        score += 2
    elif row["avg_score"] < 65:
        score += 1
    if row["assignments_done"] < 5:
        score += 2
    elif row["assignments_done"] < 8:
        score += 1
    return score

df["support_score"] = df.apply(support_score, axis=1)
df["needs_support"] = df["support_score"] >= 3

# Highest risk first; ties broken alphabetically for a stable report.
df = df.sort_values(by=["support_score", "name"], ascending=[False, True])
df = df.reset_index(drop=True)

# ------------------------------------------------------------------
# 3. Print the decision-support report.
# ------------------------------------------------------------------
print("AI Problem Investigation - Academic Support Flags")
print("=" * 62)
print(f'{"Student":<10}{"Attend%":>9}{"Score":>8}{"Assign":>8}{"Risk":>6}  Flag')
print("-" * 62)
for _, r in df.iterrows():
    flag = "SUPPORT" if r["needs_support"] else "ok"
    print(f'{r["name"]:<10}{r["attendance_pct"]:>9}{r["avg_score"]:>8}{r["assignments_done"]:>8}{r["support_score"]:>6}  {flag}')
print("-" * 62)

flagged = df[df["needs_support"]]
print(f'Students flagged for support: {len(flagged)} of {len(df)}')
print("Flagged students:", ", ".join(flagged["name"].tolist()))
print(f'Average attendance overall : {df["attendance_pct"].mean():.1f}%')
print(f'Average score overall      : {df["avg_score"].mean():.1f}')
print(f'Average attendance flagged : {flagged["attendance_pct"].mean():.1f}%')

# ------------------------------------------------------------------
# 4. A quick chart so the report has a visual summary.
# ------------------------------------------------------------------
fig, ax = plt.subplots(figsize=(7, 4))
colors = ["#d9534f" if s >= 3 else "#5bc0de" for s in df["support_score"]]
ax.barh(df["name"], df["support_score"], color=colors)
ax.set_xlabel("Support score (higher means more risk)")
ax.set_title("Students needing academic support")
ax.invert_yaxis()
fig.tight_layout()
fig.savefig("support_flags.png", dpi=120)
print("Chart saved to support_flags.png")`,
    },
    setup: "pip install pandas matplotlib  (then run: python support_flags.py)",
    codeExplanation: [
      "The triple-quoted string at the top is the module docstring; it states the project, the board and the exact question being investigated.",
      "records is a list of dictionaries, one per student. pandas converts it into a DataFrame where each key becomes a column, which is the easiest format for a beginner to type and read.",
      "The support_score function reads one row and returns an integer. Each of the three signals can add 0, 1 or 2 points, giving a possible range of 0 to 6. The 'most serious' band adds 2 points and the 'borderline' band adds 1.",
      "df.apply(support_score, axis=1) runs that function once per row (axis=1 means 'row-wise') and stores the result in a new column called support_score.",
      "df['needs_support'] = df['support_score'] >= 3 turns the numeric score into a boolean flag; the threshold 3 is a deliberate design choice that can be tuned.",
      "sort_values(by=['support_score', 'name'], ascending=[False, True]) puts the highest-risk students first and breaks ties alphabetically so the report is stable every time it runs.",
      "The f-string in the header pads each column to a fixed width (for example {name:<10} is left-aligned in 10 characters, {:>6} is right-aligned in 6), which is what aligns the table.",
      "df.iterrows() loops over the sorted rows; each r is one student, and the flag column prints SUPPORT or ok based on needs_support.",
      "The final block builds a horizontal bar chart, colours flagged students red and safe students blue with a list comprehension, and saves the image as support_flags.png.",
    ],
    sampleInput:
      "No typing needed: the 10 student records are built into the program as the 'records' list. To use real data, replace them with df = pd.read_csv(\"students.csv\") where the CSV has the columns name, attendance_pct, avg_score, assignments_done.",
    sampleOutput: `AI Problem Investigation - Academic Support Flags
==============================================================
Student     Attend%   Score  Assign  Risk  Flag
--------------------------------------------------------------
Diya             68      41       4     6  SUPPORT
Sana             61      35       3     6  SUPPORT
Meera            74      48       5     5  SUPPORT
Ishaan           55      52       6     4  SUPPORT
Ananya           79      62       7     3  SUPPORT
Kabir            85      55       6     2  ok
Neha             90      66       5     1  ok
Aarav            92      78       9     0  ok
Rohan            96      88      10     0  ok
Vihaan           88      71       8     0  ok
--------------------------------------------------------------
Students flagged for support: 5 of 10
Flagged students: Diya, Sana, Meera, Ishaan, Ananya
Average attendance overall : 78.8%
Average score overall      : 59.6
Average attendance flagged : 67.4%
Chart saved to support_flags.png`,
    testCases: [
      {
        input: "A student with attendance 95%, score 85, 9 assignments",
        expected: "support_score 0, flag ok",
        note: "All three signals are healthy, so no points are added.",
      },
      {
        input: "A student with attendance 70%, score 45, 3 assignments",
        expected: "support_score 6, flag SUPPORT",
        note: "Every signal is in the serious band (2 + 2 + 2).",
      },
      {
        input: "A student on the border: attendance 80%, score 60, 7 assignments",
        expected: "support_score 3, flag SUPPORT",
        note: "Three borderline bands (1 + 1 + 1) reach the threshold exactly.",
      },
      {
        input: "Threshold moved from 3 to 4",
        expected: "Ananya drops out of the flagged list",
        note: "Shows how the threshold controls how strict the early-warning system is.",
      },
    ],
    edgeCases: [
      "Missing values: if a cell is empty, pandas stores NaN and the comparisons silently fail, so call df = df.dropna() before scoring.",
      "Wrong data types: attendance typed as text (\"92%\") cannot be compared with a number; convert with pd.to_numeric() first.",
      "Duplicate students: a repeated record inflates all averages; remove them with df = df.drop_duplicates().",
      "Empty dataset: every average becomes NaN, so guard against a zero-row table before printing percentages.",
      "A single-value column: standard deviation and correlation are meaningless with no variation, so note this rather than trusting the number.",
      "A flag is a prompt for a human conversation, never an automatic negative label on a student.",
    ],
    reportFormat: [
      "Title page: project name, board and subject, class, your name, roll number and school.",
      "Aim: one or two lines stating what the investigation sets out to find.",
      "Problem definition: the school need, the inputs used and the decision the tool supports.",
      "Data description: the columns, the source and the number of records, with data-quality checks listed.",
      "Method: the support-score rule, why each weight was chosen, and the chosen threshold.",
      "Code listing: the full support_flags.py program with brief comments.",
      "Output: the printed report table and the saved chart image.",
      "Interpretation: which students were flagged, the averages, and what the pattern suggests.",
      "Ethics section: privacy, consent, the risk of unfair labelling and the human-in-the-loop rule.",
      "Conclusion and future scope: what worked, the limitations and how the tool could improve.",
    ],
    viva: [
      "What is an AI problem investigation and why does defining the problem matter before coding?",
      "Why was a rule-based model chosen instead of a machine-learning model for this task?",
      "How does each line of the support_score function add points, and what is the maximum possible score?",
      "What does axis=1 mean in df.apply()?",
      "Why is the data sorted by support_score and then by name?",
      "What happens to the flagged list if you change the threshold from 3 to 4, and why might that be better?",
      "Why is a decision-support tool safer than a fully automatic decision for a sensitive topic?",
      "Name two data-quality problems a real school export might contain and how you would fix them.",
    ],
    extensions: [
      "Read the records from a real CSV with pd.read_csv() and validate the columns before scoring.",
      "Add a fourth signal, such as number of topics revised, and justify its weight.",
      "Swap the rule for a weighted formula with decimal weights and compare the flagged lists.",
      "Add a helper column that prints the specific reason a student was flagged (for example 'low attendance').",
      "Let the teacher set the threshold from an input() prompt and re-run the report.",
      "Export the final table to CSV with df.to_csv('support_report.csv', index=False) for the teacher.",
    ],
    syllabusMapping: [
      "Maps to ISC AI 883 Class XI unit: Introduction to Artificial Intelligence - problem solving and AI project framing.",
      "Maps to ISC AI 883 Class XI unit: Data and Data Science - collecting, organising and inspecting a dataset.",
      "Maps to ISC AI 883 Class XI unit: AI Project Cycle - Problem Scoping, Data Acquisition and Data Exploration.",
      "Maps to ISC AI 883 Class XI unit: Introduction to Python - data types, conditionals, loops, functions and f-strings.",
      "Maps to ISC AI 883 Class XI unit: Data Visualisation - using matplotlib to present evidence.",
      "Maps to ISC AI 883 Class XI unit: Ethics and AI - responsible use of data about people.",
    ],
  },

  {
    slug: "data-visualization-study",
    title: "Data Visualization Study",
    boardLabel: "ISC AI 883 · Class XI",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Coding + report",
    language: "Python",
    difficulty: "Beginner",
    summary:
      "A hands-on study that cleans a small, messy survey dataset and then answers four different questions with four different charts - bar, histogram, scatter and pie - while learning how charts can mislead.",
    shortOutcome:
      "Clean a small survey dataset and choose the right chart (bar, histogram, scatter, pie) to answer a question honestly.",
    problemStatement:
      "Anyone can plot a graph, but a chart only has value if it answers a real question and tells the truth. You will collect a small dataset from your own class (study hours, sleep hours, marks and favourite subject), clean it because real data is always messy, and then build four charts. Each chart must match its purpose: a bar chart to compare categories, a histogram to show a distribution, a scatter plot to show a relationship, and a pie chart to show shares. Finally you must explain what each chart reveals and describe at least three ways a careless chart can mislead a reader.",
    objectives: [
      "Collect a small, honest dataset from a real source such as a class survey.",
      "Detect and fix common data problems: duplicates, missing values and impossible values.",
      "Choose the correct chart type for the question being asked.",
      "Build a bar chart, a histogram, a scatter plot and a pie chart with matplotlib.",
      "Read and interpret each chart in plain language.",
      "Identify common ways charts mislead and explain how to avoid them.",
    ],
    learningOutcomes: [
      "Load survey data into a pandas DataFrame and clean it step by step.",
      "Compute and interpret simple descriptive statistics such as mean, maximum and correlation.",
      "Select an appropriate chart for a given analytical question.",
      "Write an interpretation that separates what a chart shows from what it does not prove.",
    ],
    requirements: {
      software: [
        "Python 3.10 or newer",
        "VS Code, Thonny or another editor",
        "A terminal (PowerShell, Command Prompt or the VS Code terminal)",
      ],
      libraries: [
        "pandas (for loading and cleaning the data)",
        "matplotlib (for the four charts)",
      ],
      data: [
        "A class survey of around 10 students: student name, study hours per day, sleep hours per day, marks and favourite subject.",
        "This project uses a built-in sample that deliberately contains one duplicate, one missing value and one impossible value.",
      ],
      hardware: [
        "Any laptop or desktop that runs Python",
        "A screen large enough to view the saved chart images",
      ],
    },
    concepts: [
      "Data collection and survey design",
      "Data cleaning: de-duplication, handling missing values, range checks",
      "Descriptive statistics: mean, minimum, maximum and correlation",
      "Chart selection: bar, histogram, scatter and pie",
      "Reading a distribution versus reading a relationship",
      "Misleading visualisation: truncated axes, wrong chart type and small samples",
    ],
    algorithm: [
      "Collect the survey data and store each response as a dictionary with the same keys.",
      "Build a pandas DataFrame from the responses.",
      "Clean the data: remove duplicate rows, remove rows with missing values, and remove impossible values such as sleep hours above 24.",
      "Print a cleaning report so the number of removed rows is visible and honest.",
      "Compute and print basic statistics: mean study hours, mean sleep hours, mean marks, highest and lowest marks, and the correlation between study hours and marks.",
      "Draw a bar chart to compare how many students chose each favourite subject.",
      "Draw a histogram to show how marks are distributed.",
      "Draw a scatter plot to show the relationship between study hours and marks.",
      "Draw a pie chart to show the share of each favourite subject.",
      "Save all four charts as image files and write an interpretation that includes a warning about misleading charts.",
    ],
    code: {
      language: "Python",
      filename: "visualization_study.py",
      content: `"""
Project 2: Data Visualization Study
ISC Artificial Intelligence (883) - Class XI
Collects a small survey dataset, cleans it, draws four meaningful
charts (bar, histogram, scatter, pie) and prints an interpretation.
"""

import pandas as pd
import matplotlib.pyplot as plt

# ------------------------------------------------------------------
# 1. Raw survey data, exactly as it might be typed in from a form.
#    Note the deliberate data-quality problems we will fix later:
#    a missing value, a duplicate student, and an impossible value.
# ------------------------------------------------------------------
raw = [
    {"student": "Aarav",  "study_hours": 2.0, "sleep_hours": 7.0, "marks": 62.0, "favourite_subject": "Maths"},
    {"student": "Diya",   "study_hours": 3.5, "sleep_hours": 6.5, "marks": 74.0, "favourite_subject": "Science"},
    {"student": "Kabir",  "study_hours": 1.0, "sleep_hours": 8.0, "marks": 48.0, "favourite_subject": "English"},
    {"student": "Meera",  "study_hours": 4.0, "sleep_hours": 6.0, "marks": 85.0, "favourite_subject": "Maths"},
    {"student": "Rohan",  "study_hours": 2.5, "sleep_hours": 7.5, "marks": 58.0, "favourite_subject": "Computer"},
    {"student": "Sana",   "study_hours": 3.0, "sleep_hours": 99.0, "marks": 70.0, "favourite_subject": "Science"},
    {"student": "Vihaan", "study_hours": 3.5, "sleep_hours": 7.0, "marks": 76.0, "favourite_subject": "Computer"},
    {"student": "Ananya", "study_hours": 4.5, "sleep_hours": 6.5, "marks": 91.0, "favourite_subject": "Maths"},
    {"student": "Ishaan", "study_hours": 1.5, "sleep_hours": 7.0, "marks": 52.0, "favourite_subject": "English"},
    {"student": "Neha",   "study_hours": 2.0, "sleep_hours": None, "marks": 60.0, "favourite_subject": "Science"},
    {"student": "Aarav",  "study_hours": 2.0, "sleep_hours": 7.0, "marks": 62.0, "favourite_subject": "Maths"},
]

df = pd.DataFrame(raw)

# ------------------------------------------------------------------
# 2. Clean the data.
# ------------------------------------------------------------------
print("Data Visualization Study - Cleaning report")
print("=" * 46)
print(f"Rows before cleaning: {len(df)}")

# 2a. Drop exact duplicate rows.
df = df.drop_duplicates()
print(f"After removing duplicates: {len(df)}")

# 2b. Drop rows with missing (NaN) values.
df = df.dropna()
print(f"After removing missing values: {len(df)}")

# 2c. Remove impossible sleep values (a day has only 24 hours).
df = df[df["sleep_hours"].between(0, 24)]
print(f"After removing impossible sleep values: {len(df)}")
print(f"Rows ready for analysis: {len(df)}")
print("-" * 46)

# ------------------------------------------------------------------
# 3. Print a small numeric summary.
# ------------------------------------------------------------------
print("Descriptive summary")
print(f'Mean study hours : {df["study_hours"].mean():.2f}')
print(f'Mean sleep hours : {df["sleep_hours"].mean():.2f}')
print(f'Mean marks       : {df["marks"].mean():.2f}')
print(f'Highest marks    : {df["marks"].max():.0f}')
print(f'Lowest marks     : {df["marks"].min():.0f}')
print(f'Correlation study_hours vs marks: {df["study_hours"].corr(df["marks"]):.3f}')
print("-" * 46)

# ------------------------------------------------------------------
# 4. Four charts. Each one answers a different question.
# ------------------------------------------------------------------
# 4a. BAR chart - comparing one category value across subjects.
subject_counts = df["favourite_subject"].value_counts().sort_index()
fig, ax = plt.subplots(figsize=(6, 4))
ax.bar(subject_counts.index, subject_counts.values, color="#4c72b0")
ax.set_title("Favourite subjects in the class")
ax.set_ylabel("Number of students")
fig.tight_layout()
fig.savefig("chart_bar.png", dpi=120)

# 4b. HISTOGRAM - distribution of one numeric variable.
fig, ax = plt.subplots(figsize=(6, 4))
ax.hist(df["marks"], bins=5, color="#55a868", edgecolor="white")
ax.set_title("Distribution of marks")
ax.set_xlabel("Marks")
ax.set_ylabel("Frequency")
fig.tight_layout()
fig.savefig("chart_hist.png", dpi=120)

# 4c. SCATTER - relationship between two numeric variables.
fig, ax = plt.subplots(figsize=(6, 4))
ax.scatter(df["study_hours"], df["marks"], color="#c44e52")
ax.set_title("Study hours vs marks")
ax.set_xlabel("Study hours per day")
ax.set_ylabel("Marks")
fig.tight_layout()
fig.savefig("chart_scatter.png", dpi=120)

# 4d. PIE chart - share of each category.
fig, ax = plt.subplots(figsize=(6, 4))
ax.pie(subject_counts.values, labels=subject_counts.index, autopct="%1.1f%%", startangle=90)
ax.set_title("Share of favourite subjects")
fig.tight_layout()
fig.savefig("chart_pie.png", dpi=120)

print("Charts saved: chart_bar.png, chart_hist.png, chart_scatter.png, chart_pie.png")
print()
print("Interpretation")
print("1. The bar and pie charts show which subjects the class enjoys most.")
print("2. The histogram shows marks are spread, not clustered at one value.")
print("3. The scatter plot shows a strong positive link between study hours and marks.")
print("4. Reminder: a chart can mislead if the y-axis is cut, if slices do not sum")
print("   to 100%, or if very few points are used to claim a trend.")`,
    },
    setup: "pip install pandas matplotlib  (then run: python visualization_study.py)",
    codeExplanation: [
      "raw is a list of dictionaries; each dictionary is one survey response. Deliberate errors are included: the last Aarav row is a duplicate, Neha's sleep_hours is None, and Sana's sleep_hours is 99.",
      "pd.DataFrame(raw) turns the responses into a table with columns student, study_hours, sleep_hours, marks and favourite_subject.",
      "The cleaning block prints a report after each step. drop_duplicates() removes the repeated Aarav row, dropna() removes Neha's row because a value is missing, and between(0, 24) removes Sana's impossible 99 hours.",
      "The cleaning report is printed, not hidden, so the reader can see exactly how the dataset shrank from 11 rows to 8 - this is honest reporting.",
      "The descriptive summary uses .mean(), .max(), .min() and .corr(). The correlation between study hours and marks is about 0.978, which indicates a strong positive linear relationship.",
      "value_counts().sort_index() counts how many students chose each favourite subject and sorts the labels alphabetically, so the bar and pie charts share a sensible order.",
      "The BAR chart uses ax.bar(categories, counts) because it compares a number across categories.",
      "The HISTOGRAM uses ax.hist(values, bins=5) because it shows the distribution (spread) of one numeric column, not separate categories.",
      "The SCATTER plot uses ax.scatter(x, y) because it shows the relationship between two numeric columns, one on each axis.",
      "The PIE chart uses ax.pie(values, labels=..., autopct='%1.1f%%') because it shows each category's share of the whole. Each figure is saved with fig.savefig() so it can go straight into the report.",
    ],
    sampleInput:
      "No typing needed: the survey rows are built into the program in the 'raw' list (11 rows with 1 duplicate, 1 missing value and 1 impossible value). To use your own class data, replace 'raw' with df = pd.read_csv(\"survey.csv\").",
    sampleOutput: `Data Visualization Study - Cleaning report
==============================================
Rows before cleaning: 11
After removing duplicates: 10
After removing missing values: 9
After removing impossible sleep values: 8
Rows ready for analysis: 8
----------------------------------------------
Descriptive summary
Mean study hours : 2.81
Mean sleep hours : 6.94
Mean marks       : 68.25
Highest marks    : 91
Lowest marks     : 48
Correlation study_hours vs marks: 0.978
----------------------------------------------
Charts saved: chart_bar.png, chart_hist.png, chart_scatter.png, chart_pie.png

Interpretation
1. The bar and pie charts show which subjects the class enjoys most.
2. The histogram shows marks are spread, not clustered at one value.
3. The scatter plot shows a strong positive link between study hours and marks.
4. Reminder: a chart can mislead if the y-axis is cut, if slices do not sum
   to 100%, or if very few points are used to claim a trend.`,
    testCases: [
      {
        input: "The full raw list of 11 rows",
        expected: "Rows before cleaning: 11",
        note: "Confirms the data was loaded before any cleaning.",
      },
      {
        input: "One duplicated Aarav row",
        expected: "After removing duplicates: 10",
        note: "drop_duplicates() removes the exact repeat.",
      },
      {
        input: "Neha's sleep_hours = None",
        expected: "After removing missing values: 9",
        note: "dropna() removes the row with the missing value.",
      },
      {
        input: "Sana's sleep_hours = 99",
        expected: "After removing impossible sleep values: 8",
        note: "The between(0, 24) range check catches the impossible value.",
      },
      {
        input: "Correlation between study_hours and marks",
        expected: "0.978",
        note: "A strong positive correlation, shown clearly in the scatter plot.",
      },
    ],
    edgeCases: [
      "A category with only one student makes the pie chart look decisive when it is not; always report the sample size.",
      "An empty DataFrame after cleaning produces empty charts; check that at least a few rows remain before plotting.",
      "Non-numeric text in a numeric column (for example 'seven') breaks the mean; validate column types after loading.",
      "A histogram's shape depends on the number of bins; try bins=4 and bins=8 to show the reader it is a choice.",
      "Pie charts stop being readable beyond about five or six slices; group small slices into 'Other'.",
      "Correlation does not prove cause and effect, no matter how convincing the scatter plot looks.",
    ],
    reportFormat: [
      "Title page: project name, board and subject, class, your name, roll number and school.",
      "Aim: what the visualisation study sets out to show.",
      "Data collection: how the survey was designed, who took part, and the columns recorded.",
      "Data cleaning: each problem found and the fix applied, with the row counts before and after.",
      "Method: the statistics computed and the reason each chart type was chosen.",
      "Charts: the bar, histogram, scatter and pie images, each with a one-line caption.",
      "Interpretation: what each chart reveals, written in plain language.",
      "Misleading-charts section: at least three traps and how your charts avoid them.",
      "Conclusion and future scope: what you learned and how a larger sample would help.",
    ],
    viva: [
      "Why must data be cleaned before it is visualised?",
      "What is the difference between a bar chart and a histogram?",
      "When would you use a scatter plot instead of a bar chart?",
      "What does a correlation of 0.978 between study hours and marks tell you, and what does it NOT tell you?",
      "How many rows did the dataset lose during cleaning, and why?",
      "Why can a pie chart be a poor choice when there are many small categories?",
      "Describe two ways a chart can mislead a reader even if every number is correct.",
      "Why is it important to report the sample size alongside a chart?",
    ],
    extensions: [
      "Collect data from two classes and compare them side by side on the same chart.",
      "Add a box plot to summarise the spread of marks with a median and quartiles.",
      "Group sleep hours into bands ('under 6', '6-7', 'over 7') and compare average marks per band.",
      "Add data labels to the bar chart and adjust the colours for better contrast.",
      "Normalise the pie chart so readers can easily see the largest share.",
      "Save a single figure with all four charts using plt.subplots(2, 2) for a one-page report.",
    ],
    syllabusMapping: [
      "Maps to ISC AI 883 Class XI unit: Data and Data Science - data collection and preparation.",
      "Maps to ISC AI 883 Class XI unit: AI Project Cycle - Data Acquisition and Data Exploration.",
      "Maps to ISC AI 883 Class XI unit: Data Visualisation - choosing and building the right chart.",
      "Maps to ISC AI 883 Class XI unit: Introduction to Python - lists, dictionaries, conditionals and importing libraries.",
      "Maps to ISC AI 883 Class XI unit: Descriptive Statistics - mean, maximum, minimum and correlation.",
      "Maps to ISC AI 883 Class XI unit: Ethics and AI - presenting data honestly and avoiding misleading graphs.",
    ],
  },

  {
    slug: "simple-linear-regression",
    title: "Simple Linear Regression",
    boardLabel: "ISC AI 883 · Class XI",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Coding + report",
    language: "Python",
    difficulty: "Intermediate",
    summary:
      "Build a simple linear regression (y = a + bX) from scratch with the least-squares formulas, evaluate it with R-squared and MAE, and discuss carefully why correlation is not causation.",
    shortOutcome:
      "Fit a line of best fit y = a + bX in Python, measure R-squared and MAE, and explain the model's limits.",
    problemStatement:
      "Suppose you want to predict a student's marks from the hours they study. A straight line, y = a + bX, is the simplest model that can do this. Your task is to build that line yourself, without hiding the maths inside a library, so you understand exactly where the slope and intercept come from. Then you must measure how well the line fits using R-squared and the mean absolute error (MAE), predict the marks for a few study-hour values, and write an honest discussion of limitations - in particular why a high correlation does not prove that studying causes higher marks.",
    objectives: [
      "Explain the idea of a line of best fit for two numeric variables.",
      "Derive and compute the slope (b) and intercept (a) using the least-squares formulas.",
      "Form the prediction equation y = a + bX and use it to predict values.",
      "Evaluate fit quality with R-squared and the mean absolute error (MAE).",
      "Plot the data points and the fitted line together.",
      "Discuss correlation versus causation and the limits of a simple model.",
    ],
    learningOutcomes: [
      "Compute a correlation coefficient and interpret its sign and strength.",
      "Apply the least-squares formulas for slope and intercept using numpy.",
      "Explain what R-squared means as a proportion of variation explained.",
      "Distinguish a relationship that is observed from a cause that is proven.",
    ],
    requirements: {
      software: [
        "Python 3.10 or newer",
        "VS Code, Thonny or another editor",
        "A terminal (PowerShell, Command Prompt or the VS Code terminal)",
      ],
      libraries: [
        "numpy (for array maths)",
        "pandas (for holding the dataset)",
        "matplotlib (for the plot)",
      ],
      data: [
        "A small paired dataset of study hours per day (X) and marks (y).",
        "This project uses 10 built-in rows; a real study can read the same two columns from a CSV.",
      ],
      hardware: [
        "Any laptop or desktop that runs Python",
        "No GPU is needed; the computation is tiny",
      ],
    },
    concepts: [
      "Independent variable (X) and dependent variable (y)",
      "Scatter plots and the line of best fit",
      "Least-squares regression: slope and intercept formulas",
      "Correlation coefficient r and R-squared",
      "Residuals and the mean absolute error (MAE)",
      "Correlation versus causation and model limitations",
    ],
    algorithm: [
      "State the question: can marks be predicted from study hours using a straight line?",
      "Load the paired dataset of study hours (X) and marks (y).",
      "Compute the mean of X and the mean of y.",
      "Compute the slope b using sum((Xi - Xbar)(yi - ybar)) / sum((Xi - Xbar)^2).",
      "Compute the intercept a using a = ybar - b * Xbar, giving the line y = a + bX.",
      "Predict the marks for every X with the fitted equation.",
      "Compute the residuals (actual minus predicted) and find the MAE.",
      "Compute R-squared as 1 - (sum of squared residuals / total sum of squares).",
      "Print the equation, the error metrics and a table of predictions versus actual values.",
      "Plot the data and the fitted line, save the chart, and write the interpretation and limitations.",
    ],
    code: {
      language: "Python",
      filename: "linear_regression.py",
      content: `"""
Project 3: Simple Linear Regression
ISC Artificial Intelligence (883) - Class XI
Builds a simple linear regression (y = a + bX) with the least-squares
method, evaluates R^2 and MAE, and discusses correlation vs causation.
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# ------------------------------------------------------------------
# 1. Dataset: study hours per day (X) and marks (y).
# ------------------------------------------------------------------
data = {
    "study_hours": [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5],
    "marks":       [45.0, 52.0, 58.0, 63.0, 68.0, 72.0, 79.0, 83.0, 88.0, 92.0],
}
df = pd.DataFrame(data)

X = df["study_hours"].to_numpy()
y = df["marks"].to_numpy()

# ------------------------------------------------------------------
# 2. Fit the line y = a + bX using the least-squares formulas.
#       b = sum((Xi - Xbar)(yi - ybar)) / sum((Xi - Xbar)^2)
#       a = ybar - b * Xbar
# ------------------------------------------------------------------
x_bar = X.mean()
y_bar = y.mean()

b = np.sum((X - x_bar) * (y - y_bar)) / np.sum((X - x_bar) ** 2)
a = y_bar - b * x_bar

print("Simple Linear Regression - study hours vs marks")
print("=" * 48)
print(f"Observations (n)   : {len(X)}")
print(f"Mean study hours   : {x_bar:.2f}")
print(f"Mean marks         : {y_bar:.2f}")
print(f"Slope (b)          : {b:.2f}")
print(f"Intercept (a)      : {a:.2f}")
print(f"Regression equation: marks = {a:.2f} + {b:.2f} * study_hours")

# ------------------------------------------------------------------
# 3. Predictions and error metrics.
# ------------------------------------------------------------------
y_pred = a + b * X
residuals = y - y_pred

ss_res = np.sum(residuals ** 2)
ss_tot = np.sum((y - y_bar) ** 2)
r_squared = 1 - ss_res / ss_tot
r = np.corrcoef(X, y)[0, 1]
mae = np.mean(np.abs(residuals))

print(f"Correlation (r)    : {r:.3f}")
print(f"R-squared          : {r_squared:.3f}")
print(f"MAE (marks)        : {mae:.2f}")
print("-" * 48)

# ------------------------------------------------------------------
# 4. Prediction table so the error is visible, not just summarised.
# ------------------------------------------------------------------
print(f'{"Hours":>6}{"Actual":>9}{"Predicted":>11}{"Error":>9}')
for hours, actual, pred in zip(X, y, y_pred):
    print(f'{hours:>6.1f}{actual:>9.1f}{pred:>11.2f}{actual - pred:>9.2f}')
print("-" * 48)
print(f'The model explains {r_squared * 100:.1f}% of the variation in marks.')

# ------------------------------------------------------------------
# 5. Plot the data and the fitted line.
# ------------------------------------------------------------------
fig, ax = plt.subplots(figsize=(6, 4))
ax.scatter(X, y, color="#c44e52", label="Actual data")
ax.plot(X, y_pred, color="#4c72b0", label="Fitted line")
ax.set_title("Simple linear regression: marks vs study hours")
ax.set_xlabel("Study hours per day")
ax.set_ylabel("Marks")
ax.legend()
fig.tight_layout()
fig.savefig("regression_line.png", dpi=120)
print("Chart saved to regression_line.png")

# ------------------------------------------------------------------
# 6. Interpretation and limitations (printed for the report).
# ------------------------------------------------------------------
print()
print("Interpretation")
print(f"- Each extra hour of study is linked to about {b:.1f} more marks.")
print(f"- With 0 study hours the model predicts about {a:.1f} marks.")
print(f"- r = {r:.3f} means a strong positive linear relationship.")
print("- Correlation is NOT causation: a third factor such as prior knowledge")
print("  or tuition could raise both study hours and marks.")
print("- Limits: only 10 points, only one input variable, and marks cannot")
print("  rise forever, so do not extrapolate far beyond 5.5 hours.")`,
    },
    setup: "pip install numpy pandas matplotlib  (then run: python linear_regression.py)",
    codeExplanation: [
      "The data dictionary holds two equal-length lists: study_hours is the input X and marks is the output y.",
      "X = df['study_hours'].to_numpy() converts the column to a numpy array so the arithmetic below works element by element.",
      "x_bar and y_bar are the two means. They are the anchor points the least-squares line is built around.",
      "The slope line computes b as the sum of the products of the deviations from the mean, divided by the sum of the squared deviations of X. This is the standard least-squares formula.",
      "The intercept line computes a = ybar - b * Xbar. Together, a and b define the line y = a + bX.",
      "y_pred = a + b * X applies the equation to every study-hour value to produce a predicted mark for each row.",
      "residuals = y - y_pred is the error for each point. Positive residuals mean the model predicted too low; negative mean too high.",
      "r_squared = 1 - ss_res / ss_tot measures the fraction of the variation in marks explained by study hours; a value near 1 means a good linear fit.",
      "np.corrcoef(X, y)[0, 1] returns the Pearson correlation r; the [0, 1] picks the off-diagonal value of the 2x2 matrix.",
      "mae = np.mean(np.abs(residuals)) is the average size of the errors in marks - easy to explain because it is in the same units as marks.",
      "The fitted-line plot uses scatter for the real points and plot for the line, with a legend to label both.",
    ],
    sampleInput:
      "No typing needed: the 10 (study hours, marks) pairs are built into the program. To use your own data, replace the data dictionary with df = pd.read_csv(\"study_marks.csv\") that has the columns study_hours and marks.",
    sampleOutput: `Simple Linear Regression - study hours vs marks
================================================
Observations (n)   : 10
Mean study hours   : 3.25
Mean marks         : 70.00
Slope (b)          : 10.33
Intercept (a)      : 36.44
Regression equation: marks = 36.44 + 10.33 * study_hours
Correlation (r)    : 0.998
R-squared          : 0.996
MAE (marks)        : 0.73
------------------------------------------------
 Hours   Actual  Predicted    Error
   1.0     45.0      46.76    -1.76
   1.5     52.0      51.93     0.07
   2.0     58.0      57.09     0.91
   2.5     63.0      62.25     0.75
   3.0     68.0      67.42     0.58
   3.5     72.0      72.58    -0.58
   4.0     79.0      77.75     1.25
   4.5     83.0      82.91     0.09
   5.0     88.0      88.07    -0.07
   5.5     92.0      93.24    -1.24
------------------------------------------------
The model explains 99.6% of the variation in marks.
Chart saved to regression_line.png

Interpretation
- Each extra hour of study is linked to about 10.3 more marks.
- With 0 study hours the model predicts about 36.4 marks.
- r = 0.998 means a strong positive linear relationship.
- Correlation is NOT causation: a third factor such as prior knowledge
  or tuition could raise both study hours and marks.
- Limits: only 10 points, only one input variable, and marks cannot
  rise forever, so do not extrapolate far beyond 5.5 hours.`,
    testCases: [
      {
        input: "The full 10-point dataset",
        expected: "Slope b = 10.33, intercept a = 36.44",
        note: "Direct application of the least-squares formulas.",
      },
      {
        input: "Predict marks for 3.0 study hours",
        expected: "About 67.42 marks",
        note: "Substitute into marks = 36.44 + 10.33 * 3.0.",
      },
      {
        input: "Predict marks for 4.5 study hours",
        expected: "About 82.91 marks",
        note: "The prediction lands close to the actual 83, showing a good fit.",
      },
      {
        input: "Fit quality check",
        expected: "R-squared = 0.996, MAE = 0.73",
        note: "Very high R-squared and small average error means the line fits well.",
      },
      {
        input: "Correlation between X and y",
        expected: "r = 0.998",
        note: "A near-perfect positive correlation; interpret with the causation warning.",
      },
    ],
    edgeCases: [
      "Very few data points make a regression unstable; a line fitted to three points can look convincing but prove little.",
      "A strong outlier can drag the slope and intercept far from the true trend; always plot the data before trusting a line.",
      "If all X values are identical, the denominator sum((Xi - Xbar)^2) is zero and the slope is undefined - the code cannot divide by zero.",
      "A high R-squared in one dataset does not guarantee a high R-squared in another; never assume the fit generalises.",
      "Extrapolating far outside the observed range (for example 12 study hours a day) produces unrealistic predictions.",
      "Correlation is not causation: the model shows an association in the sample, not a proven cause-and-effect link.",
    ],
    reportFormat: [
      "Title page: project name, board and subject, class, your name, roll number and school.",
      "Aim: to predict marks from study hours using a simple linear regression.",
      "Data description: the two variables, their units, the source and the number of records.",
      "Theory: the line of best fit and the least-squares formulas for slope and intercept.",
      "Method: how x_bar, y_bar, b and a are computed in the program.",
      "Code listing: the full linear_regression.py program with comments.",
      "Results: the fitted equation, the prediction table and the saved line chart.",
      "Evaluation: R-squared and MAE, explained in plain language.",
      "Discussion: correlation versus causation, limitations and how the model could be improved.",
      "Conclusion and future scope: a short summary and ideas such as adding a second input variable.",
    ],
    viva: [
      "What does a simple linear regression try to do?",
      "Write the least-squares formulas for the slope b and the intercept a.",
      "What is the difference between the correlation coefficient r and R-squared?",
      "What does R-squared actually mean in words?",
      "How is the mean absolute error (MAE) computed, and why is it easy to explain?",
      "What is a residual, and what does a large residual tell you?",
      "Why can a high correlation still fail to prove causation? Give one example.",
      "Why is it unsafe to extrapolate far beyond the observed study-hour range?",
      "What happens to the slope if every study-hour value in the dataset is the same, and why?",
    ],
    extensions: [
      "Add a second input variable and explore multiple linear regression.",
      "Compute the root mean squared error (RMSE) and compare it with the MAE.",
      "Split the data into training and testing halves and report the error on the unseen half.",
      "Add a confidence-style range by reporting the largest and smallest residual.",
      "Change the dataset to a different pair of variables (for example sleep hours and marks) and compare R-squared.",
      "Use numpy.polyfit(X, y, 1) and confirm it returns the same slope and intercept as your formulas.",
    ],
    syllabusMapping: [
      "Maps to ISC AI 883 Class XI unit: Introduction to Artificial Intelligence - supervised learning and prediction.",
      "Maps to ISC AI 883 Class XI unit: Data and Data Science - paired variables and scatter analysis.",
      "Maps to ISC AI 883 Class XI unit: Descriptive Statistics - mean and correlation.",
      "Maps to ISC AI 883 Class XI unit: Introduction to Python - functions, loops, list arithmetic and libraries.",
      "Maps to ISC AI 883 Class XI unit: Data Visualisation - plotting data with a fitted line.",
      "Maps to ISC AI 883 Class XI unit: Ethics and AI - understanding model limitations and correlation versus causation.",
    ],
  },
];
