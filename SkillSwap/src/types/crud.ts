import type { Result } from "../types/results";

// Generic CRUD repository interface for repositories
export interface CrudRepository <T, Insert, Update, Query = unknown> {
    findMany(params?: Query): Promise<Result<T[]>>;
    findById(id: string): Promise<Result<T>>;
    create(data: Insert): Promise<Result<T>>;
    update(id: string, data: Update): Promise<Result<T>>;
};

// Generic CRUD service interface for services
export interface CrudService<T, Insert, Update, Query = unknown> {
    list(params?: Query): Promise<Result<T[]>>;
    getById(id: string): Promise<Result<T>>;
    create(data: Insert): Promise<Result<T>>;
    update(id: string, data: Update): Promise<Result<T>>;
}