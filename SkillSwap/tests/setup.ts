// Test setup file
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest"; // Import jest-dom matchers

// Mock import.meta.env for tests
vi.stubGlobal("import.meta.env", {
  VITE_IS_DEV_SERVER: "true",
  MODE: "test",
  DEV: true,
  PROD: false,
  SSR: false,
});
