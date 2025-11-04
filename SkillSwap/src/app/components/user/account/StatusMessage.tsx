"use client";

interface StatusMessageProps {
    message: string;
    type?: "success" | "error";
}

export function StatusMessage({ message, type = "error" }: StatusMessageProps) {
    if (!message) {
        return null;
    }

    const isSuccess = type === "success" || message.toLowerCase().includes("successful");

    return (
        <output
            className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl text-sm sm:text-base block ${isSuccess
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
        >
            {message}
        </output>
    );
}
