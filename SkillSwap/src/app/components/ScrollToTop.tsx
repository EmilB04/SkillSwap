"use client";

import { useState, useEffect } from "react";
import { colors } from "../theme";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
                    style={{
                        backgroundColor: colors.primary.main,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.primary.hover;
                        e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = colors.primary.main;
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                    aria-label="Scroll to top"
                >
                    <svg 
                        className="w-6 h-6 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 10l7-7m0 0l7 7m-7-7v18" 
                        />
                    </svg>
                </button>
            )}
        </>
    );
}
