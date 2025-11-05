"use client";

import { colors } from '../../theme';
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
                className="absolute inset-0 -z-10"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${colors.primary.main}08 0%, transparent 70%)`,
                    transform: `translateY(${scrollY * 0.3}px)`,
                }}
            />
            
            {/* Animated circles */}
            <div 
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-3xl -z-10"
                style={{
                    background: `${colors.secondary.emerald}20`,
                    transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.15}px)`,
                }}
            />
            <div 
                className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full blur-3xl -z-10"
                style={{
                    background: `${colors.primary.main}15`,
                    transform: `translate(-${scrollY * 0.25}px, ${scrollY * 0.1}px)`,
                }}
            />

            {/* Main heading */}
            <h1 
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                    background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.emerald})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.03em',
                    lineHeight: '1.1',
                }}
            >
                Explore
                <br />
                <span 
                    className={`transition-all duration-1000 delay-200 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ display: 'inline-block' }}
                >
                    Opportunities
                </span>
            </h1>

            {/* Subtitle with staggered animation */}
            <div className="space-y-2">
                <p 
                    className={`text-xl sm:text-2xl md:text-3xl text-gray-700 max-w-3xl mx-auto font-medium transition-all duration-1000 delay-300 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    Discover skills to learn
                </p>
                <p 
                    className={`text-xl sm:text-2xl md:text-3xl text-gray-700 max-w-3xl mx-auto font-medium transition-all duration-1000 delay-400 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    Services to offer
                </p>
                <p 
                    className={`text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto font-medium transition-all duration-1000 delay-500 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ 
                        background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.emerald})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    Opportunities to grow
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
                        className="w-6 h-6 animate-bounce" 
                        fill="none" 
                        stroke={colors.primary.main} 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
