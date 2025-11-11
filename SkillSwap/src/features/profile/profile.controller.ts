import type { RequestInfo } from "rwsdk/worker";
import { profileService, type ProfileService } from "./profile.service";

export function createProfileController(service: ProfileService) {
    return {
        // GET /api/v1/profile/:userId=...
        async getProfile(context: RequestInfo): Promise<Response> {
            const { userId } = context.params;
            const serviceResults = await service.get(Number(userId));
            return new Response(JSON.stringify(serviceResults), {
                status: serviceResults.success ? 200 : (serviceResults.error?.code || 500),
                headers: { "Content-Type": "application/json" },
            });
        },
        // PUT/PATCH /api/v1/profile/:userId=...
        async updateProfile(context: RequestInfo): Promise<Response> {
            const { userId } = context.params;
            const anyContext = context as any;
            
            const currentUserId = Number(anyContext?.session?.user?.id ?? 0);

            const body = (await context.request.json().catch(() => ({}))) as Partial<{
                displayName: string;
                profileImageUrl: string;
                bio: string;
            }>;

            const serviceResults = await service.update(Number(userId), body, currentUserId || undefined);
            return new Response(JSON.stringify(serviceResults), {
                status: serviceResults.success ? 200 : (serviceResults.error?.code || 500),
                headers: { "Content-Type": "application/json" },
            });
        },
    };
}

export const profileController = createProfileController(profileService);