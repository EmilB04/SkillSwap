import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";

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
    ...timestamps,
});

export const directMessages = sqliteTable("directMessages", {
  id: int().primaryKey({ autoIncrement: true }),
  sender: int().notNull().references(() => users.id),
  receiver: int().notNull().references(() => users.id),
  message: text().notNull(),
    ...timestamps,
});

export const profileDetails = sqliteTable("profileDetails", {
    id: int().primaryKey({ autoIncrement: true }),
    userId: int().notNull().references(() => users.id).unique(),
    name: text().notNull().references(() => users.name),
    bio: text().notNull().default("There is no bio for this user yet."),
});

export const reviews = sqliteTable("reviews", {
    id: int().primaryKey({ autoIncrement: true }),
    reviewerId: int().notNull().references(() => users.id),
    revieweeId: int().notNull().references(() => users.id),
    rating: int().notNull().$type<1 | 2 | 3 | 4 | 5>(),
    reviewText: text(),
    ...timestamps,
});

export type User = typeof users.$inferSelect;
export type Ad = typeof ads.$inferSelect;
export type DirectMessage = typeof directMessages.$inferSelect;
export type ProfileDetail = typeof profileDetails.$inferSelect;
export type Review = typeof reviews.$inferSelect;