import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";
import { users } from "./users";
import { createId } from "../../app/lib/utils/id"; 

// https://orm.drizzle.team/docs/sql-schema-declaration 

export const ads = sqliteTable("ads", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  category: text("category").notNull(),
  payment: text("payment").notNull(),
  imageUrl: text("image_url"),
  location: text("location"),
  date: integer("date", { mode: "timestamp" }).notNull(),
    ...timestamps,
});

export type Ad = typeof ads.$inferSelect;
export type InsertAd = typeof ads.$inferInsert;