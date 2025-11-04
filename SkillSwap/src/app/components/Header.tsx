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
    <header className="bg-white shadow relative">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 sm:gap-3 z-20 flex-shrink-0">
          <img src="/src/app/assets/logo.png" alt="Logo" className="h-10 sm:h-12 w-auto" />
          <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#439F8F] via-[#48ECA1] to-[#394251] bg-clip-text text-transparent inline-block whitespace-nowrap">
            SkillSwap
          </h1>
        </a>

        {/* Desktop Search Bar - Always visible on medium+ screens */}
        <div className="hidden md:flex flex-1 min-w-0 max-w-2xl justify-center">
          <SearchBar />
        </div>

        {/* Spacer to push navigation/icons to the right */}
        <div className="flex-1 md:hidden"></div>

        {/* Desktop Navigation - Hidden on mobile/small tablet */}
        <nav className="hidden md:flex items-center gap-6 xl:gap-10 text-gray-700 flex-shrink-0">
          <a href="/explore" className="hover:text-green-600 transition-colors"> Explore </a>
          <a href="/contact" className="hover:text-green-600 transition-colors"> Contact us </a>
          <a href="/profile/notifications" className="flex items-center hover:opacity-70 transition-opacity">
            <img src="./src/app/assets/icons/notification-icon.png" alt="Notifications" className="h-6 w-6" />
          </a>
          <a href="/profile/messages" className="flex items-center hover:opacity-70 transition-opacity">
            <img src="./src/app/assets/icons/email-icon.png" alt="Messages" className="h-6 w-6" />
          </a>

          {/* Profile Menu or Sign Up */}
          <ProfileMenuFlyout user={ctx?.user} />
        </nav>

        {/* Mobile Icons Group - Search and Hamburger */}
        <div className="md:hidden flex items-center gap-2 flex-shrink-0">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle search"
            aria-expanded={isSearchOpen}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="z-20 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                  }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Overlay - Expands below header when search icon is tapped */}
      {isSearchOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-md z-30 px-4 py-3 animate-slideDown">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <SearchBar />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Sidebar */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end p-4 border-b border-gray-200">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1" role="list">
              <li>
                <a
                  href="/explore"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Explore
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact us
                </a>
              </li>

              {/* Divider */}
              <li className="my-2">
                <hr className="border-gray-200" />
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notifications
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Messages
                </a>
              </li>

              {/* Divider */}
              <li className="my-2">
                <hr className="border-gray-200" />
              </li>

              {/* Profile Section */}
              {ctx?.user ? (
                <>
                  <li>
                    <a
                      href="/profile"
                      className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Your page
                    </a>
                  </li>
                  <li>
                    <a
                      href="/profile/settings"
                      className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </a>
                  </li>

                  <li>
                    <a href="/help" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Help
                    </a>
                  </li>

                  <li className="my-2">
                    <hr className="border-gray-200" />
                  </li>
                  <li>
                    <a
                      href="/logout"
                      className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log Out
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a
                      href="/login"
                      className="flex items-center justify-center mx-6 py-2 px-4 bg-gradient-to-r from-[#439F8F] to-[#48ECA1] text-white rounded-lg hover:opacity-90 transition-opacity font-medium cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href="/register"
                      className="flex items-center justify-center mx-6 py-2 px-4 border-2 border-[#439F8F] text-[#439F8F] rounded-lg hover:bg-[#439F8F] hover:text-white transition-all font-medium cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
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
