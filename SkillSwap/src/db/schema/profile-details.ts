import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { timestamps } from "./columns.helpers";

// https://orm.drizzle.team/docs/sql-schema-declaration 

export const profileDetails = sqliteTable("profile_details", {
    id: integer("id").primaryKey({ autoIncrement: true }), 
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
    displayName: text("display_name"),
    profileImageUrl: text("profile_image_url"), 
    bio: text("bio"),
    phoneNumber: text("phone_number"),
    location: text("location"),
    website: text("website"),
    skillsOffered: text("skills_offered"),
    skillsLearning: text("skills_learning"), 
    ...timestamps,
});

export type ProfileDetail = typeof profileDetails.$inferSelect;
export type InsertProfileDetail = typeof profileDetails.$inferInsert;