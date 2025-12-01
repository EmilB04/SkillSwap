/**
 * User Profile Service
 * Handles fetching and updating user profile data from the backend
 */

import { UserProfile, UserProfileUpdate, parseSkills } from "../pages/user/profile/profileData";
import { db } from "@/db";
import { users, profileDetails, reviews } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

/**
 * Load user profile from database
 * Combines data from users, profile_details, and reviews tables
 * 
 * @param userId - The ID of the user to load
 * @returns Promise<UserProfile | null> - Complete user profile data or null if not found
 */
export async function loadUserProfileFromDB(userId: number): Promise<UserProfile | null> {
    try {
        // Fetch user data
        const userResult = await db.select().from(users).where(eq(users.id, userId)).limit(1);
        if (!userResult.length) return null;
        
        const user = userResult[0];
        
        // Fetch profile details
        const profileResult = await db
            .select()
            .from(profileDetails)
            .where(eq(profileDetails.userId, userId))
            .limit(1);
        
        const profile = profileResult[0] || null;
        
        // Calculate user stats from reviews
        const reviewStats = await db
            .select({
                count: sql<number>`count(*)`,
                avgRating: sql<number>`avg(${reviews.rating})`,
            })
            .from(reviews)
            .where(eq(reviews.receiverId, userId));
        
        const stats = reviewStats[0];
        
        // Construct UserProfile object
        const userProfile: UserProfile = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            displayName: profile?.displayName || null,
            phoneNumber: profile?.phoneNumber || null,
            bio: profile?.bio || null,
            location: profile?.location || null,
            website: profile?.website || null,
            profileImage: profile?.profileImageUrl || null,
            skillsOffered: profile?.skillsOffered ? parseSkills(profile.skillsOffered) : [],
            skillsLearning: profile?.skillsLearning ? parseSkills(profile.skillsLearning) : [],
            stats: {
                completedSwaps: 0, // TODO: Calculate from swaps/ads table when implemented
                hoursExchanged: 0, // TODO: Calculate from swaps/ads table when implemented
                rating: stats.avgRating || 0,
                reviews: stats.count || 0,
            },
            createdAt: profile?.createdAt || undefined,
            updatedAt: profile?.updatedAt || undefined,
        };
        
        return userProfile;
    } catch (error) {
        console.error("Error loading user profile from database:", error);
        return null;
    }
}

/**
 * Load user profile (with fallback to mock for development)
 * 
 * @param userId - The ID of the user to load
 * @returns Promise<UserProfile | null> - Complete user profile data
 */
export async function getUserProfile(userId: number): Promise<UserProfile | null> {
    try {
        // Load profile from database
        const profile = await loadUserProfileFromDB(userId);
        return profile;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

/**
 * Update user profile in the backend
 * Updates both users and profile_details tables
 * 
 * @param profileData - UserProfileUpdate object with fields to update
 * @returns Promise<UserProfile | null> - Updated user profile data
 */
export async function saveUserProfile(profileData: UserProfileUpdate): Promise<UserProfile | null> {
    try {
        // TODO: Implement actual database updates
        // This would update the users table and profile_details table
        // Example:
        // if (profileData.name || profileData.email) {
        //     await db.update(users)
        //         .set({ name: profileData.name, email: profileData.email })
        //         .where(eq(users.id, profileData.id));
        // }
        // 
        // // Update profile details
        // await db.update(profileDetails)
        //     .set({
        //         displayName: profileData.displayName,
        //         phoneNumber: profileData.phoneNumber,
        //         // ... other fields
        //     })
        //     .where(eq(profileDetails.userId, profileData.id));
        
        throw new Error("saveUserProfile not fully implemented yet");
    } catch (error) {
        console.error("Error updating user profile:", error);
        return null;
    }
}

/**
 * Upload profile image to backend
 * 
 * @param userId - The ID of the user
 * @param imageFile - The image file to upload
 * @returns Promise<string | null> - URL of the uploaded image or null on error
 */
export async function uploadProfileImage(userId: number, imageFile: File): Promise<string | null> {
    try {
        // TODO: Implement actual file upload
        // This would typically involve:
        // 1. Uploading to R2/S3 or similar storage
        // 2. Updating the profile_details table with the image URL
        
        throw new Error("uploadProfileImage not implemented yet");
    } catch (error) {
        console.error("Error uploading profile image:", error);
        return null;
    }
}

/**
 * Calculate user statistics from backend
 * 
 * @param userId - The ID of the user
 * @returns Promise with user statistics
 */
export async function getUserStats(userId: number): Promise<{
    completedSwaps: number;
    hoursExchanged: number;
    rating: number;
    reviews: number;
}> {
    try {
        // Calculate stats from database
        const reviewStats = await db
            .select({
                count: sql<number>`count(*)`,
                avgRating: sql<number>`avg(${reviews.rating})`,
            })
            .from(reviews)
            .where(eq(reviews.receiverId, userId));
        
        const stats = reviewStats[0];
        
        return {
            completedSwaps: 0, // TODO: Calculate from swaps/ads table when implemented
            hoursExchanged: 0, // TODO: Calculate from swaps/ads table when implemented
            rating: stats.avgRating || 0,
            reviews: stats.count || 0,
        };
    } catch (error) {
        console.error("Error fetching user stats:", error);
        return {
            completedSwaps: 0,
            hoursExchanged: 0,
            rating: 0,
            reviews: 0,
        };
    }
}
