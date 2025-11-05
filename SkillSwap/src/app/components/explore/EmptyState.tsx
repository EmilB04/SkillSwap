"use client";

import { colors } from '../../theme';

interface EmptyStateProps {
    onClearFilters: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
    return (
        <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
            <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke={colors.neutral.gray[400]} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Opportunities Found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Try adjusting your filters or search terms to find more opportunities
            </p>
            <button
                className="px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                style={{ backgroundColor: colors.primary.main }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary.hover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
                onClick={onClearFilters}
            >
                Clear All Filters
            </button>
        </div>
    );
}
