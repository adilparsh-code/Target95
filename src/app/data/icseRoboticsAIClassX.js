/**
 * ICSE Robotics & Artificial Intelligence — Class X
 * Examination Year 2027 — AI portion (50/100 marks).
 * Source: CISCE subject code 66 syllabus.
 */
const ICSE_ROBOTICS_AI_CLASS_X = {
  board: "ICSE",
  className: "Class X",
  subject: "Robotics & Artificial Intelligence",
  writtenPaper: "2 hours · 100 marks",
  aiWeightage: 50,
  units: [
    {
      id: "x-decision-making-machines",
      title: "Decision Making in Machines / Computers",
      weightage: 8,
      topics: ["Automated vs autonomous systems", "Deterministic vs probabilistic systems", "Human vs machine decision making", "Introductory machine learning and classification"],
      theory: [
        "Automation follows defined instructions; autonomy includes sensing and independent action within defined limits.",
        "Deterministic systems give predictable results for the same inputs and rules; probabilistic systems represent uncertainty.",
        "Machine decisions can be fast and consistent but depend on data, rules/model limitations and evaluation.",
        "Classification assigns an input to a category using rules or learned patterns."
      ],
      questions: [
        {id:"RAI10-AI1-Q01",type:"mcq",difficulty:"easy",marks:1,question:"Which statement best describes an autonomous system?",options:["It can sense conditions and choose actions with limited direct control.","It never uses sensors.","It must always use AI.","It cannot follow rules."],answer:"It can sense conditions and choose actions with limited direct control.",explanation:"Autonomy concerns independent sensing and action."},
        {id:"RAI10-AI1-Q02",type:"short-answer",difficulty:"medium",marks:2,question:"Differentiate deterministic and probabilistic decision making.",answer:"Deterministic decision making produces a predictable result from the same inputs and rules. Probabilistic decision making represents uncertainty and may assign likelihoods to outcomes."},
        {id:"RAI10-AI1-Q03",type:"case-study",difficulty:"medium",marks:3,question:"A school gate opens at 8 AM using a timer. Is AI required?",answer:"No. A fixed schedule is deterministic automation. AI is relevant when prediction, recognition or adaptive decision-making is needed."},
        {id:"RAI10-AI1-Q04",type:"HOTS",difficulty:"hard",marks:4,question:"Why should a machine-learning classifier not be treated as an unquestionable decision-maker?",answer:"Its output depends on training data, model assumptions and inputs. Errors, bias and uncertainty are possible, so important decisions need evaluation and suitable human oversight."},
        {id:"RAI10-AI1-Q05",type:"mcq",difficulty:"medium",marks:1,question:"A traffic-light controller always produces the same signal sequence for the same timed inputs. This is primarily:",options:["Deterministic","Probabilistic","Random","Self-aware"],answer:"Deterministic",explanation:"The same inputs and rules produce a predictable outcome."},
        {id:"RAI10-AI1-Q06",type:"output-tracing",difficulty:"medium",marks:2,question:"A classifier labels three test items as Cat, Dog, Cat. What kind of AI task is illustrated?",answer:"Classification",explanation:"Each input is assigned to a category or class."}
      ]
    },
    {
      id: "x-machine-intelligence-cybersecurity",
      title: "Machine Intelligence and Cybersecurity in Computing",
      weightage: 8,
      topics: ["Machine intelligence", "Cybersecurity threats", "AI-assisted security", "Responsible and secure use of AI"],
      theory: [
        "Machine intelligence covers computational tasks such as pattern recognition, prediction, classification and language processing.",
        "Cybersecurity protects systems, accounts and data through authentication, updates, backups, access control and safe user behaviour.",
        "AI can detect unusual behaviour and suspicious patterns, but false positives and false negatives remain possible.",
        "Sensitive data, model inputs and security logs must be handled responsibly."
      ],
      questions: [
        {id:"RAI10-AI2-Q01",type:"mcq",difficulty:"easy",marks:1,question:"Which practice most directly reduces account-takeover risk?",options:["Multi-factor authentication","Password reuse","Disabling updates","Sharing passwords"],answer:"Multi-factor authentication",explanation:"A second factor adds protection beyond the password."},
        {id:"RAI10-AI2-Q02",type:"short-answer",difficulty:"medium",marks:2,question:"State two ways AI can support cybersecurity.",answer:"AI can detect unusual behaviour, classify suspicious messages/files, identify patterns in logs and prioritise security alerts."},
        {id:"RAI10-AI2-Q03",type:"case-study",difficulty:"medium",marks:3,question:"A phishing detector blocks genuine school emails. What error is this?",answer:"A false positive. Too many false positives disrupt legitimate communication and reduce trust."},
        {id:"RAI10-AI2-Q04",type:"HOTS",difficulty:"hard",marks:4,question:"Why does AI in cybersecurity not remove the need for human judgement?",answer:"Security signals can be ambiguous, attackers adapt and models can make mistakes. Humans provide context, investigate incidents and choose responses."},
        {id:"RAI10-AI2-Q05",type:"mcq",difficulty:"medium",marks:1,question:"Which threat attempts to trick a user into revealing confidential information through a fake message or website?",options:["Phishing","Defragmentation","Compilation","Compression"],answer:"Phishing",explanation:"Phishing uses deception to obtain information or trigger unsafe actions."},
        {id:"RAI10-AI2-Q06",type:"case-study",difficulty:"hard",marks:4,question:"A school deploys an AI alert system that flags unusual login locations. Give one benefit and one limitation.",answer:"Benefit: it can rapidly highlight potentially suspicious access. Limitation: legitimate travel or network changes can cause false positives, so alerts need investigation."}
      ]
    },
    {
      id: "x-ai-project-framework",
      title: "Components of AI Project Framework",
      weightage: 14,
      topics: ["Problem Scoping", "Data Acquisition", "Data Exploration", "Modelling", "Evaluation", "Responsible AI"],
      theory: [
        "Problem Scoping defines Who, What, Where and Why, plus a measurable goal and project boundaries.",
        "Data Acquisition identifies relevant data, features, reliable sources, training/testing data and system-map relationships.",
        "Data Exploration uses tables and visualisations to inspect distributions, missing values, unusual values and relationships.",
        "Modelling selects an approach appropriate to the problem and data.",
        "Evaluation checks performance on appropriate data and considers error, fairness, limitations and real-world usefulness."
      ],
      questions: [
        {id:"RAI10-AI3-Q01",type:"mcq",difficulty:"easy",marks:1,question:"Which four questions form the 4Ws used in problem scoping?",options:["Who, What, Where, Why","Who, When, Which, Whether","What, When, Where, Which","Why, When, Which, Whether"],answer:"Who, What, Where, Why"},
        {id:"RAI10-AI3-Q02",type:"short-answer",difficulty:"medium",marks:3,question:"Why should training and testing data be kept separate?",answer:"Testing data provides a more honest check of generalisation to unseen examples. Reusing training examples can make performance look artificially high."},
        {id:"RAI10-AI3-Q03",type:"case-study",difficulty:"medium",marks:4,question:"A model predicts whether a corridor is crowded. Give two features, one data-quality problem and one evaluation measure.",answer:"Features: time of day and historical footfall. Data problem: missing or incorrect counts. Evaluation: compare predictions with actual crowded/not-crowded outcomes."},
        {id:"RAI10-AI3-Q04",type:"HOTS",difficulty:"hard",marks:5,question:"A model has high overall accuracy but poor performance for one student group. Is it automatically successful?",answer:"No. Overall accuracy can hide unequal performance. Inspect group-level results, investigate causes and consider fairness and consequences of errors."},
        {id:"RAI10-AI3-Q05",type:"mcq",difficulty:"easy",marks:1,question:"Which project stage focuses on examining patterns, missing values and unusual data values?",options:["Data Exploration","Deployment only","Problem closure","Password reset"],answer:"Data Exploration"},
        {id:"RAI10-AI3-Q06",type:"short-answer",difficulty:"medium",marks:2,question:"What is the purpose of a measurable goal in an AI project?",answer:"It gives a clear criterion for judging whether the project is solving the intended problem and supports meaningful evaluation."},
        {id:"RAI10-AI3-Q07",type:"case-study",difficulty:"hard",marks:5,question:"A school collects student images for an AI attendance model without informing students or setting access controls. Identify two responsible-AI concerns and suggest one improvement.",answer:"Concerns include privacy/lack of informed notice and excessive or unsecured access to sensitive data. Improvement: define a clear purpose, provide appropriate notice/consent where required, minimise data and restrict access."}
      ]
    },
    {
      id: "x-data-python",
      title: "Introduction to Data and Programming with Python",
      weightage: 20,
      topics: ["Variables and assignment", "Operators", "Conditionals", "Loops", "Lists, tuples and strings", "Functions/modules and data processing"],
      theory: [
        "Variables store values; input should be converted to the required type before numeric processing.",
        "Lists and tuples store collections; strings support searching, slicing and transformation.",
        "Conditions choose actions; loops process repeated data efficiently.",
        "Reliable programs should use clear names, validation and tests including boundary cases."
      ],
      workedExamples: [
        {title:"Sort names",code:"names = [\"Zoya\", \"Aman\", \"Riya\", \"Kabir\"]\nnames.sort()\nprint(names)",conclusion:"The list is sorted alphabetically."},
        {title:"Count values",code:"values = [42, 67, 81, 35, 90]\ncount = 0\nfor value in values:\n    if value > 60:\n        count += 1\nprint(count)",conclusion:"Output: 3."}
      ],
      questions: [
        {id:"RAI10-PY-Q01",type:"mcq",difficulty:"easy",marks:1,question:"Which Python structure is an ordered collection that can be changed?",options:["List","Tuple","Integer","Boolean"],answer:"List"},
        {id:"RAI10-PY-Q02",type:"output-tracing",difficulty:"medium",marks:3,question:"Predict: values=[2,4,6]; total=0; for v in values: total += v; print(total).",answer:"12",explanation:"The loop accumulates 2 + 4 + 6."},
        {id:"RAI10-PY-Q03",type:"debugging",difficulty:"medium",marks:3,question:"What is wrong with age = input('Age: '); if age >= 18: print('Adult')?",answer:"input() returns a string. Convert it with int(input('Age: ')) before the numeric comparison."},
        {id:"RAI10-PY-Q04",type:"programming",difficulty:"hard",marks:5,question:"Write a Python program to read five numbers, store them in a list and print the largest without max().",answer:"Store the values, initialise largest with the first value, then loop through the remaining values and replace largest when a bigger value is found."},
        {id:"RAI10-PY-Q05",type:"HOTS",difficulty:"hard",marks:5,question:"Why are boundary-value tests important in data-processing programs?",answer:"They expose incorrect comparisons, off-by-one errors and assumptions that ordinary test cases may not reveal."},
        {id:"RAI10-PY-Q06",type:"mcq",difficulty:"medium",marks:1,question:"Which operator checks whether two values are equal in Python?",options:["==","=","!=","=>"],answer:"=="},
        {id:"RAI10-PY-Q07",type:"short-answer",difficulty:"medium",marks:2,question:"Differentiate a list and a tuple in Python.",answer:"Both store ordered collections, but lists are mutable while tuples are immutable after creation."},
        {id:"RAI10-PY-Q08",type:"case-study",difficulty:"hard",marks:4,question:"A program reads five temperatures and should report how many are above 35°C. Describe the algorithm.",answer:"Read five values into a loop, initialise a counter to zero, increment the counter whenever a temperature is greater than 35, then print the counter."},
        {id:"RAI10-PY-Q09",type:"programming",difficulty:"hard",marks:5,question:"Write a Python program that reads five marks and prints the average and whether the average is at least 50.",answer:"Read five numeric marks, maintain their sum, compute average = sum/5, then use an if condition to print the result."}
      ]
    }
  ],
  practicalAssignments: [
    "Build an automated-versus-autonomous decision table for five systems.",
    "Create a school cybersecurity awareness checklist.",
    "Complete an AI project canvas using the 4Ws, data, output and evaluation.",
    "Write a Python program to sort names alphabetically.",
    "Search for an exact word in a sentence using Python.",
    "Create a small city dataset with temperature and pollution values and summarise it.",
    "Write a Python program reporting count, minimum, maximum and average.",
    "Debug a program containing type-conversion and conditional errors.",
    "Design a simple fairness check comparing model results for two student groups.",
    "Create a five-question cybersecurity quiz and explain each answer."
  ]
};

export default ICSE_ROBOTICS_AI_CLASS_X;
