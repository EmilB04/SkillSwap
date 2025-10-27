import type { RequestInfo } from "rwsdk/worker";
import { messagesService, type MessagesService } from "./messages.service";

export function createMessagesController(service: MessagesService) {
    return {
        // GET /api/v1/messages
        // GET /api/v1/messages?currentUserId=...
        async listMessages(context: RequestInfo) {
            try {
                const searchParams = new URL(context.request.url).searchParams; 
                const searchEntries = Object.fromEntries(searchParams.entries());
                const serviceResults = await service.list(searchEntries as any);

                if (!serviceResults.success) {
                    return new Response(JSON.stringify(serviceResults), {
                        status: serviceResults.error.code || 500,
                        headers: { "Content-Type": "application/json" },
                    });
                }

                return new Response(
                    JSON.stringify({
                        ...serviceResults,
                        params: searchEntries,
                    }),
                    {
                        status: 200, 
                        headers: { "Content-Type": "application/json" },
                    }
                );
            } catch {
                return new Response(
                    JSON.stringify({ success: false, error: {message: "Failed to list messages", code: 500 } }),
                    { status: 500, headers: { "Content-Type": "application/json" } }
                );
              }
            },

        // GET /api/v1/messages/:id
        async getMessage(context: RequestInfo) {
            const { id } = context.params;
            const serviceResults = await service.getById(id);
            return new Response(JSON.stringify(serviceResults), {
                status: 200, 
                headers: { "Content-Type": "application/json" },
            });
        },

        // POST /api/v1/messages
        async createMessage(context: RequestInfo) {
            const body = (await context.request.json().catch(() => ({}))) as {
                senderId: number;
                receiverId: number;
                message: string;
            };

            const serviceResults = await service.create(body);
            return new Response(JSON.stringify(serviceResults), {
                status: 201, 
                headers: { "Content-Type": "application/json" },
            });
        },

        // PATCH /api/v1/messages/:id
        async updateMessage(context: RequestInfo) {
            const { id } = context.params;
            const body = (await context.request.json().catch(() => ({}))) as Partial<{
                senderId: number;
                receiverId: number;
                message: string;
            }>;
            const serviceResults = await service.update(id, body);
            return new Response(JSON.stringify(serviceResults), {
                status: 200, 
                headers: { "Content-Type": "application/json" },
            });
        },
   };
}

export const messagesController = createMessagesController(messagesService);
