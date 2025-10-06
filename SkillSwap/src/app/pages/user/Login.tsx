"use client";

import { useState, useTransition } from "react";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  finishPasskeyLogin,
  finishPasskeyRegistration,
  startPasskeyLogin,
  startPasskeyRegistration,
} from "./functions";

export function Login() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  const passkeyLogin = async () => {
    // 1. Get a challenge from the worker
    const options = await startPasskeyLogin();

    // 2. Ask the browser to sign the challenge
    const login = await startAuthentication({ optionsJSON: options });

    // 3. Give the signed challenge to the worker to finish the login process
    const success = await finishPasskeyLogin(login);

    if (!success) {
      setResult("Login failed");
    } else {
      setResult("Login successful!");
    }
  };

  const passkeyRegister = async () => {
    // 1. Get a challenge from the worker
    const options = await startPasskeyRegistration(username);

    // 2. Ask the browser to sign the challenge
    const registration = await startRegistration({ optionsJSON: options });

    // 3. Give the signed challenge to the worker to finish the registration process
    const success = await finishPasskeyRegistration(username, registration);

    if (!success) {
      setResult("Registration failed");
    } else {
      setResult("Registration successful!");
    }
  };

  const handlePerformPasskeyLogin = () => {
    startTransition(() => void passkeyLogin());
  };

  const handlePerformPasskeyRegister = () => {
    startTransition(() => void passkeyRegister());
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Brand Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
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
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SkillSwap
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center lg:items-stretch gap-8 lg:gap-12">
          <section
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 flex-1 max-w-md"
            aria-labelledby="login-heading"
          >
            <header className="text-center mb-8">
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Please enter your details
                </span>
              </div>
              <h1
                id="login-heading"
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                Welcome back
              </h1>
              <p className="text-gray-600">Sign in to your SkillSwap account</p>
            </header>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6"
              role="form"
              aria-labelledby="login-heading"
            >
              <fieldset className="space-y-6">
                <legend className="sr-only">Account credentials</legend>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    aria-describedby="username-help"
                  />
                  <div id="username-help" className="sr-only">
                    Enter your username to sign in to your account
                  </div>
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="sr-only">Authentication methods</legend>
                <button
                  type="button"
                  onClick={handlePerformPasskeyLogin}
                  disabled={isPending || !username.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                  aria-label="Sign in using passkey authentication"
                  aria-describedby="passkey-help"
                >
                  {isPending ? "Signing In..." : "Sign up"}
                </button>
                <div id="passkey-help" className="sr-only">
                  Use your device's built-in authentication like fingerprint,
                  face recognition, or security key
                </div>

                <div
                  className="relative my-6"
                  role="separator"
                  aria-label="Alternative authentication methods"
                >
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
                      // redirect to your Google OAuth endpoint (adjust route as needed)
                      window.location.href = "/api/auth/google";
                    })
                  }
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-200 py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm font-medium"
                  aria-label="Sign in with Google account"
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
                  {isPending ? "Redirecting..." : "Sign in with Google"}
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

            <nav className="mt-8 text-center" aria-label="Account registration">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/user/register"
                  className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200"
                >
                  Sign up
                </a>
              </p>
            </nav>
          </section>

          <section className="flex-1 flex items-center justify-center lg:max-w-md">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
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
                    Get back in the game!
                  </h2>
                  <p className="text-gray-600">
                    Connect with learners and experts in your community. Share
                    knowledge, develop skills, and grow together.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="font-semibold text-blue-800">
                        🎯 Learn
                      </div>
                      <div className="text-blue-600">New Skills</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="font-semibold text-purple-800">
                        🤝 Share
                      </div>
                      <div className="text-purple-600">Knowledge</div>
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
