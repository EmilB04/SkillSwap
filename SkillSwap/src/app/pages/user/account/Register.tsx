"use client";

import { useState, useTransition, useMemo } from "react";
import { LoginHeader } from "../../../components/user/account/LoginHeader";
import { RegisterFormHeader } from "../../../components/user/account/RegisterFormHeader";
import { TextInput } from "../../../components/user/account/TextInput";
import { EmailInput } from "../../../components/user/account/EmailInput";
import { PasswordInput } from "../../../components/user/account/PasswordInput";
import { SubmitButton } from "../../../components/user/account/SubmitButton";
import { GoogleLoginButton } from "../../../components/user/account/GoogleLoginButton";
import { StatusMessage } from "../../../components/user/account/StatusMessage";
import { RegisterSidebar } from "../../../components/user/account/RegisterSidebar";
import { validateRegisterForm, performRegister, initiateGoogleRegister, isRegisterFormValid } from "./RegisterFunctions";
import { redirectUser } from "./LoginFunctions";

export function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [result, setResult] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleRegister = async () => {
        const validationError = validateRegisterForm({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        });

        if (validationError) {
            setResult(validationError);
            return;
        }

        const registerResult = await performRegister({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        });

        setResult(registerResult.message);

        if (registerResult.success) {
            redirectUser("/login", 2000);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => void handleRegister());
    };

    const handleGoogleRegister = () => {
        startTransition(() => {
            initiateGoogleRegister();
        });
    };

    // Validate form fields in real-time
    const isFormValid = useMemo(() => {
        return isRegisterFormValid(firstName, lastName, email, password, confirmPassword);
    }, [firstName, lastName, email, password, confirmPassword]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex flex-col">
            <LoginHeader />

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
                    <section
                        className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 w-full lg:flex-1 lg:max-w-md"
                        aria-labelledby="register-heading"
                    >
                        <RegisterFormHeader />

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 sm:space-y-5"
                            role="form"
                            aria-labelledby="register-heading"
                        >
                            <fieldset className="space-y-4 sm:space-y-5">
                                <legend className="sr-only">Account information</legend>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <TextInput
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        value={firstName}
                                        onChange={setFirstName}
                                        type="text"
                                        autoComplete="given-name"
                                        placeholder="Enter your first name"
                                        required
                                        helpText="Enter your first name for your SkillSwap account"
                                    />
                                    <TextInput
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        value={lastName}
                                        onChange={setLastName}
                                        type="text"
                                        autoComplete="family-name"
                                        placeholder="Enter your last name"
                                        required
                                        helpText="Enter your last name for your SkillSwap account"
                                    />
                                </div>

                                <EmailInput value={email} onChange={setEmail} />

                                <PasswordInput value={password} onChange={setPassword} />

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
                                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-[280ms]"
                                        aria-describedby="confirmPassword-help"
                                    />
                                    <div id="confirmPassword-help" className="sr-only">
                                        Re-enter your password to confirm
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="space-y-3 sm:space-y-4">
                                <legend className="sr-only">Account creation</legend>
                                <SubmitButton
                                    isPending={isPending}
                                    disabled={isPending || !isFormValid}
                                    text="Create Account"
                                    pendingText="Creating Account..."
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
                                    onClick={handleGoogleRegister}
                                    isPending={isPending}
                                    text="Sign up with Google"
                                />
                            </fieldset>
                        </form>

                        <StatusMessage message={result} />

                        <nav
                            className="mt-6 sm:mt-8 text-center"
                            aria-label="Account login"
                        >
                            <p className="text-sm sm:text-base text-gray-600">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="font-medium text-primary hover:text-primary-hover transition-colors duration-[280ms] underline-offset-2 hover:underline cursor-pointer"
                                >
                                    Sign In
                                </a>
                            </p>
                        </nav>
                    </section>

                    <RegisterSidebar />
                </div>
            </div>
        </main>
    );
}
