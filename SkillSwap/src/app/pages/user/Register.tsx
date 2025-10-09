"use client";

import { useState, useTransition } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import {
    finishPasskeyRegistration,
    startPasskeyRegistration,
} from "./functions";

export function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [result, setResult] = useState("");
    const [isPending, startTransition] = useTransition();

    const passkeyRegister = async () => {
        if (!username.trim()) {
            setResult("Username is required");
            return;
        }

        try {
            // 1. Get a challenge from the worker
            const options = await startPasskeyRegistration(username);

            // 2. Ask the browser to sign the challenge
            const registration = await startRegistration({ optionsJSON: options });

            // 3. Give the signed challenge to the worker to finish the registration process
            const success = await finishPasskeyRegistration(username, registration);

            if (!success) {
                setResult("Registration failed");
            } else {
                setResult("Registration successful! You can now log in.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setResult(
                "Registration failed: " +
                (error instanceof Error ? error.message : "Unknown error")
            );
        }
    };

    const handlePerformPasskeyRegister = () => {
        startTransition(() => void passkeyRegister());
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Brand Header */}
            <header className="absolute top-0 left-0 right-0 z-10 p-6">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-5 h-5 text-white"
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
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        SkillSwap
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center lg:items-stretch gap-8 lg:gap-12">
                    <section
                        className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 flex-1 max-w-md"
                        aria-labelledby="register-heading"
                    >
                        <header className="text-center mb-8">
                            <div className="mb-4">
                                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                    Join our community
                                </span>
                            </div>
                            <h1
                                id="register-heading"
                                className="text-3xl font-bold text-gray-900 mb-2"
                            >
                                Create Account
                            </h1>
                            <p className="text-gray-600">
                                Join SkillSwap to start sharing and learning new skills
                            </p>
                        </header>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="space-y-6"
                            role="form"
                            aria-labelledby="register-heading"
                        >
                            <fieldset className="space-y-6">
                                <legend className="sr-only">Account information</legend>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Username *
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                                        aria-describedby="username-help"
                                    />
                                    <div id="username-help" className="sr-only">
                                        Choose a unique username for your SkillSwap account
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Email (optional)
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                                        aria-describedby="email-help"
                                    />
                                    <div id="email-help" className="sr-only">
                                        Optional email for account recovery and notifications
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="sr-only">Account creation</legend>
                                <button
                                    type="button"
                                    onClick={handlePerformPasskeyRegister}
                                    disabled={isPending || !username.trim()}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                                    aria-describedby="register-help"
                                >
                                    {isPending ? "Creating Account..." : "Create Account"}
                                </button>
                                <div id="register-help" className="sr-only">
                                    Create your SkillSwap account using secure passkey
                                    authentication
                                </div>

                                <div className="relative my-6" role="separator">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500 font-medium">
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
                                    className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-200 py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm font-medium"
                                    aria-label="Sign up with Google account"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 533.5 544.3"
                                        className="h-5 w-5"
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
                                className={`mt-6 p-4 rounded-xl ${result.includes("successful")
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

                        <nav className="mt-8 text-center" aria-label="Account login">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="text-purple-600 hover:text-blue-600 font-medium transition-colors duration-200"
                                >
                                    Sign In
                                </a>
                            </p>
                        </nav>
                    </section>

                    <section className="flex-1 flex items-center justify-center p-8 lg:max-w-md">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-3xl"></div>
                            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                                <div className="text-center space-y-6">
                                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
                                        <svg
                                            className="w-12 h-12 text-white"
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
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Start Your Journey
                                    </h2>
                                    <p className="text-gray-600">
                                        Connect with learners and experts in your community. Share
                                        knowledge, develop skills, and grow together.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-purple-50 rounded-lg p-3">
                                            <div className="font-semibold text-purple-800">
                                                🚀 Build
                                            </div>
                                            <div className="text-purple-600">Your Profile</div>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-3">
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
