"use server";

import BaseService from "./BaseService";

class MockTestService extends BaseService {
  constructor() {
    super("mockTests");
  }

  // Get all active mock tests
  async getActiveMockTests() {
    return this.query([
      { field: "isActive", operator: "==", value: true }
    ]);
  }

  // Get mock tests by subject
  async getBySubject(subject) {
    return this.query([
      { field: "subject", operator: "==", value: subject }
    ]);
  }

  // Get upcoming mock tests (scheduled in the future)
  async getUpcomingMockTests() {
    const today = new Date().toISOString();
    return this.query([
      { field: "scheduledDate", operator: ">=", value: today },
      { field: "isActive", operator: "==", value: true }
    ]);
  }

  // Save user's test result
  async saveTestResult(testResult) {
    // Create a separate collection for results
    const resultService = new BaseService("mockTestResults");
    return resultService.add(testResult);
  }

  // Get user's test history
  async getUserTestHistory(userId) {
    const resultService = new BaseService("mockTestResults");
    const results = await resultService.query([
      { field: "userId", operator: "==", value: userId }
    ]);
    // Sort by completion date, most recent first
    return results.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  }

  // Get test results for a specific mock test
  async getTestResults(testId) {
    const resultService = new BaseService("mockTestResults");
    return resultService.query([
      { field: "testId", operator: "==", value: testId }
    ]);
  }

  // Calculate average score for a test
  async getTestStatistics(testId) {
    const results = await this.getTestResults(testId);
    if (results.length === 0) {
      return {
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        participants: 0
      };
    }

    const scores = results.map(r => r.score);
    return {
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      participants: results.length
    };
  }

  // Get recent user activity (last 10 test attempts)
  async getRecentUserActivity(userId, limit = 10) {
    const history = await this.getUserTestHistory(userId);
    return history.slice(0, limit);
  }

  // Toggle test active status
  async toggleTestStatus(testId, isActive) {
    return this.update(testId, { isActive });
  }
}

export default new MockTestService();