import { db } from "../../db";
import { ads, type Ad, type InsertAd } from "../../db/schema/ads";
import { eq, desc } from "drizzle-orm";
import type { Result } from "../../types/results";
import { CrudRepository } from "@/types/crud";

export type AdsQueryParams = {
    userId?: number | string;
    limit?: number | string;
    offset?: number | string;
};

export interface AdsRepository
  extends CrudRepository<Ad, InsertAd, Partial<InsertAd>, AdsQueryParams> {
  delete(id: string): Promise<Result<{ deleted: boolean }>>; 
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

        // Create a new ad in the database
        async create(data: InsertAd) {
            try {
                const [row] = await db
                .insert(ads)
                .values({
                    title: data.title,
                    description: data.description,
                    userId: data.userId,
                })
                .returning();
                
                return { success: true, data: row };
            } catch (error) {
                return {
                    success: false,
                    error: {
                        code: 500,
                        message: (error as Error)?.message ?? "Failed to create ad in database",
                    },
                };   
            }
        },

        // Update an existing ad by its ID
        async update(id, data) {
            try {
                const [row] = await db
                .update(ads)
                .set({
                    title: data.title,
                    description: data.description,
                })
                .where(eq(ads.id, id))
                .returning();

                if (!row) {
                    return { success: false, error: { code: 404, message: "Ad not found" } };
                }
                
                return { success: true, data: row };
            } catch (error) {
                return {
                    success: false,
                    error: {
                        code: 500,
                        message: (error as Error)?.message ?? "Failed to update ad in database",
                    },
                }
            }
        },

        // Delete an ad by its ID
        async delete(id) {
            try {
                const result = await db.delete(ads).where(eq(ads.id, id));
                const deleted = (result as any)?.rowsAffected ? (result as any).rowsAffected > 0 : true;
                if (!deleted) return { success: false, error: { code: 404, message: "Ad not found" } };
                return { success: true, data: { deleted: true } };
            } catch (error) {
                return { success: false, error: { code: 500, message: (error as Error)?.message ?? "Failed to delete ad from database" }};
            }
        }
    };
}

export const adsRepository = createAdsRepository();