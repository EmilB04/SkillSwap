import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

// https://orm.drizzle.team/docs/sql-schema-declaration 

export const profileDetails = sqliteTable("profile_details", {
    id: integer("id").primaryKey({ autoIncrement: true }), 
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
    displayName: text("display_name").notNull(),
    profileImageUrl: text("profile_image_url").notNull(), 
    bio: text("bio").notNull().default("There is no bio for this user yet."),
    phonenumber: text("phone_number"),
    location: text("location"),
    website: text("website"),
    skillsOffered: text("skills_offered"),
    skillsLearning: text("skills_learning"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$onUpdateFn(() => new Date()),
});

export type ProfileDetail = typeof profileDetails.$inferSelect;
export type InsertProfileDetail = typeof profileDetails.$inferInsert;