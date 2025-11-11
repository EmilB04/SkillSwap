import type { Result } from "../../types/results";
import { reviewsRepository, type ReviewsRepository } from "./reviews.repository";
import type { Review, InsertReview } from "../../db/schema/reviews";
import type { ReviewsQueryParams } from "./reviews.repository";
import type { CrudService, WithDelete } from "../../types/crud";

// Service interface for managing reviews
export interface ReviewsService 
    extends CrudService<Review, InsertReview, Partial<InsertReview>, ReviewsQueryParams> {}

export function createReviewsService(repository: ReviewsRepository): ReviewsService {
    return {
        // List multiple reviews based on query parameters
        async list (params = {}) {
            const repositoryResults = await repository.findMany(params);
            if (!repositoryResults.success) return repositoryResults;
            return { success: true, data: repositoryResults.data ?? [] };
        },
        // Get a single review by its ID
        async getById(id: string) {
            const repositoryResults = await repository.findById(id);
            if (!repositoryResults.success) return repositoryResults;
            return { success: true, data: repositoryResults.data}; 
        },
        // Create a new review
        async create(data: InsertReview) {
            if (data.reviewerId === data.receiverId) {
                return { success: false, error: { code: 400, message: "Reviewer and receiver cannot be the same user." } };
            }
            if (data.rating < 1 || data.rating > 5) {
                return { success: false, error: { code: 400, message: "Rating must be between 1 and 5." } };
            }
            return repository.create(data);
        },
        // Update an existing review
        async update(id: string, patch: Partial<InsertReview>) {
            if (patch.rating !== undefined && (patch.rating < 1 || patch.rating > 5)) {
                return { success: false, error: { code: 400, message: "Rating must be between 1 and 5" } };
            }
            return repository.update(id, patch);
        },
    };
}

export const reviewsService = createReviewsService(reviewsRepository);