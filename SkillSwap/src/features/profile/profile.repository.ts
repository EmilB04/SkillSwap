import { db } from "../../db";
import { profileDetails, type ProfileDetail, type InsertProfileDetail } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Result } from "../../types/results";
import { CrudRepository } from "@/types/crud";
export type DB = typeof db;

export interface ProfileRepository {
  findByUserId(userId: number): Promise<Result<ProfileDetail>>;
  upsert(userId: number, patch: Partial<InsertProfileDetail>): Promise<Result<ProfileDetail>>;
}

export function createProfileRepository(): ProfileRepository {
    return {
        // Find profile details by user ID
        async findByUserId(userId) {
            try {
                const rows = await db.select().from(profileDetails).where(eq(profileDetails.userId, userId)).limit(1);
                const row = rows[0];
                if (!row) return { success: false, error: { code: 404, message: "Profile details not found" } };
                return { success: true, data: row };
            } catch (error) {
                return { success: false, error: { code: 500, message: (error as Error)?.message ?? "Failed to fetch profile details from database" } };
            }
        },

        // upsert profile details for a user
        async upsert(userId, patch) {
            try {
                const existing = await db
                    .select()
                    .from(profileDetails)
                    .where(eq(profileDetails.userId, userId));

                if (existing.length) {
                    // Update existing profile with updatedAt timestamp
                    const [row] = await db
                        .update(profileDetails)
                        .set({
                            ...patch,
                            updatedAt: new Date()
                        })
                        .where(eq(profileDetails.userId, userId))
                        .returning();
                    return { success: true, data: row };
                } else {
                    // Create new profile with default values
                    const defaultValues = {
                        displayName: "New User",
                        profileImageUrl: "https://via.placeholder.com/150",
                        bio: "There is no bio for this user yet.",
                        phoneNumber: null,
                        location: null,
                        website: null,
                        skillsOffered: null,
                        skillsLearning: null,
                    };

                    const [row] = await db
                        .insert(profileDetails)
                        .values({ 
                            userId,
                            ...defaultValues,
                            ...patch
                        })
                        .returning();
                    return { success: true, data: row };
                }
            } catch (error) {
                return { success: false, error: { code: 500, message: (error as Error)?.message ?? "Failed to upsert profile details in database" } };
            }
        },
    };
}

export const profileRepository = createProfileRepository();