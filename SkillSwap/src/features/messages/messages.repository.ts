import { db } from "../../db";
import { directMessages, type DirectMessage, type InsertDirectMessage } from "@/db/schema";
import { eq, and, desc, or } from "drizzle-orm";
import type { Result } from "../../types/results";

export type MessagesQueryParams = {
    currentUserId?: number | string;
    otherUserId?: number | string;
    limit?: number | string;
    offset?: number | string;
}

export interface MessagesRepository {
    findMany(params?: MessagesQueryParams): Promise<Result<DirectMessage[]>>;
    findById(id: string): Promise<Result<DirectMessage>>;
    create(data: InsertDirectMessage): Promise<Result<DirectMessage>>;
    update(id: string, data: Partial<InsertDirectMessage>): Promise<Result<DirectMessage>>;
}

