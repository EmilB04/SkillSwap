import { route } from "rwsdk/router";
import { adsController } from "./ads.controller";

// Routes for ads
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

    // Routes for specific ad by ID
    route("/:id", (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch(method) {
            // GET /api/v1/ads/:id
            case "get":
                return adsController.getAd(ctx);
            // PATCH /api/v1/ads/:id
            case "patch":
                return adsController.updateAd(ctx);
            // PUT /api/v1/ads/:id
            case "put":
                return adsController.updateAd(ctx);
            // DELETE /api/v1/ads/:id
            case "delete":
                return adsController.deleteAd(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
]