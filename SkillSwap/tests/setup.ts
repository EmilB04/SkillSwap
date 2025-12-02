// Test setup file
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Mock import.meta.env for tests
vi.stubGlobal("import.meta.env", {
  VITE_IS_DEV_SERVER: "true",
  MODE: "test",
  DEV: true,
  PROD: false,
  SSR: false,
});

// AI-assisted (Claude) for Cloudflare Workers and Drizzle ORM mocks

// Mock Cloudflare Workers modules
vi.mock("cloudflare:workers", () => ({
  env: {
    DB: {},
  },
}));

// Mock database with Drizzle ORM structure
vi.mock("@/db", () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
    }),
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockReturnThis(),
    }),
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      returning: vi.fn().mockReturnThis(),
    }),
    delete: vi.fn().mockReturnValue({
      where: vi.fn().mockReturnThis(),
      returning: vi.fn().mockReturnThis(),
    }),
  },
}));
