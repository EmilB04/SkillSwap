import type { Result } from "../../types/results"; 
import { notificationsRepository, type NotificationsRepository } from "./notifications.repository";
import type { Notification, InsertNotification } from "../../db/schema/notifications";
import type { NotificationsQueryParams } from "./notifications.repository";
import type { CrudService } from "../../types/crud";

export interface NotificationsService 
    extends CrudService<Notification, InsertNotification, Partial<InsertNotification>, NotificationsQueryParams> {}

export function createNotificationsService(repository: NotificationsRepository): NotificationsService {
    return {
        // List multiple notifications based on query parameters
        async list(params = {}) {
            const repositoryResults = await repository.findMany(params);
            if (!repositoryResults.success) return repositoryResults;
            return { success: true, data: repositoryResults.data ?? [] };
        },
        // Get a single notification by its ID
        async getById(id: string) {
            return repository.findById(id);
        },
        // Create a new notification
        async create(data: InsertNotification) {
            if (!data.title || !data.message) {
                return { success: false, error: { code: 400, message: "Title and message are required to create a notification." } };
            }
            return repository.create(data);
        },
        // Update an existing notification
        async update(id: string, patch: Partial<InsertNotification>) {
            return repository.update(id, patch);
        },
    };
}

export const notificationsService = createNotificationsService(notificationsRepository);