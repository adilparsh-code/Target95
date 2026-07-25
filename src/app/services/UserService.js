"use server";

import BaseService from "./BaseService";

class UserService extends BaseService {
  constructor() {
    super("users");
  }

  // Get user by email
  async getByEmail(email) {
    const users = await this.query([
      { field: "email", operator: "==", value: email }
    ]);
    return users.length > 0 ? users[0] : null;
  }

  // Get users by role (student, teacher, admin)
  async getByRole(role) {
    return this.query([
      { field: "role", operator: "==", value: role }
    ]);
  }

  // Update user's last login
  async updateLastLogin(userId) {
    return this.update(userId, {
      lastLogin: new Date().toISOString()
    });
  }

  // Get active users
  async getActiveUsers() {
    return this.query([
      { field: "isActive", operator: "==", value: true }
    ]);
  }
}

export default new UserService();