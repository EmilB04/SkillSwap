import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

// https://orm.drizzle.team/docs/sql-schema-declaration 

export const profileDetails = sqliteTable("profile_details", {
    id: integer("id").primaryKey({ autoIncrement: true }), 
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
    displayName: text("display_name").notNull(),
    profileImageUrl: text("profile_image_url").notNull(), 
    bio: text("bio").notNull().default("There is no bio for this user yet."),
});

export type ProfileDetail = typeof profileDetails.$inferSelect;
export type InsertProfileDetail = typeof profileDetails.$inferInsert;