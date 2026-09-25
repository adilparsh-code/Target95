/**
 * ICSE Class X Computer Applications written-project contract.
 *
 * Authority: the Target95 ICSE syllabus registry (`src/lib/icseSyllabus.js`),
 * topic `x-disruptive-technologies` in the "Emerging Technologies" unit, which
 * is flagged `isProject: true`. The topic scope below is the syllabus scope
 * already stored in that registry and in the Class X practice chapter
 * (`src/app/data/question-bank/20-disruptive-technologies.js`).
 *
 * Nothing here adds a new syllabus topic: the sections simply expand the
 * official topic description into a student-usable report structure.
 */

export const ICSE_CLASS_X_PROJECT_SOURCE = {
  board: "CISCE",
  subject: "Computer Applications",
  class: "X",
  syllabusUnit: "Emerging Technologies",
  topicId: "x-disruptive-technologies",
  topicSlug: "disruptive-technologies",
  sourceTitle: "ICSE Computer Applications — Class X, Emerging Technologies (Disruptive Technologies)",
  sourceRegistry: "src/lib/icseSyllabus.js",
  practiceChapter: "/Java/disruptive-technologies",
};

export const ICSE_CLASS_X_PROJECT = {
  id: "icse-x-disruptive-technologies",
  class: "ICSE X",
  board: "CISCE",
  subject: "Computer Applications",
  title: "Disruptive Technologies — Written Project",
  slug: "disruptive-technologies",
  status: "official-topic",
  officialRequirement:
    "Disruptive Technologies is a Class X Computer Applications topic in the Emerging Technologies unit and is assessed as project work, kept separate from the normal programming assignments.",
  officialScope: [
    "Artificial Intelligence (AI) and its real-world applications",
    "Machine learning basics and how models learn patterns from data",
    "Cloud computing and on-demand access to computing resources",
    "Internet of Things (IoT) and connected sensors/devices",
    "Big Data and the volume, velocity and variety of modern data",
    "Cybersecurity basics and everyday account protection",
    "Impact of these technologies on society",
    "Ethical considerations in using these technologies",
  ],
  suggestedTitle:
    "Disruptive Technologies in Daily Life: AI, Machine Learning, Cloud, IoT, Big Data and Cybersecurity",
  targetOutcomes: [
    "Explain each emerging technology in simple, exam-ready language.",
    "Give at least one real Indian or everyday-life example for every technology covered.",
    "Describe one benefit and one risk for each technology you study.",
    "Use evidence from reliable sources instead of copied paragraphs.",
    "Discuss societal impact and ethical concerns with balanced arguments.",
    "Present the project as a structured written report and defend it in a viva.",
  ],
  sections: [
    {
      title: "1. Introduction",
      purpose:
        "Define disruptive technology in your own words, state why the topic matters in 2026-27, and list the technologies the project will cover.",
    },
    {
      title: "2. Artificial Intelligence",
      purpose:
        "Define AI, distinguish it from machine learning, and give two real applications (for example education or healthcare) with one limitation each.",
    },
    {
      title: "3. Machine Learning Basics",
      purpose:
        "Explain that models learn patterns from data instead of following only hand-written rules, and describe a simple training-data → prediction flow.",
    },
    {
      title: "4. Cloud Computing",
      purpose:
        "Explain on-demand access to storage and processing over a network, and compare it with storing everything on a personal device.",
    },
    {
      title: "5. Internet of Things",
      purpose:
        "Describe how sensors and connected devices collect and exchange data, and trace one example such as a smart classroom or a wearable device.",
    },
    {
      title: "6. Big Data",
      purpose:
        "Explain volume, velocity and variety, and show why ordinary tools struggle with very large or fast-changing data sets.",
    },
    {
      title: "7. Cybersecurity Basics",
      purpose:
        "Cover unique strong passwords, multi-factor authentication, phishing awareness, and why OTPs must never be shared.",
    },
    {
      title: "8. Impact on Society",
      purpose:
        "Discuss how these technologies change education, work, communication and daily life, including possible effects on jobs and access.",
    },
    {
      title: "9. Ethical Considerations",
      purpose:
        "Explain data bias, privacy, consent and responsible use, using the school-AI-selection case as an example of unfair outcomes.",
    },
    {
      title: "10. Conclusion and Suggestions",
      purpose:
        "Summarise the key learning, state one realistic suggestion for schools and one for students, and avoid introducing new claims.",
    },
    {
      title: "11. References",
      purpose:
        "List every source used for facts, definitions, statistics and images, with enough detail for a teacher to verify them.",
    },
  ],
  evidenceIdeas: [
    "A one-page comparison table: technology | how it works | everyday example | benefit | risk.",
    "A labelled diagram of a smart-classroom IoT system: sensor → gateway → cloud → dashboard.",
    "A machine-learning flow strip: training data → model → prediction → feedback.",
    "A phishing-message example with the warning signs annotated.",
    "A short do/don't table for responsible AI use in school projects.",
  ],
  vivaQuestions: [
    "What is disruptive technology?",
    "Differentiate between artificial intelligence and machine learning.",
    "How does a machine-learning model learn from data?",
    "What is cloud computing, and how is it different from local storage?",
    "What is the Internet of Things?",
    "What is Big Data, and what are volume, velocity and variety?",
    "What is multi-factor authentication and why does it help?",
    "Why should a student never share an OTP?",
    "Give one benefit and one risk of AI in education.",
    "What is data bias and how can it be reduced?",
    "How has technology changed society, and what job effects should be expected?",
    "Why must a project acknowledge its sources?",
  ],
};

export const ICSE_CLASS_X_PROJECT_NAV = [
  {
    id: ICSE_CLASS_X_PROJECT.id,
    title: ICSE_CLASS_X_PROJECT.title,
    href: "/icse/class-x/projects",
    badge: "Official syllabus topic",
  },
];

export default ICSE_CLASS_X_PROJECT;
