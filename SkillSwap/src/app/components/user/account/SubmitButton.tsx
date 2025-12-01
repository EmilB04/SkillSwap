"use client";

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
                className={`w-full bg-primary hover:bg-primary-hover text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg ${
                    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
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
