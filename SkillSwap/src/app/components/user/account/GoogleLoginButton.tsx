"use client";

interface GoogleLoginButtonProps {
    onClick: () => void;
    disabled?: boolean;
    isPending?: boolean;
    text?: string;
    pendingText?: string;
}

export function GoogleLoginButton({
    onClick,
    disabled = false,
    isPending = false,
    text = "Sign in with Google",
    pendingText = "Redirecting..."
}: GoogleLoginButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-white text-gray-700 border border-gray-200 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base hover:cursor-pointer hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200 shadow-sm font-medium"
            aria-label="Sign in with Google account"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 533.5 544.3"
                className="h-4 w-4 sm:h-5 sm:w-5"
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
            {isPending ? pendingText : text}
        </button>
    );
}
