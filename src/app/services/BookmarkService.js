"use server";

import BaseService from "./BaseService";

class BookmarkService extends BaseService {
  constructor() {
    super("bookmarks");
  }

  // Get all bookmarks for a specific user
  async getUserBookmarks(userId) {
    return this.query([
      { field: "userId", operator: "==", value: userId }
    ]);
  }

  // Get bookmarks for a specific chapter
  async getUserChapterBookmarks(userId, chapterSlug) {
    return this.query([
      { field: "userId", operator: "==", value: userId },
      { field: "chapter", operator: "==", value: chapterSlug }
    ]);
  }

  // Check if a question is already bookmarked by a user
  async isQuestionBookmarked(userId, chapter, questionId) {
    const bookmarks = await this.query([
      { field: "userId", operator: "==", value: userId },
      { field: "chapter", operator: "==", value: chapter },
      { field: "questionId", operator: "==", value: questionId }
    ]);
    return bookmarks.length > 0;
  }

  // Delete all bookmarks for a user (on account deletion)
  async deleteAllUserBookmarks(userId) {
    const userBookmarks = await this.getUserBookmarks(userId);
    await Promise.all(
      userBookmarks.map(bookmark => this.delete(bookmark.id))
    );
    return true;
  }

  // Get recent bookmarks (last 10)
  async getRecentUserBookmarks(userId, limit = 10) {
    const bookmarks = await this.getUserBookmarks(userId);
    return bookmarks
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }
}

export default new BookmarkService();