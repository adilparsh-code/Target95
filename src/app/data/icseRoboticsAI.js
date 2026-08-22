// ICSE Robotics & Artificial Intelligence
// Examination Year 2027 aligned learning content.
// Source: CISCE Robotics and Artificial Intelligence syllabus.

export const ICSE_ROBOTICS_AI = {
  id: "icse-robotics-ai",
  title: "Robotics & Artificial Intelligence",
  board: "ICSE",
  classes: ["IX", "X"],
  status: "exam-ready-content",
  source: "CISCE ICSE Examination Year 2027 Robotics and Artificial Intelligence syllabus",
  overview: "A student-friendly pathway from robotics foundations to AI concepts, data, Python, project work, cybersecurity and responsible AI thinking.",

  classIX: {
    title: "Class IX",
    writtenPaper: "2 hours · 100 marks",
    units: [
      {
        id: "robotics-introduction",
        part: "Robotics",
        title: "Introduction to Robotics",
        weightage: 10,
        learningGoals: [
          "Define robot, robotics, automation and autonomous behaviour in simple language.",
          "Distinguish a robot from a conventional machine or fixed-rule automated system.",
          "Identify major application areas such as healthcare, manufacturing, agriculture, logistics and exploration."
        ],
        keyConcepts: [
          "Robot: a programmable machine that senses, processes and acts on an environment.",
          "Robotics: the field concerned with designing, building, programming and using robots.",
          "Automation follows predefined rules; intelligent systems may adapt decisions using data or models.",
          "Most robotic systems can be understood through sensing, control/processing and actuation."
        ],
        workedExamples: [
          {
            title: "Delivery robot",
            scenario: "A delivery robot detects a person in its path, stops, chooses a safe direction and continues.",
            reasoning: ["Sensors collect environmental information.", "Controller interprets the reading and chooses an action.", "Actuators drive motors or other mechanisms to change movement."]
          },
          {
            title: "Robot versus ordinary machine",
            scenario: "Compare a washing machine timer with an obstacle-aware robot.",
            conclusion: "A timer follows a fixed program, while the robot can use current sensor input to change behaviour."
          }
        ],
        examQuestions: [
          { id: "RAI9-ROB1-Q01", type: "definition", difficulty: "easy", question: "Define robotics and state one difference between a robot and an ordinary machine.", answer: "Robotics is the field of designing, building, programming and using robots. A robot can sense its environment and act according to its programmed behaviour, while an ordinary machine may simply perform a fixed mechanical task." },
          { id: "RAI9-ROB1-Q02", type: "case-study", difficulty: "medium", question: "A hospital robot carries medicines between rooms. Identify two tasks performed by the robot and two benefits of using it.", answer: "Tasks may include navigation, carrying items and obstacle detection. Benefits include reduced repetitive human effort, consistent delivery and operation in controlled conditions." },
          { id: "RAI9-ROB1-Q03", type: "HOTS", difficulty: "hard", question: "A machine follows a fixed timer but never checks its surroundings. Should it automatically be called an intelligent robot? Explain.", answer: "No. A fixed timer alone indicates automation. A robot may be autonomous, but intelligence should be discussed in terms of sensing, decision-making, programmed behaviour and, where applicable, data-driven adaptation." },
          { id: "RAI9-ROB1-Q04", type: "mcq", difficulty: "easy", question: "Which sequence best represents a common robotic control cycle?", options: ["Sense → Process/Decide → Act", "Act → Print → Delete", "Store → Paint → Scan", "Compile → Browse → Shutdown"], answer: "Sense → Process/Decide → Act", explanation: "A robot commonly gathers input, processes it and produces an action." }
        ],
        practicalTasks: [
          "Draw and label a simple robot system showing sensor, controller and actuator.",
          "Create a table of five real-world robots, their inputs, actions and applications.",
          "Write three rules for a school-delivery robot operating safely in a corridor."
        ]
      },
      {
        id: "robot-as-system",
        part: "Robotics",
        title: "Robot as a System",
        weightage: 20,
        learningGoals: [
          "Identify input, processing/control and output/action components.",
          "Explain the role of sensors, controllers and actuators.",
          "Trace information flow through a robotic system and explain feedback at an introductory level."
        ],
        keyConcepts: [
          "Sensors provide measurements or observations.",
          "A controller or processor interprets inputs and follows control logic.",
          "Actuators create physical action such as rotation, movement, gripping or switching.",
          "Feedback compares observed conditions with a desired state and can trigger corrective action."
        ],
        sensorExamples: [
          "Ultrasonic sensor — measures distance to an obstacle.",
          "Light sensor — detects light intensity.",
          "Temperature sensor — measures temperature.",
          "Touch sensor — detects contact or pressure."
        ],
        actuatorExamples: [
          "DC motor for wheel movement.",
          "Servo motor for controlled angular movement.",
          "Buzzer, LED or relay for output signalling."
        ],
        workedExamples: [
          {
            title: "Obstacle detection",
            flow: ["Ultrasonic sensor measures distance", "Controller compares distance with threshold", "Motor control changes direction", "Robot checks again and continues"]
          },
          {
            title: "Line-following robot",
            flow: ["Sensors detect line position", "Controller determines correction", "Motors receive different speeds", "Robot shifts back toward line"]
          }
        ],
        examQuestions: [
          { id: "RAI9-ROB2-Q01", type: "classification", difficulty: "easy", question: "Classify a temperature sensor, microcontroller and motor as input, processing or output components.", answer: "Temperature sensor = input, microcontroller = processing/control, motor = output/actuator." },
          { id: "RAI9-ROB2-Q02", type: "tracing", difficulty: "medium", question: "An obstacle sensor reports a distance smaller than the safety threshold. Describe the next three logical stages.", answer: "The controller interprets the reading as an obstacle, selects a corrective action such as stop/turn, and sends a control signal to the actuator or motors." },
          { id: "RAI9-ROB2-Q03", type: "HOTS", difficulty: "hard", question: "Why is feedback useful for a robot that must keep moving at a target speed?", answer: "The robot can compare its measured speed with the target and adjust motor control when the speed differs, helping reduce error." },
          { id: "RAI9-ROB2-Q04", type: "output-tracing", difficulty: "medium", question: "A robot uses the rule: if distance < 20 cm, stop; otherwise move. For readings 35, 18, 12, 30, state the action sequence.", answer: "Move, Stop, Stop, Move." }
        ],
        practicalTasks: [
          "Draw a block diagram for an obstacle-avoiding robot.",
          "Create a sensor-to-action table for a line-following robot.",
          "Design a simple feedback loop for maintaining a target temperature."
        ]
      },
      {
        id: "robotics-concepts",
        part: "Robotics",
        title: "Concepts in Robotics",
        weightage: 20,
        learningGoals: [
          "Apply robotic concepts to movement, sensing, control and simple decision-making.",
          "Explain why rules, thresholds and feedback are useful.",
          "Design simple safe robot behaviours from observations."
        ],
        keyConcepts: [
          "Threshold-based decision: compare a sensor value with a defined limit.",
          "Control logic: convert sensor observations into one or more actions.",
          "Feedback: use current measurements to correct or maintain behaviour.",
          "Autonomy: performing a task with limited direct human control."
        ],
        workedExamples: [
          { title: "Automatic street-light idea", reasoning: ["Measure ambient light", "Compare with threshold", "Switch lights on or off", "Repeat the check"] },
          { title: "Obstacle-avoidance rule", reasoning: ["If obstacle is near, stop", "Check left/right availability", "Turn toward the safer direction", "Resume movement and keep sensing"] }
        ],
        examQuestions: [
          { id: "RAI9-ROB3-Q01", type: "reasoning", difficulty: "easy", question: "What is a threshold in a sensor-based rule? Give one example.", answer: "A threshold is a chosen limit used to trigger an action. Example: if distance is below 20 cm, stop the robot." },
          { id: "RAI9-ROB3-Q02", type: "case-study", difficulty: "medium", question: "A plant-monitoring robot reads dry soil and activates irrigation. Identify the sensor input, decision and action.", answer: "Soil-moisture reading is the input, the dryness rule is the decision, and the pump activation is the action." },
          { id: "RAI9-ROB3-Q03", type: "HOTS", difficulty: "hard", question: "A robot turns too sharply every time it detects the edge of a line. Suggest one control improvement.", answer: "Use smaller corrective changes or proportional/graded control so the motor response depends on how far the robot is from the desired line position." },
          { id: "RAI9-ROB3-Q04", type: "design", difficulty: "hard", question: "Design a four-step rule for an autonomous corridor robot that must stop for a person but continue when the path is clear.", answer: "Sense path, compare distance to safety threshold, stop while obstacle is near, resume movement once the path is clear."
          }
        ],
        practicalTasks: [
          "Write five sensor-based rules for different school robot scenarios.",
          "Make a decision table for an obstacle-avoiding robot.",
          "Compare a threshold-based system with a feedback-based system."
        ]
      },
      {
        id: "intro-ai",
        part: "Artificial Intelligence",
        title: "Introduction to Artificial Intelligence",
        weightage: 10,
        learningGoals: [
          "Explain AI in student-friendly language and distinguish AI from ordinary computation.",
          "Recognise examples of classification, recommendation, language and vision tasks.",
          "Understand that AI systems have capabilities, limitations and risks."
        ],
        keyConcepts: [
          "AI systems are designed to perform tasks associated with intelligent behaviour.",
          "AI is broader than robots; software-only systems can be AI systems.",
          "Machine learning uses data/examples to learn patterns rather than relying only on hand-written rules.",
          "Generative AI creates new content such as text, images or code from learned patterns."
        ],
        workedExamples: [
          { title: "Spam filter", reasoning: ["Input: message features", "Model/rules identify likely spam", "Output: spam or not spam", "Errors can occur and should be evaluated"] },
          { title: "Recommendation system", reasoning: ["Collect user/item signals", "Find patterns in behaviour", "Rank candidate items", "Present suggestions and learn from feedback"] }
        ],
        examQuestions: [
          { id: "RAI9-AI1-Q01", type: "definition", difficulty: "easy", question: "What is Artificial Intelligence?", answer: "Artificial Intelligence is the field of creating computational systems that can perform tasks associated with intelligent behaviour, such as recognising patterns, making predictions or understanding language." },
          { id: "RAI9-AI1-Q02", type: "classification", difficulty: "medium", question: "Classify a calculator, spam filter, voice assistant and ordinary timer as AI-enabled or non-AI examples, with reasons.", answer: "A calculator and fixed timer are generally ordinary computation/automation. A spam filter and voice assistant can use AI techniques such as learned pattern recognition or language processing." },
          { id: "RAI9-AI1-Q03", type: "HOTS", difficulty: "hard", question: "Why can an AI system give a wrong answer even when it has been trained on many examples?", answer: "Training data may be incomplete, biased, noisy or different from the new case; the model can also have limitations or make uncertain predictions." },
          { id: "RAI9-AI1-Q04", type: "responsible-ai", difficulty: "medium", question: "State two responsible-use concerns when an AI system processes student data.", answer: "Privacy and security are concerns; fairness, transparency, consent and avoiding inappropriate profiling are also important." }
        ],
        practicalTasks: [
          "List ten everyday systems and classify each as AI, automation or ordinary computation.",
          "Create a comparison chart: rule-based system versus machine-learning system.",
          "Write a short reflection on one benefit and one risk of generative AI in education."
        ]
      },
      {
        id: "data-information-evolution",
        part: "Artificial Intelligence",
        title: "Role of Data and Information, Evolution of Computing",
        weightage: 10,
        learningGoals: [
          "Distinguish raw data from processed information.",
          "Explain why relevant, accurate and representative data matters.",
          "Connect computing evolution with increasing data, automation and intelligent applications."
        ],
        keyConcepts: [
          "Data: raw observations or recorded values.",
          "Information: processed data that has useful meaning in context.",
          "Data quality dimensions include accuracy, completeness, relevance and consistency.",
          "Poor or biased data can produce poor decisions or unfair model behaviour."
        ],
        workedExamples: [
          { title: "Student attendance", reasoning: ["Raw values: dates and attendance marks", "Process values by week/month", "Information: attendance percentage and trends", "Decision: identify support needs while protecting privacy"] },
          { title: "Data quality check", checklist: ["Are values missing?", "Are units consistent?", "Are labels correct?", "Does the dataset represent the intended group?"] }
        ],
        examQuestions: [
          { id: "RAI9-AI2-Q01", type: "concept", difficulty: "easy", question: "Differentiate between data and information with one example.", answer: "Data is raw recorded values; information is processed data that communicates meaning. Example: raw marks are data, while a calculated class average is information." },
          { id: "RAI9-AI2-Q02", type: "case-study", difficulty: "medium", question: "An AI attendance model is trained using records from only one small school. State two limitations when using it elsewhere.", answer: "The data may not represent different schools or populations, and local patterns may not generalise. The model may therefore perform poorly or unfairly outside its training context." },
          { id: "RAI9-AI2-Q03", type: "HOTS", difficulty: "hard", question: "Why should duplicate or inconsistent records be cleaned before many data-analysis tasks?", answer: "Duplicates can distort counts and inconsistent formats can make values difficult to compare, producing misleading summaries or model input." }
        ],
        practicalTasks: [
          "Take a small classroom dataset and label each item as data or information after processing.",
          "Create a data-quality checklist and apply it to a sample table.",
          "Build a short timeline of major computing eras and one important capability from each."
        ]
      },
      {
        id: "data-python",
        part: "Artificial Intelligence",
        title: "Introduction to Data and Programming with Python",
        weightage: 20,
        learningGoals: [
          "Use variables, input, output, operators and conditions in simple Python programs.",
          "Trace code and predict outputs accurately.",
          "Use lists and loops for small data-processing tasks."
        ],
        keyConcepts: [
          "Variables store values for later use.",
          "input() reads text; convert numeric input with int() or float() when needed.",
          "if/elif/else chooses actions based on conditions.",
          "Lists hold multiple values; loops process them efficiently.",
          "Clear variable names and comments improve readability."
        ],
        workedExamples: [
          {
            title: "Classify a score",
            code: "score = int(input('Enter score: '))\nif score >= 90:\n    print('Excellent')\nelif score >= 60:\n    print('Good')\nelse:\n    print('Needs practice')",
            walkthrough: ["Read a score", "Convert text input to integer", "Test conditions from top to bottom", "Print the first matching result"]
          },
          {
            title: "Average of observations",
            code: "values = [10, 12, 8, 15]\ntotal = 0\nfor value in values:\n    total += value\naverage = total / len(values)\nprint(average)",
            walkthrough: ["Store observations in a list", "Accumulate total", "Divide by number of values", "Print the result"]
          }
        ],
        examQuestions: [
          { id: "RAI9-PY-Q01", type: "output", difficulty: "easy", question: "What is printed by: x = 5; y = 2; print(x + y * 2)?", answer: "9", explanation: "Multiplication occurs before addition: 2 × 2 = 4, then 5 + 4 = 9." },
          { id: "RAI9-PY-Q02", type: "debugging", difficulty: "medium", question: "Identify the problem in: age = input('Age: '); print(age + 1)", answer: "input() returns text, so age must be converted to int before adding 1: age = int(input('Age: '))." },
          { id: "RAI9-PY-Q03", type: "output-tracing", difficulty: "medium", question: "Predict the output: values=[2,4,6]; total=0; for v in values: total += v; print(total).", answer: "12", explanation: "The loop adds 2, then 4, then 6." },
          { id: "RAI9-PY-Q04", type: "programming", difficulty: "medium", question: "Write a Python program that reads five numbers and prints how many are greater than 50.", answer: "Use a loop, increment a counter when the current number is greater than 50, then print the counter." },
          { id: "RAI9-PY-Q05", type: "HOTS", difficulty: "hard", question: "A list contains repeated measurements. Suggest one reason for using a loop instead of writing separate statements for every item.", answer: "A loop scales to changing list size, reduces repetition and lowers the chance of copy-paste errors." }
        ],
        practicalTasks: [
          "Write and trace a score classifier.",
          "Process a list of temperatures and print the maximum, minimum and average.",
          "Write a small Python program to count values meeting a chosen condition.",
          "Debug three short programs containing type-conversion and indentation mistakes."
        ]
      },
      {
        id: "ai-concepts-project-framework",
        part: "Artificial Intelligence",
        title: "AI Concepts and AI Project Framework",
        weightage: 10,
        learningGoals: [
          "Turn a real-world need into a clear AI project statement.",
          "Identify stakeholders, inputs, outputs, data needs and evaluation criteria.",
          "Discuss privacy, bias, fairness, safety and limitations."
        ],
        keyConcepts: [
          "Problem scoping: define what the system should and should not do.",
          "Data: identify what is needed, where it comes from and whether its use is appropriate.",
          "Evaluation: decide how success will be measured before claiming a system works.",
          "Responsible AI: consider privacy, consent, fairness, explainability, safety and misuse."
        ],
        workedExamples: [
          {
            title: "Smart waste sorting project",
            framework: ["Problem: mixed waste in school bins", "Users: students and housekeeping staff", "Input: labelled images or observations", "Output: predicted waste category", "Evaluation: accuracy on unseen examples", "Risk: wrong classification and privacy if people appear in images"]
          },
          {
            title: "Study-support assistant",
            framework: ["Problem: help students revise topics", "Input: selected topics and preferences", "Output: practice plan", "Evaluation: usefulness and correctness", "Safety: avoid collecting unnecessary personal data"]
          }
        ],
        examQuestions: [
          { id: "RAI9-AIP-Q01", type: "framework", difficulty: "easy", question: "Name four essential elements that should be defined before building an AI project.", answer: "Problem statement, intended users/stakeholders, inputs/data, expected output and a way to evaluate success are key elements." },
          { id: "RAI9-AIP-Q02", type: "case-study", difficulty: "medium", question: "A school wants an AI system to predict which students need academic support. What data and ethical safeguards should be considered?", answer: "Relevant learning indicators may include assessed performance and attendance where appropriate. Safeguards should include privacy, limited access, transparency, human review and avoiding unfair labelling from incomplete data." },
          { id: "RAI9-AIP-Q03", type: "HOTS", difficulty: "hard", question: "Why is accuracy alone not enough to evaluate an AI system used in school decision-making?", answer: "Accuracy does not reveal fairness across groups, harmful false positives/negatives, privacy risks or whether the system is appropriate for the decision." },
          { id: "RAI9-AIP-Q04", type: "design", difficulty: "hard", question: "Write a compact AI project statement for reducing food waste in a school cafeteria.", answer: "Design a system that uses historical meal-demand and waste data to estimate quantities needed, while protecting student privacy and evaluating prediction error against actual waste." }
        ],
        practicalTasks: [
          "Complete a one-page AI project canvas for a school problem.",
          "Create a risk register listing at least four possible AI risks and mitigations.",
          "Present a project idea with problem, data, output, evaluation and responsible-use considerations."
        ]
      }
    ],
    questionBank: {
      mcqs: [
        { id: "RAI9-MCQ-01", question: "Which component detects information from the environment in a robot?", options: ["Sensor", "Actuator", "Frame", "Wheel only"], answer: "Sensor", explanation: "A sensor collects information." },
        { id: "RAI9-MCQ-02", question: "Which sequence best describes a common robotic control cycle?", options: ["Sense → Process → Act", "Act → Delete → Print", "Compile → Browse → Shutdown", "Store → Paint → Scan"], answer: "Sense → Process → Act", explanation: "Robots commonly sense, decide and act." },
        { id: "RAI9-MCQ-03", question: "Which example is most clearly AI-enabled?", options: ["Voice assistant interpreting speech", "Basic calculator", "Mechanical switch", "Simple timer"], answer: "Voice assistant interpreting speech", explanation: "Speech understanding can use AI techniques." },
        { id: "RAI9-MCQ-04", question: "What is information?", options: ["Processed data with useful meaning", "Any random number", "Only a file name", "A hardware component"], answer: "Processed data with useful meaning", explanation: "Information is data interpreted in context." },
        { id: "RAI9-MCQ-05", question: "What does Python input() normally return?", options: ["Text/string", "Always integer", "Always float", "Boolean only"], answer: "Text/string", explanation: "Convert it when numeric processing is required." },
        { id: "RAI9-MCQ-06", question: "Which concern is part of responsible AI?", options: ["Privacy", "Ignoring data quality", "Removing testing", "Hiding all limitations"], answer: "Privacy", explanation: "Responsible systems consider privacy and other risks." }
      ],
      outputTracing: [
        { id: "RAI9-TRACE-01", question: "A robot rule says: if distance < 10, stop; else move. For 7, 14, 5, 20, what actions occur?", answer: "Stop, Move, Stop, Move." },
        { id: "RAI9-TRACE-02", question: "Python: x=3; for i in range(1,4): x=x+i; print(x).", answer: "9", explanation: "x changes 3 → 4 → 6 → 9." },
        { id: "RAI9-TRACE-03", question: "Python: data=[1,3,5]; count=0; for n in data: if n>2: count+=1; print(count).", answer: "2", explanation: "3 and 5 satisfy the condition." }
      ],
      assertionReasoning: [
        { id: "RAI9-AR-01", assertion: "A sensor is an input device in a robotic system.", reason: "It collects information from the environment.", answer: "Both are true, and the reason correctly explains the assertion." },
        { id: "RAI9-AR-02", assertion: "Good data guarantees an AI system will always be correct.", reason: "Models can still have limitations and uncertainty.", answer: "Assertion is false; reason is true." }
      ],
      caseStudies: [
        { id: "RAI9-CS-01", title: "Smart classroom environment", prompt: "Design a system that monitors light and temperature. Identify sensors, actions, decision rules, useful data and one privacy/safety consideration." },
        { id: "RAI9-CS-02", title: "School waste reduction", prompt: "Propose an AI project using historical waste data. State inputs, output, evaluation metric and one ethical consideration." },
        { id: "RAI9-CS-03", title: "Obstacle-aware robot", prompt: "A robot detects an obstacle at 15 cm with a threshold of 20 cm. Explain the immediate action and one improvement to the control rule." }
      ],
      projectRubric: [
        { criterion: "Problem definition", excellent: "Specific, measurable and relevant problem statement." },
        { criterion: "Data/input plan", excellent: "Relevant, sufficient and responsibly sourced data." },
        { criterion: "Logic/prototype", excellent: "Clear workflow with sensible decisions and testing." },
        { criterion: "Evaluation", excellent: "Defines a meaningful success measure and discusses limitations." },
        { criterion: "Responsible use", excellent: "Explicitly addresses privacy, fairness, safety or misuse." },
        { criterion: "Communication", excellent: "Explains the solution clearly with evidence and visuals." }
      ]
    }
  },

  classX: {
    title: "Class X",
    status: "planned-for-next-content-pass",
    plannedUnits: [
      "Decision Making in Machines",
      "Machine Intelligence and Cybersecurity",
      "AI Project Framework",
      "Python and applied AI practice"
    ],
    note: "Populate against the corresponding CISCE Class X syllabus before production sign-off; do not treat this placeholder as exam-ready content."
  },

  projectFramework: [
    "Identify a meaningful real-world problem.",
    "Define users, inputs and desired output.",
    "Collect and inspect relevant data where appropriate.",
    "Choose a suitable AI or robotics approach.",
    "Build and test a prototype.",
    "Evaluate results and communicate limitations.",
    "Consider privacy, fairness, safety and responsible use."
  ],

  starterProjectIdeas: [
    "Smart classroom entry assistant",
    "Waste classification helper",
    "School energy-use awareness system",
    "Obstacle-aware mini robot",
    "Student study-pattern data explorer"
  ]
};

export default ICSE_ROBOTICS_AI;
