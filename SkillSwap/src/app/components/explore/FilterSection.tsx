"use client";

import { colors } from '../../theme';

interface FilterSectionProps {
    filters: {
        category: string;
        dateRange: string;
        payment: string;
    };
    searchQuery: string;
    onFilterChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    onSearch: () => void;
    onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

import React, { useState } from "react";

export default function FilterSection({ filters, searchQuery, onFilterChange, onSearch, onSearchInputChange }: FilterSectionProps) {
    const [showSearchInput, setShowSearchInput] = useState(false);

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 sm:p-8 mb-12">
            <div className="flex items-center gap-2 mb-6">
                <svg className="w-6 h-6" fill="none" stroke={colors.primary.main} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Filter & Find</h2>
            </div>

            <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
                {/* Sort By */}
                <div className="flex flex-col">
                    <label htmlFor="sortBy" className="block font-semibold mb-2 text-gray-700">Sort By</label>
                    <select 
                        id="sortBy" 
                        name="sortBy" 
                        className="p-3 border-2 rounded-lg text-base transition-all duration-200 focus:outline-none cursor-pointer"
                        style={{ 
                            borderColor: colors.neutral.gray[300],
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                        onBlur={(e) => e.currentTarget.style.borderColor = colors.neutral.gray[300]}
                        value={""}
                        onChange={onFilterChange}
                    >
                        <option value="">Relevance</option>
                        <option value="new">Newest</option>
                        <option value="popular">Most Popular</option>
                        <option value="high-paid">Highest Paid</option>
                        <option value="low-paid">Lowest Paid</option>
                    </select>
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label htmlFor="category" className="block font-semibold mb-2 text-gray-700">Category</label>
                    <select 
                        id="category" 
                        name="category" 
                        className="p-3 border-2 rounded-lg text-base transition-all duration-200 focus:outline-none cursor-pointer"
                        style={{ 
                            borderColor: colors.neutral.gray[300],
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                        onBlur={(e) => e.currentTarget.style.borderColor = colors.neutral.gray[300]}
                        value={filters.category}
                        onChange={onFilterChange}
                    >
                        <option value="all">All Categories</option>
                        <option value="design">Design</option>
                        <option value="development">Development</option>
                        <option value="language">Language</option>
                        <option value="gardening">Gardening</option>
                        <option value="cooking">Cooking</option>
                        <option value="tutoring">Tutoring</option>
                    </select>
                </div>

                {/* Date Range */}
                <div className="flex flex-col">
                    <label htmlFor="dateRange" className="block font-semibold mb-2 text-gray-700">Time Period</label>
                    <select 
                        id="dateRange" 
                        name="dateRange" 
                        className="p-3 border-2 rounded-lg text-base transition-all duration-200 focus:outline-none cursor-pointer"
                        style={{ 
                            borderColor: colors.neutral.gray[300],
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                        onBlur={(e) => e.currentTarget.style.borderColor = colors.neutral.gray[300]}
                        value={filters.dateRange}
                        onChange={onFilterChange}
                    >
                        <option value="alltime">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">Next Month</option>
                        <option value="3months">Next 3 Months</option>
                        <option value="6months">Next 6 Months</option>
                    </select>
                </div>

                {/* Payment Type */}
                <div className="flex flex-col justify-end">
                    <label className="block font-semibold mb-2 text-gray-700">Payment Type</label>
                    <div className="flex gap-3 p-3">
                        <div className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                id="all-payment" 
                                name="payment" 
                                value=""
                                checked={filters.payment === ''}
                                onChange={onFilterChange}
                                className="w-5 h-5 cursor-pointer" 
                                style={{ accentColor: colors.primary.main }}
                            />
                            <label htmlFor="all-payment" className="text-base cursor-pointer">All</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                id="cash" 
                                name="payment" 
                                value="cash"
                                checked={filters.payment === 'cash'}
                                onChange={onFilterChange}
                                className="w-5 h-5 cursor-pointer" 
                                style={{ accentColor: colors.primary.main }}
                            />
                            <label htmlFor="cash" className="text-base cursor-pointer">Cash</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                id="swap" 
                                name="payment" 
                                value="swap"
                                checked={filters.payment === 'swap'}
                                onChange={onFilterChange}
                                className="w-5 h-5 cursor-pointer" 
                                style={{ accentColor: colors.primary.main }}
                            />
                            <label htmlFor="swap" className="text-base cursor-pointer">Swap</label>
                        </div>
                    </div>
                </div>
            </form>

            {/* Search Button & Field below filters */}
            <div className="mt-6 flex flex-col items-stretch">
                {showSearchInput ? (
                    <div className="flex gap-2 items-center">
                        <input
                            type="text"
                            className="flex-1 p-3 border-2 rounded-lg text-base focus:outline-none"
                            style={{ borderColor: colors.neutral.gray[300] }}
                            placeholder="Type to search..."
                            value={searchQuery}
                            onChange={onSearchInputChange}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    onSearch();
                                }
                            }}
                            autoFocus
                        />
                        <button
                            type="button"
                            className="px-4 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                            style={{ backgroundColor: colors.primary.main }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.primary.hover}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = colors.primary.main}
                            onClick={e => {
                                e.preventDefault();
                                onSearch();
                            }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Go
                        </button>
                        <button
                            type="button"
                            className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={() => setShowSearchInput(false)}
                            title="Close search"
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
                ) : (
                    <button
                        type="button"
                        className="w-full px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                        style={{ backgroundColor: colors.primary.main }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = colors.primary.hover}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = colors.primary.main}
                        onClick={e => {
                            e.preventDefault();
                            setShowSearchInput(true);
                        }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search
                    </button>
                )}
            </div>
        </div>
    );
}
