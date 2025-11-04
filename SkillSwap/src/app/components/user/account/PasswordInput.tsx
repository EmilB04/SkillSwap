"use client";

import { colors } from "@/app/theme";

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function PasswordInput({ value, onChange }: PasswordInputProps) {
    return (
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
                autoComplete="current-password"
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                    '--tw-ring-color': `${colors.primary.main}33`,
                    borderColor: undefined,
                } as React.CSSProperties & { '--tw-ring-color': string }}
                onFocus={(e) => e.target.style.borderColor = colors.primary.main}
                onBlur={(e) => e.target.style.borderColor = ''}
                aria-describedby="password-help"
            />
            <div id="password-help" className="sr-only">
                Enter your password
            </div>
        </div>
    );
}
