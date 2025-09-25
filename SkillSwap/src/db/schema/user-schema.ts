import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

// https://orm.drizzle.team/docs/sql-schema-declaration 



export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  role: text().notNull().$type<"user" | "moderator" | "admin">().default("user"),
});

export const ads = sqliteTable("ads", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
  userId: int().notNull().references(() => users.id),
});

export const directMessages = sqliteTable("directMessages", {
  id: int().primaryKey({ autoIncrement: true }),
  sender: int().notNull().references(() => users.id),
  receiver: int().notNull().references(() => users.id),
  message: text().notNull(),
});

export const profileDetails = sqliteTable("profileDetails", {
    id: int().primaryKey({ autoIncrement: true }),
    userId: int().notNull().references(() => users.id).unique(),
    name: text().notNull().references(() => users.name),
    bio: text().notNull().default("There is no bio for this user yet."),
});

export type User = typeof users.$inferSelect;
export type Ad = typeof ads.$inferSelect;
export type DirectMessage = typeof directMessages.$inferSelect;