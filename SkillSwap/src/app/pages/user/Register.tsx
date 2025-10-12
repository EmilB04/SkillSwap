"use client";

import { useState, useTransition } from "react";
import { Link } from 'react-router-dom';

export function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [result, setResult] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleRegister = async () => {
        if (!firstName.trim()) {
            setResult("First name is required");
            return;
        }

        if (!lastName.trim()) {
            setResult("Last name is required");
            return;
        }

        if (!email.trim()) {
            setResult("Email is required");
            return;
        }

        if (!password.trim()) {
            setResult("Password is required");
            return;
        }

        if (password.length < 8) {
            setResult("Password must be at least 8 characters long");
            return;
        }

        if (password !== confirmPassword) {
            setResult("Passwords do not match");
            return;
        }

        try {
            // TODO: Implement standard registration API call
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    password: password,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                setResult((error as any).message || "Registration failed");
                return;
            }

            setResult("Registration successful! You can now log in.");
            // Optionally redirect to login page
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } catch (error) {
            console.error("Registration error:", error);
            setResult(
                "Registration failed: " +
                (error instanceof Error ? error.message : "Unknown error")
            );
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => void handleRegister());
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Brand Header */}
            <header className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 sm:px-6 py-3 sm:py-4">
                <div className="max-w-7xl mx-auto flex items-center space-x-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>
                    <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        SkillSwap
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <div className="min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl w-full flex flex-col lg:flex-row items-start justify-center gap-6 sm:gap-8 lg:gap-12">
                    <section
                        className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 w-full lg:flex-1 lg:max-w-md"
                        aria-labelledby="register-heading"
                    >
                        <header className="text-center mb-6 sm:mb-8">
                            <div className="mb-3 sm:mb-4">
                                <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
                                    Join our community
                                </span>
                            </div>
                            <h1
                                id="register-heading"
                                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
                            >
                                Create Account
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600">
                                Join SkillSwap to start sharing and learning new skills
                            </p>
                        </header>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 sm:space-y-5"
                            role="form"
                            aria-labelledby="register-heading"
                        >
                            <fieldset className="space-y-4 sm:space-y-5">
                                <legend className="sr-only">Account information</legend>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                                        >
                                            First Name *
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            autoComplete="given-name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Enter your first name"
                                            required
                                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                                            aria-describedby="firstName-help"
                                        />
                                        <div id="firstName-help" className="sr-only">
                                            Enter your first name for your SkillSwap account
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                                        >
                                            Last Name *
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            autoComplete="family-name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Enter your last name"
                                            required
                                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                                            aria-describedby="lastName-help"
                                        />
                                        <div id="lastName-help" className="sr-only">
                                            Enter your last name for your SkillSwap account
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                                        aria-describedby="email-help"
                                    />
                                    <div id="email-help" className="sr-only">
                                        Mandatory email for account recovery and notifications
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                                    >
                                        Password *
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                                        aria-describedby="password-help"
                                    />
                                    <div id="password-help" className="sr-only">
                                        Create a secure password for your account
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                                    >
                                        Confirm Password *
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        required
                                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                                        aria-describedby="confirmPassword-help"
                                    />
                                    <div id="confirmPassword-help" className="sr-only">
                                        Re-enter your password to confirm
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="space-y-3 sm:space-y-4">
                                <legend className="sr-only">Account creation</legend>
                                <button
                                    type="submit"
                                    disabled={isPending || !firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
                                    aria-describedby="register-help"
                                >
                                    {isPending ? "Creating Account..." : "Create Account"}
                                </button>
                                <div id="register-help" className="sr-only">
                                    Create your SkillSwap account with email and password
                                </div>

                                <div className="relative my-4 sm:my-6" role="separator">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-xs sm:text-sm">
                                        <span className="px-3 sm:px-4 bg-white text-gray-500 font-medium">
                                            or
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        startTransition(() => {
                                            // redirect to your Google OAuth endpoint
                                            window.location.href = "/api/auth/google";
                                        })
                                    }
                                    disabled={isPending}
                                    className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-white text-gray-700 border border-gray-200 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200 shadow-sm font-medium"
                                    aria-label="Sign up with Google account"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 533.5 544.3"
                                        className="h-4 w-4 sm:h-5 sm:w-5"
                                        aria-hidden="true"
                                        role="img"
                                    >
                                        <title>Google logo</title>
                                        <path
                                            fill="#4285F4"
                                            d="M533.5 278.4c0-18.5-1.6-36.3-4.7-53.6H272v101.4h146.9c-6.3 34.1-25.6 63-54.8 82.3v68.2h88.5c51.8-47.8 81.9-118 81.9-198.3z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M272 544.3c73.6 0 135.3-24.4 180.4-66.4l-88.5-68.2c-24.6 16.5-56.1 26.3-91.9 26.3-70.8 0-130.9-47.6-152.4-111.6H29.9v70.1C75.1 486 167 544.3 272 544.3z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M119.6 322.0c-8.9-26.5-8.9-55 0-81.5V170.4H29.9c-39.2 76.6-39.2 167.4 0 244l89.7-71.4z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M272 107.7c39.9-.6 78.4 14.2 107.7 41.1l80.7-80.7C405.5 24.8 345.2 0 272 0 167 0 75.1 58.3 29.9 146.1l89.7 70.1C141.1 155.3 201.2 107.7 272 107.7z"
                                        />
                                    </svg>
                                    {isPending ? "Redirecting..." : "Sign up with Google"}
                                </button>
                            </fieldset>
                        </form>

                        {result && (
                            <div
                                className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl text-sm sm:text-base ${result.includes("successful")
                                    ? "bg-green-50 text-green-800 border border-green-200"
                                    : "bg-red-50 text-red-800 border border-red-200"
                                    }`}
                                role="status"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {result}
                            </div>
                        )}

                        <nav className="mt-6 sm:mt-8 text-center" aria-label="Account login">
                            <p className="text-sm sm:text-base text-gray-600">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="text-purple-600 hover:text-blue-600 font-medium transition-colors duration-200 underline-offset-2 hover:underline"
                                >
                                    Sign In
                                </a>
                            </p>
                        </nav>
                    </section>

                    <section className="hidden lg:flex lg:flex-1 lg:items-center self-center lg:justify-center lg:max-w-md">
                        <div className="relative w-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-3xl"></div>
                            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl lg:rounded-3xl border border-white/20 p-6 lg:p-8">
                                <div className="text-center space-y-4 lg:space-y-6">
                                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
                                        <svg
                                            className="w-10 h-10 lg:w-12 lg:h-12 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                                        Start Your Journey
                                    </h2>
                                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                                        Connect with learners and experts in your community. Share
                                        knowledge, develop skills, and grow together.
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 lg:gap-4 text-xs lg:text-sm">
                                        <div className="bg-purple-50 rounded-lg p-2.5 lg:p-3">
                                            <div className="font-semibold text-purple-800">
                                                🚀 Build
                                            </div>
                                            <div className="text-purple-600">Your Profile</div>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-2.5 lg:p-3">
                                            <div className="font-semibold text-blue-800">
                                                🌟 Discover
                                            </div>
                                            <div className="text-blue-600">Opportunities</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
