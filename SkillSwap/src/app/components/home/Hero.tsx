"use client";

import { useState } from "react";
import { colors } from "../../theme";

export interface Stat {
    value: string;
    label: string;
}

interface HeroButton {
    text: string;
    href: string;
    variant: "primary" | "secondary";
}

interface HeroProps {
    title?: {
        line1: string;
        line2: string;
    };
    subtitle?: string;
    isLoggedIn?: boolean;
    showSearchBar?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
}

export function Hero({
    title = {
        line1: "Exchange Skills,",
        line2: "Grow Together"
    },
    subtitle = "Connect with people who want to learn what you know, and teach what they master. SkillSwap makes peer-to-peer learning simple and rewarding.",
    isLoggedIn = false,
    showSearchBar = true,
    searchPlaceholder = "Search for skills, services, or people...",
    onSearch,
}: HeroProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            if (onSearch) {
                onSearch(searchQuery);
            } else {
                // Unified behavior: navigate to explore page with ?q= param
                window.location.href = `/explore?q=${encodeURIComponent(searchQuery)}`;
            }
        }
    };
    const loggedInButtons: HeroButton[] = [
        { text: "Explore Opportunities", href: "/explore", variant: "primary" },
        { text: "View My Profile", href: "/profile", variant: "secondary" },
    ];

    const loggedOutButtons: HeroButton[] = [
        { text: "Get Started Free", href: "/register", variant: "primary" },
        { text: "Sign In", href: "/login", variant: "secondary" },
    ];

    const buttons = isLoggedIn ? loggedInButtons : loggedOutButtons;

    return (
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        <span style={{ color: colors.primary.main }}>
                            {title.line1}
                        </span>
                        <br />
                        <span className="text-gray-900">{title.line2}</span>
                    </h1>

                    <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                        {subtitle}
                    </p>

                    {/* Search Bar */}
                    {showSearchBar && (
                        <div className="max-w-2xl mx-auto mb-8">
                            <form onSubmit={handleSearch} className="relative">
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={searchPlaceholder}
                                        className="w-full px-6 py-4 pr-32 rounded-lg border border-gray-300 focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-200"
                                        style={{
                                            fontSize: '16px',
                                        }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-md cursor-pointer"
                                        style={{ backgroundColor: colors.primary.main }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary.hover}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
                                    >
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <span className="hidden sm:inline">Search</span>
                                        </span>
                                    </button>
                                </div>
                                {/* Popular searches */}
                                <div className="mt-3 flex flex-wrap gap-2 justify-center items-center">
                                    <span className="text-sm text-gray-500">Popular:</span>
                                    {["Web Design", "Cooking", "Language", "Photography"].map((term) => (
                                        <button
                                            key={term}
                                            type="button"
                                            onClick={() => {
                                                setSearchQuery(term);
                                                if (onSearch) {
                                                    onSearch(term);
                                                } else {
                                                    window.location.href = `/explore?q=${encodeURIComponent(term)}`;
                                                }
                                            }}
                                            className="text-sm px-3 py-1 rounded-full border border-gray-300 text-gray-600 transition-colors duration-200 cursor-pointer"
                                            style={{
                                                borderColor: '#d1d5db',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = colors.primary.main;
                                                e.currentTarget.style.color = colors.primary.main;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = '#d1d5db';
                                                e.currentTarget.style.color = '#4b5563';
                                            }}
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {buttons.map((button, index) => (
                            <a
                                key={index}
                                href={button.href}
                                className={`w-full sm:w-auto px-8 py-3 rounded-lg font-medium text-base transition-all duration-200 cursor-pointer ${button.variant === "primary"
                                        ? "text-white"
                                        : "bg-white text-gray-700 border border-gray-300"
                                    }`}
                                style={button.variant === "primary" ? { backgroundColor: colors.primary.main } : {}}
                                onMouseEnter={(e) => {
                                    if (button.variant === "primary") {
                                        e.currentTarget.style.backgroundColor = colors.primary.hover;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (button.variant === "primary") {
                                        e.currentTarget.style.backgroundColor = colors.primary.main;
                                    }
                                }}
                            >
                                {button.text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
