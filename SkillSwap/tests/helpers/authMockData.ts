import type { User, SafeUser, Session } from "@/db/schema";

// Used Claude to generate mock data for createMockUser, createMockSafeUser and createMockSession for authentication tests

/**
 * Creates a mock User object for testing purposes
 */
export const createMockUser = (overrides?: Partial<User>): User => ({
  id: 1,
  name: "Test User",
  email: "test@example.com",
  passwordHash: "$2a$10$hashedpassword123",
  role: "user",
  isActive: true,
  lastLoginAt: null,
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-01-01"),
  ...overrides,
});

/**
 * Creates a mock SafeUser object (without password hash)
 */
export const createMockSafeUser = (overrides?: Partial<SafeUser>): SafeUser => ({
  id: 1,
  name: "Test User",
  email: "test@example.com",
  role: "user",
  isActive: true,
  lastLoginAt: null,
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-01-01"),
  ...overrides,
});

/**
 * Creates a mock Session object
 */
export const createMockSession = (overrides?: Partial<Session>): Session => ({
  id: "session_test123",
  userId: 1,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  createdAt: new Date(),
  ...overrides,
});

/**
 * Valid test credentials
 */
export const validCredentials = {
  register: {
    name: "Test User",
    email: "test@example.com",
    password: "TestPass123!",
  },
  login: {
    email: "test@example.com",
    password: "TestPass123!",
  },
};

/**
 * Invalid test credentials - password too short
 */
export const invalidCredentials = {
  tooShort: {
    name: "Test User",
    email: "test@example.com",
    password: "Test1!",
  },
};
