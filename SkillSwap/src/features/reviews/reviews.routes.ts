import { route } from "rwsdk/router";
import { reviewsController } from "./reviews.controller";

export const reviewsRoutes = [
    route("/", async (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "get":
                return reviewsController.listReviews(ctx);
            case "post":
                return reviewsController.createReview(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
    
    route("/:id", (ctx) => {
        const method = ctx.request.method.toLowerCase();
        switch (method) {
            case "get":
                return reviewsController.getReview(ctx);
            case "put": 
                return reviewsController.updateReview(ctx);
            default:
                return new Response("Method Not Allowed", { status: 405 });
        }
    }),
];