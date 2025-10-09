import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./columns.helpers";
import { users } from "./users";

// https://orm.drizzle.team/docs/sql-schema-declaration 

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

export type Notification = typeof notifications.$inferSelect;