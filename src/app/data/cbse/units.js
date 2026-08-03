/**
 * CBSE Units Configuration
 * Centralized unit definitions across all classes
 */

export const cbseUnits = {
  'cbse-class-10': [
    {
      id: "unit-1-basics",
      unitNumber: 1,
      title: "Basic Computer System",
      slug: "basics",
      description: "Fundamentals of computer systems, hardware, software, and basic operations.",
      displayOrder: 1,
      weightage: 15,
      totalChapters: 5,
      isTheory: true,
      isPractical: false
    },
    {
      id: "unit-2-office-tools",
      unitNumber: 2,
      title: "Office Tools",
      slug: "office-tools",
      description: "Hands-on training with Microsoft Office Suite - Word, Excel, and PowerPoint.",
      displayOrder: 2,
      weightage: 25,
      totalChapters: 6,
      isTheory: false,
      isPractical: true
    },
    {
      id: "unit-3-web-technologies",
      unitNumber: 3,
      title: "Web Technologies and HTML",
      slug: "web-technologies",
      description: "Fundamentals of web development with HTML and CSS.",
      displayOrder: 3,
      weightage: 20,
      totalChapters: 4,
      isTheory: true,
      isPractical: true
    },
    {
      id: "unit-4-programming",
      unitNumber: 4,
      title: "Programming Fundamentals",
      slug: "programming-fundamentals",
      description: "Introduction to programming using Scratch and/or Python.",
      displayOrder: 4,
      weightage: 25,
      totalChapters: 3,
      isTheory: true,
      isPractical: true
    },
    {
      id: "unit-5-cyber-safety",
      unitNumber: 5,
      title: "Cyber Safety and Ethics",
      slug: "cyber-safety",
      description: "Understanding digital safety, ethics, and responsible use of technology.",
      displayOrder: 5,
      weightage: 15,
      totalChapters: 2,
      isTheory: true,
      isPractical: false
    }
  ],
  'cbse-class-11': [
    {
      id: "unit-1-computer-fundamentals",
      unitNumber: 1,
      title: "Computer Fundamentals",
      slug: "computer-fundamentals",
      description: "Basic concepts of computer systems, number systems, and software fundamentals.",
      displayOrder: 1,
      weightage: 15,
      totalChapters: 4,
      isTheory: true,
      isPractical: false
    },
    {
      id: "unit-2-programming-methodology",
      unitNumber: 2,
      title: "Programming Methodology",
      slug: "programming-methodology",
      description: "Problem-solving techniques, algorithms, flowcharts, and programming concepts.",
      displayOrder: 2,
      weightage: 15,
      totalChapters: 3,
      isTheory: true,
      isPractical: true
    },
    {
      id: "unit-3-python-programming",
      unitNumber: 3,
      title: "Python Programming",
      slug: "python-programming",
      description: "Comprehensive coverage of Python programming concepts and constructs.",
      displayOrder: 3,
      weightage: 30,
      totalChapters: 8,
      isTheory: true,
      isPractical: true
    },
    {
      id: "unit-4-database-management",
      unitNumber: 4,
      title: "Database Management System",
      slug: "database-management",
      description: "Introduction to databases, relational model, and SQL basics.",
      displayOrder: 4,
      weightage: 20,
      totalChapters: 3,
      isTheory: true,
      isPractical: true
    },
    {
      id: "unit-5-society-law-ethics",
      unitNumber: 5,
      title: "Society, Law and Ethics",
      slug: "society-law-ethics",
      description: "Understanding intellectual property rights, cyber safety, and professional ethics.",
      displayOrder: 5,
      weightage: 10,
      totalChapters: 2,
      isTheory: true,
      isPractical: false
    }
  ],
  'cbse-class-12': [
    {
      id: "unit-1-oop-python",
      unitNumber: 1,
      title: "Object Oriented Programming with Python",
      slug: "oop-python",
      description: "OOP concepts, classes, objects, inheritance, and polymorphism in Python.",
      displayOrder: 1,
      weightage: 20,
      totalChapters: 5,
      isTheory: true,
      isPractical: true
    },
    {
      id: "unit-2-advanced-python",
      unitNumber: 2,
      title: "Advanced Python",
      slug: "advanced-python",
      description: "Advanced Python concepts including file handling, error handling, and data structures.",
      displayOrder: 2,
      weightage: 20,
      totalChapters: 4,
      isTheory: true,
      isPractical: true
    },
    {
      id: "unit-3-database-management",
      unitNumber: 3,
      title: "Database Management System",
      slug: "database-management",
      description: "Advanced database concepts, SQL, and database connectivity with Python.",
      displayOrder: 3,
      weightage: 20,
      totalChapters: 4,
      isTheory: true,
      isPractical: true
    },
    {
      id: "unit-4-boolean-algebra",
      unitNumber: 4,
      title: "Boolean Algebra",
      slug: "boolean-algebra",
      description: "Boolean algebra, logic gates, and Karnaugh maps.",
      displayOrder: 4,
      weightage: 15,
      totalChapters: 3,
      isTheory: true,
      isPractical: false
    },
    {
      id: "unit-5-communication-technologies",
      unitNumber: 5,
      title: "Communication Technologies",
      slug: "communication-technologies",
      description: "Networking concepts, protocols, and web technologies.",
      displayOrder: 5,
      weightage: 15,
      totalChapters: 3,
      isTheory: true,
      isPractical: false
    }
  ]
};

/**
 * Get units by class ID
 */
export const getUnitsByClassId = (classId) => {
  return cbseUnits[classId] || [];
};

/**
 * Get unit by class ID and unit ID
 */
export const getUnitByClassAndUnitId = (classId, unitId) => {
  const units = cbseUnits[classId] || [];
  return units.find(unit => unit.id === unitId);
};

/**
 * Get total weightage for a class
 */
export const getTotalWeightage = (classId) => {
  const units = cbseUnits[classId] || [];
  return units.reduce((total, unit) => total + unit.weightage, 0);
};

export default cbseUnits;