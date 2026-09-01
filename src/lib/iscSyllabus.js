/**
 * ISC 2028 Computer Science syllabus registry.
 * Source of truth for ISC XI/XII academic routing and completion tracking.
 */

export const ISC_BOARD = "ISC";
export const ISC_CLASS_XI = { board: ISC_BOARD, class: "ISC XI", subject: "Computer Science" };
export const ISC_CLASS_XII = { board: ISC_BOARD, class: "ISC XII", subject: "Computer Science" };

export const ISC_XI_TOPICS = [
  { id: "xi-system-of-numeration", section: "A", title: "System of Numeration", class: "ISC XI", estimatedTime: 90 },
  { id: "xi-encodings", section: "A", title: "Encodings", class: "ISC XI", estimatedTime: 60 },
  { id: "xi-propositional-logic-hardware", section: "A", title: "Propositional Logic, Hardware Implementation and Arithmetic Operations", class: "ISC XI", estimatedTime: 120 },
  { id: "xi-oop-java", section: "B", title: "Introduction to Object Oriented Programming using Java", class: "ISC XI", estimatedTime: 90 },
  { id: "xi-objects", section: "B", title: "Objects", class: "ISC XI", estimatedTime: 75 },
  { id: "xi-primitive-wrapper-casting", section: "B", title: "Primitive Values, Wrapper Classes, Types and Casting", class: "ISC XI", estimatedTime: 90 },
  { id: "xi-variables-expressions", section: "B", title: "Variables, Expressions", class: "ISC XI", estimatedTime: 75 },
  { id: "xi-statements-scope", section: "B", title: "Statements, Scope", class: "ISC XI", estimatedTime: 100 },
  { id: "xi-methods-constructors", section: "B", title: "Methods and Constructors", class: "ISC XI", estimatedTime: 110 },
  { id: "xi-arrays-strings", section: "B", title: "Arrays, Strings", class: "ISC XI", estimatedTime: 120 },
  { id: "xi-text-file-handling", section: "B", title: "Basic Input/Output and Text File Handling", class: "ISC XI", estimatedTime: 100 },
  { id: "xi-python", section: "C", title: "Introduction to Python", class: "ISC XI", estimatedTime: 120 },
  { id: "xi-trends-ethics", section: "C", title: "Trends in Computing and Ethical Issues", class: "ISC XI", estimatedTime: 75 },
];

export const ISC_XI_PRACTICAL = {
  javaAssignmentsMinimum: 15,
  pythonAssignmentsMinimum: 5,
  totalAssignmentsMinimum: 20,
  projects: 1,
  practicalLanguage: "Java",
};

export const ISC_XII_TOPICS = [
  { id: "xii-boolean-algebra", section: "A", title: "Boolean Algebra", class: "ISC XII", estimatedTime: 120 },
  { id: "xii-canonical-forms", section: "A", title: "Canonical Forms", class: "ISC XII", estimatedTime: 90 },
  { id: "xii-k-map", section: "A", title: "Karnaugh Maps", class: "ISC XII", estimatedTime: 90 },
  { id: "xii-combinational-logic", section: "A", title: "Combinational Logic", class: "ISC XII", estimatedTime: 90 },
  { id: "xii-java-computer-science", section: "B", title: "Advanced Java and Computer Science", class: "ISC XII", estimatedTime: 150 },
];

// Keep syllabus verification required until every mapped block has passed the audit.
export const ISC_XII_VERIFICATION_REQUIRED = true;

export const getISCClassXITopic = (id) => ISC_XI_TOPICS.find((topic) => topic.id === id) ?? null;
export const getISCClassXIITopic = (id) => ISC_XII_TOPICS.find((topic) => topic.id === id) ?? null;
export const getISCClassTopics = (className) => className === "ISC XII" ? ISC_XII_TOPICS : ISC_XI_TOPICS;
