/**
 * ICSE Class IX Computer Applications project contract.
 *
 * Authority: CISCE, ICSE Computer Applications (86), Examination Year 2028,
 * January 2026 syllabus PDF. The syllabus explicitly requires a written
 * project on Ethical Computing as part of Internal Assessment.
 */

export const ICSE_CLASS_IX_PROJECT_SOURCE = {
  board: "CISCE",
  examinationYear: 2028,
  subject: "Computer Applications",
  subjectCode: "86",
  class: "IX",
  section: "Internal Assessment",
  sourceTitle: "ICSE Computer Applications (86) — Examination Year 2028",
  sourceDate: "January 2026",
  sourceUrl: "https://cisce.org/wp-content/uploads/2026/01/18.-Computer-Applications.pdf",
};

export const ICSE_CLASS_IX_PROJECT = {
  id: "icse-ix-ethical-computing",
  class: "ICSE IX",
  board: "CISCE",
  subject: "Computer Applications",
  title: "Ethical Computing — Written Project",
  slug: "ethical-computing",
  status: "official-topic",
  officialRequirement:
    "The Class IX syllabus requires a project on Ethical Computing and states that this topic is considered for Internal Assessment.",
  assessment: {
    internalAssessmentTotal: 100,
    assignments: 80,
    writtenProject: 20,
    writtenProjectBreakdown: [
      { criterion: "Introduction", marks: 3 },
      { criterion: "Content", marks: 8 },
      { criterion: "Presentation", marks: 5 },
      { criterion: "Conclusion/Summary", marks: 4 },
    ],
  },
  officialScope: [
    "Intellectual property rights (copyright and patent)",
    "Safety measures for protecting an individual's right to privacy",
    "Data protection on the internet",
    "Protection against spam",
    "Software piracy",
    "Cyber ethics",
    "Online safety",
    "Digital etiquette",
    "Responsible social media use",
  ],
  targetOutcomes: [
    "Explain why ethical behaviour matters in computing.",
    "Distinguish copyright, patent, plagiarism and software piracy.",
    "Identify common privacy and data-protection risks online.",
    "Describe practical ways to reduce spam, scams and unsafe sharing.",
    "Evaluate social-media behaviour using digital-etiquette principles.",
    "Present evidence-based recommendations in a structured written project.",
  ],
  suggestedTitle:
    "Responsible Digital Citizenship: Privacy, Intellectual Property, Cyber Safety and Social Media Ethics",
  sections: [
    {
      title: "1. Introduction",
      purpose: "Introduce ethical computing and explain why responsible technology use matters to students and society.",
    },
    {
      title: "2. Intellectual Property Rights",
      purpose: "Explain copyright and patents, with simple school-level examples of legitimate and illegitimate use.",
    },
    {
      title: "3. Privacy and Personal Data",
      purpose: "Explain personal information, privacy risks, consent, strong passwords, safe sharing and account protection.",
    },
    {
      title: "4. Data Protection on the Internet",
      purpose: "Discuss safe browsing, phishing awareness, secure websites, device updates and responsible data handling.",
    },
    {
      title: "5. Spam and Online Threats",
      purpose: "Describe spam, suspicious messages and basic steps for reporting, blocking and avoiding unsafe links or attachments.",
    },
    {
      title: "6. Software Piracy and Plagiarism",
      purpose: "Explain why unauthorised copying is unethical and how students can use licensed, open-source or properly attributed material.",
    },
    {
      title: "7. Cyber Ethics and Social Media",
      purpose: "Cover respectful communication, digital footprint, cyberbullying awareness, misinformation and responsible posting.",
    },
    {
      title: "8. Student Safety Checklist",
      purpose: "Turn the research into a practical checklist that a Class IX student can actually follow.",
    },
    {
      title: "9. Conclusion / Summary",
      purpose: "Summarise the key lessons and explain how ethical choices improve digital life.",
    },
    {
      title: "10. References",
      purpose: "List the sources used for facts, definitions, images and examples; do not present copied material as original work.",
    },
  ],
  evidenceIdeas: [
    "A short comparison table: ethical vs unethical digital behaviour.",
    "A privacy-safety checklist for student accounts.",
    "A copyright / plagiarism example with the correct attribution method.",
    "A simple flowchart for handling a suspicious message.",
    "A social-media do/don't table based on digital etiquette.",
  ],
  vivaQuestions: [
    "What is meant by ethical computing?",
    "Differentiate copyright and patent.",
    "Why should personal information not be shared carelessly online?",
    "What is software piracy?",
    "What is spam and how can it be handled safely?",
    "What is a digital footprint?",
    "Give two examples of responsible social-media behaviour.",
    "Why is plagiarism unethical in a school project?",
    "How can you protect your online accounts?",
    "Why should project sources and images be acknowledged?",
  ],
};

export const ICSE_CLASS_IX_PROJECT_NAV = [
  {
    id: ICSE_CLASS_IX_PROJECT.id,
    title: ICSE_CLASS_IX_PROJECT.title,
    href: "/icse/class-ix/projects/ethical-computing",
    badge: "Official syllabus topic",
  },
];
