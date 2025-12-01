"use client";

import { useState } from "react";

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
    showStats?: boolean;
    stats?: Stat[];
    showDisclaimer?: boolean;
    disclaimerText?: string;
    backgroundColor?: string;
    showSearchBar?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
}

const defaultStats: Stat[] = [
    { value: "500+", label: "Active Users" },
    { value: "1,200+", label: "Skills Shared" },
    { value: "350+", label: "Swaps Completed" },
];

export function Hero({
    title = {
        line1: "Exchange Skills,",
        line2: "Grow Together"
    },
    subtitle = "Connect with people who want to learn what you know, and teach what they master. SkillSwap makes peer-to-peer learning simple and rewarding.",
    isLoggedIn = false,
    showStats = true,
    stats = defaultStats,
    showDisclaimer = true,
    disclaimerText = "Disclaimer: All statistics are for demonstration purposes only and may not reflect real user activity.",
    backgroundColor = "bg-gradient-to-br from-teal-50 via-white to-emerald-50",
    showSearchBar = true,
    searchPlaceholder = "Search for skills, services, or people...",
    onSearch,
}: HeroProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            if (onSearch) {
                onSearch(searchQuery.trim());
            } else {
                const query = encodeURIComponent(searchQuery.trim());
                window.location.href = `/explore?q=${query}`;
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
                        <span className="text-primary">
                            {title.line1}
                        </span>
                        <br />
                        <span className="text-gray-900">{title.line2}</span>
                    </h1>

                    <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
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
                                        className="w-full text-base text-gray-900 p-4 pr-32 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-[280ms]"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 py-2.5 px-6 rounded-md bg-primary hover:bg-primary-hover hover:scale-[1.03] text-white font-bold border-0 transition-all duration-[140ms] cursor-pointer"
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
                                                    const query = encodeURIComponent(term);
                                                    window.location.href = `/explore?q=${query}`;
                                                }
                                            }}
                                            className="text-sm py-1.5 px-3.5 rounded-full border border-gray-300 text-gray-600 bg-white hover:border-primary-light hover:text-primary hover:bg-primary/10 transition-all duration-[140ms] cursor-pointer"
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
                                className={`w-full sm:w-auto py-3.5 px-8 rounded-md text-base font-bold no-underline transition-all duration-[280ms] cursor-pointer ${
                                    button.variant === "primary"
                                        ? "bg-primary text-white border-0 hover:bg-primary-hover hover:-translate-y-1 hover:shadow-medium"
                                        : "bg-white text-gray-700 border-2 border-gray-300 hover:border-primary hover:text-primary"
                                }`}
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
