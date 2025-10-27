import { db } from "../../db";
import { reviews, type Review, type InsertReview } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Result } from "../../types/results";
import { CrudRepository } from "@/types/crud";

export type ReviewsQueryParams = {
    receiverId?: number | string;
    reviewerId?: number | string;
    offset?: number | string;
    limit?: number | string;
};

// Repository interface for managing reviews
export interface ReviewsRepository
  extends CrudRepository<Review, InsertReview, Partial<InsertReview>, ReviewsQueryParams> {}

const toNumber = (value?: number | string) => (typeof value === "string" ? Number(value) : value);

export function createReviewsRepository(): ReviewsRepository {
    return {
        
    }
}