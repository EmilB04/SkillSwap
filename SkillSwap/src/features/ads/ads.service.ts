import type { Result } from "../../types/results";
import { adsRepository, type AdsRepository } from "./ads.repository";
import type { Ad, InsertAd } from "../../db/schema/ads";
import type { AdsQueryParams } from "./ads.repository";
import type { CrudService, WithDelete } from "../../types/crud";

// Service interface for managing ads
export interface AdsService 
    extends CrudService<Ad, InsertAd, Partial<InsertAd>, AdsQueryParams>, WithDelete {}

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
        }, 

        // Delete an ad by its ID
        async delete(id: string) {
            return repository.delete(id);
        }
    };
}

export const adsService = createAdsService(adsRepository);