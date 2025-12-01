"use client";

import { useState, useEffect } from "react";

export default function TestUserToggle() {
    const [isTestUser, setIsTestUser] = useState(false);

    useEffect(() => {
        const cookies = document.cookie;
        setIsTestUser(cookies.includes('testUser=1'));
    }, []);

    const toggleTestUser = () => {
        if (isTestUser) {
            // Remove test user
            document.cookie = 'testUser=; Max-Age=0; path=/';
            setIsTestUser(false);
            window.location.reload();
        } else {
            // Load test user
            document.cookie = 'testUser=1; path=/; max-age=86400'; // 24 hours
            setIsTestUser(true);
            window.location.reload();
        }
    };

    return (
        <button
            onClick={toggleTestUser}
            className={`fixed bottom-8 left-8 z-50 px-4 py-2 rounded-lg shadow-lg border-2 border-primary text-sm font-medium hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                isTestUser ? "bg-primary text-white" : "bg-white text-primary"
            }`}
            title={isTestUser ? "Remove test user" : "Load test user"}
        >
            {isTestUser ? (
                <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Test User ON
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Load Test User
                </span>
            )}
        </button>
    );
}
