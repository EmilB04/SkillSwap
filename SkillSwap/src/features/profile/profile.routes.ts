import { route } from "rwsdk/router";
import { profileController } from "./profile.controller";

export const profileRoutes = [
    route("/:userId", async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        
        switch (method) {
            case "get": 
                return profileController.getProfile(ctx);
            case "put": 
            case "patch": 
                return profileController.updateProfile(ctx);
            default: 
                return new Response("Method Not Allowed", { status: 405 });
        }
    })
];