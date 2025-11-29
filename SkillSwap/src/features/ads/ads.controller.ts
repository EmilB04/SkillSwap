import type { RequestInfo } from "rwsdk/worker";
import { adsService, type AdsService } from "./ads.service";

export function createAdsController(service: AdsService) {
    return {
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

            async createAd(context: RequestInfo) {
            
            const data = (await context.request.json().catch(() => ({}))) as {
                slug?: string;
                title?: string;
                description?: string;
                userId?: number;
                category?: string;
                payment?: string;
                imageUrl?: string;
                location?: string;
                date?: string;
            };

            const anyCtx = context as any;
            const userId = Number(anyCtx?.session?.user?.id ?? data.userId ?? 0);

            const adPayload: any = {
                slug: data.slug || `ad-${Date.now()}`,
                title: data.title || "Untitled",
                description: data.description || "",
                userId,
                category: data.category || "Other",
                payment: data.payment || "Negotiable",
            };

            if (data.imageUrl) {
                adPayload.imageUrl = data.imageUrl;
            }
            if (data.location) {
                adPayload.location = data.location;
            }
            if (data.date) {
                adPayload.date = new Date(data.date);
            }

            const serviceResults = await service.create(adPayload);

            return new Response(JSON.stringify(serviceResults), {
                status: serviceResults.success ? 201 : (serviceResults.error.code || 500),
                headers: { "Content-Type": "application/json" },
            });
            },

            async updateAd(context: RequestInfo) {
                const { id } = context.params;
                const data = await context.request.json().catch(() => ({}));
                const serviceResults = await service.update(id, data as any);

                return new Response(JSON.stringify(serviceResults), {
                    status: serviceResults.success ? 200 : (serviceResults.error.code || 500),
                    headers: { "Content-Type": "application/json" },
                });
            },

            async deleteAd(context: RequestInfo) {
                const { id } = context.params;
                const result = await service.delete(id);
                
                return new Response(JSON.stringify(result), {
                    status: result.success ? 200 : result.error.code || 500,
                    headers: { "Content-Type": "application/json" },
                });
            },

            async getAdBySlug(context: RequestInfo, slug: string) {
                const serviceResults = await service.getBySlug(slug);

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

        };
    }

export const adsController = createAdsController(adsService);