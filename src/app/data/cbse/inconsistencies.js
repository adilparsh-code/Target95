/**
 * CBSE Curriculum Inconsistencies Report
 * Documents known inconsistencies and issues in CBSE curriculum
 */

export const curriculumInconsistencies = {
  generatedDate: "2025-01-15",
  lastUpdated: "2025-01-15",
  summary: {
    totalInconsistencies: 8,
    critical: 2,
    moderate: 4,
    minor: 2
  },
  inconsistencies: [
    {
      id: "INC-001",
      severity: "critical",
      category: "Content Overlap",
      class: "cbse-class-10",
      title: "Python Introduction in Both Class 10 and Class 11",
      description: "Python basics are taught in Class 10 (Unit 4, Chapter 3) and again in Class 11 (Unit 2, Chapter 3). The content overlap is significant.",
      affectedChapters: ["ch-4-3", "ch-11-2-3"],
      recommendation: "Class 10 should focus on Scratch only, with Python introduction moved entirely to Class 11. Alternatively, Class 11 should assume Python knowledge from Class 10.",
      status: "documented"
    },
    {
      id: "INC-002",
      severity: "critical",
      category: "Missing Content",
      class: "cbse-class-10",
      title: "No Database Content in Class 10",
      description: "CBSE Class 10 Computer Applications syllabus does not include database concepts, but Class 11 assumes no prior database knowledge. This creates a gap for students.",
      affectedChapters: ["ch-11-4-1", "ch-11-4-2", "ch-11-4-3"],
      recommendation: "Add a basic database chapter to Class 10 or provide more detailed introduction in Class 11 Unit 4 Chapter 1.",
      status: "documented"
    },
    {
      id: "INC-003",
      severity: "moderate",
      category: "Practical Marks Discrepancy",
      class: "cbse-class-11",
      title: "Practical Marks Distribution Unclear",
      description: "CBSE specifies 30 marks for practicals in Class 11, but the distribution among 20 practicals is not clearly defined. Each practical is marked for 5 marks, totaling 100 marks.",
      affectedChapters: ["all practicals"],
      recommendation: "Clarify that only selected practicals (typically 5-6) are assessed, not all 20. Update documentation to reflect actual assessment pattern.",
      status: "documented"
    },
    {
      id: "INC-004",
      severity: "moderate",
      category: "Content Progression",
      class: "cbse-class-12",
      title: "Sudden Jump in Boolean Algebra Complexity",
      description: "Boolean algebra concepts in Class 12 (Unit 4) are significantly more advanced than Class 11, with no bridge content. Karnaugh maps for 4 variables are particularly challenging.",
      affectedChapters: ["ch-12-4-1", "ch-12-4-2", "ch-12-4-3"],
      recommendation: "Introduce basic Boolean algebra in Class 11 or provide more gradual progression in Class 12 with additional practice content.",
      status: "documented"
    },
    {
      id: "INC-005",
      severity: "moderate",
      category: "Software Dependency",
      class: "cbse-class-10",
      title: "MS Office Dependency in Practical Exams",
      description: "Class 10 practical exams require MS Office (Word, Excel, PowerPoint), but students may have access to LibreOffice or other alternatives. This creates assessment inconsistency.",
      affectedChapters: ["ch-2-1", "ch-2-2", "ch-2-3", "ch-2-4", "ch-2-5"],
      recommendation: "CBSE should provide clear guidelines for alternative software or ensure all students have access to MS Office.",
      status: "documented"
    },
    {
      id: "INC-006",
      severity: "moderate",
      category: "Syllabus Variation",
      class: "cbse-class-10",
      title: "Two Different Subject Codes (165 vs 402)",
      description: "Class 10 has two subject codes: 165 (Computer Applications) and 402 (Information Technology). The syllabus content is similar but not identical, causing confusion.",
      affectedChapters: ["all chapters"],
      recommendation: "Clearly document the differences between code 165 and 402, or consolidate into a single syllabus.",
      status: "documented"
    },
    {
      id: "INC-007",
      severity: "minor",
      category: "Terminology",
      class: "cbse-class-11",
      title: "Inconsistent Terminology for Data Structures",
      description: "Class 11 uses 'lists', 'tuples', and 'dictionaries' while Class 12 refers to 'data structures' including stack and queue. The terminology transition is not smooth.",
      affectedChapters: ["ch-11-3-6", "ch-11-3-7", "ch-12-2-3"],
      recommendation: "Use consistent terminology across classes or explicitly connect the concepts in chapter introductions.",
      status: "documented"
    },
    {
      id: "INC-008",
      severity: "minor",
      category: "Practical Requirements",
      class: "cbse-class-12",
      title: "Python Database Connectivity Not in Syllabus but in Practicals",
      description: "Database connectivity with Python (SQLite/MySQL) is listed in practicals but not explicitly mentioned in the theory syllabus for Class 12.",
      affectedChapters: ["ch-12-3-3"],
      recommendation: "Add database connectivity to the theory syllabus or move it to an optional/advanced practical section.",
      status: "documented"
    }
  ],
  detailedAnalysis: {
    class10: {
      strengths: [
        "Good balance between theory and practical",
        "Comprehensive coverage of office tools",
        "Includes cyber safety and ethics",
        "Progressive difficulty from basics to programming"
      ],
      weaknesses: [
        "Python introduction too brief if it's meant to prepare for Class 11",
        "HTML/CSS coverage is basic compared to industry standards",
        "Limited programming practice with only 3 chapters"
      ],
      suggestions: [
        "Extend Python chapter to include functions and loops",
        "Add more programming practical exercises",
        "Include basic database concepts"
      ]
    },
    class11: {
      strengths: [
        "Strong foundation in computer fundamentals",
        "Comprehensive Python coverage",
        "Good balance of theory and practical",
        "Includes SQL and database concepts"
      ],
      weaknesses: [
        "Number systems chapter is too theoretical",
        "OOP concepts deferred to Class 12",
        "Limited coverage of data structures"
      ],
      suggestions: [
        "Introduce basic OOP concepts in Class 11",
        "Add more practical programming exercises",
        "Include basic data structures (stack, queue)"
      ]
    },
    class12: {
      strengths: [
        "Advanced OOP coverage",
        "Database normalization included",
        "Boolean algebra and networking covered",
        "Good practical component with 25 exercises"
      ],
      weaknesses: [
        "Assumes Python knowledge without explicit review",
        "Boolean algebra is very abstract",
        "Network security coverage is superficial"
      ],
      suggestions: [
        "Add Python review chapter at the beginning",
        "Include more real-world networking examples",
        "Add project-based practical assessments"
      ]
    }
  },
  crossClassIssues: [
    {
      id: "CROSS-001",
      issue: "Programming Language Transition",
      description: "Class 10 uses Python basics, Class 11 uses Python extensively, but Class 12 doesn't explicitly mention Python in the title despite being Python-focused.",
      impact: "Students may not realize Class 12 continues with Python",
      recommendation: "Update Class 12 title to 'Computer Science with Python'"
    },
    {
      id: "CROSS-002",
      issue: "Database Content Distribution",
      description: "Database concepts are split across Class 11 (basics) and Class 12 (advanced), but there's no Class 10 foundation.",
      impact: "Students start database learning in Class 11 without any prior exposure",
      recommendation: "Consider adding basic database concepts to Class 10 or providing more foundation in Class 11"
    },
    {
      id: "CROSS-003",
      issue: "Practical Software Requirements",
      description: "Different classes require different software (MS Office for Class 10, Python IDE for Class 11-12, MySQL for Class 11-12).",
      impact: "Students need multiple software installations",
      recommendation: "Provide clear software requirements list for each class"
    }
  ],
  recommendations: {
    immediate: [
      "Document the differences between Class 10 subject codes 165 and 402",
      "Clarify practical marks distribution for all classes",
      "Add Python review chapter to Class 12"
    ],
    shortTerm: [
      "Consider moving Python basics from Class 10 to Class 11",
      "Add basic database concepts to Class 10",
      "Introduce OOP concepts in Class 11"
    ],
    longTerm: [
      "Standardize programming language across all classes (Python recommended)",
      "Create better progression path for practical skills",
      "Align theory and practical content more closely"
    ]
  }
};

/**
 * Get inconsistencies by class
 */
export const getInconsistenciesByClass = (classId) => {
  return curriculumInconsistencies.inconsistencies.filter(
    inc => inc.class === classId
  );
};

/**
 * Get inconsistencies by severity
 */
export const getInconsistenciesBySeverity = (severity) => {
  return curriculumInconsistencies.inconsistencies.filter(
    inc => inc.severity === severity
  );
};

/**
 * Get critical inconsistencies
 */
export const getCriticalInconsistencies = () => {
  return getInconsistenciesBySeverity('critical');
};

export default curriculumInconsistencies;