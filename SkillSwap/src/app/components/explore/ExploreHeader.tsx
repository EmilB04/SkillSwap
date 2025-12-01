"use client";

import { useEffect, useState } from 'react';

export default function ExploreHeader() {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        setIsVisible(true);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate opacity and scale based on scroll
    const headerOpacity = Math.max(0, 1 - scrollY / 400);
    const headerScale = Math.max(0.85, 1 - scrollY / 2000);
    const headerTranslateY = scrollY * 0.5; // Parallax effect

    return (
        <div 
            className="relative text-center py-2 sm:py-14 overflow-hidden"
            style={{
                transform: `translateY(${headerTranslateY}px) scale(${headerScale})`,
                opacity: headerOpacity,
                transition: 'opacity 0.1s ease-out'
            }}
        >
            {/* Background decorative elements */}
            <div 
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(63,166,159,0.03)_0%,transparent_70%)]"
                style={{
                    transform: `translateY(${scrollY * 0.3}px)`,
                }}
            />
            
            {/* Animated circles */}
            <div 
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-secondary-accent/20 blur-3xl -z-10"
                style={{
                    transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.15}px)`,
                }}
            />
            <div 
                className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-primary/[0.15] blur-3xl -z-10"
                style={{
                    transform: `translate(-${scrollY * 0.25}px, ${scrollY * 0.1}px)`,
                }}
            />

            {/* Main heading */}
            <h1 
                className={`text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight mb-6 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
                Explore Opportunities
            </h1>

            {/* Subtitle with staggered animation */}
            <div className="space-y-2">
                <p 
                    className={`text-base sm:text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    Discover skills to learn, services to offer, and opportunities to grow
                </p>
            </div>

            {/* Scroll indicator */}
            <div 
                className={`mt-12 transition-all duration-1000 delay-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
                    <svg 
                        className="w-6 h-6 animate-bounce stroke-primary" 
                        fill="none" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
