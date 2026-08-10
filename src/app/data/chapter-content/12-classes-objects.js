const chapter12 = {
  id: "12-classes-objects",
  title: "Classes & Objects",
  slug: "classes-objects",
  subject: "Java Programming",
  difficulty: "Advanced",
  estimatedTime: 75,
  topics: [
    "class",
    "object",
    "instance",
    "constructor",
    "new keyword",
    "instance variables",
    "methods in class",
    "default constructor",
    "parameterized constructor",
    "this keyword",
    "object reference",
  ],

  // ========== 1. INTRODUCTION ==========
  introduction: {
    description:
      "Classes and Objects are the foundation of Object-Oriented Programming (OOP) in Java. A class is a blueprint or template that defines the properties (data) and behaviors (methods) of objects. An object is an instance of a class - a concrete entity created from that blueprint. Think of a class as a car design blueprint, and an object as an actual car built from that design. Each object has its own state (instance variables) and can perform actions (methods). Constructors are special methods used to initialize objects when they are created. Understanding classes and objects is essential for OOP, which is the dominant programming paradigm in modern software development.",
    realLifeExamples: [
      "A 'Car' class with properties like color, model, speed and methods like accelerate(), brake(). Each car object has its own values.",
      "A 'Student' class with rollNumber, name, grade and methods like calculateGrade(), displayDetails(). Each student is an object.",
      "A 'BankAccount' class with accountNumber, balance and methods like deposit(), withdraw(). Each account is an object.",
      "A 'Rectangle' class with length, breadth and methods like area(), perimeter(). Each rectangle object has different dimensions.",
      "A 'Book' class with title, author, price and methods like getDetails(), applyDiscount(). Each book is an object.",
      "A 'Phone' class with brand, model, storage and methods like makeCall(), sendMessage(). Each phone is an object.",
      "A 'Employee' class with empId, name, salary and methods like calculateBonus(), displayInfo(). Each employee is an object.",
      "A 'Circle' class with radius and methods like calculateArea(), calculateCircumference(). Each circle object has different radius.",
    ],
    commonMistakes: [
      "Forgetting to use new keyword when creating objects - causes compilation error.",
      "Confusing class name with object name - class is blueprint, object is instance.",
      "Not initializing instance variables - they get default values (0, null, false).",
      "Trying to access instance variables from static methods without object reference.",
      "Forgetting to create constructor when needed - default constructor only exists if no other constructor defined.",
      "Using same name for class variables and local variables without this keyword - causes confusion.",
      "Not understanding that each object has its own copy of instance variables.",
      "Trying to call non-static methods from static context without object.",
      "Forgetting that constructors don't have return type (not even void).",
      "Creating multiple objects when only one is needed - wastes memory.",
    ],
    whereUsed: [
      "Modeling real-world entities in software (car, student, employee, etc.).",
      "Creating data structures to organize related data and behavior.",
      "Building GUI components (Button, TextField, Window classes).",
      "Implementing business logic in enterprise applications.",
      "Creating game entities (Player, Enemy, Weapon classes).",
      "Database entity mapping (User, Product, Order classes).",
      "API design and library development.",
      "Every modern Java application uses classes and objects extensively.",
    ],
  },

  // ========== 2. THEORY NOTES ==========
  theoryNotes: {
    beginnerExplanation:
      "A class is like a blueprint or template that defines what an object will have (properties) and what it can do (methods). For example, if we create a 'Car' class, we define that every car will have properties like color, brand, speed, and methods like accelerate(), brake(), honk(). Once we have the class defined, we can create multiple car objects from it - each with its own values for color, brand, etc. An object is a specific instance of a class. If 'Car' is the class, then 'myRedToyota' and 'yourBlueHonda' are two different objects of the Car class. Each object has its own set of instance variables. Constructors are special methods that help us set initial values when creating objects.",
    importantPoints: [
      "A class is a blueprint, an object is an instance of that class.",
      "Objects are created using the new keyword: ClassName objectName = new ClassName();",
      "Instance variables (fields) define the state/properties of an object.",
      "Each object has its own copy of instance variables - changes in one object don't affect others.",
      "Constructors are special methods used to initialize objects.",
      "Constructor name must match the class name exactly.",
      "Constructors don't have a return type (not even void).",
      "If no constructor is defined, Java provides a default constructor (no parameters).",
      "If any constructor is defined, Java does NOT provide default constructor.",
      "The this keyword refers to the current object - used to distinguish instance variables from parameters.",
      "Static variables belong to the class (shared), instance variables belong to each object.",
      "Objects are stored in heap memory, references are stored in stack memory.",
      "Multiple objects can be created from the same class.",
      "Methods inside a class define the behavior of objects.",
      "Access modifiers (public, private, protected) control visibility of class members.",
    ],
    memoryTricks: [
      "CLASS = 'Collection of similar objects' - blueprint for objects.",
      "OBJECT = 'Instance of class' - real entity created from blueprint.",
      "CONSTRUCTOR = 'Constructs new object' - initializes object when created.",
      "NEW = 'New Entity Will be created' - keyword to create objects.",
      "THIS = 'This object's variable' - refers to current object.",
      "INSTANCE = 'Individual object created from class' - has its own data.",
      "REFERENCE = 'Remote control to object' - variable that points to object in heap.",
      "STATIC = 'Same for all, belongs to class' - shared among all objects.",
      "HEAP = 'Where objects live' - dynamic memory allocation.",
      "STACK = 'Where references live' - stores object references.",
    ],
    examTips: [
      "Always remember: Class is blueprint, Object is instance.",
      "Syntax: ClassName obj = new ClassName(); - new creates object in heap.",
      "Constructor name MUST match class name exactly (including case).",
      "Constructors do NOT have return type - not even void.",
      "Default constructor exists only if NO other constructor is defined.",
      "Each object has its own copy of instance variables.",
      "Use this keyword when instance variable name same as parameter name.",
      "Static methods can only access static variables directly.",
      "Instance methods can access both static and instance variables.",
      "Objects are created in heap memory, references in stack memory.",
      "Multiple objects can be created: Car car1 = new Car(); Car car2 = new Car();",
      "Default values: int=0, double=0.0, boolean=false, objects=null.",
      "Constructor overloading: multiple constructors with different parameters.",
      "In ICSE exams, always show object creation with new keyword.",
      "this() can be used to call another constructor in same class.",
    ],
  },

  // ========== 3. SYNTAX ==========
  syntax: {
    code: `// Class Definition
public class Car {
    // Instance variables (properties)
    String color;
    String brand;
    int speed;
    boolean isRunning;

    // Constructor (initializes object)
    public Car(String color, String brand) {
        this.color = color;
        this.brand = brand;
        this.speed = 0;
        this.isRunning = false;
    }

    // Methods (behaviors)
    public void accelerate(int increment) {
        speed = speed + increment;
        System.out.println("Accelerating... Speed: " + speed);
    }

    public void brake(int decrement) {
        speed = speed - decrement;
        if (speed < 0) speed = 0;
        System.out.println("Braking... Speed: " + speed);
    }

    public void start() {
        isRunning = true;
        System.out.println("Car started!");
    }

    public void displayInfo() {
        System.out.println("Brand: " + brand + ", Color: " + color);
        System.out.println("Speed: " + speed + ", Running: " + isRunning);
    }
}

// Creating and using objects
public class Main {
    public static void main(String[] args) {
        Car car1 = new Car("Red", "Toyota");
        Car car2 = new Car("Blue", "Honda");

        car1.start();
        car1.accelerate(50);
        car1.displayInfo();

        System.out.println();

        car2.start();
        car2.accelerate(30);
        car2.displayInfo();
    }
}`,
    breakdown: [
      {
        keyword: "public class Car",
        explanation: "Defines a class named 'Car'. public means it can be accessed from anywhere.",
      },
      {
        keyword: "String color;",
        explanation: "Instance variable - each Car object will have its own color value.",
      },
      {
        keyword: "public Car(String color, String brand)",
        explanation: "Constructor - same name as class, no return type. Initializes new objects.",
      },
      {
        keyword: "this.color",
        explanation: "Refers to instance variable. Distinguishes from parameter 'color'.",
      },
      {
        keyword: "new Car()",
        explanation: "Creates new object in heap memory. Calls constructor to initialize.",
      },
      {
        keyword: "Car car1",
        explanation: "Reference variable that points to Car object in heap.",
      },
      {
        keyword: "car1.accelerate(50)",
        explanation: "Calls method on object using dot operator. car1 is the object reference.",
      },
    ],
    variations: {
      constructors: {
        code: `// Default Constructor (no parameters)
public class Student {
    String name;
    int rollNumber;
    int marks;

    // Default constructor
    public Student() {
        name = "Unknown";
        rollNumber = 0;
        marks = 0;
    }
}

// Parameterized Constructor
public class Student {
    String name;
    int rollNumber;
    int marks;

    // Parameterized constructor
    public Student(String name, int rollNumber, int marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
    }
}

// Constructor Overloading
public class Student {
    String name;
    int rollNumber;
    int marks;

    // Constructor 1: No parameters
    public Student() {
        this("Unknown", 0, 0);
    }

    // Constructor 2: Two parameters
    public Student(String name, int rollNumber) {
        this(name, rollNumber, 0);
    }

    // Constructor 3: All parameters
    public Student(String name, int rollNumber, int marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
    }
}`,
        explanation:
          "Constructors can be overloaded with different parameters. this() calls another constructor in same class.",
      },
      thisKeyword: {
        code: `// Using this keyword
public class Rectangle {
    int length;
    int breadth;

    // Constructor using this
    public Rectangle(int length, int breadth) {
        this.length = length;
        this.breadth = breadth;
    }

    // Method using this
    public void setDimensions(int length, int breadth) {
        this.length = length;
        this.breadth = breadth;
    }

    // Method returning current object
    public Rectangle getLargerRectangle(Rectangle other) {
        if (this.area() > other.area()) {
            return this;
        } else {
            return other;
        }
    }

    public int area() {
        return this.length * this.breadth;
    }
}`,
        explanation:
          "this keyword refers to current object. Used to distinguish instance variables from parameters. Can be used to return current object or call other constructors.",
      },
    },
  },

  // ========== 4. EXAMPLES ==========
  examples: {
    basic: [
      {
        id: "class-ex-b-1",
        title: "Simple class with one object",
        code: `public class Student {
    String name;
    int rollNumber;
    int marks;

    public void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Marks: " + marks);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "Alice";
        s1.rollNumber = 1;
        s1.marks = 95;
        s1.display();
    }
}`,
        output: "Name: Alice\nRoll Number: 1\nMarks: 95",
        explanation: [
          "Student class defined with three instance variables.",
          "display() method prints student details.",
          "new Student() creates a new Student object in heap.",
          "s1 is a reference pointing to the Student object.",
          "Set values using dot operator: s1.name, s1.rollNumber, etc.",
          "Call display() method using s1.display().",
          "Key point: Object is created with new, accessed via reference using dot operator.",
        ],
      },
      {
        id: "class-ex-b-2",
        title: "Class with constructor",
        code: `public class Student {
    String name;
    int rollNumber;
    int marks;

    public Student(String name, int rollNumber, int marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
    }

    public void display() {
        System.out.println(name + " - " + rollNumber + " - " + marks);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 1, 95);
        Student s2 = new Student("Bob", 2, 88);
        Student s3 = new Student("Charlie", 3, 92);
        s1.display();
        s2.display();
        s3.display();
    }
}`,
        output: "Alice - 1 - 95\nBob - 2 - 88\nCharlie - 3 - 92",
        explanation: [
          "Constructor initializes instance variables when object is created.",
          "this.name refers to instance variable, name is parameter.",
          "new Student(...) calls constructor with three arguments.",
          "Three different Student objects created with different values.",
          "Each object has its own copy of name, rollNumber, marks.",
          "Key point: Constructor sets initial values when object is created.",
        ],
      },
      {
        id: "class-ex-b-3",
        title: "Multiple objects from same class",
        code: `public class Rectangle {
    int length;
    int breadth;

    public Rectangle(int length, int breadth) {
        this.length = length;
        this.breadth = breadth;
    }

    public int area() {
        return length * breadth;
    }

    public int perimeter() {
        return 2 * (length + breadth);
    }

    public void display() {
        System.out.println("Length: " + length + ", Breadth: " + breadth);
        System.out.println("Area: " + area() + ", Perimeter: " + perimeter());
    }
}

public class Main {
    public static void main(String[] args) {
        Rectangle rect1 = new Rectangle(5, 3);
        Rectangle rect2 = new Rectangle(10, 6);
        Rectangle rect3 = new Rectangle(7, 7);
        rect1.display();
        System.out.println();
        rect2.display();
        System.out.println();
        rect3.display();
    }
}`,
        output: "Length: 5, Breadth: 3\nArea: 15, Perimeter: 16\n\nLength: 10, Breadth: 6\nArea: 60, Perimeter: 32\n\nLength: 7, Breadth: 7\nArea: 49, Perimeter: 28",
        explanation: [
          "Rectangle class with two instance variables.",
          "Constructor initializes length and breadth.",
          "area() and perimeter() methods calculate values.",
          "rect1 with length=5, breadth=3.",
          "rect2 with length=10, breadth=6.",
          "rect3 with length=7, breadth=7 (square).",
          "Each object has its own copy of length and breadth.",
          "Key point: Multiple objects can be created from same class, each with different values.",
        ],
      },
      {
        id: "class-ex-b-4",
        title: "Class with multiple methods",
        code: `public class BankAccount {
    String accountHolder;
    double balance;

    public BankAccount(String accountHolder, double initialBalance) {
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        balance = balance + amount;
        System.out.println("Deposited: Rs " + amount);
        System.out.println("New Balance: Rs " + balance);
    }

    public void withdraw(double amount) {
        if (amount <= balance) {
            balance = balance - amount;
            System.out.println("Withdrawn: Rs " + amount);
            System.out.println("Remaining Balance: Rs " + balance);
        } else {
            System.out.println("Insufficient balance!");
        }
    }

    public void checkBalance() {
        System.out.println("Account Holder: " + accountHolder);
        System.out.println("Current Balance: Rs " + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("Alice", 1000);
        account.checkBalance();
        System.out.println();
        account.deposit(500);
        System.out.println();
        account.withdraw(300);
        System.out.println();
        account.withdraw(1500);
    }
}`,
        output: "Account Holder: Alice\nCurrent Balance: Rs 1000.0\n\nDeposited: Rs 500.0\nNew Balance: Rs 1500.0\n\nWithdrawn: Rs 300.0\nRemaining Balance: Rs 1200.0\n\nInsufficient balance!",
        explanation: [
          "BankAccount class with accountHolder and balance.",
          "Constructor initializes account with holder name and balance.",
          "deposit() method adds money to balance.",
          "withdraw() method checks balance before withdrawing.",
          "checkBalance() displays current balance.",
          "Create account with Rs 1000 initial balance.",
          "Deposit Rs 500, balance becomes Rs 1500.",
          "Withdraw Rs 300, balance becomes Rs 1200.",
          "Try to withdraw Rs 1500 - insufficient balance!",
          "Key point: Methods can modify instance variables (balance).",
        ],
      },
    ],
    intermediate: [
      {
        id: "class-ex-i-1",
        title: "Default constructor and constructor overloading",
        code: `public class Student {
    String name;
    int rollNumber;
    int marks;
    String grade;

    public Student() {
        name = "Unknown";
        rollNumber = 0;
        marks = 0;
        grade = "N/A";
    }

    public Student(String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
        marks = 0;
        grade = "N/A";
    }

    public Student(String name, int rollNumber, int marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
        calculateGrade();
    }

    public void calculateGrade() {
        if (marks >= 90) grade = "A+";
        else if (marks >= 80) grade = "A";
        else if (marks >= 70) grade = "B";
        else if (marks >= 60) grade = "C";
        else grade = "F";
    }

    public void display() {
        System.out.println(name + " | " + rollNumber + " | " + marks + " | " + grade);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.display();
        Student s2 = new Student("Bob", 2);
        s2.display();
        Student s3 = new Student("Charlie", 3, 85);
        s3.display();
    }
}`,
        output: "Unknown | 0 | 0 | N/A\nBob | 2 | 0 | N/A\nCharlie | 3 | 85 | A",
        explanation: [
          "Three constructors with different parameters (overloading).",
          "Default constructor sets default values.",
          "Two-parameter constructor sets name and roll, marks=0.",
          "Three-parameter constructor sets all values and calculates grade.",
          "s1 uses default constructor.",
          "s2 uses two-parameter constructor.",
          "s3 uses three-parameter constructor, grade calculated.",
          "Key point: Constructor overloading provides flexibility in object creation.",
        ],
      },
      {
        id: "class-ex-i-2",
        title: "Object as parameter to method",
        code: `public class Student {
    String name;
    int marks;

    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    public void display() {
        System.out.println(name + ": " + marks);
    }
}

public class Main {
    public static void printStudentDetails(Student s) {
        System.out.println("Student Name: " + s.name);
        System.out.println("Student Marks: " + s.marks);
        if (s.marks >= 40) {
            System.out.println("Result: PASS");
        } else {
            System.out.println("Result: FAIL");
        }
    }

    public static void main(String[] args) {
        Student s1 = new Student("Alice", 85);
        Student s2 = new Student("Bob", 35);
        printStudentDetails(s1);
        System.out.println();
        printStudentDetails(s2);
    }
}`,
        output: "Student Name: Alice\nStudent Marks: 85\nResult: PASS\n\nStudent Name: Bob\nStudent Marks: 35\nResult: FAIL",
        explanation: [
          "printStudentDetails() accepts Student object as parameter.",
          "Access instance variables using s.name and s.marks.",
          "s1 object created with marks=85.",
          "s2 object created with marks=35.",
          "Pass s1 to method - s parameter refers to s1 object.",
          "Pass s2 to method - s parameter refers to s2 object.",
          "Key point: Objects can be passed as parameters to methods.",
        ],
      },
      {
        id: "class-ex-i-3",
        title: "Returning object from method",
        code: `public class Point {
    int x;
    int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public Point add(Point p) {
        int newX = this.x + p.x;
        int newY = this.y + p.y;
        return new Point(newX, newY);
    }

    public void display() {
        System.out.println("(" + x + ", " + y + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        Point p1 = new Point(3, 4);
        Point p2 = new Point(5, 6);
        System.out.print("Point 1: ");
        p1.display();
        System.out.print("Point 2: ");
        p2.display();
        Point p3 = p1.add(p2);
        System.out.print("Point 1 + Point 2 = ");
        p3.display();
    }
}`,
        output: "Point 1: (3, 4)\nPoint 2: (5, 6)\nPoint 1 + Point 2 = (8, 10)",
        explanation: [
          "add() method takes Point parameter and returns new Point.",
          "Calculate new coordinates by adding x and y values.",
          "Create and return new Point object with calculated values.",
          "p1 is Point(3, 4).",
          "p2 is Point(5, 6).",
          "p1.add(p2) creates new Point(8, 10).",
          "Key point: Methods can return objects of the same class.",
        ],
      },
      {
        id: "class-ex-i-4",
        title: "Using this() to call another constructor",
        code: `public class Student {
    String name;
    int rollNumber;
    int marks;
    String grade;

    public Student(String name) {
        this(name, 0, 0);
    }

    public Student(String name, int rollNumber) {
        this(name, rollNumber, 0);
    }

    public Student(String name, int rollNumber, int marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
        calculateGrade();
    }

    public void calculateGrade() {
        if (marks >= 90) grade = "A+";
        else if (marks >= 80) grade = "A";
        else if (marks >= 70) grade = "B";
        else grade = "C";
    }

    public void display() {
        System.out.println(name + " | " + rollNumber + " | " + marks + " | " + grade);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Alice");
        Student s2 = new Student("Bob", 5);
        Student s3 = new Student("Charlie", 3, 88);
        s1.display();
        s2.display();
        s3.display();
    }
}`,
        output: "Alice | 0 | 0 | C\nBob | 5 | 0 | C\nCharlie | 3 | 88 | B",
        explanation: [
          "Constructor with one parameter calls Constructor 3 using this().",
          "Constructor with two parameters calls Constructor 3 using this().",
          "Constructor with three parameters does actual initialization.",
          "this() must be first statement in constructor.",
          "new Student('Alice') calls Constructor 1, which calls Constructor 3.",
          "new Student('Bob', 5) calls Constructor 2, which calls Constructor 3.",
          "new Student('Charlie', 3, 88) directly calls Constructor 3.",
          "Key point: this() reuses code and avoids duplication in constructors.",
        ],
      },
    ],
    advanced: [
      {
        id: "class-ex-a-1",
        title: "Complex class with multiple features",
        code: `public class Book {
    private String isbn;
    private String title;
    private String author;
    private double price;
    private int quantity;
    private static int totalBooks = 0;

    public Book(String isbn, String title, String author, double price) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.price = price;
        this.quantity = 0;
        totalBooks++;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void sell(int copies) {
        if (copies <= quantity) {
            quantity = quantity - copies;
            System.out.println("Sold " + copies + " copies of '" + title + "'");
        } else {
            System.out.println("Insufficient stock!");
        }
    }

    public double getTotalValue() {
        return price * quantity;
    }

    public static int getTotalBooks() {
        return totalBooks;
    }

    public void display() {
        System.out.println("ISBN: " + isbn);
        System.out.println("Title: " + title);
        System.out.println("Author: " + author);
        System.out.println("Price: Rs " + price);
        System.out.println("Quantity: " + quantity);
        System.out.println("Total Value: Rs " + getTotalValue());
    }
}

public class Main {
    public static void main(String[] args) {
        Book book1 = new Book("978-01", "Java Programming", "Author A", 500);
        Book book2 = new Book("978-02", "Python Basics", "Author B", 400);
        Book book3 = new Book("978-03", "C++ Guide", "Author C", 450);
        book1.setQuantity(10);
        book2.setQuantity(5);
        book3.setQuantity(8);
        book1.display();
        System.out.println();
        book2.display();
        System.out.println();
        book3.display();
        System.out.println("\\nTotal Books in inventory: " + Book.getTotalBooks());
        System.out.println("\\n--- Selling Books ---");
        book1.sell(3);
        book2.sell(2);
        System.out.println("\\nAfter selling:");
        System.out.println(book1.title + " quantity: " + book1.quantity);
        System.out.println(book2.title + " quantity: " + book2.quantity);
    }
}`,
        output: "ISBN: 978-01\nTitle: Java Programming\nAuthor: Author A\nPrice: Rs 500.0\nQuantity: 10\nTotal Value: Rs 5000.0\n\nISBN: 978-02\nTitle: Python Basics\nAuthor: Author B\nPrice: Rs 400.0\nQuantity: 5\nTotal Value: Rs 2000.0\n\nISBN: 978-03\nTitle: C++ Guide\nAuthor: Author C\nPrice: Rs 450.0\nQuantity: 8\nTotal Value: Rs 3600.0\n\nTotal Books in inventory: 3\n\n--- Selling Books ---\nSold 3 copies of 'Java Programming'\nSold 2 copies of 'Python Basics'\n\nAfter selling:\nJava Programming quantity: 7\nPython Basics quantity: 3",
        explanation: [
          "Book class with private instance variables (encapsulation).",
          "Static variable totalBooks shared among all Book objects.",
          "Constructor initializes book details and increments totalBooks.",
          "sell() method reduces quantity when books are sold.",
          "getTotalValue() calculates inventory value.",
          "Static method getTotalBooks() returns total count.",
          "Three Book objects created.",
          "Static method called using class name: Book.getTotalBooks().",
          "book1.sell(3) reduces quantity from 10 to 7.",
          "Key point: Static variables are shared, instance variables are per object.",
        ],
      },
      {
        id: "class-ex-a-2",
        title: "Class with array of objects",
        code: `public class Student {
    int rollNumber;
    String name;
    int marks;

    public Student(int rollNumber, String name, int marks) {
        this.rollNumber = rollNumber;
        this.name = name;
        this.marks = marks;
    }

    public void display() {
        System.out.println(rollNumber + " | " + name + " | " + marks);
    }
}

public class Main {
    public static void main(String[] args) {
        Student[] students = new Student[5];
        students[0] = new Student(1, "Alice", 95);
        students[1] = new Student(2, "Bob", 88);
        students[2] = new Student(3, "Charlie", 92);
        students[3] = new Student(4, "Diana", 78);
        students[4] = new Student(5, "Eve", 85);

        System.out.println("Roll | Name | Marks");
        System.out.println("-------------------");
        for (int i = 0; i < students.length; i++) {
            students[i].display();
        }

        int topperIndex = 0;
        for (int i = 1; i < students.length; i++) {
            if (students[i].marks > students[topperIndex].marks) {
                topperIndex = i;
            }
        }
        System.out.println("\\nTopper:");
        students[topperIndex].display();
    }
}`,
        output: "Roll | Name | Marks\n-------------------\n1 | Alice | 95\n2 | Bob | 88\n3 | Charlie | 92\n4 | Diana | 78\n5 | Eve | 85\n\nTopper:\n1 | Alice | 95",
        explanation: [
          "Create array of Student references (not objects yet).",
          "Create individual Student objects and assign to array.",
          "Loop through array and call display() on each object.",
          "Find topper by comparing marks.",
          "students[i] gives Student object, students[i].marks accesses marks.",
          "Key point: Array of objects stores references to objects, not objects themselves.",
        ],
      },
      {
        id: "class-ex-a-3",
        title: "Object comparison and cloning",
        code: `public class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public boolean isSame(Person p) {
        return this.name.equals(p.name) && this.age == p.age;
    }

    public Person clone() {
        return new Person(this.name, this.age);
    }

    public void display() {
        System.out.println(name + " | " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p1 = new Person("Alice", 25);
        Person p2 = new Person("Alice", 25);
        Person p3 = new Person("Bob", 30);
        System.out.print("p1: ");
        p1.display();
        System.out.print("p2: ");
        p2.display();
        System.out.print("p3: ");
        p3.display();
        System.out.println("\\np1 equals p2: " + p1.isSame(p2));
        System.out.println("p1 equals p3: " + p1.isSame(p3));
        Person p4 = p1.clone();
        System.out.println("\\nCloned person (p4):");
        System.out.print("p4: ");
        p4.display();
        System.out.println("p1 equals p4: " + p1.isSame(p4));
    }
}`,
        output: "p1: Alice | 25\np2: Alice | 25\np3: Bob | 30\n\np1 equals p2: true\np1 equals p3: false\n\nCloned person (p4):\np4: Alice | 25\np1 equals p4: true",
        explanation: [
          "isSame() compares two Person objects for equality.",
          "clone() creates a new Person with same values (shallow copy).",
          "p1 and p2 have same values but are different objects.",
          "p1.isSame(p2) returns true because values are same.",
          "p1.isSame(p3) returns false because values differ.",
          "p1.clone() creates new Person with same values as p1.",
          "Key point: Objects can be compared and cloned using methods.",
        ],
      },
    ],
  },

  // ========== 5. DRY RUN ==========
  dryRun: [
    {
      title: "Object creation and method calling",
      code: `public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "Alice";
        s1.rollNumber = 1;
        s1.marks = 95;
        System.out.println(s1.name);
        System.out.println(s1.marks);
    }
}

class Student {
    String name;
    int rollNumber;
    int marks;
}`,
      trace: [
        { line: 1, explanation: "Main class defined." },
        { line: 2, explanation: "main() method starts." },
        { line: 3, explanation: "new Student() creates Student object in heap memory." },
        { line: 3, explanation: "s1 reference points to Student object." },
        { line: 4, explanation: "s1.name = 'Alice' sets name in object." },
        { line: 5, explanation: "s1.rollNumber = 1 sets rollNumber in object." },
        { line: 6, explanation: "s1.marks = 95 sets marks in object." },
        { line: 8, explanation: "Print s1.name which is 'Alice'." },
        { line: 9, explanation: "Print s1.marks which is 95." },
      ],
    },
    {
      title: "Constructor execution",
      code: `public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 1, 95);
        System.out.println(s1.name);
    }
}

class Student {
    String name;
    int rollNumber;
    int marks;

    public Student(String name, int rollNumber, int marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
    }
}`,
      trace: [
        { line: 1, explanation: "Main class defined." },
        { line: 2, explanation: "main() starts." },
        { line: 3, explanation: "new Student('Alice', 1, 95) calls constructor." },
        { line: 10, explanation: "Constructor starts executing." },
        { line: 11, explanation: "this.name = 'Alice' - sets instance variable." },
        { line: 12, explanation: "this.rollNumber = 1 - sets instance variable." },
        { line: 13, explanation: "this.marks = 95 - sets instance variable." },
        { line: 14, explanation: "Constructor ends, object fully initialized." },
        { line: 3, explanation: "s1 reference points to initialized object." },
        { line: 4, explanation: "Print s1.name which is 'Alice'." },
      ],
    },
    {
      title: "Multiple objects",
      code: `public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Alice", 1);
        Student s2 = new Student("Bob", 2);
        s1.marks = 95;
        s2.marks = 88;
        System.out.println(s1.name + ": " + s1.marks);
        System.out.println(s2.name + ": " + s2.marks);
    }
}

class Student {
    String name;
    int rollNumber;
    int marks;

    public Student(String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
    }
}`,
      trace: [
        { line: 1, explanation: "Main class defined." },
        { line: 2, explanation: "main() starts." },
        { line: 3, explanation: "Create s1 object - name='Alice', rollNumber=1." },
        { line: 4, explanation: "Create s2 object - name='Bob', rollNumber=2." },
        { line: 6, explanation: "s1.marks = 95 - sets marks for s1 only." },
        { line: 7, explanation: "s2.marks = 88 - sets marks for s2 only." },
        { line: 9, explanation: "Print s1.name='Alice', s1.marks=95." },
        { line: 10, explanation: "Print s2.name='Bob', s2.marks=88." },
      ],
    },
  ],

  // ========== 6. OUTPUT BASED QUESTIONS ==========
  outputBasedQuestions: [
    {
      id: "classes-objects-ob-1",
      question: `public class Test {
    int x = 10;
    public static void main(String[] args) {
        Test t = new Test();
        System.out.println(t.x);
    }
}`,
      answer: "10",
      explanation: "t.x accesses instance variable x through object reference t.",
    },
    {
      id: "classes-objects-ob-2",
      question: `public class Test {
    int x = 5;
    public static void main(String[] args) {
        Test t1 = new Test();
        Test t2 = new Test();
        t1.x = 10;
        t2.x = 20;
        System.out.println(t1.x + " " + t2.x);
    }
}`,
      answer: "10 20",
      explanation: "Each object has its own copy of x. t1.x=10, t2.x=20.",
    },
    {
      id: "classes-objects-ob-3",
      question: `public class Test {
    String name;
    public Test(String name) {
        this.name = name;
    }
    public static void main(String[] args) {
        Test t = new Test("Alice");
        System.out.println(t.name);
    }
}`,
      answer: "Alice",
      explanation: "Constructor sets name to 'Alice', t.name prints 'Alice'.",
    },
    {
      id: "classes-objects-ob-4",
      question: `public class Test {
    int a, b;
    public Test(int a, int b) {
        this.a = a;
        this.b = b;
    }
    public int sum() {
        return a + b;
    }
    public static void main(String[] args) {
        Test t = new Test(5, 10);
        System.out.println(t.sum());
    }
}`,
      answer: "15",
      explanation: "t.sum() returns a+b = 5+10 = 15.",
    },
    {
      id: "classes-objects-ob-5",
      question: `public class Test {
    int count = 0;
    public void increment() {
        count++;
    }
    public static void main(String[] args) {
        Test t1 = new Test();
        Test t2 = new Test();
        t1.increment();
        t2.increment();
        t2.increment();
        System.out.println(t1.count + " " + t2.count);
    }
}`,
      answer: "1 2",
      explanation: "Each object has its own count. t1.count=1, t2.count=2.",
    },
    {
      id: "classes-objects-ob-6",
      question: `public class Test {
    static int x = 10;
    public static void main(String[] args) {
        Test t1 = new Test();
        Test t2 = new Test();
        t1.x = 20;
        System.out.println(t1.x + " " + t2.x + " " + Test.x);
    }
}`,
      answer: "20 20 20",
      explanation: "Static variable x is shared. Changing t1.x affects all references.",
    },
    {
      id: "classes-objects-ob-7",
      question: `public class Test {
    int x;
    public Test(int x) {
        this.x = x;
    }
    public static void main(String[] args) {
        Test t = new Test(15);
        System.out.println(t.x);
    }
}`,
      answer: "15",
      explanation: "Constructor sets this.x = 15, t.x prints 15.",
    },
    {
      id: "classes-objects-ob-8",
      question: `public class Test {
    String name;
    int age;
    public Test(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public void display() {
        System.out.println(name + " is " + age + " years old");
    }
    public static void main(String[] args) {
        Test t = new Test("Alice", 25);
        t.display();
    }
}`,
      answer: "Alice is 25 years old",
      explanation: "Constructor sets name='Alice', age=25. display() prints them.",
    },
    {
      id: "classes-objects-ob-9",
      question: `public class Test {
    int a, b;
    public Test(int a) {
        this.a = a;
        b = 0;
    }
    public static void main(String[] args) {
        Test t = new Test(10);
        System.out.println(t.a + " " + t.b);
    }
}`,
      answer: "10 0",
      explanation: "Constructor sets a=10, b=0. Both printed.",
    },
  ],

  // ========== 7. JAVA EXECUTION FLOW ==========
  javaExecutionFlow: {
    title: "Source Code → Byte Code → JVM Execution",
    flowDescription: `Java uses a platform-independent execution model that works across all operating systems. The step-by-step process is:

╔══════════════════╗
║   Source Code     ║  → You write this in BlueJ/any text editor
║  (HelloWorld.java)║
╚══════════════════╝
          ↓
╔══════════════════╗
║  Java Compiler    ║  → javac (the Java compiler) converts source to bytecode
║    (javac)        ║
╚══════════════════╝
          ↓
╔══════════════════╗
║    Bytecode       ║  → Platform-independent intermediate code
║  (HelloWorld.class)║
╚══════════════════╝
          ↓
╔══════════════════╗
║      JVM          ║  → Java Virtual Machine loads & executes bytecode
║ (Java Virtual Machine)║
╚══════════════════╝
          ↓
╔══════════════════╗
║    Execution      ║  → Program runs on your local machine
╚══════════════════╝`,
    keyPoints: [
      "Source code is human-readable Java code you write (.java file)",
      "Bytecode is a low-level, platform-independent code that only the JVM understands (.class file)",
      "The JVM's Class Loader loads the bytecode into memory",
      "The JVM's Execution Engine converts bytecode to native machine code that your computer can run",
      "This is why Java is 'write once, run anywhere' (WORA)"
    ],
    examTips: [
      "In ICSE exams, you must be able to draw this flow diagram and explain each step",
      "Differentiate between source code, bytecode, and machine code",
      "Remember: JVM executes bytecode, not the operating system directly"
    ]
  },

  // ========== 8. JAVA APPLICATIONS VS APPLETS ==========
  appletVsApplication: {
    title: "Java Application vs Java Applet",
    comparisonTable: `| Feature                | Java Application                          | Java Applet                              |
|------------------------|-------------------------------------------|------------------------------------------|
| Type                   | Standalone program                        | Small program for browser execution      |
| Entry Point            | main() method (mandatory)                 | init()/start() lifecycle methods         |
| Execution Environment  | Runs directly on JVM                      | Runs inside a web browser's applet viewer|
| Security Restrictions  | Full access to system resources           | Limited security (sandbox environment)   |
| Use Case               | Desktop, server-side applications         | Historical web-based interactive content|`,
    keyPoints: [
      "Java Applications are the standard standalone programs you write for Class 9 practical work",
      "Java Applets are historical and no longer used in modern browsers, but are part of the ICSE syllabus",
      "You only need to implement standalone Java applications in BlueJ for your practical exams"
    ]
  },

  // ========== 9. BLUEJ IDE OVERVIEW ==========
  blueJOverview: {
    title: "BlueJ - The ICSE Recommended IDE",
    whatIsBlueJ: "BlueJ is the official IDE (Integrated Development Environment) recommended by CISCE for ICSE Class 9 Java programming. It was created specifically for teaching object-oriented programming to beginners.",
    whyBlueJ: [
      "Simple, visual interface that makes OOP concepts easy to understand",
      "One-click compilation and execution of Java programs",
      "Ability to create objects directly from classes and interact with them",
      "Designed exclusively for educational purposes"
    ],
    blueJWorkflow: [
      "1. Open BlueJ and create a new project",
      "2. Create a new class and write your Java source code",
      "3. Click the 'Compile' button to convert source code to bytecode",
      "4. Right-click your class and select 'void main(String[] args)' to run the program",
      "5. View output in the terminal window that opens automatically"
    ],
    examTips: [
      "You must use BlueJ for your Class 9 practical exams",
      "Know the steps to compile and run a program in BlueJ",
      "Be able to explain why BlueJ is used in ICSE"
    ]
  },

  // ========== 10. REVISION NOTES ==========
  revisionNotes: {
    title: "Exam-Focused Revision Notes",
    keyTerms: [
      { term: "Java", definition: "High-level, object-oriented, platform-independent programming language" },
      { term: "JVM", definition: "Java Virtual Machine - executes Java bytecode, enables platform independence" },
      { term: "Bytecode", definition: "Intermediate code generated by javac that runs on the JVM" },
      { term: "BlueJ", definition: "CISCE-recommended IDE for ICSE Class 9 Java programming" },
      { term: "OOP", definition: "Object-Oriented Programming - paradigm based on objects and classes" },
      { term: "Encapsulation", definition: "Bundles data and methods into a class, hides internal state using access modifiers" },
      { term: "Abstraction", definition: "Hides implementation complexity, exposes only essential features" },
      { term: "Inheritance", definition: "Allows a class to inherit properties/methods from another class (creates IS-A relationship)" },
      { term: "Polymorphism", definition: "Ability of an object to take multiple forms (method overloading/overriding)" },
      { term: "Composition", definition: "Using objects as instance variables in another class (creates HAS-A relationship)" },
      { term: "Java Application", definition: "Standalone Java program that uses main() as entry point" },
      { term: "Java Applet", definition: "Small Java program that runs in a browser, uses init()/start() as entry points" }
    ],
    quickFlow: "Source Code → javac Compiler → Bytecode → JVM → Execution"
  }
};

