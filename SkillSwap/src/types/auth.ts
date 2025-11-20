import type { Session, SafeUser } from "@/db";

// Context for authentication state
export interface AuthContext {
    user: SafeUser | null;
    session: Session | null;
}

// Login credentials
export interface LoginCredentials {
    email: string;
    password: string;
}

// Registration credentials
export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}