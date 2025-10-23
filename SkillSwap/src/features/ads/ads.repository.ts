import { db } from "../../db";
import { ads, type Ad, type InsertAd } from "../../db/schema/ads";
import { eq, desc } from "drizzle-orm";
import type { Result } from "../../types/results";

export type AdsQueryParams = {
    userId?: number | string;
    limit?: number | string;
    offset?: number | string;
};

export interface AdsRepository {
    findMany(params?: AdsQueryParams): Promise<Result<Ad[]>>;
    findById(id: string): Promise<Result<Ad>>;
    create(ad: InsertAd): Promise<Result<Ad>>;
    update(id: string, patch: Partial<InsertAd>): Promise<Result<Ad>>;
}

// Factory function to create an AdsRepository instance
export function createAdsRepository(): AdsRepository {
    return {
        // Find multiple ads with optional filtering, pagination, and ordering
        async findMany(params = {}) {
            try {
                const toNumber = (value: number | string | undefined) => {
                    return typeof value === "string" ? Number(value) : value;
                };

                const userId = toNumber(params.userId);
                const limit = Math.min(Math.max(toNumber(params.limit) ?? 20, 1), 100);
                const offset = Math.max(toNumber(params.offset) ?? 0, 0);

                const query = db.select().from(ads);
                const finalQuery = typeof userId === "number"
                    ? query.where(eq(ads.userId, userId))
                    : query;

                const rows = await finalQuery
                    .orderBy(desc(ads.createdAt))
                    .limit(limit)
                    .offset(offset);
                
                return { success: true, data: rows };
            } catch (error) {
                return {
                    success: false,
                    error: {
                        code: 500,
                        message: (error as Error)?.message ?? "Failed to fetch ads from database",
                    },
                };
            }
        },

        // Find a single ad by its ID
        async findById(id: string) {
            try {
                const ad = await db.query.ads.findFirst({
                    where: eq(ads.id, id),
                    with: { user: true },
                });

                if (!ad) {
                    return { success: false, error: { code: 404, message: "Ad not found" } };
                }
                return { success: true, data: ad };
            } catch (error) {
                return {
                    success: false,
                    error: {
                        code: 500,
                        message: (error as Error)?.message ?? "Failed to fetch ad from database",
                    },
                };
            }
        },

        async create(ad: InsertAd) {
            return { success: false, error: { message: "not implemented", code: 501 } };
        },
        async update(id: string, patch: Partial<InsertAd>) {
            return { success: false, error: { message: "not implemented", code: 501 } };
        }
    };
}