import type { Result } from "../../types/results";
import { authRepository, type AuthRepository } from "./auth.repository";
import type { Session, SafeUser } from "@/db";
import { createPasswordHash, checkPassword, validatePasswordStrength } from "@/app/lib/auth/password";
import { createSession, deleteSession } from "@/app/lib/auth/session";
import { LoginDTOSchema, RegisterDTOSchema, type LoginDTO, type RegisterDTO } from "@/db/schema/auth/dtos";

// Service interface for authentication operations
export interface AuthService {
    register( credentials: RegisterDTO): Promise<Result<{ user: SafeUser; session: Session }>>;
    login( credentials: LoginDTO): Promise<Result<{ user: SafeUser; session: Session }>>;
    logout(sessionId: string): Promise<Result<{ message: string }>>;
    currentUser(userId: number): Promise<Result<SafeUser>>;
    createAdminUser( credentials: RegisterDTO): Promise<Result<{ user: SafeUser; session: Session }>>;
}

export function createAuthService(repo: AuthRepository): AuthService {
    
}