const chapter19 = {
  id: 19,
  title: "OOP Concepts Overview",
  slug: "oop-concepts",
  description: "Comprehensive review of OOP principles: Encapsulation, Inheritance, Polymorphism, and Abstraction.",
  topics: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "OOP Principles"],
  mcqs: [
    {
      id: "CH19-MCQ-001",
      difficulty: "easy",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "OOP Principles",
      question: "Which is NOT one of the four pillars of OOP?",
      options: ["A) Encapsulation", "B) Inheritance", "C) Polymorphism", "D) Compilation"],
      correctAnswer: "D",
      explanation: "The four pillars are Encapsulation, Inheritance, Polymorphism and Abstraction.",
      hint: "Recall the four pillars.",
      estimatedTime: 15,
      marks: 1,
      tags: ["oop", "pillars"]
    },
    {
      id: "CH19-MCQ-002",
      difficulty: "easy",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "Encapsulation",
      question: "Which concept restricts direct access to an object's internal data?",
      options: ["A) Inheritance", "B) Encapsulation", "C) Polymorphism", "D) Compilation"],
      correctAnswer: "B",
      explanation: "Encapsulation protects internal state by controlling access to class members.",
      hint: "Think data hiding.",
      estimatedTime: 15,
      marks: 1,
      tags: ["encapsulation"]
    },
    {
      id: "CH19-MCQ-003",
      difficulty: "medium",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "Inheritance",
      question: "Which relationship is represented by inheritance?",
      options: ["A) HAS-A", "B) USES-A", "C) IS-A", "D) PART-OF"],
      correctAnswer: "C",
      explanation: "Inheritance represents an IS-A relationship between a subclass and superclass.",
      hint: "Dog is an Animal.",
      estimatedTime: 15,
      marks: 1,
      tags: ["inheritance", "is-a"]
    },
    {
      id: "CH19-MCQ-004",
      difficulty: "medium",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "Polymorphism",
      question: "Method overriding is an example of which concept?",
      options: ["A) Encapsulation", "B) Abstraction", "C) Polymorphism", "D) Compilation"],
      correctAnswer: "C",
      explanation: "Overriding enables runtime polymorphism.",
      hint: "One interface, different behaviour.",
      estimatedTime: 15,
      marks: 1,
      tags: ["polymorphism", "overriding"]
    },
    {
      id: "CH19-MCQ-005",
      difficulty: "medium",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "Abstraction",
      question: "What does abstraction primarily hide?",
      options: ["A) Implementation details", "B) All objects", "C) Class names", "D) Source files"],
      correctAnswer: "A",
      explanation: "Abstraction exposes essential behaviour while hiding unnecessary implementation details.",
      hint: "Focus on what, not how.",
      estimatedTime: 15,
      marks: 1,
      tags: ["abstraction"]
    }
  ],
  assertionReasons: [
    {
      id: "CH19-AR-001",
      difficulty: "medium",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "Encapsulation",
      question: "Assertion (A): Encapsulation improves data security.\nReason (R): It can restrict direct access to fields.",
      options: [
        "A) Both A and R are true, and R is the correct explanation of A",
        "B) Both A and R are true, but R is NOT the correct explanation of A",
        "C) A is true, but R is false",
        "D) A is false, but R is true"
      ],
      correctAnswer: "A",
      explanation: "Access control supports the protection of object state.",
      hint: "Consider private fields.",
      estimatedTime: 20,
      marks: 2,
      tags: ["encapsulation"]
    }
  ],
  trueFalse: [
    {
      id: "CH19-TF-001",
      difficulty: "easy",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "Inheritance",
      question: "Inheritance creates an IS-A relationship.",
      correctAnswer: "True",
      explanation: "A subclass is a specialized form of its superclass.",
      hint: "Dog IS-A Animal.",
      estimatedTime: 10,
      marks: 1,
      tags: ["inheritance"]
    },
    {
      id: "CH19-TF-002",
      difficulty: "easy",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "Polymorphism",
      question: "Polymorphism means one form only.",
      correctAnswer: "False",
      explanation: "Polymorphism means many forms.",
      hint: "Poly means many.",
      estimatedTime: 10,
      marks: 1,
      tags: ["polymorphism"]
    }
  ],
  fillBlanks: [
    {
      id: "CH19-FIB-001",
      difficulty: "easy",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "OOP Principles",
      question: "The four pillars include Encapsulation, Inheritance, Polymorphism and ________.",
      correctAnswer: "Abstraction",
      hint: "It starts with A.",
      estimatedTime: 10,
      marks: 1,
      tags: ["abstraction"]
    },
    {
      id: "CH19-FIB-002",
      difficulty: "easy",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "Inheritance",
      question: "Inheritance represents an ________ relationship.",
      correctAnswer: "IS-A",
      hint: "Dog is an Animal.",
      estimatedTime: 10,
      marks: 1,
      tags: ["inheritance"]
    }
  ],
  outputQuestions: [
    {
      id: "CH19-OUT-001",
      difficulty: "easy",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "OOP Principles",
      question: 'Output?\nclass A { void show() { System.out.println("A"); } }\nclass B extends A { void show() { System.out.println("B"); } }\npublic class Test { public static void main(String[] args) { A a = new B(); a.show(); } }',
      correctAnswer: "B",
      explanation: "Runtime polymorphism: A reference, B object. B's show() is called.",
      hint: "Which show() is called at runtime?",
      estimatedTime: 15,
      marks: 1,
      tags: ["polymorphism", "overriding"]
    },
    {
      id: "CH19-OUT-002",
      difficulty: "medium",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "Inheritance",
      question: 'Output?\nclass A { int x = 10; }\nclass B extends A { int x = 20; void show() { System.out.println(x + " " + super.x); } }\nclass Test { public static void main(String[] args) { new B().show(); } }',
      correctAnswer: "20 10",
      explanation: "x refers to B's field while super.x refers to A's field.",
      hint: "What does super.x mean?",
      estimatedTime: 20,
      marks: 2,
      tags: ["inheritance", "super"]
    }
  ],
  errorFinding: [],
  programmingQuestions: [
    {
      id: "CH19-PRQ-001",
      difficulty: "medium",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "Encapsulation",
      question: "Write a Java class Student with private name and marks fields and public getter and setter methods.",
      expectedOutput: "A class demonstrating encapsulation.",
      hints: ["Use private fields.", "Create public getters and setters."],
      estimatedTime: 30,
      marks: 5,
      tags: ["encapsulation", "classes"]
    },
    {
      id: "CH19-PRQ-002",
      difficulty: "hard",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "Polymorphism",
      question: "Create a superclass Shape and subclasses Circle and Rectangle that override an area() method.",
      expectedOutput: "Overridden area methods demonstrating runtime polymorphism.",
      hints: ["Use inheritance.", "Override area() in each subclass."],
      estimatedTime: 40,
      marks: 5,
      tags: ["inheritance", "polymorphism"]
    }
  ],
  debuggingQuestions: [],
  caseBasedQuestions: [],
  vivaQuestions: [
    {
      id: "CH19-VIVA-001",
      difficulty: "easy",
      chapter: "OOP Concepts Overview",
      chapterId: 19,
      topic: "OOP Principles",
      question: 'Output?\nclass A { void show() { System.out.println("A"); } }\nclass B extends A { void show() { System.out.println("B"); } }\npublic class Test { public static void main(String[] args) { A a = new B(); a.show(); } }',
      correctAnswer: "B",
      explanation: "Runtime polymorphism: A reference, B object. B's show() is called.",
      hint: "Which show() is called at runtime?",
      estimatedTime: 15,
      marks: 1,
      tags: ["polymorphism", "overriding"]
    }
  ]
};

export default chapter19;
