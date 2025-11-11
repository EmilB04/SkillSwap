import type { RequestInfo } from "rwsdk/worker";
import { reviewsService, type ReviewsService } from "./reviews.service";

export function createReviewsController(service: ReviewsService) {
    return {
        // GET /api/v1/reviews?receiverId=...
        async listReviews(context: RequestInfo) {
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
                        params: searchEntries }),
                        { status: 200, headers: { "Content-Type": "application/json" } }
                );
            } catch {
                return new Response(
                    JSON.stringify({ success: false, error: {message: "Failed to list reviews", code: 500 } }),
                    { status: 500, headers: { "Content-Type": "application/json" } }
                );
              }
            },
            
        // GET /api/v1/reviews/:id
        async getReview(context: RequestInfo) {
            const { id } = context.params;
            const serviceResults = await service.getById(id);
            return new Response(JSON.stringify(serviceResults), {
                status: 200, 
                headers: { "Content-Type": "application/json" },
            });
        },

        // POST /api/v1/reviews
        async createReview(context: RequestInfo) {
            const body = (await context.request.json().catch(() => ({}))) as {
                reviewerId?: number;
                receiverId?: number;
                rating?: number;
                reviewText?: string | null;
            };

            const serviceResults = await service.create({
                reviewerId: Number(body.reviewerId ?? 0),
                receiverId: Number(body.receiverId ?? 0),
                rating: Number(body.rating ?? 0) as 1 | 2 | 3 | 4 | 5,
                reviewText: body.reviewText ?? null, 
            } as any );

            return new Response(JSON.stringify(serviceResults), {
                status: serviceResults.success ? 201 : (serviceResults.error?.code || 500),
                headers: { "Content-Type": "application/json" },
            });
        },

        // PATCH /api/v1/reviews/:id
        async updateReview(context: RequestInfo) {
            const { id } = context.params;
            const body = (await context.request.json().catch(() => ({}))) as Partial<{
                rating: 1 | 2 | 3 | 4 | 5;
                reviewText: string | null;
            }>;

            const serviceResults = await service.update(id, {
                rating: body.rating,
                reviewText: body.reviewText,
            });
            
            return new Response(JSON.stringify(serviceResults), {
                status: serviceResults.success ? 200 : (serviceResults.error.code || 500),
                headers: { "Content-Type": "application/json" },
            });
        },
    }
}

export const reviewsController = createReviewsController(reviewsService);
