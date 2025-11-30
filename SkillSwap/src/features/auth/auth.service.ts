import type { Result } from "../../types/results";
import { authRepository, type AuthRepository } from "./auth.repository";
import type { Session, SafeUser, User } from "@/db/schema";
import { createPasswordHash, checkPassword,validatePasswordStrength, } from "@/app/lib/auth/password";
import { createSession, deleteSession, } from "@/app/lib/auth/session";
import { LoginDTOSchema, RegisterDTOSchema, type LoginDTO, type RegisterDTO, } from "@/db/schema/auth/dtos";

// Basert på eksempel fra kurset webapp 2025 på Ulearn (auth.service.ts)

// Service interface for authentication operations
export interface AuthService {
  register(credentials: RegisterDTO): Promise<Result<{ user: SafeUser; session: Session }>>;
  login(credentials: LoginDTO): Promise<Result<{ user: SafeUser; session: Session }>>;
  logout(sessionId: string): Promise<Result<{ message: string }>>;
  currentUser(userId: number): Promise<Result<SafeUser>>;
  createAdminUser(credentials: RegisterDTO): Promise<Result<{ user: SafeUser; session: Session }>>;
}

export function createAuthService(repository: AuthRepository): AuthService {
  const createUserSession = async (userId: number): Promise<Result<Session>> => {
    const sessionResult = await createSession(userId);

    if (!sessionResult.success) {
      return {
        success: false,
        error: { message: sessionResult.error.message ?? "Failed to create session",code: sessionResult.error.code ?? 500,},
      };
    }
    return sessionResult;
  };

  return {
    async currentUser(userId) {
      const userResult = await repository.findUserById(userId);

      if (!userResult.success) {
        return {
          success: false,
          error: { message: userResult.error.message ?? "Failed to get user", code: userResult.error.code ?? 500,},
        };
      }

      if (!userResult.data) {
        return {
          success: false,
          error: {message: "User not found",code: 404,},
        };
      }
      return {
        success: true,
        data: userResult.data,
      };
    },

    async register(credentials) {
      // Valider input med Zod
      const parsed = RegisterDTOSchema.safeParse(credentials);
      if (!parsed.success) {
        return {
          success: false,
          error: { message: "Invalid registration data",code: 400,},
        };
      }

      const { name, email, password } = parsed.data;

      // Check password strength
      const strength = validatePasswordStrength(password);
      if (!strength.isValid) {
        return {
          success: false,
          error: { message: strength.errors.join(", "), code: 400,},
        };
      }

      // Check if user with same email already exists
      const existingByEmail = await repository.findUserByEmail(email);
      if (!existingByEmail.success) {
        return {
          success: false,
          error: { message: existingByEmail.error.message ??"Failed to check existing users",code:
             existingByEmail.error.code ?? 500,},
        };
      }
      if (existingByEmail.data) {
        return {
          success: false,
          error: { message: "User already exists", code: 409, },
        };
      }

      // Hashing passord
      const passwordHash = await createPasswordHash(password);

      // Creating user 
      const createdUserResult = await repository.createUser({
        name,
        email,
        passwordHash,
        role: "user",
      });

      if (!createdUserResult.success) {
        return {
          success: false,
          error: { message: createdUserResult.error.message ?? "Failed to create user", 
            code: createdUserResult.error.code ?? 500, },
        };
      }

      const newUser = createdUserResult.data;

      // Creating session
      const sessionResult = await createUserSession(newUser.id);
      if (!sessionResult.success) {
        return {
          success: false,
          error: { message: sessionResult.error.message, code: sessionResult.error.code ?? 500, },
        };
      }

      return {
        success: true,
        data: { user: newUser, session: sessionResult.data,},
      };
    },

    async login(credentials) {
      // Validate input
      const parsed = LoginDTOSchema.safeParse(credentials);
      if (!parsed.success) {
        return {
          success: false,
          error: {message: "Invalid email or password", code: 401, },
        };
      }

      const { email, password } = parsed.data;

      // Find user by email
      const userResult = await repository.findUserByEmail(email);

      if (!userResult.success) {
        return {
          success: false,
          error: { message: userResult.error.message ?? "Login failed", code: userResult.error.code ?? 500, },
        };
      }

      const user = userResult.data as User | null;

      if (!user) {
        return {
          success: false,
          error: { message: "Invalid email or password", code: 401, },
        };
      }

      if (user.isActive === false) {
        return {
          success: false,
          error: { message: "Account is deactivated", code: 403, },
        };
      }

      // Check password
      const isPasswordValid = await checkPassword(
        password,
        user.passwordHash
      );

      if (!isPasswordValid) {
        return {
          success: false,
          error: { message: "Invalid email or password", code: 401, },
        };
      }

      // Create session
      const sessionResult = await createUserSession(user.id);
      if (!sessionResult.success) {
        return {
          success: false,
          error: { message: sessionResult.error.message, code: sessionResult.error.code ?? 500, },
        };
      }

      // Create safe user object
      const { passwordHash, ...safeUser } = user as any;

      return {
        success: true,
        data: { user: safeUser as SafeUser, session: sessionResult.data, },
      };
    },

    async logout(sessionId) {
      const result = await deleteSession(sessionId);

      if (!result.success) {
        return {
          success: false,
          error: { message: result.error.message ?? "Failed to log out", code: result.error.code ?? 500, },
        };
      }
      return {
        success: true,
        data: { message: "Logged out successfully" },
      };
    },

    async createAdminUser(credentials) {
      // Create admin user
      const parsed = RegisterDTOSchema.safeParse(credentials);
      if (!parsed.success) {
        return {
          success: false,
          error: { message: "Invalid registration data", code: 400, },
        };
      }

      const { name, email, password } = parsed.data;

      const existingByEmail = await repository.findUserByEmail(email);
      if (!existingByEmail.success) {
        return {
          success: false,
          error: { message: existingByEmail.error.message ?? "Failed to check existing users",
            code: existingByEmail.error.code ?? 500, },
        };
      }

      if (existingByEmail.data) {
        return {
          success: false,
          error: { message: "User already exists", code: 409, },
        };
      }

      const strength = validatePasswordStrength(password);
      if (!strength.isValid) {
        return {
          success: false,
          error: { message: strength.errors.join(", "), code: 400, },
        };
      }

      const passwordHash = await createPasswordHash(password);

      const createdUserResult = await repository.createUser({
        name,
        email,
        passwordHash,
        role: "admin",
      });

      if (!createdUserResult.success) {
        return {
          success: false,
          error: { message: createdUserResult.error.message ?? "Failed to create admin user",
            code: createdUserResult.error.code ?? 500, },
        };
      }

      const newAdmin = createdUserResult.data;

      const sessionResult = await createUserSession(newAdmin.id);
      if (!sessionResult.success) {
        return {
          success: false,
          error: {message: sessionResult.error.message, code: sessionResult.error.code ?? 500, },
        };
      }

      return {
        success: true,
        data: { user: newAdmin, session: sessionResult.data,
        },
      };
    },
  };
}

export const authService = createAuthService(authRepository);
