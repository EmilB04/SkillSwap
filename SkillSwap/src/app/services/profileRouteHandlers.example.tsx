/**
 * Example Route Handler for Profile Pages
 * 
 * This file demonstrates how to integrate the user profile system
 * with your routing and data fetching logic.
 */

import { MyPage } from "../pages/user/profile/MyPage";
import EditPage from "../pages/user/profile/EditPage";
import { getUserProfile } from "../services/userProfileService";
import type { RequestInfo } from "rwsdk/worker";

/**
 * Route handler for /profile or /profile/:userId
 * 
 * This would be used in your routing configuration
 */
export async function profileRouteHandler(ctx: RequestInfo) {
    try {
        // Get user ID from context or route params
        const userId = ctx.params?.userId || (ctx as any).user?.id;
        
        if (!userId) {
            // User not logged in - redirect to login
            return new Response(null, {
                status: 302,
                headers: { Location: '/login' }
            });
        }

        // Fetch user profile from backend
        const userProfile = await getUserProfile(userId);
        
        if (!userProfile) {
            return new Response("User not found", { status: 404 });
        }

        // Render the MyPage component - it now uses ctx.user directly
        // @ts-ignore - Example file type mismatch
        return <MyPage ctx={ctx} />;
        
    } catch (error) {
        console.error("Error in profile route handler:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

/**
 * Route handler for /profile/edit
 * 
 * This would be used in your routing configuration
 */
export async function profileEditRouteHandler(ctx: RequestInfo) {
    try {
        // Get user ID from context
        const userId = (ctx as any).user?.id;
        
        if (!userId) {
            // User not logged in - redirect to login
            return new Response(null, {
                status: 302,
                headers: { Location: '/login' }
            });
        }

        // Fetch user profile from backend
        const userProfile = await getUserProfile(userId);
        
        if (!userProfile) {
            return new Response("User not found", { status: 404 });
        }

        // Ensure user can only edit their own profile
        if (userProfile.id !== userId) {
            return new Response("Forbidden", { status: 403 });
        }

        // Render the EditPage component - it now uses ctx.user directly
        // @ts-ignore - Example file type mismatch
        return <EditPage ctx={ctx} />;
        
    } catch (error) {
        console.error("Error in profile edit route handler:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

/**
 * Example integration with RedwoodJS or similar framework:
 * 
 * In your routes file:
 * 
 * export const routes = [
 *   {
 *     path: '/profile',
 *     handler: profileRouteHandler,
 *   },
 *   {
 *     path: '/profile/:userId',
 *     handler: profileRouteHandler,
 *   },
 *   {
 *     path: '/profile/edit',
 *     handler: profileEditRouteHandler,
 *   },
 * ];
 */

/**
 * Alternative: Server-side data fetching with loaders
 * 
 * If your framework supports loaders (like Remix):
 */
export async function profileLoader({ params, request }: any) {
    const userId = params.userId;
    
    if (!userId) {
        throw new Response("Not Found", { status: 404 });
    }

    const userProfile = await getUserProfile(userId);
    
    if (!userProfile) {
        throw new Response("User not found", { status: 404 });
    }
    
    return { userProfile };
}

/**
 * Client-side data fetching example with React Query or SWR:
 */
export function useUserProfile(userId: string) {
    // Example with React Query
    // return useQuery(['userProfile', userId], () => getUserProfile(userId), {
    //     staleTime: 5 * 60 * 1000, // 5 minutes
    //     cacheTime: 10 * 60 * 1000, // 10 minutes
    // });

    // Or with SWR
    // return useSWR(`/api/users/${userId}/profile`, () => getUserProfile(userId));
}
