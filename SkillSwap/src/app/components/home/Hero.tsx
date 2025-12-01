"use client";

import { useState } from "react";
import { colors, borderRadius, shadows, transition } from "../../theme";

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
                onSearch(searchQuery);
            } else {
                // Default behavior: navigate to explore page with search query
                window.location.href = `/explore?search=${encodeURIComponent(searchQuery)}`;
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
                    <h1 
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                        style={{ fontFamily: 'Space Grotesk' }}
                    >
                        <span style={{ color: colors.primary.main }}>
                            {title.line1}
                        </span>
                        <br />
                        <span style={{ color: colors.neutral.gray[900] }}>{title.line2}</span>
                    </h1>

                    <p 
                        className="text-lg mb-8 max-w-3xl mx-auto"
                        style={{ 
                            color: colors.neutral.gray[600],
                            lineHeight: '1.6',
                        }}
                    >
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
                                        className="w-full focus:outline-none"
                                        style={{
                                            fontSize: '16px',
                                            padding: '1rem 1.5rem',
                                            paddingRight: '8rem',
                                            borderRadius: borderRadius.lg,
                                            border: `2px solid ${colors.neutral.gray[300]}`,
                                            color: colors.neutral.gray[900],
                                            transition: `all ${transition.normal} ease-out`,
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = colors.primary.main;
                                            e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary.main}20`;
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = colors.neutral.gray[300];
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 text-white font-bold cursor-pointer"
                                        style={{ 
                                            padding: '0.625rem 1.5rem',
                                            borderRadius: borderRadius.md,
                                            backgroundColor: colors.primary.main,
                                            border: 'none',
                                            transition: `all ${transition.quick} ease-out`,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = colors.primary.hover;
                                            e.currentTarget.style.transform = 'scale(1.03)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = colors.primary.main;
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }}
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
                                                    window.location.href = `/explore?search=${encodeURIComponent(term)}`;
                                                }
                                            }}
                                            className="text-sm cursor-pointer"
                                            style={{
                                                padding: '0.375rem 0.875rem',
                                                borderRadius: borderRadius.full,
                                                border: `1px solid ${colors.neutral.gray[300]}`,
                                                color: colors.neutral.gray[600],
                                                backgroundColor: colors.neutral.white,
                                                transition: `all ${transition.quick} ease-out`,
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = colors.primary.light;
                                                e.currentTarget.style.color = colors.primary.main;
                                                e.currentTarget.style.backgroundColor = `${colors.primary.main}10`;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = colors.neutral.gray[300];
                                                e.currentTarget.style.color = colors.neutral.gray[600];
                                                e.currentTarget.style.backgroundColor = colors.neutral.white;
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
                                className="w-full sm:w-auto font-bold cursor-pointer"
                                style={{
                                    padding: '0.875rem 2rem',
                                    borderRadius: borderRadius.md,
                                    fontSize: '1rem',
                                    textDecoration: 'none',
                                    transition: `all ${transition.normal} ease-out`,
                                    ...(button.variant === "primary" ? {
                                        backgroundColor: colors.primary.main,
                                        color: colors.neutral.white,
                                        border: 'none',
                                    } : {
                                        backgroundColor: colors.neutral.white,
                                        color: colors.neutral.gray[700],
                                        border: `2px solid ${colors.neutral.gray[300]}`,
                                    })
                                }}
                                onMouseEnter={(e) => {
                                    if (button.variant === "primary") {
                                        // Primary: lift and darken
                                        e.currentTarget.style.backgroundColor = colors.primary.hover;
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = shadows.medium;
                                    } else {
                                        // Secondary: border highlight (different interaction)
                                        e.currentTarget.style.borderColor = colors.primary.main;
                                        e.currentTarget.style.color = colors.primary.main;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (button.variant === "primary") {
                                        e.currentTarget.style.backgroundColor = colors.primary.main;
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    } else {
                                        e.currentTarget.style.borderColor = colors.neutral.gray[300];
                                        e.currentTarget.style.color = colors.neutral.gray[700];
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
