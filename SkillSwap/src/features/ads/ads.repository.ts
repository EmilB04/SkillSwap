import { db } from "../../db";
import { ads, type Ad, type InsertAd } from "../../db/schema/ads";
import { eq, desc } from "drizzle-orm";
import type { Result } from "../../types/results";

export interface AdsRepository {
    findMany(params?: { userId?: number; limit?: number; offset?: number;}): Promise<Result<Ad[]>>;
    findById(id: string): Promise<Result<Ad>>;
    create(ad: InsertAd): Promise<Result<Ad>>;
    update(id: string, patch: Partial<InsertAd>): Promise<Result<Ad>>;
}

export function createAdsRepository(): AdsRepository {
    return {
        async findMany(params = {}) {
            const limit = Math.min(Math.max(params.limit ?? 20, 1), 100);
            const offset = Math.max(params.offset ?? 0, 0);
            try {
                const query = db.select().from(ads)
                    .orderBy(desc(ads.createdAt as any))
                    .limit(limit)
                    .offset(offset);

                const rows = params.userId
                    ? await query.where(eq(ads.userId as any, params.userId))
                    : await query;

                return { success: true, data: rows };
            } catch (error) {
                return { success: false, error: { message: (error as Error).message ?? "failed to list ads", code: 500 } };
            }
        },

        
        async findById(id: string) {
            return { success: false, error: { message: "not implemented", code: 501 } };
        },
        async create(ad: InsertAd) {
            return { success: false, error: { message: "not implemented", code: 501 } };
        },
        async update(id: string, patch: Partial<InsertAd>) {
            return { success: false, error: { message: "not implemented", code: 501 } };
        }
    };
}