"use client";

import { colors } from '../../theme';

interface ResultsSummaryProps {
    count: number;
    searchQuery: string;
}

export default function ResultsSummary({ count, searchQuery }: ResultsSummaryProps) {
    return (
        <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-700 font-medium">
                {count > 0 ? (
                    <>
                        Showing <span className="font-bold" style={{ color: colors.primary.main }}>
                            {count}
                        </span> {count === 1 ? 'opportunity' : 'opportunities'}
                        {searchQuery && (
                            <> for <span className="font-bold">"{searchQuery}"</span></>
                        )}
                    </>
                ) : (
                    <span className="text-gray-500">No opportunities found</span>
                )}
            </p>
        </div>
    );
}
