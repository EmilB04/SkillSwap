import { db } from "../../db";
import { notifications, type Notification, type InsertNotification } from "../../db/schema/notifications";
import { eq, and, desc } from "drizzle-orm";
import type { Result } from "../../types/results";
import { CrudRepository } from "../../types/crud";
export type DB = typeof db;

export type NotificationsQueryParams = {
    userId?: number | string;
    read?: 0 | 1 | "0" | "1";
    limit?: number | string;
    offset?: number | string;   
}

// Repository interface for managing notifications
export interface NotificationsRepository
  extends CrudRepository<Notification, InsertNotification, Partial<InsertNotification>, NotificationsQueryParams> {}

  const toNumber = (value?: number | string) => (typeof value === "string" ? Number(value) : value);
  const toRead = (value?: 0 | 1 | "0" | "1") => 
    value === 1 || value === "1" ? 1 : value === 0 || value === "0" ? 0 : undefined;

export function createNotificationsRepository(db: DB): NotificationsRepository {
    return {
        async findMany(params = {}) {
            try {
                const userId = toNumber(params.userId);
                const read = toRead(params.read);
                const limit = Math.min(Math.max(toNumber(params.limit) ?? 20, 1), 100);
                const offset = Math.max(toNumber(params.offset) ?? 0, 0);

                const base = db.select().from(notifications);
                const clauses: any[] = [];
                
                if (typeof userId === "number") clauses.push(eq(notifications.userId, userId));
                if (typeof read  !== "undefined") clauses.push(eq(notifications.read, read));
                
                const q = clauses.length ? base.where(and(...clauses)) : base;

                const rows = await q.orderBy(desc(notifications.createdAt)).limit(limit).offset(offset);
                return { success: true, data: rows };
            } catch (error) { 
                return { success: false, error: { code: 500, message: (error as Error)?.message ?? "Failed to fetch notifications from database" } };
            }
        },

        async findById(id: string) {
            try {
                const row = await db.query.notifications.findFirst({
                    where: eq(notifications.id, id),
                });
                if (!row) return { success: false, error: { code: 404, message: "Notification not found" } };
                return { success: true, data: row };
            } catch (error) {
                return { success: false, error: { code: 500, message: (error as Error)?.message ?? "Failed to fetch notification from database" } };
            }
        },

        async create(data: InsertNotification) {
            try {
                const [row] = await db.insert(notifications).values({
                    userId: data.userId,
                    notificationType: data.notificationType,
                    title: data.title,
                    message: data.message, 
                    read: data.read ?? 0,
                }).returning();
                return { success: true, data: row };
            } catch (error) {
                return { success: false, error: { code: 500, message: (error as Error)?.message ?? "Failed to create notification in database" } };
            }
        },

        async update(id: string, patch: Partial<InsertNotification>) {
            try {
                const [row] = await db.update(notifications).set(patch as any).where(eq(notifications.id, id)).returning();
                if (!row) return { success: false, error: { code: 404, message: "Notification not found" } };
                return { success: true, data: row };
            } catch (error) {
                return { success: false, error: { code: 500, message: (error as Error)?.message ?? "Failed to update notification in database" } };
            }
        }, 
    };
}

export const notificationsRepository = createNotificationsRepository(db);