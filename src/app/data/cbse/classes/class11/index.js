/**
 * CBSE Class 11 - Computer Science
 * Complete curriculum structure with units, chapters, and metadata
 */

const class11 = {
  id: "cbse-class-11",
  name: "Class 11",
  fullName: "CBSE Class 11",
  icon: "📙",
  color: "border-purple-300 bg-purple-50",
  board: "CBSE",
  stream: "Science",
  subject: {
    id: "computer-science-11",
    code: "083",
    name: "Computer Science",
    icon: "🖥️",
    description: "Foundational computer science concepts including programming in Python, database management, and computer systems.",
    totalChapters: 24,
    totalUnits: 5,
    totalPracticals: 20,
    totalMarks: 100,
    theoryMarks: 70,
    practicalMarks: 30,
    duration: "3 hours",
    eligibility: "Class 10 passed",
    syllabus: "2024-25"
  },
  units: [
    {
      id: "unit-1-computer-fundamentals",
      unitNumber: 1,
      title: "Computer Fundamentals",
      slug: "computer-fundamentals",
      description: "Basic concepts of computer systems, number systems, and software fundamentals.",
      displayOrder: 1,
      weightage: 15,
      chapters: [
        {
          id: "ch-11-1-1",
          chapterNumber: 1,
          unitId: "unit-1-computer-fundamentals",
          title: "Computer System Overview",
          slug: "computer-system-overview",
          description: "Understanding computer systems, their components, and evolution.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 45,
          topics: ["Computer Evolution", "Types of Computers", "Components", "Input/Output Devices"],
          learningObjectives: [
            "Understand the evolution of computers",
            "Identify different types of computers",
            "Describe basic computer components",
            "Explain input/output devices"
          ],
          keywords: ["computer", "evolution", "generations", "components", "input", "output", "devices"],
          competencyLevel: "Remembering",
          marksDistribution: { mcq: 3, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Computer Generations", "Types of Computers", "I/O Devices"],
            commonMistakes: ["Confusing generations", "Missing device examples"]
          }
        },
        {
          id: "ch-11-1-2",
          chapterNumber: 2,
          unitId: "unit-1-computer-fundamentals",
          title: "Number Systems and Binary Arithmetic",
          slug: "number-systems",
          description: "Understanding number systems (binary, decimal, octal, hexadecimal) and conversions.",
          displayOrder: 2,
          difficulty: "Beginner",
          estimatedTime: 60,
          topics: ["Decimal System", "Binary System", "Octal System", "Hexadecimal System", "Number Conversions", "Binary Operations"],
          learningObjectives: [
            "Convert between different number systems",
            "Perform binary arithmetic operations",
            "Understand 1's and 2's complement",
            "Solve problems involving number conversions"
          ],
          keywords: ["number system", "binary", "decimal", "octal", "hexadecimal", "conversion", "1's complement", "2's complement"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 3, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Number Conversions", "Binary Arithmetic", "Complement Methods"],
            commonMistakes: ["Conversion errors", "Binary addition mistakes"]
          }
        },
        {
          id: "ch-11-1-3",
          chapterNumber: 3,
          unitId: "unit-1-computer-fundamentals",
          title: "Software and Operating System",
          slug: "software-operating-system",
          description: "Types of software, operating systems, and their functions.",
          displayOrder: 3,
          difficulty: "Beginner",
          estimatedTime: 50,
          topics: ["System Software", "Application Software", "Operating System", "Utility Software", "OS Functions"],
          learningObjectives: [
            "Differentiate between system and application software",
            "Explain functions of operating system",
            "Identify different types of utility software",
            "Understand software development process"
          ],
          keywords: ["software", "system software", "application software", "operating system", "utility", "OS functions"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 3, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Software Types", "OS Functions", "Utility Software"],
            commonMistakes: ["Confusing software types", "Missing OS examples"]
          }
        },
        {
          id: "ch-11-1-4",
          chapterNumber: 4,
          unitId: "unit-1-computer-fundamentals",
          title: "Memory and Storage Devices",
          slug: "memory-storage",
          description: "Memory hierarchy, types of memory, and storage devices.",
          displayOrder: 4,
          difficulty: "Beginner",
          estimatedTime: 45,
          topics: ["Memory Hierarchy", "Primary Memory", "Secondary Memory", "Cache Memory", "Storage Devices"],
          learningObjectives: [
            "Explain memory hierarchy",
            "Differentiate between RAM and ROM",
            "Compare primary and secondary storage",
            "Describe cache memory and its importance"
          ],
          keywords: ["memory", "RAM", "ROM", "cache", "hard disk", "SSD", "CD", "DVD", "storage"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 3, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Memory Types", "Storage Devices", "Memory Hierarchy"],
            commonMistakes: ["Confusing RAM/ROM", "Wrong capacity comparisons"]
          }
        }
      ]
    },
    {
      id: "unit-2-programming-methodology",
      unitNumber: 2,
      title: "Programming Methodology",
      slug: "programming-methodology",
      description: "Problem-solving techniques, algorithms, flowcharts, and programming concepts.",
      displayOrder: 2,
      weightage: 15,
      chapters: [
        {
          id: "ch-11-2-1",
          chapterNumber: 5,
          unitId: "unit-2-programming-methodology",
          title: "Problem Solving and Algorithms",
          slug: "problem-solving-algorithms",
          description: "Understanding problems, algorithms, and their characteristics.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 50,
          topics: ["Problem Solving", "Algorithm Definition", "Algorithm Characteristics", "Flowcharts", "Pseudocode"],
          learningObjectives: [
            "Understand the problem-solving approach",
            "Define algorithms and their characteristics",
            "Create flowcharts for simple problems",
            "Write pseudocode for algorithms"
          ],
          keywords: ["algorithm", "problem solving", "flowchart", "pseudocode", "steps", "logic"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Algorithm Design", "Flowcharts", "Pseudocode"],
            commonMistakes: ["Incorrect flowchart symbols", "Missing algorithm steps"]
          }
        },
        {
          id: "ch-11-2-2",
          chapterNumber: 6,
          unitId: "unit-2-programming-methodology",
          title: "Introduction to Programming",
          slug: "introduction-programming",
          description: "Programming concepts, languages, and translation methods.",
          displayOrder: 2,
          difficulty: "Beginner",
          estimatedTime: 45,
          topics: ["Programming Languages", "Low Level Language", "High Level Language", "Compiler", "Interpreter", "Assembler"],
          learningObjectives: [
            "Understand programming concepts",
            "Differentiate between low-level and high-level languages",
            "Explain compiler, interpreter, and assembler",
            "Understand language translation process"
          ],
          keywords: ["programming", "language", "compiler", "interpreter", "assembler", "low level", "high level"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Language Types", "Translation Methods", "Programming Concepts"],
            commonMistakes: ["Confusing compiler/interpreter", "Missing language examples"]
          }
        },
        {
          id: "ch-11-2-3",
          chapterNumber: 7,
          unitId: "unit-2-programming-methodology",
          title: "Introduction to Python",
          slug: "python-introduction",
          description: "Python basics, features, and program structure.",
          displayOrder: 3,
          difficulty: "Beginner",
          estimatedTime: 55,
          topics: ["Python Features", "Python Installation", "IDLE", "Program Structure", "Tokens", "Keywords", "Identifiers"],
          learningObjectives: [
            "Understand Python and its features",
            "Set up Python development environment",
            "Write basic Python programs",
            "Understand Python tokens and keywords"
          ],
          keywords: ["Python", "features", "IDLE", "tokens", "keywords", "identifiers", "variables"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Python Features", "Program Structure", "Tokens"],
            commonMistakes: ["Indentation errors", "Syntax errors"]
          }
        }
      ]
    },
    {
      id: "unit-3-python-programming",
      unitNumber: 3,
      title: "Python Programming",
      slug: "python-programming",
      description: "Comprehensive coverage of Python programming concepts and constructs.",
      displayOrder: 3,
      weightage: 30,
      chapters: [
        {
          id: "ch-11-3-1",
          chapterNumber: 8,
          unitId: "unit-3-python-programming",
          title: "Variables and Data Types",
          slug: "variables-data-types",
          description: "Python variables, data types, and type conversion.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 55,
          topics: ["Variables", "Naming Conventions", "Data Types", "Type Conversion", "Input/Output Functions"],
          learningObjectives: [
            "Create and use variables in Python",
            "Understand different data types",
            "Perform type conversion",
            "Use input() and print() functions"
          ],
          keywords: ["variables", "data types", "int", "float", "string", "type conversion", "input", "output"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Data Types", "Type Conversion", "I/O Functions"],
            commonMistakes: ["Type conversion errors", "Input function syntax"]
          }
        },
        {
          id: "ch-11-3-2",
          chapterNumber: 9,
          unitId: "unit-3-python-programming",
          title: "Operators in Python",
          slug: "operators",
          description: "Arithmetic, relational, logical, and bitwise operators in Python.",
          displayOrder: 2,
          difficulty: "Beginner",
          estimatedTime: 50,
          topics: ["Arithmetic Operators", "Relational Operators", "Logical Operators", "Assignment Operators", "Bitwise Operators", "Operator Precedence"],
          learningObjectives: [
            "Use arithmetic operators for calculations",
            "Apply relational and logical operators",
            "Understand operator precedence",
            "Use bitwise operators"
          ],
          keywords: ["operators", "arithmetic", "relational", "logical", "assignment", "bitwise", "precedence"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Operator Types", "Operator Precedence", "Expressions"],
            commonMistakes: ["Precedence errors", "Logical operator mistakes"]
          }
        },
        {
          id: "ch-11-3-3",
          chapterNumber: 10,
          unitId: "unit-3-python-programming",
          title: "Conditional Statements",
          slug: "conditional-statements",
          description: "If, if-else, nested if, and elif statements in Python.",
          displayOrder: 3,
          difficulty: "Intermediate",
          estimatedTime: 55,
          topics: ["if Statement", "if-else", "Nested if", "elif", "Conditional Expressions"],
          learningObjectives: [
            "Use if statements for decision making",
            "Implement if-else constructs",
            "Use nested if statements",
            "Apply elif for multiple conditions"
          ],
          keywords: ["if", "if-else", "nested if", "elif", "conditional", "decision making"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["If-Else", "Nested If", "Elif"],
            commonMistakes: ["Indentation errors", "Incorrect conditions"]
          }
        },
        {
          id: "ch-11-3-4",
          chapterNumber: 11,
          unitId: "unit-3-python-programming",
          title: "Iterative Statements (Loops)",
          slug: "iterative-statements",
          description: "For loops, while loops, and loop control statements.",
          displayOrder: 4,
          difficulty: "Intermediate",
          estimatedTime: 65,
          topics: ["for Loop", "while Loop", "range()", "break", "continue", "Nested Loops"],
          learningObjectives: [
            "Use for loops for iteration",
            "Implement while loops",
            "Use loop control statements (break, continue)",
            "Create nested loops"
          ],
          keywords: ["for loop", "while loop", "range", "break", "continue", "nested loops", "iteration"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["For Loop", "While Loop", "Loop Control"],
            commonMistakes: ["Infinite loops", "Incorrect range values"]
          }
        },
        {
          id: "ch-11-3-5",
          chapterNumber: 12,
          unitId: "unit-3-python-programming",
          title: "Strings in Python",
          slug: "strings",
          description: "String operations, methods, and string manipulation.",
          displayOrder: 5,
          difficulty: "Intermediate",
          estimatedTime: 55,
          topics: ["String Creation", "String Indexing", "String Slicing", "String Methods", "String Formatting"],
          learningObjectives: [
            "Create and access strings",
            "Perform string slicing and indexing",
            "Use common string methods",
            "Format strings effectively"
          ],
          keywords: ["strings", "indexing", "slicing", "string methods", "concatenation", "formatting"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["String Operations", "String Methods", "Slicing"],
            commonMistakes: ["Indexing errors", "Immutable string confusion"]
          }
        },
        {
          id: "ch-11-3-6",
          chapterNumber: 13,
          unitId: "unit-3-python-programming",
          title: "Lists in Python",
          slug: "lists",
          description: "List operations, methods, and list manipulation.",
          displayOrder: 6,
          difficulty: "Intermediate",
          estimatedTime: 60,
          topics: ["List Creation", "List Indexing", "List Slicing", "List Methods", "List Comprehension"],
          learningObjectives: [
            "Create and access lists",
            "Perform list operations (add, remove, sort)",
            "Use list methods effectively",
            "Understand list comprehension"
          ],
          keywords: ["lists", "list methods", "append", "remove", "sort", "list comprehension", "mutable"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["List Operations", "List Methods", "List Comprehension"],
            commonMistakes: ["Index out of range", "Confusing list methods"]
          }
        },
        {
          id: "ch-11-3-7",
          chapterNumber: 14,
          unitId: "unit-3-python-programming",
          title: "Tuples and Dictionaries",
          slug: "tuples-dictionaries",
          description: "Tuple and dictionary data structures in Python.",
          displayOrder: 7,
          difficulty: "Intermediate",
          estimatedTime: 55,
          topics: ["Tuple Creation", "Tuple Operations", "Dictionary Creation", "Dictionary Methods", "Key-Value Pairs"],
          learningObjectives: [
            "Create and use tuples",
            "Differentiate between lists and tuples",
            "Create and manipulate dictionaries",
            "Use dictionary methods effectively"
          ],
          keywords: ["tuples", "dictionaries", "key-value", "immutable", "mutable", "dict methods"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Tuples", "Dictionaries", "Key-Value Pairs"],
            commonMistakes: ["Confusing tuples/lists", "Key errors in dictionaries"]
          }
        },
        {
          id: "ch-11-3-8",
          chapterNumber: 15,
          unitId: "unit-3-python-programming",
          title: "Functions in Python",
          slug: "functions",
          description: "Defining and calling functions, parameters, return values, and scope.",
          displayOrder: 8,
          difficulty: "Intermediate",
          estimatedTime: 60,
          topics: ["Function Definition", "Function Call", "Parameters", "Return Statement", "Default Arguments", "Variable Scope"],
          learningObjectives: [
            "Define and call functions",
            "Use parameters and return values",
            "Understand default arguments",
            "Explain variable scope (local and global)"
          ],
          keywords: ["functions", "parameters", "arguments", "return", "scope", "local", "global", "def"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Function Definition", "Parameters", "Return Values", "Scope"],
            commonMistakes: ["Missing return statement", "Scope confusion"]
          }
        }
      ]
    },
    {
      id: "unit-4-database-management",
      unitNumber: 4,
      title: "Database Management System",
      slug: "database-management",
      description: "Introduction to databases, relational model, and SQL basics.",
      displayOrder: 4,
      weightage: 20,
      chapters: [
        {
          id: "ch-11-4-1",
          chapterNumber: 16,
          unitId: "unit-4-database-management",
          title: "Database Concepts",
          slug: "database-concepts",
          description: "Introduction to databases, DBMS, and data models.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 45,
          topics: ["Database", "DBMS", "Data Models", "Relational Model", "Tables", "Attributes", "Tuples"],
          learningObjectives: [
            "Understand database concepts",
            "Explain DBMS and its advantages",
            "Understand relational data model",
            "Identify tables, attributes, and tuples"
          ],
          keywords: ["database", "DBMS", "relational model", "tables", "attributes", "tuples", "keys"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 3, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Database Basics", "Relational Model", "Keys"],
            commonMistakes: ["Confusing DBMS with database", "Missing key concepts"]
          }
        },
        {
          id: "ch-11-4-2",
          chapterNumber: 17,
          unitId: "unit-4-database-management",
          title: "Structured Query Language (SQL)",
          slug: "sql-basics",
          description: "Introduction to SQL, data types, and basic SQL commands.",
          displayOrder: 2,
          difficulty: "Intermediate",
          estimatedTime: 60,
          topics: ["SQL Introduction", "Data Types in SQL", "CREATE TABLE", "INSERT", "SELECT", "WHERE Clause"],
          learningObjectives: [
            "Understand SQL and its importance",
            "Know common SQL data types",
            "Create tables using CREATE TABLE",
            "Use SELECT, INSERT commands with WHERE clause"
          ],
          keywords: ["SQL", "CREATE TABLE", "INSERT", "SELECT", "WHERE", "data types", "queries"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["SQL Commands", "Data Types", "WHERE Clause"],
            commonMistakes: ["SQL syntax errors", "Incorrect WHERE conditions"]
          }
        },
        {
          id: "ch-11-4-3",
          chapterNumber: 18,
          unitId: "unit-4-database-management",
          title: "SQL Advanced Commands",
          slug: "sql-advanced",
          description: "ORDER BY, GROUP BY, JOINs, and aggregate functions in SQL.",
          displayOrder: 3,
          difficulty: "Intermediate",
          estimatedTime: 60,
          topics: ["ORDER BY", "GROUP BY", "Aggregate Functions", "JOINs", "UPDATE", "DELETE"],
          learningObjectives: [
            "Use ORDER BY to sort results",
            "Apply GROUP BY for grouping data",
            "Use aggregate functions (COUNT, SUM, AVG, MAX, MIN)",
            "Understand and use JOINs"
          ],
          keywords: ["ORDER BY", "GROUP BY", "aggregate functions", "JOIN", "UPDATE", "DELETE", "SQL"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["ORDER BY", "Aggregate Functions", "JOINs"],
            commonMistakes: ["JOIN syntax errors", "Aggregate function misuse"]
          }
        }
      ]
    },
    {
      id: "unit-5-society-law-ethics",
      unitNumber: 5,
      title: "Society, Law and Ethics",
      slug: "society-law-ethics",
      description: "Understanding intellectual property rights, cyber safety, and professional ethics.",
      displayOrder: 5,
      weightage: 10,
      chapters: [
        {
          id: "ch-11-5-1",
          chapterNumber: 19,
          unitId: "unit-5-society-law-ethics",
          title: "Intellectual Property Rights",
          slug: "intellectual-property-rights",
          description: "Understanding IPR, copyright, patents, and trademarks.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 40,
          topics: ["Intellectual Property", "Copyright", "Patent", "Trademark", "Software License", "Open Source"],
          learningObjectives: [
            "Understand intellectual property rights",
            "Differentiate between copyright, patent, and trademark",
            "Explain software licensing",
            "Understand open source concepts"
          ],
          keywords: ["IPR", "copyright", "patent", "trademark", "software license", "open source"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["IPR Types", "Copyright", "Software Licensing"],
            commonMistakes: ["Confusing IPR types", "Missing examples"]
          }
        },
        {
          id: "ch-11-5-2",
          chapterNumber: 20,
          unitId: "unit-5-society-law-ethics",
          title: "Cyber Safety and Ethics",
          slug: "cyber-safety-ethics",
          description: "Cyber crimes, safety measures, and digital ethics.",
          displayOrder: 2,
          difficulty: "Beginner",
          estimatedTime: 40,
          topics: ["Cyber Crimes", "Malware", "Phishing", "Safe Practices", "Digital Footprint", "Netiquette"],
          learningObjectives: [
            "Identify common cyber crimes",
            "Apply cyber safety measures",
            "Understand digital footprint",
            "Follow digital ethics and netiquette"
          ],
          keywords: ["cyber safety", "cyber crime", "malware", "phishing", "privacy", "ethics", "netiquette"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Cyber Crimes", "Safety Measures", "Digital Ethics"],
            commonMistakes: ["Confusing crime types", "Missing safety measures"]
          }
        }
      ]
    }
  ],
  practicals: [
    {
      id: "prac-11-1",
      chapterId: "ch-11-2-1",
      title: "Flowchart and Algorithm Design",
      description: "Create flowcharts and algorithms for simple problems.",
      difficulty: "Beginner",
      estimatedTime: 30,
      software: "Pen and Paper / Draw.io",
      steps: [
        "Understand the problem statement",
        "Design algorithm using pseudocode",
        "Create flowchart with standard symbols",
        "Test the algorithm with sample inputs"
      ],
      learningObjectives: ["Design algorithms", "Create flowcharts", "Problem solving"],
      keywords: ["algorithm", "flowchart", "problem solving"],
      marks: 5
    },
    {
      id: "prac-11-2",
      chapterId: "ch-11-2-3",
      title: "Python Program - Hello World",
      description: "Write and execute first Python program.",
      difficulty: "Beginner",
      estimatedTime: 20,
      software: "Python IDE",
      steps: [
        "Install Python and IDLE",
        "Write first Python program",
        "Use print() function",
        "Run and test the program"
      ],
      learningObjectives: ["Install Python", "Write basic program", "Use print function"],
      keywords: ["Python", "first program", "print"],
      marks: 5
    },
    {
      id: "prac-11-3",
      chapterId: "ch-11-3-1",
      title: "Python Variables and Data Types",
      description: "Practice using variables and different data types.",
      difficulty: "Beginner",
      estimatedTime: 30,
      software: "Python IDE",
      steps: [
        "Create variables of different types",
        "Use type() function to check types",
        "Perform type conversion",
        "Use input() and print() functions"
      ],
      learningObjectives: ["Use variables", "Data types", "Type conversion", "I/O"],
      keywords: ["Python", "variables", "data types", "input", "output"],
      marks: 5
    },
    {
      id: "prac-11-4",
      chapterId: "ch-11-3-2",
      title: "Python Operators",
      description: "Practice using different operators in Python.",
      difficulty: "Beginner",
      estimatedTime: 30,
      software: "Python IDE",
      steps: [
        "Use arithmetic operators",
        "Use relational and logical operators",
        "Evaluate expressions",
        "Check operator precedence"
      ],
      learningObjectives: ["Use operators", "Evaluate expressions", "Operator precedence"],
      keywords: ["Python", "operators", "expressions"],
      marks: 5
    },
    {
      id: "prac-11-5",
      chapterId: "ch-11-3-3",
      title: "Python Conditional Statements",
      description: "Write programs using if, if-else, and elif.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "Python IDE",
      steps: [
        "Write program using if statement",
        "Implement if-else construct",
        "Use elif for multiple conditions",
        "Test with different inputs"
      ],
      learningObjectives: ["Use if statements", "Implement conditionals", "Decision making"],
      keywords: ["Python", "if", "if-else", "elif", "conditional"],
      marks: 5
    },
    {
      id: "prac-11-6",
      chapterId: "ch-11-3-4",
      title: "Python Loops",
      description: "Write programs using for and while loops.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Write program using for loop",
        "Implement while loop",
        "Use range() function",
        "Apply break and continue"
      ],
      learningObjectives: ["Use loops", "Implement iteration", "Loop control"],
      keywords: ["Python", "for loop", "while loop", "range", "break", "continue"],
      marks: 5
    },
    {
      id: "prac-11-7",
      chapterId: "ch-11-3-5",
      title: "Python String Operations",
      description: "Practice string operations and methods.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "Python IDE",
      steps: [
        "Create and access strings",
        "Use string slicing",
        "Apply string methods",
        "Perform string concatenation"
      ],
      learningObjectives: ["String operations", "String methods", "Slicing"],
      keywords: ["Python", "strings", "string methods", "slicing"],
      marks: 5
    },
    {
      id: "prac-11-8",
      chapterId: "ch-11-3-6",
      title: "Python List Operations",
      description: "Practice list operations and methods.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Create lists",
        "Access list elements",
        "Use list methods (append, remove, sort)",
        "Perform list slicing"
      ],
      learningObjectives: ["List operations", "List methods", "List manipulation"],
      keywords: ["Python", "lists", "list methods"],
      marks: 5
    },
    {
      id: "prac-11-9",
      chapterId: "ch-11-3-7",
      title: "Python Tuples and Dictionaries",
      description: "Practice using tuples and dictionaries.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Create tuples and access elements",
        "Create dictionaries",
        "Use dictionary methods",
        "Perform dictionary operations"
      ],
      learningObjectives: ["Use tuples", "Use dictionaries", "Key-value operations"],
      keywords: ["Python", "tuples", "dictionaries"],
      marks: 5
    },
    {
      id: "prac-11-10",
      chapterId: "ch-11-3-8",
      title: "Python Functions",
      description: "Write and use functions in Python.",
      difficulty: "Intermediate",
      estimatedTime: 45,
      software: "Python IDE",
      steps: [
        "Define functions using def",
        "Use parameters and arguments",
        "Return values from functions",
        "Test function calls"
      ],
      learningObjectives: ["Define functions", "Use parameters", "Return values"],
      keywords: ["Python", "functions", "parameters", "return"],
      marks: 5
    },
    {
      id: "prac-11-11",
      chapterId: "ch-11-4-2",
      title: "SQL - CREATE TABLE and INSERT",
      description: "Create tables and insert data using SQL.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "MySQL / SQLite",
      steps: [
        "Create database",
        "Create table with appropriate data types",
        "Insert records into table",
        "Verify data insertion"
      ],
      learningObjectives: ["Create tables", "Insert data", "SQL basics"],
      keywords: ["SQL", "CREATE TABLE", "INSERT", "database"],
      marks: 5
    },
    {
      id: "prac-11-12",
      chapterId: "ch-11-4-2",
      title: "SQL - SELECT Queries",
      description: "Write SELECT queries with different conditions.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "MySQL / SQLite",
      steps: [
        "Select all records from table",
        "Use WHERE clause for filtering",
        "Use specific column selection",
        "Test with different conditions"
      ],
      learningObjectives: ["SELECT queries", "WHERE clause", "Filtering"],
      keywords: ["SQL", "SELECT", "WHERE", "queries"],
      marks: 5
    },
    {
      id: "prac-11-13",
      chapterId: "ch-11-4-3",
      title: "SQL - ORDER BY and Aggregate Functions",
      description: "Use ORDER BY and aggregate functions in SQL.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "MySQL / SQLite",
      steps: [
        "Use ORDER BY to sort results",
        "Apply COUNT, SUM, AVG functions",
        "Use GROUP BY clause",
        "Test with sample data"
      ],
      learningObjectives: ["ORDER BY", "Aggregate functions", "GROUP BY"],
      keywords: ["SQL", "ORDER BY", "aggregate functions", "GROUP BY"],
      marks: 5
    },
    {
      id: "prac-11-14",
      chapterId: "ch-11-4-3",
      title: "SQL - JOIN Operations",
      description: "Practice JOIN operations in SQL.",
      difficulty: "Advanced",
      estimatedTime: 40,
      software: "MySQL / SQLite",
      steps: [
        "Create two related tables",
        "Use INNER JOIN",
        "Use LEFT JOIN",
        "Compare results"
      ],
      learningObjectives: ["JOIN operations", "Table relationships", "INNER JOIN", "LEFT JOIN"],
      keywords: ["SQL", "JOIN", "INNER JOIN", "LEFT JOIN"],
      marks: 5
    },
    {
      id: "prac-11-15",
      chapterId: "ch-11-3-8",
      title: "Python Program - Calculator",
      description: "Create a simple calculator using functions.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Define functions for each operation",
        "Take user input for numbers and operation",
        "Call appropriate function",
        "Display result"
      ],
      learningObjectives: ["Use functions", "Create calculator", "User input"],
      keywords: ["Python", "functions", "calculator", "programming"],
      marks: 5
    },
    {
      id: "prac-11-16",
      chapterId: "ch-11-3-6",
      title: "Python Program - List Operations",
      description: "Create program to perform various list operations.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Create list of numbers",
        "Find max, min, sum",
        "Sort the list",
        "Remove duplicates"
      ],
      learningObjectives: ["List operations", "List methods", "Programming"],
      keywords: ["Python", "lists", "programming"],
      marks: 5
    },
    {
      id: "prac-11-17",
      chapterId: "ch-11-3-4",
      title: "Python Program - Pattern Printing",
      description: "Create pattern programs using loops.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "Python IDE",
      steps: [
        "Create star patterns using loops",
        "Create number patterns",
        "Use nested loops",
        "Test different patterns"
      ],
      learningObjectives: ["Use loops", "Nested loops", "Pattern printing"],
      keywords: ["Python", "loops", "patterns", "nested loops"],
      marks: 5
    },
    {
      id: "prac-11-18",
      chapterId: "ch-11-3-5",
      title: "Python Program - String Manipulation",
      description: "Create program for string manipulation tasks.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "Python IDE",
      steps: [
        "Take string input from user",
        "Count vowels and consonants",
        "Reverse the string",
        "Check for palindrome"
      ],
      learningObjectives: ["String operations", "String methods", "Programming"],
      keywords: ["Python", "strings", "programming", "manipulation"],
      marks: 5
    },
    {
      id: "prac-11-19",
      chapterId: "ch-11-3-7",
      title: "Python Program - Dictionary Operations",
      description: "Create program using dictionaries.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "Python IDE",
      steps: [
        "Create dictionary to store student data",
        "Add, update, delete records",
        "Search for specific student",
        "Display all records"
      ],
      learningObjectives: ["Dictionary operations", "Key-value pairs", "Programming"],
      keywords: ["Python", "dictionaries", "programming"],
      marks: 5
    },
    {
      id: "prac-11-20",
      chapterId: "ch-11-3-8",
      title: "Python Program - Function Examples",
      description: "Create programs demonstrating function usage.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Create function with parameters",
        "Use default arguments",
        "Return multiple values",
        "Call functions with different inputs"
      ],
      learningObjectives: ["Functions", "Parameters", "Return values"],
      keywords: ["Python", "functions", "parameters", "return"],
      marks: 5
    }
  ],
  previousYearQuestions: {
    2020: {
      mcq: [
        { question: "Which number system uses base 2?", options: ["Decimal", "Binary", "Octal", "Hexadecimal"], answer: 1 },
        { question: "Full form of DBMS?", options: ["Data Base Management System", "Database Managing System", "Data Managing System", "None"], answer: 0 },
        { question: "Which is not a programming language?", options: ["Python", "Java", "HTML", "C++"], answer: 2 }
      ],
      shortAnswer: [
        { question: "Convert decimal number 45 to binary.", marks: 2 },
        { question: "Differentiate between compiler and interpreter.", marks: 2 },
        { question: "What is a flowchart? Name any three symbols.", marks: 2 }
      ],
      longAnswer: [
        { question: "Explain the characteristics of an algorithm. Write an algorithm to find the largest of three numbers.", marks: 4 }
      ]
    },
    2021: {
      mcq: [
        { question: "Which of the following is a high-level language?", options: ["Machine Language", "Assembly Language", "Python", "Binary"], answer: 2 },
        { question: "Which SQL command is used to retrieve data?", options: ["INSERT", "UPDATE", "SELECT", "DELETE"], answer: 2 }
      ],
      shortAnswer: [
        { question: "What is IPR? Why is it important?", marks: 2 },
        { question: "Write a Python program to swap two variables.", marks: 2 }
      ]
    },
    2022: {
      mcq: [
        { question: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Tuple", "Set"], answer: 2 },
        { question: "Which SQL clause is used to filter records?", options: ["ORDER BY", "WHERE", "GROUP BY", "HAVING"], answer: 1 }
      ],
      shortAnswer: [
        { question: "Explain 1's complement with example.", marks: 2 },
        { question: "Write a Python program to check if a number is even or odd.", marks: 2 }
      ]
    },
    2023: {
      mcq: [
        { question: "Which of the following is application software?", options: ["Linux", "Windows", "MS Word", "BIOS"], answer: 2 },
        { question: "Which Python data type uses key-value pairs?", options: ["List", "Tuple", "Dictionary", "Set"], answer: 2 }
      ],
      shortAnswer: [
        { question: "What is phishing? How can you prevent it?", marks: 2 },
        { question: "Write a Python program to find the factorial of a number.", marks: 2 }
      ]
    },
    2024: {
      mcq: [
        { question: "Which SQL function returns the number of records?", options: ["SUM()", "COUNT()", "AVG()", "MAX()"], answer: 1 },
        { question: "Which operator is used for floor division in Python?", options: ["/", "//", "%", "**"], answer: 1 }
      ],
      shortAnswer: [
        { question: "Differentiate between primary and secondary memory.", marks: 2 },
        { question: "Write a Python program to reverse a string.", marks: 2 }
      ]
    },
    2025: {
      mcq: [
        { question: "Which of the following is a utility software?", options: ["MS Word", "Photoshop", "Antivirus", "Chrome"], answer: 2 },
        { question: "Which Python keyword is used to define a function?", options: ["function", "def", "func", "define"], answer: 1 }
      ],
      shortAnswer: [
        { question: "What is copyright? How does it protect creators?", marks: 2 },
        { question: "Write a Python program to find the largest number in a list.", marks: 2 }
      ]
    }
  },
  revisionTopics: [
    {
      id: "rev-11-1",
      title: "Computer Fundamentals Revision",
      chapters: ["ch-11-1-1", "ch-11-1-2", "ch-11-1-3", "ch-11-1-4"],
      estimatedTime: 60,
      difficulty: "Beginner",
      keyPoints: [
        "Computer evolution and generations",
        "Number systems and conversions",
        "Software types and OS",
        "Memory and storage devices"
      ]
    },
    {
      id: "rev-11-2",
      title: "Programming Methodology Revision",
      chapters: ["ch-11-2-1", "ch-11-2-2", "ch-11-2-3"],
      estimatedTime: 45,
      difficulty: "Beginner",
      keyPoints: [
        "Problem solving and algorithms",
        "Flowcharts and pseudocode",
        "Python basics and features"
      ]
    },
    {
      id: "rev-11-3",
      title: "Python Programming Revision",
      chapters: ["ch-11-3-1", "ch-11-3-2", "ch-11-3-3", "ch-11-3-4", "ch-11-3-5", "ch-11-3-6", "ch-11-3-7", "ch-11-3-8"],
      estimatedTime: 90,
      difficulty: "Intermediate",
      keyPoints: [
        "Variables, data types, and operators",
        "Conditional statements",
        "Loops and iteration",
        "Strings, lists, tuples, dictionaries",
        "Functions and scope"
      ]
    },
    {
      id: "rev-11-4",
      title: "Database and Society Revision",
      chapters: ["ch-11-4-1", "ch-11-4-2", "ch-11-4-3", "ch-11-5-1", "ch-11-5-2"],
      estimatedTime: 60,
      difficulty: "Intermediate",
      keyPoints: [
        "Database concepts and DBMS",
        "SQL commands and queries",
        "JOINs and aggregate functions",
        "IPR and cyber safety"
      ]
    }
  ]
};

export default class11;