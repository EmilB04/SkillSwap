import type { SafeUser, UserRole } from "@/db";

export const isAdmin = (user: SafeUser | null): boolean => 
    user?.role === "admin";

export const isModerator = (user: SafeUser | null): boolean => 
    user?.role === "moderator";

export const isUser = (user: SafeUser | null): boolean => 
    user !== null; 

export const hasRole = (user: SafeUser | null, role: UserRole): boolean => {
    if (!user) return false;
    if (role === "admin") return user.role === "admin";
    if (role === "moderator") return user.role === "admin" || user.role === "moderator";
    
    // role is "user"
    return true;
}