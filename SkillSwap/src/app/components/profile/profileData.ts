/**
 * Centralized profile data structure
 * This mock data should be replaced with actual user data from the database
 */

export interface ProfileData {
    name: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    bio: string;
    location: string;
    website: string;
    skills: string;
    interests: string;
    joinDate: string;
}

export const mockProfileData: ProfileData = {
    name: "Ola Nordmann",
    email: "ola.nordmann@eksempel.no",
    displayName: "@olanordmann",
    phoneNumber: "+47 123 45 678",
    bio: "Brennende interessert i webutvikling og design. Alltid ivrig etter å lære nye ferdigheter og dele kunnskap med samfunnet.",
    location: "Oslo, Norge",
    website: "https://example.com",
    skills: "React, TypeScript, UI/UX Design, Node.js, Tailwind CSS",
    interests: "Python, Maskinlæring, GraphQL, Docker",
    joinDate: "Januar 2024",
};

/**
 * Parse comma-separated skills/interests into array
 */
export const parseSkills = (skillsString: string): string[] => {
    return skillsString
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
};
