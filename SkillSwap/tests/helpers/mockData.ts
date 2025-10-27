import { Job } from "@/types/job";

/**
 * Creates a mock Job object for testing purposes
 * @param overrides - Partial Job object to override default values
 * @returns Complete Job object with test data
 */
export const createMockJob = (overrides?: Partial<Job>): Job => ({
  id: 1,
  title: "Test Job Title",
  description: "Test job description",
  userId: 1,
  category: "Test Category",
  payment: "$25/hour",
  imageUrl: "/test-image.jpg",
  date: new Date(2025, 9, 22), // October 22, 2025
  ...overrides,
});
