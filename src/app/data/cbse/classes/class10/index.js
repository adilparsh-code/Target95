/**
 * CBSE Class 10 - Computer Applications (Code 165)
 * Standardized Curriculum Structure
 */

import subjects from '../../subjects';

const class10 = {
  id: "cbse-class-10-165",
  name: "Class 10",
  fullName: "CBSE Class 10 - Computer Applications (165)",
  icon: "💻",
  color: "border-blue-300 bg-blue-50",
  board: "CBSE",
  stream: "General",
  subjects: [subjects.cbseSubjects[0]],
  units: [
    {
      id: "unit-1-networking",
      unitNumber: 1,
      title: "Networking",
      slug: "networking",
      description: "Internet basics, WWW, Web Services, Protocols, and Remote Access.",
      displayOrder: 1,
      weightage: 15,
      chapters: [
        {
          id: "ch-10-1",
          chapterNumber: 1,
          unitId: "unit-1-networking",
          title: "Internet Basics and Web Services",
          slug: "internet-basics-web-services",
          description: "Understanding network concepts, WWW, web servers, browsers, and e-services.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 50,
          topics: [
            "World Wide Web (WWW)",
            "Web Servers & Clients",
            "IP Address & Domain Names (DNS)",
            "HTML & Web Pages",
            "Protocols (HTTP, HTTPS, FTP, SSH, SMTP, POP3)",
            "E-Services (e-Commerce, e-Learning, e-Governance)"
          ],
          learningObjectives: [
            "Understand working of the Internet and WWW",
            "Differentiate between IP address and Domain Name",
            "Explain common internet protocols and their applications",
            "Identify safety aspects of e-services"
          ],
          keywords: ["Internet", "WWW", "IP Address", "DNS", "HTTP", "HTTPS", "FTP", "e-Commerce"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 3, shortAnswer: 6, longAnswer: 6 },
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Protocols", "DNS vs IP Address", "Web Services"],
            commonMistakes: ["Confusing HTTP with HTTPS", "Mixing up Client vs Server side"]
          }
        }
      ]
    },
    {
      id: "unit-2-html",
      unitNumber: 2,
      title: "HTML and CSS",
      slug: "html-css",
      description: "Web page designing using HTML tags, tables, forms, media, and CSS styling.",
      displayOrder: 2,
      weightage: 25,
      chapters: [
        {
          id: "ch-10-2",
          chapterNumber: 2,
          unitId: "unit-2-html",
          title: "Advanced HTML5 and Media",
          slug: "advanced-html5-media",
          description: "Designing structured pages, lists, tables, embedding audio and video.",
          displayOrder: 1,
          difficulty: "Intermediate",
          estimatedTime: 65,
          topics: [
            "HTML Structure",
            "Headings & Paragraphs",
            "Lists (Ordered, Unordered, Definition)",
            "Tables (TR, TH, TD, Rowspan, Colspan)",
            "Links (Anchor tag, Relative & Absolute paths)",
            "Embedding Audio & Video tags"
          ],
          learningObjectives: [
            "Build complete semantic HTML5 web pages",
            "Create complex tabular structures with rowspan and colspan",
            "Embed audio and video elements properly"
          ],
          keywords: ["HTML5", "Lists", "Tables", "rowspan", "colspan", "Hyperlinks", "Audio", "Video"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 5, longAnswer: 6 },
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Table Attributes", "Rowspan & Colspan", "Hyperlinks"],
            commonMistakes: ["Syntax error in image/link paths", "Incorrect table nesting"]
          }
        },
        {
          id: "ch-10-3",
          chapterNumber: 3,
          unitId: "unit-2-html",
          title: "HTML Forms and Cascading Style Sheets (CSS)",
          slug: "html-forms-css",
          description: "Creating interactive user input forms and styling pages using CSS.",
          displayOrder: 2,
          difficulty: "Intermediate",
          estimatedTime: 60,
          topics: [
            "Form Controls (Text, Password, Radio, Checkbox, Select, Submit)",
            "CSS Syntax & Selectors",
            "Types of CSS (Inline, Internal, External)",
            "CSS Properties (Color, Background, Font, Margin, Padding, Border)"
          ],
          learningObjectives: [
            "Design user registration and feedback forms",
            "Apply Inline, Internal, and External CSS styling",
            "Format page elements visually using CSS box properties"
          ],
          keywords: ["Forms", "Input Types", "CSS", "Selectors", "Inline CSS", "Internal CSS", "External CSS"],
          competencyLevel: "Applying",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 6 },
          metadata: {
            isPractical: true,
            isTheory: true,
            importantTopics: ["Form Input Types", "CSS Types Comparison", "Selectors"],
            commonMistakes: ["Missing name attributes in radio buttons", "Wrong CSS property syntax"]
          }
        }
      ]
    },
    {
      id: "unit-3-cyber-ethics",
      unitNumber: 3,
      title: "Cyber Ethics",
      slug: "cyber-ethics",
      description: "Digital safety, netiquette, licensing, open-source software, and privacy.",
      displayOrder: 3,
      weightage: 10,
      chapters: [
        {
          id: "ch-10-4",
          chapterNumber: 4,
          unitId: "unit-3-cyber-ethics",
          title: "Cyber Ethics, Security and Rights",
          slug: "cyber-ethics-security-rights",
          description: "Responsible tech usage, software licensing, online privacy, and web threats.",
          displayOrder: 1,
          difficulty: "Beginner",
          estimatedTime: 40,
          topics: [
            "Netiquette & Digital Footprint",
            "Intellectual Property Rights (IPR) & Plagiarism",
            "Licensing (Open Source, CC, Proprietary)",
            "Cyber Security (Malware, Phishing, Ransomware)",
            "E-Commerce Fraud & Secure Browsing"
          ],
          learningObjectives: [
            "Understand digital ethics and safe internet usage",
            "Identify open-source vs proprietary licensing",
            "Recognize web security threats like phishing and malware"
          ],
          keywords: ["Netiquette", "Digital Footprint", "IPR", "Open Source", "Creative Commons", "Phishing"],
          competencyLevel: "Understanding",
          marksDistribution: { mcq: 2, shortAnswer: 4, longAnswer: 4 },
          metadata: {
            isPractical: false,
            isTheory: true,
            importantTopics: ["Digital Footprint", "Phishing vs Spam", "Software Licensing"],
            commonMistakes: ["Confusing Free Software with Open Source", "Ignoring copyright rules"]
          }
        }
      ]
    }
  ],
  practicals: [
    {
      id: "prac-10-1",
      chapterId: "ch-10-2",
      title: "Creating Structured HTML Page with Lists & Links",
      description: "Develop an HTML page using proper document layout, heading tags, lists, and navigation links.",
      difficulty: "Beginner",
      estimatedTime: 30,
      software: "VS Code / Text Editor + Browser",
      steps: [
        "Create standard HTML5 boilerplate syntax",
        "Add nested ordered and unordered lists",
        "Insert relative and absolute hyperlinks using anchor tags",
        "Preview output across modern web browsers"
      ],
      learningObjectives: ["Understand HTML document structure", "Implement links and lists"],
      keywords: ["HTML5", "Lists", "Hyperlinks", "Practical"],
      marks: 10
    },
    {
      id: "prac-10-2",
      chapterId: "ch-10-2",
      title: "Advanced Data Table Design",
      description: "Construct a data table utilizing TH, TR, TD along with Rowspan and Colspan attributes.",
      difficulty: "Intermediate",
      estimatedTime: 40,
      software: "VS Code / Text Editor + Browser",
      steps: [
        "Create table structure with borders and cell padding",
        "Merge horizontal cells using colspan",
        "Merge vertical cells using rowspan",
        "Format headers with proper alignment"
      ],
      learningObjectives: ["Master table grid layouts", "Use span attributes accurately"],
      keywords: ["Tables", "Rowspan", "Colspan", "HTML"],
      marks: 15
    },
    {
      id: "prac-10-3",
      chapterId: "ch-10-3",
      title: "Interactive Web Form Creation",
      description: "Build a student feedback form using various form control elements.",
      difficulty: "Intermediate",
      estimatedTime: 45,
      software: "VS Code / Text Editor + Browser",
      steps: [
        "Add form element with submit action",
        "Include text input, password, and text area fields",
        "Group radio buttons with identical name attributes",
        "Add select dropdowns and submit/reset buttons"
      ],
      learningObjectives: ["Collect input via forms", "Understand form control properties"],
      keywords: ["Forms", "Input", "Controls", "Radio Button"],
      marks: 15
    },
    {
      id: "prac-10-4",
      chapterId: "ch-10-3",
      title: "Web Page Styling with CSS",
      description: "Apply external and internal CSS to style fonts, colors, borders, and margins of a webpage.",
      difficulty: "Intermediate",
      estimatedTime: 35,
      software: "VS Code / Text Editor + Browser",
      steps: [
        "Create external style.css stylesheet",
        "Define class and element selectors",
        "Link external stylesheet inside HTML head tag",
        "Apply background colors, font styles, and box margins"
      ],
      learningObjectives: ["Separate content from design using CSS", "Work with CSS selectors"],
      keywords: ["CSS", "Selectors", "External CSS", "Styling"],
      marks: 10
    }
  ]
};

export default class10;
