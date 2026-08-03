/**
 * CBSE Class 12 - Computer Science
 * Complete curriculum structure with units, chapters, and metadata
 */

const class12 = {
  id: "cbse-class-12",
  name: "Class 12",
  fullName: "CBSE Class 12",
  icon: "📕",
  color: "border-pink-300 bg-pink-50",
  board: "CBSE",
  stream: "Science",
  subject: {
    id: "computer-science-12",
    code: "083",
    name: "Computer Science",
    icon: "🎓",
    description: "Advanced computer science covering OOP, data structures, database management, networking, and communication technologies.",
    totalChapters: 22,
    totalUnits: 5,
    totalPracticals: 25,
    totalMarks: 100,
    theoryMarks: 70,
    practicalMarks: 30,
    duration: "3 hours",
    eligibility: "Class 11 passed",
    syllabus: "2024-25"
  },
  units: [
    {
      id: "unit-1-oop-python",
      unitNumber: 1,
      title: "Object Oriented Programming with Python",
      slug: "oop-python",
      description: "OOP concepts, classes, objects, inheritance, and polymorphism in Python.",
      displayOrder: 1,
      weightage: 20,
      chapters: [
        {
          id: "ch-12-1-1",
          chapterNumber: 1,
          unitId: "unit-1-oop-python",
          title: "Review of Python Basics",
          slug: "python-basics-review",
          description: "Quick revision of Python fundamentals from Class 11.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 40,
          topics: ["Python Basics", "Data Types", "Operators", "Control Statements", "Functions"],
          learningObjectives: [
            "Review Python basics",
            "Recall data types and operators",
            "Revise control statements",
            "Recall function concepts"
          ],
          keywords: ["Python", "basics", "review", "data types", "operators", "functions"],
          competencyLevel: "Remembering",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Python Basics", "Functions", "Data Types"],
            commonMistakes: ["Syntax errors", "Basic concept gaps"]
          }
        },
        {
          id: "ch-12-1-2",
          chapterNumber: 2,
          unitId: "unit-1-oop-python",
          title: "Introduction to OOP",
          slug: "oop-introduction",
          description: "Object-oriented programming concepts, advantages, and principles.",
          displayOrder: 2,
          difficulty: "Intermediate",
          estimatedTime: 50,
          topics: ["OOP Concepts", "Procedural vs OOP", "Classes and Objects", "Encapsulation", "Abstraction"],
          learningObjectives: [
            "Understand OOP concepts",
            "Differentiate between procedural and OOP",
            "Explain classes and objects",
            "Understand encapsulation and abstraction"
          ],
          keywords: ["OOP", "object oriented", "classes", "objects", "encapsulation", "abstraction"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["OOP Concepts", "Classes and Objects", "Encapsulation"],
            commonMistakes: ["Confusing OOP with procedural", "Missing class/object distinction"]
          }
        },
        {
          id: "ch-12-1-3",
          chapterNumber: 3,
          unitId: "unit-1-oop-python",
          title: "Classes and Objects in Python",
          slug: "classes-objects",
          description: "Creating classes, objects, methods, and instance variables.",
          displayOrder: 3,
          difficulty: "Intermediate",
          estimatedTime: 60,
          topics: ["Class Definition", "Objects", "__init__ Method", "Instance Variables", "Instance Methods", "self Parameter"],
          learningObjectives: [
            "Create classes in Python",
            "Create objects from classes",
            "Use __init__ method for initialization",
            "Understand instance variables and methods"
          ],
          keywords: ["class", "object", "__init__", "self", "instance variables", "instance methods"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Class Creation", "__init__ Method", "self Parameter"],
            commonMistakes: ["Forgetting self parameter", "Incorrect __init__ usage"]
          }
        },
        {
          id: "ch-12-1-4",
          chapterNumber: 4,
          unitId: "unit-1-oop-python",
          title: "Inheritance and Polymorphism",
          slug: "inheritance-polymorphism",
          description: "Inheritance types, method overriding, and polymorphism in Python.",
          displayOrder: 4,
          difficulty: "Advanced",
          estimatedTime: 65,
          topics: ["Inheritance", "Single Inheritance", "Multiple Inheritance", "Method Overriding", "Polymorphism", "super() Function"],
          learningObjectives: [
            "Understand inheritance and its types",
            "Implement single and multiple inheritance",
            "Override methods in child classes",
            "Use super() function",
            "Understand polymorphism"
          ],
          keywords: ["inheritance", "single inheritance", "multiple inheritance", "method overriding", "polymorphism", "super()"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Inheritance Types", "Method Overriding", "super() Function"],
            commonMistakes: ["Incorrect inheritance syntax", "Confusing MRO"]
          }
        },
        {
          id: "ch-12-1-5",
          chapterNumber: 5,
          unitId: "unit-1-oop-python",
          title: "Data Hiding and Object Oriented Programming",
          slug: "data-hiding-oop",
          description: "Data encapsulation, access modifiers, name mangling, and OOP principles.",
          displayOrder: 5,
          difficulty: "Advanced",
          estimatedTime: 55,
          topics: ["Data Hiding", "Private Variables", "Name Mangling", "Getter/Setter Methods", "OOP Principles"],
          learningObjectives: [
            "Understand data hiding concepts",
            "Use private variables in Python",
            "Implement getter and setter methods",
            "Apply OOP principles effectively"
          ],
          keywords: ["data hiding", "private", "name mangling", "getter", "setter", "encapsulation"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Data Hiding", "Private Variables", "Getter/Setter"],
            commonMistakes: ["Confusing public/private", "Incorrect name mangling"]
          }
        }
      ]
    },
    {
      id: "unit-2-advanced-python",
      unitNumber: 2,
      title: "Advanced Python",
      slug: "advanced-python",
      description: "Advanced Python concepts including file handling, error handling, and data structures.",
      displayOrder: 2,
      weightage: 20,
      chapters: [
        {
          id: "ch-12-2-1",
          chapterNumber: 6,
          unitId: "unit-2-advanced-python",
          title: "File Handling in Python",
          slug: "file-handling",
          description: "Reading, writing, and managing files in Python.",
          displayOrder: 1,
          difficulty: "Intermediate",
          estimatedTime: 55,
          topics: ["File Types", "Opening Files", "Reading Files", "Writing Files", "File Modes", "File Methods"],
          learningObjectives: [
            "Understand file handling concepts",
            "Open and close files",
            "Read from files (read(), readline(), readlines())",
            "Write to files (write(), writelines())"
          ],
          keywords: ["file handling", "open", "read", "write", "file modes", "text files", "binary files"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["File Modes", "Reading Methods", "Writing Methods"],
            commonMistakes: ["Forgetting to close files", "Incorrect file modes"]
          }
        },
        {
          id: "ch-12-2-2",
          chapterNumber: 7,
          unitId: "unit-2-advanced-python",
          title: "Exception Handling",
          slug: "exception-handling",
          description: "Handling exceptions using try-except, finally, and custom exceptions.",
          displayOrder: 2,
          difficulty: "Intermediate",
          estimatedTime: 50,
          topics: ["Exceptions", "try-except", "Multiple Exceptions", "finally Block", "raise Statement", "Custom Exceptions"],
          learningObjectives: [
            "Understand exceptions and errors",
            "Use try-except blocks",
            "Handle multiple exceptions",
            "Use finally block",
            "Raise custom exceptions"
          ],
          keywords: ["exception", "error handling", "try", "except", "finally", "raise", "custom exception"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Try-Except", "Exception Types", "Finally Block"],
            commonMistakes: ["Incorrect exception handling", "Missing finally"]
          }
        },
        {
          id: "ch-12-2-3",
          chapterNumber: 8,
          unitId: "unit-2-advanced-python",
          title: "Data Structures in Python",
          slug: "data-structures",
          description: "Stack, Queue, and their implementation in Python.",
          displayOrder: 3,
          difficulty: "Advanced",
          estimatedTime: 60,
          topics: ["Stack", "Queue", "LIFO", "FIFO", "Stack Operations", "Queue Operations", "Implementation using Lists"],
          learningObjectives: [
            "Understand stack and queue concepts",
            "Implement stack using list",
            "Implement queue using list",
            "Apply LIFO and FIFO principles"
          ],
          keywords: ["stack", "queue", "LIFO", "FIFO", "data structures", "push", "pop", "enqueue", "dequeue"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Stack Operations", "Queue Operations", "Implementation"],
            commonMistakes: ["Confusing LIFO/FIFO", "Incorrect implementation"]
          }
        },
        {
          id: "ch-12-2-4",
          chapterNumber: 9,
          unitId: "unit-2-advanced-python",
          title: "Python Modules and Packages",
          slug: "modules-packages",
          description: "Creating and using modules, packages, and standard library modules.",
          displayOrder: 4,
          difficulty: "Intermediate",
          estimatedTime: 50,
          topics: ["Modules", "Import Statement", "Creating Modules", "Packages", "Standard Library", "pip"],
          learningObjectives: [
            "Understand modules and packages",
            "Create custom modules",
            "Import modules in Python",
            "Use standard library modules"
          ],
          keywords: ["modules", "packages", "import", "standard library", "pip", "library"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Module Creation", "Import Methods", "Standard Library"],
            commonMistakes: ["Incorrect import syntax", "Module path issues"]
          }
        }
      ]
    },
    {
      id: "unit-3-database-management",
      unitNumber: 3,
      title: "Database Management System",
      slug: "database-management",
      description: "Advanced database concepts, SQL, and database connectivity with Python.",
      displayOrder: 3,
      weightage: 20,
      chapters: [
        {
          id: "ch-12-3-1",
          chapterNumber: 10,
          unitId: "unit-3-database-management",
          title: "Database Concepts Review",
          slug: "database-concepts-review",
          description: "Review of database fundamentals from Class 11.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 35,
          topics: ["Database", "DBMS", "Relational Model", "Keys", "SQL Basics"],
          learningObjectives: [
            "Review database concepts",
            "Recall relational model",
            "Review keys and relationships",
            "Recall basic SQL commands"
          ],
          keywords: ["database", "DBMS", "relational", "keys", "SQL", "review"],
          competencyLevel: "Remembering",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Database Basics", "Relational Model", "Keys"],
            commonMistakes: ["Concept confusion", "Missing key types"]
          }
        },
        {
          id: "ch-12-3-2",
          chapterNumber: 11,
          unitId: "unit-3-database-management",
          title: "SQL Advanced Features",
          slug: "sql-advanced",
          description: "Advanced SQL commands, constraints, and relationships.",
          displayOrder: 2,
          difficulty: "Intermediate",
          estimatedTime: 60,
          topics: ["Constraints", "Primary Key", "Foreign Key", "ALTER TABLE", "JOINs", "Subqueries", "Views"],
          learningObjectives: [
            "Use constraints in tables",
            "Use ALTER TABLE command",
            "Create and use JOINs",
            "Write subqueries",
            "Create views"
          ],
          keywords: ["SQL", "constraints", "primary key", "foreign key", "ALTER", "JOIN", "subquery", "views"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Constraints", "JOINs", "Subqueries"],
            commonMistakes: ["Constraint errors", "JOIN syntax errors"]
          }
        },
        {
          id: "ch-12-3-3",
          chapterNumber: 12,
          unitId: "unit-3-database-management",
          title: "Database Connectivity with Python",
          slug: "database-connectivity",
          description: "Connecting Python with databases using SQLite/MySQL connectors.",
          displayOrder: 3,
          difficulty: "Advanced",
          estimatedTime: 60,
          topics: ["Database Connectivity", "SQLite", "MySQL Connector", "CRUD Operations", "Python-DB Interface"],
          learningObjectives: [
            "Connect Python with databases",
            "Perform CRUD operations",
            "Use SQLite/MySQL connectors",
            "Build database applications"
          ],
          keywords: ["database connectivity", "SQLite", "MySQL", "CRUD", "connector", "Python database"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Database Connection", "CRUD Operations", "SQLite"],
            commonMistakes: ["Connection errors", "SQL syntax in Python"]
          }
        },
        {
          id: "ch-12-3-4",
          chapterNumber: 13,
          unitId: "unit-3-database-management",
          title: "Database Normalization",
          slug: "database-normalization",
          description: "Normalization concepts, normal forms, and database design.",
          displayOrder: 4,
          difficulty: "Advanced",
          estimatedTime: 55,
          topics: ["Normalization", "1NF", "2NF", "3NF", "BCNF", "Anomalies", "Decomposition"],
          learningObjectives: [
            "Understand normalization",
            "Apply 1NF, 2NF, 3NF",
            "Identify functional dependencies",
            "Normalize tables"
          ],
          keywords: ["normalization", "1NF", "2NF", "3NF", "BCNF", "functional dependencies", "anomalies"],
          competencyLevel: "Analyzing",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Normal Forms", "Functional Dependencies", "Normalization Process"],
            commonMistakes: ["Confusing normal forms", "Missing functional dependencies"]
          }
        }
      ]
    },
    {
      id: "unit-4-boolean-algebra",
      unitNumber: 4,
      title: "Boolean Algebra",
      slug: "boolean-algebra",
      description: "Boolean algebra, logic gates, and Karnaugh maps.",
      displayOrder: 4,
      weightage: 15,
      chapters: [
        {
          id: "ch-12-4-1",
          chapterNumber: 14,
          unitId: "unit-4-boolean-algebra",
          title: "Boolean Algebra Fundamentals",
          slug: "boolean-fundamentals",
          description: "Boolean operators, laws, and algebraic simplification.",
          displayOrder: 1,
          difficulty: "Intermediate",
          estimatedTime: 55,
          topics: ["Boolean Algebra", "Boolean Operators", "AND", "OR", "NOT", "Laws of Boolean Algebra", "Truth Tables"],
          learningObjectives: [
            "Understand Boolean algebra",
            "Use Boolean operators (AND, OR, NOT)",
            "Apply Boolean laws",
            "Create and use truth tables"
          ],
          keywords: ["boolean algebra", "AND", "OR", "NOT", "truth table", "boolean laws", "simplification"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 3, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Boolean Operators", "Boolean Laws", "Truth Tables"],
            commonMistakes: ["Operator precedence errors", "Incorrect truth tables"]
          }
        },
        {
          id: "ch-12-4-2",
          chapterNumber: 15,
          unitId: "unit-4-boolean-algebra",
          title: "Logic Gates and Circuits",
          slug: "logic-gates",
          description: "Logic gates, their symbols, and circuit design.",
          displayOrder: 2,
          difficulty: "Intermediate",
          estimatedTime: 60,
          topics: ["Logic Gates", "AND Gate", "OR Gate", "NOT Gate", "NAND", "NOR", "XOR", "XNOR", "Universal Gates"],
          learningObjectives: [
            "Identify different logic gates",
            "Draw logic gate symbols",
            "Create truth tables for gates",
            "Understand universal gates (NAND, NOR)"
          ],
          keywords: ["logic gates", "AND", "OR", "NOT", "NAND", "NOR", "XOR", "universal gates"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 3, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Logic Gates", "Gate Symbols", "Truth Tables"],
            commonMistakes: ["Incorrect gate symbols", "Wrong truth tables"]
          }
        },
        {
          id: "ch-12-4-3",
          chapterNumber: 16,
          unitId: "unit-4-boolean-algebra",
          title: "Karnaugh Maps and Minimization",
          slug: "karnaugh-maps",
          description: "Simplifying Boolean expressions using Karnaugh maps.",
          displayOrder: 3,
          difficulty: "Advanced",
          estimatedTime: 65,
          topics: ["Karnaugh Maps", "2-variable K-map", "3-variable K-map", "4-variable K-map", "Minimization", "Prime Implicants"],
          learningObjectives: [
            "Understand Karnaugh maps",
            "Create K-maps for 2, 3, and 4 variables",
            "Simplify Boolean expressions using K-maps",
            "Find prime implicants"
          ],
          keywords: ["karnaugh map", "K-map", "minimization", "boolean simplification", "prime implicants"],
          competencyLevel: "Analyzing",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["K-map Creation", "Minimization", "Grouping"],
            commonMistakes: ["Incorrect grouping", "Missing prime implicants"]
          }
        }
      ]
    },
    {
      id: "unit-5-communication-technologies",
      unitNumber: 5,
      title: "Communication Technologies",
      slug: "communication-technologies",
      description: "Networking concepts, protocols, and web technologies.",
      displayOrder: 5,
      weightage: 15,
      chapters: [
        {
          id: "ch-12-5-1",
          chapterNumber: 17,
          unitId: "unit-5-communication-technologies",
          title: "Computer Networks Fundamentals",
          slug: "computer-networks",
          description: "Basics of computer networks, types, and topologies.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 45,
          topics: ["Networks", "Network Types", "LAN", "WAN", "MAN", "Topologies", "Network Devices"],
          learningObjectives: [
            "Understand computer networks",
            "Differentiate between LAN, WAN, MAN",
            "Identify network topologies",
            "Describe network devices"
          ],
          keywords: ["networks", "LAN", "WAN", "MAN", "topology", "network devices", "switch", "router"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Network Types", "Topologies", "Network Devices"],
            commonMistakes: ["Confusing network types", "Incorrect topology identification"]
          }
        },
        {
          id: "ch-12-5-2",
          chapterNumber: 18,
          unitId: "unit-5-communication-technologies",
          title: "Network Models and Protocols",
          slug: "network-models-protocols",
          description: "OSI and TCP/IP models, protocols, and IP addressing.",
          displayOrder: 2,
          difficulty: "Intermediate",
          estimatedTime: 60,
          topics: ["OSI Model", "TCP/IP Model", "Protocols", "HTTP", "HTTPS", "FTP", "SMTP", "IP Addressing", "IPv4", "IPv6"],
          learningObjectives: [
            "Understand OSI and TCP/IP models",
            "Identify different protocols",
            "Explain IP addressing",
            "Differentiate between IPv4 and IPv6"
          ],
          keywords: ["OSI model", "TCP/IP", "protocols", "HTTP", "HTTPS", "FTP", "IP address", "IPv4", "IPv6"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 3, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["OSI Model", "TCP/IP Model", "IP Addressing"],
            commonMistakes: ["Confusing OSI layers", "Protocol confusion"]
          }
        },
        {
          id: "ch-12-5-3",
          chapterNumber: 19,
          unitId: "unit-5-communication-technologies",
          title: "Web Technologies and Security",
          slug: "web-technologies-security",
          description: "Web technologies, HTML, and network security concepts.",
          displayOrder: 3,
          difficulty: "Intermediate",
          estimatedTime: 55,
          topics: ["Web Technologies", "HTML", "CSS", "JavaScript", "Network Security", "Firewall", "Encryption", "Digital Signature"],
          learningObjectives: [
            "Understand web technologies",
            "Explain network security concepts",
            "Identify security threats",
            "Understand encryption and digital signatures"
          ],
          keywords: ["web technologies", "HTML", "CSS", "JavaScript", "network security", "firewall", "encryption"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Web Technologies", "Network Security", "Encryption"],
            commonMistakes: ["Security concept confusion", "Missing security measures"]
          }
        }
      ]
    }
  ],
  practicals: [
    {
      id: "prac-12-1",
      chapterId: "ch-12-1-2",
      title: "Python Class and Object Creation",
      description: "Create classes and objects in Python.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "Python IDE",
      steps: [
        "Define a class with __init__ method",
        "Create instance variables",
        "Create objects of the class",
        "Access instance variables and methods"
      ],
      learningObjectives: ["Create classes", "Create objects", "Use __init__"],
      keywords: ["Python", "OOP", "class", "object", "__init__"],
      marks: 5
    },
    {
      id: "prac-12-2",
      chapterId: "ch-12-1-3",
      title: "Python Class with Methods",
      description: "Create class with multiple methods.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Create class with multiple methods",
        "Use self parameter correctly",
        "Create multiple objects",
        "Call different methods"
      ],
      learningObjectives: ["Create methods", "Use self", "Call methods"],
      keywords: ["Python", "OOP", "methods", "self"],
      marks: 5
    },
    {
      id: "prac-12-3",
      chapterId: "ch-12-1-4",
      title: "Python Inheritance Example",
      description: "Implement inheritance in Python.",
      difficulty: "Advanced",
      estimatedTime: 45,
      software: "Python IDE",
      steps: [
        "Create parent class",
        "Create child class inheriting from parent",
        "Override parent method",
        "Use super() function"
      ],
      learningObjectives: ["Implement inheritance", "Method overriding", "Use super()"],
      keywords: ["Python", "inheritance", "method overriding", "super()"],
      marks: 5
    },
    {
      id: "prac-12-4",
      chapterId: "ch-12-1-5",
      title: "Python Data Hiding",
      description: "Implement data hiding using private variables.",
      difficulty: "Advanced",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Create class with private variables",
        "Use getter methods",
        "Use setter methods",
        "Test data hiding"
      ],
      learningObjectives: ["Private variables", "Getter/Setter", "Data hiding"],
      keywords: ["Python", "private", "getter", "setter", "data hiding"],
      marks: 5
    },
    {
      id: "prac-12-5",
      chapterId: "ch-12-2-1",
      title: "Python File Reading",
      description: "Read data from files using different methods.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "Python IDE",
      steps: [
        "Open file in read mode",
        "Use read() method",
        "Use readline() method",
        "Use readlines() method"
      ],
      learningObjectives: ["File reading", "read()", "readline()", "readlines()"],
      keywords: ["Python", "file handling", "reading files"],
      marks: 5
    },
    {
      id: "prac-12-6",
      chapterId: "ch-12-2-1",
      title: "Python File Writing",
      description: "Write data to files using different methods.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "Python IDE",
      steps: [
        "Open file in write mode",
        "Use write() method",
        "Use writelines() method",
        "Append data to file"
      ],
      learningObjectives: ["File writing", "write()", "writelines()", "append mode"],
      keywords: ["Python", "file handling", "writing files"],
      marks: 5
    },
    {
      id: "prac-12-7",
      chapterId: "ch-12-2-2",
      title: "Python Exception Handling",
      description: "Handle exceptions using try-except blocks.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Write code that may raise exception",
        "Use try-except block",
        "Handle specific exceptions",
        "Use finally block"
      ],
      learningObjectives: ["Exception handling", "try-except", "finally"],
      keywords: ["Python", "exception", "try", "except", "finally"],
      marks: 5
    },
    {
      id: "prac-12-8",
      chapterId: "ch-12-2-3",
      title: "Python Stack Implementation",
      description: "Implement stack using list in Python.",
      difficulty: "Advanced",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Create empty list for stack",
        "Implement push operation",
        "Implement pop operation",
        "Implement peek operation"
      ],
      learningObjectives: ["Stack implementation", "push", "pop", "peek"],
      keywords: ["Python", "stack", "LIFO", "data structure"],
      marks: 5
    },
    {
      id: "prac-12-9",
      chapterId: "ch-12-2-3",
      title: "Python Queue Implementation",
      description: "Implement queue using list in Python.",
      difficulty: "Advanced",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Create empty list for queue",
        "Implement enqueue operation",
        "Implement dequeue operation",
        "Implement peek operation"
      ],
      learningObjectives: ["Queue implementation", "enqueue", "dequeue", "peek"],
      keywords: ["Python", "queue", "FIFO", "data structure"],
      marks: 5
    },
    {
      id: "prac-12-10",
      chapterId: "ch-12-2-4",
      title: "Python Module Creation",
      description: "Create and use custom modules.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "Python IDE",
      steps: [
        "Create Python module file",
        "Define functions in module",
        "Import module in another file",
        "Use module functions"
      ],
      learningObjectives: ["Create modules", "Import modules", "Use module functions"],
      keywords: ["Python", "modules", "import"],
      marks: 5
    },
    {
      id: "prac-12-11",
      chapterId: "ch-12-3-2",
      title: "SQL - Constraints and ALTER",
      description: "Use constraints and ALTER TABLE in SQL.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "MySQL / SQLite",
      steps: [
        "Create table with constraints",
        "Use PRIMARY KEY constraint",
        "Use FOREIGN KEY constraint",
        "Use ALTER TABLE to modify structure"
      ],
      learningObjectives: ["Use constraints", "ALTER TABLE", "Keys"],
      keywords: ["SQL", "constraints", "PRIMARY KEY", "FOREIGN KEY", "ALTER"],
      marks: 5
    },
    {
      id: "prac-12-12",
      chapterId: "ch-12-3-2",
      title: "SQL - JOIN Operations",
      description: "Practice different types of JOINs.",
      difficulty: "Advanced",
      estimatedTime: 40,
      software: "MySQL / SQLite",
      steps: [
        "Create two related tables",
        "Use INNER JOIN",
        "Use LEFT JOIN",
        "Use RIGHT JOIN"
      ],
      learningObjectives: ["JOIN operations", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN"],
      keywords: ["SQL", "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN"],
      marks: 5
    },
    {
      id: "prac-12-13",
      chapterId: "ch-12-3-2",
      title: "SQL - Subqueries and Views",
      description: "Use subqueries and create views.",
      difficulty: "Advanced",
      estimatedTime: 40,
      software: "MySQL / SQLite",
      steps: [
        "Write subquery in WHERE clause",
        "Write subquery in FROM clause",
        "Create view using CREATE VIEW",
        "Query from view"
      ],
      learningObjectives: ["Subqueries", "Views", "CREATE VIEW"],
      keywords: ["SQL", "subquery", "view", "CREATE VIEW"],
      marks: 5
    },
    {
      id: "prac-12-14",
      chapterId: "ch-12-3-3",
      title: "Python - SQLite Database Connectivity",
      description: "Connect Python with SQLite database.",
      difficulty: "Advanced",
      estimatedTime: 45,
      software: "Python IDE + SQLite",
      steps: [
        "Import sqlite3 module",
        "Connect to database",
        "Create cursor",
        "Execute SQL queries",
        "Fetch and display results"
      ],
      learningObjectives: ["Database connectivity", "SQLite", "CRUD operations"],
      keywords: ["Python", "SQLite", "database", "connectivity"],
      marks: 5
    },
    {
      id: "prac-12-15",
      chapterId: "ch-12-3-3",
      title: "Python - Database CRUD Application",
      description: "Create complete CRUD application with Python and database.",
      difficulty: "Advanced",
      estimatedTime: 50,
      software: "Python IDE + SQLite",
      steps: [
        "Create database and table",
        "Implement Create operation",
        "Implement Read operation",
        "Implement Update operation",
        "Implement Delete operation"
      ],
      learningObjectives: ["CRUD operations", "Database application", "Python database"],
      keywords: ["Python", "CRUD", "database", "application"],
      marks: 5
    },
    {
      id: "prac-12-16",
      chapterId: "ch-12-1-3",
      title: "Python OOP - Student Management",
      description: "Create student management system using OOP.",
      difficulty: "Advanced",
      estimatedTime: 50,
      software: "Python IDE",
      steps: [
        "Create Student class",
        "Add attributes (name, roll, marks)",
        "Add methods (display, calculate grade)",
        "Create multiple student objects"
      ],
      learningObjectives: ["OOP implementation", "Class design", "Object creation"],
      keywords: ["Python", "OOP", "class", "student management"],
      marks: 5
    },
    {
      id: "prac-12-17",
      chapterId: "ch-12-1-4",
      title: "Python OOP - Inheritance Example",
      description: "Create inheritance hierarchy with real-world example.",
      difficulty: "Advanced",
      estimatedTime: 50,
      software: "Python IDE",
      steps: [
        "Create parent class (Person)",
        "Create child class (Student)",
        "Add specific attributes to child",
        "Override parent method"
      ],
      learningObjectives: ["Inheritance", "Method overriding", "Class hierarchy"],
      keywords: ["Python", "inheritance", "parent class", "child class"],
      marks: 5
    },
    {
      id: "prac-12-18",
      chapterId: "ch-12-2-1",
      title: "Python - CSV File Handling",
      description: "Handle CSV files in Python.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Import csv module",
        "Read CSV file using csv.reader",
        "Write CSV file using csv.writer",
        "Use DictReader and DictWriter"
      ],
      learningObjectives: ["CSV handling", "csv module", "Read/Write CSV"],
      keywords: ["Python", "CSV", "file handling"],
      marks: 5
    },
    {
      id: "prac-12-19",
      chapterId: "ch-12-2-2",
      title: "Python - Custom Exception",
      description: "Create and use custom exceptions.",
      difficulty: "Advanced",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Create custom exception class",
        "Raise custom exception",
        "Handle custom exception",
        "Test with different inputs"
      ],
      learningObjectives: ["Custom exceptions", "raise statement", "Exception handling"],
      keywords: ["Python", "custom exception", "raise"],
      marks: 5
    },
    {
      id: "prac-12-20",
      chapterId: "ch-12-2-3",
      title: "Python - Stack Application",
      description: "Create application using stack data structure.",
      difficulty: "Advanced",
      estimatedTime: 45,
      software: "Python IDE",
      steps: [
        "Implement stack class",
        "Use stack for parenthesis checking",
        "Use stack for expression evaluation",
        "Test with different inputs"
      ],
      learningObjectives: ["Stack application", "Parenthesis checking", "Expression evaluation"],
      keywords: ["Python", "stack", "application", "parenthesis"],
      marks: 5
    },
    {
      id: "prac-12-21",
      chapterId: "ch-12-2-3",
      title: "Python - Queue Application",
      description: "Create application using queue data structure.",
      difficulty: "Advanced",
      estimatedTime: 45,
      software: "Python IDE",
      steps: [
        "Implement queue class",
        "Simulate queue using list",
        "Use collections.deque",
        "Create queue application"
      ],
      learningObjectives: ["Queue implementation", "collections.deque", "Queue application"],
      keywords: ["Python", "queue", "collections", "deque"],
      marks: 5
    },
    {
      id: "prac-12-22",
      chapterId: "ch-12-3-4",
      title: "Database Normalization Practice",
      description: "Normalize tables to different normal forms.",
      difficulty: "Advanced",
      estimatedTime: 40,
      software: "Pen and Paper / DBMS Tool",
      steps: [
        "Given unnormalized table",
        "Convert to 1NF",
        "Convert to 2NF",
        "Convert to 3NF"
      ],
      learningObjectives: ["Normalization", "1NF", "2NF", "3NF"],
      keywords: ["normalization", "1NF", "2NF", "3NF", "database"],
      marks: 5
    },
    {
      id: "prac-12-23",
      chapterId: "ch-12-4-1",
      title: "Boolean Algebra Simplification",
      description: "Simplify Boolean expressions using laws.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "Pen and Paper",
      steps: [
        "Given Boolean expression",
        "Create truth table",
        "Apply Boolean laws",
        "Simplify expression"
      ],
      learningObjectives: ["Boolean simplification", "Boolean laws", "Truth tables"],
      keywords: ["boolean algebra", "simplification", "truth table"],
      marks: 5
    },
    {
      id: "prac-12-24",
      chapterId: "ch-12-4-2",
      title: "Logic Circuit Design",
      description: "Design logic circuits for given expressions.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "Pen and Paper / Logic Simulator",
      steps: [
        "Given Boolean expression",
        "Simplify expression",
        "Draw logic circuit",
        "Create truth table"
      ],
      learningObjectives: ["Logic circuits", "Logic gates", "Circuit design"],
      keywords: ["logic gates", "circuit", "boolean"],
      marks: 5
    },
    {
      id: "prac-12-25",
      chapterId: "ch-12-4-3",
      title: "Karnaugh Map Simplification",
      description: "Simplify Boolean expressions using K-maps.",
      difficulty: "Advanced",
      estimatedTime: 45,
      software: "Pen and Paper / K-map Tool",
      steps: [
        "Given Boolean function",
        "Create truth table",
        "Draw K-map",
        "Group and simplify"
      ],
      learningObjectives: ["Karnaugh maps", "Minimization", "Boolean simplification"],
      keywords: ["karnaugh map", "K-map", "minimization", "boolean"],
      marks: 5
    }
  ],
  previousYearQuestions: {
    2020: {
      mcq: [
        { question: "Which of the following is an OOP concept?", options: ["Function", "Class", "Variable", "Loop"], answer: 1 },
        { question: "Which operator is used for floor division in Python?", options: ["/", "//", "%", "**"], answer: 1 },
        { question: "Which normal form eliminates transitive dependency?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: 2 }
      ],
      shortAnswer: [
        { question: "Differentiate between class and object.", marks: 2 },
        { question: "What is inheritance? Give example.", marks: 2 },
        { question: "Write a Python program to demonstrate file handling.", marks: 2 }
      ],
      longAnswer: [
        { question: "Explain polymorphism with suitable example. Write a Python program to demonstrate method overriding.", marks: 4 }
      ]
    },
    2021: {
      mcq: [
        { question: "Which of the following is not a logic gate?", options: ["AND", "OR", "BUT", "NOT"], answer: 2 },
        { question: "Which protocol is used for secure communication?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], answer: 2 }
      ],
      shortAnswer: [
        { question: "What is exception handling? Why is it important?", marks: 2 },
        { question: "Explain the concept of data hiding.", marks: 2 }
      ]
    },
    2022: {
      mcq: [
        { question: "Which of the following is a universal gate?", options: ["AND", "OR", "NAND", "XOR"], answer: 2 },
        { question: "Which SQL command is used to modify table structure?", options: ["UPDATE", "ALTER", "MODIFY", "CHANGE"], answer: 1 }
      ],
      shortAnswer: [
        { question: "What is normalization? Why is it needed?", marks: 2 },
        { question: "Write a Python program to implement a stack.", marks: 2 }
      ]
    },
    2023: {
      mcq: [
        { question: "Which layer of OSI model is responsible for routing?", options: ["Physical", "Data Link", "Network", "Transport"], answer: 2 },
        { question: "Which of the following is application software?", options: ["Linux", "Windows", "MS Word", "BIOS"], answer: 2 }
      ],
      shortAnswer: [
        { question: "Explain the concept of inheritance with example.", marks: 2 },
        { question: "What is a view in SQL? Why is it used?", marks: 2 }
      ]
    },
    2024: {
      mcq: [
        { question: "Which of the following is used for exception handling in Python?", options: ["try-except", "if-else", "for loop", "while loop"], answer: 0 },
        { question: "Which normal form requires no partial dependency?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: 1 }
      ],
      shortAnswer: [
        { question: "What is the difference between TCP and UDP?", marks: 2 },
        { question: "Write a Python program to connect with SQLite database.", marks: 2 }
      ]
    },
    2025: {
      mcq: [
        { question: "Which of the following is a network topology?", options: ["HTTP", "Star", "SQL", "Python"], answer: 1 },
        { question: "Which Python data structure uses LIFO principle?", options: ["Queue", "Stack", "List", "Dictionary"], answer: 1 }
      ],
      shortAnswer: [
        { question: "Explain the concept of polymorphism with real-world example.", marks: 2 },
        { question: "What is digital signature? How is it used in network security?", marks: 2 }
      ]
    }
  },
  revisionTopics: [
    {
      id: "rev-12-1",
      title: "OOP with Python Revision",
      chapters: ["ch-12-1-1", "ch-12-1-2", "ch-12-1-3", "ch-12-1-4", "ch-12-1-5"],
      estimatedTime: 75,
      difficulty: "Advanced",
      keyPoints: [
        "OOP concepts and principles",
        "Classes and objects",
        "Inheritance and polymorphism",
        "Data hiding and encapsulation"
      ]
    },
    {
      id: "rev-12-2",
      title: "Advanced Python Revision",
      chapters: ["ch-12-2-1", "ch-12-2-2", "ch-12-2-3", "ch-12-2-4"],
      estimatedTime: 60,
      difficulty: "Advanced",
      keyPoints: [
        "File handling operations",
        "Exception handling",
        "Data structures (stack, queue)",
        "Modules and packages"
      ]
    },
    {
      id: "rev-12-3",
      title: "Database Management Revision",
      chapters: ["ch-12-3-1", "ch-12-3-2", "ch-12-3-3", "ch-12-3-4"],
      estimatedTime: 60,
      difficulty: "Advanced",
      keyPoints: [
        "Database concepts and SQL",
        "Advanced SQL commands",
        "Database connectivity with Python",
        "Normalization"
      ]
    },
    {
      id: "rev-12-4",
      title: "Boolean Algebra and Networking Revision",
      chapters: ["ch-12-4-1", "ch-12-4-2", "ch-12-4-3", "ch-12-5-1", "ch-12-5-2", "ch-12-5-3"],
      estimatedTime: 75,
      difficulty: "Advanced",
      keyPoints: [
        "Boolean algebra and laws",
        "Logic gates and circuits",
        "Karnaugh maps",
        "Computer networks",
        "Network models and protocols",
        "Web technologies and security"
      ]
    }
  ]
};

export default class12;