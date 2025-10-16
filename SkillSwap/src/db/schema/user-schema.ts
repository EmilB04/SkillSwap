import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";


// https://orm.drizzle.team/docs/sql-schema-declaration 

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().$type<"user" | "moderator" | "admin">().default("user"),
});

export const ads = sqliteTable("ads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  userId: integer("user_id").notNull().references(() => users.id),
    ...timestamps,
});

export const directMessages = sqliteTable("direct_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  senderId: integer("sender_id").notNull().references(() => users.id),
  receiverId: integer("receiever_id").notNull().references(() => users.id),
  message: text("message").notNull(),
    ...timestamps,
});

export const profileDetails = sqliteTable("profile_details", {
    id: integer("id").primaryKey({ autoIncrement: true }), 
    userId: integer("user_id").notNull().references(() => users.id).unique(),
    displayName: text("display_name").notNull(),
    profileImageUrl: text("profile_image_url").notNull(), 
    bio: text("bio").notNull().default("There is no bio for this user yet."),
});

export const reviews = sqliteTable("reviews", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    reviewerId: integer("reviewer_id").notNull().references(() => users.id),
    receiverId: integer("receiver_id").notNull().references(() => users.id),
    rating: integer("rating").notNull().$type<1 | 2 | 3 | 4 | 5>(),
    reviewText: text("review_text"),
    ...timestamps,
});

export const notifications = sqliteTable("notifications", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").notNull().references(() => users.id),
    notificationType: text("notification_type").notNull().$type<"message" | "review" | "request">(),
    title: text("title").notNull(),
    message: text("message").notNull(),
    // read is by default 0 (false), and when the user reads the notification it is set to 1 (true)
    read: integer("read").notNull().default(0).$type<0 | 1>(),
    ...timestamps,
});


export type User = typeof users.$inferSelect;
export type Ad = typeof ads.$inferSelect;
export type DirectMessage = typeof directMessages.$inferSelect;
export type ProfileDetail = typeof profileDetails.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Notification = typeof notifications.$inferSelect;