"use client";

import { colors } from "@/app/theme";

export function RegisterSidebar() {
    return (
        <aside className="hidden lg:flex lg:flex-1 lg:items-center self-center lg:justify-center lg:max-w-md">
            <article className="relative w-full">
                <div 
                    className="absolute inset-0 blur-3xl" 
                    style={{
                        background: `linear-gradient(to right, ${colors.primary.main}33, #10b98133)`
                    }}
                    aria-hidden="true"
                ></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl lg:rounded-3xl border border-white/20 p-6 lg:p-8">
                    <div className="text-center space-y-4 lg:space-y-6">
                        <figure 
                            className="w-20 h-20 lg:w-24 lg:h-24 rounded-full mx-auto flex items-center justify-center"
                            style={{ backgroundColor: colors.primary.main }}
                        >
                            <svg
                                className="w-10 h-10 lg:w-12 lg:h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </figure>
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                            Start Your Journey
                        </h2>
                        <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                            Connect with learners and experts in your community. Share
                            knowledge, develop skills, and grow together.
                        </p>
                        <ul className="grid grid-cols-2 gap-3 lg:gap-4 text-xs lg:text-sm list-none">
                            <li className="bg-teal-50 rounded-lg p-2.5 lg:p-3">
                                <strong className="font-semibold text-teal-800 block">
                                    🚀 Build
                                </strong>
                                <span className="text-teal-600">Your Profile</span>
                            </li>
                            <li className="bg-emerald-50 rounded-lg p-2.5 lg:p-3">
                                <strong className="font-semibold text-emerald-800 block">
                                    🌟 Discover
                                </strong>
                                <span className="text-emerald-600">Opportunities</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
        </aside>
    );
}
