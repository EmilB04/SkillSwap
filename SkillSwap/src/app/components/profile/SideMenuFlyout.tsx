"use client";

import { useState, useEffect } from "react";

export default function SideMenuFlyout() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentPath, setCurrentPath] = useState("");

    // Get current path on client
    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    // Load state from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('sideMenuExpanded');
        if (saved !== null) setIsExpanded(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('sideMenuExpanded', JSON.stringify(isExpanded));
    }, [isExpanded]);

    const menuItems = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            label: "Your page",
            href: "/profile"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            label: "Edit profile",
            href: "/profile/edit"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            ),
            label: "Notification",
            href: "/profile/notifications"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: "Messages",
            href: "/profile/messages"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: "Settings",
            href: "/profile/settings"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: "Help",
            href: "/contact"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            ),
            label: "Log Out",
            href: "/logout",
            isLogout: true
        }
    ];

    return (
        <div className="relative flex">
            {/* Side Menu */}
            <nav
                className={`
                    bg-white border-r border-gray-200 shadow-lg
                    transition-all duration-300 ease-in-out
                    ${isExpanded ? 'w-64' : 'w-20'}
                    min-h-screen
                `}
            >
                {/* Toggle Button */}
                <div className="p-4 border-b border-gray-200 flex justify-end">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
                    >
                        <svg
                            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                {/* Menu Items */}
                <ul className="py-4">
                    {menuItems.map((item, index) => {
                        const isActive = currentPath === item.href;
                        const isLogout = 'isLogout' in item && item.isLogout;
                        return (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className={`
                                        flex items-center px-6 py-3 transition-colors
                                        ${isLogout
                                            ? 'text-red-600 hover:bg-red-50'
                                            : isActive 
                                                ? 'bg-gray-100 text-gray-900' 
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                                    `}
                                >
                                    <span className={`flex-shrink-0 ${isLogout ? 'text-red-600' : 'text-gray-500'}`}>
                                        {item.icon}
                                    </span>
                                    <span
                                        className={`
                                            ml-4 whitespace-nowrap
                                            transition-all duration-300
                                            ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                                            ${isActive ? 'font-bold' : 'font-medium'}
                                        `}
                                    >
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}