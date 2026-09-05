const chapter = {
  id: "constructors",
  title: "Constructors",
  slug: "constructors",
  subject: "Java Programming",
  difficulty: "Advanced",
  estimatedTime: 65,
  topics: ["constructor definition", "default constructor", "parameterized constructor", "constructor overloading", "this()", "constructor vs method"],
  introduction: {
    description: "A constructor is a special member of a class used to initialize an object when it is created. It has the same name as the class and has no return type.",
    realLifeExamples: ["A Student object can receive its name and roll number when it is created.", "A BankAccount object can start with an opening balance."]
  },
  theoryNotes: {
    beginnerExplanation: "When new is used, Java creates an object and invokes a matching constructor. Constructors give the object its initial state.",
    importantPoints: [
      "Constructor name must exactly match the class name.",
      "A constructor has no return type, not even void.",
      "A no-argument constructor takes no parameters.",
      "A parameterized constructor receives values used for initialization.",
      "A class can have more than one constructor through constructor overloading.",
      "this() calls another constructor of the same class and must be the first statement.",
      "If no constructor is written, Java supplies a default no-argument constructor.",
      "A constructor is invoked automatically when an object is created."
    ],
    syntax: ["ClassName() { ... }", "ClassName(parameterList) { ... }", "this(arguments);"]
  },
  examples: [
    { title: "Parameterized constructor", code: "class Student {\n    String name;\n    int marks;\n\n    Student(String n, int m) {\n        name = n;\n        marks = m;\n    }\n}\n\nStudent s = new Student(\"Aman\", 85);", explanation: "The constructor initializes name and marks at object creation." },
    { title: "Constructor overloading", code: "class Box {\n    int length;\n\n    Box() { length = 1; }\n    Box(int l) { length = l; }\n}", explanation: "Java selects the constructor whose parameter list matches the call." }
  ],
  commonMistakes: ["Writing void before a constructor name.", "Using a constructor name different from the class name.", "Putting this() after another statement.", "Confusing a constructor with a normal method."],
  practiceQuestions: [
    { id: "CON-01", type: "conceptual", question: "State two differences between a constructor and a method.", answer: "A constructor has the class name and no return type; a method may have any valid name and a return type or void." },
    { id: "CON-02", type: "tracing", question: "How many times is the constructor called in Student a = new Student(\"Riya\", 90);?", answer: "Once." },
    { id: "CON-03", type: "programming", question: "Write a class Rectangle with a parameterized constructor that initializes length and breadth and a method area() that returns the area.", answer: "Use Rectangle(int l, int b) to initialize the instance variables and return length * breadth from area()." }
  ],
  summary: "Constructors initialize objects, are automatically invoked with new, have no return type, and can be overloaded."
};

export default chapter;
