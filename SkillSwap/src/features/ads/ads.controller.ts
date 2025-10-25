import type { RequestInfo } from "rwsdk/worker";
import { adsService, type AdsService } from "./ads.service";

export function createAdsController(service: AdsService) {
    return {
        // GET /api/v1/ads
        // GET /api/v1/ads?userId=...
        async listAds(context: RequestInfo) {
            try {
                const searchParams = new URL(context.request.url).searchParams; 
                const searchEntries = Object.fromEntries(searchParams.entries());
                const serviceResults = await service.list(searchEntries);

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
                        JSON.stringify({
                            error: "Failed to fetch ads",
                            success: false,
                        }),
                        {
                            status: 500,
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                }
            }, 

            // GET /api/v1/ads/:id
            async getAd(context: RequestInfo) {
                const { id } = context.params; 
                const serviceResults = await service.getById(id);

                if(!serviceResults.success) {
                    return new Response(JSON.stringify(serviceResults),{
                        status: serviceResults.error.code || 500,
                        headers: { "Content-Type": "application/json" },
                    });
                }

                return new Response(JSON.stringify(serviceResults), {
                    status: 200, 
                    headers: { "Content-Type": "application/json" },
                });
            },

            // POST /api/v1/ads
            async createAd(context: RequestInfo) {
            
            const data = (await context.request.json().catch(() => ({}))) as {
                title?: string;
                description?: string;
                userId?: number;
            };

            const anyCtx = context as any;
            const userId = Number(anyCtx?.session?.user?.id ?? data.userId ?? 0);

            const serviceResults = await service.create({
                title: data.title ?? "",
                description: data.description ?? "",
                userId,
            } as any);

            return new Response(JSON.stringify(serviceResults), {
                status: serviceResults.success ? 201 : (serviceResults.error.code || 500),
                headers: { "Content-Type": "application/json" },
            });
            },

            // PATCH /api/v1/ads/:id
            async updateAd(context: RequestInfo) {
                const { id } = context.params;
                const data = await context.request.json().catch(() => ({}));
                const serviceResults = await service.update(id, data as any);

                return new Response(JSON.stringify(serviceResults), {
                    status: serviceResults.success ? 200 : (serviceResults.error.code || 500),
                    headers: { "Content-Type": "application/json" },
                });
            },

            // DELETE /api/v1/ads/:id
            async deleteAd(context: RequestInfo) {
                const { id } = context.params;
                const result = await service.delete(id);
                
                return new Response(JSON.stringify(result), {
                    status: result.success ? 200 : result.error.code || 500,
                    headers: { "Content-Type": "application/json" },
                });
            },

        };
    }

export const adsController = createAdsController(adsService);