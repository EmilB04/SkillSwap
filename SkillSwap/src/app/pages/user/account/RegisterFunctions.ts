/**
 * Register page utility functions
 */

import { a } from "vitest/dist/chunks/suite.d.FvehnV49.js";
import { validateEmail } from "./LoginFunctions";

export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    redirectUrl?: string;
}

/**
 * Validates registration form inputs
 */
export const validateRegisterForm = (
    credentials: RegisterCredentials
): string | null => {
    const { firstName, lastName, email, password, confirmPassword } = credentials;

    if (!firstName.trim()) {
        return "First name is required";
    }

    if (!lastName.trim()) {
        return "Last name is required";
    }

    if (!email.trim()) {
        return "Email is required";
    }

    if (!validateEmail(email.trim())) {
        return "Please enter a valid email address";
    }

    if (!password.trim()) {
        return "Password is required";
    }

    if (password.length < 8) {
        return "Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
        return "Please confirm your password";
    }

    if (password !== confirmPassword) {
        return "Passwords do not match";
    }

    return null;
};

/**
 * Performs registration API call
 */
export const performRegister = async (
    credentials: RegisterCredentials
): Promise<RegisterResponse> => {
    try {
        const { firstName, lastName, email, password } = credentials;

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: `${firstName.trim()} ${lastName.trim()}`,
                email: email.trim(),
                password,
            }),
        });

        const data: any = await response.json().catch(() => ({}));

        if (!response.ok || !data.success) {
            return {
                success: false,
                message: data?.error?.message || data?.message || "Registration failed",
            };
        }

        return {
            success: true,
            message: "Registration successful! You can now log in.",
            redirectUrl: "/",
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            message:
                "Registration failed: " +
                (error instanceof Error ? error.message : "Unknown error"),
        };
    }
};

/**
 * Handles Google OAuth redirect for registration
 */
export const initiateGoogleRegister = (): void => {
    // Redirect to your Google OAuth endpoint (adjust route as needed)
    window.location.href = "/api/auth/google";
};

/**
 * Validates if registration form is ready to submit (real-time validation)
 */
export const isRegisterFormValid = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
): boolean => {
    return (
        firstName.trim().length > 0 &&
        lastName.trim().length > 0 &&
        email.trim().length > 0 &&
        email.includes('@') &&
        email.includes('.') &&
        password.trim().length >= 6 &&
        confirmPassword.trim().length >= 6 &&
        password === confirmPassword
    );
};
