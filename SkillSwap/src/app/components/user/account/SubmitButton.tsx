"use client";

import { colors } from "@/app/theme";

interface SubmitButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    isPending?: boolean;
    text?: string;
    pendingText?: string;
}

export function SubmitButton({
    disabled = false,
    isPending = false,
    text = "Sign In",
    pendingText = "Signing In..."
}: SubmitButtonProps) {
    return (
        <>
            <button
                type="submit"
                disabled={disabled}
                className={`w-full text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg ${
                    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'
                }`}
                style={{
                    backgroundColor: colors.primary.main,
                    '--tw-ring-color': `${colors.primary.main}80`,
                } as React.CSSProperties & { '--tw-ring-color': string }}
                onMouseEnter={(e) => !disabled && (e.currentTarget.style.backgroundColor = colors.primary.hover)}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
                aria-label="Sign in with email and password"
                aria-describedby="login-help"
            >
                {isPending ? pendingText : text}
            </button>
            <div id="login-help" className="sr-only">
                Sign in with your email and password
            </div>
        </>
    );
}
