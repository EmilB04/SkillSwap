/**
 * Centralized user profile data structure
 * Ready for backend integration
 */

export interface UserProfile {
    // Core user information (from auth/database)
    id: string;
    name: string;
    email: string;
    
    // Profile details
    displayName: string | null;
    phoneNumber: string | null;
    bio: string | null;
    
    // Custom user information
    location: string | null;
    website: string | null;
    profileImage: string | null;
    
    // Skills and interests (stored as arrays in DB, or comma-separated strings)
    skillsOffered: string[];
    skillsLearning: string[];
    
    // Statistics (calculated or stored)
    stats: {
        completedSwaps: number;
        hoursExchanged: number;
        rating: number;
        reviews: number;
    };
    
    // Metadata
    joinDate: string; // ISO date string from database
    updatedAt?: string; // ISO date string
    createdAt?: string; // ISO date string
}

/**
 * Type for updating user profile (all fields optional except id)
 */
export interface UserProfileUpdate {
    id: string;
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
 * Mock user data for development
 * Replace with actual backend data in production
 */
export const mockUserProfile: UserProfile = {
    id: "user_123456",
    name: "Ola Nordmann",
    email: "ola.nordmann@eksempel.no",
    displayName: "@olanordmann",
    phoneNumber: "+47 123 45 678",
    bio: "Brennende interessert i webutvikling og design. Alltid ivrig etter å lære nye ferdigheter og dele kunnskap med samfunnet.",
    location: "Oslo, Norge",
    website: "https://example.com",
    profileImage: null,
    skillsOffered: ["React", "TypeScript", "UI/UX Design", "Node.js", "Tailwind CSS"],
    skillsLearning: ["Python", "Maskinlæring", "GraphQL", "Docker"],
    stats: {
        completedSwaps: 24,
        hoursExchanged: 156,
        rating: 4.8,
        reviews: 18,
    },
    joinDate: "2024-01-15T00:00:00.000Z",
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: new Date().toISOString(),
};

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
 * Format join date for display
 */
export const formatJoinDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('no-NO', options);
};

/**
 * Fetch user profile from backend
 * TODO: Implement actual API call
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
    // Placeholder for backend API call
    // Example: const response = await fetch(`/api/users/${userId}`);
    // return response.json();
    
    return mockUserProfile;
};

/**
 * Update user profile in backend
 * TODO: Implement actual API call
 */
export const updateUserProfile = async (profileData: UserProfileUpdate): Promise<UserProfile> => {
    // Placeholder for backend API call
    // Example: 
    // const response = await fetch(`/api/users/${profileData.id}`, {
    //     method: 'PATCH',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(profileData),
    // });
    // return response.json();
    
    return { ...mockUserProfile, ...profileData };
};
