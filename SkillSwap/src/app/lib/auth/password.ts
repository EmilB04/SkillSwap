import {hashPassword, verifyPassword } from "better-auth/crypto";

// Basert på eksempel fra kurset webapp 2025 på Ulearn (password.ts)

// Creates a hashed password from a plain text password
export async function createPasswordHash(password: string): Promise<string> {
    try {
        const hashedPassword = await hashPassword(password);
        return hashedPassword;
    } catch (error) {
        console.error("Could not hash password:", error);
        throw new Error("Password hashing failed");
    }
}

// Verifies a plain text password against a hashed password
export async function checkPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        return await verifyPassword ({ password: password, hash: hashedPassword });
    } catch (error) {
        console.error("Could not verify password:", error);
        return false; 
    }
}

// password policy 
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one digit.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character.");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}


