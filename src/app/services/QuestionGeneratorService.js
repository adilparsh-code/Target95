// All generated-question persistence runs through the requireAdmin-protected
// admin APIs — the client never touches Firestore directly.

async function parseResponse(response, fallbackMessage) {
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.success) {
    const detail = Array.isArray(payload?.errors) ? payload.errors.join(" ") : payload?.error;
    throw new Error(detail || fallbackMessage);
  }
  return payload;
}

export const QuestionGeneratorService = {
  // Generate questions with the real server-side AI route. The route is
  // admin-protected and answers with a typed "unconfigured" status when no
  // provider key exists, so placeholder questions are never shown to an admin.
  generateQuestions: async (formData) => {
    try {
      const payload = await parseResponse(
        await fetch("/api/admin/ai-generator", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }),
        "Failed to generate questions. Please try again."
      );
      return payload.questions;
    } catch (error) {
      console.error("Error in generateQuestions:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to generate questions. Please try again.");
    }
  },

  // Save generated questions through the admin API
  saveQuestions: async (questions) => {
    try {
      const payload = await parseResponse(
        await fetch("/api/admin/generated-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questions }),
        }),
        "Failed to save questions. Please try again."
      );
      return payload.savedIds;
    } catch (error) {
      console.error("Error saving questions:", error);
      throw error instanceof Error ? error : new Error("Failed to save questions. Please try again.");
    }
  },

  // Update a question through the admin API
  updateQuestion: async (id, updates) => {
    try {
      await parseResponse(
        await fetch(`/api/admin/generated-questions/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        }),
        "Failed to update question. Please try again."
      );
      return true;
    } catch (error) {
      console.error("Error updating question:", error);
      throw error instanceof Error ? error : new Error("Failed to update question. Please try again.");
    }
  },

  // Delete a question through the admin API
  deleteQuestion: async (id) => {
    try {
      await parseResponse(
        await fetch(`/api/admin/generated-questions/${id}`, { method: "DELETE" }),
        "Failed to delete question. Please try again."
      );
      return true;
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error instanceof Error ? error : new Error("Failed to delete question. Please try again.");
    }
  },

  // Approve a question through the admin API
  approveQuestion: async (id) => {
    try {
      await parseResponse(
        await fetch(`/api/admin/generated-questions/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Approved" }),
        }),
        "Failed to approve question. Please try again."
      );
      return true;
    } catch (error) {
      console.error("Error approving question:", error);
      throw error instanceof Error ? error : new Error("Failed to approve question. Please try again.");
    }
  },

  // Publish a question through the admin API
  publishQuestion: async (id) => {
    try {
      await parseResponse(
        await fetch(`/api/admin/generated-questions/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Published" }),
        }),
        "Failed to publish question. Please try again."
      );
      return true;
    } catch (error) {
      console.error("Error publishing question:", error);
      throw error instanceof Error ? error : new Error("Failed to publish question. Please try again.");
    }
  },

  // Get all questions through the admin API
  getAllQuestions: async () => {
    try {
      const payload = await parseResponse(
        await fetch("/api/admin/generated-questions", { cache: "no-store" }),
        "Failed to load questions. Please try again."
      );
      return payload.questions;
    } catch (error) {
      console.error("Error loading questions:", error);
      throw error instanceof Error ? error : new Error("Failed to load questions. Please try again.");
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
      const cell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const headers = ["ID", "Question", "Answer", "Explanation", "Difficulty", "Chapter", "Subject", "Board", "Class", "Question Type", "Marks", "Estimated Time", "Status", "Created At"];
      const csvContent = [
        headers.join(","),
        ...questions.map(q => [
          cell(q.id),
          cell(q.question),
          cell(q.answer),
          cell(q.explanation),
          cell(q.difficulty),
          cell(q.chapter),
          cell(q.subject),
          cell(q.board),
          cell(q.class),
          cell(q.questionType),
          q.marks ?? "",
          q.estimatedTime ?? "",
          cell(q.status),
          cell(q.createdAt)
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
      if (!printWindow) {
        throw new Error("Your browser blocked the print window. Allow pop-ups to export a PDF.");
      }
      const text = (value) =>
        String(value ?? "").replace(/[&<>]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[ch]));
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
                  <span class="tag">${text(q.questionType)}</span>
                  <span class="tag">${text(q.difficulty)}</span>
                  <span class="tag">${text(q.subject)}</span>
                  <span class="tag">${text(q.board)} Class ${text(q.class)}</span>
                </div>
                <h3>${i + 1}. ${text(q.question)}</h3>
                <p><strong>Answer:</strong> ${text(q.answer)}</p>
                <p><strong>Explanation:</strong> ${text(q.explanation)}</p>
                <div class="metadata">
                  Chapter: ${text(q.chapter)} | Marks: ${text(q.marks)} | Time: ${text(q.estimatedTime)} mins | Status: ${text(q.status)}
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
