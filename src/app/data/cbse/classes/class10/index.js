/**
 * CBSE Class 10 - Computer Applications
 * Complete curriculum structure with units, chapters, and metadata
 */

import subjects from '../subjects';

const class10 = {
  id: "cbse-class-10",
  name: "Class 10",
  fullName: "CBSE Class 10",
  icon: "📘",
  color: "border-blue-300 bg-blue-50",
  board: "CBSE",
  stream: "General",
  subjects: [subjects.cbseSubjects[0]], // Computer Applications
  units: [
    {
      id: "unit-1-basics",
      unitNumber: 1,
      title: "Basic Computer System",
      slug: "basics",
      description: "Fundamentals of computer systems, hardware, software, and basic operations.",
      displayOrder: 1,
      weightage: 15,
      chapters: [
        {
          id: "ch-1-1",
          chapterNumber: 1,
          unitId: "unit-1-basics",
          title: "Introduction to Computer System",
          slug: "introduction-to-computer-system",
          description: "Understanding computer systems, their components, and basic operations.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 45,
          topics: ["Computer Basics", "Components", "Input/Output Devices", "Memory"],
          learningObjectives: [
            "Identify different types of computers and their applications",
            "Understand the basic components of a computer system",
            "Differentiate between hardware and software",
            "Explain the functions of input/output devices"
          ],
          keywords: ["computer", "hardware", "software", "CPU", "memory", "input", "output", "devices"],
          competencyLevel: "Remembering",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Computer Components", "Input/Output Devices"],
            commonMistakes: ["Confusing hardware with software", "Missing I/O device examples"]
          }
        },
        {
          id: "ch-1-2",
          chapterNumber: 2,
          unitId: "unit-1-basics",
          title: "Components of Computer System",
          slug: "components-of-computer",
          description: "Detailed study of CPU, memory types, storage devices, and motherboard components.",
          displayOrder: 2,
          difficulty: "Beginner",
          estimatedTime: 50,
          topics: ["CPU", "ALU", "CU", "Registers", "Primary Memory", "Secondary Memory", "Storage Devices"],
          learningObjectives: [
            "Describe the functions of CPU components (ALU, CU, registers)",
            "Differentiate between RAM and ROM",
            "Compare primary and secondary storage devices",
            "Explain the purpose of motherboard and expansion cards"
          ],
          keywords: ["CPU", "ALU", "CU", "registers", "RAM", "ROM", "hard disk", "SSD", "motherboard"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["CPU Components", "Memory Types", "Storage Devices"],
            commonMistakes: ["Confusing RAM with ROM", "Missing cache memory"]
          }
        },
        {
          id: "ch-1-3",
          chapterNumber: 3,
          unitId: "unit-1-basics",
          title: "Input and Output Devices",
          slug: "input-output-devices",
          description: "Study of various input and output devices, their functions, and applications.",
          displayOrder: 3,
          difficulty: "Beginner",
          estimatedTime: 40,
          topics: ["Keyboard", "Mouse", "Scanner", "Printer", "Monitor", "Plotter", "Speakers"],
          learningObjectives: [
            "List and describe common input devices",
            "Explain different types of output devices",
            "Differentiate between impact and non-impact printers",
            "Identify appropriate I/O devices for specific tasks"
          ],
          keywords: ["keyboard", "mouse", "scanner", "printer", "monitor", "plotter", "input", "output"],
          competencyLevel: "Remembering",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Input Devices", "Output Devices", "Printer Types"],
            commonMistakes: ["Missing examples", "Confusing device categories"]
          }
        },
        {
          id: "ch-1-4",
          chapterNumber: 4,
          unitId: "unit-1-basics",
          title: "Memory and Storage",
          slug: "memory-storage",
          description: "Understanding memory hierarchy, types of memory, and storage media.",
          displayOrder: 4,
          difficulty: "Beginner",
          estimatedTime: 45,
          topics: ["Memory Hierarchy", "Cache Memory", "RAM", "ROM", "Hard Disk", "CD/DVD", "Flash Drive"],
          learningObjectives: [
            "Explain the memory hierarchy in computers",
            "Differentiate between volatile and non-volatile memory",
            "Compare different storage media based on capacity and speed",
            "Describe the use of cache memory"
          ],
          keywords: ["memory", "cache", "RAM", "ROM", "hard disk", "CD", "DVD", "pen drive", "storage"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2022, 2023, 2024],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Memory Types", "Storage Devices", "Memory Hierarchy"],
            commonMistakes: ["Confusing volatile/non-volatile", "Wrong capacity comparisons"]
          }
        },
        {
          id: "ch-1-5",
          chapterNumber: 5,
          unitId: "unit-1-basics",
          title: "Software and Operating System",
          slug: "software-operating-system",
          description: "Introduction to software types, operating systems, and their functions.",
          displayOrder: 5,
          difficulty: "Beginner",
          estimatedTime: 40,
          topics: ["System Software", "Application Software", "Operating System", "Utility Software"],
          learningObjectives: [
            "Differentiate between system and application software",
            "Explain the functions of an operating system",
            "Identify different types of utility software",
            "Understand the importance of software in computing"
          ],
          keywords: ["software", "system software", "application software", "operating system", "Windows", "Linux", "utility"],
          competencyLevel: "Remembering",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Software Types", "OS Functions", "Utility Software"],
            commonMistakes: ["Missing OS examples", "Confusing software types"]
          }
        }
      ]
    },
    {
      id: "unit-2-office-tools",
      unitNumber: 2,
      title: "Office Tools",
      slug: "office-tools",
      description: "Hands-on training with Microsoft Office Suite - Word, Excel, and PowerPoint.",
      displayOrder: 2,
      weightage: 25,
      chapters: [
        {
          id: "ch-2-1",
          chapterNumber: 6,
          unitId: "unit-2-office-tools",
          title: "Microsoft Word - Basics",
          slug: "word-basics",
          description: "Introduction to MS Word, document creation, formatting, and basic operations.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 60,
          topics: ["Opening Word", "Creating Documents", "Text Formatting", "Paragraph Formatting", "Saving Documents"],
          learningObjectives: [
            "Create and save Word documents",
            "Apply text and paragraph formatting",
            "Use formatting tools like bold, italic, underline",
            "Set page margins and orientation"
          ],
          keywords: ["MS Word", "document", "formatting", "font", "paragraph", "margins", "save", "print"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 0, longAnswer: 0, practical: 10 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: false,
            importantTopics: ["Document Creation", "Formatting", "Page Setup"],
            commonMistakes: ["Incorrect formatting", "Missing page setup"]
          }
        },
        {
          id: "ch-2-2",
          chapterNumber: 7,
          unitId: "unit-2-office-tools",
          title: "Microsoft Word - Advanced Features",
          slug: "word-advanced",
          description: "Advanced Word features including tables, images, headers, footers, and mail merge.",
          displayOrder: 2,
          difficulty: "Intermediate",
          estimatedTime: 70,
          topics: ["Tables", "Images", "Shapes", "Headers", "Footers", "Page Numbers", "Mail Merge"],
          learningObjectives: [
            "Create and format tables in Word",
            "Insert and format images and shapes",
            "Add headers, footers, and page numbers",
            "Perform mail merge for bulk letters"
          ],
          keywords: ["MS Word", "tables", "images", "headers", "footers", "mail merge", "advanced"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 0, longAnswer: 0, practical: 10 },
          previousYearQuestions: [2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: false,
            importantTopics: ["Tables", "Mail Merge", "Headers/Footers"],
            commonMistakes: ["Incorrect table formatting", "Mail merge errors"]
          }
        },
        {
          id: "ch-2-3",
          chapterNumber: 8,
          unitId: "unit-2-office-tools",
          title: "Microsoft Excel - Basics",
          slug: "excel-basics",
          description: "Introduction to MS Excel, spreadsheets, formulas, and basic functions.",
          displayOrder: 3,
          difficulty: "Beginner",
          estimatedTime: 60,
          topics: ["Excel Interface", "Cells", "Formulas", "Basic Functions", "Formatting Cells"],
          learningObjectives: [
            "Create and format Excel spreadsheets",
            "Use basic formulas (SUM, AVERAGE, MAX, MIN)",
            "Apply cell formatting and number formats",
            "Create simple charts"
          ],
          keywords: ["MS Excel", "spreadsheet", "formulas", "functions", "SUM", "AVERAGE", "charts"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 0, longAnswer: 0, practical: 10 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: false,
            importantTopics: ["Formulas", "Functions", "Charts"],
            commonMistakes: ["Formula errors", "Incorrect cell references"]
          }
        },
        {
          id: "ch-2-4",
          chapterNumber: 9,
          unitId: "unit-2-office-tools",
          title: "Microsoft Excel - Advanced",
          slug: "excel-advanced",
          description: "Advanced Excel features including complex functions, data sorting, filtering, and pivot tables.",
          displayOrder: 4,
          difficulty: "Intermediate",
          estimatedTime: 70,
          topics: ["IF Function", "VLOOKUP", "Data Sorting", "Data Filtering", "Pivot Tables"],
          learningObjectives: [
            "Use logical functions (IF, AND, OR)",
            "Apply lookup functions (VLOOKUP, HLOOKUP)",
            "Sort and filter data effectively",
            "Create and interpret pivot tables"
          ],
          keywords: ["MS Excel", "IF function", "VLOOKUP", "sorting", "filtering", "pivot tables", "advanced"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 0, longAnswer: 0, practical: 10 },
          previousYearQuestions: [2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: false,
            importantTopics: ["IF Function", "VLOOKUP", "Pivot Tables"],
            commonMistakes: ["Incorrect function syntax", "Pivot table configuration errors"]
          }
        },
        {
          id: "ch-2-5",
          chapterNumber: 10,
          unitId: "unit-2-office-tools",
          title: "Microsoft PowerPoint",
          slug: "powerpoint",
          description: "Creating presentations with PowerPoint, adding animations, and slide transitions.",
          displayOrder: 5,
          difficulty: "Beginner",
          estimatedTime: 50,
          topics: ["PowerPoint Interface", "Slides", "Text", "Images", "Animations", "Transitions", "Slide Show"],
          learningObjectives: [
            "Create professional PowerPoint presentations",
            "Add and format text, images, and shapes",
            "Apply animations and slide transitions",
            "Run slide shows effectively"
          ],
          keywords: ["PowerPoint", "presentation", "slides", "animations", "transitions", "slide show"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 0, longAnswer: 0, practical: 10 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: false,
            importantTopics: ["Slide Creation", "Animations", "Transitions"],
            commonMistakes: ["Excessive animations", "Poor design choices"]
          }
        },
        {
          id: "ch-2-6",
          chapterNumber: 11,
          unitId: "unit-2-office-tools",
          title: "Office Tools Integration",
          slug: "office-integration",
          description: "Integrating Word, Excel, and PowerPoint for comprehensive document solutions.",
          displayOrder: 6,
          difficulty: "Intermediate",
          estimatedTime: 45,
          topics: ["Linking Excel in Word", "Embedding Objects", "Object Linking", "Data Sharing"],
          learningObjectives: [
            "Link Excel data in Word documents",
            "Embed objects from one application to another",
            "Share data between Office applications",
            "Create integrated reports"
          ],
          keywords: ["integration", "linking", "embedding", "OLE", "data sharing", "Office Suite"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 0, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: false,
            importantTopics: ["Object Linking", "Data Integration"],
            commonMistakes: ["Broken links", "Incorrect embedding"]
          }
        }
      ]
    },
    {
      id: "unit-3-web-technologies",
      unitNumber: 3,
      title: "Web Technologies and HTML",
      slug: "web-technologies",
      description: "Fundamentals of web development with HTML and CSS.",
      displayOrder: 3,
      weightage: 20,
      chapters: [
        {
          id: "ch-3-1",
          chapterNumber: 12,
          unitId: "unit-3-web-technologies",
          title: "Introduction to HTML",
          slug: "html-introduction",
          description: "Basics of HTML, document structure, and common HTML tags.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 50,
          topics: ["HTML Basics", "Document Structure", "Headings", "Paragraphs", "Links", "Images"],
          learningObjectives: [
            "Understand the purpose of HTML",
            "Create basic HTML document structure",
            "Use common HTML tags (headings, paragraphs, links, images)",
            "Create simple web pages"
          ],
          keywords: ["HTML", "web page", "tags", "elements", "attributes", "document structure", "hyperlink"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["HTML Tags", "Document Structure", "Links and Images"],
            commonMistakes: ["Missing closing tags", "Incorrect attribute syntax"]
          }
        },
        {
          id: "ch-3-2",
          chapterNumber: 13,
          unitId: "unit-3-web-technologies",
          title: "HTML Lists and Tables",
          slug: "html-lists-tables",
          description: "Creating ordered, unordered lists and tables in HTML.",
          displayOrder: 2,
          difficulty: "Beginner",
          estimatedTime: 45,
          topics: ["Ordered Lists", "Unordered Lists", "Definition Lists", "Table Structure", "Table Attributes"],
          learningObjectives: [
            "Create ordered and unordered lists",
            "Create tables with rows, columns, and headers",
            "Apply table attributes for formatting",
            "Combine lists and tables in web pages"
          ],
          keywords: ["HTML", "lists", "tables", "ordered", "unordered", "rows", "columns", "headers"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2021, 2022, 2023, 2024],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["List Types", "Table Structure", "Table Attributes"],
            commonMistakes: ["Incorrect table structure", "Missing list tags"]
          }
        },
        {
          id: "ch-3-3",
          chapterNumber: 14,
          unitId: "unit-3-web-technologies",
          title: "HTML Forms and Input Elements",
          slug: "html-forms",
          description: "Creating forms with various input elements for user data collection.",
          displayOrder: 3,
          difficulty: "Intermediate",
          estimatedTime: 50,
          topics: ["Form Tag", "Text Input", "Radio Buttons", "Checkboxes", "Dropdown", "Submit Button"],
          learningObjectives: [
            "Create HTML forms with various input elements",
            "Use different input types (text, radio, checkbox, select)",
            "Add submit and reset buttons",
            "Understand form attributes"
          ],
          keywords: ["HTML", "forms", "input", "textbox", "radio", "checkbox", "dropdown", "submit"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Form Elements", "Input Types", "Form Attributes"],
            commonMistakes: ["Missing form attributes", "Incorrect input types"]
          }
        },
        {
          id: "ch-3-4",
          chapterNumber: 15,
          unitId: "unit-3-web-technologies",
          title: "Introduction to CSS",
          slug: "css-introduction",
          description: "Basics of CSS for styling HTML pages.",
          displayOrder: 4,
          difficulty: "Intermediate",
          estimatedTime: 45,
          topics: ["CSS Basics", "Inline CSS", "Internal CSS", "External CSS", "Common Properties"],
          learningObjectives: [
            "Understand the purpose of CSS",
            "Apply inline, internal, and external CSS",
            "Use common CSS properties (color, font, background)",
            "Style HTML elements effectively"
          ],
          keywords: ["CSS", "styling", "inline", "internal", "external", "properties", "color", "font"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 5 },
          previousYearQuestions: [2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["CSS Methods", "Common Properties", "Selectors"],
            commonMistakes: ["Incorrect CSS syntax", "Wrong property names"]
          }
        }
      ]
    },
    {
      id: "unit-4-programming",
      unitNumber: 4,
      title: "Programming Fundamentals",
      slug: "programming-fundamentals",
      description: "Introduction to programming using Scratch and/or Python.",
      displayOrder: 4,
      weightage: 25,
      chapters: [
        {
          id: "ch-4-1",
          chapterNumber: 16,
          unitId: "unit-4-programming",
          title: "Introduction to Scratch",
          slug: "scratch-introduction",
          description: "Visual programming with Scratch - blocks, sprites, and basic animations.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 60,
          topics: ["Scratch Interface", "Sprites", "Blocks", "Scripts", "Costumes", "Backdrops"],
          learningObjectives: [
            "Understand visual programming concepts",
            "Create simple Scratch programs using blocks",
            "Animate sprites and change costumes",
            "Use event and control blocks effectively"
          ],
          keywords: ["Scratch", "visual programming", "blocks", "sprites", "animation", "MIT"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 0, longAnswer: 0, practical: 10 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: false,
            importantTopics: ["Scratch Interface", "Animation", "Event Handling"],
            commonMistakes: ["Incorrect block sequences", "Missing event triggers"]
          }
        },
        {
          id: "ch-4-2",
          chapterNumber: 17,
          unitId: "unit-4-programming",
          title: "Scratch - Variables and Conditionals",
          slug: "scratch-variables-conditionals",
          description: "Using variables, operators, and conditional statements in Scratch.",
          displayOrder: 2,
          difficulty: "Intermediate",
          estimatedTime: 60,
          topics: ["Variables", "Operators", "If-Else", "Loops", "Broadcast"],
          learningObjectives: [
            "Create and use variables in Scratch",
            "Apply operators for calculations",
            "Use conditional statements (if-else)",
            "Implement loops for repetition"
          ],
          keywords: ["Scratch", "variables", "operators", "if-else", "loops", "conditions"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 0, longAnswer: 0, practical: 10 },
          previousYearQuestions: [2022, 2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: false,
            importantTopics: ["Variables", "Conditionals", "Loops"],
            commonMistakes: ["Incorrect variable usage", "Loop logic errors"]
          }
        },
        {
          id: "ch-4-3",
          chapterNumber: 18,
          unitId: "unit-4-programming",
          title: "Introduction to Python",
          slug: "python-introduction",
          description: "Basics of Python programming - syntax, variables, data types, and input/output.",
          displayOrder: 3,
          difficulty: "Beginner",
          estimatedTime: 60,
          topics: ["Python Basics", "Variables", "Data Types", "Input/Output", "Comments"],
          learningObjectives: [
            "Understand Python as a programming language",
            "Write basic Python programs",
            "Use variables and different data types",
            "Take user input and display output"
          ],
          keywords: ["Python", "programming", "variables", "data types", "input", "output", "syntax"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 10 },
          previousYearQuestions: [2023, 2024, 2025],
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Python Syntax", "Variables", "Data Types", "I/O"],
            commonMistakes: ["Indentation errors", "Syntax errors"]
          }
        }
      ]
    },
    {
      id: "unit-5-cyber-safety",
      unitNumber: 5,
      title: "Cyber Safety and Ethics",
      slug: "cyber-safety",
      description: "Understanding digital safety, ethics, and responsible use of technology.",
      displayOrder: 5,
      weightage: 15,
      chapters: [
        {
          id: "ch-5-1",
          chapterNumber: 19,
          unitId: "unit-5-cyber-safety",
          title: "Internet and Web Browsing",
          slug: "internet-web-browsing",
          description: "Understanding the Internet, web browsers, and safe browsing practices.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 40,
          topics: ["Internet Basics", "Web Browsers", "Search Engines", "URL", "HTTP/HTTPS"],
          learningObjectives: [
            "Explain how the Internet works",
            "Use web browsers effectively",
            "Search information using search engines",
            "Understand URLs and web addresses"
          ],
          keywords: ["Internet", "web browser", "search engine", "URL", "HTTP", "HTTPS", "browsing"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Internet Basics", "Web Browsers", "Search Engines"],
            commonMistakes: ["Confusing HTTP/HTTPS", "Incorrect URL structure"]
          }
        },
        {
          id: "ch-5-2",
          chapterNumber: 20,
          unitId: "unit-5-cyber-safety",
          title: "Cyber Safety and Ethics",
          slug: "cyber-safety-ethics",
          description: "Understanding cyber threats, safety measures, and digital ethics.",
          displayOrder: 2,
          difficulty: "Beginner",
          estimatedTime: 45,
          topics: ["Cyber Threats", "Malware", "Phishing", "Safe Practices", "Digital Footprint", "Netiquette"],
          learningObjectives: [
            "Identify common cyber threats (viruses, malware, phishing)",
            "Apply safe browsing and computing practices",
            "Understand digital footprint and privacy",
            "Follow digital ethics and netiquette"
          ],
          keywords: ["cyber safety", "malware", "virus", "phishing", "privacy", "digital footprint", "ethics", "netiquette"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 0, practical: 0 },
          previousYearQuestions: [2021, 2022, 2023, 2024, 2025],
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Cyber Threats", "Safety Measures", "Digital Ethics"],
            commonMistakes: ["Confusing malware types", "Missing safety measures"]
          }
        }
      ]
    }
  ],
  practicals: [
    {
      id: "prac-10-1",
      chapterId: "ch-2-1",
      title: "Word Document Creation and Formatting",
      description: "Create a formatted document with headings, paragraphs, and page setup.",
      difficulty: "Beginner",
      estimatedTime: 30,
      software: "MS Word",
      steps: [
        "Open MS Word and create a new document",
        "Type content with multiple paragraphs",
        "Apply font formatting (size, style, color)",
        "Set page margins and orientation",
        "Save the document with proper naming"
      ],
      learningObjectives: ["Create Word documents", "Apply formatting", "Set page properties"],
      keywords: ["MS Word", "formatting", "document", "practical"],
      marks: 10
    },
    {
      id: "prac-10-2",
      chapterId: "ch-2-2",
      title: "Word Advanced Features",
      description: "Create a document with tables, images, and mail merge.",
      difficulty: "Intermediate",
      estimatedTime: 45,
      software: "MS Word",
      steps: [
        "Create a table with specified rows and columns",
        "Insert and format an image",
        "Add headers and footers with page numbers",
        "Create mail merge letters for multiple recipients"
      ],
      learningObjectives: ["Create tables", "Insert images", "Use mail merge"],
      keywords: ["MS Word", "tables", "mail merge", "advanced"],
      marks: 10
    },
    {
      id: "prac-10-3",
      chapterId: "ch-2-3",
      title: "Excel Spreadsheet with Formulas",
      description: "Create an Excel sheet with formulas, functions, and charts.",
      difficulty: "Beginner",
      estimatedTime: 40,
      software: "MS Excel",
      steps: [
        "Create a spreadsheet with student data",
        "Use SUM, AVERAGE, MAX, MIN functions",
        "Create a chart to visualize data",
        "Format cells with colors and borders"
      ],
      learningObjectives: ["Use Excel formulas", "Apply functions", "Create charts"],
      keywords: ["MS Excel", "formulas", "functions", "charts"],
      marks: 10
    },
    {
      id: "prac-10-4",
      chapterId: "ch-2-4",
      title: "Excel Advanced Functions",
      description: "Use IF function, VLOOKUP, sorting, and filtering in Excel.",
      difficulty: "Intermediate",
      estimatedTime: 45,
      software: "MS Excel",
      steps: [
        "Create a marksheet with student data",
        "Use IF function to calculate grades",
        "Use VLOOKUP to find student information",
        "Sort and filter data by different criteria"
      ],
      learningObjectives: ["Use IF function", "Apply VLOOKUP", "Sort and filter data"],
      keywords: ["MS Excel", "IF", "VLOOKUP", "sorting", "filtering"],
      marks: 10
    },
    {
      id: "prac-10-5",
      chapterId: "ch-2-5",
      title: "PowerPoint Presentation",
      description: "Create a presentation with multiple slides, animations, and transitions.",
      difficulty: "Beginner",
      estimatedTime: 35,
      software: "MS PowerPoint",
      steps: [
        "Create 5-7 slides on a given topic",
        "Add text, images, and shapes",
        "Apply animations to slide elements",
        "Add slide transitions",
        "Run slide show"
      ],
      learningObjectives: ["Create presentations", "Add animations", "Apply transitions"],
      keywords: ["PowerPoint", "presentation", "animations", "transitions"],
      marks: 10
    },
    {
      id: "prac-10-6",
      chapterId: "ch-3-1",
      title: "HTML Web Page Creation",
      description: "Create a simple web page with various HTML tags.",
      difficulty: "Beginner",
      estimatedTime: 30,
      software: "Text Editor + Browser",
      steps: [
        "Create HTML document structure",
        "Add headings, paragraphs, and formatting",
        "Insert images with proper attributes",
        "Create hyperlinks to other pages",
        "View in web browser"
      ],
      learningObjectives: ["Create HTML pages", "Use common tags", "Add images and links"],
      keywords: ["HTML", "web page", "tags", "practical"],
      marks: 5
    },
    {
      id: "prac-10-7",
      chapterId: "ch-3-2",
      title: "HTML Lists and Tables",
      description: "Create web pages with lists and tables.",
      difficulty: "Beginner",
      estimatedTime: 30,
      software: "Text Editor + Browser",
      steps: [
        "Create ordered and unordered lists",
        "Create a table with headers and data",
        "Apply table attributes (border, cellpadding, etc.)",
        "Combine lists and tables in a single page"
      ],
      learningObjectives: ["Create lists", "Create tables", "Apply attributes"],
      keywords: ["HTML", "lists", "tables"],
      marks: 5
    },
    {
      id: "prac-10-8",
      chapterId: "ch-3-3",
      title: "HTML Form Creation",
      description: "Create a form with various input elements.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "Text Editor + Browser",
      steps: [
        "Create form with text input fields",
        "Add radio buttons and checkboxes",
        "Create dropdown list (select element)",
        "Add submit and reset buttons",
        "Apply basic form validation"
      ],
      learningObjectives: ["Create forms", "Use input elements", "Add buttons"],
      keywords: ["HTML", "forms", "input", "buttons"],
      marks: 5
    },
    {
      id: "prac-10-9",
      chapterId: "ch-3-4",
      title: "CSS Styling",
      description: "Apply CSS to style an HTML page.",
      difficulty: "Intermediate",
      estimatedTime: 30,
      software: "Text Editor + Browser",
      steps: [
        "Create HTML page with content",
        "Apply inline CSS to specific elements",
        "Apply internal CSS in style tag",
        "Style text, colors, backgrounds, and fonts"
      ],
      learningObjectives: ["Apply CSS", "Use different CSS methods", "Style elements"],
      keywords: ["CSS", "styling", "HTML"],
      marks: 5
    },
    {
      id: "prac-10-10",
      chapterId: "ch-4-1",
      title: "Scratch Animation",
      description: "Create an animated story or game in Scratch.",
      difficulty: "Beginner",
      estimatedTime: 45,
      software: "Scratch",
      steps: [
        "Open Scratch and select a sprite",
        "Add backdrops for scenes",
        "Use motion blocks to animate sprite",
        "Add sound effects",
        "Create simple interactive story"
      ],
      learningObjectives: ["Create animations", "Use sprites", "Add interactions"],
      keywords: ["Scratch", "animation", "sprites", "blocks"],
      marks: 10
    },
    {
      id: "prac-10-11",
      chapterId: "ch-4-2",
      title: "Scratch Interactive Program",
      description: "Create an interactive program with variables and conditionals in Scratch.",
      difficulty: "Intermediate",
      estimatedTime: 50,
      software: "Scratch",
      steps: [
        "Create variables to track score",
        "Use conditional blocks for game logic",
        "Implement loops for continuous action",
        "Add user interaction with keyboard/mouse"
      ],
      learningObjectives: ["Use variables", "Apply conditionals", "Implement loops"],
      keywords: ["Scratch", "variables", "conditionals", "loops"],
      marks: 10
    },
    {
      id: "prac-10-12",
      chapterId: "ch-4-3",
      title: "Python Basic Programs",
      description: "Write basic Python programs for input/output and calculations.",
      difficulty: "Beginner",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Write program to take user input",
        "Perform arithmetic operations",
        "Use different data types (int, float, string)",
        "Display formatted output"
      ],
      learningObjectives: ["Write Python programs", "Use input/output", "Data types"],
      keywords: ["Python", "programming", "input", "output", "variables"],
      marks: 10
    },
    {
      id: "prac-10-13",
      chapterId: "ch-4-3",
      title: "Python Calculator Program",
      description: "Create a simple calculator in Python.",
      difficulty: "Beginner",
      estimatedTime: 35,
      software: "Python IDE",
      steps: [
        "Take two numbers as input",
        "Perform basic arithmetic operations",
        "Display results with proper formatting",
        "Handle different number types"
      ],
      learningObjectives: ["Create calculator", "Use operators", "Handle input"],
      keywords: ["Python", "calculator", "operators", "programming"],
      marks: 10
    },
    {
      id: "prac-10-14",
      chapterId: "ch-4-3",
      title: "Python Pattern Programs",
      description: "Create pattern programs using loops in Python.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "Python IDE",
      steps: [
        "Create star patterns using loops",
        "Create number patterns",
        "Use nested loops for complex patterns",
        "Test with different inputs"
      ],
      learningObjectives: ["Use loops", "Create patterns", "Nested loops"],
      keywords: ["Python", "loops", "patterns", "nested loops"],
      marks: 10
    },
    {
      id: "prac-10-15",
      chapterId: "ch-5-2",
      title: "Cyber Safety Presentation",
      description: "Create a presentation on cyber safety and ethics.",
      difficulty: "Beginner",
      estimatedTime: 30,
      software: "MS PowerPoint",
      steps: [
        "Research cyber safety topics",
        "Create 5-7 slides on cyber threats",
        "Include safety measures and best practices",
        "Add examples and images"
      ],
      learningObjectives: ["Understand cyber safety", "Create presentation", "Present information"],
      keywords: ["cyber safety", "presentation", "ethics", "PowerPoint"],
      marks: 5
    }
  ],
  previousYearQuestions: {
    2020: {
      mcq: [
        { question: "Which device is used to input data into a computer?", options: ["Monitor", "Keyboard", "Printer", "Speaker"], answer: 1 },
        { question: "Full form of CPU?", options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Program Unit"], answer: 1 },
        { question: "Which software controls computer hardware?", options: ["Application Software", "System Software", "Operating System", "Utility Software"], answer: 2 }
      ],
      shortAnswer: [
        { question: "Differentiate between RAM and ROM.", marks: 2 },
        { question: "Name any two input devices.", marks: 2 },
        { question: "What is an operating system? Give examples.", marks: 2 }
      ]
    },
    2021: {
      mcq: [
        { question: "Which of the following is a volatile memory?", options: ["ROM", "Hard Disk", "RAM", "CD"], answer: 2 },
        { question: "Full form of HTML?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "None of these"], answer: 0 }
      ],
      shortAnswer: [
        { question: "What is a printer? Name its types.", marks: 2 },
        { question: "Write any two functions of an operating system.", marks: 2 }
      ]
    },
    2022: {
      mcq: [
        { question: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<hyper>"], answer: 1 },
        { question: "Which of the following is application software?", options: ["Windows", "Linux", "MS Word", "BIOS"], answer: 2 }
      ],
      shortAnswer: [
        { question: "Explain the difference between primary and secondary memory.", marks: 2 },
        { question: "Write the HTML code to create a paragraph.", marks: 2 }
      ]
    },
    2023: {
      mcq: [
        { question: "Which CSS property is used to change text color?", options: ["text-color", "color", "font-color", "style"], answer: 1 },
        { question: "Which of the following is NOT an input device?", options: ["Scanner", "Keyboard", "Printer", "Mouse"], answer: 2 }
      ],
      shortAnswer: [
        { question: "What is malware? Name any two types.", marks: 2 },
        { question: "Write the structure of an HTML document.", marks: 2 }
      ]
    },
    2024: {
      mcq: [
        { question: "Which HTML tag is used for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], answer: 2 },
        { question: "Which of the following is a utility software?", options: ["MS Word", "Antivirus", "Photoshop", "Chrome"], answer: 1 }
      ],
      shortAnswer: [
        { question: "What is phishing? How can you avoid it?", marks: 2 },
        { question: "Write any two differences between primary and secondary memory.", marks: 2 }
      ]
    },
    2025: {
      mcq: [
        { question: "Which protocol is used for secure web browsing?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], answer: 2 },
        { question: "Which of the following is an example of system software?", options: ["MS Excel", "Tally", "Ubuntu", "Photoshop"], answer: 2 }
      ],
      shortAnswer: [
        { question: "What is digital footprint? Why is it important to manage it?", marks: 2 },
        { question: "Write the HTML code to insert an image.", marks: 2 }
      ]
    }
  },
  revisionTopics: [
    {
      id: "rev-10-1",
      title: "Computer Fundamentals Revision",
      chapters: ["ch-1-1", "ch-1-2", "ch-1-3", "ch-1-4", "ch-1-5"],
      estimatedTime: 60,
      difficulty: "Beginner",
      keyPoints: [
        "Computer components and their functions",
        "Memory types and storage devices",
        "Input/output devices",
        "Software types and operating systems"
      ]
    },
    {
      id: "rev-10-2",
      title: "Office Tools Quick Revision",
      chapters: ["ch-2-1", "ch-2-2", "ch-2-3", "ch-2-4", "ch-2-5"],
      estimatedTime: 90,
      difficulty: "Intermediate",
      keyPoints: [
        "MS Word formatting and advanced features",
        "Excel formulas and functions",
        "PowerPoint presentations",
        "Office tools integration"
      ]
    },
    {
      id: "rev-10-3",
      title: "Web Technologies Revision",
      chapters: ["ch-3-1", "ch-3-2", "ch-3-3", "ch-3-4"],
      estimatedTime: 60,
      difficulty: "Intermediate",
      keyPoints: [
        "HTML tags and document structure",
        "Lists and tables in HTML",
        "Forms and input elements",
        "CSS basics and styling"
      ]
    },
    {
      id: "rev-10-4",
      title: "Programming and Cyber Safety Revision",
      chapters: ["ch-4-1", "ch-4-2", "ch-4-3", "ch-5-1", "ch-5-2"],
      estimatedTime: 60,
      difficulty: "Intermediate",
      keyPoints: [
        "Scratch programming basics",
        "Python basics",
        "Internet and web browsing",
        "Cyber safety and ethics"
      ]
    }
  ]
};

export default class10;