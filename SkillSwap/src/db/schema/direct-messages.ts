import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";

// https://orm.drizzle.team/docs/sql-schema-declaration 

export const directMessages = sqliteTable("direct_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  senderId: integer("sender_id").notNull().references(() => users.id),
  receiverId: integer("receiever_id").notNull().references(() => users.id),
  message: text("message").notNull(),
    ...timestamps,
});

export type DirectMessage = typeof directMessages.$inferSelect;