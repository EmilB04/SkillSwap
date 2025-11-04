"use client";

import { colors } from "@/app/theme";

interface EmailInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function EmailInput({ value, onChange }: EmailInputProps) {
    return (
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
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                    '--tw-ring-color': `${colors.primary.main}33`,
                    borderColor: undefined,
                } as React.CSSProperties & { '--tw-ring-color': string }}
                onFocus={(e) => e.target.style.borderColor = colors.primary.main}
                onBlur={(e) => e.target.style.borderColor = ''}
                aria-describedby="email-help"
            />
            <div id="email-help" className="sr-only">
                Enter your email to sign in to your account
            </div>
        </div>
    );
}
