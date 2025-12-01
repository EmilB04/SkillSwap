"use client";

import { useState } from 'react';
import { colors, borderRadius, shadows, transition } from '../theme';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = encodeURIComponent(searchQuery.trim());
      window.location.href = `/explore?q=${query}`;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for skills, services, or people..."
          className="w-full px-6 py-3 pr-24 border border-gray-300 focus:outline-none text-gray-900 placeholder-gray-400"
          style={{
            fontSize: '16px',
            borderRadius: borderRadius.lg,
            transition: `all ${transition.normal} ease`,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = colors.primary.main;
            e.currentTarget.style.boxShadow = shadows.subtle;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <button
          type="submit"
          className="absolute right-2 px-4 py-2 text-white font-medium cursor-pointer"
          style={{ 
            backgroundColor: colors.primary.main,
            borderRadius: borderRadius.md,
            transition: `all ${transition.quick} ease`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary.hover;
            e.currentTarget.style.boxShadow = shadows.soft;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary.main;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </span>
        </button>
      </div>
    </form>
  );
}
