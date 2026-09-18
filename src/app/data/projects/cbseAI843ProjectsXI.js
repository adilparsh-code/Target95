/**
 * CBSE Artificial Intelligence (843) — Class XI project packages.
 * Coding projects ship runnable Python; research/design projects ship a full
 * student package instead of forced code.
 */

export const CBSE_843_XI_PROJECTS_FULL = [
  {
    slug: "ai-career-exploration",
    title: "AI Career Exploration",
    boardLabel: "CBSE AI 843 · Class XI",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Research & design",
    difficulty: "Beginner",
    summary:
      "A structured research project that maps AI roles, the skills each role needs and a realistic personal learning roadmap.",
    shortOutcome: "Research AI careers, compare required skills and build a personal learning roadmap.",
    academicNote:
      "This is a research and report project; it is intentionally not a coding project. Follow your school's submission format.",
    problemStatement:
      "Many students say they want to 'work in AI' without knowing what different AI jobs actually involve. Investigate at least five AI-related roles, identify the skills and subjects each one needs, compare them in a table, and produce a personal three-year learning roadmap that connects school subjects to a chosen role.",
    objectives: [
      "Identify and describe at least five AI-related career roles.",
      "List the technical and non-technical skills each role requires.",
      "Compare roles in a clear comparison table.",
      "Match school subjects (maths, computer science, statistics) to role requirements.",
      "Produce a realistic personal learning roadmap.",
    ],
    learningOutcomes: [
      "Distinguish data, ML, AI-engineering and AI-ethics roles.",
      "Communicate research findings in a structured written report.",
      "Relate classroom subjects to future careers.",
      "Set short, medium and long-term learning goals.",
    ],
    requirements: {
      software: ["A word processor and a spreadsheet (for the comparison table)"],
      libraries: ["None required (no coding)"],
      data: ["Public information: official job descriptions, skill frameworks, university pages"],
      hardware: ["Any computer with internet access for research"],
    },
    concepts: [
      "AI job families (data science, ML engineering, AI research, MLOps, AI product/ethics)",
      "Technical vs transferable skills",
      "Career research and reliable sourcing",
      "Skills-to-subject mapping",
      "SMART goal setting for learning plans",
      "Continuous learning in a fast-changing field",
    ],
    algorithm: [
      "Choose five AI-related roles to investigate.",
      "For each role, note the main tasks and the skills required.",
      "Record sources for each claim (no unsourced statements).",
      "Build a comparison table of roles against skills.",
      "Map each required skill to school subjects and further study.",
      "Write a personal three-year learning roadmap.",
      "Conclude with risks and how you will keep learning.",
    ],
    testCases: [
      { input: "Role: Data Scientist", expected: "Tasks + skills (statistics, Python, communication) with a source", note: "Completeness" },
      { input: "Role: ML Engineer", expected: "Software engineering skills distinguished from analysis skills", note: "Role contrast" },
      { input: "Roadmap: Year 1", expected: "Concrete subjects/activities, not vague intentions", note: "Actionability" },
      { input: "Any claim without a source", expected: "Rejected during self-review", note: "Sourcing discipline" },
    ],
    edgeCases: [
      "Roles change quickly — the roadmap must allow revision, not be rigid.",
      "Some roles look similar; explain the real difference, not just the title.",
      "Avoid copying an online roadmap verbatim; adapt it to your own situation.",
      "Cite the date of sources because job descriptions change.",
      "Do not overstate job security in any single role.",
    ],
    reportFormat: [
      "1. Introduction: why explore AI careers",
      "2. Methodology: how roles and sources were chosen",
      "3. Role profiles (five roles, each with tasks and skills)",
      "4. Comparison table of roles and skills",
      "5. Skills-to-subject mapping",
      "6. Personal three-year learning roadmap",
      "7. Risks and how learning will be sustained",
      "8. Sources and conclusion",
    ],
    viva: [
      "What is the difference between a data scientist and a machine learning engineer?",
      "Which school subjects matter most for AI, and why?",
      "Why is communication a technical skill in AI work?",
      "How would you keep your roadmap current as the field changes?",
      "Why must a career report cite its sources?",
      "Which role interests you most, and what is your next concrete step?",
    ],
    extensions: [
      "Interview a professional (in person or by email) and add their answers.",
      "Add a second comparison table for salary bands and typical qualifications.",
      "Include a 'skills gap' section that honestly lists what you still need.",
      "Present the roadmap as a poster or timeline graphic.",
    ],
    syllabusMapping: [
      "Maps to CBSE AI 843 Class XI Employability Skills and AI curriculum themes on AI careers and skills.",
      "Maps to the Class XI project and portfolio component of the CBSE AI practical assessment.",
      "Supports communication, self-management and career-guidance outcomes.",
      "Connects AI learning to real-world application contexts.",
    ],
  },
  {
    slug: "empathy-to-ai-problem-canvas",
    title: "Empathy-to-AI Problem Canvas",
    boardLabel: "CBSE AI 843 · Class XI",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Research & design",
    difficulty: "Intermediate",
    summary:
      "A design-thinking project that turns a real human need into a 5W1H problem statement and a one-page AI solution canvas.",
    shortOutcome: "Convert a real-world need into a defined problem statement and an AI solution concept.",
    academicNote:
      "This is a design and report project; it is intentionally not a coding project. Follow your school's submission format.",
    problemStatement:
      "Good AI projects start with people, not technology. Choose a genuine problem in your school or neighbourhood, study the affected people with an empathy map, convert the need into a precise 5W1H problem statement, then design a one-page AI canvas: the data needed, the intended output, the evaluation metric and the ethical safeguards.",
    objectives: [
      "Observe and describe a real problem from the user's point of view.",
      "Build an empathy map (says, thinks, does, feels).",
      "Write a precise 5W1H problem statement.",
      "Draft the AI solution canvas with data, output and evaluation.",
      "Identify ethical risks and safeguards.",
    ],
    learningOutcomes: [
      "Apply the 4Ws problem-scoping framework (Who, What, Where, Why).",
      "Write an empathy map grounded in observation, not assumption.",
      "Distinguish the problem from a premature solution.",
      "State what data an AI solution would need and why.",
      "Anticipate bias, privacy and misuse risks.",
    ],
    requirements: {
      software: ["A word processor or canvas template (paper is acceptable)"],
      libraries: ["None required (no coding)"],
      data: ["Notes and observations from your chosen context"],
      hardware: ["Nothing specific"],
    },
    concepts: [
      "Design thinking and human-centred problem framing",
      "Empathy maps and stakeholder analysis",
      "5W1H / 4Ws problem statements",
      "AI project canvas (problem, data, output, evaluation, ethics)",
      "Data requirements and feasibility",
      "Responsible AI and safeguards",
    ],
    algorithm: [
      "Choose a real problem by observing people, not by picking a technology.",
      "Interview or observe 3-5 affected people and record findings.",
      "Build the empathy map from those notes.",
      "Write the 5W1H problem statement and a measurable goal.",
      "Draft the AI canvas: data, output, evaluation, users.",
      "List ethical risks and one safeguard for each.",
      "Present the canvas to the class and revise from feedback.",
    ],
    testCases: [
      { input: "Problem statement", expected: "Names who, what, where, why and a measurable goal", note: "5W1H completeness" },
      { input: "Empathy map", expected: "All four quadrants filled from observation, not guesses", note: "Grounded, not assumed" },
      { input: "AI canvas data field", expected: "Names the specific data and its source", note: "Feasibility" },
      { input: "Ethics field", expected: "At least one risk and one concrete safeguard", note: "Responsible design" },
    ],
    edgeCases: [
      "A problem that can be solved without AI — acknowledge it and say why AI is or is not justified.",
      "Sensitive data (health, identity) — flag consent and privacy needs.",
      "A problem with no available data — redesign or narrow the scope.",
      "A very broad problem ('improve education') — narrow it until it is measurable.",
      "Stakeholders may disagree — note the conflicting needs.",
    ],
    reportFormat: [
      "1. Introduction and chosen context",
      "2. Observation and stakeholder notes",
      "3. Empathy map",
      "4. 5W1H problem statement with a measurable goal",
      "5. AI solution canvas (problem, data, output, evaluation, users)",
      "6. Ethical risks and safeguards",
      "7. Feasibility discussion",
      "8. Conclusion",
    ],
    viva: [
      "Why start with people instead of technology?",
      "What is the difference between a problem statement and a solution?",
      "What does each quadrant of the empathy map contain?",
      "Could this problem be solved without AI? Justify your answer.",
      "What data would your solution need, and where would it come from?",
      "Which safeguard matters most for your chosen problem, and why?",
    ],
    extensions: [
      "Turn the canvas into a low-fidelity sketch of the user interface.",
      "Add a success metric that a teacher could actually measure.",
      "Interview more users and refine the empathy map.",
      "Add a 'do no harm' checklist specific to your context.",
    ],
    syllabusMapping: [
      "Maps to CBSE AI 843 Class XI unit 'Introduction to Capstone Project': problem scoping with 4Ws and the AI project framework.",
      "Maps to the empathy-map and 5W1H activities in the CBSE AI curriculum.",
      "Maps to the Class XI project and portfolio component.",
      "Supports design-thinking and responsible-AI outcomes.",
    ],
  },
  {
    slug: "data-literacy-mini-study",
    title: "Data Literacy Mini Study",
    boardLabel: "CBSE AI 843 · Class XI",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Coding + report",
    language: "Python",
    difficulty: "Beginner",
    summary:
      "Collect a small dataset, clean it, compute descriptive statistics, derive a metric and visualise the result.",
    shortOutcome: "Show you can turn raw numbers into clean statistics, a derived metric and an honest chart.",
    academicNote:
      "This is a coding project. Follow your school's submission format for the final report.",
    problemStatement:
      "Build confidence with the data workflow: load a small weekly study dataset, check it for missing values and duplicates, describe it with statistics, derive a useful metric (questions answered per hour) and show the pattern in a chart — while noting the limits of a seven-day sample.",
    objectives: [
      "Load and display a DataFrame.",
      "Run cleaning checks.",
      "Compute mean, standard deviation, min and max.",
      "Derive a new column from existing ones.",
      "Visualise the data and interpret it honestly.",
    ],
    learningOutcomes: [
      "Explain why cleaning comes before analysis.",
      "Interpret descriptive statistics.",
      "Create a derived feature by combining columns.",
      "Choose a chart and describe what it does and does not show.",
    ],
    requirements: {
      software: ["Python 3.10+"],
      libraries: ["pandas", "matplotlib"],
      data: ["The built-in seven-day practice dataset"],
      hardware: ["Any laptop/desktop that runs Python"],
    },
    concepts: [
      "DataFrame creation and inspection",
      "Missing-value and duplicate checks",
      "Descriptive statistics",
      "Derived features",
      "Bar chart visualisation",
      "Sampling limitations",
    ],
    algorithm: [
      "Create the weekly dataset.",
      "Print the dataset and check for missing values and duplicates.",
      "Compute descriptive statistics.",
      "Derive questions-per-hour.",
      "Print average, total and most productive day.",
      "Draw and save a bar chart.",
    ],
    code: {
      language: "Python",
      filename: "data_literacy_mini_study.py",
      content: `import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Day": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "StudyHours": [2, 3, 1, 4, 3, 5, 2],
    "PracticeQuestions": [8, 12, 5, 16, 13, 20, 9],
})

print("=== DATASET ===")
print(df)

print()
print("=== CLEANING CHECK ===")
print("Missing values per column:")
print(df.isnull().sum())
print("Duplicate rows:", df.duplicated().sum())

print()
print("=== DESCRIPTIVE STATISTICS ===")
print(df[["StudyHours", "PracticeQuestions"]].describe())

df["QuestionsPerHour"] = (df["PracticeQuestions"] / df["StudyHours"]).round(2)
print()
print("=== DERIVED METRIC ===")
print(df[["Day", "QuestionsPerHour"]])

print()
print("Average study hours:", round(df["StudyHours"].mean(), 2))
print("Average questions :", round(df["PracticeQuestions"].mean(), 2))
print("Total questions   :", df["PracticeQuestions"].sum())
print("Most productive day:", df.loc[df["PracticeQuestions"].idxmax(), "Day"])

plt.bar(df["Day"], df["PracticeQuestions"], color="#0ea5e9")
plt.xlabel("Day")
plt.ylabel("Practice questions")
plt.title("Weekly practice activity")
plt.tight_layout()
plt.savefig("weekly_practice.png")

print()
print("Chart saved to weekly_practice.png")
print("Note: with only seven days, treat these patterns as a small sample.")
`,
    },
    setup: "pip install pandas matplotlib",
    codeExplanation: [
      "pd.DataFrame builds a table from parallel lists.",
      "isnull().sum() and duplicated().sum() are the first cleaning checks.",
      "describe() summarises count, mean, std, min, quartiles and max.",
      "QuestionsPerHour is a derived column created by dividing two existing columns.",
      "idxmax() locates the row with the highest questions, giving the best day.",
      "savefig() writes the chart to disk so it can be pasted into the report.",
    ],
    sampleInput: "No input required — the program runs on the built-in dataset.",
    sampleOutput: `=== DATASET ===
   Day  StudyHours  PracticeQuestions
0  Mon           2                  8
1  Tue           3                 12
2  Wed           1                  5
3  Thu           4                 16
4  Fri           3                 13
5  Sat           5                 20
6  Sun           2                  9

=== CLEANING CHECK ===
Missing values per column:
Day                  0
StudyHours           0
PracticeQuestions    0
dtype: int64
Duplicate rows: 0

=== DESCRIPTIVE STATISTICS ===
       StudyHours  PracticeQuestions
count    7.000000           7.000000
mean     2.857143          11.857143
std      1.345185           5.080307
min      1.000000           5.000000
25%      2.000000           8.500000
50%      3.000000          12.000000
75%      3.500000          14.500000
max      5.000000          20.000000

=== DERIVED METRIC ===
   Day  QuestionsPerHour
0  Mon              4.00
1  Tue              4.00
2  Wed              5.00
3  Thu              4.00
4  Fri              4.33
5  Sat              4.00
6  Sun              4.50

Average study hours: 2.86
Average questions : 11.86
Total questions   : 83
Most productive day: Sat

Chart saved to weekly_practice.png
Note: with only seven days, treat these patterns as a small sample.`,
    testCases: [
      { input: "Cleaning check", expected: "0 missing values, 0 duplicates", note: "Data quality" },
      { input: "Total questions", expected: "83", note: "Aggregation" },
      { input: "Most productive day", expected: "Sat (20 questions)", note: "idxmax" },
      { input: "QuestionsPerHour on Wed", expected: "5.00 (5 questions / 1 hour)", note: "Derived metric" },
    ],
    edgeCases: [
      "A day with 0 study hours makes questions-per-hour undefined — guard against divide-by-zero.",
      "Seven days is a tiny sample; do not claim a long-term trend.",
      "A single extreme day can shift the mean noticeably.",
      "Missing values would need imputation or removal before statistics.",
      "A bar chart of days is appropriate; a pie chart of seven near-equal values is not.",
    ],
    reportFormat: [
      "1. Problem statement",
      "2. Data source and data dictionary",
      "3. Cleaning checks",
      "4. Descriptive statistics",
      "5. Derived metric",
      "6. Chart and interpretation",
      "7. Limitations",
      "8. Conclusion",
    ],
    viva: [
      "Why is the standard deviation useful here?",
      "What does the derived metric add over the raw counts?",
      "Why check for duplicates before analysis?",
      "What are the limits of a seven-day dataset?",
      "Which chart type did you use, and why?",
      "How would you collect a bigger dataset?",
    ],
    extensions: [
      "Collect two weeks of real data and compare.",
      "Add a scatter plot of study hours against questions.",
      "Save the summary to a CSV file.",
      "Add a simple correlation calculation.",
    ],
    syllabusMapping: [
      "Maps to CBSE AI 843 Class XI data literacy and data-handling topics.",
      "Maps to the Class XI project and portfolio component.",
      "Supports the data-science methodology outcome: collect, clean, analyse, visualise.",
      "Reinforces statistics learning from mathematics.",
    ],
  },
  {
    slug: "machine-learning-mini-demonstration",
    title: "Machine Learning Mini Demonstration",
    boardLabel: "CBSE AI 843 · Class XI",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Coding + report",
    language: "Python",
    difficulty: "Intermediate",
    summary:
      "A tiny supervised classification demo: predict whether a student passes from study hours and attendance, and explain the workflow and its limits.",
    shortOutcome: "Demonstrate a train-test machine-learning workflow and explain what the model can and cannot do.",
    academicNote:
      "This is a coding project. Follow your school's submission format for the final report.",
    problemStatement:
      "Build the smallest honest machine-learning pipeline: a labelled dataset, a train/test split, a decision-tree classifier, an accuracy score and one prediction for a new student. Explain each step and why a tiny teaching dataset must never be used for real decisions.",
    objectives: [
      "Define features (X) and the label (y).",
      "Split the data into training and testing sets.",
      "Train a decision-tree classifier.",
      "Evaluate accuracy on unseen data.",
      "Predict for a new student and interpret the result.",
    ],
    learningOutcomes: [
      "Describe supervised classification in your own words.",
      "Explain why data is split into train and test sets.",
      "Interpret an accuracy score.",
      "State why the result of a tiny model is not a real prediction.",
    ],
    requirements: {
      software: ["Python 3.10+"],
      libraries: ["pandas", "scikit-learn"],
      data: ["The built-in 12-row labelled dataset"],
      hardware: ["Any laptop/desktop that runs Python"],
    },
    concepts: [
      "Features and labels",
      "Supervised learning and classification",
      "Train/test split",
      "Decision-tree model",
      "Accuracy and evaluation",
      "Overfitting and generalisation",
    ],
    algorithm: [
      "Build the labelled dataset.",
      "Choose StudyHours and Attendance as features and Passed as the label.",
      "Split into training and testing data.",
      "Train the decision tree.",
      "Measure accuracy on the test set.",
      "Predict for a new student.",
      "State the limitations.",
    ],
    code: {
      language: "Python",
      filename: "machine_learning_mini_demonstration.py",
      content: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

df = pd.DataFrame({
    "StudyHours": [1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 7, 8],
    "Attendance": [60, 65, 70, 72, 75, 78, 80, 82, 85, 88, 92, 95],
    "Passed": [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
})

print("=== DATASET (first 5 rows) ===")
print(df.head())

X = df[["StudyHours", "Attendance"]]
y = df["Passed"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42, stratify=y
)
print()
print("Training rows:", len(X_train), "| Testing rows:", len(X_test))

model = DecisionTreeClassifier(max_depth=3, random_state=42)
model.fit(X_train, y_train)

pred = model.predict(X_test)
print()
print("=== MODEL EVALUATION ===")
print("Accuracy:", round(accuracy_score(y_test, pred), 3))

new_student = pd.DataFrame({"StudyHours": [5], "Attendance": [84]})
result = model.predict(new_student)[0]
print("Prediction for 5 study hours / 84% attendance:",
      "Pass" if result == 1 else "Needs support")

print()
print("This is a teaching model on a tiny dataset - not a real prediction system.")
print("A real system needs more data, validation and human oversight.")
`,
    },
    setup: "pip install pandas scikit-learn",
    codeExplanation: [
      "X holds the input features; y holds the label the model learns to predict.",
      "train_test_split reserves 25% of rows for honest evaluation.",
      "stratify=y keeps the class balance in both splits.",
      "max_depth=3 limits tree size to reduce overfitting on a small dataset.",
      "accuracy_score compares predictions with the unseen test labels.",
    ],
    sampleInput: "No input required — the program trains and evaluates on the built-in dataset.",
    sampleOutput: `=== DATASET (first 5 rows) ===
   StudyHours  Attendance  Passed
0           1          60       0
1           2          65       0
2           2          70       0
3           3          72       0
4           3          75       0

Training rows: 9 | Testing rows: 3

=== MODEL EVALUATION ===
Accuracy: 1.0
Prediction for 5 study hours / 84% attendance: Pass

This is a teaching model on a tiny dataset - not a real prediction system.
A real system needs more data, validation and human oversight.`,
    testCases: [
      { input: "Train/test split with stratify", expected: "9 training rows, 3 testing rows", note: "Split size" },
      { input: "Model evaluation", expected: "Accuracy 1.0 on the test set", note: "Clean, separable data" },
      { input: "5 hours / 84% attendance", expected: "Pass", note: "Prediction" },
      { input: "1 hour / 60% attendance", expected: "Needs support", note: "Low end of the range" },
    ],
    edgeCases: [
      "Perfect accuracy on 3 test rows does not prove the model generalises.",
      "A label imbalance would need care in evaluation.",
      "Unseen feature values far outside the training range are extrapolation.",
      "Removing rows can make the test set empty; test_size must stay sensible.",
      "Small datasets are sensitive to the random split — try other random_state values.",
    ],
    reportFormat: [
      "1. Problem statement and objective",
      "2. Dataset and features",
      "3. Train/test split",
      "4. Model and training",
      "5. Evaluation result",
      "6. Prediction example",
      "7. Limitations and responsible use",
      "8. Conclusion",
    ],
    viva: [
      "What are the features and the label here?",
      "Why do we keep test data separate?",
      "What does an accuracy of 1.0 on three rows actually tell us?",
      "What is overfitting?",
      "Why must this model not be used for real decisions?",
      "How would more data change the result?",
    ],
    extensions: [
      "Add a confusion matrix.",
      "Try a different random_state and compare accuracy.",
      "Add a third feature and observe the effect.",
      "Compare against a simple rule-based classifier.",
    ],
    syllabusMapping: [
      "Maps to CBSE AI 843 Class XI machine-learning mini project work.",
      "Maps to supervised learning concepts in the CBSE AI curriculum.",
      "Maps to the Class XI project and portfolio component.",
      "Reinforces mathematics (probability) and computational-thinking outcomes.",
    ],
  },
  {
    slug: "responsible-ai-case-study",
    title: "Responsible AI Case Study",
    boardLabel: "CBSE AI 843 · Class XI",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Research & design",
    difficulty: "Intermediate",
    summary:
      "Investigate a real or realistic AI failure involving bias or an ethical dilemma, analyse the causes and propose concrete safeguards.",
    shortOutcome: "Analyse an AI ethics case and propose realistic safeguards and safeguards-evaluation.",
    academicNote:
      "This is a research and report project; it is intentionally not a coding project. Follow your school's submission format.",
    problemStatement:
      "Choose one documented or realistic case where an AI system produced an unfair, unsafe or privacy-violating outcome. Describe what happened, identify the root causes (data, design, deployment or governance), analyse who was harmed, and propose safeguards that would realistically reduce the risk. Finish with a short checklist schools could use before deploying an AI tool.",
    objectives: [
      "Describe a concrete AI ethics case study accurately.",
      "Identify the root causes across data, design, deployment and governance.",
      "Analyse the harm and who is affected.",
      "Propose realistic, specific safeguards.",
      "Produce a pre-deployment checklist.",
    ],
    learningOutcomes: [
      "Explain bias sources in AI systems.",
      "Distinguish fairness, privacy, transparency and accountability.",
      "Evaluate safeguards for practicality, not just principle.",
      "Argue an ethical position using evidence.",
    ],
    requirements: {
      software: ["A word processor (and a spreadsheet for the checklist)"],
      libraries: ["None required (no coding)"],
      data: ["Public reports, news articles, research papers and official guidelines"],
      hardware: ["Any computer with internet access for research"],
    },
    concepts: [
      "Sources of bias (data, labelling, modelling, deployment)",
      "Fairness and disparate impact",
      "Privacy and data minimisation",
      "Transparency, explainability and accountability",
      "Human oversight and appeal",
      "AI governance and checklists",
    ],
    algorithm: [
      "Select one clear case and gather reliable sources.",
      "Describe the system, its purpose and the harm.",
      "Trace causes through data, design, deployment and governance.",
      "Identify the affected groups and the type of harm.",
      "Propose safeguards, each tied to a cause.",
      "Evaluate safeguards for practicality and cost.",
      "Write a short pre-deployment checklist.",
    ],
    testCases: [
      { input: "Case description", expected: "Evidence-based, sourced, no exaggeration", note: "Accuracy" },
      { input: "Cause analysis", expected: "Covers data, design, deployment and governance", note: "Completeness" },
      { input: "Each safeguard", expected: "Linked to a specific cause", note: "Traceability" },
      { input: "Checklist", expected: "Actionable items a school could actually run", note: "Practicality" },
    ],
    edgeCases: [
      "A case with incomplete public information — state the uncertainty.",
      "Multiple causes — avoid blaming one factor alone.",
      "A safeguard that sounds good but is impractical — say so and adjust it.",
      "Conflicting stakeholder interests — acknowledge the trade-off.",
      "Avoid naming private individuals; focus on systems and outcomes.",
    ],
    reportFormat: [
      "1. Introduction and chosen case",
      "2. What the system did and who was affected",
      "3. Root-cause analysis (data, design, deployment, governance)",
      "4. Harm and affected groups",
      "5. Proposed safeguards tied to causes",
      "6. Practicality evaluation of safeguards",
      "7. Pre-deployment checklist",
      "8. Conclusion and sources",
    ],
    viva: [
      "What are three common sources of AI bias?",
      "Why can a technically accurate model still be unfair?",
      "What is the difference between explainability and transparency?",
      "Why is human oversight important even for good models?",
      "Which safeguard in your case study is most realistic, and why?",
      "How would you measure whether a safeguard is working?",
    ],
    extensions: [
      "Add a second case and compare causes and safeguards.",
      "Map the case to a published AI ethics guideline.",
      "Turn the checklist into a poster for your classroom.",
      "Add a 'red team' section listing how the system could be misused.",
    ],
    syllabusMapping: [
      "Maps to CBSE AI 843 Class XI responsible-AI and ethics topics.",
      "Maps to the Class XI project and portfolio component.",
      "Supports critical-thinking and digital-citizenship outcomes.",
      "Connects AI learning to societal impact discussions.",
    ],
  },
  {
    slug: "capstone-project-proposal",
    title: "Capstone Project Proposal",
    boardLabel: "CBSE AI 843 · Class XI",
    classNumber: 11,
    subjectName: "Artificial Intelligence",
    status: "Guided project",
    type: "Research & design",
    difficulty: "Intermediate",
    summary:
      "Prepare a complete capstone proposal: problem, stakeholders, data, AI approach, evaluation plan, timeline and expected impact.",
    shortOutcome: "Write a decision-ready capstone proposal that a teacher could approve or improve.",
    academicNote:
      "This is a planning and report project; it is intentionally not a coding project. Follow your school's submission format.",
    problemStatement:
      "You will build an AI project in Class XII. Before coding, produce a proposal a teacher could evaluate: a precise problem, the stakeholders, the data you can realistically get, the AI approach you will use, how you will measure success, a timeline and an honest statement of expected impact and risks.",
    objectives: [
      "State a precise, measurable problem.",
      "Identify stakeholders and their needs.",
      "Describe the data required and its source.",
      "Choose an appropriate AI approach and justify it.",
      "Define an evaluation plan and success metrics.",
      "Plan a realistic timeline with milestones.",
    ],
    learningOutcomes: [
      "Turn an idea into a measurable, testable plan.",
      "Justify a technical approach against alternatives.",
      "Define evaluation metrics before building.",
      "Identify risks and mitigations early.",
    ],
    requirements: {
      software: ["A word processor and a simple project-planning tool"],
      libraries: ["None required (no coding)"],
      data: ["A description of the data you plan to use and how you will obtain it"],
      hardware: ["Nothing specific"],
    },
    concepts: [
      "Problem scoping and measurable goals",
      "Stakeholder analysis",
      "Data availability and quality assessment",
      "Approach selection and justification",
      "Evaluation metrics and baselines",
      "Risk management and timelines",
    ],
    algorithm: [
      "Define the problem and a measurable success goal.",
      "List stakeholders and what each needs.",
      "Describe the data, its source and any limitations.",
      "Choose the AI approach and explain why it fits.",
      "Define evaluation metrics and a baseline.",
      "Build a milestone timeline.",
      "List risks with a mitigation for each.",
    ],
    testCases: [
      { input: "Problem statement", expected: "Measurable goal, not a vague wish", note: "Testability" },
      { input: "Data plan", expected: "Realistic source and access, with limitations", note: "Feasibility" },
      { input: "Evaluation plan", expected: "Named metrics plus a baseline", note: "Measurability" },
      { input: "Risk list", expected: "Each risk paired with a mitigation", note: "Risk handling" },
    ],
    edgeCases: [
      "Data you cannot actually obtain — redesign before committing.",
      "A goal that cannot be measured — restate it.",
      "An approach that is too advanced for the timeline — scope it down.",
      "Ethical risks with no cheap mitigation — flag them honestly.",
      "A timeline that ignores exam periods — build in buffer time.",
    ],
    reportFormat: [
      "1. Title and summary",
      "2. Problem statement and measurable goal",
      "3. Stakeholders and needs",
      "4. Data plan (source, format, limitations)",
      "5. Proposed AI approach and justification",
      "6. Evaluation plan and baseline",
      "7. Timeline and milestones",
      "8. Risks and mitigations",
      "9. Expected impact and conclusion",
    ],
    viva: [
      "What makes your goal measurable?",
      "Why is this approach better than the alternatives?",
      "What data will you use, and how will you obtain it ethically?",
      "What is your baseline, and why does it matter?",
      "What is the biggest risk to this project?",
      "How will you know the project succeeded?",
    ],
    extensions: [
      "Add a small prototype plan to de-risk the hardest technical step.",
      "Add a budget or resource list.",
      "Add a user-testing plan with a few classmates.",
      "Prepare a one-slide pitch of the proposal.",
    ],
    syllabusMapping: [
      "Maps to CBSE AI 843 Class XI unit 'Introduction to Capstone Project': problem scoping and project abstract.",
      "Maps to the Class XI project and portfolio component.",
      "Supports project-management and planning outcomes.",
      "Prepares students directly for the Class XII AI capstone.",
    ],
  },
];
