/**
 * Centralized user profile data structure
 * Aligns with database schema: users + profile_details tables
 */

export interface UserProfile {
    // Core user information (from users table)
    id: number;
    name: string;
    email: string;
    role: "user" | "moderator" | "admin";
    
    // Profile details (from profile_details table)
    displayName: string | null;
    phoneNumber: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    profileImage: string | null;
    
    // Skills and interests (stored as comma-separated strings in DB)
    skillsOffered: string[];
    skillsLearning: string[];
    
    // Statistics (calculated from reviews and other tables)
    stats: {
        completedSwaps: number;
        hoursExchanged: number;
        rating: number;
        reviews: number;
    };
    
    // Metadata
    createdAt?: string; // ISO date string from profile_details
    updatedAt?: string; // ISO date string from profile_details
}

/**
 * Type for updating user profile (all fields optional except id)
 */
export interface UserProfileUpdate {
    id: number;
    name?: string;
    email?: string;
    displayName?: string | null;
    phoneNumber?: string | null;
    bio?: string | null;
    location?: string | null;
    website?: string | null;
    profileImage?: string | null;
    skillsOffered?: string[];
    skillsLearning?: string[];
}

/**
 * Parse comma-separated skills/interests into array
 * Useful for form inputs
 */
export const parseSkills = (skillsString: string): string[] => {
    return skillsString
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
};

/**
 * Convert skills array to comma-separated string
 * Useful for form inputs
 */
export const skillsToString = (skills: string[]): string => {
    return skills.join(', ');
};

/**
 * Format date for display
 */
export const formatDate = (isoDate: string | undefined): string => {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('no-NO', options);
};
