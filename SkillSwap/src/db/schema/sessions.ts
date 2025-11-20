import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";   
import { users } from "./users";
import { createId } from "@/app/lib/utils/id";

export const sessions = sqliteTable("sessions", {
     id: text("id").primaryKey().$defaultFn(() => createId()),
     userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
     createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
     expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;