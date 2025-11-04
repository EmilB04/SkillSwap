"use client";

import { useState, useTransition } from "react";
import { colors } from "@/app/theme";
import { LoginHeader } from "../../../components/user/account/LoginHeader";
import { LoginFormHeader } from "../../../components/user/account/LoginFormHeader";
import { EmailInput } from "../../../components/user/account/EmailInput";
import { PasswordInput } from "../../../components/user/account/PasswordInput";
import { SubmitButton } from "../../../components/user/account/SubmitButton";
import { GoogleLoginButton } from "../../../components/user/account/GoogleLoginButton";
import { StatusMessage } from "../../../components/user/account/StatusMessage";
import { LoginSidebar } from "../../../components/user/account/LoginSidebar";
import { validateLoginForm, performLogin, initiateGoogleAuth } from "./LoginFunctions";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleLogin = async () => {
    const validationError = validateLoginForm(email, password);
    if (validationError) {
      setResult(validationError);
      return;
    }

    const loginResult = await performLogin({ email, password });
    setResult(loginResult.message);

    if (loginResult.success) {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => void handleLogin());
  };

  const handleGoogleLogin = () => {
    startTransition(() => {
      initiateGoogleAuth();
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex flex-col">
      <LoginHeader />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
          <section
            className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 w-full lg:flex-1 lg:max-w-md"
            aria-labelledby="login-heading"
          >
            <LoginFormHeader />

            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5"
              role="form"
              aria-labelledby="login-heading"
            >
              <fieldset className="space-y-4 sm:space-y-5">
                <legend className="sr-only">Account credentials</legend>
                <EmailInput value={email} onChange={setEmail} />
                <PasswordInput value={password} onChange={setPassword} />
              </fieldset>

              <fieldset className="space-y-3 sm:space-y-4">
                <legend className="sr-only">Authentication methods</legend>
                <SubmitButton
                  isPending={isPending}
                  disabled={isPending || !email.trim() || !password.trim()}
                />

                <div className="relative my-4 sm:my-6" aria-label="Alternative authentication methods">
                  <hr className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-gray-200" />
                  <p className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-3 sm:px-4 bg-white text-gray-500 font-medium">
                      or
                    </span>
                  </p>
                </div>

                <GoogleLoginButton
                  onClick={handleGoogleLogin}
                  isPending={isPending}
                />
              </fieldset>
            </form>

            <StatusMessage message={result} />

            <nav className="mt-6 sm:mt-8 text-center" aria-label="Account registration">
              <p className="text-sm sm:text-base text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium transition-colors duration-200 underline-offset-2 hover:underline cursor-pointer"
                  style={{ color: colors.primary.main }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.primary.hover}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.primary.main}
                >
                  Sign up
                </a>
              </p>
            </nav>
          </section>

          <LoginSidebar />
        </div>
      </div>
    </main>
  );
}
