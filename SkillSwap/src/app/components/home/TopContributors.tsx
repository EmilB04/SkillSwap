"use client";

import { colors, borderRadius, shadows, transition } from "../../theme";

export interface Contributor {
    id: number;
    name: string;
    avatar: string;
    completedSwaps: number;
    rating: number;
    skills: string[];
    profileImage?: string | null;
}

interface TopContributorsProps {
    contributors: Contributor[];
    title?: string;
    description?: string;
    showDisclaimer?: boolean;
}

export function TopContributors({
    contributors,
    title = "Top Contributors This Month",
    description = "Celebrating our most active community members who are making a difference",
    showDisclaimer = true,
}: TopContributorsProps) {
    return (
        <section className="py-16 bg-white/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {contributors.map((contributor, index) => (
                        <div
                            key={contributor.id}
                            className="bg-white border border-gray-100 p-6 text-center relative overflow-hidden"
                            style={{
                                borderRadius: borderRadius.xl,
                                boxShadow: shadows.soft,
                                transition: `all ${transition.smooth} ease`,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                                e.currentTarget.style.boxShadow = shadows.lifted;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = shadows.soft;
                            }}
                        >
                            {/* Rank Badge */}
                            {index < 3 && (
                                <div
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                                    style={{
                                        backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'
                                    }}
                                >
                                    {index + 1}
                                </div>
                            )}

                            {/* Avatar */}
                            <div className="relative mx-auto mb-4 w-20 h-20">
                                {contributor.profileImage ? (
                                    <img
                                        src={contributor.profileImage}
                                        alt={contributor.name}
                                        className="w-20 h-20 rounded-full object-cover border-4"
                                        style={{ borderColor: colors.primary.main }}
                                    />
                                ) : (
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4"
                                        style={{
                                            backgroundColor: colors.primary.main,
                                            borderColor: colors.primary.light,
                                        }}
                                    >
                                        {contributor.avatar}
                                    </div>
                                )}
                            </div>

                            {/* Name */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {contributor.name}
                            </h3>

                            {/* Stats */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-center gap-2 text-sm">
                                    <svg className="w-4 h-4" style={{ color: colors.primary.main }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-semibold" style={{ color: colors.primary.main }}>
                                        {contributor.completedSwaps}
                                    </span>
                                    <span className="text-gray-600">swaps</span>
                                </div>

                                <div className="flex items-center justify-center gap-1 text-sm">
                                    <svg className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="font-semibold text-gray-900">{contributor.rating}</span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="space-y-1">
                                {contributor.skills.map((skill, idx) => (
                                    <div
                                        key={idx}
                                        className="text-xs px-3 py-1 inline-block mx-1"
                                        style={{
                                            backgroundColor: `${colors.primary.main}15`,
                                            color: colors.primary.dark,
                                            borderRadius: borderRadius.full,
                                        }}
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {showDisclaimer && (
                    <p className="text-sm text-gray-500 mt-8 text-center italic">
                        Rankings based on completed skill swaps and community ratings
                    </p>
                )}
            </div>
        </section>
    );
}
