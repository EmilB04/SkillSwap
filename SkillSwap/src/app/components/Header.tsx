"use client";

import { useState, useRef, useEffect } from "react";
import type { AppContext } from "@/worker";
import ProfileMenuFlyout from "./profile/HeaderMenuFlyout";
import SearchBar from "./SearchBar";
import { colors } from "../theme";

interface HeaderProps {
  ctx?: AppContext;
}

export default function Header({ ctx }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when pressing ESC or clicking outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    const outsideClickListener = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen || isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", outsideClickListener);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", outsideClickListener);
    };
  }, [isSearchOpen, isMobileMenuOpen]);

  return (
    <header className="relative bg-white/95 backdrop-blur-md shadow-sm top-0 border-b border-gray-100 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group"
        >
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
            style={{ color: colors.primary.main }}
          >
            SkillSwap
          </h1>
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg focus:outline-none hover:bg-gray-100 transition cursor-pointer"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3 text-gray-700 flex-shrink-0">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-expanded={isSearchOpen}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer"
            style={{ backgroundColor: colors.primary.main, color: "white" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <a
            href="/explore"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            Explore
          </a>
          <a
            href="/new-add"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Add
          </a>
          <a
            href="/profile/notifications"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            Notifications
          </a>

          <ProfileMenuFlyout user={ctx?.user} />
        </nav>
      </div>

      {/* Mobile Nav (slide down) */}
      <div
        className={`md:hidden transform transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-sm ${isMobileMenuOpen
            ? "max-h-[400px] opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
          } overflow-hidden`}
      >
        <div className="flex flex-col space-y-1 px-4 py-3 text-gray-700">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer"
            style={{ backgroundColor: colors.primary.main, color: "white" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </button>

          <a
            href="/explore"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 hover:text-primary transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            Explore
          </a>
          <a
            href="/new-add"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 hover:text-primary transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Add
          </a>
          <a
            href="/profile/notifications"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 hover:text-primary transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            Notifications
          </a>

          <div className="pt-2 border-t border-gray-200">
            <ProfileMenuFlyout user={ctx?.user} />
          </div>
        </div>
      </div>

      {/* Search Dropdown */}
      <div
        ref={dropdownRef}
        className={`absolute left-0 right-0 border-t border-gray-100 shadow-lg bg-white/95 backdrop-blur-md transition-all duration-300 ease-out ${isSearchOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-3 invisible"
          }`}
        style={{
          top: "100%",
          zIndex: 50,
        }}
      >
        <div className="flex items-center gap-2 max-w-7xl mx-auto px-4 py-3">
          <div className="flex-1">
            <SearchBar
              onSearch={(query: string) => {
                if (query && query.trim()) {
                  window.location.href = `/explore?q=${encodeURIComponent(query)}`;
                }
              }}
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-50 text-gray-700 transition cursor-pointer"
            aria-label="Close search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}