export default chapter12;
    {
      id: "classes-objects-ob-10",
      question: `public class Test {
    int x = 5;
    public void multiply(int x) {
        this.x = this.x * x;
    }
    public static void main(String[] args) {
        Test t = new Test();
        t.multiply(3);
        System.out.println(t.x);
    }
}`,
      answer: "15",
      explanation: "this.x refers to instance variable (5), parameter x=3. 5*3=15.",
    },
    {
      id: "classes-objects-ob-11",
      question: `public class Test {
    int num = 10;
    public void change(int num) {
        this.num = num;
    }
    public static void main(String[] args) {
        Test t = new Test();
        t.change(20);
        System.out.println(t.num);
    }
}`,
      answer: "20",
      explanation: "change(20) sets this.num = 20. t.num becomes 20.",
    },
    {
      id: "classes-objects-ob-12",
      question: `public class Test {
    String name;
    public Test(String name) {
        this.name = name;
    }
    public static void main(String[] args) {
        Test t1 = new Test("Alice");
        Test t2 = t1;
        System.out.println(t2.name);
    }
}`,
      answer: "Alice",
      explanation: "t2 = t1 makes t2 reference same object as t1. t2.name='Alice'.",
    },
    {
      id: "classes-objects-ob-13",
      question: `public class Test {
    int x = 10;
    public static void main(String[] args) {
        Test t = new Test();
        t.x = 20;
        Test t2 = new Test();
        System.out.println(t.x + " " + t2.x);
    }
}`,
      answer: "20 10",
      explanation: "t.x=20, t2.x is default 10 (different objects).",
    },
    {
      id: "classes-objects-ob-14",
      question: `public class Test {
    int a, b;
    public Test(int a, int b) {
        this.a = a;
        this.b = b;
    }
    public Test sum(Test other) {
        return new Test(this.a + other.a, this.b + other.b);
    }
    public void display() {
        System.out.println(a + " " + b);
    }
    public static void main(String[] args) {
        Test t1 = new Test(3, 4);
        Test t2 = new Test(5, 6);
        Test t3 = t1.sum(t2);
        t3.display();
    }
}`,
      answer: "8 10",
      explanation: "sum() creates new Test with a=3+5=8, b=4+6=10.",
    },
    {
      id: "classes-objects-ob-15",
      question: `public class Test {
    static int count = 0;
    public Test() {
        count++;
    }
    public static void main(String[] args) {
        Test t1 = new Test();
        Test t2 = new Test();
        Test t3 = new Test();
        System.out.println(Test.count);
    }
}`,
      answer: "3",
      explanation: "Each constructor call increments static count. Three objects created.",
    },
    {
      id: "classes-objects-ob-16",
      question: `public class Test {
    int x;
    public Test(int x) {
        x = x;
    }
    public static void main(String[] args) {
        Test t = new Test(10);
        System.out.println(t.x);
    }
}`,
      answer: "0",
      explanation: "x = x assigns parameter to itself (local). this.x remains 0 (default).",
    },
    {
      id: "classes-objects-ob-17",
      question: `public class Test {
    int x = 5;
    public Test() {
        x = 10;
    }
    public static void main(String[] args) {
        Test t = new Test();
        System.out.println(t.x);
    }
}`,
      answer: "10",
      explanation: "Constructor sets x=10, overriding initial value 5.",
    },
    {
      id: "classes-objects-ob-18",
      question: `public class Test {
    String name;
    public Test() {
        this("Unknown");
    }
    public Test(String name) {
        this.name = name;
    }
    public static void main(String[] args) {
        Test t = new Test();
        System.out.println(t.name);
    }
}`,
      answer: "Unknown",
      explanation: "No-arg constructor calls this('Unknown'), which sets name='Unknown'.",
    },
    {
      id: "classes-objects-ob-19",
      question: `public class Test {
    int a, b;
    public Test(int a) {
        this(a, 0);
    }
    public Test(int a, int b) {
        this.a = a;
        this.b = b;
    }
    public static void main(String[] args) {
        Test t = new Test(5);
        System.out.println(t.a + " " + t.b);
    }
}`,
      answer: "5 0",
      explanation: "new Test(5) calls one-arg constructor, which calls this(5, 0).",
    },
    {
      id: "classes-objects-ob-20",
      question: `public class Test {
    int x = 1;
    public Test() {
        x = 2;
    }
    public Test(int x) {
        this.x = x;
    }
    public static void main(String[] args) {
        Test t1 = new Test();
        Test t2 = new Test(5);
        System.out.println(t1.x + " " + t2.x);
    }
}`,
      answer: "2 5",
      explanation: "t1 uses no-arg constructor (x=2), t2 uses parameterized (x=5).",
    },
    {
      id: "classes-objects-ob-21",
      question: `public class Test {
    int x;
    static int y;
    public static void main(String[] args) {
        Test t1 = new Test();
        Test t2 = new Test();
        t1.x = 10;
        t1.y = 20;
        System.out.println(t1.x + " " + t2.x + " " + t1.y + " " + t2.y);
    }
}`,
      answer: "10 0 20 20",
      explanation: "t1.x=10, t2.x=0 (different). t1.y=20, t2.y=20 (static shared).",
    },
    {
      id: "classes-objects-ob-22",
      question: `public class Test {
    int num;
    public Test(int num) {
        this.num = num;
    }
    public void setNum(int num) {
        this.num = num;
    }
    public static void main(String[] args) {
        Test t = new Test(10);
        System.out.println(t.num);
        t.setNum(20);
        System.out.println(t.num);
    }
}`,
      answer: "10\n20",
      explanation: "Constructor sets num=10. setNum(20) changes it to 20.",
    },
    {
      id: "classes-objects-ob-23",
      question: `public class Test {
    String name;
    int age;
    public Test(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public boolean isAdult() {
        return age >= 18;
    }
    public static void main(String[] args) {
        Test t1 = new Test("Alice", 25);
        Test t2 = new Test("Bob", 15);
        System.out.println(t1.name + ": " + t1.isAdult());
        System.out.println(t2.name + ": " + t2.isAdult());
    }
}`,
      answer: "Alice: true\nBob: false",
      explanation: "t1.isAdult() returns true (25>=18), t2.isAdult() returns false (15<18).",
    },
    {
      id: "classes-objects-ob-24",
      question: `public class Test {
    int length, breadth;
    public Test(int length, int breadth) {
        this.length = length;
        this.breadth = breadth;
    }
    public int area() {
        return length * breadth;
    }
    public static void main(String[] args) {
        Test t1 = new Test(5, 3);
        Test t2 = new Test(4, 4);
        System.out.println(t1.area() + " " + t2.area());
    }
}`,
      answer: "15 16",
      explanation: "t1.area()=5*3=15, t2.area()=4*4=16.",
    },
    {
      id: "classes-objects-ob-25",
      question: `public class Test {
    int x = 10;
    public void show() {
        System.out.println(x);
    }
    public static void main(String[] args) {
        Test t = new Test();
        t.show();
    }
}`,
      answer: "10",
      explanation: "show() method accesses instance variable x=10.",
    },
    {
      id: "classes-objects-ob-26",
      question: `public class Test {
    int a, b;
    public Test(int a, int b) {
        this.a = a;
        this.b = b;
    }
    public Test add(Test other) {
        return new Test(this.a + other.a, this.b + other.b);
    }
    public void display() {
        System.out.println(a + " " + b);
    }
    public static void main(String[] args) {
        Test t1 = new Test(2, 3);
        Test t2 = new Test(4, 5);
        Test t3 = t1.add(t2);
        t3.display();
    }
}`,
      answer: "6 8",
      explanation: "add() returns new Test(2+4, 3+5) = new Test(6, 8).",
    },
    {
      id: "classes-objects-ob-27",
      question: `public class Test {
    String name;
    public Test(String name) {
        this.name = name;
    }
    public static void main(String[] args) {
        Test t1 = new Test("Alice");
        Test t2 = new Test("Bob");
        Test t3 = t1;
        t3.name = "Charlie";
        System.out.println(t1.name + " " + t2.name + " " + t3.name);
    }
}`,
      answer: "Charlie Bob Charlie",
      explanation: "t3 = t1 makes t3 reference same object. Changing t3.name changes t1.name.",
    },
    {
      id: "classes-objects-ob-28",
      question: `public class Test {
    int x = 5;
    public Test() {
        x = 10;
    }
    public Test(int x) {
        this.x = x;
    }
    public static void main(String[] args) {
        Test t1 = new Test();
        Test t2 = new Test(15);
        System.out.println(t1.x + " " + t2.x);
    }
}`,
      answer: "10 15",
      explanation: "t1 uses no-arg constructor (x=10), t2 uses parameterized (x=15).",
    },
    {
      id: "classes-objects-ob-29",
      question: `public class Test {
    int num;
    public Test(int num) {
        this.num = num;
    }
    public boolean isPositive() {
        return num > 0;
    }
    public static void main(String[] args) {
        Test t1 = new Test(5);
        Test t2 = new Test(-3);
        Test t3 = new Test(0);
        System.out.println(t1.isPositive() + " " + t2.isPositive() + " " + t3.isPositive());
    }
}`,
      answer: "true false false",
      explanation: "5>0 is true, -3>0 is false, 0>0 is false.",
    },
    {
      id: "classes-objects-ob-30",
      question: `public class Test {
    int length, width;
    public Test(int length, int width) {
        this.length = length;
        this.width = width;
    }
    public int perimeter() {
        return 2 * (length + width);
    }
    public static void main(String[] args) {
        Test t1 = new Test(5, 3);
        Test t2 = new Test(4, 4);
        System.out.println(t1.perimeter() + " " + t2.perimeter());
    }
}`,
      answer: "16 16",
      explanation: "t1.perimeter()=2*(5+3)=16, t2.perimeter()=2*(4+4)=16.",
    },
  ],

  // ========== 7. ERROR FINDING QUESTIONS ==========
  errorFindingQuestions: [
    {
      id: "classes-objects-ef-1",
      question: `public class Student {
    String name;
    int marks;
}
public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Alice";
        s.marks = 95;
        System.out.println(s.name);
    }
}`,
      error: "No error. Code is correct. Student object created and used properly.",
      corrected: "No error.",
    },
    {
      id: "classes-objects-ef-2",
      question: `public class Student {
    String name;
    int marks;
    public Student(String name, int marks) {
        name = name;
        marks = marks;
    }
}`,
      error: "Constructor assigns parameters to themselves, not to instance variables. Use this.name and this.marks.",
      corrected: `public Student(String name, int marks) {
    this.name = name;
    this.marks = marks;
}`,
    },
    {
      id: "classes-objects-ef-3",
      question: `public class Test {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Alice";
    }
}`,
      error: "Student class is not defined in this file or not accessible. Define Student class or import it.",
      corrected: "Define Student class before using it.",
    },
    {
      id: "classes-objects-ef-4",
      question: `public class Student {
    String name;
    int marks;
    public Student() {
        name = "Unknown";
        marks = 0;
    }
}
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Alice", 95);
        System.out.println(s.name);
    }
}`,
      error: "No default constructor available. Constructor Student(String, int) doesn't exist. Either create this constructor or use default constructor.",
      corrected: `public Student(String name, int marks) {
    this.name = name;
    this.marks = marks;
}`,
    },
    {
      id: "classes-objects-ef-5",
      question: `public class Student {
    String name;
    int marks;
    public Student() {
    }
    public Student(String name, int marks) {
        name = name;
        marks = marks;
    }
}`,
      error: "Parameterized constructor assigns parameters to themselves. Use this.name and this.marks.",
      corrected: `public Student(String name, int marks) {
    this.name = name;
    this.marks = marks;
}`,
    },
    {
      id: "classes-objects-ef-6",
      question: `public class Test {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Alice";
        System.out.println(s.name);
    }
}
class Student {
    String name;
}`,
      error: "No error. Code is correct. Student class defined after Main is allowed in Java.",
      corrected: "No error.",
    },
    {
      id: "classes-objects-ef-7",
      question: `public class Student {
    String name;
    int marks;
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
}
public class Main {
    public static void main(String[] args) {
        Student s = Student("Alice", 95);
        System.out.println(s.name);
    }
}`,
      error: "Missing new keyword when creating object. Use new Student('Alice', 95).",
      corrected: `Student s = new Student("Alice", 95);`,
    },
    {
      id: "classes-objects-ef-8",
      question: `public class Student {
    String name;
    int marks;
    public Student() {
        name = "Unknown";
        marks = 0;
    }
    public Student(String name) {
        this.name = name;
    }
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
}
public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        System.out.println(s.name);
    }
}`,
      error: "No error. Default constructor exists and is called correctly.",
      corrected: "No error.",
    },
    {
      id: "classes-objects-ef-9",
      question: `public class Test {
    int x;
    public static void main(String[] args) {
        x = 10;
        System.out.println(x);
    }
}`,
      error: "Cannot access instance variable x from static context. Either make x static or create an object.",
      corrected: `public static void main(String[] args) {
    Test t = new Test();
    t.x = 10;
    System.out.println(t.x);
}`,
    },
    {
      id: "classes-objects-ef-10",
      question: `public class Student {
    String name;
    int marks;
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
    public void display() {
        System.out.println(name + " " + marks);
    }
}
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Alice");
        s.display();
    }
}`,
      error: "Constructor Student(String) doesn't exist. Only Student(String, int) is defined. Add second argument.",
      corrected: `Student s = new Student("Alice", 95);`,
    },
    {
      id: "classes-objects-ef-11",
      question: `public class Test {
    int x;
    public Test(int x) {
        x = x;
    }
    public static void main(String[] args) {
        Test t = new Test(10);
        System.out.println(t.x);
    }
}`,
      error: "Constructor assigns parameter to itself, not to instance variable. t.x remains 0 (default).",
      corrected: `public Test(int x) {
    this.x = x;
}`,
    },
    {
      id: "classes-objects-ef-12",
      question: `public class Student {
    String name;
    int marks;
    public Student() {
        this("Unknown");
    }
    public Student(String name) {
        this.name = name;
        marks = 0;
    }
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
}
public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        System.out.println(s.name);
    }
}`,
      error: "No error. this('Unknown') calls Student(String) constructor correctly.",
      corrected: "No error.",
    },
    {
      id: "classes-objects-ef-13",
      question: `public class Test {
    int x;
    public void setX(int x) {
        x = x;
    }
    public static void main(String[] args) {
        Test t = new Test();
        t.setX(10);
        System.out.println(t.x);
    }
}`,
      error: "setX() assigns parameter to itself, not to instance variable. t.x remains 0.",
      corrected: `public void setX(int x) {
    this.x = x;
}`,
    },
    {
      id: "classes-objects-ef-14",
      question: `public class Student {
    String name;
    int marks;
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
}
public class Main {
    public static void main(String[] args) {
        Student s;
        s.name = "Alice";
        System.out.println(s.name);
    }
}`,
      error: "Variable s might not have been initialized. Create object before using: s = new Student('Alice', 95);",
      corrected: `Student s = new Student("Alice", 95);`,
    },
    {
      id: "classes-objects-ef-15",
      question: `public class Test {
    int x = 10;
    public static void main(String[] args) {
        Test t = new Test();
        t.x = 20;
        System.out.println(t.x);
    }
}`,
      error: "No error. Code is correct. Instance variable accessed through object.",
      corrected: "No error.",
    },
    {
      id: "classes-objects-ef-16",
      question: `public class Student {
    String name;
    int marks;
    public Student(String name) {
        this.name = name;
    }
}
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Alice", 95);
        System.out.println(s.name);
    }
}`,
      error: "Constructor Student(String, int) doesn't exist. Only Student(String) is defined.",
      corrected: `Student s = new Student("Alice");`,
    },
    {
      id: "classes-objects-ef-17",
      question: `public class Test {
    int x;
    public Test(int x) {
        this.x = x;
    }
    public static void main(String[] args) {
        Test t = new Test();
        System.out.println(t.x);
    }
}`,
      error: "Constructor Test(int) requires int argument. Call with new Test(10) or create default constructor.",
      corrected: `Test t = new Test(10);`,
    },
    {
      id: "classes-objects-ef-18",
      question: `public class Student {
    String name;
    int marks;
    public Student() {
        name = "Unknown";
    }
    public Student(int marks) {
        this.marks = marks;
    }
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
}
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Alice", 95);
        System.out.println(s.name + " " + s.marks);
    }
}`,
      error: "No error. Constructor Student(String, int) exists and is called correctly.",
      corrected: "No error.",
    },
    {
      id: "classes-objects-ef-19",
      question: `public class Test {
    int x;
    public Test(int x) {
        x = x;
    }
    public static void main(String[] args) {
        Test t = new Test(10);
        System.out.println(t.x);
    }
}`,
      error: "Constructor assigns parameter to itself. Instance variable x remains 0. Use this.x = x.",
      corrected: `public Test(int x) {
    this.x = x;
}`,
    },
    {
      id: "classes-objects-ef-20",
      question: `public class Student {
    String name;
    int marks;
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
    public void display() {
        System.out.println(name + " " + marks);
    }
}
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Alice", 95);
        s.display();
    }
}`,
      error: "No error. Code is correct. Object created and method called successfully.",
      corrected: "No error.",
    },
    {
      id: "classes-objects-ef-21",
      question: `public class Test {
    int x = 5;
    public Test() {
        x = 10;
    }
    public Test(int x) {
        this.x = x;
    }
    public static void main(String[] args) {
        Test t1 = new Test();
        Test t2 = new Test(15);
        System.out.println(t1.x + t2.x);
    }
}`,
      error: "No error. t1.x=10 (from no-arg constructor), t2.x=15 (from parameterized).",
      corrected: "No error.",
    },
    {
      id: "classes-objects-ef-22",
      question: `public class Student {
    String name;
    int marks;
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
}
public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Alice";
        s.marks = 95;
        System.out.println(s.name);
    }
}`,
      error: "No default constructor available. Only Student(String, int) exists. Either create default constructor or use parameterized constructor.",
      corrected: `Student s = new Student("Alice", 95);`,
    },
  ],

  // ========== 8. FILL IN THE BLANKS ==========
  fillInTheBlanks: [
    {
      id: "classes-objects-fb-1",
      question: "A _____ is a blueprint for creating objects.",
      answer: "class",
    },
    {
      id: "classes-objects-fb-2",
      question: "An _____ is an instance of a class.",
      answer: "object",
    },
    {
      id: "classes-objects-fb-3",
      question: "The _____ keyword is used to create an object.",
      answer: "new",
    },
    {
      id: "classes-objects-fb-4",
      question: "A special method used to initialize objects is called _____.",
      answer: "constructor",
    },
    {
      id: "classes-objects-fb-5",
      question: "Constructor name must _____ the class name.",
      answer: "match",
    },
    {
      id: "classes-objects-fb-6",
      question: "Constructors do NOT have a _____ type.",
      answer: "return",
    },
    {
      id: "classes-objects-fb-7",
      question: "The _____ keyword refers to the current object.",
      answer: "this",
    },
    {
      id: "classes-objects-fb-8",
      question: "Variables defined in a class are called _____ variables.",
      answer: "instance",
    },
    {
      id: "classes-objects-fb-9",
      question: "Each object has its own _____ of instance variables.",
      answer: "copy",
    },
    {
      id: "classes-objects-fb-10",
      question: "If no constructor is defined, Java provides a _____ constructor.",
      answer: "default",
    },
    {
      id: "classes-objects-fb-11",
      question: "If any constructor is defined, Java does NOT provide _____ constructor.",
      answer: "default",
    },
    {
      id: "classes-objects-fb-12",
      question: "Objects are stored in _____ memory.",
      answer: "heap",
    },
    {
      id: "classes-objects-fb-13",
      question: "Object references are stored in _____ memory.",
      answer: "stack",
    },
    {
      id: "classes-objects-fb-14",
      question: "_____ variables belong to the class and are shared among all objects.",
      answer: "static",
    },
    {
      id: "classes-objects-fb-15",
      question: "The dot operator (.) is used to access object _____ and _____.",
      answer: "variables, methods",
    },
    {
      id: "classes-objects-fb-16",
      question: "Having multiple constructors with different parameters is called _____.",
      answer: "overloading",
    },
    {
      id: "classes-objects-fb-17",
      question: "this() is used to call another _____ from within a constructor.",
      answer: "constructor",
    },
    {
      id: "classes-objects-fb-18",
      question: "Default values: int=_____, boolean=_____, object references=_____.",
      answer: "0, false, null",
    },
    {
      id: "classes-objects-fb-19",
      question: "A class is a _____, an object is an _____.",
      answer: "blueprint, instance",
    },
    {
      id: "classes-objects-fb-20",
      question: "The process of hiding internal details and showing only functionality is called _____.",
      answer: "encapsulation",
    },
  ],

  // ========== 9. MCQs ==========
  mcqs: [
    {
      id: "classes-objects-mcq-1",
      question: "What is a class in Java?",
      options: [
        "An instance of an object",
        "A blueprint for creating objects",
        "A method",
        "A variable",
      ],
      answer: 1,
      explanation: "A class is a blueprint or template that defines the structure of objects.",
    },
    {
      id: "classes-objects-mcq-2",
      question: "What is an object?",
      options: [
        "A class definition",
        "An instance of a class",
        "A method",
        "A variable",
      ],
      answer: 1,
      explanation: "An object is an instance created from a class.",
    },
    {
      id: "classes-objects-mcq-3",
      question: "Which keyword is used to create an object?",
      options: ["create", "new", "object", "class"],
      answer: 1,
      explanation: "The new keyword is used to create objects in Java.",
    },
    {
      id: "classes-objects-mcq-4",
      question: "What is a constructor?",
      options: [
        "A regular method",
        "A special method to initialize objects",
        "A variable",
        "A class",
      ],
      answer: 1,
      explanation: "A constructor is a special method called when an object is created to initialize it.",
    },
    {
      id: "classes-objects-mcq-5",
      question: "Can a constructor have a return type?",
      options: ["Yes, int", "Yes, void", "No", "Yes, any type"],
      answer: 2,
      explanation: "Constructors do NOT have a return type, not even void.",
    },
    {
      id: "classes-objects-mcq-6",
      question: "What is the default value of int instance variable?",
      options: ["1", "0", "-1", "null"],
      answer: 1,
      explanation: "Default value of int is 0.",
    },
    {
      id: "classes-objects-mcq-7",
      question: "What is the default value of boolean instance variable?",
      options: ["true", "false", "0", "null"],
      answer: 1,
      explanation: "Default value of boolean is false.",
    },
    {
      id: "classes-objects-mcq-8",
      question: "What is the default value of object reference?",
      options: ["0", "null", "undefined", "false"],
      answer: 1,
      explanation: "Default value of object reference is null.",
    },
    {
      id: "classes-objects-mcq-9",
      question: "What does the this keyword refer to?",
      options: [
        "Current class",
        "Current object",
        "Current method",
        "Current package",
      ],
      answer: 1,
      explanation: "this keyword refers to the current object.",
    },
    {
      id: "classes-objects-mcq-10",
      question: "When is a default constructor provided by Java?",
      options: [
        "Always",
        "Never",
        "Only when no other constructor is defined",
        "Only for public classes",
      ],
      answer: 2,
      explanation: "Default constructor is provided only if no other constructor is defined.",
    },
    {
      id: "classes-objects-mcq-11",
      question: "Can a constructor be overloaded?",
      options: ["No", "Yes", "Only in same class", "Only with different return types"],
      answer: 1,
      explanation: "Yes, constructors can be overloaded with different parameters.",
    },
    {
      id: "classes-objects-mcq-12",
      question: "Where are objects created in memory?",
      options: ["Stack", "Heap", "Queue", "Register"],
      answer: 1,
      explanation: "Objects are created in heap memory.",
    },
    {
      id: "classes-objects-mcq-13",
      question: "Where are object references stored?",
      options: ["Heap", "Stack", "Queue", "Static memory"],
      answer: 1,
      explanation: "Object references are stored in stack memory.",
    },
    {
      id: "classes-objects-mcq-14",
      question: "Each object has its own copy of:",
      options: [
        "Static variables",
        "Instance variables",
        "Methods",
        "Class name",
      ],
      answer: 1,
      explanation: "Each object has its own copy of instance variables.",
    },
    {
      id: "classes-objects-mcq-15",
      question: "Static variables are:",
      options: [
        "Unique to each object",
        "Shared among all objects",
        "Stored in stack",
        "Created with new",
      ],
      answer: 1,
      explanation: "Static variables are shared among all objects of the class.",
    },
    {
      id: "classes-objects-mcq-16",
      question: "What is the output?\nStudent s = new Student();\nSystem.out.println(s);",
      options: [
        "Student",
        "classname@hashcode",
        "Error",
        "null",
      ],
      answer: 1,
      explanation: "Printing object directly shows classname@hashcode (memory address).",
    },
    {
      id: "classes-objects-mcq-17",
      question: "Which is correct syntax to create object?",
      options: [
        "Student s;",
        "Student s = new Student();",
        "new Student();",
        "create Student s;",
      ],
      answer: 1,
      explanation: "Student s = new Student(); creates object and reference.",
    },
    {
      id: "classes-objects-mcq-18",
      question: "What is constructor overloading?",
      options: [
        "Multiple constructors with same parameters",
        "Multiple constructors with different parameters",
        "Multiple return types",
        "Multiple classes",
      ],
      answer: 1,
      explanation: "Constructor overloading means multiple constructors with different parameters.",
    },
    {
      id: "classes-objects-mcq-19",
      question: "Can a constructor call another constructor?",
      options: ["No", "Yes, using this()", "Yes, using super()", "Only in inheritance"],
      answer: 1,
      explanation: "Yes, using this() to call another constructor in same class.",
    },
    {
      id: "classes-objects-mcq-20",
      question: "Where must this() appear in constructor?",
      options: [
        "Anywhere",
        "First statement",
        "Last statement",
        "Middle",
      ],
      answer: 1,
      explanation: "this() must be the first statement in constructor.",
    },
    {
      id: "classes-objects-mcq-21",
      question: "What is encapsulation?",
      options: [
        "Hiding data using private and providing public methods",
        "Creating multiple objects",
        "Using constructors",
        "Inheriting from parent class",
      ],
      answer: 0,
      explanation: "Encapsulation hides internal data using private and provides public methods to access.",
    },
    {
      id: "classes-objects-mcq-22",
      question: "Can we create an object without using new keyword?",
      options: ["No", "Yes, always", "Yes, using clone() or reflection", "Yes, using newInstance()"],
      answer: 2,
      explanation: "Objects can be created using clone(), reflection, or factory methods.",
    },
    {
      id: "classes-objects-mcq-23",
      question: "What happens if you don't initialize instance variables?",
      options: [
        "Compilation error",
        "They get default values",
        "They are null",
        "They are 0",
      ],
      answer: 1,
      explanation: "Uninitialized instance variables get default values (0, false, null).",
    },
    {
      id: "classes-objects-mcq-24",
      question: "Can a static method access instance variables directly?",
      options: ["Yes", "No", "Only if public", "Only in same class"],
      answer: 1,
      explanation: "Static methods cannot access instance variables without object reference.",
    },
    {
      id: "classes-objects-mcq-25",
      question: "What is the output?\nTest t1 = new Test();\nTest t2 = t1;\nt2.x = 10;\nSystem.out.println(t1.x);",
      options: ["0", "10", "Error", "null"],
      answer: 1,
      explanation: "t2 = t1 makes both references point to same object. Changing t2.x changes t1.x.",
    },
    {
      id: "classes-objects-mcq-26",
      question: "How many objects are created?\nTest t1 = new Test();\nTest t2 = new Test();\nTest t3 = t1;",
      options: ["1", "2", "3", "0"],
      answer: 1,
      explanation: "Two objects created. t3 = t1 just copies reference, doesn't create new object.",
    },
    {
      id: "classes-objects-mcq-27",
      question: "What is the output?\nclass Test { int x = 5; }\nTest t = new Test();\nSystem.out.println(t.x);",
      options: ["0", "5", "Error", "null"],
      answer: 1,
      explanation: "Instance variable x initialized to 5, printed as 5.",
    },
    {
      id: "classes-objects-mcq-28",
      question: "Can a class have multiple constructors?",
      options: ["No", "Yes", "Only 2", "Only with different names"],
      answer: 1,
      explanation: "Yes, constructors can be overloaded with different parameters.",
    },
    {
      id: "classes-objects-mcq-29",
      question: "What is the output?\nclass Test { static int x; }\nTest t1 = new Test();\nTest t2 = new Test();\nt1.x = 10;\nSystem.out.println(t2.x);",
      options: ["0", "10", "Error", "null"],
      answer: 1,
      explanation: "Static variable x is shared. t1.x=10 means t2.x is also 10.",
    },
    {
      id: "classes-objects-mcq-30",
      question: "Which is true about instance variables?",
      options: [
        "Shared among all objects",
        "Each object has its own copy",
        "Stored in stack",
        "Accessed without object",
      ],
      answer: 1,
      explanation: "Each object has its own copy of instance variables.",
    },
    {
      id: "classes-objects-mcq-31",
      question: "What is the output?\nclass Test { int x; public Test(int x) { this.x = x; } }\nTest t = new Test(7);\nSystem.out.println(t.x);",
      options: ["0", "7", "Error", "null"],
      answer: 1,
      explanation: "Constructor sets this.x = 7, so t.x is 7.",
    },
    {
      id: "classes-objects-mcq-32",
      question: "Can a constructor be private?",
      options: ["No", "Yes", "Only in inner classes", "Only for static classes"],
      answer: 1,
      explanation: "Yes, constructors can be private (used in singleton pattern).",
    },
    {
      id: "classes-objects-mcq-33",
      question: "What is the output?\nclass Test { int x = 5; public void show() { System.out.println(x); } }\nTest t = new Test(); t.show();",
      options: ["0", "5", "Error", "null"],
      answer: 1,
      explanation: "Instance variable x=5, show() prints 5.",
    },
    {
      id: "classes-objects-mcq-34",
      question: "Which is NOT a characteristic of OOP?",
      options: ["Encapsulation", "Inheritance", "Procedures", "Polymorphism"],
      answer: 2,
      explanation: "Procedures are characteristic of procedural programming, not OOP.",
    },
    {
      id: "classes-objects-mcq-35",
      question: "What is the output?\nclass Test { int x; Test() { x = 10; } }\nTest t = new Test(); System.out.println(t.x);",
      options: ["0", "10", "Error", "null"],
      answer: 1,
      explanation: "Constructor sets x=10, printed as 10.",
    },
    {
      id: "classes-objects-mcq-36",
      question: "Can we have a method with same name as class?",
      options: ["No", "Yes", "Only constructors", "Only in main class"],
      answer: 1,
      explanation: "Yes, methods can have same name as class (though not recommended).",
    },
    {
      id: "classes-objects-mcq-37",
      question: "What is the output?\nclass Test { int x = 5; Test() { x = x + 10; } }\nTest t = new Test(); System.out.println(t.x);",
      options: ["5", "10", "15", "Error"],
      answer: 2,
      explanation: "x starts at 5, constructor adds 10, result is 15.",
    },
    {
      id: "classes-objects-mcq-38",
      question: "Which statement creates an object?",
      options: [
        "Student s;",
        "new Student();",
        "Student s = new Student();",
        "Both B and C",
      ],
      answer: 3,
      explanation: "Both new Student() and Student s = new Student() create objects.",
    },
    {
      id: "classes-objects-mcq-39",
      question: "What is the output?\nclass Test { int x; public Test(int x) { this.x = x; } }\nTest t = new Test();",
      options: ["0", "Error", "null", "Compilation error"],
      answer: 3,
      explanation: "Compilation error: constructor Test(int) requires int argument.",
    },
    {
      id: "classes-objects-mcq-40",
      question: "Can a class exist without objects?",
      options: ["No", "Yes", "Only abstract classes", "Only interfaces"],
      answer: 1,
      explanation: "Yes, a class can exist without creating objects (e.g., utility classes with only static methods).",
    },
  ],

  // ========== 10. ASSERTION & REASON QUESTIONS ==========
  assertionReason: [
    {
      id: "classesobjects-ar-1",
      assertion: "Assertion (A): A class and object can execute zero or more times.",
      reason: "Reason (R): The condition is checked before entering the loop body.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. The condition is checked before each iteration. If false initially, it executes 0 times."
    },
    {
      id: "classesobjects-ar-2",
      assertion: "Assertion (A): The break statement exits the loop immediately.",
      reason: "Reason (R): The continue statement also exits the loop immediately.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 2,
      explanation: "A is true (break exits the loop), but R is false (continue skips only the current iteration)."
    },
    {
      id: "classesobjects-ar-3",
      assertion: "Assertion (A): Nested loops are loops inside other loops.",
      reason: "Reason (R): The inner loop completes all its iterations for each iteration of the outer loop.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. A nested loop is a loop inside another loop, and the inner loop runs completely for each outer loop iteration."
    },
    {
      id: "classesobjects-ar-4",
      assertion: "Assertion (A): An infinite loop is always a programming error.",
      reason: "Reason (R): Infinite loops can be useful in some applications like game loops.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 2,
      explanation: "A is false — infinite loops are not always errors (e.g., game loops, server listeners). R is true."
    },
    {
      id: "classesobjects-ar-5",
      assertion: "Assertion (A): A loop variable declared inside a loop is accessible outside the loop.",
      reason: "Reason (R): Variables declared inside a block have block-level scope.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 3,
      explanation: "A is false — loop variables are NOT accessible outside. R is true — variables have block-level scope."
    },
    {
      id: "classesobjects-ar-6",
      assertion: "Assertion (A): Using i++ in a loop condition checks the incremented value.",
      reason: "Reason (R): Post-increment operator increments after using the current value.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 3,
      explanation: "A is false — i++ uses the current value for comparison, then increments. R is true."
    },
    {
      id: "classesobjects-ar-7",
      assertion: "Assertion (A): A for loop can always be converted to a while loop.",
      reason: "Reason (R): Both for and while loops are entry-controlled loops.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 1,
      explanation: "Both are true. Any for loop can be rewritten as a while loop. However, the reason is not the correct explanation."
    },
    {
      id: "classesobjects-ar-8",
      assertion: "Assertion (A): The condition in a loop is evaluated n+1 times for n iterations.",
      reason: "Reason (R): The condition is checked before each iteration and once more when it becomes false.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. For n iterations, the condition is checked n times + 1 final check = n+1 times."
    },
    {
      id: "classesobjects-ar-9",
      assertion: "Assertion (A): A do-while loop always executes at least once.",
      reason: "Reason (R): The do-while loop checks the condition after executing the loop body.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "Both are true. The do-while loop is exit-controlled — the body executes first, then the condition is checked."
    },
    {
      id: "classesobjects-ar-10",
      assertion: "Assertion (A): A while loop with condition true runs infinitely.",
      reason: "Reason (R): The condition true is always true and never becomes false.",
      options: [
        "Both A and R are true and R is the correct explanation of A",
        "Both A and R are true but R is NOT the correct explanation of A",
        "A is true but R is false",
        "A is false but R is true"
      ],
      answer: 0,
      explanation: "while(true) creates an infinite loop because the condition is always true and never changes."
    },
  ],

  // ========== 11. DEBUG THE CODE ==========
  debugTheCode: [
    {
      id: "classesobjects-dc-1",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n}",
      bug: "The loop variable i is never incremented, causing an infinite loop.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "Without i++, the value of i remains 1 forever, so the condition i <= 5 is always true."
    },
    {
      id: "classesobjects-dc-2",
      question: "Find and fix the bug:\nfor (int i = 0; i < 3; i++);\n    System.out.println(\"Hello\");",
      bug: "The semicolon after the for loop creates an empty loop body.",
      debuggedCode: "for (int i = 0; i < 3; i++) {\n    System.out.println(\"Hello\");\n}",
      explanation: "The semicolon ends the for statement, making the loop body empty. The println runs only once."
    },
    {
      id: "classesobjects-dc-3",
      question: "Find and fix the bug:\nint sum = 0;\nfor (int i = 1; i <= 10; i++);\n    sum = sum + i;\nSystem.out.println(sum);",
      bug: "Two bugs: (1) semicolon after for creates empty loop, (2) i is out of scope outside the for loop.",
      debuggedCode: "int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    sum = sum + i;\n}\nSystem.out.println(sum);",
      explanation: "The semicolon must be removed, and the sum calculation must be inside the loop body."
    },
    {
      id: "classesobjects-dc-4",
      question: "Find and fix the bug:\nint i = 5;\nwhile (i >= 1)\n    System.out.println(i);\n    i--;",
      bug: "Missing braces. Only the println is inside the loop. i-- is outside and never executes.",
      debuggedCode: "int i = 5;\nwhile (i >= 1) {\n    System.out.println(i);\n    i--;\n}",
      explanation: "Without braces, only the first statement is inside the loop. i-- is outside and never runs."
    },
    {
      id: "classesobjects-dc-5",
      question: "Find and fix the bug:\nint num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n}\nSystem.out.println(sum);",
      bug: "The loop variable num is never updated (num/10 is missing), causing an infinite loop.",
      debuggedCode: "int num = 123;\nint sum = 0;\nwhile (num > 0) {\n    int digit = num % 10;\n    sum = sum + digit;\n    num = num / 10;\n}\nSystem.out.println(sum);",
      explanation: "Without num = num / 10, the value of num stays 123 forever, so the loop never ends."
    },
    {
      id: "classesobjects-dc-6",
      question: "Find and fix the bug:\nint x = 5;\nif (x = 5)\n    System.out.println(\"Equal\");",
      bug: "Using = (assignment) instead of == (comparison). Causes compilation error.",
      debuggedCode: "int x = 5;\nif (x == 5)\n    System.out.println(\"Equal\");",
      explanation: "Use == for comparison. The single = is for assignment and returns int, not boolean."
    },
    {
      id: "classesobjects-dc-7",
      question: "Find and fix the bug:\nint fact = 0;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      bug: "fact is initialized to 0. 0 * anything = 0, so the result will always be 0.",
      debuggedCode: "int fact = 1;\nfor (int i = 1; i <= 5; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);",
      explanation: "For product calculations, initialize to 1 (multiplicative identity), not 0."
    },
    {
      id: "classesobjects-dc-8",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
      bug: "Semicolon after while creates empty loop. i is out of scope.",
      debuggedCode: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}",
      explanation: "The semicolon ends the while statement. The println is outside the loop and i is out of scope."
    },
    {
      id: "classesobjects-dc-9",
      question: "Find and fix the bug:\nint a = 5, b = 10;\nif (a > b)\n    System.out.println(a);\n    System.out.println(b);",
      bug: "Missing braces. Only the first println is inside the if. The second always runs.",
      debuggedCode: "int a = 5, b = 10;\nif (a > b) {\n    System.out.println(a);\n    System.out.println(b);\n}",
      explanation: "Without braces, only the first statement after if is conditional. The second statement always executes."
    },
    {
      id: "classesobjects-dc-10",
      question: "Find and fix the bug:\nint i = 1;\nwhile (i <= 10) {\n    if (i == 5)\n        continue;\n    System.out.println(i);\n    i++;\n}",
      bug: "When i == 5, continue skips i++, causing an infinite loop (i stays 5 forever).",
      debuggedCode: "int i = 1;\nwhile (i <= 10) {\n    if (i == 5) {\n        i++;\n        continue;\n    }\n    System.out.println(i);\n    i++;\n}",
      explanation: "The continue skips the rest of the iteration including i++. Move i++ before continue or use a for loop."
    },
  ],

  // ========== 12. CASE STUDY QUESTIONS ==========
  caseStudyQuestions: [
    {
      id: "classesobjects-cs-1",
      title: "Student Marks Analysis",
      scenario: "A teacher enters marks for multiple students until -1 is entered. The program calculates class average, highest, lowest, and pass count (marks >= 40).",
      questions: [
        {
          id: "classesobjects-cs-1-q1",
          question: "Which loop is most suitable for reading marks until -1?",
          options: ["for loop", "while loop", "do-while loop", "Any loop works"],
          answer: 1,
          explanation: "A while loop is best because the number of iterations is unknown."
        },
        {
          id: "classesobjects-cs-1-q2",
          question: "What should be the loop condition?",
          options: ["while (marks > 0)", "while (marks != -1)", "while (marks >= 0)", "while (marks == -1)"],
          answer: 1,
          explanation: "The loop continues while marks is NOT equal to -1 (the sentinel value)."
        },
        {
          id: "classesobjects-cs-1-q3",
          question: "If marks are: 45, 78, 32, 90, 56, -1, how many passed?",
          options: ["2", "3", "4", "5"],
          answer: 2,
          explanation: "Students with marks >= 40: 45, 78, 90, 56 = 4 students passed."
        },
      ]
    },
    {
      id: "classesobjects-cs-2",
      title: "ATM Withdrawal System",
      scenario: "An ATM allows withdrawals in multiples of 100. The user enters amount. ATM validates (multiple of 100, positive, not exceeding balance). Multiple transactions until exit.",
      questions: [
        {
          id: "classesobjects-cs-2-q1",
          question: "What loop structure is best for the main menu?",
          options: ["for loop with fixed count", "while loop with sentinel", "nested for loop", "for-each loop"],
          answer: 1,
          explanation: "A while loop with a sentinel (exit option) is best for menu-driven programs."
        },
        {
          id: "classesobjects-cs-2-q2",
          question: "Which condition validates multiple of 100?",
          options: ["amount % 100 == 0", "amount / 100 == 0", "amount * 100 == 0", "amount - 100 == 0"],
          answer: 0,
          explanation: "amount % 100 == 0 checks if remainder is 0, meaning it is a multiple of 100."
        },
        {
          id: "classesobjects-cs-2-q3",
          question: "If balance is 5000 and user withdraws 1500, new balance?",
          options: ["3500", "1500", "5000", "6500"],
          answer: 0,
          explanation: "New balance = 5000 - 1500 = 3500."
        },
      ]
    },
    {
      id: "classesobjects-cs-3",
      title: "Pattern Printing",
      scenario: "A student prints patterns using nested loops. The program asks for pattern type and size.",
      questions: [
        {
          id: "classesobjects-cs-3-q1",
          question: "For a right-angled triangle of size 5, total stars?",
          options: ["5", "10", "15", "25"],
          answer: 2,
          explanation: "Sum of 1+2+3+4+5 = 15 stars."
        },
        {
          id: "classesobjects-cs-3-q2",
          question: "In nested loops for a square, outer loop controls:",
          options: ["Columns", "Rows", "Both", "Pattern type"],
          answer: 1,
          explanation: "The outer loop controls rows, inner loop controls columns."
        },
        {
          id: "classesobjects-cs-3-q3",
          question: "For a hollow square of size 5, boundary stars?",
          options: ["16", "20", "25", "12"],
          answer: 0,
          explanation: "Perimeter = 4*(5-1) = 16 stars. Corners counted once."
        },
      ]
    },
  ],

  // ========== 13. MIXED PRACTICE SETS ==========
  mixedPracticeSets: [
    {
      id: "classesobjects-mps-1",
      title: "Practice Set 1: Class and object Fundamentals",
      questions: [
        {
          type: "mcq",
          id: "classesobjects-mps-1-q1",
          question: "What is the output if the loop condition is false initially?",
          options: ["1 iteration", "0 iterations", "Infinite loop", "Compilation error"],
          answer: 1
        },
        {
          type: "fillInTheBlank",
          id: "classesobjects-mps-1-q2",
          question: "An entry-controlled loop checks the condition _____ each iteration.",
          answer: "before"
        },
        {
          type: "output",
          id: "classesobjects-mps-1-q3",
          question: "int i = 1;\nwhile (i <= 3) {\n    System.out.print(i + \" \");\n    i++;\n}",
          answer: "1 2 3"
        },
        {
          type: "trueFalse",
          id: "classesobjects-mps-1-q4",
          question: "A while loop can be converted to a for loop.",
          answer: true
        },
        {
          type: "shortAnswer",
          id: "classesobjects-mps-1-q5",
          question: "What is the difference between break and continue?",
          answer: "break exits the loop completely. continue skips the current iteration."
        },
      ]
    },
    {
      id: "classesobjects-mps-2",
      title: "Practice Set 2: Class and object Applications",
      questions: [
        {
          type: "mcq",
          id: "classesobjects-mps-2-q1",
          question: "Which loop is best for menu-driven programs?",
          options: ["for", "while", "do-while", "for-each"],
          answer: 1
        },
        {
          type: "output",
          id: "classesobjects-mps-2-q2",
          question: "int i = 5;\nwhile (i >= 1) {\n    System.out.print(i--);\n}",
          answer: "54321"
        },
        {
          type: "errorFinding",
          id: "classesobjects-mps-2-q3",
          question: "int i = 1;\nwhile (i <= 5);\n    System.out.println(i);",
          error: "Semicolon after while creates empty loop.",
          corrected: "int i = 1;\nwhile (i <= 5) {\n    System.out.println(i);\n    i++;\n}"
        },
        {
          type: "programming",
          id: "classesobjects-mps-2-q4",
          question: "Write a program to calculate sum of first 10 natural numbers.",
          solution: "int sum = 0, i = 1;\nwhile (i <= 10) {\n    sum = sum + i;\n    i++;\n}\nSystem.out.println(sum);"
        },
        {
          type: "assertionReason",
          id: "classesobjects-mps-2-q5",
          assertion: "A while loop may execute zero times.",
          reason: "The condition is checked before entering the loop body.",
          answer: 0
        },
      ]
    },
  ],

  // ========== 14. RAPID REVISION QUESTIONS ==========
  rapidRevisionQuestions: [
    { id: "classesobjects-rr-1", question: "What type of loop is a while loop?", answer: "Entry-controlled loop" },
    { id: "classesobjects-rr-2", question: "How many times does a while loop execute if condition is false initially?", answer: "0 times" },
    { id: "classesobjects-rr-3", question: "Where is the loop variable initialized in a while loop?", answer: "Before the while loop" },
    { id: "classesobjects-rr-4", question: "Where is the loop variable updated in a while loop?", answer: "Inside the while loop body" },
    { id: "classesobjects-rr-5", question: "What happens if you forget to update the loop variable?", answer: "Infinite loop" },
    { id: "classesobjects-rr-6", question: "Which loop is best when the number of iterations is unknown?", answer: "While loop" },
    { id: "classesobjects-rr-7", question: "Which loop is best when the number of iterations is known?", answer: "For loop" },
    { id: "classesobjects-rr-8", question: "What does while(true) create?", answer: "An infinite loop" },
    { id: "classesobjects-rr-9", question: "Which statement exits a loop immediately?", answer: "break" },
    { id: "classesobjects-rr-10", question: "Which statement skips the current iteration?", answer: "continue" },
    { id: "classesobjects-rr-11", question: "Can a while loop be nested?", answer: "Yes" },
    { id: "classesobjects-rr-12", question: "Can a while loop be converted to a for loop?", answer: "Yes" },
    { id: "classesobjects-rr-13", question: "What is a sentinel value?", answer: "A special value that signals end of input" },
    { id: "classesobjects-rr-14", question: "What is the scope of a variable declared inside a loop?", answer: "Only within the loop" },
    { id: "classesobjects-rr-15", question: "What is the difference between while and do-while?", answer: "While checks before (may not execute), do-while checks after (always executes once)" },
    { id: "classesobjects-rr-16", question: "What is a nested loop?", answer: "A loop inside another loop" },
    { id: "classesobjects-rr-17", question: "What is the time complexity of a simple loop running n times?", answer: "O(n)" },
    { id: "classesobjects-rr-18", question: "What is the output of: int i=1; while(i<=3) { System.out.print(i); i++; }", answer: "123" },
    { id: "classesobjects-rr-19", question: "What is the output of: int i=5; while(i>=1) { System.out.print(i--); }", answer: "54321" },
    { id: "classesobjects-rr-20", question: "What is the purpose of the break statement?", answer: "To exit the loop immediately" },
  ],

};

export default chapter12;