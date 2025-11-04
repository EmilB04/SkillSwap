"use client";

export function LoginHeader() {
    return (
        <header className="bg-white shadow relative">
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 sm:gap-3 z-20 flex-shrink-0">
                    <img src="/src/app/assets/logo.png" alt="Logo" className="h-10 sm:h-12 w-auto" />
                    <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#439F8F] via-[#48ECA1] to-[#394251] bg-clip-text text-transparent inline-block whitespace-nowrap">
                        SkillSwap
                    </h1>
                </a>
            </div>
        </header>
    );
}
