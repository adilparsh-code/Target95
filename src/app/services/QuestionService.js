"use server";

import BaseService from "./BaseService";

class QuestionService extends BaseService {
  constructor() {
    super("questions");
  }

  // Get questions by chapter
  async getByChapter(chapterSlug) {
    return this.query([
      { field: "chapter", operator: "==", value: chapterSlug }
    ]);
  }

  // Get questions by subject
  async getBySubject(subject) {
    return this.query([
      { field: "subject", operator: "==", value: subject }
    ]);
  }

  // Get questions by difficulty
  async getByDifficulty(difficulty) {
    return this.query([
      { field: "difficulty", operator: "==", value: difficulty }
    ]);
  }

  // Get questions by topic
  async getByTopic(topic) {
    return this.query([
      { field: "topic", operator: "==", value: topic }
    ]);
  }

  // Search questions
  async searchQuestions(searchTerm) {
    // Note: For full-text search, you'd typically use a proper search solution
    // This is a basic implementation that fetches all and filters client-side
    const allQuestions = await this.getAll();
    return allQuestions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.chapter.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Get active questions
  async getActiveQuestions() {
    return this.query([
      { field: "isActive", operator: "==", value: true }
    ]);
  }
}

export default new QuestionService();