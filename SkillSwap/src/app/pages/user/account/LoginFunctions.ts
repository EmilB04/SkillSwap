/**
 * Login page utility functions
 */

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    redirectUrl?: string;
}

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates login form inputs
 */
export const validateLoginForm = (
    email: string,
    password: string
): string | null => {
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
        return "Password must be at least 8 characters";
    }

    return null;
};

/**
 * Performs login API call
 */
export const performLogin = async (
    credentials: LoginCredentials
): Promise<LoginResponse> => {
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email.trim(),
                password: credentials.password,
            }),
        });

        const data: any = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false, message: data?.error?.message || (data as any)?.message || "Login failed",
            };
        }

        return {
            success: true,
            message: "Login successful!",
            redirectUrl: "/",
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message:
                "Login failed: " +
                (error instanceof Error ? error.message : "Unknown error"),
        };
    }
};

/**
 * Handles Google OAuth redirect
 */
export const initiateGoogleAuth = (): void => {
    // Redirect to your Google OAuth endpoint (adjust route as needed)
    window.location.href = "/api/auth/google";
};

/**
 * Redirects user to specified URL
 */
export const redirectUser = (url: string, delay: number = 1000): void => {
    setTimeout(() => {
        window.location.href = url;
    }, delay);
};

/**
 * Validates if login form is ready to submit (real-time validation)
 */
export const isLoginFormValid = (email: string, password: string): boolean => {
    return (
        email.trim().length > 0 &&
        email.includes('@') &&
        email.includes('.') &&
        password.trim().length >= 8
    );
};
