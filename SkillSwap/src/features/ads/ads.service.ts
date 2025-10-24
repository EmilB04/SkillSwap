import type { Result } from "../../types/results";
import { adsRepository, type AdsRepository } from "./ads.repository";
import type { Ad, InsertAd } from "../../db/schema/ads";
import type { AdsQueryParams } from "./ads.repository";

export interface AdsService {
    list(params? : AdsQueryParams): Promise<Result<Ad[]>>;
    getById(id: string): Promise<Result<Ad>>;
    create(data: InsertAd): Promise<Result<Ad>>;
    update(id: string, data: Partial<InsertAd>): Promise<Result<Ad>>;
}

// Factory function to create an AdsService instance
export function createAdsService(repository: AdsRepository): AdsService {
    return {
        async list(params = {}) {
            const repositoryResults = await repository.findMany(params);
            if (!repositoryResults.success) return repositoryResults;

            const { data } = repositoryResults;
            return { success: true, data: data ?? [] };
        },

        // Get a single ad by its ID
        async getById(id: string) {
            const repositoryResults = await repository.findById(id);
            if (!repositoryResults.success) return repositoryResults;
            
            return { success: true, data: repositoryResults.data}; 
        },

        // Create a new ad
        async create(data: InsertAd) {
            return repository.create(data);
        },

        // Update an existing ad
        async update(id: string, data: Partial<InsertAd>) {
            return repository.update(id, data);
        }
    };
}

export const adsService = createAdsService(adsRepository);