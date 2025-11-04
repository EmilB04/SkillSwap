"use client";

export function RegisterFormHeader() {
    return (
        <header className="text-center mb-6 sm:mb-8">
            <div className="mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Join our community
                </span>
            </div>
            <h1
                id="register-heading"
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
            >
                Create Account
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
                Join SkillSwap to start sharing and learning new skills
            </p>
        </header>
    );
}
