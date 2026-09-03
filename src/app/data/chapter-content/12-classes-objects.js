const chapter12 = {
  id: "12-classes-objects",
  title: "Classes & Objects",
  slug: "classes-objects",
  subject: "Java Programming",
  difficulty: "Advanced",
  estimatedTime: 120,
  topics: [
    "class and object",
    "instance variables",
    "methods",
    "constructors",
    "parameterized constructors",
    "this keyword",
    "object references",
    "static members",
    "encapsulation",
  ],

  introduction: {
    description: "A class is a blueprint that defines data and behaviour. An object is an instance created from that class. This chapter develops the class-and-object concepts used in ICSE Java programming, including constructors, object references and the this keyword.",
    realLifeExamples: [
      "Student class with name, roll number and marks.",
      "Rectangle class with length and breadth and methods for area and perimeter.",
      "BankAccount class with account number and balance.",
    ],
    commonMistakes: [
      "Confusing a class with an object.",
      "Giving a constructor a return type.",
      "Forgetting the new keyword during object creation.",
      "Confusing an instance variable with a constructor parameter.",
      "Using instance members from a static context without an object reference.",
    ],
    whereUsed: ["Object-oriented program design", "Data modelling", "Reusable program structure"],
  },

  theoryNotes: {
    beginnerExplanation: "A class groups related data and methods. An object is a real instance of the class. Each object normally has its own instance-variable values. A constructor runs when an object is created and is used to initialise it.",
    importantPoints: [
      "A class is a blueprint; an object is an instance.",
      "Objects are commonly created using ClassName ref = new ClassName();",
      "Instance variables describe the state of an object.",
      "Methods describe behaviour.",
      "A constructor has the same name as the class and no return type.",
      "A constructor may be overloaded.",
      "this refers to the current object.",
      "A static member belongs to the class rather than to one particular object.",
    ],
    memoryTricks: [
      "CLASS = blueprint.",
      "OBJECT = instance.",
      "NEW = create an object.",
      "THIS = current object.",
      "CONSTRUCTOR = initialise an object.",
    ],
    examTips: [
      "Write the class declaration clearly.",
      "Remember that constructors do not have a return type.",
      "Trace each object separately when instance variables are involved.",
      "Use this.variable when a parameter has the same name as an instance variable.",
    ],
  },

  syntax: {
    code: `class Student {
    String name;
    int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    void display() {
        System.out.println(name + " " + marks);
    }
}

class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Riya", 92);
        s1.display();
    }
}`,
    breakdown: [
      { keyword: "class Student", explanation: "Declares a class named Student." },
      { keyword: "String name;", explanation: "Declares an instance variable." },
      { keyword: "Student(String name, int marks)", explanation: "Parameterized constructor." },
      { keyword: "this.name", explanation: "Refers to the current object's instance variable." },
      { keyword: "new Student(...) ", explanation: "Creates a new object and invokes the constructor." },
    ],
    variations: {
      defaultConstructor: {
        code: `class Demo {
    int x;
    Demo() {
        x = 10;
    }
}`,
        explanation: "A no-argument constructor can initialise default state for an object.",
      },
      parameterizedConstructor: {
        code: `class Rectangle {
    int length, breadth;
    Rectangle(int l, int b) {
        length = l;
        breadth = b;
    }
}`,
        explanation: "A parameterized constructor receives values at object creation time.",
      },
    },
  },

  examples: {
    basic: [
      {
        id: "class-ex-b-1",
        title: "Create and display an object",
        code: `class Student {
    String name = "Aman";
    int marks = 88;

    void display() {
        System.out.println(name + " " + marks);
    }
}

class Main {
    public static void main(String[] args) {
        Student s = new Student();
        s.display();
    }
}`,
        output: "Aman 88",
        explanation: ["Student is the class.", "s is an object reference.", "display() is invoked using the dot operator."],
      },
      {
        id: "class-ex-b-2",
        title: "Use a parameterized constructor",
        code: `class Rectangle {
    int length, breadth;

    Rectangle(int l, int b) {
        length = l;
        breadth = b;
    }

    int area() {
        return length * breadth;
    }
}

class Main {
    public static void main(String[] args) {
        Rectangle r = new Rectangle(8, 5);
        System.out.println(r.area());
    }
}`,
        output: "40",
        explanation: ["The constructor stores 8 and 5.", "area() returns their product."],
      },
      {
        id: "class-ex-b-3",
        title: "Different objects have different state",
        code: `class Counter {
    int value;
    Counter(int value) { this.value = value; }
}

class Main {
    public static void main(String[] args) {
        Counter a = new Counter(3);
        Counter b = new Counter(7);
        a.value++;
        System.out.println(a.value + " " + b.value);
    }
}`,
        output: "4 7",
        explanation: ["Changing a.value does not change b.value because they are different objects."],
      },
    ],
    intermediate: [],
    advanced: [],
  },

  outputBasedQuestions: [
    {
      id: "classes-objects-ob-1",
      question: `class Test {
    int x = 5;
    public void change(int x) {
        this.x = x + 2;
    }
    public static void main(String[] args) {
        Test t = new Test();
        t.change(8);
        System.out.println(t.x);
    }
}`,
      answer: "10",
      explanation: "The parameter x is 8, so this.x becomes 8 + 2 = 10.",
    },
    {
      id: "classes-objects-ob-2",
      question: `class Box {
    int n;
    Box(int n) { this.n = n; }
}
class Main {
    public static void main(String[] args) {
        Box a = new Box(4);
        Box b = new Box(6);
        a.n = a.n + b.n;
        System.out.println(a.n);
    }
}`,
      answer: "10",
      explanation: "a.n is 4 and b.n is 6, so a.n becomes 10.",
    },
    {
      id: "classes-objects-ob-3",
      question: `class Demo {
    int x;
    Demo() { x = 12; }
    void print() { System.out.println(x); }
}
class Main {
    public static void main(String[] args) {
        new Demo().print();
    }
}`,
      answer: "12",
      explanation: "The constructor sets x to 12 before print() is called.",
    },
    {
      id: "classes-objects-ob-4",
      question: `class Sample {
    int x = 2;
    void update() { x *= 5; }
}
class Main {
    public static void main(String[] args) {
        Sample s = new Sample();
        s.update();
        System.out.println(s.x);
    }
}`,
      answer: "10",
      explanation: "update() multiplies the instance variable 2 by 5.",
    },
  ],

  errorFindingQuestions: [
    {
      id: "classes-objects-err-1",
      question: "Identify the error: class Student { void Student() { } }",
      answer: "Student() is a method, not a constructor, because it has a void return type.",
      explanation: "A constructor must not have a return type.",
    },
    {
      id: "classes-objects-err-2",
      question: "Identify the error: Student s; s.display();",
      answer: "s has not been assigned an object before the instance method is called.",
      explanation: "The reference should point to an object, for example: Student s = new Student();",
    },
  ],

  fillInTheBlanks: [
    { question: "A class is a ______ for creating objects.", answer: "blueprint" },
    { question: "An object is an ______ of a class.", answer: "instance" },
    { question: "The keyword used to create an object is ______.", answer: "new" },
    { question: "The keyword that refers to the current object is ______.", answer: "this" },
  ],

  mcqs: [
    {
      id: "classes-objects-mcq-1",
      question: "Which keyword is used to create an object?",
      options: ["class", "new", "this", "void"],
      answer: "new",
      difficulty: "easy",
      explanation: "new creates an object instance.",
    },
    {
      id: "classes-objects-mcq-2",
      question: "Which statement about a constructor is correct?",
      options: ["It has a return type", "Its name matches the class name", "It must be static", "It cannot be overloaded"],
      answer: "Its name matches the class name",
      difficulty: "medium",
      explanation: "A constructor has the same name as its class and no return type.",
    },
  ],

  assertionReasonQuestions: [
    {
      id: "classes-objects-ar-1",
      assertion: "A constructor does not have a return type.",
      reason: "A constructor is invoked as part of object creation.",
      answer: 0,
      explanation: "Both statements are true and the reason correctly describes the constructor's role.",
    },
  ],

  programmingQuestions: [
    {
      id: "classes-objects-prg-1",
      title: "Student Result",
      problemStatement: "Create a Student class with name and three marks. Write a method to calculate and display the average.",
      difficulty: "medium",
      solution: `class Student {
    String name;
    int m1, m2, m3;

    Student(String name, int m1, int m2, int m3) {
        this.name = name;
        this.m1 = m1;
        this.m2 = m2;
        this.m3 = m3;
    }

    double average() {
        return (m1 + m2 + m3) / 3.0;
    }
}`,
    },
    {
      id: "classes-objects-prg-2",
      title: "Rectangle Comparison",
      problemStatement: "Create a Rectangle class with length and breadth and write a method that returns the area. Create two objects and display the larger area.",
      difficulty: "hard",
      solution: `class Rectangle {
    int length, breadth;
    Rectangle(int l, int b) {
        length = l;
        breadth = b;
    }
    int area() {
        return length * breadth;
    }
}`,
    },
  ],

  challengeProblems: [
    {
      id: "classes-objects-ch-1",
      title: "Bank Account",
      question: "Create a class with account holder, balance, deposit() and withdraw() methods. Reject a withdrawal that exceeds the balance.",
      difficulty: "hard",
    },
    {
      id: "classes-objects-ch-2",
      title: "Object Trace",
      question: "Create two objects with separate instance state, call a method on one object and trace the final values of both objects.",
      difficulty: "hard",
    },
  ],

  rapidRevisionQuestions: [
    { question: "What is a class?", answer: "A blueprint or template used to create objects." },
    { question: "What is an object?", answer: "An instance of a class." },
    { question: "Why is this used?", answer: "To refer to the current object." },
    { question: "Can constructors be overloaded?", answer: "Yes, by changing their parameter list." },
  ],

  revisionNotes: {
    title: "Exam-Focused Revision Notes",
    keyTerms: [
      { term: "Class", definition: "Blueprint defining data and methods." },
      { term: "Object", definition: "Instance of a class." },
      { term: "Constructor", definition: "Special member used to initialise an object." },
      { term: "this", definition: "Reference to the current object." },
    ],
    quickFlow: "Class definition → object creation → constructor → method call",
  },
};

export default chapter12;
