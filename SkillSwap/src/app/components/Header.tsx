"use client";

import { useState } from "react";
import type { AppContext } from "@/worker";
import ProfileMenuFlyout from "./profile/HeaderMenuFlyout";
import SearchBar from "./SearchBar";

interface HeaderProps {
  ctx?: AppContext;
}

export default function Header({ ctx }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm top-0 z-50 border-b border-gray-100">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 sm:gap-3 z-20 flex-shrink-0 group">
          <div className="relative">
            <img
              src="/src/app/assets/logo.png"
              alt="Logo"
              className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary transition-all duration-300">
            SkillSwap
          </h1>
        </a>

        {/* Spacer to push navigation/icons to the right */}
        <div className="flex-1"></div>
        {/* Desktop Navigation - Hidden on mobile/small tablet */}
        <nav className="hidden md:flex items-center gap-3 text-gray-700 flex-shrink-0">
          {/* Desktop Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200 cursor-pointer"
            aria-label="Toggle search"
            aria-expanded={isSearchOpen}
          >
            <svg
              className="w-5 h-5 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <a
            href="/explore"
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span className="hidden lg:inline text-sm">Explore</span>
          </a>
          <a
            href="/new-add"
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden lg:inline text-sm">New Add</span>
          </a>

          <a
            href="/profile/notifications"
            className="relative flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200"
            aria-label="Notifications"
          >
            <svg
              className="w-5 h-5 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary-mint rounded-full" />
            <span className="hidden xl:inline text-sm font-medium">Notifications</span>
          </a>

          {/* Profile Menu or Sign Up */}
          <ProfileMenuFlyout user={ctx?.user} />
        </nav>

        {/* Mobile Icons Group - Search and Hamburger */}
        <div className="md:hidden flex items-center gap-2 flex-shrink-0">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-lg bg-primary hover:bg-primary-hover transition-all duration-200 cursor-pointer"
            aria-label="Toggle search"
            aria-expanded={isSearchOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="z-20 p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2 bg-primary" : "bg-gray-700"
                  }`}
              ></span>
              <span
                className={`block h-0.5 w-full rounded-full bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                  }`}
              ></span>
              <span
                className={`block h-0.5 w-full rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-primary" : "bg-gray-700"
                  }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Expandable Search Bar Overlay - Expands below header when search icon is clicked */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg z-30 px-4 py-3 animate-slideDown">
          <div className="flex items-center gap-2 max-w-7xl mx-auto">
            <div className="flex-1">
              <SearchBar />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg z-20 animate-slideDown">
          <nav className="flex flex-col px-4 py-3 space-y-1">
            <a
              href="/explore"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="font-medium">Explore</span>
            </a>
            <a
              href="/new-add"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-medium">New Add</span>
            </a>
            <a
              href="/profile/notifications"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="font-medium">Notifications</span>
            </a>
            <div className="border-t border-gray-200 pt-2 mt-2">
              {ctx?.user ? (
                <>
                  <a
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Profile</span>
                  </a>
                  <a
                    href="/logout"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Log Out</span>
                  </a>
                </>
              ) : (
                <a
                  href="/login"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Login</span>
                </a>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
