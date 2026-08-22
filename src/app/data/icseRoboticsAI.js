// ICSE Robotics & Artificial Intelligence (66)
// Official ICSE Examination Year 2027-aligned content foundation.
// Source: CISCE Robotics and Artificial Intelligence syllabus.

export const ICSE_ROBOTICS_AI = {
  id: "icse-robotics-ai",
  title: "Robotics & Artificial Intelligence",
  board: "ICSE",
  classes: ["IX", "X"],
  status: "content-foundation",
  source: "CISCE ICSE Examination Year 2027 Robotics and Artificial Intelligence syllabus",
  overview:
    "A hands-on pathway covering robotics systems, artificial intelligence, data, Python, AI concepts, project work and responsible use of AI.",
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
          "Understand what a robot is and how robotics differs from ordinary machines.",
          "Recognise common applications of robots in real life.",
          "Identify the basic role of sensing, processing and action in a robotic system.",
        ],
        practice: [
          "Define robotics and distinguish a robot from a simple automated machine.",
          "Give three real-world applications of robots and explain the task performed in each.",
          "Identify the sensing, decision and action stages in a simple delivery robot.",
        ],
      },
      {
        id: "robot-as-system",
        part: "Robotics",
        title: "Robot as a System",
        weightage: 20,
        learningGoals: [
          "Break a robot into input, processing/control and output/action components.",
          "Understand sensors, actuators and controllers at an introductory level.",
          "Trace how information moves through a robotic system.",
        ],
        practice: [
          "Map a line-following robot's sensor readings to its motor actions.",
          "Compare an ultrasonic sensor and a motor as input and output devices.",
          "Draw a block diagram of a robot that detects an obstacle and changes direction.",
        ],
      },
      {
        id: "robotics-concepts",
        part: "Robotics",
        title: "Concepts in Robotics",
        weightage: 20,
        learningGoals: [
          "Understand core robotic concepts through practical examples.",
          "Relate sensing, movement and control to an observed robot behaviour.",
          "Apply concepts to simple hands-on problem scenarios.",
        ],
        practice: [
          "Predict how a robot should respond to two different sensor readings.",
          "Design a simple rule-based behaviour for an obstacle-avoiding robot.",
          "Explain why feedback is useful when a robot must maintain a target state.",
        ],
      },
      {
        id: "intro-ai",
        part: "Artificial Intelligence",
        title: "Introduction to Artificial Intelligence",
        weightage: 10,
        learningGoals: [
          "Understand AI as the study of systems performing tasks associated with human intelligence.",
          "Distinguish AI examples from ordinary fixed-rule automation.",
          "Recognise common AI-enabled applications.",
        ],
        practice: [
          "Classify examples as AI-enabled, rule-based automation or ordinary computation.",
          "Explain one everyday example of AI and identify the task it performs.",
          "Describe why an AI system depends on data or examples for many tasks.",
        ],
      },
      {
        id: "data-information-evolution",
        part: "Artificial Intelligence",
        title: "Role of Data and Information, Evolution of Computing",
        weightage: 10,
        learningGoals: [
          "Distinguish data from processed information.",
          "Understand why data quality matters when building intelligent systems.",
          "Connect the evolution of computing to increasing data and automation capabilities.",
        ],
        practice: [
          "Convert a raw student-score dataset into a useful information statement.",
          "Explain how incomplete or incorrect data can affect an AI system.",
          "Build a short timeline showing major stages in the evolution of computing.",
        ],
      },
      {
        id: "data-python",
        part: "Artificial Intelligence",
        title: "Introduction to Data and Programming with Python",
        weightage: 20,
        learningGoals: [
          "Understand basic data ideas used in AI contexts.",
          "Build beginner Python skills for simple data and computational tasks.",
          "Read, modify and explain small Python programs.",
        ],
        practice: [
          "Write Python code using variables, input, output and simple arithmetic.",
          "Use conditions to classify a value into categories.",
          "Trace a short Python program and predict its output.",
          "Write a small program that processes a list of observations.",
        ],
      },
      {
        id: "ai-concepts-project-framework",
        part: "Artificial Intelligence",
        title: "AI Concepts and AI Project Framework",
        weightage: 10,
        learningGoals: [
          "Understand key introductory AI concepts and project thinking.",
          "Break a problem into a clear AI project workflow.",
          "Recognise the importance of responsible and ethical AI use.",
        ],
        practice: [
          "Turn a school problem into an AI project statement.",
          "Identify the problem, data, expected output and evaluation idea for a proposed AI project.",
          "Discuss one ethical risk such as privacy, bias or misuse and suggest a safeguard.",
        ],
      },
    ],
  },
  classX: {
    title: "Class X",
    note: "Class X continuation will be populated from the corresponding CISCE syllabus before production sign-off.",
    plannedUnits: [
      "Decision Making in Machines",
      "Machine Intelligence and Cybersecurity",
      "AI Project Framework",
      "Python and applied AI practice",
    ],
  },
  projectFramework: [
    "Identify a meaningful real-world problem.",
    "Define the users, inputs and desired output.",
    "Collect and inspect relevant data where appropriate.",
    "Choose a suitable AI/robotics approach.",
    "Build and test a prototype.",
    "Evaluate results and communicate limitations.",
    "Consider privacy, fairness, safety and responsible use.",
  ],
  starterMCQs: [
    {
      id: "RAI9-MCQ-01",
      question: "Which component detects information from the environment in a robot?",
      options: ["Sensor", "Actuator", "Frame", "Wheel only"],
      answer: "Sensor",
      explanation: "A sensor gathers information from the robot's environment or internal state.",
    },
    {
      id: "RAI9-MCQ-02",
      question: "Which statement best describes AI?",
      options: ["A system that can perform tasks associated with intelligent behaviour", "Only a mechanical machine", "A type of monitor", "A programming keyword"],
      answer: "A system that can perform tasks associated with intelligent behaviour",
      explanation: "AI concerns computational systems performing tasks associated with aspects of human intelligence.",
    },
    {
      id: "RAI9-MCQ-03",
      question: "Why is data quality important in AI?",
      options: ["Poor data can lead to unreliable results", "AI never uses data", "It changes the keyboard", "It removes the need for testing"],
      answer: "Poor data can lead to unreliable results",
      explanation: "Data quality directly affects what an AI system can learn or infer.",
    },
    {
      id: "RAI9-MCQ-04",
      question: "Which language is introduced for programming practice in the Class IX syllabus?",
      options: ["Python", "Java only", "SQL only", "HTML only"],
      answer: "Python",
      explanation: "The Class IX Robotics and AI syllabus includes introduction to data and programming with Python.",
    },
  ],
  starterProjectIdeas: [
    "Smart classroom entry assistant",
    "Waste classification helper",
    "School energy-use awareness system",
    "Obstacle-aware mini robot",
    "Student study-pattern data explorer",
  ],
};

export default ICSE_ROBOTICS_AI;
