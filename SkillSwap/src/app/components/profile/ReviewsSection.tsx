import { ReviewCard } from "./ReviewCard";

interface Review {
    id: string;
    rating: number;
    reviewText?: string | null;
    createdAt: string;
    reviewer?: {
        name: string;
    } | null;
}

interface ReviewsSectionProps {
    reviews: Review[];
    maxDisplay?: number;
}

export function ReviewsSection({ reviews, maxDisplay = 5 }: ReviewsSectionProps) {
    if (reviews.length === 0) {
        return null;
    }

    const displayedReviews = reviews.slice(0, maxDisplay);
    const hasMore = reviews.length > maxDisplay;

    return (
        <section className="bg-white rounded-lg shadow-md p-6 mb-6" aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Reviews ({reviews.length})
            </h2>
            <div className="space-y-4">
                {displayedReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
                {hasMore && (
                    <button
                        className="w-full py-2 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
                        onClick={() => alert('View all reviews functionality coming soon!')}
                    >
                        View all {reviews.length} reviews →
                    </button>
                )}
            </div>
        </section>
    );
}
