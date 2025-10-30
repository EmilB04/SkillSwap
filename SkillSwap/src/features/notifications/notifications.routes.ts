import { route } from "rwsdk/router";
import { notificationsController } from "./notifications.controller";

// Routes for notifications
export const notificationsRoutes = [
    route("/", async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "get": return notificationsController.listNotifications(ctx);
            case "post": return notificationsController.createNotification(ctx);
            default: return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    
    route("/:id", async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "get": return notificationsController.getNotification(ctx);
            case "put": return notificationsController.updateNotification(ctx);
            default: return new Response("Method Not Allowed", { status: 405 });
        }
    }),
]