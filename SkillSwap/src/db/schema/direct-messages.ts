import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";
import { users } from "./users";
import { createId } from "@/app/lib/utils/id";

// https://orm.drizzle.team/docs/sql-schema-declaration 

export const directMessages = sqliteTable("direct_messages", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  senderId: integer("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  receiverId: integer("receiver_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
    ...timestamps,
});

export type DirectMessage = typeof directMessages.$inferSelect;
export type InsertDirectMessage = typeof directMessages.$inferInsert;