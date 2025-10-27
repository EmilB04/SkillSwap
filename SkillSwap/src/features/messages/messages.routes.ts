import { route } from "rwsdk/router";
import { messagesController } from "./messages.controller";

// Routes for messages
export const messagesRoutes = [
    route("/", async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            // GET /api/v1/messages
            case "get":
                return messagesController.listMessages(ctx);
            // POST /api/v1/messages
            case "post":
                return messagesController.createMessage(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    
    // Routes for specific message by ID
    route("/:id", (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            // GET /api/v1/messages/:id
            case "get":
                return messagesController.getMessage(ctx);
            // PUT /api/v1/messages/:id
            case "put":
                return messagesController.updateMessage(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
]