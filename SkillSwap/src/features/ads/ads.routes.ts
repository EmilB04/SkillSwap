import { route } from "rwsdk/router";
import { adsController } from "./ads.controller";

export const adsRoutes = [
    route("/", async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            // GET /api/v1/ads
            case "get": 
                return adsController.listAds(ctx);
            // POST /api/v1/ads
            case "post": 
                return adsController.createAd(ctx);
            default: 
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
]