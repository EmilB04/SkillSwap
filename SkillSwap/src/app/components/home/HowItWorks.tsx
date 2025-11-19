"use client";

import { colors } from "../../theme";

export interface Step {
    number: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface HowItWorksProps {
    title?: string;
    description?: string;
    steps?: Step[];
    backgroundColor?: string;
    showStats?: boolean;
    stats?: Array<{value: string; label: string}>;
    showDisclaimer?: boolean;
    disclaimerText?: string;
}

const defaultSteps: Step[] = [
    {
        number: 1,
        title: "Find Skills",
        description: "Browse through hundreds of skills offered by our community members. Find exactly what you want to learn.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
    {
        number: 2,
        title: "Make a Swap",
        description: "Connect with someone who has what you need and wants what you offer. Agree on a fair exchange.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        ),
    },
    {
        number: 3,
        title: "Learn & Teach",
        description: "Meet up, share your knowledge, and grow together. Build lasting connections in the process.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

const defaultStats = [
    { value: "500+", label: "Active Users" },
    { value: "1,200+", label: "Skills Shared" },
    { value: "350+", label: "Swaps Completed" },
];

export function HowItWorks({
    title = "How SkillSwap Works",
    description = "Start exchanging skills in three simple steps",
    steps = defaultSteps,
    backgroundColor = "transparent",
    showStats = true,
    stats = defaultStats,
    showDisclaimer = true,
    disclaimerText = "Disclaimer: All statistics are for demonstration purposes only and may not reflect real user activity.",
}: HowItWorksProps) {
    return (
        <section className="py-16" style={{ backgroundColor }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 text-center hover:shadow-xl transition-shadow duration-200"
                        >
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                                style={{ backgroundColor: `${colors.primary.main}15` }}
                            >
                                <div style={{ color: colors.primary.main }}>
                                    {step.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {step.number}. {step.title}
                            </h3>
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                {showStats && (
                    <div className="mt-16 pt-12 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: colors.primary.main }}>
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Disclaimer */}
                {showDisclaimer && disclaimerText && (
                    <p className="text-sm text-gray-600 mt-8 text-center italic">
                        {disclaimerText}
                    </p>
                )}
            </div>
        </section>
    );
}
