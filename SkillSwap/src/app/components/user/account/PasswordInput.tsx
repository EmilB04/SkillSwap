"use client";

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
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                aria-describedby="password-help"
            />
            <div id="password-help" className="sr-only">
                Enter your password
            </div>
        </div>
    );
}
