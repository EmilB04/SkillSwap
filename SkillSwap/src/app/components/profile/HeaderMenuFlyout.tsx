"use client";

import { useState, useEffect, useRef } from "react";
import type { UserProfile } from "./profileData";

interface ProfileMenuFlyoutProps {
    user?: UserProfile | null;
}

export default function ProfileMenuFlyout({ user }: ProfileMenuFlyoutProps) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const isLoggedIn = !!user;
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false);
            }
        };

        if (showProfileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showProfileMenu]);

    const toggleMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    return (
        <nav aria-label="User account navigation">
            {isLoggedIn ? (
                <div
                    className="relative"
                    ref={menuRef}
                >
                    <button
                        onClick={toggleMenu}
                        className="flex items-center cursor-pointer bg-transparent border-none p-0"
                        aria-label="Profile menu"
                        aria-expanded={showProfileMenu}
                        aria-haspopup="true"
                    >
                        <img src="./src/app/assets/icons/boy-icon.png" alt="Profile" className="h-6 w-6" />
                    </button>

                    {/* Dropdown Menu */}
                    {showProfileMenu && (
                        <menu
                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                            role="menu"
                            aria-label="Profile menu options"
                        >
                            <li role="none">
                                <a
                                    href="/profile"
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    role="menuitem"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Your page</span>
                                </a>
                            </li>
                            <li role="none">
                                <a
                                    href="/profile/settings"
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    role="menuitem"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li role="none">
                                <a
                                    href="/help"
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    role="menuitem"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Help</span>
                                </a>
                            </li>
                            <li role="separator" className="border-t border-gray-200 my-2" aria-hidden="true"></li>
                            <li role="none">
                                <a
                                    href="/logout"
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    role="menuitem"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Log Out</span>
                                </a>
                            </li>
                        </menu>
                    )}
                </div>
            ) : (
                <a
                    href="/login"
                    className="text-center text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
                    style={{ backgroundColor: '#438C86' }}
                    aria-label="Sign in to your account"
                >
                    Sign In
                </a>
            )}
        </nav>
    );
}
