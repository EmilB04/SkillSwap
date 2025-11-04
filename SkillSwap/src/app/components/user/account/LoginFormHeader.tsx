"use client";

import { colors } from "@/app/theme";

interface LoginFormHeaderProps {
    title?: string;
    subtitle?: string;
}

export function LoginFormHeader({
    title = "Welcome back",
    subtitle = "Sign in to your SkillSwap account"
}: LoginFormHeaderProps) {
    return (
        <header className="text-center mb-6 sm:mb-8">
            <div className="mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Please enter your details
                </span>
            </div>
            <h1
                id="login-heading"
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
            >
                {title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">{subtitle}</p>
        </header>
    );
}
