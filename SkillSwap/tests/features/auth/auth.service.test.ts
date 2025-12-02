import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  createAuthService,
  type AuthService,
} from "@/features/auth/auth.service";
import type { AuthRepository } from "@/features/auth/auth.repository";
import {
  createMockUser,
  createMockSafeUser,
  createMockSession,
  validCredentials,
  invalidCredentials,
} from "../../helpers/authMockData";
import * as passwordModule from "@/app/lib/auth/password";
import * as sessionModule from "@/app/lib/auth/session";

describe("AuthService", () => {
  let authService: AuthService;
  let mockRepository: AuthRepository;

  // AI-assisted (Claude): Tests were failing with "passwordModule.createPasswordHash is not a function"
  // Prompt: "How do I fix TypeError when testing functions from imported modules are undefined?"
  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      findUserByEmail: vi.fn(),
      findUserById: vi.fn(),
      createUser: vi.fn(),
      updateLastLogin: vi.fn(),
    };

    // Create auth service with mocked repository
    authService = createAuthService(mockRepository);

    // Mock password functions
    vi.spyOn(passwordModule, "createPasswordHash").mockResolvedValue(
      "$2a$10$hashedpassword123"
    );
    vi.spyOn(passwordModule, "checkPassword").mockResolvedValue(true);
    vi.spyOn(passwordModule, "validatePasswordStrength").mockReturnValue({
      isValid: true,
      errors: [],
    });

    // Mock session functions
    vi.spyOn(sessionModule, "createSession").mockResolvedValue({
      success: true,
      data: createMockSession(),
    });
    vi.spyOn(sessionModule, "deleteSession").mockResolvedValue({
      success: true,
      data: undefined,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("register", () => {
    it("should successfully register a new user with valid credentials", async () => {
      const mockSafeUser = createMockSafeUser({
        email: validCredentials.register.email,
      });

      vi.mocked(mockRepository.findUserByEmail).mockResolvedValue({
        success: true,
        data: null,
      });

      vi.mocked(mockRepository.createUser).mockResolvedValue({
        success: true,
        data: mockSafeUser,
      });

      const result = await authService.register(validCredentials.register);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.user.email).toBe(validCredentials.register.email);
        expect(result.data.session).toBeDefined();
      }
    });

    it("should reject registration with weak password", async () => {
      vi.spyOn(passwordModule, "validatePasswordStrength").mockReturnValue({
        isValid: false,
        errors: ["Password must be at least 8 characters long."],
      });

      const result = await authService.register(invalidCredentials.tooShort);

      expect(result.success).toBe(false);
    });

    it("should reject registration with duplicate email", async () => {
      const existingUser = createMockUser({
        email: validCredentials.register.email,
      });

      vi.mocked(mockRepository.findUserByEmail).mockResolvedValue({
        success: true,
        data: existingUser,
      });

      const result = await authService.register(validCredentials.register);

      expect(result.success).toBe(false);
    });

    it("should handle session creation failure", async () => {
      const mockSafeUser = createMockSafeUser();

      vi.mocked(mockRepository.findUserByEmail).mockResolvedValue({
        success: true,
        data: null,
      });

      vi.mocked(mockRepository.createUser).mockResolvedValue({
        success: true,
        data: mockSafeUser,
      });

      vi.spyOn(sessionModule, "createSession").mockResolvedValue({
        success: false,
        error: { message: "Failed to create session", code: 500 },
      });

      const result = await authService.register(validCredentials.register);

      expect(result.success).toBe(false);
    });
  });

  describe("login", () => {
    it("should successfully login with valid credentials", async () => {
      const mockUser = createMockUser({ email: validCredentials.login.email });
      const mockSession = createMockSession({ userId: mockUser.id });

      vi.mocked(mockRepository.findUserByEmail).mockResolvedValue({
        success: true,
        data: mockUser,
      });

      vi.spyOn(passwordModule, "checkPassword").mockResolvedValue(true);

      vi.spyOn(sessionModule, "createSession").mockResolvedValue({
        success: true,
        data: mockSession,
      });

      const result = await authService.login(validCredentials.login);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.user.email).toBe(validCredentials.login.email);
        expect(result.data.session).toBeDefined();
      }
    });

    it("should reject login with invalid password", async () => {
      const mockUser = createMockUser({ email: validCredentials.login.email });

      vi.mocked(mockRepository.findUserByEmail).mockResolvedValue({
        success: true,
        data: mockUser,
      });

      vi.spyOn(passwordModule, "checkPassword").mockResolvedValue(false);

      const result = await authService.login(validCredentials.login);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toContain("Invalid email or password");
        expect(result.error.code).toBe(401);
      }
    });

    it("should reject login with non-existent email", async () => {
      vi.mocked(mockRepository.findUserByEmail).mockResolvedValue({
        success: true,
        data: null,
      });

      const result = await authService.login(validCredentials.login);

      expect(result.success).toBe(false);
    });

    it("should reject login for deactivated account", async () => {
      const mockUser = createMockUser({
        email: validCredentials.login.email,
        isActive: false,
      });

      vi.mocked(mockRepository.findUserByEmail).mockResolvedValue({
        success: true,
        data: mockUser,
      });

      const result = await authService.login(validCredentials.login);

      expect(result.success).toBe(false);
    });
  });

  describe("logout", () => {
    it("should successfully logout and delete session", async () => {
      const sessionId = "session_test123";

      vi.spyOn(sessionModule, "deleteSession").mockResolvedValue({
        success: true,
        data: undefined,
      });

      const result = await authService.logout(sessionId);

      expect(result.success).toBe(true);
    });
  });

  describe("currentUser", () => {
    it("should successfully retrieve current user by ID", async () => {
      const mockSafeUser = createMockSafeUser({ id: 1 });

      vi.mocked(mockRepository.findUserById).mockResolvedValue({
        success: true,
        data: mockSafeUser,
      });

      const result = await authService.currentUser(1);

      expect(result.success).toBe(true);
    });

    it("should return error when user not found", async () => {
      vi.mocked(mockRepository.findUserById).mockResolvedValue({
        success: true,
        data: null,
      });

      const result = await authService.currentUser(999);

      expect(result.success).toBe(false);
    });
  });

  describe("createAdminUser", () => {
    it("should successfully create an admin user", async () => {
      const mockAdminUser = createMockSafeUser({
        email: validCredentials.register.email,
        role: "admin",
      });
      const mockSession = createMockSession({ userId: mockAdminUser.id });

      vi.mocked(mockRepository.findUserByEmail).mockResolvedValue({
        success: true,
        data: null,
      });

      vi.mocked(mockRepository.createUser).mockResolvedValue({
        success: true,
        data: mockAdminUser,
      });

      vi.spyOn(sessionModule, "createSession").mockResolvedValue({
        success: true,
        data: mockSession,
      });

      const result = await authService.createAdminUser(
        validCredentials.register
      );

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.user.role).toBe("admin");
      }
    });
  });
});
