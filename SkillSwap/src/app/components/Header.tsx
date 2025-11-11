"use client";

import { useState } from "react";
import type { AppContext } from "@/worker";
import ProfileMenuFlyout from "./profile/HeaderMenuFlyout";
import SearchBar from "./SearchBar";
import { colors } from "../theme";

interface HeaderProps {
  ctx?: AppContext;
}

export default function Header({ ctx }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 sm:gap-3 z-20 flex-shrink-0 group">
          <div className="relative">
            <img
              src="/src/app/assets/logo.png"
              alt="Logo"
              className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: colors.primary.main }}
            />
          </div>
          <h1
            className="text-xl sm:text-2xl font-bold transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.secondary.emerald})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            SkillSwap
          </h1>
        </a>

        {/* Spacer to push navigation/icons to the right */}
        <div className="flex-1"></div>
        {/* Desktop Navigation - Hidden on mobile/small tablet */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-700 flex-shrink-0">
          {/* Desktop Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-lg transition-all duration-200 cursor-pointer"
            style={{ backgroundColor: colors.primary.main }}
            aria-label="Toggle search"
            aria-expanded={isSearchOpen}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary.hover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
          >
            <svg
              className="w-6 h-6 transition-colors"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <a
            href="/explore"
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50"
            style={{ color: colors.neutral.gray[700] }}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.primary.main}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.neutral.gray[700]}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span className="hidden lg:inline">Explore</span>
          </a>
          <a
            href="/contact"
            className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50"
            style={{ color: colors.neutral.gray[700] }}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.primary.main}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.neutral.gray[700]}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="hidden lg:inline">Help</span>
          </a>

          {/* Icon Buttons with Badge Support */}
          <div className="flex items-center gap-2">
            <a
              href="/profile/notifications"
              className="relative p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 group"
              aria-label="Notifications"
            >
              <svg
                className="w-6 h-6 transition-colors"
                fill="none"
                stroke={colors.neutral.gray[600]}
                viewBox="0 0 24 24"
                onMouseEnter={(e) => e.currentTarget.setAttribute('stroke', colors.primary.main)}
                onMouseLeave={(e) => e.currentTarget.setAttribute('stroke', colors.neutral.gray[600])}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* Notification badge */}
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.secondary.emerald }}
              />
            </a>

            <a
              href="/profile/messages"
              className="relative p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 group"
              aria-label="Messages"
            >
              <svg
                className="w-6 h-6 transition-colors"
                fill="none"
                stroke={colors.neutral.gray[600]}
                viewBox="0 0 24 24"
                onMouseEnter={(e) => e.currentTarget.setAttribute('stroke', colors.primary.main)}
                onMouseLeave={(e) => e.currentTarget.setAttribute('stroke', colors.neutral.gray[600])}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          {/* Profile Menu or Sign Up */}
          <div className="ml-2">
            <ProfileMenuFlyout user={ctx?.user} />
          </div>
        </nav>

        {/* Mobile Icons Group - Search and Hamburger */}
        <div className="md:hidden flex items-center gap-2 flex-shrink-0">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-lg transition-all duration-200 cursor-pointer"
            style={{ backgroundColor: colors.primary.main }}
            aria-label="Toggle search"
            aria-expanded={isSearchOpen}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary.hover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
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
                className={`block h-0.5 w-full rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                style={{ backgroundColor: isMobileMenuOpen ? colors.primary.main : colors.neutral.gray[700] }}
              ></span>
              <span
                className={`block h-0.5 w-full rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                style={{ backgroundColor: colors.neutral.gray[700] }}
              ></span>
              <span
                className={`block h-0.5 w-full rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                style={{ backgroundColor: isMobileMenuOpen ? colors.primary.main : colors.neutral.gray[700] }}
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
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              style={{ color: colors.neutral.gray[700] }}
              aria-label="Close search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Sidebar */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-lg font-semibold" style={{ color: colors.primary.main }}>Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke={colors.neutral.gray[700]} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3" role="list">
              <li>
                <a
                  href="/explore"
                  className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all cursor-pointer group"
                  onClick={() => setIsMobileMenuOpen(false)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.primary.main}10`}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="font-medium">Explore</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all cursor-pointer group"
                  onClick={() => setIsMobileMenuOpen(false)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.primary.main}10`}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium">Contact us</span>
                </a>
              </li>

              {/* Divider */}
              <li className="my-3">
                <hr className="border-gray-100" />
              </li>

              <li>
                <a
                  href="/profile/notifications"
                  className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all cursor-pointer group"
                  onClick={() => setIsMobileMenuOpen(false)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.primary.main}10`}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div className="relative mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.secondary.emerald }}
                    />
                  </div>
                  <span className="font-medium">Notifications</span>
                </a>
              </li>
              <li>
                <a
                  href="/profile/messages"
                  className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all cursor-pointer group"
                  onClick={() => setIsMobileMenuOpen(false)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.primary.main}10`}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Messages</span>
                </a>
              </li>

              {/* Divider */}
              <li className="my-3">
                <hr className="border-gray-100" />
              </li>

              {/* Profile Section */}
              {ctx?.user ? (
                <>
                  <li>
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all cursor-pointer group"
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.primary.main}10`}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium">Your page</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/profile/settings"
                      className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all cursor-pointer group"
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.primary.main}10`}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Settings</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="/help"
                      className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all cursor-pointer group"
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.primary.main}10`}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Help</span>
                    </a>
                  </li>

                  <li className="my-3">
                    <hr className="border-gray-100" />
                  </li>
                  <li>
                    <a
                      href="/logout"
                      className="flex items-center px-4 py-3 rounded-lg transition-all cursor-pointer group"
                      style={{ color: colors.semantic.error.text }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.semantic.error.bg}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Log Out</span>
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a
                      href="/login"
                      className="flex items-center justify-center mx-3 py-3 px-4 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
                      style={{ backgroundColor: colors.primary.main }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary.hover}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
                    >
                      Sign In
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href="/register"
                      className="flex items-center justify-center mx-3 py-3 px-4 rounded-lg font-semibold transition-all cursor-pointer"
                      style={{
                        borderWidth: '2px',
                        borderColor: colors.primary.main,
                        color: colors.primary.main
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.primary.main;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = colors.primary.main;
                      }}
                    >
                      Sign Up
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
