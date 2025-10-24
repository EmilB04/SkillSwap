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

