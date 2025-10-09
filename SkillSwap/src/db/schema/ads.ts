import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";
import { users } from "./users";

// https://orm.drizzle.team/docs/sql-schema-declaration 

export const ads = sqliteTable("ads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  userId: integer("user_id").notNull().references(() => users.id),
    ...timestamps,
});

export type Ad = typeof ads.$inferSelect;