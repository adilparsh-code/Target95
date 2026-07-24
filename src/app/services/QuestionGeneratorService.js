import { getFirebaseInstance } from "../lib/firebase";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  where
} from "firebase/firestore";

const getDb = () => {
  const { db } = getFirebaseInstance();
  if (!db) throw new Error("Firebase not initialized");
  return db;
};

// Mock AI generation function - in production this would call an actual AI API
const generateAIQuestions = (formData) => {
  const { subject, class: className, board, chapter, questionType, difficulty, numberOfQuestions } = formData;
  
  const questions = [];
  const marksMap = {
    "MCQ": 1,
    "One Word": 1,
    "Fill in the Blanks": 1,
    "True False": 1,
    "Assertion Reason": 2,
    "Match the Following": 2,
    "Very Short Answer": 2,
    "Short Answer": 3,
    "Long Answer": 5,
    "Programming Questions": 10,
    "Output Based Questions": 3,
    "Debugging Questions": 3,
    "Find the Error": 3,
    "Dry Run Questions": 4,
    "Case Study Questions": 8,
    "Algorithm Writing": 5,
    "Pseudocode Questions": 5
  };

  const timeMap = {
    "MCQ": 1,
    "One Word": 1,
    "Fill in the Blanks": 1,
    "True False": 1,
    "Assertion Reason": 2,
    "Match the Following": 2,
    "Very Short Answer": 3,
    "Short Answer": 5,
    "Long Answer": 10,
    "Programming Questions": 20,
    "Output Based Questions": 5,
    "Debugging Questions": 5,
    "Find the Error": 5,
    "Dry Run Questions": 8,
    "Case Study Questions": 15,
    "Algorithm Writing": 10,
    "Pseudocode Questions": 10
  };

  const bloomsLevels = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];
  const randomBloomsLevel = bloomsLevels[Math.floor(Math.random() * bloomsLevels.length)];
  const tags = [subject, chapter, difficulty, questionType].filter(Boolean);

  for (let i = 0; i < numberOfQuestions; i++) {
    questions.push({
      id: `temp-${Date.now()}-${i}`,
      question: `Sample ${questionType} question #${i + 1} from ${chapter} for ${board} Class ${className} ${subject}. This question follows the ${difficulty} difficulty level as per the board guidelines.`,
      answer: "This is the correct answer to the generated question.",
      explanation: `This explanation provides detailed reasoning for the answer, covering key concepts from ${chapter} that help students understand the topic better.`,
      difficulty,
      chapter,
      subject,
      questionType,
      board,
      class: className,
      marks: marksMap[questionType] || 2,
      estimatedTime: timeMap[questionType] || 5,
      bloomsLevel: randomBloomsLevel,
      tags: [...tags, `question-${i + 1}`],
      status: "Draft",
      createdBy: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  return questions;
};

export const QuestionGeneratorService = {
  // Generate questions using AI
  generateQuestions: async (formData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const questions = generateAIQuestions(formData);
      return questions;
    } catch (error) {
      console.error("Error in generateQuestions:", error);
      throw new Error("Failed to generate questions. Please try again.");
    }
  },

  // Save questions to Firestore
  saveQuestions: async (questions) => {
    try {
      const db = getDb();
      const collectionRef = collection(db, "generatedQuestions");
      const savedIds = [];
      
      for (const question of questions) {
        const { id, ...questionData } = question;
        const docRef = await addDoc(collectionRef, {
          ...questionData,
          createdAt: new Date().toISOString()
        });
        savedIds.push(docRef.id);
      }
      
      return savedIds;
    } catch (error) {
      console.error("Error saving questions:", error);
      throw new Error("Failed to save questions. Please try again.");
    }
  },

  // Update a question in Firestore
  updateQuestion: async (id, updates) => {
    try {
      const db = getDb();
      const docRef = doc(db, "generatedQuestions", id);
      await updateDoc(docRef, updates);
      return true;
    } catch (error) {
      console.error("Error updating question:", error);
      throw new Error("Failed to update question. Please try again.");
    }
  },

  // Delete a question from Firestore
  deleteQuestion: async (id) => {
    try {
      const db = getDb();
      const docRef = doc(db, "generatedQuestions", id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Error deleting question:", error);
      throw new Error("Failed to delete question. Please try again.");
    }
  },

  // Approve a question
  approveQuestion: async (id) => {
    try {
      const db = getDb();
      const docRef = doc(db, "generatedQuestions", id);
      await updateDoc(docRef, { 
        status: "Approved",
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error("Error approving question:", error);
      throw new Error("Failed to approve question. Please try again.");
    }
  },

  // Publish a question
  publishQuestion: async (id) => {
    try {
      const db = getDb();
      const docRef = doc(db, "generatedQuestions", id);
      await updateDoc(docRef, { 
        status: "Published",
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error("Error publishing question:", error);
      throw new Error("Failed to publish question. Please try again.");
    }
  },

  // Get all questions from Firestore
  getAllQuestions: async () => {
    try {
      const db = getDb();
      const querySnapshot = await getDocs(collection(db, "generatedQuestions"));
      const questions = [];
      querySnapshot.forEach((doc) => {
        questions.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return questions;
    } catch (error) {
      console.error("Error getting questions:", error);
      throw new Error("Failed to load questions. Please try again.");
    }
  },

  // Export questions as JSON, PDF, or CSV
  exportQuestions: async (questions, format) => {
    if (format === "json") {
      // Export as JSON
      const dataStr = JSON.stringify(questions, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-questions-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === "csv") {
      // Export as CSV
      const headers = ["ID", "Question", "Answer", "Explanation", "Difficulty", "Chapter", "Subject", "Board", "Class", "Question Type", "Marks", "Estimated Time", "Status", "Created At"];
      const csvContent = [
        headers.join(","),
        ...questions.map(q => [
          q.id,
          `"${q.question.replace(/"/g, '""')}"`,
          `"${q.answer.replace(/"/g, '""')}"`,
          `"${q.explanation.replace(/"/g, '""')}"`,
          q.difficulty,
          q.chapter,
          q.subject,
          q.board,
          q.class,
          q.questionType,
          q.marks,
          q.estimatedTime,
          q.status,
          q.createdAt
        ].join(","))
      ].join("\n");
      
      const dataBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-questions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === "pdf") {
      // For PDF export, we'll create a simple HTML-based PDF that can be printed
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Generated Questions</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
              .question { margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee; page-break-inside: avoid; }
              .metadata { color: #666; font-size: 0.9em; margin-top: 10px; }
              .tag { display: inline-block; background: #f0f0f0; padding: 2px 8px; border-radius: 4px; margin-right: 8px; font-size: 0.8em; }
              h1 { border-bottom: 1px solid #ccc; padding-bottom: 10px; }
              @media print {
                body { margin: 20px; }
                .question { break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <h1>Generated Questions - ${new Date().toLocaleDateString()}</h1>
            ${questions.map((q, i) => `
              <div class="question">
                <div>
                  <span class="tag">${q.questionType}</span>
                  <span class="tag">${q.difficulty}</span>
                  <span class="tag">${q.subject}</span>
                  <span class="tag">${q.board} Class ${q.class}</span>
                </div>
                <h3>${i + 1}. ${q.question}</h3>
                <p><strong>Answer:</strong> ${q.answer}</p>
                <p><strong>Explanation:</strong> ${q.explanation}</p>
                <div class="metadata">
                  Chapter: ${q.chapter} | Marks: ${q.marks} | Time: ${q.estimatedTime} mins | Status: ${q.status}
                </div>
              </div>
            `).join('')}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }
};