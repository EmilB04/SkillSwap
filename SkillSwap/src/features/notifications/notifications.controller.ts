import type { RequestInfo } from "rwsdk/worker";
import { notificationsService, type NotificationsService } from "./notifications.service";

export function createNotificationsController(service: NotificationsService) {
    return {
        // GET /api/v1/notifications?userId=...
        async listNotifications(context: RequestInfo): Promise<Response> {
            try {
                const searchParams = new URL(context.request.url).searchParams;
                const params = Object.fromEntries(searchParams.entries());
                const serviceResults = await service.list(params as any);

                return new Response(JSON.stringify(serviceResults), {
                    status: serviceResults.success ? 200 : (serviceResults.error.code || 500),
                    headers: { "Content-Type": "application/json" },
                });
            } catch {
                return new Response(
                    JSON.stringify({ success: false, error: { message: "Failed to list notifications", code: 500 } }),
                    { status: 500, headers: { "Content-Type": "application/json" } }
                );
            }
        },

        // GET /api/v1/notifications/:id
        async getNotification(context: RequestInfo): Promise<Response> {
            const { id } = context.params;
            const serviceResults = await service.getById(id);
            return new Response(JSON.stringify(serviceResults), {
                status: serviceResults.success ? 200 : (serviceResults.error.code || 500),
                headers: { "Content-Type": "application/json" },
            });
        },

        // POST /api/v1/notifications
        async createNotification(context: RequestInfo): Promise<Response> {
            const body = (await context.request.json().catch(() => ({}))) as {
                userId?: number;
                notificationType?: "message" | "review" | "request";
                title?: string;
                message?: string;
                read?: 0 | 1;
            };

            const serviceResults = await service.create({
                userId: Number(body.userId ?? 0),
                notificationType: body.notificationType ?? "message",
                title: body.title ?? "",
                message: body.message ?? "",
                read: body.read ?? 0,
            } as any);
            
            return new Response(JSON.stringify(serviceResults), {
                status: serviceResults.success ? 201 : (serviceResults.error.code || 500),
                headers: { "Content-Type": "application/json" },
            });
        },

        // PATCH /api/v1/notifications/:id
        async updateNotification(context: RequestInfo): Promise<Response> {
            const { id } = context.params;
            const patch = (await context.request.json().catch(() => ({}))) as Partial<{
                title: string;
                message: string;
                read: 0 | 1;
            }>;

            const serviceResults = await service.update(id, patch);
            return new Response(JSON.stringify(serviceResults), {
                status: serviceResults.success ? 200 : (serviceResults.error.code || 500),
                headers: { "Content-Type": "application/json" },
            }); 
        },
    }
}

export const notificationsController = createNotificationsController(notificationsService);