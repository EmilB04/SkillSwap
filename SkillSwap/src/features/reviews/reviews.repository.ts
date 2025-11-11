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
        async findMany(params = {}) {
            try {
                const receiverId = toNumber(params.receiverId);
                const reviewerId = toNumber(params.reviewerId);
                const limit = Math.min(Math.max(toNumber(params.limit) ?? 20, 1), 100);
                const offset = Math.max(toNumber(params.offset) ?? 0, 0);

                const query = db.select().from(reviews);
                
                const finalQuery = typeof receiverId === "number"
                    ? query.where(eq(reviews.receiverId, receiverId))
                    : typeof reviewerId === "number"
                    ? query.where(eq(reviews.reviewerId, reviewerId))
                    : query;

                const rows = await finalQuery
                    .orderBy(desc(reviews.createdAt))
                    .limit(limit)
                    .offset(offset);
                    
                return { success: true, data: rows };

            } catch (error) {
                return { success: false, error: {
                    code: 500,
                    message: (error as Error)?.message ?? "Failed to fetch reviews from database"},
                };
            }
        }, 

        async findById(id: string) {
            try {
                const row = await db.query.reviews.findFirst({
                    where: (r: typeof reviews) => eq(r.id, id),
                    with: {
                        reviewer: true,
                        receiver: true
                    }
                });

                if (!row) {
                    return { success: false, error: { code: 404, message: "Review not found" } };
                }
                return { success: true, data: row };
            } catch (error) {
                return {
                    success: false,
                    error: { code: 500, message: (error as Error)?.message ?? "Failed to fetch review from database" },
                };
            }
        },

        async create(data: InsertReview) {
            try {
                const [row] = await db
                    .insert(reviews)
                    .values({
                        reviewerId: data.reviewerId,
                        receiverId: data.receiverId,
                        rating: data.rating,
                        reviewText: data.reviewText ?? null,
                    })
                    .returning();
                return { success: true, data: row };

                    } catch (error) {
                        return {
                            success: false,
                            error: { code: 500, message: (error as Error)?.message ?? "Failed to create review in database"},
                        };
                    }
        },

        async update(id: string, patch: Partial<InsertReview>) {
            try {
                const [row] = await db
                    .update(reviews)
                    .set({
                        rating: patch.rating,
                        reviewText: patch.reviewText,
                    } as any)
                    .where(eq(reviews.id, id))
                    .returning();
                    
                if (!row) {
                    return { success: false, error: { code: 404, message: "Review not found" } };
                }
                return { success: true, data: row };

                    } catch (error) {
                        return {
                            success: false,
                            error: { code: 500, message: (error as Error)?.message ?? "Failed to update review in database"},
                    };
            }
        },
    };
}

export const reviewsRepository = createReviewsRepository();