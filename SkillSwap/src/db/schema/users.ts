import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";

// https://orm.drizzle.team/docs/sql-schema-declaration 

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().$type<"user" | "moderator" | "admin">().default("user"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;