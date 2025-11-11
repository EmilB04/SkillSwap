import type { Result } from "../../types/results";
import { messagesRepository, type MessagesRepository } from "./messages.repository";
import type { DirectMessage, InsertDirectMessage } from "@/db/schema";
import type { MessagesQueryParams } from "./messages.repository";
import { CrudService } from "@/types/crud";

// Service interface for managing direct messages
export interface MessagesService 
    extends CrudService<DirectMessage, InsertDirectMessage, Partial<InsertDirectMessage>, MessagesQueryParams> {}

export function createMessagesService(repository: MessagesRepository): MessagesService {
    return {
        async list(params = {}) {
            const repositoryResults = await repository.findMany(params);
            if (!repositoryResults.success) return repositoryResults;

            return { success: true, data: repositoryResults.data ?? [] };
        },

        // Get a single message by its ID
        async getById(id: string) {
            const repositoryResults = await repository.findById(id);
            if (!repositoryResults.success) return repositoryResults;
            
            return { success: true, data: repositoryResults.data}; 
        },

        // Create a new message
        async create(data: InsertDirectMessage) {
            return repository.create(data);
        },
        
        // Update an existing message
        async update(id: string, data: Partial<InsertDirectMessage>) {
            return repository.update(id, data);
        },
    };
}

export const messagesService = createMessagesService(messagesRepository);