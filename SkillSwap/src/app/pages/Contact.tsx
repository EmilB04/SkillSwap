"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { RequestInfo } from "rwsdk/worker";
import { colors, borderRadius, shadows, transition } from "../theme";
import { useEffect, useState } from "react";

export default function Contact({ ctx }: RequestInfo) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen" style={{ 
            backgroundColor: colors.secondary.pale
        }}>
            <Header ctx={ctx} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h1 
                        className={`text-3xl sm:text-4xl font-bold mb-6 transition-all duration-1000 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{ color: colors.primary.main }}
                    >
                        Get in Touch
                    </h1>
                    <p 
                        className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        Have questions about SkillSwap? We're here to help! Choose your preferred way to reach us.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
                    {/* Email Support */}
                    <div 
                        className={`bg-white p-8 text-center transition-all border-t-4 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{ 
                            borderColor: '#8B5CF6',
                            borderRadius: borderRadius.lg,
                            boxShadow: shadows.soft,
                            transitionDelay: '100ms',
                            transitionDuration: '1000ms'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = shadows.lifted;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = shadows.soft;
                        }}
                    >
                        <div 
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                            style={{ backgroundColor: '#8B5CF6' }}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
                        <p className="text-gray-600 mb-4">Available 24/7 for your inquiries</p>
                        <a 
                            href="mailto:support@skillswap.com" 
                            className="font-medium transition-colors duration-200"
                            style={{ color: '#8B5CF6' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#7C3AED'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#8B5CF6'}
                        >
                            support@skillswap.com
                        </a>
                    </div>

                    {/* Phone Support */}
                    <div 
                        className={`bg-white p-8 text-center transition-all border-t-4 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{ 
                            borderColor: '#F97316',
                            borderRadius: borderRadius.lg,
                            boxShadow: shadows.soft,
                            transitionDelay: '100ms',
                            transitionDuration: '1000ms'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                            e.currentTarget.style.boxShadow = shadows.medium;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = shadows.soft;
                        }}
                    >
                        <div 
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                            style={{ backgroundColor: '#F97316' }}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
                        <p className="text-gray-600 mb-4">Mon-Fri, 9:00 AM - 5:00 PM (CET)</p>
                        <a 
                            href="tel:+4712345678" 
                            className="font-medium transition-colors duration-200"
                            style={{ color: '#F97316' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#EA580C'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#F97316'}
                        >
                            +47 123 45 678
                        </a>
                    </div>

                    {/* Live Chat */}
                    <div 
                        className={`bg-white p-8 text-center transition-all border-t-4 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{
                            borderColor: '#10B981',
                            borderRadius: borderRadius.lg,
                            boxShadow: shadows.soft,
                            transitionDelay: '100ms',
                            transitionDuration: '1000ms'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = shadows.medium;
                            e.currentTarget.style.borderTopWidth = '5px';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = shadows.soft;
                            e.currentTarget.style.borderTopWidth = '4px';
                        }}
                    >
                        <div 
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                            style={{ backgroundColor: '#10B981' }}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
                        <p className="text-gray-600 mb-4">Quick responses during business hours</p>
                        <button 
                            className="font-medium transition-colors duration-200"
                            style={{ color: '#10B981' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#059669'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#10B981'}
                        >
                            Start Chat (Coming Soon)
                        </button>
                    </div>
                </div>

                <div 
                    className={`text-center pb-10 transition-all duration-1000 delay-800 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Can't find what you're looking for? Check our comprehensive FAQ section.
                    </p>
                    <a
                        href="/faq"
                        className="inline-flex items-center px-6 py-3 font-medium text-white"
                        style={{ 
                            backgroundColor: colors.primary.main,
                            borderRadius: borderRadius.lg,
                            transition: `all ${transition.smooth} ease`,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.primary.hover;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = shadows.soft;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = colors.primary.main;
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Visit FAQ Page
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
}