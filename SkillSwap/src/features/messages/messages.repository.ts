import { db } from "../../db";
import { directMessages, type DirectMessage, type InsertDirectMessage } from "@/db/schema";
import { eq, and, desc, or } from "drizzle-orm";
import type { Result } from "../../types/results";
export type DB = typeof db;

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

export function createMessageRepository(db: DB): MessagesRepository {
    return {
        // Find multiple messages
        async findMany(params = {}) {
            try {
                const transformParams = {
                    num: (value?: number | string) => (typeof value === "string" ? Number(value) : value),
                };

                console.log("Transforming params:", params);
                
                const currentUserId = transformParams.num(params.currentUserId);
                const otherUserId = transformParams.num(params.otherUserId);
                const limit = Math.min(Math.max(transformParams.num(params.limit) ?? 50, 1), 100);
                const offset = Math.max(transformParams.num(params.offset) ?? 0, 0);

                let whereExpression: any = undefined;
                if (typeof currentUserId === "number" && typeof otherUserId === "number") {
                    whereExpression = or(
                        and(eq(directMessages.senderId, currentUserId), eq(directMessages.receiverId, otherUserId)),
                        and(eq(directMessages.senderId, otherUserId), eq(directMessages.receiverId, currentUserId))
                    );
                } else if (typeof currentUserId === "number") {
                    whereExpression = or(
                        eq(directMessages.senderId, currentUserId),
                        eq(directMessages.receiverId, currentUserId)
                    );
                }

                const result = await db
                    .select()
                    .from(directMessages)
                    .where(whereExpression as any)
                    .orderBy(desc(directMessages.createdAt))
                    .limit(limit)
                    .offset(offset);

                return { success: true, data: result };

            } catch (error) {
              return {
                success: false,
                error: {
                  code: 500,
                  message: (error as Error)?.message ?? "Failed to fetch messages from database",
                },
              };
            }
        },

        // Find a single message by its ID
        async findById(id: string) {
            try {
                const message = await db.query.directMessages.findFirst({
                    where: eq(directMessages.id, id),
                    with: { sender: true, receiver: true },
                });

                if (!message) {
                    return { success: false, error: { code: 404, message: "Message not found" } };
                }

                return { success: true, data: message };
            } catch (error) {
                return {
                    success: false, 
                    error: {
                        code: 500,
                        message: (error as Error)?.message ?? "Failed to fetch message from database",
                    },
                };
            }
        },

        // Create a new message in the database
        async create(data: InsertDirectMessage) {
            try {
                const [row] = await db
                    .insert(directMessages)
                    .values({
                        senderId: data.senderId,
                        receiverId: data.receiverId,
                        message: data.message,
                    })
                    .returning();

                return { success: true, data: row };
            } catch (error) {
                return {
                    success: false,
                    error: {
                        code: 500,
                        message: (error as Error)?.message ?? "Failed to create message in database",
                    },
                };
            }
        },

        async update(id, data) {
            try {
                const [updated] = await db
                    .update(directMessages)
                    .set({
                        message: data.message,
                    } as any)
                    .where(eq(directMessages.id, id))
                    .returning();

                if (!updated) {
                    return { success: false, error: { code: 404, message: "Message not found" } };
                }

                return { success: true, data: updated };
            } catch (error) {
                return {
                    success: false,
                    error: {
                        code: 500,
                        message: (error as Error)?.message ?? "Failed to update message in database",
                    },
                };
            }
        },
    } 
}

export const messagesRepository = createMessageRepository(db);