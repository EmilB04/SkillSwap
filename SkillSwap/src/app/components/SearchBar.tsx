"use client";

import { useState } from 'react';

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
          className="w-full px-6 py-3 pr-24 text-base border border-gray-300 rounded-lg focus:border-primary focus:shadow-subtle focus:outline-none text-gray-900 placeholder-gray-400 transition-all duration-[280ms]"
        />
        <button
          type="submit"
          className="absolute right-2 px-4 py-2 rounded-md bg-primary hover:bg-primary-hover hover:shadow-soft text-white font-medium cursor-pointer transition-all duration-[140ms]"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}
