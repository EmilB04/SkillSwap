"use client";

import { colors } from '../../../theme';

export function LoginHeader() {
    return (
        <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="flex items-start justify-left gap-3 px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 sm:gap-3 z-20 flex-shrink-0 group">
                    <div className="relative">
                        <img
                            src="/src/app/assets/logo.png"
                            alt="Logo"
                            className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                        />
                        <div
                            className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                            style={{ backgroundColor: colors.primary.main }}
                        />
                    </div>
                    <h1
                        className="text-xl sm:text-2xl font-bold transition-all duration-300"
                        style={{
                            background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.emerald})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        SkillSwap
                    </h1>
                </a>
            </div>
        </header>
    );
}
