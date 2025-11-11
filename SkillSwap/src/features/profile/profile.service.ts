import type { Result } from "../../types/results";
import { profileRepository, type ProfileRepository } from "./profile.repository";
import type { ProfileDetail, InsertProfileDetail } from "@/db/schema";

export interface ProfileService 
{
    get(userId: number): Promise<Result<ProfileDetail>>;
    update(userId: number, patch: Partial<InsertProfileDetail>, currentUserId?: number): Promise<Result<ProfileDetail>>;
}

export function createProfileService(repository: ProfileRepository): ProfileService {
    return {
        get(userId) {
            return repository.findByUserId(userId);
        },

        async update(userId, patch, currentUserId) {
            if (currentUserId && currentUserId !== userId) {
                return { success: false, error: { code: 403, message: "You can only update your own profile." } };
            }
            return repository.upsert(userId, patch);
        },
    };
}
export const profileService = createProfileService(profileRepository);