import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  // role can be user, moderator or admin, default is user.
  role: text().notNull().default("user"),
});

export type User = typeof users.$inferSelect;